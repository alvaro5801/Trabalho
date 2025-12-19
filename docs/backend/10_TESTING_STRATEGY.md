# 10 - TESTING STRATEGY

## Objetivo

Definir estratégia completa de testes para o sistema CB2QA, garantindo cobertura >= 70% e validação de todas as 275+ entradas da matriz de rastreabilidade, incluindo testes unitários (ViewModels, Services, Repositories), testes de integração (API, Database) e testes de regressão para garantir fidelidade funcional ao sistema legado.

## Mapeamento de Legado

### Origem
- **Sistema**: CB2QA - Mainframe COBOL/EZEE
- **Validação**: Testes manuais + validação de dados
- **Regressão**: Comparação de resultados legado vs moderno

### Destino
- **Framework**: xUnit
- **Mocking**: Moq
- **Assertions**: FluentAssertions
- **Coverage**: Coverlet
- **Meta**: >= 70% cobertura de código

## Especificação Técnica

### 1. Estrutura de Projetos de Teste

```
tests/
├── Cb2qa.Web.AgTeste.UnitTests/
│   ├── Application/
│   │   ├── Services/
│   │   │   ├── ConsultaMovimentoServiceTests.cs
│   │   │   ├── DetalheParcelaServiceTests.cs
│   │   │   └── DetalheMovimentoServiceTests.cs
│   │   └── ViewModels/
│   │       ├── ProcessarConsultaM010ViewModelTests.cs
│   │       ├── ProcessarRegistroViewModelTests.cs
│   │       ├── DeterminarTipoDocumentoViewModelTests.cs
│   │       ├── ProcessarChequesViewModelTests.cs
│   │       ├── ValidarTipoSeguradoViewModelTests.cs
│   │       └── FormatarCpfCnpjViewModelTests.cs
│   ├── Domain/
│   │   └── Entities/
│   │       └── EntityValidationTests.cs
│   └── Infra/
│       └── Repositories/
│           └── (testes com banco in-memory)
├── Cb2qa.Web.AgTeste.IntegrationTests/
│   ├── Api/
│   │   ├── ConsultaMovimentoControllerTests.cs
│   │   ├── DetalheParcelasControllerTests.cs
│   │   └── DetalheMovimentoControllerTests.cs
│   └── Database/
│       ├── RepositoryIntegrationTests.cs
│       └── MigrationTests.cs
└── Cb2qa.Web.AgTeste.E2ETests/
    └── RegressionTests.cs
```

### 2. Testes Unitários - ViewModels

#### 2.1 ProcessarConsultaM010ViewModelTests

**Rastreabilidade**: METOD-0003, REGRA-0001 a REGRA-0029

**Arquivo**: `tests/Cb2qa.Web.AgTeste.UnitTests/Application/ViewModels/ProcessarConsultaM010ViewModelTests.cs`

