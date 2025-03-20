import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../config/emailjs';
import { contactFormSchema, ContactFormData } from '../validations/contactForm';

export const useContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactFormSchema),
    mode: 'onChange',
  });

  const formData = watch();

  const onSubmit = async (formData: ContactFormData) => {
    setStatus('loading');
    setError(null);

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        emailjsConfig.publicKey
      );

      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setError('Erro ao enviar mensagem. Por favor, tente novamente.');
      console.error('Erro ao enviar email:', err);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    status,
    error,
    formData,
  };
}; 