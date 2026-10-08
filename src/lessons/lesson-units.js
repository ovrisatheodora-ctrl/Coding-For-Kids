import logicG12Subtopics from './logic-g12-subtopics';
import { basicCodingSubtopics, creativeCodingSubtopics } from './grade12-theme-subtopics';

const logicG34Algorithms = {
  id: 'logic-g34-algorithms',
  lessonId: 'logic-algorithms',
  grade: '3-4',
  title: {
    id: 'Algoritma dalam Kehidupan',
    en: 'Algorithms in Daily Life',
  },
  material: [
    {
      key: 'algorithm-order',
      text: {
        id: 'Algoritma adalah daftar langkah yang berurutan untuk menyelesaikan masalah.',
        en: 'An algorithm is a list of steps in the right order to solve a problem.',
      },
    },
    {
      key: 'wrong-order',
      text: {
        id: 'Urutan salah, hasil salah. Coba pakai sepatu sebelum kaus kaki!',
        en: 'Wrong order, wrong result. Try putting on your shoes before your socks!',
      },
    },
    {
      key: 'computer-follows',
      text: {
        id: 'Komputer juga mengikuti algoritma.',
        en: 'Computers follow algorithms too.',
      },
    },
  ],
  example: {
    sequence: [
      { id: 'wet', symbol: '🚰', label: { id: 'basahi tangan', en: 'wet hands' } },
      { id: 'soap', symbol: '🧼', label: { id: 'pakai sabun', en: 'add soap' } },
      { id: 'scrub', symbol: '👏', label: { id: 'gosok 20 detik', en: 'scrub for 20 seconds' } },
      { id: 'rinse', symbol: '💦', label: { id: 'bilas', en: 'rinse' } },
      { id: 'dry', symbol: '🧻', label: { id: 'keringkan', en: 'dry' } },
    ],
    caption: {
      id: 'Basahi tangan → Pakai sabun → Gosok 20 detik → Bilas → Keringkan',
      en: 'Wet hands → Add soap → Scrub for 20 seconds → Rinse → Dry',
    },
  },
  activity: {
    id: 'make-bread',
    title: { id: 'Susun langkah membuat roti', en: 'Make bread in order' },
    sequence: ['Mix flour and water', 'Knead the dough', 'Let the dough rest', 'Bake in the oven', 'Enjoy the bread'],
    options: ['Mix flour and water', 'Knead the dough', 'Let the dough rest', 'Bake in the oven', 'Enjoy the bread'],
    answer: 'Knead the dough',
    success: {
      id: 'Hebat! Kamu tahu urutan yang benar.',
      en: 'Great! You know the right order.',
    },
    hint: {
      id: 'Mulai dengan adonan, lalu diamkan, lalu panggang.',
      en: 'Start with the dough, then rest it, then bake it.',
    },
  },
  questions: [
    {
      id: 'algorithm-what',
      type: 'multiple-choice',
      prompt: { id: 'Apa itu algoritma?', en: 'What is an algorithm?' },
      options: [
        { id: 'steps', text: { id: 'Daftar langkah yang berurutan', en: 'A list of steps in order' } },
        { id: 'robot', text: { id: 'Sejenis robot', en: 'A type of robot' } },
        { id: 'score', text: { id: 'Skor permainan', en: 'A game score' } },
      ],
      answer: 'steps',
      hint: { id: 'Pikirkan resep masakan.', en: 'Think of a recipe.' },
      explanation: { id: 'Algoritma adalah langkah berurutan, seperti resep.', en: 'An algorithm is steps in order, like a recipe.' },
    },
    {
      id: 'algorithm-order',
      type: 'true-false',
      prompt: { id: 'Kalau urutan langkah diubah, hasilnya bisa berubah.', en: 'If you change the order of the steps, the result can change.' },
      answer: true,
      hint: { id: 'Bagaimana kalau membilas sebelum memakai sabun?', en: 'What if you rinse before adding soap?' },
      explanation: { id: 'Urutan itu penting agar langkah-langkah bekerja dengan benar.', en: 'Order matters so the steps work correctly.' },
    },
    {
      id: 'brush-teeth',
      type: 'sequence',
      prompt: { id: 'Urutkan langkah menyikat gigi.', en: 'Put the steps for brushing teeth in order.' },
      items: [
        { id: 'toothpaste', text: { id: 'Berikan pasta gigi di sikat', en: 'Put toothpaste on the brush' } },
        { id: 'brush', text: { id: 'Sikat semua gigi', en: 'Brush all your teeth' } },
        { id: 'rinse mouth', text: { id: 'Kumur', en: 'Rinse your mouth' } },
        { id: 'put away', text: { id: 'Simpan sikat gigi', en: 'Put the brush away' } },
      ],
      answer: ['toothpaste', 'brush', 'rinse mouth', 'put away'],
      hint: { id: 'Apa yang dilakukan sebelum menyikat?', en: 'What do you do first, before brushing?' },
      explanation: { id: 'Kita mulai dengan pasta gigi lalu sikat, kumur, dan simpan alatnya.', en: 'We start with toothpaste, then brush, rinse, and put it away.' },
    },
    {
      id: 'goal-match',
      type: 'matching',
      prompt: { id: 'Cocokkan tujuan dengan langkah pertamanya.', en: 'Match the goal with its first step.' },
      left: [
        { id: 'tea', text: { id: 'Membuat teh', en: 'Make tea' } },
        { id: 'school', text: { id: 'Pergi sekolah', en: 'Go to school' } },
        { id: 'plate', text: { id: 'Mencuci piring', en: 'Wash a plate' } },
      ],
      right: [
        { id: 'boil', text: { id: 'Rebus air', en: 'Boil water' } },
        { id: 'bag', text: { id: 'Siapkan tas', en: 'Pack your bag' } },
        { id: 'wet', text: { id: 'Basahi piring', en: 'Wet the plate' } },
      ],
      answer: {
        tea: 'boil',
        school: 'bag',
        plate: 'wet',
      },
      hint: { id: 'Pikirkan langkah yang harus dilakukan paling dulu.', en: 'Think of the first necessary step.' },
      explanation: { id: 'Setiap tujuan dimulai dengan langkah yang benar untuk memulai.', en: 'Each goal starts with the right first step.' },
    },
  ],
  badgeId: 'problem-solver',
};

