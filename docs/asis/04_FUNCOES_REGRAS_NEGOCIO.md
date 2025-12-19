# 04 - Funções e Regras de Negócio AS-IS

## ⚠️ Referência à Matriz

**Arquivo da Matriz**: `MATRIZ_RASTREABILIDADE.csv`

Este documento referencia os seguintes tipos de ID:
- **METOD-NNNN**: Funções/Procedures
- **REGRA-NNNN**: Regras de negócio
- **QUERY-NNNN**: Operações SQL
- **ENT-NNNN**: Estruturas de dados

## Inventário de Funções

### Comando de Extração

```bash
.\vamap.exe _LEGADO/cb2qa.esf --code "|"
```

**Funções Principais Identificadas**:

| ID Matriz | Nome Função | Tipo | Linha Início | Linha Fim | Complexidade |
|-----------|-------------|------|--------------|-----------|--------------|
| METOD-0001 | CB2QP000 | Main/Execute | 3655 | 3684 | Baixa |
| METOD-0002 | CB2QP005 | Execute/Loop | 3686 | 3788 | Média |
| METOD-0003 | CB2QS010 | Execute/Validação | 3790 | 4007 | Alta |
| METOD-0004 | CB2QP019 | Execute/Move | 4027 | 4208 | Média |
| METOD-0005 | CB2QS020 | Execute/Validação | 4228 | 4344 | Média |
| METOD-0006 | CB2QP029 | Execute/Move | 4364 | 4546 | Média |
| METOD-0007 | CB2QS030 | Execute/Validação | 4548 | 4632 | Baixa |
| METOD-0008 | CB2QP032 | Execute/Move | 4634 | 5550 | Alta |
| METOD-0009 | CB2QS040 | Execute/Validação | 5552 | 5576 | Baixa |
| METOD-0010 | CB2QS011 | Execute/Business | 5578 | 6272 | Alta |
| METOD-0011 | CB2QP003 | Inquiry | 6274 | 6289 | Baixa |
| METOD-0012 | CB2QP052 | Inquiry | 6291 | 6323 | Baixa |

---

## Detalhamento por Função

### [METOD-0001] - CB2QP000 - Processo Inicial

**Rastreabilidade**:
- **ID Matriz**: `METOD-0001`
- **Nome**: `CB2QP000`
- **Tipo**: EXECUTE (Main Entry Point)
- **Arquivo**: `_LEGADO/cb2qa.esf`
- **Linhas**: 3655-3684

**Comando de Visualização**:
```bash
.\vamap.exe _LEGADO/cb2qa.esf --code "CB2QP000"
```

**Propósito**:

Função principal de inicialização do programa. Responsável por configurar o ambiente, inicializar workstorage, buscar configurações do sistema e chamar o loop principal.

**Entrada (Parâmetros)**:
- Nenhum parâmetro explícito (entry point)

**Saída (Retorno)**:
- Nenhum retorno explícito

**Chamado Por**: 
- Ninguém (entry point do programa)

**Chama**:

| ID Matriz | Função Chamada | Propósito |
|-----------|----------------|-----------|
| METOD-0011 | CB2QP003 | Buscar data abertura sistema |
| METOD-0002 | CB2QP005 | Loop principal de controle |

**Estruturas de Dados Utilizadas**:

| ID Matriz | Estrutura | Tipo Uso | Descrição |
|-----------|-----------|----------|-----------|
| ENT-0029 | CB2QW001 | Leitura/Escrita | Inicialização workstorage |
| ENT-0027 | V1SISTEMA | Leitura | Consulta data abertura |

**Operações SQL**:

| ID Matriz | Tipo | SQL | Descrição |
|-----------|------|-----|-----------|
| QUERY-0001 | SELECT | SELECT * FROM V1SISTEMA WHERE IDSISTEM = 'CB' | Busca data abertura sistema |

**Regras de Negócio Implementadas**:

Nenhuma regra de negócio complexa. Função de inicialização básica.

**Fluxograma**:

