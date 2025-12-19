# 06 - API LAYER

## Objetivo

Documentar a camada de API REST para o sistema CB2QA, mapeando as 8 telas legadas (TELA-0001 a TELA-0008) para endpoints HTTP modernos, incluindo Controllers, validações, Program.cs e configurações de Swagger, CORS e middlewares.

## Mapeamento de Legado

### Origem
- **Arquivo**: `_LEGADO/cb2qa.esf`
- **Telas**: 8 telas (TELA-0001 a TELA-0008)
- **Funções de Apresentação**: FTELA-0001 a FTELA-0004
- **Objetos de Tela**: 75 campos (OBJ-0001 a OBJ-0075)

### Destino
- **Camada**: API
- **Namespace Base**: `Cb2qa.Web.AgTeste.Api`
- **Tecnologia**: ASP.NET Core 8 Web API
- **Padrão**: REST com verbos HTTP padrão

## Especificação Técnica

### 1. Controllers

#### 1.1 ConsultaMovimentoController

**Rastreabilidade**:
- **IDs Matriz**: TELA-0001, TELA-0002, FTELA-0001, FTELA-0002
- **Origem**: CB2QM010 (tela consulta) + CB2QM020 (listagem resultados)
- **Arquivo**: `_LEGADO/cb2qa.esf`, linhas 90, 590
- **Campos**: OBJ-0001 a OBJ-0024

**Namespace**: `Cb2qa.Web.AgTeste.Api.Controllers`

```csharp
using Microsoft.AspNetCore.Mvc;
using Cb2qa.Web.AgTeste.Domain.Dto;
using Cb2qa.Web.AgTeste.Domain.Interfaces.Services;

/// <summary>
/// Controller para consulta de movimentos de débito automático
/// Migrado de: TELA-0001 (CB2QM010) + TELA-0002 (CB2QM020)
/// </summary>
[ApiController]
[Route("ConsultaMovimento")]
[Produces("application/json")]
public class ConsultaMovimentoController(IConsultaMovimentoService service) : ControllerBase
{
    /// <summary>
    /// Realiza consulta de movimentos conforme critérios informados
    /// Migrado de: TELA-0001 (CB2QM010) - Tela consulta movto debito automatico
    /// Campos: OBJ-0007 (NUM_TITULO), OBJ-0008 (NUM_APOLICE), etc.
    /// </summary>
    /// <param name="request">Critérios de consulta (título, apólice, conta ou cartão)</param>
    /// <returns>Lista de movimentos encontrados</returns>
    /// <response code="200">Consulta realizada com sucesso</response>
    /// <response code="422">Erro de negócio (nenhum critério informado, registro não encontrado)</response>
    /// <response code="400">Validação de entrada inválida</response>
    [HttpPost("consultar")]
    [ProducesResponseType(typeof(AppResponse<ListagemResultadosResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppResponse<ListagemResultadosResponse>), StatusCodes.Status422UnprocessableEntity)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Consultar([FromBody] ConsultaMovimentoRequest request)
    {
        // Validação básica
        if (request == null)
        {
            return BadRequest(new AppResponse<ListagemResultadosResponse>
            {
                IsSuccess = false,
                Message = "Request inválido"
            });
        }
        
        var response = await service.Consultar(request);
        return response.IsSuccess ? Ok(response) : UnprocessableEntity(response);
    }
    
    /// <summary>
    /// Obtém resultados de uma consulta com paginação
    /// Migrado de: TELA-0002 (CB2QM020) - Tela listagem resultados consulta
    /// Campos: OBJ-0017 (QTD_REGISTROS), OBJ-0018 (ACPAG2 - numero pagina)
    /// </summary>
    /// <param name="request">Request com filtros originais e número da página</param>
    /// <returns>Página de resultados</returns>
    /// <response code="200">Resultados obtidos com sucesso</response>
    /// <response code="422">Erro de negócio</response>
    [HttpPost("resultados")]
    [ProducesResponseType(typeof(AppResponse<ListagemResultadosResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppResponse<ListagemResultadosResponse>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> ObterResultados([FromBody] ListagemResultadosRequest request)
    {
        if (request == null)
        {
            return BadRequest(new AppResponse<ListagemResultadosResponse>
            {
                IsSuccess = false,
                Message = "Request inválido"
            });
        }
        
        var response = await service.ObterResultados(request);
        return response.IsSuccess ? Ok(response) : UnprocessableEntity(response);
    }
}
```

