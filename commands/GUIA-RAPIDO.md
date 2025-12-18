# 🚀 Guia Rápido - Comandos vamap.exe

## 📱 Menu Visual de Comandos

```
┌─────────────────────────────────────────────────────────────┐
│                   ANÁLISE DE PROGRAMAS ESF                  │
└─────────────────────────────────────────────────────────────┘

🏗️  ARQUITETURA
    /vamap-stack          → Ver TODAS as funções hierarquicamente
    /vamap-types          → Filtrar funções por tipo (SQL, UI, etc.)
    /vamap-flow           → Análise completa de fluxo de execução

📝  CÓDIGO
    /vamap-function       → Ver código de UMA função específica
    /vamap-callers        → Quem USA esta função? (impacto!)
    /vamap-position       → Onde está no stack de execução?
    /vamap-commands       → Buscar MOVE, IF, WHILE em todo código

💾  DADOS
    /vamap-data           → Listar estruturas: tabelas SQL, arrays, records
    /vamap-data-detail    → Detalhes de uma estrutura (campos, tipos)

🗃️  BANCO DE DADOS
    /vamap-inquiry        → Consultas SELECT de registro único
    /vamap-setinq         → Preparação de cursores (múltiplos registros)
    /vamap-scan           → Iteração sobre cursores
    /vamap-insert         → Operações INSERT
    /vamap-update         → Operações UPDATE
    /vamap-delete         → Operações DELETE
    /vamap-execute        → SQL dinâmico e procedures

🖥️  INTERFACE
    /vamap-maps-list      → Listar TODAS as telas
    /vamap-map            → Ver LAYOUT de uma tela (campos, foco)
    /vamap-converse       → Interações com terminal

⚠️  QUALIDADE
    /vamap-errors         → Funções de tratamento de erros
    /vamap-validation     → Validações e regras de negócio

🚀  MIGRAÇÃO
    /vamap-migration-plan → Plano completo de migração para .NET
```

---

## ⚡ Comandos Mais Usados

### 1️⃣ Começar análise de programa novo

```bash
/vamap-stack _LEGADO/programa.esf
```

**O que faz:** Mostra TUDO - todas as funções e suas dependências  
**Quando usar:** Primeira coisa ao conhecer um programa  
**Saída:** Árvore hierárquica completa

---

### 2️⃣ Ver layout de uma tela

```bash
/vamap-maps-list _LEGADO/programa.esf    # Listar telas
/vamap-map _LEGADO/programa.esf TelaNome # Ver tela
```

**O que faz:** Renderiza a tela como aparece no mainframe  
**Quando usar:** Entender interface, planejar migração  
**Saída:** Layout ASCII 24x80 com mapeamento de campos

---

### 3️⃣ Ver código de uma função

```bash
/vamap-function _LEGADO/programa.esf NomeFuncao
```

**O que faz:** Mostra código completo da função  
**Quando usar:** Entender lógica, debug, documentar  
**Saída:** Código fonte com comandos e comentários

---

### 4️⃣ Análise de impacto (antes de mudar algo!)

```bash
/vamap-callers _LEGADO/programa.esf FuncaoX
```

**O que faz:** Lista quem chama esta função  
**Quando usar:** SEMPRE antes de modificar código  
**Saída:** Lista de funções que dependem desta

---

### 5️⃣ Encontrar onde algo é usado

```bash
/vamap-commands _LEGADO/programa.esf ;MOVE(CERTIFICADO)
```

**O que faz:** Busca "CERTIFICADO" em todas as atribuições  
**Quando usar:** Rastrear uso de variável/campo  
**Saída:** Todas as linhas com MOVE contendo "CERTIFICADO"

---

### 6️⃣ Mapear banco de dados

```bash
/vamap-inquiry _LEGADO/programa.esf  # Consultas SELECT
```

**O que faz:** Lista todas as consultas SQL de registro único  
**Quando usar:** Entender acesso a dados  
**Saída:** Todas as funções que fazem INQUIRY

---

### 7️⃣ Analisar estrutura de dados

```bash
/vamap-data-detail _LEGADO/vgfna.esf V0SUBGRUPO
```

**O que faz:** Mostra todos os campos de uma estrutura com tipos e tamanhos  
**Quando usar:** Mapear tabelas para entidades  
**Saída:** Lista completa de campos com metadados

---

### 8️⃣ Analisar todas as operações de banco

```bash
/vamap-inquiry _LEGADO/programa.esf   # SELECT único
/vamap-setinq _LEGADO/programa.esf    # SELECT múltiplo
/vamap-update _LEGADO/programa.esf    # UPDATE
/vamap-insert _LEGADO/programa.esf    # INSERT
/vamap-delete _LEGADO/programa.esf    # DELETE
```

**O que faz:** Lista TODAS as operações SQL por tipo  
**Quando usar:** Mapear camada de dados completa  
**Saída:** Funções agrupadas por tipo de operação

---

## 🎯 Receitas Prontas

### 🔍 Entender Programa Completamente

```bash
# Passo 1: Visão geral
/vamap-stack _LEGADO/va2va.esf

# Passo 2: Ver telas
/vamap-maps-list _LEGADO/va2va.esf

# Passo 3: Ver estruturas de dados
/vamap-data _LEGADO/va2va.esf

# Passo 4: Ver consultas SQL
/vamap-types _LEGADO/va2va.esf :inquiry
```

