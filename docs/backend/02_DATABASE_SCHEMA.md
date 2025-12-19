# 02 - DATABASE SCHEMA

## Objetivo

Definir o schema completo do banco de dados SQL Server para o sistema CB2QA, mapeando as 28 tabelas principais (ENT-0001 a ENT-0028) do mainframe DB2 para SQL Server, incluindo DDL, índices otimizados baseados nos padrões de consulta (QUERY-0001 a QUERY-0046), e estratégia de migração de dados.

## Mapeamento de Legado

### Origem
- **Sistema Legado**: DB2 Mainframe
- **Arquivo**: `_LEGADO/cb2qa.esf`, linha 21
- **Tabelas**: 28 tabelas principais (ENT-0001 a ENT-0028)
- **Queries**: 46 padrões de consulta (QUERY-0001 a QUERY-0046)

### Destino
- **SGBD**: SQL Server 2019+
- **Schema**: `dbo`
- **Database**: `Cb2qaAgTeste`
- **Collation**: `Latin1_General_CI_AS`

## Especificação Técnica

### 1. Tabelas Principais

#### 1.1 BANCOS

**Rastreabilidade**:
- **ID Matriz**: `ENT-0001`
- **Tabela Legado**: BANCOS
- **Queries Relacionadas**: QUERY-0022

```sql
-- ID Matriz: ENT-0001
-- Origem: BANCOS
CREATE TABLE dbo.Bancos (
    CodigoBanco VARCHAR(10) NOT NULL,
    NomeBanco VARCHAR(100) NOT NULL,
    DescricaoBanco VARCHAR(255) NULL,
    Ativo BIT NOT NULL DEFAULT 1,
    DataCriacao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    DataAtualizacao DATETIME2 NULL,
    
    CONSTRAINT PK_Bancos PRIMARY KEY (CodigoBanco)
);

-- ID Matriz: QUERY-0022 - Busca nome banco
CREATE INDEX IX_Bancos_Ativo ON dbo.Bancos (Ativo) WHERE Ativo = 1;
```

**Mapeamento de Campos**:

| Campo Legado | Campo Moderno | Tipo Legado | Tipo SQL Server | Nullable |
|--------------|---------------|-------------|-----------------|----------|
| COD_BANCO | CodigoBanco | CHAR(10) | VARCHAR(10) | NOT NULL |
| NOM_BANCO | NomeBanco | VARCHAR(100) | VARCHAR(100) | NOT NULL |
| DESC_BANCO | DescricaoBanco | VARCHAR(255) | VARCHAR(255) | NULL |

#### 1.2 CALENDARIO

**Rastreabilidade**:
- **ID Matriz**: `ENT-0002`
- **Tabela Legado**: CALENDARIO
- **Queries Relacionadas**: QUERY-0023, QUERY-0045

```sql
-- ID Matriz: ENT-0002
-- Origem: CALENDARIO
CREATE TABLE dbo.Calendario (
    DataCalendario DATE NOT NULL,
    DiaSemana CHAR(1) NOT NULL,
    IsFimSemana BIT NOT NULL DEFAULT 0,
    IsFeriado BIT NOT NULL DEFAULT 0,
    DescricaoFeriado VARCHAR(100) NULL,
    
    CONSTRAINT PK_Calendario PRIMARY KEY (DataCalendario),
    CONSTRAINT CHK_Calendario_DiaSemana CHECK (DiaSemana IN ('D', 'S', 'T', 'Q', 'Q', 'S', 'D'))
);

-- ID Matriz: QUERY-0023 - Busca fim de semana
CREATE INDEX IX_Calendario_FimSemana ON dbo.Calendario (DataCalendario) 
    WHERE DiaSemana IN ('S', 'D');

-- ID Matriz: QUERY-0045 - Cursor calendario
CREATE INDEX IX_Calendario_Data ON dbo.Calendario (DataCalendario);
```

#### 1.3 CB2QR001 (RegistroDebitoAuto)

**Rastreabilidade**:
- **ID Matriz**: `ENT-0003`
- **Tabela Legado**: CB2QR001 - Registro Débito Automático
- **Queries Relacionadas**: QUERY-0002, QUERY-0032, QUERY-0034, QUERY-0036

```sql
-- ID Matriz: ENT-0003
-- Origem: CB2QR001
-- Tabela principal do sistema
CREATE TABLE dbo.RegistroDebitoAuto (
    NumeroApolice VARCHAR(20) NOT NULL,
    NumeroEndosso VARCHAR(10) NOT NULL,
    CodigoConvenio VARCHAR(10) NOT NULL,
    TipoCobranca CHAR(1) NOT NULL,
    CodigoAgencia VARCHAR(10) NULL,
    OperacaoConta VARCHAR(5) NULL,
    NumeroConta VARCHAR(20) NULL,
    DigitoVerificadorConta CHAR(1) NULL,
    NumeroCartao VARCHAR(20) NULL,
    DigitoVerificadorCartao CHAR(1) NULL,
    DataInclusao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    DataAlteracao DATETIME2 NULL,
    UsuarioInclusao VARCHAR(50) NULL,
    UsuarioAlteracao VARCHAR(50) NULL,
    
    CONSTRAINT PK_RegistroDebitoAuto PRIMARY KEY (NumeroApolice, NumeroEndosso),
    CONSTRAINT CHK_RegistroDebitoAuto_TipoCobranca CHECK (TipoCobranca IN ('1', '2', '3')),
    CONSTRAINT FK_RegistroDebitoAuto_Endosso FOREIGN KEY (NumeroApolice, NumeroEndosso) 
        REFERENCES dbo.Endosso(NumeroApolice, NumeroEndosso)
);

-- ID Matriz: QUERY-0002 - Busca por título (via join)
CREATE INDEX IX_RegistroDebitoAuto_Apolice ON dbo.RegistroDebitoAuto (NumeroApolice);

-- ID Matriz: QUERY-0032 - Cursor por apolice/endosso
CREATE INDEX IX_RegistroDebitoAuto_ApoliceEndosso ON dbo.RegistroDebitoAuto 
    (NumeroApolice, NumeroEndosso);

-- ID Matriz: QUERY-0034 - Cursor por conta
CREATE INDEX IX_RegistroDebitoAuto_Conta ON dbo.RegistroDebitoAuto 
    (CodigoAgencia, OperacaoConta, NumeroConta) 
    WHERE TipoCobranca = '1';

-- ID Matriz: QUERY-0036 - Cursor por cartão
CREATE INDEX IX_RegistroDebitoAuto_Cartao ON dbo.RegistroDebitoAuto 
    (NumeroCartao) 
    WHERE TipoCobranca = '2';
```

#### 1.4 CHEQUES_EMITIDOS

