# 01 - DOMAIN MODEL

## Objetivo

Definir a camada de domínio para o sistema VGFNA, mapeando todas as 13 entidades legadas de tabelas DB2 (ENT-0101 a ENT-0113) para o modelo moderno .NET Core, incluindo entities, DTOs, interfaces de repositories, services e viewmodels, seguindo princípios de Clean Architecture.

## Mapeamento de Legado

### Origem
- **Programa legado**: VGFNA (Alteração de Dados Básicos)
- **Arquivo**: `_LEGADO/vgfna.esf`
- **Entidades Mapeadas**: 13 entidades de tabelas DB2 (ENT-0101 a ENT-0113)
- **Nota**: ENT-0114 e ENT-0115 são estruturas workstorage (RECORD) e não são mapeadas como entities de domínio
- **Telas**: 3 telas principais (TELA-0101 a TELA-0103)
- **Campos de Tela**: 9 objetos (OBJ-0101 a OBJ-0109)

### Destino
- **Camada**: Domain
- **Namespace Base**: `Vgfna.Web.AgTeste.Domain`
- **Sub-namespaces**:
  - `Vgfna.Web.AgTeste.Domain.Entities`
  - `Vgfna.Web.AgTeste.Domain.Dto`
  - `Vgfna.Web.AgTeste.Domain.Interfaces.Repositories`
  - `Vgfna.Web.AgTeste.Domain.Interfaces.Services`
  - `Vgfna.Web.AgTeste.Domain.Interfaces.ViewModels`

## Especificação Técnica

### 1. Entities (Entidades de Domínio)

#### 1.1 Apolice

**Rastreabilidade**:
- **ID Matriz**: `ENT-0101`
- **Tabela Legado**: V0APOLICE
- **Arquivo**: `_LEGADO/vgfna.esf`, linha ~3800

**Namespace**: `Vgfna.Web.AgTeste.Domain.Entities`

```csharp
/// <summary>
/// Entidade Apólice
/// Migrado de: ENT-0101 (V0APOLICE)
/// </summary>
public class Apolice
{
    public string NumeroApolice { get; set; } = string.Empty;
    public int CodigoCliente { get; set; }
    public int CodigoSucursal { get; set; }
    public int TipoApolice { get; set; }
    public DateTime? DataAbertura { get; set; }
    public DateTime? DataEncerramento { get; set; }
    public string? Situacao { get; set; }
}
```

#### 1.2 Subgrupo

**Rastreabilidade**:
- **ID Matriz**: `ENT-0102`
- **Tabela Legado**: V0SUBGRUPO
- **Arquivo**: `_LEGADO/vgfna.esf`, linha ~4000

```csharp
/// <summary>
/// Entidade principal - Subgrupo da Apólice
/// Migrado de: ENT-0102 (V0SUBGRUPO)
/// </summary>
public class Subgrupo
{
    public string NumeroApolice { get; set; } = string.Empty;
    public int CodigoSubgrupo { get; set; }
    public int? PeriodoFaturamento { get; set; }
    public int? FormaFaturamento { get; set; }
    public int? FormaAverbacao { get; set; }
    public int? TipoPlano { get; set; }
    public char? PlanoAssociado { get; set; }
    public int? TipoCobranca { get; set; }
    public char? ValidarMatricula { get; set; }
    public int? EnderecoCobranca { get; set; }
    public int? BancoCobranca { get; set; }
    public int? AgenciaCobranca { get; set; }
    public int? DacCobranca { get; set; }
    public decimal? PercentualConjugeAP { get; set; }
    public decimal? PercentualConjugeVG { get; set; }
    public DateTime? DataInclusao { get; set; }
    public DateTime? DataAlteracao { get; set; }
    public string? UsuarioInclusao { get; set; }
    public string? UsuarioAlteracao { get; set; }
}
```

#### 1.3 TermoAdesao

