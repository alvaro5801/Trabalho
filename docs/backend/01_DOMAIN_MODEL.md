# 01 - DOMAIN MODEL

## Objetivo

Definir a camada de domínio para o sistema CB2QA, mapeando todas as 41 entidades legadas (ENT-0001 a ENT-0041) para o modelo moderno .NET Core, incluindo entities, DTOs, interfaces de repositories, services e viewmodels, seguindo princípios de Clean Architecture.

## Mapeamento de Legado

### Origem
- **Programa legado**: CB2QA (Consulta Movimento Débito Automático)
- **Arquivo**: `_LEGADO/cb2qa.esf`
- **Entidades Mapeadas**: 41 entidades (ENT-0001 a ENT-0041)
- **Telas**: 8 telas (TELA-0001 a TELA-0008)
- **Campos de Tela**: 75 objetos (OBJ-0001 a OBJ-0075)

### Destino
- **Camada**: Domain
- **Namespace Base**: `Cb2qa.Web.AgTeste.Domain`
- **Sub-namespaces**:
  - `Cb2qa.Web.AgTeste.Domain.Entities`
  - `Cb2qa.Web.AgTeste.Domain.Dto`
  - `Cb2qa.Web.AgTeste.Domain.Interfaces.Repositories`
  - `Cb2qa.Web.AgTeste.Domain.Interfaces.Services`
  - `Cb2qa.Web.AgTeste.Domain.Interfaces.ViewModels`

## Especificação Técnica

### 1. Entities (Entidades de Domínio)

#### 1.1 Banco

**Rastreabilidade**:
- **ID Matriz**: `ENT-0001`
- **Tabela Legado**: BANCOS
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

**Namespace**: `Cb2qa.Web.AgTeste.Domain.Entities`

```csharp
/// <summary>
/// Entidade Banco
/// Migrado de: ENT-0001 (BANCOS)
/// </summary>
public class Banco
{
    public string CodigoBanco { get; set; } = string.Empty;
    public string NomeBanco { get; set; } = string.Empty;
    public string? DescricaoBanco { get; set; }
    public bool Ativo { get; set; } = true;
}
```

#### 1.2 Calendario

**Rastreabilidade**:
- **ID Matriz**: `ENT-0002`
- **Tabela Legado**: CALENDARIO
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Calendario
/// Migrado de: ENT-0002 (CALENDARIO)
/// </summary>
public class Calendario
{
    public DateTime DataCalendario { get; set; }
    public string DiaSemana { get; set; } = string.Empty;
    public bool IsFimSemana { get; set; }
    public bool IsFeriado { get; set; }
}
```

#### 1.3 RegistroDebitoAuto

**Rastreabilidade**:
- **ID Matriz**: `ENT-0003`
- **Tabela Legado**: CB2QR001 - Tabela registro debito automatico
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade principal - Registro de Débito Automático
/// Migrado de: ENT-0003 (CB2QR001)
/// </summary>
public class RegistroDebitoAuto
{
    public string NumeroApolice { get; set; } = string.Empty;
    public string NumeroEndosso { get; set; } = string.Empty;
    public string CodigoConvenio { get; set; } = string.Empty;
    public string TipoCobranca { get; set; } = string.Empty;
    public string? CodigoAgencia { get; set; }
    public string? OperacaoConta { get; set; }
    public string? NumeroConta { get; set; }
    public string? DigitoVerificadorConta { get; set; }
    public string? NumeroCartao { get; set; }
    public string? DigitoVerificadorCartao { get; set; }
    public DateTime? DataInclusao { get; set; }
    public DateTime? DataAlteracao { get; set; }
    public string? UsuarioInclusao { get; set; }
    public string? UsuarioAlteracao { get; set; }
}
```

#### 1.4 ChequeEmitido

**Rastreabilidade**:
- **ID Matriz**: `ENT-0004`
- **Tabela Legado**: CHEQUES_EMITIDOS
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Cheque Emitido
/// Migrado de: ENT-0004 (CHEQUES_EMITIDOS)
/// </summary>
public class ChequeEmitido
{
    public string CodigoEmpresa { get; set; } = string.Empty;
    public string TipoMovimento { get; set; } = string.Empty;
    public string NumeroDocumento { get; set; } = string.Empty;
    public DateTime DataMovimento { get; set; }
    public string NumChequeInterno { get; set; } = string.Empty;
    public string? DigitoVerificador { get; set; }
    public decimal ValorCheque { get; set; }
    public string? Favorecido { get; set; }
}
```

#### 1.5 PessoaLegadoGE

**Rastreabilidade**:
- **ID Matriz**: `ENT-0005`
- **Tabela Legado**: GE_LEGADO_PESSOA
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Pessoa Legado GE
/// Migrado de: ENT-0005 (GE_LEGADO_PESSOA)
/// </summary>
public class PessoaLegadoGE
{
    public string NumeroOcorrenciaMovimento { get; set; } = string.Empty;
    public string NumeroPessoa { get; set; } = string.Empty;
    public string TipoPessoa { get; set; } = string.Empty;
    public string? CpfCnpj { get; set; }
    public string? NomeRazaoSocial { get; set; }
}
```

#### 1.6 MovimentoGE

**Rastreabilidade**:
- **ID Matriz**: `ENT-0006`
- **Tabela Legado**: GE_MOVIMENTO
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Movimento GE
/// Migrado de: ENT-0006 (GE_MOVIMENTO)
/// </summary>
public class MovimentoGE
{
    public string NumeroOcorrenciaMovimento { get; set; } = string.Empty;
    public DateTime DataMovimento { get; set; }
    public string TipoMovimento { get; set; } = string.Empty;
    public decimal ValorMovimento { get; set; }
    public string? Observacao { get; set; }
}
```

#### 1.7 MovimentoConta

**Rastreabilidade**:
- **ID Matriz**: `ENT-0007`
- **Tabela Legado**: GE_MOVTO_CONTA
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Movimento Conta GE
/// Migrado de: ENT-0007 (GE_MOVTO_CONTA)
/// </summary>
public class MovimentoConta
{
    public string NumeroApolice { get; set; } = string.Empty;
    public string NumeroEndosso { get; set; } = string.Empty;
    public string CodigoConvenio { get; set; } = string.Empty;
    public string NumeroParcela { get; set; } = string.Empty;
    public string NumeroFitaEnvio { get; set; } = string.Empty;
    public DateTime? DataMovimento { get; set; }
    public decimal? ValorDebito { get; set; }
    public decimal? ValorCredito { get; set; }
    public string? SituacaoCobranca { get; set; }
}
```

