/**
 * HelpModal Component
 * 
 * Modal de ajuda
 * Mapeamento de: TELA-0104, TELA-0105, TELA-0106 (telas de ajuda)
 */

import React from 'react';

interface HelpModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  title,
  content,
  onClose
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          <p>{content}</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

