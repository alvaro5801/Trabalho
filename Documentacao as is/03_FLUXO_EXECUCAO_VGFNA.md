# 03 - Fluxo de Execução - VGFNA

## ⚠️ Referência à Matriz

**Arquivo da Matriz**: `MATRIZ_RASTREABILIDADE.csv`

Este documento referencia os seguintes tipos de ID:
- **METOD-NNNN**: Funções/Procedures do programa
- **TELA-NNNN**: Telas envolvidas no fluxo
- **QUERY-NNNN**: Operações SQL
- **REGRA-NNNN**: Regras de negócio aplicadas

## Visão Geral do Stack

### Comando de Extração

```bash
.\vamap.exe _LEGADO/vgfna.esf --code "|"
```

**Stack Completo**:

```
MainFunc (SourceCode)
:mainfun   name      = VGFNP002.
IF VGFNW001.W01A0035 EQ 'PROCESSO INICIAL';
  VGFNP000();
END;
VGFNP002();
:emainfun.

VGFNP000 - Execute
  VGFNP001 - Inquiry
    ZZRCIN1 - Error Handling Function Execute
    ZZ20S01 - Execute
VGFNP002 - Execute
  VGFNP005 - Converse
  VGFNS002 - Execute
    ZZ01SGPS3 - Execute
    ZZ01SGPS12 - Execute
    VGFNP011 - Inquiry
      ZZRCIN1 - Error Handling Function Execute
    VGFNP012 - Inquiry
      ZZRCIN1 - Error Handling Function Execute
  VGFNP025 - Converse
  VGFNS003 - Execute
    VGFNP022 - Update
      ZZRCIN2 - Error Handling Function Execute
  VGFNP035 - Converse
  VGFNS004 - Execute
    VGFNP023 - Update
      ZZRCIN2 - Error Handling Function Execute
```

**Hierarquia de Funções**:

```mermaid
graph TD
    A[METOD-0101: VGFNP000<br/>Inicialização] --> B[METOD-0102: VGFNP002<br/>Loop Principal]
    A --> C[METOD-0103: VGFNP001<br/>Inquiry V0SISTEMA]
    
    B --> D[FTELA-0101: VGFNP005<br/>Converse VGFNM010]
    B --> E[METOD-0104: VGFNS002<br/>Valida M010]
    
    E --> F[METOD-0105: VGFNP011<br/>INQUIRY V0APOLICE]
    E --> G[METOD-0106: VGFNP012<br/>INQUIRY V0SUBGRUPO]
    
    B --> H[FTELA-0102: VGFNP025<br/>Converse VGFNM020]
    B --> I[METOD-0107: VGFNS003<br/>Valida M020]
    
    I --> J[METOD-0108: VGFNP022<br/>UPDATE V0SUBGRUPO]
    
    B --> K[FTELA-0103: VGFNP035<br/>Converse VGFNM030]
    B --> L[METOD-0109: VGFNS004<br/>Valida M030]
    
    L --> M[METOD-0110: VGFNP023<br/>UPDATE V0TERMOADESAO]
    
    style A fill:#B4E7CE,stroke:#333,stroke-width:2px,color:#000
    style B fill:#AED6F1,stroke:#333,stroke-width:2px,color:#000
    style C fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style D fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style E fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
    style F fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style G fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style H fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style I fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
    style J fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style K fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style L fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
    style M fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
```

---

## Fluxo Principal de Execução

### 1. Inicialização (METOD-0101)

**Rastreabilidade**:
- **ID Matriz**: `METOD-0101`
- **Função**: `VGFNP000`
- **Tipo**: Main Entry Point
- **Arquivo**: `_LEGADO/vgfna.esf`
- **Linhas**: 2861-2881

**Comando de Visualização**:
```bash
.\vamap.exe _LEGADO/vgfna.esf --code "VGFNP000"
```

