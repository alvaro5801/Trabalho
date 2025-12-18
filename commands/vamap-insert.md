---
description: Analisa funções de INSERT (SQL INSERT) em arquivos ESF
tags: [vamap, insert, sql, cobol, database]
---

# Análise de INSERT

Analisa todas as funções que executam operações de INSERT (SQL INSERT) no arquivo ESF especificado.

## Uso

```bash
.\vamap.exe _LEGADO/<arquivo>.esf :insert
```

## Saída

Lista todas as funções que contêm operações INSERT com:
- Nome da função
- Tipo da operação (INSERT)
- Tabelas afetadas
- Campos inseridos

## Análise Detalhada

Para cada função INSERT identificada, você pode obter o código completo:

```bash
.\vamap.exe _LEGADO/<arquivo>.esf --code "<NOME_FUNCAO>"
```

## Exemplo

```bash
.\vamap.exe _LEGADO\vgfna.esf :insert
```

## Informações Capturadas

1. **Identificação**: Nome e tipo da função
2. **Tabela**: Qual tabela SQL está sendo populada
3. **Campos**: Quais campos são inseridos
4. **Valores Padrão**: Campos com valores default
5. **Tratamento de Erros**: Funções de erro associadas
6. **Validações**: Regras de validação antes do INSERT
7. **Sequências**: Geração de IDs/chaves primárias

## Análise para Migração

Para migração para C#/.NET:
- **Repository Pattern**: Método `Add()` ou `AddAsync()`
- **Entity Framework**: `context.Add(entity)` ou `SaveChanges()`
- **Identity**: Configurar chaves auto-incrementais
- **Validação**: Data Annotations ou FluentValidation
- **Defaults**: Valores padrão no construtor ou na configuração EF
- **Auditoria**: Campos de CreatedDate/CreatedBy
- **Transações**: DbContextTransaction para múltiplos inserts
- **Bulk Insert**: Considerar `AddRange()` para grandes volumes