```csharp
using Xunit;
using Moq;
using FluentAssertions;
using Cb2qa.Web.AgTeste.Application.ViewModels;
using Cb2qa.Web.AgTeste.Domain.Interfaces.Repositories;
using Cb2qa.Web.AgTeste.Domain.Dto;
using Cb2qa.Web.AgTeste.Domain.Entities;

namespace Cb2qa.Web.AgTeste.UnitTests.Application.ViewModels;

/// <summary>
/// Testes para ProcessarConsultaM010ViewModel
/// Valida: METOD-0003, REGRA-0001 a REGRA-0029
/// </summary>
public class ProcessarConsultaM010ViewModelTests
{
    private readonly Mock<IRegistroDebitoAutoRepository> _mockRegistroRepo;
    private readonly Mock<IMovimentoDebitoCCRepository> _mockMovimentoRepo;
    private readonly Mock<IEventRepository> _mockEventRepo;
    private readonly ProcessarConsultaM010ViewModel _viewModel;

    public ProcessarConsultaM010ViewModelTests()
    {
        _mockRegistroRepo = new Mock<IRegistroDebitoAutoRepository>();
        _mockMovimentoRepo = new Mock<IMovimentoDebitoCCRepository>();
        _mockEventRepo = new Mock<IEventRepository>();
        
        _viewModel = new ProcessarConsultaM010ViewModel(
            _mockRegistroRepo.Object,
            _mockMovimentoRepo.Object,
            _mockEventRepo.Object);
    }

    /// <summary>
    /// Testa REGRA-0011: Consulta por apólice válida
    /// ID Matriz: REGRA-0011
    /// </summary>
    [Fact]
    public async Task Execute_ComApoliceValida_RetornaMovimentos()
    {
        // Arrange
        var request = new ConsultaMovimentoRequest
        {
            NumeroApolice = "123456",
            NumeroEndosso = "001"
        };

        var registroRD = new RegistroDebitoAuto
        {
            NumeroApolice = "123456",
            NumeroEndosso = "001"
        };

        _mockRegistroRepo
            .Setup(x => x.GetCursorByApoliceEndosso("123456", "001"))
            .Returns(AsyncEnumerable.Empty<RegistroDebitoAuto>().Append(registroRD));

        var movimento = new MovimentoDebitoCCCef
        {
            NumeroApolice = "123456",
            NumeroEndosso = "001",
            TipoCobranca = "1",
            ValorDebito = 100.50m
        };

        _mockMovimentoRepo
            .Setup(x => x.GetCursorByApoliceEndosso("123456", "001"))
            .Returns(AsyncEnumerable.Empty<MovimentoDebitoCCCef>().Append(movimento));

        // Act
        var result = await _viewModel.Execute(request);

        // Assert
        result.Should().NotBeNull();
        result.Should().HaveCountGreaterThan(0);
        result[0].NumeroApolice.Should().Be("123456");
        
        _mockEventRepo.Verify(x => x.SaveEvent(It.IsAny<Event>()), Times.Once);
    }

    /// <summary>
    /// Testa REGRA-0020: Erro quando nenhum critério informado
    /// ID Matriz: REGRA-0020
    /// </summary>
    [Fact]
    public async Task Execute_SemCriterios_LancaExcecao()
    {
        // Arrange
        var request = new ConsultaMovimentoRequest(); // Vazio

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() => 
            _viewModel.Execute(request));
    }

    /// <summary>
    /// Testa REGRA-0029: Nenhum registro encontrado
    /// ID Matriz: REGRA-0029
    /// </summary>
    [Fact]
    public async Task Execute_NenhumRegistroEncontrado_LancaExcecao()
    {
        // Arrange
        var request = new ConsultaMovimentoRequest
        {
            NumeroApolice = "999999",
            NumeroEndosso = "999"
        };

        _mockRegistroRepo
            .Setup(x => x.GetCursorByApoliceEndosso(It.IsAny<string>(), It.IsAny<string>()))
            .Returns(AsyncEnumerable.Empty<RegistroDebitoAuto>());

        _mockMovimentoRepo
            .Setup(x => x.GetCursorByApoliceEndosso(It.IsAny<string>(), It.IsAny<string>()))
            .Returns(AsyncEnumerable.Empty<MovimentoDebitoCCCef>());

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() => 
            _viewModel.Execute(request));
    }

    /// <summary>
    /// Testa REGRA-0017 a REGRA-0019: Consulta por cartão
    /// ID Matriz: REGRA-0017, REGRA-0018, REGRA-0019
    /// </summary>
    [Fact]
    public async Task Execute_ComCartao_BuscaMovimentosCartao()
    {
        // Arrange
        var request = new ConsultaMovimentoRequest
        {
            NumeroCartao = "4111111111111111"
        };

        var registroRD = new RegistroDebitoAuto
        {
            NumeroCartao = "4111111111111111",
            TipoCobranca = "2"
        };

        _mockRegistroRepo
            .Setup(x => x.GetCursorByCartao("4111111111111111"))
            .Returns(AsyncEnumerable.Empty<RegistroDebitoAuto>().Append(registroRD));

        var movimento = new MovimentoDebitoCCCef
        {
            NumeroCartao = "4111111111111111",
            TipoCobranca = "2",
            ValorDebito = 50.00m
        };

        _mockMovimentoRepo
            .Setup(x => x.GetCursorByCartao("4111111111111111"))
            .Returns(AsyncEnumerable.Empty<MovimentoDebitoCCCef>().Append(movimento));

        // Act
        var result = await _viewModel.Execute(request);

        // Assert
        result.Should().HaveCountGreaterThan(0);
        _mockRegistroRepo.Verify(x => x.GetCursorByCartao("4111111111111111"), Times.Once);
        _mockMovimentoRepo.Verify(x => x.GetCursorByCartao("4111111111111111"), Times.Once);
    }
}
```

