/**
 * consultaApoliceService
 * 
 * Serviço para consulta de apólice
 * Mapeamento de: POST /api/alteracao-dados-basicos/consultar-apolice
 * Rastreabilidade: TELA-0101, METOD-0104, METOD-0105
 */

import { apiClient } from './apiClient';
import { 
  ConsultaApoliceRequestDto, 
  AppResponse, 
  ApoliceDetalhesDto 
} from '../types/api';

export interface ConsultaApoliceResponse {
  isSuccess: boolean;
  data?: ApoliceDetalhesDto;
  message?: string;
}

export const consultaApoliceService = {
  /**
   * Consulta apólice por número
   * Mapeamento de: AlteracaoDadosBasicosController.ConsultarApolice()
   */
  async consultar(request: ConsultaApoliceRequestDto): Promise<ConsultaApoliceResponse> {
    try {
      const response = await apiClient.post<AppResponse<ApoliceDetalhesDto>>(
        '/alteracao-dados-basicos/consultar-apolice',
        request
      );
      
      return {
        isSuccess: response.data.isSuccess,
        data: response.data.data || undefined,
        message: response.data.message
      };
    } catch (error: any) {
      // Tratamento de erros conforme especificação
      if (error.response?.data) {
        const errorData = error.response.data as AppResponse<object>;
        return {
          isSuccess: false,
          message: errorData.message || 'ERRO AO CONSULTAR APOLICE'
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
        message: error.message || 'ERRO AO CONSULTAR APOLICE'
      };
    }
  }
};

