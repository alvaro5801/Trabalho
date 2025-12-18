# Rastrear Comandos Específicos

Analisa a presença de comandos específicos (MOVE, IF, WHILE, etc.) em todas as funções do programa.

## Como usar

```bash
.\vamap.exe _LEGADO\<nome-arquivo>.esf --code ";<TIPO_COMANDO>"
```

## Comandos disponíveis

- `MOVE` → Atribuições de valores
- `IF` → Condicionais
- `ELSE` → Ramos alternativos
- `END` → Fim de blocos
- `WHILE` → Loops
- `SET` → Operações de set
- `CALL` → Chamadas de função
- `FUNCTION` → Declarações de função
- `EZERTN` → Retorno de função
- `EZEFLO` → Controle de fluxo

## O que este comando faz

- Lista onde cada comando aparece
- Mostra o contexto de uso
- Agrupa por função
- Revela padrões de código

## Exemplo: Rastrear MOVE

```bash
.\vamap.exe _LEGADO\va2va.esf --code ";MOVE"
```

**Saída parcial:**
```
VA2VP000 - Execute
    MOVE 1 TO EZEFEC;
    MOVE 1 TO EZECNVCM;
    MOVE 'VA2V' TO EZESEGTR;
    MOVE 'MOSTRA A TELA M10' TO VA2VW001.W01A0035;
  VA2VP005 - Inquiry
    MOVE 'VA2VP005' TO ZZ99W01.PROCESSO;
    MOVE ' ' TO ZZ99W01.CHAVE;
```

## Exemplo: Rastrear WHILE (loops)

```bash
.\vamap.exe _LEGADO\va2va.esf --code ";WHILE"
```

**Saída:**
```
VA2VP001 - Execute
    WHILE 1 = 1;
      WHILE VA2VW001.W01A0035 EQ 'MOSTRA A TELA M10';
      WHILE VA2VW001.W01A0035 EQ 'MOSTRA A TELA M20';
  VA2VS002 - Execute
    WHILE V0RELATORIOS NOT NRF;
```

## Filtro textual (opcional)

Você pode aplicar filtro para refinar resultados:

```bash
.\vamap.exe _LEGADO\va2va.esf --code ";MOVE(CERTIFICADO)"
```

Isso mostra apenas MOVEs que contêm "CERTIFICADO".

## Quando usar

### Rastrear MOVE
- ✅ Entender **fluxo de dados**
- ✅ Identificar **regras de negócio** (valores hardcoded)
- ✅ Mapear **transformações de dados**

### Rastrear IF
- ✅ Analisar **complexidade ciclomática**
- ✅ Identificar **validações**
- ✅ Entender **fluxos condicionais**

### Rastrear WHILE
- ✅ Identificar **loops**
- ✅ Verificar **condições de saída**
- ✅ Analisar **performance** (loops aninhados?)

### Rastrear CALL
- ✅ Mapear **dependências externas**
- ✅ Identificar **APIs chamadas**
- ✅ Documentar **integrações**

## Casos de uso práticos

**1. Encontrar onde um campo é modificado:**

```bash
.\vamap.exe _LEGADO\va2va.esf --code ";MOVE(NUM_CERTIFICADO)"
```

**2. Analisar complexidade (quantos IFs?):**

```bash
.\vamap.exe _LEGADO\va2va.esf --code ";IF"
```

**3. Identificar máquinas de estado:**

```bash
.\vamap.exe _LEGADO\va2va.esf --code ";MOVE(MOSTRA A TELA)"
```

**4. Verificar loops infinitos:**

```bash
.\vamap.exe _LEGADO\va2va.esf --code ";WHILE"
```

## Análise de qualidade de código

```bash
# Complexidade ciclomática (contar IFs e WHILEs)
.\vamap.exe _LEGADO\va2va.esf --code ";IF"
.\vamap.exe _LEGADO\va2va.esf --code ";WHILE"

# Code smells (hardcoded values)
.\vamap.exe _LEGADO\va2va.esf --code ";MOVE" | grep -E "'[^']+'"

# Dependências externas
.\vamap.exe _LEGADO\va2va.esf --code ";CALL"
```

## Próximos passos

- Usar `/vamap-function` para ver contexto completo dos comandos
- Documentar regras de negócio encontradas em MOVEs
- Identificar pontos de refatoração (muitos IFs aninhados)