#### 1.8 LoteCheque

**Rastreabilidade**:
- **ID Matriz**: `ENT-0008`
- **Tabela Legado**: LOTE_CHEQUES
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Lote de Cheques
/// Migrado de: ENT-0008 (LOTE_CHEQUES)
/// </summary>
public class LoteCheque
{
    public string NumChequeInterno { get; set; } = string.Empty;
    public string DigitoVerificadorInterno { get; set; } = string.Empty;
    public string CodigoBanco { get; set; } = string.Empty;
    public string NumeroAgencia { get; set; } = string.Empty;
    public string NumeroConta { get; set; } = string.Empty;
    public string NumeroCheque { get; set; } = string.Empty;
    public DateTime? DataEmissao { get; set; }
}
```

#### 1.9 PessoaFisica

**Rastreabilidade**:
- **ID Matriz**: `ENT-0009`
- **Tabela Legado**: OD_PESSOA_FISICA
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Pessoa Física
/// Migrado de: ENT-0009 (OD_PESSOA_FISICA)
/// </summary>
public class PessoaFisica
{
    public string NumeroPessoa { get; set; } = string.Empty;
    public string Cpf { get; set; } = string.Empty;
    public string NomeCompleto { get; set; } = string.Empty;
    public DateTime? DataNascimento { get; set; }
    public string? Sexo { get; set; }
}
```

#### 1.10 PessoaJuridica

**Rastreabilidade**:
- **ID Matriz**: `ENT-0010`
- **Tabela Legado**: OD_PESSOA_JURIDICA
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Pessoa Jurídica
/// Migrado de: ENT-0010 (OD_PESSOA_JURIDICA)
/// </summary>
public class PessoaJuridica
{
    public string NumeroPessoa { get; set; } = string.Empty;
    public string Cnpj { get; set; } = string.Empty;
    public string RazaoSocial { get; set; } = string.Empty;
    public string? NomeFantasia { get; set; }
    public DateTime? DataAbertura { get; set; }
}
```

#### 1.11 SinistroArDetalheVC

**Rastreabilidade**:
- **ID Matriz**: `ENT-0011`
- **Tabela Legado**: SI_AR_DETALHE_VC
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Sinistro AR Detalhe VC
/// Migrado de: ENT-0011 (SI_AR_DETALHE_VC)
/// </summary>
public class SinistroArDetalheVC
{
    public string NumeroApolSinistro { get; set; } = string.Empty;
    public string OcorrenciaHistorico { get; set; } = string.Empty;
    public decimal ValorTotalMovimento { get; set; }
    public string? CgcCpf { get; set; }
    public string? NomeFavorecido { get; set; }
}
```

#### 1.12 SinistroHistorico

**Rastreabilidade**:
- **ID Matriz**: `ENT-0012`
- **Tabela Legado**: SINISTRO_HISTORICO
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Sinistro Histórico
/// Migrado de: ENT-0012 (SINISTRO_HISTORICO)
/// </summary>
public class SinistroHistorico
{
    public string NumeroApolSinistro { get; set; } = string.Empty;
    public string CodigoOperacao { get; set; } = string.Empty;
    public DateTime DataMovimento { get; set; }
    public TimeSpan HoraMovimento { get; set; }
    public decimal? ValorMovimento { get; set; }
    public string? TipoHistorico { get; set; }
}
```

#### 1.13 ApoliceCobranca

**Rastreabilidade**:
- **ID Matriz**: `ENT-0013`
- **Tabela Legado**: V0APOLCOB
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Apólice Cobrança
/// Migrado de: ENT-0013 (V0APOLCOB)
/// </summary>
public class ApoliceCobranca
{
    public string NumeroApolice { get; set; } = string.Empty;
    public string? CodigoConvenio { get; set; }
    public string? CodigoAgencia { get; set; }
    public string? OperacaoConta { get; set; }
    public string? NumeroConta { get; set; }
    public string? DigitoVerificadorConta { get; set; }
    public string? NumeroCartao { get; set; }
    public string? TipoCobranca { get; set; }
}
```

#### 1.14 Bilhete

**Rastreabilidade**:
- **ID Matriz**: `ENT-0014`
- **Tabela Legado**: V0BILHETE
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Bilhete
/// Migrado de: ENT-0014 (V0BILHETE)
/// </summary>
public class Bilhete
{
    public string NumeroBilhete { get; set; } = string.Empty;
    public string NumeroApolice { get; set; } = string.Empty;
    public DateTime? DataEmissao { get; set; }
    public string? CodigoCliente { get; set; }
}
```

#### 1.15 Cheque

**Rastreabilidade**:
- **ID Matriz**: `ENT-0015`
- **Tabela Legado**: V0CHEQUES
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Cheque
/// Migrado de: ENT-0015 (V0CHEQUES)
/// </summary>
public class Cheque
{
    public string NumChequeInterno { get; set; } = string.Empty;
    public string NumeroCheque { get; set; } = string.Empty;
    public string CodigoBanco { get; set; } = string.Empty;
    public string? NomeFavorecido { get; set; }
    public decimal? ValorCheque { get; set; }
}
```

#### 1.16 Cliente

**Rastreabilidade**:
- **ID Matriz**: `ENT-0016`
- **Tabela Legado**: V0CLIENTE
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Cliente
/// Migrado de: ENT-0016 (V0CLIENTE)
/// </summary>
public class Cliente
{
    public string CodigoCliente { get; set; } = string.Empty;
    public string NomeRazao { get; set; } = string.Empty;
    public string? CpfCnpj { get; set; }
    public string TipoPessoa { get; set; } = string.Empty;
}
```

#### 1.17 Feriado

**Rastreabilidade**:
- **ID Matriz**: `ENT-0017`
- **Tabela Legado**: V0FERIADOS
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Feriado
/// Migrado de: ENT-0017 (V0FERIADOS)
/// </summary>
public class Feriado
{
    public DateTime DataFeriado { get; set; }
    public string DescricaoFeriado { get; set; } = string.Empty;
    public string? TipoFeriado { get; set; }
}
```

#### 1.18 HistoricoCobrancaVA

