---
description: Analisa lógica de validação em funções ESF
tags: [vamap, validation, business-rules, cobol]
---

# Análise de Validações

Analisa a lógica de validação presente nas funções do arquivo ESF especificado.

## Uso

Para identificar funções que contêm validações, procure por:

```bash
# Funções que fazem MOVEs de mensagens de erro
.\vamap.exe _LEGADO/<arquivo>.esf ;MOVE

# Funções de erro
.\vamap.exe _LEGADO/<arquivo>.esf #
```

## Padrões de Validação

### 1. Validações de Campo
```bash
.\vamap.exe _LEGADO/<arquivo>.esf --code "<FUNCAO_VALIDACAO>"
```

Procure por:
- `IF <campo> = SPACES` (campo vazio)
- `IF <campo> = ZEROS` (campo numérico zero)
- `IF <campo> < <valor>` (validação de range)
- `IF <campo> NOT = <valor>` (validação de valor específico)

### 2. Validações de Banco
```bash
.\vamap.exe _LEGADO/<arquivo>.esf :inquiry
```

Procure por:
- INQUIRY seguido de verificação de erro
- Validação de existência de registro
- Validação de chaves estrangeiras

### 3. Mensagens de Erro
Analise o código da função buscando por:
- `MOVE "mensagem" TO <campo-erro>`
- `MOVE <código-erro> TO <flag-erro>`
- Chamadas para funções de erro (começam com ZZ)

## Exemplo

```bash
# 1. Listar funções de validação (sub-functions)
.\vamap.exe _LEGADO\vgfna.esf :subfunction

# 2. Ver código de uma função específica
.\vamap.exe _LEGADO\vgfna.esf --code "VGFNS002"
```

## Informações Capturadas

1. **Regras de Negócio**: Condições que os dados devem atender
2. **Mensagens**: Textos de erro para o usuário
3. **Campos Validados**: Quais campos têm validação
4. **Validações Cruzadas**: Validações entre múltiplos campos
5. **Validações de Banco**: Verificações de integridade referencial

## Análise para Migração

Para migração para C#/.NET:
- **Data Annotations**: `[Required]`, `[Range]`, `[StringLength]`
- **FluentValidation**: Validações complexas e customizadas
- **Business Rules**: Camada de serviço com regras de negócio
- **Validation Results**: Retornar lista de erros estruturada
- **Localização**: Mensagens em arquivo de recursos
- **Custom Validators**: Atributos personalizados
- **Async Validation**: Validações que consultam banco

