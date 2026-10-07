import { useState } from 'react';
import ArrowLabel from '../components/ArrowLabel';

function localized(value, lang) {
  return value[lang] || value.id;
}

export function ProgressBar({ steps, currentStep, label }) {
  return (
    <nav className="learning-progress" aria-label={label}>
      {steps.map((step, index) => (
        <span
          key={step.id}
          className={`learning-progress__step${index <= currentStep ? ' is-active' : ''}`}
          aria-current={index === currentStep ? 'step' : undefined}
          title={step.label}
        >
          <span className="learning-progress__dot" aria-hidden="true">
            {index < currentStep ? '✓' : index + 1}
          </span>
          <span className="learning-progress__label">{step.label}</span>
        </span>
      ))}
    </nav>
  );
}

export function MaterialStep({ unit, lang }) {
  return (
    <section className="learning-card learning-paper" aria-labelledby="learning-step-title">
      <div className="learning-step-kicker">📒</div>
      <h1 id="learning-step-title" className="learning-step-title">{localized(unit.title, lang)}</h1>
      <div className="learning-material-list">
        {unit.material.map((block, index) => (
          <p className="learning-material-note" key={block.key}>
            <span aria-hidden="true">{index === 0 ? '✦' : '✏️'}</span>
            {localized(block.text, lang)}
          </p>
        ))}
      </div>
    </section>
  );
}

export function ExampleStep({ unit, lang, title }) {
  return (
    <section className="learning-card learning-example-card" aria-labelledby="learning-step-title">
      <h1 id="learning-step-title" className="learning-step-title">{title}</h1>
      <div className="learning-example-strip" aria-label={unit.example.sequence.map((item) => localized(item.label, lang)).join(', ')}>
        {unit.example.sequence.map((item) => (
          <span className="learning-example-symbol" key={item.id} aria-hidden="true">
            {item.symbol}
          </span>
        ))}
      </div>
      <p className="learning-example-caption">{localized(unit.example.caption, lang)}</p>
    </section>
  );
}

export function ActivityStep({ activity, lang, labels, onContinue }) {
  const [choice, setChoice] = useState('');
  const [result, setResult] = useState('');
  const isCorrect = result === 'correct';

  function checkChoice() {
    setResult(choice === activity.answer ? 'correct' : 'wrong');
  }

  return (
    <section className="learning-card learning-activity-card" aria-labelledby="learning-step-title">
      <div className="learning-step-kicker">🧩</div>
      <h1 id="learning-step-title" className="learning-step-title">{localized(activity.title, lang)}</h1>
      <div className="learning-activity-sequence" aria-label={labels.completePattern}>
        {activity.sequence.map((item, index) => (
          <span className="learning-activity-tile" key={`${item}-${index}`} aria-hidden="true">{item}</span>
        ))}
      </div>
      <div className="learning-choice-grid">
        {activity.options.map((option) => (
          <button
            className={`learning-choice learning-choice--large${choice === option ? ' is-selected' : ''}`}
            type="button"
            key={option}
            onClick={() => {
              setChoice(option);
              setResult('');
            }}
            aria-pressed={choice === option}
          >
            {option}
          </button>
        ))}
      </div>
      {result && (
        <p className={`learning-inline-feedback${isCorrect ? ' is-correct' : ' is-wrong'}`} role="status">
          {isCorrect ? localized(activity.success, lang) : localized(activity.hint, lang)}
        </p>
      )}
      {isCorrect ? (
        <button className="btn btn-primary" type="button" onClick={onContinue}><ArrowLabel>{labels.continue}</ArrowLabel></button>
      ) : (
        <button className="btn btn-primary" type="button" onClick={checkChoice} disabled={!choice}>
          {labels.check}
        </button>
      )}
    </section>
  );
}

