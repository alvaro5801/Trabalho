---
description: Analisa funções de DELETE (SQL DELETE) em arquivos ESF
tags: [vamap, delete, sql, cobol, database]
---

# Análise de DELETE

Analisa todas as funções que executam operações de DELETE (SQL DELETE) no arquivo ESF especificado.

## Uso

```bash
.\vamap.exe _LEGADO/<arquivo>.esf :delete
```

## Saída

Lista todas as funções que contêm operações DELETE com:
- Nome da função
- Tipo da operação (DELETE)
- Tabelas afetadas
- Condições de deleção

## Análise Detalhada

Para cada função DELETE identificada, você pode obter o código completo:

```bash
.\vamap.exe _LEGADO/<arquivo>.esf --code "<NOME_FUNCAO>"
```

## Exemplo

```bash
.\vamap.exe _LEGADO\va2va.esf :delete
```

## Informações Capturadas

1. **Identificação**: Nome e tipo da função
2. **Tabela**: Qual tabela SQL está sendo afetada
3. **Condições**: Cláusula WHERE do DELETE
4. **Cascata**: Deletes em tabelas relacionadas
5. **Tratamento de Erros**: Funções de erro associadas
6. **Validações**: Verificações antes da deleção

## Análise para Migração

Para migração para C#/.NET:
- **Repository Pattern**: Método `Delete()` ou `DeleteAsync()`
- **Entity Framework**: `context.Remove(entity)` ou `SaveChanges()`
- **Soft Delete**: Implementar flag `IsDeleted` em vez de deleção física
- **Cascade**: Configurar `DeleteBehavior` nas relações
- **Auditoria**: Registrar quem deletou e quando
- **Validações**: Verificar dependências antes de deletar
- **Transações**: Garantir atomicidade em deletes relacionados

