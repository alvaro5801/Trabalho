# Ver Código de Função

Exibe o código completo de uma função específica do programa ESF, incluindo atributos, lógica e comandos.

## Como usar

```bash
.\vamap.exe _LEGADO\<nome-arquivo>.esf --code "<NOME_FUNCAO>"
```

## O que este comando faz

- Mostra o código fonte completo da função
- Exibe atributos (data, descrição, tipo)
- Lista comandos (MOVE, IF, WHILE, etc.)
- Mostra chamadas para outras funções
- Revela queries SQL (se houver)

## Exemplo de uso

Para ver o código da função `VA2VS002`:

```bash
.\vamap.exe _LEGADO\va2va.esf --code "VA2VS002"
```

## Saída esperada

```
Function:VA2VS002 - Execute
Attributes:
  date = 02/04/2019
  time = 18:43:30
  desc = TESTA PF
  refine = N
Section: before.
    IF EZEAID IS PF3;
      ZZ01SGPS3(); - Execute
    END;
    [... código completo ...]
```

## Filtro opcional

Você pode destacar linhas com texto específico:

```bash
.\vamap.exe _LEGADO\va2va.esf --code "VA2VS002(CERTIFICADO)"
```

Isso destaca linhas que contêm "CERTIFICADO".

## Quando usar

- ✅ Entender lógica de uma função específica
- ✅ Analisar validações e regras de negócio
- ✅ Identificar queries SQL executadas
- ✅ Ver tratamento de erros
- ✅ Estudar fluxo condicional (IF/WHILE)

## Próximos passos

- Usar `/vamap-callers` para ver quem chama esta função
- Usar `/vamap-position` para ver contexto no stack
- Usar `/vamap-data` para ver estruturas de dados usadas

