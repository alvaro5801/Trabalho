# Cursor Rules - Documentação de Migração de Legado

Este diretório contém regras para orientar a criação de documentação e implementação de migração de sistemas legados para arquitetura moderna.

## ⚠️ REGRA CRÍTICA - Rastreabilidade Obrigatória

**TODA** especificação, código ou documentação **DEVE** incluir referência ao ID correspondente da `MATRIZ_RASTREABILIDADE.csv`.

**Exemplo**:
```markdown
### CreateUserViewModel
**Rastreabilidade**: ID Matriz `METOD-0011`
```

**Sem rastreabilidade = Documentação/Código REJEITADO** ❌

Consulte: `traceability-matrix-rules.mdc` para detalhes completos.

## 📋 Regras de Migração (Criadas)

### 1. Guia Mestre
- **migration-master-guide.mdc** (alwaysApply: true)
  - Visão geral completa do processo de migração
  - Índice de todos os 14 documentos obrigatórios
  - Fluxo de trabalho e ordem de implementação
  - Princípios fundamentais e convenções
  - Checklist geral do projeto

### 2. Rastreabilidade com Matriz ⭐ **CRÍTICO**
- **traceability-matrix-rules.mdc** (alwaysApply: true)
  - **OBRIGATÓRIO**: Referência a IDs da matriz em TODA documentação
  - Formato de referência e comentários no código
  - Tabelas de mapeamento com coluna ID Matriz
  - Validação e atualização da matriz
  - Scripts de validação de rastreabilidade

### 3. Estrutura de Documentação
- **migration-doc-structure.mdc**
  - Template padrão para os 14 documentos
  - Convenções de nomenclatura
  - Ordem de implementação
  - Estrutura obrigatória de cada documento
  - Seções de rastreabilidade obrigatórias

### 4. Análise de Legado (AS-IS)

#### Documentação AS-IS
- **legacy-asis.mdc**
  - **GUIA COMPLETO** para documentar situação atual do legado
  - **1. Telas, Campos e Comportamentos**: Mapas 3270, campos, navegação, validações
  - **2. Modelo de Dados**: Tabelas DB2, structures, operações SQL (INQUIRY/SETINQ/SCAN)
  - **3. Fluxo de Execução**: Stack, hierarquia, casos de uso, diagramas de sequência
  - **4. Funções e Regras de Negócio**: Código COBOL, regras, validações, complexidade
  - Uso obrigatório de `vamap.exe` e consulta a `@commands`
  - Diagramas Mermaid (navegação, ER, sequência, fluxogramas)
  - Integração total com matriz de rastreabilidade
  - Workflow completo de documentação (6 fases)
  - 4 documentos AS-IS obrigatórios

#### Ferramentas de Análise
- **legacy-vamap.mdc**
  - Uso avançado da ferramenta vamap.exe
  - Comandos de análise de código VisualAge/COBOL
  - Extração de metadados, telas, dados, fluxos

#### Mapeamento Legado → Moderno
- **legacy-mapping-patterns.mdc**
  - Padrões de identificação de componentes legados
  - Convenções de tradução (COBOL/Mainframe → .NET)
  - Mapeamento de tipos de dados
  - Análise de dependências
  - Rastreabilidade obrigatória

#### Rastreabilidade
- **legacy-matriz.mdc**
  - Regras detalhadas de uso da matriz de rastreabilidade
  - Tipos de ID (TELA, METOD, ENT, OBJ, QUERY, REGRA, FTELA)
  - Formato de referência em documentação e código
  - Validação e atualização da matriz

### 5. Arquitetura Moderna (TO-BE)

#### Domain
- **domain-layer-docs.mdc**
  - Estrutura do documento 01_DOMAIN_MODEL.md
  - Entities, DTOs, Interfaces
  - AppResponse Pattern
  - Enums e constantes
  - Validações de domínio

#### Infrastructure
- **infrastructure-layer-docs.mdc**
  - Estrutura do documento 03_INFRASTRUCTURE_LAYER.md
  - Repositories com Dapper
  - Proxy Clients para APIs externas
  - Mappers
  - Event Repository
  - Prevenção de SQL Injection