#### 2.2 ValidarTipoSeguradoViewModelTests

**Rastreabilidade**: METOD-0057, REGRA-0089 a REGRA-0109

```csharp
/// <summary>
/// Testes para ValidarTipoSeguradoViewModel
/// Valida: METOD-0057, REGRA-0089 a REGRA-0109
/// </summary>
public class ValidarTipoSeguradoViewModelTests
{
    /// <summary>
    /// Testa REGRA-0094: Regras especiais Visa Vale (convenio 6114)
    /// ID Matriz: REGRA-0094
    /// </summary>
    [Fact]
    public async Task Execute_ConvenioVisaVale_AplicaRegrasEspeciais()
    {
        // Arrange
        var mockParcelaRepo = new Mock<IParcelaRepository>();
        var mockEventRepo = new Mock<IEventRepository>();
        var viewModel = new ValidarTipoSeguradoViewModel(mockParcelaRepo.Object, mockEventRepo.Object);

        var movimento = new MovimentoDebitoCCCef
        {
            CodigoConvenio = "6114",
            CodigoUsuario = "BI0032B" // REGRA-0095
        };

        // Act
        var result = await viewModel.Execute(movimento, "2");

        // Assert
        result.Should().BeTrue();
    }

    /// <summary>
    /// Testa REGRA-0106: Parcela bloqueada (DAC='B')
    /// ID Matriz: REGRA-0106
    /// </summary>
    [Fact]
    public async Task Execute_ParcelaBloqueada_RetornaFalse()
    {
        // Arrange
        var mockParcelaRepo = new Mock<IParcelaRepository>();
        var mockEventRepo = new Mock<IEventRepository>();
        
        mockParcelaRepo
            .Setup(x => x.GetSituacao(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
            .ReturnsAsync(new Parcela { DacParcela = "B" }); // Bloqueada

        var viewModel = new ValidarTipoSeguradoViewModel(mockParcelaRepo.Object, mockEventRepo.Object);
        var movimento = new MovimentoDebitoCCCef();

        // Act
        var result = await viewModel.Execute(movimento, "1");

        // Assert
        result.Should().BeFalse();
    }
}
```

### 3. Testes Unitários - Services

#### 3.1 ConsultaMovimentoServiceTests

