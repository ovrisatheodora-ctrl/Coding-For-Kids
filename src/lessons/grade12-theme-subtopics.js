const localized = (id, en) => ({ id, en });

function createQuestion(id, prompt, answerId, answer, distractorId, distractor, hint, explanation) {
  return {
    id,
    type: 'multiple-choice',
    prompt,
    options: [
      { id: answerId, text: answer },
      { id: distractorId, text: distractor },
    ],
    answer: answerId,
    hint,
    explanation,
  };
}

function createUnit({ id, lessonId, title, material, example, activity, questions, badgeId }) {
  return {
    id,
    lessonId,
    grade: '1-2',
    title,
    material: material.map(([key, text]) => ({ key: `${id}-${key}`, text })),
    example: {
      sequence: example.symbols.map(([symbol, label], index) => ({
        id: `${id}-example-${index + 1}`,
        symbol,
        label,
      })),
      caption: example.caption,
    },
    activity: {
      type: 'pick',
      title: activity.title,
      sequence: activity.sequence,
      options: activity.options.map((option) => option.text),
      answer: activity.answer,
      success: localized('🎉 Hebat, benar!', '🎉 Great, correct!'),
      hint: localized('Hampir! Coba lagi ya 💪', 'Almost! Try again 💪'),
    },
    questions,
    badgeId,
  };
}