#### Application & Business Logic
- **application-business-docs.mdc**
  - Estrutura dos documentos 04_BUSINESS_LOGIC.md e 05_APPLICATION_SERVICES.md
  - ViewModels com regras de negócio
  - Services de orquestração
  - Tratamento de exceções
  - Separação de responsabilidades

#### API
- **api-layer-docs.mdc**
  - Estrutura do documento 06_API_LAYER.md
  - Controllers e endpoints
  - Request/Response DTOs
  - Program.cs e configurações
  - Middlewares
  - Documentação Swagger

### 6. Database e Testing
- **database-testing-docs.mdc**
  - Estrutura dos documentos 02_DATABASE_SCHEMA.md e 10_TESTING_STRATEGY.md
  - DDL, migrations, índices
  - Connection strings
  - Framework de testes (xUnit, Moq, FluentAssertions)
  - Nomenclatura de testes
  - Casos de regressão

### 7. Aspectos Adicionais Críticos
- **additional-aspects-docs.mdc**
  - Estrutura dos documentos 11-14
  - **11_SECURITY_AUTH.md**: Autenticação, autorização, validação
  - **12_OBSERVABILITY.md**: Logging, health checks, APM
  - **13_DATA_MIGRATION.md**: ETL, validação, rollback
  - **14_PERFORMANCE.md**: Índices, cache, otimizações

### 8. DI, Configuration e Flows
- **di-config-flows-docs.mdc**
  - Estrutura dos documentos 07-09
  - **07_DEPENDENCY_INJECTION.md**: IOC, lifetimes, registros
  - **08_CONFIGURATION.md**: appsettings, Options Pattern, secrets
  - **09_USE_CASES_FLOWS.md**: Fluxos end-to-end, casos de uso, diagramas

### 9. Validação
- **migration-validation-checklist.mdc**
  - Checklist completo para validar cada documento
  - Itens obrigatórios vs opcionais
  - Critérios de aceitação
  - Validação de implementação
  - Prontidão para produção

## 📚 Regras Existentes (Pré-existentes)

### Backend
- **backend_patterns.mdc** - Padrões arquiteturais .NET Core (2 cópias)
- **backend_dependencies.mdc** - Gestão de dependências backend

### Frontend
- **frontend_patterns.mdc** - Padrões React + TypeScript
- **frontend_dependencies.mdc** - Gestão de dependências frontend

### Outros
- **matriz.mdc** - Regras para matriz de rastreabilidade
- **vamap.mdc** - Regras específicas do projeto VAMAP

## 🎯 Como Usar

### 1. Para Criar Documentação de Migração

Siga a ordem dos 14 documentos:

1. **01_DOMAIN_MODEL.md** - Comece definindo o domínio
2. **02_DATABASE_SCHEMA.md** - Estrutura do banco
3. **03_INFRASTRUCTURE_LAYER.md** - Acesso a dados
4. **04_BUSINESS_LOGIC.md** - Regras de negócio
5. **05_APPLICATION_SERVICES.md** - Orquestração
6. **06_API_LAYER.md** - Endpoints HTTP
7. **07_DEPENDENCY_INJECTION.md** - Configuração de DI
8. **08_CONFIGURATION.md** - Settings e configurações
9. **11_SECURITY_AUTH.md** - Segurança
10. **10_TESTING_STRATEGY.md** - Testes
11. **12_OBSERVABILITY.md** - Monitoramento
12. **13_DATA_MIGRATION.md** - Migração de dados
13. **14_PERFORMANCE.md** - Otimizações
14. **09_USE_CASES_FLOWS.md** - Validação end-to-end

### 2. Para Validar Documentação

Use o **migration-validation-checklist.mdc** para garantir:
- Todos itens **[OBRIGATÓRIO]** foram atendidos
- Estrutura padrão foi seguida
- Rastreabilidade está completa
- Código de exemplo está correto

### 3. Para Implementar

Após criar a documentação:
1. Crie interfaces (Domain)
2. Implemente classes concretas (Infrastructure, Application)
3. Registre em DI (IOC)
4. Escreva testes unitários
5. Atualize matriz de rastreabilidade

## 🏗️ Estrutura Final de Documentos

