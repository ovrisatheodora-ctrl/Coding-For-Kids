const localized = (id, en) => ({ id, en });

function pick(id, title, options, answer, explanation, hint = localized('Perhatikan contoh pada materi.', 'Look at the lesson example.')) {
  return {
    id,
    type: 'pick',
    title,
    sequence: [],
    options: options.map(([optionId, text]) => ({ id: optionId, text })),
    answer,
    explanation,
    hint,
    shuffleOptions: true,
  };
}

function order(id, title, entries, explanation) {
  return {
    id,
    type: 'order',
    title,
    items: entries.map(([itemId, text]) => ({ id: itemId, text })),
    answer: entries.map(([itemId]) => itemId),
    explanation: explanation || localized('Urutan yang tepat membantu karya bekerja sesuai rencana.', 'The right order helps a project work as planned.'),
  };
}

function matching(id, title, pairs, explanation) {
  const normalizedPairs = pairs.map(([leftText, rightText], index) => ({
    left: { id: `${id}-left-${index}`, text: leftText },
    right: { id: `${id}-right-${index}`, text: rightText },
  }));
  return {
    id,
    type: 'matching',
    title,
    left: normalizedPairs.map(({ left }) => left),
    right: normalizedPairs.map(({ right }) => right),
    answer: Object.fromEntries(normalizedPairs.map(({ left, right }) => [left.id, right.id])),
    explanation: explanation || localized('Setiap bagian punya pasangan yang sesuai.', 'Each part has a matching pair.'),
    hint: localized('Cocokkan satu bagian pada satu waktu.', 'Match one item at a time.'),
    shuffleOptions: true,
  };
}

function findBug(id, title, lines, bugIndex, repairs, reason, hint) {
  return {
    id,
    type: 'find-bug',
    title,
    items: lines.map((line, index) => ({
      id: `${id}-line-${index}`,
      label: typeof line === 'string' ? localized(line, line) : line,
      emoji: '',
    })),
    bugIndex,
    repairOptions: repairs.map(([repairId, text]) => ({ id: repairId, text })),
    repairAnswer: repairs[0][0],
    reason,
    hint,
    shuffleOptions: true,
  };
}

function question(id, promptId, promptEn, options, answerIndex, reasonId, reasonEn) {
  return {
    id,
    type: 'multiple-choice',
    prompt: localized(promptId, promptEn),
    options: options.map(([optionId, idText, enText]) => ({
      id: optionId,
      text: localized(idText, enText),
    })),
    answer: options[answerIndex][0],
    explanation: localized(reasonId, reasonEn),
    hint: localized('Coba ingat contoh visualnya.', 'Think of the visual example.'),
    shuffleOptions: true,
  };
}

