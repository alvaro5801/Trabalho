/**
 * AppRoutes
 * 
 * Configuração de rotas da aplicação
 * Mapeamento de: TELA-0101, TELA-0102, TELA-0103
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConsultaApolicePage } from '../pages/ConsultaApolice/ConsultaApolicePage';
import { AlteracaoSubgrupoPage } from '../pages/AlteracaoSubgrupo/AlteracaoSubgrupoPage';
import { AlteracaoTermoAdesaoPage } from '../pages/AlteracaoTermoAdesao/AlteracaoTermoAdesaoPage';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* TELA-0101: VGFNM010 - Consulta de Apólice */}
        <Route
          path="/consulta-apolice"
          element={<ConsultaApolicePage />}
        />

        {/* TELA-0102: VGFNM020 - Alteração de Subgrupo */}
        <Route
          path="/alteracao-subgrupo"
          element={<AlteracaoSubgrupoPage />}
        />

        {/* TELA-0103: VGFNM030 - Alteração de Termo Adesão */}
        <Route
          path="/alteracao-termo-adesao"
          element={<AlteracaoTermoAdesaoPage />}
        />

        {/* Rota padrão - redireciona para consulta */}
        <Route
          path="/"
          element={<Navigate to="/consulta-apolice" replace />}
        />

        {/* Rota 404 */}
        <Route
          path="*"
          element={<Navigate to="/consulta-apolice" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