---

### 🛠️ Modificar Função com Segurança

```bash
# Passo 1: Ver código atual
/vamap-function _LEGADO/va2va.esf VA2VS002

# Passo 2: Verificar impacto
/vamap-callers _LEGADO/va2va.esf VA2VS002

# Passo 3: Ver contexto
/vamap-position _LEGADO/va2va.esf VA2VS002

# Passo 4: Ver dados usados
/vamap-data _LEGADO/va2va.esf
```

---

### 📊 Documentar Sistema

```bash
# Salvar em arquivos
/vamap-stack _LEGADO/va2va.esf > docs/arquitetura.txt
/vamap-maps-list _LEGADO/va2va.esf > docs/telas.txt
/vamap-data _LEGADO/va2va.esf > docs/dados.txt

# Para cada tela
/vamap-map _LEGADO/va2va.esf VA2VM010 > docs/tela010.txt
/vamap-map _LEGADO/va2va.esf VA2VM020 > docs/tela020.txt
```

---

### 🐛 Debug / Investigação

```bash
# Problema: "Onde está sendo calculado X?"
/vamap-commands _LEGADO/programa.esf ;MOVE(X)

# Problema: "Quem chama esta função?"
/vamap-callers _LEGADO/programa.esf FuncaoProblema

# Problema: "Esta função faz consulta SQL?"
/vamap-function _LEGADO/programa.esf FuncaoProblema
```

---

### 🗄️ Mapear Camada de Dados Completa

```bash
# Passo 1: Listar todas as tabelas SQL
/vamap-data _LEGADO/programa.esf

# Passo 2: Para cada tabela, ver detalhes
/vamap-data-detail _LEGADO/programa.esf TABELA1
/vamap-data-detail _LEGADO/programa.esf TABELA2

# Passo 3: Ver todas as operações SQL
/vamap-inquiry _LEGADO/programa.esf   # Consultas
/vamap-insert _LEGADO/programa.esf    # Inserções
/vamap-update _LEGADO/programa.esf    # Atualizações
/vamap-delete _LEGADO/programa.esf    # Deleções

# Passo 4: Ver listas/paginação
/vamap-setinq _LEGADO/programa.esf    # Preparação
/vamap-scan _LEGADO/programa.esf      # Iteração
```

---

### 🚀 Planejar Migração Completa

```bash
# Estratégia 1: Análise de fluxo
/vamap-flow _LEGADO/programa.esf

# Estratégia 2: Plano de migração
/vamap-migration-plan _LEGADO/programa.esf

# Validações e regras de negócio
/vamap-validation _LEGADO/programa.esf

# Interface (CONVERSE)
/vamap-converse _LEGADO/programa.esf
```

---

## 🎨 Códigos de Cores no Output

Quando você vê:

- **`<<<<<<`** → Marca a função que você pediu
- **`*`** → Campo com foco inicial na tela
- **Indentação** → Níveis de chamada no stack
- **`→`** → Tipo da função (Execute, Inquiry, etc.)

---

## 💡 Dicas Pro

### ✅ Use Filtros

**Ruim:**
```bash
/vamap-commands programa.esf ;MOVE  # Centenas de linhas!
```

**Bom:**
```bash
/vamap-commands programa.esf ;MOVE(CERTIFICADO)  # Só o que interessa
```

---

### ✅ Salve Resultados Importantes

```bash
# Análise completa de uma função
/vamap-function programa.esf X > funcao_x.txt
/vamap-callers programa.esf X >> funcao_x.txt
/vamap-position programa.esf X >> funcao_x.txt
```

---

### ✅ Combine Comandos

```bash
# Ver função E seus chamadores
/vamap-function programa.esf X
/vamap-callers programa.esf X

# Ver tela E função que abre
/vamap-map programa.esf TelaX
# (saída mostra: "FUNCOES QUE ABREM ESTE MAPA: >FuncaoY")
/vamap-function programa.esf FuncaoY
```

---

## ⚠️ Armadilhas Comuns

### ❌ Esquecer de ver impacto antes de mudar

```bash
# SEMPRE faça isso antes de modificar:
/vamap-callers programa.esf FuncaoQueVouMudar
```

### ❌ Não começar pela visão geral

```bash
# Sempre comece com:
/vamap-stack programa.esf
```

### ❌ Não filtrar resultados grandes

```bash
# Em vez de:
/vamap-commands programa.esf ;MOVE  # Muito output!

# Faça:
/vamap-commands programa.esf ;MOVE(palavra-chave)
```

---

## 🔗 Links Rápidos

- [📖 README Completo](./README.md)
- [📚 Documentação de Cada Comando](./README.md#-índice-de-comandos)
- [🎓 Fluxos de Trabalho](./README.md#-fluxos-de-trabalho-comuns)

---

## 🆘 Precisa de Ajuda?

**Não sabe qual comando usar?**

1. **Começar do zero?** → `/vamap-stack`
2. **Ver uma tela?** → `/vamap-map`
3. **Ver código?** → `/vamap-function`
4. **Antes de mudar?** → `/vamap-callers`
5. **Buscar algo?** → `/vamap-commands`

**Ainda com dúvida?** Leia o [README.md](./README.md) completo.

---

**Pro-tip:** Adicione este arquivo aos favoritos do Cursor! 📌