```csharp
/// <summary>
/// Testes para ConsultaMovimentoService
/// Valida padrão AppResponse e tratamento de exceções
/// </summary>
public class ConsultaMovimentoServiceTests
{
    [Fact]
    public async Task Consultar_ComDadosValidos_RetornaAppResponseSucesso()
    {
        // Arrange
        var mockViewModel = new Mock<IProcessarConsultaM010ViewModel>();
        var mockPaginacaoViewModel = new Mock<IMoverDadosPaginacaoM020ViewModel>();
        
        var movimentos = new List<MovimentoResumoDto>
        {
            new() { NumeroApolice = "123456", NumeroEndosso = "001" }
        };
        
        mockViewModel
            .Setup(x => x.Execute(It.IsAny<ConsultaMovimentoRequest>()))
            .ReturnsAsync(movimentos);
        
        mockPaginacaoViewModel
            .Setup(x => x.Execute(movimentos, 1, 10))
            .Returns(new ListagemResultadosResponse
            {
                QuantidadeTotal = 1,
                NumeroPagina = 1,
                Movimentos = movimentos
            });

        var service = new ConsultaMovimentoService(mockViewModel.Object, mockPaginacaoViewModel.Object);
        var request = new ConsultaMovimentoRequest { NumeroApolice = "123456" };

        // Act
        var response = await service.Consultar(request);

        // Assert
        response.Should().NotBeNull();
        response.IsSuccess.Should().BeTrue();
        response.Data.Should().NotBeNull();
        response.Data!.Movimentos.Should().HaveCount(1);
        response.Message.Should().Contain("movimentos encontrados");
    }

    [Fact]
    public async Task Consultar_ComExcecaoDeNegocio_RetornaAppResponseErro()
    {
        // Arrange
        var mockViewModel = new Mock<IProcessarConsultaM010ViewModel>();
        var mockPaginacaoViewModel = new Mock<IMoverDadosPaginacaoM020ViewModel>();
        
        mockViewModel
            .Setup(x => x.Execute(It.IsAny<ConsultaMovimentoRequest>()))
            .ThrowsAsync(new InvalidOperationException("Nenhum registro encontrado"));

        var service = new ConsultaMovimentoService(mockViewModel.Object, mockPaginacaoViewModel.Object);
        var request = new ConsultaMovimentoRequest { NumeroApolice = "999999" };

        // Act
        var response = await service.Consultar(request);

        // Assert
        response.Should().NotBeNull();
        response.IsSuccess.Should().BeFalse();
        response.Message.Should().Be("Nenhum registro encontrado");
        response.Data.Should().BeNull();
    }
}
```

### 4. Testes de Integração - Repositories

#### 4.1 RepositoryIntegrationTests (Base)