const logicG56LoopsBugs = {
  id: 'logic-g56-loops-bugs',
  lessonId: 'logic-algorithms',
  grade: '5-6',
  title: {
    id: 'Perulangan & Berburu Bug',
    en: 'Loops & Bug Hunting',
  },
  material: [
    {
      key: 'loop-repeat',
      text: {
        id: 'Perulangan mengulang perintah, jadi kodenya lebih pendek.',
        en: 'A loop repeats commands, so we write less code.',
      },
    },
    {
      key: 'efficient-code',
      text: {
        id: 'Kode efisien mencapai hasil yang sama dengan langkah lebih sedikit.',
        en: 'Efficient code reaches the same result with fewer steps.',
      },
    },
    {
      key: 'debugging',
      text: {
        id: 'Bug adalah kesalahan dalam kode. Debugging berarti menemukan dan memperbaikinya.',
        en: 'A bug is a mistake in code. Debugging means finding and fixing it.',
      },
    },
  ],
  example: {
    sequence: [
      { id: 'forward', symbol: '➡️', label: { id: 'maju', en: 'forward' } },
      { id: 'turn', symbol: '↻', label: { id: 'belok', en: 'turn' } },
      { id: 'forward-2', symbol: '➡️', label: { id: 'maju', en: 'forward' } },
      { id: 'turn-2', symbol: '↻', label: { id: 'belok', en: 'turn' } },
      { id: 'forward-3', symbol: '➡️', label: { id: 'maju', en: 'forward' } },
      { id: 'turn-3', symbol: '↻', label: { id: 'belok', en: 'turn' } },
      { id: 'forward-4', symbol: '➡️', label: { id: 'maju', en: 'forward' } },
      { id: 'turn-4', symbol: '↻', label: { id: 'belok', en: 'turn' } },
    ],
    caption: {
      id: 'Tanpa loop: 8 baris. Dengan loop: 1 baris yang diulang 4 kali.',
      en: 'Without loop: 8 lines. With loop: 1 line repeated 4 times.',
    },
  },
  activity: {
    id: 'debugging-cycle',
    title: { id: 'Susun siklus debugging', en: 'The debugging cycle' },
    sequence: ['Jalankan program', 'Amati hasilnya', 'Temukan letak bug', 'Perbaiki bug', 'Jalankan lagi'],
    options: ['Run the program', 'Observe what happens', 'Locate the bug', 'Fix the bug', 'Run it again'],
    answer: 'Observe what happens',
    success: {
      id: 'Siklus debugging sudah benar! Kejar bug dengan tenang.',
      en: 'The debugging cycle is correct! Chase bugs calmly.',
    },
    hint: {
      id: 'Mulai dengan menjalankan program lalu melihat hasilnya.',
      en: 'Start by running the program and seeing what happens.',
    },
  },
  questions: [
    {
      id: 'loop-best-choice',
      type: 'multiple-choice',
      prompt: { id: 'Robot harus maju 6 kali. Kode mana yang terbaik?', en: 'The robot must move forward 6 times. Which code is the best?' },
      options: [
        { id: 'forward-6', text: { id: 'forward ditulis 6 kali', en: 'forward written 6 times' } },
        { id: 'repeat-6', text: { id: 'repeat 6 [ forward ]', en: 'repeat 6 [ forward ]' } },
        { id: 'repeat-5', text: { id: 'repeat 5 [ forward ]', en: 'repeat 5 [ forward ]' } },
      ],
      answer: 'repeat-6',
      hint: { id: 'Kode terpendek yang tetap benar.', en: 'Shortest code that is still correct.' },
      explanation: { id: 'Perulangan membuat program lebih singkat dan tetap benar.', en: 'A loop makes the program shorter and still correct.' },
    },
    {
      id: 'repeat-jumps',
      type: 'multiple-choice',
      prompt: { id: 'Berapa kali melompat?', en: 'repeat 3 [ clap, jump ]: how many jumps?' },
      options: [
        { id: '2', text: { id: '2', en: '2' } },
        { id: '3', text: { id: '3', en: '3' } },
        { id: '6', text: { id: '6', en: '6' } },
      ],
      answer: '3',
      hint: { id: 'Seluruh blok diulang 3 kali.', en: 'The whole block repeats 3 times.' },
      explanation: { id: 'Setiap pengulangan mencakup jump 1 kali, jadi ada 3 lompatan.', en: 'Each repetition includes one jump, so there are 3 jumps.' },
    },
    {
      id: 'square-bug',
      type: 'multiple-choice',
      prompt: { id: 'Kode ini harusnya menggambar persegi. Apa bug-nya?', en: 'repeat 3 [ forward 10, turn right 90 ] should draw a square. What is the bug?' },
      options: [
        { id: 'repeat-4', text: { id: 'Harusnya diulang 4 kali, bukan 3', en: 'It should repeat 4 times, not 3' } },
        { id: 'left', text: { id: 'Harusnya belok kiri', en: 'It should turn left' } },
        { id: 'forward-100', text: { id: 'Harusnya maju 100', en: 'It should go forward 100' } },
      ],
      answer: 'repeat-4',
      hint: { id: 'Persegi punya berapa sisi?', en: 'A square has how many sides?' },
      explanation: { id: 'Persegi membutuhkan 4 sisi, jadi pengulangan harus 4 kali.', en: 'A square needs 4 sides, so the loop should repeat 4 times.' },
    },
    {
      id: 'bug-always-stops',
      type: 'true-false',
      prompt: { id: 'Bug selalu membuat komputer berhenti bekerja.', en: 'A bug always makes the computer stop working.' },
      answer: false,
      hint: { id: 'Banyak bug memberi jawaban yang salah secara diam-diam.', en: 'Many bugs give a wrong answer quietly.' },
      explanation: { id: 'Banyak bug membuat program salah tanpa berhenti total.', en: 'Many bugs make the program wrong without stopping entirely.' },
    },
    {
      id: 'debug-match',
      type: 'matching',
      prompt: { id: 'Cocokkan langkah debugging dengan tindakannya.', en: 'Match the debugging step with what you do.' },
      left: [
        { id: 'run', text: { id: 'Jalankan', en: 'Run' } },
        { id: 'locate', text: { id: 'Temukan', en: 'Locate' } },
        { id: 'fix', text: { id: 'Perbaiki', en: 'Fix' } },
      ],
      right: [
        { id: 'see', text: { id: 'Lihat apa yang terjadi', en: 'See what happens' } },
        { id: 'wrong-line', text: { id: 'Cari baris yang salah', en: 'Find the wrong line' } },
        { id: 'change-code', text: { id: 'Ubah kodenya', en: 'Change the code' } },
      ],
      answer: {
        run: 'see',
        locate: 'wrong-line',
        fix: 'change-code',
      },
      hint: { id: 'Apa yang biasanya pertama kali kamu lakukan?', en: 'What do you usually do first?' },
      explanation: { id: 'Debugging adalah urutan: jalankan, cari, lalu perbaiki.', en: 'Debugging is run, find, then fix.' },
    },
  ],
  badgeId: 'bug-hunter',
};

