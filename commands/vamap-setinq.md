---
description: Analisa funções de SETINQ (preparação de cursores SQL) em arquivos ESF
tags: [vamap, setinq, cursor, sql, cobol, database]
---

# Análise de SETINQ

Analisa todas as funções que executam operações de SETINQ (preparação de cursores SQL para múltiplos registros) no arquivo ESF especificado.

## Uso

```bash
.\vamap.exe _LEGADO/<arquivo>.esf :setinq
```

## Saída

Lista todas as funções que contêm operações SETINQ com:
- Nome da função
- Tipo da operação (SETINQ)
- Tabelas consultadas
- Critérios de seleção

## Análise Detalhada

Para cada função SETINQ identificada, você pode obter o código completo:

```bash
.\vamap.exe _LEGADO/<arquivo>.esf --code "<NOME_FUNCAO>"
```

## Exemplo

```bash
.\vamap.exe _LEGADO\vgfna.esf :setinq
```

## Contexto

SETINQ é usado para consultas que retornam múltiplos registros:
1. **SETINQ**: Prepara o cursor SQL (SELECT com WHERE)
2. **SCAN**: Usado posteriormente para iterar sobre os resultados
3. Comum para listagens e relatórios

## Informações Capturadas

1. **Identificação**: Nome e tipo da função
2. **Tabela**: Qual tabela SQL está sendo consultada
3. **Query SQL**: Cláusula SELECT construída
4. **Filtros**: Condições WHERE aplicadas
5. **Ordenação**: ORDER BY se presente
6. **Joins**: Tabelas relacionadas na consulta
7. **Tratamento de Erros**: Funções de erro associadas

## Análise para Migração

Para migração para C#/.NET:
- **Repository Pattern**: Método `GetAll()` ou `GetByFilter()`
- **IQueryable**: Retornar query para composição
- **LINQ**: Tradução para expressões LINQ
- **Filtros Dinâmicos**: Usar `Expression<Func<T, bool>>`
- **Paginação**: Implementar PagedResult<T>
- **Performance**: Projeções e índices adequados
- **Async**: `IQueryable` com `ToListAsync()`
- **Caching**: Considerar cache para queries frequentes