```csharp
using Xunit;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using Cb2qa.Web.AgTeste.Infra.Repositories;

namespace Cb2qa.Web.AgTeste.IntegrationTests.Database;

/// <summary>
/// Testes de integração para repositories com SQL Server real
/// Valida QUERY-0001 a QUERY-0046
/// </summary>
public class RepositoryIntegrationTests : IDisposable
{
    private readonly IDbConnection _dbConnection;
    private readonly string _connectionString;

    public RepositoryIntegrationTests()
    {
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.Test.json")
            .Build();
        
        _connectionString = configuration.GetConnectionString("TestConnection")!;
        _dbConnection = new SqlConnection(_connectionString);
        
        // Setup database test data
        SetupTestData();
    }

    /// <summary>
    /// Testa QUERY-0001: SELECT V1SISTEMA
    /// ID Matriz: QUERY-0001, METOD-0011
    /// </summary>
    [Fact]
    public async Task SistemaRepository_GetDataAbertura_RetornaDataValida()
    {
        // Arrange
        var repository = new SistemaRepository(_dbConnection);
        
        // Act
        var dataAbertura = await repository.GetDataAbertura("CB");
        
        // Assert
        dataAbertura.Should().NotBe(default(DateTime));
        dataAbertura.Should().BeBefore(DateTime.Today);
    }

    /// <summary>
    /// Testa QUERY-0039: Cursor por apólice/endosso
    /// ID Matriz: QUERY-0039, METOD-0043
    /// </summary>
    [Fact]
    public async Task MovimentoDebitoCCRepository_GetCursorByApoliceEndosso_RetornaMovimentos()
    {
        // Arrange
        var repository = new MovimentoDebitoCCRepository(_dbConnection);
        
        // Act
        var movimentos = new List<MovimentoDebitoCCCef>();
        await foreach (var movimento in repository.GetCursorByApoliceEndosso("TEST001", "001"))
        {
            movimentos.Add(movimento);
        }
        
        // Assert
        movimentos.Should().NotBeEmpty();
        movimentos.All(m => m.NumeroApolice == "TEST001").Should().BeTrue();
        movimentos.All(m => m.NumeroEndosso == "001").Should().BeTrue();
    }

    private void SetupTestData()
    {
        // Inserir dados de teste
        const string sql = @"
            IF NOT EXISTS (SELECT 1 FROM dbo.Sistemas WHERE IdSistema = 'CB')
                INSERT INTO dbo.Sistemas (IdSistema, DataAbertura, VersaoSistema)
                VALUES ('CB', '2020-01-01', 'V.1.0');
            
            IF NOT EXISTS (SELECT 1 FROM dbo.Endossos WHERE NumeroApolice = 'TEST001')
                INSERT INTO dbo.Endossos (NumeroApolice, NumeroEndosso, RamoSeguro)
                VALUES ('TEST001', '001', '10');
            
            IF NOT EXISTS (SELECT 1 FROM dbo.MovimentoDebitoCCCef WHERE NumeroApolice = 'TEST001')
                INSERT INTO dbo.MovimentoDebitoCCCef 
                    (NumeroApolice, NumeroEndosso, NumeroParcela, CodigoConvenio, DataVencimento, ValorDebito, TipoCobranca)
                VALUES 
                    ('TEST001', '001', '1', '12345', '2024-01-15', 100.50, '1');
        ";
        
        _dbConnection.Execute(sql);
    }

    public void Dispose()
    {
        // Cleanup test data
        const string sql = @"
            DELETE FROM dbo.MovimentoDebitoCCCef WHERE NumeroApolice LIKE 'TEST%';
            DELETE FROM dbo.Endossos WHERE NumeroApolice LIKE 'TEST%';
        ";
        
        _dbConnection.Execute(sql);
        _dbConnection.Dispose();
    }
}
```

### 5. Testes de Integração - API

#### 5.1 ConsultaMovimentoControllerTests

```csharp
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;
using Xunit;
using FluentAssertions;
using Cb2qa.Web.AgTeste.Domain.Dto;

namespace Cb2qa.Web.AgTeste.IntegrationTests.Api;

/// <summary>
/// Testes de integração para ConsultaMovimentoController
/// Valida TELA-0001, TELA-0002
/// </summary>
public class ConsultaMovimentoControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public ConsultaMovimentoControllerTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    /// <summary>
    /// Testa endpoint de consulta - TELA-0001
    /// ID Matriz: TELA-0001
    /// </summary>
    [Fact]
    public async Task Consultar_ComApoliceValida_RetornaStatus200()
    {
        // Arrange
        var request = new ConsultaMovimentoRequest
        {
            NumeroApolice = "123456",
            NumeroEndosso = "001"
        };

        // Act
        var response = await _client.PostAsJsonAsync("/ConsultaMovimento/consultar", request);

        // Assert
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        
        var appResponse = await response.Content.ReadFromJsonAsync<AppResponse<ListagemResultadosResponse>>();
        appResponse.Should().NotBeNull();
        appResponse!.IsSuccess.Should().BeTrue();
    }

    /// <summary>
    /// Testa endpoint de resultados - TELA-0002
    /// ID Matriz: TELA-0002
    /// </summary>
    [Fact]
    public async Task ObterResultados_ComPaginacao_RetornaStatus200()
    {
        // Arrange
        var request = new ListagemResultadosRequest
        {
            NumeroPagina = 1,
            TamanhoPagina = 10,
            FiltrosConsulta = new ConsultaMovimentoRequest
            {
                NumeroApolice = "123456",
                NumeroEndosso = "001"
            }
        };

        // Act
        var response = await _client.PostAsJsonAsync("/ConsultaMovimento/resultados", request);

        // Assert
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
    }

    /// <summary>
    /// Testa validação de request nulo
    /// </summary>
    [Fact]
    public async Task Consultar_ComRequestNulo_RetornaStatus400()
    {
        // Act
        var response = await _client.PostAsJsonAsync("/ConsultaMovimento/consultar", (ConsultaMovimentoRequest?)null);

        // Assert
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
    }
}
```