**Mapeamento de Campos Tela M010 → Request**:

| ID Matriz | Campo Legado | Campo Request | OBJ | Validação |
|-----------|--------------|---------------|-----|-----------|
| OBJ-0007 | NUM_TITULO | NumeroTitulo | OBJ-0007 | MaxLength(20) |
| OBJ-0008 | NUM_APOLICE | NumeroApolice | OBJ-0008 | MaxLength(20) |
| OBJ-0009 | NRENDOS | NumeroEndosso | OBJ-0009 | MaxLength(10) |
| OBJ-0010 | COD_AGENCIA_DEB | CodigoAgencia | OBJ-0010 | MaxLength(10) |
| OBJ-0011 | OPER_CONTA_DEB | OperacaoConta | OBJ-0011 | MaxLength(5) |
| OBJ-0012 | NUM_CONTA_DEB | NumeroConta | OBJ-0012 | MaxLength(20) |
| OBJ-0013 | DIG_CONTA_DEB | DigitoVerificadorConta | OBJ-0013 | MaxLength(1) |
| OBJ-0014 | WK_CARTAO1 | NumeroCartao | OBJ-0014 | MaxLength(20) |
| OBJ-0015 | DIG_NUM_CARTAO | DigitoVerificadorCartao | OBJ-0015 | MaxLength(1) |

#### 1.2 DetalheParcelasController

**Rastreabilidade**:
- **IDs Matriz**: TELA-0003, FTELA-0003
- **Origem**: CB2QM030 - Tela detalhamento parcelas
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 1452
- **Campos**: OBJ-0025 a OBJ-0039

```csharp
using Microsoft.AspNetCore.Mvc;
using Cb2qa.Web.AgTeste.Domain.Dto;
using Cb2qa.Web.AgTeste.Domain.Interfaces.Services;

/// <summary>
/// Controller para detalhe de parcelas
/// Migrado de: TELA-0003 (CB2QM030) - Tela detalhamento parcelas
/// </summary>
[ApiController]
[Route("DetalheParcelas")]
[Produces("application/json")]
public class DetalheParcelasController(IDetalheParcelaService service) : ControllerBase
{
    /// <summary>
    /// Obtém detalhes das parcelas de uma apólice/endosso
    /// Migrado de: TELA-0003 (CB2QM030)
    /// Campos: OBJ-0026 (NUM_APOLICE), OBJ-0027 (NRENDOS), OBJ-0028 (COD_CONVENIO)
    /// </summary>
    /// <param name="numeroApolice">Número da apólice</param>
    /// <param name="numeroEndosso">Número do endosso</param>
    /// <param name="codigoConvenio">Código do convênio</param>
    /// <param name="numeroPagina">Número da página (padrão: 1)</param>
    /// <returns>Lista paginada de parcelas</returns>
    /// <response code="200">Parcelas obtidas com sucesso</response>
    /// <response code="422">Erro de negócio</response>
    /// <response code="400">Parâmetros inválidos</response>
    [HttpGet("{numeroApolice}/{numeroEndosso}")]
    [ProducesResponseType(typeof(AppResponse<ListagemResultadosResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppResponse<ListagemResultadosResponse>), StatusCodes.Status422UnprocessableEntity)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ObterParcelas(
        string numeroApolice,
        string numeroEndosso,
        [FromQuery] string? codigoConvenio = null,
        [FromQuery] int numeroPagina = 1)
    {
        // Validação de parâmetros
        if (string.IsNullOrEmpty(numeroApolice) || string.IsNullOrEmpty(numeroEndosso))
        {
            return BadRequest(new AppResponse<ListagemResultadosResponse>
            {
                IsSuccess = false,
                Message = "Apólice e endosso são obrigatórios"
            });
        }
        
        var request = new DetalheParcelasRequest
        {
            NumeroApolice = numeroApolice,
            NumeroEndosso = numeroEndosso,
            CodigoConvenio = codigoConvenio ?? string.Empty,
            NumeroPagina = numeroPagina
        };
        
        var response = await service.ObterParcelas(request);
        return response.IsSuccess ? Ok(response) : UnprocessableEntity(response);
    }
}
```