**Descrição**:
- Inicializa variáveis globais (EZEFEC, EZECNVCM)
- Limpa workstorage (VGFNW001) e telas (VGFNM010, VGFNM020, VGFNM030)
- Define código da aplicação e usuário
- Define estado inicial: 'MOSTRA TELA M010'
- Chama função para buscar data de abertura do sistema (VGFNP001)
- Chama função principal VGFNP002 (METOD-0102)

**Fluxo**:

```mermaid
flowchart TD
    Start([Início VGFNP000]) --> Init[Inicializar EZEFEC, EZECNVCM]
    Init --> Clear[Limpar VGFNW001 e Telas]
    Clear --> SetApp[Mover 'VGFNA' para CODAPL]
    SetApp --> SetUser[Mover EZEUSRID para USUARIO]
    SetUser --> SetState[Mover 'MOSTRA TELA M010' para W01A0035]
    SetState --> Query[METOD-0103<br/>VGFNP001 Inquiry<br/>V0SISTEMA]
    Query --> Check{Sucesso?}
    Check -->|Sim| FormatData[ZZ20S01<br/>Formatar Data]
    Check -->|Não| Error[Tratamento Erro<br/>ZZRCIN1]
    FormatData --> CallMain[METOD-0102<br/>VGFNP002<br/>Loop Principal]
    Error --> End([Fim])
    CallMain --> End
    
    style Start fill:#B4E7CE,stroke:#333,stroke-width:2px,color:#000
    style Init fill:#AED6F1,stroke:#333,stroke-width:2px,color:#000
    style Clear fill:#AED6F1,stroke:#333,stroke-width:2px,color:#000
    style SetApp fill:#AED6F1,stroke:#333,stroke-width:2px,color:#000
    style SetUser fill:#AED6F1,stroke:#333,stroke-width:2px,color:#000
    style SetState fill:#AED6F1,stroke:#333,stroke-width:2px,color:#000
    style Query fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style Check fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style FormatData fill:#C5E1A5,stroke:#333,stroke-width:2px,color:#000
    style Error fill:#FFCCCB,stroke:#333,stroke-width:2px,color:#000
    style CallMain fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style End fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
```

**Chamado por**: Ninguém (entry point condicional)

**Chama**:
- `METOD-0103`: VGFNP001 (QUERY-0110 - V0SISTEMA)
- `METOD-0102`: VGFNP002 (loop principal)

**Estruturas Usadas**:
- `ENT-0114`: VGFNW001 (workstorage)
- `ENT-0115`: ZZ99W01 (workstorage parâmetros)
- `ENT-0108`: V0SISTEMA (tabela)

---

### 2. Loop Principal (METOD-0102)

**Rastreabilidade**:
- **ID Matriz**: `METOD-0102`
- **Função**: `VGFNP002`
- **Tipo**: Execute (Loop)
- **Arquivo**: `_LEGADO/vgfna.esf`
- **Linhas**: 2918-2951

**Descrição**:

Loop principal de controle de telas. Gerencia navegação entre as 3 telas principais do sistema (VGFNM010, VGFNM020, VGFNM030) baseado no estado armazenado em VGFNW001.W01A0035.

**Fluxo**:

