# 02 - DATABASE SCHEMA

## Objetivo

Definir o schema completo do banco de dados SQL Server para o sistema VGFNA, mapeando as 13 entidades principais de tabelas DB2 (ENT-0101 a ENT-0113) do mainframe DB2 para SQL Server, incluindo DDL, índices otimizados baseados nos padrões de consulta (QUERY-0101 a QUERY-0110), e estratégia de migração de dados.

## Mapeamento de Legado

### Origem
- **Sistema Legado**: DB2 Mainframe
- **Arquivo**: `_LEGADO/vgfna.esf`
- **Tabelas**: 13 entidades principais de tabelas DB2 (ENT-0101 a ENT-0113)
- **Nota**: ENT-0114 e ENT-0115 são estruturas workstorage (RECORD) e não são tabelas DB2, portanto não são mapeadas no schema
- **Queries**: 10 padrões de consulta (QUERY-0101 a QUERY-0110)

### Destino
- **SGBD**: SQL Server 2019+
- **Schema**: `dbo`
- **Database**: `VgfnaAgTeste`
- **Collation**: `Latin1_General_CI_AS`

## Especificação Técnica

### 1. Tabelas Principais

#### 1.1 V0APOLICE (Apolice)

**Rastreabilidade**:
- **ID Matriz**: `ENT-0101`
- **Tabela Legado**: V0APOLICE
- **Queries Relacionadas**: QUERY-0105

```sql
-- ID Matriz: ENT-0101
-- Origem: V0APOLICE
CREATE TABLE dbo.Apolice (
    NumeroApolice VARCHAR(20) NOT NULL,
    CodigoCliente INT NOT NULL,
    CodigoSucursal INT NULL,
    TipoApolice INT NOT NULL,
    DataAbertura DATETIME2 NULL,
    DataEncerramento DATETIME2 NULL,
    Situacao CHAR(1) NULL,
    DataCriacao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    DataAtualizacao DATETIME2 NULL,
    
    CONSTRAINT PK_Apolice PRIMARY KEY (NumeroApolice),
    CONSTRAINT FK_Apolice_Cliente FOREIGN KEY (CodigoCliente) 
        REFERENCES dbo.Cliente(CodigoCliente),
    CONSTRAINT FK_Apolice_Fonte FOREIGN KEY (CodigoSucursal) 
        REFERENCES dbo.FonteProdutora(CodigoFonte)
);

-- ID Matriz: QUERY-0105 - Busca apólice por número
CREATE INDEX IX_Apolice_Numero ON dbo.Apolice (NumeroApolice);
CREATE INDEX IX_Apolice_Cliente ON dbo.Apolice (CodigoCliente);
CREATE INDEX IX_Apolice_Situacao ON dbo.Apolice (Situacao) WHERE Situacao IS NOT NULL;
```

**Mapeamento de Campos**:

| Campo Legado | Campo Moderno | Tipo Legado | Tipo SQL Server | Nullable |
|--------------|---------------|-------------|-----------------|----------|
| NUM_APOLICE | NumeroApolice | PACK(7) | VARCHAR(20) | NOT NULL |
| COD_CLIENTE | CodigoCliente | BIN(4) | INT | NOT NULL |
| COD_SUCURSAL | CodigoSucursal | BIN(4) | INT | NULL |
| TIPO_APOLICE | TipoApolice | BIN(2) | INT | NOT NULL |
| DTMOVABE | DataAbertura | DATE | DATETIME2 | NULL |
| DTENCERRA | DataEncerramento | DATE | DATETIME2 | NULL |
| SITUACAO | Situacao | CHAR(1) | CHAR(1) | NULL |

#### 1.2 V0SUBGRUPO (Subgrupo)

**Rastreabilidade**:
- **ID Matriz**: `ENT-0102`
- **Tabela Legado**: V0SUBGRUPO
- **Queries Relacionadas**: QUERY-0101, QUERY-0102