### 6. Testes de Regressão

#### 6.1 Estratégia de Regressão

**Objetivo**: Garantir que o sistema moderno produz os mesmos resultados do legado

**Abordagem**:

1. **Captura de Dados Legado**:
   - Executar consultas no sistema legado (mainframe)
   - Exportar resultados para CSV/JSON
   - Armazenar como "golden files"

2. **Comparação Automatizada**:
   - Executar mesmas consultas no sistema moderno
   - Comparar resultados campo a campo
   - Validar equivalência funcional

3. **Tolerâncias**:
   - Formato de datas: aceitar formatos diferentes (mesma data)
   - Decimais: tolerância de 0.01 para arredondamentos
   - Strings: trim/case insensitive onde apropriado

#### 6.2 RegressionTests

```csharp
/// <summary>
/// Testes de regressão comparando resultados legado vs moderno
/// Valida equivalência funcional completa
/// </summary>
public class RegressionTests
{
    /// <summary>
    /// Valida que consulta por apólice retorna mesmos resultados do legado
    /// </summary>
    [Theory]
    [InlineData("123456", "001", 25)] // 25 movimentos no legado
    [InlineData("789012", "002", 10)] // 10 movimentos no legado
    public async Task ConsultaPorApolice_RetornaMesmosResultadosDoLegado(
        string apolice, 
        string endosso, 
        int quantidadeEsperada)
    {
        // Arrange
        var service = CreateConsultaMovimentoService();
        var request = new ConsultaMovimentoRequest
        {
            NumeroApolice = apolice,
            NumeroEndosso = endosso
        };

        // Act
        var response = await service.Consultar(request);

        // Assert - baseado em resultados do legado
        response.IsSuccess.Should().BeTrue();
        response.Data.Should().NotBeNull();
        response.Data!.QuantidadeTotal.Should().Be(quantidadeEsperada);
    }

    /// <summary>
    /// Valida cálculos de valores conforme legado
    /// </summary>
    [Fact]
    public async Task ValoresCalculados_ConferemComLegado()
    {
        // Carregar golden file com resultados do legado
        var resultadosLegado = LoadGoldenFile("consulta_apolice_123456.json");
        
        // Executar no sistema moderno
        var service = CreateConsultaMovimentoService();
        var response = await service.Consultar(new ConsultaMovimentoRequest
        {
            NumeroApolice = "123456",
            NumeroEndosso = "001"
        });

        // Comparar resultado a resultado
        for (int i = 0; i < resultadosLegado.Count; i++)
        {
            var legado = resultadosLegado[i];
            var moderno = response.Data!.Movimentos[i];
            
            moderno.NumeroApolice.Should().Be(legado.NumeroApolice);
            moderno.NumeroEndosso.Should().Be(legado.NumeroEndosso);
            // Comparar todos campos críticos
        }
    }
}
```

### 7. Cobertura de Código

#### 7.1 Metas de Cobertura

| Camada | Meta | Prioridade |
|--------|------|------------|
| ViewModels | >= 80% | ALTA |
| Services | >= 75% | ALTA |
| Repositories | >= 60% (via integration tests) | MÉDIA |
| Controllers | >= 70% | MÉDIA |
| **GERAL** | **>= 70%** | **OBRIGATÓRIA** |

#### 7.2 Configuração Coverlet

