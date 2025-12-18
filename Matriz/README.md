# Matriz de Rastreabilidade - VGFNA

## 📋 Visão Geral

Esta pasta contém a matriz de rastreabilidade completa do sistema **VGFNA** (Alteração de Dados Básicos), extraída e documentada a partir do arquivo legado `vgfna.esf`.

## 📊 Arquivos Disponíveis

### 1. `MATRIZ_RASTREABILIDADE_VGFNA.json`
**Formato**: JSON estruturado  
**Conteúdo**: Matriz completa com todos os elementos rastreados  
**Uso**: Processamento programático, integração com ferramentas

### 2. `MATRIZ_RASTREABILIDADE_VGFNA.csv`
**Formato**: CSV com separador `;` (ponto e vírgula)  
**Conteúdo**: Mesma matriz em formato tabular  
**Uso**: Visualização em planilhas, importação em ferramentas de análise

## 📈 Estatísticas da Matriz

### Distribuição por Tipo

| Tipo | Quantidade | IDs |
|------|------------|-----|
| **TELA** | 6 | TELA-0101 a TELA-0106 |
| **OBJETO** | 9 | OBJ-0101 a OBJ-0109 |
| **FUNCAO_TELA** | 3 | FTELA-0101 a FTELA-0103 |
| **METODO** | 10 | METOD-0101 a METOD-0110 |
| **REGRA** | 14 | REGRA-0101 a REGRA-0114 |
| **QUERY** | 10 | QUERY-0101 a QUERY-0110 |
| **ENTIDADE** | 15 | ENT-0101 a ENT-0115 |
| **TOTAL** | **67** | - |

### Status de Documentação

- ✅ **Status_Documentacao = OK**: 67/67 (100%)
- ❌ **Status_Implementacao = NOK**: 67/67 (100% - aguardando implementação)
- ⚠️ **Status_Teste_Unitario**: 
  - NA: 31 (telas, objetos, entidades)
  - NOK: 36 (métodos, regras, queries)

## 🔗 Relacionamentos e Hierarquia

### Hierarquia de Telas

```
TELA-0101 (VGFNM010) - Tela principal consulta
  ├── OBJ-0101 a OBJ-0109 (Campos da tela)
  └── FTELA-0101 (VGFNP005) - Função de apresentação

TELA-0102 (VGFNM020) - Tela alteração subgrupo
  └── FTELA-0102 (VGFNP025) - Função de apresentação

TELA-0103 (VGFNM030) - Tela alteração termo adesão
  └── FTELA-0103 (VGFNP035) - Função de apresentação

TELA-0104 a TELA-0106 (Telas de ajuda)
```

### Fluxo de Execução

```
METOD-0101 (VGFNP000) - Inicialização
  └── METOD-0102 (VGFNP002) - Loop principal
      ├── FTELA-0101 → METOD-0104 (VGFNS002) - Valida M010
      │   ├── METOD-0105 (VGFNP011) - QUERY-0105 (SELECT V0APOLICE)
      │   └── METOD-0106 (VGFNP012) - QUERY-0101 (SELECT V0SUBGRUPO)
      ├── FTELA-0102 → METOD-0107 (VGFNS003) - Valida M020
      │   └── METOD-0108 (VGFNP022) - QUERY-0102 (UPDATE V0SUBGRUPO)
      └── FTELA-0103 → METOD-0109 (VGFNS004) - Valida M030
          └── METOD-0110 (VGFNP023) - QUERY-0104 (UPDATE V0TERMOADESAO)
```

### Operações SQL por Entidade

| Entidade | Queries SELECT | Queries UPDATE |
|----------|----------------|----------------|
| V0APOLICE (ENT-0101) | QUERY-0105 | - |
| V0SUBGRUPO (ENT-0102) | QUERY-0101 | QUERY-0102 |
| V0TERMOADESAO (ENT-0103) | QUERY-0103 | QUERY-0104 |
| V1CLIENTE (ENT-0104) | QUERY-0106 | - |
| V1ENDERECOS (ENT-0105) | QUERY-0107 | - |
| V1AGENCIAS (ENT-0106) | QUERY-0108 | - |
| V1FONTE (ENT-0107) | QUERY-0109 | - |
| V0SISTEMA (ENT-0108) | QUERY-0110 | - |

## 📚 Documentação de Referência

Todos os elementos da matriz estão documentados nos seguintes arquivos:

### Documentos As-Is (Situação Atual)

1. **`01_TELAS_INTERFACE_VGFNA.md`**
   - Telas, objetos e funções de tela
   - IDs: TELA-0101 a TELA-0106, OBJ-0101 a OBJ-0109, FTELA-0101 a FTELA-0103

2. **`02_MODELO_DADOS_VGFNA.md`**
   - Entidades e operações SQL
   - IDs: ENT-0101 a ENT-0115, QUERY-0101 a QUERY-0110

3. **`03_FLUXO_EXECUCAO_VGFNA.md`**
   - Métodos e fluxo de execução
   - IDs: METOD-0101 a METOD-0110

