import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import Ribbon from '../components/Ribbon/Ribbon';
import LessonsSection from '../components/LessonsSection/LessonsSection';
import Testimonials from '../components/Testimonials/Testimonials';
import CTASection from '../components/CTASection/CTASection';
import { scrollToHomeLessons } from '../utils/scrollToHomeLessons';

function HomePage({ t }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash !== '#lessons') return;

    scrollToHomeLessons();
  }, [location.hash]);

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