```mermaid
flowchart TD
    Start([Início CB2QP000]) --> Init[Inicializar CB2QW001]
    Init --> CallQ[METOD-0011<br/>CB2QP003 Inquiry<br/>V1SISTEMA]
    CallQ --> Check{Sucesso?}
    Check -->|Sim| SaveData[Salvar data abertura<br/>em CB2QW001]
    Check -->|Não| Error[Tratar erro<br/>ZZRCIN1]
    SaveData --> CallMain[METOD-0002<br/>CB2QP005<br/>Loop Principal]
    Error --> End([Fim])
    CallMain --> End
    
    style Start fill:#B4E7CE,stroke:#333,stroke-width:2px,color:#000
    style Init fill:#AED6F1,stroke:#333,stroke-width:2px,color:#000
    style CallQ fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style Check fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style SaveData fill:#C5E1A5,stroke:#333,stroke-width:2px,color:#000
    style Error fill:#FFCCCB,stroke:#333,stroke-width:2px,color:#000
    style CallMain fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style End fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
```

**Análise de Complexidade**:
- **Complexidade Ciclomática**: 2 (1 IF)
- **Linhas de Código**: 30
- **Nível de Aninhamento**: 1
- **Dependências**: 2 funções chamadas

---

### [METOD-0003] - CB2QS010 - Validação e Processamento Tela M010

**Rastreabilidade**:
- **ID Matriz**: `METOD-0003`
- **Nome**: `CB2QS010`
- **Tipo**: EXECUTE (Validação e Business Logic)
- **Arquivo**: `_LEGADO/cb2qa.esf`
- **Linhas**: 3790-4007

**Propósito**:

Função central de validação e processamento da tela inicial de consulta (CB2QM010). Implementa a lógica de 4 formas de consulta mutuamente exclusivas e orquestra chamadas para buscar dados.

**Entrada (Parâmetros)**:
- Dados da tela CB2QM010 via CB2QW001

**Saída (Retorno)**:
- CB2QW001 preenchido com resultados para exibir em CB2QM020

**Chamado Por**:

| ID Matriz | Função Chamadora | Contexto |
|-----------|------------------|----------|
| METOD-0002 | CB2QP005 | Loop principal após CONVERSE M010 |

**Chama**:

| ID Matriz | Função Chamada | Propósito |
|-----------|----------------|-----------|
| METOD-0012 | CB2QP052 | INQUIRY RD por título |
| METOD-0035 | CB2QP056 | SetInq movimentos por título |
| METOD-0036 | CB2QP053 | SetInq RD por apólice |
| METOD-0037 | CB2QP057 | SetInq movimentos por apólice |
| METOD-0038 | CB2QP054 | SetInq RD por conta |
| METOD-0039 | CB2QP058 | SetInq movimentos por conta |
| - | CB2QP055 | SetInq RD por cartão |
| - | CB2QP059 | SetInq movimentos por cartão |
| - | CB2QP018 | Scan cursor |
| METOD-0010 | CB2QS011 | Processar cada registro |

**Estruturas de Dados Utilizadas**:

| ID Matriz | Estrutura | Tipo Uso | Descrição |
|-----------|-----------|----------|-----------|
| ENT-0029 | CB2QW001 | Leitura/Escrita | Dados da tela e resultados |
| ENT-0003 | CB2QR001 | Leitura | Registros débito automático |

**Regras de Negócio Implementadas**:

#### [REGRA-0001] - Testa Tecla F3 Sair

**Rastreabilidade**:
- **ID Matriz**: `REGRA-0001`
- **Linha**: 3792
- **Arquivo**: `_LEGADO/cb2qa.esf`

**Lógica**:
```cobol
IF EZEAID = PF3 THEN
    CALL ZZ01SGPS3
END-IF
```

**Tradução para Lógica Moderna**:
```csharp
// REGRA-0001: Testa tecla F3 sair
if (keyPressed == FunctionKey.F3)
{
    await ExitProgram();
    return;
}
```

**Condições**:
- **Quando**: Após CONVERSE da tela M010
- **Se**: Usuário pressiona F3
- **Então**: Chama função de saída (ZZ01SGPS3)

---

#### [REGRA-0002] - Chamar Função Sair

**Rastreabilidade**:
- **ID Matriz**: `REGRA-0002`
- **Linha**: 3793

