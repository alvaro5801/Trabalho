# Especificação de Integração com API

## 📋 Visão Geral

Este documento especifica a integração completa do frontend com a API backend, incluindo endpoints, DTOs, tratamento de erros e padrões de comunicação.

## 🔗 Base URL e Configuração

### Configuração

```typescript
// .env
REACT_APP_API_BASE_URL=http://localhost:5000/api

// apiClient.ts
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
```

### Cliente HTTP

**Arquivo**: `src/services/apiClient.ts`

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});
```

---

## 📡 Endpoints da API

### Endpoint 1: Consultar Apólice

**Rastreabilidade**: TELA-0101, METOD-0104, METOD-0105  
**Mapeamento Backend**: `AlteracaoDadosBasicosController.ConsultarApolice()`

#### Request

**Método**: `POST`  
**URL**: `/api/alteracao-dados-basicos/consultar-apolice`  
**Body**:
```typescript
interface ConsultaApoliceRequestDto {
  numeroApolice: string; // Obrigatório, max 20 caracteres
}
```

**Validações Backend**:
- `[Required]` - Número da apólice é obrigatório
- `[StringLength(20)]` - Máximo 20 caracteres

#### Response

**Sucesso (200 OK)**:
```typescript
interface AppResponse<ApoliceDetalhesDto> {
  isSuccess: true;
  message: string;
  data: {
    numeroApolice: string;
    codigoCliente: number;
    nomeCliente: string;
    tipoApolice: number;
    dataAbertura: Date;
    subgrupo?: {
      codigoSubgrupo: number;
      periodoFaturamento?: number;
      formaFaturamento?: number;
      // ... outros campos
    };
  };
  stackTrace?: null;
}
```

**Erro (400 Bad Request)**:
```typescript
interface AppResponse<object> {
  isSuccess: false;
  message: string; // Ex: "INFORME A APOLICE" ou "APOLICE NAO ENCONTRADA"
  data: null;
  stackTrace?: string;
}
```

**Erro (500 Internal Server Error)**:
```typescript
interface AppResponse<object> {
  isSuccess: false;
  message: "Erro interno ao realizar consulta";
  data: null;
  stackTrace: string;
}
```

#### Implementação no Frontend

**Arquivo**: `src/services/consultaApoliceService.ts`

```typescript
export const consultaApoliceService = {
  async consultar(request: ConsultaApoliceRequestDto): Promise<ConsultaApoliceResponse> {
    try {
      const response = await apiClient.post<AppResponse<ApoliceDetalhesDto>>(
        '/alteracao-dados-basicos/consultar-apolice',
        request
      );
      return {
        isSuccess: response.data.isSuccess,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error: any) {
      // Tratamento de erro
      if (error.response?.data) {
        return {
          isSuccess: false,
          message: error.response.data.message || 'ERRO AO CONSULTAR APOLICE',
          data: null
        };
      }
      throw new Error('ERRO DE CONEXAO COM O SERVIDOR');
    }
  }
};
```

---

### Endpoint 2: Alterar Subgrupo

**Rastreabilidade**: TELA-0102, METOD-0107, METOD-0108  
**Mapeamento Backend**: `AlteracaoDadosBasicosController.AlterarSubgrupo()`

#### Request

**Método**: `PUT`  
**URL**: `/api/alteracao-dados-basicos/alterar-subgrupo`  
**Body**:
```typescript
interface AlteracaoSubgrupoRequestDto {
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
```

**Validações Backend**:
- `[Required]` - NumeroApolice e CodigoSubgrupo obrigatórios
- `[RegularExpression("^[SN]$")]` - PlanoAssociado e ValidarMatricula
- `[Range(0, 100)]` - Percentuais

#### Response

**Sucesso (200 OK)**:
```typescript
interface AppResponse<boolean> {
  isSuccess: true;
  message: "Subgrupo alterado com sucesso";
  data: true;
  stackTrace?: null;
}
```

**Erro (400 Bad Request)**:
```typescript
interface AppResponse<object> {
  isSuccess: false;
  message: string; // Ex: "PERIODO FATURAMENTO OBRIGATORIO"
  data: null;
  stackTrace?: string;
}
```

**Mensagens de Erro Possíveis**:
- `"PERIODO FATURAMENTO OBRIGATORIO"` - REGRA-0111
- `"FORMA FATURAMENTO OBRIGATORIA"` - REGRA-0112
- `"VALIDAR MATRICULA DEVE SER S PARA ESPECIFICA"` - REGRA-0113
- `"FALHA NA ATUALIZACAO DO SUBGRUPO"` - REGRA-0115

#### Implementação no Frontend

**Arquivo**: `src/services/alteracaoSubgrupoService.ts`

```typescript
export const alteracaoSubgrupoService = {
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
      if (error.response?.data) {
        return {
          isSuccess: false,
          message: error.response.data.message || 'ERRO AO ALTERAR SUBGRUPO'
        };
      }
      throw new Error('ERRO DE CONEXAO COM O SERVIDOR');
    }
  }
};
```

---

### Endpoint 3: Alterar Termo Adesão

**Rastreabilidade**: TELA-0103, METOD-0109, METOD-0110  
**Mapeamento Backend**: `AlteracaoDadosBasicosController.AlterarTermoAdesao()`

#### Request

**Método**: `PUT`  
**URL**: `/api/alteracao-dados-basicos/alterar-termo-adesao`  
**Body**:
```typescript
interface AlteracaoTermoAdesaoRequestDto {
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
```

#### Response

Similar ao Endpoint 2, mas para termo adesão.

---

## 🔄 Padrão AppResponse<T>

### Estrutura Padrão

```typescript
interface AppResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T | null;
  stackTrace?: string | null;
}
```

### Uso no Frontend

```typescript
const response = await service.method(request);

