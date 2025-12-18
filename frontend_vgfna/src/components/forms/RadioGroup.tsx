/**
 * RadioGroup Component
 * 
 * Componente de radio buttons
 * Mapeamento de: PLANO_ASSOCIADO, VALIDAR_MATRICULA (campos S/N)
 */

import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  'aria-describedby'?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  error = false,
  'aria-describedby': ariaDescribedBy
}) => {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="required" aria-label="obrigatório">*</span>}
      </label>
      <div 
        className="radio-group"
        role="radiogroup"
        aria-required={required}
        aria-invalid={error}
        aria-describedby={ariaDescribedBy}
      >
        {options.map((option) => (
          <label 
            key={option.value} 
            className="radio-option"
          >
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              required={required}
              disabled={disabled}
              aria-checked={value === option.value}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
