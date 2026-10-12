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
        id: 'Urutan langkah adalah langkah-langkah yang dilakukan secara berurutan untuk menyelesaikan suatu tugas atau mencapai tujuan.',
        en: 'Step order is a sequence of actions followed to complete a task or reach a goal.',
      },
    },
    {
      key: 'material-result',
      text: {
        id: 'Jika urutan langkah salah, hasilnya juga bisa berbeda atau tidak sesuai dengan yang diharapkan.',
        en: 'If the steps are in the wrong order, the result may be different from what we expect.',
      },
    },
    {
      key: 'material-one-at-a-time',
      text: {
        id: 'Langkah dilakukan satu per satu.',
        en: 'Follow the steps one at a time.',
      },
    },
    {
      key: 'material-no-skipping',
      text: {
        id: 'Tidak boleh ada langkah yang terlewat.',
        en: 'Do not skip any steps.',
      },
    },
    {
      key: 'material-right-order',
      text: {
        id: 'Urutan harus sesuai agar hasilnya benar.',
        en: 'Keep the steps in the right order to get the correct result.',
      },
    },
  ],
  example: {
    heading: {
      id: 'Lihat Contoh Urutan Langkahnya!',
      en: 'See an Example of the Step Order!',
    },
    description: {
      id: 'Perhatikan gambar di bawah ini. Ini adalah contoh bagaimana urutan langkah yang benar dalam menyelesaikan sebuah tugas.',
      en: 'Look at the pictures below. They show the correct order of steps for completing a task.',
    },
    sequence: [
      { id: 'prepare', symbol: '🧰', label: { id: 'Ambil alat dan bahan', en: 'Gather tools and materials' } },
      { id: 'follow', symbol: '📝', label: { id: 'Kerjakan sesuai petunjuk', en: 'Follow the instructions' } },
      { id: 'check', symbol: '✅', label: { id: 'Periksa hasilnya', en: 'Check the result' } },
      { id: 'finish', symbol: '🏁', label: { id: 'Selesai!', en: 'Finished!' } },
    ],
    caption: {
      id: 'Ambil alat dan bahan → Kerjakan sesuai petunjuk → Periksa hasilnya → Selesai!',
      en: 'Gather tools and materials → Follow the instructions → Check the result → Finished!',
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
