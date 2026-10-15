// api/ai-tutor.js — Vercel Serverless Function
// AI Tutor endpoint. API keys live ONLY in Vercel environment variables.
// This function is never called from client-side with keys exposed.
import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { BlockList, isIP } from 'node:net';
import process from 'node:process';

const MAX_REQUESTS_PER_MINUTE = 10;
const MAX_REQUESTS_PER_DAY = 100;
const MAX_TRACKED_IPS = 5000;
const MINUTE_MS = 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const requestsByIp = new Map();
let lastRateLimitCleanup = 0;

function normalizeIp(value) {
  if (typeof value !== 'string') return null;
  const ip = value.trim().replace(/^::ffff:/i, '');
  return isIP(ip) ? ip.toLowerCase() : null;
}

function getClientIp(req) {
  const isDevMemoryMode = process.env.NODE_ENV === 'development'
    && process.env.AI_TUTOR_DEV_RATE_LIMIT === 'memory';
  if (isDevMemoryMode) return normalizeIp(req.socket?.remoteAddress);

  const connectingPeerIp = normalizeIp(req.socket?.remoteAddress);
  if (!isTrustedProxy(connectingPeerIp, process.env.AI_TUTOR_TRUSTED_PROXY_IP)) return null;

  const extraHopsSetting = process.env.AI_TUTOR_XFF_EXTRA_HOPS;
  const extraHops = extraHopsSetting === undefined ? 0 : Number(extraHopsSetting);
  if (!Number.isInteger(extraHops)
    || extraHops < 0
    || extraHops > 3
    || (extraHopsSetting !== undefined && !/^(0|[1-3])$/.test(extraHopsSetting))) return null;

  const forwardedFor = req.headers?.['x-forwarded-for'];
  if (typeof forwardedFor !== 'string') return null;
  const forwardedIps = forwardedFor.split(',').map(normalizeIp);
  if (forwardedIps.length !== extraHops + 1 || forwardedIps.some((ip) => !ip)) return null;
  return forwardedIps[0];
}

function isTrustedProxy(connectingPeerIp, configuredProxyIps) {
  if (!connectingPeerIp || typeof configuredProxyIps !== 'string') return false;

  const blockList = new BlockList();
  const entries = configuredProxyIps.split(',');
  for (const entry of entries) {
    const proxyEntry = entry.trim();
    if (!proxyEntry) return false;

    const slashIndex = proxyEntry.indexOf('/');
    if (slashIndex === -1) {
      const proxyIp = normalizeIp(proxyEntry);
      if (!proxyIp) return false;
      blockList.addAddress(proxyIp, isIP(proxyIp) === 4 ? 'ipv4' : 'ipv6');
      continue;
    }

    if (proxyEntry.indexOf('/', slashIndex + 1) !== -1) return false;
    const address = proxyEntry.slice(0, slashIndex).trim().toLowerCase();
    const prefixText = proxyEntry.slice(slashIndex + 1);
    const version = isIP(address);
    if (!version || !/^\d+$/.test(prefixText)) return false;

    const prefix = Number(prefixText);
    if (prefix > (version === 4 ? 32 : 128)) return false;
    blockList.addSubnet(address, prefix, version === 4 ? 'ipv4' : 'ipv6');
  }

  return blockList.check(connectingPeerIp, isIP(connectingPeerIp) === 4 ? 'ipv4' : 'ipv6');
}

function isPrivateOrInternalIp(value) {
  const ip = normalizeIp(value);
  if (!ip) return false;
  if (isIP(ip) === 4) {
    const [first, second] = ip.split('.').map(Number);
    return first === 10
      || first === 127
      || (first === 172 && second >= 16 && second <= 31)
      || (first === 192 && second === 168);
  }
  return ip === '::1' || ip.startsWith('fc') || ip.startsWith('fd');
}