**Rastreabilidade**:
- **ID Matriz**: `ENT-0004`
- **Tabela Legado**: CHEQUES_EMITIDOS
- **Queries Relacionadas**: QUERY-0025, QUERY-0026

```sql
-- ID Matriz: ENT-0004
-- Origem: CHEQUES_EMITIDOS
CREATE TABLE dbo.ChequesEmitidos (
    CodigoEmpresa VARCHAR(10) NOT NULL,
    TipoMovimento CHAR(1) NOT NULL,
    NumeroDocumento VARCHAR(20) NOT NULL,
    DataMovimento DATE NOT NULL,
    NumChequeInterno VARCHAR(20) NOT NULL,
    DigitoVerificador CHAR(1) NULL,
    ValorCheque DECIMAL(18,2) NOT NULL,
    Favorecido VARCHAR(100) NULL,
    
    CONSTRAINT PK_ChequesEmitidos PRIMARY KEY (NumChequeInterno),
    CONSTRAINT CHK_ChequesEmitidos_Valor CHECK (ValorCheque >= 0)
);

-- ID Matriz: QUERY-0025 - Busca por documento e data
CREATE INDEX IX_ChequesEmitidos_Documento ON dbo.ChequesEmitidos 
    (NumeroDocumento, DataMovimento) 
    WHERE CodigoEmpresa = '0' AND TipoMovimento = '3';

-- ID Matriz: QUERY-0026 - Busca por cheque interno
CREATE INDEX IX_ChequesEmitidos_Interno ON dbo.ChequesEmitidos (NumChequeInterno);
```

#### 1.5 GE_LEGADO_PESSOA

**Rastreabilidade**:
- **ID Matriz**: `ENT-0005`
- **Tabela Legado**: GE_LEGADO_PESSOA
- **Queries Relacionadas**: QUERY-0006

```sql
-- ID Matriz: ENT-0005
-- Origem: GE_LEGADO_PESSOA
CREATE TABLE dbo.PessoaLegadoGE (
    NumeroOcorrenciaMovimento VARCHAR(30) NOT NULL,
    NumeroPessoa VARCHAR(20) NOT NULL,
    TipoPessoa CHAR(1) NOT NULL,
    CpfCnpj VARCHAR(20) NULL,
    NomeRazaoSocial VARCHAR(200) NULL,
    
    CONSTRAINT PK_PessoaLegadoGE PRIMARY KEY (NumeroOcorrenciaMovimento),
    CONSTRAINT CHK_PessoaLegadoGE_TipoPessoa CHECK (TipoPessoa IN ('F', 'J'))
);

-- ID Matriz: QUERY-0006 - Busca por movimento
CREATE INDEX IX_PessoaLegadoGE_Movimento ON dbo.PessoaLegadoGE (NumeroOcorrenciaMovimento);
CREATE INDEX IX_PessoaLegadoGE_Pessoa ON dbo.PessoaLegadoGE (NumeroPessoa);
```

#### 1.6 GE_MOVIMENTO

**Rastreabilidade**:
- **ID Matriz**: `ENT-0006`
- **Tabela Legado**: GE_MOVIMENTO
- **Queries Relacionadas**: QUERY-0020

```sql
-- ID Matriz: ENT-0006
-- Origem: GE_MOVIMENTO
CREATE TABLE dbo.MovimentoGE (
    NumeroOcorrenciaMovimento VARCHAR(30) NOT NULL,
    DataMovimento DATE NOT NULL,
    TipoMovimento VARCHAR(10) NOT NULL,
    ValorMovimento DECIMAL(18,2) NOT NULL DEFAULT 0,
    Observacao VARCHAR(500) NULL,
    
    CONSTRAINT PK_MovimentoGE PRIMARY KEY (NumeroOcorrenciaMovimento)
);

-- ID Matriz: QUERY-0020 - Busca por ocorrência
CREATE INDEX IX_MovimentoGE_Ocorrencia ON dbo.MovimentoGE (NumeroOcorrenciaMovimento);
CREATE INDEX IX_MovimentoGE_Data ON dbo.MovimentoGE (DataMovimento);
```

#### 1.7 GE_MOVTO_CONTA

**Rastreabilidade**:
- **ID Matriz**: `ENT-0007`
- **Tabela Legado**: GE_MOVTO_CONTA
- **Queries Relacionadas**: QUERY-0003, QUERY-0043, QUERY-0046

```sql
-- ID Matriz: ENT-0007
-- Origem: GE_MOVTO_CONTA
CREATE TABLE dbo.MovimentoConta (
    NumeroApolice VARCHAR(20) NOT NULL,
    NumeroEndosso VARCHAR(10) NOT NULL,
    CodigoConvenio VARCHAR(10) NOT NULL,
    NumeroParcela VARCHAR(5) NOT NULL,
    NumeroFitaEnvio VARCHAR(20) NOT NULL,
    DataMovimento DATE NULL,
    ValorDebito DECIMAL(18,2) NULL,
    ValorCredito DECIMAL(18,2) NULL,
    SituacaoCobranca CHAR(1) NULL,
    
    CONSTRAINT PK_MovimentoConta PRIMARY KEY (NumeroApolice, NumeroEndosso, CodigoConvenio, NumeroParcela, NumeroFitaEnvio)
);

-- ID Matriz: QUERY-0003 - Busca por chave composta
CREATE INDEX IX_MovimentoConta_ChaveComposta ON dbo.MovimentoConta 
    (NumeroApolice, NumeroEndosso, CodigoConvenio, NumeroParcela, NumeroFitaEnvio);

-- ID Matriz: QUERY-0043 - Cursor por situação
CREATE INDEX IX_MovimentoConta_Situacao ON dbo.MovimentoConta 
    (NumeroApolice, NumeroEndosso, NumeroParcela, CodigoConvenio, SituacaoCobranca);

-- ID Matriz: QUERY-0046 - Cursor geral
CREATE INDEX IX_MovimentoConta_Data ON dbo.MovimentoConta (DataMovimento);
```

#### 1.8 LOTE_CHEQUES

**Rastreabilidade**:
- **ID Matriz**: `ENT-0008`
- **Tabela Legado**: LOTE_CHEQUES
- **Queries Relacionadas**: QUERY-0027

