# Matriz de Rastreabilidade - Frontend VGFNA

## 📋 Visão Geral

Este documento mapeia todos os elementos da `MATRIZ_RASTREABILIDADE_VGFNA.csv` que são aplicáveis ao frontend, mantendo rastreabilidade completa.

**Fonte**: `Matriz/MATRIZ_RASTREABILIDADE_VGFNA.csv`  
**Total de Elementos na Matriz**: 67  
**Elementos Aplicáveis ao Frontend**: 35  
**Elementos Backend**: 32

---

## 📊 Tabela Completa de Rastreabilidade

### TELAS

| ID | Tipo | Descrição | Componente | Arquivo | Status |
|----|------|-----------|-------------|---------|--------|
| TELA-0101 | TELA | VGFNM010 - Tela alteração dados básicos (liberados) | `ConsultaApolicePage` | `src/pages/ConsultaApolice/ConsultaApolicePage.tsx` | ✅ |
| TELA-0102 | TELA | VGFNM020 - Tela alteração dados básicos (subgrupo) | `AlteracaoSubgrupoPage` | `src/pages/AlteracaoSubgrupo/AlteracaoSubgrupoPage.tsx` | ✅ |
| TELA-0103 | TELA | VGFNM030 - Tela alteração dados básicos (termo adesão) | `AlteracaoTermoAdesaoPage` | `src/pages/AlteracaoTermoAdesao/AlteracaoTermoAdesaoPage.tsx` | ✅ |
| TELA-0104 | TELA | VGFNH010 - Tela ajuda VGFNM010 | `HelpModal` | `src/components/common/HelpModal.tsx` | ✅ |
| TELA-0105 | TELA | VGFNH020 - Tela ajuda VGFNM020 | `HelpModal` | `src/components/common/HelpModal.tsx` | ✅ |
| TELA-0106 | TELA | VGFNH030 - Tela ajuda VGFNM030 | `HelpModal` | `src/components/common/HelpModal.tsx` | ✅ |

### OBJETOS

| ID | Tipo | Objeto_Pai | Campo | Componente | Arquivo | Status |
|----|------|------------|-------|------------|---------|--------|
| OBJ-0101 | OBJETO | VGFNM010 | MNUEMP | `DisplayField` | `src/components/common/DisplayField.tsx` | ✅ |
| OBJ-0102 | OBJETO | VGFNM010 | DATA | `DisplayField` | `src/components/common/DisplayField.tsx` | ✅ |
| OBJ-0103 | OBJETO | VGFNM010 | VERSAO | `DisplayField` | `src/components/common/DisplayField.tsx` | ✅ |
| OBJ-0104 | OBJETO | VGFNM010 | NOMSIS | `DisplayField` | `src/components/common/DisplayField.tsx` | ✅ |
| OBJ-0105 | OBJETO | VGFNM010 | HORA | `DisplayField` | `src/components/common/DisplayField.tsx` | ✅ |
| OBJ-0106 | OBJETO | VGFNM010 | GRUFUC | `DisplayField` | `src/components/common/DisplayField.tsx` | ✅ |
| OBJ-0107 | OBJETO | VGFNM010 | NUM_APOLICE | `NumberInput` | `src/components/forms/NumberInput.tsx` | ✅ |
| OBJ-0108 | OBJETO | VGFNM010 | COD_SUBGRUPO | `NumberInput` | `src/components/forms/NumberInput.tsx` | ✅ |
| OBJ-0109 | OBJETO | VGFNM010 | EZEMSG | `MessageDisplay` | `src/components/common/MessageDisplay.tsx` | ✅ |

### FUNCOES_TELA

| ID | Tipo | Objeto_Pai | Função | Componente | Arquivo | Status |
|----|------|------------|--------|------------|---------|--------|
| FTELA-0101 | FUNCAO_TELA | VGFNM010 | VGFNP005 | `ConsultaApolicePage` | `src/pages/ConsultaApolice/ConsultaApolicePage.tsx` | ✅ |
| FTELA-0102 | FUNCAO_TELA | VGFNM020 | VGFNP025 | `AlteracaoSubgrupoPage` | `src/pages/AlteracaoSubgrupo/AlteracaoSubgrupoPage.tsx` | ✅ |
| FTELA-0103 | FUNCAO_TELA | VGFNM030 | VGFNP035 | `AlteracaoTermoAdesaoPage` | `src/pages/AlteracaoTermoAdesao/AlteracaoTermoAdesaoPage.tsx` | ✅ |

### METODOS (Frontend)

| ID | Tipo | Método | Descrição | Hook/Service | Arquivo | Status |
|----|------|--------|-----------|--------------|---------|--------|
| METOD-0104 | METODO | VGFNS002 | Valida e processa tela M010 | `useConsultaApolice` | `src/hooks/useConsultaApolice.ts` | ✅ |
| METOD-0107 | METODO | VGFNS003 | Valida e processa tela M020 | `useAlteracaoSubgrupo` | `src/hooks/useAlteracaoSubgrupo.ts` | ✅ |
| METOD-0109 | METODO | VGFNS004 | Valida e processa tela M030 | `useAlteracaoTermoAdesao` | `src/hooks/useAlteracaoTermoAdesao.ts` | ✅ |

### REGRAS

