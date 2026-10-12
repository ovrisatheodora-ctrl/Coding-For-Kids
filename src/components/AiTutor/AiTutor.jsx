import { useState, useRef, useEffect } from 'react';
import aiMascot88 from '../../assets/optimized/ai-mascot-88w.webp';
import aiMascot176 from '../../assets/optimized/ai-mascot-176w.webp';
import './AiTutor.css';

const FAB_EDGE_GAP = 12;

function clampFabPosition(x, y, width, height, fabSize) {
  return {
    x: Math.max(FAB_EDGE_GAP, Math.min(x, width - fabSize - FAB_EDGE_GAP)),
    y: Math.max(FAB_EDGE_GAP, Math.min(y, height - fabSize - FAB_EDGE_GAP)),
  };
}

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

function detectReplyLanguage(message, fallbackLang = 'id') {
  const text = (message || '').toLowerCase();
  if (!text.trim()) return fallbackLang;

  const idWords = [
    'apa', 'bagaimana', 'kenapa', 'tolong', 'bantu', 'saya', 'aku', 'kamu',
    'yang', 'ini', 'itu', 'kode', 'algoritma', 'pola', 'perintah', 'lanjut',
    'jelaskan', 'contoh', 'petunjuk', 'mudah', 'seru', 'game', 'belajar',
  ];
  const enWords = [
    'what', 'how', 'why', 'please', 'help', 'i', 'you', 'this', 'that',
    'code', 'algorithm', 'pattern', 'command', 'explain', 'example', 'hint',
    'easy', 'fun', 'game', 'learn', 'teach', 'can you', 'please', 'show me',
  ];

  const idScore = idWords.reduce((score, word) => score + (text.includes(word) ? 1 : 0), 0);
  const enScore = enWords.reduce((score, word) => score + (text.includes(word) ? 1 : 0), 0);

  if (idScore > enScore) return 'id';
  if (enScore > idScore) return 'en';
  return fallbackLang;
}