```mermaid
flowchart TD
    Start([Início VGFNP002]) --> LoopStart{WHILE 1=1<br/>Loop Ativo?}
    
    LoopStart -->|Sim| CheckState1{Estado?<br/>W01A0035}
    
    CheckState1 -->|'MOSTRA TELA M010'| ShowM010[FTELA-0101<br/>VGFNP005 CONVERSE M010]
    ShowM010 --> ValidM010[METOD-0104<br/>VGFNS002 Valida M010]
    
    ValidM010 --> CheckAction1{Ação?}
    CheckAction1 -->|Consulta OK| SetState2[Mover 'MOSTRA TELA M020'<br/>para W01A0035]
    CheckAction1 -->|F3 Sair| Exit
    CheckAction1 -->|F12 Cancel| LoopStart
    
    SetState2 --> CheckState2{Estado?}
    CheckState2 -->|'MOSTRA TELA M020'| ShowM020[FTELA-0102<br/>VGFNP025 CONVERSE M020]
    ShowM020 --> ValidM020[METOD-0107<br/>VGFNS003 Valida M020]
    
    ValidM020 --> CheckAction2{Ação?}
    CheckAction2 -->|Alteração OK| SetState3[Mover 'MOSTRA TELA M030'<br/>para W01A0035]
    CheckAction2 -->|F12| SetState1[Mover 'MOSTRA TELA M010'<br/>para W01A0035]
    
    SetState3 --> CheckState3{Estado?}
    CheckState3 -->|'MOSTRA TELA M030'| ShowM030[FTELA-0103<br/>VGFNP035 CONVERSE M030]
    ShowM030 --> ValidM030[METOD-0109<br/>VGFNS004 Valida M030]
    
    ValidM030 --> CheckAction3{Ação?}
    CheckAction3 -->|F12| SetState2
    CheckAction3 -->|F3| Exit
    
    Exit([Fim]) 
    
    style Start fill:#B4E7CE,stroke:#333,stroke-width:2px,color:#000
    style LoopStart fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style CheckState1 fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style ShowM010 fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style ValidM010 fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style CheckAction1 fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style SetState2 fill:#AED6F1,stroke:#333,stroke-width:2px,color:#000
    style CheckState2 fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style ShowM020 fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style ValidM020 fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style CheckAction2 fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style SetState3 fill:#AED6F1,stroke:#333,stroke-width:2px,color:#000
    style CheckState3 fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style ShowM030 fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style ValidM030 fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style CheckAction3 fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style Exit fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
```

**Chamado por**: 
- `METOD-0101`: VGFNP000 (inicialização)

**Chama**:
- `FTELA-0101`: VGFNP005 (CONVERSE VGFNM010)
- `METOD-0104`: VGFNS002 (validação M010)
- `FTELA-0102`: VGFNP025 (CONVERSE VGFNM020)
- `METOD-0107`: VGFNS003 (validação M020)
- `FTELA-0103`: VGFNP035 (CONVERSE VGFNM030)
- `METOD-0109`: VGFNS004 (validação M030)

---

### 3. Validação Tela M010 (METOD-0104)

**Rastreabilidade**:
- **ID Matriz**: `METOD-0104`
- **Função**: `VGFNS002`
- **Tipo**: Execute (Validação)
- **Arquivo**: `_LEGADO/vgfna.esf`
- **Linhas**: ~3100-3300

**Descrição**:

Valida e processa a tela de consulta inicial (VGFNM010). Implementa a lógica de entrada de apólice, validação de teclas e consulta de dados.

**Fluxo**:

