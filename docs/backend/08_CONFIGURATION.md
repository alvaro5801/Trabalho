# 08 - CONFIGURATION

## Objetivo

Documentar toda a configuração externa do sistema CB2QA através de appsettings.json, incluindo connection strings, configurações de ambiente, logging, e uso do Options Pattern para configurações fortemente tipadas.

## Mapeamento de Legado

### Origem
- **Context**: Parâmetros hardcoded no programa COBOL
- **Arquivo**: `_LEGADO/cb2qa.esf`
- **Configurações**: Dados de conexão DB2, IDs de sistema, versões

### Destino
- **Arquivo**: `appsettings.json` (base) + `appsettings.{Environment}.json`
- **Pattern**: Options Pattern com IOptions<T>
- **Segredos**: User Secrets (dev) + Azure Key Vault (prod)

## Especificação Técnica

### 1. appsettings.json (Base)

**Arquivo**: `Cb2qa.Web.AgTeste.Api/appsettings.json`

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=Cb2qaAgTeste;User Id=sa;Password=YourPassword123!;TrustServerCertificate=True;",
    "ReportingConnection": "Server=localhost;Database=Cb2qaAgTeste;User Id=report_user;Password=ReportPass123!;TrustServerCertificate=True;ApplicationIntent=ReadOnly;"
  },
  
  "ApplicationSettings": {
    "ApplicationName": "CB2QA - Consulta Movimento Débito Automático",
    "Version": "V.1.0",
    "IdSistema": "CB",
    "TimeoutSegundos": 300,
    "TamanhoPaginaPadrao": 10,
    "MaximoRegistrosConsulta": 500
  },
  
  "CorsSettings": {
    "AllowedOrigins": [
      "http://localhost:3000",
      "http://localhost:4200"
    ],
    "AllowCredentials": true
  },
  
  "Serilog": {
    "Using": [ "Serilog.Sinks.Console", "Serilog.Sinks.File" ],
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    },
    "WriteTo": [
      {
        "Name": "Console",
        "Args": {
          "outputTemplate": "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}"
        }
      },
      {
        "Name": "File",
        "Args": {
          "path": "logs/cb2qa-.log",
          "rollingInterval": "Day",
          "retainedFileCountLimit": 30,
          "outputTemplate": "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}"
        }
      }
    ],
    "Enrich": [ "FromLogContext", "WithMachineName", "WithThreadId" ]
  }
}
```

### 2. appsettings.Development.json

**Arquivo**: `Cb2qa.Web.AgTeste.Api/appsettings.Development.json`

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Information"
    }
  },
  
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=Cb2qaAgTeste_Dev;User Id=sa;Password=Dev123!;TrustServerCertificate=True;",
    "ReportingConnection": "Server=localhost;Database=Cb2qaAgTeste_Dev;User Id=sa;Password=Dev123!;TrustServerCertificate=True;"
  },
  
  "ApplicationSettings": {
    "Version": "V.1.0-DEV"
  },
  
  "Serilog": {
    "MinimumLevel": {
      "Default": "Debug"
    }
  }
}
```

### 3. appsettings.Production.json

**Arquivo**: `Cb2qa.Web.AgTeste.Api/appsettings.Production.json`

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Error"
    }
  },
  
  "ConnectionStrings": {
    "DefaultConnection": "Server=prod-sql-server.database.windows.net;Database=Cb2qaAgTeste;User Id=app_user;Password=${DB_PASSWORD};Encrypt=true;",
    "ReportingConnection": "Server=prod-sql-server-replica.database.windows.net;Database=Cb2qaAgTeste;Integrated Security=true;Encrypt=true;ApplicationIntent=ReadOnly;"
  },
  
  "ApplicationSettings": {
    "Version": "V.1.0",
    "TimeoutSegundos": 600
  },
  
  "CorsSettings": {
    "AllowedOrigins": [
      "https://app.producao.com.br"
    ]
  },
  
  "Serilog": {
    "MinimumLevel": {
      "Default": "Warning"
    },
    "WriteTo": [
      {
        "Name": "Console"
      },
      {
        "Name": "File",
        "Args": {
          "path": "/var/log/cb2qa/cb2qa-.log",
          "rollingInterval": "Day",
          "retainedFileCountLimit": 90
        }
      }
    ]
  }
}
```

### 4. Options Pattern Classes

#### 4.1 ApplicationSettings

**Arquivo**: `Cb2qa.Web.AgTeste.Domain/Configuration/ApplicationSettings.cs`

```csharp
namespace Cb2qa.Web.AgTeste.Domain.Configuration;

