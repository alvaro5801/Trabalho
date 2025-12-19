# 07 - DEPENDENCY INJECTION

## Objetivo

Documentar a configuração completa de Dependency Injection (DI) do sistema CB2QA, consolidando registros de todas as camadas (Infrastructure, Application, API) através do projeto IOC, seguindo princípios de Clean Architecture e garantindo lifetimes apropriados para cada componente.

## Mapeamento de Legado

### Origem
- **Contexto**: Sistema mainframe com acoplamento tight coupling
- **Padrão Legado**: CALL/PERFORM com dependências implícitas

### Destino
- **Camada**: IOC (Inversion of Control)
- **Namespace**: `Cb2qa.Web.AgTeste.Ioc`
- **Padrão**: Extension Methods + Constructor Injection
- **Framework**: Microsoft.Extensions.DependencyInjection

## Especificação Técnica

### 1. Projeto IOC - DependencyInjection.cs

**Arquivo**: `Cb2qa.Web.AgTeste.Ioc/DependencyInjection.cs`

```csharp
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Cb2qa.Web.AgTeste.Application.Configuration;
using Cb2qa.Web.AgTeste.Infra.Configuration;

namespace Cb2qa.Web.AgTeste.Ioc;

/// <summary>
/// Configuração centralizada de Dependency Injection
/// Consolida registros de Infrastructure + Application
/// </summary>
public static class DependencyInjection
{
    /// <summary>
    /// Registra todos os serviços da aplicação (Infrastructure + Application)
    /// </summary>
    /// <param name="services">Service collection</param>
    /// <param name="configuration">Configuration</param>
    /// <returns>Service collection configurado</returns>
    public static IServiceCollection AddApplicationAndInfraStructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Camada Infrastructure (Repositories, Dapper, Event Repository)
        services.AddInfrastructure(configuration);
        
        // Camada Application (Services, ViewModels)
        services.AddApplication(configuration);
        
        return services;
    }
}
```

### 2. Infrastructure DI

**Arquivo**: `Cb2qa.Web.AgTeste.Infra/Configuration/DependencyInjection.cs`

```csharp
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Cb2qa.Web.AgTeste.Domain.Interfaces.Repositories;
using Cb2qa.Web.AgTeste.Infra.Repositories;

namespace Cb2qa.Web.AgTeste.Infra.Configuration;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // === Dapper - IDbConnection ===
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException("Connection string 'DefaultConnection' não configurada");
        }
        
        services.AddScoped<IDbConnection>(sp => new SqlConnection(connectionString));
        
        // === Event Repository (Auditoria) ===
        services.AddScoped<IEventRepository, EventRepository>();
        
        // === Repositories - Principais ===
        services.AddScoped<ISistemaRepository, SistemaRepository>();
        services.AddScoped<IRegistroDebitoAutoRepository, RegistroDebitoAutoRepository>();
        services.AddScoped<IMovimentoDebitoCCRepository, MovimentoDebitoCCRepository>();
        services.AddScoped<IApoliceCobrancaRepository, ApoliceCobrancaRepository>();
        services.AddScoped<IMovimentoContaRepository, MovimentoContaRepository>();
        
        // === Repositories - Pessoas ===
        services.AddScoped<IClienteRepository, ClienteRepository>();
        services.AddScoped<IPessoaFisicaRepository, PessoaFisicaRepository>();
        services.AddScoped<IPessoaJuridicaRepository, PessoaJuridicaRepository>();
        services.AddScoped<IPessoaLegadoGERepository, PessoaLegadoGERepository>();
        
        // === Repositories - Documentos ===
        services.AddScoped<IBilheteRepository, BilheteRepository>();
        services.AddScoped<IEndossoRepository, EndossoRepository>();
        services.AddScoped<IParcelaRepository, ParcelaRepository>();
        services.AddScoped<IPropostaRepository, PropostaRepository>();
        services.AddScoped<IPropostaVARepository, PropostaVARepository>();
        
        // === Repositories - Movimentos ===
        services.AddScoped<IMovimentoGERepository, MovimentoGERepository>();
        services.AddScoped<ISinistroArDetalheVCRepository, SinistroArDetalheVCRepository>();
        services.AddScoped<ISinistroHistoricoRepository, SinistroHistoricoRepository>();
        services.AddScoped<IHistoricoCobrancaVARepository, HistoricoCobrancaVARepository>();
        services.AddScoped<IHistoricoSinistroRepository, HistoricoSinistroRepository>();
        services.AddScoped<IMesSinistroRepository, MesSinistroRepository>();
        
        // === Repositories - Auxiliares ===
        services.AddScoped<IBancosRepository, BancosRepository>();
        services.AddScoped<ICalendarioRepository, CalendarioRepository>();
        services.AddScoped<IFeriadosRepository, FeriadosRepository>();
        services.AddScoped<IChequesRepository, ChequesRepository>();
        services.AddScoped<IChequesEmitidosRepository, ChequesEmitidosRepository>();
        services.AddScoped<ILoteChequesRepository, LoteChequesRepository>();
        services.AddScoped<IUsuariosRepository, UsuariosRepository>();
        
        return services;
    }
}
```

