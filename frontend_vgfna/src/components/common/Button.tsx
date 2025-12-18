/**
 * Button Component
 * 
 * Componente de botão reutilizável
 * Mapeamento de: Ações das telas (F1, F3, F4, F10, F12, ENTER)
 */

import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  onClick,
  loading = false,
  disabled = false,
  icon,
  children,
  className = ''
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${loading ? 'btn-loading' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading && (
        <span className="btn-spinner" aria-hidden="true">
          ⏳
        </span>
      )}
      {icon && !loading && (
        <span className="btn-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="btn-text">{children}</span>
    </button>
  );
};