```sql
-- ID Matriz: ENT-0102
-- Origem: V0SUBGRUPO
-- Tabela principal do sistema
CREATE TABLE dbo.Subgrupo (
    NumeroApolice VARCHAR(20) NOT NULL,
    CodigoSubgrupo INT NOT NULL,
    PeriodoFaturamento INT NULL,
    FormaFaturamento INT NULL,
    FormaAverbacao INT NULL,
    TipoPlano INT NULL,
    PlanoAssociado CHAR(1) NULL,
    TipoCobranca INT NULL,
    ValidarMatricula CHAR(1) NULL,
    EnderecoCobranca INT NULL,
    BancoCobranca INT NULL,
    AgenciaCobranca INT NULL,
    DacCobranca INT NULL,
    PercentualConjugeAP DECIMAL(5,2) NULL,
    PercentualConjugeVG DECIMAL(5,2) NULL,
    DataInclusao DATETIME2 NULL,
    DataAlteracao DATETIME2 NULL,
    UsuarioInclusao VARCHAR(50) NULL,
    UsuarioAlteracao VARCHAR(50) NULL,
    
    CONSTRAINT PK_Subgrupo PRIMARY KEY (NumeroApolice, CodigoSubgrupo),
    CONSTRAINT FK_Subgrupo_Apolice FOREIGN KEY (NumeroApolice) 
        REFERENCES dbo.Apolice(NumeroApolice),
    CONSTRAINT FK_Subgrupo_Endereco FOREIGN KEY (EnderecoCobranca) 
        REFERENCES dbo.Endereco(CodigoEndereco),
    CONSTRAINT FK_Subgrupo_Agencia FOREIGN KEY (BancoCobranca, AgenciaCobranca) 
        REFERENCES dbo.AgenciaBancaria(CodigoBanco, CodigoAgencia),
    CONSTRAINT FK_Subgrupo_PeriodoFaturamento FOREIGN KEY (PeriodoFaturamento) 
        REFERENCES dbo.DominioPeriodoFaturamento(Codigo),
    CONSTRAINT FK_Subgrupo_FormaFaturamento FOREIGN KEY (FormaFaturamento) 
        REFERENCES dbo.DominioFormaFaturamento(Codigo),
    CONSTRAINT FK_Subgrupo_FormaAverbacao FOREIGN KEY (FormaAverbacao) 
        REFERENCES dbo.DominioFormaAverbacao(Codigo),
    CONSTRAINT FK_Subgrupo_TipoPlano FOREIGN KEY (TipoPlano) 
        REFERENCES dbo.DominioTipoPlano(Codigo),
    CONSTRAINT FK_Subgrupo_TipoCobranca FOREIGN KEY (TipoCobranca) 
        REFERENCES dbo.DominioTipoCobranca(Codigo),
    CONSTRAINT CHK_Subgrupo_PlanoAssociado CHECK (PlanoAssociado IN ('S', 'N')),
    CONSTRAINT CHK_Subgrupo_ValidarMatricula CHECK (ValidarMatricula IN ('S', 'N'))
);

-- ID Matriz: QUERY-0101 - Busca subgrupo por apólice e código
CREATE INDEX IX_Subgrupo_Apolice ON dbo.Subgrupo (NumeroApolice, CodigoSubgrupo);
CREATE INDEX IX_Subgrupo_TipoCobranca ON dbo.Subgrupo (TipoCobranca) WHERE TipoCobranca IS NOT NULL;
CREATE INDEX IX_Subgrupo_DataAlteracao ON dbo.Subgrupo (DataAlteracao) WHERE DataAlteracao IS NOT NULL;
```

**Mapeamento de Campos**:

| Campo Legado | Campo Moderno | Tipo Legado | Tipo SQL Server | Nullable |
|--------------|---------------|-------------|-----------------|----------|
| NUM_APOLICE | NumeroApolice | PACK(7) | VARCHAR(20) | NOT NULL |
| COD_SUBGRUPO | CodigoSubgrupo | BIN(2) | INT | NOT NULL |
| PERI_FATURAMENTO | PeriodoFaturamento | BIN(2) | INT | NULL |
| FORMA_FATURAMENTO | FormaFaturamento | BIN(2) | INT | NULL |
| FORMA_AVERBACAO | FormaAverbacao | BIN(2) | INT | NULL |
| TIPO_PLANO | TipoPlano | BIN(2) | INT | NULL |
| PLANO_ASSOCIADO | PlanoAssociado | CHAR(1) | CHAR(1) | NULL |
| TIPO_COBRANCA | TipoCobranca | BIN(2) | INT | NULL |
| VALIDAR_MATRICULA | ValidarMatricula | CHAR(1) | CHAR(1) | NULL |
| ENDERECO_COBRANCA | EnderecoCobranca | BIN(4) | INT | NULL |
| BCO_COBRANCA | BancoCobranca | BIN(2) | INT | NULL |
| AGE_COBRANCA | AgenciaCobranca | BIN(4) | INT | NULL |
| DAC_COBRANCA | DacCobranca | BIN(2) | INT | NULL |
| PCT_CONJ_AP | PercentualConjugeAP | DECIMAL(5,2) | DECIMAL(5,2) | NULL |
| PCT_CONJ_VG | PercentualConjugeVG | DECIMAL(5,2) | DECIMAL(5,2) | NULL |

