# 🚨 ANÁLISE CRÍTICA: QUERIES SQL NÃO MAPEADAS

**Arquivo analisado:** `_LEGADO/cb2qa.esf`  
**Data da análise:** 2025-12-03

---

## ❌ PROBLEMA CRÍTICO IDENTIFICADO

**TODAS as 46 queries SQL do arquivo estão FALTANDO na matriz!**

A matriz atual possui:
- ✅ 8 TELAS mapeadas
- ✅ 66 MÉTODOS mapeados
- ✅ 41 ENTIDADES mapeadas
- ✅ 64 OBJETOS mapeados
- ✅ 4 FUNÇÕES_TELA mapeadas
- ✅ 40 REGRAS mapeadas
- ❌ **0 QUERIES mapeadas**

---

## 📊 Resumo das Queries Faltantes

| Tipo de Query | Quantidade | Descrição |
|---------------|------------|-----------|
| **SELECT (INQUIRY)** | 30 | Consultas únicas que retornam um ou poucos registros |
| **SELECT (SETINQ)** | 13 | Consultas que preparam cursores para iteração |
| **FETCH (SCAN)** | 3 | Operações de iteração sobre cursores |
| **TOTAL** | **46** | **Todas não mapeadas** |

---

## 📋 Lista Completa de Queries Faltantes

### 1. QUERIES INQUIRY (30 queries SELECT únicas)

| ID Sugerido | Função Pai | Tabela Principal | Descrição |
|-------------|------------|------------------|-----------|
| QUERY-0001 | CB2QP003 | V1SISTEMA | SELECT: V1SISTEMA - Busca data movimento abertura sistema CB |
| QUERY-0002 | CB2QP052 | CB2QR001 | SELECT: CB2QR001 - Busca registro RD por numero apolice com join ramos |
| QUERY-0003 | CB2QP012 | GE_MOVTO_CONTA | SELECT: GE_MOVTO_CONTA - Busca dados movimento conta por chave composta |
| QUERY-0004 | CB2QP042 | V0APOLCOB | SELECT: V0APOLCOB - Busca dados conta debito/cartao por apolice |
| QUERY-0005 | CB2QP036 | V1MOVDEBCC_CEF | SELECT: V1MOVDEBCC_CEF - Busca numero requisicao por chave completa |
| QUERY-0006 | CB2QP021 | GE_LEGADO_PESSOA | SELECT: GE_LEGADO_PESSOA - Busca pessoa por numero ocorrencia movimento |
| QUERY-0007 | CB2QP026 | OD_PESSOA_FISICA | SELECT: OD_PESSOA_FISICA - Busca dados pessoa fisica por numero pessoa |
| QUERY-0008 | CB2QP027 | OD_PESSOA_JURIDICA | SELECT: OD_PESSOA_JURIDICA - Busca dados pessoa juridica por numero pessoa |
| QUERY-0009 | CB2QP011 | V0BILHETE | SELECT: V0BILHETE - Busca bilhete por numero bilhete |
| QUERY-0010 | CB2QP041 | V0BILHETE | SELECT: V0BILHETE - Busca bilhete por numero apolice |
| QUERY-0011 | CB2QP013 | V1ENDOSSO | SELECT: V1ENDOSSO - Busca endosso por apolice e numero endosso |
| QUERY-0012 | CB2QP12A | V0HISTCOBVA | SELECT: V0HISTCOBVA - Busca numero certificado por titulo |
| QUERY-0013 | CB2QP12B | V0PROPOSTAVA | SELECT: V0PROPOSTAVA - Busca codigo cliente por certificado |
| QUERY-0014 | CB2QP060 | V0PROPOSTA | SELECT: V0PROPOSTA - Busca codigo cliente por proposta e fonte |
| QUERY-0015 | CB2QP13A | V0MESTSINI | SELECT: V0MESTSINI - Busca sinistro mes por apolice sinistro |
| QUERY-0016 | CB2QP13B | V0HISTSINI | SELECT: V0HISTSINI - Busca nome favorecido historico sinistro |
| QUERY-0017 | CB2QP13C | V0CHEQUES | SELECT: V0CHEQUES - Busca nome favorecido por cheque interno |
| QUERY-0018 | CB2QP14A | V0CLIENTE | SELECT: V0CLIENTE - Busca dados cliente por codigo |
| QUERY-0019 | CB2QP025 | V0PARCELA | SELECT: V0PARCELA - Busca situacao parcela por chave |
| QUERY-0020 | CB2QP007 | GE_MOVIMENTO | SELECT: GE_MOVIMENTO - Busca dados movimento GE |
| QUERY-0021 | CB2QP004 | SI_AR_DETALHE_VC | SELECT: SI_AR_DETALHE_VC - Busca detalhes sinistro AR |
| QUERY-0022 | CB2QP009 | BANCOS | SELECT: BANCOS - Busca nome banco por codigo |
| QUERY-0023 | CB2QP033 | CALENDARIO | SELECT: CALENDARIO - Busca data calendario fim semana com calculos |
| QUERY-0024 | CB2QP031 | V0FERIADOS | SELECT: V0FERIADOS - Busca feriado por data com calculo dia seguinte |
| QUERY-0025 | CB2QP006 | CHEQUES_EMITIDOS | SELECT: CHEQUES_EMITIDOS - Busca cheque por documento e data movimento |
| QUERY-0026 | CB2QP008 | CHEQUES_EMITIDOS | SELECT: CHEQUES_EMITIDOS - Busca cheque por numero interno |
| QUERY-0027 | CB2QP028 | LOTE_CHEQUES | SELECT: LOTE_CHEQUES - Busca dados lote por cheque interno |
| QUERY-0028 | CB2QP035 | V1USUARIOS | SELECT: V1USUARIOS - Busca nome usuario por codigo |
| QUERY-0029 | CB2QP050 | SINISTRO_HISTORICO | SELECT: SINISTRO_HISTORICO - Valida se existe movimento posterior (subquery EXISTS) |
| QUERY-0030 | CB2QP051 | SINISTRO_HISTORICO | SELECT: SINISTRO_HISTORICO - Busca data/hora max movimento sinistro |