```sql
-- ID Matriz: ENT-0008
-- Origem: LOTE_CHEQUES
CREATE TABLE dbo.LoteCheques (
    NumChequeInterno VARCHAR(20) NOT NULL,
    DigitoVerificadorInterno CHAR(1) NOT NULL,
    CodigoBanco VARCHAR(10) NOT NULL,
    NumeroAgencia VARCHAR(10) NOT NULL,
    NumeroConta VARCHAR(20) NOT NULL,
    NumeroCheque VARCHAR(20) NOT NULL,
    DataEmissao DATE NULL,
    
    CONSTRAINT PK_LoteCheques PRIMARY KEY (NumChequeInterno, DigitoVerificadorInterno),
    CONSTRAINT FK_LoteCheques_Banco FOREIGN KEY (CodigoBanco) 
        REFERENCES dbo.Bancos(CodigoBanco)
);

-- ID Matriz: QUERY-0027 - Busca por interno
CREATE INDEX IX_LoteCheques_Interno ON dbo.LoteCheques 
    (NumChequeInterno, DigitoVerificadorInterno);
```

#### 1.9 OD_PESSOA_FISICA

**Rastreabilidade**:
- **ID Matriz**: `ENT-0009`
- **Tabela Legado**: OD_PESSOA_FISICA
- **Queries Relacionadas**: QUERY-0007

```sql
-- ID Matriz: ENT-0009
-- Origem: OD_PESSOA_FISICA
CREATE TABLE dbo.PessoaFisica (
    NumeroPessoa VARCHAR(20) NOT NULL,
    Cpf VARCHAR(14) NOT NULL,
    NomeCompleto VARCHAR(200) NOT NULL,
    DataNascimento DATE NULL,
    Sexo CHAR(1) NULL,
    
    CONSTRAINT PK_PessoaFisica PRIMARY KEY (NumeroPessoa),
    CONSTRAINT UK_PessoaFisica_Cpf UNIQUE (Cpf),
    CONSTRAINT CHK_PessoaFisica_Sexo CHECK (Sexo IN ('M', 'F', 'O'))
);

-- ID Matriz: QUERY-0007 - Busca por número pessoa
CREATE INDEX IX_PessoaFisica_NumeroPessoa ON dbo.PessoaFisica (NumeroPessoa);
CREATE INDEX IX_PessoaFisica_Cpf ON dbo.PessoaFisica (Cpf);
```

#### 1.10 OD_PESSOA_JURIDICA

**Rastreabilidade**:
- **ID Matriz**: `ENT-0010`
- **Tabela Legado**: OD_PESSOA_JURIDICA
- **Queries Relacionadas**: QUERY-0008

```sql
-- ID Matriz: ENT-0010
-- Origem: OD_PESSOA_JURIDICA
CREATE TABLE dbo.PessoaJuridica (
    NumeroPessoa VARCHAR(20) NOT NULL,
    Cnpj VARCHAR(18) NOT NULL,
    RazaoSocial VARCHAR(200) NOT NULL,
    NomeFantasia VARCHAR(200) NULL,
    DataAbertura DATE NULL,
    
    CONSTRAINT PK_PessoaJuridica PRIMARY KEY (NumeroPessoa),
    CONSTRAINT UK_PessoaJuridica_Cnpj UNIQUE (Cnpj)
);

-- ID Matriz: QUERY-0008 - Busca por número pessoa
CREATE INDEX IX_PessoaJuridica_NumeroPessoa ON dbo.PessoaJuridica (NumeroPessoa);
CREATE INDEX IX_PessoaJuridica_Cnpj ON dbo.PessoaJuridica (Cnpj);
```

#### 1.11 SI_AR_DETALHE_VC

**Rastreabilidade**:
- **ID Matriz**: `ENT-0011`
- **Tabela Legado**: SI_AR_DETALHE_VC
- **Queries Relacionadas**: QUERY-0021

```sql
-- ID Matriz: ENT-0011
-- Origem: SI_AR_DETALHE_VC
CREATE TABLE dbo.SinistroArDetalheVC (
    NumeroApolSinistro VARCHAR(20) NOT NULL,
    OcorrenciaHistorico VARCHAR(20) NOT NULL,
    ValorTotalMovimento DECIMAL(18,2) NOT NULL DEFAULT 0,
    CgcCpf VARCHAR(20) NULL,
    NomeFavorecido VARCHAR(200) NULL,
    
    CONSTRAINT PK_SinistroArDetalheVC PRIMARY KEY (NumeroApolSinistro, OcorrenciaHistorico)
);

-- ID Matriz: QUERY-0021 - Busca por chave composta
CREATE INDEX IX_SinistroArDetalheVC_Chave ON dbo.SinistroArDetalheVC 
    (NumeroApolSinistro, OcorrenciaHistorico);
```

#### 1.12 SINISTRO_HISTORICO

**Rastreabilidade**:
- **ID Matriz**: `ENT-0012`
- **Tabela Legado**: SINISTRO_HISTORICO
- **Queries Relacionadas**: QUERY-0029, QUERY-0030

```sql
-- ID Matriz: ENT-0012
-- Origem: SINISTRO_HISTORICO
CREATE TABLE dbo.SinistroHistorico (
    NumeroApolSinistro VARCHAR(20) NOT NULL,
    CodigoOperacao VARCHAR(10) NOT NULL,
    DataMovimento DATE NOT NULL,
    HoraMovimento TIME NOT NULL,
    ValorMovimento DECIMAL(18,2) NULL,
    TipoHistorico VARCHAR(5) NULL,
    
    CONSTRAINT PK_SinistroHistorico PRIMARY KEY (NumeroApolSinistro, CodigoOperacao, DataMovimento, HoraMovimento)
);

-- ID Matriz: QUERY-0029 - Valida pagamento posterior (subquery EXISTS)
CREATE INDEX IX_SinistroHistorico_Apolice ON dbo.SinistroHistorico (NumeroApolSinistro);

-- ID Matriz: QUERY-0030 - Busca último movimento (MAX)
CREATE INDEX IX_SinistroHistorico_DataHora ON dbo.SinistroHistorico 
    (NumeroApolSinistro, DataMovimento DESC, HoraMovimento DESC) 
    WHERE CodigoOperacao IN ('1050', '2050', '3050');
```

#### 1.13 V0APOLCOB

**Rastreabilidade**:
- **ID Matriz**: `ENT-0013`
- **Tabela Legado**: V0APOLCOB
- **Queries Relacionadas**: QUERY-0004

```sql
-- ID Matriz: ENT-0013
-- Origem: V0APOLCOB
CREATE TABLE dbo.ApoliceCobranca (
    NumeroApolice VARCHAR(20) NOT NULL,
    CodigoConvenio VARCHAR(10) NULL,
    CodigoAgencia VARCHAR(10) NULL,
    OperacaoConta VARCHAR(5) NULL,
    NumeroConta VARCHAR(20) NULL,
    DigitoVerificadorConta CHAR(1) NULL,
    NumeroCartao VARCHAR(20) NULL,
    TipoCobranca CHAR(1) NULL,
    
    CONSTRAINT PK_ApoliceCobranca PRIMARY KEY (NumeroApolice),
    CONSTRAINT CHK_ApoliceCobranca_TipoCobranca CHECK (TipoCobranca IN ('1', '2', '3'))
);

-- ID Matriz: QUERY-0004 - Busca por apólice
CREATE INDEX IX_ApoliceCobranca_Apolice ON dbo.ApoliceCobranca (NumeroApolice);
```

