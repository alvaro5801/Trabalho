# Analisar Pilha de Execução

Analisa a pilha de execução completa de um programa ESF, mostrando todas as funções e suas dependências hierárquicas.

## Como usar

```bash
.\vamap.exe _LEGADO\<nome-arquivo>.esf --code "|"
```

## O que este comando faz

- Lista todas as funções do programa
- Mostra a hierarquia de chamadas (quem chama quem)
- Identifica funções de tratamento de erros
- Exibe a profundidade de chamadas
- Revela dependências entre funções

## Exemplo de uso

Para analisar o arquivo `va2va.esf`:

```bash
.\vamap.exe _LEGADO\va2va.esf --code "|"
```

## Saída esperada

```
VA2VP000 - Execute
  VA2VP005 - Inquiry
    ZZRCIN2 - Error Handling Function Execute
VA2VP001 - Execute
  VA2VP002 - Converse
  VA2VS002 - Execute
    VA2VP006 - Inquiry
      ZZRCIN1 - Error Handling Function Execute
```

## Quando usar

- ✅ Entender a arquitetura geral do programa
- ✅ Identificar o fluxo de execução principal
- ✅ Descobrir todas as funções do sistema
- ✅ Planejar refatoração ou migração
- ✅ Documentar sistema legado

## Próximos passos

Após ver a pilha, você pode:
- Usar `/vamap-function` para ver código de funções específicas
- Usar `/vamap-errors` para focar em tratamento de erros
- Usar `/vamap-callers` para ver quem chama uma função específica

