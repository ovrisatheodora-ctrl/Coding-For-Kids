import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import aiMascot from '../../assets/Maskot AI.png';
import './AiTutor.css';

const FAB_POSITION_KEY = 'cfk_ai_tutor_position';
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
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const fabRef = useRef(null);
  const panelRef = useRef(null);
  const positionRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const [fabPosition, setFabPosition] = useState(null);
  const [panelPosition, setPanelPosition] = useState(null);
  const [isDraggingFab, setIsDraggingFab] = useState(false);
  const lang = t === t ? 'id' : 'en'; // detect lang from t object

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
    const fabSize = fabRef.current?.offsetWidth || 176;
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

  const saveFabPosition = (position) => {
    try {
      localStorage.setItem(FAB_POSITION_KEY, JSON.stringify(position));
    } catch (error) {
      console.error('Unable to save the AI Tutor button position.', error);
    }
  };

  useEffect(() => {
    const fabSize = fabRef.current?.offsetWidth || 176;
    let initialPosition;

    try {
      const savedPosition = localStorage.getItem(FAB_POSITION_KEY);
      if (savedPosition) {
        const parsedPosition = JSON.parse(savedPosition);
        if (
          Number.isFinite(parsedPosition?.x) &&
          Number.isFinite(parsedPosition?.y)
        ) {
          initialPosition = clampFabPosition(
            parsedPosition.x,
            parsedPosition.y,
            window.innerWidth,
            window.innerHeight,
            fabSize,
          );
        } else {
          console.error('Stored AI Tutor button position is invalid.');
        }
      }
    } catch (error) {
      console.error('Unable to read the AI Tutor button position.', error);
    }

    if (!initialPosition) {
      initialPosition = clampFabPosition(
        window.innerWidth - fabSize - 28,
        window.innerHeight - fabSize - 28,
        window.innerWidth,
        window.innerHeight,
        fabSize,
      );
    }

    positionRef.current = initialPosition;
    setFabPosition(initialPosition);

    const handleResize = () => {
      const position = positionRef.current;
      if (!position) return;
      const resizedPosition = updateFabPosition(position.x, position.y);
      saveFabPosition(resizedPosition);
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
    const isId = ai.btnLabel.includes('TANYA');
    const userMsg = hintTexts[isId ? 'id' : 'en'][level];
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
      saveFabPosition(positionRef.current);
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
    const nextPosition = updateFabPosition(
      positionRef.current.x + direction[0],
      positionRef.current.y + direction[1],
    );
    saveFabPosition(nextPosition);
  };

  useLayoutEffect(() => {
    if (!open || !fabPosition || !panelRef.current) return undefined;

    const updatePanelPosition = () => {
      const panel = panelRef.current;
      if (!panel) return;

      const panelWidth = panel.offsetWidth || 480;
      const panelHeight = panel.offsetHeight || 560;
      const fabSize = fabRef.current?.offsetWidth || 176;
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

      setPanelPosition({ left, top });
    };

    updatePanelPosition();
    window.addEventListener('resize', updatePanelPosition);
    return () => window.removeEventListener('resize', updatePanelPosition);
  }, [open, fabPosition]);

  return (
    <>
      {/* Floating button */}
      <button
        ref={fabRef}
        className={`ai-tutor-fab${open ? ' open' : ''}${isDraggingFab ? ' dragging' : ''}`}
        style={fabPosition ? { left: fabPosition.x, top: fabPosition.y } : undefined}
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
        disabled={!fabPosition}
      >
        <img src={aiMascot} alt="" aria-hidden="true" draggable="false" />
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
              ? `${Math.min(
                  Math.max(
                    fabPosition.y + (fabRef.current?.offsetWidth || 176) / 2 - panelPosition.top,
                    48,
                  ),
                  (panelRef.current?.offsetHeight || 560) - 48,
                )}px`
              : undefined,
          }}
        >
          {/* Header */}
          <div className="ai-tutor-header">
            <div className="ai-tutor-header-left">
              <span className="ai-tutor-avatar">
                <img src={aiMascot} alt="" aria-hidden="true" />
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
                    <img src={aiMascot} alt="" aria-hidden="true" />
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
                  <img src={aiMascot} alt="" aria-hidden="true" />
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
