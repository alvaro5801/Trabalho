# 📝 Exemplos Práticos - Projeto Groot

Exemplos reais usando os arquivos ESF disponíveis neste projeto.

## 📁 Arquivos Disponíveis

- `_LEGADO/va2va.esf` - Sistema de consulta de relatórios de certificados
- `_LEGADO/vgfna.esf` - Sistema de alteração de dados básicos

---

## 🎯 Exemplos com va2va.esf

### Exemplo 1: Entender o Sistema va2va

```bash
# Passo 1: Ver estrutura completa
.\vamap.exe _LEGADO\va2va.esf --code "|"
```

**Resultado:**
- VA2VP000 → Inicialização
- VA2VP001 → Loop principal
  - VA2VP002 → Tela de entrada (M10)
  - VA2VS002 → Validação
  - VA2VP003 → Tela de resultado (M20)
  - VA2VS003 → Navegação

**Conclusão:** Sistema com 2 telas, fluxo linear de consulta.

---

### Exemplo 2: Ver a Tela de Entrada

```bash
# Listar telas
.\vamap.exe _LEGADO\va2va.esf --map

# Ver layout da tela M10
.\vamap.exe _LEGADO\va2va.esf --map "VA2VM010"
```

**Resultado:**
```
CERTIFICADO......:               NUM_CERTIFICADO*
                                 ^
                                 |
                            Único campo editável
                            Recebe foco automaticamente
```

**Conclusão:** Interface simples - usuário digita certificado e aperta ENTER.

---

### Exemplo 3: Entender Validação de Entrada

```bash
# Ver código da validação
.\vamap.exe _LEGADO\va2va.esf --code "VA2VS002"
```

**Resultado mostra:**
1. Valida teclas (PF3, PF12, PF5, ENTER)
2. Valida se certificado foi informado
3. Busca certificado em SEGURADOS_VGAP
4. Busca produto em V0PRODUTOSVG
5. Define código de relatório (com regra especial para 2 apólices)
6. Carrega histórico de solicitações
7. Monta tela de resultado

**Conclusão:** Função crítica com toda a lógica de negócio.

---

### Exemplo 4: Análise de Impacto

**Cenário:** Preciso modificar a consulta SEGURADOS_VGAP

```bash
# Passo 1: Quem faz a consulta?
.\vamap.exe _LEGADO\va2va.esf --code ":inquiry"
# Resultado: VA2VP006

# Passo 2: Quem chama VA2VP006?
.\vamap.exe _LEGADO\va2va.esf --code "@VA2VP006"
# Resultado: Apenas VA2VS002

# Passo 3: Ver contexto
.\vamap.exe _LEGADO\va2va.esf --code "!VA2VS002"
# Resultado: VA2VP001 → VA2VP002 → VA2VS002

# Conclusão: Impacto baixo - só afeta validação da tela M10
```

---

### Exemplo 5: Encontrar Regra de Negócio

**Pergunta:** Onde está a regra das apólices 109300000709 e 3009300000709?

```bash
# Buscar número da apólice
.\vamap.exe _LEGADO\va2va.esf --code ";MOVE(109300000709)"
```

**Resultado:**
```
VA2VS002 - Execute
    IF SEGURADOS_VGAP.NUM_APOLICE EQ 109300000709 
    OR SEGURADOS_VGAP.NUM_APOLICE EQ 3009300000709;
      MOVE 'VA0568B1' TO V0RELATORIOS.CODRELAT;
    END;
```

**Conclusão:** Apólices Vida Mulher e Kinkas JV1 usam relatório especial VA0568B1.

---

### Exemplo 6: Mapear Banco de Dados

```bash
# Ver todas as estruturas
.\vamap.exe _LEGADO\va2va.esf --code "\"
```

**Resultado:**
- **Tabelas SQL (FUNCTION):**
  - SEGURADOS_VGAP → Dados do certificado
  - V0PRODUTOSVG → Configuração do produto
  - V0RELATORIOS → Histórico de solicitações
  - V1SISTEMA → Configurações gerais

