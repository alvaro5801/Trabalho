# 📋 RESUMO FINAL - Itens Não Mapeados em cb2qa.esf

**Data:** 2025-12-03  
**Arquivo analisado:** `_LEGADO/cb2qa.esf`  
**Ferramenta:** `vamap.exe`

---

## 🎯 Resposta à Pergunta: "E as queries?"

**SIM, as queries estão faltando!**

**TODAS as 46 queries SQL do arquivo NÃO estão mapeadas na matriz.**

---

## 📊 Resumo de Completude

### Situação Atual da Matriz

| Categoria | Total no Arquivo | Mapeados | Não Mapeados | % Completo |
|-----------|------------------|----------|--------------|------------|
| TELAS | 8 | 8 | 0 | ✅ 100% |
| MÉTODOS | 71 | 66 | 5 | ⚠️ 93% |
| QUERIES SQL | 46 | 0 | 46 | 🚨 **0%** |
| ENTIDADES | 41 | 41 | 0 | ✅ 100% |
| OBJETOS | 64 | 64 | 0 | ✅ 100% |
| FUNÇÕES TELA | 4 | 4 | 0 | ✅ 100% |
| REGRAS | 40 | 40 | 0 | ✅ 100% |
| **TOTAL** | **274** | **223** | **51** | **81.4%** |

---

## 🚨 Itens Não Mapeados (51 total)

### 1. Métodos Utilitários Externos (5 itens)

Funções do framework VisualAge chamadas pelo programa:

| ID | Função | Descrição | Chamadas |
|----|--------|-----------|----------|
| METOD-0067 | ZZRCIN1 | Error handler para INQUIRY/SCAN | 30+ |
| METOD-0068 | ZZRCIN2 | Error handler para SETINQ | 13 |
| METOD-0069 | ZZ01SGPS3 | Função tecla F3 (Sair) | 4 |
| METOD-0070 | ZZ01SGPS12 | Função tecla F12 (Cancelar) | 1 |
| METOD-0071 | ZZ20S01 | Formatação/conversão de dados | 5 |

**Impacto:** MÉDIO - Precisam ser substituídas na arquitetura moderna

---

### 2. Queries SQL (46 itens) 🚨

Todas as operações SQL do arquivo não estão mapeadas:

#### 2.1 Queries INQUIRY (30 queries)
Consultas SELECT que retornam um ou poucos registros:

- QUERY-0001 a QUERY-0030
- Tabelas mais consultadas: V1SISTEMA, CB2QR001, V0BILHETE, V0CLIENTE, etc.
- **Exemplo:** `SELECT * FROM V1SISTEMA WHERE IDSISTEM='CB'`

#### 2.2 Queries SETINQ (13 queries)
Consultas SELECT que preparam cursores:

- QUERY-0031 a QUERY-0043
- Tabelas: V0MOVDEBCC_CEF (11 queries), CB2QR001 (4 queries)
- **Exemplo:** `SELECT * FROM V0MOVDEBCC_CEF WHERE NUM_APOLICE=? GROUP BY ...`
- Incluem JOINs, GROUP BY, ORDER BY

#### 2.3 Queries SCAN (3 queries)
Operações FETCH de iteração sobre cursores:

- QUERY-0044: V0MOVDEBCC_CEF
- QUERY-0045: CALENDARIO
- QUERY-0046: GE_MOVTO_CONTA

**Impacto:** **CRÍTICO** ⚠️

As queries são fundamentais porque contêm:
- ✅ Toda a lógica de acesso a dados
- ✅ Relacionamentos entre entidades (JOINs)
- ✅ Regras de negócio (cláusulas WHERE)
- ✅ Agregações e cálculos (GROUP BY, funções)
- ✅ Ordenação de dados (ORDER BY)

---

## 📦 Arquivos Gerados