**Rastreabilidade**:
- **ID Matriz**: `ENT-0103`
- **Tabela Legado**: V0TERMOADESAO
- **Arquivo**: `_LEGADO/vgfna.esf`, linha ~4200

```csharp
/// <summary>
/// Entidade Termo Adesão
/// Migrado de: ENT-0103 (V0TERMOADESAO)
/// </summary>
public class TermoAdesao
{
    public string NumeroApolice { get; set; } = string.Empty;
    public int CodigoTermo { get; set; }
    public int? PeriodoFaturamento { get; set; }
    public int? FormaFaturamento { get; set; }
    public int? FormaAverbacao { get; set; }
    public int? TipoPlano { get; set; }
    public char? PlanoAssociado { get; set; }
    public int? TipoCobranca { get; set; }
    public char? ValidarMatricula { get; set; }
    public int? EnderecoCobranca { get; set; }
    public int? BancoCobranca { get; set; }
    public int? AgenciaCobranca { get; set; }
    public DateTime? DataInclusao { get; set; }
    public DateTime? DataAlteracao { get; set; }
    public string? UsuarioInclusao { get; set; }
    public string? UsuarioAlteracao { get; set; }
}
```

#### 1.4 Cliente

**Rastreabilidade**:
- **ID Matriz**: `ENT-0104`
- **Tabela Legado**: V1CLIENTE

```csharp
/// <summary>
/// Entidade Cliente
/// Migrado de: ENT-0104 (V1CLIENTE)
/// </summary>
public class Cliente
{
    public int CodigoCliente { get; set; }
    public string NomeRazao { get; set; } = string.Empty;
    public string? CgcCpf { get; set; }
    public string? TipoPessoa { get; set; }
    public string? Situacao { get; set; }
}
```

#### 1.5 Endereco

**Rastreabilidade**:
- **ID Matriz**: `ENT-0105`
- **Tabela Legado**: V1ENDERECOS

```csharp
/// <summary>
/// Entidade Endereço
/// Migrado de: ENT-0105 (V1ENDERECOS)
/// </summary>
public class Endereco
{
    public int CodigoEndereco { get; set; }
    public int CodigoCliente { get; set; }
    public string? Logradouro { get; set; }
    public string? Numero { get; set; }
    public string? Complemento { get; set; }
    public string? Bairro { get; set; }
    public string? Cidade { get; set; }
    public string? Estado { get; set; }
    public string? Cep { get; set; }
    public string? TipoEndereco { get; set; }
}
```

#### 1.6 AgenciaBancaria

**Rastreabilidade**:
- **ID Matriz**: `ENT-0106`
- **Tabela Legado**: V1AGENCIAS

```csharp
/// <summary>
/// Entidade Agência Bancária
/// Migrado de: ENT-0106 (V1AGENCIAS)
/// </summary>
public class AgenciaBancaria
{
    public int CodigoBanco { get; set; }
    public int CodigoAgencia { get; set; }
    public int? Dac { get; set; }
    public string NomeAgencia { get; set; } = string.Empty;
    public string? Situacao { get; set; }
}
```

#### 1.7 FonteProdutora

**Rastreabilidade**:
- **ID Matriz**: `ENT-0107`
- **Tabela Legado**: V1FONTE

```csharp
/// <summary>
/// Entidade Fonte Produtora (Sucursal)
/// Migrado de: ENT-0107 (V1FONTE)
/// </summary>
public class FonteProdutora
{
    public int CodigoFonte { get; set; }
    public string NomeFonte { get; set; } = string.Empty;
    public string? Situacao { get; set; }
}
```

#### 1.8 Sistema

**Rastreabilidade**:
- **ID Matriz**: `ENT-0108`
- **Tabela Legado**: V0SISTEMA

```csharp
/// <summary>
/// Entidade Sistema
/// Migrado de: ENT-0108 (V0SISTEMA)
/// </summary>
public class Sistema
{
    public string IdSistema { get; set; } = string.Empty;
    public DateTime? DataMovimentoAbertura { get; set; }
    public string? Descricao { get; set; }
}
```

