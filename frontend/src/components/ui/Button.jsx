import React from 'react';
import { clsx } from 'clsx';

const Button = ({ 
  children, 
  className = '', 
  variant = 'primary',
  size = 'default',
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props 
}) => {
  const baseClasses = 'btn-modern inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'bg-red-500 hover:bg-red-600 text-white border-none',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white border-none',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700',
    outline: 'border border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
  };
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm h-8',
    default: 'px-4 py-2 text-sm h-10',
    large: 'px-6 py-3 text-base h-12'
  };

  const buttonClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );

  return (
    <button 
      className={buttonClasses}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
      )}
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className="mr-2 h-4 w-4" />
      )}
      {children}
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className="ml-2 h-4 w-4" />
      )}
    </button>
  );
};

export default Button;
export { Button }; 