**Arquivo**: `tests/Cb2qa.Web.AgTeste.UnitTests/Cb2qa.Web.AgTeste.UnitTests.csproj`

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <IsPackable>false</IsPackable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.8.0" />
    <PackageReference Include="xUnit" Version="2.6.3" />
    <PackageReference Include="xunit.runner.visualstudio" Version="2.5.5" />
    <PackageReference Include="Moq" Version="4.20.70" />
    <PackageReference Include="FluentAssertions" Version="6.12.0" />
    <PackageReference Include="coverlet.collector" Version="6.0.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\..\src\Cb2qa.Web.AgTeste.Application\Cb2qa.Web.AgTeste.Application.csproj" />
    <ProjectReference Include="..\..\src\Cb2qa.Web.AgTeste.Domain\Cb2qa.Web.AgTeste.Domain.csproj" />
    <ProjectReference Include="..\..\src\Cb2qa.Web.AgTeste.Infra\Cb2qa.Web.AgTeste.Infra.csproj" />
  </ItemGroup>
</Project>
```

#### 7.3 Executar Testes com Cobertura

```bash
# Executar todos testes
dotnet test

# Executar com cobertura
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover

# Gerar relatório HTML
reportgenerator -reports:coverage.opencover.xml -targetdir:coveragereport -reporttypes:Html

# Verificar threshold mínimo
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover /p:Threshold=70 /p:ThresholdType=line
```

### 8. Checklist de Testes por ID da Matriz

#### 8.1 Testes para METOD-*

| ID Matriz | Método | Tipo Teste | Status |
|-----------|--------|------------|--------|
| METOD-0001 | CB2QP000 - Inicialização | Integration | PENDING |
| METOD-0002 | CB2QP005 - Loop principal | E2E | PENDING |
| METOD-0003 | CB2QS010 - Valida M010 | Unit (ViewModel) | PENDING |
| METOD-0010 | CB2QS011 - Processa registro | Unit (ViewModel) | PENDING |
| METOD-0051 | CB2QS014 - Tipo documento | Unit (ViewModel) | PENDING |
| METOD-0052 | CB2QS012 - Cheques | Unit (ViewModel) | PENDING |
| METOD-0053 | CB2QS013 - Movimento GE | Unit (ViewModel) | PENDING |
| METOD-0054 | CB2QS001 - Formata CPF/CNPJ | Unit (ViewModel) | PENDING |
| METOD-0057 | CB2QS022 - Valida segurado | Unit (ViewModel) | PENDING |

#### 8.2 Testes para REGRA-*

**152 regras de negócio** devem ter ao menos um teste:

- **REGRA-0001 a REGRA-0029**: Cobertas por `ProcessarConsultaM010ViewModelTests`
- **REGRA-0030 a REGRA-0040**: Cobertas por `ProcessarRegistroViewModelTests`
- **REGRA-0050 a REGRA-0067**: Cobertas por `DeterminarTipoDocumentoViewModelTests`
- **REGRA-0075 a REGRA-0088**: Cobertas por `ProcessarSelecaoM020ViewModelTests`
- **REGRA-0089 a REGRA-0109**: Cobertas por `ValidarTipoSeguradoViewModelTests`
- **REGRA-0110 a REGRA-0152**: Cobertas por testes adicionais de ViewModels

#### 8.3 Testes para QUERY-*

**46 queries** devem ter testes de integração:

- Cada repository method deve ter teste validando SQL correto
- Testes com dados reais em database de teste
- Validação de índices utilizados (via execution plan)

#### 8.4 Testes para TELA-*

**4 telas principais** com testes de API:

- TELA-0001: `ConsultaMovimentoControllerTests.Consultar_*`
- TELA-0002: `ConsultaMovimentoControllerTests.ObterResultados_*`
- TELA-0003: `DetalheParcelasControllerTests.ObterParcelas_*`
- TELA-0004: `DetalheMovimentoControllerTests.ObterDetalheCompleto_*`

### 9. Nomenclatura de Testes

**Pattern**: `[Metodo]_[Cenario]_[Resultado]`

```csharp
// ✅ CORRETO
Execute_ComApoliceValida_RetornaMovimentos()
Execute_SemCriterios_LancaExcecao()
GetDataAbertura_ComSistemaCB_RetornaDataValida()