### 3. Application DI

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
        // === Services - Orquestração ===
        services.AddScoped<IConsultaMovimentoService, ConsultaMovimentoService>();
        services.AddScoped<IDetalheParcelaService, DetalheParcelaService>();
        services.AddScoped<IDetalheMovimentoService, DetalheMovimentoService>();
        
        // === ViewModels - Processamento de Telas ===
        services.AddScoped<IProcessarConsultaM010ViewModel, ProcessarConsultaM010ViewModel>();
        services.AddScoped<IProcessarRegistroViewModel, ProcessarRegistroViewModel>();
        services.AddScoped<IProcessarSelecaoM020ViewModel, ProcessarSelecaoM020ViewModel>();
        
        // === ViewModels - Regras de Negócio ===
        services.AddScoped<IDeterminarTipoDocumentoViewModel, DeterminarTipoDocumentoViewModel>();
        services.AddScoped<IProcessarChequesViewModel, ProcessarChequesViewModel>();
        services.AddScoped<IProcessarMovimentoGEViewModel, ProcessarMovimentoGEViewModel>();
        services.AddScoped<IFormatarCpfCnpjViewModel, FormatarCpfCnpjViewModel>();
        services.AddScoped<IValidarTipoSeguradoViewModel, ValidarTipoSeguradoViewModel>();
        
        // === ViewModels - Paginação ===
        services.AddScoped<IMoverDadosPaginacaoM020ViewModel, MoverDadosPaginacaoM020ViewModel>();
        
        return services;
    }
}
```

### 4. Uso no Program.cs (API)

**Arquivo**: `Cb2qa.Web.AgTeste.Api/Program.cs`

```csharp
using Cb2qa.Web.AgTeste.Ioc;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// === DEPENDENCY INJECTION - IOC ===
// Registra TODAS as dependências (Infrastructure + Application)
builder.Services.AddApplicationAndInfraStructure(builder.Configuration);

var app = builder.Build();

// Middleware pipeline...
app.MapControllers();
app.Run();
```

## Lifetimes e Justificativas

### Scoped (por request HTTP)

**TODOS os componentes são Scoped**:

| Componente | Lifetime | Justificativa |
|------------|----------|---------------|
| IDbConnection | Scoped | Uma conexão por request, fechada automaticamente |
| Repositories | Scoped | Compartilham conexão do request |
| ViewModels | Scoped | Executam dentro de um request |
| Services | Scoped | Orquestram ViewModels no mesmo request |
| EventRepository | Scoped | Registra eventos do request |

### Por que NÃO usar Singleton?

- **IDbConnection**: Singleton causaria problemas de concorrência
- **Repositories**: Dependem de IDbConnection Scoped
- **ViewModels**: Podem ter estado transitório durante execução
- **Services**: Orquestram operações dentro de um request

### Por que NÃO usar Transient?

- **Performance**: Criar nova instância a cada injeção é desnecessário
- **Compartilhamento**: Componentes no mesmo request devem compartilhar estado (ex: mesma conexão)

## Diagrama de Dependências

```
┌─────────────────────────────────────────────────────────────┐
│                        API Layer                             │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │   Controllers   │  │   Controllers   │                   │
│  └────────┬────────┘  └────────┬────────┘                   │
└───────────┼─────────────────────┼───────────────────────────┘
            │                     │
            ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │ Services │  │ Services │  │ Services │                   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                   │
│       │             │             │                          │
│       ▼             ▼             ▼                          │
│  ┌────────────────────────────────────┐                     │
│  │         ViewModels                 │                     │
│  └────────────┬───────────────────────┘                     │
└───────────────┼──────────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────┐
│                  Infrastructure Layer                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │Repositories │  │Repositories │  │   Dapper    │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         └────────────────┴────────────────┘                 │
│                          │                                   │
│                          ▼                                   │
│                   IDbConnection                              │
│                          │                                   │
└──────────────────────────┼───────────────────────────────────┘
                           │
                           ▼
                    SQL Server Database
```

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: Projeto IOC separado consolidando DI
- [x] **OBRIGATÓRIO**: Infrastructure DI configurado (27 repositories + IDbConnection)
- [x] **OBRIGATÓRIO**: Application DI configurado (3 services + 9 viewmodels)
- [x] **OBRIGATÓRIO**: Extension method AddApplicationAndInfraStructure
- [x] **OBRIGATÓRIO**: Lifetime Scoped para todos componentes
- [x] **OBRIGATÓRIO**: Connection string validation
- [x] **OBRIGATÓRIO**: Documentação de lifetimes e justificativas
- [x] **OBRIGATÓRIO**: Separação clara por camada
- [x] **OBRIGATÓRIO**: Uso de interfaces (não implementações concretas)

## Dependências

- **Depende de**:
  - 01_DOMAIN_MODEL.md (Interfaces)
  - 03_INFRASTRUCTURE_LAYER.md (Implementations)
  - 04_BUSINESS_LOGIC.md (ViewModels)
  - 05_APPLICATION_SERVICES.md (Services)
  - 06_API_LAYER.md (Controllers)
- **Necessário para**: 08_CONFIGURATION.md

## Rastreabilidade Completa

### Resumo de Componentes Registrados

| Camada | Tipo | Quantidade | Lifetime |
|--------|------|------------|----------|
| Infrastructure | IDbConnection | 1 | Scoped |
| Infrastructure | Repositories | 27 | Scoped |
| Infrastructure | EventRepository | 1 | Scoped |
| Application | Services | 3 | Scoped |
| Application | ViewModels | 9 | Scoped |
| **Total** | **Componentes** | **41** | **Scoped** |

### Status na Matriz

Atualizar `MATRIZ_RASTREABILIDADE.csv`:
- Status_Documentacao = COMPLETED para DI configuration
- Ref_Doc_Abordagem = 07_DEPENDENCY_INJECTION.md