### 2. QUERIES SETINQ (13 queries SELECT para cursor)

| ID Sugerido | Função Pai | Tabela Principal | Descrição |
|-------------|------------|------------------|-----------|
| QUERY-0031 | CB2QP056 | V0MOVDEBCC_CEF | SELECT: V0MOVDEBCC_CEF - Cursor movimentos por apolice (RD) |
| QUERY-0032 | CB2QP053 | CB2QR001 | SELECT: CB2QR001 - Cursor RD por apolice e endosso com join ramos |
| QUERY-0033 | CB2QP057 | V0MOVDEBCC_CEF | SELECT: V0MOVDEBCC_CEF - Cursor movimentos por apolice e endosso (RD) |
| QUERY-0034 | CB2QP054 | CB2QR001 | SELECT: CB2QR001 - Cursor RD por conta debito com join ramos |
| QUERY-0035 | CB2QP058 | V0MOVDEBCC_CEF | SELECT: V0MOVDEBCC_CEF - Cursor movimentos por conta debito (RD) |
| QUERY-0036 | CB2QP055 | CB2QR001 | SELECT: CB2QR001 - Cursor RD por cartao com join ramos |
| QUERY-0037 | CB2QP059 | V0MOVDEBCC_CEF | SELECT: V0MOVDEBCC_CEF - Cursor movimentos por cartao (RD) |
| QUERY-0038 | CB2QP014 | V0MOVDEBCC_CEF | SELECT: V0MOVDEBCC_CEF - Cursor movimentos por apolice |
| QUERY-0039 | CB2QP015 | V0MOVDEBCC_CEF | SELECT: V0MOVDEBCC_CEF - Cursor movimentos por apolice e endosso |
| QUERY-0040 | CB2QP016 | V0MOVDEBCC_CEF | SELECT: V0MOVDEBCC_CEF - Cursor movimentos por conta debito |
| QUERY-0041 | CB2QP017 | V0MOVDEBCC_CEF | SELECT: V0MOVDEBCC_CEF - Cursor movimentos por cartao |
| QUERY-0042 | CB2QP023 | V0MOVDEBCC_CEF | SELECT: V0MOVDEBCC_CEF - Cursor parcelas por apolice/endosso/convenio |
| QUERY-0043 | CB2QP038 | V1MOVDEBCC_CEF | SELECT: V1MOVDEBCC_CEF - Cursor movimentos por chave e situacao |

