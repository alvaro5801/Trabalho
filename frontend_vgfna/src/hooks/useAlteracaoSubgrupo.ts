/**
 * useAlteracaoSubgrupo Hook
 * 
 * Hook para alteração de subgrupo
 * Mapeamento de: METOD-0107 (VGFNS003), METOD-0108 (VGFNP022)
 * Rastreabilidade: TELA-0102
 */

import { useState } from 'react';
import { 
  alteracaoSubgrupoService, 
  AlteracaoSubgrupoResponse 
} from '../services/alteracaoSubgrupoService';
import { AlteracaoSubgrupoRequestDto } from '../types/api';

export const useAlteracaoSubgrupo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const alterarSubgrupo = async (
    request: AlteracaoSubgrupoRequestDto
  ): Promise<AlteracaoSubgrupoResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await alteracaoSubgrupoService.alterar(request);
      
      if (!response.isSuccess) {
        setError(response.message || 'ERRO AO ALTERAR SUBGRUPO');
      }
      
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'ERRO AO ALTERAR SUBGRUPO';
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
    alterarSubgrupo,
    loading,
    error,
    clearError
  };
};