**Lógica**:
```cobol
CALL ZZ01SGPS3
```

**Tradução**:
```csharp
// REGRA-0002: Função sair
await systemService.Exit();
```

---

#### [REGRA-0003] - Testa Tecla F12 Cancelar

**Rastreabilidade**:
- **ID Matriz**: `REGRA-0003`
- **Linha**: 3795

**Lógica**:
```cobol
IF EZEAID = PF12 THEN
    CALL ZZ01SGPS12
END-IF
```

**Tradução**:
```csharp
// REGRA-0003: Testa tecla F12 cancelar
if (keyPressed == FunctionKey.F12)
{
    await CancelOperation();
    return;
}
```

---

#### [REGRA-0007] - Verifica Título Informado

**Rastreabilidade**:
- **ID Matriz**: `REGRA-0007`
- **Linha**: 3817

**Lógica**:
```cobol
IF NUM_TITULO <> 0 THEN
    CALL CB2QP052
    IF CB2QR001 NOT NRF THEN
        CALL CB2QP056
    END-IF
END-IF
```

**Tradução**:
```csharp
// REGRA-0007: Verifica título informado
if (!string.IsNullOrEmpty(numeroTitulo) && numeroTitulo != "0")
{
    // REGRA-0008: Busca RD por título
    var registroRD = await registroDebAutoRepository.GetByTitulo(numeroTitulo);
    
    // REGRA-0009: Verifica se encontrou
    if (registroRD != null)
    {
        // REGRA-0010: Busca movimentos do título
        var movimentos = await movimentoRepository.GetByTitulo(numeroTitulo);
        return movimentos;
    }
    else
    {
        throw new NotFoundException("Registro de débito automático não encontrado");
    }
}
```

**Condições**:
- **Quando**: Após ENTER na tela M010
- **Se**: Campo NUM_TITULO foi preenchido
- **Então**: Busca RD por título e seus movimentos

---

#### [REGRA-0011] - Verifica Apólice Informada

**Rastreabilidade**:
- **ID Matriz**: `REGRA-0011`
- **Linha**: 3828

**Lógica**:
```cobol
IF NUM_APOLICE <> 0 THEN
    CALL CB2QP053
    CALL CB2QP057
END-IF
```

**Tradução**:
```csharp
// REGRA-0011: Verifica apólice informada
if (!string.IsNullOrEmpty(numeroApolice) && numeroApolice != "0")
{
    // REGRA-0012: Busca RDs por apólice (cursor)
    var registrosRD = await registroDebAutoRepository.GetByApolice(
        numeroApolice, 
        numeroEndosso
    );
    
    // REGRA-0013: Busca movimentos das apólices
    var movimentos = await movimentoRepository.GetByApolice(numeroApolice);
    
    return CombineResults(registrosRD, movimentos);
}
```

---

#### [REGRA-0014] - Verifica Conta Informada

**Rastreabilidade**:
- **ID Matriz**: `REGRA-0014`
- **Linha**: 3841

**Lógica**:
```cobol
IF COD_AGENCIA <> 0 AND NUM_CONTA <> 0 THEN
    CALL CB2QP054
    CALL CB2QP058
END-IF
```

**Tradução**:
```csharp
// REGRA-0014: Verifica conta informada
if (codigoAgencia > 0 && numeroConta > 0)
{
    // REGRA-0015: Busca RDs por conta
    var registrosRD = await registroDebAutoRepository.GetByConta(
        codigoAgencia,
        operacaoConta,
        numeroConta,
        digitoConta
    );
    
    // REGRA-0016: Busca movimentos da conta
    var movimentos = await movimentoRepository.GetByConta(
        codigoAgencia,
        operacaoConta,
        numeroConta
    );
    
    return CombineResults(registrosRD, movimentos);
}
```

---

#### [REGRA-0017] - Verifica Cartão Informado

**Rastreabilidade**:
- **ID Matriz**: `REGRA-0017`
- **Linha**: 3855

**Lógica**:
```cobol
IF WK_CARTAO <> 0 THEN
    CALL CB2QP055
    CALL CB2QP059
END-IF
```

