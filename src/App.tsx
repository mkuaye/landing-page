import { HeroSection } from './components/sections/HeroSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { ContactSection } from './components/sections/ContactSection';
import { SEO } from './components/SEO';

function App() {
  return (
    <>
      <SEO />
      <div className='min-h-screen bg-white'>
        <HeroSection />
        <FeaturesSection />
        <ContactSection />
      </div>
    </>
  );
}

export default App;
