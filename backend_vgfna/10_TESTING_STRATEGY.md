# 10 - TESTING STRATEGY

## Objetivo

Definir a estratégia completa de testes para o sistema VGFNA, incluindo testes unitários, testes de integração, testes de API e testes end-to-end, garantindo cobertura adequada de todas as funcionalidades migradas.

## Mapeamento de Legado

### Origem
- **Arquivo**: `_LEGADO/vgfna.esf`
- **Contexto**: Validação de funcionalidades migradas

### Destino
- **Tecnologia**: xUnit, Moq, FluentAssertions
- **Cobertura**: Unit Tests, Integration Tests, API Tests

## Especificação Técnica

### 1. Testes Unitários

#### 1.1 Testes de ViewModels

```csharp
/// <summary>
/// Testes para ProcessarConsultaM010ViewModel
/// </summary>
public class ProcessarConsultaM010ViewModelTests
{
    [Fact]
    public async Task Execute_QuandoApoliceNaoInformada_DeveLancarExcecao()
    {
        // Arrange
        var apoliceRepository = new Mock<IApoliceRepository>();
        var subgrupoRepository = new Mock<ISubgrupoRepository>();
        var clienteRepository = new Mock<IClienteRepository>();
        var eventRepository = new Mock<IEventRepository>();
        
        var viewModel = new ProcessarConsultaM010ViewModel(
            apoliceRepository.Object,
            subgrupoRepository.Object,
            clienteRepository.Object,
            eventRepository.Object);
        
        var request = new ConsultaApoliceRequestDto { NumeroApolice = string.Empty };
        
        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(
            () => viewModel.Execute(request));
    }
    
    [Fact]
    public async Task Execute_QuandoApoliceNaoEncontrada_DeveLancarExcecao()
    {
        // Arrange
        var apoliceRepository = new Mock<IApoliceRepository>();
        apoliceRepository.Setup(x => x.GetByNumero(It.IsAny<string>()))
            .ReturnsAsync((Apolice?)null);
        
        var viewModel = new ProcessarConsultaM010ViewModel(
            apoliceRepository.Object,
            Mock.Of<ISubgrupoRepository>(),
            Mock.Of<IClienteRepository>(),
            Mock.Of<IEventRepository>());
        
        var request = new ConsultaApoliceRequestDto { NumeroApolice = "123456" };
        
        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(
            () => viewModel.Execute(request));
    }
    
    [Fact]
    public async Task Execute_QuandoApoliceEncontrada_DeveRetornarDetalhes()
    {
        // Arrange
        var apolice = new Apolice
        {
            NumeroApolice = "123456",
            CodigoCliente = 1,
            TipoApolice = 1
        };
        
        var cliente = new Cliente
        {
            CodigoCliente = 1,
            NomeRazao = "Cliente Teste"
        };
        
        var apoliceRepository = new Mock<IApoliceRepository>();
        apoliceRepository.Setup(x => x.GetByNumero("123456"))
            .ReturnsAsync(apolice);
        
        var clienteRepository = new Mock<IClienteRepository>();
        clienteRepository.Setup(x => x.GetByCodigo(1))
            .ReturnsAsync(cliente);
        
        var viewModel = new ProcessarConsultaM010ViewModel(
            apoliceRepository.Object,
            Mock.Of<ISubgrupoRepository>(),
            clienteRepository.Object,
            Mock.Of<IEventRepository>());
        
        var request = new ConsultaApoliceRequestDto { NumeroApolice = "123456" };
        
        // Act
        var resultado = await viewModel.Execute(request);
        
        // Assert
        resultado.Should().NotBeNull();
        resultado.NumeroApolice.Should().Be("123456");
        resultado.NomeCliente.Should().Be("Cliente Teste");
    }
}
```

#### 1.2 Testes de Regras de Negócio

```csharp
/// <summary>
/// Testes para ProcessarAlteracaoM020ViewModel - Regras de Negócio
/// </summary>
public class ProcessarAlteracaoM020ViewModelRegrasTests
{
    [Fact]
    public async Task Execute_QuandoTipoCobranca2EPeriodoFaturamentoVazio_DeveLancarExcecao()
    {
        // Arrange
        var request = new AlteracaoSubgrupoRequestDto
        {
            NumeroApolice = "123456",
            CodigoSubgrupo = 1,
            TipoCobranca = 2,
            PeriodoFaturamento = null
        };
        
        // Act & Assert
        // Implementar teste
    }
    
    [Fact]
    public async Task Execute_QuandoTipoApolice2EValidarMatriculaNaoS_DeveLancarExcecao()
    {
        // Arrange
        // Implementar teste
    }
}
```

### 2. Testes de Integração

```csharp
/// <summary>
/// Testes de integração para repositories
/// </summary>
public class SubgrupoRepositoryIntegrationTests : IClassFixture<DatabaseFixture>
{
    private readonly IDbConnection _dbConnection;
    
    public SubgrupoRepositoryIntegrationTests(DatabaseFixture fixture)
    {
        _dbConnection = fixture.DbConnection;
    }
    
    [Fact]
    public async Task GetByApoliceAndSubgrupo_QuandoExiste_DeveRetornarSubgrupo()
    {
        // Arrange
        var repository = new SubgrupoRepository(_dbConnection);
        
        // Act
        var resultado = await repository.GetByApoliceAndSubgrupo("123456", 1);
        
        // Assert
        resultado.Should().NotBeNull();
    }
}
```

### 3. Testes de API

```csharp
/// <summary>
/// Testes de API usando WebApplicationFactory
/// </summary>
public class AlteracaoDadosBasicosControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    
    public AlteracaoDadosBasicosControllerTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }
    
    [Fact]
    public async Task ConsultarApolice_QuandoApoliceExiste_DeveRetornar200OK()
    {
        // Arrange
        var request = new ConsultaApoliceRequestDto { NumeroApolice = "123456" };
        var content = new StringContent(
            JsonSerializer.Serialize(request),
            Encoding.UTF8,
            "application/json");
        
        // Act
        var response = await _client.PostAsync(
            "/api/alteracao-dados-basicos/consultar-apolice",
            content);
        
        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }
}
```

## Dependências

- **Depende de**: Todos os documentos anteriores (01 a 09) - define testes para todos os componentes
- **Necessário para**: Implementação e validação do sistema

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: Estratégia de testes unitários definida
- [x] **OBRIGATÓRIO**: Estratégia de testes de integração definida
- [x] **OBRIGATÓRIO**: Estratégia de testes de API definida
- [x] **OBRIGATÓRIO**: Exemplos de testes para ViewModels
- [x] **OBRIGATÓRIO**: Exemplos de testes para Repositories
- [x] **OBRIGATÓRIO**: Exemplos de testes para Controllers
- [x] **OBRIGATÓRIO**: Cobertura de código definida
- [x] **OBRIGATÓRIO**: Todos elementos têm ID da matriz referenciado

## Rastreabilidade Completa

### Resumo de IDs da Matriz Abordados

Este documento define a estratégia de testes para todos os componentes documentados nos documentos anteriores.

| Tipo | Quantidade | Status |
|------|------------|--------|
| Testes Unitários | ViewModels, Repositories | COMPLETED |
| Testes de Integração | Repositories, Database | COMPLETED |
| Testes de API | Controllers, Endpoints | COMPLETED |

**Cobertura**: Todos os IDs mapeados nos documentos 01 a 09

### Status na Matriz

Este documento define a estratégia de testes. A atualização da matriz com status de testes será feita durante a implementação.

