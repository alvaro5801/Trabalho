# Regras de Negócio - Mapeamento Completo

## 📋 Baseado em Documentação As-Is

**Fonte**: `Documentacao as is/04_FUNCOES_REGRAS_NEGOCIO_VGFNA.md`

---

## TELA-0101 (VGFNM010) - Regras Implementadas

### REGRA-0101: Testa Tecla F3 Sair

**As-Is**:
```cobol
IF EZEAID = PF3 THEN
    CALL ZZ01SGPS3
END-IF
```

**Frontend**: ✅ Implementado
```typescript
const handleExit = () => {
  navigate('/'); // Equivalente a ZZ01SGPS3
};
```

---

### REGRA-0102: Função Sair (ZZ01SGPS3)

**As-Is**: Chama função de saída do programa

**Frontend**: ✅ Implementado via `navigate('/')`

---

### REGRA-0103: Testa Tecla F4 Consulta

**As-Is**:
```cobol
IF EZEAID = PF4 THEN
    // Consulta dados externos (CTB5A, CTC5A, CTR4A)
END-IF
```

**Frontend**: ⚠️ Pendente (consulta externa opcional)
```typescript
const handleConsultaExterna = () => {
  // TODO: Implementar modal de consulta externa
  console.log('Consulta Externa - CTB5A, CTC5A, CTR4A');
};
```

---

### REGRA-0104: Testa Tecla F10 Inclusão

**As-Is**:
```cobol
IF EZEAID = PF10 THEN
    // Consulta dados para inclusão (CTB1A, CTC2A)
END-IF
```

**Frontend**: ⚠️ Pendente (consulta externa opcional)
```typescript
const handleInclusao = () => {
  // TODO: Implementar modal de inclusão
  console.log('Consulta Inclusão - CTB1A, CTC2A');
};
```

---

### REGRA-0105: Testa Tecla F12 Cancelar

**As-Is**:
```cobol
IF EZEAID = PF12 THEN
    CALL ZZ01SGPS12
END-IF
```

**Frontend**: ✅ Implementado
```typescript
const handleCancel = () => {
  navigate('/'); // Equivalente a ZZ01SGPS12
};
```

---

### REGRA-0106: Função Cancelar (ZZ01SGPS12)

**As-Is**: Chama função de cancelar operação

**Frontend**: ✅ Implementado via `navigate('/')`

---

### REGRA-0107: Valida Tecla Inválida

**As-Is**:
```cobol
IF EZEAID NOT ENTER AND NOT PF3 AND NOT PF12 THEN
    MOVE 'TECLA INVALIDA' TO EZEMSG
END-IF
```

**Frontend**: ✅ Implementado
- Validação feita no submit do formulário
- Apenas ENTER permite submit
- Outras teclas têm handlers específicos

---

### REGRA-0108: Verifica Apólice Informada

**As-Is**:
```cobol
IF NUM_APOLICE <> 0 THEN
    CALL VGFNP011
    // ...
ELSE
    MOVE 'INFORME A APOLICE' TO EZEMSG
END-IF
```

**Frontend**: ✅ Implementado
```typescript
if (!numeroApolice || numeroApolice === '0' || numeroApolice.trim() === '') {
  setMessage({ type: 'error', text: 'INFORME A APOLICE' });
  return;
}
```

---

### REGRA-0109: Busca Apólice no Banco

**As-Is**:
```cobol
CALL VGFNP011
IF V0APOLICE NOT NRF THEN
    CALL VGFNP012
    MOVE 'MOSTRA TELA M020' TO VGFNW001.W01A0035
ELSE
    MOVE 'APOLICE NAO ENCONTRADA' TO EZEMSG
END-IF
```

**Frontend**: ✅ Implementado
```typescript
const response = await consultarApolice({ numeroApolice: numeroApolice.trim() });

if (response.isSuccess && response.data) {
  navigate('/alteracao-subgrupo', { state: { apolice: response.data } });
} else {
  setMessage({ type: 'error', text: 'APOLICE NAO ENCONTRADA' });
}
```

---

## TELA-0102 (VGFNM020) - Regras Implementadas

### REGRA-0110: Valida Tipo de Cobrança = 2 (Fatura)

**As-Is**:
```cobol
IF TIPO_COBRANCA = 2 THEN
    // REGRA-0111: PERI_FATURAMENTO obrigatório
    // REGRA-0112: FORMA_FATURAMENTO obrigatório
END-IF
```

