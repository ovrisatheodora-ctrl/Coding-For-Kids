const localized = (id, en) => ({ id, en });

function pick(id, prompt, options, answer, explanation) {
  return {
    id,
    type: 'pick',
    title: prompt,
    sequence: [],
    options: options.map(([optionId, text]) => ({ id: optionId, text })),
    answer,
    explanation,
    shuffleOptions: true,
  };
}

function order(id, title, entries, explanation = localized('Urutan yang tepat membantu program bekerja sesuai tujuan.', 'The right order helps the program work as intended.')) {
  return {
    id,
    type: 'order',
    title,
    items: entries.map(([itemId, text]) => ({ id: itemId, text })),
    answer: entries.map(([itemId]) => itemId),
    explanation,
  };
}

function matching(id, title, pairs) {
  const normalizedPairs = pairs.map(([left, right], index) => ({
    left: { id: `${id}-left-${index}`, text: left },
    right: { id: `${id}-right-${index}`, text: right },
  }));

  return {
    id,
    type: 'matching',
    title,
    left: normalizedPairs.map(({ left }) => left),
    right: normalizedPairs.map(({ right }) => right),
    answer: Object.fromEntries(normalizedPairs.map(({ left, right }) => [left.id, right.id])),
    explanation: localized('Setiap pasangan menghubungkan perintah dengan tugasnya.', 'Each pair connects a command to its job.'),
    shuffleOptions: true,
  };
}

function findBug(id, title, lines, bugIndex, repairs, answer, reason, hint) {
  return {
    id,
    type: 'find-bug',
    title,
    items: lines.map((line, index) => ({
      id: `${id}-line-${index}`,
      label: localized(line, line),
      emoji: '',
    })),
    bugIndex,
    repairOptions: repairs.map(([repairId, text]) => ({ id: repairId, text })),
    repairAnswer: answer,
    reason,
    hint,
    shuffleOptions: true,
  };
}

function question(id, prompt, choices, answerIndex, reason) {
  return {
    id,
    type: 'multiple-choice',
    prompt,
    options: choices.map(([optionId, text]) => ({ id: optionId, text })),
    answer: choices[answerIndex][0],
    shuffleOptions: true,
    explanation: reason,
    hint: localized('Perhatikan contoh pada materi.', 'Look at the example in the lesson.'),
  };
}

