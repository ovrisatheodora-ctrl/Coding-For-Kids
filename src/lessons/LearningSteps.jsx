import { useState } from 'react';
import iosBook from '../assets/IOS BOOK.webp';
import iosEyes from '../assets/IOS Eyes.webp';
import iosLamp from '../assets/IOS Lamp.webp';
import iosLightning from '../assets/IOS Petir.webp';
import iosStar from '../assets/IOS Star.webp';
import iosChampion from '../assets/IOS Champion.webp';
import iosBadgeChampion from '../assets/IOS Badge Champion.webp';
import ArrowLabel from '../components/ArrowLabel';
import Feedback from '../components/Feedback';

function localized(value, lang) {
  return value?.[lang] || value?.id || '';
}

function feedbackText(value) {
  return (value || '')
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\p{Emoji_Modifier}/gu, '')
    .replace(/\uFE0F/gu, '')
    .replace(/\u200D/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function activityHint(value, lang, fallback) {
  const hint = feedbackText(localized(value, lang));
  return hint && !/^(hampir|almost|belum tepat|not quite)/i.test(hint) ? hint : fallback;
}

function shuffledOrder(items, correctOrder) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  if (shuffled.length > 1 && shuffled.every((item, index) => item === correctOrder[index])) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
}

export function ProgressBar({ steps, currentStep, label, onStepChange }) {
  return (
    <nav className="learning-progress" aria-label={label}>
      {steps.map((step, index) => (
        <button
          key={step.id}
          type="button"
          className={`learning-progress__step${index <= currentStep ? ' is-active' : ''}`}
          aria-current={index === currentStep ? 'step' : undefined}
          title={step.label}
          onClick={() => onStepChange?.(index)}
          aria-label={`${step.label} ${index + 1}`}
          disabled={index > currentStep}
        >
          <span className="learning-progress__dot" aria-hidden="true">
            {index < currentStep ? '✓' : index + 1}
          </span>
          <span className="learning-progress__label">{step.label}</span>
        </button>
      ))}
    </nav>
  );
}

