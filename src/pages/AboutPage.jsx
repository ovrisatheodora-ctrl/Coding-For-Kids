import './AboutPage.css';

function AboutPage({ t }) {
  const isId = Object.keys(t.nav).includes('home') && t.nav.home === 'Beranda';

  return (
    <main id="main-content" className="about-page">
      <div className="about-banner">
        <div className="container">
          <h1 className="about-title">
            {isId ? 'TENTANG CODING FOR KIDS' : 'ABOUT CODING FOR KIDS'}
          </h1>
        </div>
      </div>

      <div className="about-body container">
        {/* Mission */}
        <section className="about-section about-mission">
          <div className="about-section-icon">🎯</div>
          <h2 className="about-section-title">
            {isId ? 'Misi Kami' : 'Our Mission'}
          </h2>
          <p>
            {isId
              ? 'Coding for Kids adalah platform belajar coding interaktif untuk siswa SD kelas 1–6. Kami percaya bahwa setiap anak bisa belajar coding dengan cara yang menyenangkan melalui permainan, aktivitas kreatif, dan tantangan yang seru!'
              : 'Coding for Kids is an interactive coding learning platform for elementary students in Grades 1–6. We believe every child can learn coding in a fun way through games, creative activities, and exciting challenges!'}
          </p>
        </section>

        {/* Core Loop */}
        <section className="about-section">
          <h2 className="about-section-title">
            {isId ? 'Cara Belajar' : 'How We Learn'}
          </h2>
          <div className="about-flow">
            {['LEARN', 'TRY', 'PLAY', 'SOLVE', 'WIN', 'CREATE'].map((step, i) => (
              <div key={step} className="about-flow-step">
                <div className="about-flow-num" style={{ background: ['#C7EF8E','#CCF6FF','#C7EF8E','#FFD1F3','#FFD1F3','#FFD1F3'][i] }}>
                  {['📚','✍️','🎮','🧩','🏆','🎨'][i]}
                </div>
                <span className="about-flow-label">{step}</span>
                {i < 5 && <span className="about-flow-arrow" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="about-section">
          <h2 className="about-section-title">
            {isId ? 'Fitur Unggulan' : 'Key Features'}
          </h2>
          <div className="about-features">
            {[
              { icon: '🎮', title: isId ? 'Game Interaktif' : 'Interactive Games', desc: isId ? '18 game coding seru untuk semua grade.' : '18 fun coding games for all grades.' },
              { icon: '🤖', title: isId ? 'Asisten AI' : 'AI Assistant', desc: isId ? 'Cobi membantumu berpikir, bukan memberikan jawaban langsung.' : 'Cobi helps you think, not just give answers.' },
              { icon: '🏆', title: isId ? 'Gamifikasi' : 'Gamification', desc: isId ? 'XP, bintang, badge, dan papan skor!' : 'XP, stars, badges, and leaderboards!' },
              { icon: '📚', title: isId ? 'Kurikulum Terstruktur' : 'Structured Curriculum', desc: isId ? '3 topik utama untuk kelas 1–6.' : '3 main topics for Grades 1–6.' },
              { icon: '🌏', title: isId ? 'Bilingual' : 'Bilingual', desc: isId ? 'Tersedia dalam Bahasa Indonesia dan Inggris.' : 'Available in Bahasa Indonesia and English.' },
              { icon: '📱', title: isId ? 'Responsif' : 'Responsive', desc: isId ? 'Belajar di mana saja — desktop, tablet, atau HP.' : 'Learn anywhere — desktop, tablet, or mobile.' },
            ].map((f, i) => (
              <div key={i} className="about-feature-card card">
                <span className="about-feature-icon">{f.icon}</span>
                <h3 className="about-feature-title">{f.title}</h3>
                <p className="about-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Badges */}
        <section className="about-section">
          <h2 className="about-section-title">
            {isId ? 'Koleksi Badge' : 'Badge Collection'}
          </h2>
          <div className="about-badges">
            {t.badges.map((badge) => (
              <div key={badge.id} className="about-badge-card">
                <span className="about-badge-icon">{badge.icon}</span>
                <span className="about-badge-name">{badge.name}</span>
                <span className="about-badge-desc">{badge.desc}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default AboutPage;
