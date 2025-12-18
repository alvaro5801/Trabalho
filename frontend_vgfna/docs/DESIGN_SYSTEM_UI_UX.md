# Design System e Padrões de UI/UX

## 📋 Visão Geral

Este documento define o Design System completo para o frontend VGFNA, incluindo cores, tipografia, componentes visuais, espaçamentos, padrões de interação e diretrizes de acessibilidade.

## 🎨 Paleta de Cores

### Cores Primárias

```css
:root {
  /* Azul Principal - Ações primárias, links, elementos de destaque */
  --color-primary: #1976d2;
  --color-primary-dark: #1565c0;
  --color-primary-light: #42a5f5;
  --color-primary-contrast: #ffffff;

  /* Cinza Secundário - Ações secundárias, bordas, backgrounds */
  --color-secondary: #757575;
  --color-secondary-dark: #616161;
  --color-secondary-light: #9e9e9e;
  --color-secondary-contrast: #ffffff;

  /* Vermelho - Ações destrutivas, erros */
  --color-danger: #d32f2f;
  --color-danger-dark: #c62828;
  --color-danger-light: #ef5350;
  --color-danger-contrast: #ffffff;
}
```

### Cores de Feedback

```css
:root {
  /* Sucesso */
  --color-success: #2e7d32;
  --color-success-bg: #e8f5e9;
  --color-success-text: #1b5e20;

  /* Aviso */
  --color-warning: #f57c00;
  --color-warning-bg: #fff3e0;
  --color-warning-text: #e65100;

  /* Erro */
  --color-error: #d32f2f;
  --color-error-bg: #ffebee;
  --color-error-text: #c62828;

  /* Informação */
  --color-info: #1976d2;
  --color-info-bg: #e3f2fd;
  --color-info-text: #1565c0;
}
```

### Cores Neutras

```css
:root {
  /* Backgrounds */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-bg-disabled: #e0e0e0;

  /* Textos */
  --color-text-primary: #212121;
  --color-text-secondary: #757575;
  --color-text-disabled: #9e9e9e;
  --color-text-inverse: #ffffff;

  /* Bordas */
  --color-border: #e0e0e0;
  --color-border-focus: #1976d2;
  --color-border-error: #d32f2f;
}
```

### Mapeamento de Cores por Contexto

| Contexto | Cor | Uso |
|----------|-----|-----|
| Ações Primárias | `--color-primary` | Botões principais, links |
| Ações Secundárias | `--color-secondary` | Botões secundários |
| Ações Destrutivas | `--color-danger` | Botão Sair, Cancelar |
| Mensagens de Sucesso | `--color-success` | Feedback positivo |
| Mensagens de Erro | `--color-error` | Validações, erros |
| Mensagens de Aviso | `--color-warning` | Alertas |
| Mensagens de Info | `--color-info` | Informações |

---

## 📝 Tipografia

### Família de Fontes

```css
:root {
  --font-family-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
                         'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 
                         'Droid Sans', 'Helvetica Neue', sans-serif;
  --font-family-mono: 'Courier New', Courier, monospace;
}
```

### Escala Tipográfica

```css
:root {
  /* Tamanhos */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */

  /* Pesos */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Alturas de linha */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}
```

### Uso por Elemento

| Elemento | Tamanho | Peso | Linha |
|----------|---------|------|-------|
| Título Principal (H1) | `--font-size-3xl` | `--font-weight-bold` | `--line-height-tight` |
| Título Seção (H2) | `--font-size-2xl` | `--font-weight-semibold` | `--line-height-tight` |
| Título Subseção (H3) | `--font-size-xl` | `--font-weight-medium` | `--line-height-normal` |
| Corpo de Texto | `--font-size-base` | `--font-weight-normal` | `--line-height-normal` |
| Labels | `--font-size-sm` | `--font-weight-medium` | `--line-height-normal` |
| Captions | `--font-size-xs` | `--font-weight-normal` | `--line-height-normal` |

---

## 📐 Espaçamento

