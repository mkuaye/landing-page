import * as yup from 'yup';

// Regex para validação de email mais robusta
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const contactFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]*$/, 'Nome deve conter apenas letras e espaços'),
  email: yup
    .string()
    .required('Email é obrigatório')
    .email('Email inválido')
    .matches(emailRegex, 'Email inválido. Use um formato válido (ex: nome@dominio.com)')
    .max(100, 'Email deve ter no máximo 100 caracteres')
    .test('no-special-chars', 'Email não deve conter caracteres especiais', function(value) {
      if (!value) return true;
      return !/[<>()[\]\\,;:{}|^~`]/.test(value);
    })
    .test('no-consecutive-dots', 'Email não deve conter pontos consecutivos', function(value) {
      if (!value) return true;
      return !value.includes('..');
    })
    .test('valid-domain', 'Domínio do email inválido', function(value) {
      if (!value) return true;
      const domain = value.split('@')[1];
      return Boolean(domain && domain.includes('.') && !domain.startsWith('.') && !domain.endsWith('.'));
    }),
  message: yup
    .string()
    .required('Mensagem é obrigatória')
    .min(10, 'Mensagem deve ter no mínimo 10 caracteres')
    .max(500, 'Mensagem deve ter no máximo 500 caracteres')
    .trim(),
});

export type ContactFormData = yup.InferType<typeof contactFormSchema>; 