if (response.isSuccess && response.data) {
  // Sucesso - processar dados
  handleSuccess(response.data);
} else {
  // Erro - exibir mensagem
  setError(response.message || 'ERRO DESCONHECIDO');
}
```

---

## ⚠️ Tratamento de Erros

### Tipos de Erro

#### 1. Erro de Validação (400 Bad Request)

```typescript
if (error.response?.status === 400) {
  const errorData = error.response.data as AppResponse<object>;
  return {
    isSuccess: false,
    message: errorData.message || 'ERRO DE VALIDACAO'
  };
}
```

**Mensagens Comuns**:
- `"INFORME A APOLICE"`
- `"APOLICE NAO ENCONTRADA"`
- `"PERIODO FATURAMENTO OBRIGATORIO"`
- `"FORMA FATURAMENTO OBRIGATORIA"`
- `"VALIDAR MATRICULA DEVE SER S PARA ESPECIFICA"`

#### 2. Erro de Servidor (500 Internal Server Error)

```typescript
if (error.response?.status === 500) {
  return {
    isSuccess: false,
    message: 'ERRO INTERNO DO SERVIDOR'
  };
}
```

#### 3. Erro de Rede (Sem Resposta)

```typescript
if (error.request) {
  return {
    isSuccess: false,
    message: 'ERRO DE CONEXAO COM O SERVIDOR'
  };
}
```

#### 4. Timeout

```typescript
if (error.code === 'ECONNABORTED') {
  return {
    isSuccess: false,
    message: 'TEMPO DE RESPOSTA EXCEDIDO'
  };
}
```

---

## 🔌 Interceptors

### Request Interceptor

```typescript
apiClient.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação (se necessário)
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

### Response Interceptor

```typescript
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Erro com resposta do servidor
      return Promise.reject(error);
    } else if (error.request) {
      // Erro de rede
      return Promise.reject(new Error('ERRO DE CONEXAO COM O SERVIDOR'));
    } else {
      // Erro na configuração
      return Promise.reject(new Error('ERRO AO PROCESSAR REQUISICAO'));
    }
  }
);
```

---

## 📊 Estados de Loading

### Implementação com Hooks

```typescript
export const useConsultaApolice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const consultarApolice = async (request: ConsultaApoliceRequestDto) => {
    setLoading(true);
    setError(null);

    try {
      const response = await consultaApoliceService.consultar(request);
      return response;
    } catch (err: any) {
      setError(err.message);
      return { isSuccess: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { consultarApolice, loading, error, clearError: () => setError(null) };
};
```

### Uso nos Componentes

```typescript
const { consultarApolice, loading, error } = useConsultaApolice();

<Button
  type="submit"
  loading={loading}
  disabled={loading}
>
  {loading ? 'Consultando...' : 'Consultar'}
</Button>
```

---

## 🔄 Retry Logic (Opcional)

### Implementação de Retry

```typescript
const retryRequest = async (
  requestFn: () => Promise<any>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<any> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
};
```

---

## 📝 Mapeamento Completo

| Endpoint | Método | Request DTO | Response DTO | Hook | Service |
|----------|--------|-------------|--------------|------|---------|
| `/consultar-apolice` | POST | `ConsultaApoliceRequestDto` | `AppResponse<ApoliceDetalhesDto>` | `useConsultaApolice` | `consultaApoliceService` |
| `/alterar-subgrupo` | PUT | `AlteracaoSubgrupoRequestDto` | `AppResponse<boolean>` | `useAlteracaoSubgrupo` | `alteracaoSubgrupoService` |
| `/alterar-termo-adesao` | PUT | `AlteracaoTermoAdesaoRequestDto` | `AppResponse<boolean>` | `useAlteracaoTermoAdesao` | `alteracaoTermoAdesaoService` |

---

## ✅ Checklist de Implementação

- [x] Cliente HTTP configurado (axios)
- [x] Base URL configurável via .env
- [x] Interceptors de request/response
- [x] Tratamento de erros padronizado
- [x] Estados de loading implementados
- [x] Hooks customizados para cada endpoint
- [x] Serviços de API criados
- [x] Tipos TypeScript definidos
- [x] Validação de respostas
- [x] Timeout configurado (30s)

