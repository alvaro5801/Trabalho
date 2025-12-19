# Documentação As-Is - Programa cb2qa.esf

## 📋 Visão Geral

Este diretório contém a documentação completa do estado atual (As-Is) do programa mainframe legado `cb2qa.esf`, extraído e analisado usando a ferramenta `vamap.exe`.

**Programa Analisado**: `_LEGADO/cb2qa.esf` (25.449 linhas)  
**Sistema**: Consulta de Movimentos de Débito Automático  
**Tecnologia**: VisualAge COBOL (mainframe)

---

## 📄 Documentos Principais

### 1. `01_TELAS_INTERFACE.md`
**Conteúdo**: Documentação completa das telas/mapas 3270  
**Elementos Documentados**:
- 8 Telas (CB2QM010, CB2QM020, CB2QM030, CB2QM040 + telas de ajuda)
- 16 Campos de objeto de tela
- 4 Funções de apresentação de tela
- 19 Regras de validação e teclas de função
- Diagramas de navegação (Mermaid)

**IDs da Matriz**: TELA-0001 a TELA-0008, OBJ-0001 a OBJ-0016, FTELA-0001 a FTELA-0004

### 2. `02_MODELO_DADOS.md`
**Conteúdo**: Documentação do modelo de dados e operações SQL  
**Elementos Documentados**:
- 29 Entidades/Tabelas DB2
- 14 Queries SQL principais (INQUIRY, SETINQ)
- Diagrama ER completo (Mermaid)
- Relacionamentos entre tabelas
- Chaves e índices

**IDs da Matriz**: ENT-0001 a ENT-0029, QUERY-0001 a QUERY-0028

### 3. `03_FLUXO_EXECUCAO.md`
**Conteúdo**: Fluxo de execução e stack do programa  
**Elementos Documentados**:
- Stack completo de funções
- 11 Métodos principais
- Hierarquia de chamadas
- Diagramas de sequência por caso de uso
- Matriz de dependências
- Diagrama de componentes

**IDs da Matriz**: METOD-0001, METOD-0002, METOD-0003, METOD-0010, METOD-0011, METOD-0012, METOD-0035 a METOD-0039

### 4. `04_FUNCOES_REGRAS_NEGOCIO.md`
**Conteúdo**: Funções detalhadas e regras de negócio  
**Elementos Documentados**:
- 3 Funções principais detalhadas
- 19 Regras de negócio com traduções para C#
- Fluxogramas (Mermaid)
- Análise de complexidade
- Catálogo de regras por criticidade

**IDs da Matriz**: METOD-0001, METOD-0003, METOD-0010, REGRA-0001 a REGRA-0019

---

## 🔧 Arquivos Temporários (Outputs vamap.exe)

Estes arquivos contêm os outputs brutos da ferramenta `vamap.exe` e servem como evidência dos comandos executados:

### Análise Geral
- **`_temp_stack.txt`**: Stack completo de execução (`--code "|"`)
- **`_temp_maps.txt`**: Lista de todos os mapas (`--map`)
- **`_temp_structures.txt`**: Inventário de estruturas de dados (`--code "\"`)

### Análise de Telas
- **`_temp_CB2QM010.txt`**: Layout da tela de consulta inicial
- **`_temp_CB2QM020.txt`**: Layout da tela de listagem de resultados
- **`_temp_CB2QM030.txt`**: Layout da tela de detalhamento de parcelas
- **`_temp_CB2QM040.txt`**: Layout da tela de detalhamento completo

### Análise de Dados
- **`_temp_ENT_CB2QR001.txt`**: Estrutura detalhada da tabela principal
- **`_temp_inquiries.txt`**: Todas operações INQUIRY (SELECT único)
- **`_temp_setinq.txt`**: Todas operações SETINQ (SELECT múltiplo)

---

## 🔗 Integração com Matriz de Rastreabilidade

Todos os elementos documentados estão rastreados na `MATRIZ_RASTREABILIDADE.csv` (raiz do projeto).

**Campos atualizados na matriz**:
- `Ref_Doc_AsIs`: Nome do arquivo de documentação
- `Ref_Doc_AsIs_Linhas`: Linhas onde o elemento está documentado
- `Status_Documentacao`: Alterado para "OK"

**Total de registros rastreados**: 101

---

## 📊 Estatísticas

| Tipo | Quantidade |
|------|------------|
| Telas (TELA) | 8 |
| Objetos de Tela (OBJ) | 16 |
| Funções de Tela (FTELA) | 4 |
| Métodos/Funções (METOD) | 11 |
| Entidades/Tabelas (ENT) | 29 |
| Queries SQL (QUERY) | 14 |
| Regras de Negócio (REGRA) | 19 |
| **TOTAL** | **101** |

---

## 🛠️ Metodologia Utilizada

### Comandos vamap.exe Executados

#### 1. Análise Inicial
```bash
# Stack completo
.\vamap.exe _LEGADO\cb2qa.esf --code "|"

# Lista de mapas
.\vamap.exe _LEGADO\cb2qa.esf --map

# Lista de estruturas
.\vamap.exe _LEGADO\cb2qa.esf --code "\"
```

