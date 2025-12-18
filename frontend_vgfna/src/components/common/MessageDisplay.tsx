/**
 * MessageDisplay Component
 * 
 * Componente para exibir mensagens do sistema
 * Mapeamento de: OBJ-0109 (EZEMSG)
 */

import React from 'react';

interface MessageDisplayProps {
  type: 'info' | 'error' | 'warning';
  message: string;
  onClose?: () => void;
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({
  type,
  message,
  onClose
}) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`message-display message-display-${type}`}>
      <span className="message-icon">{getIcon()}</span>
      <span className="message-text">{message}</span>
      {onClose && (
        <button
          type="button"
          className="message-close"
          onClick={onClose}
          aria-label="Fechar mensagem"
        >
          ×
        </button>
      )}
    </div>
  );
};

