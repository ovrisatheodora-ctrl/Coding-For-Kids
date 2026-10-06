import { useState, useRef, useEffect } from 'react';
import './AiTutor.css';

// Static hint fallbacks (used when API is unavailable)
const STATIC_HINTS = {
  1: {
    id: '💡 Coba pikirkan: apa langkah pertama yang perlu kamu lakukan? Baca soalnya lagi pelan-pelan!',
    en: "💡 Think about it: what's the very first step you need to take? Read the question carefully again!",
  },
  2: {
    id: '📖 Konsepnya: dalam coding, kita memberi instruksi langkah demi langkah kepada komputer. Pikirkan urutan langkah-langkah itu!',
    en: '📖 The concept: in coding, we give instructions step by step to the computer. Think about the order of those steps!',
  },
  3: {
    id: '🔍 Contoh serupa: bayangkan kamu menyuruh robot untuk membuat sandwich — kamu harus memberi perintah satu per satu secara berurutan!',
    en: '🔍 Similar example: imagine telling a robot to make a sandwich — you need to give commands one by one in order!',
  },
  4: {
    id: '✅ Oke, aku akan bantu sepenuhnya! Kuncinya adalah mengikuti urutan yang benar: pertama identifikasi masalah, lalu buat langkah-langkahnya, terakhir uji coba!',
    en: '✅ Alright, I will help you fully! The key is following the right order: first identify the problem, then create the steps, finally test it!',
  },
};

function AiTutor({ t, currentContext = null }) {
  const ai = t.aiTutor;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: ai.greeting },
  ]);
  const [input, setInput] = useState('');
  const [hintLevel, setHintLevel] = useState(1);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const lang = t === t ? 'id' : 'en'; // detect lang from t object

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Reset greeting when language changes
  useEffect(() => {
    setMessages([{ role: 'assistant', text: ai.greeting }]);
  }, [ai.greeting]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setLoading(true);

    try {
      // Call serverless AI API (ready for real integration)
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          hintLevel,
          context: currentContext,
          lang: ai === t.aiTutor ? 'id' : 'en',
        }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
    } catch {
      // Fallback to static hints
      const fallbackLang = Object.keys(STATIC_HINTS[hintLevel]).includes('id') ? 'id' : 'en';
      const fallbackText =
        STATIC_HINTS[hintLevel]?.[fallbackLang] ||
        STATIC_HINTS[1].id;

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: fallbackText },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const requestHint = (level) => {
    setHintLevel(level);
    const hintTexts = {
      id: {
        1: '💡 Kasih aku petunjuk kecil dulu!',
        2: '📖 Jelaskan konsepnya ya!',
        3: '🔍 Berikan contoh yang mirip!',
        4: '✅ Tolong tunjukkan solusi lengkapnya!',
      },
      en: {
        1: '💡 Give me a small clue please!',
        2: '📖 Please explain the concept!',
        3: '🔍 Show me a similar example!',
        4: '✅ Please show me the full solution!',
      },
    };
    const isId = ai.btnLabel.includes('TANYA');
    const userMsg = hintTexts[isId ? 'id' : 'en'][level];
    setInput(userMsg);
  };

  return (
    <>
      {/* Floating button */}
      <button
        className={`ai-tutor-fab${open ? ' open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={ai.btnLabel}
        aria-expanded={open}
      >
        <span className="ai-tutor-fab-icon">🤖</span>
        <span className="ai-tutor-fab-label">{open ? '✕' : ai.btnLabel}</span>
      </button>

      {/* Panel */}
      {open && (
        <div className="ai-tutor-panel" role="dialog" aria-label={ai.title}>
          {/* Header */}
          <div className="ai-tutor-header">
            <div className="ai-tutor-header-left">
              <span className="ai-tutor-avatar">🤖</span>
              <div>
                <h3 className="ai-tutor-title">{ai.title}</h3>
                <p className="ai-tutor-subtitle">{ai.subtitle}</p>
              </div>
            </div>
            <button
              className="ai-tutor-close"
              onClick={() => setOpen(false)}
              aria-label="Close AI Tutor"
            >
              ✕
            </button>
          </div>

          {/* Hint level buttons */}
          <div className="ai-tutor-levels">
            {ai.levels.map(({ label, level }) => (
              <button
                key={level}
                className={`ai-hint-btn${hintLevel === level ? ' active' : ''}`}
                onClick={() => requestHint(level)}
                aria-pressed={hintLevel === level}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="ai-tutor-messages" role="log" aria-live="polite">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`ai-msg ai-msg--${msg.role}`}
              >
                {msg.role === 'assistant' && (
                  <span className="ai-msg-avatar">🤖</span>
                )}
                <div className="ai-msg-bubble">
                  {msg.text.split('\n').map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="ai-msg ai-msg--assistant">
                <span className="ai-msg-avatar">🤖</span>
                <div className="ai-msg-bubble ai-msg-bubble--loading">
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            className="ai-tutor-input-row"
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
          >
            <input
              ref={inputRef}
              type="text"
              className="ai-tutor-input"
              placeholder={ai.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              aria-label={ai.placeholder}
            />
            <button
              type="submit"
              className="btn btn-purple ai-send-btn"
              disabled={loading || !input.trim()}
              aria-label={ai.sendBtn}
            >
              {ai.sendBtn} →
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AiTutor;
