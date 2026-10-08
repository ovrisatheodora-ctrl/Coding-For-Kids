const patternUnit = {
  id: 'logic-g12-urutan',
  lessonId: 'logic-algorithms',
  grade: '1-2',
  title: {
    id: 'Urutan Langkah',
    en: 'Step Order',
  },
  material: [
    {
      key: 'material-order',
      text: {
        id: 'Urutan adalah langkah-langkah yang dilakukan satu per satu.',
        en: 'A sequence is a set of steps done one by one.',
      },
    },
    {
      key: 'material-result',
      text: {
        id: 'Kalau urutannya salah, hasilnya bisa berubah!',
        en: 'If the order is wrong, the result can change!',
      },
    },
  ],
  example: {
    sequence: [
      { id: 'bangun', symbol: '🛏️', label: { id: 'bangun tidur', en: 'wake up' } },
      { id: 'sikat', symbol: '🪥', label: { id: 'sikat gigi', en: 'brush teeth' } },
      { id: 'sekolah', symbol: '🎒', label: { id: 'siap ke sekolah', en: 'ready for school' } },
    ],
    caption: {
      id: 'Bangun tidur → Sikat gigi → Siap ke sekolah',
      en: 'Wake up → Brush teeth → Ready for school',
    },
  },
  activity: {
    type: 'order',
    title: {
      id: 'Susun kegiatan pagi Bimo dengan urutan yang benar!',
      en: 'Arrange Bimo’s morning activities in the correct order!',
    },
    items: [
      { id: 'bangun', emoji: '🛏️', label: { id: 'Bangun tidur', en: 'Wake up' } },
      { id: 'cuci', emoji: '🧼', label: { id: 'Cuci muka', en: 'Wash face' } },
      { id: 'sarapan', emoji: '🍳', label: { id: 'Sarapan', en: 'Eat breakfast' } },
      { id: 'sekolah', emoji: '🎒', label: { id: 'Berangkat sekolah', en: 'Go to school' } },
    ],
    answer: ['bangun', 'cuci', 'sarapan', 'sekolah'],
    success: {
      id: '🎉 Hebat, benar!',
      en: '🎉 Great, correct!',
    },
    retry: {
      id: 'Hampir! Coba lagi ya 💪',
      en: 'Almost! Try again 💪',
    },
  },
  questions: [
    {
      id: 'order-before-shoes',
      type: 'multiple-choice',
      prompt: {
        id: 'Sebelum memakai sepatu, kita pakai apa dulu?',
        en: 'Before wearing shoes, what do we put on first?',
      },
      options: [
        { id: 'socks', text: { id: 'Kaus kaki 🧦', en: 'Socks 🧦' } },
        { id: 'shoes', text: { id: 'Tali sepatu 👟', en: 'Shoelaces 👟' } },
      ],
      answer: 'socks',
      hint: { id: 'Kita pakai kaus kaki dulu sebelum sepatu.', en: 'We wear socks before shoes.' },
      explanation: {
        id: 'Kaus kaki dulu, lalu sepatu.',
        en: 'Socks first, then shoes.',
      },
    },
    {
      id: 'order-toast',
      type: 'multiple-choice',
      prompt: {
        id: 'Membuat roti selai: ambil roti, olesi selai, lalu...?',
        en: 'For jam toast: take the bread, spread the jam, then...?',
      },
      options: [
        { id: 'eat', text: { id: 'Makan roti 😋', en: 'Eat the toast 😋' } },
        { id: 'take-again', text: { id: 'Ambil roti lagi', en: 'Take the bread again' } },
      ],
      answer: 'eat',
      hint: { id: 'Setelah oles selai, kita makan.', en: 'After spreading jam, we eat it.' },
      explanation: {
        id: 'Kalau rotinya sudah dioles selai, saatnya makan.',
        en: 'Once the toast is spread with jam, it is time to eat.',
      },
    },
  ],
  badgeId: 'pattern-finder',
};

export default patternUnit;