- **Arrays internos (RECORD):**
  - VA2VW002 → Buffer de 200 registros para tela

**Conclusão:** Sistema acessa 4 tabelas, cache interno de 200 linhas.

---

### Exemplo 7: Ver Detalhes do Array

```bash
# Ver estrutura do buffer
.\vamap.exe _LEGADO\va2va.esf --code "VA2VW002\"
```

**Resultado:**
```
VA2VW002CODUSU   (Occurs: 200) - CHA(8 bytes)   ← Usuário
VA2VW002DTSOLIC  (Occurs: 200) - CHA(10 bytes)  ← Data
VA2VW002SIT      (Occurs: 200) - CHA(11 bytes)  ← Situação
```

**Conclusão:** 
- Capacidade: 200 solicitações por certificado
- Tamanho total: ~5.8 KB
- 24 linhas por tela = máximo 8 páginas

---

## 🎯 Exemplos com vgfna.esf

### Exemplo 8: Quantas Telas Tem?

```bash
.\vamap.exe _LEGADO\vgfna.esf --map
```

**Resultado:**
```
OPCAO MAPA      HELP
1     VGFNM010  VGFNH010  
2     VGFNM020  VGFNH020
3     VGFNM030  VGFNH030
```

**Conclusão:** 3 telas principais, cada uma com help próprio.

---

### Exemplo 9: Ver Tela com Múltiplos Campos

```bash
.\vamap.exe _LEGADO\vgfna.esf --map "VGFNM020"
```

**Resultado:**
```
APOLICE............: 000000000000F
SUBGRUPO...........: 0000H

-- DADOS CADASTRADOS --
PERIODO FATURAMENTO: 0J
FORMA   FATURAMENTO: L

-- DADOS DE SUBSTITUICAO --
PERIODO FATURAMENTO: 0N*  ← Foco aqui
FORMA   FATURAMENTO: O
```

**Conclusão:** 
- Tela de alteração (não consulta)
- Mostra dados atuais vs novos
- Foco no primeiro campo de substituição

---

## 🔧 Casos de Uso Reais

### Caso 1: Bug - Certificado não encontrado

**Problema:** Sistema diz "certificado não cadastrado" mas existe no banco.

```bash
# 1. Ver validação
.\vamap.exe _LEGADO\va2va.esf --code "VA2VS002"

# Achar o trecho:
# VA2VP006(); - consulta SEGURADOS_VGAP
# IF SEGURADOS_VGAP IS NRF;
#   MOVE 'CERTIFICADO NAO CADASTRADO.' TO VA2VM010.EZEMSG;

# 2. Ver a query
.\vamap.exe _LEGADO\va2va.esf --code "VA2VP006"

# Ver filtro:
# WHERE NUM_CERTIFICADO = ?NUM_CERTIFICADO
# AND TIPO_SEGURADO = '1'
#      ^^^^^^^^^^^^^^^
#      AH! Só busca tipo '1' (titular)!
```

**Solução:** Bug ou feature? Verificar requisito de negócio.

---

### Caso 2: Performance - Tela lenta

**Problema:** Tela M20 demora para carregar.

```bash
# 1. Ver função que monta tela
.\vamap.exe _LEGADO\va2va.esf --code "VA2VS002"

# Identificar trecho:
# VA2VP004(); - SETINQ V0RELATORIOS
# VA2VP008(); - SCAN
# WHILE V0RELATORIOS NOT NRF;
#   [carrega array]
#   VA2VP008(); - próximo registro
# END;

# 2. Ver a query
.\vamap.exe _LEGADO\va2va.esf --code "VA2VP004"

# Ver ORDER BY:
# ORDER BY DATA_SOLICITACAO DESC
#          ^^^^^^^^^^^^^^^^^^
# Sem índice? Performance ruim!
```

