/**
 * SelectInput Component
 * 
 * Componente de select/dropdown
 * Mapeamento de: Campos de seleção (PERI_FATURAMENTO, FORMA_FATURAMENTO, etc)
 */

import React from 'react';

interface SelectOption {
  value: number | string;
  label: string;
}

interface SelectInputProps {
  id: string;
  label: string;
  value: number | string | null;
  onChange: (value: number | null) => void;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  error?: boolean;
  'aria-describedby'?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  loading = false,
  placeholder = 'Selecione...',
  error = false,
  'aria-describedby': ariaDescribedBy
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    onChange(newValue === '' ? null : parseInt(newValue));
  };

  const selectClasses = `form-select ${error ? 'error' : ''}`;

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required" aria-label="obrigatório">*</span>}
      </label>
      <select
        id={id}
        value={value || ''}
        onChange={handleChange}
        required={required}
        disabled={disabled || loading}
        className={selectClasses}
        aria-required={required}
        aria-invalid={error}
        aria-describedby={ariaDescribedBy}
        aria-busy={loading}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {loading && (
        <span className="form-loading" aria-live="polite">
          Carregando...
        </span>
      )}
    </div>
  );
};
