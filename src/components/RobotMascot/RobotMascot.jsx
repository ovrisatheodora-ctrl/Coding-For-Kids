import mascot260 from '../../assets/optimized/mascot-260w.webp';
import mascot520 from '../../assets/optimized/mascot-520w.webp';
import mascot780 from '../../assets/optimized/mascot-780w.webp';
import './RobotMascot.css';

function RobotMascot() {
  return (
    <div className="robot-wrapper" aria-hidden="true">
      <img
        className="robot-image"
        src={mascot520}
        srcSet={`${mascot260} 260w, ${mascot520} 520w, ${mascot780} 780w`}
        sizes="(max-width: 600px) 260px, (max-width: 900px) 280px, 520px"
        alt=""
        width="780"
        height="513"
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
      <div className="mascot-code-card">
        <div className="mascot-code-dots">
          <span />
          <span />
          <span />
        </div>
        <code>
          <span><i>if</i> (happy) {'{'}</span>
          <span>&nbsp;&nbsp;learn()</span>
          <span>&nbsp;&nbsp;play()</span>
          <span>{'}'}</span>
        </code>
      </div>
    </div>
  );
}

export default RobotMascot;
