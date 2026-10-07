const patternUnit = {
  id: 'patterns-grade-1-2',
  lessonId: 'logic-algorithms',
  grade: '1-2',
  title: {
    id: 'Mengenal Pola',
    en: 'Discover Patterns',
  },
  material: [
    {
      key: 'notice',
      text: {
        id: 'Pola adalah urutan yang berulang.',
        en: 'A pattern is a sequence that repeats.',
      },
    },
    {
      key: 'look',
      text: {
        id: 'Lihat warna atau bentuknya untuk menemukan aturan.',
        en: 'Look at the colors or shapes to find the rule.',
      },
    },
  ],
  example: {
    sequence: [
      { id: 'sun', symbol: '☀️', label: { id: 'matahari', en: 'sun' } },
      { id: 'moon', symbol: '🌙', label: { id: 'bulan', en: 'moon' } },
      { id: 'sun-2', symbol: '☀️', label: { id: 'matahari', en: 'sun' } },
      { id: 'moon-2', symbol: '🌙', label: { id: 'bulan', en: 'moon' } },
    ],
    caption: {
      id: 'Matahari, bulan, matahari, bulan. Apa yang berulang?',
      en: 'Sun, moon, sun, moon. What repeats?',
    },
  },
  activity: {
    id: 'finish-the-color-pattern',
    title: { id: 'Lengkapi polanya!', en: 'Finish the pattern!' },
    sequence: ['🍓', '🍋', '🍓', '❔'],
    options: ['🍋', '🍇', '🍓'],
    answer: '🍋',
    success: {
      id: 'Hebat! Stroberi dan lemon bergantian.',
      en: 'Great! The strawberry and lemon take turns.',
    },
    hint: {
      id: 'Warna apa yang muncul setelah stroberi?',
      en: 'Which fruit comes after the strawberry?',
    },
  },
  questions: [
    {
      id: 'pattern-rule',
      type: 'multiple-choice',
      prompt: {
        id: 'Apa yang membuat urutan disebut pola?',
        en: 'What makes a sequence a pattern?',
      },
      options: [
        { id: 'repeat', text: { id: 'Ada bagian yang berulang', en: 'A part repeats' } },
        { id: 'random', text: { id: 'Semuanya selalu berbeda', en: 'Everything is always different' } },
        { id: 'long', text: { id: 'Urutannya harus panjang', en: 'The sequence must be long' } },
      ],
      answer: 'repeat',
      hint: {
        id: 'Cari bagian yang muncul lagi.',
        en: 'Look for a part that appears again.',
      },
      explanation: {
        id: 'Pola memiliki aturan yang berulang.',
        en: 'A pattern follows a repeating rule.',
      },
    },
    {
      id: 'pattern-true-false',
      type: 'true-false',
      prompt: {
        id: '🔵 🔺 🔵 🔺 adalah pola yang berulang.',
        en: '🔵 🔺 🔵 🔺 is a repeating pattern.',
      },
      answer: true,
      hint: {
        id: 'Apakah dua bentuk pertama muncul lagi?',
        en: 'Do the first two shapes appear again?',
      },
      explanation: {
        id: 'Lingkaran dan segitiga bergantian, jadi polanya berulang.',
        en: 'The circle and triangle take turns, so the pattern repeats.',
      },
    },
    {
      id: 'sequence-order',
      type: 'sequence',
      prompt: {
        id: 'Atur langkahnya agar polanya bergantian.',
        en: 'Arrange the pieces so the pattern takes turns.',
      },
      items: [
        { id: 'square', text: { id: '🟦 Kotak', en: '🟦 Square' } },
        { id: 'circle', text: { id: '🟡 Lingkaran', en: '🟡 Circle' } },
        { id: 'square-2', text: { id: '🟦 Kotak', en: '🟦 Square' } },
        { id: 'circle-2', text: { id: '🟡 Lingkaran', en: '🟡 Circle' } },
      ],
      answer: ['circle', 'square', 'circle-2', 'square-2'],
      hint: {
        id: 'Mulai dengan lingkaran, lalu kotak.',
        en: 'Start with a circle, then a square.',
      },
      explanation: {
        id: 'Lingkaran dan kotak bergantian.',
        en: 'The circle and square take turns.',
      },
    },
    {
      id: 'matching',
      type: 'matching',
      prompt: {
        id: 'Pasangkan setiap pola dengan bentuk berikutnya.',
        en: 'Match each pattern with the shape that comes next.',
      },
      left: [
        { id: 'match-circle', text: { id: '🟡 🟦 🟡 🟦', en: '🟡 🟦 🟡 🟦' } },
        { id: 'match-heart', text: { id: '💗 ⭐ 💗 ⭐', en: '💗 ⭐ 💗 ⭐' } },
      ],
      right: [
        { id: 'next-square', text: { id: '🟦 Kotak', en: '🟦 Square' } },
        { id: 'next-heart', text: { id: '💗 Hati', en: '💗 Heart' } },
      ],
      answer: {
        'match-circle': 'next-square',
        'match-heart': 'next-heart',
      },
      hint: {
        id: 'Perhatikan bentuk yang muncul kedua.',
        en: 'Look at the second shape in each pattern.',
      },
      explanation: {
        id: 'Setiap pola mengulang dua bentuk secara bergantian.',
        en: 'Each pattern repeats two shapes in turn.',
      },
    },
    {
      id: 'pattern-completion',
      type: 'pattern',
      prompt: {
        id: 'Bentuk apa yang selanjutnya? 🐱 🐶 🐱 🐶 ❔',
        en: 'What comes next? 🐱 🐶 🐱 🐶 ❔',
      },
      options: [
        { id: 'cat', text: { id: '🐱 Kucing', en: '🐱 Cat' } },
        { id: 'dog', text: { id: '🐶 Anjing', en: '🐶 Dog' } },
        { id: 'bird', text: { id: '🐦 Burung', en: '🐦 Bird' } },
      ],
      answer: 'cat',
      hint: {
        id: 'Kucing dan anjing bergantian.',
        en: 'The cat and dog take turns.',
      },
      explanation: {
        id: 'Setelah anjing, polanya kembali ke kucing.',
        en: 'After the dog, the pattern returns to the cat.',
      },
    },
  ],
  badgeId: 'pattern-finder',
};

export default patternUnit;