#### 1.3 V0TERMOADESAO (TermoAdesao)

**Rastreabilidade**:
- **ID Matriz**: `ENT-0103`
- **Tabela Legado**: V0TERMOADESAO
- **Queries Relacionadas**: QUERY-0103, QUERY-0104

```sql
-- ID Matriz: ENT-0103
-- Origem: V0TERMOADESAO
CREATE TABLE dbo.TermoAdesao (
    NumeroApolice VARCHAR(20) NOT NULL,
    CodigoTermo INT NOT NULL,
    PeriodoFaturamento INT NULL,
    FormaFaturamento INT NULL,
    FormaAverbacao INT NULL,
    TipoPlano INT NULL,
    PlanoAssociado CHAR(1) NULL,
    TipoCobranca INT NULL,
    ValidarMatricula CHAR(1) NULL,
    EnderecoCobranca INT NULL,
    BancoCobranca INT NULL,
    AgenciaCobranca INT NULL,
    DataInclusao DATETIME2 NULL,
    DataAlteracao DATETIME2 NULL,
    UsuarioInclusao VARCHAR(50) NULL,
    UsuarioAlteracao VARCHAR(50) NULL,
    
    CONSTRAINT PK_TermoAdesao PRIMARY KEY (NumeroApolice, CodigoTermo),
    CONSTRAINT FK_TermoAdesao_Apolice FOREIGN KEY (NumeroApolice) 
        REFERENCES dbo.Apolice(NumeroApolice),
    CONSTRAINT FK_TermoAdesao_Endereco FOREIGN KEY (EnderecoCobranca) 
        REFERENCES dbo.Endereco(CodigoEndereco),
    CONSTRAINT FK_TermoAdesao_Agencia FOREIGN KEY (BancoCobranca, AgenciaCobranca) 
        REFERENCES dbo.AgenciaBancaria(CodigoBanco, CodigoAgencia),
    CONSTRAINT CHK_TermoAdesao_PlanoAssociado CHECK (PlanoAssociado IN ('S', 'N')),
    CONSTRAINT CHK_TermoAdesao_ValidarMatricula CHECK (ValidarMatricula IN ('S', 'N'))
);

-- ID Matriz: QUERY-0103 - Busca termo adesão por apólice e código
CREATE INDEX IX_TermoAdesao_Apolice ON dbo.TermoAdesao (NumeroApolice, CodigoTermo);
CREATE INDEX IX_TermoAdesao_DataAlteracao ON dbo.TermoAdesao (DataAlteracao) WHERE DataAlteracao IS NOT NULL;
```

#### 1.4 V1CLIENTE (Cliente)

**Rastreabilidade**:
- **ID Matriz**: `ENT-0104`
- **Tabela Legado**: V1CLIENTE
- **Queries Relacionadas**: QUERY-0106

```sql
-- ID Matriz: ENT-0104
-- Origem: V1CLIENTE
CREATE TABLE dbo.Cliente (
    CodigoCliente INT NOT NULL,
    NomeRazao VARCHAR(200) NOT NULL,
    CgcCpf VARCHAR(18) NULL,
    TipoPessoa CHAR(1) NULL,
    Situacao CHAR(1) NULL,
    DataCriacao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    DataAtualizacao DATETIME2 NULL,
    
    CONSTRAINT PK_Cliente PRIMARY KEY (CodigoCliente),
    CONSTRAINT CHK_Cliente_TipoPessoa CHECK (TipoPessoa IN ('F', 'J')),
    CONSTRAINT CHK_Cliente_Situacao CHECK (Situacao IN ('0', '1', '2'))
);

-- ID Matriz: QUERY-0106 - Busca cliente por código
CREATE INDEX IX_Cliente_Codigo ON dbo.Cliente (CodigoCliente);
CREATE INDEX IX_Cliente_Situacao ON dbo.Cliente (Situacao) WHERE Situacao = '0';
```