**Tradução**:
```csharp
// REGRA-0017: Verifica cartão informado
if (!string.IsNullOrEmpty(numeroCartao) && numeroCartao != "0")
{
    // REGRA-0018: Busca RDs por cartão
    var registrosRD = await registroDebAutoRepository.GetByCartao(
        numeroCartao,
        digitoCartao
    );
    
    // REGRA-0019: Busca movimentos do cartão
    var movimentos = await movimentoRepository.GetByCartao(numeroCartao);
    
    return CombineResults(registrosRD, movimentos);
}
```

---

**Fluxograma da Função**:

```mermaid
flowchart TD
    Start([Início CB2QS010]) --> CheckF3{REGRA-0001<br/>F3?}
    CheckF3 -->|Sim| Exit1[REGRA-0002<br/>ZZ01SGPS3]
    CheckF3 -->|Não| CheckF12{REGRA-0003<br/>F12?}
    
    CheckF12 -->|Sim| Exit2[REGRA-0004<br/>ZZ01SGPS12]
    CheckF12 -->|Não| CheckF5{REGRA-0005<br/>F5?}
    
    CheckF5 -->|Sim| Clear[Limpar campos]
    CheckF5 -->|Não| Validate
    
    Validate{REGRA-0006<br/>ENTER?} -->|Não| Error1[Erro:<br/>Tecla inválida]
    
    Validate -->|Sim| CheckCriteria{Critério<br/>Informado?}
    CheckCriteria -->|Nenhum| Error2[Erro:<br/>Informar critério]
    
    CheckCriteria -->|Título| Titulo[REGRA-0007<br/>NUM_TITULO<>0]
    Titulo --> InqTitulo[REGRA-0008<br/>CB2QP052 INQUIRY]
    InqTitulo --> CheckTitulo{REGRA-0009<br/>Encontrou?}
    CheckTitulo -->|Sim| SetInqTit[REGRA-0010<br/>CB2QP056 SetInq]
    CheckTitulo -->|Não| Error3[Erro:<br/>Não encontrado]
    
    CheckCriteria -->|Apólice| Apolice[REGRA-0011<br/>NUM_APOLICE<>0]
    Apolice --> SetInqAp1[REGRA-0012<br/>CB2QP053 SetInq]
    SetInqAp1 --> SetInqAp2[REGRA-0013<br/>CB2QP057 SetInq]
    
    CheckCriteria -->|Conta| Conta[REGRA-0014<br/>AGENCIA+CONTA]
    Conta --> SetInqCt1[REGRA-0015<br/>CB2QP054 SetInq]
    SetInqCt1 --> SetInqCt2[REGRA-0016<br/>CB2QP058 SetInq]
    
    CheckCriteria -->|Cartão| Cartao[REGRA-0017<br/>WK_CARTAO<>0]
    Cartao --> SetInqCar1[REGRA-0018<br/>CB2QP055 SetInq]
    SetInqCar1 --> SetInqCar2[REGRA-0019<br/>CB2QP059 SetInq]
    
    SetInqTit --> Scan[CB2QP018<br/>Scan Cursor]
    SetInqAp2 --> Scan
    SetInqCt2 --> Scan
    SetInqCar2 --> Scan
    
    Scan --> Process[METOD-0010<br/>CB2QS011<br/>Processar Registros]
    Process --> ShowResult[Exibir CB2QM020]
    
    Clear --> Start
    Exit1 --> End([Fim])
    Exit2 --> End
    Error1 --> End
    Error2 --> End
    Error3 --> End
    ShowResult --> End
    
    style Start fill:#B4E7CE,stroke:#333,stroke-width:2px,color:#000
    style CheckF3 fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style Exit1 fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
    style CheckF12 fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style Exit2 fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
    style CheckF5 fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style Clear fill:#AED6F1,stroke:#333,stroke-width:2px,color:#000
    style Validate fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style Error1 fill:#FFCCCB,stroke:#333,stroke-width:2px,color:#000
    style CheckCriteria fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style Error2 fill:#FFCCCB,stroke:#333,stroke-width:2px,color:#000
    style Titulo fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style InqTitulo fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style CheckTitulo fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style SetInqTit fill:#C5E1A5,stroke:#333,stroke-width:2px,color:#000
    style Error3 fill:#FFCCCB,stroke:#333,stroke-width:2px,color:#000
    style Apolice fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style SetInqAp1 fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style SetInqAp2 fill:#C5E1A5,stroke:#333,stroke-width:2px,color:#000
    style Conta fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style SetInqCt1 fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style SetInqCt2 fill:#C5E1A5,stroke:#333,stroke-width:2px,color:#000
    style Cartao fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style SetInqCar1 fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style SetInqCar2 fill:#C5E1A5,stroke:#333,stroke-width:2px,color:#000
    style Scan fill:#AED6F1,stroke:#333,stroke-width:2px,color:#000
    style Process fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style ShowResult fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style End fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
```

