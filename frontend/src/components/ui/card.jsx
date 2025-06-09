import React from 'react';

export const Card = ({ children, className = "", variant = "default", ...props }) => {
  const variantClasses = {
    default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm",
    glass: "glass-effect dark:glass-effect-dark border-white/20 dark:border-gray-700/20",
    elevated: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl",
    modern: "modern-card dark:modern-card-dark"
  };

  return (
    <div className={`rounded-lg ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = "", ...props }) => (
  <p className={`text-sm text-gray-600 dark:text-gray-400 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = "", ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Export par défaut pour les imports directs
export default Card; 