const activities = {
  'creative-g12-warnai-panggung': [
    matching('stage-match', localized('Pasangkan blok dengan hasilnya!', 'Match each block to its result!'), [
      [localized('Ganti latar: biru', 'Change background: blue'), localized('Panggung seperti langit', 'The stage looks like the sky')],
      [localized('Ganti latar: hijau', 'Change background: green'), localized('Panggung seperti rumput', 'The stage looks like grass')],
      [localized('Ganti latar: hitam', 'Change background: black'), localized('Panggung seperti malam', 'The stage looks like night')],
    ]),
    pick('stage-color', localized('Mau panggung seperti laut. Pilih warna latar!', 'Make the stage look like the sea. Choose a background color!'), [
      ['blue', localized('Biru', 'Blue')], ['red', localized('Merah', 'Red')], ['yellow', localized('Kuning', 'Yellow')],
    ], 0, localized('Latar biru mengingatkan kita pada laut.', 'A blue background reminds us of the sea.')),
  ],
  'creative-g12-menggambar-kode': [
    pick('draw-result', localized('Maju 5. Pena menggambar apa?', 'Move 5. What does the pen draw?'), [
      ['line', localized('Garis lurus', 'A straight line')], ['square', localized('Kotak', 'A square')], ['circle', localized('Lingkaran', 'A circle')],
    ], 0, localized('Pena yang bergerak maju membuat garis lurus.', 'A pen moving forward draws a straight line.')),
    order('draw-line-order', localized('Susun blok untuk menggambar garis!', 'Arrange the blocks to draw a line!'), [
      ['lower', localized('Turunkan pena', 'Lower the pen')],
      ['move', localized('Maju 5', 'Move 5')],
      ['lift', localized('Angkat pena', 'Lift the pen')],
    ], localized('Pena harus turun sebelum bergerak, lalu diangkat.', 'The pen must be lowered before moving, then lifted.')),
  ],
  'creative-g12-animasi': [
    order('animation-frames', localized('Bola bergerak dari kiri ke kanan. Susun posisinya!', 'The ball moves from left to right. Arrange its positions!'), [
      ['left', localized('Bola di kiri', 'Ball on the left')],
      ['middle', localized('Bola di tengah', 'Ball in the middle')],
      ['right', localized('Bola di kanan', 'Ball on the right')],
    ], localized('Bola mulai di kiri, lalu ke tengah, kemudian ke kanan.', 'The ball starts on the left, then moves to the middle, and finally to the right.')),
    matching('animation-move-match', localized('Pasangkan blok dengan geraknya!', 'Match each block to its movement!'), [
      [localized('Geser ke kanan', 'Move right'), localized('Karakter pindah ke kanan', 'The character moves right')],
      [localized('Putar', 'Turn'), localized('Karakter berputar', 'The character turns')],
      [localized('Ganti gambar', 'Change picture'), localized('Karakter berganti gaya', 'The character changes its look')],
    ]),
  ],
  'creative-g12-bunyi-musik': [
    pick('sound-cat', localized('Mau suara kucing. Blok mana?', 'Want a cat sound. Which block?'), [
      ['meow', localized('Bunyi: Meong', 'Sound: Meow')], ['woof', localized('Bunyi: Guk', 'Sound: Woof')], ['moo', localized('Bunyi: Muu', 'Sound: Moo')],
    ], 0, localized('Meong adalah suara kucing.', 'Meow is the sound a cat makes.')),
    order('sound-notes', localized('Susun nada supaya terdengar naik!', 'Arrange the notes from low to high!'), [
      ['low', localized('Nada rendah', 'Low note')],
      ['medium', localized('Nada sedang', 'Medium note')],
      ['high', localized('Nada tinggi', 'High note')],
    ]),
  ],
  'creative-g12-cerita-interaktif': [
    matching('story-choice-match', localized('Pasangkan tombol dengan kelanjutan cerita!', 'Match each button to what happens next!'), [
      [localized('Tombol Buka', 'Open button'), localized('Kucing masuk ke taman', 'The cat goes into the garden')],
      [localized('Tombol Pulang', 'Go Home button'), localized('Kucing kembali ke rumah', 'The cat returns home')],
    ]),
    order('story-order', localized('Susun alur cerita interaktif!', 'Arrange the interactive story!'), [
      ['start', localized('Kucing menemukan pintu', 'The cat finds a door')],
      ['choose', localized('Pembaca memilih tombol', 'The reader chooses a button')],
      ['continue', localized('Cerita pindah ke bagian berikutnya', 'The story moves to the next part')],
    ]),
  ],
  'creative-g34-animasi-dan-gerak': [
    pick('motion-position', localized('Bola di x = 0. Ulangi 3 kali: geser 10. Posisi akhir?', 'Ball at x = 0. Repeat 3 times: move 10. Final position?'), [
      ['30', '30'], ['10', '10'], ['13', '13'],
    ], 0, localized('Tiga geseran 10 menghasilkan posisi 30.', 'Three moves of 10 reach position 30.')),
    order('motion-bounce-order', localized('Bola mulai di kiri, bergerak ke kanan lalu kembali ke kiri. Susun langkahnya!', 'The ball starts on the left, moves right, then returns left. Arrange the steps!'), [
      ['place', localized('Letakkan bola di kiri', 'Place the ball on the left')],
      ['move', localized('Geser bola ke tepi kanan', 'Move the ball to the right edge')],
      ['edge', localized('Di tepi kanan, balik arah', 'At the right edge, turn around')],
      ['return', localized('Geser bola kembali ke kiri', 'Move the ball back to the left')],
    ], localized('Mulai dari kiri, geser ke tepi kanan, balik arah, lalu geser kembali ke kiri.', 'Start on the left, move to the right edge, turn around, then move back to the left.')),
  ],
  'creative-g34-menggambar-dengan-kode': [
    pick('shape-square', localized('Ulangi 4 kali: maju 5, belok 90. Bentuk apa?', 'Repeat 4 times: move 5, turn 90. What shape?'), [
      ['square', localized('Kotak', 'Square')], ['triangle', localized('Segitiga', 'Triangle')], ['line', localized('Garis lurus', 'Straight line')],
    ], 0, localized('Empat sisi dengan belokan siku-siku membentuk kotak.', 'Four sides with right-angle turns make a square.')),
    findBug('drawing-bug', localized('Cari bug pada gambar kotak!', 'Find the bug in the square drawing!'), [
      'ulangi 3 kali:',
      '  maju 5',
      '  belok 90',
    ], 0, [
      ['repeat-four', localized('Ganti 3 kali menjadi 4 kali', 'Change 3 repeats to 4')],
      ['forward-three', localized('Ganti maju 5 menjadi maju 3', 'Change move 5 to move 3')],
      ['remove-turn', localized('Hapus perintah belok', 'Remove the turn command')],
    ], localized('Kotak punya empat sisi, jadi perlu empat pengulangan.', 'A square has four sides, so it needs four repeats.'), localized('Hitung jumlah sisi kotak.', 'Count the sides of a square.')),
  ],
  'creative-g34-suara-dan-interaksi': [
    matching('piano-button-match', localized('Aturan: merah=do, kuning=re, hijau=mi. Pasangkan!', 'Rule: red=do, yellow=re, green=mi. Match them!'), [
      [localized('Tombol merah ditekan', 'Press the red button'), localized('Nada do', 'Do note')],
      [localized('Tombol kuning ditekan', 'Press the yellow button'), localized('Nada re', 'Re note')],
      [localized('Tombol hijau ditekan', 'Press the green button'), localized('Nada mi', 'Mi note')],
    ], localized('Ikuti aturan warna: merah memainkan do, kuning re, dan hijau mi.', 'Follow the color rule: red plays do, yellow plays re, and green plays mi.')),
    pick('piano-trigger', localized('Merah = do, hijau = mi. Kamu menekan hijau. Nada apa?', 'Red = do, green = mi. You press green. Which note plays?'), [
      ['mi', 'mi'], ['do', 'do'], ['re', 're'],
    ], 0, localized('Tombol hijau dipasangkan dengan nada mi.', 'The green button is paired with the mi note.')),
  ],
  'creative-g34-proyek-kuis-interaktif': [
    order('quiz-project-order', localized('Susun langkah membuat kuis!', 'Arrange the steps to make a quiz!'), [
      ['question', localized('Tulis pertanyaan', 'Write a question')],
      ['choices', localized('Buat tombol pilihan jawaban', 'Make answer choice buttons')],
      ['check', localized('Periksa jawaban yang dipilih', 'Check the selected answer')],
      ['score', localized('Tambah skor jika benar', 'Add a point if correct')],
      ['result', localized('Tampilkan skor akhir', 'Show the final score')],
    ]),
    pick('quiz-score-trace', localized('Skor 0. Benar, salah, benar. Skor akhir?', 'Score 0. Correct, wrong, correct. Final score?'), [
      ['2', '2'], ['3', '3'], ['1', '1'],
    ], 0, localized('Hanya dua jawaban benar yang menambah skor.', 'Only two correct answers add to the score.')),
    findBug('quiz-score-bug', localized('Cari bug pada penambahan skor!', 'Find the score bug!'), [
      'Saat tombol diklik:',
      '  skor = skor + 1',
    ], 1, [
      ['check-answer', localized('Tambah syarat: hanya jika jawaban benar', 'Add a check: only if the answer is correct')],
      ['remove-score', localized('Hapus variabel skor', 'Remove the score variable')],
      ['change-one', localized('Ganti angka 1 menjadi 10', 'Change the number 1 to 10')],
    ], localized('Skor hanya bertambah jika jawaban benar.', 'The score should increase only when the answer is correct.'), localized('Apakah kode memeriksa jawaban dulu?', 'Does the code check the answer first?')),
  ],
  'creative-g34-proyek-game-labirin': [
    order('maze-project-order', localized('Susun langkah membuat game labirin!', 'Arrange the steps to make a maze game!'), [
      ['map', localized('Gambar labirin dan dinding', 'Draw the maze and walls')],
      ['start', localized('Taruh karakter di awal', 'Place the character at the start')],
      ['move', localized('Saat panah ditekan, geser karakter', 'Move the character when an arrow is pressed')],
      ['wall', localized('Jika menyentuh dinding, jangan bergerak', 'Do not move if it touches a wall')],
      ['win', localized('Jika sampai di bintang, tampilkan Menang', 'Show Win when it reaches the star')],
    ]),
    pick('maze-wall-rule', localized('Karakter menyentuh dinding. Apa yang terjadi?', 'The character touches a wall. What should happen?'), [
      ['stop', localized('Karakter tidak bisa menembus', 'The character cannot pass through')],
      ['pass', localized('Karakter menembus', 'The character passes through')],
      ['erase', localized('Game dihapus', 'The game is erased')],
    ], 0, localized('Aturan dinding mencegah karakter melewatinya.', 'The wall rule stops the character from passing through.')),
    findBug('maze-wall-bug', localized('Cari bug agar karakter tidak menembus dinding!', 'Find the bug that lets the character pass through a wall!'), [
      'Saat panah kanan ditekan:',
      '  geser karakter 1 langkah',
    ], 1, [
      ['wall-check', localized('Tambah syarat: hanya jika tidak ada dinding', 'Add a check: only if there is no wall')],
      ['change-step', localized('Ganti 1 langkah menjadi 10', 'Change 1 step to 10')],
      ['remove-arrow', localized('Hapus panah kanan', 'Remove the right arrow')],
    ], localized('Periksa dinding sebelum karakter bergerak.', 'Check for a wall before moving the character.'), localized('Apa yang perlu diperiksa sebelum bergerak?', 'What should be checked before moving?')),
  ],
  'creative-g34-proyek-pameran-karyaku': [
    order('showcase-order', localized('Susun langkah membuat galeri karya!', 'Arrange the steps to make an art gallery!'), [
      ['choose', localized('Pilih gambar karya', 'Choose artwork images')],
      ['title', localized('Beri judul setiap gambar', 'Give each image a title')],
      ['frame', localized('Taruh gambar dalam bingkai', 'Put images in a frame')],
      ['buttons', localized('Tambah tombol Berikutnya dan Sebelumnya', 'Add Next and Previous buttons')],
    ]),
    matching('gallery-button-match', localized('Pasangkan tombol dengan tugasnya!', 'Match each button to its job!'), [
      [localized('Berikutnya', 'Next'), localized('Pindah ke gambar selanjutnya', 'Move to the next image')],
      [localized('Sebelumnya', 'Previous'), localized('Pindah ke gambar sebelumnya', 'Move to the previous image')],
      [localized('Judul', 'Title'), localized('Memberi tahu isi gambar', 'Tell what the image shows')],
    ]),
  ],
  'creative-g56-halaman-web-html-css': [
    matching('html-tag-match', localized('Pasangkan tag dengan fungsinya!', 'Match each tag to its job!'), [
      ['<h1>', localized('Judul besar', 'Large heading')],
      ['<p>', localized('Paragraf', 'Paragraph')],
      ['<img>', localized('Gambar', 'Image')],
      ['<ul>', localized('Daftar poin', 'Bulleted list')],
    ]),
    findBug('html-close-tag', localized('Cari kesalahan pada tag HTML!', 'Find the HTML tag mistake!'), [
      '<p>Aku suka coding</h1>',
    ], 0, [
      ['close-p', localized('Ganti </h1> menjadi </p>', 'Change </h1> to </p>')],
      ['remove-word', localized('Hapus kata coding', 'Remove the word coding')],
      ['add-image', localized('Tambah tag <img>', 'Add an <img> tag')],
    ], localized('Tag penutup harus sama dengan tag pembukanya.', 'The closing tag must match its opening tag.'), localized('Perhatikan huruf pada tag pembuka dan penutup.', 'Compare the opening and closing tags.')),
    pick('css-color', localized('Mau tulisan merah. CSS yang benar?', 'Want red text. Which CSS is correct?'), [
      ['color-red', 'color: red;'], ['size-red', 'size: red;'], ['red-color', 'red: color;'],
    ], 0, localized('Properti color mengatur warna teks.', 'The color property sets text color.')),
  ],
  'creative-g56-animasi-dan-interaksi': [
    matching('event-match', localized('Pasangkan event dengan kejadiannya!', 'Match each event to what happens!'), [
      ['click', localized('Elemen diklik', 'An element is clicked')],
      ['hover', localized('Kursor berada di atas elemen', 'The pointer is over an element')],
      ['keydown', localized('Tombol keyboard ditekan', 'A keyboard key is pressed')],
    ]),
    order('interaction-order', localized('Susun alur interaksi!', 'Arrange the interaction flow!'), [
      ['user', localized('Pengguna mengklik tombol', 'The user clicks a button')],
      ['event', localized('Event click terjadi', 'The click event happens')],
      ['function', localized('Fungsi dijalankan', 'The function runs')],
      ['view', localized('Tampilan berubah', 'The display changes')],
    ]),
    pick('hover-event', localized('Mau tombol berubah saat kursor di atasnya. Event apa?', 'Want a button to change when the pointer is over it. Which event?'), [
      ['hover', 'hover'], ['click', 'click'], ['keydown', 'keydown'],
    ], 0, localized('Event hover terjadi saat kursor berada di atas elemen.', 'A hover event happens when the pointer is over an element.')),
  ],
  'creative-g56-data-dan-daftar': [
    pick('list-index', localized('buah = ["apel", "jeruk", "mangga"]. buah[1] adalah ...', 'fruit = ["apple", "orange", "mango"]. fruit[1] is ...'), [
      ['orange', localized('jeruk', 'orange')], ['apple', localized('apel', 'apple')], ['mango', localized('mangga', 'mango')],
    ], 0, localized('Nomor urut dimulai dari 0, jadi indeks 1 menunjuk isi kedua.', 'Indexes start at 0, so index 1 points to the second item.')),
    findBug('list-index-bug', localized('Cari bug untuk menampilkan buah terakhir!', 'Find the bug when showing the last fruit!'), [
      'buah = ["apel", "jeruk", "mangga"]',
      'tampilkan(buah[3])',
    ], 1, [
      ['index-two', localized('Ganti buah[3] menjadi buah[2]', 'Change fruit[3] to fruit[2]')],
      ['rename-list', localized('Ganti buah menjadi buah3', 'Rename fruit to fruit3')],
      ['remove-show', localized('Hapus perintah tampilkan', 'Remove the show command')],
    ], localized('Tiga isi punya indeks 0, 1, dan 2.', 'Three items have indexes 0, 1, and 2.'), localized('Mulai menghitung indeks dari 0.', 'Start counting indexes at 0.')),
    pick('list-length', localized('List berisi 3 buah, lalu ditambah pisang. Jumlahnya?', 'A list has 3 fruits, then adds a banana. How many now?'), [
      ['4', '4'], ['3', '3'], ['5', '5'],
    ], 0, localized('Satu buah ditambah ke tiga buah menjadi empat.', 'One fruit added to three makes four.')),
  ],
  'creative-g56-proyek-website-profilku': [
    order('profile-order', localized('Susun bagian halaman profil dari atas!', 'Arrange the profile page sections from the top!'), [
      ['photo', localized('Foto dan nama', 'Photo and name')],
      ['about', localized('Tentang aku', 'About me')],
      ['hobbies', localized('Daftar hobi', 'List of hobbies')],
      ['closing', localized('Penutup', 'Closing')],
    ]),
    matching('profile-tag-match', localized('Pasangkan bagian dengan tag HTML-nya!', 'Match each section to its HTML tag!'), [
      [localized('Nama (judul besar)', 'Name (large heading)'), '<h1>'],
      [localized('Foto', 'Photo'), '<img>'],
      [localized('Tentang aku (paragraf)', 'About me (paragraph)'), '<p>'],
      [localized('Daftar hobi', 'Hobby list'), '<ul> dan <li>'],
    ]),
    findBug('profile-tag-bug', localized('Cari kesalahan pada paragraf profil!', 'Find the mistake in the profile paragraph!'), [
      '<h1>Rina</h1>',
      '<p>Aku suka menggambar.</h1>',
    ], 1, [
      ['close-paragraph', localized('Ganti </h1> menjadi </p>', 'Change </h1> to </p>')],
      ['remove-word', localized('Hapus kata menggambar', 'Remove the word drawing')],
      ['add-image', localized('Tambah tag <img>', 'Add an <img> tag')],
    ], localized('Tag penutup harus cocok dengan tag pembuka.', 'The closing tag must match its opening tag.'), localized('Periksa tag yang mengapit paragraf.', 'Check the tags around the paragraph.')),
  ],
  'creative-g56-proyek-game-tebak-angka': [
    order('guess-game-order', localized('Susun langkah game tebak angka!', 'Arrange the number guessing game steps!'), [
      ['secret', localized('Pilih angka rahasia', 'Choose a secret number')],
      ['guess', localized('Minta tebakan pemain', 'Ask for the player’s guess')],
      ['compare', localized('Bandingkan dengan angka rahasia', 'Compare with the secret number')],
      ['hint', localized('Beri petunjuk lebih besar atau lebih kecil', 'Give a higher or lower hint')],
      ['repeat', localized('Ulangi sampai tebakan benar', 'Repeat until the guess is correct')],
    ]),
    pick('guess-hint', localized('Angka rahasia 7. Tebakan 5. Petunjuknya?', 'Secret number is 7. Guess is 5. What is the hint?'), [
      ['higher', localized('Lebih besar', 'Higher')], ['lower', localized('Lebih kecil', 'Lower')], ['correct', localized('Benar', 'Correct')],
    ], 0, localized('Lima lebih kecil daripada tujuh.', 'Five is less than seven.')),
    findBug('guess-loop-bug', localized('Cari bug pada loop tebakan!', 'Find the bug in the guessing loop!'), [
      localized('rahasia = 7', 'secret = 7'),
      localized('tebakan = 0', 'guess = 0'),
      localized('selama tebakan == rahasia:', 'while guess == secret:'),
      localized('  tebakan = tanya()', '  guess = ask()'),
    ], 2, [
      ['not-equal', localized('Ganti == menjadi !=', 'Change == to !=')],
      ['secret-seventy', localized('Ganti 7 menjadi 70', 'Change 7 to 70')],
      ['remove-guess', localized('Hapus tebakan = 0', 'Remove tebakan = 0')],
    ], localized('Loop harus berjalan saat tebakan belum sama dengan rahasia.', 'The loop should run while the guess does not match the secret.'), localized('Tebakan awal 0 belum sama dengan 7.', 'The starting guess 0 is not 7.')),
  ],
  'creative-g56-proyek-pameran-dan-presentasi-karya': [
    order('presentation-order', localized('Susun urutan presentasi!', 'Arrange the presentation!'), [
      ['opening', localized('Pembuka: perkenalkan judul karya', 'Opening: introduce the project title')],
      ['body', localized('Isi: tunjukkan cara kerja karya', 'Body: show how the project works')],
      ['closing', localized('Penutup: terima kasih dan ajak bertanya', 'Closing: thank everyone and invite questions')],
    ]),
    matching('presentation-match', localized('Pasangkan bagian presentasi dengan isinya!', 'Match each presentation part to its content!'), [
      [localized('Pembuka', 'Opening'), localized('Perkenalkan nama dan judul karya', 'Introduce yourself and the project title')],
      [localized('Isi', 'Body'), localized('Tunjukkan cara kerja karya', 'Show how the project works')],
      [localized('Penutup', 'Closing'), localized('Ucapkan terima kasih dan ajak bertanya', 'Thank everyone and invite questions')],
    ]),
    pick('presentation-slide', localized('Satu slide sebaiknya berisi ...', 'One slide should contain ...'), [
      ['one-idea', localized('Satu ide dengan gambar', 'One idea with an image')],
      ['long-story', localized('Seluruh cerita panjang', 'A whole long story')],
      ['empty', localized('Tidak ada isi', 'Nothing')],
    ], 0, localized('Satu ide membuat slide mudah dipahami.', 'One idea makes a slide easy to understand.')),
  ],
};

