'use client';

import { useCallback } from 'react';
import AboutPage from '@/components/templates/AboutPage/AboutPage';
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs';

function About() {
  const getDefaultTextGenerator = useCallback(() => 'About company', []);
  const getTextGenerator = useCallback((param: string) => ({})[param], []);

  return (
    <>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <AboutPage />
      <div className="overlay" />
    </>
  );
}

export default About;