const basicG12Directions = {
  id: 'basic-g12-directions',
  showInCatalog: false,
  lessonId: 'basic-coding',
  grade: '1-2',
  title: {
    id: 'Mengenal Coding & Arah',
    en: 'Meet Coding & Directions',
  },
  material: [
    { key: 'coding-is', text: { id: 'Coding artinya memberi perintah kepada komputer.', en: 'Coding means giving instructions to a computer.' } },
    { key: 'computer-does', text: { id: 'Komputer melakukan persis apa yang kita perintahkan.', en: 'A computer does exactly what we tell it.' } },
    { key: 'directions', text: { id: 'Arah: ⬆️ atas, ⬇️ bawah, ⬅️ kiri, ➡️ kanan.', en: 'Directions: ⬆️ up, ⬇️ down, ⬅️ left, ➡️ right.' } },
  ],
  example: {
    sequence: [
      { id: 'robot', symbol: '🤖', label: { id: 'robot', en: 'robot' } },
      { id: 'star', symbol: '⭐', label: { id: 'bintang', en: 'star' } },
    ],
    caption: { id: '🤖 mulai dari kiri. ⭐ ada dua langkah ke kanan. Perintah: ➡️ ➡️', en: 'The robot starts on the left. The star is two steps to the right. Commands: ➡️ ➡️' },
  },
  activity: {
    id: 'robot-star',
    title: { id: 'Bantu robot sampai ke bintang', en: 'Help the robot reach the star' },
    sequence: ['➡️', '➡️', '⬇️', '⬇️'],
    options: ['➡️', '⬇️', '⬅️', '⬆️'],
    answer: '➡️',
    success: { id: 'Hebat! Ke kanan dulu, lalu ke bawah.', en: 'Great! Go right first, then down.' },
    hint: { id: 'Ke kanan dulu, baru ke bawah.', en: 'First go right, then go down.' },
  },
  questions: [
    {
      id: 'coding-definition',
      type: 'multiple-choice',
      prompt: { id: 'Apa itu coding?', en: 'What is coding?' },
      options: [
        { id: 'instructions', text: { id: 'Memberi perintah ke komputer', en: 'Giving instructions to a computer' } },
        { id: 'drawing', text: { id: 'Menggambar', en: 'Drawing a picture' } },
        { id: 'sleep', text: { id: 'Tidur siang', en: 'Taking a nap' } },
      ],
      answer: 'instructions',
      hint: { id: 'Coding memberi instruksi ke komputer.', en: 'Coding gives instructions to the computer.' },
      explanation: { id: 'Coding berarti memberi instruksi agar komputer melakukan tugas.', en: 'Coding means giving instructions so a computer can do a task.' },
    },
    {
      id: 'robot-up',
      type: 'multiple-choice',
      prompt: { id: 'Robot mau ke atas. Panah yang mana?', en: 'The robot wants to go up. Which arrow?' },
      options: [
        { id: 'up', text: { id: '⬆️', en: '⬆️' } },
        { id: 'down', text: { id: '⬇️', en: '⬇️' } },
        { id: 'left', text: { id: '⬅️', en: '⬅️' } },
      ],
      answer: 'up',
      hint: { id: 'Atas itu ke arah langit.', en: 'Up is toward the sky.' },
      explanation: { id: 'Up berarti ke atas, sesuai arah langit.', en: 'Up means upward, toward the sky.' },
    },
    {
      id: 'no-instructions',
      type: 'true-false',
      prompt: { id: 'Komputer tahu maksud kita tanpa perintah.', en: 'A computer knows what we mean without instructions.' },
      answer: false,
      hint: { id: 'Komputer hanya mengikuti instruksi yang jelas.', en: 'Computers only follow clear instructions.' },
      explanation: { id: 'Komputer tidak bisa membaca pikiran. Ia butuh langkah yang jelas.', en: 'Computers cannot read minds. They need clear steps.' },
    },
    {
      id: 'direction-matching',
      type: 'matching',
      prompt: { id: 'Cocokkan panah dengan arahnya.', en: 'Match the arrow with the direction.' },
      left: [
        { id: 'up', text: { id: '⬆️', en: '⬆️' } },
        { id: 'down', text: { id: '⬇️', en: '⬇️' } },
        { id: 'left', text: { id: '⬅️', en: '⬅️' } },
        { id: 'right', text: { id: '➡️', en: '➡️' } },
      ],
      right: [
        { id: 'up-name', text: { id: 'Atas', en: 'Up' } },
        { id: 'down-name', text: { id: 'Bawah', en: 'Down' } },
        { id: 'left-name', text: { id: 'Kiri', en: 'Left' } },
        { id: 'right-name', text: { id: 'Kanan', en: 'Right' } },
      ],
      answer: {
        up: 'up-name',
        down: 'down-name',
        left: 'left-name',
        right: 'right-name',
      },
      hint: { id: 'Ingat arah mata angin.', en: 'Remember the direction names.' },
      explanation: { id: 'Setiap panah mewakili satu arah yang jelas.', en: 'Each arrow points in a clear direction.' },
    },
  ],
  badgeId: 'robot-explorer',
};

