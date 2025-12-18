/**
 * Tipos TypeScript para API
 * 
 * Baseado em: backend_vgfna/06_API_LAYER.md
 * Mapeamento de: DTOs do backend
 */

/**
 * Resposta padrão da API
 * Mapeamento de: AppResponse<T> do backend
 */
export interface AppResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T | null;
  stackTrace?: string | null;
}

/**
 * Request para consulta de apólice
 * Mapeamento de: ConsultaApoliceRequestDto
 * ID Matriz: OBJ-0107 (NUM_APOLICE)
 */
export interface ConsultaApoliceRequestDto {
  numeroApolice: string; // Obrigatório, max 20 caracteres
}

/**
 * Dados detalhados da apólice
 * Mapeamento de: ApoliceDetalhesDto
 * ID Matriz: ENT-0101, ENT-0104
 */
export interface ApoliceDetalhesDto {
  numeroApolice: string;
  codigoCliente: number;
  nomeCliente: string;
  tipoApolice: number;
  dataAbertura: Date | string;
  subgrupo?: SubgrupoDto;
}

/**
 * Dados do subgrupo
 * Mapeamento de: V0SUBGRUPO
 * ID Matriz: ENT-0102
 */
export interface SubgrupoDto {
  codigoSubgrupo: number;
  periodoFaturamento?: number | null;
  formaFaturamento?: number | null;
  formaAverbacao?: number | null;
  tipoPlano?: number | null;
  planoAssociado?: 'S' | 'N';
  tipoCobranca?: number | null;
  validarMatricula?: 'S' | 'N';
  enderecoCobranca?: number | null;
  bancoCobranca?: number | null;
  agenciaCobranca?: number | null;
  dacCobranca?: number | null;
  percentualConjugeAP?: number;
  percentualConjugeVG?: number;
}

/**
 * Request para alteração de subgrupo
 * Mapeamento de: AlteracaoSubgrupoRequestDto
 * ID Matriz: TELA-0102
 */
export interface AlteracaoSubgrupoRequestDto {
  numeroApolice: string; // Obrigatório
  codigoSubgrupo: number; // Obrigatório
  periodoFaturamento?: number | null;
  formaFaturamento?: number | null;
  formaAverbacao?: number | null;
  tipoPlano?: number | null;
  planoAssociado?: 'S' | 'N';
  tipoCobranca?: number | null;
  validarMatricula?: 'S' | 'N';
  enderecoCobranca?: number | null;
  bancoCobranca?: number | null;
  agenciaCobranca?: number | null;
  dacCobranca?: number | null;
  percentualConjugeAP?: number; // Range: 0-100
  percentualConjugeVG?: number; // Range: 0-100
}

/**
 * Request para alteração de termo adesão
 * Mapeamento de: AlteracaoTermoAdesaoRequestDto
 * ID Matriz: TELA-0103
 */
export interface AlteracaoTermoAdesaoRequestDto {
  numeroApolice: string; // Obrigatório
  codigoTermo: number; // Obrigatório
  periodoFaturamento?: number | null;
  formaFaturamento?: number | null;
  formaAverbacao?: number | null;
  tipoPlano?: number | null;
  planoAssociado?: 'S' | 'N';
  tipoCobranca?: number | null;
  validarMatricula?: 'S' | 'N';
  enderecoCobranca?: number | null;
  bancoCobranca?: number | null;
  agenciaCobranca?: number | null;
}

/**
 * Opção de domínio
 * Mapeamento de: Tabelas de domínio (ENT-0109 a ENT-0113)
 */
export interface DominioOption {
  value: number;
  label: string;
}

/**
 * Domínios completos
 */
export interface Dominios {
  periodoFaturamento: DominioOption[];
  formaFaturamento: DominioOption[];
  formaAverbacao: DominioOption[];
  tipoPlano: DominioOption[];
  tipoCobranca: DominioOption[];
}