**Análise de Complexidade**:
- **Complexidade Ciclomática**: 15 (múltiplos IFs aninhados)
- **Linhas de Código**: 217
- **Nível de Aninhamento**: 3
- **Dependências**: 10+ funções chamadas

---

### [METOD-0010] - CB2QS011 - Processamento de Registro Individual

**Rastreabilidade**:
- **ID Matriz**: `METOD-0010`
- **Nome**: `CB2QS011`
- **Tipo**: EXECUTE (Business Logic)
- **Arquivo**: `_LEGADO/cb2qa.esf`
- **Linhas**: 5578-6272

**Propósito**:

Processa cada registro individual retornado pelos cursores. Busca dados complementares de múltiplas tabelas para montar informações completas para exibição na tela CB2QM020.

**Operações Realizadas**:

1. **Buscar Dados Movimento Conta** (GE_MOVTO_CONTA)
2. **Buscar Dados Apólice Cobrança** (V0APOLCOB)
3. **Buscar Dados Cliente** (V0CLIENTE)
4. **Buscar Dados Pessoa Física ou Jurídica**
5. **Buscar Dados Endosso** (V1ENDOSSO)
6. **Buscar Dados Bancários**
7. **Formatar e Montar Estrutura** para grid CB2QM020

**Queries Envolvidas**:

| ID Matriz | Query | Tabela | Descrição |
|-----------|-------|--------|-----------|
| QUERY-0003 | CB2QP012 | GE_MOVTO_CONTA | Busca movimento conta |
| QUERY-0004 | CB2QP042 | V0APOLCOB | Busca dados apólice |
| QUERY-0018 | CB2QP14A | V0CLIENTE | Busca dados cliente |
| QUERY-0007 | CB2QP026 | OD_PESSOA_FISICA | Busca dados PF |
| QUERY-0008 | CB2QP027 | OD_PESSOA_JURIDICA | Busca dados PJ |
| QUERY-0011 | CB2QP013 | V1ENDOSSO | Busca dados endosso |
| QUERY-0022 | CB2QP009 | BANCOS | Busca nome banco |

**Fluxo Simplificado**:

```mermaid
flowchart TD
    Start([Registro do Cursor]) --> GetMovto[QUERY-0003<br/>GE_MOVTO_CONTA]
    GetMovto --> GetApol[QUERY-0004<br/>V0APOLCOB]
    GetApol --> GetCliente[QUERY-0018<br/>V0CLIENTE]
    GetCliente --> CheckTipo{Tipo<br/>Pessoa?}
    CheckTipo -->|PF| GetPF[QUERY-0007<br/>OD_PESSOA_FISICA]
    CheckTipo -->|PJ| GetPJ[QUERY-0008<br/>OD_PESSOA_JURIDICA]
    GetPF --> GetEndosso
    GetPJ --> GetEndosso[QUERY-0011<br/>V1ENDOSSO]
    GetEndosso --> GetBanco[QUERY-0022<br/>BANCOS]
    GetBanco --> Format[Formatar Dados<br/>para Grid]
    Format --> AddToList[Adicionar à Lista<br/>CB2QW001]
    AddToList --> End([Próximo Registro])
    
    style Start fill:#B4E7CE,stroke:#333,stroke-width:2px,color:#000
    style GetMovto fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style GetApol fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style GetCliente fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style CheckTipo fill:#FAD7A0,stroke:#333,stroke-width:2px,color:#000
    style GetPF fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style GetPJ fill:#F9E79F,stroke:#333,stroke-width:2px,color:#000
    style GetEndosso fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style GetBanco fill:#D7BDE2,stroke:#333,stroke-width:2px,color:#000
    style Format fill:#C5E1A5,stroke:#333,stroke-width:2px,color:#000
    style AddToList fill:#AED6F1,stroke:#333,stroke-width:2px,color:#000
    style End fill:#F8B4D9,stroke:#333,stroke-width:2px,color:#000
```

