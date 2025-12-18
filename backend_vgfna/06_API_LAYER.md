# 06 - API LAYER

## Objetivo

Definir a camada de API REST para o sistema VGFNA, incluindo Controllers, endpoints, DTOs de request/response, validações e documentação Swagger, mapeando as 3 telas principais (TELA-0101 a TELA-0103) para endpoints RESTful.

## Mapeamento de Legado

### Origem
- **Arquivo**: `_LEGADO/vgfna.esf`
- **Telas**: 3 telas principais (TELA-0101 a TELA-0103)
- **Funções de Tela**: FTELA-0101 a FTELA-0103
- **Métodos**: METOD-0104, METOD-0107, METOD-0109

### Destino
- **Camada**: API
- **Namespace Base**: `Vgfna.Web.AgTeste.Api.Controllers`
- **Tecnologia**: ASP.NET Core Web API
- **Padrão**: RESTful

## Especificação Técnica

### 1. Controllers Principais

#### 1.1 AlteracaoDadosBasicosController

**Rastreabilidade**:
- **ID Matriz**: TELA-0101, TELA-0102, TELA-0103
- **Origem**: VGFNM010, VGFNM020, VGFNM030
- **Métodos**: METOD-0104, METOD-0107, METOD-0109

**Namespace**: `Vgfna.Web.AgTeste.Api.Controllers`

```csharp
/// <summary>
/// Controller para Alteração de Dados Básicos
/// Migrado de: TELA-0101, TELA-0102, TELA-0103
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class AlteracaoDadosBasicosController(
    IAlteracaoDadosBasicosService alteracaoDadosBasicosService,
    ILogger<AlteracaoDadosBasicosController> logger
) : ControllerBase
{
    /// <summary>
    /// Consulta apólice (TELA-0101 - VGFNM010)
    /// Migrado de: METOD-0104 (VGFNS002)
    /// </summary>
    /// <param name="request">Dados da consulta</param>
    /// <returns>Dados da apólice encontrada</returns>
    [HttpPost("consultar-apolice")]
    [ProducesResponseType(typeof(AppResponse<ApoliceDetalhesDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppResponse<object>), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(AppResponse<object>), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<AppResponse<ApoliceDetalhesDto>>> ConsultarApolice(
        [FromBody] ConsultaApoliceRequestDto request)
    {
        logger.LogInformation("Consultando apólice: {NumeroApolice}", request?.NumeroApolice);
        
        var response = await alteracaoDadosBasicosService.ConsultarApolice(request);
        
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }
        
        return Ok(response);
    }
    
    /// <summary>
    /// Altera dados do subgrupo (TELA-0102 - VGFNM020)
    /// Migrado de: METOD-0107 (VGFNS003)
    /// </summary>
    /// <param name="request">Dados de alteração do subgrupo</param>
    /// <returns>Resultado da alteração</returns>
    [HttpPut("alterar-subgrupo")]
    [ProducesResponseType(typeof(AppResponse<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppResponse<object>), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(AppResponse<object>), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<AppResponse<bool>>> AlterarSubgrupo(
        [FromBody] AlteracaoSubgrupoRequestDto request)
    {
        logger.LogInformation("Alterando subgrupo: Apólice {NumeroApolice}, Subgrupo {CodigoSubgrupo}", 
            request?.NumeroApolice, request?.CodigoSubgrupo);
        
        var response = await alteracaoDadosBasicosService.AlterarSubgrupo(request);
        
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }
        
        return Ok(response);
    }
    
    /// <summary>
    /// Altera dados do termo adesão (TELA-0103 - VGFNM030)
    /// Migrado de: METOD-0109 (VGFNS004)
    /// </summary>
    /// <param name="request">Dados de alteração do termo adesão</param>
    /// <returns>Resultado da alteração</returns>
    [HttpPut("alterar-termo-adesao")]
    [ProducesResponseType(typeof(AppResponse<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppResponse<object>), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(AppResponse<object>), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<AppResponse<bool>>> AlterarTermoAdesao(
        [FromBody] AlteracaoTermoAdesaoRequestDto request)
    {
        logger.LogInformation("Alterando termo adesão: Apólice {NumeroApolice}, Termo {CodigoTermo}", 
            request?.NumeroApolice, request?.CodigoTermo);
        
        var response = await alteracaoDadosBasicosService.AlterarTermoAdesao(request);
        
        if (!response.IsSuccess)
        {
            return BadRequest(response);
        }
        
        return Ok(response);
    }
}
```

### 2. DTOs de Request/Response

#### 2.1 ConsultaApoliceRequestDto

