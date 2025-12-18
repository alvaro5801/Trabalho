/**
 * DisplayField Component
 * 
 * Componente para exibir campos read-only
 * Mapeamento de: OBJ-0101 a OBJ-0106 (campos read-only)
 */

import React from 'react';

interface DisplayFieldProps {
  label: string;
  value: string | number | null | undefined;
  type?: 'text' | 'date' | 'time' | 'number';
  className?: string;
}

export const DisplayField: React.FC<DisplayFieldProps> = ({
  label,
  value,
  type = 'text',
  className = ''
}) => {
  const formatValue = () => {
    if (value === null || value === undefined) return '-';
    
    if (type === 'date' && value instanceof Date) {
      return value.toLocaleDateString('pt-BR');
    }
    
    if (type === 'time' && value instanceof Date) {
      return value.toLocaleTimeString('pt-BR');
    }
    
    return String(value);
  };

  return (
    <div className={`display-field ${className}`}>
      <label className="display-field-label">{label}:</label>
      <span className="display-field-value">{formatValue()}</span>
    </div>
  );
};

