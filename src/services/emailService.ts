import emailjs from '@emailjs/browser';
import { emailjsConfig, validateEmailjsConfig, EmailFormData, EmailResponse } from '../config/emailjs';

class EmailService {
  private static instance: EmailService;
  private initialized: boolean = false;

  private constructor() {
    this.initialize();
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private initialize(): void {
    if (this.initialized) return;

    try {
      validateEmailjsConfig();
      emailjs.init(emailjsConfig.publicKey);
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
      throw error;
    }
  }

  public async sendEmail(formData: EmailFormData): Promise<EmailResponse> {
    if (!this.initialized) {
      throw new Error('EmailJS not initialized');
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: emailjsConfig.toEmail,
      };

      const response = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams
      );

      return {
        status: response.status,
        text: response.text,
      };
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send email. Please try again later.');
    }
  }
}

export const emailService = EmailService.getInstance(); 