| Arquivo | Conteúdo | Linhas |
|---------|----------|--------|
| **ANALISE_ITENS_NAO_MAPEADOS.md** | Análise completa geral | 400+ |
| **ANALISE_QUERIES_NAO_MAPEADAS.md** | Análise detalhada queries | 500+ |
| **TODAS_ENTRADAS_FALTANTES.csv** | 51 entradas CSV prontas | 52 |
| **ENTRADAS_FALTANTES_MATRIZ.csv** | 5 métodos utilitários | 6 |
| **QUERIES_FALTANTES_MATRIZ.csv** | 46 queries SQL | 47 |
| **RESUMO_FINAL_ITENS_NAO_MAPEADOS.md** | Este arquivo | - |

---

## 🎯 Tabelas SQL Mais Afetadas

Tabelas com mais queries não mapeadas:

| Tabela | Queries | Tipos |
|--------|---------|-------|
| **V0MOVDEBCC_CEF** | 11 | 7 SETINQ + 3 INQUIRY + 1 SCAN |
| **CB2QR001** | 5 | 4 SETINQ + 1 INQUIRY |
| **SINISTRO_HISTORICO** | 2 | 2 INQUIRY (complexas) |
| **V0BILHETE** | 2 | 2 INQUIRY |
| **CHEQUES_EMITIDOS** | 2 | 2 INQUIRY |
| **V1MOVDEBCC_CEF** | 2 | 1 SETINQ + 1 INQUIRY |
| **Outras 22 tabelas** | 22 | 1 cada |

---

## ✅ Ações Recomendadas

### Prioridade 1: CRÍTICA (Queries)

**Adicionar as 46 queries à matriz ANTES de iniciar implementação**

```bash
# Usar arquivo pronto:
QUERIES_FALTANTES_MATRIZ.csv
```

**Por que é crítico:**
- Sem as queries mapeadas, não há rastreabilidade completa do acesso a dados
- As queries contêm regras de negócio nas cláusulas WHERE
- JOINs revelam relacionamentos essenciais entre entidades
- Necessário para criar os repositories corretamente

### Prioridade 2: ALTA (Métodos Utilitários)

**Adicionar os 5 métodos utilitários**

```bash
# Usar arquivo pronto:
ENTRADAS_FALTANTES_MATRIZ.csv
```

**Por que é importante:**
- Documentam dependências do framework legado
- Identificam funcionalidades que precisam ser reimplementadas
- Ajudam a entender tratamento de erros do sistema

---

## 📈 Roadmap de Atualização da Matriz

### Fase 1: Adicionar Entradas (30 min)

1. ✅ Ler arquivo `TODAS_ENTRADAS_FALTANTES.csv`
2. ✅ Adicionar 5 métodos (METOD-0067 a 0071)
3. ✅ Adicionar 46 queries (QUERY-0001 a 0046)
4. ✅ Validar formato CSV

### Fase 2: Validar Integridade (15 min)

1. ✅ Verificar IDs únicos (não duplicados)
2. ✅ Validar `Objeto_Pai` referencia métodos existentes
3. ✅ Confirmar hierarquia correta
4. ✅ Verificar range de linhas (`Ref_Legado_Linhas`)

### Fase 3: Documentar Abordagens (2-3 dias)

Para cada query, definir:
- Repository method equivalente
- Se será Dapper raw SQL ou ORM
- Índices necessários para performance
- Testes de integração necessários

---

## 📊 Métricas de Impacto

### Antes (Situação Atual)
```
Total itens: 274
Mapeados: 223 (81.4%)
Faltantes: 51 (18.6%)
```

### Depois (Após Adicionar)
```
Total itens: 274
Mapeados: 274 (100%)
Faltantes: 0 (0%)
```

---

## 🔍 Exemplo Prático: Por Que Queries São Críticas

### Caso: Função CB2QS011 (Processa registro individual)

**Sem queries mapeadas:**
```
CB2QS011 (METOD-0010) ✅ Mapeado
  └─ Chama CB2QP012, CB2QP042, CB2QS014...
      └─ ??? Não sei quais queries são executadas
```