const quizBanks = {
  'creative-g12-warnai-panggung': [
    ['stage-place', 'Panggung itu tempat ...', 'A stage is a place where ...', [['show', 'Karakter tampil', 'Characters appear'], ['lunch', 'Makan siang', 'We eat lunch'], ['sleep', 'Tidur', 'We sleep']], 0, 'Karakter tampil di atas panggung.', 'Characters appear on the stage.'],
    ['stage-block', 'Blok Ganti latar dipakai untuk ...', 'The Change Background block is used to ...', [['color', 'Mengubah warna panggung', 'Change the stage color'], ['delete', 'Menghapus karakter', 'Delete a character'], ['sound', 'Menambah suara', 'Add a sound']], 0, 'Blok itu mengubah warna latar panggung.', 'That block changes the stage background color.'],
    ['stage-night', 'Mau panggung seperti langit malam. Pilih warna.', 'Make a night sky stage. Choose a color.', [['black', 'Hitam', 'Black'], ['yellow', 'Kuning', 'Yellow'], ['white', 'Putih', 'White']], 0, 'Latar hitam terlihat seperti malam.', 'A black background looks like night.'],
    ['stage-grass', 'Mau panggung seperti rumput. Pilih warna.', 'Make a grass-like stage. Choose a color.', [['green', 'Hijau', 'Green'], ['red', 'Merah', 'Red'], ['purple', 'Ungu', 'Purple']], 0, 'Rumput biasanya berwarna hijau.', 'Grass is usually green.'],
    ['stage-character', 'Kalau latar diganti, karakter ...', 'When the background changes, the character ...', [['stays', 'Tetap ada', 'Stays there'], ['vanishes', 'Hilang', 'Disappears'], ['stone', 'Berubah jadi batu', 'Turns into stone']], 0, 'Mengganti latar tidak menghapus karakter.', 'Changing the background does not remove the character.'],
  ],
  'creative-g12-menggambar-kode': [
    ['pen-line', 'Pena membuat garis kalau ...', 'A pen draws a line when it ...', [['moves', 'Bergerak maju', 'Moves forward'], ['waits', 'Diam saja', 'Stays still'], ['flies', 'Terbang', 'Flies']], 0, 'Pena bergerak maju sambil menggambar.', 'The pen draws while moving forward.'],
    ['pen-five', 'Maju 5 saja. Gambar yang muncul?', 'Move 5 only. What appears?', [['line', 'Garis lurus', 'A straight line'], ['square', 'Kotak', 'A square'], ['circle', 'Lingkaran', 'A circle']], 0, 'Satu gerakan maju membuat garis lurus.', 'One forward move makes a straight line.'],
    ['square-turns', 'Menggambar kotak butuh berapa kali belok?', 'How many turns are needed to draw a square?', [['four', '4', '4'], ['two', '2', '2'], ['six', '6', '6']], 0, 'Kotak memiliki empat sudut.', 'A square has four corners.'],
    ['turn-job', 'Blok Belok membuat pena ...', 'The Turn block makes the pen ...', [['direction', 'Mengubah arah', 'Change direction'], ['stop', 'Berhenti', 'Stop'], ['erase', 'Menghapus gambar', 'Erase the drawing']], 0, 'Pena berbelok ke arah baru.', 'The pen turns toward a new direction.'],
    ['lift-pen', 'Blok Angkat pena membuat ...', 'The Lift Pen block makes ...', [['no-drawing', 'Pena bergerak tanpa menggambar', 'The pen move without drawing'], ['erase', 'Gambar terhapus', 'The drawing disappear'], ['break', 'Pena patah', 'The pen break']], 0, 'Pena yang diangkat tidak menyentuh kertas.', 'A lifted pen does not touch the paper.'],
  ],
  'creative-g12-animasi': [
    ['animation-meaning', 'Animasi adalah ...', 'Animation is ...', [['moving', 'Gambar yang bergerak', 'Pictures that move'], ['still', 'Gambar diam', 'A still picture'], ['loud', 'Suara keras', 'A loud sound']], 0, 'Animasi membuat gambar tampak bergerak.', 'Animation makes pictures seem to move.'],
    ['animation-right', 'Blok untuk menggeser karakter ke kanan?', 'Which block moves a character right?', [['right', 'Geser ke kanan', 'Move right'], ['erase', 'Hapus', 'Erase'], ['sound', 'Bunyi', 'Sound']], 0, 'Geser ke kanan mengubah posisi ke kanan.', 'Move right changes the position to the right.'],
    ['animation-repeat-four', 'Ulangi 4 kali: geser 1 langkah. Total?', 'Repeat 4 times: move 1 step. Total?', [['four', '4', '4'], ['one', '1', '1'], ['five', '5', '5']], 0, 'Satu langkah diulang empat kali.', 'One step is repeated four times.'],
    ['animation-frames', 'Animasi terlihat bergerak karena gambar ...', 'Animation looks like movement because pictures ...', [['change-fast', 'Berganti cepat', 'Change quickly'], ['same', 'Tidak berubah', 'Never change'], ['vanish', 'Hilang', 'Disappear']], 0, 'Gambar yang berubah cepat tampak bergerak.', 'Pictures changing quickly appear to move.'],
    ['animation-repeat', 'Karakter bergeser sedikit lalu diulang. Hasilnya ...', 'A character moves a little, then repeats. It ...', [['walks', 'Terlihat berjalan', 'Looks like it walks'], ['still', 'Terlihat diam', 'Looks still'], ['gone', 'Terlihat hilang', 'Looks gone']], 0, 'Gerakan kecil yang diulang tampak seperti berjalan.', 'Small repeated movements look like walking.'],
  ],
  'creative-g12-bunyi-musik': [
    ['sound-block', 'Blok Bunyi membuat komputer ...', 'The Sound block makes the computer ...', [['sound', 'Mengeluarkan suara', 'Make a sound'], ['color', 'Change color', 'Change color'], ['delete', 'Menghapus gambar', 'Delete a picture']], 0, 'Blok Bunyi memainkan suara.', 'The Sound block plays a sound.'],
    ['music-notes', 'Nada rendah, sedang, tinggi berurutan seperti ...', 'Low, medium, and high notes sound like ...', [['scale', 'Tangga nada naik', 'A rising scale'], ['one-note', 'Satu suara saja', 'One sound only'], ['silence', 'Hening', 'Silence']], 0, 'Nada bergerak dari rendah ke tinggi.', 'The notes move from low to high.'],
    ['sound-high', 'Suara mana yang lebih tinggi?', 'Which sound has a higher pitch?', [['bird', 'Cicit burung', 'Bird chirping'], ['thunder', 'Gemuruh guntur', 'Thunder rumbling'], ['same', 'Sama saja', 'The same']], 0, 'Cicit burung bernada lebih tinggi.', 'Bird chirping has a higher pitch.'],
    ['cat-sound', 'Mau suara kucing. Pilih blok.', 'Want a cat sound. Choose a block.', [['meow', 'Bunyi: Meong', 'Sound: Meow'], ['woof', 'Bunyi: Guk', 'Sound: Woof'], ['moo', 'Bunyi: Muu', 'Sound: Moo']], 0, 'Kucing mengeong.', 'Cats meow.'],
    ['notes-song', 'Banyak nada dimainkan berurutan menjadi ...', 'Many notes played in order make a ...', [['song', 'Lagu', 'Song'], ['picture', 'Gambar', 'Picture'], ['button', 'Tombol', 'Button']], 0, 'Nada berurutan dapat membentuk lagu.', 'Notes in order can make a song.'],
  ],
  'creative-g12-cerita-interaktif': [
    ['story-choice', 'Cerita interaktif berubah sesuai ...', 'An interactive story changes based on ...', [['reader', 'Pilihan pembaca', 'The reader’s choices'], ['screen-color', 'Warna layar', 'The screen color'], ['font', 'Ukuran huruf', 'Font size']], 0, 'Pilihan pembaca dapat mengubah ceritanya.', 'The reader’s choices can change the story.'],
    ['story-button', 'Tombol dalam cerita dipakai untuk ...', 'Buttons in a story are used to ...', [['choose', 'Memilih kelanjutan cerita', 'Choose what happens next'], ['power', 'Mematikan komputer', 'Turn off the computer'], ['erase', 'Menghapus cerita', 'Erase the story']], 0, 'Tombol memberi pilihan pada pembaca.', 'Buttons give the reader choices.'],
    ['story-parts', 'Cerita punya awal, pilihan, dan ...', 'A story has a start, a choice, and an ...', [['ending', 'Akhir', 'Ending'], ['nothing', 'Tidak ada', 'Nothing'], ['sound', 'Suara', 'Sound']], 0, 'Cerita berlanjut sampai akhir.', 'A story continues to an ending.'],
    ['story-home', 'Buka ke taman, Pulang ke rumah. Pilih Pulang. Kucing di mana?', 'Open goes to the garden, Home goes home. Choose Home. Where is the cat?', [['home', 'Di rumah', 'At home'], ['garden', 'Di taman', 'In the garden'], ['school', 'Di sekolah', 'At school']], 0, 'Tombol Pulang membawa kucing ke rumah.', 'The Home button takes the cat home.'],
    ['story-fun', 'Mengapa cerita interaktif seru?', 'Why are interactive stories fun?', [['choose', 'Pembaca ikut memilih', 'Readers get to choose'], ['no-pictures', 'Tidak ada gambar', 'There are no pictures'], ['same', 'Selalu sama', 'They are always the same']], 0, 'Pilihan membuat pembaca ikut dalam cerita.', 'Choices let readers take part in the story.'],
  ],
};

