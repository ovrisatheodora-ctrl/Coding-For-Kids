import patternUnit from './pattern-unit';

const logicG12Subtopics = [
  patternUnit,
  {
    id: 'logic-g12-pola',
    lessonId: 'logic-algorithms',
    grade: '1-2',
    title: { id: 'Mengenal Pola', en: 'Discovering Patterns' },
    material: [
      { key: 'pattern-repeat', text: { id: 'Pola adalah urutan yang berulang.', en: 'A pattern is a sequence that repeats.' } },
      { key: 'pattern-rule', text: { id: 'Lihat warna atau bentuknya untuk menemukan aturan.', en: 'Look at the colors or shapes to find the rule.' } },
    ],
    example: {
      sequence: [
        { id: 'red', symbol: '🔴', label: { id: 'merah', en: 'red' } },
        { id: 'blue', symbol: '🔵', label: { id: 'biru', en: 'blue' } },
        { id: 'red-again', symbol: '🔴', label: { id: 'merah', en: 'red' } },
        { id: 'blue-again', symbol: '🔵', label: { id: 'biru', en: 'blue' } },
      ],
      caption: { id: 'Merah, biru, merah, biru... polanya berulang!', en: 'Red, blue, red, blue... the pattern repeats!' },
    },
    activity: {
      type: 'pick',
      title: { id: 'Apa yang datang selanjutnya?', en: 'What comes next?' },
      sequence: ['🔴', '🔵', '🔴', '🔵', '🔴', '❓'],
      options: ['🔴', '🔵', '🟢'],
      answer: 1,
      success: { id: '🎉 Hebat, benar!', en: '🎉 Great, correct!' },
      hint: { id: 'Hampir! Coba lagi ya 💪', en: 'Almost! Try again 💪' },
    },
    questions: [
      {
        id: 'pattern-cats',
        type: 'multiple-choice',
        prompt: { id: 'Lanjutkan pola: 🐱🐶🐱🐶❓', en: 'Continue the pattern: 🐱🐶🐱🐶❓' },
        options: [
          { id: 'cat', text: { id: '🐱', en: '🐱' } },
          { id: 'dog', text: { id: '🐶', en: '🐶' } },
        ],
        answer: 'cat',
        hint: { id: 'Pola bergantian antara kucing dan anjing.', en: 'The pattern alternates between a cat and a dog.' },
        explanation: { id: 'Setelah anjing, polanya kembali ke kucing.', en: 'After the dog, the pattern returns to the cat.' },
      },
      {
        id: 'pattern-fruit',
        type: 'multiple-choice',
        prompt: { id: 'Lanjutkan pola: 🍎🍎🍌🍎🍎❓', en: 'Continue the pattern: 🍎🍎🍌🍎🍎❓' },
        options: [
          { id: 'banana', text: { id: '🍌', en: '🍌' } },
          { id: 'apple', text: { id: '🍎', en: '🍎' } },
        ],
        answer: 'banana',
        hint: { id: 'Setelah dua apel, ada satu pisang.', en: 'After two apples, there is one banana.' },
        explanation: { id: 'Kelompok pola ini adalah dua apel lalu satu pisang.', en: 'This pattern is two apples followed by one banana.' },
      },
    ],
    badgeId: 'pattern-finder',
  },
  {
    id: 'logic-g12-arah',
    lessonId: 'logic-algorithms',
    grade: '1-2',
    title: { id: 'Perintah Arah', en: 'Direction Commands' },
    material: [
      { key: 'direction-command', text: { id: 'Komputer hanya melakukan persis apa yang kita perintahkan.', en: 'A computer does exactly what we tell it to do.' } },
      { key: 'direction-arrows', text: { id: '⬆️ maju, ⬅️ kiri, ➡️ kanan, ⬇️ mundur.', en: '⬆️ up, ⬅️ left, ➡️ right, ⬇️ down.' } },
    ],
    example: {
      sequence: [
        { id: 'robot', symbol: '🤖', label: { id: 'robot', en: 'robot' } },
        { id: 'right-1', symbol: '➡️', label: { id: 'kanan', en: 'right' } },
        { id: 'right-2', symbol: '➡️', label: { id: 'kanan', en: 'right' } },
        { id: 'star', symbol: '⭐', label: { id: 'bintang', en: 'star' } },
      ],
      caption: { id: 'Robot berjalan dua kotak ke kanan menuju bintang.', en: 'The robot moves two squares right to reach the star.' },
    },
    activity: {
      type: 'pick',
      title: { id: 'Robot 🤖 harus ke ⭐ yang ada 2 kotak di sebelah kanan. Perintahnya?', en: 'The robot 🤖 must reach ⭐ two squares to the right. Which commands?' },
      sequence: ['🤖', '⬜', '⬜', '⭐'],
      options: ['➡️ ➡️', '⬅️ ⬅️', '⬆️ ⬆️'],
      answer: 0,
      success: { id: '🎉 Hebat, benar!', en: '🎉 Great, correct!' },
      hint: { id: 'Hampir! Coba lagi ya 💪', en: 'Almost! Try again 💪' },
    },
    questions: [
      {
        id: 'direction-up',
        type: 'multiple-choice',
        prompt: { id: 'Robot mau ke atas 1 kotak. Pilih perintah:', en: 'The robot wants to move up one square. Choose a command:' },
        options: [
          { id: 'up', text: { id: '⬆️', en: '⬆️' } },
          { id: 'down', text: { id: '⬇️', en: '⬇️' } },
        ],
        answer: 'up',
        hint: { id: 'Cari panah yang menunjuk ke atas.', en: 'Find the arrow pointing up.' },
        explanation: { id: 'Panah ke atas memerintahkan robot untuk bergerak ke atas.', en: 'The up arrow tells the robot to move up.' },
      },
      {
        id: 'direction-sequence',
        type: 'multiple-choice',
        prompt: { id: '➡️ ➡️ ⬆️ artinya...', en: '➡️ ➡️ ⬆️ means...' },
        options: [
          { id: 'right-up', text: { id: 'Kanan, kanan, atas', en: 'Right, right, up' } },
          { id: 'left-down', text: { id: 'Kiri, kiri, bawah', en: 'Left, left, down' } },
        ],
        answer: 'right-up',
        hint: { id: 'Ikuti arah panah satu per satu.', en: 'Follow each arrow one by one.' },
        explanation: { id: 'Dua panah kanan lalu satu panah atas.', en: 'Two right arrows, then one up arrow.' },
      },
    ],
    badgeId: 'robot-explorer',
  },
  {
    id: 'logic-g12-perulangan',
    lessonId: 'logic-algorithms',
    grade: '1-2',
    title: { id: 'Perulangan', en: 'Loops' },
    material: [
      { key: 'loop-repeat', text: { id: 'Kalau langkahnya sama, kita bisa bilang “ulangi”.', en: 'When a step is the same, we can say “repeat”.' } },
      { key: 'loop-example', text: { id: 'Ulangi 3× lompat = lompat, lompat, lompat.', en: 'Repeat jump 3 times = jump, jump, jump.' } },
    ],
    example: {
      sequence: [
        { id: 'loop', symbol: '🔁', label: { id: 'ulangi', en: 'repeat' } },
        { id: 'three', symbol: '3️⃣', label: { id: 'tiga kali', en: 'three times' } },
        { id: 'jump-1', symbol: '🦘', label: { id: 'lompat', en: 'jump' } },
        { id: 'jump-2', symbol: '🦘', label: { id: 'lompat', en: 'jump' } },
        { id: 'jump-3', symbol: '🦘', label: { id: 'lompat', en: 'jump' } },
      ],
      caption: { id: 'Ulangi 3× lompat menjadi tiga kali lompat.', en: 'Repeat jump 3 times means jump three times.' },
    },
    activity: {
      type: 'pick',
      title: { id: '“Ulangi 2× ➡️” sama dengan...?', en: '“Repeat 2× ➡️” is the same as...?' },
      sequence: ['🔁', '2️⃣', '➡️', '❓'],
      options: ['➡️ ➡️', '➡️', '⬅️ ⬅️'],
      answer: 0,
      success: { id: '🎉 Hebat, benar!', en: '🎉 Great, correct!' },
      hint: { id: 'Hampir! Coba lagi ya 💪', en: 'Almost! Try again 💪' },
    },
    questions: [
      {
        id: 'loop-claps',
        type: 'multiple-choice',
        prompt: { id: 'Ulangi 3× 👏 sama dengan...?', en: 'Repeat 3× 👏 is the same as...?' },
        options: [
          { id: 'three-claps', text: { id: '👏👏👏', en: '👏👏👏' } },
          { id: 'two-claps', text: { id: '👏👏', en: '👏👏' } },
        ],
        answer: 'three-claps',
        hint: { id: 'Hitung tiga tepuk tangan.', en: 'Count three claps.' },
        explanation: { id: 'Tiga kali tepuk tangan berarti tiga tepuk.', en: 'Three repeats means three claps.' },
      },
      {
        id: 'loop-shorter',
        type: 'multiple-choice',
        prompt: { id: 'Mana yang lebih singkat untuk ➡️➡️➡️➡️?', en: 'Which is shorter for ➡️➡️➡️➡️?' },
        options: [
          { id: 'repeat-four', text: { id: 'Ulangi 4× ➡️', en: 'Repeat 4× ➡️' } },
          { id: 'four-arrows', text: { id: '➡️ ➡️ ➡️ ➡️', en: '➡️ ➡️ ➡️ ➡️' } },
        ],
        answer: 'repeat-four',
        hint: { id: 'Pilih perintah yang cukup ditulis sekali.', en: 'Choose the command that only needs to be written once.' },
        explanation: { id: 'Perulangan membuat perintah yang sama lebih singkat.', en: 'A loop makes repeated commands shorter.' },
      },
    ],
    badgeId: 'junior-coder',
  },
  {
    id: 'logic-g12-debugging',
    lessonId: 'logic-algorithms',
    grade: '1-2',
    title: { id: 'Cari Kesalahan', en: 'Find the Mistake' },
    material: [
      { key: 'debugging-fix', text: { id: 'Kalau hasilnya salah, cari langkah yang keliru lalu perbaiki.', en: 'If the result is wrong, find the step that went wrong and fix it.' } },
      { key: 'debugging-name', text: { id: 'Itu namanya debugging. Semua programmer melakukannya!', en: 'That is called debugging. All programmers do it!' } },
    ],
    example: {
      sequence: [
        { id: 'socks', symbol: '🧦', label: { id: 'kaus kaki', en: 'socks' } },
        { id: 'shoes', symbol: '👟', label: { id: 'sepatu', en: 'shoes' } },
        { id: 'check', symbol: '✅', label: { id: 'benar', en: 'correct' } },
      ],
      caption: { id: 'Kaus kaki dulu, baru sepatu. Kita sudah menemukan dan memperbaiki kesalahan!', en: 'Socks first, then shoes. We found and fixed the mistake!' },
    },
    activity: {
      type: 'pick',
      title: { id: 'Bimo memakai sepatu 👟 lalu kaus kaki 🧦. Bagaimana memperbaikinya?', en: 'Bimo puts on shoes 👟 then socks 🧦. How can we fix it?' },
      sequence: ['👟', '➡️', '🧦', '❓'],
      options: [
        { id: 'socks-first', text: { id: 'Kaus kaki dulu, baru sepatu', en: 'Socks first, then shoes' } },
        { id: 'shoes-first', text: { id: 'Sepatu dulu, baru kaus kaki', en: 'Shoes first, then socks' } },
      ],
      answer: 0,
      success: { id: '🎉 Hebat, benar!', en: '🎉 Great, correct!' },
      hint: { id: 'Hampir! Coba lagi ya 💪', en: 'Almost! Try again 💪' },
    },
    questions: [
      {
        id: 'debug-rain',
        type: 'multiple-choice',
        prompt: { id: 'Kalau hujan ☔, apa yang dibawa?', en: 'When it rains ☔, what should you bring?' },
        options: [
          { id: 'umbrella', text: { id: 'Payung ☂️', en: 'Umbrella ☂️' } },
          { id: 'sunglasses', text: { id: 'Kacamata hitam 🕶️', en: 'Sunglasses 🕶️' } },
        ],
        answer: 'umbrella',
        hint: { id: 'Pilih benda yang melindungi dari hujan.', en: 'Choose something that protects you from rain.' },
        explanation: { id: 'Payung membantu kita tetap kering saat hujan.', en: 'An umbrella helps keep us dry in the rain.' },
      },
      {
        id: 'debug-wall',
        type: 'multiple-choice',
        prompt: { id: 'Robot menabrak tembok. Apa yang dilakukan?', en: 'The robot bumps into a wall. What should it do?' },
        options: [
          { id: 'fix-steps', text: { id: 'Cari langkah yang salah dan perbaiki', en: 'Find the wrong step and fix it' } },
          { id: 'give-up', text: { id: 'Menyerah', en: 'Give up' } },
        ],
        answer: 'fix-steps',
        hint: { id: 'Programmer mencari penyebab masalah.', en: 'Programmers look for what caused the problem.' },
        explanation: { id: 'Debugging berarti menemukan kesalahan dan memperbaikinya.', en: 'Debugging means finding and fixing mistakes.' },
      },
    ],
    badgeId: 'problem-solver',
  },
];

export default logicG12Subtopics;
