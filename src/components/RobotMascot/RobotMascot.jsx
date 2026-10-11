import mascot from '../../assets/Maskot_Coding_For_Kids.webp';
import './RobotMascot.css';

function RobotMascot() {
  return (
    <div className="robot-wrapper" aria-hidden="true">
      <img className="robot-image" src={mascot} alt="" width="1000" height="658"
     fetchPriority="high" decoding="async" />
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