### 3. QUERIES SCAN (3 operações FETCH)

| ID Sugerido | Função Pai | Cursor | Descrição |
|-------------|------------|--------|-----------|
| QUERY-0044 | CB2QP018 | V0MOVDEBCC_CEF | FETCH: V0MOVDEBCC_CEF - Itera cursor movimentos |
| QUERY-0045 | CB2QP024 | CALENDARIO | FETCH: CALENDARIO - Itera cursor calendario |
| QUERY-0046 | CB2QP039 | GE_MOVTO_CONTA | FETCH: GE_MOVTO_CONTA - Itera cursor movimento conta |

---

## 🎯 Impacto na Migração

### Criticidade: **ALTA**

As queries SQL são **fundamentais** para a migração porque:

1. **Lógica de Acesso a Dados**: Todas as consultas ao banco precisam ser migradas
2. **Relacionamentos**: As queries com JOINs revelam relacionamentos entre entidades
3. **Regras de Negócio**: Filtros WHERE contêm regras de negócio importantes
4. **Performance**: Queries com cursores podem ser otimizadas na migração
5. **Validações**: Queries com EXISTS/subqueries indicam validações complexas

### Exemplo de Dependência:

```
CB2QS011 (METOD-0010) 
  └─ Processa registro individual
      ├─ CB2QP012 (METOD-0013) → **QUERY-0003** ✅ Precisa ser mapeada
      ├─ CB2QP042 (METOD-0014) → **QUERY-0004** ✅ Precisa ser mapeada
      ├─ CB2QS014 (METOD-0051) → **QUERY-0005/0006/0007/0008** ✅ Precisam ser mapeadas
      └─ CB2QP011 (METOD-0019) → **QUERY-0009** ✅ Precisa ser mapeada
```

---

## 📝 Exemplo de Mapeamento de Query

Segundo a documentação da matriz, queries devem ser mapeadas assim:

```csv
QUERY-0001,QUERY,CB2QP003,METODO,"SELECT: V1SISTEMA WHERE IDSISTEM='CB' - Busca data abertura",_LEGADO/cb2qa.esf,6274-6289,Migrar para SistemaRepository.GetDataAbertura(),,,NOK,NOK,NOK
```

**Campos:**
- **Id**: QUERY-NNNN (sequencial)
- **Tipo**: QUERY
- **Objeto_Pai**: Nome do método que contém a query (CB2QP003)
- **Tipo_Objeto_Pai**: METODO
- **Descricao_Breve**: `[TIPO_SQL]: [Tabela] - [Detalhes]`
- **Ref_Legado_Arquivo**: `_LEGADO/cb2qa.esf`
- **Ref_Legado_Linhas**: Linha da função que contém a query

---

## 📈 Estatísticas das Queries

### Por Tabela Mais Consultada

| Tabela | Queries | Tipo |
|--------|---------|------|
| **V0MOVDEBCC_CEF** | 11 | 7 SETINQ + 4 INQUIRY + SCAN |
| **CB2QR001** | 5 | 4 SETINQ + 1 INQUIRY |
| **SINISTRO_HISTORICO** | 2 | 2 INQUIRY |
| **V0BILHETE** | 2 | 2 INQUIRY |
| **CHEQUES_EMITIDOS** | 2 | 2 INQUIRY |
| **V1MOVDEBCC_CEF** | 2 | 1 SETINQ + 1 INQUIRY |
| **Outras (22 tabelas)** | 22 | 1 cada |