const basicCodingSubtopics = [
  createUnit({
    id: 'basic-g12-apa-itu-coding',
    lessonId: 'basic-coding',
    title: localized('Apa itu Coding?', 'What Is Coding?'),
    material: [
      ['meaning', localized('Coding adalah cara memberi instruksi kepada komputer.', 'Coding is a way to give instructions to a computer.')],
      ['clear-steps', localized('Instruksi yang jelas membantu komputer melakukan tugas.', 'Clear instructions help a computer do a task.')],
    ],
    example: {
      symbols: [['🧒', localized('kita', 'we')], ['💬', localized('memberi perintah', 'give a command')], ['💻', localized('komputer bekerja', 'computer works')]],
      caption: localized('Kita memberi perintah, lalu komputer mengikutinya.', 'We give a command, then the computer follows it.'),
    },
    activity: {
      title: localized('Mana contoh perintah untuk komputer?', 'Which is an instruction for a computer?'),
      sequence: ['🧒', '💬', '❓'],
      options: [
        { text: localized('Tampilkan gambar ⭐', 'Show a ⭐ picture') },
        { text: localized('Ayo tidur', 'Go to sleep') },
      ],
      answer: 0,
    },
    questions: [
      createQuestion('coding-definition', localized('Coding berarti...', 'Coding means...'), 'instruction', localized('Memberi instruksi ke komputer', 'Giving instructions to a computer'), 'snack', localized('Makan camilan', 'Eating a snack'), localized('Coding berisi perintah untuk komputer.', 'Coding contains commands for a computer.'), localized('Komputer mengikuti instruksi yang kita berikan.', 'A computer follows the instructions we give it.')),
      createQuestion('coding-purpose', localized('Dengan coding, komputer bisa...', 'With coding, a computer can...'), 'task', localized('Melakukan tugas', 'Do a task'), 'guess', localized('Menebak pikiran', 'Guess our thoughts'), localized('Komputer bekerja setelah menerima instruksi.', 'A computer works after receiving instructions.'), localized('Coding membantu komputer melakukan tugas.', 'Coding helps a computer do a task.')),
    ],
    badgeId: 'junior-coder',
  }),
  createUnit({
    id: 'basic-g12-blok-perintah',
    lessonId: 'basic-coding',
    title: localized('Kenal Blok Perintah', 'Meet Command Blocks'),
    material: [
      ['block-command', localized('Blok perintah adalah gambar yang memberi tahu komputer apa yang dilakukan.', 'A command block is a picture that tells a computer what to do.')],
      ['connect-blocks', localized('Beberapa blok bisa disambungkan menjadi satu program.', 'Several blocks can be connected to make a program.')],
    ],
    example: {
      symbols: [['🟩', localized('mulai', 'start')], ['➡️', localized('bergerak', 'move')], ['💬', localized('berbicara', 'say')]],
      caption: localized('Setiap blok punya tugas. Sambungkan agar menjadi perintah.', 'Each block has a job. Connect them to make instructions.'),
    },
    activity: {
      title: localized('Blok mana yang membuat karakter bergerak?', 'Which block makes a character move?'),
      sequence: ['🧩', '❓'],
      options: [
        { text: localized('➡️ Bergerak', '➡️ Move') },
        { text: localized('🔊 Suara', '🔊 Sound') },
      ],
      answer: 0,
    },
    questions: [
      createQuestion('blocks-purpose', localized('Blok perintah membantu kita...', 'Command blocks help us...'), 'command', localized('Memberi perintah', 'Give commands'), 'decorate', localized('Menghias meja', 'Decorate a table'), localized('Blok memberi tahu komputer apa yang harus dilakukan.', 'Blocks tell the computer what to do.'), localized('Blok adalah perintah bergambar.', 'Blocks are picture commands.')),
      createQuestion('blocks-connect', localized('Blok bisa disambungkan menjadi...', 'Blocks can be connected into a...'), 'program', localized('Program', 'Program'), 'sandwich', localized('Sandwich', 'Sandwich'), localized('Blok yang tersambung menjadi kumpulan instruksi.', 'Connected blocks form a set of instructions.'), localized('Blok yang disambungkan membentuk program.', 'Connected blocks form a program.')),
    ],
    badgeId: 'junior-coder',
  }),
  createUnit({
    id: 'basic-g12-menjalankan-program',
    lessonId: 'basic-coding',
    title: localized('Menjalankan Program', 'Run a Program'),
    material: [
      ['start-program', localized('Tekan tombol mulai untuk menjalankan program.', 'Press the start button to run a program.')],
      ['watch-result', localized('Amati apa yang dilakukan karakter setelah program berjalan.', 'Watch what the character does after the program runs.')],
    ],
    example: {
      symbols: [['🧩', localized('susun blok', 'arrange blocks')], ['▶️', localized('mulai', 'start')], ['🐱', localized('karakter bergerak', 'character moves')]],
      caption: localized('Susun bloknya, tekan mulai, lalu lihat hasilnya.', 'Arrange the blocks, press start, then watch the result.'),
    },
    activity: {
      title: localized('Tombol mana untuk menjalankan program?', 'Which button runs the program?'),
      sequence: ['🧩', '➡️', '❓'],
      options: [
        { text: localized('▶️ Mulai', '▶️ Start') },
        { text: localized('⏸️ Jeda', '⏸️ Pause') },
      ],
      answer: 0,
    },
    questions: [
      createQuestion('run-start', localized('Untuk menjalankan program, tekan...', 'To run a program, press...'), 'play', localized('▶️ Mulai', '▶️ Start'), 'stop', localized('⏹️ Berhenti', '⏹️ Stop'), localized('Pilih tombol dengan tanda mulai.', 'Choose the button with the start symbol.'), localized('Tombol mulai menjalankan instruksi.', 'The start button runs the instructions.')),
      createQuestion('run-observe', localized('Setelah program berjalan, kita...', 'After the program runs, we...'), 'watch', localized('Mengamati hasilnya', 'Watch the result'), 'hide', localized('Menutup mata', 'Close our eyes'), localized('Lihat apa yang dilakukan karakter.', 'See what the character does.'), localized('Mengamati hasil membantu kita tahu apakah program bekerja.', 'Watching the result helps us know whether the program works.')),
    ],
    badgeId: 'junior-coder',
  }),
  createUnit({
    id: 'basic-g12-gerakkan-karakter',
    lessonId: 'basic-coding',
    title: localized('Gerakkan Karakter', 'Move a Character'),
    material: [
      ['move-command', localized('Gunakan blok gerak untuk memindahkan karakter.', 'Use a movement block to move a character.')],
      ['direction', localized('Panah menunjukkan arah gerak: atas, bawah, kiri, atau kanan.', 'Arrows show the direction: up, down, left, or right.')],
    ],
    example: {
      symbols: [['🐸', localized('katak', 'frog')], ['➡️', localized('kanan', 'right')], ['🌿', localized('daun', 'leaf')]],
      caption: localized('Katak bergerak ke kanan untuk mendekati daun.', 'The frog moves right to get closer to the leaf.'),
    },
    activity: {
      title: localized('Bantu robot 🤖 bergerak ke kanan menuju ⭐.', 'Help the robot 🤖 move right to ⭐.'),
      sequence: ['🤖', '⬜', '⭐'],
      options: [
        { text: localized('➡️ Kanan', '➡️ Right') },
        { text: localized('⬅️ Kiri', '⬅️ Left') },
      ],
      answer: 0,
    },
    questions: [
      createQuestion('move-right', localized('Panah untuk bergerak ke kanan adalah...', 'The arrow to move right is...'), 'right', localized('➡️', '➡️'), 'left', localized('⬅️', '⬅️'), localized('Arah kanan menunjuk ke tangan kanan.', 'Right points toward your right hand.'), localized('Panah ➡️ berarti bergerak ke kanan.', 'The ➡️ arrow means move right.')),
      createQuestion('move-block', localized('Blok gerak digunakan untuk...', 'A movement block is used to...'), 'move', localized('Memindahkan karakter', 'Move a character'), 'sound', localized('Memainkan suara', 'Play a sound'), localized('Namanya memberi petunjuk: blok gerak.', 'Its name gives a clue: movement block.'), localized('Blok gerak mengubah posisi karakter.', 'A movement block changes the character’s position.')),
    ],
    badgeId: 'robot-explorer',
  }),
  createUnit({
    id: 'basic-g12-ulangi-blok',
    lessonId: 'basic-coding',
    title: localized('Ulangi dengan Blok', 'Repeat with Blocks'),
    material: [
      ['repeat-block', localized('Blok ulangi menjalankan perintah yang sama beberapa kali.', 'A repeat block runs the same command several times.')],
      ['repeat-count', localized('Angka pada blok menunjukkan berapa kali perintah diulang.', 'The number on the block shows how many times a command repeats.')],
    ],
    example: {
      symbols: [['🔁', localized('ulangi', 'repeat')], ['3️⃣', localized('tiga kali', 'three times')], ['👏', localized('tepuk', 'clap')], ['👏👏👏', localized('tiga tepuk', 'three claps')]],
      caption: localized('Ulangi 3 kali tepuk menghasilkan tiga tepuk tangan.', 'Repeat clap 3 times to make three claps.'),
    },
    activity: {
      title: localized('Ulangi 2× lompat 🦘 menjadi...', 'Repeat jump 🦘 2× to make...'),
      sequence: ['🔁', '2️⃣', '🦘', '❓'],
      options: [
        { text: localized('🦘🦘 Dua lompatan', '🦘🦘 Two jumps') },
        { text: localized('🦘 Satu lompatan', '🦘 One jump') },
      ],
      answer: 0,
    },
    questions: [
      createQuestion('repeat-count', localized('Ulangi 3× berarti melakukan perintah...', 'Repeat 3× means doing the command...'), 'three', localized('Tiga kali', 'Three times'), 'one', localized('Satu kali', 'One time'), localized('Angka pada blok menunjukkan jumlah pengulangan.', 'The number on the block tells how many repeats.'), localized('Ulangi 3× berarti lakukan tiga kali.', 'Repeat 3× means do it three times.')),
      createQuestion('repeat-use', localized('Blok ulangi cocok untuk perintah yang...', 'A repeat block is useful for a command that...'), 'same', localized('Dilakukan berkali-kali', 'Happens many times'), 'never', localized('Tidak dilakukan', 'Is never done'), localized('Perhatikan perintah yang sama terus muncul.', 'Look for a command that appears again and again.'), localized('Blok ulangi menghemat pengulangan perintah yang sama.', 'A repeat block saves rewriting the same command.')),
    ],
    badgeId: 'junior-coder',
  }),
];

