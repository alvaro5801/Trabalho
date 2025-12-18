/**
 * useAlteracaoTermoAdesao Hook
 * 
 * Hook para alteração de termo adesão
 * Mapeamento de: METOD-0109 (VGFNS004), METOD-0110 (VGFNP023)
 * Rastreabilidade: TELA-0103
 */

import { useState } from 'react';
import { 
  alteracaoTermoAdesaoService, 
  AlteracaoTermoAdesaoResponse 
} from '../services/alteracaoTermoAdesaoService';
import { AlteracaoTermoAdesaoRequestDto } from '../types/api';

export const useAlteracaoTermoAdesao = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const alterarTermoAdesao = async (
    request: AlteracaoTermoAdesaoRequestDto
  ): Promise<AlteracaoTermoAdesaoResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await alteracaoTermoAdesaoService.alterar(request);
      
      if (!response.isSuccess) {
        setError(response.message || 'ERRO AO ALTERAR TERMO ADESAO');
      }
      
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'ERRO AO ALTERAR TERMO ADESAO';
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
    alterarTermoAdesao,
    loading,
    error,
    clearError
  };
};

