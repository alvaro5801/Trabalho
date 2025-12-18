# 🔍 Comandos vamap.exe para Cursor AI

Este diretório contém comandos customizados para analisar programas mainframe VisualAge COBOL (.esf) usando a ferramenta `vamap.exe`.

## 📋 Índice de Comandos

### 🏗️ Análise de Arquitetura

| Comando | Descrição | Uso |
|---------|-----------|-----|
| `/vamap-stack` | Visualiza pilha de execução completa | Entender hierarquia de funções |
| `/vamap-types` | Lista funções por tipo (inquiry, execute, etc.) | Separar camadas da aplicação |

### 🔍 Análise de Código

| Comando | Descrição | Uso |
|---------|-----------|-----|
| `/vamap-function` | Exibe código de função específica | Ver implementação detalhada |
| `/vamap-callers` | Identifica quem chama uma função | Análise de impacto |
| `/vamap-position` | Mostra posição no stack | Entender contexto de execução |
| `/vamap-commands` | Rastreia comandos (MOVE, IF, WHILE) | Encontrar lógica específica |

### 🗄️ Análise de Dados

| Comando | Descrição | Uso |
|---------|-----------|-----|
| `/vamap-data` | Lista estruturas de dados | Mapear modelo de dados |
| `/vamap-data-detail` | Detalhes completos de uma estrutura | Ver campos, tipos e metadados |

### 🗃️ Análise de Banco de Dados

| Comando | Descrição | Uso |
|---------|-----------|-----|
| `/vamap-inquiry` | Analisa funções INQUIRY (SELECT único) | Consultas de registro único |
| `/vamap-setinq` | Analisa funções SETINQ (preparar cursor) | Consultas de múltiplos registros |
| `/vamap-scan` | Analisa funções SCAN (iterar cursor) | Processamento de listas |
| `/vamap-insert` | Analisa funções INSERT | Operações de criação |
| `/vamap-update` | Analisa funções UPDATE | Operações de atualização |
| `/vamap-delete` | Analisa funções DELETE | Operações de deleção |
| `/vamap-execute` | Analisa funções EXECUTE (SQL dinâmico) | SQL complexo e procedures |

### 🖥️ Análise de Interface

| Comando | Descrição | Uso |
|---------|-----------|-----|
| `/vamap-maps-list` | Lista todos os mapas de tela | Inventário de interfaces |
| `/vamap-map` | Renderiza mapa de tela específico | Visualizar layout da tela |
| `/vamap-converse` | Analisa interações com terminal | Fluxo de telas |

### ⚠️ Análise de Qualidade

| Comando | Descrição | Uso |
|---------|-----------|-----|
| `/vamap-errors` | Lista funções de tratamento de erros | Verificar robustez |
| `/vamap-validation` | Analisa validações e regras de negócio | Entender restrições |

### 🔄 Análise de Fluxo e Migração

| Comando | Descrição | Uso |
|---------|-----------|-----|
| `/vamap-flow` | Analisa fluxo completo de execução | Entender arquitetura end-to-end |
| `/vamap-migration-plan` | Cria plano de migração completo | Modernização para .NET/Web |

---

## 🚀 Quick Start

### 1. Começar com visão geral

```bash
# Ver todas as funções e hierarquia
/vamap-stack _LEGADO/va2va.esf
```

### 2. Explorar interfaces

```bash
# Listar todas as telas
/vamap-maps-list _LEGADO/va2va.esf

# Ver tela específica
/vamap-map _LEGADO/va2va.esf VA2VM010
```

### 3. Analisar código

```bash
# Ver código de uma função
/vamap-function _LEGADO/va2va.esf VA2VS002

# Ver quem chama essa função
/vamap-callers _LEGADO/va2va.esf VA2VS002
```

### 4. Mapear dados

```bash
# Listar estruturas de dados
/vamap-data _LEGADO/va2va.esf
```

---

## 📚 Fluxos de Trabalho Comuns

### 🔄 Entender um Programa Novo

```bash
# 1. Visão geral
/vamap-stack programa.esf

# 2. Separar por tipo
/vamap-types programa.esf :inquiry    # Consultas SQL
/vamap-types programa.esf :converse   # Telas
/vamap-types programa.esf :execute    # Lógica

# 3. Ver telas
/vamap-maps-list programa.esf

# 4. Verificar tratamento de erros
/vamap-errors programa.esf
```

