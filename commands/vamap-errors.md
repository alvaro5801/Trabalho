# Analisar Tratamento de Erros

Lista todas as funções de tratamento de erros e onde são usadas no programa.

## Como usar

```bash
.\vamap.exe _LEGADO\<nome-arquivo>.esf --code "#"
```

## O que este comando faz

- Lista todas as funções de error handling
- Identifica padrões de tratamento de erro
- Ajuda a entender robustez do código

## Exemplo de uso

```bash
.\vamap.exe _LEGADO\va2va.esf --code "#"
```

## Saída esperada

```
ZZRCIN2 - Error Handling Function Execute
ZZRCIN1 - Error Handling Function Execute
```

## Entendendo os handlers

Geralmente em programas mainframe:

- **ZZRCIN1** → Erros de tabelas de negócio
- **ZZRCIN2** → Erros de tabelas de sistema
- **ZZRCXX** → Handlers específicos customizados

## Como os erros são tratados

Para ver onde cada handler é usado, combine com outros comandos:

```bash
# Ver onde ZZRCIN1 é chamado
.\vamap.exe _LEGADO\va2va.esf --code "@ZZRCIN1"

# Ver código do handler
.\vamap.exe _LEGADO\va2va.esf --code "ZZRCIN1"
```

## Padrão típico de erro

```cobol
BEFORE:
  MOVE 'VA2VP006' TO ZZ99W01.PROCESSO;
  MOVE ' ' TO ZZ99W01.CHAVE;

AFTER:
  IF ZZ99W01.CHAVE EQ '1';
    MOVE 'ERRO NO BANCO' TO EZEMSG;
    EZEFLO;
  END;

ERROR HANDLER (ZZRCIN1):
  MOVE EZESQLCA TO ZZ99W01.SQLCA;
  MOVE '1' TO ZZ99W01.CHAVE;
```

## Quando usar

- ✅ Entender **estratégia de error handling**
- ✅ Verificar **cobertura de erros** (todas as operações tratam?)
- ✅ Identificar **pontos frágeis** (funções sem tratamento)
- ✅ Planejar **logging e monitoramento**
- ✅ Migração: replicar tratamento de erros

## Análise de robustez

**Bom sinal:**
- ✅ Handlers padronizados (ZZRCIN1, ZZRCIN2)
- ✅ Todas operações SQL tratam erros
- ✅ Mensagens claras para usuário

**Sinal de alerta:**
- ⚠️ Funções sem error handler
- ⚠️ Handlers duplicados
- ⚠️ Erros silenciosos (sem mensagem)

## Checklist de análise

```bash
# 1. Listar handlers
.\vamap.exe _LEGADO\va2va.esf --code "#"

# 2. Ver stack completo (onde handlers aparecem)
.\vamap.exe _LEGADO\va2va.esf --code "|"

# 3. Para cada handler, ver chamadores
.\vamap.exe _LEGADO\va2va.esf --code "@ZZRCIN1"

# 4. Ver código do handler
.\vamap.exe _LEGADO\va2va.esf --code "ZZRCIN1"
```

## Próximos passos

- Documentar estrutura `ZZ99W01` (armazena info de erro)
- Mapear tipos de erro possíveis (SQLCA codes)
- Definir estratégia de error handling para novo sistema

