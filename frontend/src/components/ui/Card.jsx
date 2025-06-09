import React from 'react';
import { clsx } from 'clsx';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'default',
  hover = true,
  gradient = false,
  ...props 
}) => {
  const baseClasses = 'modern-card';
  
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800',
    glass: 'glass-effect dark:glass-effect-dark',
    gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900',
    stats: 'stats-card',
  };

  const sizeClasses = {
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hover ? 'hover:scale-[1.02] hover:shadow-2xl transition-all duration-300' : '';

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    hoverClasses,
    className
  );

  return (
    <div className={classes} {...props}>
      {gradient && <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl pointer-events-none" />}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={clsx('mb-4', className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={clsx('text-lg font-semibold text-gray-900 dark:text-white', className)} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={clsx('text-sm text-gray-500 dark:text-gray-400', className)} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={clsx('', className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={clsx('mt-4 pt-4 border-t border-gray-200 dark:border-gray-700', className)} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card; 