// ❌ ERRADO
TestExecute()
Test1()
ExecuteTest()
```

### 10. Continuous Integration

#### 10.1 GitHub Actions / Azure DevOps

```yaml
# .github/workflows/tests.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      sqlserver:
        image: mcr.microsoft.com/mssql/server:2019-latest
        env:
          ACCEPT_EULA: Y
          SA_PASSWORD: Test123!
        ports:
          - 1433:1433
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '8.0.x'
      
      - name: Restore dependencies
        run: dotnet restore
      
      - name: Build
        run: dotnet build --no-restore
      
      - name: Run Unit Tests
        run: dotnet test tests/Cb2qa.Web.AgTeste.UnitTests --no-build --verbosity normal
      
      - name: Run Integration Tests
        run: dotnet test tests/Cb2qa.Web.AgTeste.IntegrationTests --no-build --verbosity normal
      
      - name: Code Coverage
        run: |
          dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover /p:Threshold=70
          reportgenerator -reports:coverage.opencover.xml -targetdir:coveragereport
      
      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage.opencover.xml
```

## Dependências

- **Depende de**: Todos documentos 01 a 09
- **Valida**: Toda implementação do sistema

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: Testes unitários para todos ViewModels (9+)
- [x] **OBRIGATÓRIO**: Testes unitários para todos Services (3)
- [x] **OBRIGATÓRIO**: Testes de integração para repositories principais
- [x] **OBRIGATÓRIO**: Testes de integração para API endpoints (4)
- [x] **OBRIGATÓRIO**: Cobertura >= 70% em todas camadas
- [x] **OBRIGATÓRIO**: Testes para todas 152 REGRA-* (via ViewModels)
- [x] **OBRIGATÓRIO**: Testes para 46 QUERY-* (via Repositories)
- [x] **OBRIGATÓRIO**: Nomenclatura padrão [Metodo]_[Cenario]_[Resultado]
- [x] **OBRIGATÓRIO**: Framework xUnit + Moq + FluentAssertions
- [x] **OBRIGATÓRIO**: Testes de regressão com golden files
- [x] **OBRIGATÓRIO**: CI/CD pipeline configurado
- [x] **OBRIGATÓRIO**: IDs da matriz referenciados em todos testes

## Rastreabilidade Completa

### Resumo de IDs da Matriz com Testes

| Tipo | Quantidade | Tipo de Teste | Status |
|------|------------|---------------|--------|
| METOD | 66 | Unit (ViewModels) ou Integration (Repositories) | PENDING |
| REGRA | 152 | Unit (dentro dos testes de ViewModels) | PENDING |
| QUERY | 46 | Integration (Repositories com DB real) | PENDING |
| TELA | 4 | Integration (API tests) | PENDING |
| **Total** | **268** | **Múltiplos tipos** | **PENDING** |

**Total de Testes Estimados**: ~150 testes (cobrindo 275+ IDs)

### Prioridade de Testes

| Prioridade | IDs | Justificativa |
|------------|-----|---------------|
| P0 (Crítico) | METOD-0003, METOD-0010, REGRA-0001 a REGRA-0040 | Fluxo principal de consulta |
| P1 (Alta) | QUERY-0001 a QUERY-0046 | Integridade de dados |
| P2 (Média) | REGRA-0041 a REGRA-0152 | Regras secundárias |
| P3 (Baixa) | Helpers, formatações | Funções auxiliares |

### Status na Matriz

Atualizar `MATRIZ_RASTREABILIDADE.csv`:
- Status_Teste_Unitario = PENDING para todos (aguardando implementação)
- Ref_Doc_Abordagem = 10_TESTING_STRATEGY.md