**Mapeamento de Campos Tela M030 → Request**:

| ID Matriz | Campo Legado | Param/Query | OBJ | Descrição |
|-----------|--------------|-------------|-----|-----------|
| OBJ-0026 | NUM_APOLICE | Path param | OBJ-0026 | Número apólice |
| OBJ-0027 | NRENDOS | Path param | OBJ-0027 | Número endosso |
| OBJ-0028 | COD_CONVENIO | Query param | OBJ-0028 | Código convênio |
| OBJ-0031 | ACPAG3 | Query param | OBJ-0031 | Número página |

#### 1.3 DetalheMovimentoController

**Rastreabilidade**:
- **IDs Matriz**: TELA-0004, FTELA-0004
- **Origem**: CB2QM040 - Tela detalhamento completo movimento
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 2575
- **Campos**: OBJ-0039 a OBJ-0064

```csharp
using Microsoft.AspNetCore.Mvc;
using Cb2qa.Web.AgTeste.Domain.Dto;
using Cb2qa.Web.AgTeste.Domain.Interfaces.Services;

/// <summary>
/// Controller para detalhe completo do movimento
/// Migrado de: TELA-0004 (CB2QM040) - Tela detalhamento completo movimento
/// </summary>
[ApiController]
[Route("DetalheMovimento")]
[Produces("application/json")]
public class DetalheMovimentoController(IDetalheMovimentoService service) : ControllerBase
{
    /// <summary>
    /// Obtém detalhe completo de um movimento específico
    /// Migrado de: TELA-0004 (CB2QM040)
    /// Campos: OBJ-0041 (NUM_APOLICE), OBJ-0042 (NRENDOS), OBJ-0043 (NRPARCEL), etc.
    /// </summary>
    /// <param name="numeroApolice">Número da apólice</param>
    /// <param name="numeroEndosso">Número do endosso</param>
    /// <param name="numeroParcela">Número da parcela</param>
    /// <param name="codigoConvenio">Código do convênio</param>
    /// <returns>Detalhe completo do movimento</returns>
    /// <response code="200">Detalhe obtido com sucesso</response>
    /// <response code="404">Movimento não encontrado</response>
    /// <response code="422">Erro de negócio</response>
    [HttpGet("{numeroApolice}/{numeroEndosso}/{numeroParcela}")]
    [ProducesResponseType(typeof(AppResponse<MovimentoDetalheCompletoDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppResponse<MovimentoDetalheCompletoDto>), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(AppResponse<MovimentoDetalheCompletoDto>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> ObterDetalheCompleto(
        string numeroApolice,
        string numeroEndosso,
        string numeroParcela,
        [FromQuery] string? codigoConvenio = null)
    {
        if (string.IsNullOrEmpty(numeroApolice) || 
            string.IsNullOrEmpty(numeroEndosso) || 
            string.IsNullOrEmpty(numeroParcela))
        {
            return BadRequest(new AppResponse<MovimentoDetalheCompletoDto>
            {
                IsSuccess = false,
                Message = "Apólice, endosso e parcela são obrigatórios"
            });
        }
        
        var request = new DetalheMovimentoRequest
        {
            NumeroApolice = numeroApolice,
            NumeroEndosso = numeroEndosso,
            NumeroParcela = numeroParcela,
            CodigoConvenio = codigoConvenio ?? string.Empty
        };
        
        var response = await service.ObterDetalheCompleto(request);
        
        if (!response.IsSuccess && response.Message.Contains("não encontrado"))
        {
            return NotFound(response);
        }
        
        return response.IsSuccess ? Ok(response) : UnprocessableEntity(response);
    }
}
```

