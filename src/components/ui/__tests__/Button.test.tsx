import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';
import { checkAccessibility, checkKeyboardNavigation, checkScreenReaderSupport } from '../../../test-utils/accessibility';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-white', 'text-blue-600');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600', 'text-white');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-2', 'border-white', 'text-white');
  });

  it('shows loading state', () => {
    render(<Button isLoading>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Enviando...');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('renders with aria-label', () => {
    render(<Button aria-label="Submit form">Click me</Button>);
    expect(screen.getByRole('button', { name: /submit form/i })).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('meets accessibility requirements', () => {
      render(<Button>Accessible Button</Button>);
      const button = screen.getByRole('button');
      checkAccessibility(button);
    });

    it('supports keyboard navigation', () => {
      render(<Button>Keyboard Button</Button>);
      const button = screen.getByRole('button');
      checkKeyboardNavigation(button);
    });

    it('provides screen reader support', () => {
      render(<Button>Screen Reader Button</Button>);
      const button = screen.getByRole('button');
      checkScreenReaderSupport(button);
    });

    it('maintains focus ring on focus', () => {
      render(<Button>Focus Button</Button>);
      const button = screen.getByRole('button');
      fireEvent.focus(button);
      expect(button).toHaveClass('focus:ring-2', 'focus:ring-offset-2');
    });

    it('has appropriate contrast ratio', () => {
      render(<Button variant="primary">Contrast Button</Button>);
      const button = screen.getByRole('button');
      const style = window.getComputedStyle(button);
      expect(style.color).toBe('rgb(37, 99, 235)'); // text-blue-600
      expect(style.backgroundColor).toBe('rgb(255, 255, 255)'); // bg-white
    });

    it('announces loading state to screen readers', () => {
      render(<Button isLoading>Loading Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveTextContent('Enviando...');
    });

    it('maintains accessibility when disabled', () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });
}); 