#### 1.14 V0BILHETE

**Rastreabilidade**:
- **ID Matriz**: `ENT-0014`
- **Tabela Legado**: V0BILHETE
- **Queries Relacionadas**: QUERY-0009, QUERY-0010

```sql
-- ID Matriz: ENT-0014
-- Origem: V0BILHETE
CREATE TABLE dbo.Bilhetes (
    NumeroBilhete VARCHAR(20) NOT NULL,
    NumeroApolice VARCHAR(20) NOT NULL,
    DataEmissao DATE NULL,
    CodigoCliente VARCHAR(20) NULL,
    
    CONSTRAINT PK_Bilhetes PRIMARY KEY (NumeroBilhete),
    CONSTRAINT FK_Bilhetes_Cliente FOREIGN KEY (CodigoCliente) 
        REFERENCES dbo.Clientes(CodigoCliente)
);

-- ID Matriz: QUERY-0009 - Busca por número bilhete
CREATE INDEX IX_Bilhetes_Numero ON dbo.Bilhetes (NumeroBilhete);

-- ID Matriz: QUERY-0010 - Busca por apólice
CREATE INDEX IX_Bilhetes_Apolice ON dbo.Bilhetes (NumeroApolice);
```

#### 1.15 V0CHEQUES

**Rastreabilidade**:
- **ID Matriz**: `ENT-0015`
- **Tabela Legado**: V0CHEQUES
- **Queries Relacionadas**: QUERY-0017

```sql
-- ID Matriz: ENT-0015
-- Origem: V0CHEQUES
CREATE TABLE dbo.Cheques (
    NumChequeInterno VARCHAR(20) NOT NULL,
    NumeroCheque VARCHAR(20) NOT NULL,
    CodigoBanco VARCHAR(10) NOT NULL,
    NomeFavorecido VARCHAR(200) NULL,
    ValorCheque DECIMAL(18,2) NULL,
    
    CONSTRAINT PK_Cheques PRIMARY KEY (NumChequeInterno),
    CONSTRAINT FK_Cheques_Banco FOREIGN KEY (CodigoBanco) 
        REFERENCES dbo.Bancos(CodigoBanco)
);

-- ID Matriz: QUERY-0017 - Busca favorecido por cheque interno
CREATE INDEX IX_Cheques_Interno ON dbo.Cheques (NumChequeInterno);
```

#### 1.16 V0CLIENTE

**Rastreabilidade**:
- **ID Matriz**: `ENT-0016`
- **Tabela Legado**: V0CLIENTE
- **Queries Relacionadas**: QUERY-0018

```sql
-- ID Matriz: ENT-0016
-- Origem: V0CLIENTE
CREATE TABLE dbo.Clientes (
    CodigoCliente VARCHAR(20) NOT NULL,
    NomeRazao VARCHAR(200) NOT NULL,
    CpfCnpj VARCHAR(20) NULL,
    TipoPessoa CHAR(1) NOT NULL,
    
    CONSTRAINT PK_Clientes PRIMARY KEY (CodigoCliente),
    CONSTRAINT CHK_Clientes_TipoPessoa CHECK (TipoPessoa IN ('F', 'J'))
);

-- ID Matriz: QUERY-0018 - Busca por código cliente
CREATE INDEX IX_Clientes_Codigo ON dbo.Clientes (CodigoCliente);
CREATE INDEX IX_Clientes_CpfCnpj ON dbo.Clientes (CpfCnpj);
```

#### 1.17 V0FERIADOS

**Rastreabilidade**:
- **ID Matriz**: `ENT-0017`
- **Tabela Legado**: V0FERIADOS
- **Queries Relacionadas**: QUERY-0024

```sql
-- ID Matriz: ENT-0017
-- Origem: V0FERIADOS
CREATE TABLE dbo.Feriados (
    DataFeriado DATE NOT NULL,
    DescricaoFeriado VARCHAR(100) NOT NULL,
    TipoFeriado VARCHAR(20) NULL,
    
    CONSTRAINT PK_Feriados PRIMARY KEY (DataFeriado)
);

-- ID Matriz: QUERY-0024 - Busca feriado com cálculo próximo dia
CREATE INDEX IX_Feriados_Data ON dbo.Feriados (DataFeriado);
```

#### 1.18 V0HISTCOBVA

**Rastreabilidade**:
- **ID Matriz**: `ENT-0018`
- **Tabela Legado**: V0HISTCOBVA
- **Queries Relacionadas**: QUERY-0012

```sql
-- ID Matriz: ENT-0018
-- Origem: V0HISTCOBVA
CREATE TABLE dbo.HistoricoCobrancaVA (
    NumeroTitulo VARCHAR(20) NOT NULL,
    NumeroCertificado VARCHAR(20) NULL,
    DataMovimento DATE NULL,
    TipoMovimento VARCHAR(10) NULL,
    
    CONSTRAINT PK_HistoricoCobrancaVA PRIMARY KEY (NumeroTitulo)
);

-- ID Matriz: QUERY-0012 - Busca certificado por título
CREATE INDEX IX_HistoricoCobrancaVA_Titulo ON dbo.HistoricoCobrancaVA (NumeroTitulo);
```

#### 1.19 V0HISTSINI

**Rastreabilidade**:
- **ID Matriz**: `ENT-0019`
- **Tabela Legado**: V0HISTSINI
- **Queries Relacionadas**: QUERY-0016

```sql
-- ID Matriz: ENT-0019
-- Origem: V0HISTSINI
CREATE TABLE dbo.HistoricoSinistro (
    NumeroApolSinistro VARCHAR(20) NOT NULL,
    OcorrenciaHistorico VARCHAR(20) NOT NULL,
    NomeFavorecido VARCHAR(200) NULL,
    DataMovimento DATE NULL,
    
    CONSTRAINT PK_HistoricoSinistro PRIMARY KEY (NumeroApolSinistro, OcorrenciaHistorico)
);

-- ID Matriz: QUERY-0016 - Busca favorecido
CREATE INDEX IX_HistoricoSinistro_Chave ON dbo.HistoricoSinistro 
    (NumeroApolSinistro, OcorrenciaHistorico);
```

#### 1.20 V0MESTSINI

**Rastreabilidade**:
- **ID Matriz**: `ENT-0020`
- **Tabela Legado**: V0MESTSINI
- **Queries Relacionadas**: QUERY-0015