**Frontend**: ✅ Implementado
```typescript
if (formData.tipoCobranca === 2) {
  // REGRA-0111: Período faturamento obrigatório
  if (!formData.periodoFaturamento || formData.periodoFaturamento === 0) {
    setMessage({ type: 'error', text: 'PERIODO FATURAMENTO OBRIGATORIO' });
    return false;
  }

  // REGRA-0112: Forma faturamento obrigatória
  if (!formData.formaFaturamento || formData.formaFaturamento === 0) {
    setMessage({ type: 'error', text: 'FORMA FATURAMENTO OBRIGATORIA' });
    return false;
  }
}
```

---

### REGRA-0111: Período Faturamento Obrigatório

**As-Is**: `IF TIPO_COBRANCA = 2 THEN PERI_FATURAMENTO obrigatório`

**Frontend**: ✅ Implementado (ver REGRA-0110)

---

### REGRA-0112: Forma Faturamento Obrigatória

**As-Is**: `IF TIPO_COBRANCA = 2 THEN FORMA_FATURAMENTO obrigatório`

**Frontend**: ✅ Implementado (ver REGRA-0110)

---

### REGRA-0113: Validar Matrícula = 'S' (Tipo Apólice = 2)

**As-Is**:
```cobol
IF TIPO_APOLICE = 2 THEN
    IF VALIDAR_MATRICULA <> 'S' THEN
        MOVE 'VALIDAR MATRICULA DEVE SER S PARA ESPECIFICA' TO EZEMSG
    END-IF
END-IF
```

**Frontend**: ✅ Implementado
```typescript
if (apolice?.tipoApolice === 2 && formData.validarMatricula !== 'S') {
  setMessage({ type: 'error', text: 'VALIDAR MATRICULA DEVE SER S PARA ESPECIFICA' });
  return false;
}
```

---

### REGRA-0114: Protege Campos por Tipo de Faturamento e Apólice

**As-Is**:
```cobol
IF (TIPO_FATURAMENTO = 1 OR TIPO_FATURAMENTO = 3) AND TIPO_APOLICE = 2 THEN
    // Protege campos PERI_FATURAMENTO, FORMA_FATURAMENTO, FORMA_AVERBACAO
END-IF
```

**Frontend**: ✅ Implementado
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

### REGRA-0115: UPDATE V0SUBGRUPO

**As-Is**:
```cobol
CALL VGFNP022
UPDATE V0SUBGRUPO
SET PERI_FATURAMENTO = ...
WHERE NUM_APOLICE = ... AND COD_SUBGRUPO = ...
```

**Frontend**: ✅ Implementado
```typescript
const response = await alterarSubgrupo(request);
// Chama PUT /api/alteracao-dados-basicos/alterar-subgrupo
```

---

## TELA-0103 (VGFNM030) - Regras Implementadas

**As-Is**: Similar à TELA-0102, mas aplicado ao termo adesão

**Frontend**: ✅ Implementado com mesmas validações (REGRA-0110 a REGRA-0115)

---

## 📊 Resumo de Implementação

| Regra | Tela | Status | Observação |
|-------|------|--------|------------|
| REGRA-0101 | M010 | ✅ | F3 - Sair |
| REGRA-0102 | M010 | ✅ | Função sair |
| REGRA-0103 | M010 | ⚠️ | F4 - Consulta externa (opcional) |
| REGRA-0104 | M010 | ⚠️ | F10 - Inclusão (opcional) |
| REGRA-0105 | M010 | ✅ | F12 - Cancelar |
| REGRA-0106 | M010 | ✅ | Função cancelar |
| REGRA-0107 | M010 | ✅ | Valida tecla inválida |
| REGRA-0108 | M010 | ✅ | Verifica apólice informada |
| REGRA-0109 | M010 | ✅ | Busca apólice no banco |
| REGRA-0110 | M020 | ✅ | Valida tipo cobrança = 2 |
| REGRA-0111 | M020 | ✅ | Período faturamento obrigatório |
| REGRA-0112 | M020 | ✅ | Forma faturamento obrigatória |
| REGRA-0113 | M020 | ✅ | Validar matrícula = 'S' |
| REGRA-0114 | M020 | ✅ | Protege campos |
| REGRA-0115 | M020 | ✅ | UPDATE V0SUBGRUPO |

**Total**: 15 regras  
**Implementadas**: 13 (86.7%)  
**Pendentes**: 2 (13.3% - consultas externas opcionais)

---

**Status**: ✅ **VALIDADO - 86.7% Implementado**