function AiTutor({ t, currentContext = null, lang = 'id' }) {
  const ai = t.aiTutor;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: ai.greeting },
  ]);
  const [input, setInput] = useState('');
  const [hintLevel, setHintLevel] = useState(1);
  const [loading, setLoading] = useState(false);
  const [conversationLang, setConversationLang] = useState(lang === 'en' ? 'en' : 'id');
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const fabRef = useRef(null);
  const panelRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  // Initialise to null; a useEffect below sets the real position after mount,
  // deferring the window.innerWidth read out of the render/state-init path.
  const [fabPosition, setFabPosition] = useState(null);
  const positionRef = useRef(null);
  const [panelPosition, setPanelPosition] = useState(null);
  const [isDraggingFab, setIsDraggingFab] = useState(false);

  const handlePanelWheel = (event) => {
    const messagesContainer = messagesContainerRef.current;
    if (!messagesContainer) return;

    event.preventDefault();
    event.stopPropagation();

    const deltaMultiplier = event.deltaMode === 1
      ? 16
      : event.deltaMode === 2
        ? messagesContainer.clientHeight
        : 1;
    messagesContainer.scrollTop += event.deltaY * deltaMultiplier;
  };

  const updateFabPosition = (x, y) => {
    const fabSize = window.innerWidth <= 480 ? 144 : 176;
    const nextPosition = clampFabPosition(
      x,
      y,
      window.innerWidth,
      window.innerHeight,
      fabSize,
    );
    positionRef.current = nextPosition;
    setFabPosition(nextPosition);
    return nextPosition;
  };

  // Set initial fab position after mount — deferred to avoid layout reads during render.
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const fabSize = window.innerWidth <= 480 ? 144 : 176;
      const initial = clampFabPosition(
        window.innerWidth - fabSize - 28,
        window.innerHeight - fabSize - 28,
        window.innerWidth,
        window.innerHeight,
        fabSize,
      );
      positionRef.current = initial;
      setFabPosition(initial);
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const position = positionRef.current;
      if (!position) return;
      updateFabPosition(position.x, position.y);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    const frameId = window.requestAnimationFrame(() => {
      setMessages([{ role: 'assistant', text: ai.greeting }]);
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [ai.greeting]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setConversationLang(lang === 'en' ? 'en' : 'id');
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [lang]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const nextLang = detectReplyLanguage(text, conversationLang);
    setConversationLang(nextLang);
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
          lang: nextLang,
        }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
    } catch {
      const fallbackText =
        STATIC_HINTS[hintLevel]?.[nextLang] ||
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
        1: 'Kasih aku petunjuk kecil dulu!',
        2: 'Jelaskan konsepnya ya!',
        3: 'Berikan contoh yang mirip!',
        4: 'Tolong tunjukkan solusi lengkapnya!',
      },
      en: {
        1: 'Give me a small clue please!',
        2: 'Please explain the concept!',
        3: 'Show me a similar example!',
        4: 'Please show me the full solution!',
      },
    };
    const userMsg = hintTexts[conversationLang || lang || 'id'][level];
    setInput(userMsg);
  };

  const handleFabPointerDown = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: positionRef.current,
      moved: false,
    };
  };

  const handleFabPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(deltaX, deltaY) < 5) return;

    drag.moved = true;
    setIsDraggingFab(true);
    updateFabPosition(drag.origin.x + deltaX, drag.origin.y + deltaY);
  };

  const handleFabPointerUp = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setIsDraggingFab(false);

    if (drag.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
  };

  const handleFabKeyDown = (event) => {
    const directions = {
      ArrowUp: [0, -16],
      ArrowDown: [0, 16],
      ArrowLeft: [-16, 0],
      ArrowRight: [16, 0],
    };
    const direction = directions[event.key];
    if (!direction || !positionRef.current) return;

    event.preventDefault();
    updateFabPosition(
      positionRef.current.x + direction[0],
      positionRef.current.y + direction[1],
    );
  };

  // Use ResizeObserver measurements to position the panel without sync layout reads.
  useEffect(() => {
    const panel = panelRef.current;
    const fab = fabRef.current;
    if (!open || !fabPosition || !panel || !fab) return undefined;

    const dimensions = { panelWidth: 0, panelHeight: 0, fabSize: 0 };

    const updatePanelPosition = () => {
      const { panelWidth, panelHeight, fabSize } = dimensions;
      if (!panelWidth || !panelHeight || !fabSize) return;
      const safeTop = window.innerWidth <= 768 ? 88 : 112;
      const maxTop = Math.max(16, window.innerHeight - panelHeight - 16);
      const minTop = Math.min(safeTop, maxTop);

      const left = Math.min(
        Math.max(16, fabPosition.x - panelWidth - 4),
        window.innerWidth - panelWidth - 16,
      );

      const top = Math.min(
        Math.max(minTop, fabPosition.y + fabSize / 2 - panelHeight / 2),
        maxTop,
      );

      const tailY = Math.min(
        Math.max(fabPosition.y + fabSize / 2 - top, 48),
        panelHeight - 48,
      );

      setPanelPosition({ left, top, tailY });
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const boxSize = Array.isArray(entry.borderBoxSize)
          ? entry.borderBoxSize[0]
          : entry.borderBoxSize;
        const width = boxSize?.inlineSize ?? entry.contentRect.width;
        const height = boxSize?.blockSize ?? entry.contentRect.height;

        if (entry.target === panel) {
          dimensions.panelWidth = width;
          dimensions.panelHeight = height;
        } else if (entry.target === fab) {
          dimensions.fabSize = width;
        }
      }

      updatePanelPosition();
    });

    observer.observe(panel);
    observer.observe(fab);
    window.addEventListener('resize', updatePanelPosition);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePanelPosition);
    };
  }, [open, fabPosition]);

  return (
    <>
      {/* Floating button */}
      <button
        ref={fabRef}
        className={`ai-tutor-fab${open ? ' open' : ''}${isDraggingFab ? ' dragging' : ''}`}
        style={fabPosition ? { left: fabPosition.x, top: fabPosition.y, right: 'auto', bottom: 'auto' } : undefined}
        onClick={() => {
          if (suppressClickRef.current) {
            suppressClickRef.current = false;
            return;
          }
          setOpen((previous) => !previous);
        }}
        onPointerDown={handleFabPointerDown}
        onPointerMove={handleFabPointerMove}
        onPointerUp={handleFabPointerUp}
        onPointerCancel={handleFabPointerUp}
        onKeyDown={handleFabKeyDown}
        aria-label={ai.btnLabel}
        aria-expanded={open}
        title={ai.btnLabel}
      >
        <img
          src={aiMascot88}
          srcSet={`${aiMascot88} 88w, ${aiMascot176} 176w`}
          sizes="88px"
          alt=""
          aria-hidden="true"
          draggable="false"
          width="176"
          height="176"
        />
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          className="ai-tutor-panel"
          role="dialog"
          aria-label={ai.title}
          onWheel={handlePanelWheel}
          style={{
            left: panelPosition ? `${panelPosition.left}px` : '16px',
            top: panelPosition
              ? `${panelPosition.top}px`
              : `${window.innerWidth <= 768 ? 88 : 112}px`,
            '--ai-tutor-tail-y': panelPosition
              ? `${panelPosition.tailY}px`
              : undefined,
          }}
        >
          {/* Header */}
          <div className="ai-tutor-header">
            <div className="ai-tutor-header-left">
              <span className="ai-tutor-avatar">
                <img src={aiMascot88} srcSet={`${aiMascot88} 88w, ${aiMascot176} 176w`} sizes="48px" alt="" aria-hidden="true" />
              </span>
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

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="ai-tutor-messages"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`ai-msg ai-msg--${msg.role}`}
              >
                {msg.role === 'assistant' && (
                  <span className="ai-msg-avatar">
                    <img src={aiMascot88} srcSet={`${aiMascot88} 88w, ${aiMascot176} 176w`} sizes="48px" alt="" aria-hidden="true" />
                  </span>
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
                <span className="ai-msg-avatar">
                  <img src={aiMascot88} srcSet={`${aiMascot88} 88w, ${aiMascot176} 176w`} sizes="48px" alt="" aria-hidden="true" />
                </span>
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
            <div className="ai-tutor-levels">
              {ai.levels.map(({ label, level }) => (
                <button
                  key={level}
                  type="button"
                  className={`ai-hint-btn${hintLevel === level ? ' active' : ''}`}
                  onClick={() => requestHint(level)}
                  aria-pressed={hintLevel === level}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="ai-tutor-input-wrap">
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
                className="ai-send-btn"
                disabled={loading || !input.trim()}
                aria-label={ai.sendBtn}
                title={ai.sendBtn}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3.4 20.1 21 12 3.4 3.9l.1 6.3L15 12 3.5 13.8l-.1 6.3Z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AiTutor;