---

## Análise de Regras de Negócio

### Comando de Identificação

```bash
# Ver todas validações
.\vamap.exe _LEGADO/cb2qa.esf --code ";IF"

# Ver loops/iterações
.\vamap.exe _LEGADO/cb2qa.esf --code ";WHILE"

# Ver atribuições
.\vamap.exe _LEGADO/cb2qa.esf --code ";MOVE"

# Ver chamadas
.\vamap.exe _LEGADO/cb2qa.esf --code ";CALL"
```

### Catálogo de Regras de Negócio

| ID Matriz | Descrição | Função | Linha | Criticidade |
|-----------|-----------|--------|-------|-------------|
| REGRA-0001 | IF EZEAID=PF3 - Testa tecla F3 sair | CB2QS010 | 3792 | Baixa |
| REGRA-0002 | CALL ZZ01SGPS3 - Funcao sair | CB2QS010 | 3793 | Baixa |
| REGRA-0003 | IF EZEAID=PF12 - Testa tecla F12 cancelar | CB2QS010 | 3795 | Baixa |
| REGRA-0004 | CALL ZZ01SGPS12 - Funcao cancelar | CB2QS010 | 3796 | Baixa |
| REGRA-0005 | IF EZEAID=PF5 - Testa tecla F5 limpar | CB2QS010 | 3798 | Baixa |
| REGRA-0006 | IF EZEAID NOT ENTER - Valida tecla invalida | CB2QS010 | 3802 | Média |
| REGRA-0007 | IF NUM_TITULO<>0 - Verifica titulo informado | CB2QS010 | 3817 | **Alta** |
| REGRA-0008 | CALL CB2QP052 - Busca registro auto RD titulo | CB2QS010 | 3821 | **Alta** |
| REGRA-0009 | IF CB2QR001 NOT NRF - Verifica encontrou RD | CB2QS010 | 3822 | **Alta** |
| REGRA-0010 | CALL CB2QP056 - Cursor movimentos titulo RD | CB2QS010 | 3825 | **Alta** |
| REGRA-0011 | IF NUM_APOLICE<>0 - Verifica apolice informada | CB2QS010 | 3828 | **Alta** |
| REGRA-0012 | CALL CB2QP053 - Cursor auto RD apolice | CB2QS010 | 3832 | **Alta** |
| REGRA-0013 | CALL CB2QP057 - Cursor movimentos apolice RD | CB2QS010 | 3837 | **Alta** |
| REGRA-0014 | IF COD_AGENCIA<>0 AND NUM_CONTA<>0 - Conta informada | CB2QS010 | 3841 | **Alta** |
| REGRA-0015 | CALL CB2QP054 - Cursor auto RD conta | CB2QS010 | 3846 | **Alta** |
| REGRA-0016 | CALL CB2QP058 - Cursor movimentos conta RD | CB2QS010 | 3851 | **Alta** |
| REGRA-0017 | IF WK_CARTAO<>0 - Verifica cartao informado | CB2QS010 | 3855 | **Alta** |
| REGRA-0018 | CALL CB2QP055 - Cursor auto RD cartao | CB2QS010 | 3860 | **Alta** |
| REGRA-0019 | CALL CB2QP059 - Cursor movimentos cartao RD | CB2QS010 | 3865 | **Alta** |

---

## Matriz de Rastreabilidade de Regras

