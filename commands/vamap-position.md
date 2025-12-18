# Ver Posição no Stack

Exibe a posição de uma função na pilha de execução, mostrando o contexto completo de chamadas.

## Como usar

```bash
.\vamap.exe _LEGADO\<nome-arquivo>.esf --code "!<NOME_FUNCAO>"
```

## O que este comando faz

- Mostra onde a função está no stack de execução
- Exibe função pai e todas as funções filhas
- Revela profundidade de chamadas
- Ajuda a entender contexto de execução

## Exemplo de uso

Para ver a posição da função `VA2VS002`:

```bash
.\vamap.exe _LEGADO\va2va.esf --code "!VA2VS002"
```

## Saída esperada

```
VA2VP001 - Execute
  VA2VP002 - Converse
  VA2VS002 - Execute <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    ZZ01SGPS3 - Execute
    ZZ01SGPS12 - Execute
    VA2VP006 - Inquiry
      ZZRCIN1 - Error Handling Function Execute
    VA2VP007 - Inquiry
      ZZRCIN1 - Error Handling Function Execute
    VA2VP004 - SetInq
      ZZRCIN1 - Error Handling Function Execute
    VA2VP008 - Scan
      ZZRCIN1 - Error Handling Function Execute
      ZZ20S01 - Execute
    VA2VP009 - Execute
  VA2VP003 - Converse
  VA2VS003 - Execute
    VA2VP009 - Execute
```

## Interpretação

Da saída acima podemos ver:

**Caminho até VA2VS002:**
```
VA2VP001 (Main Loop)
  ↓
VA2VP002 (Apresenta Tela)
  ↓
VA2VS002 (Valida Input) ← AQUI
```

**Funções chamadas por VA2VS002:**
- ZZ01SGPS3, ZZ01SGPS12 (tratamento de PFs)
- VA2VP006, VA2VP007 (consultas SQL)
- VA2VP004, VA2VP008 (scan de relatórios)
- VA2VP009 (monta tela de resultado)

**Profundidade:** 3 níveis (Main → Converse → Validação)

## Quando usar

- ✅ Entender **contexto de execução** de uma função
- ✅ Ver **caminho de chamadas** até a função
- ✅ Identificar **complexidade** (profundidade do stack)
- ✅ Planejar **debugging** e pontos de breakpoint
- ✅ Documentar **fluxo de navegação**

## Análise de Complexidade

**Profundidade baixa (1-3 níveis):**
- ✅ Código organizado
- ✅ Fácil de entender
- ✅ Testável

**Profundidade alta (5+ níveis):**
- ⚠️ Possível código espaguete
- ⚠️ Difícil manutenção
- ⚠️ Candidato a refatoração

## Combinando com outros comandos

```bash
# 1. Ver posição no stack
.\vamap.exe _LEGADO\va2va.esf --code "!VA2VS002"

# 2. Ver quem chama (mais simples)
.\vamap.exe _LEGADO\va2va.esf --code "@VA2VS002"

# 3. Ver código completo
.\vamap.exe _LEGADO\va2va.esf --code "VA2VS002"
```

## Próximos passos

- Analisar função pai para entender contexto de entrada
- Analisar funções filhas para entender responsabilidades
- Usar `/vamap-function` para ver implementação de cada nível