const basicG34SequenceEvents = {
  id: 'basic-g34-sequence-events',
  lessonId: 'basic-coding',
  grade: '3-4',
  title: {
    id: 'Urutan Kode & Pemicu',
    en: 'Sequence & Events',
  },
  material: [
    { key: 'top-bottom', text: { id: 'Blok kode berjalan dari atas ke bawah, satu per satu.', en: 'Code blocks run from top to bottom, one by one.' } },
    { key: 'event', text: { id: 'Pemicu (event) adalah kejadian yang memulai sebuah aksi.', en: 'An event is something that happens and starts an action.' } },
    { key: 'click-sound', text: { id: 'Contoh: saat kamu klik 🖱️, suara berbunyi 🔊.', en: 'Example: when you click 🖱️, a sound plays 🔊.' } },
  ],
  example: {
    sequence: [
      { id: 'click', symbol: '▶️', label: { id: 'klik', en: 'click' } },
      { id: 'move', symbol: '🚶', label: { id: 'maju', en: 'move' } },
      { id: 'say', symbol: '💬', label: { id: 'ucap', en: 'say' } },
    ],
    caption: { id: 'Saat ▶ diklik → maju 10 langkah → ucapkan "Halo!"', en: 'When ▶ clicked → move 10 steps → say "Hello!"' },
  },
  activity: {
    id: 'cat-says-hi',
    title: { id: 'Kucing menyapa dan melompat', en: 'Cat says hi and jumps' },
    sequence: ['Saat ▶ diklik', 'Ucapkan "Hai!"', 'Lompat', 'Ucapkan "Dadah!"'],
    options: ['When ▶ clicked', 'Say "Hi!"', 'Jump', 'Say "Bye!"'],
    answer: 'Say "Hi!"',
    success: { id: 'Hebat! Urutannya sesuai.', en: 'Great! That order matches.' },
    hint: { id: 'Mulai dengan pemicu, lalu ucapkan salam.', en: 'Start with the trigger, then say hello.' },
  },
  questions: [
    {
      id: 'order-run',
      type: 'multiple-choice',
      prompt: { id: 'Blok kode berjalan dengan urutan apa?', en: 'In what order do code blocks run?' },
      options: [
        { id: 'top-bottom', text: { id: 'Dari atas ke bawah', en: 'Top to bottom' } },
        { id: 'bottom-top', text: { id: 'Dari bawah ke atas', en: 'Bottom to top' } },
        { id: 'random', text: { id: 'Acak', en: 'Randomly' } },
      ],
      answer: 'top-bottom',
      hint: { id: 'Blok paling atas biasanya dijalankan lebih dulu.', en: 'The top block usually runs first.' },
      explanation: { id: 'Blok berjalan satu per satu dari atas ke bawah.', en: 'Blocks run one by one from top to bottom.' },
    },
    {
      id: 'event-match',
      type: 'matching',
      prompt: { id: 'Cocokkan pemicu dengan aksinya.', en: 'Match the event with the action.' },
      left: [
        { id: 'click', text: { id: 'Klik tombol', en: 'Click the button' } },
        { id: 'space', text: { id: 'Tekan spasi', en: 'Press space' } },
        { id: 'touch-star', text: { id: 'Sentuh bintang', en: 'Touch the star' } },
      ],
      right: [
        { id: 'door', text: { id: 'Pintu terbuka', en: 'The door opens' } },
        { id: 'jump', text: { id: 'Karakter melompat', en: 'The character jumps' } },
        { id: 'score', text: { id: 'Skor bertambah', en: 'The score goes up' } },
      ],
      answer: {
        click: 'door',
        space: 'jump',
        'touch-star': 'score',
      },
      hint: { id: 'Pikirkan apa yang terjadi setelah aksi terjadi.', en: 'Think about what happens after the event.' },
      explanation: { id: 'Event memicu aksi tertentu.', en: 'An event triggers a specific action.' },
    },
    {
      id: 'event-true',
      type: 'true-false',
      prompt: { id: 'Pemicu adalah sesuatu yang memulai aksi.', en: 'An event is something that starts an action.' },
      answer: true,
      hint: { id: 'Apakah klik tombol bisa memulai program?', en: 'Can clicking a button start an action?' },
      explanation: { id: 'Pemicu memicu sesuatu agar terjadi.', en: 'An event triggers something to happen.' },
    },
    {
      id: 'event-block',
      type: 'multiple-choice',
      prompt: { id: 'Stack: `When ▶ clicked`, `move 10`, `turn right`. Blok mana yang merupakan pemicu?', en: 'Stack: `When ▶ clicked`, `move 10`, `turn right`. Which block is the event?' },
      options: [
        { id: 'when-clicked', text: { id: 'When ▶ clicked', en: 'When ▶ clicked' } },
        { id: 'move-10', text: { id: 'move 10', en: 'move 10' } },
        { id: 'turn-right', text: { id: 'turn right', en: 'turn right' } },
      ],
      answer: 'when-clicked',
      hint: { id: 'Blok mana yang memulai program?', en: 'Which block starts the whole program?' },
      explanation: { id: 'Pemicu adalah blok yang memulai aksi.', en: 'The event is the block that starts the action.' },
    },
  ],
  badgeId: 'junior-coder',
};

