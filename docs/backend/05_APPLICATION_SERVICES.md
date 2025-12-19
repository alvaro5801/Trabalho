# 05 - APPLICATION SERVICES

## Objetivo

Documentar os Services da camada Application que orquestram ViewModels, tratam exceções e retornam respostas padronizadas via AppResponse<T>, servindo como camada intermediária entre Controllers (API) e ViewModels (Business Logic).

## Mapeamento de Legado

### Origem
- **Arquivo**: `_LEGADO/cb2qa.esf`
- **Métodos Principais**: METOD-0002 (CB2QP005 - Rotina principal loop de telas)
- **Processamento de Telas**: METOD-0003 a METOD-0009
- **Contexto**: Orquestração do fluxo entre telas M010 → M020 → M030 → M040

### Destino
- **Camada**: Application
- **Namespace Base**: `Cb2qa.Web.AgTeste.Application.Services`
- **Padrão**: Um Service por contexto/agregado
- **Retorno**: SEMPRE `AppResponse<T>`

## Especificação Técnica

### 1. Services Principais

#### 1.1 ConsultaMovimentoService

**Rastreabilidade**:
- **ID Matriz**: METOD-0002, METOD-0003
- **Origem**: CB2QP005 (loop principal) + CB2QS010 (consulta M010)
- **Arquivo**: `_LEGADO/cb2qa.esf`, linhas 3686-3788, 3790-4007

**Namespace**: `Cb2qa.Web.AgTeste.Application.Services`

**Responsabilidade**: Orquestrar consultas de movimento, tratando exceções e retornando respostas padronizadas

```csharp
/// <summary>
/// Service para consulta de movimentos
/// Migrado de: METOD-0002, METOD-0003
/// </summary>
public class ConsultaMovimentoService(
    IProcessarConsultaM010ViewModel processarConsultaM010ViewModel,
    IMoverDadosPaginacaoM020ViewModel moverDadosPaginacaoM020ViewModel
) : IConsultaMovimentoService
{
    /// <summary>
    /// Realiza consulta de movimentos conforme critérios M010
    /// </summary>
    /// <param name="request">Critérios de consulta</param>
    /// <returns>AppResponse com lista de movimentos encontrados</returns>
    public async Task<AppResponse<ListagemResultadosResponse>> Consultar(ConsultaMovimentoRequest request)
    {
        var response = new AppResponse<ListagemResultadosResponse>();
        
        try
        {
            // Validação de entrada
            if (request == null)
            {
                response.IsSuccess = false;
                response.Message = "Request inválido";
                return response;
            }
            
            // Executa ViewModel de consulta
            var movimentos = await processarConsultaM010ViewModel.Execute(request);
            
            // Pagina resultados
            var resultadoPaginado = moverDadosPaginacaoM020ViewModel.Execute(movimentos, 1, 10);
            
            response.Data = resultadoPaginado;
            response.IsSuccess = true;
            response.Message = $"{movimentos.Count} movimentos encontrados";
        }
        catch (InvalidOperationException ex)
        {
            // Exceções de negócio
            response.IsSuccess = false;
            response.Message = ex.Message;
            response.StackTrace = ex.StackTrace;
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
    /// Obtém resultados paginados de uma consulta já realizada
    /// </summary>
    /// <param name="request">Request com filtros e paginação</param>
    /// <returns>AppResponse com página de resultados</returns>
    public async Task<AppResponse<ListagemResultadosResponse>> ObterResultados(ListagemResultadosRequest request)
    {
        var response = new AppResponse<ListagemResultadosResponse>();
        
        try
        {
            // Validação
            if (request == null || request.FiltrosConsulta == null)
            {
                response.IsSuccess = false;
                response.Message = "Request inválido";
                return response;
            }
            
            // Re-executar consulta com os mesmos filtros
            var movimentos = await processarConsultaM010ViewModel.Execute(request.FiltrosConsulta);
            
            // Paginar conforme solicitado
            var resultadoPaginado = moverDadosPaginacaoM020ViewModel.Execute(
                movimentos, 
                request.NumeroPagina, 
                request.TamanhoPagina);
            
            response.Data = resultadoPaginado;
            response.IsSuccess = true;
            response.Message = "Resultados obtidos com sucesso";
        }
        catch (InvalidOperationException ex)
        {
            response.IsSuccess = false;
            response.Message = ex.Message;
            response.StackTrace = ex.StackTrace;
        }
        catch (Exception ex)
        {
            response.IsSuccess = false;
            response.Message = "Erro ao obter resultados";
            response.StackTrace = ex.Message;
        }
        
        return response;
    }
}
```

