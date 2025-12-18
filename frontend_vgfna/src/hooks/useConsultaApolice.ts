/**
 * useConsultaApolice Hook
 * 
 * Hook para consulta de apólice
 * Mapeamento de: METOD-0104 (VGFNS002), METOD-0105 (VGFNP011)
 * Rastreabilidade: TELA-0101
 */

import { useState } from 'react';
import { consultaApoliceService, ConsultaApoliceResponse } from '../services/consultaApoliceService';
import { ConsultaApoliceRequestDto } from '../types/api';

export const useConsultaApolice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const consultarApolice = async (
    request: ConsultaApoliceRequestDto
  ): Promise<ConsultaApoliceResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await consultaApoliceService.consultar(request);
      
      if (!response.isSuccess) {
        setError(response.message || 'ERRO AO CONSULTAR APOLICE');
      }
      
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'ERRO AO CONSULTAR APOLICE';
      setError(errorMessage);
      return {
        isSuccess: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    consultarApolice,
    loading,
    error,
    clearError
  };
};

