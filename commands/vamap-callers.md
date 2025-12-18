# Identificar Quem Chama Função

Exibe todas as funções que chamam (antecessoras) uma função específica, útil para análise de impacto.

## Como usar

```bash
.\vamap.exe _LEGADO\<nome-arquivo>.esf --code "@<NOME_FUNCAO>"
```

## O que este comando faz

- Lista todas as funções que chamam a função especificada
- Mostra a hierarquia de dependências
- Identifica pontos de entrada
- Ajuda em análise de impacto

## Exemplo de uso

Para ver quem chama a função `VA2VP009`:

```bash
.\vamap.exe _LEGADO\va2va.esf --code "@VA2VP009"
```

## Saída esperada

```
VA2VS003 - Execute
VA2VP001 - Execute
VA2VS002 - Execute
VA2VP009 - Execute <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
```

Isso mostra que `VA2VP009` é chamada por:
- `VA2VS003`
- `VA2VS002`

## Quando usar

- ✅ **Análise de impacto**: Antes de modificar uma função
- ✅ **Refatoração**: Identificar todos os pontos de uso
- ✅ **Debug**: Entender como uma função é alcançada
- ✅ **Testes**: Saber quais cenários testam esta função
- ✅ **Remoção de código**: Verificar se função está em uso

## Análise reversa

Este comando é o **inverso** de visualizar o código da função:

- `/vamap-function` → O que a função FAZ (chama quem?)
- `/vamap-callers` → Quem USA a função (é chamada por quem?)

## Exemplo de análise de impacto

**Cenário:** Preciso modificar `VA2VP006` (consulta SEGURADOS_VGAP)

```bash
# 1. Ver quem chama esta função
.\vamap.exe _LEGADO\va2va.esf --code "@VA2VP006"

# Resultado: Chamada apenas por VA2VS002

# 2. Ver código de VA2VS002 para entender contexto
.\vamap.exe _LEGADO\va2va.esf --code "VA2VS002"

# 3. Ver posição no stack
.\vamap.exe _LEGADO\va2va.esf --code "!VA2VS002"
```

## Próximos passos

- Usar `/vamap-position` para ver contexto completo no stack
- Usar `/vamap-function` para ver o código dos chamadores
- Documentar impacto de mudanças

