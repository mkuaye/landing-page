import { render, screen, fireEvent } from '@testing-library/react';
import { ContactSection } from '../ContactSection';
import { checkAccessibility, checkKeyboardNavigation, checkScreenReaderSupport } from '../../../test-utils/accessibility';

describe('ContactSection', () => {
  it('renders contact form', () => {
    render(<ContactSection />);
    expect(screen.getByRole('form', { name: /formulário de contato/i })).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('meets accessibility requirements for form elements', () => {
      render(<ContactSection />);
      
      // Verifica o título da seção
      const sectionTitle = screen.getByRole('heading', { name: /entre em contato/i });
      checkAccessibility(sectionTitle);

      // Verifica os campos do formulário
      const nameInput = screen.getByLabelText(/nome/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/mensagem/i);

      checkAccessibility(nameInput);
      checkAccessibility(emailInput);
      checkAccessibility(messageInput);
    });

    it('supports keyboard navigation', () => {
      render(<ContactSection />);
      
      const nameInput = screen.getByLabelText(/nome/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/mensagem/i);
      const submitButton = screen.getByRole('button', { name: /enviar mensagem/i });

      checkKeyboardNavigation(nameInput);
      checkKeyboardNavigation(emailInput);
      checkKeyboardNavigation(messageInput);
      checkKeyboardNavigation(submitButton);
    });

    it('provides screen reader support', () => {
      render(<ContactSection />);
      
      const nameInput = screen.getByLabelText(/nome/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/mensagem/i);

      checkScreenReaderSupport(nameInput);
      checkScreenReaderSupport(emailInput);
      checkScreenReaderSupport(messageInput);
    });

    it('shows validation messages for required fields', async () => {
      render(<ContactSection />);
      
      const submitButton = screen.getByRole('button', { name: /enviar mensagem/i });
      fireEvent.click(submitButton);

      // Verifica se os campos obrigatórios mostram mensagens de erro
      expect(screen.getByLabelText(/nome/i)).toBeInvalid();
      expect(screen.getByLabelText(/email/i)).toBeInvalid();
      expect(screen.getByLabelText(/mensagem/i)).toBeInvalid();
    });

    it('maintains focus management during form submission', async () => {
      render(<ContactSection />);
      
      const nameInput = screen.getByLabelText(/nome/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/mensagem/i);
      const submitButton = screen.getByRole('button', { name: /enviar mensagem/i });

      // Preenche o formulário
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello!' } });

      // Submete o formulário
      fireEvent.click(submitButton);

      // Verifica se o foco é mantido no botão após o envio
      expect(submitButton).toHaveFocus();
    });

    it('provides clear error messages for screen readers', async () => {
      render(<ContactSection />);
      
      const submitButton = screen.getByRole('button', { name: /enviar mensagem/i });
      fireEvent.click(submitButton);

      // Verifica se as mensagens de erro são anunciadas para leitores de tela
      const errorMessages = screen.getAllByRole('alert');
      expect(errorMessages.length).toBeGreaterThan(0);
      expect(errorMessages[0]).toHaveTextContent(/campo obrigatório/i);
    });

    it('maintains proper ARIA attributes during form states', async () => {
      render(<ContactSection />);
      
      const submitButton = screen.getByRole('button', { name: /enviar mensagem/i });
      
      // Verifica estado inicial
      expect(submitButton).toHaveAttribute('aria-busy', 'false');
      
      // Simula envio
      fireEvent.click(submitButton);
      expect(submitButton).toHaveAttribute('aria-busy', 'true');
      
      // Simula sucesso
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(submitButton).toHaveAttribute('aria-busy', 'false');
      expect(submitButton).toHaveTextContent(/mensagem enviada/i);
    });
  });
}); 