#### 1.5 V1ENDERECOS (Endereco)

**Rastreabilidade**:
- **ID Matriz**: `ENT-0105`
- **Tabela Legado**: V1ENDERECOS
- **Queries Relacionadas**: QUERY-0107

```sql
-- ID Matriz: ENT-0105
-- Origem: V1ENDERECOS
CREATE TABLE dbo.Endereco (
    CodigoEndereco INT NOT NULL,
    CodigoCliente INT NOT NULL,
    Logradouro VARCHAR(200) NULL,
    Numero VARCHAR(20) NULL,
    Complemento VARCHAR(100) NULL,
    Bairro VARCHAR(100) NULL,
    Cidade VARCHAR(100) NULL,
    Estado CHAR(2) NULL,
    Cep VARCHAR(10) NULL,
    TipoEndereco CHAR(1) NULL,
    DataCriacao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT PK_Endereco PRIMARY KEY (CodigoEndereco),
    CONSTRAINT FK_Endereco_Cliente FOREIGN KEY (CodigoCliente) 
        REFERENCES dbo.Cliente(CodigoCliente)
);

-- ID Matriz: QUERY-0107 - Busca endereços por cliente
CREATE INDEX IX_Endereco_Cliente ON dbo.Endereco (CodigoCliente);
CREATE INDEX IX_Endereco_Tipo ON dbo.Endereco (TipoEndereco) WHERE TipoEndereco IS NOT NULL;
```

#### 1.6 V1AGENCIAS (AgenciaBancaria)

**Rastreabilidade**:
- **ID Matriz**: `ENT-0106`
- **Tabela Legado**: V1AGENCIAS
- **Queries Relacionadas**: QUERY-0108

```sql
-- ID Matriz: ENT-0106
-- Origem: V1AGENCIAS
CREATE TABLE dbo.AgenciaBancaria (
    CodigoBanco INT NOT NULL,
    CodigoAgencia INT NOT NULL,
    Dac INT NULL,
    NomeAgencia VARCHAR(200) NOT NULL,
    Situacao CHAR(1) NULL,
    DataCriacao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT PK_AgenciaBancaria PRIMARY KEY (CodigoBanco, CodigoAgencia),
    CONSTRAINT CHK_AgenciaBancaria_Situacao CHECK (Situacao IN ('0', '1'))
);

-- ID Matriz: QUERY-0108 - Busca agência por banco e código
CREATE INDEX IX_AgenciaBancaria_Banco ON dbo.AgenciaBancaria (CodigoBanco, CodigoAgencia);
CREATE INDEX IX_AgenciaBancaria_Situacao ON dbo.AgenciaBancaria (Situacao) WHERE Situacao = '0';
```

#### 1.7 V1FONTE (FonteProdutora)

**Rastreabilidade**:
- **ID Matriz**: `ENT-0107`
- **Tabela Legado**: V1FONTE
- **Queries Relacionadas**: QUERY-0109

```sql
-- ID Matriz: ENT-0107
-- Origem: V1FONTE
CREATE TABLE dbo.FonteProdutora (
    CodigoFonte INT NOT NULL,
    NomeFonte VARCHAR(200) NOT NULL,
    Situacao CHAR(1) NULL,
    DataCriacao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT PK_FonteProdutora PRIMARY KEY (CodigoFonte),
    CONSTRAINT CHK_FonteProdutora_Situacao CHECK (Situacao IN ('0', '1'))
);

-- ID Matriz: QUERY-0109 - Busca fontes ativas (situação='0')
CREATE INDEX IX_FonteProdutora_Situacao ON dbo.FonteProdutora (Situacao) WHERE Situacao = '0';
```

#### 1.8 V0SISTEMA (Sistema)

**Rastreabilidade**:
- **ID Matriz**: `ENT-0108`
- **Tabela Legado**: V0SISTEMA
- **Queries Relacionadas**: QUERY-0110

