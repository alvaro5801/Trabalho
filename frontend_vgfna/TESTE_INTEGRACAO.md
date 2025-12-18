# Guia de Teste de Integração - Frontend VGFNA

## 🧪 Checklist de Testes

### Pré-requisitos

- [ ] Backend rodando em `http://localhost:5000`
- [ ] Frontend rodando em `http://localhost:3000`
- [ ] Arquivo `.env` configurado com `REACT_APP_API_BASE_URL`

---

## 📋 Teste 1: Consulta de Apólice (TELA-0101)

### Cenário 1.1: Consulta Bem-Sucedida

**Passos**:
1. Acessar `/consulta-apolice`
2. Preencher campo "Apólice" com número válido
3. Clicar em "ENTER - Consultar"

**Resultado Esperado**:
- ✅ Loading state ativado
- ✅ Request enviado para `POST /api/alteracao-dados-basicos/consultar-apolice`
- ✅ Resposta de sucesso recebida
- ✅ Navegação para `/alteracao-subgrupo` com state contendo dados da apólice

**Validações**:
- [ ] Request contém `numeroApolice` correto
- [ ] Response `isSuccess = true`
- [ ] Dados da apólice presentes em `response.data`
- [ ] Navegação ocorre corretamente

---

### Cenário 1.2: Apólice Não Informada (REGRA-0108)

**Passos**:
1. Acessar `/consulta-apolice`
2. Deixar campo "Apólice" vazio
3. Clicar em "ENTER - Consultar"

**Resultado Esperado**:
- ✅ Mensagem de erro: "INFORME A APOLICE"
- ✅ Campo com borda vermelha
- ✅ Request NÃO enviado

**Validações**:
- [ ] Validação frontend impede submit
- [ ] Mensagem exibida corretamente
- [ ] Feedback visual de erro

---

### Cenário 1.3: Apólice Não Encontrada (REGRA-0109)

**Passos**:
1. Acessar `/consulta-apolice`
2. Preencher campo "Apólice" com número inexistente
3. Clicar em "ENTER - Consultar"

**Resultado Esperado**:
- ✅ Request enviado
- ✅ Backend retorna `isSuccess = false`
- ✅ Mensagem de erro: "APOLICE NAO ENCONTRADA"
- ✅ Permanece na mesma tela

**Validações**:
- [ ] Erro tratado corretamente
- [ ] Mensagem exibida
- [ ] Não navega para próxima tela

---

### Cenário 1.4: Erro de Rede

**Passos**:
1. Desligar backend
2. Preencher e submeter formulário

**Resultado Esperado**:
- ✅ Mensagem: "ERRO DE CONEXAO COM O SERVIDOR"
- ✅ Loading state desativado

---

## 📋 Teste 2: Alteração de Subgrupo (TELA-0102)

### Cenário 2.1: Alteração Bem-Sucedida

**Pré-condição**: Ter navegado de `/consulta-apolice` com dados válidos

**Passos**:
1. Acessar `/alteracao-subgrupo` (via navegação da tela anterior)
2. Alterar campos desejados
3. Clicar em "ENTER - Salvar"

**Resultado Esperado**:
- ✅ Validações frontend passam
- ✅ Request enviado para `PUT /api/alteracao-dados-basicos/alterar-subgrupo`
- ✅ Resposta de sucesso
- ✅ Mensagem: "Alteração realizada com sucesso"
- ✅ Navegação para `/alteracao-termo-adesao` após 2 segundos

---

### Cenário 2.2: Validação REGRA-0111 (Período Obrigatório)

**Passos**:
1. Acessar `/alteracao-subgrupo`
2. Selecionar `TIPO_COBRANCA = 2`
3. Deixar `PERI_FATURAMENTO` vazio
4. Clicar em "ENTER - Salvar"

**Resultado Esperado**:
- ✅ Mensagem: "PERIODO FATURAMENTO OBRIGATORIO"
- ✅ Campo destacado como obrigatório
- ✅ Request NÃO enviado

---

### Cenário 2.3: Validação REGRA-0112 (Forma Obrigatória)

**Passos**:
1. Acessar `/alteracao-subgrupo`
2. Selecionar `TIPO_COBRANCA = 2`
3. Preencher `PERI_FATURAMENTO`
4. Deixar `FORMA_FATURAMENTO` vazio
5. Clicar em "ENTER - Salvar"

**Resultado Esperado**:
- ✅ Mensagem: "FORMA FATURAMENTO OBRIGATORIA"
- ✅ Request NÃO enviado

---

### Cenário 2.4: Validação REGRA-0113 (Matrícula = 'S')

**Pré-condição**: Apólice com `TIPO_APOLICE = 2`

**Passos**:
1. Acessar `/alteracao-subgrupo`
2. Selecionar `VALIDAR_MATRICULA = 'N'`
3. Clicar em "ENTER - Salvar"

**Resultado Esperado**:
- ✅ Mensagem: "VALIDAR MATRICULA DEVE SER S PARA ESPECIFICA"
- ✅ Request NÃO enviado

---

### Cenário 2.5: Proteção de Campos (REGRA-0114)

**Pré-condição**: `TIPO_FATURAMENTO = 1 ou 3` E `TIPO_APOLICE = 2`

