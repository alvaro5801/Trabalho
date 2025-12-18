# 📚 Índice Completo de Comandos vamap.exe

## 📖 Guias de Início

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| [INICIO.md](INICIO.md) | Guia de início rápido | Primeiro contato com o sistema |
| [GUIA-RAPIDO.md](GUIA-RAPIDO.md) | Menu visual e receitas | Referência rápida no dia-a-dia |
| [EXEMPLOS-PROJETO.md](EXEMPLOS-PROJETO.md) | Exemplos práticos reais | Ver aplicações concretas |
| [README.md](README.md) | Documentação completa | Referência técnica detalhada |

---

## 🏗️ Comandos de Arquitetura

### vamap-stack
- **Arquivo**: [vamap-stack.md](vamap-stack.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf |`
- **Descrição**: Visualiza a pilha completa de execução do programa
- **Quando usar**: Primeira análise de um programa, entender hierarquia

### vamap-types
- **Arquivo**: [vamap-types.md](vamap-types.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf :<tipo>`
- **Descrição**: Lista funções por tipo (inquiry, execute, converse, etc.)
- **Quando usar**: Separar camadas da aplicação (dados, lógica, UI)

### vamap-flow
- **Arquivo**: [vamap-flow.md](vamap-flow.md)
- **Comando**: Ver estratégias na documentação
- **Descrição**: Análise completa de fluxo de execução end-to-end
- **Quando usar**: Entender arquitetura completa, documentar sistema

---

## 📝 Comandos de Código

### vamap-function
- **Arquivo**: [vamap-function.md](vamap-function.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf --code "<FUNCAO>"`
- **Descrição**: Exibe código completo de uma função específica
- **Quando usar**: Ver implementação, debug, documentar lógica

### vamap-callers
- **Arquivo**: [vamap-callers.md](vamap-callers.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf @<FUNCAO>`
- **Descrição**: Identifica quem chama uma função (análise de impacto)
- **Quando usar**: SEMPRE antes de modificar código

### vamap-position
- **Arquivo**: [vamap-position.md](vamap-position.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf !<FUNCAO>`
- **Descrição**: Mostra posição da função no stack de execução
- **Quando usar**: Entender contexto de uma função

### vamap-commands
- **Arquivo**: [vamap-commands.md](vamap-commands.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf ;<COMANDO>`
- **Descrição**: Rastreia comandos específicos (MOVE, IF, WHILE, etc.)
- **Quando usar**: Buscar lógica específica, encontrar uso de variáveis

---

## 💾 Comandos de Dados

### vamap-data
- **Arquivo**: [vamap-data.md](vamap-data.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf \`
- **Descrição**: Lista todas as estruturas de dados
- **Quando usar**: Mapear modelo de dados, entender tabelas

### vamap-data-detail
- **Arquivo**: [vamap-data-detail.md](vamap-data-detail.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf <ESTRUTURA>\`
- **Descrição**: Exibe detalhes completos de uma estrutura (campos, tipos, metadados)
- **Quando usar**: Mapear tabelas para entidades, criar DTOs

---

## 🗃️ Comandos de Banco de Dados

### vamap-inquiry
- **Arquivo**: [vamap-inquiry.md](vamap-inquiry.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf :inquiry`
- **Descrição**: Analisa funções INQUIRY (SQL SELECT único)
- **Quando usar**: Mapear operações de leitura de registro único

### vamap-setinq
- **Arquivo**: [vamap-setinq.md](vamap-setinq.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf :setinq`
- **Descrição**: Analisa funções SETINQ (preparação de cursores)
- **Quando usar**: Mapear consultas que retornam múltiplos registros

### vamap-scan
- **Arquivo**: [vamap-scan.md](vamap-scan.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf :scan`
- **Descrição**: Analisa funções SCAN (iteração em cursores)
- **Quando usar**: Entender processamento de listas e paginação

### vamap-insert
- **Arquivo**: [vamap-insert.md](vamap-insert.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf :insert`
- **Descrição**: Analisa funções INSERT
- **Quando usar**: Mapear operações de criação de registros

### vamap-update
- **Arquivo**: [vamap-update.md](vamap-update.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf :update`
- **Descrição**: Analisa funções UPDATE
- **Quando usar**: Mapear operações de atualização de registros

### vamap-delete
- **Arquivo**: [vamap-delete.md](vamap-delete.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf :delete`
- **Descrição**: Analisa funções DELETE
- **Quando usar**: Mapear operações de deleção de registros

### vamap-execute
- **Arquivo**: [vamap-execute.md](vamap-execute.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf :execute`
- **Descrição**: Analisa funções EXECUTE (SQL dinâmico)
- **Quando usar**: Mapear stored procedures e SQL complexo

---

## 🖥️ Comandos de Interface

### vamap-maps-list
- **Arquivo**: [vamap-maps-list.md](vamap-maps-list.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf --map`
- **Descrição**: Lista todos os mapas de tela disponíveis
- **Quando usar**: Inventário de interfaces

### vamap-map
- **Arquivo**: [vamap-map.md](vamap-map.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf --map "<MAPA>"`
- **Descrição**: Renderiza mapa de tela específico
- **Quando usar**: Visualizar layout, planejar migração de UI

### vamap-converse
- **Arquivo**: [vamap-converse.md](vamap-converse.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf :converse`
- **Descrição**: Analisa interações com terminal 3270
- **Quando usar**: Entender fluxo de telas e navegação

---

## ⚠️ Comandos de Qualidade

### vamap-errors
- **Arquivo**: [vamap-errors.md](vamap-errors.md)
- **Comando**: `.\vamap.exe _LEGADO\<arquivo>.esf #`
- **Descrição**: Lista funções de tratamento de erros
- **Quando usar**: Verificar robustez, mapear exceções

### vamap-validation
- **Arquivo**: [vamap-validation.md](vamap-validation.md)
- **Comando**: Ver técnicas na documentação
- **Descrição**: Analisa validações e regras de negócio
- **Quando usar**: Mapear regras para validators

---

## 🚀 Comandos de Migração

### vamap-migration-plan
- **Arquivo**: [vamap-migration-plan.md](vamap-migration-plan.md)
- **Comando**: Ver fases completas na documentação
- **Descrição**: Cria plano completo de migração para arquitetura moderna
- **Quando usar**: Projetos de modernização para .NET/Web

---

## 🎯 Fluxos de Trabalho por Objetivo

### 🔍 Análise Inicial
1. `/vamap-stack` - Visão geral
2. `/vamap-maps-list` - Telas disponíveis
3. `/vamap-data` - Estruturas de dados
4. `/vamap-errors` - Tratamento de erros

### 🗄️ Mapeamento de Dados
1. `/vamap-data` - Listar estruturas
2. `/vamap-data-detail` - Detalhes de cada estrutura
3. `/vamap-inquiry` - Consultas
4. `/vamap-insert` - Inserções
5. `/vamap-update` - Atualizações
6. `/vamap-delete` - Deleções

### 🖥️ Mapeamento de Interface
1. `/vamap-maps-list` - Listar telas
2. `/vamap-map` - Layout de cada tela
3. `/vamap-converse` - Fluxo de interação
4. `/vamap-validation` - Validações de UI

### 🔄 Análise de Fluxo Completo
1. `/vamap-flow` - Estratégia de análise
2. `/vamap-stack` - Hierarquia
3. `/vamap-types` - Separação por tipo
4. `/vamap-callers` - Dependências

### 🚀 Planejamento de Migração
1. `/vamap-migration-plan` - Plano completo
2. `/vamap-flow` - Análise de fluxo
3. `/vamap-validation` - Regras de negócio
4. Todos os comandos de banco de dados

---

## 📊 Referência Rápida de Sintaxe

| Sintaxe | Comando | Descrição |
|---------|---------|-----------|
| `\|` | Stack completo | Pilha de execução |
| `#` | Erros | Funções de erro |
| `\` | Dados | Estruturas de dados |
| `<NOME>\` | Dados detalhe | Campos da estrutura |
| `@<NOME>` | Callers | Quem chama a função |
| `!<NOME>` | Position | Posição no stack |
| `:<tipo>` | Types | Funções por tipo |
| `;<cmd>` | Commands | Rastrear comando |
| `--map` | Maps list | Listar mapas |
| `--map "X"` | Map render | Renderizar mapa |

---

## 🎓 Ordem Recomendada de Aprendizado

1. **Iniciante**
   - INICIO.md
   - vamap-stack
   - vamap-maps-list
   - vamap-map
   - vamap-function

2. **Intermediário**
   - vamap-data
   - vamap-data-detail
   - vamap-inquiry
   - vamap-callers
   - vamap-types

3. **Avançado**
   - vamap-flow
   - vamap-validation
   - Todos os comandos SQL
   - vamap-migration-plan

---

## 🔗 Links Úteis

- **Documentação Cursor Commands**: https://cursor.com/docs/agent/chat/commands
- **Localização**: `.cursor/commands/`
- **Ferramenta**: `.\vamap.exe` (raiz do projeto)
- **Arquivos Legados**: `_LEGADO/*.esf`

---

## 📞 Suporte

Para dúvidas ou sugestões sobre os comandos:
1. Consulte README.md para documentação completa
2. Veja EXEMPLOS-PROJETO.md para casos práticos
3. Use GUIA-RAPIDO.md para referência rápida

**Última atualização**: 2025-11-17
**Versão**: 2.0.0

