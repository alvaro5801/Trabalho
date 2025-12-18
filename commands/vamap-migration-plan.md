---
description: Cria um plano de migração completo de um programa ESF para arquitetura moderna
tags: [vamap, migration, modernization, planning, cobol]
---

# Plano de Migração

Usa o `vamap.exe` para criar um plano completo de migração de um programa COBOL/3270 para arquitetura moderna (.NET/Web).

## Fase 1: Descoberta e Inventário

### 1.1 Análise Estrutural
```bash
# Stack completo
.\vamap.exe _LEGADO\<arquivo>.esf | > MIGRACAO\00-discovery\stack.txt

# Todas as estruturas de dados
.\vamap.exe _LEGADO\<arquivo>.esf \ > MIGRACAO\00-discovery\estruturas.txt

# Todos os mapas
.\vamap.exe _LEGADO\<arquivo>.esf --map > MIGRACAO\00-discovery\mapas.txt

# Funções de erro
.\vamap.exe _LEGADO\<arquivo>.esf # > MIGRACAO\00-discovery\erros.txt
```

### 1.2 Inventário de Operações
```bash
.\vamap.exe _LEGADO\<arquivo>.esf :inquiry > MIGRACAO\00-discovery\ops-inquiry.txt
.\vamap.exe _LEGADO\<arquivo>.esf :setinq > MIGRACAO\00-discovery\ops-setinq.txt
.\vamap.exe _LEGADO\<arquivo>.esf :scan > MIGRACAO\00-discovery\ops-scan.txt
.\vamap.exe _LEGADO\<arquivo>.esf :insert > MIGRACAO\00-discovery\ops-insert.txt
.\vamap.exe _LEGADO\<arquivo>.esf :update > MIGRACAO\00-discovery\ops-update.txt
.\vamap.exe _LEGADO\<arquivo>.esf :delete > MIGRACAO\00-discovery\ops-delete.txt
.\vamap.exe _LEGADO\<arquivo>.esf :execute > MIGRACAO\00-discovery\ops-execute.txt
.\vamap.exe _LEGADO\<arquivo>.esf :converse > MIGRACAO\00-discovery\ops-converse.txt
```

## Fase 2: Análise Detalhada

### 2.1 Modelo de Dados
```bash
# Para cada estrutura TABLE identificada
.\vamap.exe _LEGADO\<arquivo>.esf <TABELA>\ > MIGRACAO\01-data\table_<TABELA>.txt
```

Criar documento: `MIGRACAO\01-data\ANALISE-DADOS.md`
- Inventário de todas as tabelas
- Campos de cada tabela (tipo, tamanho, constraints)
- Relacionamentos entre tabelas
- Mapeamento para Entity Framework

### 2.2 Camada de Dados
```bash
# Detalhamento de cada inquiry
.\vamap.exe _LEGADO\<arquivo>.esf --code "<INQUIRY_FUNC>" > MIGRACAO\02-repository\inquiry_<func>.txt
```

Criar documento: `MIGRACAO\02-repository\ANALISE-REPOSITORY.md`
- Métodos do Repository Pattern
- Queries SQL traduzidas para LINQ
- Estratégias de paginação
- Índices necessários

### 2.3 Interface do Usuário
```bash
# Renderização de cada mapa
.\vamap.exe _LEGADO\<arquivo>.esf --map "<MAPA>" > MIGRACAO\03-ui\map_<MAPA>.txt
```

Criar documento: `MIGRACAO\03-ui\ANALISE-UI.md`
- Wireframes das telas
- Campos de entrada/saída
- Fluxo de navegação
- Validações de UI

### 2.4 Lógica de Negócio
```bash
# Código de cada função principal
.\vamap.exe _LEGADO\<arquivo>.esf --code "<FUNC_PRINCIPAL>" > MIGRACAO\04-business\func_<func>.txt
```

Criar documento: `MIGRACAO\04-business\ANALISE-BUSINESS.md`
- Regras de negócio identificadas
- Validações complexas
- Fluxos de processo
- Mapeamento para Services

## Fase 3: Design da Solução

Criar documento: `MIGRACAO\05-solution\DESIGN.md`

### 3.1 Arquitetura
```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│  (Razor Pages / React / Blazor)         │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│          Application Layer              │
│  (Controllers / API / Services)         │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│           Domain Layer                  │
│  (Entities / Business Rules)            │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│        Infrastructure Layer             │
│  (EF Core / Repositories)               │
└─────────────────────────────────────────┘
```

### 3.2 Componentes
- **Entities**: Mapeamento de TABLE → Entity Classes
- **DTOs**: Mapeamento de RECORD/MAP → Data Transfer Objects
- **Repositories**: Mapeamento de Operações SQL → Repository Methods
- **Services**: Mapeamento de Functions → Service Methods
- **Controllers**: Mapeamento de CONVERSE → Controller Actions
- **Validators**: Mapeamento de Validações → FluentValidation
- **Views**: Mapeamento de Maps → UI Components