### Sistema de Espaçamento (8px base)

```css
:root {
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */
}
```

### Uso por Contexto

| Contexto | Espaçamento | Exemplo |
|----------|-------------|---------|
| Padding interno de componentes | `--spacing-sm` a `--spacing-md` | Botões, inputs |
| Margem entre elementos relacionados | `--spacing-md` | Campos do formulário |
| Margem entre seções | `--spacing-lg` a `--spacing-xl` | Seções do formulário |
| Padding de containers | `--spacing-xl` a `--spacing-2xl` | Páginas, cards |

---

## 🧩 Componentes Visuais

### Botões

#### Botão Primário

```css
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: 4px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

#### Botão Secundário

```css
.btn-secondary {
  background-color: var(--color-secondary);
  color: var(--color-secondary-contrast);
  /* ... similar ao primário */
}
```

#### Botão de Perigo

```css
.btn-danger {
  background-color: var(--color-danger);
  color: var(--color-danger-contrast);
  /* ... similar ao primário */
}
```

**Estados**:
- ✅ Normal: Cor padrão
- ✅ Hover: Cor escurecida
- ✅ Active: Cor mais escura
- ✅ Disabled: Opacidade 0.6, cursor not-allowed
- ✅ Loading: Spinner + texto "Carregando..."

---

### Inputs

#### Input de Texto/Número

```css
.form-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: var(--font-size-base);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
}

.form-input:disabled {
  background-color: var(--color-bg-disabled);
  cursor: not-allowed;
}

.form-input.error {
  border-color: var(--color-border-error);
}
```

**Estados**:
- ✅ Normal: Borda cinza
- ✅ Focus: Borda azul + sombra
- ✅ Error: Borda vermelha
- ✅ Disabled: Fundo cinza, cursor not-allowed

---

### Select/Dropdown

```css
.form-select {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: var(--font-size-base);
  background-color: var(--color-bg-primary);
  cursor: pointer;
  transition: border-color 0.3s;
}

.form-select:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
}
```

---

### Radio Buttons

```css
.radio-group {
  display: flex;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-sm);
}

.radio-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
}

.radio-option input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--color-primary);
}

.radio-option:has(input:disabled) {
  opacity: 0.6;
  cursor: not-allowed;
}
```

---

### Mensagens (MessageDisplay)

```css
.message-display {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: 4px;
  margin-bottom: var(--spacing-md);
}

.message-display-info {
  background-color: var(--color-info-bg);
  color: var(--color-info-text);
  border-left: 4px solid var(--color-info);
}

.message-display-error {
  background-color: var(--color-error-bg);
  color: var(--color-error-text);
  border-left: 4px solid var(--color-error);
}

.message-display-warning {
  background-color: var(--color-warning-bg);
  color: var(--color-warning-text);
  border-left: 4px solid var(--color-warning);
}
```

---

### Modal

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s;
}

.modal-content {
  background-color: var(--color-bg-primary);
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

---

## 🎯 Padrões de Interação

### Feedback Visual

#### Loading States

```css
.btn-loading {
  position: relative;
  color: transparent;
}

.btn-loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

#### Transições

```css
/* Transições suaves para interações */
* {
  transition: background-color 0.3s ease,
              border-color 0.3s ease,
              color 0.3s ease,
              opacity 0.3s ease;
}
```

---

### Acessibilidade

#### Contraste de Cores

- ✅ Texto sobre fundo: Mínimo 4.5:1 (WCAG AA)
- ✅ Texto grande: Mínimo 3:1 (WCAG AA)
- ✅ Elementos interativos: Contraste suficiente

#### Navegação por Teclado

- ✅ Tab: Navega entre campos
- ✅ Enter: Submete formulário
- ✅ Escape: Fecha modais
- ✅ Setas: Navega em grupos de radio

#### ARIA Labels

```typescript
<button
  type="button"
  aria-label="Fechar modal de ajuda"
  onClick={handleClose}
>
  ×
</button>

<input
  id="numero-apolice"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby="numero-apolice-error"
/>
```

