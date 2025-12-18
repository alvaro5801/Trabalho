---
description: Analisa funções de EXECUTE (SQL dinâmico) em arquivos ESF
tags: [vamap, execute, sql, dynamic, cobol, database]
---

# Análise de EXECUTE

Analisa todas as funções que executam operações de EXECUTE (SQL dinâmico) no arquivo ESF especificado.

## Uso

```bash
.\vamap.exe _LEGADO/<arquivo>.esf :execute
```

## Saída

Lista todas as funções que contêm operações EXECUTE com:
- Nome da função
- Tipo da operação (EXECUTE)
- Comandos SQL executados

## Análise Detalhada

Para cada função EXECUTE identificada, você pode obter o código completo:

```bash
.\vamap.exe _LEGADO/<arquivo>.esf --code "<NOME_FUNCAO>"
```

## Exemplo

```bash
.\vamap.exe _LEGADO\vgfna.esf :execute
```

## Contexto

EXECUTE é usado para:
1. SQL dinâmico construído em runtime
2. Stored procedures
3. Comandos complexos
4. Operações em lote

## Informações Capturadas

1. **Identificação**: Nome da função
2. **SQL**: Comando SQL construído
3. **Parâmetros**: Variáveis passadas ao comando
4. **Tipo**: SELECT, INSERT, UPDATE, DELETE, ou procedimento
5. **Tratamento de Erros**: Funções de erro associadas
6. **Resultado**: Como o resultado é processado

## Análise para Migração

Para migração para C#/.NET:
- **Stored Procedures**: Migrar para procedures no SQL Server
- **Entity Framework**: `FromSqlRaw()` ou `ExecuteSqlRaw()`
- **Dapper**: Para queries complexas com performance
- **Parameters**: Sempre usar parâmetros (SQL injection prevention)
- **Transactions**: Controle transacional explícito
- **Async**: Métodos assíncronos para operações de longo prazo
- **Refatoração**: Considerar transformar SQL dinâmico em queries tipadas