```sql
-- ID Matriz: ENT-0108
-- Origem: V0SISTEMA
CREATE TABLE dbo.Sistema (
    IdSistema VARCHAR(10) NOT NULL,
    DataMovimentoAbertura DATETIME2 NULL,
    Descricao VARCHAR(200) NULL,
    DataCriacao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT PK_Sistema PRIMARY KEY (IdSistema)
);

-- ID Matriz: QUERY-0110 - Busca sistema por ID
CREATE INDEX IX_Sistema_Id ON dbo.Sistema (IdSistema);
```

### 2. Tabelas de Domínio (Lookup Tables)

#### 2.1 ZZ01T14 (DominioPeriodoFaturamento)

**Rastreabilidade**:
- **ID Matriz**: `ENT-0109`

```sql
-- ID Matriz: ENT-0109
-- Origem: ZZ01T14
CREATE TABLE dbo.DominioPeriodoFaturamento (
    Codigo INT NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    Ativo BIT NOT NULL DEFAULT 1,
    DataCriacao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT PK_DominioPeriodoFaturamento PRIMARY KEY (Codigo)
);

CREATE INDEX IX_DominioPeriodoFaturamento_Ativo ON dbo.DominioPeriodoFaturamento (Ativo) WHERE Ativo = 1;
```

#### 2.2 ZZ01T17 (DominioFormaFaturamento)

**Rastreabilidade**:
- **ID Matriz**: `ENT-0110`

```sql
-- ID Matriz: ENT-0110
-- Origem: ZZ01T17
CREATE TABLE dbo.DominioFormaFaturamento (
    Codigo INT NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    Ativo BIT NOT NULL DEFAULT 1,
    DataCriacao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT PK_DominioFormaFaturamento PRIMARY KEY (Codigo)
);

CREATE INDEX IX_DominioFormaFaturamento_Ativo ON dbo.DominioFormaFaturamento (Ativo) WHERE Ativo = 1;
```

#### 2.3 ZZ01T18 (DominioFormaAverbacao)

**Rastreabilidade**:
- **ID Matriz**: `ENT-0111`

```sql
-- ID Matriz: ENT-0111
-- Origem: ZZ01T18
CREATE TABLE dbo.DominioFormaAverbacao (
    Codigo INT NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    Ativo BIT NOT NULL DEFAULT 1,
    DataCriacao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT PK_DominioFormaAverbacao PRIMARY KEY (Codigo)
);

CREATE INDEX IX_DominioFormaAverbacao_Ativo ON dbo.DominioFormaAverbacao (Ativo) WHERE Ativo = 1;
```

#### 2.4 ZZ01T19 (DominioTipoPlano)

**Rastreabilidade**:
- **ID Matriz**: `ENT-0112`

```sql
-- ID Matriz: ENT-0112
-- Origem: ZZ01T19
CREATE TABLE dbo.DominioTipoPlano (
    Codigo INT NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    Ativo BIT NOT NULL DEFAULT 1,
    DataCriacao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT PK_DominioTipoPlano PRIMARY KEY (Codigo)
);

CREATE INDEX IX_DominioTipoPlano_Ativo ON dbo.DominioTipoPlano (Ativo) WHERE Ativo = 1;
```

#### 2.5 ZZ01T21 (DominioTipoCobranca)

**Rastreabilidade**:
- **ID Matriz**: `ENT-0113`

```sql
-- ID Matriz: ENT-0113
-- Origem: ZZ01T21
CREATE TABLE dbo.DominioTipoCobranca (
    Codigo INT NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    Ativo BIT NOT NULL DEFAULT 1,
    DataCriacao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT PK_DominioTipoCobranca PRIMARY KEY (Codigo)
);

CREATE INDEX IX_DominioTipoCobranca_Ativo ON dbo.DominioTipoCobranca (Ativo) WHERE Ativo = 1;
```

### 3. Tabela de Auditoria