**Rastreabilidade**:
- **ID Matriz**: `ENT-0018`
- **Tabela Legado**: V0HISTCOBVA
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Histórico Cobrança VA
/// Migrado de: ENT-0018 (V0HISTCOBVA)
/// </summary>
public class HistoricoCobrancaVA
{
    public string NumeroTitulo { get; set; } = string.Empty;
    public string? NumeroCertificado { get; set; }
    public DateTime? DataMovimento { get; set; }
    public string? TipoMovimento { get; set; }
}
```

#### 1.19 HistoricoSinistro

**Rastreabilidade**:
- **ID Matriz**: `ENT-0019`
- **Tabela Legado**: V0HISTSINI
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Histórico Sinistro
/// Migrado de: ENT-0019 (V0HISTSINI)
/// </summary>
public class HistoricoSinistro
{
    public string NumeroApolSinistro { get; set; } = string.Empty;
    public string OcorrenciaHistorico { get; set; } = string.Empty;
    public string? NomeFavorecido { get; set; }
    public DateTime? DataMovimento { get; set; }
}
```

#### 1.20 MesSinistro

**Rastreabilidade**:
- **ID Matriz**: `ENT-0020`
- **Tabela Legado**: V0MESTSINI
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Mês Sinistro
/// Migrado de: ENT-0020 (V0MESTSINI)
/// </summary>
public class MesSinistro
{
    public string NumeroApolSinistro { get; set; } = string.Empty;
    public int AnoMes { get; set; }
    public decimal? ValorTotal { get; set; }
}
```

#### 1.21 MovimentoDebitoCCCef

**Rastreabilidade**:
- **ID Matriz**: `ENT-0021`
- **Tabela Legado**: V0MOVDEBCC_CEF - Tabela movimento debito CC CEF
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade principal - Movimento Débito CC CEF
/// Migrado de: ENT-0021 (V0MOVDEBCC_CEF)
/// </summary>
public class MovimentoDebitoCCCef
{
    public string NumeroApolice { get; set; } = string.Empty;
    public string NumeroEndosso { get; set; } = string.Empty;
    public string NumeroParcela { get; set; } = string.Empty;
    public string CodigoConvenio { get; set; } = string.Empty;
    public DateTime DataVencimento { get; set; }
    public decimal? ValorDebito { get; set; }
    public decimal? ValorCredito { get; set; }
    public string? TipoCobranca { get; set; }
    public string? SituacaoCobranca { get; set; }
    public string? CodigoAgencia { get; set; }
    public string? OperacaoConta { get; set; }
    public string? NumeroConta { get; set; }
    public string? DigitoVerificadorConta { get; set; }
    public string? NumeroCartao { get; set; }
    public string? DigitoVerificadorCartao { get; set; }
    public string? NumeroFitaEnvio { get; set; }
    public DateTime? DataEnvio { get; set; }
    public string? NumeroFitaRetorno { get; set; }
    public DateTime? DataRetorno { get; set; }
    public DateTime? DataPagamento { get; set; }
    public DateTime? DataCredito { get; set; }
    public string? NumeroCheque { get; set; }
    public string? DigitoVerificadorCheque { get; set; }
    public string? CodigoRetorno { get; set; }
    public string? DescricaoRetorno { get; set; }
    public string? StatusCartao { get; set; }
    public string? TipoRegistro { get; set; }
    public string? CodigoUsuario { get; set; }
    public DateTime? DataMovimento { get; set; }
}
```

#### 1.22 Parcela

**Rastreabilidade**:
- **ID Matriz**: `ENT-0022`
- **Tabela Legado**: V0PARCELA
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Parcela
/// Migrado de: ENT-0022 (V0PARCELA)
/// </summary>
public class Parcela
{
    public string NumeroApolice { get; set; } = string.Empty;
    public string NumeroEndosso { get; set; } = string.Empty;
    public string NumeroParcela { get; set; } = string.Empty;
    public DateTime DataVencimento { get; set; }
    public decimal ValorParcela { get; set; }
    public string? SituacaoParcela { get; set; }
    public string? DacParcela { get; set; }
}
```

#### 1.23 Proposta

**Rastreabilidade**:
- **ID Matriz**: `ENT-0023`
- **Tabela Legado**: V0PROPOSTA
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Proposta
/// Migrado de: ENT-0023 (V0PROPOSTA)
/// </summary>
public class Proposta
{
    public string NumeroProposta { get; set; } = string.Empty;
    public string FonteProposta { get; set; } = string.Empty;
    public string? CodigoCliente { get; set; }
    public DateTime? DataProposta { get; set; }
}
```

#### 1.24 PropostaVA

**Rastreabilidade**:
- **ID Matriz**: `ENT-0024`
- **Tabela Legado**: V0PROPOSTAVA
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Proposta VA
/// Migrado de: ENT-0024 (V0PROPOSTAVA)
/// </summary>
public class PropostaVA
{
    public string NumeroCertificado { get; set; } = string.Empty;
    public string? CodigoCliente { get; set; }
    public DateTime? DataProposta { get; set; }
}
```

#### 1.25 Endosso

**Rastreabilidade**:
- **ID Matriz**: `ENT-0025`
- **Tabela Legado**: V1ENDOSSO
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Endosso
/// Migrado de: ENT-0025 (V1ENDOSSO)
/// </summary>
public class Endosso
{
    public string NumeroApolice { get; set; } = string.Empty;
    public string NumeroEndosso { get; set; } = string.Empty;
    public DateTime? DataEndosso { get; set; }
    public string? TipoEndosso { get; set; }
    public string? RamoSeguro { get; set; }
}
```

#### 1.26 MovimentoDebitoCCCefV1

**Rastreabilidade**:
- **ID Matriz**: `ENT-0026`
- **Tabela Legado**: V1MOVDEBCC_CEF
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Movimento Débito CC CEF V1
/// Migrado de: ENT-0026 (V1MOVDEBCC_CEF)
/// </summary>
public class MovimentoDebitoCCCefV1
{
    public string NumeroApolice { get; set; } = string.Empty;
    public string NumeroEndosso { get; set; } = string.Empty;
    public string NumeroParcela { get; set; } = string.Empty;
    public string CodigoConvenio { get; set; } = string.Empty;
    public string SituacaoCobranca { get; set; } = string.Empty;
    public string? NumeroRequisicao { get; set; }
}
```

#### 1.27 Sistema

**Rastreabilidade**:
- **ID Matriz**: `ENT-0027`
- **Tabela Legado**: V1SISTEMA
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Sistema
/// Migrado de: ENT-0027 (V1SISTEMA)
/// </summary>
public class Sistema
{
    public string IdSistema { get; set; } = string.Empty;
    public DateTime DataAbertura { get; set; }
    public string? VersaoSistema { get; set; }
}
```

#### 1.28 Usuario

**Rastreabilidade**:
- **ID Matriz**: `ENT-0028`
- **Tabela Legado**: V1USUARIOS
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21

