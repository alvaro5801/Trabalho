# Ver Detalhes de Estrutura de Dados

Exibe informações detalhadas de uma estrutura de dados específica, incluindo todos os campos, tipos, tamanhos e metadados.

## Como usar

```bash
.\vamap.exe _LEGADO\<nome-arquivo>.esf --code "<NOME_ESTRUTURA>\"
```

**Nota:** O caractere `\` no final é obrigatório!

## O que este comando faz

- Mostra **metadados** da estrutura (org, usage, SQL table)
- Lista **todos os campos** com seus atributos
- Exibe **tipos de dados** (BIN, PACK, CHA, NUM)
- Mostra **tamanhos** em bytes
- Indica **decimais** para campos numéricos
- Revela **flags** (ReadOnly, Key, Usage, EvenSql)
- Exibe **DataCode** (mapeamento SQL)
- Identifica **nível hierárquico** dos campos

## Exemplo de uso

**Ver detalhes de uma tabela SQL:**

```bash
.\vamap.exe _LEGADO\vgfna.esf --code "V0SUBGRUPO\"
```

**Ver detalhes de uma estrutura interna:**

```bash
.\vamap.exe _LEGADO\vgfna.esf --code "VGFNW001\"
```

## Saída esperada

```
TabRec: V0SUBGRUPO (FUNCTION)
    Record: V0SUBGRUPO
      Org: SQLROW
      Usage: SHARED
      SQL Tables:
        TableId: seguros.v0subgrupo, Label: T1, TblNhVar: N
      RecdItems:
        Level 10: NUM_APOLICE
            Usage: SHARED
            ColName: NUM_APOLICE
            ReadOnly: N
            Key: N
          Item: NUM_APOLICE - PACK(7 bytes), 0 decimals, Sign: N
        Level 10: COD_SUBGRUPO
            Usage: SHARED
            ColName: COD_SUBGRUPO
            ReadOnly: N
            Key: N
          Item: COD_SUBGRUPO - BIN(2 bytes), 0 decimals, Sign: N
        [... mais campos ...]
```

## Interpretação da Saída

### Metadados da Estrutura

**Org (Organização):**
- `SQLROW` → Tabela SQL (registro único)
- `WORKSTOR` → Área de trabalho interna

**Usage:**
- `SHARED` → Compartilhada entre funções
- `NONSHARED` → Uso exclusivo

**SQL Tables:**
- `TableId` → Nome completo da tabela no DB2
- `Label` → Alias usado nas queries (ex: T1, T2)

### Informações de Campos

**Level (Nível):**
- `10` → Campo principal
- `15` → Sub-campo ou redefinição

**Tipos de Dados:**

| Tipo COBOL | SQL Equivalente | Descrição |
|------------|-----------------|-----------|
| **BIN(2)** | SMALLINT | Inteiro de 2 bytes |
| **BIN(4)** | INTEGER | Inteiro de 4 bytes |
| **PACK(n)** | NUMERIC/DECIMAL | Decimal compactado |
| **CHA(n)** | CHAR/VARCHAR | Alfanumérico |
| **NUM(n)** | NUMERIC | Numérico com sinal |

**Flags:**
- `ReadOnly: N` → Campo pode ser modificado
- `Key: N` → Não é chave primária
- `EvenSql: Y` → Usa conversão SQL especial

**DataCode:**
- `453` → Tipo CHAR (caractere)
- Outros valores → Tipos específicos do sistema

## Tipos de Estruturas

### FUNCTION (Tabelas SQL)

Representam tabelas do banco DB2:

```bash
.\vamap.exe _LEGADO\vgfna.esf --code "V0APOLICE\"
.\vamap.exe _LEGADO\vgfna.esf --code "V0CLIENTE\"
.\vamap.exe _LEGADO\vgfna.esf --code "V0SUBGRUPO\"
```

**Características:**
- Org: `SQLROW`
- Possui `SQL Tables: TableId`
- Campos mapeados para colunas (`ColName`)

### RECORD (Estruturas Internas)

Estruturas de memória do programa:

```bash
.\vamap.exe _LEGADO\vgfna.esf --code "VGFNW001\"
.\vamap.exe _LEGADO\va2va.esf --code "VA2VW002\"
```

**Características:**
- Org: `WORKSTOR`
- Não tem `SQL Tables`
- Usadas para processamento temporário

### TABLE (Tabelas de Domínio)

Tabelas de mensagens ou valores fixos:

```bash
.\vamap.exe _LEGADO\vgfna.esf --code "VGMSGT1\"
```

## Quando usar

### 📊 Mapear Modelo de Dados

**Objetivo:** Entender estrutura de tabelas SQL

```bash
# Listar todas as tabelas
.\vamap.exe _LEGADO\vgfna.esf --code "\FUNCTION"

