---
description: Analisa funções de SCAN (iteração em cursores SQL) em arquivos ESF
tags: [vamap, scan, cursor, sql, cobol, database]
---

# Análise de SCAN

Analisa todas as funções que executam operações de SCAN (iteração sobre cursores SQL) no arquivo ESF especificado.

## Uso

```bash
.\vamap.exe _LEGADO/<arquivo>.esf :scan
```

## Saída

Lista todas as funções que contêm operações SCAN com:
- Nome da função
- Tipo da operação (SCAN)
- Tabelas consultadas
- Condições de iteração

## Análise Detalhada

Para cada função SCAN identificada, você pode obter o código completo:

```bash
.\vamap.exe _LEGADO/<arquivo>.esf --code "<NOME_FUNCAO>"
```

## Exemplo

```bash
.\vamap.exe _LEGADO\vgfna.esf :scan
```

## Contexto

SCAN é usado em conjunto com SETINQ para:
1. **SETINQ**: Prepara o cursor SQL (SELECT múltiplos registros)
2. **SCAN**: Itera sobre cada registro retornado
3. Loop continua até não haver mais registros

## Informações Capturadas

1. **Identificação**: Nome e tipo da função
2. **Cursor**: Qual SETINQ está sendo iterado
3. **Processamento**: Lógica executada para cada registro
4. **Paginação**: Controle de páginas na tela
5. **Tratamento de Erros**: Funções de erro associadas
6. **Limite**: Controle de quantidade de registros processados

## Análise para Migração

Para migração para C#/.NET:
- **LINQ**: Uso de `foreach` ou métodos LINQ
- **IEnumerable**: Streaming de dados com `yield return`
- **Async**: `await foreach` com `IAsyncEnumerable`
- **Paginação**: `Skip()` e `Take()` para paginação
- **Performance**: `AsNoTracking()` para leitura
- **Projeção**: Selecionar apenas campos necessários
- **Bulk Operations**: Considerar `ToList()` vs streaming

