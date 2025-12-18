/**
 * alteracaoTermoAdesaoService
 * 
 * Serviço para alteração de termo adesão
 * Mapeamento de: PUT /api/alteracao-dados-basicos/alterar-termo-adesao
 * Rastreabilidade: TELA-0103, METOD-0109, METOD-0110
 */

import { apiClient } from './apiClient';
import { 
  AlteracaoTermoAdesaoRequestDto, 
  AppResponse 
} from '../types/api';

export interface AlteracaoTermoAdesaoResponse {
  isSuccess: boolean;
  message?: string;
}

export const alteracaoTermoAdesaoService = {
  /**
   * Altera dados do termo adesão
   * Mapeamento de: AlteracaoDadosBasicosController.AlterarTermoAdesao()
   */
  async alterar(request: AlteracaoTermoAdesaoRequestDto): Promise<AlteracaoTermoAdesaoResponse> {
    try {
      const response = await apiClient.put<AppResponse<boolean>>(
        '/alteracao-dados-basicos/alterar-termo-adesao',
        request
      );
      
      return {
        isSuccess: response.data.isSuccess,
        message: response.data.message
      };
    } catch (error: any) {
      // Tratamento de erros conforme especificação
      if (error.response?.data) {
        const errorData = error.response.data as AppResponse<object>;
        return {
          isSuccess: false,
          message: errorData.message || 'ERRO AO ALTERAR TERMO ADESAO'
        };
      }
      
      if (error.request) {
        return {
          isSuccess: false,
          message: 'ERRO DE CONEXAO COM O SERVIDOR'
        };
      }
      
      return {
        isSuccess: false,
        message: error.message || 'ERRO AO ALTERAR TERMO ADESAO'
      };
    }
  }
};