#### 2. Análise de Telas
```bash
# Para cada mapa identificado
.\vamap.exe _LEGADO\cb2qa.esf --map "CB2QM010"
.\vamap.exe _LEGADO\cb2qa.esf --map "CB2QM020"
.\vamap.exe _LEGADO\cb2qa.esf --map "CB2QM030"
.\vamap.exe _LEGADO\cb2qa.esf --map "CB2QM040"
```

#### 3. Análise de Dados
```bash
# Detalhamento de estrutura específica
.\vamap.exe _LEGADO\cb2qa.esf --code "CB2QR001\"

# Operações SQL
.\vamap.exe _LEGADO\cb2qa.esf --code ":inquiry"
.\vamap.exe _LEGADO\cb2qa.esf --code ":setinq"
```

#### 4. Análise de Funções
```bash
# Código de função específica
.\vamap.exe _LEGADO\cb2qa.esf --code "CB2QP000"
.\vamap.exe _LEGADO\cb2qa.esf --code "CB2QS010"

# Comandos específicos
.\vamap.exe _LEGADO\cb2qa.esf --code ";IF"
.\vamap.exe _LEGADO\cb2qa.esf --code ";CALL"
```

### Fluxo de Documentação

```
1. PREPARAÇÃO
   └─> Criar diretório docs/asis/
   └─> Verificar MATRIZ_RASTREABILIDADE.csv
   └─> Executar análise exploratória

2. DOCUMENTAÇÃO TELAS
   └─> Listar mapas (vamap --map)
   └─> Visualizar cada mapa (vamap --map "NOME")
   └─> Documentar em 01_TELAS_INTERFACE.md
   └─> Referenciar IDs da matriz

3. DOCUMENTAÇÃO DADOS
   └─> Listar estruturas (vamap --code "\")
   └─> Detalhar tabelas principais
   └─> Identificar operações SQL (:inquiry, :setinq)
   └─> Documentar em 02_MODELO_DADOS.md
   └─> Criar diagrama ER

4. DOCUMENTAÇÃO FLUXO
   └─> Extrair stack (vamap --code "|")
   └─> Analisar funções principais
   └─> Documentar em 03_FLUXO_EXECUCAO.md
   └─> Criar diagramas de sequência

5. DOCUMENTAÇÃO FUNÇÕES
   └─> Extrair código de funções críticas
   └─> Identificar regras de negócio (;IF, ;CALL)
   └─> Documentar em 04_FUNCOES_REGRAS_NEGOCIO.md
   └─> Traduzir para lógica moderna

6. ATUALIZAÇÃO MATRIZ
   └─> Preencher Ref_Doc_AsIs
   └─> Preencher Ref_Doc_AsIs_Linhas
   └─> Atualizar Status_Documentacao para OK
```

---

## 📚 Padrões Seguidos

Esta documentação segue os padrões estabelecidos em:
- `.cursor/rules/legacy-asis.mdc` - Estrutura de documentação As-Is
- `.cursor/rules/legacy-matriz.mdc` - Regras de rastreabilidade
- `.cursor/rules/legacy-vamap.mdc` - Uso da ferramenta vamap.exe

---

## ✅ Validação de Completude

### Documentos
- [x] 4 documentos criados
- [x] Todos seguem template padrão
- [x] Todos elementos têm ID da matriz
- [x] Outputs vamap.exe incluídos
- [x] Diagramas Mermaid criados

### Matriz de Rastreabilidade
- [x] 101 registros atualizados
- [x] Campo `Ref_Doc_AsIs` preenchido
- [x] Campo `Ref_Doc_AsIs_Linhas` preenchido
- [x] `Status_Documentacao` = "OK"

### Qualidade
- [x] Rastreabilidade 100% completa
- [x] Sem IDs duplicados
- [x] Descrições claras e precisas
- [x] Diagramas renderizam corretamente

---

## 🔍 Consultas Úteis

### Verificar elementos documentados
```bash
# Por documento
grep "01_TELAS_INTERFACE" MATRIZ_RASTREABILIDADE.csv
grep "02_MODELO_DADOS" MATRIZ_RASTREABILIDADE.csv
grep "03_FLUXO_EXECUCAO" MATRIZ_RASTREABILIDADE.csv
grep "04_FUNCOES_REGRAS_NEGOCIO" MATRIZ_RASTREABILIDADE.csv

# Contar elementos com Status_Documentacao = OK
grep ",OK," MATRIZ_RASTREABILIDADE.csv | wc -l
```

### Listar elementos por tipo
```bash
grep "^TELA-.*01_TELAS" MATRIZ_RASTREABILIDADE.csv
grep "^ENT-.*02_MODELO" MATRIZ_RASTREABILIDADE.csv
grep "^METOD-.*03_FLUXO" MATRIZ_RASTREABILIDADE.csv
grep "^REGRA-.*04_FUNCOES" MATRIZ_RASTREABILIDADE.csv
```

---

## 📝 Próximos Passos

Após esta documentação As-Is, os próximos passos são:

1. **Mapeamento Legado → Moderno** (consultar `.cursor/rules/legacy-mapping-patterns.mdc`)
2. **Documentação To-Be** (14 documentos de migração - consultar `.cursor/rules/be-migration-doc-structure.mdc`)
3. **Implementação** da arquitetura moderna (.NET Core)
4. **Testes** e validação

---

**Data de Criação**: 2025-12-04  
**Programa Analisado**: cb2qa.esf  
**Status**: ✅ COMPLETO  
**Versão**: 1.0