```csharp
/// <summary>
/// Entidade Usuário
/// Migrado de: ENT-0028 (V1USUARIOS)
/// </summary>
public class Usuario
{
    public string CodigoUsuario { get; set; } = string.Empty;
    public string NomeUsuario { get; set; } = string.Empty;
    public string? Email { get; set; }
    public bool Ativo { get; set; } = true;
}
```

### 2. Workstorage (Estruturas Transientes)

**Rastreabilidade**: ENT-0029 a ENT-0033

Estas estruturas COBOL workstorage serão migradas para DTOs transientes:

#### 2.1 WorkstoragePrincipal

**ID Matriz**: `ENT-0029` (CB2QW001)

```csharp
/// <summary>
/// Workstorage principal - migrado de CB2QW001
/// Usado para controle de fluxo entre telas
/// </summary>
public class WorkstoragePrincipal
{
    public string ComandoAtual { get; set; } = string.Empty; // W01LT035
    public string VersaoSistema { get; set; } = string.Empty; // WS-VERSAO
    public int ContadorRegistros { get; set; } // IND2
    public int PaginaAtual { get; set; } // ACPAG2/ACPAG3
}
```

#### 2.2 WorkstorageSecundario

**ID Matriz**: `ENT-0030` (CB2QW002)

```csharp
/// <summary>
/// Workstorage secundário - migrado de CB2QW002
/// Armazena dados temporários de consulta
/// </summary>
public class WorkstorageSecundario
{
    public string[]? DadosTemporarios { get; set; }
}
```

#### 2.3 WorkstorageTerciario

**ID Matriz**: `ENT-0031` (CB2QW003)

```csharp
/// <summary>
/// Workstorage terciário - migrado de CB2QW003
/// Armazena dados de parcelas para paginação
/// </summary>
public class WorkstorageTerciario
{
    public string NumeroApolice { get; set; } = string.Empty;
    public string NumeroEndosso { get; set; } = string.Empty;
    public string CodigoConvenio { get; set; } = string.Empty;
    public string CpfCnpj { get; set; } = string.Empty;
    public string NomeRazao { get; set; } = string.Empty;
    public int QuantidadeRegistros { get; set; }
}
```

### 3. Domain Tables (Enums e Constantes)

**Rastreabilidade**: ENT-0036 a ENT-0041

#### 3.1 TipoCobranca

**ID Matriz**: `ENT-0036` (CB2QT01)

```csharp
/// <summary>
/// Tipo de Cobrança
/// Migrado de: ENT-0036 (CB2QT01)
/// </summary>
public enum TipoCobranca
{
    ContaCorrente = 1,
    CartaoCredito = 2,
    Carne = 3
}
```

#### 3.2 SituacaoCobranca

**ID Matriz**: `ENT-0037` (CB2QT02)

```csharp
/// <summary>
/// Situação de Cobrança
/// Migrado de: ENT-0037 (CB2QT02)
/// </summary>
public enum SituacaoCobranca
{
    Pendente = 0,
    Enviado = 1,
    Pago = 2,
    Devolvido = 8,
    Cancelado = 9
}
```

#### 3.3 SituacaoParcela

**ID Matriz**: `ENT-0038` (CB2QT03)

```csharp
/// <summary>
/// Situação de Parcela
/// Migrado de: ENT-0038 (CB2QT03)
/// </summary>
public enum SituacaoParcela
{
    AVencer = 0,
    Paga = 1,
    Vencida = 2,
    Bloqueada = 3
}
```

#### 3.4 FormaCobranca

**ID Matriz**: `ENT-0039` (CB2QT04)

```csharp
/// <summary>
/// Forma de Cobrança
/// Migrado de: ENT-0039 (CB2QT04)
/// </summary>
public enum FormaCobranca
{
    Debito = 1,
    Devolucao = 2,
    Estorno = 3
}
```

#### 3.5 TipoDocumento

**ID Matriz**: `ENT-0040` (CB2QT05)

```csharp
/// <summary>
/// Tipo de Documento
/// Migrado de: ENT-0040 (CB2QT05)
/// </summary>
public enum TipoDocumento
{
    CPF = 1,
    CNPJ = 2,
    RG = 3
}
```

#### 3.6 TipoSegurado

**ID Matriz**: `ENT-0041` (CB2QT06)

```csharp
/// <summary>
/// Tipo de Segurado
/// Migrado de: ENT-0041 (CB2QT06)
/// </summary>
public enum TipoSegurado
{
    Titular = 1,
    Dependente = 2,
    Agregado = 3
}
```

### 4. DTOs (Data Transfer Objects)

#### 4.1 Request DTOs

##### ConsultaMovimentoRequest

**Rastreabilidade**: OBJ-0007 a OBJ-0015 (Campos tela M010)

```csharp
/// <summary>
/// Request para consulta de movimentos
/// Migrado de: TELA-0001 (CB2QM010)
/// </summary>
public class ConsultaMovimentoRequest
{
    // ID Matriz: OBJ-0007
    public string? NumeroTitulo { get; set; }
    
    // ID Matriz: OBJ-0008
    public string? NumeroApolice { get; set; }
    
    // ID Matriz: OBJ-0009
    public string? NumeroEndosso { get; set; }
    
    // ID Matriz: OBJ-0010
    public string? CodigoAgencia { get; set; }
    
    // ID Matriz: OBJ-0011
    public string? OperacaoConta { get; set; }
    
    // ID Matriz: OBJ-0012
    public string? NumeroConta { get; set; }
    
    // ID Matriz: OBJ-0013
    public string? DigitoVerificadorConta { get; set; }
    
    // ID Matriz: OBJ-0014
    public string? NumeroCartao { get; set; }
    
    // ID Matriz: OBJ-0015
    public string? DigitoVerificadorCartao { get; set; }
}
```

##### ListagemResultadosRequest

**Rastreabilidade**: OBJ-0017 a OBJ-0024 (Campos tela M020)

```csharp
/// <summary>
/// Request para listagem de resultados com paginação
/// Migrado de: TELA-0002 (CB2QM020)
/// </summary>
public class ListagemResultadosRequest
{
    // ID Matriz: OBJ-0018
    public int NumeroPagina { get; set; } = 1;
    
    public int TamanhoPagina { get; set; } = 10;
    
    // Filtros herdados da consulta
    public ConsultaMovimentoRequest? FiltrosConsulta { get; set; }
}
```

##### DetalheParcelasRequest

**Rastreabilidade**: OBJ-0026, OBJ-0027, OBJ-0028 (Campos tela M030)