```mermaid
flowchart TD
    Start([Início VGFNS002]) --> CheckKey{Tecla<br/>Pressionada?}
    
    CheckKey -->|F3| Exit1[REGRA-0101/0102<br/>ZZ01SGPS3 Sair]
    CheckKey -->|F12| Exit2[REGRA-0105/0106<br/>ZZ01SGPS12 Cancelar]
    CheckKey -->|F4| Consulta[REGRA-0103<br/>Consulta Externa]
    CheckKey -->|F10| Inclusao[REGRA-0104<br/>Consulta Inclusão]
    CheckKey -->|ENTER| Validate
    
    Validate{Validar<br/>Campos} -->|Nenhum| Error[Erro:<br/>Informar apólice]
    
    Validate -->|NUM_APOLICE?| Apolice[REGRA-0108<br/>Apólice Informada]
    Apolice --> QryApolice[REGRA-0109<br/>VGFNP011 INQUIRY<br/>V0APOLICE]
    QryApolice --> CheckFound{Encontrou?}
    CheckFound -->|Não| Error2[Erro:<br/>Apólice não encontrada]
    CheckFound -->|Sim| QrySubgrupo[VGFNP012 INQUIRY<br/>V0SUBGRUPO]
    QrySubgrupo --> SetState[Mover 'MOSTRA TELA M020'<br/>para W01A0035]
    
    Consulta --> Start
    Inclusao --> Start
    Error --> End([Fim])
    Error2 --> End
    Exit1 --> End
    Exit2 --> End
    SetState --> End
    
    style Start fill:#B4E7CE,stroke:#333,stroke-width:2px,color:#000
    style CheckKey fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style Exit1 fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
    style Exit2 fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
    style Consulta fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style Inclusao fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style Validate fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style Error fill:#FFCCCB,stroke:#333,stroke-width:2px,color:#000
    style Apolice fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style QryApolice fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style CheckFound fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style Error2 fill:#FFCCCB,stroke:#333,stroke-width:2px,color:#000
    style QrySubgrupo fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style SetState fill:#C5E1A5,stroke:#333,stroke-width:2px,color:#000
    style End fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
```

**Chamado por**:
- `METOD-0102`: VGFNP002 (loop principal)

**Chama**:
- `METOD-0105`: VGFNP011 (INQUIRY por apólice)
- `METOD-0106`: VGFNP012 (INQUIRY por subgrupo)

**Regras de Negócio**:
- `REGRA-0101` a `REGRA-0109`: Validações e chamadas de funções

---

### 4. Validação Tela M020 (METOD-0107)

**Rastreabilidade**:
- **ID Matriz**: `METOD-0107`
- **Função**: `VGFNS003`
- **Tipo**: Execute (Validação e Business Logic)
- **Arquivo**: `_LEGADO/vgfna.esf`
- **Linhas**: ~3400-3600

**Descrição**:

Valida e processa a tela de alteração de subgrupo (VGFNM020). Implementa validações cruzadas e atualização da tabela V0SUBGRUPO.

**Operações Realizadas**:

1. Validação de teclas (F3, F12, ENTER)
2. Validações cruzadas de campos:
   - Tipo cobrança = 2 → Período e Forma faturamento obrigatórios
   - Tipo apólice = 2 → Validar matrícula apenas 'S'
   - Tipo faturamento condiciona proteção de campos
3. UPDATE na tabela V0SUBGRUPO
4. Navegação para M030 se bem-sucedido

---

### 5. Validação Tela M030 (METOD-0109)

**Rastreabilidade**:
- **ID Matriz**: `METOD-0109`
- **Função**: `VGFNS004`
- **Tipo**: Execute (Validação e Business Logic)

**Descrição**:

Valida e processa a tela de alteração de termo adesão (VGFNM030). Similar à M020 mas aplicado à tabela V0TERMOADESAO.

**Operações Realizadas**:

1. Validação de teclas
2. Validações cruzadas (mesmas da M020)
3. UPDATE na tabela V0TERMOADESAO
4. Retorno para M020 via F12

---

## Fluxo por Caso de Uso

### Caso de Uso 1: Alteração de Dados Básicos - Subgrupo

**Rastreabilidade**:
- **ID Matriz Principal**: `METOD-0104`, `METOD-0107`
- **Tela Inicial**: `TELA-0101` (VGFNM010)
- **Tela Edição**: `TELA-0102` (VGFNM020)

**Fluxo Completo**:

