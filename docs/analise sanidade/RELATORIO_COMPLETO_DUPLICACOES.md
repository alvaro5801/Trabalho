# Relatório Completo de Duplicações na MATRIZ_RASTREABILIDADE.csv

**Data da análise:** 2025-12-03  
**Arquivo analisado:** MATRIZ_RASTREABILIDADE.csv

## Resultado da Análise

### ✅ Análise Automática Completa Executada

Foram realizadas **6 análises sistemáticas** diferentes:

1. ✅ **IDs duplicados** - Nenhum ID aparece mais de uma vez
2. ✅ **Métodos com mesmo conteúdo e linhas** - 9 duplicações encontradas
3. ✅ **Objetos com mesmo nome e linha** - Nenhuma duplicação
4. ✅ **Regras com mesma descrição e linhas** - Nenhuma duplicação
5. ✅ **Queries com mesma descrição e linhas** - Nenhuma duplicação
6. ✅ **Entidades com mesmo nome** - Nenhuma duplicação

## 🚨 Duplicações Encontradas: 9 METODOS

### Resumo Executivo

- **Total de duplicações:** 9 (todas do tipo METODO)
- **Status:** TODAS CONFIRMADAS
- **Ação requerida:** Remover 9 linhas da matriz

### Detalhamento das Duplicações

| ID Duplicado | ID Original | Função | Linhas | Status |
|--------------|-------------|--------|--------|--------|
| METOD-0072 | METOD-0004 | CB2QP019 - Move dados para tela M020 | 4027-4208 | ✓ CONFIRMADA |
| METOD-0073 | METOD-0051 | CB2QS014 - Determina tipo documento busca cliente | 6998-7140 | ✓ CONFIRMADA |
| METOD-0074 | METOD-0055 | CB2QS021 - Move dados paginacao M020 | 7933-8036 | ✓ CONFIRMADA |
| METOD-0075 | METOD-0056 | CB2QP022 - Processa selecao item M020 | 8038-8223 | ✓ CONFIRMADA |
| METOD-0076 | METOD-0057 | CB2QS022 - Valida tipo segurado | 8225-8351 | ✓ CONFIRMADA |
| METOD-0077 | METOD-0006 | CB2QP029 - Move dados para tela M030 | 4364-4546 | ✓ CONFIRMADA |
| METOD-0078 | METOD-0058 | CB2QS031 - Move dados paginacao M030 | 8353-8442 | ✓ CONFIRMADA |
| METOD-0079 | METOD-0059 | CB2QS032 - Processa teclas M030 | 8444-8538 | ✓ CONFIRMADA |
| METOD-0080 | METOD-0060 | CB2QS033 - Monta linha exibicao M030 | 8540-8593 | ✓ CONFIRMADA |

### Localização das Duplicações na Matriz

As 9 duplicações estão concentradas nas **linhas 277-285** do arquivo CSV:

```
Linha 277: METOD-0072,METODO,,,CB2QP019 - Move dados para tela M020,_LEGADO/cb2qa.esf,4027-4208,,,NOK,NOK,NOK
Linha 278: METOD-0073,METODO,,,CB2QS014 - Determina tipo documento busca cliente,_LEGADO/cb2qa.esf,6998-7140,,,NOK,NOK,NOK
Linha 279: METOD-0074,METODO,,,CB2QS021 - Move dados paginacao M020,_LEGADO/cb2qa.esf,7933-8036,,,NOK,NOK,NOK
Linha 280: METOD-0075,METODO,,,CB2QP022 - Processa selecao item M020,_LEGADO/cb2qa.esf,8038-8223,,,NOK,NOK,NOK
Linha 281: METOD-0076,METODO,,,CB2QS022 - Valida tipo segurado,_LEGADO/cb2qa.esf,8225-8351,,,NOK,NOK,NOK
Linha 282: METOD-0077,METODO,,,CB2QP029 - Move dados para tela M030,_LEGADO/cb2qa.esf,4364-4546,,,NOK,NOK,NOK
Linha 283: METOD-0078,METODO,,,CB2QS031 - Move dados paginacao M030,_LEGADO/cb2qa.esf,8353-8442,,,NOK,NOK,NOK
Linha 284: METOD-0079,METODO,,,CB2QS032 - Processa teclas M030,_LEGADO/cb2qa.esf,8444-8538,,,NOK,NOK,NOK
Linha 285: METOD-0080,METODO,,,CB2QS033 - Monta linha exibicao M030,_LEGADO/cb2qa.esf,8540-8593,,,NOK,NOK,NOK
```