```sql
-- ID Matriz: ENT-0020
-- Origem: V0MESTSINI
CREATE TABLE dbo.MesSinistro (
    NumeroApolSinistro VARCHAR(20) NOT NULL,
    AnoMes INT NOT NULL,
    ValorTotal DECIMAL(18,2) NULL,
    
    CONSTRAINT PK_MesSinistro PRIMARY KEY (NumeroApolSinistro, AnoMes)
);

-- ID Matriz: QUERY-0015 - Busca por apólice
CREATE INDEX IX_MesSinistro_Apolice ON dbo.MesSinistro (NumeroApolSinistro);
```

#### 1.21 V0MOVDEBCC_CEF

**Rastreabilidade**:
- **ID Matriz**: `ENT-0021`
- **Tabela Legado**: V0MOVDEBCC_CEF (Tabela CRÍTICA - Principal do Sistema)
- **Queries Relacionadas**: QUERY-0005, QUERY-0031, QUERY-0033, QUERY-0035, QUERY-0037 a QUERY-0042, QUERY-0044

```sql
-- ID Matriz: ENT-0021
-- Origem: V0MOVDEBCC_CEF
-- TABELA PRINCIPAL DO SISTEMA - Movimento Débito CC CEF
CREATE TABLE dbo.MovimentoDebitoCCCef (
    NumeroApolice VARCHAR(20) NOT NULL,
    NumeroEndosso VARCHAR(10) NOT NULL,
    NumeroParcela VARCHAR(5) NOT NULL,
    CodigoConvenio VARCHAR(10) NOT NULL,
    DataVencimento DATE NOT NULL,
    ValorDebito DECIMAL(18,2) NULL,
    ValorCredito DECIMAL(18,2) NULL,
    TipoCobranca CHAR(1) NULL,
    SituacaoCobranca CHAR(1) NULL,
    CodigoAgencia VARCHAR(10) NULL,
    OperacaoConta VARCHAR(5) NULL,
    NumeroConta VARCHAR(20) NULL,
    DigitoVerificadorConta CHAR(1) NULL,
    NumeroCartao VARCHAR(20) NULL,
    DigitoVerificadorCartao CHAR(1) NULL,
    NumeroFitaEnvio VARCHAR(20) NULL,
    DataEnvio DATE NULL,
    NumeroFitaRetorno VARCHAR(20) NULL,
    DataRetorno DATE NULL,
    DataPagamento DATE NULL,
    DataCredito DATE NULL,
    NumeroCheque VARCHAR(20) NULL,
    DigitoVerificadorCheque CHAR(1) NULL,
    CodigoRetorno VARCHAR(5) NULL,
    DescricaoRetorno VARCHAR(200) NULL,
    StatusCartao VARCHAR(5) NULL,
    TipoRegistro CHAR(1) NULL,
    CodigoUsuario VARCHAR(50) NULL,
    DataMovimento DATE NULL,
    
    CONSTRAINT PK_MovimentoDebitoCCCef PRIMARY KEY (NumeroApolice, NumeroEndosso, NumeroParcela, CodigoConvenio),
    CONSTRAINT CHK_MovimentoDebitoCCCef_TipoCobranca CHECK (TipoCobranca IN ('1', '2', '3')),
    CONSTRAINT CHK_MovimentoDebitoCCCef_SituacaoCobranca CHECK (SituacaoCobranca IN ('0', '1', '2', '8', '9'))
);

-- ID Matriz: QUERY-0038 - Cursor por apólice
CREATE INDEX IX_MovimentoDebitoCCCef_Apolice ON dbo.MovimentoDebitoCCCef (NumeroApolice);

-- ID Matriz: QUERY-0039 - Cursor por apólice/endosso
CREATE INDEX IX_MovimentoDebitoCCCef_ApoliceEndosso ON dbo.MovimentoDebitoCCCef 
    (NumeroApolice, NumeroEndosso);

-- ID Matriz: QUERY-0040 - Cursor por conta
CREATE INDEX IX_MovimentoDebitoCCCef_Conta ON dbo.MovimentoDebitoCCCef 
    (CodigoAgencia, OperacaoConta, NumeroConta) 
    WHERE TipoCobranca = '1';

-- ID Matriz: QUERY-0041 - Cursor por cartão
CREATE INDEX IX_MovimentoDebitoCCCef_Cartao ON dbo.MovimentoDebitoCCCef 
    (NumeroCartao) 
    WHERE TipoCobranca = '2';

-- ID Matriz: QUERY-0042 - Cursor parcelas
CREATE INDEX IX_MovimentoDebitoCCCef_Parcelas ON dbo.MovimentoDebitoCCCef 
    (NumeroApolice, NumeroEndosso, CodigoConvenio);

-- ID Matriz: QUERY-0044 - Fetch cursor (iteração)
CREATE INDEX IX_MovimentoDebitoCCCef_DataVencimento ON dbo.MovimentoDebitoCCCef (DataVencimento);

-- ID Matriz: QUERY-0005, QUERY-0031, QUERY-0033, QUERY-0035, QUERY-0037 - Múltiplas buscas
CREATE INDEX IX_MovimentoDebitoCCCef_Convenio ON dbo.MovimentoDebitoCCCef (CodigoConvenio);
```

#### 1.22 V0PARCELA

**Rastreabilidade**:
- **ID Matriz**: `ENT-0022`
- **Tabela Legado**: V0PARCELA
- **Queries Relacionadas**: QUERY-0019

```sql
-- ID Matriz: ENT-0022
-- Origem: V0PARCELA
CREATE TABLE dbo.Parcelas (
    NumeroApolice VARCHAR(20) NOT NULL,
    NumeroEndosso VARCHAR(10) NOT NULL,
    NumeroParcela VARCHAR(5) NOT NULL,
    DataVencimento DATE NOT NULL,
    ValorParcela DECIMAL(18,2) NOT NULL,
    SituacaoParcela CHAR(1) NULL,
    DacParcela CHAR(1) NULL,
    
    CONSTRAINT PK_Parcelas PRIMARY KEY (NumeroApolice, NumeroEndosso, NumeroParcela),
    CONSTRAINT CHK_Parcelas_Valor CHECK (ValorParcela >= 0)
);

-- ID Matriz: QUERY-0019 - Busca situação parcela
CREATE INDEX IX_Parcelas_Chave ON dbo.Parcelas 
    (NumeroApolice, NumeroEndosso, NumeroParcela);
```

#### 1.23 V0PROPOSTA

**Rastreabilidade**:
- **ID Matriz**: `ENT-0023`
- **Tabela Legado**: V0PROPOSTA
- **Queries Relacionadas**: QUERY-0014

