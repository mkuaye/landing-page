import { renderHook, act } from '@testing-library/react';
import { useContactForm } from '../useContactForm';
import emailjs from '@emailjs/browser';

// Mock emailjs
jest.mock('@emailjs/browser', () => ({
  send: jest.fn(),
}));

describe('useContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with empty form data', () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current.formData).toEqual({
      name: '',
      email: '',
      message: '',
    });
    expect(result.current.status).toBe('idle');
  });

  it('updates form data on change', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleChange({
        target: {
          name: 'name',
          value: 'John Doe',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.formData.name).toBe('John Doe');
  });

  it('handles successful form submission', async () => {
    (emailjs.send as jest.Mock).mockResolvedValueOnce({ status: 200 });

    const { result } = renderHook(() => useContactForm());

    // Fill form data
    act(() => {
      result.current.handleChange({
        target: {
          name: 'name',
          value: 'John Doe',
        },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: {
          name: 'email',
          value: 'john@example.com',
        },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: {
          name: 'message',
          value: 'Hello!',
        },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    // Submit form
    await act(async () => {
      const mockEvent = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent;
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.status).toBe('success');
    expect(result.current.formData).toEqual({
      name: '',
      email: '',
      message: '',
    });
    expect(emailjs.send).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      {
        from_name: 'John Doe',
        from_email: 'john@example.com',
        message: 'Hello!',
      },
      expect.any(String)
    );
  });

  it('handles form submission error', async () => {
    (emailjs.send as jest.Mock).mockRejectedValueOnce(new Error('Failed to send'));

    const { result } = renderHook(() => useContactForm());

    // Fill form data
    act(() => {
      result.current.handleChange({
        target: {
          name: 'name',
          value: 'John Doe',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // Submit form
    await act(async () => {
      const mockEvent = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent;
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.status).toBe('error');
    expect(result.current.formData).toEqual({
      name: 'John Doe',
      email: '',
      message: '',
    });
  });
}); 