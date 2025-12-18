# Analisar Estruturas de Dados

Exibe as estruturas de dados (records, tabelas SQL, workstorage) usadas no programa ESF.

## Como usar

**Listar todas as estruturas:**

```bash
.\vamap.exe _LEGADO\<nome-arquivo>.esf --code "\"
```

**Listar estruturas de um tipo:**

```bash
.\vamap.exe _LEGADO\<nome-arquivo>.esf --code "\RECORD"
.\vamap.exe _LEGADO\<nome-arquivo>.esf --code "\FUNCTION"
.\vamap.exe _LEGADO\<nome-arquivo>.esf --code "\WORKSTOR"
```

**Ver detalhes de uma estrutura:**

```bash
.\vamap.exe _LEGADO\<nome-arquivo>.esf --code "<NOME_ESTRUTURA>\"
```

## O que este comando faz

- Lista todas as tabelas SQL acessadas
- Mostra estruturas internas (RECORD)
- Exibe workstorage areas
- Detalha campos, tipos e tamanhos
- Identifica arrays (occurs)

## Exemplo de uso

**Listar todas as estruturas:**

```bash
.\vamap.exe _LEGADO\va2va.esf --code "\"
```

**Saída:**
```
TabRecs Overview:
=================
  SEGURADOS_VGAP (FUNCTION)    ← Tabela SQL
  V0PRODUTOSVG (FUNCTION)      ← Tabela SQL
  V0RELATORIOS (FUNCTION)      ← Tabela SQL
  V1SISTEMA (FUNCTION)         ← Tabela SQL
  VA2VW001 (RECORD)            ← Estrutura interna
  VA2VW002 (RECORD)            ← Estrutura interna
  ZZ20W01 (RECORD)             ← Estrutura interna
  ZZ99W01 (RECORD)             ← Estrutura interna
  ZZ01W001 (WORKSTOR)          ← Workstorage
```

**Ver detalhes de um array:**

```bash
.\vamap.exe _LEGADO\va2va.esf --code "VA2VW002\"
```

**Saída:**
```
TabRec: VA2VW002 (RECORD)
    Record: VA2VW002
      Org: WORKSTOR
      Usage: SHARED
      RecdItems:
        Level 03: VA2VW002CODUSU (Occurs: 200) - CHA(8 bytes), 0 decimals
            Usage: NONSHARED
            EvenSql: N
        Level 03: VA2VW002DTSOLIC (Occurs: 200) - CHA(10 bytes), 0 decimals
        Level 03: VA2VW002SIT (Occurs: 200) - CHA(11 bytes), 0 decimals
```

## Quando usar

- ✅ Entender modelo de dados do programa
- ✅ Identificar tabelas SQL acessadas
- ✅ Verificar tamanhos de campos
- ✅ Descobrir arrays e suas dimensões
- ✅ Mapear integração com banco de dados
- ✅ Planejar migração de dados

## Tipos de estruturas

- **FUNCTION** → Tabelas SQL (BD2)
- **RECORD** → Estruturas internas de memória
- **WORKSTOR** → Área de trabalho global

## Próximos passos

- Usar `/vamap-function` para ver como a estrutura é usada
- Usar `/vamap-commands` com filtro "MOVE" para ver atribuições
- Documentar modelo de dados para nova arquitetura

