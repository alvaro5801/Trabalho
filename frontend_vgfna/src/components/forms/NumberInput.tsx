/**
 * NumberInput Component
 * 
 * Componente de input numérico
 * Mapeamento de: OBJ-0107, OBJ-0108 (campos numéricos editáveis)
 */

import React from 'react';

interface NumberInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  error?: boolean;
  'aria-describedby'?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  value,
  onChange,
  required = false,
  autoFocus = false,
  placeholder,
  disabled = false,
  min,
  max,
  error = false,
  'aria-describedby': ariaDescribedBy
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Permite apenas números
    if (newValue === '' || /^\d+$/.test(newValue)) {
      onChange(newValue);
    }
  };

  const inputClasses = `form-input form-input-number ${error ? 'error' : ''}`;

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required" aria-label="obrigatório">*</span>}
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        required={required}
        autoFocus={autoFocus}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        className={inputClasses}
        aria-required={required}
        aria-invalid={error}
        aria-describedby={ariaDescribedBy}
      />
    </div>
  );
};
