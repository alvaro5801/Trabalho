# Análise de Itens Não Mapeados - cb2qa.esf

## 📊 Resumo da Análise

### Informações Coletadas do vamap

#### Funções por Tipo

**INQUIRY (30 funções):**
CB2QP003, CB2QP052, CB2QP012, CB2QP042, CB2QP036, CB2QP021, CB2QP026, CB2QP027, CB2QP011, CB2QP041, CB2QP013, CB2QP12A, CB2QP12B, CB2QP060, CB2QP13A, CB2QP13B, CB2QP13C, CB2QP14A, CB2QP025, CB2QP007, CB2QP004, CB2QP009, CB2QP033, CB2QP031, CB2QP006, CB2QP008, CB2QP028, CB2QP035, CB2QP050, CB2QP051

**SETINQ (13 funções):**
CB2QP056, CB2QP053, CB2QP057, CB2QP054, CB2QP058, CB2QP055, CB2QP059, CB2QP014, CB2QP015, CB2QP016, CB2QP017, CB2QP023, CB2QP038

**SCAN (3 funções):**
CB2QP018, CB2QP024, CB2QP039

**EXECUTE (24 funções):**
CB2QP000, CB2QP005, ZZRCIN1, ZZ20S01, CB2QS010, ZZ01SGPS3, ZZ01SGPS12, ZZRCIN2, CB2QS011, CB2QS014, CB2QS012, CB2QS013, CB2QP019, CB2QS020, CB2QS021, CB2QP022, CB2QS022, CB2QP029, CB2QS030, CB2QS031, CB2QP032, CB2QS001, CB2QS032, CB2QS033, CB2QS040

**CONVERSE (4 funções):**
CB2QP010, CB2QP020, CB2QP030, CB2QP040

#### Telas (Maps)

**CB2QM010 - Campos (16):**
MNUEMP, DATA, VERSAO, NOMSIS, HORA, GRUFUC, NUM_TITULO*, NUM_APOLICE, NRENDOS, COD_AGENCIA_DEB, OPER_CONTA_DEB, NUM_CONTA_DEB, DIG_CONTA_DEB, WK_CARTAO1, DIG_NUM_CARTAO, EZEMSG

**CB2QM020 - Campos (15):**
MNUEMP, DATA, VERSAO, NOMSIS, HORA, GRUFUC, QTD_REGISTROS, ACPAG2, COD_CONVENIO*, NUM_APOLICE, NRENDOS, TIPO_COBRANCA, W01A0028, NOME_SEGURADO, EZEMSG

**CB2QM030 - Campos (18):**
MNUEMP, DATA, VERSAO, NOMSIS, HORA, GRUFUC, NOME_RAZAO, NUM_APOLICE, NRENDOS, COD_CONVENIO, CB2QLIT, W01A0028, QTD_REGISTROS, ACPAG3, NRPARCEL*, DTVENCTO, VLR_DEBITO, TIPO_COBRANCA, SIT_COBRA, SIT_PARC, FORMA_COBRA, EZEMSG

**CB2QM040 - Campos (44):**
MNUEMP, DATA, VERSAO, NOMSIS, HORA, GRUFUC, NOME_RAZAO, CB2Q_CPFCNPJ, NUM_APOLICE, NRENDOS, NRPARCEL, DTVENCTO, VLR_DEBITO, SIT_COBRA, TIPO_COBRANCA, DTMOVTO, NOMUSU, CB2QTIT1, COD_BANCO, CB2QTRACO, CB2Q_DESC, COD_CONVENIO, CB2QLIT, W01A0028, DADOS_GE_MOVTO_CONTA, NSAS, DATA_ENVIO, NSAC, DATA_RETORNO, CB2QTIT2*, DATAPAG, DTCREDITO, CB2QTIT3, NUM_CHEQUE, CB2QTIT4, DIG_CHEQUE, CB2QTIT5, CB2QSERIE, CB2QTIT6, CB2QCHEQUE, CODRET, DESCRET, EZEMSG

#### Estruturas de Dados

**FUNCTION (28 tabelas SQL):**
BANCOS, CALENDARIO, CB2QR001, CHEQUES_EMITIDOS, GE_LEGADO_PESSOA, GE_MOVIMENTO, GE_MOVTO_CONTA, LOTE_CHEQUES, OD_PESSOA_FISICA, OD_PESSOA_JURIDICA, SI_AR_DETALHE_VC, SINISTRO_HISTORICO, V0APOLCOB, V0BILHETE, V0CHEQUES, V0CLIENTE, V0FERIADOS, V0HISTCOBVA, V0HISTSINI, V0MESTSINI, V0MOVDEBCC_CEF, V0PARCELA, V0PROPOSTA, V0PROPOSTAVA, V1ENDOSSO, V1MOVDEBCC_CEF, V1SISTEMA, V1USUARIOS

**RECORD (6 workstorages):**
CB2QW001, CB2QW002, CB2QW003, CB2QW004, ZZ20W01, ZZ99W01

