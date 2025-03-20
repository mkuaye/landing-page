import { memo } from 'react';
import { FEATURES_TEXTS } from '../../constants/texts';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = memo(({ icon, title, description, index }: FeatureCardProps) => (
  <div 
    className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-100'
    role="article"
    aria-labelledby={`feature-title-${index}`}
  >
    <div className='bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6'>
      <div className='text-blue-600 text-3xl' role="img">{icon}</div>
    </div>
    <h3 id={`feature-title-${index}`} className='text-2xl font-semibold mb-4'>{title}</h3>
    <p className='text-gray-600 leading-relaxed'>{description}</p>
  </div>
));

FeatureCard.displayName = 'FeatureCard';

export const FeaturesSection = () => {
  return (
    <section className='py-24' aria-labelledby="features-title">
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 id="features-title" className='text-4xl font-bold mb-4'>{FEATURES_TEXTS.title}</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            {FEATURES_TEXTS.subtitle}
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {FEATURES_TEXTS.features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}; 