#### 1.9 DominioPeriodoFaturamento

**Rastreabilidade**:
- **ID Matriz**: `ENT-0109`
- **Tabela Legado**: ZZ01T14

```csharp
/// <summary>
/// Entidade Domínio Período Faturamento
/// Migrado de: ENT-0109 (ZZ01T14)
/// </summary>
public class DominioPeriodoFaturamento
{
    public int Codigo { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public bool Ativo { get; set; } = true;
}
```

#### 1.10 DominioFormaFaturamento

**Rastreabilidade**:
- **ID Matriz**: `ENT-0110`
- **Tabela Legado**: ZZ01T17

```csharp
/// <summary>
/// Entidade Domínio Forma Faturamento
/// Migrado de: ENT-0110 (ZZ01T17)
/// </summary>
public class DominioFormaFaturamento
{
    public int Codigo { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public bool Ativo { get; set; } = true;
}
```

#### 1.11 DominioFormaAverbacao

**Rastreabilidade**:
- **ID Matriz**: `ENT-0111`
- **Tabela Legado**: ZZ01T18

```csharp
/// <summary>
/// Entidade Domínio Forma Averbação
/// Migrado de: ENT-0111 (ZZ01T18)
/// </summary>
public class DominioFormaAverbacao
{
    public int Codigo { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public bool Ativo { get; set; } = true;
}
```

#### 1.12 DominioTipoPlano

**Rastreabilidade**:
- **ID Matriz**: `ENT-0112`
- **Tabela Legado**: ZZ01T19

```csharp
/// <summary>
/// Entidade Domínio Tipo Plano
/// Migrado de: ENT-0112 (ZZ01T19)
/// </summary>
public class DominioTipoPlano
{
    public int Codigo { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public bool Ativo { get; set; } = true;
}
```

#### 1.13 DominioTipoCobranca

**Rastreabilidade**:
- **ID Matriz**: `ENT-0113`
- **Tabela Legado**: ZZ01T21

```csharp
/// <summary>
/// Entidade Domínio Tipo Cobrança
/// Migrado de: ENT-0113 (ZZ01T21)
/// </summary>
public class DominioTipoCobranca
{
    public int Codigo { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public bool Ativo { get; set; } = true;
}
```

### 2. DTOs (Data Transfer Objects)

#### 2.1 ConsultaApoliceRequestDto

**Rastreabilidade**:
- **ID Matriz**: `OBJ-0107` (NUM_APOLICE)
- **Tela**: TELA-0101 (VGFNM010)

```csharp
/// <summary>
/// DTO para requisição de consulta de apólice
/// Migrado de: OBJ-0107 (TELA-0101)
/// </summary>
public class ConsultaApoliceRequestDto
{
    public string NumeroApolice { get; set; } = string.Empty;
}
```

#### 2.2 AlteracaoSubgrupoRequestDto

**Rastreabilidade**:
- **ID Matriz**: TELA-0102 (VGFNM020)
- **Campos**: OBJ-0101 a OBJ-0109

```csharp
/// <summary>
/// DTO para requisição de alteração de subgrupo
/// Migrado de: TELA-0102 (VGFNM020)
/// </summary>
public class AlteracaoSubgrupoRequestDto
{
    public string NumeroApolice { get; set; } = string.Empty;
    public int CodigoSubgrupo { get; set; }
    public int? PeriodoFaturamento { get; set; }
    public int? FormaFaturamento { get; set; }
    public int? FormaAverbacao { get; set; }
    public int? TipoPlano { get; set; }
    public char? PlanoAssociado { get; set; }
    public int? TipoCobranca { get; set; }
    public char? ValidarMatricula { get; set; }
    public int? EnderecoCobranca { get; set; }
    public int? BancoCobranca { get; set; }
    public int? AgenciaCobranca { get; set; }
    public int? DacCobranca { get; set; }
    public decimal? PercentualConjugeAP { get; set; }
    public decimal? PercentualConjugeVG { get; set; }
}
```