## Fase 4: Implementação

### 4.1 Setup do Projeto
```bash
dotnet new sln -n <NomeProjeto>
dotnet new webapi -n <NomeProjeto>.Api
dotnet new classlib -n <NomeProjeto>.Domain
dotnet new classlib -n <NomeProjeto>.Infrastructure
dotnet new classlib -n <NomeProjeto>.Application
dotnet new xunit -n <NomeProjeto>.Tests
```

### 4.2 Ordem de Implementação
1. **Domain Layer**: Entities primeiro
2. **Infrastructure Layer**: DbContext e Repositories
3. **Application Layer**: Services e Validators
4. **Presentation Layer**: Controllers e Views
5. **Tests**: Testes unitários e de integração

### 4.3 Migração Incremental
- Implementar por funcionalidade (use case)
- Começar pelas consultas (INQUIRY)
- Depois inserts/updates/deletes
- Por último, fluxos complexos

## Fase 5: Testes e Validação

### 5.1 Casos de Teste
Para cada função COBOL, criar teste unitário:
```csharp
[Fact]
public async Task VGFNP011_ProductInquiry_ReturnsProduct()
{
    // Arrange
    var productId = "12345";
    
    // Act
    var result = await _productService.GetByIdAsync(productId);
    
    // Assert
    Assert.NotNull(result);
    Assert.Equal(productId, result.ProductId);
}
```

### 5.2 Testes de Integração
Comparar resultados entre:
- Mainframe (dados reais)
- Novo sistema (mesmos inputs)

## Fase 6: Deploy e Cutover

### 6.1 Estratégias
- **Big Bang**: Migração completa de uma vez
- **Parallel Run**: Sistemas rodando em paralelo
- **Phased**: Por módulo/funcionalidade
- **Strangler Pattern**: Substituição gradual

### 6.2 Rollback Plan
- Backup completo do banco
- Scripts de rollback
- Plano de comunicação
- Critérios de go/no-go

## Template de Análise

Arquivo: `MIGRACAO\TEMPLATE-ANALISE-PROGRAMA.md`

```markdown
# Análise de Migração: <PROGRAMA>

## 1. Visão Geral
- **Programa**: <nome>.esf
- **Descrição**: <propósito do programa>
- **Complexidade**: <baixa/média/alta>

## 2. Inventário
### Mapas (Telas)
- [ ] <MAPA1> - <descrição>
- [ ] <MAPA2> - <descrição>

### Tabelas SQL
- [ ] <TABELA1> - <descrição>
- [ ] <TABELA2> - <descrição>

### Funções Principais
- [ ] <FUNC1> - <descrição>
- [ ] <FUNC2> - <descrição>

## 3. Operações de Banco
### Consultas (INQUIRY/SETINQ)
- [ ] <FUNC_INQUIRY1>: SELECT em <TABELA>
  - Query: <SQL>
  - Mapeamento: <Repository.Method()>

### Modificações
- [ ] <FUNC_INSERT1>: INSERT em <TABELA>
- [ ] <FUNC_UPDATE1>: UPDATE em <TABELA>
- [ ] <FUNC_DELETE1>: DELETE em <TABELA>

## 4. Regras de Negócio
1. <Regra 1>
2. <Regra 2>

## 5. Mapeamento para .NET

### Entities
- `<Tabela>` → `<Entity>.cs`

### DTOs
- `<Record>` → `<Dto>.cs`

### Repositories
- `<FuncInquiry>` → `I<Entity>Repository.Get<Method>()`

### Services
- `<FuncPrincipal>` → `<Entity>Service.<Method>()`

### Controllers
- `<Converse>` → `<Entity>Controller.<Action>()`

## 6. Estimativas
- **Complexidade**: <pontos de história>
- **Esforço**: <horas/dias>
- **Dependências**: <outros programas/sistemas>

## 7. Riscos
1. <Risco 1>
2. <Risco 2>

## 8. Notas
<Observações adicionais>
```

## Automatização

Criar script PowerShell: `MIGRACAO\analise-completa.ps1`

```powershell
param($arquivo)

$nome = [System.IO.Path]::GetFileNameWithoutExtension($arquivo)
$dir = "MIGRACAO\$nome"

# Criar estrutura de diretórios
New-Item -ItemType Directory -Force -Path "$dir\00-discovery"
New-Item -ItemType Directory -Force -Path "$dir\01-data"
New-Item -ItemType Directory -Force -Path "$dir\02-repository"
New-Item -ItemType Directory -Force -Path "$dir\03-ui"
New-Item -ItemType Directory -Force -Path "$dir\04-business"
New-Item -ItemType Directory -Force -Path "$dir\05-solution"

# Executar análises
.\vamap.exe $arquivo "|" > "$dir\00-discovery\stack.txt"
.\vamap.exe $arquivo "\" > "$dir\00-discovery\estruturas.txt"
.\vamap.exe $arquivo --map > "$dir\00-discovery\mapas.txt"
# ... etc
```

