import { memo } from 'react';
import { ContactForm } from '../ContactForm';
import { CONTACT_TEXTS } from '../../constants/texts';

export const ContactSection = memo(() => {
  return (
    <section 
      className='py-24 bg-gray-50'
      aria-labelledby="contact-title"
    >
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 
              id="contact-title"
              className='text-4xl font-bold mb-4'
            >
              {CONTACT_TEXTS.title}
            </h2>
            <p className='text-gray-600'>
              {CONTACT_TEXTS.subtitle}
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection'; 