```
docs/
└── backend/
    ├── 01_DOMAIN_MODEL.md
    ├── 02_DATABASE_SCHEMA.md
    ├── 03_INFRASTRUCTURE_LAYER.md
    ├── 04_BUSINESS_LOGIC.md
    ├── 05_APPLICATION_SERVICES.md
    ├── 06_API_LAYER.md
    ├── 07_DEPENDENCY_INJECTION.md
    ├── 08_CONFIGURATION.md
    ├── 09_USE_CASES_FLOWS.md
    ├── 10_TESTING_STRATEGY.md
    ├── 11_SECURITY_AUTH.md
    ├── 12_OBSERVABILITY.md
    ├── 13_DATA_MIGRATION.md
    └── 14_PERFORMANCE.md
```

## ✅ Princípios Fundamentais

### Arquitetura
```
API → IOC → Application + Infra → Domain
```

### Padrões Obrigatórios
- ✅ Primary Constructors (sempre)
- ✅ Async/Await (nunca .Result ou .Wait())
- ✅ AppResponse<T> (em Services)
- ✅ Dapper com parâmetros (SQL Injection prevention)
- ✅ Event Logging (auditoria)

### Nomenclatura
- **Backend**: `<Cliente>.Web.<Projeto>.<Camada>`
- **Rotas**: `/PascalCase/camelCase` (português)
- **Docs**: `NN_SCREAMING_SNAKE_CASE.md`

## 📊 Matriz de Rastreabilidade

Cada elemento mapeado deve ter entrada em `MATRIZ_RASTREABILIDADE.csv`:
- Id único
- Tipo (PROGRAM/TABLE/FUNCTION/FIELD/RULE)
- Referências ao legado (arquivo + linhas)
- Status de documentação/implementação/teste

## 🎓 Referência Rápida

| Preciso de... | Consulte... |
|---------------|-------------|
| Visão geral | migration-master-guide.mdc |
| **Rastreabilidade (OBRIGATÓRIO)** | **traceability-matrix-rules.mdc** |
| **Documentar legado AS-IS** | **legacy-asis.mdc** |
| Usar vamap.exe | legacy-vamap.mdc |
| Mapear legado → moderno | legacy-mapping-patterns.mdc |
| Template de documento | migration-doc-structure.mdc |
| Domain | domain-layer-docs.mdc |
| Infrastructure | infrastructure-layer-docs.mdc |
| Business Logic | application-business-docs.mdc |
| API | api-layer-docs.mdc |
| Database/Testing | database-testing-docs.mdc |
| Security/Observability | additional-aspects-docs.mdc |
| DI/Config/Flows | di-config-flows-docs.mdc |
| Validar | migration-validation-checklist.mdc |

## 📝 Notas

- Estas regras são **genéricas** e aplicáveis a qualquer sistema legado
- Adapte conforme necessário para seu contexto específico
- Mantenha a estrutura dos 14 documentos
- **OBRIGATÓRIO**: Use a matriz de rastreabilidade em TODA documentação/código
- Valide cada documento antes de implementar
- **BLOQUEIO**: Documentação sem IDs da matriz será rejeitada

## 🔍 Validação Rápida de Rastreabilidade

```bash
# Verificar se documento tem IDs da matriz
grep -qE '(METOD|ENT|TELA|OBJ|QUERY|REGRA|FTELA)-[0-9]{4}' docs/backend/01_DOMAIN_MODEL.md && echo "✅ OK" || echo "❌ FALHA"

# Listar IDs na documentação
grep -oE '(METOD|ENT|TELA|OBJ|QUERY|REGRA|FTELA)-[0-9]{4}' docs/backend/*.md | sort -u

# Validar IDs existem na matriz
while IFS= read -r id; do
  grep -q "^$id," MATRIZ_RASTREABILIDADE.csv || echo "❌ ID não encontrado: $id"
done < <(grep -oE '(METOD|ENT|TELA|OBJ|QUERY|REGRA|FTELA)-[0-9]{4}' docs/backend/*.md | sort -u)
```

---

**Versão**: 1.0  
**Data**: Dezembro 2024  
**Framework**: .NET 8  
**Arquitetura**: Clean Architecture + Layered Architecture

