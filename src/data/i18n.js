// All UI strings — id = Bahasa Indonesia, en = English
const i18n = {
  id: {
    // Navbar
    nav: {
      logo: 'CODING FOR KIDS',
      home: 'Beranda',
      lessons: 'Pelajaran',
      games: 'Games',
      about: 'Tentang',
      startLearning: 'Mulai Belajar →',
    },
    // Hero
    hero: {
      line1: 'BELAJAR',
      line2: 'CODING.',
      line3: 'BERMAIN. KREATIF.',
      // colored words
      colored: {
        CODING: 'coding',
        BERMAIN: 'bermain',
        KREATIF: 'kreatif',
        SERU: 'seru',
      },
      description:
        'Belajar coding untuk anak SD melalui permainan, aktivitas interaktif, dan tantangan kreatif.',
      btnPrimary: 'MULAI BELAJAR →',
      btnSecondary: 'LIHAT PELAJARAN',
    },
    // Ribbon
    ribbon:
      'BELAJAR ✦ BERMAIN ✦ CODING ✦ KREATIF ✦ TEMUKAN ✦ SELESAIKAN',
    // Lessons section
    lessons: {
      sectionTitle: 'PELAJARAN DI KOLEKSI INI',
      sectionSubtitle:
        'Jelajahi coding lewat aktivitas seru, tantangan, dan proyek kreatif.',
      exploreBtn: 'Lihat Pelajaran →',
      levels: 'Kelas 1–6',
    },
    // Lesson cards
    lessonCards: [
      {
        id: 'logic-algorithms',
        number: '01',
        title: 'LOGIKA & ALGORITMA',
        description:
          'Pelajari cara berpikir seperti programmer — pola, urutan, dan pengambilan keputusan.',
        color: '#C7EF8E',
        icon: '🧠',
        tags: ['Pola', 'Algoritma', 'Debugging'],
      },
      {
        id: 'basic-coding',
        number: '02',
        title: 'CODING DASAR',
        description:
          'Mulai perjalananmu! Beri perintah, susun kode, dan kendalikan karakter.',
        color: '#CCF6FF',
        icon: '💻',
        tags: ['Perintah', 'Urutan', 'Event'],
      },
      {
        id: 'creative-coding',
        number: '03',
        title: 'CODING KREATIF & PROYEK',
        description:
          'Buat karakter, cerita interaktif, dan game-mu sendiri dengan coding!',
        color: '#FFD1F3',
        icon: '🎨',
        tags: ['Karakter', 'Game', 'Proyek'],
      },
    ],
    // Testimonials
    testimonials: {
      sectionTitle: 'Apa Kata Mereka',
      cards: [
        {
          quote: 'Belajar coding jadi nggak membosankan karena ada gamenya!',
          name: 'Raka',
          role: 'Siswa, Kelas 5',
          avatar: 'child',
          color: '#C7EF8E',
        },
        {
          quote: 'Anak saya jadi lebih tertarik belajar logika karena materinya seru dan interaktif.',
          name: 'Ibu Maya',
          role: 'Orang tua',
          avatar: 'parent',
          color: '#CCF6FF',
        },
        {
          quote: 'Aku jadi lebih berani mencoba coding sendiri!',
          name: 'Naya',
          role: 'Siswa, Kelas 6',
          avatar: 'child',
          color: '#FFD1F3',
        },
        {
          quote: 'Materinya gampang dipahami dan tampilannya menyenangkan.',
          name: 'Kevin',
          role: 'Siswa, Kelas 5',
          avatar: 'child',
          color: '#CCF6FF',
        },
        {
          quote: 'Anak saya sekarang lebih percaya diri saat belajar teknologi.',
          name: 'Pak Dimas',
          role: 'Orang tua',
          avatar: 'parent',
          color: '#C7EF8E',
        },
        {
          quote: 'Game-nya bikin aku mau belajar coding lagi!',
          name: 'Salsa',
          role: 'Siswa, Kelas 4',
          avatar: 'child',
          color: '#FFD1F3',
        },
      ],
    },
    // CTA
    cta: {
      headline: 'SIAP MEMULAI\nPETUALANGAN CODING-MU?',
      description:
        'Pilih pelajaran, mainkan game, dan jadilah Junior Coder!',
      btn: 'MULAI BELAJAR →',
    },
    // Footer
    footer: {
      logo: 'CODING FOR KIDS',
      tagline: 'Belajar. Bermain. Kreatif. Seru Banget!',
      links: ['Beranda', 'Pelajaran', 'Games', 'Tentang'],
      langLabel: 'Bahasa:',
      copyright: '© 2026 Coding for Kids. Semua hak dilindungi.',
    },
    // AI Tutor
    aiTutor: {
      btnLabel: 'TANYA AI 🤖',
      title: 'Asisten Coding 🤖',
      subtitle: 'Aku di sini untuk membantumu berpikir!',
      placeholder: 'Ketik pertanyaanmu di sini...',
      sendBtn: 'Kirim',
      levels: [
        { label: '💡 Petunjuk Kecil', level: 1 },
        { label: '📖 Jelaskan Konsep', level: 2 },
        { label: '🔍 Contoh Serupa', level: 3 },
        { label: '✅ Solusi Lengkap', level: 4 },
      ],
      greeting:
        'Halo! Aku Cobi, asisten coding-mu! 🤖✨\nAku bisa memberikan petunjuk, tapi aku ingin kamu mencoba dulu ya! Apa yang ingin kamu tanyakan?',
      thinking: 'Sedang berpikir...',
    },
    // Lesson Detail
    lessonDetail: {
      breadcrumbHome: 'Beranda',
      breadcrumbLessons: 'Pelajaran',
      chooseLevelTitle: 'PILIH LEVEL BELAJARMU',
      grades: [
        { key: '1-2', label: 'Kelas 1–2', sublabel: 'Little Explorers', icon: '🌟', color: '#C7EF8E' },
        { key: '3-4', label: 'Kelas 3–4', sublabel: 'Junior Coders', icon: '💻', color: '#CCF6FF' },
        { key: '5-6', label: 'Kelas 5–6', sublabel: 'Code Adventurers', icon: '🚀', color: '#FFD1F3' },
      ],
      langLabel: 'Pilih Bahasa:',
      pathLearn: { icon: '📚', title: 'PELAJARI MATERI', desc: 'Pelajari konsep, eksplorasi contoh, dan uji pemahamanmu.', btn: 'BELAJAR →' },
      pathGame: { icon: '🎮', title: 'MAIN GAME', desc: 'Gunakan kemampuan coding-mu dalam tantangan dan level game seru.', btn: 'MAIN SEKARANG →' },
    },
    // Badges
    badges: [
      { id: 'pattern-finder', icon: '⭐', name: 'Pattern Finder', desc: 'Temukan 5 pola!' },
      { id: 'robot-explorer', icon: '🤖', name: 'Robot Explorer', desc: 'Selesaikan Robot Maze!' },
      { id: 'problem-solver', icon: '🧠', name: 'Problem Solver', desc: 'Pecahkan 10 soal!' },
      { id: 'junior-coder', icon: '💻', name: 'Junior Coder', desc: 'Selesaikan 1 pelajaran!' },
      { id: 'bug-hunter', icon: '🐞', name: 'Bug Hunter', desc: 'Temukan 5 bug!' },
      { id: 'creative-coder', icon: '🎨', name: 'Creative Coder', desc: 'Buat proyek pertamamu!' },
      { id: 'game-creator', icon: '🏆', name: 'Game Creator', desc: 'Buat game-mu sendiri!' },
    ],
  },

  en: {
    nav: {
      logo: 'CODING FOR KIDS',
      home: 'Home',
      lessons: 'Lessons',
      games: 'Games',
      about: 'About',
      startLearning: 'Start Learning →',
    },
    hero: {
      line1: 'LEARN TO',
      line2: 'CODE.',
      line3: 'PLAY. CREATE.',
      colored: {
        CODE: 'code',
        PLAY: 'play',
        CREATE: 'create',
        FUN: 'fun',
      },
      description:
        'Learn coding for elementary students through games, interactive activities, and creative challenges.',
      btnPrimary: 'START LEARNING →',
      btnSecondary: 'EXPLORE LESSONS',
    },
    ribbon:
      'LEARN ✦ PLAY ✦ CODE ✦ CREATE ✦ DISCOVER ✦ SOLVE',
    lessons: {
      sectionTitle: 'LESSONS IN THIS COLLECTION',
      sectionSubtitle:
        'Explore coding through fun activities, challenges, and creative projects.',
      exploreBtn: 'Explore Lesson →',
      levels: 'Grades 1–6',
    },
    lessonCards: [
      {
        id: 'logic-algorithms',
        number: '01',
        title: 'LOGIC & ALGORITHMS',
        description:
          'Learn to think like a programmer — patterns, sequences, and decision making.',
        color: '#C7EF8E',
        icon: '🧠',
        tags: ['Patterns', 'Algorithms', 'Debugging'],
      },
      {
        id: 'basic-coding',
        number: '02',
        title: 'BASIC CODING',
        description:
          'Start your journey! Give commands, arrange code, and control characters.',
        color: '#CCF6FF',
        icon: '💻',
        tags: ['Commands', 'Sequence', 'Events'],
      },
      {
        id: 'creative-coding',
        number: '03',
        title: 'CREATIVE CODING & PROJECTS',
        description:
          'Create characters, interactive stories, and your own games with coding!',
        color: '#FFD1F3',
        icon: '🎨',
        tags: ['Characters', 'Games', 'Projects'],
      },
    ],
    testimonials: {
      sectionTitle: 'What They Say',
      cards: [
        {
          quote: 'Learning to code is never boring when there are games to play!',
          name: 'Raka',
          role: 'Student, Grade 5',
          avatar: 'child',
          color: '#C7EF8E',
        },
        {
          quote: 'My child is more interested in logic because the lessons are fun and interactive.',
          name: 'Maya',
          role: 'Parent',
          avatar: 'parent',
          color: '#CCF6FF',
        },
        {
          quote: 'I feel more confident trying coding on my own!',
          name: 'Naya',
          role: 'Student, Grade 6',
          avatar: 'child',
          color: '#FFD1F3',
        },
        {
          quote: 'The lessons are easy to understand and the design is fun.',
          name: 'Kevin',
          role: 'Student, Grade 5',
          avatar: 'child',
          color: '#CCF6FF',
        },
        {
          quote: 'My child feels more confident learning about technology now.',
          name: 'Dimas',
          role: 'Parent',
          avatar: 'parent',
          color: '#C7EF8E',
        },
        {
          quote: 'The games make me want to learn coding again!',
          name: 'Salsa',
          role: 'Student, Grade 4',
          avatar: 'child',
          color: '#FFD1F3',
        },
      ],
    },
    cta: {
      headline: 'READY TO START YOUR\nCODING ADVENTURE?',
      description:
        'Choose a lesson, play the games, and become a Junior Coder!',
      btn: 'START LEARNING →',
    },
    footer: {
      logo: 'CODING FOR KIDS',
      tagline: 'Learn. Play. Create. Have Fun!',
      links: ['Home', 'Lessons', 'Games', 'About'],
      langLabel: 'Language:',
      copyright: '© 2026 Coding for Kids. All rights reserved.',
    },
    aiTutor: {
      btnLabel: 'ASK AI 🤖',
      title: 'Coding Assistant 🤖',
      subtitle: "I'm here to help you think!",
      placeholder: 'Type your question here...',
      sendBtn: 'Send',
      levels: [
        { label: '💡 Small Clue', level: 1 },
        { label: '📖 Explain Concept', level: 2 },
        { label: '🔍 Similar Example', level: 3 },
        { label: '✅ Full Solution', level: 4 },
      ],
      greeting:
        "Hi! I'm Cobi, your coding assistant! 🤖✨\nI can give you hints, but I want you to try first! What would you like to ask?",
      thinking: 'Thinking...',
    },
    lessonDetail: {
      breadcrumbHome: 'Home',
      breadcrumbLessons: 'Lessons',
      chooseLevelTitle: 'CHOOSE YOUR LEARNING LEVEL',
      grades: [
        { key: '1-2', label: 'Grade 1–2', sublabel: 'Little Explorers', icon: '🌟', color: '#C7EF8E' },
        { key: '3-4', label: 'Grade 3–4', sublabel: 'Junior Coders', icon: '💻', color: '#CCF6FF' },
        { key: '5-6', label: 'Grade 5–6', sublabel: 'Code Adventurers', icon: '🚀', color: '#FFD1F3' },
      ],
      langLabel: 'Choose Language:',
      pathLearn: { icon: '📚', title: 'LEARN THE MATERIAL', desc: 'Learn the concept, explore examples, and test your understanding.', btn: 'LEARN →' },
      pathGame: { icon: '🎮', title: 'PLAY GAME', desc: 'Put your coding skills into action through fun challenges and game levels.', btn: 'PLAY NOW →' },
    },
    badges: [
      { id: 'pattern-finder', icon: '⭐', name: 'Pattern Finder', desc: 'Find 5 patterns!' },
      { id: 'robot-explorer', icon: '🤖', name: 'Robot Explorer', desc: 'Complete the Robot Maze!' },
      { id: 'problem-solver', icon: '🧠', name: 'Problem Solver', desc: 'Solve 10 problems!' },
      { id: 'junior-coder', icon: '💻', name: 'Junior Coder', desc: 'Complete 1 lesson!' },
      { id: 'bug-hunter', icon: '🐞', name: 'Bug Hunter', desc: 'Find 5 bugs!' },
      { id: 'creative-coder', icon: '🎨', name: 'Creative Coder', desc: 'Create your first project!' },
      { id: 'game-creator', icon: '🏆', name: 'Game Creator', desc: 'Create your own game!' },
    ],
  },
};

export default i18n;