### 🔍 Analisar Impacto de Mudança

```bash
# Cenário: Modificar função X

# 1. Ver quem chama a função
/vamap-callers programa.esf FuncaoX

# 2. Ver contexto no stack
/vamap-position programa.esf FuncaoX

# 3. Ver código da função
/vamap-function programa.esf FuncaoX

# 4. Ver estruturas usadas
/vamap-data programa.esf
```

### 🖥️ Documentar Interfaces

```bash
# 1. Listar todas as telas
/vamap-maps-list programa.esf

# 2. Para cada tela, gerar documentação
/vamap-map programa.esf TelaX > docs/tela_x.txt

# 3. Ver funções que abrem cada tela
/vamap-types programa.esf :converse
```

### 🔎 Buscar Regra de Negócio

```bash
# Exemplo: Encontrar onde "CERTIFICADO" é usado

# 1. Buscar em atribuições
/vamap-commands programa.esf ;MOVE(CERTIFICADO)

# 2. Buscar em condicionais
/vamap-commands programa.esf ;IF(CERTIFICADO)

# 3. Ver estrutura CERTIFICADO
/vamap-data programa.esf NUM_CERTIFICADO\
```

### 📊 Análise de Qualidade

```bash
# Complexidade ciclomática
/vamap-commands programa.esf ;IF
/vamap-commands programa.esf ;WHILE

# Tratamento de erros
/vamap-errors programa.esf

# Validações
/vamap-validation programa.esf
```

### 🗄️ Análise de Operações de Banco

```bash
# 1. Identificar todas as operações SQL
/vamap-inquiry programa.esf    # SELECT único
/vamap-setinq programa.esf     # SELECT múltiplo (preparação)
/vamap-scan programa.esf       # Iteração sobre cursor
/vamap-insert programa.esf     # INSERT
/vamap-update programa.esf     # UPDATE
/vamap-delete programa.esf     # DELETE
/vamap-execute programa.esf    # SQL dinâmico

# 2. Para cada função, ver detalhes
/vamap-function programa.esf <FUNCAO_SQL>

# 3. Ver tabelas envolvidas
/vamap-data programa.esf
```

### 🔄 Fluxo Completo de Análise

```bash
# Use o comando de fluxo para estratégia completa
/vamap-flow programa.esf
```

### 🚀 Plano de Migração

```bash
# Use o comando de migração para plano completo
/vamap-migration-plan programa.esf

# Acesso a dados
/vamap-types programa.esf :inquiry
/vamap-types programa.esf :update
```

---

## 🎯 Casos de Uso por Papel

### 👨‍💻 Desenvolvedor (Manutenção)

**Objetivo:** Corrigir bug ou adicionar feature

```bash
# 1. Identificar função relacionada
/vamap-stack programa.esf | grep -i "palavra-chave"

# 2. Ver código da função
/vamap-function programa.esf NomeFuncao

# 3. Verificar impacto
/vamap-callers programa.esf NomeFuncao

# 4. Entender dados
/vamap-data programa.esf
```

### 🏗️ Arquiteto (Modernização)

**Objetivo:** Planejar migração para nova plataforma

```bash
# 1. Inventário completo
/vamap-stack programa.esf > analise/stack.txt
/vamap-maps-list programa.esf > analise/telas.txt
/vamap-data programa.esf > analise/dados.txt

# 2. Separar camadas
/vamap-types programa.esf :inquiry > analise/camada_dados.txt
/vamap-types programa.esf :converse > analise/camada_ui.txt
/vamap-types programa.esf :execute > analise/camada_negocio.txt

# 3. Documentar cada tela
# (gerar HTML/React components)
```

### 🧪 QA/Tester

**Objetivo:** Criar casos de teste

```bash
# 1. Listar telas para testar
/vamap-maps-list programa.esf

# 2. Para cada tela, ver campos
/vamap-map programa.esf NomeTela

# 3. Identificar validações
/vamap-commands programa.esf ;IF

# 4. Mapear fluxos
/vamap-stack programa.esf
```

### 📖 Documentador

**Objetivo:** Gerar documentação técnica