### Por Padrão de Query

| Padrão | Quantidade | Exemplo |
|--------|------------|---------|
| **Busca por chave primária** | 18 | `WHERE COD_CLIENTE = ?` |
| **Busca com JOIN** | 5 | `T1.NUM_APOLICE = T2.NUM_APOLICE` |
| **Busca com GROUP BY** | 13 | Cursores com agregação |
| **Busca com subquery** | 2 | `EXISTS (SELECT ...)` |
| **Busca com cálculo** | 3 | `DATA + 01 DAY` |

---

## 🔧 Estratégia de Mapeamento

### Fase 1: Mapear Queries Críticas (10 queries)
Priorizar queries mais usadas e complexas:

1. **QUERY-0002** - CB2QR001 por apolice (JOIN com ramos)
2. **QUERY-0003** - GE_MOVTO_CONTA (chave composta)
3. **QUERY-0011** - V1ENDOSSO (dados principais)
4. **QUERY-0029** - SINISTRO_HISTORICO (EXISTS subquery)
5. **QUERY-0031** - Cursor V0MOVDEBCC_CEF por apolice
6. **QUERY-0032** - Cursor CB2QR001 com JOIN
7. **QUERY-0038** - Cursor V0MOVDEBCC_CEF simples
8. **QUERY-0042** - Cursor parcelas detalhado
9. **QUERY-0044** - FETCH V0MOVDEBCC_CEF
10. **QUERY-0018** - V0CLIENTE (busca principal)

### Fase 2: Mapear Queries de Lookup (16 queries)
Queries de busca de descrições e nomes:

- **QUERY-0012** a **QUERY-0017**: Buscas de códigos para nomes
- **QUERY-0022**: Nome banco
- **QUERY-0028**: Nome usuário

### Fase 3: Mapear Queries Auxiliares (20 queries)
Queries de validação e buscas secundárias.

---

## ✅ Próximos Passos

### 1. Criar arquivo com as 46 entradas CSV prontas

Gerar `QUERIES_FALTANTES_MATRIZ.csv` com todas as queries no formato correto.

### 2. Adicionar à matriz em ordem

Adicionar as queries na ordem:
- QUERY-0001 a QUERY-0030: INQUIRY
- QUERY-0031 a QUERY-0043: SETINQ
- QUERY-0044 a QUERY-0046: SCAN

### 3. Validar relacionamentos

Verificar se todas as queries referenciam métodos existentes na coluna `Objeto_Pai`.

### 4. Documentar abordagem de migração

Para cada query, definir:
- Repository method equivalente
- Se será raw SQL ou ORM
- Se precisa otimização (índices, etc)

---

## 📊 Métricas Atualizadas de Completude

### Antes (sem queries)
- **Total de itens no arquivo:** 221
- **Total mapeados:** 216 (97.7%)
- **Faltantes:** 5 métodos utilitários

### Depois (com queries)
- **Total de itens no arquivo:** 267 (221 + 46 queries)
- **Total mapeados:** 216 (80.9%) ❌
- **Faltantes:** 51 itens
  - 5 métodos utilitários
  - **46 queries SQL** ⚠️

---

## 🚨 Conclusão

A matriz está **incompleta** sem as queries. O percentual real de completude é **80.9%**, não 97.7%.

**É CRÍTICO** mapear todas as 46 queries antes de prosseguir com a migração, pois:

✅ Garantem rastreabilidade completa do acesso a dados  
✅ Documentam lógica de negócio nas cláusulas WHERE  
✅ Revelam relacionamentos entre entidades (JOINs)  
✅ Identificam oportunidades de otimização  
✅ Facilitam criação dos repositories modernos  

**Recomendação:** Adicionar TODAS as 46 queries à matriz antes de iniciar implementação da migração.