# Ver detalhes de cada uma
.\vamap.exe _LEGADO\vgfna.esf --code "V0SUBGRUPO\"
.\vamap.exe _LEGADO\vgfna.esf --code "V0PRODUTOSVG\"
```

**Use para:**
- ✅ Gerar entidades C#/Java
- ✅ Criar scripts SQL
- ✅ Documentar modelo de dados
- ✅ Planejar migração

### 🔍 Entender Work Areas

**Objetivo:** Ver estruturas internas de processamento

```bash
# Listar work areas
.\vamap.exe _LEGADO\vgfna.esf --code "\RECORD"

# Ver detalhes
.\vamap.exe _LEGADO\vgfna.esf --code "VGFNW001\"
```

**Use para:**
- ✅ Entender fluxo de dados
- ✅ Identificar campos calculados
- ✅ Mapear transformações
- ✅ Criar DTOs/ViewModels

### 🎯 Análise de Campos Específicos

**Cenário:** Preciso saber o tipo exato de um campo

```bash
# Ver estrutura completa
.\vamap.exe _LEGADO\vgfna.esf --code "V0SUBGRUPO\" | grep -A 5 "FORMA_FATURAMENTO"
```

**Informações obtidas:**
- Tipo de dado (BIN, PACK, CHA)
- Tamanho em bytes
- Número de decimais
- Se é nullable
- Nome da coluna SQL

## Mapeamento para Código

### Exemplo: V0SUBGRUPO → Classe C#

**Saída vamap.exe:**
```
Level 10: NUM_APOLICE
  Item: NUM_APOLICE - PACK(7 bytes), 0 decimals, Sign: N
Level 10: COD_SUBGRUPO
  Item: COD_SUBGRUPO - BIN(2 bytes), 0 decimals, Sign: N
Level 10: FORMA_FATURAMENTO
  Item: FORMA_FATURAMENTO - CHA(1 bytes), 0 decimals
  DataCode: 453 (CHAR)
Level 10: PERI_FATURAMENTO
  Item: PERI_FATURAMENTO - BIN(2 bytes), 0 decimals, Sign: N
Level 10: PCT_CONJUGE_VG
  Item: PCT_CONJUGE_VG - PACK(3 bytes), 2 decimals, Sign: N
Level 10: DTINCLUS
  Item: DTINCLUS - CHA(10 bytes), 0 decimals
  DataCode: 453 (CHAR)
```

**Conversão para C#:**
```csharp
public class Subgrupo
{
    // PACK(7,0) → long
    public long NumApolice { get; set; }
    
    // BIN(2) → short
    public short CodSubgrupo { get; set; }
    
    // CHA(1) → char ou enum
    public char FormaFaturamento { get; set; }
    
    // BIN(2) → short
    public short PeriodoFaturamento { get; set; }
    
    // PACK(3,2) → decimal com 2 casas
    [Column(TypeName = "decimal(5,2)")]
    public decimal PctConjugeVG { get; set; }
    
    // CHA(10) formato DD/MM/YYYY → DateTime?
    public DateTime? DtInclusao { get; set; }
}
```

## Dicas de Conversão

### Tipos Numéricos

| COBOL | C# | Java | SQL Server |
|-------|-----|------|------------|
| BIN(2) | `short` | `Short` | `SMALLINT` |
| BIN(4) | `int` | `Integer` | `INT` |
| PACK(7,0) | `long` | `Long` | `BIGINT` |
| PACK(3,2) | `decimal` | `BigDecimal` | `DECIMAL(5,2)` |

### Campos Texto

| COBOL | C# | Java | SQL Server |
|-------|-----|------|------------|
| CHA(1) | `char` | `char` | `CHAR(1)` |
| CHA(10) | `string` | `String` | `VARCHAR(10)` |
| CHA(n) data | `DateTime?` | `LocalDate` | `DATE` |

### Campos com Decimais

**PACK(n, d)** onde `d` > 0:

```csharp
// PACK(3,2) = 3 bytes, 2 decimais
// Valores: -999.99 a +999.99
[Column(TypeName = "decimal(5,2)")]
public decimal PctConjuge { get; set; }