const basicG56IfElseFix = {
  id: 'basic-g56-ifelse-fix',
  lessonId: 'basic-coding',
  grade: '5-6',
  title: {
    id: 'If/Else & Perbaiki Kode',
    en: 'If / Else & Fix the Code',
  },
  material: [
    { key: 'if-check', text: { id: '`if` memeriksa kondisi. Jika benar, kodenya berjalan.', en: '`if` checks a condition. If it is true, the code runs.' } },
    { key: 'else-check', text: { id: '`else` berjalan saat kondisinya salah.', en: '`else` runs when the condition is false.' } },
    { key: 'fix-code', text: { id: 'Untuk memperbaiki kode: jalankan, amati, temukan bug, perbaiki, jalankan lagi.', en: 'To fix code: run, observe, locate the bug, fix, run again.' } },
  ],
  example: {
    sequence: [
      { id: 'if', symbol: 'if', label: { id: 'jika', en: 'if' } },
      { id: 'umbrella', symbol: '☂️', label: { id: 'payung', en: 'umbrella' } },
      { id: 'else', symbol: 'else', label: { id: 'selain itu', en: 'else' } },
      { id: 'hat', symbol: '🧢', label: { id: 'topi', en: 'hat' } },
    ],
    caption: { id: 'Jika hujan → bawa payung ☂️ jika tidak → pakai topi 🧢', en: 'if raining → take umbrella ☂️ else → wear a hat 🧢' },
  },
  activity: {
    id: 'decision-build',
    title: { id: 'Susun keputusan', en: 'Build the decision' },
    sequence: ['if score > 5', 'say "You win!"', 'else', 'say "Try again!"'],
    options: ['if score > 5', 'say "You win!"', 'else', 'say "Try again!"'],
    answer: 'say "You win!"',
    success: { id: 'Keputusanmu sudah benar!', en: 'Your decision is correct!' },
    hint: { id: 'Mulai dari kondisi, lalu pilih cabang yang tepat.', en: 'Start with the condition, then choose the right branch.' },
  },
  questions: [
    {
      id: 'score-three',
      type: 'multiple-choice',
      prompt: { id: '`score = 3`. `if score > 5 say "Win" else say "Try again"`. Apa yang diucapkan?', en: '`score = 3`. `if score > 5 say "Win" else say "Try again"`. What is said?' },
      options: [
        { id: 'win', text: { id: 'Win', en: 'Win' } },
        { id: 'try-again', text: { id: 'Try again', en: 'Try again' } },
      ],
      answer: 'try-again',
      hint: { id: 'Apakah 3 lebih besar dari 5?', en: 'Is 3 bigger than 5?' },
      explanation: { id: 'Karena 3 tidak lebih besar dari 5, cabang else berjalan.', en: 'Because 3 is not greater than 5, the else branch runs.' },
    },
    {
      id: 'else-true',
      type: 'true-false',
      prompt: { id: '`else` berjalan saat kondisi `if` benar.', en: '`else` runs when the `if` condition is true.' },
      answer: false,
      hint: { id: 'Else adalah cabang saat kondisi salah.', en: 'Else is the branch when the condition is false.' },
      explanation: { id: '`else` hanya berjalan saat `if` tidak benar.', en: '`else` only runs when `if` is not true.' },
    },
    {
      id: 'wrong-message',
      type: 'multiple-choice',
      prompt: { id: 'Kode: `if score > 5 say "Lose" else say "Win"`. Dengan score = 8 kita ingin "Win". Apa bug-nya?', en: 'Code: `if score > 5 say "Lose" else say "Win"`. With score = 8 we want "Win". What is the bug?' },
      options: [
        { id: 'swapped', text: { id: 'Dua pesannya tertukar', en: 'The two messages are swapped' } },
        { id: 'small-score', text: { id: 'Skornya terlalu kecil', en: 'The score is too small' } },
        { id: 'none', text: { id: 'Tidak ada bug', en: 'There is no bug' } },
      ],
      answer: 'swapped',
      hint: { id: 'Saat skor 8, cabang mana yang berjalan?', en: 'When score is 8, which branch runs?' },
      explanation: { id: 'Dengan 8, if benar dan seharusnya menampilkan "Win".', en: 'With 8, the if branch is true and should display "Win".' },
    },
    {
      id: 'condition-true-false',
      type: 'matching',
      prompt: { id: 'Apakah kondisinya benar atau salah?', en: 'Is the condition true or false?' },
      left: [
        { id: 'five-greater-three', text: { id: '5 > 3', en: '5 > 3' } },
        { id: 'two-greater-nine', text: { id: '2 > 9', en: '2 > 9' } },
        { id: 'four-equal-four', text: { id: '4 = 4', en: '4 = 4' } },
      ],
      right: [
        { id: 'true', text: { id: 'Benar', en: 'True' } },
        { id: 'false', text: { id: 'Salah', en: 'False' } },
      ],
      answer: {
        'five-greater-three': 'true',
        'two-greater-nine': 'false',
        'four-equal-four': 'true',
      },
      hint: { id: 'Bandingkan angka dengan teliti.', en: 'Compare the numbers carefully.' },
      explanation: { id: 'Kondisi benar jika pernyataannya benar.', en: 'A condition is true when the statement is true.' },
    },
  ],
  badgeId: 'junior-coder',
};