const creativeCodingSubtopics = [
  createUnit({
    id: 'creative-g12-warnai-panggung',
    lessonId: 'creative-coding',
    title: localized('Warnai Panggung', 'Color the Stage'),
    material: [
      ['stage-background', localized('Panggung adalah tempat karakter tampil.', 'The stage is where characters appear.')],
      ['choose-color', localized('Pilih warna latar agar suasana cerita terasa seru.', 'Choose a background color to make the story feel exciting.')],
    ],
    example: {
      symbols: [['🎭', localized('panggung', 'stage')], ['🌌', localized('latar malam', 'night background')], ['⭐', localized('bintang', 'star')]],
      caption: localized('Latar malam membuat panggung terasa seperti luar angkasa.', 'A night background makes the stage feel like outer space.'),
    },
    activity: {
      title: localized('Pilih latar untuk cerita luar angkasa.', 'Choose a background for a space story.'),
      sequence: ['🚀', '🎭', '❓'],
      options: [
        { text: localized('🌌 Langit malam', '🌌 Night sky') },
        { text: localized('🏖️ Pantai siang', '🏖️ Sunny beach') },
      ],
      answer: 0,
    },
    questions: [
      createQuestion('stage-purpose', localized('Panggung adalah tempat untuk...', 'A stage is a place for...'), 'show', localized('Menampilkan karakter', 'Showing characters'), 'sleep', localized('Menyimpan sepatu', 'Storing shoes'), localized('Karakter terlihat di panggung.', 'Characters appear on the stage.'), localized('Panggung adalah tempat karakter tampil.', 'A stage is where characters appear.')),
      createQuestion('stage-space', localized('Latar yang cocok untuk roket adalah...', 'A good background for a rocket is...'), 'space', localized('🌌 Luar angkasa', '🌌 Outer space'), 'bath', localized('🛁 Kamar mandi', '🛁 Bathroom'), localized('Bayangkan tempat roket terbang.', 'Imagine where a rocket flies.'), localized('Roket terbang di luar angkasa.', 'A rocket flies in outer space.')),
    ],
    badgeId: 'creative-coder',
  }),
  createUnit({
    id: 'creative-g12-menggambar-kode',
    lessonId: 'creative-coding',
    title: localized('Menggambar dengan Kode', 'Draw with Code'),
    material: [
      ['draw-steps', localized('Perintah dapat menggerakkan pena untuk membuat gambar.', 'Commands can move a pen to make a drawing.')],
      ['shape-repeat', localized('Gerak maju dan belok dapat membentuk garis atau bentuk.', 'Moving forward and turning can make lines or shapes.')],
    ],
    example: {
      symbols: [['✏️', localized('pena', 'pen')], ['➡️', localized('maju', 'forward')], ['↪️', localized('belok', 'turn')], ['⬜', localized('bentuk', 'shape')]],
      caption: localized('Pena bergerak dan berbelok untuk menggambar bentuk.', 'The pen moves and turns to draw a shape.'),
    },
    activity: {
      title: localized('Alat apa yang meninggalkan garis saat bergerak?', 'Which tool leaves a line as it moves?'),
      sequence: ['✏️', '➡️', '❓'],
      options: [
        { text: localized('🖊️ Pena', '🖊️ Pen') },
        { text: localized('🔊 Suara', '🔊 Sound') },
      ],
      answer: 0,
    },
    questions: [
      createQuestion('draw-tool', localized('Untuk menggambar garis, gunakan...', 'To draw a line, use a...'), 'pen', localized('✏️ Pena', '✏️ Pen'), 'bell', localized('🔔 Lonceng', '🔔 Bell'), localized('Pilih alat yang ujungnya bisa membuat garis.', 'Choose a tool whose tip can make a line.'), localized('Pena dapat meninggalkan garis saat bergerak.', 'A pen can leave a line as it moves.')),
      createQuestion('draw-turn', localized('Agar gambar punya sudut, pena perlu...', 'To make a corner, the pen needs to...'), 'turn', localized('↪️ Berbelok', '↪️ Turn'), 'sleep', localized('😴 Tidur', '😴 Sleep'), localized('Sudut terbentuk saat arah garis berubah.', 'A corner forms when the line changes direction.'), localized('Pena membuat sudut dengan mengubah arah.', 'The pen makes a corner by changing direction.')),
    ],
    badgeId: 'creative-coder',
  }),
  createUnit({
    id: 'creative-g12-animasi',
    lessonId: 'creative-coding',
    title: localized('Animasi Sederhana', 'Simple Animation'),
    material: [
      ['animation-movement', localized('Animasi membuat gambar terlihat bergerak.', 'Animation makes a picture look like it moves.')],
      ['change-frames', localized('Karakter dapat bergerak dengan mengubah posisi atau kostumnya.', 'A character can move by changing its position or costume.')],
    ],
    example: {
      symbols: [['🐱', localized('awal', 'start')], ['➡️', localized('bergeser', 'slide')], ['🐱', localized('posisi baru', 'new position')]],
      caption: localized('Karakter yang berpindah posisi terlihat bergerak.', 'A character that changes position looks like it is moving.'),
    },
    activity: {
      title: localized('Apa yang membuat karakter tampak bergerak?', 'What makes a character look like it moves?'),
      sequence: ['🐱', '📍', '➡️', '❓'],
      options: [
        { text: localized('Mengubah posisi atau kostum', 'Change position or costume') },
        { text: localized('Menghapus panggung', 'Erase the stage') },
      ],
      answer: 0,
    },
    questions: [
      createQuestion('animation-look', localized('Animasi membuat gambar terlihat...', 'Animation makes a picture look...'), 'moving', localized('Bergerak', 'Like it moves'), 'sleeping', localized('Tidur', 'Asleep'), localized('Animasi sering terlihat seperti gerakan.', 'Animation often looks like movement.'), localized('Animasi membuat gambar tampak bergerak.', 'Animation makes a picture seem to move.')),
      createQuestion('animation-change', localized('Salah satu cara membuat animasi adalah mengubah...', 'One way to animate is to change the...'), 'position', localized('Posisi karakter', 'Character position'), 'lesson', localized('Nama pelajaran', 'Lesson name'), localized('Karakter bisa bergeser di panggung.', 'A character can move across the stage.'), localized('Mengubah posisi membuat karakter tampak bergerak.', 'Changing position makes a character look like it moves.')),
    ],
    badgeId: 'creative-coder',
  }),
  createUnit({
    id: 'creative-g12-bunyi-musik',
    lessonId: 'creative-coding',
    title: localized('Bunyi dan Musik', 'Sound and Music'),
    material: [
      ['sound-block', localized('Blok suara dapat memainkan bunyi atau musik.', 'A sound block can play a sound or music.')],
      ['sound-event', localized('Suara dapat dimulai saat karakter melakukan sesuatu.', 'A sound can start when a character does something.')],
    ],
    example: {
      symbols: [['🖱️', localized('klik', 'click')], ['🐶', localized('anjing', 'dog')], ['🔊', localized('menggonggong', 'bark')]],
      caption: localized('Saat anjing diklik, suara gonggong dapat dimainkan.', 'When the dog is clicked, a barking sound can play.'),
    },
    activity: {
      title: localized('Blok apa untuk membuat musik terdengar?', 'Which block makes music play?'),
      sequence: ['🎵', '❓'],
      options: [
        { text: localized('🔊 Putar suara', '🔊 Play sound') },
        { text: localized('🎨 Ganti warna', '🎨 Change color') },
      ],
      answer: 0,
    },
    questions: [
      createQuestion('sound-block', localized('Blok suara digunakan untuk...', 'A sound block is used to...'), 'play', localized('Memainkan bunyi', 'Play a sound'), 'move', localized('Menggerakkan panggung', 'Move the stage'), localized('Namanya memberi petunjuk: blok suara.', 'Its name gives a clue: sound block.'), localized('Blok suara memainkan bunyi atau musik.', 'A sound block plays sounds or music.')),
      createQuestion('sound-trigger', localized('Suara bisa mulai saat karakter...', 'A sound can start when a character...'), 'action', localized('Melakukan aksi', 'Does an action'), 'disappear', localized('Menghilang selamanya', 'Disappears forever'), localized('Aksi dapat menjadi tanda untuk memulai suara.', 'An action can be a signal to start a sound.'), localized('Suara dapat dipasangkan dengan aksi karakter.', 'Sound can be paired with a character action.')),
    ],
    badgeId: 'creative-coder',
  }),
  createUnit({
    id: 'creative-g12-cerita-interaktif',
    lessonId: 'creative-coding',
    title: localized('Cerita Interaktif', 'Interactive Story'),
    material: [
      ['story-choice', localized('Cerita interaktif memberi pembaca pilihan.', 'An interactive story gives the reader choices.')],
      ['story-result', localized('Pilihan dapat mengubah kejadian selanjutnya.', 'A choice can change what happens next.')],
    ],
    example: {
      symbols: [['🧒', localized('karakter', 'character')], ['🚪', localized('pilih pintu', 'choose a door')], ['🏝️', localized('pulau', 'island')]],
      caption: localized('Pilih sebuah pintu untuk melihat ke mana cerita berjalan.', 'Choose a door to see where the story goes.'),
    },
    activity: {
      title: localized('Apa yang membuat cerita interaktif?', 'What makes a story interactive?'),
      sequence: ['📖', '❓'],
      options: [
        { text: localized('Pembaca memilih tindakan', 'The reader chooses an action') },
        { text: localized('Cerita tidak punya karakter', 'The story has no characters') },
      ],
      answer: 0,
    },
    questions: [
      createQuestion('story-choice', localized('Dalam cerita interaktif, pembaca bisa...', 'In an interactive story, the reader can...'), 'choose', localized('Membuat pilihan', 'Make a choice'), 'sleep', localized('Tidur di halaman', 'Sleep on the page'), localized('Interaktif berarti pembaca ikut melakukan sesuatu.', 'Interactive means the reader gets to do something.'), localized('Pilihan membuat pembaca ikut mengarahkan cerita.', 'Choices let the reader help guide the story.')),
      createQuestion('story-result', localized('Pilihan dalam cerita dapat mengubah...', 'A choice in a story can change...'), 'next', localized('Kejadian berikutnya', 'What happens next'), 'cover', localized('Warna buku saja', 'Only the book cover color'), localized('Bayangkan hasil berbeda dari pilihan berbeda.', 'Imagine different results from different choices.'), localized('Pilihan bisa membawa cerita ke kejadian berbeda.', 'Choices can lead the story to different events.')),
    ],
    badgeId: 'creative-coder',
  }),
];

export { basicCodingSubtopics, creativeCodingSubtopics };