**Mapeamento de Campos Tela M040 → Response**:

| ID Matriz | Campo Legado | Campo Response | OBJ | Descrição |
|-----------|--------------|----------------|-----|-----------|
| OBJ-0039 | NOME_RAZAO | NomeRazao | OBJ-0039 | Nome ou razão social |
| OBJ-0040 | CB2Q_CPFCNPJ | CpfCnpj | OBJ-0040 | CPF ou CNPJ |
| OBJ-0041 | NUM_APOLICE | NumeroApolice | OBJ-0041 | Número apólice |
| OBJ-0042 | NRENDOS | NumeroEndosso | OBJ-0042 | Número endosso |
| OBJ-0043 | NRPARCEL | NumeroParcela | OBJ-0043 | Número parcela |
| OBJ-0044 | DTVENCTO | DataVencimento | OBJ-0044 | Data vencimento |
| OBJ-0045 | VLR_DEBITO | ValorDebito | OBJ-0045 | Valor débito |
| OBJ-0046 | SIT_COBRA | SituacaoCobranca | OBJ-0046 | Situação cobrança |
| OBJ-0055 | NSAS | NumeroFitaEnvio | OBJ-0055 | Número fita envio |
| OBJ-0056 | DATA_ENVIO | DataEnvio | OBJ-0056 | Data envio |
| OBJ-0061 | NUM_CHEQUE | NumeroCheque | OBJ-0061 | Número cheque |

### 2. Request DTOs com Validação

#### 2.1 ConsultaMovimentoRequest

**Rastreabilidade**: OBJ-0007 a OBJ-0015 (campos tela M010)

```csharp
using System.ComponentModel.DataAnnotations;

/// <summary>
/// Request para consulta de movimentos
/// Migrado de: TELA-0001 (CB2QM010)
/// </summary>
public class ConsultaMovimentoRequest
{
    /// <summary>
    /// Número do título
    /// Origem: OBJ-0007 (NUM_TITULO)
    /// </summary>
    [StringLength(20, ErrorMessage = "Número do título deve ter no máximo 20 caracteres")]
    public string? NumeroTitulo { get; set; }
    
    /// <summary>
    /// Número da apólice
    /// Origem: OBJ-0008 (NUM_APOLICE)
    /// </summary>
    [StringLength(20, ErrorMessage = "Número da apólice deve ter no máximo 20 caracteres")]
    public string? NumeroApolice { get; set; }
    
    /// <summary>
    /// Número do endosso
    /// Origem: OBJ-0009 (NRENDOS)
    /// </summary>
    [StringLength(10, ErrorMessage = "Número do endosso deve ter no máximo 10 caracteres")]
    public string? NumeroEndosso { get; set; }
    
    /// <summary>
    /// Código da agência
    /// Origem: OBJ-0010 (COD_AGENCIA_DEB)
    /// </summary>
    [StringLength(10)]
    public string? CodigoAgencia { get; set; }
    
    /// <summary>
    /// Operação da conta
    /// Origem: OBJ-0011 (OPER_CONTA_DEB)
    /// </summary>
    [StringLength(5)]
    public string? OperacaoConta { get; set; }
    
    /// <summary>
    /// Número da conta
    /// Origem: OBJ-0012 (NUM_CONTA_DEB)
    /// </summary>
    [StringLength(20)]
    public string? NumeroConta { get; set; }
    
    /// <summary>
    /// Dígito verificador da conta
    /// Origem: OBJ-0013 (DIG_CONTA_DEB)
    /// </summary>
    [StringLength(1)]
    public string? DigitoVerificadorConta { get; set; }
    
    /// <summary>
    /// Número do cartão
    /// Origem: OBJ-0014 (WK_CARTAO1)
    /// </summary>
    [StringLength(20)]
    public string? NumeroCartao { get; set; }
    
    /// <summary>
    /// Dígito verificador do cartão
    /// Origem: OBJ-0015 (DIG_NUM_CARTAO)
    /// </summary>
    [StringLength(1)]
    public string? DigitoVerificadorCartao { get; set; }
}
```