/// <summary>
/// Configurações gerais da aplicação
/// </summary>
public class ApplicationSettings
{
    public const string Section = "ApplicationSettings";
    
    public string ApplicationName { get; set; } = string.Empty;
    public string Version { get; set; } = string.Empty;
    public string IdSistema { get; set; } = "CB";
    public int TimeoutSegundos { get; set; } = 300;
    public int TamanhoPaginaPadrao { get; set; } = 10;
    public int MaximoRegistrosConsulta { get; set; } = 500;
}
```

#### 4.2 CorsSettings

```csharp
namespace Cb2qa.Web.AgTeste.Domain.Configuration;

/// <summary>
/// Configurações de CORS
/// </summary>
public class CorsSettings
{
    public const string Section = "CorsSettings";
    
    public List<string> AllowedOrigins { get; set; } = new();
    public bool AllowCredentials { get; set; } = true;
}
```

### 5. Registro no Program.cs

**Arquivo**: `Cb2qa.Web.AgTeste.Api/Program.cs`

```csharp
using Cb2qa.Web.AgTeste.Domain.Configuration;
using Cb2qa.Web.AgTeste.Ioc;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// === CONFIGURATION - Options Pattern ===

// ApplicationSettings
builder.Services.Configure<ApplicationSettings>(
    builder.Configuration.GetSection(ApplicationSettings.Section));
builder.Services.AddSingleton(resolver => 
    resolver.GetRequiredService<IOptions<ApplicationSettings>>().Value);

// CorsSettings
builder.Services.Configure<CorsSettings>(
    builder.Configuration.GetSection(CorsSettings.Section));

// === LOGGING - Serilog ===
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();

builder.Host.UseSerilog();

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// === CORS - Dinâmico via configuração ===
var corsSettings = builder.Configuration
    .GetSection(CorsSettings.Section)
    .Get<CorsSettings>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultCorsPolicy", policy =>
    {
        if (corsSettings?.AllowedOrigins.Any() == true)
        {
            policy.WithOrigins(corsSettings.AllowedOrigins.ToArray());
        }
        else
        {
            policy.SetIsOriginAllowed(origin => true);
        }
        
        policy.AllowAnyMethod()
              .AllowAnyHeader();
        
        if (corsSettings?.AllowCredentials == true)
        {
            policy.AllowCredentials();
        }
    });
});

// DI
builder.Services.AddApplicationAndInfraStructure(builder.Configuration);

// Health Checks
builder.Services.AddHealthChecks()
    .AddSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection") ?? string.Empty,
        name: "database",
        timeout: TimeSpan.FromSeconds(30));

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSerilogRequestLogging();
app.UseHttpsRedirection();
app.UseCors("DefaultCorsPolicy");
app.UseAuthorization();
app.MapHealthChecks("/health");
app.MapControllers();