// PACK(5,5) = 5 bytes, 5 decimais
// Valores: -9999.99999 a +9999.99999
[Column(TypeName = "decimal(10,5)")]
public decimal DescontoAdesao { get; set; }
```

## Campos Especiais

### Fillers (Campos Anônimos)

**Saída:**
```
Level 15: * - CHA(43 bytes), 0 decimals
    Usage: NONSHARED
    EvenSql: N
```

**Significado:** Espaço reservado, não usado. Ignorar na conversão.

### Campos Redefinidos

**Saída:**
```
Level 10: W02A0077 - CHA(77 bytes)
  Level 15: * - CHA(43 bytes)
  Level 15: W01N0400 - NUM(4 bytes)
  Level 15: * - CHA(30 bytes)
```

**Significado:** Campo `W02A0077` é subdividido. Usar sub-campos na conversão.

## Workflow Completo

### 1. Listar todas as estruturas

```bash
.\vamap.exe _LEGADO\vgfna.esf --code "\"
```

### 2. Filtrar por tipo

```bash
# Tabelas SQL
.\vamap.exe _LEGADO\vgfna.esf --code "\FUNCTION"

# Estruturas internas
.\vamap.exe _LEGADO\vgfna.esf --code "\RECORD"
```

### 3. Analisar cada estrutura

```bash
# Para cada estrutura listada
.\vamap.exe _LEGADO\vgfna.esf --code "V0SUBGRUPO\"
.\vamap.exe _LEGADO\vgfna.esf --code "V0APOLICE\"
.\vamap.exe _LEGADO\vgfna.esf --code "VGFNW001\"
```

### 4. Gerar classes

```bash
# Salvar em arquivo para análise
.\vamap.exe _LEGADO\vgfna.esf --code "V0SUBGRUPO\" > docs/estrutura_subgrupo.txt

# Criar classe C# baseada na saída
# (Ver seção "Mapeamento para Código" acima)
```

## Casos de Uso Práticos

### 🎯 Caso 1: Criar Entidade do EF Core

```bash
# 1. Ver estrutura
.\vamap.exe _LEGADO\vgfna.esf --code "V0SUBGRUPO\"

# 2. Identificar:
#    - Campos chave (Key: Y)
#    - Tipos de dados
#    - Campos nullable
#    - Nome da tabela SQL (TableId)

# 3. Gerar código C#
```

### 🎯 Caso 2: Entender Regras de Validação

```bash
# 1. Ver campos da estrutura
.\vamap.exe _LEGADO\vgfna.esf --code "V0SUBGRUPO\"

# 2. Ver onde estrutura é usada
.\vamap.exe _LEGADO\vgfna.esf --code ";MOVE(V0SUBGRUPO)"

# 3. Ver funções que validam
.\vamap.exe _LEGADO\vgfna.esf --code ";IF(FORMA_FATURAMENTO)"
```

### 🎯 Caso 3: Documentar API

```bash
# Para cada endpoint, documentar estruturas:
.\vamap.exe _LEGADO\vgfna.esf --code "V0SUBGRUPO\" > docs/api/subgrupo_schema.txt
```

## Próximos passos

Após analisar estruturas:

1. Usar `/vamap-function` para ver como são usadas
2. Usar `/vamap-commands` para rastrear transformações
3. Criar modelo de dados na nova arquitetura
4. Mapear relacionamentos entre tabelas
5. Documentar regras de validação

---

**Dica Pro:** Combine com outros comandos para análise completa:

```bash
# Ver estrutura
.\vamap.exe _LEGADO\vgfna.esf --code "V0SUBGRUPO\"

# Ver quem usa
.\vamap.exe _LEGADO\vgfna.esf --code ";MOVE(V0SUBGRUPO)"

# Ver validações
.\vamap.exe _LEGADO\vgfna.esf --code ";IF" | grep -i "subgrupo"
```