```sql
-- ID Matriz: ENT-0023
-- Origem: V0PROPOSTA
CREATE TABLE dbo.Propostas (
    NumeroProposta VARCHAR(20) NOT NULL,
    FonteProposta VARCHAR(10) NOT NULL,
    CodigoCliente VARCHAR(20) NULL,
    DataProposta DATE NULL,
    
    CONSTRAINT PK_Propostas PRIMARY KEY (NumeroProposta, FonteProposta),
    CONSTRAINT FK_Propostas_Cliente FOREIGN KEY (CodigoCliente) 
        REFERENCES dbo.Clientes(CodigoCliente)
);

-- ID Matriz: QUERY-0014 - Busca cliente por proposta fonte
CREATE INDEX IX_Propostas_NumeroFonte ON dbo.Propostas (NumeroProposta, FonteProposta);
```

#### 1.24 V0PROPOSTAVA

**Rastreabilidade**:
- **ID Matriz**: `ENT-0024`
- **Tabela Legado**: V0PROPOSTAVA
- **Queries Relacionadas**: QUERY-0013

```sql
-- ID Matriz: ENT-0024
-- Origem: V0PROPOSTAVA
CREATE TABLE dbo.PropostasVA (
    NumeroCertificado VARCHAR(20) NOT NULL,
    CodigoCliente VARCHAR(20) NULL,
    DataProposta DATE NULL,
    
    CONSTRAINT PK_PropostasVA PRIMARY KEY (NumeroCertificado),
    CONSTRAINT FK_PropostasVA_Cliente FOREIGN KEY (CodigoCliente) 
        REFERENCES dbo.Clientes(CodigoCliente)
);

-- ID Matriz: QUERY-0013 - Busca cliente por certificado
CREATE INDEX IX_PropostasVA_Certificado ON dbo.PropostasVA (NumeroCertificado);
```

#### 1.25 V1ENDOSSO

**Rastreabilidade**:
- **ID Matriz**: `ENT-0025`
- **Tabela Legado**: V1ENDOSSO
- **Queries Relacionadas**: QUERY-0011

```sql
-- ID Matriz: ENT-0025
-- Origem: V1ENDOSSO
CREATE TABLE dbo.Endossos (
    NumeroApolice VARCHAR(20) NOT NULL,
    NumeroEndosso VARCHAR(10) NOT NULL,
    DataEndosso DATE NULL,
    TipoEndosso VARCHAR(10) NULL,
    RamoSeguro VARCHAR(10) NULL,
    
    CONSTRAINT PK_Endossos PRIMARY KEY (NumeroApolice, NumeroEndosso)
);

-- ID Matriz: QUERY-0011 - Busca dados endosso
CREATE INDEX IX_Endossos_ChaveComposta ON dbo.Endossos (NumeroApolice, NumeroEndosso);
CREATE INDEX IX_Endossos_Apolice ON dbo.Endossos (NumeroApolice);
```

#### 1.26 V1MOVDEBCC_CEF

**Rastreabilidade**:
- **ID Matriz**: `ENT-0026`
- **Tabela Legado**: V1MOVDEBCC_CEF
- **Queries Relacionadas**: QUERY-0005 (numero requisição)

```sql
-- ID Matriz: ENT-0026
-- Origem: V1MOVDEBCC_CEF
CREATE TABLE dbo.MovimentoDebitoCCCefV1 (
    NumeroApolice VARCHAR(20) NOT NULL,
    NumeroEndosso VARCHAR(10) NOT NULL,
    NumeroParcela VARCHAR(5) NOT NULL,
    CodigoConvenio VARCHAR(10) NOT NULL,
    SituacaoCobranca CHAR(1) NOT NULL,
    NumeroRequisicao VARCHAR(20) NULL,
    
    CONSTRAINT PK_MovimentoDebitoCCCefV1 PRIMARY KEY (NumeroApolice, NumeroEndosso, NumeroParcela, CodigoConvenio)
);

-- ID Matriz: QUERY-0005 - Busca numero requisição
CREATE INDEX IX_MovimentoDebitoCCCefV1_Busca ON dbo.MovimentoDebitoCCCefV1 
    (CodigoConvenio, NumeroApolice, NumeroEndosso);
```

#### 1.27 V1SISTEMA

**Rastreabilidade**:
- **ID Matriz**: `ENT-0027`
- **Tabela Legado**: V1SISTEMA
- **Queries Relacionadas**: QUERY-0001

```sql
-- ID Matriz: ENT-0027
-- Origem: V1SISTEMA
CREATE TABLE dbo.Sistemas (
    IdSistema VARCHAR(10) NOT NULL,
    DataAbertura DATE NOT NULL,
    VersaoSistema VARCHAR(20) NULL,
    
    CONSTRAINT PK_Sistemas PRIMARY KEY (IdSistema)
);

-- ID Matriz: QUERY-0001 - Busca data abertura
CREATE INDEX IX_Sistemas_IdSistema ON dbo.Sistemas (IdSistema);

-- Inserir registro padrão CB
INSERT INTO dbo.Sistemas (IdSistema, DataAbertura, VersaoSistema)
VALUES ('CB', GETDATE(), 'V.1.0');
```

#### 1.28 V1USUARIOS

**Rastreabilidade**:
- **ID Matriz**: `ENT-0028`
- **Tabela Legado**: V1USUARIOS
- **Queries Relacionadas**: QUERY-0028

```sql
-- ID Matriz: ENT-0028
-- Origem: V1USUARIOS
CREATE TABLE dbo.Usuarios (
    CodigoUsuario VARCHAR(50) NOT NULL,
    NomeUsuario VARCHAR(200) NOT NULL,
    Email VARCHAR(200) NULL,
    Ativo BIT NOT NULL DEFAULT 1,
    DataCriacao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    DataUltimoAcesso DATETIME2 NULL,
    
    CONSTRAINT PK_Usuarios PRIMARY KEY (CodigoUsuario),
    CONSTRAINT UK_Usuarios_Email UNIQUE (Email)
);

-- ID Matriz: QUERY-0028 - Busca nome usuário
CREATE INDEX IX_Usuarios_Codigo ON dbo.Usuarios (CodigoUsuario);
CREATE INDEX IX_Usuarios_Ativo ON dbo.Usuarios (Ativo) WHERE Ativo = 1;
```

### 2. Tabela de Auditoria (Event Logging)

