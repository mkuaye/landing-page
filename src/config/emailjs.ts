export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  toEmail: import.meta.env.VITE_EMAILJS_TO_EMAIL || '',
};

// Validação da configuração
export const validateEmailjsConfig = () => {
  const requiredFields = ['serviceId', 'templateId', 'publicKey', 'toEmail'];
  const missingFields = requiredFields.filter(
    (field) => !emailjsConfig[field as keyof typeof emailjsConfig]
  );

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required EmailJS configuration: ${missingFields.join(', ')}`
    );
  }

  return true;
};

// Interface para os dados do formulário
export interface EmailFormData {
  name: string;
  email: string;
  message: string;
}

// Interface para a resposta do EmailJS
export interface EmailResponse {
  status: number;
  text: string;
} 