const creativeG12Character = {
  id: 'creative-g12-character',
  showInCatalog: false,
  lessonId: 'creative-coding',
  grade: '1-2',
  title: {
    id: 'Membuat Karakter',
    en: 'Create Your Character',
  },
  material: [
    { key: 'character-parts', text: { id: 'Karakter punya bentuk, warna, baju, ekspresi, dan nama.', en: 'A character has a shape, colors, clothes, an expression, and a name.' } },
    { key: 'choices-are-instructions', text: { id: 'Setiap pilihanmu seperti sebuah perintah.', en: 'Every choice you make is like an instruction.' } },
    { key: 'move-sound', text: { id: 'Kita bisa membuatnya bergerak 🏃 dan bersuara 🔊.', en: 'We can make it move 🏃 and make sounds 🔊.' } },
  ],
  example: {
    sequence: [
      { id: 'head', symbol: '🤖', label: { id: 'kepala', en: 'head' } },
      { id: 'body', symbol: '🟦', label: { id: 'badan', en: 'body' } },
      { id: 'hat', symbol: '🎩', label: { id: 'topi', en: 'hat' } },
      { id: 'face', symbol: '😀', label: { id: 'wajah', en: 'face' } },
    ],
    caption: { id: '🤖 kepala bulat, badan biru, topi merah, wajah senang 😀, nama "Beep"', en: 'Round head, blue body, red hat, happy face 😀, name "Beep"' },
  },
  activity: {
    id: 'build-character',
    title: { id: 'Buat karakterku', en: 'Build your character' },
    sequence: ['Pilih bentuk', 'Pilih warna', 'Tambah baju', 'Pilih ekspresi', 'Beri nama'],
    options: ['Shape', 'Colors', 'Clothes', 'Expression', 'Name'],
    answer: 'Colors',
    success: { id: 'Karaktermu siap berpetualang!', en: 'Your character is ready for adventure!' },
    hint: { id: 'Pilih bagian yang paling cocok untuk membuat karakter unik.', en: 'Choose the part that makes the character unique.' },
  },
  questions: [
    {
      id: 'not-character-part',
      type: 'multiple-choice',
      prompt: { id: 'Mana yang BUKAN bagian karakter?', en: 'Which one is NOT part of a character?' },
      options: [
        { id: 'shape', text: { id: 'Bentuk', en: 'Shape' } },
        { id: 'color', text: { id: 'Warna', en: 'Color' } },
        { id: 'weather', text: { id: 'Cuaca', en: 'Weather' } },
      ],
      answer: 'weather',
      hint: { id: 'Cuaca bukan bagian karakter.', en: 'Weather is not part of a character.' },
      explanation: { id: 'Karakter punya bentuk, warna, dan ekspresi, bukan cuaca.', en: 'A character has shape, color, and expression, not weather.' },
    },
    {
      id: 'expression-choice',
      type: 'multiple-choice',
      prompt: { id: 'Mana yang merupakan ekspresi?', en: 'Which one is an expression?' },
      options: [
        { id: 'smile', text: { id: '😄', en: '😄' } },
        { id: 'hat', text: { id: '🎩', en: '🎩' } },
        { id: 'shoe', text: { id: '👟', en: '👟' } },
      ],
      answer: 'smile',
      hint: { id: 'Ekspresi adalah cara wajah terlihat.', en: 'Expression is how the face looks.' },
      explanation: { id: '😄 menunjukkan ekspresi senang.', en: '😄 shows a happy expression.' },
    },
    {
      id: 'move-sound-match',
      type: 'matching',
      prompt: { id: 'Cocokkan keinginan dengan yang ditambahkan.', en: 'Match what you want with what you add.' },
      left: [
        { id: 'move', text: { id: 'Buat bergerak', en: 'Make it move' } },
        { id: 'sound', text: { id: 'Buat suara', en: 'Make a sound' } },
        { id: 'color', text: { id: 'Ubah warna', en: 'Change color' } },
      ],
      right: [
        { id: 'run', text: { id: '🏃', en: '🏃' } },
        { id: 'sound-icon', text: { id: '🔊', en: '🔊' } },
        { id: 'paint', text: { id: '🎨', en: '🎨' } },
      ],
      answer: {
        move: 'run',
        sound: 'sound-icon',
        color: 'paint',
      },
      hint: { id: 'Ingat benda yang mewakili gerak, suara, dan warna.', en: 'Think of the icon for movement, sound, and color.' },
      explanation: { id: 'Gerak, suara, dan warna semuanya bisa membuat karakter lebih hidup.', en: 'Movement, sound, and color make the character come alive.' },
    },
    {
      id: 'color-pattern',
      type: 'pattern',
      prompt: { id: '🔴 🔵 🔴 🔵 ❓ Apa yang selanjutnya?', en: '🔴 🔵 🔴 🔵 ❓ What comes next?' },
      options: [
        { id: 'red', text: { id: '🔴', en: '🔴' } },
        { id: 'blue', text: { id: '🔵', en: '🔵' } },
        { id: 'green', text: { id: '🟢', en: '🟢' } },
      ],
      answer: 'red',
      hint: { id: 'Warna itu bergantian.', en: 'The colors alternate.' },
      explanation: { id: 'Setelah biru, pola kembali ke merah.', en: 'After blue, the pattern returns to red.' },
    },
  ],
  badgeId: 'creative-coder',
};

