import { memo } from 'react';
import { Button } from './ui/Button';
import { useContactForm } from '../hooks/useContactForm';
import { useAnalytics } from '../hooks/useAnalytics';
import { CONTACT_TEXTS } from '../constants/texts';

interface ContactFormProps {
  className?: string;
}

export const ContactForm = memo(({ className = '' }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    errors,
    status,
    error,
  } = useContactForm();

  const { trackFormSubmission } = useAnalytics();

  const onSubmitSuccess = () => {
    trackFormSubmission('contact', true, {
      fields: 3, // name, email, message
      hasErrors: Object.keys(errors).length > 0,
    });
  };

  const onSubmitError = (err: unknown) => {
    trackFormSubmission('contact', false, {
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e)
          .then(onSubmitSuccess)
          .catch(onSubmitError);
      }}
      className={`space-y-6 ${className}`}
      aria-label="Formulário de contato"
    >
      <div>
        <label 
          htmlFor='name' 
          className='block text-sm font-medium text-gray-700 mb-2'
          id="name-label"
        >
          {CONTACT_TEXTS.form.name.label}
        </label>
        <input
          type='text'
          id='name'
          {...register('name')}
          required
          aria-required="true"
          aria-labelledby="name-label"
          className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
          placeholder={CONTACT_TEXTS.form.name.placeholder}
        />
        {errors.name && (
          <p className='mt-1 text-sm text-red-500' role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label 
          htmlFor='email' 
          className='block text-sm font-medium text-gray-700 mb-2'
          id="email-label"
        >
          {CONTACT_TEXTS.form.email.label}
        </label>
        <input
          type='email'
          id='email'
          {...register('email')}
          required
          aria-required="true"
          aria-labelledby="email-label"
          className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
          placeholder={CONTACT_TEXTS.form.email.placeholder}
        />
        {errors.email && (
          <p className='mt-1 text-sm text-red-500' role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label 
          htmlFor='message' 
          className='block text-sm font-medium text-gray-700 mb-2'
          id="message-label"
        >
          {CONTACT_TEXTS.form.message.label}
        </label>
        <textarea
          id='message'
          {...register('message')}
          required
          aria-required="true"
          aria-labelledby="message-label"
          rows={4}
          className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
          placeholder={CONTACT_TEXTS.form.message.placeholder}
        />
        {errors.message && (
          <p className='mt-1 text-sm text-red-500' role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type='submit'
        isLoading={status === 'loading'}
        className='w-full'
        aria-label={status === 'success' ? CONTACT_TEXTS.form.success : CONTACT_TEXTS.form.submit}
      >
        {status === 'success' ? CONTACT_TEXTS.form.success : CONTACT_TEXTS.form.submit}
      </Button>

      {status === 'error' && (
        <p 
          className='text-red-500 text-center'
          role="alert"
        >
          {error || CONTACT_TEXTS.form.error}
        </p>
      )}
    </form>
  );
});

ContactForm.displayName = 'ContactForm'; 