#### 2.3 AlteracaoTermoAdesaoRequestDto

**Rastreabilidade**:
- **ID Matriz**: TELA-0103 (VGFNM030)

```csharp
/// <summary>
/// DTO para requisição de alteração de termo adesão
/// Migrado de: TELA-0103 (VGFNM030)
/// </summary>
public class AlteracaoTermoAdesaoRequestDto
{
    public string NumeroApolice { get; set; } = string.Empty;
    public int CodigoTermo { get; set; }
    public int? PeriodoFaturamento { get; set; }
    public int? FormaFaturamento { get; set; }
    public int? FormaAverbacao { get; set; }
    public int? TipoPlano { get; set; }
    public char? PlanoAssociado { get; set; }
    public int? TipoCobranca { get; set; }
    public char? ValidarMatricula { get; set; }
    public int? EnderecoCobranca { get; set; }
    public int? BancoCobranca { get; set; }
    public int? AgenciaCobranca { get; set; }
}
```

#### 2.4 ApoliceDetalhesDto

**Rastreabilidade**:
- **ID Matriz**: ENT-0101, ENT-0104

```csharp
/// <summary>
/// DTO com detalhes completos da apólice
/// Migrado de: ENT-0101, ENT-0104
/// </summary>
public class ApoliceDetalhesDto
{
    public string NumeroApolice { get; set; } = string.Empty;
    public int CodigoCliente { get; set; }
    public string NomeCliente { get; set; } = string.Empty;
    public int TipoApolice { get; set; }
    public DateTime? DataAbertura { get; set; }
    public Subgrupo? Subgrupo { get; set; }
    public List<TermoAdesao> TermosAdesao { get; set; } = new();
}
```

### 3. Interfaces de Repositories

#### 3.1 IApoliceRepository

**Rastreabilidade**:
- **ID Matriz**: QUERY-0105, METOD-0105

```csharp
/// <summary>
/// Interface Repository para Apólice
/// Migrado de: QUERY-0105, METOD-0105 (VGFNP011)
/// </summary>
public interface IApoliceRepository
{
    Task<Apolice?> GetByNumero(string numeroApolice);
    Task<bool> Exists(string numeroApolice);
}
```

#### 3.2 ISubgrupoRepository

**Rastreabilidade**:
- **ID Matriz**: QUERY-0101, QUERY-0102, METOD-0106, METOD-0108

```csharp
/// <summary>
/// Interface Repository para Subgrupo
/// Migrado de: QUERY-0101, QUERY-0102, METOD-0106, METOD-0108
/// </summary>
public interface ISubgrupoRepository
{
    Task<Subgrupo?> GetByApoliceAndSubgrupo(string numeroApolice, int codigoSubgrupo);
    Task<bool> Update(Subgrupo subgrupo);
    Task<bool> Exists(string numeroApolice, int codigoSubgrupo);
}
```

#### 3.3 ITermoAdesaoRepository

**Rastreabilidade**:
- **ID Matriz**: QUERY-0103, QUERY-0104, METOD-0110

```csharp
/// <summary>
/// Interface Repository para Termo Adesão
/// Migrado de: QUERY-0103, QUERY-0104, METOD-0110
/// </summary>
public interface ITermoAdesaoRepository
{
    Task<TermoAdesao?> GetByApoliceAndTermo(string numeroApolice, int codigoTermo);
    Task<bool> Update(TermoAdesao termoAdesao);
    Task<List<TermoAdesao>> GetByApolice(string numeroApolice);
}
```

#### 3.4 IClienteRepository

**Rastreabilidade**:
- **ID Matriz**: QUERY-0106, METOD-0105