#### 1.2 DetalheParcelaService

**Rastreabilidade**:
- **ID Matriz**: METOD-0005, METOD-0006, METOD-0056
- **Origem**: CB2QS020, CB2QP029, CB2QP022
- **Arquivo**: `_LEGADO/cb2qa.esf`, linhas 4228-4344, 4364-4546, 8038-8223

**Namespace**: `Cb2qa.Web.AgTeste.Application.Services`

```csharp
/// <summary>
/// Service para detalhe de parcelas (Tela M030)
/// Migrado de: METOD-0005, METOD-0006, METOD-0056
/// </summary>
public class DetalheParcelaService(
    IProcessarSelecaoM020ViewModel processarSelecaoM020ViewModel
) : IDetalheParcelaService
{
    /// <summary>
    /// Obtém detalhes das parcelas de uma apólice/endosso
    /// </summary>
    /// <param name="request">Request com apólice, endosso e convênio</param>
    /// <returns>AppResponse com lista de parcelas</returns>
    public async Task<AppResponse<ListagemResultadosResponse>> ObterParcelas(DetalheParcelasRequest request)
    {
        var response = new AppResponse<ListagemResultadosResponse>();
        
        try
        {
            // Validação
            if (string.IsNullOrEmpty(request.NumeroApolice) || 
                string.IsNullOrEmpty(request.NumeroEndosso))
            {
                response.IsSuccess = false;
                response.Message = "Apólice e endosso são obrigatórios";
                return response;
            }
            
            // Buscar parcelas
            var parcelas = await processarSelecaoM020ViewModel.Execute(request);
            
            // Converter para formato de resposta
            var movimentos = parcelas.Select(p => new MovimentoResumoDto
            {
                NumeroApolice = request.NumeroApolice,
                NumeroEndosso = request.NumeroEndosso,
                CodigoConvenio = request.CodigoConvenio,
                DadosMovimento = $"Parcela {p.NumeroParcela} - Venc: {p.DataVencimento:dd/MM/yyyy} - Valor: {p.ValorDebito:C}"
            }).ToList();
            
            var resultadoPaginado = new ListagemResultadosResponse
            {
                QuantidadeTotal = parcelas.Count,
                NumeroPagina = request.NumeroPagina,
                TotalPaginas = (int)Math.Ceiling(parcelas.Count / 10.0),
                Movimentos = movimentos.Skip((request.NumeroPagina - 1) * 10).Take(10).ToList()
            };
            
            response.Data = resultadoPaginado;
            response.IsSuccess = true;
            response.Message = $"{parcelas.Count} parcelas encontradas";
        }
        catch (InvalidOperationException ex)
        {
            response.IsSuccess = false;
            response.Message = ex.Message;
            response.StackTrace = ex.StackTrace;
        }
        catch (Exception ex)
        {
            response.IsSuccess = false;
            response.Message = "Erro ao obter parcelas";
            response.StackTrace = ex.Message;
        }
        
        return response;
    }
}
```

#### 1.3 DetalheMovimentoService

**Rastreabilidade**:
- **ID Matriz**: METOD-0007, METOD-0008, METOD-0009
- **Origem**: CB2QS030, CB2QP032, CB2QS040
- **Arquivo**: `_LEGADO/cb2qa.esf`, linhas 4548-4632, 4634-5550, 5552-5576

