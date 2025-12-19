# Documentação de Telas - Programa VA2VA.ESF

## 📋 Índice
- [Visão Geral](#visão-geral)
- [Lista de Telas](#lista-de-telas)
- [Detalhamento das Telas](#detalhamento-das-telas)
  - [VA2VM010 - Tela Principal de Consulta](#va2vm010---tela-principal-de-consulta)
  - [VA2VM020 - Tela de Resultados/Listagem](#va2vm020---tela-de-resultadoslistagem)
  - [VA2VH010 - Tela de Ajuda](#va2vh010---tela-de-ajuda)
- [Mapeamento de Campos](#mapeamento-de-campos)

---

## 🎯 Visão Geral

**Programa**: VA2VA.ESF  
**Tipo**: Aplicação Mainframe VisualAge COBOL  
**Finalidade**: Administração Integrada de Seguros  
**Total de Telas**: 3 (2 telas principais + 1 help)

---

## 📝 Lista de Telas

| Opção | Código Tela | Tela Help | Descrição |
|-------|-------------|-----------|-----------|
| 1 | VA2VM010 | VA2VH010 | Tela principal de consulta por certificado |
| 2 | VA2VM020 | - | Tela de listagem de solicitações |
| 3 | VA2VH010 | - | Tela de ajuda contextual |

---

## 🖥️ Detalhamento das Telas

### VA2VM010 - Tela Principal de Consulta

#### **Função que Abre Esta Tela:**
- `VA2VP002`

#### **Visualização da Tela (80x24):**

```
                    MNUEMP   ADMINISTRACAO INTEGRADA DE SEGUROS         01/01/000DATA   
 VA2VM010      V 9                                      NOMSIS            0000000HORA   
                                                                      GRUFUC         
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
 CERTIFICADO......:               NUM_CERTIFICADO*                                             
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                             EZEMSG  
 F1 - AJUDA   F2 -         F3 - SAIDA   F4 -         F5 - LIMPA   F6 -          
 F7 -         F8 -         F9 -         F10-         F11-         F12- CANCELA  
```

#### **Campos da Tela:**

| Código | Nome do Campo | Tipo | Foco Inicial | Descrição |
|--------|---------------|------|--------------|-----------|
| A | MNUEMP | Read-only | Não | Menu/Empresa |
| B | DATA | Read-only | Não | Data atual do sistema |
| C | NOMSIS | Read-only | Não | Nome do sistema |
| D | HORA | Read-only | Não | Hora atual do sistema |
| E | GRUFUC | Read-only | Não | Grupo de funções |
| F | NUM_CERTIFICADO | **Editável** | **Sim** ⭐ | Número do certificado (campo principal) |
| G | EZEMSG | Read-only | Não | Mensagens do sistema |

#### **Teclas de Função:**

| Tecla | Ação |
|-------|------|
| F1 | AJUDA - Abre tela de help (VA2VH010) |
| F2 | (Não utilizada) |
| F3 | SAIDA - Sai da aplicação |
| F4 | (Não utilizada) |
| F5 | LIMPA - Limpa os campos da tela |
| F6 | (Não utilizada) |
| F7 | (Não utilizada) |
| F8 | (Não utilizada) |
| F9 | (Não utilizada) |
| F10 | (Não utilizada) |
| F11 | (Não utilizada) |
| F12 | CANCELA - Cancela a operação |

#### **Regras de Negócio:**
- Campo `NUM_CERTIFICADO` é obrigatório
- Certificado deve estar cadastrado no sistema
- Ao pressionar F1, exibe help contextual (VA2VH010)
- Após preenchimento válido, processa e exibe tela VA2VM020

---

### VA2VM020 - Tela de Resultados/Listagem

#### **Função que Abre Esta Tela:**
- `VA2VP003`

#### **Visualização da Tela (80x24):**

```
                    MNUEMP   ADMINISTRACAO INTEGRADA DE SEGUROS         01/01/000DATA   
 VA2VM020                                               NOMSIS            0000000HORA   
                                                                      GRUFUC         
                                                                                
 CERTIFICADO...:               NUM_CERTIFICADO                                                
 -----------------------------------------------------------------------------  
 DT.SOLIC    USUARIO     SITUACAO    |    DT.SOLIC    USUARIO     SITUACAO      
 -----------------------------------------------------------------------------  
 01/01/000DATA_SOLICITACAO          COD_USUARIO*            SITUACAO  |             DATA_SOLICITACAO          COD_USUARIO*            SITUACAO    
          DATA_SOLICITACAO          COD_USUARIO*            SITUACAO  |             DATA_SOLICITACAO          COD_USUARIO*            SITUACAO    
          DATA_SOLICITACAO          COD_USUARIO*            SITUACAO  |             DATA_SOLICITACAO          COD_USUARIO*            SITUACAO    
          DATA_SOLICITACAO          COD_USUARIO*            SITUACAO  |             DATA_SOLICITACAO          COD_USUARIO*            SITUACAO    
          DATA_SOLICITACAO          COD_USUARIO*            SITUACAO  |             DATA_SOLICITACAO          COD_USUARIO*            SITUACAO    
          DATA_SOLICITACAO          COD_USUARIO*            SITUACAO  |             DATA_SOLICITACAO          COD_USUARIO*            SITUACAO    
          DATA_SOLICITACAO          COD_USUARIO*            SITUACAO  |             DATA_SOLICITACAO          COD_USUARIO*            SITUACAO    
          DATA_SOLICITACAO          COD_USUARIO*            SITUACAO  |             DATA_SOLICITACAO          COD_USUARIO*            SITUACAO    
          DATA_SOLICITACAO          COD_USUARIO*            SITUACAO  |             DATA_SOLICITACAO          COD_USUARIO*            SITUACAO    
          DATA_SOLICITACAO          COD_USUARIO*            SITUACAO  |             DATA_SOLICITACAO          COD_USUARIO*            SITUACAO    
          DATA_SOLICITACAO          COD_USUARIO*            SITUACAO  |             DATA_SOLICITACAO          COD_USUARIO*            SITUACAO    
          DATA_SOLICITACAO          COD_USUARIO*            SITUACAO  |             DATA_SOLICITACAO          COD_USUARIO*            SITUACAO    
                                                                                
                                                                             EZEMSG  
 F1 -         F2 -         F3 - SAIDA   F4 -         F5 -         F6 -          
 F7 - RETORNA F8 - AVANCA  F9 -         F10-         F11-         F12- CANCELA  
```

#### **Campos da Tela:**

| Código | Nome do Campo | Tipo | Foco Inicial | Descrição |
|--------|---------------|------|--------------|-----------|
| A | MNUEMP | Read-only | Não | Menu/Empresa |
| B | DATA | Read-only | Não | Data atual do sistema |
| C | NOMSIS | Read-only | Não | Nome do sistema |
| D | HORA | Read-only | Não | Hora atual do sistema |
| E | GRUFUC | Read-only | Não | Grupo de funções |
| F | NUM_CERTIFICADO | Read-only | Não | Número do certificado consultado |
| G | DATA_SOLICITACAO | Read-only | Não | Data da solicitação (repetido em grid) |
| H | COD_USUARIO | Read-only | **Sim** ⭐ | Código do usuário (repetido em grid) |
| I | SITUACAO | Read-only | Não | Situação da solicitação (repetido em grid) |
| J | EZEMSG | Read-only | Não | Mensagens do sistema |

#### **Estrutura do Grid:**
- **Layout**: 2 colunas (layout duplo para otimizar espaço)
- **Linhas visíveis**: 12 linhas por vez
- **Total de registros**: Paginável com F7/F8
- **Colunas por registro**:
  - DT.SOLIC (Data da Solicitação)
  - USUARIO (Código do Usuário)
  - SITUACAO (Status da solicitação)

#### **Teclas de Função:**

| Tecla | Ação |
|-------|------|
| F1 | (Não utilizada) |
| F2 | (Não utilizada) |
| F3 | SAIDA - Retorna ao menu principal |
| F4 | (Não utilizada) |
| F5 | (Não utilizada) |
| F6 | (Não utilizada) |
| F7 | RETORNA - Página anterior do grid |
| F8 | AVANCA - Próxima página do grid |
| F9 | (Não utilizada) |
| F10 | (Não utilizada) |
| F11 | (Não utilizada) |
| F12 | CANCELA - Cancela e volta para VA2VM010 |

#### **Regras de Negócio:**
- Exibe histórico de solicitações do certificado consultado
- Grid com paginação (F7/F8) para navegar entre registros
- Layout otimizado em 2 colunas para visualizar mais dados
- Máximo de 24 registros visíveis por página (12 linhas × 2 colunas)

---

### VA2VH010 - Tela de Ajuda

#### **Tipo:** Tela de Help Contextual

#### **Visualização da Tela (80x24):**

```
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
 CERTIFICADO..: OBRIGATORIO. DEVERA ESTAR CADASTRADO.                          
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
                                                                               
 F1 -         F2 -         F3 - SAIDA   F4 -         F5 -         F6 -         
 F7 -         F8 -         F9 -         F10-         F11-         F12-         
```

#### **Campos da Tela:**
- Nenhum campo editável ou mapeado
- Apenas texto informativo estático

#### **Conteúdo da Ajuda:**

**Sobre o campo CERTIFICADO:**
- ✅ Campo **OBRIGATÓRIO**
- ✅ Deve estar previamente **CADASTRADO** no sistema
- ⚠️ Caso não esteja cadastrado, a consulta será rejeitada

#### **Teclas de Função:**

| Tecla | Ação |
|-------|------|
| F3 | SAIDA - Fecha a ajuda e retorna para VA2VM010 |
| Todas as outras | Não utilizadas |

---

## 🗺️ Mapeamento de Campos

### Campos Comuns (Cabeçalho)

Presentes em todas as telas principais:

| Campo | Código | Tipo | Descrição |
|-------|--------|------|-----------|
| MNUEMP | A | Read-only | Identificação da empresa/menu |
| DATA | B | Read-only | Data atual (formato: dd/mm/aaa) |
| NOMSIS | C | Read-only | Nome do sistema atual |
| HORA | D | Read-only | Hora atual (formato: hhmmsss) |
| GRUFUC | E | Read-only | Grupo de funções do usuário |
| EZEMSG | G/J | Read-only | Área de mensagens do sistema |

### Campos Específicos

#### VA2VM010 (Tela de Consulta)

| Campo | Código | Tipo | Obrigatório | Validações |
|-------|--------|------|-------------|------------|
| NUM_CERTIFICADO | F | Editável | Sim | Deve estar cadastrado |

#### VA2VM020 (Tela de Listagem)

| Campo | Código | Tipo | Repetição | Descrição |
|-------|--------|------|-----------|-----------|
| NUM_CERTIFICADO | F | Read-only | 1x | Certificado consultado |
| DATA_SOLICITACAO | G | Read-only | 24x | Data da solicitação |
| COD_USUARIO | H | Read-only | 24x | Usuário solicitante |
| SITUACAO | I | Read-only | 24x | Status da solicitação |

---

## 🔄 Fluxo de Navegação

```
┌─────────────┐
│  VA2VM010   │  ← Tela Inicial
│  (Consulta) │
└──────┬──────┘
       │
       ├─── F1 ───→ ┌─────────────┐
       │            │  VA2VH010   │
       │            │   (Ajuda)   │
       │            └─────────────┘
       │
       ├─── Enter ─→ ┌─────────────┐
       │             │  VA2VM020   │
       │             │ (Listagem)  │
       │             └──────┬──────┘
       │                    │
       └─── F3/F12 ─────────┴────→ Sair
```

---

## 📊 Estatísticas

- **Total de Telas**: 3
- **Total de Campos Editáveis**: 1 (NUM_CERTIFICADO)
- **Total de Campos Read-only**: 9 campos únicos
- **Teclas de Função Utilizadas**: 8 (F1, F3, F5, F7, F8, F12)
- **Telas com Help**: 1 (VA2VM010)
- **Telas com Grid/Paginação**: 1 (VA2VM020)

---

## 🎯 Requisitos para Migração

### Frontend (React + TypeScript)

#### VA2VM010 → ConsultaCertificadoForm.tsx
```typescript
interface ConsultaFormData {
  numCertificado: string; // Campo editável
}

// Componente deve implementar:
- Campo de entrada com validação
- Botão de consulta
- Link para ajuda contextual
- Feedback de erros
```

#### VA2VM020 → ListaSolicitacoesGrid.tsx
```typescript
interface SolicitacaoItem {
  dataSolicitacao: string;
  codUsuario: string;
  situacao: string;
}

// Componente deve implementar:
- TanStack Table com paginação
- Layout responsivo (mobile: 1 coluna, desktop: 2 colunas)
- Navegação com teclado
- Controles F7/F8 mapeados para prev/next
```

### Backend (.NET Core 8)

#### Endpoints Necessários

```csharp
// ConsultasController.cs

[HttpGet("consultas/certificado/{numCertificado}")]
public async Task<AppResponse<bool>> ValidarCertificado(string numCertificado);

[HttpGet("consultas/certificado/{numCertificado}/solicitacoes")]
public async Task<AppResponse<PagedResult<Solicitacao>>> ListarSolicitacoes(
    string numCertificado, 
    int page = 1, 
    int pageSize = 24
);
```

#### Domain/Dto

```csharp
public record Solicitacao
{
    public DateTime DataSolicitacao { get; init; }
    public string CodUsuario { get; init; } = string.Empty;
    public string Situacao { get; init; } = string.Empty;
}

public record PagedResult<T>
{
    public List<T> Items { get; init; } = new();
    public int Page { get; init; }
    public int PageSize { get; init; }
    public int TotalItems { get; init; }
    public int TotalPages { get; init; }
}
```

---

## 📝 Notas Técnicas

### Formato de Campos
- **DATA**: Formato mainframe `dd/mm/aaa` (ano com 3 dígitos)
- **HORA**: Formato mainframe `hhmmsss` (7 dígitos)
- **NUM_CERTIFICADO**: Comprimento variável, validação no backend

### Comportamento de Teclado
- **Enter**: Confirma entrada e avança para próxima tela
- **Tab**: Navega entre campos editáveis
- **F-Keys**: Ações especiais mapeadas

### Mensagens do Sistema
- Campo `EZEMSG` exibe mensagens de erro/sucesso
- Posicionado sempre no rodapé da tela
- Limpa automaticamente após nova ação

---

**Documentação gerada em**: ${new Date().toISOString()}  
**Ferramenta**: vamap.exe v2.0  
**Programa Analisado**: va2va.esf  
**Formato**: VisualAge COBOL Mainframe