| ID Matriz | Regra | Função | Tela | Dados | Tipo |
|-----------|-------|--------|------|-------|------|
| REGRA-0001 | IF EZEAID=PF3 | CB2QS010 | CB2QM010 | - | Interface |
| REGRA-0007 | IF NUM_TITULO<>0 | CB2QS010 | CB2QM010 | CB2QR001 | Negócio |
| REGRA-0008 | CALL CB2QP052 | CB2QS010 | - | CB2QR001 | Acesso Dados |
| REGRA-0011 | IF NUM_APOLICE<>0 | CB2QS010 | CB2QM010 | CB2QR001 | Negócio |
| REGRA-0014 | IF AGENCIA+CONTA<>0 | CB2QS010 | CB2QM010 | CB2QR001 | Negócio |
| REGRA-0017 | IF WK_CARTAO<>0 | CB2QS010 | CB2QM010 | CB2QR001 | Negócio |

---

## Resumo de Atualizações para Matriz

Os seguintes elementos foram documentados neste arquivo:

| ID Matriz | Elemento | Tipo | Descrição | Linhas |
|-----------|----------|------|-----------|--------|
| METOD-0001 | CB2QP000 | METODO | Processo inicial - inicializacao | 56-117 |
| METOD-0003 | CB2QS010 | METODO | Valida e processa tela M010 | 119-246 |
| METOD-0010 | CB2QS011 | METODO | Processa registro individual consulta | 248-293 |
| REGRA-0001 | IF EZEAID=PF3 | REGRA | Testa tecla F3 sair | 155, 393 |
| REGRA-0002 | CALL ZZ01SGPS3 | REGRA | Funcao sair | 166, 393 |
| REGRA-0003 | IF EZEAID=PF12 | REGRA | Testa tecla F12 cancelar | 178, 393 |
| REGRA-0004 | CALL ZZ01SGPS12 | REGRA | Funcao cancelar | 189, 393 |
| REGRA-0005 | IF EZEAID=PF5 | REGRA | Testa tecla F5 limpar | 200, 393 |
| REGRA-0006 | IF EZEAID NOT ENTER | REGRA | Valida tecla invalida | 211, 393 |
| REGRA-0007 | IF NUM_TITULO<>0 | REGRA | Verifica titulo informado | 212, 394 |
| REGRA-0008 | CALL CB2QP052 | REGRA | Busca registro auto RD titulo | 217, 394 |
| REGRA-0009 | IF CB2QR001 NOT NRF | REGRA | Verifica encontrou RD | 222, 394 |
| REGRA-0010 | CALL CB2QP056 | REGRA | Cursor movimentos titulo RD | 227, 394 |
| REGRA-0011 | IF NUM_APOLICE<>0 | REGRA | Verifica apolice informada | 247, 395 |
| REGRA-0012 | CALL CB2QP053 | REGRA | Cursor auto RD apolice | 253, 395 |
| REGRA-0013 | CALL CB2QP057 | REGRA | Cursor movimentos apolice RD | 257, 395 |
| REGRA-0014 | IF COD_AGENCIA<>0 AND NUM_CONTA<>0 | REGRA | Conta informada | 274, 396 |
| REGRA-0015 | CALL CB2QP054 | REGRA | Cursor auto RD conta | 283, 396 |
| REGRA-0016 | CALL CB2QP058 | REGRA | Cursor movimentos conta RD | 291, 396 |
| REGRA-0017 | IF WK_CARTAO<>0 | REGRA | Verifica cartao informado | 312, 397 |
| REGRA-0018 | CALL CB2QP055 | REGRA | Cursor auto RD cartao | 320, 397 |
| REGRA-0019 | CALL CB2QP059 | REGRA | Cursor movimentos cartao RD | 328, 397 |

**Total**: 3 Métodos principais documentados + 19 Regras de negócio detalhadas = 22 elementos

---

## ⚠️ Atualização da Matriz Necessária

Deseja atualizar a `MATRIZ_RASTREABILIDADE.csv` com essas referências?

**Campos a atualizar**:
- `Ref_Doc_AsIs` = `04_FUNCOES_REGRAS_NEGOCIO.md`
- `Ref_Doc_AsIs_Linhas` = conforme tabela acima
- `Status_Documentacao` = `OK`

**Aguardando aprovação do usuário...**

