// api/ai-tutor.js — Vercel Serverless Function
// AI Tutor endpoint. API keys live ONLY in Vercel environment variables.
// This function is never called from client-side with keys exposed.
import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { isIP } from 'node:net';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import process from 'node:process';

let aiTutorRateLimiters;
const devIpRequestTimes = new Map();
let devGlobalRequestTimes = [];

function checkDevMemoryRateLimit(clientIp) {
  const now = Date.now();
  const minuteCutoff = now - 60_000;
  const dayCutoff = now - 24 * 60 * 60 * 1000;
  const ipKey = createHash('sha256').update(clientIp).digest('hex');

  for (const [key, timestamps] of devIpRequestTimes) {
    const recent = timestamps.filter((timestamp) => timestamp > minuteCutoff);
    if (recent.length) devIpRequestTimes.set(key, recent);
    else devIpRequestTimes.delete(key);
  }
  devGlobalRequestTimes = devGlobalRequestTimes.filter((timestamp) => timestamp > dayCutoff);

  const ipRequests = devIpRequestTimes.get(ipKey) || [];
  if (ipRequests.length >= 10 || devGlobalRequestTimes.length >= 1000) return 429;

  ipRequests.push(now);
  devIpRequestTimes.set(ipKey, ipRequests);
  devGlobalRequestTimes.push(now);
  return 0;
}

async function checkAiTutorRateLimit(req) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const useDevMemoryLimiter = process.env.NODE_ENV === 'development'
    && process.env.AI_TUTOR_DEV_RATE_LIMIT === 'memory';
  if (!useDevMemoryLimiter && (!redisUrl || !redisToken)) {
    console.error('AI Tutor rate limit unavailable.', 'missing_config');
    return 503;
  }

  const forwardedFor = req.headers?.['x-forwarded-for'];
  const forwardedHeader = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  const forwardedIp = typeof forwardedHeader === 'string'
    ? forwardedHeader.split(',')[0].trim()
    : '';
  const clientIp = process.env.NODE_ENV === 'development'
    ? req.socket?.remoteAddress || forwardedIp
    : forwardedIp;
  if (!clientIp || isIP(clientIp) === 0) {
    console.error('AI Tutor rate limit unavailable.', 'client_ip_unavailable');
    return 503;
  }

  if (useDevMemoryLimiter) return checkDevMemoryRateLimit(clientIp);

  try {
    if (!aiTutorRateLimiters) {
      const redis = new Redis({ url: redisUrl, token: redisToken });
      aiTutorRateLimiters = {
        perIp: new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(10, '1 m'),
          analytics: false,
          prefix: 'ai-tutor:ip',
        }),
        global: new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(1000, '1 d'),
          analytics: false,
          prefix: 'ai-tutor:global',
        }),
      };
    }

    const ipKey = createHash('sha256').update(clientIp).digest('hex');
    const ipResult = await aiTutorRateLimiters.perIp.limit(ipKey);
    if (!ipResult.success) return 429;

    const globalResult = await aiTutorRateLimiters.global.limit('all');
    return globalResult.success ? 0 : 429;
  } catch {
    console.error('AI Tutor rate limit unavailable.', 'store_unavailable');
    return 503;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (process.env.AI_TUTOR_ENABLED !== 'true') {
    console.error('AI Tutor request failed.', 'disabled', 0);
    return res.status(503).json({ error: 'AI Tutor is unavailable' });
  }

  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  if (Buffer.byteLength(JSON.stringify(body)) > 32 * 1024) {
    return res.status(413).json({ error: 'Request body too large' });
  }

  const { message, hintLevel = 1, context = null, lang = 'id' } = body;
  if (typeof message !== 'string' || !message.trim() || message.length > 2000) {
    return res.status(400).json({ error: 'Invalid message' });
  }
  if (!Number.isInteger(hintLevel) || hintLevel < 1 || hintLevel > 4) {
    return res.status(400).json({ error: 'Invalid hint level' });
  }
  if (lang !== 'id' && lang !== 'en') {
    return res.status(400).json({ error: 'Invalid language' });
  }

  let contextText = 'Homepage general help';
  if (context !== null) {
    if (typeof context !== 'object' || Array.isArray(context)) {
      return res.status(400).json({ error: 'Invalid context' });
    }
    try {
      contextText = JSON.stringify(context);
    } catch {
      return res.status(400).json({ error: 'Invalid context' });
    }
    if (contextText.length > 2000) {
      return res.status(400).json({ error: 'Context is too long' });
    }
  }

  const rateLimitStatus = await checkAiTutorRateLimit(req);
  if (rateLimitStatus !== 0) {
    return res.status(rateLimitStatus).json({
      error: rateLimitStatus === 429 ? 'Too many requests' : 'AI Tutor is temporarily unavailable',
    });
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
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
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

    return res.status(200).json({ reply });
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

    return res.status(200).json({ reply, fallback: true });
  }
}