```sql
-- Tabela para registro de eventos
-- Migrado do padrão de event logging das ViewModels
CREATE TABLE dbo.EventosAuditoria (
    Id BIGINT IDENTITY(1,1) NOT NULL,
    TipoEvento VARCHAR(50) NOT NULL,
    Acao VARCHAR(100) NOT NULL,
    Descricao NVARCHAR(MAX) NULL,
    UsuarioId VARCHAR(50) NULL,
    DataEvento DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    DadosJson NVARCHAR(MAX) NULL,
    
    CONSTRAINT PK_EventosAuditoria PRIMARY KEY CLUSTERED (Id),
    CONSTRAINT FK_EventosAuditoria_Usuario FOREIGN KEY (UsuarioId) 
        REFERENCES dbo.Usuarios(CodigoUsuario)
);

CREATE INDEX IX_EventosAuditoria_DataEvento ON dbo.EventosAuditoria (DataEvento DESC);
CREATE INDEX IX_EventosAuditoria_TipoAcao ON dbo.EventosAuditoria (TipoEvento, Acao);
CREATE INDEX IX_EventosAuditoria_Usuario ON dbo.EventosAuditoria (UsuarioId);
```

### 3. Views (para compatibilidade com queries legadas)

```sql
-- View agregando dados para consulta principal
-- Simplifica joins complexos das queries legadas
CREATE VIEW dbo.vw_ConsultaMovimentoCompleta
AS
SELECT 
    m.NumeroApolice,
    m.NumeroEndosso,
    m.NumeroParcela,
    m.CodigoConvenio,
    m.DataVencimento,
    m.ValorDebito,
    m.ValorCredito,
    m.TipoCobranca,
    m.SituacaoCobranca,
    m.CodigoAgencia,
    m.NumeroConta,
    m.NumeroCartao,
    m.DataMovimento,
    c.NomeRazao,
    c.CpfCnpj,
    e.RamoSeguro,
    u.NomeUsuario,
    b.NomeBanco
FROM dbo.MovimentoDebitoCCCef m
LEFT JOIN dbo.Endossos e ON m.NumeroApolice = e.NumeroApolice AND m.NumeroEndosso = e.NumeroEndosso
LEFT JOIN dbo.ApoliceCobranca ac ON m.NumeroApolice = ac.NumeroApolice
LEFT JOIN dbo.Clientes c ON ac.NumeroApolice = c.CodigoCliente
LEFT JOIN dbo.Usuarios u ON m.CodigoUsuario = u.CodigoUsuario
LEFT JOIN dbo.Bancos b ON ac.CodigoAgencia = b.CodigoBanco;
```

### 4. Stored Procedures (Operações Complexas)

#### 4.1 sp_CalcularProximoDiaUtil

**Rastreabilidade**: QUERY-0023, QUERY-0024 (Cálculo de dias úteis)

```sql
-- ID Matriz: QUERY-0023, QUERY-0024
-- Origem: Lógica de cálculo de dias úteis do legado
CREATE PROCEDURE dbo.sp_CalcularProximoDiaUtil
    @DataReferencia DATE,
    @ProximoDiaUtil DATE OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @DataAtual DATE = @DataReferencia;
    DECLARE @DiaSemana CHAR(1);
    DECLARE @IsFeriado BIT;
    
    WHILE 1 = 1
    BEGIN
        SET @DataAtual = DATEADD(DAY, 1, @DataAtual);
        
        -- Verificar dia da semana
        SELECT @DiaSemana = DiaSemana
        FROM dbo.Calendario
        WHERE DataCalendario = @DataAtual;
        
        -- Verificar se é feriado
        SELECT @IsFeriado = COUNT(*)
        FROM dbo.Feriados
        WHERE DataFeriado = @DataAtual;
        
        -- Se não é fim de semana nem feriado, encontrou dia útil
        IF @DiaSemana NOT IN ('S', 'D') AND @IsFeriado = 0
        BEGIN
            SET @ProximoDiaUtil = @DataAtual;
            BREAK;
        END
    END
END;
```

#### 4.2 sp_BuscarMovimentosComAgregacao

**Rastreabilidade**: Múltiplas QUERY-* com GROUP BY

```sql
-- Procedure para consultas com agregação
-- Otimiza queries com GROUP BY do legado
CREATE PROCEDURE dbo.sp_BuscarMovimentosComAgregacao
    @NumeroApolice VARCHAR(20),
    @NumeroEndosso VARCHAR(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        NumeroApolice,
        NumeroEndosso,
        CodigoConvenio,
        TipoCobranca,
        COUNT(*) AS QuantidadeParcelas,
        SUM(ValorDebito) AS TotalDebito,
        SUM(ValorCredito) AS TotalCredito
    FROM dbo.MovimentoDebitoCCCef
    WHERE NumeroApolice = @NumeroApolice
        AND (@NumeroEndosso IS NULL OR NumeroEndosso = @NumeroEndosso)
    GROUP BY 
        NumeroApolice,
        NumeroEndosso,
        CodigoConvenio,
        TipoCobranca
    ORDER BY 
        NumeroApolice,
        NumeroEndosso,
        CodigoConvenio;
END;
```

### 5. Estratégia de Migration

#### 5.1 Ferramenta

**FluentMigrator** - Para migrations versionadas em C#

```csharp
// Example migration file structure
[Migration(20240101000001)]
public class CreateBancosTable : Migration
{
    public override void Up()
    {
        Create.Table("Bancos")
            .WithColumn("CodigoBanco").AsString(10).NotNullable().PrimaryKey()
            .WithColumn("NomeBanco").AsString(100).NotNullable()
            .WithColumn("DescricaoBanco").AsString(255).Nullable()
            .WithColumn("Ativo").AsBoolean().NotNullable().WithDefaultValue(true)
            .WithColumn("DataCriacao").AsDateTime2().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime)
            .WithColumn("DataAtualizacao").AsDateTime2().Nullable();
    }

    public override void Down()
    {
        Delete.Table("Bancos");
    }
}
```

#### 5.2 Ordem de Criação

```markdown
1. Tabelas independentes (sem FK):
   - Bancos (ENT-0001)
   - Calendario (ENT-0002)
   - Feriados (ENT-0017)
   - Sistemas (ENT-0027)
   - Usuarios (ENT-0028)

2. Tabelas de domínio:
   - Clientes (ENT-0016)
   - PessoaFisica (ENT-0009)
   - PessoaJuridica (ENT-0010)
   - PessoaLegadoGE (ENT-0005)

3. Tabelas core do negócio:
   - Endossos (ENT-0025)
   - ApoliceCobranca (ENT-0013)
   - RegistroDebitoAuto (ENT-0003)
   
4. Tabela principal:
   - MovimentoDebitoCCCef (ENT-0021) - CRÍTICA
   
5. Tabelas relacionadas:
   - Parcelas (ENT-0022)
   - MovimentoConta (ENT-0007)
   - MovimentoDebitoCCCefV1 (ENT-0026)
   
6. Tabelas auxiliares:
   - Cheques, ChequesEmitidos, LoteCheques
   - Bilhetes, Propostas, PropostasVA
   - Sinistros (todas)
   - MovimentoGE (ENT-0006)
   
7. Tabelas de auditoria:
   - EventosAuditoria
```