#### Foco Visível

```css
*:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
```

---

## 📱 Responsividade

### Breakpoints

```css
:root {
  --breakpoint-sm: 640px;   /* Mobile */
  --breakpoint-md: 768px;   /* Tablet */
  --breakpoint-lg: 1024px;  /* Desktop */
  --breakpoint-xl: 1280px;  /* Large Desktop */
}
```

### Layout Adaptativo

```css
/* Mobile First */
.form-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* Tablet e acima */
@media (min-width: 768px) {
  .form-row {
    flex-direction: row;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
```

---

## 🎨 Padrões de Layout

### Header

```css
.app-header {
  background-color: var(--color-bg-primary);
  border-bottom: 2px solid var(--color-border);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
```

### Container de Página

```css
.page-content {
  max-width: 1200px;
  margin: var(--spacing-xl) auto;
  padding: var(--spacing-xl);
  background-color: var(--color-bg-primary);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### Formulário

```css
.consulta-form,
.alteracao-form {
  width: 100%;
}

.form-section {
  margin-bottom: var(--spacing-xl);
}

.form-section-title {
  margin: var(--spacing-lg) 0;
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-border);
}
```

---

## 📊 Ícones e Símbolos

### Ícones de Ação

| Ação | Ícone | Unicode | Uso |
|------|-------|---------|-----|
| Ajuda | ℹ️ | U+2139 | Botão F1 |
| Consultar | 🔍 | U+1F50D | Botão F4 |
| Incluir | ➕ | U+2795 | Botão F10 |
| Sair | 🚪 | U+1F6AA | Botão F3 |
| Cancelar | ❌ | U+274C | Botão F12 |
| Salvar | 💾 | U+1F4BE | Botão ENTER |
| Sucesso | ✅ | U+2705 | Mensagens |
| Erro | ❌ | U+274C | Mensagens |
| Aviso | ⚠️ | U+26A0 | Mensagens |

---

## 🎯 Princípios de UX

### 1. Feedback Imediato
- ✅ Validação em tempo real quando possível
- ✅ Loading states durante requisições
- ✅ Mensagens claras de erro/sucesso

### 2. Prevenção de Erros
- ✅ Campos obrigatórios marcados
- ✅ Validação antes de submit
- ✅ Confirmação para ações destrutivas

### 3. Consistência
- ✅ Mesmos padrões em todas as telas
- ✅ Nomenclatura consistente
- ✅ Comportamento previsível

### 4. Eficiência
- ✅ Atalhos de teclado (F1, F3, F12)
- ✅ Auto-focus no primeiro campo
- ✅ Navegação rápida entre campos

### 5. Acessibilidade
- ✅ Contraste adequado
- ✅ Navegação por teclado
- ✅ Labels descritivos
- ✅ ARIA attributes

---

## 📝 Checklist de Implementação

- [x] Paleta de cores definida
- [x] Tipografia configurada
- [x] Sistema de espaçamento
- [x] Componentes visuais padronizados
- [x] Estados de interação (hover, focus, disabled)
- [x] Feedback visual (loading, errors)
- [x] Acessibilidade (ARIA, contraste, teclado)
- [x] Responsividade (breakpoints, layout adaptativo)
- [x] Animações e transições
- [x] Ícones e símbolos

---

## 🎨 Exemplo de Tema Completo

```css
/* Tema VGFNA */
:root {
  /* Cores */
  --color-primary: #1976d2;
  --color-secondary: #757575;
  --color-danger: #d32f2f;
  
  /* Tipografia */
  --font-family-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-base: 1rem;
  
  /* Espaçamento */
  --spacing-md: 1rem;
  
  /* Bordas */
  --border-radius: 4px;
  --border-width: 1px;
  
  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

---

## 📚 Referências

- **Material Design**: Inspiração para cores e componentes
- **WCAG 2.1**: Diretrizes de acessibilidade
- **React Design Patterns**: Padrões de componentes
- **Legado 3270**: Compatibilidade visual com sistema original

