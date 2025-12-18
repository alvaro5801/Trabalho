# 07 - DEPENDENCY INJECTION

## Objetivo

Definir a configuração completa de Dependency Injection (DI) para o sistema VGFNA, mapeando todas as interfaces e implementações das camadas Domain, Infrastructure, Application e API.

## Mapeamento de Legado

### Origem
- **Arquivo**: `_LEGADO/vgfna.esf`
- **Contexto**: Configuração de dependências entre componentes

### Destino
- **Camada**: Infrastructure/API
- **Namespace Base**: `Vgfna.Web.AgTeste.Infra.Configuration`
- **Tecnologia**: Microsoft.Extensions.DependencyInjection

## Especificação Técnica

### 1. Configuração de DI

#### 1.1 Extension Methods para Registro de Serviços

```csharp
/// <summary>
/// Extensions para configuração de Dependency Injection
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Registra todos os serviços do sistema VGFNA
    /// </summary>
    public static IServiceCollection AddVgfnaServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Repositories
        services.AddVgfnaRepositories(configuration);
        
        // ViewModels
        services.AddVgfnaViewModels();
        
        // Services
        services.AddVgfnaApplicationServices();
        
        return services;
    }
    
    /// <summary>
    /// Registra todos os repositories
    /// </summary>
    private static IServiceCollection AddVgfnaRepositories(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Configuração de conexão com banco de dados
        var connectionString = configuration.GetConnectionString("VgfnaAgTeste");
        services.AddScoped<IDbConnection>(_ => new SqlConnection(connectionString));
        
        // Repositories
        services.AddScoped<ISistemaRepository, SistemaRepository>();
        services.AddScoped<IApoliceRepository, ApoliceRepository>();
        services.AddScoped<ISubgrupoRepository, SubgrupoRepository>();
        services.AddScoped<ITermoAdesaoRepository, TermoAdesaoRepository>();
        services.AddScoped<IClienteRepository, ClienteRepository>();
        services.AddScoped<IEnderecoRepository, EnderecoRepository>();
        services.AddScoped<IAgenciaBancariaRepository, AgenciaBancariaRepository>();
        services.AddScoped<IFonteProdutoraRepository, FonteProdutoraRepository>();
        services.AddScoped<IDominioRepository, DominioRepository>();
        services.AddScoped<IEventRepository, EventRepository>();
        
        return services;
    }
    
    /// <summary>
    /// Registra todos os ViewModels
    /// </summary>
    private static IServiceCollection AddVgfnaViewModels(this IServiceCollection services)
    {
        services.AddScoped<IProcessarConsultaM010ViewModel, ProcessarConsultaM010ViewModel>();
        services.AddScoped<IProcessarAlteracaoM020ViewModel, ProcessarAlteracaoM020ViewModel>();
        services.AddScoped<IProcessarAlteracaoM030ViewModel, ProcessarAlteracaoM030ViewModel>();
        
        return services;
    }
    
    /// <summary>
    /// Registra todos os Application Services
    /// </summary>
    private static IServiceCollection AddVgfnaApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IAlteracaoDadosBasicosService, AlteracaoDadosBasicosService>();
        
        return services;
    }
}
```

### 2. Configuração no Program.cs

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar VGFNA Services
builder.Services.AddVgfnaServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

## Dependências

- **Depende de**: Todos os documentos anteriores (01 a 06) - configura DI de todos os componentes
- **Necessário para**: 08_CONFIGURATION.md (usa connection strings)

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: ServiceCollectionExtensions implementado
- [x] **OBRIGATÓRIO**: DI configurado no Program.cs
- [x] **OBRIGATÓRIO**: Connection string configurada
- [x] **OBRIGATÓRIO**: Todas as dependências registradas (Repositories, ViewModels, Services)
- [x] **OBRIGATÓRIO**: Validação de dependências circular

## Rastreabilidade Completa

### Resumo de IDs da Matriz Abordados

Este documento não mapeia IDs específicos da matriz, mas configura a injeção de dependências para todos os componentes documentados nos documentos anteriores.

### Status na Matriz

Não aplicável - este é um documento de configuração técnica.