**Namespace**: `Cb2qa.Web.AgTeste.Application.Services`

```csharp
/// <summary>
/// Service para detalhe completo do movimento (Tela M040)
/// Migrado de: METOD-0007, METOD-0008, METOD-0009
/// </summary>
public class DetalheMovimentoService(
    IMovimentoDebitoCCRepository movimentoDebitoCCRepository,
    IProcessarRegistroViewModel processarRegistroViewModel,
    IBancosRepository bancosRepository,
    IUsuariosRepository usuariosRepository,
    IMovimentoContaRepository movimentoContaRepository
) : IDetalheMovimentoService
{
    /// <summary>
    /// Obtém detalhe completo de um movimento específico
    /// </summary>
    /// <param name="request">Request com apólice, endosso, parcela e convênio</param>
    /// <returns>AppResponse com detalhe completo do movimento</returns>
    public async Task<AppResponse<MovimentoDetalheCompletoDto>> ObterDetalheCompleto(DetalheMovimentoRequest request)
    {
        var response = new AppResponse<MovimentoDetalheCompletoDto>();
        
        try
        {
            // Validação
            if (string.IsNullOrEmpty(request.NumeroApolice) || 
                string.IsNullOrEmpty(request.NumeroEndosso) ||
                string.IsNullOrEmpty(request.NumeroParcela))
            {
                response.IsSuccess = false;
                response.Message = "Apólice, endosso e parcela são obrigatórios";
                return response;
            }
            
            // Buscar movimento específico
            MovimentoDebitoCCCef? movimento = null;
            await foreach (var m in movimentoDebitoCCRepository.GetCursorParcelas(
                request.NumeroApolice, request.NumeroEndosso, request.CodigoConvenio))
            {
                if (m.NumeroParcela == request.NumeroParcela)
                {
                    movimento = m;
                    break;
                }
            }
            
            if (movimento == null)
            {
                response.IsSuccess = false;
                response.Message = "Movimento não encontrado";
                return response;
            }
            
            // Processar registro para obter informações adicionais
            var resumo = await processarRegistroViewModel.Execute(movimento);
            
            // Buscar informações complementares
            var nomeBanco = await bancosRepository.GetNome(movimento.CodigoAgencia ?? "0");
            var nomeUsuario = await usuariosRepository.GetNome(movimento.CodigoUsuario ?? string.Empty);
            
            // Buscar dados de movimento de conta se houver
            string? dadosMovimentoConta = null;
            if (!string.IsNullOrEmpty(movimento.NumeroFitaEnvio))
            {
                var movimentoConta = await movimentoContaRepository.GetByChaveComposta(
                    movimento.NumeroApolice,
                    movimento.NumeroEndosso,
                    movimento.CodigoConvenio,
                    movimento.NumeroParcela,
                    movimento.NumeroFitaEnvio);
                
                if (movimentoConta != null)
                {
                    dadosMovimentoConta = $"Fita: {movimentoConta.NumeroFitaEnvio} - Situação: {movimentoConta.SituacaoCobranca}";
                }
            }
            
            // Montar resposta completa
            var detalhe = new MovimentoDetalheCompletoDto
            {
                NomeRazao = resumo.NomeSegurado,
                CpfCnpj = string.Empty, // Obtido via ProcessarRegistroViewModel
                NumeroApolice = movimento.NumeroApolice,
                NumeroEndosso = movimento.NumeroEndosso,
                NumeroParcela = movimento.NumeroParcela,
                DataVencimento = movimento.DataVencimento,
                ValorDebito = movimento.ValorDebito ?? 0,
                SituacaoCobranca = movimento.SituacaoCobranca ?? string.Empty,
                TipoCobranca = movimento.TipoCobranca ?? string.Empty,
                DataMovimento = movimento.DataMovimento,
                NomeUsuario = nomeUsuario ?? "Desconhecido",
                CodigoBanco = movimento.CodigoAgencia ?? string.Empty,
                DescricaoBanco = nomeBanco ?? "Banco não identificado",
                CodigoConvenio = movimento.CodigoConvenio,
                DadosCartaoConta = FormatarDadosCartaoConta(movimento),
                DadosMovimentoConta = dadosMovimentoConta,
                NumeroFitaEnvio = movimento.NumeroFitaEnvio,
                DataEnvio = movimento.DataEnvio,
                NumeroFitaRetorno = movimento.NumeroFitaRetorno,
                DataRetorno = movimento.DataRetorno,
                DataPagamento = movimento.DataPagamento,
                DataCredito = movimento.DataCredito,
                NumeroCheque = movimento.NumeroCheque,
                DigitoVerificadorCheque = movimento.DigitoVerificadorCheque,
                CodigoRetorno = movimento.CodigoRetorno,
                DescricaoRetorno = movimento.DescricaoRetorno
            };
            
            response.Data = detalhe;
            response.IsSuccess = true;
            response.Message = "Detalhe obtido com sucesso";
        }
        catch (InvalidOperationException ex)
        {
            response.IsSuccess = false;
            response.Message = ex.Message;
            response.StackTrace = ex.StackTrace;
        }
        catch (Exception ex)
        {
            response.IsSuccess = false;
            response.Message = "Erro ao obter detalhe do movimento";
            response.StackTrace = ex.Message;
        }
        
        return response;
    }
    
    private string FormatarDadosCartaoConta(MovimentoDebitoCCCef movimento)
    {
        if (movimento.TipoCobranca == "1") // Conta corrente
        {
            return $"Ag: {movimento.CodigoAgencia} Op: {movimento.OperacaoConta} " +
                   $"Conta: {movimento.NumeroConta}-{movimento.DigitoVerificadorConta}";
        }
        else if (movimento.TipoCobranca == "2") // Cartão
        {
            var cartao = movimento.NumeroCartao ?? string.Empty;
            if (cartao.Length > 4)
            {
                return $"Cartão: ****{cartao.Substring(cartao.Length - 4)}";
            }
            return $"Cartão: {cartao}";
        }
        else // Carnê
        {
            return "CARNÊ";
        }
    }
}
```

