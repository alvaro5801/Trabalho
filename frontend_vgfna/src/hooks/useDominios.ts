/**
 * useDominios Hook
 * 
 * Hook para carregar tabelas de domínio
 * Mapeamento de: ENT-0109 a ENT-0113 (tabelas de domínio)
 */

import { useState, useEffect } from 'react';
import { dominiosService } from '../services/dominiosService';
import { Dominios } from '../types/api';

export const useDominios = () => {
  const [dominios, setDominios] = useState<Dominios>({
    periodoFaturamento: [],
    formaFaturamento: [],
    formaAverbacao: [],
    tipoPlano: [],
    tipoCobranca: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDominios = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await dominiosService.carregarTodos();
        setDominios(data);
      } catch (err: any) {
        setError(err.message || 'ERRO AO CARREGAR DOMINIOS');
      } finally {
        setLoading(false);
      }
    };

    loadDominios();
  }, []);

  return {
    dominios,
    loading,
    error
  };
};

