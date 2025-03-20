import { memo } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  children: React.ReactNode;
  'aria-label'?: string;
}

export const Button = memo(({ 
  variant = 'primary', 
  isLoading = false, 
  children, 
  className = '', 
  'aria-label': ariaLabel,
  ...props 
}: ButtonProps) => {
  const baseStyles = 'px-8 py-4 rounded-full font-semibold transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-white text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400',
    outline: 'border-2 border-white text-white hover:bg-white/10 focus:ring-white',
  };

  const loadingStyles = isLoading ? 'bg-blue-400 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${loadingStyles} ${className}`}
      disabled={isLoading}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? 'Enviando...' : children}
    </button>
  );
});

Button.displayName = 'Button'; 