const creativeG34StoryMiniGame = {
  id: 'creative-g34-story-minigame',
  lessonId: 'creative-coding',
  grade: '3-4',
  title: {
    id: 'Cerita Interaktif & Mini Game',
    en: 'Story & Mini Game',
  },
  material: [
    { key: 'story-parts', text: { id: 'Cerita punya karakter, alur, pilihan, dan akibat.', en: 'A story has a character, a plot, choices, and consequences.' } },
    { key: 'mini-game-parts', text: { id: 'Mini game punya karakter, objek, tujuan, aturan, dan tantangan.', en: 'A mini game has a character, an object, a goal, rules, and a challenge.' } },
    { key: 'choices-different', text: { id: 'Pilihan membuat cerita tiap pemain berbeda.', en: 'Choices make every player’s story different.' } },
  ],
  example: {
    sequence: [
      { id: 'door-red', symbol: '🚪', label: { id: 'pintu merah', en: 'red door' } },
      { id: 'treasure', symbol: '💎', label: { id: 'harta', en: 'treasure' } },
      { id: 'door-blue', symbol: '🚪', label: { id: 'pintu biru', en: 'blue door' } },
      { id: 'mud', symbol: '🟤', label: { id: 'lumpur', en: 'mud' } },
    ],
    caption: { id: 'Robo menemukan dua pintu: merah untuk harta, biru untuk lumpur.', en: 'Robo finds two doors: red door to treasure, blue door to mud.' },
  },
  activity: {
    id: 'story-build',
    title: { id: 'Susun cerita', en: 'Build a story' },
    sequence: ['Kenalan dengan karakter', 'Muncul masalah', 'Pemain membuat pilihan', 'Lihat akibatnya', 'Tamat'],
    options: ['Meet the character', 'A problem appears', 'The player makes a choice', 'See the consequence', 'The end'],
    answer: 'A problem appears',
    success: { id: 'Cerita yang bagus! Pilihan membuatnya seru.', en: 'Great story! Choices make it exciting.' },
    hint: { id: 'Cerita dimulai dengan kenalan lalu masalah.', en: 'A story starts with a character and then a problem.' },
  },
  questions: [
    {
      id: 'story-choice',
      type: 'multiple-choice',
      prompt: { id: 'Apa itu "pilihan" dalam cerita?', en: 'What is a "choice" in a story?' },
      options: [
        { id: 'decision', text: { id: 'Saat pemain memutuskan sesuatu', en: 'A moment where the player decides' } },
        { id: 'last-page', text: { id: 'Halaman terakhir', en: 'The last page' } },
        { id: 'title', text: { id: 'Judul', en: 'The title' } },
      ],
      answer: 'decision',
      hint: { id: 'Pilihan adalah keputusan yang dibuat pemain.', en: 'A choice is a decision the player makes.' },
      explanation: { id: 'Pilihan memberi pemain kendali dalam cerita.', en: 'A choice gives the player control in the story.' },
    },
    {
      id: 'different-endings',
      type: 'true-false',
      prompt: { id: 'Pilihan berbeda bisa menuju akhir berbeda.', en: 'Different choices can lead to different endings.' },
      answer: true,
      hint: { id: 'Banyak cerita berubah sesuai keputusan.', en: 'Many stories change based on choices.' },
      explanation: { id: 'Setiap pilihan bisa membawa hasil yang berbeda.', en: 'Each choice can lead to a different result.' },
    },
    {
      id: 'mini-game-match',
      type: 'matching',
      prompt: { id: 'Cocokkan bagian mini game dengan artinya.', en: 'Match the mini game part with its meaning.' },
      left: [
        { id: 'character', text: { id: 'Karakter', en: 'Character' } },
        { id: 'goal', text: { id: 'Tujuan', en: 'Goal' } },
        { id: 'rules', text: { id: 'Aturan', en: 'Rules' } },
        { id: 'challenge', text: { id: 'Tantangan', en: 'Challenge' } },
      ],
      right: [
        { id: 'who-play', text: { id: 'Siapa yang kamu mainkan', en: 'Who you play' } },
        { id: 'must-achieve', text: { id: 'Yang harus dicapai', en: 'What you must achieve' } },
        { id: 'can-cannot', text: { id: 'Yang boleh dan tidak boleh', en: 'What you can and cannot do' } },
        { id: 'hard', text: { id: 'Hal yang membuatnya sulit', en: 'Something that makes it hard' } },
      ],
      answer: {
        character: 'who-play',
        goal: 'must-achieve',
        rules: 'can-cannot',
        challenge: 'hard',
      },
      hint: { id: 'Pikirkan arti kata itu dalam game.', en: 'Think of what the word means in a game.' },
      explanation: { id: 'Semua bagian itu membuat game berfungsi dengan baik.', en: 'All of these parts make a game work well.' },
    },
    {
      id: 'goal-stars',
      type: 'multiple-choice',
      prompt: { id: '"Collect 5 stars before time runs out." Apa tujuannya?', en: '"Collect 5 stars before time runs out." What is the goal?' },
      options: [
        { id: 'stars', text: { id: 'Kumpulkan 5 bintang', en: 'Collect 5 stars' } },
        { id: 'time', text: { id: 'Waktu habis', en: 'Time running out' } },
        { id: 'keys', text: { id: 'Menekan tombol', en: 'Pressing the keys' } },
      ],
      answer: 'stars',
      hint: { id: 'Tujuan selalu apa yang ingin dicapai.', en: 'The goal is what you want to achieve.' },
      explanation: { id: 'Tujuan adalah mengumpulkan bintang; waktu habis adalah tantangan.', en: 'The goal is to collect stars; time running out is the challenge.' },
    },
  ],
  badgeId: 'creative-coder',
};