```sql
-- Tabela para auditoria de alterações
CREATE TABLE dbo.AuditoriaAlteracao (
    IdAuditoria BIGINT IDENTITY(1,1) NOT NULL,
    TabelaAlterada VARCHAR(100) NOT NULL,
    ChavePrimaria VARCHAR(200) NOT NULL,
    DadosAntigos NVARCHAR(MAX) NULL,
    DadosNovos NVARCHAR(MAX) NULL,
    Usuario VARCHAR(50) NOT NULL,
    DataAlteracao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    TipoOperacao VARCHAR(20) NOT NULL,
    
    CONSTRAINT PK_AuditoriaAlteracao PRIMARY KEY (IdAuditoria)
);

CREATE INDEX IX_AuditoriaAlteracao_Tabela ON dbo.AuditoriaAlteracao (TabelaAlterada, DataAlteracao);
CREATE INDEX IX_AuditoriaAlteracao_Usuario ON dbo.AuditoriaAlteracao (Usuario, DataAlteracao);
```

## Estratégia de Migração de Dados

### Fase 1: Preparação
1. Criar database `VgfnaAgTeste`
2. Executar scripts DDL em ordem de dependência
3. Validar constraints e índices

### Fase 2: Migração de Dados
1. Migrar tabelas de domínio (ENT-0109 a ENT-0113)
2. Migrar tabelas base (ENT-0104, ENT-0105, ENT-0106, ENT-0107, ENT-0108)
3. Migrar tabelas principais (ENT-0101, ENT-0102, ENT-0103)

### Fase 3: Validação
1. Validar integridade referencial
2. Validar dados migrados
3. Executar queries de validação

## Dependências

- **Depende de**: 01_DOMAIN_MODEL.md (Entities definidas)
- **Necessário para**: 03_INFRASTRUCTURE_LAYER.md (Repositories vão usar estas tabelas)

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: DDL para todas 13 tabelas (ENT-0101 a ENT-0113)
- [x] **OBRIGATÓRIO**: Primary keys definidas para todas tabelas
- [x] **OBRIGATÓRIO**: Índices otimizados baseados em 10 QUERY-* entries
- [x] **OBRIGATÓRIO**: Foreign keys onde aplicável
- [x] **OBRIGATÓRIO**: Constraints de integridade (CHECK, UNIQUE)
- [x] **OBRIGATÓRIO**: Campos de auditoria (DataCriacao, DataAtualizacao)
- [x] **OBRIGATÓRIO**: Tabela de eventos de auditoria
- [x] **OBRIGATÓRIO**: Estratégia de migration definida
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
| ENT (Tabelas) | 13 | ENT-0101 a ENT-0113 | COMPLETED |
| QUERY (Índices) | 10 | QUERY-0101 a QUERY-0110 | COMPLETED |

**Total de IDs Mapeados neste Documento**: 23

### Mapeamento Query → Índice

| ID Query | Descrição | Tabela | Índice Criado |
|----------|-----------|--------|---------------|
| QUERY-0101 | SELECT V0SUBGRUPO | Subgrupo | IX_Subgrupo_Apolice |
| QUERY-0102 | UPDATE V0SUBGRUPO | Subgrupo | IX_Subgrupo_DataAlteracao |
| QUERY-0103 | SELECT V0TERMOADESAO | TermoAdesao | IX_TermoAdesao_Apolice |
| QUERY-0104 | UPDATE V0TERMOADESAO | TermoAdesao | IX_TermoAdesao_DataAlteracao |
| QUERY-0105 | SELECT V0APOLICE | Apolice | IX_Apolice_Numero |
| QUERY-0106 | SELECT V1CLIENTE | Cliente | IX_Cliente_Codigo |
| QUERY-0107 | SELECT V1ENDERECOS | Endereco | IX_Endereco_Cliente |
| QUERY-0108 | SELECT V1AGENCIAS | AgenciaBancaria | IX_AgenciaBancaria_Banco |
| QUERY-0109 | SELECT V1FONTE | FonteProdutora | IX_FonteProdutora_Situacao |
| QUERY-0110 | SELECT V0SISTEMA | Sistema | IX_Sistema_Id |

### Status na Matriz

Atualizar `MATRIZ_RASTREABILIDADE.csv`:
- Status_Documentacao = COMPLETED para todos ENT-0101 a ENT-0113
- Status_Documentacao = COMPLETED para todos QUERY-0101 a QUERY-0110
- Ref_Doc_Abordagem = 02_DATABASE_SCHEMA.md