#### 5.3 Nomenclatura de Migrations

```
YYYYMMDDHHMMSS_DescricaoMigracao.cs

Exemplos:
20240101000001_CreateBancosTable.cs
20240101000002_CreateCalendarioTable.cs
20240101000003_CreateUsuariosTable.cs
...
20240101000028_CreateMovimentoDebitoCCCefTable.cs
20240101000029_CreateIndexesMovimentoDebitoCCCef.cs
20240101000030_CreateViewConsultaMovimentoCompleta.cs
20240101000031_CreateStoredProcedures.cs
```

### 6. Estratégia de Migração de Dados

#### 6.1 ETL do DB2 para SQL Server

```sql
-- Script de exemplo para migração de dados
-- Executar via SSIS ou script customizado

-- Passo 1: Exportar do DB2
-- db2 "EXPORT TO bancos.del OF DEL SELECT * FROM BANCOS"

-- Passo 2: Importar para SQL Server (BULK INSERT)
BULK INSERT dbo.Bancos
FROM '\\path\to\bancos.del'
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    FIRSTROW = 2,
    TABLOCK
);

-- Passo 3: Validação de contagem
DECLARE @CountDB2 INT = 150; -- vindo do DB2
DECLARE @CountSQL INT;

SELECT @CountSQL = COUNT(*) FROM dbo.Bancos;

IF @CountDB2 <> @CountSQL
    RAISERROR('Contagem não confere: DB2=%d, SQL=%d', 16, 1, @CountDB2, @CountSQL);
```

#### 6.2 Validação Pós-Migração

```sql
-- Validar integridade referencial
SELECT 
    'RegistroDebitoAuto sem Endosso' AS Problema,
    COUNT(*) AS Quantidade
FROM dbo.RegistroDebitoAuto r
LEFT JOIN dbo.Endossos e ON r.NumeroApolice = e.NumeroApolice 
    AND r.NumeroEndosso = e.NumeroEndosso
WHERE e.NumeroApolice IS NULL

UNION ALL

SELECT 
    'MovimentoDebitoCCCef sem Endosso',
    COUNT(*)
FROM dbo.MovimentoDebitoCCCef m
LEFT JOIN dbo.Endossos e ON m.NumeroApolice = e.NumeroApolice 
    AND m.NumeroEndosso = e.NumeroEndosso
WHERE e.NumeroApolice IS NULL;
```

### 7. Connection Strings

#### appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=Cb2qaAgTeste;User Id=sa;Password=YourPassword123!;TrustServerCertificate=True;",
    "ReportingConnection": "Server=localhost;Database=Cb2qaAgTeste;User Id=report_user;Password=ReportPass123!;TrustServerCertificate=True;ApplicationIntent=ReadOnly;"
  }
}
```

#### appsettings.Production.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=prod-sql-server.database.windows.net;Database=Cb2qaAgTeste;User Id=app_user;Password=${DB_PASSWORD};Encrypt=true;",
    "ReportingConnection": "Server=prod-sql-server-replica.database.windows.net;Database=Cb2qaAgTeste;Integrated Security=true;Encrypt=true;ApplicationIntent=ReadOnly;"
  }
}
```

### 8. Configuração Dapper (Program.cs)

```csharp
// Registro no DI Container
builder.Services.AddScoped<IDbConnection>(sp =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    return new SqlConnection(connectionString);
});

// Configuração de timeout global
SqlMapper.Settings.CommandTimeout = 300; // 5 minutos para queries pesadas
```

## Dependências

- **Depende de**: 01_DOMAIN_MODEL.md (Entities definidas)
- **Necessário para**: 03_INFRASTRUCTURE_LAYER.md (Repositories vão usar estas tabelas)

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: DDL para todas 28 tabelas (ENT-0001 a ENT-0028)
- [x] **OBRIGATÓRIO**: Primary keys definidas para todas tabelas
- [x] **OBRIGATÓRIO**: Índices otimizados baseados em 46 QUERY-* entries
- [x] **OBRIGATÓRIO**: Foreign keys onde aplicável
- [x] **OBRIGATÓRIO**: Constraints de integridade (CHECK, UNIQUE)
- [x] **OBRIGATÓRIO**: Campos de auditoria (DataCriacao, DataAtualizacao)
- [x] **OBRIGATÓRIO**: Tabela de eventos de auditoria
- [x] **OBRIGATÓRIO**: Views para queries complexas
- [x] **OBRIGATÓRIO**: Stored procedures para operações complexas
- [x] **OBRIGATÓRIO**: Estratégia de migration definida (FluentMigrator)
- [x] **OBRIGATÓRIO**: Ordem de criação de tabelas documentada
- [x] **OBRIGATÓRIO**: Connection strings para todos ambientes
- [x] **OBRIGATÓRIO**: Estratégia ETL DB2 → SQL Server
- [x] **OBRIGATÓRIO**: Scripts de validação pós-migração
- [x] **OBRIGATÓRIO**: Todos índices referenciam IDs da matriz (QUERY-*)
- [x] **OBRIGATÓRIO**: Nomenclatura SQL Server seguindo padrões

## Rastreabilidade Completa

### Resumo de IDs da Matriz Abordados

| Tipo | Quantidade | Range | Status |
|------|------------|-------|--------|
| ENT (Tabelas) | 28 | ENT-0001 a ENT-0028 | COMPLETED |
| QUERY (Índices) | 46 | QUERY-0001 a QUERY-0046 | COMPLETED |

**Total de IDs Mapeados neste Documento**: 74

### Mapeamento Query → Índice

| ID Query | Descrição | Tabela | Índice Criado |
|----------|-----------|--------|---------------|
| QUERY-0001 | SELECT V1SISTEMA | Sistemas | IX_Sistemas_IdSistema |
| QUERY-0002 | SELECT CB2QR001 por titulo | RegistroDebitoAuto | IX_RegistroDebitoAuto_Apolice |
| QUERY-0003 | SELECT GE_MOVTO_CONTA | MovimentoConta | IX_MovimentoConta_ChaveComposta |
| QUERY-0004 | SELECT V0APOLCOB | ApoliceCobranca | IX_ApoliceCobranca_Apolice |
| ... | ... | ... | ... |
| QUERY-0046 | FETCH GE_MOVTO_CONTA | MovimentoConta | IX_MovimentoConta_Data |

### Status na Matriz

Atualizar `MATRIZ_RASTREABILIDADE.csv`:
- Status_Documentacao = COMPLETED para todos ENT-0001 a ENT-0028
- Status_Documentacao = COMPLETED para todos QUERY-0001 a QUERY-0046
- Ref_Doc_Abordagem = 02_DATABASE_SCHEMA.md