| ID | Tipo | Objeto_Pai | Regra | Implementação | Arquivo | Status |
|----|------|------------|-------|---------------|---------|--------|
| REGRA-0101 | REGRA | VGFNS002 | IF EZEAID=PF3 - Testa tecla F3 sair | `handleExit()` | `src/pages/ConsultaApolice/ConsultaApolicePage.tsx` | ✅ |
| REGRA-0102 | REGRA | VGFNS002 | CALL ZZ01SGPS3 - Função sair | `navigate('/')` | `src/pages/ConsultaApolice/ConsultaApolicePage.tsx` | ✅ |
| REGRA-0103 | REGRA | VGFNS002 | IF EZEAID=PF4 - Testa tecla F4 consulta | `handleConsultaExterna()` | `src/pages/ConsultaApolice/ConsultaApolicePage.tsx` | ⚠️ |
| REGRA-0104 | REGRA | VGFNS002 | IF EZEAID=PF10 - Testa tecla F10 inclusão | `handleInclusao()` | `src/pages/ConsultaApolice/ConsultaApolicePage.tsx` | ⚠️ |
| REGRA-0105 | REGRA | VGFNS002 | IF EZEAID=PF12 - Testa tecla F12 cancelar | `handleCancel()` | `src/pages/*/` | ✅ |
| REGRA-0106 | REGRA | VGFNS002 | CALL ZZ01SGPS12 - Função cancelar | `navigate('/')` | `src/pages/*/` | ✅ |
| REGRA-0107 | REGRA | VGFNS002 | IF EZEAID NOT ENTER - Valida tecla inválida | Validação no submit | `src/pages/ConsultaApolice/ConsultaApolicePage.tsx` | ✅ |
| REGRA-0108 | REGRA | VGFNS002 | IF NUM_APOLICE<>0 - Verifica apólice informada | Validação | `src/pages/ConsultaApolice/ConsultaApolicePage.tsx` | ✅ |
| REGRA-0109 | REGRA | VGFNS002 | CALL VGFNP011 - Busca apólice no banco | `consultarApolice()` | `src/services/consultaApoliceService.ts` | ✅ |
| REGRA-0110 | REGRA | VGFNS003 | IF TIPO_COBRANCA=2 - Valida tipo cobrança fatura | Validação | `src/pages/AlteracaoSubgrupo/AlteracaoSubgrupoPage.tsx` | ✅ |
| REGRA-0111 | REGRA | VGFNS003 | IF TIPO_COBRANCA=2 - PERI_FATURAMENTO obrigatório | Validação | `src/pages/AlteracaoSubgrupo/AlteracaoSubgrupoPage.tsx` | ✅ |
| REGRA-0112 | REGRA | VGFNS003 | IF TIPO_COBRANCA=2 - FORMA_FATURAMENTO obrigatório | Validação | `src/pages/AlteracaoSubgrupo/AlteracaoSubgrupoPage.tsx` | ✅ |
| REGRA-0113 | REGRA | VGFNS003 | IF TIPO_APOLICE=2 - VALIDAR_MATRICULA apenas 'S' | Validação | `src/pages/AlteracaoSubgrupo/AlteracaoSubgrupoPage.tsx` | ✅ |
| REGRA-0114 | REGRA | VGFNS003 | IF TIPO_FATUR=1 OR 3 AND TIPO_APOLICE=2 - Protege campos | `useEffect` | `src/pages/AlteracaoSubgrupo/AlteracaoSubgrupoPage.tsx` | ✅ |

**Legenda**:
- ✅ Implementado
- ⚠️ Pendente (opcional)

---

## 🔗 Elementos Backend (Referência)

### METODOS Backend (7)

| ID | Método | Descrição | Consumido via API |
|----|--------|-----------|-------------------|
| METOD-0101 | VGFNP000 | Processo inicial | ⚪ Backend |
| METOD-0102 | VGFNP002 | Processo principal | ⚪ Backend |
| METOD-0103 | VGFNP001 | Inquiry V0SISTEMA | ⚪ Backend |
| METOD-0105 | VGFNP011 | Inquiry V0APOLICE | ✅ `consultaApoliceService` |
| METOD-0106 | VGFNP012 | Inquiry V0CLIENTE | ✅ `consultaApoliceService` |
| METOD-0108 | VGFNP014 | Inquiry V0SUBGRUPO | ✅ `consultaApoliceService` |
| METOD-0110 | VGFNP040 | Update V0SUBGRUPO | ✅ `alteracaoSubgrupoService` |
| METOD-0111 | VGFNP019 | Inquiry V0TERMOADESAO | ✅ `alteracaoTermoAdesaoService` |
| METOD-0112 | VGFNP048 | Update V0TERMOADESAO | ✅ `alteracaoTermoAdesaoService` |
| METOD-0113 | VGFNP010 | Inquiry V1FONTE | ⚪ Backend |

### QUERIES (10)

Todas as queries são executadas no backend e retornam dados via API.

### ENTIDADES (15)

Todas as entidades são mapeadas no backend. O frontend consome via DTOs:
- `ApoliceDetalhesDto` (ENT-0101, ENT-0104)
- `SubgrupoDto` (ENT-0102)
- `AlteracaoSubgrupoRequestDto` (ENT-0102)
- `AlteracaoTermoAdesaoRequestDto` (ENT-0103)
- `Dominios` (ENT-0109 a ENT-0113)

---

## 📊 Estatísticas

### Frontend

- **Total de Elementos**: 35
- **Mapeados**: 35 (100%)
- **Implementados**: 33 (94.3%)
- **Pendentes**: 2 (5.7% - opcionais)

### Backend

- **Total de Elementos**: 32
- **Consumidos via API**: 10
- **Backend Only**: 22

---

## ✅ Validação

**Status**: ✅ **100% ALINHADO COM MATRIZ DE RASTREABILIDADE**

Todos os elementos aplicáveis ao frontend foram mapeados e documentados.

---

**Última Atualização**: 2025-01-XX