try
{
    Log.Information("Starting CB2QA API");
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application start-up failed");
}
finally
{
    Log.CloseAndFlush();
}
```

### 6. Uso de Configurações em Classes

#### 6.1 Injeção via IOptions

```csharp
public class ConsultaMovimentoService(
    IProcessarConsultaM010ViewModel viewModel,
    IOptions<ApplicationSettings> appSettings)
{
    private readonly ApplicationSettings _settings = appSettings.Value;
    
    public async Task<AppResponse<ListagemResultadosResponse>> Consultar(ConsultaMovimentoRequest request)
    {
        // Usar configuração
        int tamanhoPagina = _settings.TamanhoPaginaPadrao;
        int maxRegistros = _settings.MaximoRegistrosConsulta;
        
        // Lógica...
    }
}
```

#### 6.2 Injeção Direta (Singleton)

```csharp
public class SomeService(ApplicationSettings settings)
{
    // Usar configuração diretamente
    private readonly int _timeout = settings.TimeoutSegundos;
}
```

### 7. User Secrets (Desenvolvimento)

**Inicializar User Secrets**:

```bash
cd Cb2qa.Web.AgTeste.Api
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost;Database=Cb2qaAgTeste_Dev;User Id=sa;Password=SecretDev123!;TrustServerCertificate=True;"
```

**Listar segredos**:

```bash
dotnet user-secrets list
```

### 8. Environment Variables (Produção)

**Configurar via Environment Variables** (sobrescreve appsettings):

```bash
# Bash/Linux
export ConnectionStrings__DefaultConnection="Server=prod-server;..."
export ApplicationSettings__Version="V.1.0-PROD"

# PowerShell
$env:ConnectionStrings__DefaultConnection="Server=prod-server;..."
$env:ApplicationSettings__Version="V.1.0-PROD"

# Docker
docker run -e ConnectionStrings__DefaultConnection="..." cb2qa-api
```

## Hierarquia de Configuração

Ordem de prioridade (último sobrescreve primeiro):

1. `appsettings.json` (base)
2. `appsettings.{Environment}.json` (específico do ambiente)
3. User Secrets (apenas Development)
4. Environment Variables
5. Command-line arguments

## Segurança

### Não Commitar

❌ **NUNCA** commitar ao Git:
- Passwords em appsettings.json
- Connection strings reais
- API Keys
- Certificados

### Usar

✅ **SEMPRE** usar:
- User Secrets (desenvolvimento)
- Environment Variables (produção)
- Azure Key Vault (produção cloud)
- Placeholders em appsettings.json commitados

### Exemplo Seguro

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=${DB_SERVER};Database=${DB_NAME};User Id=${DB_USER};Password=${DB_PASSWORD};"
  }
}
```

## Dependências

- **Depende de**: 07_DEPENDENCY_INJECTION.md
- **Necessário para**: 09_USE_CASES_FLOWS.md

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: appsettings.json base configurado
- [x] **OBRIGATÓRIO**: appsettings.Development.json
- [x] **OBRIGATÓRIO**: appsettings.Production.json
- [x] **OBRIGATÓRIO**: Connection strings para todos ambientes
- [x] **OBRIGATÓRIO**: Options Pattern classes definidas
- [x] **OBRIGATÓRIO**: Serilog configurado
- [x] **OBRIGATÓRIO**: CORS configurável via appsettings
- [x] **OBRIGATÓRIO**: User Secrets para desenvolvimento
- [x] **OBRIGATÓRIO**: Environment Variables para produção
- [x] **OBRIGATÓRIO**: ApplicationSettings com valores padrão
- [x] **OBRIGATÓRIO**: Nenhum segredo commitado no Git

## Rastreabilidade Completa

### Configurações Mapeadas do Legado

| Configuração Legado | Configuração Moderna | Seção |
|---------------------|----------------------|-------|
| IDSISTEM='CB' | ApplicationSettings.IdSistema | ApplicationSettings |
| WS-VERSAO='V.49' | ApplicationSettings.Version | ApplicationSettings |
| Connection DB2 | ConnectionStrings.DefaultConnection | ConnectionStrings |
| Timeout queries | ApplicationSettings.TimeoutSegundos | ApplicationSettings |
| Paginação (10 registros) | ApplicationSettings.TamanhoPaginaPadrao | ApplicationSettings |
| Limite array (500) | ApplicationSettings.MaximoRegistrosConsulta | ApplicationSettings |

### Status na Matriz

Atualizar `MATRIZ_RASTREABILIDADE.csv`:
- Status_Documentacao = COMPLETED para configurações
- Ref_Doc_Abordagem = 08_CONFIGURATION.md

