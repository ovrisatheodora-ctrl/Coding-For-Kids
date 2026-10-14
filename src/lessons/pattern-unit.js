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
    tasks: [
      {
        id: 'meal-order',
        type: 'order',
        title: { id: 'Susun kegiatan makan Bimo!', en: 'Put Bimo’s mealtime steps in order!' },
        items: [
          { id: 'wash-hands', emoji: '🧼', label: { id: 'Cuci tangan', en: 'Wash hands' } },
          { id: 'get-food', emoji: '🍽️', label: { id: 'Ambil makanan', en: 'Get the food' } },
          { id: 'eat', emoji: '😋', label: { id: 'Makan', en: 'Eat' } },
        ],
        answer: ['wash-hands', 'get-food', 'eat'],
      },
      {
        id: 'morning-order',
        type: 'order',
        title: { id: 'Susun kegiatan pagi Bimo!', en: 'Put Bimo’s morning activities in order!' },
        items: [
          { id: 'wake-up', emoji: '🛏️', label: { id: 'Bangun tidur', en: 'Wake up' } },
          { id: 'wash-face', emoji: '🧼', label: { id: 'Cuci muka', en: 'Wash face' } },
          { id: 'breakfast', emoji: '🍳', label: { id: 'Sarapan', en: 'Eat breakfast' } },
          { id: 'leave-school', emoji: '🎒', label: { id: 'Berangkat sekolah', en: 'Leave for school' } },
        ],
        answer: ['wake-up', 'wash-face', 'breakfast', 'leave-school'],
      },
      {
        id: 'plant-seed',
        type: 'order',
        title: { id: 'Bantu Bimo menanam biji!', en: 'Help Bimo plant a seed!' },
        items: [
          { id: 'fill-soil', emoji: '🪴', label: { id: 'Isi pot dengan tanah', en: 'Fill the pot with soil' } },
          { id: 'place-seed', emoji: '🌱', label: { id: 'Taruh biji', en: 'Place the seed' } },
          { id: 'cover-seed', emoji: '🪴', label: { id: 'Tutup dengan tanah', en: 'Cover it with soil' } },
          { id: 'water-seed', emoji: '💧', label: { id: 'Siram air', en: 'Water it' } },
        ],
        answer: ['fill-soil', 'place-seed', 'cover-seed', 'water-seed'],
      },
      {
        id: 'after-school',
        type: 'order',
        title: { id: 'Susun kegiatan Bimo setelah pulang sekolah!', en: 'Put Bimo’s after-school activities in order!' },
        items: [
          { id: 'take-off-shoes', emoji: '👟', label: { id: 'Buka sepatu', en: 'Take off shoes' } },
          { id: 'put-bag-away', emoji: '🎒', label: { id: 'Taruh tas', en: 'Put the bag away' } },
          { id: 'wash-after-school', emoji: '🧼', label: { id: 'Cuci tangan', en: 'Wash hands' } },
          { id: 'lunch', emoji: '🍽️', label: { id: 'Makan siang', en: 'Eat lunch' } },
        ],
        answer: ['take-off-shoes', 'put-bag-away', 'wash-after-school', 'lunch'],
      },
    ],
    success: { id: '🎉 Hebat, benar!', en: '🎉 Great, correct!' },
    hint: { id: 'Hampir! Coba susun lagi ya 💪', en: 'Almost! Try arranging them again 💪' },
  },
  questions: [
    {
      id: 'morning-first',
      type: 'multiple-choice',
      prompt: {
        id: 'Pagi hari, apa yang dilakukan PERTAMA?',
        en: 'In the morning, what do you do FIRST?',
      },
      options: [
        { id: 'wake-up', text: { id: 'Bangun tidur', en: 'Wake up' } },
        { id: 'breakfast', text: { id: 'Sarapan', en: 'Eat breakfast' } },
        { id: 'leave', text: { id: 'Berangkat sekolah', en: 'Leave for school' } },
      ],
      answer: 'wake-up',
      hint: { id: 'Kegiatan pagi dimulai saat kita bangun tidur.', en: 'The morning starts when we wake up.' },
      explanation: {
        id: 'Bangun tidur dilakukan sebelum sarapan dan berangkat sekolah.',
        en: 'Wake up before eating breakfast and leaving for school.',
      },
    },
    {
      id: 'brush-teeth-last',
      type: 'multiple-choice',
      prompt: {
        id: 'Saat sikat gigi, apa yang dilakukan TERAKHIR?',
        en: 'When brushing your teeth, what do you do LAST?',
      },
      options: [
        { id: 'get-brush', text: { id: 'Ambil sikat gigi', en: 'Get your toothbrush' } },
        { id: 'toothpaste', text: { id: 'Beri pasta gigi', en: 'Put toothpaste on it' } },
        { id: 'rinse', text: { id: 'Kumur dengan air', en: 'Rinse with water' } },
      ],
      answer: 'rinse',
      hint: { id: 'Setelah sikat gigi, bersihkan mulut dengan air.', en: 'After brushing, clean your mouth with water.' },
      explanation: {
        id: 'Setelah mengambil sikat dan memberi pasta gigi, kita sikat gigi lalu berkumur.',
        en: 'After getting the brush and toothpaste, brush your teeth and then rinse.',
      },
    },
    {
      id: 'meal-order-correct',
      type: 'multiple-choice',
      prompt: {
        id: 'Mana urutan kegiatan makan yang benar?',
        en: 'Which is the correct order for mealtime?',
      },
      options: [
        { id: 'eat-wash-get', text: { id: 'Makan → cuci tangan → ambil makanan', en: 'Eat → wash hands → get food' } },
        { id: 'wash-get-eat', text: { id: 'Cuci tangan → ambil makanan → makan', en: 'Wash hands → get food → eat' } },
        { id: 'get-eat-wash', text: { id: 'Ambil makanan → makan → cuci tangan', en: 'Get food → eat → wash hands' } },
      ],
      answer: 'wash-get-eat',
      hint: { id: 'Cuci tangan sebelum menyentuh makanan.', en: 'Wash your hands before touching food.' },
      explanation: {
        id: 'Cuci tangan dulu, ambil makanan, lalu makan.',
        en: 'Wash your hands first, get the food, then eat.',
      },
    },
    {
      id: 'shoes-socks-order',
      type: 'multiple-choice',
      prompt: {
        id: 'Bimo memakai sepatu dulu, baru kaus kaki. Apa yang salah?',
        en: 'Bimo puts on shoes before socks. What is wrong?',
      },
      options: [
        { id: 'reversed', text: { id: 'Urutannya terbalik', en: 'The order is backwards' } },
        { id: 'small-shoes', text: { id: 'Sepatunya kecil', en: 'The shoes are too small' } },
        { id: 'dirty-socks', text: { id: 'Kaus kakinya kotor', en: 'The socks are dirty' } },
      ],
      answer: 'reversed',
      hint: { id: 'Kaus kaki dipakai sebelum sepatu.', en: 'Socks go on before shoes.' },
      explanation: {
        id: 'Kaus kaki harus dipakai sebelum sepatu, jadi urutannya terbalik.',
        en: 'Socks should go on before shoes, so the order is backwards.',
      },
    },
    {
      id: 'plant-missing-step',
      type: 'multiple-choice',
      prompt: {
        id: 'Siapkan pot, isi tanah, ..., siram air. Apa yang hilang?',
        en: 'Prepare a pot, add soil, ..., water it. What is missing?',
      },
      options: [
        { id: 'place-seed', text: { id: 'Taruh biji', en: 'Place the seed' } },
        { id: 'sleep', text: { id: 'Tidur', en: 'Sleep' } },
        { id: 'eat', text: { id: 'Makan', en: 'Eat' } },
      ],
      answer: 'place-seed',
      hint: { id: 'Pilih langkah yang membantu tanaman tumbuh.', en: 'Choose the step that helps a plant grow.' },
      explanation: {
        id: 'Setelah mengisi pot dengan tanah, taruh biji sebelum menyiramnya.',
        en: 'After filling the pot with soil, place the seed before watering it.',
      },
    },
  ],
  badgeId: 'pattern-finder',
};

export default patternUnit;