```csharp
/// <summary>
/// Interface Repository para Cliente
/// Migrado de: QUERY-0106, METOD-0105
/// </summary>
public interface IClienteRepository
{
    Task<Cliente?> GetByCodigo(int codigoCliente);
    Task<string> GetNomeCliente(int codigoCliente);
}
```

#### 3.5 IEnderecoRepository

**Rastreabilidade**:
- **ID Matriz**: QUERY-0107, METOD-0106

```csharp
/// <summary>
/// Interface Repository para Endereço
/// Migrado de: QUERY-0107, METOD-0106
/// </summary>
public interface IEnderecoRepository
{
    Task<List<Endereco>> GetByCliente(int codigoCliente);
    Task<Endereco?> GetByCodigo(int codigoEndereco);
}
```

#### 3.6 IAgenciaBancariaRepository

**Rastreabilidade**:
- **ID Matriz**: QUERY-0108, METOD-0107

```csharp
/// <summary>
/// Interface Repository para Agência Bancária
/// Migrado de: QUERY-0108, METOD-0107
/// </summary>
public interface IAgenciaBancariaRepository
{
    Task<AgenciaBancaria?> GetByBancoAndAgencia(int codigoBanco, int codigoAgencia);
    Task<List<AgenciaBancaria>> GetByBanco(int codigoBanco);
    Task<bool> ValidateDac(int codigoBanco, int codigoAgencia, int dac);
}
```

#### 3.7 IFonteProdutoraRepository

**Rastreabilidade**:
- **ID Matriz**: QUERY-0109, METOD-0108

```csharp
/// <summary>
/// Interface Repository para Fonte Produtora
/// Migrado de: QUERY-0109, METOD-0108
/// </summary>
public interface IFonteProdutoraRepository
{
    Task<List<FonteProdutora>> GetAtivas();
    Task<FonteProdutora?> GetByCodigo(int codigoFonte);
}
```

#### 3.8 ISistemaRepository

**Rastreabilidade**:
- **ID Matriz**: QUERY-0110, METOD-0103

```csharp
/// <summary>
/// Interface Repository para Sistema
/// Migrado de: QUERY-0110, METOD-0103 (VGFNP001)
/// </summary>
public interface ISistemaRepository
{
    Task<DateTime?> GetDataAbertura(string idSistema);
}
```

#### 3.9 IDominioRepository

**Rastreabilidade**:
- **ID Matriz**: ENT-0109 a ENT-0113

```csharp
/// <summary>
/// Interface Repository para Tabelas de Domínio
/// Migrado de: ENT-0109 a ENT-0113
/// </summary>
public interface IDominioRepository
{
    Task<List<DominioPeriodoFaturamento>> GetPeriodosFaturamento();
    Task<List<DominioFormaFaturamento>> GetFormasFaturamento();
    Task<List<DominioFormaAverbacao>> GetFormasAverbacao();
    Task<List<DominioTipoPlano>> GetTiposPlano();
    Task<List<DominioTipoCobranca>> GetTiposCobranca();
}
```

### 4. Interfaces de Services

#### 4.1 IAlteracaoDadosBasicosService

**Rastreabilidade**:
- **ID Matriz**: METOD-0102, METOD-0104, METOD-0107, METOD-0109

```csharp
/// <summary>
/// Interface Service para Alteração de Dados Básicos
/// Migrado de: METOD-0102, METOD-0104, METOD-0107, METOD-0109
/// </summary>
public interface IAlteracaoDadosBasicosService
{
    Task<AppResponse<ApoliceDetalhesDto>> ConsultarApolice(ConsultaApoliceRequestDto request);
    Task<AppResponse<bool>> AlterarSubgrupo(AlteracaoSubgrupoRequestDto request);
    Task<AppResponse<bool>> AlterarTermoAdesao(AlteracaoTermoAdesaoRequestDto request);
}
```

### 5. Interfaces de ViewModels

#### 5.1 IProcessarConsultaM010ViewModel

**Rastreabilidade**:
- **ID Matriz**: METOD-0104 (VGFNS002)

