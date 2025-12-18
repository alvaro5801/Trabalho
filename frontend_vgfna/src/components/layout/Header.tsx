/**
 * Header Component
 * 
 * Componente de cabeçalho que exibe informações do sistema
 * Mapeamento de: OBJ-0101 a OBJ-0106 (campos read-only do header)
 */

import React from 'react';
import { formatDate, formatTime } from '../../utils/dateUtils';

interface HeaderProps {
  menuEmpresa: string;
  data: Date;
  versao: string;
  nomeSistema: string;
  hora: Date;
  grupoFuncoes: string;
}

export const Header: React.FC<HeaderProps> = ({
  menuEmpresa,
  data,
  versao,
  nomeSistema,
  hora,
  grupoFuncoes
}) => {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-left">
          <span className="menu-empresa">{menuEmpresa}</span>
        </div>
        <div className="header-center">
          <span className="versao">{versao}</span>
          <span className="nome-sistema">{nomeSistema}</span>
        </div>
        <div className="header-right">
          <span className="data">{formatDate(data)}</span>
          <span className="hora">{formatTime(hora)}</span>
        </div>
      </div>
      <div className="header-bottom">
        <span className="grupo-funcoes">{grupoFuncoes}</span>
      </div>
    </header>
  );
};