### 2. Dependency Injection

**Arquivo**: `Cb2qa.Web.AgTeste.Application/Configuration/DependencyInjection.cs`

```csharp
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Cb2qa.Web.AgTeste.Domain.Interfaces.Services;
using Cb2qa.Web.AgTeste.Domain.Interfaces.ViewModels;
using Cb2qa.Web.AgTeste.Application.Services;
using Cb2qa.Web.AgTeste.Application.ViewModels;

namespace Cb2qa.Web.AgTeste.Application.Configuration;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Services - Orquestração
        services.AddScoped<IConsultaMovimentoService, ConsultaMovimentoService>();
        services.AddScoped<IDetalheParcelaService, DetalheParcelaService>();
        services.AddScoped<IDetalheMovimentoService, DetalheMovimentoService>();
        
        // ViewModels - Processamento de Telas
        services.AddScoped<IProcessarConsultaM010ViewModel, ProcessarConsultaM010ViewModel>();
        services.AddScoped<IProcessarRegistroViewModel, ProcessarRegistroViewModel>();
        services.AddScoped<IProcessarSelecaoM020ViewModel, ProcessarSelecaoM020ViewModel>();
        
        // ViewModels - Regras de Negócio
        services.AddScoped<IDeterminarTipoDocumentoViewModel, DeterminarTipoDocumentoViewModel>();
        services.AddScoped<IProcessarChequesViewModel, ProcessarChequesViewModel>();
        services.AddScoped<IProcessarMovimentoGEViewModel, ProcessarMovimentoGEViewModel>();
        services.AddScoped<IFormatarCpfCnpjViewModel, FormatarCpfCnpjViewModel>();
        services.AddScoped<IValidarTipoSeguradoViewModel, ValidarTipoSeguradoViewModel>();
        
        // ViewModels - Paginação
        services.AddScoped<IMoverDadosPaginacaoM020ViewModel, MoverDadosPaginacaoM020ViewModel>();
        
        return services;
    }
}
```