quizBanks['creative-g34-animasi-dan-gerak'] = [
  ['motion-position', 'Gerak dibuat dengan ...', 'Movement is made by ...', [['change', 'Mengubah posisi sedikit demi sedikit', 'Changing position a little at a time'], ['erase', 'Menghapus karakter', 'Deleting a character'], ['color', 'Mengubah warna saja', 'Only changing color']], 0, 'Posisi berubah sedikit demi sedikit.', 'The position changes a little at a time.'],
  ['motion-trace', 'Bola x=0. Ulangi 4 kali: geser 5. Posisi akhir?', 'Ball x=0. Repeat 4 times: move 5. Final position?', [['20', '20', '20'], ['5', '5', '5'], ['9', '9', '9']], 0, 'Empat geseran 5 menghasilkan 20.', 'Four moves of 5 reach 20.'],
  ['motion-speed', 'Agar bola bergerak lebih cepat, kita ...', 'To make a ball move faster, we ...', [['increase', 'Menambah jarak geser', 'Increase the move distance'], ['decrease', 'Mengurangi jarak geser', 'Decrease the move distance'], ['erase', 'Menghapus bola', 'Erase the ball']], 0, 'Jarak geser yang lebih besar membuat gerak lebih cepat.', 'A bigger move distance makes the movement faster.'],
  ['motion-pause', 'Jeda lebih lama antar geseran membuat gerak ...', 'A longer pause between moves makes motion ...', [['slower', 'Lebih lambat', 'Slower'], ['faster', 'Lebih cepat', 'Faster'], ['forever', 'Berhenti selamanya', 'Stop forever']], 0, 'Bola menunggu lebih lama setiap geseran.', 'The ball waits longer between moves.'],
  ['motion-net', 'Bola x=10. Geser 5 kanan, lalu 3 kiri. Posisi?', 'Ball x=10. Move 5 right, then 3 left. Position?', [['12', '12', '12'], ['18', '18', '18'], ['8', '8', '8']], 0, '10 + 5 - 3 = 12.', '10 + 5 - 3 = 12.'],
];
quizBanks['creative-g34-menggambar-dengan-kode'] = [
  ['draw-square-repeats', 'Untuk menggambar kotak, berapa kali ulangi maju lalu belok?', 'How many times do we repeat move then turn to draw a square?', [['4', '4', '4'], ['3', '3', '3'], ['2', '2', '2']], 0, 'Kotak punya empat sisi.', 'A square has four sides.'],
  ['draw-square-length', 'Ulangi 4 kali: maju 5, belok 90. Total panjang garis?', 'Repeat 4 times: move 5, turn 90. Total line length?', [['20', '20', '20'], ['9', '9', '9'], ['5', '5', '5']], 0, 'Empat garis panjang 5 berjumlah 20.', 'Four lines of length 5 total 20.'],
  ['draw-triangle', 'Ulangi 3 kali: maju 5, belok 120. Bentuk apa?', 'Repeat 3 times: move 5, turn 120. What shape?', [['triangle', 'Segitiga', 'Triangle'], ['square', 'Kotak', 'Square'], ['line', 'Garis', 'Line']], 0, 'Tiga sisi membentuk segitiga.', 'Three sides make a triangle.'],
  ['draw-loop', 'Mengapa memakai loop untuk menggambar bentuk?', 'Why use a loop to draw a shape?', [['short', 'Supaya kode lebih singkat', 'To make the code shorter'], ['dark', 'Supaya gambar gelap', 'To make the drawing dark'], ['break', 'Supaya pena patah', 'To break the pen']], 0, 'Loop menggantikan perintah yang berulang.', 'A loop replaces repeated commands.'],
  ['draw-turn-angle', 'Belok 90 derajat membuat pena ...', 'A 90-degree turn makes the pen ...', [['corner', 'Berbelok siku-siku', 'Turn at a right angle'], ['reverse', 'Berbalik arah', 'Turn around'], ['same', 'Tidak berubah', 'Stay the same']], 0, 'Sudut 90 derajat adalah sudut siku-siku.', 'A 90-degree angle is a right angle.'],
];
quizBanks['creative-g34-suara-dan-interaksi'] = [
  ['piano-event', 'Bunyi bisa dimainkan saat ...', 'A sound can play when ...', [['event', 'Ada event, misalnya tombol ditekan', 'An event happens, like a button press'], ['nothing', 'Tidak ada apa-apa', 'Nothing happens'], ['off', 'Komputer mati', 'The computer is off']], 0, 'Event tombol memicu suara.', 'A button event triggers the sound.'],
  ['piano-scale', 'Urutkan nada dari rendah ke tinggi.', 'Order the notes from low to high.', [['do-re-mi', 'do, re, mi', 'do, re, mi'], ['mi-re-do', 'mi, re, do', 'mi, re, do'], ['re-do-mi', 're, do, mi', 're, do, mi']], 0, 'Urutan ini bergerak dari nada rendah ke nada tinggi.', 'This order moves from low notes to high notes.'],
  ['piano-button', 'Piano mini memakai ... untuk setiap nada.', 'A mini piano uses ... for each note.', [['button', 'Satu tombol', 'One button'], ['picture', 'Satu gambar', 'One picture'], ['background', 'Satu warna latar', 'One background color']], 0, 'Tiap tombol dapat memainkan nada berbeda.', 'Each button can play a different note.'],
  ['piano-wait', 'Kalau tidak ada yang menekan tombol, bunyi ...', 'If nobody presses a button, the sound ...', [['silent', 'Tidak berbunyi', 'Does not play'], ['always', 'Berbunyi terus', 'Plays continuously'], ['twice', 'Berbunyi dua kali', 'Plays twice']], 0, 'Bunyi menunggu event tombol.', 'The sound waits for a button event.'],
  ['piano-new-button', 'Agar tombol baru berbunyi, kita perlu ...', 'To make a new button play a sound, we need to ...', [['add-sound', 'Menambah blok bunyi pada tombol itu', 'Add a sound block to that button'], ['remove', 'Menghapus semua tombol', 'Remove all buttons'], ['color', 'Mengganti warna latar', 'Change the background color']], 0, 'Blok bunyi menghubungkan event dan nada.', 'The sound block connects the event and note.'],
];
quizBanks['creative-g34-proyek-kuis-interaktif'] = [
  ['quiz-parts', 'Kuis interaktif punya ...', 'An interactive quiz has ...', [['parts', 'Pertanyaan, pilihan, dan skor', 'Questions, choices, and a score'], ['color', 'Hanya warna', 'Only colors'], ['sound', 'Hanya suara', 'Only sound']], 0, 'Kuis memakai pertanyaan, pilihan, dan skor.', 'A quiz uses questions, choices, and a score.'],
  ['quiz-score-rule', 'Skor naik kalau ...', 'The score goes up when ...', [['right', 'Jawaban benar', 'The answer is correct'], ['wrong', 'Jawaban salah', 'The answer is wrong'], ['always', 'Selalu', 'Always']], 0, 'Jawaban yang benar menambah skor.', 'A correct answer adds to the score.'],
  ['quiz-wrong-feedback', 'Jika jawaban pemain salah, apa yang sebaiknya dilakukan kuis?', 'If a player answers incorrectly, what should the quiz do?', [['feedback', 'Tampilkan pesan yang membantu', 'Show a helpful message'], ['add-score', 'Menambah skor', 'Add to the score'], ['hide-question', 'Menghilangkan pertanyaan', 'Hide the question']], 0, 'Pesan membantu pemain tahu jawabannya belum tepat.', 'Feedback helps the player know the answer was not correct.'],
  ['quiz-first', 'Langkah pertama membuat kuis?', 'What is the first step in making a quiz?', [['question', 'Menulis pertanyaan', 'Write a question'], ['result', 'Menampilkan skor akhir', 'Show the final score'], ['remove', 'Menghapus tombol', 'Remove buttons']], 0, 'Kuis dimulai dengan pertanyaan.', 'A quiz starts with a question.'],
  ['quiz-result', 'Mengapa kuis menampilkan skor di akhir?', 'Why does a quiz show a score at the end?', [['know', 'Supaya pemain tahu hasilnya', 'So players know their result'], ['off', 'Supaya kuis mati', 'To turn off the quiz'], ['hide', 'Supaya tombol hilang', 'To hide the buttons']], 0, 'Skor membantu pemain melihat hasilnya.', 'A score helps players see their result.'],
];
quizBanks['creative-g34-proyek-game-labirin'] = [
  ['maze-controls', 'Pemain menggerakkan karakter dengan ...', 'Players move a character with ...', [['arrows', 'Tombol panah', 'Arrow keys'], ['voice', 'Suara saja', 'Only sound'], ['color', 'Warna latar', 'Background color']], 0, 'Tombol panah memberi arah gerak.', 'Arrow keys give movement directions.'],
  ['maze-wall', 'Karakter menyentuh dinding. Apa yang seharusnya terjadi?', 'The character touches a wall. What should happen?', [['blocked', 'Karakter tidak bisa menembus', 'The character cannot pass through'], ['pass', 'Karakter menembus', 'The character passes through'], ['erase', 'Game dihapus', 'The game is erased']], 0, 'Dinding membatasi jalur karakter.', 'Walls limit the character’s path.'],
  ['maze-exit', 'Karakter sampai di pintu keluar berarti ...', 'The character reaches the exit. This means ...', [['win', 'Pemain menang', 'The player wins'], ['lose', 'Pemain kalah', 'The player loses'], ['repeat', 'Game berulang', 'The game repeats']], 0, 'Pintu keluar adalah tujuan labirin.', 'The exit is the maze goal.'],
  ['maze-position', 'Mulai di kotak 1. Kanan 2 kali tanpa dinding. Sampai di?', 'Start at box 1. Move right twice without walls. Reach box?', [['3', '3', '3'], ['2', '2', '2'], ['1', '1', '1']], 0, 'Dua langkah dari kotak 1 sampai kotak 3.', 'Two moves from box 1 reach box 3.'],
  ['maze-event', 'Event apa yang menggerakkan karakter?', 'Which event moves the character?', [['arrow', 'Tombol panah ditekan', 'An arrow key is pressed'], ['dark', 'Layar gelap', 'The screen goes dark'], ['silence', 'Suara berhenti', 'The sound stops']], 0, 'Tekanan tombol panah memicu gerakan.', 'Pressing an arrow key triggers movement.'],
];
quizBanks['creative-g34-proyek-pameran-karyaku'] = [
  ['gallery-show', 'Galeri karya menampilkan ...', 'An art gallery shows ...', [['art', 'Gambar buatan kita', 'Our own artwork'], ['text', 'Hanya teks panjang', 'Only long text'], ['sound', 'Hanya suara', 'Only sound']], 0, 'Galeri menampilkan karya yang dibuat.', 'A gallery displays the artwork we made.'],
  ['gallery-next', 'Tombol Berikutnya dipakai untuk ...', 'The Next button is used to ...', [['next', 'Pindah ke gambar selanjutnya', 'Move to the next image'], ['delete', 'Menghapus gambar', 'Delete an image'], ['off', 'Mematikan galeri', 'Turn off the gallery']], 0, 'Berikutnya membuka gambar setelah ini.', 'Next opens the image after this one.'],
  ['gallery-count', 'Ada 3 gambar. Gambar 1, tekan Berikutnya 2 kali. Gambar?', 'There are 3 images. Start at 1, press Next twice. Which image?', [['3', '3', '3'], ['2', '2', '2'], ['1', '1', '1']], 0, 'Dua kali Berikutnya membawa kita ke gambar 3.', 'Pressing Next twice takes us to image 3.'],
  ['gallery-previous', 'Gambar 2 sedang dilihat. Tekan Sebelumnya. Gambar?', 'Viewing image 2. Press Previous. Which image?', [['1', '1', '1'], ['3', '3', '3'], ['2', '2', '2']], 0, 'Sebelumnya dari gambar 2 adalah gambar 1.', 'Previous from image 2 is image 1.'],
  ['gallery-title', 'Mengapa setiap gambar diberi judul?', 'Why give each image a title?', [['understand', 'Supaya penonton tahu isinya', 'So viewers know what it shows'], ['small', 'Supaya gambar kecil', 'To make the image small'], ['hide', 'Supaya gambar hilang', 'To hide the image']], 0, 'Judul menjelaskan isi karya.', 'A title explains the artwork.'],
];
quizBanks['creative-g56-halaman-web-html-css'] = [
  ['web-html', 'HTML dipakai untuk ...', 'HTML is used to ...', [['structure', 'Menyusun isi halaman web', 'Structure a web page'], ['math', 'Menghitung angka', 'Count numbers'], ['music', 'Memutar lagu', 'Play music']], 0, 'HTML menyusun isi seperti judul dan paragraf.', 'HTML structures content like headings and paragraphs.'],
  ['web-css', 'CSS dipakai untuk ...', 'CSS is used to ...', [['style', 'Mengatur tampilan, warna, dan ukuran', 'Style colors and sizes'], ['data', 'Menyimpan data', 'Store data'], ['email', 'Mengirim email', 'Send email']], 0, 'CSS mengatur tampilan halaman.', 'CSS controls how a page looks.'],
  ['web-heading', 'Tag mana untuk judul besar?', 'Which tag makes a large heading?', [['h1', '<h1>', '<h1>'], ['p', '<p>', '<p>'], ['img', '<img>', '<img>']], 0, 'Tag h1 menandai judul utama.', 'The h1 tag marks a main heading.'],
  ['web-blue', 'Mana CSS untuk tulisan biru?', 'Which CSS makes text blue?', [['color', 'color: blue;', 'color: blue;'], ['missing-colon', 'color blue', 'color blue'], ['reverse', 'blue: color;', 'blue: color;']], 0, 'Properti color diberi nilai blue.', 'The color property is set to blue.'],
  ['web-close-tag', 'Tag pembuka <p> biasanya punya ...', 'An opening <p> tag usually has a ...', [['closing', 'Tag penutup </p>', 'Closing </p> tag'], ['question', 'Tanda tanya', 'Question mark'], ['image', 'Gambar', 'Image']], 0, 'Tag penutup mengakhiri paragraf.', 'A closing tag ends the paragraph.'],
];
quizBanks['creative-g56-animasi-dan-interaksi'] = [
  ['event-hover', 'Event hover terjadi ketika ...', 'A hover event happens when ...', [['pointer', 'Kursor berada di atas elemen', 'The pointer is over an element'], ['close', 'Halaman ditutup', 'The page closes'], ['screen', 'Layar dimatikan', 'The screen turns off']], 0, 'Hover berarti kursor berada di atas elemen.', 'Hover means the pointer is over an element.'],
  ['event-click', 'Event click terjadi ketika ...', 'A click event happens when ...', [['click', 'Elemen diklik', 'An element is clicked'], ['pointer', 'Kursor diam', 'The pointer is still'], ['type', 'Huruf diketik', 'A letter is typed']], 0, 'Klik adalah tindakan pengguna pada elemen.', 'A click is a user action on an element.'],
  ['click-count', 'klik=0. Setiap klik tambah 1. Diklik 3 kali. Isi klik?', 'click=0. Each click adds 1. Click 3 times. Value?', [['3', '3', '3'], ['1', '1', '1'], ['0', '0', '0']], 0, 'Nilai bertambah satu sebanyak tiga kali.', 'The value increases by one three times.'],
  ['event-function', 'Fungsi dalam interaksi dijalankan ...', 'A function in an interaction runs ...', [['event', 'Saat event terjadi', 'When an event happens'], ['before', 'Sebelum halaman dibuat', 'Before the page is made'], ['never', 'Tidak pernah', 'Never']], 0, 'Event memicu fungsi.', 'An event triggers the function.'],
  ['button-feedback', 'Mengapa animasi kecil berguna di tombol?', 'Why is a small button animation useful?', [['react', 'Memberi tahu tombol bereaksi', 'It shows the button responds'], ['delete', 'Menghapus tombol', 'It deletes the button'], ['error', 'Membuat halaman error', 'It makes the page error']], 0, 'Animasi memberi umpan balik pada pengguna.', 'Animation gives feedback to the user.'],
];
quizBanks['creative-g56-data-dan-daftar'] = [
  ['list-many', 'List menyimpan ...', 'A list stores ...', [['many', 'Banyak nilai dalam satu variabel', 'Many values in one variable'], ['one', 'Hanya satu angka', 'Only one number'], ['image', 'Hanya gambar', 'Only pictures']], 0, 'Satu list dapat menyimpan banyak nilai.', 'One list can store many values.'],
  ['list-first', 'buah=["apel","jeruk","mangga"]. buah[0] adalah ...', 'fruit=["apple","orange","mango"]. fruit[0] is ...', [['apple', 'apel', 'apple'], ['orange', 'jeruk', 'orange'], ['mango', 'mangga', 'mango']], 0, 'Indeks pertama adalah 0.', 'The first index is 0.'],
  ['list-index-start', 'Nomor urut pertama pada list adalah ...', 'The first list index is ...', [['0', '0', '0'], ['1', '1', '1'], ['2', '2', '2']], 0, 'List dimulai dari indeks 0.', 'Lists start at index 0.'],
  ['list-sort', 'Urutkan nilai [8, 6, 10] dari terkecil.', 'Sort the values [8, 6, 10] from smallest to largest.', [['6-8-10', '6, 8, 10', '6, 8, 10'], ['8-6-10', '8, 6, 10', '8, 6, 10'], ['10-8-6', '10, 8, 6', '10, 8, 6']], 0, 'Urutan dari terkecil dimulai 6, lalu 8, lalu 10.', 'Smallest to largest is 6, then 8, then 10.'],
  ['list-average', 'nilai=[8,6,10]. Rata-ratanya?', 'scores=[8,6,10]. What is the average?', [['8', '8', '8'], ['6', '6', '6'], ['24', '24', '24']], 0, 'Jumlah 24 dibagi 3 sama dengan 8.', 'The sum 24 divided by 3 is 8.'],
];
quizBanks['creative-g56-proyek-website-profilku'] = [
  ['profile-photo', 'Foto di halaman web memakai tag ...', 'A photo on a web page uses the ... tag', [['img', '<img>', '<img>'], ['h1', '<h1>', '<h1>'], ['p', '<p>', '<p>']], 0, 'Tag img menampilkan gambar.', 'The img tag displays an image.'],
  ['profile-safe', 'Mana yang aman ditulis di profil publik?', 'What is safe to include in a public profile?', [['hobby', 'Hobi', 'A hobby'], ['address', 'Alamat rumah', 'Home address'], ['phone', 'Nomor telepon', 'Phone number']], 0, 'Jangan bagikan alamat rumah atau nomor telepon.', 'Do not share a home address or phone number.'],
  ['profile-list', 'Daftar hobi memakai tag ...', 'A hobby list uses ... tags', [['list', '<ul> dan <li>', '<ul> and <li>'], ['h1', '<h1>', '<h1>'], ['img', '<img>', '<img>']], 0, 'ul dan li membuat daftar berpoin.', 'ul and li make a bulleted list.'],
  ['profile-heading', 'Judul halaman memakai tag ...', 'A page heading uses the ... tag', [['h1', '<h1>', '<h1>'], ['li', '<li>', '<li>'], ['img', '<img>', '<img>']], 0, 'h1 adalah judul besar.', 'h1 is a large heading.'],
  ['profile-titles', 'Mengapa bagian profil diberi judul?', 'Why give profile sections headings?', [['read', 'Supaya mudah dibaca', 'To make it easy to read'], ['hide', 'Supaya halaman hilang', 'To make the page disappear'], ['color', 'Supaya berwarna', 'To add color']], 0, 'Judul membantu pembaca menemukan bagian.', 'Headings help readers find each section.'],
];
quizBanks['creative-g56-proyek-game-tebak-angka'] = [
  ['guess-hidden', 'Mengapa angka rahasia disembunyikan?', 'Why is the secret number hidden?', [['guess', 'Agar pemain bisa menebaknya', 'So the player can guess it'], ['skip', 'Agar game tidak perlu mengecek', 'So the game can skip checking'], ['random', 'Agar angkanya menjadi acak', 'So the number becomes random']], 0, 'Pemain perlu menebak angka yang disembunyikan.', 'The player needs to guess the hidden number.'],
  ['guess-high', 'Angka rahasia 7. Tebakan 10. Petunjuknya?', 'Secret number is 7. Guess is 10. What is the hint?', [['lower', 'Lebih kecil', 'Lower'], ['higher', 'Lebih besar', 'Higher'], ['correct', 'Benar', 'Correct']], 0, 'Angka rahasia lebih kecil dari 10.', 'The secret number is less than 10.'],
  ['guess-loop', 'Loop tebakan berhenti ketika ...', 'The guessing loop stops when ...', [['match', 'Tebakan sama dengan angka rahasia', 'The guess matches the secret number'], ['first', 'Tebakan pertama', 'The first guess'], ['never', 'Tidak pernah', 'Never']], 0, 'Tebakan yang benar mengakhiri loop.', 'A correct guess ends the loop.'],
  ['guess-middle', 'Menebak angka 1 sampai 20. Tebakan pertama terbaik?', 'Guessing 1 to 20. What is the best first guess?', [['10', '10', '10'], ['1', '1', '1'], ['20', '20', '20']], 0, 'Tebakan di tengah membagi pilihan menjadi dua.', 'A middle guess splits the choices in two.'],
  ['guess-next', 'Angka 1-20. Tebak 10, lalu petunjuk “lebih besar”. Tebakan berikutnya?', 'Number 1-20. Guess 10, hint says “higher”. Next guess?', [['15', '15', '15'], ['11', '11', '11'], ['20', '20', '20']], 0, 'Tebakan tengah 15 membagi rentang 11 sampai 20.', 'The middle guess 15 splits the range from 11 to 20.'],
];
quizBanks['creative-g56-proyek-pameran-dan-presentasi-karya'] = [
  ['presentation-parts', 'Presentasi yang baik punya ...', 'A good presentation has ...', [['parts', 'Pembuka, isi, dan penutup', 'Opening, body, and closing'], ['closing', 'Hanya penutup', 'Only a closing'], ['image', 'Hanya gambar', 'Only images']], 0, 'Presentasi punya pembuka, isi, dan penutup.', 'A presentation has an opening, body, and closing.'],
  ['presentation-test', 'Apa yang sebaiknya dilakukan sebelum presentasi?', 'What should you do before a presentation?', [['test', 'Uji karya agar yakin berfungsi', 'Test the project to make sure it works'], ['hide', 'Sembunyikan semua bagian', 'Hide every part'], ['skip', 'Lewati persiapan', 'Skip preparation']], 0, 'Menguji karya membantu menemukan masalah lebih awal.', 'Testing helps find problems early.'],
  ['presentation-opening', 'Bagian pembuka berisi ...', 'The opening contains ...', [['title', 'Perkenalan nama dan judul karya', 'Your name and project title'], ['thanks', 'Ucapan terima kasih', 'A thank-you'], ['code', 'Daftar kode panjang', 'A long list of code']], 0, 'Pembuka mengenalkan pembuat dan karya.', 'The opening introduces the creator and project.'],
  ['presentation-feedback', 'Teman menemukan bug. Sikap terbaik?', 'A friend finds a bug. What is the best response?', [['thanks', 'Berterima kasih lalu memperbaikinya', 'Thank them and fix it'], ['angry', 'Marah', 'Get angry'], ['hide', 'Menyembunyikan karya', 'Hide the project']], 0, 'Umpan balik membantu memperbaiki karya.', 'Feedback helps improve a project.'],
  ['presentation-demo', 'Mengapa menunjukkan cara kerja karya?', 'Why show how a project works?', [['understand', 'Supaya penonton paham', 'So the audience understands'], ['vanish', 'Supaya karya hilang', 'So the project disappears'], ['waste', 'Supaya waktu habis', 'To use up time']], 0, 'Contoh penggunaan membantu penonton memahami karya.', 'A demonstration helps the audience understand the project.'],
];

export function getCreativeCodingTasks(unitId) {
  return activities[unitId] || null;
}

export function getCreativeCodingQuestions(unitId) {
  const bank = quizBanks[unitId];
  if (!bank) return null;
  const questions = bank.map(([suffix, promptId, promptEn, options, answerIndex, reasonId, reasonEn]) => (
    question(`${unitId}-${suffix}`, promptId, promptEn, options, answerIndex, reasonId, reasonEn)
  ));
  return unitId.startsWith('creative-g56-')
    ? questions.map((item, index) => (index < 2 ? { ...item, practice: true } : item))
    : questions;
}

export function iosCreativeVisualKey(index) {
  return ['sparkle', 'writing', 'game', 'phone', 'eyes', 'world', 'puzzle', 'lamp', 'robot'][index % 9];
}