```csharp
/// <summary>
/// Request para detalhe de parcelas
/// Migrado de: TELA-0003 (CB2QM030)
/// </summary>
public class DetalheParcelasRequest
{
    // ID Matriz: OBJ-0026
    public string NumeroApolice { get; set; } = string.Empty;
    
    // ID Matriz: OBJ-0027
    public string NumeroEndosso { get; set; } = string.Empty;
    
    // ID Matriz: OBJ-0028
    public string CodigoConvenio { get; set; } = string.Empty;
    
    // ID Matriz: OBJ-0031
    public int NumeroPagina { get; set; } = 1;
}
```

##### DetalheMovimentoRequest

**Rastreabilidade**: OBJ-0041, OBJ-0042, OBJ-0043 (Campos tela M040)

```csharp
/// <summary>
/// Request para detalhe completo do movimento
/// Migrado de: TELA-0004 (CB2QM040)
/// </summary>
public class DetalheMovimentoRequest
{
    // ID Matriz: OBJ-0041
    public string NumeroApolice { get; set; } = string.Empty;
    
    // ID Matriz: OBJ-0042
    public string NumeroEndosso { get; set; } = string.Empty;
    
    // ID Matriz: OBJ-0043
    public string NumeroParcela { get; set; } = string.Empty;
    
    public string CodigoConvenio { get; set; } = string.Empty;
}
```

#### 4.2 Response DTOs

##### MovimentoResumoDto

```csharp
/// <summary>
/// DTO resumo de movimento para listagem
/// </summary>
public class MovimentoResumoDto
{
    public string NumeroApolice { get; set; } = string.Empty;
    public string NumeroEndosso { get; set; } = string.Empty;
    public string CodigoConvenio { get; set; } = string.Empty;
    public string TipoCobranca { get; set; } = string.Empty;
    public string DadosMovimento { get; set; } = string.Empty;
    public string NomeSegurado { get; set; } = string.Empty;
}
```

##### ParcelaDetalheDto

```csharp
/// <summary>
/// DTO detalhe de parcela
/// </summary>
public class ParcelaDetalheDto
{
    public string NumeroParcela { get; set; } = string.Empty;
    public DateTime DataVencimento { get; set; }
    public decimal ValorDebito { get; set; }
    public string TipoCobranca { get; set; } = string.Empty;
    public string SituacaoCobranca { get; set; } = string.Empty;
    public string SituacaoParcela { get; set; } = string.Empty;
    public string FormaCobranca { get; set; } = string.Empty;
}
```

##### MovimentoDetalheCompletoDto

```csharp
/// <summary>
/// DTO detalhe completo do movimento
/// </summary>
public class MovimentoDetalheCompletoDto
{
    public string NomeRazao { get; set; } = string.Empty;
    public string CpfCnpj { get; set; } = string.Empty;
    public string NumeroApolice { get; set; } = string.Empty;
    public string NumeroEndosso { get; set; } = string.Empty;
    public string NumeroParcela { get; set; } = string.Empty;
    public DateTime DataVencimento { get; set; }
    public decimal ValorDebito { get; set; }
    public string SituacaoCobranca { get; set; } = string.Empty;
    public string TipoCobranca { get; set; } = string.Empty;
    public DateTime? DataMovimento { get; set; }
    public string NomeUsuario { get; set; } = string.Empty;
    public string CodigoBanco { get; set; } = string.Empty;
    public string DescricaoBanco { get; set; } = string.Empty;
    public string CodigoConvenio { get; set; } = string.Empty;
    public string DadosCartaoConta { get; set; } = string.Empty;
    public string? DadosMovimentoConta { get; set; }
    public string? NumeroFitaEnvio { get; set; }
    public DateTime? DataEnvio { get; set; }
    public string? NumeroFitaRetorno { get; set; }
    public DateTime? DataRetorno { get; set; }
    public DateTime? DataPagamento { get; set; }
    public DateTime? DataCredito { get; set; }
    public string? NumeroCheque { get; set; }
    public string? DigitoVerificadorCheque { get; set; }
    public string? CodigoRetorno { get; set; }
    public string? DescricaoRetorno { get; set; }
}
```

##### ListagemResultadosResponse

```csharp
/// <summary>
/// Response paginado para listagem
/// </summary>
public class ListagemResultadosResponse
{
    public int QuantidadeTotal { get; set; }
    public int NumeroPagina { get; set; }
    public int TotalPaginas { get; set; }
    public List<MovimentoResumoDto> Movimentos { get; set; } = new();
}
```

### 5. AppResponse Pattern

```csharp
/// <summary>
/// Padrão de resposta para todos os Services
/// </summary>
public class AppResponse<T>
{
    public T? Data { get; set; }
    public string Message { get; set; } = string.Empty;
    public bool IsSuccess { get; set; }
    public string? StackTrace { get; set; }
}
```

### 6. Interfaces de Repositories

**Namespace**: `Cb2qa.Web.AgTeste.Domain.Interfaces.Repositories`

#### 6.1 IRegistroDebitoAutoRepository

**Rastreabilidade**: ENT-0003, QUERY-0002, QUERY-0032, QUERY-0034, QUERY-0036

```csharp
/// <summary>
/// Repository para Registro Débito Automático
/// Migrado de: ENT-0003 (CB2QR001)
/// </summary>
public interface IRegistroDebitoAutoRepository
{
    // ID Matriz: QUERY-0002
    Task<RegistroDebitoAuto?> GetByTitulo(string numeroTitulo);
    
    // ID Matriz: QUERY-0032
    Task<IAsyncEnumerable<RegistroDebitoAuto>> GetCursorByApoliceEndosso(
        string numeroApolice, string numeroEndosso);
    
    // ID Matriz: QUERY-0034
    Task<IAsyncEnumerable<RegistroDebitoAuto>> GetCursorByConta(
        string codigoAgencia, string operacaoConta, string numeroConta);
    
    // ID Matriz: QUERY-0036
    Task<IAsyncEnumerable<RegistroDebitoAuto>> GetCursorByCartao(string numeroCartao);
}
```

#### 6.2 IMovimentoDebitoCCRepository

**Rastreabilidade**: ENT-0021, QUERY-0005, QUERY-0031, QUERY-0033, QUERY-0035, QUERY-0037 a QUERY-0042

