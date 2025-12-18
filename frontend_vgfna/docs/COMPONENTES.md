# Documentação de Componentes

## 📋 Visão Geral

Este documento descreve todos os componentes React criados para o frontend VGFNA, com rastreabilidade completa para os elementos legados.

## 🎯 Componentes de Página

### ConsultaApolicePage
**Mapeamento**: TELA-0101 (VGFNM010)  
**Rota**: `/consulta-apolice`  
**Arquivo**: `src/pages/ConsultaApolice/ConsultaApolicePage.tsx`

**Funcionalidades**:
- Consulta de apólice por número
- Validação de entrada (REGRA-0108)
- Navegação para tela de alteração de subgrupo
- Ações: F1 (Ajuda), F3 (Sair), F4 (Consulta), F10 (Inclusão), F12 (Cancelar)

**Campos Mapeados**:
- OBJ-0101 a OBJ-0106: Header (read-only)
- OBJ-0107: NUM_APOLICE (editável, foco inicial)
- OBJ-0108: COD_SUBGRUPO (editável, opcional)
- OBJ-0109: EZEMSG (mensagens do sistema)

---

### AlteracaoSubgrupoPage
**Mapeamento**: TELA-0102 (VGFNM020)  
**Rota**: `/alteracao-subgrupo`  
**Arquivo**: `src/pages/AlteracaoSubgrupo/AlteracaoSubgrupoPage.tsx`

**Funcionalidades**:
- Edição de dados do subgrupo
- Validações cruzadas (REGRA-0110, REGRA-0111, REGRA-0112, REGRA-0113)
- Proteção condicional de campos (REGRA-0114)
- Atualização via API

**Validações Implementadas**:
- REGRA-0110: Tipo cobrança = 2 → Período e Forma faturamento obrigatórios
- REGRA-0111: Período faturamento obrigatório se tipo cobrança = 2
- REGRA-0112: Forma faturamento obrigatória se tipo cobrança = 2
- REGRA-0113: Validar matrícula deve ser 'S' se tipo apólice = 2
- REGRA-0114: Proteção de campos baseada em tipo faturamento e apólice

---

### AlteracaoTermoAdesaoPage
**Mapeamento**: TELA-0103 (VGFNM030)  
**Rota**: `/alteracao-termo-adesao`  
**Arquivo**: `src/pages/AlteracaoTermoAdesao/AlteracaoTermoAdesaoPage.tsx`

**Funcionalidades**:
- Edição de dados do termo adesão
- Mesmas validações da tela de subgrupo
- Atualização via API

---

## 🧩 Componentes Reutilizáveis

### Layout

#### Header
**Arquivo**: `src/components/layout/Header.tsx`  
**Mapeamento**: OBJ-0101 a OBJ-0106

Exibe informações do sistema no cabeçalho:
- Menu/Empresa
- Data e Hora
- Versão do sistema
- Nome do sistema
- Grupo de funções

---

### Common

#### DisplayField
**Arquivo**: `src/components/common/DisplayField.tsx`  
**Mapeamento**: OBJ-0101 a OBJ-0106 (campos read-only)

Componente para exibir campos somente leitura.

**Props**:
- `label`: Label do campo
- `value`: Valor a ser exibido
- `type`: Tipo de formatação ('text' | 'date' | 'time' | 'number')

---

#### MessageDisplay
**Arquivo**: `src/components/common/MessageDisplay.tsx`  
**Mapeamento**: OBJ-0109 (EZEMSG)

Componente para exibir mensagens do sistema.

**Props**:
- `type`: Tipo de mensagem ('info' | 'error' | 'warning')
- `message`: Texto da mensagem
- `onClose`: Callback para fechar mensagem

---

#### Button
**Arquivo**: `src/components/common/Button.tsx`  
**Mapeamento**: Ações das telas (F1, F3, F4, F10, F12, ENTER)

Componente de botão reutilizável.

**Props**:
- `type`: Tipo do botão ('button' | 'submit' | 'reset')
- `variant`: Variante visual ('primary' | 'secondary' | 'danger')
- `onClick`: Callback de clique
- `loading`: Estado de carregamento
- `disabled`: Estado desabilitado
- `icon`: Ícone do botão

---

#### HelpModal
**Arquivo**: `src/components/common/HelpModal.tsx`  
**Mapeamento**: TELA-0104, TELA-0105, TELA-0106 (telas de ajuda)

Modal de ajuda.

**Props**:
- `title`: Título do modal
- `content`: Conteúdo da ajuda
- `onClose`: Callback para fechar

---

### Forms

#### NumberInput
**Arquivo**: `src/components/forms/NumberInput.tsx`  
**Mapeamento**: OBJ-0107, OBJ-0108 (campos numéricos)

Input numérico com validação.