const activityTasks = {
  'basic-g12-apa-itu-coding': [
    matching('coding-match', localized('Pasangkan perintah dan gerakan robot!', 'Match each command to the robot action!'), [
      [localized('Maju', 'Move forward'), localized('Robot melangkah ke depan', 'The robot steps forward')],
      [localized('Lompat', 'Jump'), localized('Robot naik lalu turun', 'The robot goes up, then down')],
      [localized('Putar', 'Turn'), localized('Robot berbalik arah', 'The robot turns around')],
    ]),
    pick('coding-pick', localized('Robot hanya bergerak kalau ...', 'A robot moves only when ...'), [
      ['command', localized('diberi perintah', 'given a command')],
      ['sleep', localized('ditidurkan', 'put to sleep')],
      ['cloud', localized('melihat awan', 'looks at a cloud')],
    ], 0, localized('Kita memberi kode berupa perintah kepada komputer.', 'We give the computer instructions through code.')),
  ],
  'basic-g12-blok-perintah': [
    matching('blocks-match', localized('Pasangkan blok dengan tugasnya!', 'Match each block to its job!'), [
      [localized('Maju', 'Move'), localized('Robot jalan ke depan', 'The robot walks forward')],
      [localized('Bunyi', 'Sound'), localized('Robot mengeluarkan suara', 'The robot makes a sound')],
      [localized('Senyum', 'Smile'), localized('Wajah robot tersenyum', 'The robot smiles')],
    ]),
    order('blocks-order', localized('Susun blok supaya robot menyapa!', 'Arrange blocks so the robot greets!'), [
      ['move', localized('Maju', 'Move')],
      ['smile', localized('Senyum', 'Smile')],
      ['sound', localized('Bunyi: Halo!', 'Sound: Hello!')],
    ]),
  ],
  'basic-g12-menjalankan-program': [
    order('run-order', localized('Susun langkah menjalankan program!', 'Arrange the steps to run a program!'), [
      ['arrange', localized('Susun blok', 'Arrange the blocks')],
      ['run', localized('Tekan Jalankan', 'Press Run')],
      ['watch', localized('Lihat hasilnya', 'See the result')],
    ]),
    pick('run-pick', localized('Blok Maju ada di atas Bunyi. Apa dulu?', 'Move is above Sound. What happens first?'), [
      ['move', localized('Maju', 'Move')],
      ['sound', localized('Bunyi', 'Sound')],
    ], 0, localized('Program berjalan dari atas ke bawah.', 'A program runs from top to bottom.')),
  ],
  'basic-g12-gerakkan-karakter': [
    pick('move-count', localized('Robot di kotak 1 maju 2 langkah. Sampai di ...', 'A robot at box 1 moves 2 steps. It reaches box ...'), [
      ['three', '3'], ['two', '2'], ['four', '4'],
    ], 0, localized('Setiap langkah maju menambah satu kotak.', 'Each forward step moves one box.')),
    pick('move-command', localized('Perintah mana membuat robot maju satu kotak?', 'Which command moves the robot forward one box?'), [
      ['forward', localized('Maju satu kotak', 'Move forward one box')],
      ['backward', localized('Mundur satu kotak', 'Move backward one box')],
      ['turn', localized('Belok kanan', 'Turn right')],
    ], 0, localized('Perintah Maju menggerakkan robot ke depan.', 'The Move command takes the robot forward.')),
  ],
  'basic-g12-ulangi-blok': [
    matching('repeat-match', localized('Pasangkan dengan blok Ulangi!', 'Match each action with a Repeat block!'), [
      [localized('Maju, maju, maju, maju', 'Move, move, move, move'), localized('Ulangi 4 kali: Maju', 'Repeat 4 times: Move')],
      [localized('Tepuk, tepuk', 'Clap, clap'), localized('Ulangi 2 kali: Tepuk', 'Repeat 2 times: Clap')],
      [localized('Lompat tiga kali', 'Jump three times'), localized('Ulangi 3 kali: Lompat', 'Repeat 3 times: Jump')],
    ]),
    pick('repeat-count', localized('Ulangi 4 kali: Lompat. Berapa lompatan?', 'Repeat 4 times: Jump. How many jumps?'), [
      ['four', '4'], ['two', '2'], ['six', '6'],
    ], 0, localized('Angka pada blok menunjukkan berapa kali perintah diulang.', 'The number on the block shows how many times to repeat.')),
  ],
  'basic-g34-blok-perintah-dan-program': [
    order('program-order-steps', localized('Dari garis awal, bola berjarak 3 langkah. Ambil lalu kembali!', 'The ball is 3 steps from the start. Pick it up, then return!'), [
      ['move', localized('Maju 3 langkah ke bola', 'Move 3 steps to the ball')],
      ['pick', localized('Ambil bola', 'Pick up the ball')],
      ['turn', localized('Putar balik', 'Turn around')],
      ['return', localized('Maju 3 langkah ke awal', 'Move 3 steps to the start')],
    ], localized('Maju sampai bola, ambil, putar balik, lalu maju ke garis awal.', 'Move to the ball, pick it up, turn around, then move back to the start.')),
    matching('program-match', localized('Pasangkan blok dan fungsinya!', 'Match each block to its purpose!'), [
      [localized('Mulai', 'Start'), localized('Menjalankan program', 'Run the program')],
      [localized('Bergerak', 'Move'), localized('Mengubah posisi karakter', 'Change the character position')],
      [localized('Berbicara', 'Say'), localized('Menampilkan kata', 'Show words')],
    ]),
  ],
  'basic-g34-variabel-kotak-penyimpan': [
    pick('variable-name-value', localized('skor = 5. Mana isi variabel?', 'score = 5. What is the variable value?'), [
      ['five', '5'], ['score', localized('skor', 'score')],
    ], 0, localized('Nama variabelnya skor; nilainya 5.', 'The variable is named score; its value is 5.')),
    pick('variable-trace', localized('skor = 2, lalu tambah 3. Isi skor?', 'score = 2, then add 3. What is the score?'), [
      ['five', '5'], ['three', '3'], ['two', '2'],
    ], 0, localized('Nilai baru adalah 2 + 3, yaitu 5.', 'The new value is 2 + 3, which is 5.')),
  ],
  'basic-g34-kondisi-dengan-blok': [
    pick('condition-rain', localized('Jika hujan, bawa payung. Tidak hujan. Apa aksinya?', 'If it rains, take an umbrella. It is not raining. What happens?'), [
      ['other', localized('Jalankan jalur jika tidak', 'Run the else path')],
      ['umbrella', localized('Bawa payung', 'Take an umbrella')],
    ], 0, localized('Jalur jika tidak dipakai saat syaratnya salah.', 'The else path runs when the condition is false.')),
    matching('condition-match', localized('Pasangkan kondisi dan aksinya!', 'Match each condition to its action!'), [
      [localized('Lampu merah', 'Red light'), localized('Berhenti', 'Stop')],
      [localized('Skor lebih dari 5', 'Score is over 5'), localized('Menang', 'Win')],
      [localized('Baterai habis', 'Battery is empty'), localized('Isi daya', 'Recharge')],
    ]),
  ],
  'basic-g34-perulangan-dengan-blok': [
    pick('loop-count', localized('Ulangi 3 kali: maju 1 langkah. Total?', 'Repeat 3 times: move 1 step. Total?'), [
      ['three', '3'], ['one', '1'], ['six', '6'],
    ], 0, localized('Satu langkah dilakukan tiga kali.', 'One step is done three times.')),
    order('loop-order', localized('Susun blok loop kotak!', 'Arrange the blocks for a square loop!'), [
      ['repeat', localized('Ulangi 4 kali', 'Repeat 4 times')],
      ['move', localized('Maju', 'Move forward')],
      ['turn', localized('Belok', 'Turn')],
    ]),
  ],
  'basic-g34-kejadian-klik-dan-tombol': [
    matching('event-match', localized('Pasangkan event dan aksinya!', 'Match each event to its action!'), [
      [localized('Klik Jalankan', 'Click Run'), localized('Program mulai', 'Program starts')],
      [localized('Sentuh layar', 'Tap the screen'), localized('Karakter melompat', 'Character jumps')],
      [localized('Tekan spasi', 'Press Space'), localized('Roket meluncur', 'Rocket launches')],
    ]),
    pick('event-trigger', localized('Kapan suara berbunyi?', 'When does the sound play?'), [
      ['click', localized('Saat tombol diklik', 'When the button is clicked')],
      ['always', localized('Selalu', 'Always')],
      ['never', localized('Tidak pernah', 'Never')],
    ], 0, localized('Klik adalah event yang memulai aksi.', 'A click is an event that starts an action.')),
  ],
  'basic-g56-dari-blok-ke-kode-teks': [
    matching('code-match', localized('Pasangkan blok dengan kode teks!', 'Match each block to its text code!'), [
      [localized('Maju 10 langkah', 'Move 10 steps'), localized('maju(10)', 'move(10)')],
      [localized('Putar 90 derajat', 'Turn 90 degrees'), localized('putar(90)', 'turn(90)')],
      [localized('Tampilkan Halo', 'Show Hello'), localized('tampilkan("Halo")', 'show("Hello")')],
    ]),
    findBug('code-bug', localized('Cari salah ketik pada kode!', 'Find the typo in the code!'), [
      'tampilkan("Halo)',
    ], 0, [
      ['quote', localized('Tambah tanda kutip penutup', 'Add the closing quotation mark')],
      ['remove', localized('Hapus tanda kurung', 'Remove the parenthesis')],
      ['rename', localized('Ganti tampilkan menjadi maju', 'Change show to move')],
    ], 0, localized('Teks harus memiliki tanda kutip pembuka dan penutup.', 'Text needs an opening and a closing quotation mark.'), localized('Lihat tanda kutip di sekitar Halo.', 'Check the quotation marks around Hello.')),
  ],
  'basic-g56-variabel-dan-tipe-data': [
    pick('data-type', localized('nama = "Rina". Tipe datanya?', 'name = "Rina". What is its data type?'), [
      ['text', localized('Teks', 'Text')],
      ['number', localized('Angka', 'Number')],
      ['boolean', localized('Benar/Salah', 'True/False')],
    ], 0, localized('Tanda kutip menunjukkan nilai teks.', 'Quotation marks show a text value.')),
    pick('variable-trace', localized('umur = 10, lalu tambah 1. Isi umur?', 'age = 10, then add 1. What is age?'), [
      ['eleven', '11'], ['ten', '10'], ['one', '1'],
    ], 0, localized('Umur bertambah satu, jadi nilainya 11.', 'Age increases by one, so its value is 11.')),
  ],
  'basic-g56-kondisi-dan-operator': [
    pick('operator-check', localized('Mana yang benar?', 'Which statement is true?'), [
      ['greater', '5 > 3'], ['false', '2 > 9'], ['equal', '4 == 4'],
    ], 0, localized('5 lebih besar dari 3.', '5 is greater than 3.')),
    pick('operator-and', localized('5 > 3 DAN 2 > 8. Hasilnya?', '5 > 3 AND 2 > 8. What is the result?'), [
      ['false', localized('Salah', 'False')],
      ['true', localized('Benar', 'True')],
    ], 0, localized('DAN perlu kedua syarat benar.', 'AND needs both conditions to be true.')),
  ],
  'basic-g56-perulangan-for-while': [
    pick('loop-for', localized('Jumlah pengulangan sudah diketahui. Pilih loop.', 'The repeat count is known. Choose a loop.'), [
      ['for', 'for'], ['while', 'while'], ['if', 'if'],
    ], 0, localized('for cocok saat jumlah pengulangan sudah diketahui.', 'for fits when the repeat count is known.')),
    findBug('loop-bug', localized('Cari penyebab loop tidak berhenti!', 'Find why the loop never stops!'), [
      'skor = 0',
      'selama skor < 3:',
      '  tampilkan(skor)',
    ], 2, [
      ['increment', localized('Tambah skor = skor + 1 di dalam loop', 'Add score = score + 1 inside the loop')],
      ['limit', localized('Ganti 3 menjadi 30', 'Change 3 to 30')],
      ['remove', localized('Hapus perintah tampilkan', 'Remove the show command')],
    ], 0, localized('Skor tidak berubah, jadi syaratnya selalu benar.', 'Score never changes, so the condition stays true.'), localized('Cari nilai yang seharusnya berubah.', 'Look for a value that should change.')),
  ],
  'basic-g56-fungsi': [
    order('function-order', localized('Susun langkah membuat fungsi!', 'Arrange the steps to create a function!'), [
      ['name', localized('Beri nama fungsi', 'Name the function')],
      ['body', localized('Tulis perintah di dalamnya', 'Write commands inside it')],
      ['call', localized('Panggil fungsi', 'Call the function')],
    ]),
    pick('function-input', localized('Pada sapa("Rina"), apa masukannya?', 'In greet("Rina"), what is the input?'), [
      ['rina', '"Rina"'], ['function', localized('sapa', 'greet')], ['none', localized('Tidak ada', 'Nothing')],
    ], 0, localized('"Rina" adalah nilai yang diberikan ke fungsi.', '"Rina" is the value passed to the function.')),
  ],
};

