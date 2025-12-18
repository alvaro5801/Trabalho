---
description: Analisa funções de UPDATE (SQL UPDATE) em arquivos ESF
tags: [vamap, update, sql, cobol, database]
---

# Análise de UPDATE

Analisa todas as funções que executam operações de UPDATE (SQL UPDATE) no arquivo ESF especificado.

## Uso

```bash
.\vamap.exe _LEGADO/<arquivo>.esf :update
```

## Saída

Lista todas as funções que contêm operações UPDATE com:
- Nome da função
- Tipo da operação (UPDATE)
- Tabelas afetadas
- Campos modificados

## Análise Detalhada

Para cada função UPDATE identificada, você pode obter o código completo:

```bash
.\vamap.exe _LEGADO/<arquivo>.esf --code "<NOME_FUNCAO>"
```

## Exemplo

```bash
.\vamap.exe _LEGADO\vgfna.esf :update
```

## Informações Capturadas

1. **Identificação**: Nome e tipo da função
2. **Tabela**: Qual tabela SQL está sendo atualizada
3. **Campos**: Quais campos são modificados
4. **Condições**: Cláusula WHERE do UPDATE
5. **Tratamento de Erros**: Funções de erro associadas
6. **Validações**: Regras de validação antes do UPDATE

## Análise para Migração

Para migração para C#/.NET:
- **Repository Pattern**: Método `Update()` ou `UpdateAsync()`
- **Entity Framework**: `context.Update(entity)` ou `SaveChanges()`
- **Validação**: Data Annotations ou FluentValidation
- **Concorrência**: Implementar controle de versão (RowVersion/Timestamp)
- **Auditoria**: Campos de LastModifiedDate/LastModifiedBy
- **Transações**: DbContextTransaction para múltiplos updates