function moveItem(order, from, to) {
  if (from === to) return order;
  const next = [...order];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function QuestionInput({ question, lang, value, setValue, labels }) {
  const [selectedLeft, setSelectedLeft] = useState('');
  const [draggedId, setDraggedId] = useState('');

  if (question.type === 'multiple-choice' || question.type === 'pattern') {
    return (
      <div className="learning-choice-grid">
        {question.options.map((option) => (
          <button
            className={`learning-choice${value === option.id ? ' is-selected' : ''}`}
            type="button"
            key={option.id}
            onClick={() => setValue(option.id)}
            aria-pressed={value === option.id}
          >
            {localized(option.text, lang)}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === 'true-false') {
    return (
      <div className="learning-choice-grid learning-choice-grid--two">
        {[true, false].map((answer) => (
          <button
            className={`learning-choice learning-choice--large${value === answer ? ' is-selected' : ''}`}
            type="button"
            key={String(answer)}
            onClick={() => setValue(answer)}
            aria-pressed={value === answer}
          >
            {answer ? labels.true : labels.false}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === 'sequence') {
    const order = value.length ? value : question.items.map((item) => item.id);

    function reorder(fromIndex, toIndex) {
      setValue(moveItem(order, fromIndex, toIndex));
    }

    return (
      <ol className="learning-sequence-list" aria-label={labels.sequenceInstructions}>
        {order.map((id, index) => {
          const item = question.items.find((entry) => entry.id === id);
          return (
            <li
              className="learning-sequence-item"
              key={id}
              draggable
              onDragStart={(event) => {
                setDraggedId(id);
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/plain', id);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const draggedItem = event.dataTransfer.getData('text/plain') || draggedId;
                const fromIndex = order.indexOf(draggedItem);
                if (fromIndex >= 0) reorder(fromIndex, index);
                setDraggedId('');
              }}
              onDragEnd={() => setDraggedId('')}
            >
              <span className="learning-sequence-grip" aria-hidden="true">⠿</span>
              <span>{localized(item.text, lang)}</span>
              <span className="learning-sequence-controls">
                <button
                  type="button"
                  aria-label={`${labels.moveUp}, ${labels.itemNumber(index + 1)}: ${localized(item.text, lang)}`}
                  onClick={() => index > 0 && reorder(index, index - 1)}
                  disabled={index === 0}
                >↑</button>
                <button
                  type="button"
                  aria-label={`${labels.moveDown}, ${labels.itemNumber(index + 1)}: ${localized(item.text, lang)}`}
                  onClick={() => index < order.length - 1 && reorder(index, index + 1)}
                  disabled={index === order.length - 1}
                >↓</button>
              </span>
            </li>
          );
        })}
      </ol>
    );
  }

  if (question.type === 'matching') {
    const matches = value || {};
    return (
      <div className="learning-match-area">
        <p className="learning-match-instructions">{labels.matchInstructions}</p>
        <div className="learning-match-columns">
          <div className="learning-match-column">
            {question.left.map((item) => (
              <button
                type="button"
                className={`learning-match-item${selectedLeft === item.id ? ' is-selected' : ''}${matches[item.id] ? ' is-connected' : ''}`}
                key={item.id}
                onClick={() => setSelectedLeft(item.id)}
                aria-pressed={selectedLeft === item.id}
              >
                {localized(item.text, lang)}
                {matches[item.id] && <span className="learning-match-connected">✓</span>}
              </button>
            ))}
          </div>
          <div className="learning-match-column">
            {question.right.map((item) => (
              <button
                type="button"
                className={`learning-match-item${Object.values(matches).includes(item.id) ? ' is-connected' : ''}`}
                key={item.id}
                aria-pressed={Object.values(matches).includes(item.id)}
                onClick={() => {
                  if (!selectedLeft) return;
                  setValue({ ...matches, [selectedLeft]: item.id });
                  setSelectedLeft('');
                }}
                aria-label={`${labels.matchTo}: ${localized(item.text, lang)}`}
              >
                {localized(item.text, lang)}
                {Object.values(matches).includes(item.id) && <span className="learning-match-connected">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function matchesAnswer(question, value) {
  if (question.type === 'sequence') {
    return Array.isArray(value) && value.length === question.answer.length
      && value.every((item, index) => item === question.answer[index]);
  }
  if (question.type === 'matching') {
    return Object.entries(question.answer).every(([left, right]) => value?.[left] === right);
  }
  return value === question.answer;
}

function formatAnswer(question, lang, labels) {
  if (question.type === 'sequence') {
    return question.answer
      .map((id) => localized(question.items.find((item) => item.id === id).text, lang))
      .join(' → ');
  }
  if (question.type === 'matching') {
    return Object.entries(question.answer)
      .map(([leftId, rightId]) => {
        const left = question.left.find((item) => item.id === leftId);
        const right = question.right.find((item) => item.id === rightId);
        return `${localized(left.text, lang)} → ${localized(right.text, lang)}`;
      })
      .join(' · ');
  }
  if (question.type === 'true-false') {
    return question.answer ? labels.true : labels.false;
  }
  return localized(question.options.find((option) => option.id === question.answer).text, lang);
}

function localizedMessage(question, name, lang) {
  return localized(question[name], lang);
}

export function QuizStep({ questions, lang, labels, onCorrect, onComplete }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [value, setValue] = useState('');
  const [wrongTries, setWrongTries] = useState(0);
  const [outcome, setOutcome] = useState('');
  const [showHint, setShowHint] = useState(false);

  const question = questions[questionIndex];
  const revealed = outcome === 'revealed';

  function checkAnswer() {
    if (matchesAnswer(question, value)) {
      setOutcome('correct');
      onCorrect(question.id);
      return;
    }
    const nextWrongTries = wrongTries + 1;
    setWrongTries(nextWrongTries);
    setOutcome(nextWrongTries >= 2 ? 'revealed' : 'wrong');
  }

  function goNext() {
    if (questionIndex === questions.length - 1) {
      onComplete();
      return;
    }
    setQuestionIndex((index) => index + 1);
    setValue('');
    setWrongTries(0);
    setOutcome('');
    setShowHint(false);
  }

  return (
    <section className="learning-card learning-quiz-card" aria-labelledby="learning-step-title">
      <div className="learning-quiz-count">{labels.questionCount(questionIndex + 1, questions.length)}</div>
      <h1 id="learning-step-title" className="learning-step-title">{localized(question.prompt, lang)}</h1>
      {outcome !== 'correct' && !revealed && (
        <QuestionInput
          question={question}
          lang={lang}
          value={value}
          setValue={setValue}
          labels={labels}
        />
      )}
      {outcome === 'correct' && (
        <div className="learning-answer-feedback is-correct" role="status">
          <strong>{labels.greatJob}</strong>
          <span>{labels.xpReward} · {labels.starReward}</span>
        </div>
      )}
      {outcome === 'wrong' && (
        <div className="learning-answer-feedback is-wrong" role="status">
          <strong>{labels.almost}</strong>
          <button className="learning-hint-button" type="button" onClick={() => setShowHint(true)}>
            💡 {labels.showHint}
          </button>
          {showHint && <span className="learning-hint-copy">{localizedMessage(question, 'hint', lang)}</span>}
        </div>
      )}
      {revealed && (
        <div className="learning-answer-feedback is-wrong" role="status">
          <strong>{labels.answerRevealed}</strong>
          <span><b>{labels.correctAnswer}</b> {formatAnswer(question, lang, labels)}</span>
          <span>{localizedMessage(question, 'explanation', lang)}</span>
        </div>
      )}
      {outcome === 'correct' || revealed ? (
        <button className="btn btn-primary" type="button" onClick={goNext}><ArrowLabel>{labels.continue}</ArrowLabel></button>
      ) : (
        <button className="btn btn-primary" type="button" onClick={checkAnswer} disabled={value === '' || (question.type === 'matching' && Object.keys(value || {}).length !== question.left.length) || (outcome === 'wrong' && !showHint)}>
          {labels.check}
        </button>
      )}
    </section>
  );
}

export function FeedbackStep({ labels, correctCount, questionCount, onContinue }) {
  return (
    <section className="learning-card learning-feedback-card" aria-labelledby="learning-step-title">
      <div className="learning-feedback-illustration" aria-hidden="true">🎉</div>
      <h1 id="learning-step-title" className="learning-step-title">{labels.feedbackTitle}</h1>
      <p>{labels.feedbackBody(correctCount, questionCount)}</p>
      <button className="btn btn-primary" type="button" onClick={onContinue}><ArrowLabel>{labels.continue}</ArrowLabel></button>
    </section>
  );
}

export function RewardStep({ labels, xpEarned, starsEarned, badgeName, onNext, onRetry, onBack }) {
  return (
    <section className="learning-card learning-reward-card" aria-labelledby="learning-step-title">
      <div className="learning-reward-illustration" aria-hidden="true">🏆✨</div>
      <p className="learning-reward-kicker">{labels.unitComplete}</p>
      <h1 id="learning-step-title" className="learning-step-title">{labels.rewardTitle}</h1>
      <div className="learning-reward-totals">
        <span>⭐ {labels.starsEarned(starsEarned)}</span>
        <span>⚡ {labels.xpEarned(xpEarned)}</span>
      </div>
      {badgeName && <div className="learning-badge-sticker"><span aria-hidden="true">🏅</span>{badgeName}</div>}
      <div className="learning-reward-actions">
        <button className="btn btn-primary" type="button" onClick={onNext}>{labels.next}</button>
        <button className="btn btn-secondary" type="button" onClick={onRetry}>{labels.tryAgain}</button>
        <button className="btn btn-purple" type="button" onClick={onBack}>{labels.backToLesson}</button>
      </div>
    </section>
  );
}
