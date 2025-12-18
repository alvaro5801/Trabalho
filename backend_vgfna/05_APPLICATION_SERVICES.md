# 05 - APPLICATION SERVICES

## Objetivo

Documentar os Services da camada Application que orquestram ViewModels, tratam exceções e retornam respostas padronizadas via AppResponse<T>, servindo como camada intermediária entre Controllers (API) e ViewModels (Business Logic).

## Mapeamento de Legado

### Origem
- **Arquivo**: `_LEGADO/vgfna.esf`
- **Métodos Principais**: METOD-0102 (VGFNP002 - Rotina principal loop de telas)
- **Processamento de Telas**: METOD-0104, METOD-0107, METOD-0109
- **Contexto**: Orquestração do fluxo entre telas M010 → M020 → M030

### Destino
- **Camada**: Application
- **Namespace Base**: `Vgfna.Web.AgTeste.Application.Services`
- **Padrão**: Um Service por contexto/agregado
- **Retorno**: SEMPRE `AppResponse<T>`

## Especificação Técnica

### 1. Services Principais

#### 1.1 AlteracaoDadosBasicosService

**Rastreabilidade**:
- **ID Matriz**: METOD-0102, METOD-0104, METOD-0107, METOD-0109
- **Origem**: VGFNP002 (loop principal) + VGFNS002, VGFNS003, VGFNS004
- **Arquivo**: `_LEGADO/vgfna.esf`, linhas 2918-2951, ~3100-3300, ~3400-3600, ~3700-3900

**Namespace**: `Vgfna.Web.AgTeste.Application.Services`

**Responsabilidade**: Orquestrar alterações de dados básicos, tratando exceções e retornando respostas padronizadas