const creativeG56ScoreProject = {
  id: 'creative-g56-score-project',
  lessonId: 'creative-coding',
  grade: '5-6',
  title: {
    id: 'Skor, Variabel & Proyek Game',
    en: 'Score, Variables & Game Project',
  },
  material: [
    { key: 'variable-stores', text: { id: 'Variabel menyimpan informasi, seperti `score = 0`.', en: 'A variable stores information, like `score = 0`.' } },
    { key: 'change-variable', text: { id: 'Kita mengubahnya dengan kode: `score = score + 1`.', en: 'We change it with code: `score = score + 1`.' } },
    { key: 'rules-score', text: { id: 'Aturan memakai skor untuk menentukan menang atau kalah: `if score ≥ 10 → win`.', en: 'Rules use the score to decide win or lose: `if score ≥ 10 → win`.' } },
  ],
  example: {
    sequence: [
      { id: 'score0', symbol: '0', label: { id: 'skor mulai', en: 'score starts' } },
      { id: 'star-1', symbol: '⭐', label: { id: 'tangkap bintang', en: 'catch star' } },
      { id: 'star-2', symbol: '⭐', label: { id: 'tangkap bintang', en: 'catch star' } },
      { id: 'score3', symbol: '3', label: { id: 'skor akhir', en: 'final score' } },
    ],
    caption: { id: 'Skor mulai 0 → tangkap ⭐ (+1) → ⭐ (+1) → ⭐ (+1) → skor = 3', en: 'Score starts at 0 → catch ⭐ (+1) → catch ⭐ (+1) → catch ⭐ (+1) → score = 3' },
  },
  activity: {
    id: 'game-step-by-step',
    title: { id: 'Buat gamemu langkah demi langkah', en: 'Make your game step by step' },
    sequence: ['Cari ide', 'Rancang karakter dan dunia', 'Tulis aturan dan logika', 'Tambahkan skor', 'Uji gamenya', 'Perbaiki bug', 'Publikasikan'],
    options: ['Come up with an idea', 'Design the character and world', 'Write the rules and logic', 'Add the score', 'Test the game', 'Fix the bugs', 'Publish it'],
    answer: 'Write the rules and logic',
    success: { id: 'Proses pembuatan game sudah rapi!', en: 'The game-making process is nicely set up!' },
    hint: { id: 'Sebelum menambahkan skor, buat aturannya dulu.', en: 'Before adding score, set the rules first.' },
  },
  questions: [
    {
      id: 'variable-definition',
      type: 'multiple-choice',
      prompt: { id: 'Apa itu variabel?', en: 'What is a variable?' },
      options: [
        { id: 'box', text: { id: 'Kotak yang menyimpan informasi', en: 'A box that stores information' } },
        { id: 'bug', text: { id: 'Sejenis bug', en: 'A kind of bug' } },
        { id: 'level', text: { id: 'Level game', en: 'A game level' } },
      ],
      answer: 'box',
      hint: { id: 'Variabel menyimpan nilai.', en: 'A variable stores a value.' },
      explanation: { id: 'Variabel mirip kotak tempat data disimpan.', en: 'A variable is like a box for storing data.' },
    },
    {
      id: 'score-three-stars',
      type: 'multiple-choice',
      prompt: { id: '`score = 0`. Kamu menangkap 3 bintang, +1 tiap kali. Berapa skor akhirnya?', en: '`score = 0`. You catch 3 stars, +1 each. What is the final score?' },
      options: [
        { id: '1', text: { id: '1', en: '1' } },
        { id: '3', text: { id: '3', en: '3' } },
        { id: '4', text: { id: '4', en: '4' } },
      ],
      answer: '3',
      hint: { id: '0 + 1 + 1 + 1.', en: '0 + 1 + 1 + 1.' },
      explanation: { id: 'Skor awal 0 lalu naik 1 tiap bintang, total 3.', en: 'The score starts at 0 and rises by 1 each star, so total is 3.' },
    },
    {
      id: 'score-ten',
      type: 'multiple-choice',
      prompt: { id: 'Menang ketika `score ≥ 10`. Skormu 9. Apa yang terjadi?', en: 'Win when `score ≥ 10`. Your score is 9. What happens?' },
      options: [
        { id: 'you-win', text: { id: 'Kamu menang', en: 'You win' } },
        { id: 'need-1-more', text: { id: 'Belum, butuh 1 poin lagi', en: 'Not yet, you need 1 more point' } },
        { id: 'crash', text: { id: 'Game error', en: 'The game crashes' } },
      ],
      answer: 'need-1-more',
      hint: { id: 'Apakah 9 lebih besar atau sama dengan 10?', en: 'Is 9 greater than or equal to 10?' },
      explanation: { id: 'Dengan skor 9, kamu masih membutuhkan 1 poin untuk mencapai 10.', en: 'With a score of 9, you still need 1 point to reach 10.' },
    },
    {
      id: 'testing-true',
      type: 'true-false',
      prompt: { id: 'Menguji membantu menemukan bug sebelum dipublikasikan.', en: 'Testing helps you find bugs before publishing.' },
      answer: true,
      hint: { id: 'Menguji membuat kamu melihat masalah lebih cepat.', en: 'Testing helps you spot problems earlier.' },
      explanation: { id: 'Uji coba adalah cara untuk menangkap bug sebelum game dibagikan.', en: 'Testing is how you catch bugs before sharing the game.' },
    },
    {
      id: 'variable-rule-match',
      type: 'matching',
      prompt: { id: 'Cocokkan kata dengan tugasnya.', en: 'Match the word with its job.' },
      left: [
        { id: 'variable', text: { id: 'Variabel', en: 'Variable' } },
        { id: 'rule', text: { id: 'Aturan', en: 'Rule' } },
        { id: 'testing', text: { id: 'Menguji', en: 'Testing' } },
        { id: 'publishing', text: { id: 'Publikasi', en: 'Publishing' } },
      ],
      right: [
        { id: 'stores', text: { id: 'Menyimpan nilai', en: 'Stores a value' } },
        { id: 'decides', text: { id: 'Menentukan menang atau kalah', en: 'Decides win or lose' } },
        { id: 'finds-bugs', text: { id: 'Menemukan bug', en: 'Finds bugs' } },
        { id: 'shares', text: { id: 'Membagikan gamemu', en: 'Shares your game' } },
      ],
      answer: {
        variable: 'stores',
        rule: 'decides',
        testing: 'finds-bugs',
        publishing: 'shares',
      },
      hint: { id: 'Pikirkan peran setiap bagian dalam game.', en: 'Think about the role of each part in the game.' },
      explanation: { id: 'Setiap elemen punya tugas penting dalam game.', en: 'Each element has an important job in the game.' },
    },
  ],
  badgeId: 'game-creator',
};

const learningUnits = [
  ...logicG12Subtopics,
  logicG34Algorithms,
  logicG56LoopsBugs,
  basicG12Directions,
  ...basicCodingSubtopics,
  basicG34SequenceEvents,
  basicG56IfElseFix,
  creativeG12Character,
  ...creativeCodingSubtopics,
  creativeG34StoryMiniGame,
  creativeG56ScoreProject,
];

export default learningUnits;