function countForwardedForEntries(headers) {
  const header = headers?.['x-forwarded-for'];
  const values = Array.isArray(header) ? header : [header];
  return values.reduce((count, value) => {
    if (typeof value !== 'string') return count;
    return count + value.split(',').filter((entry) => entry.trim().length > 0).length;
  }, 0);
}

function checkMemoryRateLimit(clientIp) {
  const now = Date.now();
  const minuteCutoff = now - MINUTE_MS;
  const dayCutoff = now - DAY_MS;
  const ipKey = createHash('sha256').update(clientIp).digest('hex');

  if (now - lastRateLimitCleanup >= MINUTE_MS) {
    for (const [key, state] of requestsByIp) {
      state.minute = state.minute.filter((timestamp) => timestamp > minuteCutoff);
      state.day = state.day.filter((timestamp) => timestamp > dayCutoff);
      if (!state.day.length) requestsByIp.delete(key);
    }
    lastRateLimitCleanup = now;
  }

  let state = requestsByIp.get(ipKey);
  if (!state) {
    if (requestsByIp.size >= MAX_TRACKED_IPS) return 503;
    state = { minute: [], day: [] };
  }
  state.minute = state.minute.filter((timestamp) => timestamp > minuteCutoff);
  state.day = state.day.filter((timestamp) => timestamp > dayCutoff);
  if (state.minute.length >= MAX_REQUESTS_PER_MINUTE
    || state.day.length >= MAX_REQUESTS_PER_DAY) return 429;

  state.minute.push(now);
  state.day.push(now);
  requestsByIp.set(ipKey, state);
  return 0;
}

function checkAiTutorRateLimit(req) {
  const clientIp = getClientIp(req);
  if (!clientIp) {
    if (process.env.NODE_ENV === 'production') {
      const peerIp = normalizeIp(req.socket?.remoteAddress);
      const peer = isPrivateOrInternalIp(peerIp) ? peerIp : 'public';
      const forwardedForEntries = countForwardedForEntries(req.headers);
      const trustedProxyIsSet = process.env.AI_TUTOR_TRUSTED_PROXY_IP !== undefined;
      console.error(
        'AI Tutor rate limit diagnostic.',
        `peer=${peer}`,
        `x_forwarded_for_entries=${forwardedForEntries}`,
        `trusted_proxy_ip_set=${trustedProxyIsSet ? 'true' : 'false'}`,
      );
    }
    console.error('AI Tutor rate limit unavailable.', 'invalid_proxy_or_client_ip');
    return 503;
  }
  const status = checkMemoryRateLimit(clientIp);
  if (status === 503) console.error('AI Tutor rate limit unavailable.', 'capacity');
  return status;
}

