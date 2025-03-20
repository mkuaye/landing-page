import { emailService } from '../emailService';
import emailjs from '@emailjs/browser';

// Mock do EmailJS
jest.mock('@emailjs/browser', () => ({
  init: jest.fn(),
  send: jest.fn(),
}));

// Mock das variáveis de ambiente
const mockEnv = {
  VITE_EMAILJS_SERVICE_ID: 'test_service_id',
  VITE_EMAILJS_TEMPLATE_ID: 'test_template_id',
  VITE_EMAILJS_PUBLIC_KEY: 'test_public_key',
  VITE_EMAILJS_TO_EMAIL: 'test@example.com',
};

// @ts-ignore
global.import = {
  meta: {
    env: mockEnv,
  },
};

describe('EmailService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize EmailJS with public key', () => {
    expect(emailjs.init).toHaveBeenCalledWith(mockEnv.VITE_EMAILJS_PUBLIC_KEY);
  });

  it('should send email successfully', async () => {
    const mockResponse = { status: 200, text: 'OK' };
    (emailjs.send as jest.Mock).mockResolvedValueOnce(mockResponse);

    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello!',
    };

    const response = await emailService.sendEmail(formData);

    expect(emailjs.send).toHaveBeenCalledWith(
      mockEnv.VITE_EMAILJS_SERVICE_ID,
      mockEnv.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: mockEnv.VITE_EMAILJS_TO_EMAIL,
      }
    );

    expect(response).toEqual(mockResponse);
  });

  it('should handle email sending error', async () => {
    (emailjs.send as jest.Mock).mockRejectedValueOnce(new Error('Failed to send'));

    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello!',
    };

    await expect(emailService.sendEmail(formData)).rejects.toThrow(
      'Failed to send email. Please try again later.'
    );
  });
}); 