```mermaid
sequenceDiagram
    autonumber
    participant U as Usuário
    participant T1 as TELA-0101<br/>VGFNM010
    participant V1 as METOD-0104<br/>VGFNS002
    participant Q1 as METOD-0105<br/>VGFNP011 INQUIRY
    participant Q2 as METOD-0106<br/>VGFNP012 INQUIRY
    participant T2 as TELA-0102<br/>VGFNM020
    participant V2 as METOD-0107<br/>VGFNS003
    participant U1 as METOD-0108<br/>VGFNP022 UPDATE
    participant DB as Database

    U->>T1: Digite NUM_APOLICE
    U->>T1: Pressiona ENTER
    T1->>V1: CONVERSE (dados)
    activate V1
    
    Note over V1: REGRA-0108<br/>IF NUM_APOLICE<>0
    
    V1->>Q1: REGRA-0109<br/>Buscar apólice
    activate Q1
    Q1->>DB: QUERY-0105<br/>SELECT V0APOLICE<br/>WHERE NUM_APOLICE
    DB-->>Q1: Registro apólice
    deactivate Q1
    
    Note over V1: Verifica se encontrou
    
    V1->>Q2: Buscar dados subgrupo
    activate Q2
    Q2->>DB: QUERY-0101<br/>SELECT V0SUBGRUPO<br/>WHERE NUM_APOLICE, COD_SUBGRUPO
    DB-->>Q2: Registro subgrupo
    deactivate Q2
    
    V1->>T2: Mover 'MOSTRA TELA M020'<br/>para W01A0035
    deactivate V1
    T2-->>U: Mostra tela edição
    
    U->>T2: Altera campos
    U->>T2: Pressiona ENTER
    T2->>V2: CONVERSE (dados alterados)
    activate V2
    
    Note over V2: Validações cruzadas
    
    V2->>U1: Atualizar subgrupo
    activate U1
    U1->>DB: QUERY-0102<br/>UPDATE V0SUBGRUPO<br/>SET campos
    DB-->>U1: Sucesso
    deactivate U1
    
    V2->>T2: Mover 'MOSTRA TELA M030'<br/>para W01A0035
    deactivate V2
    T2-->>U: Exibe sucesso
```

**Passos Detalhados**:

1. **Exibir Tela de Consulta** (`METOD-0102` → `FTELA-0101`)
   - Abre mapa VGFNM010 (`TELA-0101`)
   - Campo NUM_APOLICE (`OBJ-0107`) recebe foco
   
2. **Validar Entrada** (`METOD-0104`)
   - `REGRA-0108`: Verifica se NUM_APOLICE foi informado
   - Se vazio, exibe erro
   
3. **Buscar Apólice** (`METOD-0105`)
   - `REGRA-0109`: CALL VGFNP011
   - `QUERY-0105`: SELECT V0APOLICE WHERE NUM_APOLICE
   - Verifica se encontrou (NOT NRF)
   
4. **Buscar Dados Subgrupo** (`METOD-0106`)
   - CALL VGFNP012
   - QUERY-0101: SELECT V0SUBGRUPO WHERE chave
   
5. **Exibir Tela de Edição** (`FTELA-0102`)
   - Mostra VGFNM020 (`TELA-0102`)
   - Campos preenchidos com dados atuais
   
6. **Validar e Atualizar** (`METOD-0107`)
   - Validações cruzadas
   - UPDATE V0SUBGRUPO (`METOD-0108`)
   - Navega para M030

**Funções Envolvidas**:

| ID Matriz | Função | Tipo | Descrição |
|-----------|--------|------|-----------|
| METOD-0104 | VGFNS002 | Validação | Valida tela M010 |
| METOD-0105 | VGFNP011 | INQUIRY | Busca apólice |
| METOD-0106 | VGFNP012 | INQUIRY | Busca dados subgrupo |
| METOD-0107 | VGFNS003 | Business Logic | Valida e processa M020 |
| METOD-0108 | VGFNP022 | UPDATE | Atualiza V0SUBGRUPO |

**Telas Envolvidas**:
- `TELA-0101`: VGFNM010 (entrada)
- `TELA-0102`: VGFNM020 (edição)

**Dados Envolvidos**:
- `ENT-0101`: V0APOLICE (apólice)
- `ENT-0102`: V0SUBGRUPO (subgrupo)

---

## Análise de Tipos de Função