export async function handleAiTutorRequest(req) {
  if (req.method !== 'POST') {
    return { status: 405, body: { error: 'Method not allowed' } };
  }
  if (process.env.AI_TUTOR_ENABLED !== 'true') {
    console.error('AI Tutor request failed.', 'disabled', 0);
    return { status: 503, body: { error: 'AI Tutor is unavailable' } };
  }

  // Node server callers must parse JSON with a 32 KiB read limit before calling.
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { status: 400, body: { error: 'Invalid request body' } };
  }
  if (Buffer.byteLength(JSON.stringify(body)) > 32 * 1024) {
    return { status: 413, body: { error: 'Request body too large' } };
  }

  const { message, hintLevel = 1, context = null, lang = 'id' } = body;
  if (typeof message !== 'string' || !message.trim() || message.length > 2000) {
    return { status: 400, body: { error: 'Invalid message' } };
  }
  if (!Number.isInteger(hintLevel) || hintLevel < 1 || hintLevel > 4) {
    return { status: 400, body: { error: 'Invalid hint level' } };
  }
  if (lang !== 'id' && lang !== 'en') {
    return { status: 400, body: { error: 'Invalid language' } };
  }

  let contextText = 'Homepage general help';
  if (context !== null) {
    if (typeof context !== 'object' || Array.isArray(context)) {
      return { status: 400, body: { error: 'Invalid context' } };
    }
    try {
      contextText = JSON.stringify(context);
    } catch {
      return { status: 400, body: { error: 'Invalid context' } };
    }
    if (contextText.length > 2000) {
      return { status: 400, body: { error: 'Context is too long' } };
    }
  }

  const rateLimitStatus = checkAiTutorRateLimit(req);
  if (rateLimitStatus !== 0) {
    return {
      status: rateLimitStatus,
      body: {
        error: rateLimitStatus === 429 ? 'Too many requests' : 'AI Tutor is temporarily unavailable',
      },
    };
  }

  // Build child-safe system prompt
  const systemPrompt = `
You are Cobi, a friendly coding assistant for elementary school children (Grades 1-6).
Your rules:
1. NEVER give the full answer immediately. Use the hint level to guide how much help to give.
2. Use very simple, encouraging, child-friendly language.
3. Use emoji to make responses fun and engaging.
4. Only discuss coding topics appropriate for children.
5. Encourage the child to try first before asking for help.
6. Never say anything inappropriate, scary, or off-topic.
7. If the question is not about coding or learning, gently redirect to coding topics.

Hint levels:
1 = Small clue only. Just point them in the right direction.
2 = Explain the concept briefly with simple words.
3 = Give a similar example (not the exact solution).
4 = Give the full solution with a clear explanation.

Current hint level: ${hintLevel}
Language: ${lang === 'id' ? 'Bahasa Indonesia' : 'English'}
  `.trim();

  let failureCategory = 'upstream_error';
  let upstreamStatus = 0;

  try {
    // Gemini API via Google AI
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
    if (!apiKey) {
      failureCategory = 'missing_key';
      throw new Error('GEMINI_API_KEY not configured');
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [
            {
              role: 'user',
              parts: [{ text: `Student asks: ${message}\nContext: ${contextText}` }],
            },
          ],
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          ],
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      upstreamStatus = response.status;
      failureCategory = response.status === 404 ? 'bad_model' : 'upstream_status';
      throw new Error(`API responded with ${response.status}`);
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      (lang === 'id'
        ? '💡 Coba pikirkan lagi ya! Aku tahu kamu bisa!'
        : '💡 Try thinking about it again! I know you can do it!');

    return { status: 200, body: { reply } };
  } catch {
    console.error('AI Tutor request failed.', failureCategory, upstreamStatus);
    // Fallback static hints when API fails
    const fallbacks = {
      1: {
        id: '💡 Coba baca soalnya lagi pelan-pelan. Apa langkah pertama yang perlu kamu lakukan?',
        en: '💡 Try reading the question slowly again. What is the very first step you need to take?',
      },
      2: {
        id: '📖 Ingat: dalam coding, kita memberi instruksi satu per satu kepada komputer. Pikirkan urutan langkah-langkahnya!',
        en: '📖 Remember: in coding, we give instructions one by one to the computer. Think about the order of steps!',
      },
      3: {
        id: '🔍 Contoh: bayangkan kamu ingin menyuruh robot membuat kue. Kamu harus berurutan: ambil tepung → tambah gula → aduk → panggang. Sama seperti coding!',
        en: '🔍 Example: imagine telling a robot to bake a cake. You must go in order: get flour → add sugar → mix → bake. Just like coding!',
      },
      4: {
        id: '✅ Kuncinya: identifikasi masalah terlebih dahulu, lalu buat langkah-langkah solusinya satu per satu, kemudian uji coba! Ini disebut algoritma 🎉',
        en: '✅ The key: identify the problem first, then create solution steps one by one, then test it! This is called an algorithm 🎉',
      },
    };

    const level = Math.min(Math.max(hintLevel, 1), 4);
    const reply = fallbacks[level]?.[lang] || fallbacks[1].id;

    return { status: 200, body: { reply, fallback: true } };
  }
}

export default async function handler(req, res) {
  const result = await handleAiTutorRequest(req);
  return res.status(result.status).json(result.body);
}
