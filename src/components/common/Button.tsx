import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gaming-dark-800 disabled:opacity-50 disabled:cursor-not-allowed border';
  
  const variantStyles = {
    primary: 'bg-gradient-purple text-white border-gaming-purple-600 hover:shadow-lg hover:shadow-gaming-purple-500/25 focus:ring-gaming-purple-500 transform hover:scale-105',
    secondary: 'bg-gaming-dark-700 hover:bg-gaming-dark-600 text-gray-300 border-gaming-dark-600 hover:border-gaming-dark-500 focus:ring-gaming-dark-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-red-600 focus:ring-red-500 hover:shadow-lg hover:shadow-red-500/25',
    success: 'bg-green-600 hover:bg-green-700 text-white border-green-600 focus:ring-green-500 hover:shadow-lg hover:shadow-green-500/25',
    outline: 'bg-transparent border-gaming-purple-600 text-gaming-purple-400 hover:bg-gaming-purple-600 hover:text-white focus:ring-gaming-purple-500 hover:shadow-lg hover:shadow-gaming-purple-500/25',
    ghost: 'bg-transparent hover:bg-gaming-dark-700 text-gray-300 shadow-none border-transparent hover:border-gaming-dark-600',
  };

  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;