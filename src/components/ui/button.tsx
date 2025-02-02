// components/Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const variants = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
    ghost: 'text-gray-600 hover:bg-gray-100',
};

const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
};

const baseStyles = 'rounded-lg transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50';

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    children,
    ...props
}) => {
    const combinedClassName = `
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
    `.trim();

    return (
        <button
            className={combinedClassName}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;