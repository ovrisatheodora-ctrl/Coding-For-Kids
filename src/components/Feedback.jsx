import { useState } from 'react';
import correctIcon from '../assets/icon-benar.png';
import wrongIcon from '../assets/icon-salah.png';
import './Feedback.css';

function Feedback({ tipe, pesan, xp, bintang, petunjuk, labelPetunjuk }) {
  const [hintRevealed, setHintRevealed] = useState(false);

  return (
    <div className="feedback-slot">
      {tipe && (
        <div className={`feedback-banner feedback-banner--${tipe}`} role="status" aria-live="polite">
          <img
            className="feedback-banner__icon"
            src={tipe === 'benar' ? correctIcon : wrongIcon}
            alt=""
            aria-hidden="true"
            onError={(event) => {
              event.currentTarget.hidden = true;
            }}
          />
          <span className="feedback-banner__message">{pesan}</span>
          {xp > 0 && <span className="feedback-banner__chip">+{xp} XP</span>}
          {bintang > 0 && <span className="feedback-banner__chip">+{bintang} ★</span>}
          {petunjuk && (hintRevealed ? (
            <span className="feedback-banner__hint">{petunjuk}</span>
          ) : (
            <button
              className="feedback-banner__hint-button"
              type="button"
              onClick={() => setHintRevealed(true)}
            >
              {labelPetunjuk}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Feedback;
