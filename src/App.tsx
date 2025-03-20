import { HelmetProvider } from 'react-helmet-async';
import { HeroSection } from './components/sections/HeroSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { ContactSection } from './components/sections/ContactSection';
import { SEO } from './components/SEO';

function App() {
  return (
    <HelmetProvider>
      <SEO />
      <div className='min-h-screen bg-white'>
        <HeroSection />
        <FeaturesSection />
        <ContactSection />
      </div>
    </HelmetProvider>
  );
}

export default App;
