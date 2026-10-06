import Hero from '../components/Hero/Hero';
import Ribbon from '../components/Ribbon/Ribbon';
import LessonsSection from '../components/LessonsSection/LessonsSection';
import Testimonials from '../components/Testimonials/Testimonials';
import CTASection from '../components/CTASection/CTASection';

function HomePage({ t }) {
  return (
    <main id="main-content">
      <Hero t={t} />
      <Ribbon text={t.ribbon} />
      <LessonsSection t={t} />
      <Testimonials t={t} />
      <CTASection t={t} />
    </main>
  );
}

export default HomePage;