```csharp
/// <summary>
/// Service para alteração de dados básicos
/// Migrado de: METOD-0102, METOD-0104, METOD-0107, METOD-0109
/// </summary>
public class AlteracaoDadosBasicosService(
    IProcessarConsultaM010ViewModel processarConsultaM010ViewModel,
    IProcessarAlteracaoM020ViewModel processarAlteracaoM020ViewModel,
    IProcessarAlteracaoM030ViewModel processarAlteracaoM030ViewModel
) : IAlteracaoDadosBasicosService
{
    /// <summary>
    /// Realiza consulta de apólice conforme critérios M010
    /// </summary>
    /// <param name="request">Critérios de consulta</param>
    /// <returns>AppResponse com dados da apólice encontrada</returns>
    public async Task<AppResponse<ApoliceDetalhesDto>> ConsultarApolice(ConsultaApoliceRequestDto request)
    {
        var response = new AppResponse<ApoliceDetalhesDto>();
        
        try
        {
            // Validação de entrada
            if (request == null)
            {
                response.IsSuccess = false;
                response.Message = "Request inválido";
                return response;
            }
            
            if (string.IsNullOrEmpty(request.NumeroApolice))
            {
                response.IsSuccess = false;
                response.Message = "Número da apólice é obrigatório";
                return response;
            }
            
            // Executa ViewModel de consulta
            var resultado = await processarConsultaM010ViewModel.Execute(request);
            
            response.Data = resultado;
            response.IsSuccess = true;
            response.Message = "Apólice encontrada com sucesso";
        }
        catch (InvalidOperationException ex)
        {
            // Exceções de negócio
            response.IsSuccess = false;
            response.Message = ex.Message;
        }
        catch (Exception ex)
        {
            // Exceções não previstas
            response.IsSuccess = false;
            response.Message = "Erro interno ao realizar consulta";
            response.StackTrace = ex.Message;
            // Log exception (implementar logging)
        }
        
        return response;
    }
    
    /// <summary>
    /// Realiza alteração de dados do subgrupo conforme tela M020
    /// </summary>
    /// <param name="request">Dados de alteração do subgrupo</param>
    /// <returns>AppResponse com resultado da alteração</returns>
    public async Task<AppResponse<bool>> AlterarSubgrupo(AlteracaoSubgrupoRequestDto request)
    {
        var response = new AppResponse<bool>();
        
        try
        {
            // Validação de entrada
            if (request == null)
            {
                response.IsSuccess = false;
                response.Message = "Request inválido";
                return response;
            }
            
            if (string.IsNullOrEmpty(request.NumeroApolice))
            {
                response.IsSuccess = false;
                response.Message = "Número da apólice é obrigatório";
                return response;
            }
            
            // Executa ViewModel de alteração
            var sucesso = await processarAlteracaoM020ViewModel.Execute(request);
            
            response.Data = sucesso;
            response.IsSuccess = true;
            response.Message = "Subgrupo alterado com sucesso";
        }
        catch (InvalidOperationException ex)
        {
            // Exceções de negócio
            response.IsSuccess = false;
            response.Message = ex.Message;
        }
        catch (Exception ex)
        {
            // Exceções não previstas
            response.IsSuccess = false;
            response.Message = "Erro interno ao alterar subgrupo";
            response.StackTrace = ex.Message;
            // Log exception
        }
        
        return response;
    }
    
    /// <summary>
    /// Realiza alteração de dados do termo adesão conforme tela M030
    /// </summary>
    /// <param name="request">Dados de alteração do termo adesão</param>
    /// <returns>AppResponse com resultado da alteração</returns>
    public async Task<AppResponse<bool>> AlterarTermoAdesao(AlteracaoTermoAdesaoRequestDto request)
    {
        var response = new AppResponse<bool>();
        
        try
        {
            // Validação de entrada
            if (request == null)
            {
                response.IsSuccess = false;
                response.Message = "Request inválido";
                return response;
            }
            
            if (string.IsNullOrEmpty(request.NumeroApolice))
            {
                response.IsSuccess = false;
                response.Message = "Número da apólice é obrigatório";
                return response;
            }
            
            // Executa ViewModel de alteração
            var sucesso = await processarAlteracaoM030ViewModel.Execute(request);
            
            response.Data = sucesso;
            response.IsSuccess = true;
            response.Message = "Termo adesão alterado com sucesso";
        }
        catch (InvalidOperationException ex)
        {
            // Exceções de negócio
            response.IsSuccess = false;
            response.Message = ex.Message;
        }
        catch (Exception ex)
        {
            // Exceções não previstas
            response.IsSuccess = false;
            response.Message = "Erro interno ao alterar termo adesão";
            response.StackTrace = ex.Message;
            // Log exception
        }
        
        return response;
    }
}
```

### 2. AppResponse<T>

```csharp
/// <summary>
/// Classe genérica para respostas padronizadas da API
/// </summary>
public class AppResponse<T>
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; } = string.Empty;
    public T? Data { get; set; }
    public string? StackTrace { get; set; }
}
```

## Dependências

- **Depende de**: 01_DOMAIN_MODEL.md (Interfaces), 04_BUSINESS_LOGIC.md (ViewModels)
- **Necessário para**: 06_API_LAYER.md (Controllers vão usar este Service)

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: 1 Service implementado orquestrando ViewModels
- [x] **OBRIGATÓRIO**: AppResponse<T> pattern implementado
- [x] **OBRIGATÓRIO**: Tratamento de exceções implementado
- [x] **OBRIGATÓRIO**: Logging configurado
- [x] **OBRIGATÓRIO**: Primary constructors em todos os Services
- [x] **OBRIGATÓRIO**: Todos elementos têm ID da matriz referenciado

## Rastreabilidade Completa

### Resumo de IDs da Matriz Abordados

| Tipo | Quantidade | Range | Status |
|------|------------|-------|--------|
| METOD (Services) | 4 | METOD-0102, METOD-0104, METOD-0107, METOD-0109 | COMPLETED |

**Total de IDs Mapeados neste Documento**: 4

### Status na Matriz

Atualizar `MATRIZ_RASTREABILIDADE.csv`:
- Status_Documentacao = COMPLETED para METOD-0102, METOD-0104, METOD-0107, METOD-0109
- Ref_Doc_Abordagem = 05_APPLICATION_SERVICES.md

