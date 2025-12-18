# Mapeamento de Telas Legadas → Componentes React

## 📋 Visão Geral

Este documento detalha o mapeamento completo das telas 3270 legadas para componentes React modernos, mantendo rastreabilidade com a matriz de rastreabilidade.

**Baseado em**: `Documentacao as is/01_TELAS_INTERFACE_VGFNA.md`  
**Validação**: Ver `VALIDACAO_AS_IS.md` para validação completa

## 🔄 TELA-0101 → ConsultaApolicePage

### Rastreabilidade
- **ID Matriz**: `TELA-0101`
- **Tela Legado**: `VGFNM010`
- **Função Legado**: `VGFNP005` (FTELA-0101)
- **Componente React**: `ConsultaApolicePage`
- **Rota**: `/consulta-apolice`

### Mapeamento de Campos

| ID Matriz | Campo Legado | Tipo | Componente React | Props |
|-----------|--------------|------|------------------|-------|
| OBJ-0101 | MNUEMP | String (read-only) | `<DisplayField>` | `label="Menu/Empresa"` |
| OBJ-0102 | DATA | Date (read-only) | `<DisplayField>` | `label="Data"` `type="date"` |
| OBJ-0103 | VERSAO | String (read-only) | `<DisplayField>` | `label="Versão"` |
| OBJ-0104 | NOMSIS | String (read-only) | `<DisplayField>` | `label="Sistema"` |
| OBJ-0105 | HORA | Time (read-only) | `<DisplayField>` | `label="Hora"` `type="time"` |
| OBJ-0106 | GRUFUC | String (read-only) | `<DisplayField>` | `label="Grupo de Funções"` |
| OBJ-0107 | NUM_APOLICE | Numeric (editável, foco inicial) | `<NumberInput>` | `label="Apólice"` `required` `autoFocus` |
| OBJ-0108 | COD_SUBGRUPO | Numeric (editável) | `<NumberInput>` | `label="Subgrupo"` |
| OBJ-0109 | EZEMSG | String (read-only) | `<MessageDisplay>` | `type="info|error|warning"` |

### Ações e Navegação

| Tecla Legado | ID Regra | Ação | Componente React | Status |
|--------------|----------|------|-------------------|--------|
| F1 | - | Ajuda | `<HelpModal>` | ✅ Implementado |
| F3 | REGRA-0101, REGRA-0102 | Sair | `navigate('/')` ou `onExit()` | ✅ Implementado |
| F4 | REGRA-0103 | Consulta Externa (CTB5A, CTC5A, CTR4A) | TODO: `<ConsultaExternaModal>` | ⚠️ Pendente |
| F10 | REGRA-0104 | Inclusão (CTB1A, CTC2A) | TODO: `<InclusaoModal>` | ⚠️ Pendente |
| F12 | REGRA-0105, REGRA-0106 | Cancelar | `navigate('/')` ou `onCancel()` | ✅ Implementado |
| ENTER | REGRA-0108, REGRA-0109 | Consultar | `handleSubmit()` → navega para `/alteracao-subgrupo` | ✅ Implementado |

**Nota**: F4 e F10 são consultas externas opcionais que podem ser implementadas posteriormente.

### Fluxo de Validação

```typescript
// REGRA-0108: Verifica apólice informada
if (!numeroApolice || numeroApolice === '0') {
  setError('INFORME A APOLICE');
  return;
}

// REGRA-0109: Busca apólice no banco
const response = await consultarApolice(numeroApolice);
if (!response.isSuccess) {
  setError('APOLICE NAO ENCONTRADA');
  return;
}

// Navega para próxima tela
navigate('/alteracao-subgrupo', { state: { apolice: response.data } });
```

---

## 🔄 TELA-0102 → AlteracaoSubgrupoPage

### Rastreabilidade
- **ID Matriz**: `TELA-0102`
- **Tela Legado**: `VGFNM020`
- **Função Legado**: `VGFNP025` (FTELA-0102)
- **Componente React**: `AlteracaoSubgrupoPage`
- **Rota**: `/alteracao-subgrupo`

### Mapeamento de Campos