const extraQuiz = {
  'basic-g12-apa-itu-coding': [
    question('coding-robot', localized('Robot bergerak kalau ...', 'A robot moves when it ...'), [['command', localized('mendapat perintah', 'gets a command')], ['wait', localized('menunggu awan', 'waits for a cloud')], ['sleep', localized('tidur', 'sleeps')]], 0, localized('Robot mengikuti perintah yang kita buat.', 'A robot follows the commands we create.')),
    question('coding-command', localized('Mana perintah untuk robot?', 'Which is a command for a robot?'), [['move', localized('Maju 2 langkah', 'Move 2 steps')], ['weather', localized('Hari ini cerah', 'It is sunny today')], ['fruit', localized('Aku suka apel', 'I like apples')]], 0, localized('Perintah memberi tahu komputer tindakan yang harus dilakukan.', 'A command tells the computer what action to do.')),
    question('coding-author', localized('Siapa yang membuat kode?', 'Who creates code?'), [['people', localized('Manusia', 'People')], ['tree', localized('Pohon', 'Trees')], ['cloud', localized('Awan', 'Clouds')]], 0, localized('Manusia menulis kode untuk memberi instruksi.', 'People write code to give instructions.')),
  ],
  'basic-g12-blok-perintah': [
    question('blocks-job', localized('Satu blok perintah punya ... tugas.', 'One command block has ... job.'), [['one', localized('Satu', 'One')], ['many', localized('Seratus', 'One hundred')], ['none', localized('Tidak ada', 'No')]], 0, localized('Setiap blok memiliki tugasnya sendiri.', 'Each block has its own job.')),
    question('blocks-order', localized('Blok biasanya disusun dari ...', 'Blocks are usually arranged from ...'), [['top', localized('Atas ke bawah', 'Top to bottom')], ['bottom', localized('Bawah ke atas', 'Bottom to top')], ['random', localized('Acak', 'Randomly')]], 0, localized('Komputer mengikuti urutan blok yang tersusun.', 'The computer follows the arranged block order.')),
    question('blocks-sound', localized('Blok Bunyi membuat robot ...', 'A Sound block makes the robot ...'), [['sound', localized('mengeluarkan suara', 'make a sound')], ['jump', localized('melompat', 'jump')], ['sleep', localized('tidur', 'sleep')]], 0, localized('Blok Bunyi memberi perintah untuk memainkan suara.', 'A Sound block tells it to play a sound.')),
  ],
  'basic-g12-menjalankan-program': [
    question('run-button', localized('Tombol apa yang menjalankan program?', 'Which button runs a program?'), [['run', localized('Jalankan', 'Run')], ['erase', localized('Hapus', 'Erase')], ['save', localized('Simpan', 'Save')]], 0, localized('Tombol Jalankan memulai perintah dalam program.', 'The Run button starts the program instructions.')),
    question('run-order', localized('Program berjalan dari ...', 'A program runs from ...'), [['top', localized('Atas ke bawah', 'Top to bottom')], ['bottom', localized('Bawah ke atas', 'Bottom to top')], ['middle', localized('Tengah', 'The middle')]], 0, localized('Program mengikuti urutan blok dari atas ke bawah.', 'A program follows blocks from top to bottom.')),
    question('run-result', localized('Setelah menekan Jalankan, kita ...', 'After pressing Run, we ...'), [['watch', localized('melihat hasilnya', 'watch the result')], ['sleep', localized('tidur', 'sleep')], ['erase', localized('menghapus blok', 'erase blocks')]], 0, localized('Kita melihat apakah program menghasilkan yang diharapkan.', 'We see whether the program did what we expected.')),
  ],
  'basic-g12-gerakkan-karakter': [
    question('move-back', localized('Blok Mundur membuat karakter ...', 'A Backward block makes a character ...'), [['back', localized('berjalan ke belakang', 'move backward')], ['forward', localized('berjalan ke depan', 'move forward')], ['fly', localized('terbang', 'fly')]], 0, localized('Mundur berarti bergerak ke arah belakang.', 'Backward means moving toward the back.')),
    question('move-three', localized('Dari kotak 1 ke kotak 4 perlu ... langkah.', 'From box 1 to box 4 takes ... steps.'), [['three', '3'], ['four', '4'], ['five', '5']], 0, localized('Kotak 2, 3, lalu 4: ada tiga langkah.', 'Boxes 2, 3, then 4: that is three steps.')),
    question('move-turn', localized('Belok kanan membuat robot ...', 'Turn right makes the robot ...'), [['right', localized('menghadap kanan', 'face right')], ['jump', localized('melompat', 'jump')], ['stop', localized('berhenti', 'stop')]], 0, localized('Blok belok mengubah arah hadap robot.', 'A turn block changes which way the robot faces.')),
  ],
  'basic-g12-ulangi-blok': [
    question('repeat-short', localized('Mengapa memakai blok Ulangi?', 'Why use a Repeat block?'), [['short', localized('Supaya program lebih singkat', 'To make the program shorter')], ['long', localized('Supaya lebih panjang', 'To make it longer')], ['sleep', localized('Supaya komputer tidur', 'To make the computer sleep')]], 0, localized('Satu blok dapat menggantikan perintah yang sama berulang kali.', 'One block can replace the same repeated command.')),
    question('repeat-steps', localized('Ulangi 3 kali: Maju 1 langkah. Total?', 'Repeat 3 times: Move 1 step. Total?'), [['three', '3'], ['one', '1'], ['six', '6']], 0, localized('Satu langkah dilakukan tiga kali.', 'One step is done three times.')),
    question('repeat-select', localized('Karakter harus lompat 2 kali. Pilih blok.', 'A character must jump twice. Choose the block.'), [['two', localized('Ulangi 2 kali: Lompat', 'Repeat 2 times: Jump')], ['five', localized('Ulangi 5 kali: Lompat', 'Repeat 5 times: Jump')], ['clap', localized('Ulangi 2 kali: Tepuk', 'Repeat 2 times: Clap')]], 0, localized('Jumlah pengulangan dan perintahnya harus tepat.', 'The repeat count and command must match the goal.')),
  ],
};

