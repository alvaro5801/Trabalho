/**
 * alteracaoSubgrupoService
 * 
 * Serviço para alteração de subgrupo
 * Mapeamento de: PUT /api/alteracao-dados-basicos/alterar-subgrupo
 * Rastreabilidade: TELA-0102, METOD-0107, METOD-0108
 */

import { apiClient } from './apiClient';
import { 
  AlteracaoSubgrupoRequestDto, 
  AppResponse 
} from '../types/api';

export interface AlteracaoSubgrupoResponse {
  isSuccess: boolean;
  message?: string;
}

export const alteracaoSubgrupoService = {
  /**
   * Altera dados do subgrupo
   * Mapeamento de: AlteracaoDadosBasicosController.AlterarSubgrupo()
   */
  async alterar(request: AlteracaoSubgrupoRequestDto): Promise<AlteracaoSubgrupoResponse> {
    try {
      const response = await apiClient.put<AppResponse<boolean>>(
        '/alteracao-dados-basicos/alterar-subgrupo',
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
          message: errorData.message || 'ERRO AO ALTERAR SUBGRUPO'
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
        message: error.message || 'ERRO AO ALTERAR SUBGRUPO'
      };
    }
  }
};

