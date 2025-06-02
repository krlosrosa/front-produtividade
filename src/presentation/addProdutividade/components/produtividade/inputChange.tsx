import React from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number' | 'email' | 'password';
  required?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  disabled = false,
  className = '',
  variant = 'default',
  size = 'md',
  icon,
  ...props
}) => {
  const baseClasses = "w-full border rounded-lg transition-all duration-200 focus:outline-none";
  
  const variantClasses = {
    default: "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    success: "border-green-200 focus:ring-2 focus:ring-green-500 focus:border-transparent",
    warning: "border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent",
    error: "border-red-200 focus:ring-2 focus:ring-red-500 focus:border-transparent"
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3",
    lg: "px-5 py-4 text-lg"
  };

  const disabledClasses = disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "bg-white";

  const inputClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabledClasses}
    ${icon ? 'pl-12' : ''}
    ${className}
  `.trim();

  const labelClasses = `
    block text-sm font-medium mb-2
    ${variant === 'error' ? 'text-red-600' : 'text-gray-600'}
  `;

  return (
    <div className="space-y-1">
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;