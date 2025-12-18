# Documentação Backend VGFNA

## Visão Geral

Esta documentação descreve a arquitetura e implementação do backend moderno para o sistema VGFNA (Alteração de Dados Básicos), migrado do sistema legado mainframe COBOL para .NET Core seguindo princípios de Clean Architecture.

## Estrutura da Documentação

A documentação está organizada em 10 documentos principais, seguindo a ordem de implementação:

### 1. [01_DOMAIN_MODEL.md](01_DOMAIN_MODEL.md)
**Camada de Domínio**
- Entidades de domínio (13 entidades principais)
- DTOs (Data Transfer Objects)
- Interfaces de repositories, services e viewmodels
- Mapeamento de ENT-0101 a ENT-0115

### 2. [02_DATABASE_SCHEMA.md](02_DATABASE_SCHEMA.md)
**Schema do Banco de Dados**
- DDL completo para SQL Server
- Tabelas principais e de domínio
- Índices otimizados
- Estratégia de migração de dados
- Mapeamento de QUERY-0101 a QUERY-0110

### 3. [03_INFRASTRUCTURE_LAYER.md](03_INFRASTRUCTURE_LAYER.md)
**Camada de Infraestrutura**
- Repositories com Dapper (9 repositories)
- Event Repository para auditoria
- Mapeamento de queries legadas para SQL moderno
- Mapeamento de METOD-0103, METOD-0105, METOD-0106, METOD-0108, METOD-0110

### 4. [04_BUSINESS_LOGIC.md](04_BUSINESS_LOGIC.md)
**Lógica de Negócio**
- ViewModels (3 principais)
- Regras de negócio migradas (REGRA-0101 a REGRA-0115)
- Validações e processamento
- Mapeamento de METOD-0104, METOD-0107, METOD-0109

### 5. [05_APPLICATION_SERVICES.md](05_APPLICATION_SERVICES.md)
**Services de Aplicação**
- Services de orquestração
- Tratamento de exceções
- AppResponse<T> padronizado
- Mapeamento de METOD-0102

### 6. [06_API_LAYER.md](06_API_LAYER.md)
**Camada de API**
- Controllers RESTful
- Endpoints HTTP
- DTOs de request/response
- Configuração Swagger
- Mapeamento de TELA-0101 a TELA-0103

### 7. [07_DEPENDENCY_INJECTION.md](07_DEPENDENCY_INJECTION.md)
**Injeção de Dependências**
- Configuração de DI
- Extension methods
- Registro de serviços
- Configuração no Program.cs

### 8. [08_CONFIGURATION.md](08_CONFIGURATION.md)
**Configurações**
- appsettings.json
- Connection strings
- Configurações de logging
- Configurações de Swagger

### 9. [09_USE_CASES_FLOWS.md](09_USE_CASES_FLOWS.md)
**Fluxos End-to-End**
- Casos de uso principais
- Diagramas de sequência
- Fluxos completos M010 → M020 → M030

### 10. [10_TESTING_STRATEGY.md](10_TESTING_STRATEGY.md)
**Estratégia de Testes**
- Testes unitários
- Testes de integração
- Testes de API
- Cobertura de código

## Mapeamento Legado → Moderno

### Entidades Mapeadas
- **ENT-0101**: V0APOLICE → Apolice
- **ENT-0102**: V0SUBGRUPO → Subgrupo
- **ENT-0103**: V0TERMOADESAO → TermoAdesao
- **ENT-0104**: V1CLIENTE → Cliente
- **ENT-0105**: V1ENDERECOS → Endereco
- **ENT-0106**: V1AGENCIAS → AgenciaBancaria
- **ENT-0107**: V1FONTE → FonteProdutora
- **ENT-0108**: V0SISTEMA → Sistema
- **ENT-0109 a ENT-0113**: Tabelas de domínio

### Queries Mapeadas
- **QUERY-0101**: SELECT V0SUBGRUPO
- **QUERY-0102**: UPDATE V0SUBGRUPO
- **QUERY-0103**: SELECT V0TERMOADESAO
- **QUERY-0104**: UPDATE V0TERMOADESAO
- **QUERY-0105**: SELECT V0APOLICE
- **QUERY-0106**: SELECT V1CLIENTE
- **QUERY-0107**: SELECT V1ENDERECOS
- **QUERY-0108**: SELECT V1AGENCIAS
- **QUERY-0109**: SELECT V1FONTE
- **QUERY-0110**: SELECT V0SISTEMA

### Métodos Mapeados
- **METOD-0102**: VGFNP002 → AlteracaoDadosBasicosService
- **METOD-0104**: VGFNS002 → ProcessarConsultaM010ViewModel
- **METOD-0107**: VGFNS003 → ProcessarAlteracaoM020ViewModel
- **METOD-0109**: VGFNS004 → ProcessarAlteracaoM030ViewModel

### Telas Mapeadas
- **TELA-0101**: VGFNM010 → POST /api/alteracao-dados-basicos/consultar-apolice
- **TELA-0102**: VGFNM020 → PUT /api/alteracao-dados-basicos/alterar-subgrupo
- **TELA-0103**: VGFNM030 → PUT /api/alteracao-dados-basicos/alterar-termo-adesao

## Tecnologias Utilizadas

- **.NET Core 8**: Framework principal
- **ASP.NET Core Web API**: Camada de API
- **Dapper**: ORM para acesso a dados
- **SQL Server**: Banco de dados
- **xUnit**: Framework de testes
- **Swagger/OpenAPI**: Documentação da API

## Ordem de Implementação Recomendada

1. **Domain Model** (01) - Definir entidades e interfaces
2. **Database Schema** (02) - Criar estrutura do banco
3. **Infrastructure Layer** (03) - Implementar repositories
4. **Business Logic** (04) - Implementar ViewModels
5. **Application Services** (05) - Implementar services
6. **API Layer** (06) - Implementar controllers
7. **Dependency Injection** (07) - Configurar DI
8. **Configuration** (08) - Configurar appsettings
9. **Use Cases Flows** (09) - Validar fluxos
10. **Testing Strategy** (10) - Implementar testes

## Rastreabilidade

Todos os elementos da documentação estão rastreados na matriz de rastreabilidade (`MATRIZ_RASTREABILIDADE.csv`) com os seguintes IDs:

- **ENT-0101 a ENT-0115**: Entidades
- **QUERY-0101 a QUERY-0110**: Queries SQL
- **METOD-0101 a METOD-0110**: Métodos/Funções
- **TELA-0101 a TELA-0103**: Telas
- **REGRA-0101 a REGRA-0115**: Regras de negócio

## Status da Documentação

✅ **Documentação Completa**: Todos os 10 documentos principais foram criados seguindo o padrão estabelecido na documentação do backend CB2QA.

## Próximos Passos

1. Revisar documentação com stakeholders
2. Validar mapeamentos com analistas de negócio
3. Iniciar implementação seguindo a ordem recomendada
4. Executar testes conforme estratégia definida

---

**Data de Criação**: 2025-12-09  
**Baseado em**: Documentação backend CB2QA  
**Sistema Legado**: VGFNA (_LEGADO/vgfna.esf)