### Funções CONVERSE (Interface)

**Comando de Identificação**:
```bash
.\vamap.exe _LEGADO/vgfna.esf --code ":converse"
```

| ID Matriz | Função | Mapa Associado | Descrição |
|-----------|--------|----------------|-----------|
| FTELA-0101 | VGFNP005 | VGFNM010 | Tela de consulta inicial |
| FTELA-0102 | VGFNP025 | VGFNM020 | Tela de alteração subgrupo |
| FTELA-0103 | VGFNP035 | VGFNM030 | Tela de alteração termo adesão |

### Funções INQUIRY (Consultas Únicas)

**Comando de Identificação**:
```bash
.\vamap.exe _LEGADO/vgfna.esf --code ":inquiry"
```

| ID Matriz | Função | Tabela | Descrição |
|-----------|--------|--------|-----------|
| METOD-0103 | VGFNP001 | V0SISTEMA | Busca data abertura sistema |
| METOD-0105 | VGFNP011 | V0APOLICE | Busca dados da apólice |
| METOD-0106 | VGFNP012 | V0SUBGRUPO | Busca dados do subgrupo |

### Funções UPDATE (Alteração de Dados)

| ID Matriz | Função | Tabela | Descrição |
|-----------|--------|--------|-----------|
| METOD-0108 | VGFNP022 | V0SUBGRUPO | Atualiza dados do subgrupo |
| METOD-0110 | VGFNP023 | V0TERMOADESAO | Atualiza dados do termo adesão |

---

## Matriz de Dependências

| Função | ID Matriz | Chamada Por | Chama | Usa Dados | Usa Telas |
|--------|-----------|-------------|-------|-----------|-----------|
| VGFNP000 | METOD-0101 | - | VGFNP002, VGFNP001 | VGFNW001, ZZ99W01, V0SISTEMA | - |
| VGFNP002 | METOD-0102 | VGFNP000 | VGFNP005, VGFNS002, ... | VGFNW001 | - |
| VGFNP005 | FTELA-0101 | VGFNP002 | - | VGFNW001 | VGFNM010 |
| VGFNS002 | METOD-0104 | VGFNP002 | VGFNP011, VGFNP012 | V0APOLICE, V0SUBGRUPO, VGFNW001 | - |
| VGFNP025 | FTELA-0102 | VGFNP002 | - | VGFNW001 | VGFNM020 |
| VGFNS003 | METOD-0107 | VGFNP002 | VGFNP022 | V0SUBGRUPO | - |
| VGFNP011 | METOD-0105 | VGFNS002 | - | V0APOLICE | - |
| VGFNP012 | METOD-0106 | VGFNS002 | - | V0SUBGRUPO | - |
| VGFNP022 | METOD-0108 | VGFNS003 | - | V0SUBGRUPO | - |

---

## Diagramas de Contexto

### Diagrama de Componentes