const topicQuestionBanks = {
  'basic-g34-blok-perintah-dan-program': [
    ['program-order', 'Program berjalan dari ...', 'A program runs from ...', [['top', 'Atas ke bawah', 'Top to bottom'], ['random', 'Acak', 'Randomly'], ['back', 'Bawah ke atas', 'Bottom to top']], 0, 'Komputer menjalankan blok sesuai urutannya.', 'The computer runs blocks in their order.'],
    ['program-change', 'Jika urutan blok berubah, hasil ...', 'If block order changes, the result ...', [['change', 'bisa berubah', 'can change'], ['same', 'selalu sama', 'always stays the same'], ['gone', 'selalu hilang', 'always disappears']], 0, 'Setiap blok berjalan pada waktunya sesuai urutan.', 'Each block runs at its place in the order.'],
    ['program-first', 'Untuk mengambil bola, robot harus ...', 'To pick up a ball, the robot must ...', [['move', 'mendekati bola dulu', 'move to the ball first'], ['leave', 'pergi menjauh', 'move away'], ['talk', 'berbicara dulu', 'talk first']], 0, 'Robot harus mencapai bola sebelum mengambilnya.', 'The robot must reach the ball before picking it up.'],
  ],
  'basic-g34-variabel-kotak-penyimpan': [
    ['variable-name', 'Pada skor = 5, nama variabelnya ...', 'In score = 5, the variable name is ...', [['score', 'skor', 'score'], ['five', '5', '5'], ['equal', 'tanda sama', 'the equals sign']], 0, 'skor adalah nama kotaknya; 5 adalah isinya.', 'score is the box name; 5 is its value.'],
    ['variable-add', 'skor = 4, lalu tambah 2. Isi skor?', 'score = 4, then add 2. What is the value?', [['six', '6', '6'], ['four', '4', '4'], ['two', '2', '2']], 0, 'Empat ditambah dua menjadi enam.', 'Four plus two equals six.'],
    ['variable-use', 'Skor dalam game cocok disimpan di ...', 'A game score is best stored in a ...', [['variable', 'variabel', 'variable'], ['speaker', 'speaker', 'speaker'], ['screen', 'layar', 'screen']], 0, 'Variabel menyimpan nilai yang dipakai program.', 'A variable stores a value used by a program.'],
  ],
  'basic-g34-kondisi-dengan-blok': [
    ['condition-if', 'Blok Jika digunakan untuk ...', 'An If block is used to ...', [['check', 'memeriksa syarat', 'check a condition'], ['repeat', 'mengulang', 'repeat'], ['erase', 'menghapus', 'erase']], 0, 'Jika memeriksa apakah syarat terpenuhi.', 'If checks whether a condition is met.'],
    ['condition-else', 'Jalur Jika Tidak dipakai saat syarat ...', 'The Else path is used when the condition is ...', [['false', 'salah', 'false'], ['true', 'benar', 'true'], ['unknown', 'belum ada', 'missing']], 0, 'Jika syarat tidak terpenuhi, jalur alternatif berjalan.', 'If the condition is not met, the alternative runs.'],
    ['condition-choice', 'Jika skor 12 lebih dari 10, hasilnya ...', 'If score 12 is greater than 10, the result is ...', [['win', 'Menang', 'Win'], ['retry', 'Coba lagi', 'Try again'], ['stop', 'Berhenti', 'Stop']], 0, 'Dua belas lebih besar daripada sepuluh.', 'Twelve is greater than ten.'],
  ],
  'basic-g34-perulangan-dengan-blok': [
    ['loop-repeat', 'Ulangi 4 kali: maju 1. Total langkah?', 'Repeat 4 times: move 1. Total steps?', [['four', '4', '4'], ['one', '1', '1'], ['eight', '8', '8']], 0, 'Satu langkah dilakukan empat kali.', 'One step is done four times.'],
    ['loop-why', 'Loop membantu program menjadi ...', 'A loop helps make a program ...', [['short', 'lebih singkat', 'shorter'], ['long', 'lebih panjang', 'longer'], ['silent', 'selalu diam', 'always silent']], 0, 'Loop menggantikan perintah yang berulang.', 'A loop replaces repeated commands.'],
    ['loop-actions', 'Ulangi 3 kali: tepuk dan lompat. Tepuk berapa kali?', 'Repeat 3 times: clap and jump. How many claps?', [['three', '3', '3'], ['six', '6', '6'], ['one', '1', '1']], 0, 'Tepuk dilakukan sekali pada setiap putaran.', 'Clap happens once in each repeat.'],
  ],
  'basic-g34-kejadian-klik-dan-tombol': [
    ['event-meaning', 'Event adalah ...', 'An event is ...', [['trigger', 'kejadian pemicu program', 'something that triggers a program'], ['color', 'warna latar', 'a background color'], ['number', 'angka skor', 'a score number']], 0, 'Klik atau sentuhan dapat memicu aksi.', 'A click or tap can trigger an action.'],
    ['event-example', 'Mana contoh event?', 'Which is an example of an event?', [['click', 'Klik tombol', 'Click a button'], ['color', 'Warna merah', 'The color red'], ['five', 'Angka 5', 'The number 5']], 0, 'Klik adalah tindakan yang dapat memulai program.', 'A click is an action that can start a program.'],
    ['event-wait', 'Tanpa event, program biasanya ...', 'Without an event, a program usually ...', [['wait', 'menunggu', 'waits'], ['run', 'berjalan terus', 'keeps running'], ['delete', 'terhapus', 'disappears']], 0, 'Program menunggu pemicu sebelum bereaksi.', 'A program waits for a trigger before reacting.'],
  ],
  'basic-g56-dari-blok-ke-kode-teks': [
    ['code-line', 'Satu blok biasanya setara dengan ... kode.', 'One block usually matches ... of code.', [['line', 'satu baris', 'one line'], ['ten', 'sepuluh baris', 'ten lines'], ['none', 'tidak ada', 'nothing']], 0, 'Setiap blok dapat ditulis sebagai satu baris instruksi.', 'Each block can be written as one instruction line.'],
    ['code-quote', 'Kode tampilkan("Halo") menampilkan ...', 'The code show("Hello") displays ...', [['hello', 'Halo', 'Hello'], ['show', 'tampilkan', 'show'], ['quotes', 'tanda kutip', 'quotation marks']], 0, 'Kata di dalam tanda kutip adalah teks yang ditampilkan.', 'The word inside quotation marks is the text displayed.'],
    ['code-case', 'Komputer bisa membedakan ...', 'A computer can distinguish ...', [['case', 'huruf besar dan kecil', 'uppercase and lowercase'], ['color', 'warna kertas', 'paper colors'], ['voice', 'suara pembaca', 'reader voices']], 0, 'Huruf besar dan kecil dapat dianggap berbeda.', 'Uppercase and lowercase letters can be treated differently.'],
  ],
  'basic-g56-variabel-dan-tipe-data': [
    ['data-text', 'Mana nilai yang bertipe teks?', 'Which value has the text type?', [['name', '"Rina"'], ['age', '10'], ['ready', 'benar / true']], 0, 'Teks ditulis di antara tanda kutip.', 'Text is written inside quotation marks.'],
    ['data-boolean', 'Tipe benar/salah cocok untuk ...', 'True/False data is useful for ...', [['yesno', 'jawaban ya atau tidak', 'yes or no values'], ['name', 'nama orang', 'a person’s name'], ['picture', 'gambar', 'a picture']], 0, 'Benar/salah menyimpan salah satu dari dua nilai.', 'True/False stores one of two values.'],
    ['data-trace', 'x = 5, lalu x = x + 2. Isi x?', 'x = 5, then x = x + 2. What is x?', [['seven', '7', '7'], ['five', '5', '5'], ['two', '2', '2']], 0, 'Nilai x yang lama ditambah dua.', 'The old value of x is increased by two.'],
  ],
  'basic-g56-kondisi-dan-operator': [
    ['operator-gte', 'Simbol >= berarti ...', 'The symbol >= means ...', [['gte', 'lebih besar atau sama dengan', 'greater than or equal to'], ['lt', 'lebih kecil dari', 'less than'], ['ne', 'tidak sama dengan', 'not equal to']], 0, '>= menerima nilai yang sama atau lebih besar.', '>= accepts an equal or greater value.'],
    ['operator-eq', 'Simbol == digunakan untuk ...', 'The == symbol is used to ...', [['compare', 'memeriksa apakah nilai sama', 'check whether values are equal'], ['assign', 'menghapus nilai', 'erase a value'], ['repeat', 'mengulang', 'repeat']], 0, 'Dua tanda sama memeriksa kesamaan nilai.', 'Two equal signs check whether values match.'],
    ['operator-or', '5 > 3 ATAU 2 > 8 bernilai ...', '5 > 3 OR 2 > 8 is ...', [['true', 'Benar', 'True'], ['false', 'Salah', 'False'], ['unknown', 'Tidak tahu', 'Unknown']], 0, 'ATAU benar jika setidaknya satu syarat benar.', 'OR is true when at least one condition is true.'],
  ],
  'basic-g56-perulangan-for-while': [
    ['loop-for-count', 'Loop for cocok saat ...', 'A for loop fits when ...', [['known', 'jumlah pengulangan diketahui', 'the repeat count is known'], ['never', 'tidak ada perintah', 'there are no commands'], ['done', 'program selesai', 'the program is done']], 0, 'for dipakai untuk jumlah pengulangan yang sudah diketahui.', 'for is used when the repeat count is known.'],
    ['loop-while-stop', 'Loop while berhenti saat syarat ...', 'A while loop stops when its condition ...', [['false', 'tidak benar lagi', 'is no longer true'], ['true', 'selalu benar', 'is always true'], ['missing', 'tidak ditulis', 'is missing']], 0, 'while berlanjut selama syaratnya benar.', 'while continues as long as its condition is true.'],
    ['loop-infinite', 'Loop bisa tidak berhenti jika ...', 'A loop may never stop if ...', [['same', 'syaratnya tidak pernah berubah', 'its condition never changes'], ['short', 'barisnya pendek', 'its lines are short'], ['quotes', 'ada tanda kutip', 'it has quotation marks']], 0, 'Syarat harus berubah agar loop dapat berhenti.', 'The condition must change so the loop can stop.'],
  ],
  'basic-g56-fungsi': [
    ['function-call', 'Agar fungsi bekerja, kita harus ...', 'To make a function work, we must ...', [['call', 'memanggilnya', 'call it'], ['ignore', 'mengabaikannya', 'ignore it'], ['erase', 'menghapusnya', 'erase it']], 0, 'Fungsi berjalan ketika program memanggil namanya.', 'A function runs when the program calls its name.'],
    ['function-repeat', 'Fungsi sapa() dipanggil 3 kali. Berjalan ...', 'greet() is called 3 times. It runs ...', [['three', '3 kali', '3 times'], ['one', '1 kali', '1 time'], ['none', 'tidak pernah', 'never']], 0, 'Setiap pemanggilan menjalankan fungsi sekali.', 'Each call runs the function once.'],
    ['function-param', 'Pada sapa("Rina"), "Rina" adalah ...', 'In greet("Rina"), "Rina" is ...', [['input', 'masukan', 'an input'], ['picture', 'gambar', 'a picture'], ['sound', 'suara', 'a sound']], 0, 'Nilai di dalam pemanggilan diberikan sebagai masukan.', 'The value in the call is passed in as input.'],
  ],
};

export function getBasicCodingTasks(unitId, existingActivity) {
  const extras = activityTasks[unitId];
  if (!extras) return existingActivity?.tasks || [existingActivity];
  return extras;
}

export function getBasicCodingQuestions(unitId, existingQuestions = []) {
  const additions = [...(extraQuiz[unitId] || [])];
  for (const [suffix, promptId, promptEn, options, answerIndex, reasonId, reasonEn] of topicQuestionBanks[unitId] || []) {
    additions.push(question(
      `${unitId}-${suffix}`,
      localized(promptId, promptEn),
      options.map(([optionId, id, en]) => [optionId, localized(id, en)]),
      answerIndex,
      localized(reasonId, reasonEn),
    ));
  }
  const questions = [
    ...existingQuestions.map((item) => ({ ...item, shuffleOptions: item.type !== 'true-false' })),
    ...additions,
  ].slice(0, 5);
  return questions.map((item, index) => (
    unitId.startsWith('basic-g56-') && index < 2
      ? { ...item, practice: true }
      : item
  ));
}

export function iosVisualKey(index) {
  return ['robot', 'puzzle', 'game', 'lamp', 'phone', 'writing', 'eyes', 'world', 'sparkle'][index % 9];
}