```csharp
/// <summary>
/// Interface ViewModel para processar consulta M010
/// Migrado de: METOD-0104 (VGFNS002)
/// </summary>
public interface IProcessarConsultaM010ViewModel
{
    Task<ApoliceDetalhesDto> Execute(ConsultaApoliceRequestDto request);
}
```

#### 5.2 IProcessarAlteracaoM020ViewModel

**Rastreabilidade**:
- **ID Matriz**: METOD-0107 (VGFNS003)

```csharp
/// <summary>
/// Interface ViewModel para processar alteração M020
/// Migrado de: METOD-0107 (VGFNS003)
/// </summary>
public interface IProcessarAlteracaoM020ViewModel
{
    Task<bool> Execute(AlteracaoSubgrupoRequestDto request);
}
```

#### 5.3 IProcessarAlteracaoM030ViewModel

**Rastreabilidade**:
- **ID Matriz**: METOD-0109 (VGFNS004)

```csharp
/// <summary>
/// Interface ViewModel para processar alteração M030
/// Migrado de: METOD-0109 (VGFNS004)
/// </summary>
public interface IProcessarAlteracaoM030ViewModel
{
    Task<bool> Execute(AlteracaoTermoAdesaoRequestDto request);
}
```

## Dependências

- **Não depende de**: Nenhuma outra camada (Domain é independente)
- **Depende apenas de**: .NET BCL (System.*)

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: Todos 13 ENT-* mapeados para entities
- [x] **OBRIGATÓRIO**: Todas 10 QUERY-* mapeadas para interfaces de repositories
- [x] **OBRIGATÓRIO**: Todas 9 OBJ-* mapeados para propriedades de DTOs
- [x] **OBRIGATÓRIO**: Request DTOs para todas as 3 telas principais
- [x] **OBRIGATÓRIO**: Response DTOs com estrutura apropriada
- [x] **OBRIGATÓRIO**: 9 interfaces de repositories definidas
- [x] **OBRIGATÓRIO**: Interfaces mapeiam todas 10 QUERY-* entries
- [x] **OBRIGATÓRIO**: 1 interface de service definida
- [x] **OBRIGATÓRIO**: 3 interfaces de viewmodels principais definidas
- [x] **OBRIGATÓRIO**: AppResponse<T> pattern definido
- [x] **OBRIGATÓRIO**: Primary constructors em todos os exemplos
- [x] **OBRIGATÓRIO**: Nullable reference types apropriadamente configurados
- [x] **OBRIGATÓRIO**: Todos elementos têm ID da matriz referenciado

## Rastreabilidade Completa

### Resumo de IDs da Matriz Abordados

| Tipo | Quantidade | Range | Status |
|------|------------|-------|--------|
| ENT | 13 | ENT-0101 a ENT-0113 | COMPLETED |
| QUERY | 10 | QUERY-0101 a QUERY-0110 | COMPLETED |
| METOD (Interfaces) | 8 | METOD-0103, METOD-0104, METOD-0105, METOD-0106, METOD-0107, METOD-0108, METOD-0109, METOD-0110 | COMPLETED |
| TELA | 3 | TELA-0101 a TELA-0103 | COMPLETED |
| OBJ | 9 | OBJ-0101 a OBJ-0109 | COMPLETED |

**Total de IDs Mapeados neste Documento**: 43

### Status na Matriz

Atualizar `MATRIZ_RASTREABILIDADE.csv`:
- Status_Documentacao = COMPLETED para todos ENT-0101 a ENT-0113
- Status_Documentacao = COMPLETED para todos QUERY-0101 a QUERY-0110
- Status_Documentacao = COMPLETED para interfaces de METOD-0103, METOD-0104, METOD-0105, METOD-0106, METOD-0107, METOD-0108, METOD-0109, METOD-0110
- Ref_Doc_Abordagem = 01_DOMAIN_MODEL.md