export function LessonIntroStep({ unit, lang, labels, goToStep }) {
  const material = unit.material || [];
  const primaryMaterial = material[0];
  const reminder = material[1] || primaryMaterial;
  const keyPoints = material.slice(2);
  const example = unit.example || { sequence: [], caption: { id: '', en: '' } };
  const exampleSequence = example.sequence || [];
  const localize = (value) => (value?.[lang] || value?.id || '');

  return (
    <div className="learning-intro" aria-labelledby="learning-step-title">
      <section className="learning-intro-panel learning-intro-panel--material">
        <div className="learning-intro-tag">
          <span className="learning-intro-tag-icon">
            <img src={iosBook} alt="" aria-hidden="true" />
          </span>
          <span>{labels.materialLabel}</span>
        </div>
        <h1 id="learning-step-title" className="learning-step-title">{localize(unit.title)}</h1>
        {primaryMaterial && <p className="learning-intro-lead">{localize(primaryMaterial.text)}</p>}
        {reminder && (
          <aside className="learning-intro-reminder">
            <span className="learning-intro-reminder-icon">
              <img src={iosLamp} alt="" aria-hidden="true" />
            </span>
            <span>
              <strong>{labels.rememberLabel}</strong>
              <span>{localize(reminder.text)}</span>
            </span>
          </aside>
        )}
        <div className="learning-intro-points">
          <h2>
            <img src={iosStar} alt="" aria-hidden="true" />
            {labels.keyPointsLabel}
          </h2>
          <ul>
            {keyPoints.length ? keyPoints.map((block) => (
              <li key={block.key}>
                <span aria-hidden="true">✓</span>
                {localize(block.text)}
              </li>
            )) : (
              <li>
                <span aria-hidden="true">✓</span>
                {labels.keyPointsFallback}
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="learning-intro-panel learning-intro-panel--visual" aria-label={labels.exampleLabel}>
        <div className="learning-intro-tag">
          <span className="learning-intro-tag-icon">
            <img src={iosEyes} alt="" aria-hidden="true" />
          </span>
          <span>{labels.exampleLabel}</span>
        </div>
        <h2 className="learning-intro-example-title">
          {localize(example.heading) || labels.exampleTitle(localize(unit.title))}
        </h2>
        <p className="learning-intro-example-description">
          {localize(example.description) || labels.exampleDescription}
        </p>
        {exampleSequence.length > 0 ? (
          <ol className="learning-intro-steps">
            {exampleSequence.map((item, index) => (
              <li className="learning-intro-step" key={item.id}>
                <span className="learning-intro-step-tile" style={{ '--step-color': ['var(--blossom)', 'var(--summer-sky)', 'var(--sour-apple)', 'var(--banana)'][index % 4] }}>
                  <span className="learning-intro-step-number">{index + 1}</span>
                  <span
                    className={unit.id === 'basic-g12-ulangi-blok' && index === 3 ? 'learning-intro-step-symbol--compact' : undefined}
                    aria-hidden="true"
                  >
                    {item.symbol || '✨'}
                  </span>
                </span>
                <span>{localize(item.label)}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="learning-intro-no-example" role="status">{labels.exampleUnavailable}</div>
        )}
        {example.caption && (
          <p className="learning-intro-example-caption">{localize(example.caption)}</p>
        )}
      </section>

      <div className="learning-intro-actions">
        <button
          className="learning-intro-action learning-intro-action--next"
          type="button"
          onClick={() => goToStep?.(1)}
          aria-label={labels.continueActivity}
        >
          {labels.continueActivity}
        </button>
      </div>
    </div>
  );
}

export function ActivityStep({ activity, lang, labels, onContinue }) {
  const orderedItems = Array.isArray(activity?.items) ? activity.items : [];
  const correctOrder = Array.isArray(activity?.answer) ? activity.answer : [];
  const slotCount = Math.max(correctOrder.length, 1);
  const [slots, setSlots] = useState(() => Array(slotCount).fill(null));
  const [pool, setPool] = useState(() => shuffledOrder(orderedItems.map((item) => item.id), correctOrder));
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderResult, setOrderResult] = useState('');
  const [wrongTries, setWrongTries] = useState(0);
  const [locked, setLocked] = useState(false);
  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState('');
  const normalizedActivity = activity?.type === 'order'
    ? activity
    : {
        ...activity,
        title: activity?.title || { id: labels.completePattern, en: labels.completePattern },
        type: activity?.type || 'pick',
        sequence: Array.isArray(activity?.sequence) ? activity.sequence : Array.isArray(activity?.items) ? activity.items.map((item) => item.emoji || item.symbol || item.label?.id || item.id) : [],
        options: Array.isArray(activity?.opts) ? activity.opts : Array.isArray(activity?.options) ? activity.options : [],
        answer: activity?.answer ?? activity?.ok ?? 0,
      };

  if (normalizedActivity.type === 'order') {
    function moveItem(itemId, target) {
      if (locked) return;
      const sourceIndex = slots.indexOf(itemId);
      if (target === sourceIndex || (target === 'pool' && sourceIndex === -1)) return;

      const nextSlots = [...slots];
      const nextPool = [...pool];
      if (sourceIndex >= 0) {
        nextSlots[sourceIndex] = null;
      } else {
        const poolIndex = nextPool.indexOf(itemId);
        if (poolIndex < 0) return;
        nextPool.splice(poolIndex, 1);
      }

      if (target === 'pool') {
        nextPool.push(itemId);
      } else {
        const displacedItem = nextSlots[target];
        nextSlots[target] = itemId;
        if (displacedItem) {
          if (sourceIndex >= 0) nextSlots[sourceIndex] = displacedItem;
          else nextPool.push(displacedItem);
        }
      }

      setSlots(nextSlots);
      setPool(nextPool);
      setSelectedItem(null);
      setOrderResult('');
    }

    function handleDrop(event, target) {
      event.preventDefault();
      const itemId = event.dataTransfer.getData('text/plain');
      if (itemId) moveItem(itemId, target);
    }

    function handleCheck() {
      if (slots.some((slot) => slot === null)) {
        setOrderResult('incomplete');
        return;
      }

      const isCorrect = slots.every((value, index) => value === correctOrder[index]);
      setOrderResult(isCorrect ? 'correct' : 'wrong');
      if (!isCorrect) setWrongTries((tries) => tries + 1);
      setLocked(isCorrect);
    }

    function renderOption(itemId) {
      const item = orderedItems.find((entry) => entry.id === itemId);
      if (!item) return null;
      return (
        <button
          key={item.id}
          className={`learning-order-option${selectedItem === item.id ? ' is-selected' : ''}`}
          type="button"
          draggable={!locked}
          aria-pressed={selectedItem === item.id}
          onClick={(event) => {
            event.stopPropagation();
            if (!locked) setSelectedItem(selectedItem === item.id ? null : item.id);
          }}
          onDragStart={(event) => {
            event.currentTarget.classList.add('is-dragging');
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', item.id);
          }}
          onDragEnd={(event) => event.currentTarget.classList.remove('is-dragging')}
        >
          <span className="learning-order-option-emoji" aria-hidden="true">{item.emoji || item.symbol || '✨'}</span>
          <span className="learning-order-option-label">{localized(item.label, lang) || item.id}</span>
        </button>
      );
    }

    return (
      <section className="learning-card learning-activity-card" aria-labelledby="learning-step-title">
        <div className="learning-step-kicker">🧩</div>
        <h1 id="learning-step-title" className="learning-step-title">{localized(normalizedActivity.title, lang)}</h1>
        <div className="learning-order-board" aria-label={labels.orderActivityBoardLabel}>
          <div className="learning-order-slots">
            {slots.map((slotValue, index) => {
              const item = orderedItems.find((entry) => entry.id === slotValue);
              return (
                <div
                  key={`slot-${index}`}
                  className={`learning-order-slot${slotValue ? ' is-filled' : ''}${orderResult === 'wrong' && slotValue ? ' has-error' : ''}${orderResult === 'correct' ? ' is-correct' : ''}`}
                  data-slot={index}
                  role={slotValue ? 'group' : 'button'}
                  tabIndex={slotValue ? -1 : 0}
                  aria-label={`${index + 1}. ${slotValue ? localized(item?.label, lang) : labels.itemNumber(index + 1)}`}
                  onClick={() => {
                    if (selectedItem) moveItem(selectedItem, index);
                    else if (slotValue) moveItem(slotValue, 'pool');
                  }}
                  onKeyDown={(event) => {
                    if (event.target !== event.currentTarget || !['Enter', ' '].includes(event.key)) return;
                    event.preventDefault();
                    if (selectedItem) moveItem(selectedItem, index);
                    else if (slotValue) moveItem(slotValue, 'pool');
                  }}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDrop(event, index)}
                >
                  <span className="learning-order-slot-number" aria-hidden="true">{index + 1}</span>
                  {item && renderOption(item.id)}
                </div>
              );
            })}
          </div>
          <p className="learning-order-instructions">{labels.orderActivityInstructions}</p>
          <div
            className="learning-order-pool"
            onClick={() => selectedItem && moveItem(selectedItem, 'pool')}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, 'pool')}
            aria-label={labels.orderActivityInstructions}
          >
            {pool.map(renderOption)}
            {pool.length === 0 && <span className="learning-order-pool-empty">{labels.emptyOrderPool}</span>}
          </div>
        </div>
        <Feedback
          key={`order-${orderResult}-${wrongTries}`}
          tipe={orderResult === 'correct' ? 'benar' : orderResult ? 'salah' : undefined}
          pesan={orderResult === 'correct' ? labels.feedbackCorrect : orderResult === 'incomplete' ? labels.fillOrderSlots : labels.feedbackWrong}
          petunjuk={orderResult === 'wrong' && wrongTries >= 2 ? labels.orderActivityHint : undefined}
          labelPetunjuk={labels.feedbackHintButton}
        />
        {locked ? (
          <button className="btn btn-primary learning-activity-action learning-activity-continue" type="button" onClick={onContinue}><ArrowLabel>{labels.continue}</ArrowLabel></button>
        ) : (
          <button className="btn btn-primary learning-activity-action learning-order-check-action" type="button" onClick={handleCheck}>
            {labels.check}
          </button>
        )}
      </section>
    );
  }

  const isCorrect = result === 'correct';

  function checkChoice() {
    const answerIndex = Number.isInteger(normalizedActivity.answer)
      ? normalizedActivity.answer
      : Number.isInteger(normalizedActivity.ok)
        ? normalizedActivity.ok
        : null;
    const selectedOption = normalizedActivity.options[choice];
    const selectedValue = typeof selectedOption === 'string'
      ? selectedOption
      : selectedOption?.[lang] || selectedOption?.id;
    const isAnswerCorrect = answerIndex === null
      ? selectedValue === normalizedActivity.answer
      : choice === answerIndex;
    setResult(isAnswerCorrect ? 'correct' : 'wrong');
    if (!isAnswerCorrect) setWrongTries((tries) => tries + 1);
  }

  return (
    <section className="learning-card learning-activity-card" aria-labelledby="learning-step-title">
      <div className="learning-step-kicker">🧩</div>
      <h1 id="learning-step-title" className="learning-step-title">{localized(normalizedActivity.title, lang)}</h1>
      <div className="learning-activity-sequence" aria-label={labels.completePattern}>
        {normalizedActivity.sequence.map((item, index) => (
          <span className="learning-activity-tile" key={`${item}-${index}`} aria-hidden="true">{item}</span>
        ))}
      </div>
      <div className="learning-choice-grid">
        {normalizedActivity.options.map((option, index) => (
          <button
            className={`learning-choice learning-choice--large${choice === index ? ' is-selected' : ''}`}
            type="button"
            key={typeof option === 'string' ? option : option.id || index}
            onClick={() => {
              setChoice(index);
              setResult('');
            }}
            aria-pressed={choice === index}
          >
            {typeof option === 'string' ? option : localized(option, lang)}
          </button>
        ))}
      </div>
      <Feedback
        key={`activity-${result}-${wrongTries}`}
        tipe={result ? (isCorrect ? 'benar' : 'salah') : undefined}
        pesan={isCorrect ? labels.feedbackCorrect : labels.feedbackWrong}
        petunjuk={result === 'wrong' && wrongTries >= 2
          ? activityHint(normalizedActivity.hint, lang, labels.activityHint)
          : undefined}
        labelPetunjuk={labels.feedbackHintButton}
      />
      {isCorrect ? (
        <button className="btn btn-primary learning-activity-action learning-activity-continue" type="button" onClick={onContinue}><ArrowLabel>{labels.continue}</ArrowLabel></button>
      ) : (
        <button className="btn btn-primary learning-activity-action" type="button" onClick={checkChoice} disabled={choice === null}>
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

function normalizeQuizQuestion(question, index) {
  if (!Array.isArray(question)) {
    return question;
  }

  const [prompt, options, answerIndex = 0] = question;
  return {
    id: `quiz-${index}`,
    type: 'multiple-choice',
    prompt: typeof prompt === 'string' ? { id: prompt, en: prompt } : prompt,
    options: (Array.isArray(options) ? options : []).map((option, optionIndex) => {
      const optionId = `option-${optionIndex}`;
      if (typeof option === 'string') {
        return { id: optionId, text: { id: option, en: option } };
      }
      return {
        id: option?.id || optionId,
        text: option?.text || { id: String(option), en: String(option) },
      };
    }),
    answer: `option-${Number(answerIndex) || 0}`,
    hint: { id: 'Coba pikirkan lagi.', en: 'Try again.' },
    explanation: { id: 'Yuk cek kembali langkahnya.', en: 'Let’s review the steps again.' },
  };
}

export function QuizStep({ questions, lang, labels, onCorrect, onComplete }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [value, setValue] = useState('');
  const [wrongTries, setWrongTries] = useState(0);
  const [outcome, setOutcome] = useState('');

  const question = normalizeQuizQuestion(questions[questionIndex], questionIndex);
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
      <Feedback
        key={`${question.id}-${wrongTries}-${outcome}`}
        tipe={outcome ? (outcome === 'correct' ? 'benar' : 'salah') : undefined}
        pesan={outcome === 'correct' ? labels.feedbackCorrect : labels.feedbackWrong}
        xp={outcome === 'correct' ? 10 : undefined}
        bintang={outcome === 'correct' ? 1 : undefined}
        petunjuk={wrongTries >= 2 && outcome !== 'correct'
          ? feedbackText(localizedMessage(question, 'hint', lang)) || labels.quizHint
          : undefined}
        labelPetunjuk={labels.feedbackHintButton}
      />
      {revealed && (
        <p className="learning-answer-reveal">
          <strong>{labels.correctAnswer}</strong> {formatAnswer(question, lang, labels)}
          {' — '}{localizedMessage(question, 'explanation', lang)}
        </p>
      )}
      {outcome === 'correct' || revealed ? (
        <button className="btn btn-primary learning-continue-btn" type="button" onClick={goNext}><ArrowLabel>{labels.continue}</ArrowLabel></button>
      ) : (
        <button className="btn btn-primary" type="button" onClick={checkAnswer} disabled={value === '' || (question.type === 'matching' && Object.keys(value || {}).length !== question.left.length)}>
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
      <button className="btn btn-primary learning-continue-btn" type="button" onClick={onContinue}><ArrowLabel>{labels.continue}</ArrowLabel></button>
    </section>
  );
}

export function RewardStep({ labels, xpEarned, starsEarned, badgeName, onNext, onRetry }) {
  return (
    <section className="learning-card learning-reward-card" aria-labelledby="learning-step-title">
      <p className="learning-reward-kicker">{labels.unitComplete}</p>
      <h1 id="learning-step-title" className="learning-step-title">
        <img className="learning-reward-title-icon" src={iosChampion} alt="" aria-hidden="true" />
        {labels.rewardTitle}
      </h1>
      <div className="learning-reward-totals">
        <span>
          <img className="learning-reward-total-icon" src={iosStar} alt="" aria-hidden="true" />
          <span>{labels.starsEarned(starsEarned)}</span>
        </span>
        <span>
          <img className="learning-reward-total-icon learning-reward-total-icon--lightning" src={iosLightning} alt="" aria-hidden="true" />
          <span>{labels.xpEarned(xpEarned)}</span>
        </span>
      </div>
      {badgeName && (
        <div className="learning-badge-sticker">
          <img className="learning-badge-sticker-icon" src={iosBadgeChampion} alt="" aria-hidden="true" />
          {badgeName}
        </div>
      )}
      <div className="learning-reward-actions">
        <button className="btn learning-reward-next" type="button" onClick={onNext}>{labels.next}</button>
        <button className="btn learning-reward-retry" type="button" onClick={onRetry}>{labels.tryAgain}</button>
      </div>
    </section>
  );
}