**Props**:
- `id`: ID do campo
- `label`: Label do campo
- `value`: Valor atual
- `onChange`: Callback de mudança
- `required`: Campo obrigatório
- `autoFocus`: Foco automático
- `disabled`: Estado desabilitado

---

#### SelectInput
**Arquivo**: `src/components/forms/SelectInput.tsx`  
**Mapeamento**: Campos de seleção (PERI_FATURAMENTO, FORMA_FATURAMENTO, etc)

Select/dropdown para seleção de valores.

**Props**:
- `id`: ID do campo
- `label`: Label do campo
- `value`: Valor selecionado
- `onChange`: Callback de mudança
- `options`: Array de opções
- `required`: Campo obrigatório
- `disabled`: Estado desabilitado
- `loading`: Estado de carregamento

---

#### RadioGroup
**Arquivo**: `src/components/forms/RadioGroup.tsx`  
**Mapeamento**: PLANO_ASSOCIADO, VALIDAR_MATRICULA (campos S/N)

Grupo de radio buttons.

**Props**:
- `id`: ID do grupo
- `label`: Label do grupo
- `value`: Valor selecionado
- `onChange`: Callback de mudança
- `options`: Array de opções
- `required`: Campo obrigatório
- `disabled`: Estado desabilitado

---

## 🔌 Hooks Customizados

### useConsultaApolice
**Arquivo**: `src/hooks/useConsultaApolice.ts`  
**Mapeamento**: METOD-0104 (VGFNS002), METOD-0105 (VGFNP011)

Hook para consulta de apólice.

**Retorna**:
- `consultarApolice`: Função para consultar apólice
- `loading`: Estado de carregamento
- `error`: Mensagem de erro
- `clearError`: Função para limpar erro

---

### useAlteracaoSubgrupo
**Arquivo**: `src/hooks/useAlteracaoSubgrupo.ts`  
**Mapeamento**: METOD-0107 (VGFNS003), METOD-0108 (VGFNP022)

Hook para alteração de subgrupo.

**Retorna**:
- `alterarSubgrupo`: Função para alterar subgrupo
- `loading`: Estado de carregamento
- `error`: Mensagem de erro
- `clearError`: Função para limpar erro

---

### useAlteracaoTermoAdesao
**Arquivo**: `src/hooks/useAlteracaoTermoAdesao.ts`  
**Mapeamento**: METOD-0109 (VGFNS004), METOD-0110 (VGFNP023)

Hook para alteração de termo adesão.

**Retorna**:
- `alterarTermoAdesao`: Função para alterar termo adesão
- `loading`: Estado de carregamento
- `error`: Mensagem de erro
- `clearError`: Função para limpar erro

---

### useDominios
**Arquivo**: `src/hooks/useDominios.ts`  
**Mapeamento**: ENT-0109 a ENT-0113 (tabelas de domínio)

Hook para carregar tabelas de domínio.

**Retorna**:
- `dominios`: Objeto com todas as tabelas de domínio
- `loading`: Estado de carregamento
- `error`: Mensagem de erro

---

## 🔧 Serviços

### consultaApoliceService
**Arquivo**: `src/services/consultaApoliceService.ts`  
**Endpoint**: `POST /api/alteracao-dados-basicos/consultar-apolice`

Serviço para consulta de apólice.

---

### alteracaoSubgrupoService
**Arquivo**: `src/services/alteracaoSubgrupoService.ts`  
**Endpoint**: `PUT /api/alteracao-dados-basicos/alterar-subgrupo`

Serviço para alteração de subgrupo.

---

### alteracaoTermoAdesaoService
**Arquivo**: `src/services/alteracaoTermoAdesaoService.ts`  
**Endpoint**: `PUT /api/alteracao-dados-basicos/alterar-termo-adesao`

Serviço para alteração de termo adesão.

---

### dominiosService
**Arquivo**: `src/services/dominiosService.ts`  
**Mapeamento**: ENT-0109 a ENT-0113

Serviço para carregar tabelas de domínio.

---

### apiClient
**Arquivo**: `src/services/apiClient.ts`

Cliente HTTP configurado com axios para comunicação com a API.

---

## 📊 Resumo de Mapeamento

| Tipo | Quantidade | IDs Mapeados |
|------|------------|--------------|
| Páginas | 3 | TELA-0101, TELA-0102, TELA-0103 |
| Componentes Layout | 1 | Header |
| Componentes Common | 4 | DisplayField, MessageDisplay, Button, HelpModal |
| Componentes Forms | 3 | NumberInput, SelectInput, RadioGroup |
| Hooks | 4 | useConsultaApolice, useAlteracaoSubgrupo, useAlteracaoTermoAdesao, useDominios |
| Serviços | 5 | consultaApoliceService, alteracaoSubgrupoService, alteracaoTermoAdesaoService, dominiosService, apiClient |

**Total**: 20 componentes/hooks/serviços criados