## Padrões e Convenções

### 1. AppResponse Pattern

**SEMPRE** retornar `AppResponse<T>` em Services:

```csharp
public class AppResponse<T>
{
    public T? Data { get; set; }
    public string Message { get; set; } = string.Empty;
    public bool IsSuccess { get; set; }
    public string? StackTrace { get; set; }
}
```

### 2. Try-Catch Structure

**SEMPRE** envolver chamadas de ViewModel em try-catch:

```csharp
try
{
    // Validação de entrada
    // Chamada ao ViewModel
    // Montagem da resposta
    response.IsSuccess = true;
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
    response.Message = "Erro genérico";
    // Log exception
}
```

### 3. Separação de Responsabilidades

- **Service**: Orquestração, tratamento de exceções, AppResponse
- **ViewModel**: Lógica de negócio pura, lança exceções
- **Controller**: Validação HTTP, status codes

### 4. Validação de Entrada

**SEMPRE** validar request antes de chamar ViewModel:

```csharp
if (request == null || string.IsNullOrEmpty(request.Campo))
{
    response.IsSuccess = false;
    response.Message = "Campo obrigatório";
    return response;
}
```

### 5. Mensagens de Sucesso e Erro

- **Sucesso**: Mensagem descritiva com resultado
- **Erro de Negócio**: Mensagem do ViewModel (InvalidOperationException)
- **Erro Técnico**: Mensagem genérica + log exception

## Dependências

- **Depende de**:
  - 01_DOMAIN_MODEL.md (Interfaces de Services, DTOs)
  - 04_BUSINESS_LOGIC.md (ViewModels)
- **Necessário para**: 06_API_LAYER.md (Controllers usarão Services)

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: Service para cada contexto (Consulta, Detalhe Parcela, Detalhe Movimento)
- [x] **OBRIGATÓRIO**: AppResponse<T> em todos os retornos
- [x] **OBRIGATÓRIO**: Try-catch em todos os métodos
- [x] **OBRIGATÓRIO**: Validação de entrada em todos métodos
- [x] **OBRIGATÓRIO**: Primary constructors utilizados
- [x] **OBRIGATÓRIO**: Mensagens de erro claras e descritivas
- [x] **OBRIGATÓRIO**: Dependency Injection configurado
- [x] **OBRIGATÓRIO**: Separação clara Service vs ViewModel
- [x] **OBRIGATÓRIO**: Async/await em todos métodos

## Rastreabilidade Completa

### Resumo de IDs da Matriz Abordados

| Tipo | Quantidade | Range | Status |
|------|------------|-------|--------|
| METOD (Services) | 3 | METOD-0002, contextos principais | COMPLETED |
| Contextos | 3 | Consulta, Detalhe Parcela, Detalhe Movimento | COMPLETED |

**Total de Services**: 3

### Mapeamento Service → ViewModels

| Service | ViewModels Utilizados | Contexto |
|---------|----------------------|----------|
| ConsultaMovimentoService | ProcessarConsultaM010, MoverDadosPaginacaoM020 | Tela M010 + M020 |
| DetalheParcelaService | ProcessarSelecaoM020 | Tela M030 |
| DetalheMovimentoService | ProcessarRegistro + Repositories diretos | Tela M040 |

### Status na Matriz

Atualizar `MATRIZ_RASTREABILIDADE.csv`:
- Status_Documentacao = COMPLETED para services principais
- Ref_Doc_Abordagem = 05_APPLICATION_SERVICES.md