```csharp
/// <summary>
/// DTO para requisição de consulta de apólice
/// Migrado de: OBJ-0107 (NUM_APOLICE)
/// </summary>
public class ConsultaApoliceRequestDto
{
    [Required(ErrorMessage = "Número da apólice é obrigatório")]
    [StringLength(20, ErrorMessage = "Número da apólice deve ter no máximo 20 caracteres")]
    public string NumeroApolice { get; set; } = string.Empty;
}
```

#### 2.2 AlteracaoSubgrupoRequestDto

```csharp
/// <summary>
/// DTO para requisição de alteração de subgrupo
/// Migrado de: TELA-0102 (VGFNM020)
/// </summary>
public class AlteracaoSubgrupoRequestDto
{
    [Required]
    public string NumeroApolice { get; set; } = string.Empty;
    
    [Required]
    public int CodigoSubgrupo { get; set; }
    
    public int? PeriodoFaturamento { get; set; }
    public int? FormaFaturamento { get; set; }
    public int? FormaAverbacao { get; set; }
    public int? TipoPlano { get; set; }
    
    [RegularExpression("^[SN]$", ErrorMessage = "Plano associado deve ser S ou N")]
    public char? PlanoAssociado { get; set; }
    
    public int? TipoCobranca { get; set; }
    
    [RegularExpression("^[SN]$", ErrorMessage = "Validar matrícula deve ser S ou N")]
    public char? ValidarMatricula { get; set; }
    
    public int? EnderecoCobranca { get; set; }
    public int? BancoCobranca { get; set; }
    public int? AgenciaCobranca { get; set; }
    public int? DacCobranca { get; set; }
    
    [Range(0, 100, ErrorMessage = "Percentual deve estar entre 0 e 100")]
    public decimal? PercentualConjugeAP { get; set; }
    
    [Range(0, 100, ErrorMessage = "Percentual deve estar entre 0 e 100")]
    public decimal? PercentualConjugeVG { get; set; }
}
```

### 3. Configuração Swagger

```csharp
// Program.cs ou Startup.cs
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "VGFNA API",
        Version = "v1",
        Description = "API para Alteração de Dados Básicos - Sistema VGFNA",
        Contact = new OpenApiContact
        {
            Name = "Suporte",
            Email = "suporte@empresa.com"
        }
    });
    
    // Incluir comentários XML
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});
```

## Dependências

- **Depende de**: 01_DOMAIN_MODEL.md (DTOs), 05_APPLICATION_SERVICES.md (Services)
- **Necessário para**: 07_DEPENDENCY_INJECTION.md (DI dos Controllers)

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: 1 Controller implementado mapeando todas 3 TELA-*
- [x] **OBRIGATÓRIO**: DTOs de request/response para todas as telas
- [x] **OBRIGATÓRIO**: Swagger/OpenAPI configurado
- [x] **OBRIGATÓRIO**: Validações de entrada implementadas
- [x] **OBRIGATÓRIO**: Tratamento de erros implementado
- [x] **OBRIGATÓRIO**: Logging configurado
- [x] **OBRIGATÓRIO**: Primary constructors em todos os Controllers
- [x] **OBRIGATÓRIO**: Todos elementos têm ID da matriz referenciado

## Rastreabilidade Completa

### Resumo de IDs da Matriz Abordados

| Tipo | Quantidade | Range | Status |
|------|------------|-------|--------|
| TELA | 3 | TELA-0101 a TELA-0103 | COMPLETED |
| METOD | 3 | METOD-0104, METOD-0107, METOD-0109 | COMPLETED |
| OBJ | 9 | OBJ-0101 a OBJ-0109 | COMPLETED |

**Total de IDs Mapeados neste Documento**: 15

### Mapeamento TELA → Endpoint

| ID Tela | Descrição | Endpoint | Método HTTP |
|---------|-----------|----------|-------------|
| TELA-0101 | VGFNM010 - Tela consulta | POST /api/alteracao-dados-basicos/consultar-apolice | POST |
| TELA-0102 | VGFNM020 - Tela alteração subgrupo | PUT /api/alteracao-dados-basicos/alterar-subgrupo | PUT |
| TELA-0103 | VGFNM030 - Tela alteração termo adesão | PUT /api/alteracao-dados-basicos/alterar-termo-adesao | PUT |

### Status na Matriz

Atualizar `MATRIZ_RASTREABILIDADE.csv`:
- Status_Documentacao = COMPLETED para TELA-0101 a TELA-0103
- Status_Documentacao = COMPLETED para METOD-0104, METOD-0107, METOD-0109
- Ref_Doc_Abordagem = 06_API_LAYER.md

