---
description: Analisa o fluxo completo de execução de um programa ESF
tags: [vamap, flow, stack, architecture, cobol]
---

# Análise de Fluxo Completo

Analisa o fluxo completo de execução de um programa ESF, desde a inicialização até as operações de negócio.

## Estratégia de Análise

### 1. Visão Geral
```bash
# Stack completo de execução
.\vamap.exe _LEGADO/<arquivo>.esf |

# Mapas de tela disponíveis
.\vamap.exe _LEGADO/<arquivo>.esf --map

# Estruturas de dados
.\vamap.exe _LEGADO/<arquivo>.esf \
```

### 2. Fluxo Principal
```bash
# Função principal (geralmente termina em P000)
.\vamap.exe _LEGADO/<arquivo>.esf --code "<PROGRAMA>P000"

# Próxima função no fluxo (termina em P001)
.\vamap.exe _LEGADO/<arquivo>.esf --code "<PROGRAMA>P001"
```

### 3. Análise por Tipo de Operação

#### Consultas
```bash
.\vamap.exe _LEGADO/<arquivo>.esf :inquiry
.\vamap.exe _LEGADO/<arquivo>.esf :setinq
.\vamap.exe _LEGADO/<arquivo>.esf :scan
```

#### Modificações
```bash
.\vamap.exe _LEGADO/<arquivo>.esf :insert
.\vamap.exe _LEGADO/<arquivo>.esf :update
.\vamap.exe _LEGADO/<arquivo>.esf :delete
```

#### Interface
```bash
.\vamap.exe _LEGADO/<arquivo>.esf :converse
```

### 4. Análise de Relacionamentos
```bash
# Para cada função importante, ver quem a chama
.\vamap.exe _LEGADO/<arquivo>.esf @<NOME_FUNCAO>

# Ver posição no stack
.\vamap.exe _LEGADO/<arquivo>.esf !<NOME_FUNCAO>
```

### 5. Análise de Dados
```bash
# Para cada tabela identificada, ver detalhes
.\vamap.exe _LEGADO/<arquivo>.esf <NOME_TABELA>\

# Para cada map, ver renderização
.\vamap.exe _LEGADO/<arquivo>.esf --map "<NOME_MAP>"
```

## Workflow Completo de Análise

```bash
# 1. Estrutura Geral
.\vamap.exe _LEGADO\vgfna.esf | > analise\01-stack.txt
.\vamap.exe _LEGADO\vgfna.esf \ > analise\02-estruturas.txt
.\vamap.exe _LEGADO\vgfna.esf --map > analise\03-mapas.txt

# 2. Operações de Dados
.\vamap.exe _LEGADO\vgfna.esf :inquiry > analise\04-consultas.txt
.\vamap.exe _LEGADO\vgfna.esf :update > analise\05-atualizacoes.txt
.\vamap.exe _LEGADO\vgfna.esf :insert > analise\06-insercoes.txt
.\vamap.exe _LEGADO\vgfna.esf :delete > analise\07-delecoes.txt

# 3. Interface
.\vamap.exe _LEGADO\vgfna.esf :converse > analise\08-interface.txt

# 4. Erros
.\vamap.exe _LEGADO\vgfna.esf # > analise\09-erros.txt

# 5. Detalhamento (para cada função encontrada)
.\vamap.exe _LEGADO\vgfna.esf --code "FUNCAO" > analise\funcao_FUNCAO.txt
```

## Análise para Migração

### Arquitetura Sugerida

**Mainframe (3270 + COBOL + DB2)**
↓
**Moderna (Web + C# + SQL Server)**

### Camadas

1. **Presentation** (CONVERSE → Web/API)
   - Maps 3270 → Razor Pages / React Components
   - CONVERSE → Controller Actions / API Endpoints
   - Validações de tela → Client + Server validation

2. **Business Logic** (Functions → Services)
   - Main Functions → Application Services
   - Sub-Functions → Domain Services
   - Validações → Business Rules / Validators

3. **Data Access** (SQL → Repository/EF Core)
   - INQUIRY → Repository.GetById()
   - SETINQ/SCAN → Repository.GetAll() / GetByFilter()
   - INSERT → Repository.Add()
   - UPDATE → Repository.Update()
   - DELETE → Repository.Delete()

4. **Data Model** (RECORD/TABLE → Entities)
   - RECORD → DTOs / ViewModels
   - TABLE → Entity Classes
   - WORKSTOR → Internal state / Cache

### Exemplo de Mapeamento

```
MAINFRAME                      →  .NET MODERNO
─────────────────────────────     ──────────────────────────────
VGFNP000 (Main)               →  Program.cs / Startup
VGFNP001 (Loop principal)     →  Controller / MVC Flow
VGFNM010 (Tela de consulta)   →  Index.cshtml / SearchComponent.tsx
VGFNP011 (Inquiry produto)    →  ProductService.GetByIdAsync()
VGFNS002 (Validação)          →  ProductValidator
V0PRODUTOSVG (Tabela)         →  Product.cs (Entity)
VGFNW001 (Work storage)       →  ProductDto / ProductViewModel
```

## Documentação Gerada

Após análise completa, crie:
1. **Diagrama de Fluxo**: Fluxograma do processo
2. **Diagrama de Dados**: Modelo ER das tabelas
3. **Matriz de Rastreabilidade**: Função COBOL → Classe C#
4. **Especificação de APIs**: Endpoints REST necessários
5. **Casos de Teste**: Baseado nas validações existentes