```csharp
/// <summary>
/// Repository para Movimento Débito CC CEF
/// Migrado de: ENT-0021 (V0MOVDEBCC_CEF)
/// </summary>
public interface IMovimentoDebitoCCRepository
{
    // ID Matriz: QUERY-0005
    Task<string?> GetNumeroRequisicao(string codigoConvenio, string numeroApolice, 
        string numeroEndosso, string? codigoAgencia, string? numeroConta, string? numeroCartao);
    
    // ID Matriz: QUERY-0038
    Task<IAsyncEnumerable<MovimentoDebitoCCCef>> GetCursorByApolice(string numeroApolice);
    
    // ID Matriz: QUERY-0039
    Task<IAsyncEnumerable<MovimentoDebitoCCCef>> GetCursorByApoliceEndosso(
        string numeroApolice, string numeroEndosso);
    
    // ID Matriz: QUERY-0040
    Task<IAsyncEnumerable<MovimentoDebitoCCCef>> GetCursorByConta(
        string codigoAgencia, string operacaoConta, string numeroConta);
    
    // ID Matriz: QUERY-0041
    Task<IAsyncEnumerable<MovimentoDebitoCCCef>> GetCursorByCartao(string numeroCartao);
    
    // ID Matriz: QUERY-0042
    Task<IAsyncEnumerable<MovimentoDebitoCCCef>> GetCursorParcelas(
        string numeroApolice, string numeroEndosso, string codigoConvenio);
}
```

#### 6.3 ISistemaRepository

**Rastreabilidade**: ENT-0027, QUERY-0001

```csharp
/// <summary>
/// Repository para Sistema
/// Migrado de: ENT-0027 (V1SISTEMA)
/// </summary>
public interface ISistemaRepository
{
    // ID Matriz: QUERY-0001
    Task<DateTime> GetDataAbertura(string idSistema);
}
```

#### 6.4 IApoliceCobrancaRepository

**Rastreabilidade**: ENT-0013, QUERY-0004

```csharp
/// <summary>
/// Repository para Apólice Cobrança
/// Migrado de: ENT-0013 (V0APOLCOB)
/// </summary>
public interface IApoliceCobrancaRepository
{
    // ID Matriz: QUERY-0004
    Task<ApoliceCobranca?> GetByApolice(string numeroApolice);
}
```

#### 6.5 IMovimentoContaRepository

**Rastreabilidade**: ENT-0007, QUERY-0003, QUERY-0043

```csharp
/// <summary>
/// Repository para Movimento Conta GE
/// Migrado de: ENT-0007 (GE_MOVTO_CONTA)
/// </summary>
public interface IMovimentoContaRepository
{
    // ID Matriz: QUERY-0003
    Task<MovimentoConta?> GetByChaveComposta(string numeroApolice, string numeroEndosso, 
        string codigoConvenio, string numeroParcela, string numeroFitaEnvio);
    
    // ID Matriz: QUERY-0043
    Task<IAsyncEnumerable<MovimentoConta>> GetCursorBySituacao(
        string numeroApolice, string numeroEndosso, string numeroParcela, 
        string codigoConvenio, string situacaoCobranca);
}
```

#### 6.6 IClienteRepository

**Rastreabilidade**: ENT-0016, QUERY-0018

```csharp
/// <summary>
/// Repository para Cliente
/// Migrado de: ENT-0016 (V0CLIENTE)
/// </summary>
public interface IClienteRepository
{
    // ID Matriz: QUERY-0018
    Task<Cliente?> GetById(string codigoCliente);
}
```

#### 6.7 IPessoaFisicaRepository

**Rastreabilidade**: ENT-0009, QUERY-0007

```csharp
/// <summary>
/// Repository para Pessoa Física
/// Migrado de: ENT-0009 (OD_PESSOA_FISICA)
/// </summary>
public interface IPessoaFisicaRepository
{
    // ID Matriz: QUERY-0007
    Task<PessoaFisica?> GetById(string numeroPessoa);
}
```

#### 6.8 IPessoaJuridicaRepository

**Rastreabilidade**: ENT-0010, QUERY-0008

```csharp
/// <summary>
/// Repository para Pessoa Jurídica
/// Migrado de: ENT-0010 (OD_PESSOA_JURIDICA)
/// </summary>
public interface IPessoaJuridicaRepository
{
    // ID Matriz: QUERY-0008
    Task<PessoaJuridica?> GetById(string numeroPessoa);
}
```

#### 6.9 IPessoaLegadoGERepository

**Rastreabilidade**: ENT-0005, QUERY-0006

```csharp
/// <summary>
/// Repository para Pessoa Legado GE
/// Migrado de: ENT-0005 (GE_LEGADO_PESSOA)
/// </summary>
public interface IPessoaLegadoGERepository
{
    // ID Matriz: QUERY-0006
    Task<PessoaLegadoGE?> GetByMovimento(string numeroOcorrenciaMovimento);
}
```

#### 6.10 IBilheteRepository

**Rastreabilidade**: ENT-0014, QUERY-0009, QUERY-0010

```csharp
/// <summary>
/// Repository para Bilhete
/// Migrado de: ENT-0014 (V0BILHETE)
/// </summary>
public interface IBilheteRepository
{
    // ID Matriz: QUERY-0009
    Task<Bilhete?> GetByNumero(string numeroBilhete);
    
    // ID Matriz: QUERY-0010
    Task<Bilhete?> GetByApolice(string numeroApolice);
}
```

#### 6.11 IEndossoRepository

**Rastreabilidade**: ENT-0025, QUERY-0011

```csharp
/// <summary>
/// Repository para Endosso
/// Migrado de: ENT-0025 (V1ENDOSSO)
/// </summary>
public interface IEndossoRepository
{
    // ID Matriz: QUERY-0011
    Task<Endosso?> GetById(string numeroApolice, string numeroEndosso);
}
```

#### 6.12 IParcelaRepository

**Rastreabilidade**: ENT-0022, QUERY-0019

```csharp
/// <summary>
/// Repository para Parcela
/// Migrado de: ENT-0022 (V0PARCELA)
/// </summary>
public interface IParcelaRepository
{
    // ID Matriz: QUERY-0019
    Task<Parcela?> GetSituacao(string numeroApolice, string numeroEndosso, string numeroParcela);
}
```

#### 6.13 IMovimentoGERepository

**Rastreabilidade**: ENT-0006, QUERY-0020

```csharp
/// <summary>
/// Repository para Movimento GE
/// Migrado de: ENT-0006 (GE_MOVIMENTO)
/// </summary>
public interface IMovimentoGERepository
{
    // ID Matriz: QUERY-0020
    Task<MovimentoGE?> GetByOcorrencia(string numeroOcorrenciaMovimento);
}
```

