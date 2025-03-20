import { memo } from 'react';
import { GetStartedSection } from '../components/sections/GetStartedSection';
import { SEO } from '../components/SEO';

export const GetStarted = memo(() => {
  return (
    <>
      <SEO 
        title="Comece Agora | Landing Page"
        description="Comece a usar nossa plataforma em poucos passos simples."
      />
      <main>
        <GetStartedSection />
      </main>
    </>
  );
});

GetStarted.displayName = 'GetStarted'; 