**TABLE (6 tabelas de domínio):**
CB2QT01, CB2QT02, CB2QT03, CB2QT04, CB2QT05, CB2QT06

**WORKSTOR (1):**
ZZ01W001

## ❌ Itens Não Mapeados

### METODO - Funções Execute Faltantes (9)

| Função | Tipo | Descrição |
|--------|------|-----------|
| CB2QP019 | Execute | Move dados para tela M020 |
| CB2QS014 | Execute | Determina tipo documento busca cliente |
| CB2QS021 | Execute | Move dados paginação M020 |
| CB2QP022 | Execute | Processa seleção item M020 |
| CB2QS022 | Execute | Valida tipo segurado |
| CB2QP029 | Execute | Move dados para tela M030 |
| CB2QS031 | Execute | Move dados paginação M030 |
| CB2QS032 | Execute | Processa teclas M030 |
| CB2QS033 | Execute | Monta linha exibição M030 |

### OBJ - Objetos de Tela Faltantes

#### CB2QM040 - Campos Adicionais (24 objetos)

| Campo | Descrição |
|-------|-----------|
| CB2QTIT1 | Label título seção banco |
| CB2QTRACO | Separador visual |
| CB2QLIT | Label "CARTAO OU C/C" |
| CB2QTIT2 | Label "DATA PAGAMENTO" |
| CB2QTIT3 | Label título seção cheque |
| CB2QTIT4 | Label "DIG" |
| CB2QTIT5 | Label título série |
| CB2QSERIE | Campo série cheque |
| CB2QTIT6 | Label título número cheque |
| CB2QCHEQUE | Campo número cheque visual |
| CODRET | Código retorno |
| DESCRET | Descrição retorno |
| DATAPAG | Data pagamento |
| DATA_ENVIO | Data envio fita |
| DATA_RETORNO | Data retorno fita |

#### CB2QM030 - Campos Adicionais (1 objeto)

| Campo | Descrição |
|-------|-----------|
| CB2QLIT | Label "CARTAO OU C/C" |

### REGRA - Regras de Negócio Detalhadas Faltantes

Todas as regras dentro das funções Execute faltantes precisam ser mapeadas:
- CB2QP019: Lógica de movimentação de dados para M020
- CB2QS014: Lógica de determinação de tipo de documento
- CB2QS021: Lógica de paginação M020
- CB2QP022: Lógica de seleção de item
- CB2QS022: Lógica de validação de tipo segurado
- CB2QP029: Lógica de movimentação para M030
- CB2QS031: Lógica de paginação M030
- CB2QS032: Lógica de processamento de teclas
- CB2QS033: Lógica de montagem de linhas de exibição

### FTELA - Funções de Tela Ausentes

Possíveis funções de tela que faltam mapear (precisam ser verificadas no código):
- Eventos de paginação (F7/F8)
- Eventos de seleção em grid
- Eventos de teclas especiais

## ✅ Status da Matriz Atual

### Já Mapeados:

- **Telas (8):** CB2QM010, CB2QM020, CB2QM030, CB2QM040, CB2QH010, CB2QH020, CB2QH030, CB2QH040
- **Métodos (66):** CB2QP000 até CB2QP066 (exceto os 9 listados como faltantes acima)
- **Entidades (41):** Todas as tabelas SQL, workstorages e tabelas de domínio
- **Objetos (64):** Campos principais das 4 telas
- **Funções de Tela (4):** CB2QP010, CB2QP020, CB2QP030, CB2QP040
- **Regras (40):** Regras mapeadas em CB2QS010 e CB2QS011
- **Queries (46):** Todas as operações SQL documentadas

## 📝 Recomendações

### Próximos Passos:

1. **Analisar detalhadamente as 9 funções Execute faltantes** usando vamap --code
2. **Mapear todas as regras de negócio** dentro dessas funções
3. **Adicionar objetos de tela labels/literais** que faltam (especialmente CB2QM040)
4. **Verificar se há eventos de tela** não mapeados (F7/F8, seleção de item)
5. **Atualizar matriz** com todas as novas entradas

### Prioridade:

1. 🔴 **Alta:** Funções Execute que contêm lógica de negócio importante (CB2QS014, CB2QS022)
2. 🟡 **Média:** Funções de movimentação de dados (CB2QP019, CB2QP029)
3. 🟢 **Baixa:** Labels e campos visuais estáticos

## 📊 Estatísticas de Completude

| Tipo | Total no Código | Mapeados | Faltantes | % Completo |
|------|----------------|----------|-----------|------------|
| METODO | 75 | 66 | 9 | 88% |
| TELA | 8 | 8 | 0 | 100% |
| ENTIDADE | 41 | 41 | 0 | 100% |
| OBJ | ~90 | 64 | ~26 | 71% |
| FTELA | ~8 | 4 | ~4 | 50% |
| REGRA | ~200 | 40 | ~160 | 20% |
| QUERY | 46 | 46 | 0 | 100% |

**Completude Geral Estimada:** ~75%
