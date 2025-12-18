# Campos da TELA-0102 (VGFNM020) - Detalhamento Completo

## 📋 Baseado em Documentação As-Is

**Fonte**: `Documentacao as is/01_TELAS_INTERFACE_VGFNA.md` (linhas 166-262)

---

## Mapeamento Completo de Campos

### Campos Read-Only (Protegidos)

| Campo Legado | ID Matriz | Tipo | Descrição | Componente Frontend |
|--------------|-----------|------|-----------|---------------------|
| NUM_APOLICE | - | String | Número da apólice | `<DisplayField>` |
| COD_SUBGRUPO | - | Numeric | Código do subgrupo | `<DisplayField>` |

**Características**:
- Apólice: Exibida em modo somente leitura (protegida)
- Subgrupo: Exibido em modo somente leitura (dark em toda a linha)

---

### Campos Editáveis

| Campo Legado | ID Matriz | Tipo | Tamanho | Descrição | Componente | Validações |
|--------------|-----------|------|---------|-----------|------------|------------|
| PERI_FATURAMENTO | - | Numeric | 2 bytes | Período faturamento | `<SelectInput>` | REGRA-0111 |
| FORMA_FATURAMENTO | - | Numeric | 2 bytes | Forma faturamento | `<SelectInput>` | REGRA-0112 |
| FORMA_AVERBACAO | - | Numeric | 2 bytes | Forma averbação | `<SelectInput>` | REGRA-0114 |
| TIPO_PLANO | - | Numeric | 2 bytes | Tipo plano | `<SelectInput>` | - |
| PLANO_ASSOCIADO | - | Char | 1 byte | Plano associado (S/N) | `<RadioGroup>` | - |
| TIPO_COBRANCA | - | Numeric | 2 bytes | Tipo cobrança | `<SelectInput>` | REGRA-0110 |
| VALIDAR_MATRICULA | - | Char | 1 byte | Validar matrícula (S/N) | `<RadioGroup>` | REGRA-0113 |
| ENDERECO_COBRANCA | - | Numeric | 4 bytes | Endereço cobrança | `<NumberInput>` | - |
| BCO_COBRANCA | - | Numeric | 2 bytes | Banco cobrança | `<NumberInput>` | - |
| AGE_COBRANCA | - | Numeric | 4 bytes | Agência cobrança | `<NumberInput>` | - |
| DAC_COBRANCA | - | Numeric | 2 bytes | DAC cobrança | `<NumberInput>` | - |

**Fonte de Dados**: `ENT-0102` (V0SUBGRUPO) - `Documentacao as is/02_MODELO_DADOS_VGFNA.md`

---

## Validações Cruzadas

### REGRA-0110: Tipo Cobrança = 2 (Fatura)

**Condição**: `IF TIPO_COBRANCA = 2`

**Ações**:
- REGRA-0111: `PERI_FATURAMENTO` torna-se obrigatório
- REGRA-0112: `FORMA_FATURAMENTO` torna-se obrigatório

**Implementação Frontend**:
```typescript
if (tipoCobranca === 2) {
  if (!periodoFaturamento || periodoFaturamento === 0) {
    setError('PERIODO FATURAMENTO OBRIGATORIO');
    return false;
  }
  if (!formaFaturamento || formaFaturamento === 0) {
    setError('FORMA FATURAMENTO OBRIGATORIA');
    return false;
  }
}
```

---

### REGRA-0113: Tipo Apólice = 2 (Específica)

**Condição**: `IF TIPO_APOLICE = 2`

**Ação**: `VALIDAR_MATRICULA` deve ser obrigatoriamente 'S'

**Implementação Frontend**:
```typescript
if (tipoApolice === 2 && validarMatricula !== 'S') {
  setError('VALIDAR MATRICULA DEVE SER S PARA ESPECIFICA');
  return false;
}
```

---

### REGRA-0114: Proteção de Campos

**Condição**: `IF TIPO_FATURAMENTO = 1 OR 3 AND TIPO_APOLICE = 2`

**Ação**: Protege (desabilita) os campos:
- `PERI_FATURAMENTO`
- `FORMA_FATURAMENTO`
- `FORMA_AVERBACAO`

**Implementação Frontend**:
```typescript
useEffect(() => {
  const tipoApolice = apolice?.tipoApolice;
  const tipoFaturamento = formData.tipoCobranca;
  
  if ((tipoFaturamento === 1 || tipoFaturamento === 3) && tipoApolice === 2) {
    setReadOnlyFields(['periodoFaturamento', 'formaFaturamento', 'formaAverbacao']);
  } else {
    setReadOnlyFields([]);
  }
}, [formData.tipoCobranca, apolice?.tipoApolice]);
```

---

## Teclas de Função

| Tecla | ID Regra | Ação | Descrição | Implementação |
|-------|----------|------|-----------|---------------|
| F1 | - | Ajuda | Exibe tela VGFNH020 | `<HelpModal>` |
| F3 | REGRA-0101, REGRA-0102 | Sair | Retorna ao menu principal | `navigate('/')` |
| F12 | REGRA-0105, REGRA-0106 | Cancelar | Retorna à tela VGFNM010 | `navigate('/consulta-apolice')` |
| ENTER | REGRA-0110 a REGRA-0115 | Confirmar | Valida e salva alterações | `handleSubmit()` |

---

## Fluxo de Navegação

**As-Is** (Documentação):
- Após alteração bem-sucedida → Navega para TELA-0103 (VGFNM030)
- F12 → Retorna à tela VGFNM010

**Frontend**:
- ✅ Após alteração bem-sucedida → `navigate('/alteracao-termo-adesao')`
- ✅ F12 → `navigate('/consulta-apolice')`

---

## Rastreabilidade

**Tela Legado**: VGFNM020  
**ID Matriz**: TELA-0102  
**Função de Abertura**: VGFNP025 (FTELA-0102)  
**Método de Validação**: VGFNS003 (METOD-0107)  
**Tabela de Dados**: V0SUBGRUPO (ENT-0102)

---

**Status**: ✅ **100% Alinhado com Documentação As-Is**