**Passos**:
1. Acessar `/alteracao-subgrupo`
2. Verificar campos `PERI_FATURAMENTO`, `FORMA_FATURAMENTO`, `FORMA_AVERBACAO`

**Resultado Esperado**:
- ✅ Campos desabilitados (read-only)
- ✅ Fundo cinza claro
- ✅ Cursor "not-allowed"
- ✅ Tooltip explicativo (se implementado)

---

## 📋 Teste 3: Navegação

### Cenário 3.1: Fluxo Completo

**Passos**:
1. `/consulta-apolice` → Consultar apólice válida
2. `/alteracao-subgrupo` → Alterar e salvar
3. `/alteracao-termo-adesao` → Alterar e salvar

**Resultado Esperado**:
- ✅ Fluxo completo sem erros
- ✅ Dados preservados entre telas
- ✅ Navegação suave

---

### Cenário 3.2: Proteção de Rotas

**Passos**:
1. Acessar diretamente `/alteracao-subgrupo` (sem state)

**Resultado Esperado**:
- ✅ Redirecionamento automático para `/consulta-apolice`
- ✅ Mensagem de erro (opcional)

---

### Cenário 3.3: Botões de Navegação

**Teste F3 (Sair)**:
- [ ] Navega para `/` (home)

**Teste F12 (Cancelar)**:
- [ ] Na M010: Navega para `/`
- [ ] Na M020: Navega para `/consulta-apolice`
- [ ] Na M030: Navega para `/alteracao-subgrupo`

---

## 📋 Teste 4: Design System

### Cenário 4.1: Cores

- [ ] Botão primário: Azul (#1976d2)
- [ ] Botão secundário: Cinza (#757575)
- [ ] Botão perigo: Vermelho (#d32f2f)
- [ ] Mensagens de erro: Fundo vermelho claro
- [ ] Mensagens de sucesso: Fundo verde claro

### Cenário 4.2: Tipografia

- [ ] Fonte padrão aplicada
- [ ] Tamanhos corretos (H1, H2, H3, body, labels)
- [ ] Pesos corretos (normal, medium, semibold, bold)

### Cenário 4.3: Espaçamento

- [ ] Espaçamentos consistentes (múltiplos de 8px)
- [ ] Padding de componentes correto
- [ ] Margens entre elementos corretas

### Cenário 4.4: Responsividade

**Mobile (< 640px)**:
- [ ] Layout adapta corretamente
- [ ] Formulários em coluna única
- [ ] Botões em largura total

**Tablet (768px - 1024px)**:
- [ ] Layout em grid
- [ ] Elementos bem distribuídos

**Desktop (> 1024px)**:
- [ ] Layout completo
- [ ] Máxima largura respeitada (1200px)

---

## 📋 Teste 5: Acessibilidade

### Cenário 5.1: Navegação por Teclado

- [ ] Tab navega entre campos
- [ ] Enter submete formulário
- [ ] Escape fecha modais
- [ ] Foco visível em todos os elementos

### Cenário 5.2: Contraste

- [ ] Texto sobre fundo: Mínimo 4.5:1
- [ ] Botões: Contraste suficiente
- [ ] Links: Contraste suficiente

### Cenário 5.3: ARIA Labels

- [ ] Campos obrigatórios marcados
- [ ] Erros associados aos campos
- [ ] Modais com labels apropriados

---

## 🐛 Problemas Conhecidos e Soluções

### Problema 1: CORS Error

**Sintoma**: Erro de CORS ao chamar API

**Solução**: Configurar CORS no backend para permitir `http://localhost:3000`

---

### Problema 2: State Perdido ao Atualizar Página

**Sintoma**: Ao atualizar página em `/alteracao-subgrupo`, perde dados

**Solução**: Esperado - state do React Router não persiste. Implementar Context API ou localStorage se necessário.

---

### Problema 3: Domínios Vazios

**Sintoma**: Selects de domínio aparecem vazios

**Solução**: Implementar endpoints de domínio no backend ou usar dados mock temporários.

---

## 📊 Relatório de Testes

### Template de Relatório

```
Data: [DATA]
Testador: [NOME]
Ambiente: [DESCRIÇÃO]

Resultados:
- Teste 1.1: [PASSOU/FALHOU]
- Teste 1.2: [PASSOU/FALHOU]
- ...
- Teste 5.3: [PASSOU/FALHOU]

Problemas Encontrados:
1. [DESCRIÇÃO]
2. [DESCRIÇÃO]

Ajustes Necessários:
1. [DESCRIÇÃO]
2. [DESCRIÇÃO]
```

---

## ✅ Critérios de Aceitação

### Funcionalidade
- [ ] Todas as 3 telas funcionam corretamente
- [ ] Todas as validações funcionam
- [ ] Navegação entre telas funciona
- [ ] Integração com API funciona

### Design
- [ ] Design System aplicado corretamente
- [ ] Responsividade funciona
- [ ] Acessibilidade implementada

### Performance
- [ ] Carregamento rápido
- [ ] Transições suaves
- [ ] Sem erros no console

---

**Status**: ✅ **PRONTO PARA TESTES**