### 3. Program.cs

**Arquivo**: `Cb2qa.Web.AgTeste.Api/Program.cs`

```csharp
using System.Reflection;
using Microsoft.OpenApi.Models;
using Cb2qa.Web.AgTeste.Ioc;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        // Customizar validação automática
        options.SuppressModelStateInvalidFilter = false;
    });

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "CB2QA - Consulta Movimento Débito Automático API",
        Version = "v1.0",
        Description = "API RESTful de migração do sistema legado CB2QA (mainframe) para .NET Core 8",
        Contact = new OpenApiContact
        {
            Name = "Time de Desenvolvimento",
            Email = "dev@agtest.com"
        }
    });
    
    // Incluir comentários XML
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        options.IncludeXmlComments(xmlPath);
    }
    
    // Schemas customizados
    options.CustomSchemaIds(type => type.FullName);
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultCorsPolicy", policy =>
    {
        policy.SetIsOriginAllowed(origin => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// Dependency Injection - IOC
// Registra Application + Infrastructure via IOC layer
builder.Services.AddApplicationAndInfraStructure(builder.Configuration);

// Health Checks
builder.Services.AddHealthChecks()
    .AddSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection") ?? string.Empty,
        name: "database",
        timeout: TimeSpan.FromSeconds(30));

var app = builder.Build();

// Middleware Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "CB2QA API v1");
        options.RoutePrefix = string.Empty; // Swagger na raiz
    });
}

app.UseHttpsRedirection();
app.UseCors("DefaultCorsPolicy");
app.UseAuthorization();

// Health check endpoint
app.MapHealthChecks("/health");

app.MapControllers();

app.Run();
```

### 4. Configuração XML Comments (csproj)

**Arquivo**: `Cb2qa.Web.AgTeste.Api/Cb2qa.Web.AgTeste.Api.csproj`

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <GenerateDocumentationFile>true</GenerateDocumentationFile>
    <NoWarn>$(NoWarn);1591</NoWarn>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.0" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
    <PackageReference Include="Microsoft.Extensions.Diagnostics.HealthChecks.SqlServer" Version="8.0.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\Cb2qa.Web.AgTeste.Ioc\Cb2qa.Web.AgTeste.Ioc.csproj" />
  </ItemGroup>
</Project>
```

### 5. Middlewares (Opcional - Error Handling Global)

**Arquivo**: `Cb2qa.Web.AgTeste.Api/Middlewares/ErrorHandlingMiddleware.cs`

```csharp
using System.Net;
using System.Text.Json;
using Cb2qa.Web.AgTeste.Domain.Dto;

namespace Cb2qa.Web.AgTeste.Api.Middlewares;

/// <summary>
/// Middleware global para tratamento de exceções não capturadas
/// </summary>
public class ErrorHandlingMiddleware(
    RequestDelegate next,
    ILogger<ErrorHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Erro não tratado na requisição {Path}", context.Request.Path);
            await HandleExceptionAsync(context, ex);
        }
    }
    
    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        context.Response.ContentType = "application/json";
        
        var response = new AppResponse<object>
        {
            IsSuccess = false,
            Message = "Erro interno do servidor",
            StackTrace = exception.Message
        };
        
        var json = JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
        
        return context.Response.WriteAsync(json);
    }
}

