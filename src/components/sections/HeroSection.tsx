import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { HERO_TEXTS } from '../../constants/texts';

export const HeroSection = memo(() => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Transforme suas ideias em realidade
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-blue-100">
            Crie experiências incríveis e alcance seus objetivos com nossa plataforma
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started">
              <Button variant="primary" className="w-full sm:w-auto">
                Comece Agora
              </Button>
            </Link>
            <Button variant="outline" className="w-full sm:w-auto">
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection'; 