**Solução:** Criar índice em (NRCERTIF, CODRELAT, DATA_SOLICITACAO).

---

### Caso 3: Nova Feature - Adicionar filtro

**Requisito:** Filtrar por data na tela M10.

```bash
# 1. Ver tela atual
.\vamap.exe _LEGADO\va2va.esf --map "VA2VM010"
# Conclusão: Só tem campo CERTIFICADO

# 2. Ver validação
.\vamap.exe _LEGADO\va2va.esf --code "VA2VS002"
# Identificar onde adicionar validação de data

# 3. Ver query
.\vamap.exe _LEGADO\va2va.esf --code "VA2VP004"
# Modificar WHERE clause

# 4. Verificar impacto
.\vamap.exe _LEGADO\va2va.esf --code "@VA2VP004"
# Só usado em VA2VS002 → impacto controlado
```

---

### Caso 4: Documentação - Gerar doc completo

```bash
# Script PowerShell
$arquivo = "_LEGADO\va2va.esf"
$docs = "docs\va2va"

# Criar diretório
mkdir $docs -Force

# Arquitetura
.\vamap.exe $arquivo --code "|" > "$docs\arquitetura.txt"

# Telas
.\vamap.exe $arquivo --map > "$docs\telas_lista.txt"
.\vamap.exe $arquivo --map "VA2VM010" > "$docs\tela_m010.txt"
.\vamap.exe $arquivo --map "VA2VM020" > "$docs\tela_m020.txt"

# Dados
.\vamap.exe $arquivo --code "\" > "$docs\estruturas.txt"

# Banco
.\vamap.exe $arquivo --code ":inquiry" > "$docs\consultas_sql.txt"

# Erros
.\vamap.exe $arquivo --code "#" > "$docs\error_handlers.txt"
```

---

## 💡 Padrões Descobertos

### Padrão 1: Máquina de Estados

```bash
.\vamap.exe _LEGADO\va2va.esf --code ";MOVE(MOSTRA A TELA)"
```

**Resultado:**
```
MOVE 'MOSTRA A TELA M10' TO VA2VW001.W01A0035;
MOVE 'MOSTRA A TELA M20' TO VA2VW001.W01A0035;
```

**Padrão:** Controle de fluxo via string em variável.

---

### Padrão 2: Error Handler Padrão

```bash
.\vamap.exe _LEGADO\va2va.esf --code "ZZRCIN1"
```

**Padrão identificado:**
```
BEFORE:
  MOVE 'FuncaoX' TO ZZ99W01.PROCESSO;
  MOVE ' ' TO ZZ99W01.CHAVE;

AFTER:
  IF ZZ99W01.CHAVE EQ '1';
    [trata erro]
  END;
```

---

### Padrão 3: Paginação In-Memory

```bash
.\vamap.exe _LEGADO\va2va.esf --code "VA2VP009"
```

**Padrão:**
1. Carrega TODOS os registros em array (200 max)
2. Função de paginação copia 24 linhas por vez para tela
3. PF7/PF8 movem índice do array

**Limitação:** Máximo 200 registros (8 páginas).

---

## 🎓 Lições Aprendidas

### ✅ Sempre verificar filtros SQL

Muitas vezes a lógica está no WHERE, não no código COBOL.

### ✅ Arrays têm limites

VA2VW002 com 200 posições = limite de negócio.

### ✅ Regras hardcoded existem

Apólices 109300000709 e 3009300000709 têm tratamento especial.

### ✅ Estados controlam fluxo

String 'MOSTRA A TELA Mxx' funciona como state machine.

---

## 🔗 Próximos Passos

Após explorar estes exemplos:

1. Aplicar mesmas técnicas em outros arquivos ESF
2. Documentar todos os programas do projeto
3. Gerar diagrama de navegação entre telas
4. Mapear modelo de dados completo (todas as tabelas)
5. Planejar migração baseada na análise

---

**Dica:** Use estes exemplos como template para seus próprios comandos! 🚀