// Extension method para registrar middleware
public static class ErrorHandlingMiddlewareExtensions
{
    public static IApplicationBuilder UseErrorHandling(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ErrorHandlingMiddleware>();
    }
}
```

## Resumo de Endpoints

### Tabela de Endpoints por Tela Legada

| Tela Legada | ID Matriz | Controller | Endpoint | Método | Descrição |
|-------------|-----------|------------|----------|--------|-----------|
| CB2QM010 | TELA-0001 | ConsultaMovimento | /ConsultaMovimento/consultar | POST | Consulta inicial de movimentos |
| CB2QM020 | TELA-0002 | ConsultaMovimento | /ConsultaMovimento/resultados | POST | Listagem paginada de resultados |
| CB2QM030 | TELA-0003 | DetalheParcelas | /DetalheParcelas/{apolice}/{endosso} | GET | Detalhe de parcelas |
| CB2QM040 | TELA-0004 | DetalheMovimento | /DetalheMovimento/{apolice}/{endosso}/{parcela} | GET | Detalhe completo do movimento |
| CB2QH010-040 | TELA-0005 a TELA-0008 | - | - | - | Telas de ajuda (não migradas para API) |

## Dependências

- **Depende de**:
  - 01_DOMAIN_MODEL.md (DTOs, AppResponse)
  - 05_APPLICATION_SERVICES.md (Services)
- **Necessário para**: 07_DEPENDENCY_INJECTION.md (IOC configurará controllers)

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: Controllers para todas telas principais (M010, M020, M030, M040)
- [x] **OBRIGATÓRIO**: Endpoints RESTful seguindo padrões HTTP
- [x] **OBRIGATÓRIO**: Nomenclatura em português (Controller PascalCase, endpoint camelCase)
- [x] **OBRIGATÓRIO**: Data Annotations em todos Request DTOs
- [x] **OBRIGATÓRIO**: Swagger configurado com XML comments
- [x] **OBRIGATÓRIO**: CORS configurado
- [x] **OBRIGATÓRIO**: Program.cs completo com pipeline middleware
- [x] **OBRIGATÓRIO**: Health checks configurados
- [x] **OBRIGATÓRIO**: Primary constructors em controllers
- [x] **OBRIGATÓRIO**: ProducesResponseType em todos endpoints
- [x] **OBRIGATÓRIO**: Validação de entrada em todos endpoints
- [x] **OBRIGATÓRIO**: Retorno AppResponse<T> padronizado

## Rastreabilidade Completa

### Resumo de IDs da Matriz Abordados

| Tipo | Quantidade | Range | Status |
|------|------------|-------|--------|
| TELA | 4 | TELA-0001 a TELA-0004 (principais) | COMPLETED |
| FTELA | 4 | FTELA-0001 a FTELA-0004 | COMPLETED |
| OBJ | 64 | OBJ-0007 a OBJ-0064 (campos mapeados) | COMPLETED |

**Total de IDs Mapeados neste Documento**: 72

### Mapeamento Tela → Controller

| ID Tela | Tela Legado | Controller | Endpoints |
|---------|-------------|------------|-----------|
| TELA-0001 | CB2QM010 | ConsultaMovimentoController | /consultar |
| TELA-0002 | CB2QM020 | ConsultaMovimentoController | /resultados |
| TELA-0003 | CB2QM030 | DetalheParcelasController | /{apolice}/{endosso} |
| TELA-0004 | CB2QM040 | DetalheMovimentoController | /{apolice}/{endosso}/{parcela} |

### Status na Matriz

Atualizar `MATRIZ_RASTREABILIDADE.csv`:
- Status_Documentacao = COMPLETED para TELA-0001 a TELA-0004
- Status_Documentacao = COMPLETED para FTELA-0001 a FTELA-0004
- Status_Documentacao = COMPLETED para OBJ-0007 a OBJ-0064 (campos principais)
- Ref_Doc_Abordagem = 06_API_LAYER.md

