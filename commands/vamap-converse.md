---
description: Analisa funções de CONVERSE (interação com terminal 3270) em arquivos ESF
tags: [vamap, converse, 3270, ui, cobol, terminal]
---

# Análise de CONVERSE

Analisa todas as funções que executam operações de CONVERSE (interação com terminal 3270) no arquivo ESF especificado.

## Uso

```bash
.\vamap.exe _LEGADO/<arquivo>.esf :converse
```

## Saída

Lista todas as funções que contêm operações CONVERSE com:
- Nome da função
- Maps de tela usados
- Tipo de interação

## Análise Detalhada

Para cada função CONVERSE identificada, você pode obter o código completo:

```bash
.\vamap.exe _LEGADO/<arquivo>.esf --code "<NOME_FUNCAO>"
```

## Exemplo

```bash
.\vamap.exe _LEGADO\vgfna.esf :converse
```

## Contexto

CONVERSE é o comando que:
1. Envia um map (tela) para o terminal 3270
2. Aguarda entrada do usuário
3. Retorna o controle com os dados preenchidos

## Informações Capturadas

1. **Identificação**: Nome da função
2. **Map**: Qual tela é exibida
3. **Campos de Entrada**: Dados que o usuário pode preencher
4. **Campos de Saída**: Dados exibidos ao usuário
5. **Validações**: Verificações após entrada
6. **Navegação**: Teclas de função (PF keys) mapeadas
7. **Tratamento de Erros**: Mensagens de erro exibidas

## Análise para Migração

Para migração para C#/.NET:
- **Frontend**: Migrar para páginas web (Razor, React, Angular)
- **API REST**: Endpoints para GET e POST de dados
- **Validação**: Client-side e server-side
- **DTO**: Data Transfer Objects para cada tela
- **Form Handling**: Model binding e validação
- **UX Moderna**: Redesenhar fluxo de usuário
- **Responsividade**: Adaptar para mobile
- **Accessibility**: WCAG compliance