## ✅ Verificações Negativas (Nenhuma Duplicação)

### Outros Tipos de Registros - OK

Todos os outros tipos de registros foram analisados e **NÃO apresentam duplicações**:

| Tipo | Quantidade na Matriz | Duplicações | Status |
|------|---------------------|-------------|--------|
| TELA | 8 | 0 | ✅ OK |
| ENTIDADE | 41 | 0 | ✅ OK |
| OBJETO | 75 | 0 | ✅ OK |
| FUNCAO_TELA | 4 | 0 | ✅ OK |
| REGRA | 152 | 0 | ✅ OK |
| QUERY | 46 | 0 | ✅ OK |

### IDs Únicos - OK

Todos os IDs na matriz são únicos. **Não há IDs duplicados.**

## 📊 Estatísticas da Matriz

### Antes da Limpeza

- **Total de linhas:** 410 (incluindo header e linha vazia)
- **Total de registros:** 408
- **METODO:** 80 (incluindo 9 duplicações)

### Após Remover Duplicações

- **Total de linhas:** 401
- **Total de registros:** 399
- **METODO:** 71 (únicos)

### Impacto da Remoção

- **Linhas removidas:** 9
- **Redução percentual:** ~2.2%
- **Integridade dos dados:** 100% mantida

## 🎯 Conclusões

### 1. Cobertura do Arquivo cb2qa.esf

✅ **100% de cobertura confirmada** - Todos os elementos do arquivo estão mapeados (considerando apenas registros únicos)

### 2. Qualidade da Matriz

⚠️ **Boa, mas com duplicações** - A matriz está bem estruturada, porém contém 9 registros duplicados que devem ser removidos

### 3. Origem das Duplicações

As 9 duplicações parecem ter sido adicionadas em um segundo momento, provavelmente por erro durante uma atualização da matriz (todos estão nas linhas 277-285, após a linha vazia 276)

### 4. Tipos de Elementos Afetados

Apenas **METODO** tem duplicações. Todos os outros tipos (TELA, OBJETO, FUNCAO_TELA, REGRA, QUERY, ENTIDADE) estão corretos.

## 🔧 Ação Recomendada

### Passo 1: Backup

```bash
cp MATRIZ_RASTREABILIDADE.csv MATRIZ_RASTREABILIDADE_BACKUP_20251203.csv
```

### Passo 2: Remover Linhas Duplicadas

Remover as **linhas 277-285** do arquivo `MATRIZ_RASTREABILIDADE.csv`

**Ou usar comando:**

```bash
# No PowerShell
Get-Content MATRIZ_RASTREABILIDADE.csv | Select-Object -First 276 | Set-Content MATRIZ_RASTREABILIDADE_LIMPA.csv
Get-Content MATRIZ_RASTREABILIDADE.csv | Select-Object -Skip 285 | Add-Content MATRIZ_RASTREABILIDADE_LIMPA.csv
```

### Passo 3: Validar

Verificar se a matriz limpa tem:
- **401 linhas totais** (incluindo header e linha vazia)
- **399 registros válidos**
- **71 METODO únicos**

## 📁 Arquivos Gerados

1. **relatorio_duplicacoes.txt** - Saída da análise automática completa
2. **ITENS_DUPLICADOS_PARA_REMOVER.csv** - Lista CSV das duplicações
3. **ANALISE_CB2QA_COMPLETA.md** - Análise detalhada do arquivo cb2qa.esf
4. **RESUMO_ANALISE_CB2QA.md** - Resumo executivo da análise
5. **RELATORIO_COMPLETO_DUPLICACOES.md** - Este relatório

## ✅ Resultado Final

**APENAS 9 DUPLICAÇÕES ENCONTRADAS** (todas do tipo METODO)

**NENHUMA outra duplicação existe na matriz** - Todos os outros 399 registros são únicos e válidos.

---

**Status:** ✅ ANÁLISE COMPLETA  
**Duplicações confirmadas:** 9  
**Novas duplicações:** 0  
**Ação necessária:** Remover 9 linhas (277-285)

