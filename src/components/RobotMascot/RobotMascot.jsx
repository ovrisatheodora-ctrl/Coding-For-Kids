/* Robot mascot SVG — inline CSS-animated coding robot */
import './RobotMascot.css';

function RobotMascot() {
  return (
    <div className="robot-wrapper" aria-hidden="true" role="img" aria-label="Friendly coding robot mascot">
      {/* Floating decorative elements */}
      <div className="robot-deco robot-deco--star1">⭐</div>
      <div className="robot-deco robot-deco--star2">✦</div>
      <div className="robot-deco robot-deco--star3">💫</div>
      <div className="robot-deco robot-deco--code1">{'{ }'}</div>
      <div className="robot-deco robot-deco--code2">{'</>'}</div>
      <div className="robot-deco robot-deco--plus">+</div>
      <div className="robot-deco robot-deco--cursor">🖱️</div>

      {/* Code window floating near robot */}
      <div className="code-window">
        <div className="code-window-bar">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <div className="code-window-body">
          <div className="code-line"><span className="code-kw">if</span> <span className="code-str">(happy)</span> {'{'}</div>
          <div className="code-line pl">&nbsp;&nbsp;<span className="code-fn">learn</span>()</div>
          <div className="code-line pl">&nbsp;&nbsp;<span className="code-fn">play</span>()</div>
          <div className="code-line">{'}'}</div>
        </div>
      </div>

      {/* Main Robot SVG */}
      <svg
        className="robot-svg"
        viewBox="0 0 260 340"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* ── Antenna ── */}
        <rect x="126" y="10" width="8" height="28" rx="4" fill="#111" />
        <circle cx="130" cy="8" r="8" fill="#FFD1F3" stroke="#111" strokeWidth="2.5" />

        {/* ── Head ── */}
        <rect
          className="robot-head"
          x="80" y="36" width="100" height="80"
          rx="22" fill="white" stroke="#111" strokeWidth="3"
        />
        {/* Headphones left */}
        <rect x="64" y="52" width="18" height="30" rx="9" fill="#CCF6FF" stroke="#111" strokeWidth="2.5" />
        {/* Headphones right */}
        <rect x="178" y="52" width="18" height="30" rx="9" fill="#CCF6FF" stroke="#111" strokeWidth="2.5" />
        {/* Headphone band */}
        <path d="M73 57 Q130 30 187 57" stroke="#CCF6FF" strokeWidth="5" strokeLinecap="round" fill="none" />

        {/* Face screen */}
        <rect x="90" y="50" width="80" height="56" rx="12" fill="#111" stroke="#111" strokeWidth="2" />
        {/* Eyes */}
        <ellipse className="robot-eye robot-eye--left" cx="114" cy="74" rx="10" ry="10" fill="white" />
        <ellipse className="robot-eye robot-eye--right" cx="146" cy="74" rx="10" ry="10" fill="white" />
        {/* Pupils */}
        <circle cx="116" cy="74" r="5" fill="#CCF6FF" />
        <circle cx="148" cy="74" r="5" fill="#CCF6FF" />
        {/* Eye shine */}
        <circle cx="119" cy="71" r="2" fill="white" />
        <circle cx="151" cy="71" r="2" fill="white" />
        {/* Smile */}
        <path d="M112 92 Q130 104 148 92" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* ── Neck ── */}
        <rect x="118" y="116" width="24" height="12" rx="5" fill="#ddd" stroke="#111" strokeWidth="2.5" />

        {/* ── Body ── */}
        <rect x="65" y="128" width="130" height="110" rx="20" fill="white" stroke="#111" strokeWidth="3" />
        {/* Chest panel */}
        <rect x="88" y="145" width="84" height="55" rx="10" fill="#111" stroke="#111" strokeWidth="1.5" />
        {/* Panel lights */}
        <circle cx="106" cy="162" r="7" fill="#C7EF8E" />
        <circle cx="130" cy="162" r="7" fill="#C7EF8E" />
        <circle cx="154" cy="162" r="7" fill="#FFD1F3" />
        {/* Panel bar */}
        <rect x="95" y="180" width="70" height="8" rx="4" fill="#CCF6FF" opacity="0.8" />
        {/* Panel sparkle */}
        <text x="126" y="197" fontSize="11" fill="#FFD1F3">✦</text>

        {/* ── Left Arm (waving) ── */}
        <g className="robot-arm--wave">
          <rect x="24" y="135" width="42" height="22" rx="11" fill="white" stroke="#111" strokeWidth="3" />
          <rect x="16" y="152" width="32" height="18" rx="9" fill="white" stroke="#111" strokeWidth="2.5" />
          {/* Hand fingers */}
          <rect x="12" y="163" width="8" height="14" rx="4" fill="white" stroke="#111" strokeWidth="2" />
          <rect x="22" y="163" width="8" height="17" rx="4" fill="white" stroke="#111" strokeWidth="2" />
          <rect x="32" y="163" width="8" height="16" rx="4" fill="white" stroke="#111" strokeWidth="2" />
        </g>

        {/* ── Right Arm ── */}
        <rect x="194" y="135" width="42" height="22" rx="11" fill="white" stroke="#111" strokeWidth="3" />
        <rect x="212" y="152" width="32" height="18" rx="9" fill="white" stroke="#111" strokeWidth="2.5" />

        {/* ── Laptop ── */}
        <g className="robot-laptop">
          {/* Laptop base */}
          <rect x="72" y="236" width="116" height="70" rx="8" fill="#FFD1F3" stroke="#111" strokeWidth="3" />
          {/* Laptop screen */}
          <rect x="80" y="244" width="100" height="54" rx="5" fill="#111" />
          {/* Screen content */}
          <text x="92" y="264" fontSize="8" fill="#C7EF8E" fontFamily="monospace">{'> hello_world()'}</text>
          <text x="92" y="278" fontSize="8" fill="#C7EF8E" fontFamily="monospace">{'🎉 Hello, Coder!'}</text>
          <text x="92" y="292" fontSize="8" fill="#CCF6FF" fontFamily="monospace">{'> █'}</text>
          {/* Trackpad */}
          <rect x="108" y="300" width="44" height="2" rx="1" fill="#FFD1F3" />
        </g>

        {/* ── Legs ── */}
        <rect x="95" y="238" width="28" height="52" rx="10" fill="white" stroke="#111" strokeWidth="3" />
        <rect x="137" y="238" width="28" height="52" rx="10" fill="white" stroke="#111" strokeWidth="3" />
        {/* Feet */}
        <rect x="88" y="282" width="42" height="18" rx="9" fill="#CCF6FF" stroke="#111" strokeWidth="2.5" />
        <rect x="130" y="282" width="42" height="18" rx="9" fill="#CCF6FF" stroke="#111" strokeWidth="2.5" />
      </svg>
    </div>
  );
}

export default RobotMascot;