```mermaid
graph TB
    subgraph "Camada de Apresentação"
        T1[TELA-0101: VGFNM010]
        T2[TELA-0102: VGFNM020]
        T3[TELA-0103: VGFNM030]
    end
    
    subgraph "Camada de Validação"
        V1[METOD-0104: VGFNS002]
        V2[METOD-0107: VGFNS003]
        V3[METOD-0109: VGFNS004]
    end
    
    subgraph "Camada de Negócio"
        N1[METOD-0101: VGFNP000<br/>Inicialização]
        N2[METOD-0102: VGFNP002<br/>Loop Principal]
    end
    
    subgraph "Camada de Acesso a Dados - INQUIRY"
        Q1[METOD-0103: VGFNP001<br/>V0SISTEMA]
        Q2[METOD-0105: VGFNP011<br/>V0APOLICE]
        Q3[METOD-0106: VGFNP012<br/>V0SUBGRUPO]
    end
    
    subgraph "Camada de Acesso a Dados - UPDATE"
        U1[METOD-0108: VGFNP022<br/>UPDATE V0SUBGRUPO]
        U2[METOD-0110: VGFNP023<br/>UPDATE V0TERMOADESAO]
    end
    
    subgraph "Camada de Dados"
        D1[(ENT-0101: V0APOLICE)]
        D2[(ENT-0102: V0SUBGRUPO)]
        D3[(ENT-0103: V0TERMOADESAO)]
        D4[(ENT-0108: V0SISTEMA)]
    end
    
    N1 --> N2
    N2 --> T1
    T1 --> V1
    V1 --> Q2
    V1 --> Q3
    V1 --> T2
    T2 --> V2
    V2 --> U1
    V2 --> T3
    T3 --> V3
    V3 --> U2
    
    Q1 --> D4
    Q2 --> D1
    Q3 --> D2
    U1 --> D2
    U2 --> D3
    
    style T1 fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style T2 fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style T3 fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style V1 fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
    style V2 fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
    style V3 fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
    style N1 fill:#B4E7CE,stroke:#333,stroke-width:2px,color:#000
    style N2 fill:#AED6F1,stroke:#333,stroke-width:2px,color:#000
    style Q1 fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style Q2 fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style Q3 fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style U1 fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style U2 fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style D1 fill:#C5E1A5,stroke:#333,stroke-width:2px,color:#000
    style D2 fill:#C5E1A5,stroke:#333,stroke-width:2px,color:#000
    style D3 fill:#C5E1A5,stroke:#333,stroke-width:2px,color:#000
    style D4 fill:#C5E1A5,stroke:#333,stroke-width:2px,color:#000
```

---

## Resumo de Atualizações para Matriz

Os seguintes elementos foram documentados neste arquivo:

| ID Matriz | Elemento | Tipo | Descrição | Linhas |
|-----------|----------|------|-----------|--------|
| METOD-0101 | VGFNP000 | METODO | Processo inicial - inicializacao | 56-90 |
| METOD-0102 | VGFNP002 | METODO | Processo principal - loop controle telas | 92-155 |
| METOD-0103 | VGFNP001 | METODO | Inquiry consulta V0SISTEMA | 59, 86 |
| METOD-0104 | VGFNS002 | METODO | Valida e processa tela M010 | 157-225 |
| METOD-0105 | VGFNP011 | METODO | Inquiry V0APOLICE por numero | 189, 396 |
| METOD-0106 | VGFNP012 | METODO | Inquiry V0SUBGRUPO por chave | 192, 399 |
| METOD-0107 | VGFNS003 | METODO | Valida e processa tela M020 | 198, 403 |
| METOD-0108 | VGFNP022 | METODO | Update V0SUBGRUPO | 202, 410 |
| METOD-0109 | VGFNS004 | METODO | Valida e processa tela M030 | 204, 413 |
| METOD-0110 | VGFNP023 | METODO | Update V0TERMOADESAO | 206, 416 |
| FTELA-0101 | VGFNP005 | FUNCAO_TELA | CONVERSE VGFNM010 | 100, 441 |
| FTELA-0102 | VGFNP025 | FUNCAO_TELA | CONVERSE VGFNM020 | 104, 442 |
| FTELA-0103 | VGFNP035 | FUNCAO_TELA | CONVERSE VGFNM030 | 108, 443 |

**Total**: 13 funções principais documentadas + referências a múltiplos IDs de queries, regras, telas e entidades

---

## ⚠️ Atualização da Matriz Necessária

Deseja atualizar a `MATRIZ_RASTREABILIDADE.csv` com essas referências?

**Campos a atualizar**:
- `Ref_Doc_AsIs` = `03_FLUXO_EXECUCAO_VGFNA.md`
- `Ref_Doc_AsIs_Linhas` = conforme tabela acima
- `Status_Documentacao` = `OK`

**Aguardando aprovação do usuário...**