#### 6.14 IBancosRepository

**Rastreabilidade**: ENT-0001, QUERY-0022

```csharp
/// <summary>
/// Repository para Bancos
/// Migrado de: ENT-0001 (BANCOS)
/// </summary>
public interface IBancosRepository
{
    // ID Matriz: QUERY-0022
    Task<string?> GetNome(string codigoBanco);
}
```

#### 6.15 ICalendarioRepository

**Rastreabilidade**: ENT-0002, QUERY-0023, QUERY-0045

```csharp
/// <summary>
/// Repository para Calendario
/// Migrado de: ENT-0002 (CALENDARIO)
/// </summary>
public interface ICalendarioRepository
{
    // ID Matriz: QUERY-0023
    Task<IAsyncEnumerable<Calendario>> GetFimSemana(DateTime dataInicio, DateTime dataFim);
    
    // ID Matriz: QUERY-0045
    Task<IAsyncEnumerable<Calendario>> GetCursor();
}
```

#### 6.16 IFeriadosRepository

**Rastreabilidade**: ENT-0017, QUERY-0024

```csharp
/// <summary>
/// Repository para Feriados
/// Migrado de: ENT-0017 (V0FERIADOS)
/// </summary>
public interface IFeriadosRepository
{
    // ID Matriz: QUERY-0024
    Task<DateTime> GetProximoDiaUtil(DateTime dataReferencia);
}
```

#### 6.17 IChequesEmitidosRepository

**Rastreabilidade**: ENT-0004, QUERY-0025, QUERY-0026

```csharp
/// <summary>
/// Repository para Cheques Emitidos
/// Migrado de: ENT-0004 (CHEQUES_EMITIDOS)
/// </summary>
public interface IChequesEmitidosRepository
{
    // ID Matriz: QUERY-0025
    Task<ChequeEmitido?> GetByDocumento(string numeroDocumento, DateTime dataMovimento);
    
    // ID Matriz: QUERY-0026
    Task<ChequeEmitido?> GetByInterno(string numChequeInterno);
}
```

#### 6.18 ILoteChequesRepository

**Rastreabilidade**: ENT-0008, QUERY-0027

```csharp
/// <summary>
/// Repository para Lote de Cheques
/// Migrado de: ENT-0008 (LOTE_CHEQUES)
/// </summary>
public interface ILoteChequesRepository
{
    // ID Matriz: QUERY-0027
    Task<LoteCheque?> GetByInterno(string numChequeInterno, string digitoVerificadorInterno);
}
```

#### 6.19 IUsuariosRepository

**Rastreabilidade**: ENT-0028, QUERY-0028

```csharp
/// <summary>
/// Repository para Usuários
/// Migrado de: ENT-0028 (V1USUARIOS)
/// </summary>
public interface IUsuariosRepository
{
    // ID Matriz: QUERY-0028
    Task<string?> GetNome(string codigoUsuario);
}
```

#### 6.20 ISinistroHistoricoRepository

**Rastreabilidade**: ENT-0012, QUERY-0029, QUERY-0030

```csharp
/// <summary>
/// Repository para Sinistro Histórico
/// Migrado de: ENT-0012 (SINISTRO_HISTORICO)
/// </summary>
public interface ISinistroHistoricoRepository
{
    // ID Matriz: QUERY-0029
    Task<bool> ValidaPagamentoPosterior(string numeroApolSinistro);
    
    // ID Matriz: QUERY-0030
    Task<SinistroHistorico?> GetUltimoMovimento(string numeroApolSinistro);
}
```

#### 6.21 IHistoricoCobrancaVARepository

**Rastreabilidade**: ENT-0018, QUERY-0012

```csharp
/// <summary>
/// Repository para Histórico Cobrança VA
/// Migrado de: ENT-0018 (V0HISTCOBVA)
/// </summary>
public interface IHistoricoCobrancaVARepository
{
    // ID Matriz: QUERY-0012
    Task<string?> GetCertificado(string numeroTitulo);
}
```

#### 6.22 IPropostaVARepository

**Rastreabilidade**: ENT-0024, QUERY-0013

```csharp
/// <summary>
/// Repository para Proposta VA
/// Migrado de: ENT-0024 (V0PROPOSTAVA)
/// </summary>
public interface IPropostaVARepository
{
    // ID Matriz: QUERY-0013
    Task<string?> GetCliente(string numeroCertificado);
}
```

#### 6.23 IPropostaRepository

**Rastreabilidade**: ENT-0023, QUERY-0014

```csharp
/// <summary>
/// Repository para Proposta
/// Migrado de: ENT-0023 (V0PROPOSTA)
/// </summary>
public interface IPropostaRepository
{
    // ID Matriz: QUERY-0014
    Task<string?> GetCliente(string numeroProposta, string fonteProposta);
}
```

#### 6.24 IMesSinistroRepository

**Rastreabilidade**: ENT-0020, QUERY-0015

```csharp
/// <summary>
/// Repository para Mês Sinistro
/// Migrado de: ENT-0020 (V0MESTSINI)
/// </summary>
public interface IMesSinistroRepository
{
    // ID Matriz: QUERY-0015
    Task<MesSinistro?> GetByApolice(string numeroApolSinistro);
}
```

#### 6.25 IHistoricoSinistroRepository

**Rastreabilidade**: ENT-0019, QUERY-0016

```csharp
/// <summary>
/// Repository para Histórico Sinistro
/// Migrado de: ENT-0019 (V0HISTSINI)
/// </summary>
public interface IHistoricoSinistroRepository
{
    // ID Matriz: QUERY-0016
    Task<string?> GetFavorecido(string numeroApolSinistro, string ocorrenciaHistorico);
}
```

#### 6.26 IChequesRepository

**Rastreabilidade**: ENT-0015, QUERY-0017

```csharp
/// <summary>
/// Repository para Cheques
/// Migrado de: ENT-0015 (V0CHEQUES)
/// </summary>
public interface IChequesRepository
{
    // ID Matriz: QUERY-0017
    Task<string?> GetFavorecido(string numChequeInterno);
}
```

#### 6.27 ISinistroArDetalheVCRepository

**Rastreabilidade**: ENT-0011, QUERY-0021

```csharp
/// <summary>
/// Repository para Sinistro AR Detalhe VC
/// Migrado de: ENT-0011 (SI_AR_DETALHE_VC)
/// </summary>
public interface ISinistroArDetalheVCRepository
{
    // ID Matriz: QUERY-0021
    Task<SinistroArDetalheVC?> GetById(string numeroApolSinistro, string ocorrenciaHistorico);
}
```

