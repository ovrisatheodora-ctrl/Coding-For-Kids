// api/ai-tutor.js — Vercel Serverless Function
// AI Tutor endpoint. API keys live ONLY in Vercel environment variables.
// This function is never called from client-side with keys exposed.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, hintLevel = 1, context = null, lang = 'id' } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
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
Context: ${context ? JSON.stringify(context) : 'Homepage general help'}
Language: ${lang === 'id' ? 'Bahasa Indonesia' : 'English'}
  `.trim();

  try {
    // Gemini API via Google AI
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nStudent asks: ${message}` }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      (lang === 'id'
        ? '💡 Coba pikirkan lagi ya! Aku tahu kamu bisa!'
        : '💡 Try thinking about it again! I know you can do it!');

    return res.status(200).json({ reply });
  } catch (err) {
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