**Com queries mapeadas:**
```
CB2QS011 (METOD-0010) ✅ Mapeado
  ├─ CB2QP012 (METOD-0013) ✅
  │   └─ QUERY-0003 ✅ SELECT GE_MOVTO_CONTA
  ├─ CB2QP042 (METOD-0014) ✅
  │   └─ QUERY-0004 ✅ SELECT V0APOLCOB
  ├─ CB2QS014 (METOD-0051) ✅
  │   ├─ QUERY-0005 ✅ SELECT V1MOVDEBCC_CEF
  │   ├─ QUERY-0006 ✅ SELECT GE_LEGADO_PESSOA
  │   ├─ QUERY-0007 ✅ SELECT OD_PESSOA_FISICA
  │   └─ QUERY-0008 ✅ SELECT OD_PESSOA_JURIDICA
  └─ CB2QP011 (METOD-0019) ✅
      └─ QUERY-0009 ✅ SELECT V0BILHETE
```

**Resultado:**
- ✅ Rastreabilidade completa do fluxo de dados
- ✅ Identificação de todas as tabelas acessadas
- ✅ Documentação de relacionamentos (keys)
- ✅ Base para criar repositories otimizados

---

## 🎓 Lições Aprendidas

### 1. Análise Incremental
A análise inicial identificou 97.7% de completude, mas ao aprofundar (graças à pergunta do usuário sobre queries), descobrimos que faltavam 46 itens críticos.

**Aprendizado:** Sempre verificar TODOS os tipos de objetos definidos na documentação da matriz, não apenas os óbvios.

### 2. Hierarquia de Importância
Nem todos os itens não mapeados têm o mesmo impacto:

| Impacto | Item | Motivo |
|---------|------|--------|
| 🚨 CRÍTICO | Queries SQL | Acesso a dados, regras de negócio |
| ⚠️ ALTO | Métodos utilitários | Dependências framework |
| ✅ COMPLETO | Telas, Objetos, Regras | Já mapeados 100% |

### 3. Formato da Matriz é Robusto
A documentação da matriz já previa o tipo QUERY como categoria separada de METOD. O problema foi execução da análise, não design da matriz.

---

## ✅ Conclusão

### Status Atual: **INCOMPLETO** 🚨

A matriz está 81.4% completa, mas **faltam os itens mais críticos**: as queries SQL.

### Recomendação Final

**1. URGENTE - Adicionar queries (2-3 horas)**
   - Usar arquivo `QUERIES_FALTANTES_MATRIZ.csv`
   - Adicionar todas as 46 queries
   - Validar integridade da matriz

**2. IMPORTANTE - Adicionar métodos utilitários (15 min)**
   - Usar arquivo `ENTRADAS_FALTANTES_MATRIZ.csv`
   - Adicionar os 5 métodos
   - Documentar estratégia de substituição

**3. DOCUMENTAÇÃO - Abordagem de migração (2-3 dias)**
   - Para cada query, definir repository method
   - Identificar queries que precisam otimização
   - Mapear relacionamentos entre entidades
   - Criar plano de testes de integração

### Impacto de NÃO Mapear Queries

❌ Sem queries mapeadas:
- Impossível criar repositories completos
- Perde-se rastreabilidade de regras de negócio
- Relacionamentos entre entidades não documentados
- Risco de perder lógica SQL na migração
- Dificulta testes de integração

✅ Com queries mapeadas:
- Rastreabilidade 100% do acesso a dados
- Base sólida para criar repositories
- Documentação completa de relacionamentos
- Identificação de oportunidades de otimização
- Facilita criação de testes de integração

---

## 📞 Próximos Passos

**Deseja atualizar a MATRIZ_RASTREABILIDADE.csv agora?**

Se sim, adicionarei as 51 entradas (5 métodos + 46 queries) na matriz, resultando em **100% de completude** para o arquivo `cb2qa.esf`.

**Arquivos prontos para uso:**
- ✅ `TODAS_ENTRADAS_FALTANTES.csv` - Todas as 51 entradas em um arquivo
- ✅ `QUERIES_FALTANTES_MATRIZ.csv` - Apenas as 46 queries
- ✅ `ENTRADAS_FALTANTES_MATRIZ.csv` - Apenas os 5 métodos

---

**Gerado por:** Análise automatizada com `vamap.exe`  
**Arquivos de referência:** `matriz.mdc`, `vamap.mdc`, `commands`