| Campo Legado | Tipo | Componente React | Validações |
|--------------|------|------------------|------------|
| NUM_APOLICE | String (read-only) | `<DisplayField>` | - |
| COD_SUBGRUPO | Numeric (read-only) | `<DisplayField>` | - |
| PERI_FATURAMENTO | Numeric (editável) | `<SelectInput>` | REGRA-0111: Obrigatório se TIPO_COBRANCA=2 |
| FORMA_FATURAMENTO | Numeric (editável) | `<SelectInput>` | REGRA-0112: Obrigatório se TIPO_COBRANCA=2 |
| FORMA_AVERBACAO | Numeric (editável) | `<SelectInput>` | - |
| TIPO_PLANO | Numeric (editável) | `<SelectInput>` | - |
| PLANO_ASSOCIADO | Char (S/N) (editável) | `<RadioGroup>` | - |
| TIPO_COBRANCA | Numeric (editável) | `<SelectInput>` | REGRA-0110: Validações cruzadas |
| VALIDAR_MATRICULA | Char (S/N) (editável) | `<RadioGroup>` | REGRA-0113: Deve ser 'S' se TIPO_APOLICE=2 |
| ENDERECO_COBRANCA | Numeric (editável) | `<NumberInput>` | - |
| BCO_COBRANCA | Numeric (editável) | `<NumberInput>` | - |
| AGE_COBRANCA | Numeric (editável) | `<NumberInput>` | - |
| DAC_COBRANCA | Numeric (editável) | `<NumberInput>` | - |

### Validações Cruzadas

#### REGRA-0110: Tipo Cobrança = 2 (Fatura)
```typescript
if (tipoCobranca === 2) {
  // REGRA-0111: Período faturamento obrigatório
  if (!periodoFaturamento || periodoFaturamento === 0) {
    setError('PERIODO FATURAMENTO OBRIGATORIO');
    return false;
  }
  
  // REGRA-0112: Forma faturamento obrigatória
  if (!formaFaturamento || formaFaturamento === 0) {
    setError('FORMA FATURAMENTO OBRIGATORIA');
    return false;
  }
} else {
  // Se tipo cobrança diferente de 2, período e forma devem ser 0
  setPeriodoFaturamento(0);
  setFormaFaturamento(0);
}
```

#### REGRA-0113: Tipo Apólice = 2 (Específica)
```typescript
if (tipoApolice === 2 && validarMatricula !== 'S') {
  setError('VALIDAR MATRICULA DEVE SER S PARA ESPECIFICA');
  return false;
}
```

#### REGRA-0114: Proteção de Campos
```typescript
// Se tipo faturamento = 1 ou 3 E tipo apólice = 2
if ((tipoFaturamento === 1 || tipoFaturamento === 3) && tipoApolice === 2) {
  // Proteger campos
  setReadOnlyFields(['periodoFaturamento', 'formaFaturamento', 'formaAverbacao']);
}
```

### Ações e Navegação

| Tecla Legado | Ação | Componente React |
|--------------|------|-------------------|
| F1 | Ajuda | `<HelpModal>` |
| F3 | Sair | `navigate('/')` |
| F12 | Cancelar | `navigate('/consulta-apolice')` |
| ENTER | Salvar | `handleSubmit()` → navega para `/alteracao-termo-adesao` |

---

## 🔄 TELA-0103 → AlteracaoTermoAdesaoPage

### Rastreabilidade
- **ID Matriz**: `TELA-0103`
- **Tela Legado**: `VGFNM030`
- **Função Legado**: `VGFNP035` (FTELA-0103)
- **Componente React**: `AlteracaoTermoAdesaoPage`
- **Rota**: `/alteracao-termo-adesao`

### Mapeamento

Similar à TELA-0102, mas aplicado ao termo adesão. Mesmas validações cruzadas.

### Ações e Navegação

| Tecla Legado | Ação | Componente React |
|--------------|------|-------------------|
| F1 | Ajuda | `<HelpModal>` |
| F3 | Sair | `navigate('/')` |
| F12 | Cancelar | `navigate('/alteracao-subgrupo')` |
| ENTER | Salvar | `handleSubmit()` → exibe sucesso |

---

## 📊 Resumo de Mapeamento

| ID Matriz | Tela Legado | Componente | Rota | Status |
|-----------|-------------|------------|------|--------|
| TELA-0101 | VGFNM010 | ConsultaApolicePage | `/consulta-apolice` | ✅ |
| TELA-0102 | VGFNM020 | AlteracaoSubgrupoPage | `/alteracao-subgrupo` | ✅ |
| TELA-0103 | VGFNM030 | AlteracaoTermoAdesaoPage | `/alteracao-termo-adesao` | ✅ |

**Total**: 3 telas mapeadas