4. **`04_FUNCOES_REGRAS_NEGOCIO_VGFNA.md`**
   - Regras de negócio detalhadas
   - IDs: REGRA-0101 a REGRA-0114

## 🔍 Campos da Matriz

### Campos Principais

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| `Id` | Identificador único | `TELA-0101`, `METOD-0101` |
| `Tipo` | Tipo do elemento | `TELA`, `METODO`, `QUERY`, `ENTIDADE` |
| `Objeto_Pai` | Nome do objeto pai | `VGFNM010`, `VGFNS002` |
| `Tipo_Objeto_Pai` | Tipo do objeto pai | `TELA`, `METODO` |
| `Descricao_Breve` | Descrição do elemento | `VGFNM010 - Tela alteração dados básicos` |
| `Ref_Legado_Arquivo` | Arquivo legado | `_LEGADO/vgfna.esf` |
| `Ref_Legado_Linhas` | Linhas no arquivo legado | `121`, `2861-2881` |
| `Ref_Doc_AsIs` | Documento As-Is | `01_TELAS_INTERFACE_VGFNA.md` |
| `Ref_Doc_AsIs_Linhas` | Linhas no documento As-Is | `39-163` |
| `Status_Documentacao` | Status da documentação | `OK` |
| `Status_Implementacao` | Status da implementação | `NOK` |
| `Status_Teste_Unitario` | Status dos testes | `NA`, `NOK` |

## 🎯 Uso da Matriz

### Consultas Comuns

#### Listar todas as telas
```bash
# CSV
grep "^TELA-" MATRIZ_RASTREABILIDADE_VGFNA.csv

# JSON (jq)
jq '.[] | select(.Tipo=="TELA")' MATRIZ_RASTREABILIDADE_VGFNA.json
```

#### Listar todas as queries SQL
```bash
# CSV
grep "^QUERY-" MATRIZ_RASTREABILIDADE_VGFNA.csv

# JSON (jq)
jq '.[] | select(.Tipo=="QUERY")' MATRIZ_RASTREABILIDADE_VGFNA.json
```

#### Listar elementos de uma tela específica
```bash
# CSV
grep "VGFNM010" MATRIZ_RASTREABILIDADE_VGFNA.csv

# JSON (jq)
jq '.[] | select(.Objeto_Pai=="VGFNM010")' MATRIZ_RASTREABILIDADE_VGFNA.json
```

#### Listar regras de negócio
```bash
# CSV
grep "^REGRA-" MATRIZ_RASTREABILIDADE_VGFNA.csv

# JSON (jq)
jq '.[] | select(.Tipo=="REGRA")' MATRIZ_RASTREABILIDADE_VGFNA.json
```

## 📊 Relatórios e Métricas

### Progresso de Documentação
- ✅ **100%** dos elementos documentados (Status_Documentacao = OK)

### Progresso de Implementação
- ❌ **0%** dos elementos implementados (Status_Implementacao = NOK)
- ⏳ Aguardando fase de implementação

### Cobertura de Testes
- ⚠️ **0%** dos elementos testáveis têm testes (Status_Teste_Unitario = NOK)
- 📝 36 elementos requerem testes unitários

## 🔄 Atualização da Matriz

### Quando Atualizar

1. **Documentação To-Be**: Quando criar documentação da solução moderna
   - Atualizar `Desc_Abordagem`
   - Atualizar `Ref_Doc_Abordagem`
   - Atualizar `Ref_Doc_Linhas`

2. **Implementação**: Quando implementar código moderno
   - Atualizar `Status_Implementacao` para `OK`
   - Atualizar `Desc_Abordagem` com detalhes da implementação

3. **Testes**: Quando criar testes unitários
   - Atualizar `Status_Teste_Unitario` para `OK`

### Processo de Atualização

1. Editar arquivo JSON ou CSV
2. Validar formato (JSON válido, CSV com separador `;`)
3. Verificar unicidade de IDs
4. Validar referências (Objeto_Pai existe)
5. Atualizar este README se necessário

## 📝 Notas Importantes

### IDs Únicos
- Todos os IDs são únicos e sequenciais dentro de cada tipo
- IDs não são reutilizados quando elementos são removidos
- Formato: `[PREFIXO]-[NÚMERO]` (ex: `TELA-0101`)

### Referências
- `Ref_Doc_AsIs`: Sempre relativo à pasta `docs/VGF/`
- `Ref_Legado_Arquivo`: Sempre relativo à raiz do workspace
- `Ref_Legado_Linhas`: Pode ser um número ou intervalo (ex: `121`, `2861-2881`)

### Status
- `NA`: Não Aplicável (ex: telas não têm testes unitários)
- `OK`: Concluído/Aprovado
- `NOK`: Pendente/Não Concluído

## 🚀 Próximos Passos

1. **Documentação To-Be**: Criar documentação da solução moderna
2. **Implementação**: Desenvolver código .NET Core + React
3. **Testes**: Criar testes unitários e de integração
4. **Atualização**: Atualizar status na matriz conforme progresso

---

**Última Atualização**: 2025-12-09  
**Versão da Matriz**: 1.0  
**Total de Elementos**: 67

