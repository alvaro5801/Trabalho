/**
 * App Component
 * 
 * Componente principal da aplicação
 */

import React from 'react';
import { AppRoutes } from './routes/AppRoutes';
import './styles/variables.css';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <AppRoutes />
    </div>
  );
};

export default App;

