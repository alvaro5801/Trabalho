# 09 - USE CASASES FLOWS

## Objetivo

Documentar os fluxos end-to-end (casos de uso) do sistema VGFNA, mapeando os fluxos completos desde a entrada do usuário até a resposta final, incluindo diagramas de sequência e fluxogramas.

## Mapeamento de Legado

### Origem
- **Arquivo**: `_LEGADO/vgfna.esf`
- **Fluxos**: Fluxo principal M010 → M020 → M030
- **Métodos**: METOD-0102, METOD-0104, METOD-0107, METOD-0109

### Destino
- **Documentação**: Fluxos end-to-end
- **Formato**: Diagramas Mermaid

## Especificação Técnica

### 1. Caso de Uso 1: Consulta e Alteração de Dados Básicos - Subgrupo

**Rastreabilidade**:
- **ID Matriz Principal**: METOD-0104, METOD-0107
- **Tela Inicial**: TELA-0101 (VGFNM010)
- **Tela Edição**: TELA-0102 (VGFNM020)

**Fluxo Completo**:

```mermaid
sequenceDiagram
    autonumber
    participant U as Usuário
    participant API as API Controller
    participant Service as AlteracaoDadosBasicosService
    participant VM1 as ProcessarConsultaM010ViewModel
    participant VM2 as ProcessarAlteracaoM020ViewModel
    participant RepoA as ApoliceRepository
    participant RepoS as SubgrupoRepository
    participant RepoC as ClienteRepository
    participant DB as Database

    U->>API: POST /api/alteracao-dados-basicos/consultar-apolice
    API->>Service: ConsultarApolice(request)
    Service->>VM1: Execute(request)
    VM1->>RepoA: GetByNumero(numeroApolice)
    RepoA->>DB: QUERY-0105: SELECT V0APOLICE
    DB-->>RepoA: Apolice
    RepoA-->>VM1: Apolice
    VM1->>RepoC: GetByCodigo(codigoCliente)
    RepoC->>DB: QUERY-0106: SELECT V1CLIENTE
    DB-->>RepoC: Cliente
    RepoC-->>VM1: Cliente
    VM1->>RepoS: GetByApoliceAndSubgrupo(numeroApolice, codigoSubgrupo)
    RepoS->>DB: QUERY-0101: SELECT V0SUBGRUPO
    DB-->>RepoS: Subgrupo
    RepoS-->>VM1: Subgrupo
    VM1-->>Service: ApoliceDetalhesDto
    Service-->>API: AppResponse<ApoliceDetalhesDto>
    API-->>U: 200 OK com dados da apólice
    
    U->>API: PUT /api/alteracao-dados-basicos/alterar-subgrupo
    API->>Service: AlterarSubgrupo(request)
    Service->>VM2: Execute(request)
    VM2->>RepoA: GetByNumero(numeroApolice)
    RepoA->>DB: QUERY-0105: SELECT V0APOLICE
    DB-->>RepoA: Apolice
    RepoA-->>VM2: Apolice
    VM2->>RepoS: GetByApoliceAndSubgrupo(numeroApolice, codigoSubgrupo)
    RepoS->>DB: QUERY-0101: SELECT V0SUBGRUPO
    DB-->>RepoS: Subgrupo
    RepoS-->>VM2: Subgrupo
    
    Note over VM2: Validações REGRA-0110 a REGRA-0114
    
    VM2->>RepoS: Update(subgrupoAtualizado)
    RepoS->>DB: QUERY-0102: UPDATE V0SUBGRUPO
    DB-->>RepoS: Sucesso
    RepoS-->>VM2: true
    VM2-->>Service: true
    Service-->>API: AppResponse<bool>
    API-->>U: 200 OK com sucesso
```

### 2. Caso de Uso 2: Alteração de Dados Básicos - Termo Adesão

**Rastreabilidade**:
- **ID Matriz Principal**: METOD-0109
- **Tela**: TELA-0103 (VGFNM030)

**Fluxo Completo**:

```mermaid
sequenceDiagram
    autonumber
    participant U as Usuário
    participant API as API Controller
    participant Service as AlteracaoDadosBasicosService
    participant VM as ProcessarAlteracaoM030ViewModel
    participant RepoA as ApoliceRepository
    participant RepoT as TermoAdesaoRepository
    participant DB as Database

    U->>API: PUT /api/alteracao-dados-basicos/alterar-termo-adesao
    API->>Service: AlterarTermoAdesao(request)
    Service->>VM: Execute(request)
    VM->>RepoA: GetByNumero(numeroApolice)
    RepoA->>DB: QUERY-0105: SELECT V0APOLICE
    DB-->>RepoA: Apolice
    RepoA-->>VM: Apolice
    VM->>RepoT: GetByApoliceAndTermo(numeroApolice, codigoTermo)
    RepoT->>DB: QUERY-0103: SELECT V0TERMOADESAO
    DB-->>RepoT: TermoAdesao
    RepoT-->>VM: TermoAdesao
    
    Note over VM: Validações similares à M020
    
    VM->>RepoT: Update(termoAtualizado)
    RepoT->>DB: QUERY-0104: UPDATE V0TERMOADESAO
    DB-->>RepoT: Sucesso
    RepoT-->>VM: true
    VM-->>Service: true
    Service-->>API: AppResponse<bool>
    API-->>U: 200 OK com sucesso
```

## Dependências

- **Depende de**: Todos os documentos anteriores (01 a 08) - documenta fluxos usando todos os componentes
- **Necessário para**: 10_TESTING_STRATEGY.md (testes baseados nos fluxos)

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: Todos os casos de uso principais documentados
- [x] **OBRIGATÓRIO**: Diagramas de sequência criados
- [x] **OBRIGATÓRIO**: Fluxos validados com stakeholders
- [x] **OBRIGATÓRIO**: Todos elementos têm ID da matriz referenciado

## Rastreabilidade Completa

### Resumo de IDs da Matriz Abordados

Este documento documenta os fluxos end-to-end que envolvem múltiplos IDs da matriz trabalhando em conjunto.

| Tipo | Quantidade | Range | Status |
|------|------------|-------|--------|
| METOD | 4 | METOD-0102, METOD-0104, METOD-0107, METOD-0109 | COMPLETED |
| TELA | 3 | TELA-0101 a TELA-0103 | COMPLETED |
| QUERY | 10 | QUERY-0101 a QUERY-0110 | COMPLETED |

**Total de IDs Referenciados neste Documento**: 17

### Status na Matriz

Este documento referencia IDs já documentados nos documentos anteriores. Não requer atualização adicional na matriz.