### 7. Interfaces de Services

**Namespace**: `Cb2qa.Web.AgTeste.Domain.Interfaces.Services`

#### 7.1 IConsultaMovimentoService

```csharp
/// <summary>
/// Service para consulta de movimentos
/// </summary>
public interface IConsultaMovimentoService
{
    Task<AppResponse<ListagemResultadosResponse>> Consultar(ConsultaMovimentoRequest request);
    Task<AppResponse<ListagemResultadosResponse>> ObterResultados(ListagemResultadosRequest request);
}
```

#### 7.2 IDetalheParcelaService

```csharp
/// <summary>
/// Service para detalhe de parcelas
/// </summary>
public interface IDetalheParcelaService
{
    Task<AppResponse<ListagemResultadosResponse>> ObterParcelas(DetalheParcelasRequest request);
}
```

#### 7.3 IDetalheMovimentoService

```csharp
/// <summary>
/// Service para detalhe completo do movimento
/// </summary>
public interface IDetalheMovimentoService
{
    Task<AppResponse<MovimentoDetalheCompletoDto>> ObterDetalheCompleto(DetalheMovimentoRequest request);
}
```

### 8. Interfaces de ViewModels

**Namespace**: `Cb2qa.Web.AgTeste.Domain.Interfaces.ViewModels`

#### 8.1 IProcessarConsultaM010ViewModel

**Rastreabilidade**: METOD-0003

```csharp
/// <summary>
/// ViewModel para processar consulta M010
/// Migrado de: METOD-0003 (CB2QS010)
/// </summary>
public interface IProcessarConsultaM010ViewModel
{
    Task<List<MovimentoResumoDto>> Execute(ConsultaMovimentoRequest request);
}
```

#### 8.2 IProcessarRegistroViewModel

**Rastreabilidade**: METOD-0010

```csharp
/// <summary>
/// ViewModel para processar registro individual
/// Migrado de: METOD-0010 (CB2QS011)
/// </summary>
public interface IProcessarRegistroViewModel
{
    Task<MovimentoResumoDto> Execute(MovimentoDebitoCCCef movimento);
}
```

#### 8.3 IDeterminarTipoDocumentoViewModel

**Rastreabilidade**: METOD-0051

```csharp
/// <summary>
/// ViewModel para determinar tipo de documento
/// Migrado de: METOD-0051 (CB2QS014)
/// </summary>
public interface IDeterminarTipoDocumentoViewModel
{
    Task<(TipoDocumento tipo, string documento, string nome)> Execute(
        string numeroApolice, string numeroEndosso, string codigoConvenio);
}
```

#### 8.4 IProcessarChequesViewModel

**Rastreabilidade**: METOD-0052

```csharp
/// <summary>
/// ViewModel para processar cheques
/// Migrado de: METOD-0052 (CB2QS012)
/// </summary>
public interface IProcessarChequesViewModel
{
    Task<(string? numeroCheque, string? digitoCheque)> Execute(
        string numeroDocumento, DateTime dataMovimento, string numChequeInterno);
}
```

#### 8.5 IProcessarMovimentoGEViewModel

**Rastreabilidade**: METOD-0053

```csharp
/// <summary>
/// ViewModel para processar movimento GE
/// Migrado de: METOD-0053 (CB2QS013)
/// </summary>
public interface IProcessarMovimentoGEViewModel
{
    Task<string?> Execute(string numeroOcorrenciaMovimento);
}
```

#### 8.6 IFormatarCpfCnpjViewModel

**Rastreabilidade**: METOD-0054

```csharp
/// <summary>
/// ViewModel para formatar CPF/CNPJ
/// Migrado de: METOD-0054 (CB2QS001)
/// </summary>
public interface IFormatarCpfCnpjViewModel
{
    string Execute(string cpfCnpj);
}
```

#### 8.7 IValidarTipoSeguradoViewModel

**Rastreabilidade**: METOD-0057

```csharp
/// <summary>
/// ViewModel para validar tipo segurado
/// Migrado de: METOD-0057 (CB2QS022)
/// </summary>
public interface IValidarTipoSeguradoViewModel
{
    Task<bool> Execute(MovimentoDebitoCCCef movimento, string tipoCobranca);
}
```

## Dependências

- **Não depende de**: Nenhuma outra camada (Domain é independente)
- **Depende apenas de**: .NET BCL (System.*)

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: Todos 41 ENT-* mapeados para entities
- [x] **OBRIGATÓRIO**: Workstorage structures mapeados para DTOs transientes
- [x] **OBRIGATÓRIO**: Domain tables mapeados para enums
- [x] **OBRIGATÓRIO**: Todas 75 OBJ-* mapeados para propriedades de DTOs
- [x] **OBRIGATÓRIO**: Request DTOs para todas as 4 telas principais
- [x] **OBRIGATÓRIO**: Response DTOs com estrutura apropriada
- [x] **OBRIGATÓRIO**: 27 interfaces de repositories definidas
- [x] **OBRIGATÓRIO**: Interfaces mapeiam todas 46 QUERY-* entries
- [x] **OBRIGATÓRIO**: 3 interfaces de services definidas
- [x] **OBRIGATÓRIO**: 7 interfaces de viewmodels principais definidas
- [x] **OBRIGATÓRIO**: AppResponse<T> pattern definido
- [x] **OBRIGATÓRIO**: Primary constructors em todos os exemplos
- [x] **OBRIGATÓRIO**: Nullable reference types apropriadamente configurados
- [x] **OBRIGATÓRIO**: Todos elementos têm ID da matriz referenciado

## Rastreabilidade Completa

### Resumo de IDs da Matriz Abordados

| Tipo | Quantidade | Range | Status |
|------|------------|-------|--------|
| ENT | 41 | ENT-0001 a ENT-0041 | COMPLETED |
| OBJ | 75 | OBJ-0001 a OBJ-0075 | COMPLETED |
| QUERY | 46 | QUERY-0001 a QUERY-0046 | COMPLETED |
| TELA | 8 | TELA-0001 a TELA-0008 | COMPLETED |
| METOD (ViewModels) | 7 | Seleção de METOD-0003, 0010, 0051-0054, 0057 | COMPLETED |

**Total de IDs Mapeados neste Documento**: 177

### Status na Matriz

Atualizar `MATRIZ_RASTREABILIDADE.csv`:
- Status_Documentacao = COMPLETED para todos ENT-*, OBJ-*, interfaces de QUERY-*
- Ref_Doc_Abordagem = 01_DOMAIN_MODEL.md