```bash
# Gerar documentação completa
echo "# Documentação do Sistema" > docs/sistema.md

/vamap-stack programa.esf >> docs/sistema.md
/vamap-maps-list programa.esf >> docs/sistema.md
/vamap-data programa.esf >> docs/sistema.md

# Para cada tela
/vamap-map programa.esf Tela1 >> docs/telas/tela1.md
```

---

## 💡 Dicas e Boas Práticas

### ✅ Começar Sempre com Stack

```bash
# Primeira coisa: ver visão geral
/vamap-stack programa.esf
```

Isso dá contexto de TUDO no programa.

### ✅ Usar Filtros

```bash
# Em vez de ver todos os MOVEs:
/vamap-commands programa.esf ;MOVE

# Filtrar por palavra-chave:
/vamap-commands programa.esf ;MOVE(CERTIFICADO)
```

### ✅ Salvar Resultados

```bash
# Salvar para análise posterior
/vamap-stack programa.esf > analise_stack.txt
/vamap-data programa.esf > analise_dados.txt
```

### ✅ Combinar Comandos

```bash
# Análise completa de uma função
echo "=== CÓDIGO ===" > funcao_completa.txt
/vamap-function programa.esf FuncX >> funcao_completa.txt

echo "`n=== CHAMADORES ===" >> funcao_completa.txt
/vamap-callers programa.esf FuncX >> funcao_completa.txt

echo "`n=== POSIÇÃO ===" >> funcao_completa.txt
/vamap-position programa.esf FuncX >> funcao_completa.txt
```

### ⚠️ Atenção com Arquivos Grandes

Alguns comandos geram muita saída:

```bash
# Estes podem gerar MUITA saída:
/vamap-commands programa.esf ;MOVE    # Centenas de linhas
/vamap-types programa.esf :execute    # Muitas funções

# Solução: usar filtros ou salvar em arquivo
/vamap-commands programa.esf ;MOVE > todos_moves.txt
```

---

## 🔧 Sintaxe Técnica

### Estrutura de Comandos

```
.\vamap.exe <arquivo.esf> <flag> [argumentos]
```

### Flags Disponíveis

- `--code` → Análise de código
- `--map` → Análise de mapas/telas

### Argumentos de --code

- `"|"` → Stack completo
- `"#"` → Error handlers
- `"\"` → Estruturas de dados
- `"FuncaoX"` → Código da função
- `"@FuncaoX"` → Chamadores
- `"!FuncaoX"` → Posição no stack
- `":tipo"` → Funções por tipo
- `";comando"` → Rastrear comando
- `"\tipo"` → Estruturas por tipo
- `"Estrutura\"` → Detalhes da estrutura

### Argumentos de --map

- (vazio) → Lista todos os mapas
- `"NomeMapa"` → Renderiza mapa específico
- `"NomeMapa" --help` → Renderiza help

---

## 📖 Documentação Completa

Cada comando tem sua própria documentação detalhada:

- [`vamap-stack.md`](./vamap-stack.md) - Pilha de execução
- [`vamap-function.md`](./vamap-function.md) - Código de função
- [`vamap-map.md`](./vamap-map.md) - Visualizar tela
- [`vamap-data.md`](./vamap-data.md) - Estruturas de dados
- [`vamap-callers.md`](./vamap-callers.md) - Quem chama função
- [`vamap-position.md`](./vamap-position.md) - Posição no stack
- [`vamap-errors.md`](./vamap-errors.md) - Tratamento de erros
- [`vamap-commands.md`](./vamap-commands.md) - Rastrear comandos
- [`vamap-types.md`](./vamap-types.md) - Funções por tipo
- [`vamap-maps-list.md`](./vamap-maps-list.md) - Listar mapas

---

## 🤝 Contribuindo

Para adicionar novos comandos:

1. Criar arquivo `.md` neste diretório
2. Seguir estrutura padrão (título, sintaxe, exemplos)
3. Adicionar ao índice neste README
4. Testar comando antes de documentar

---

## 📞 Suporte

Para dúvidas sobre:
- **vamap.exe** → Consultar documentação técnica da ferramenta
- **Comandos Cursor** → https://cursor.com/docs/agent/chat/commands
- **VisualAge COBOL** → Documentação IBM

---

**Última atualização:** 16/11/2025  
**Versão vamap.exe:** 2.0 (com suporte a --map)

