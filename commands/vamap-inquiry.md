---
description: Analisa funções de INQUIRY (SQL SELECT único) em arquivos ESF
tags: [vamap, inquiry, sql, select, cobol, database]
---

# Análise de INQUIRY

Analisa todas as funções que executam operações de INQUIRY (SQL SELECT para um único registro) no arquivo ESF especificado.

## Uso

```bash
.\vamap.exe _LEGADO/<arquivo>.esf :inquiry
```

## Saída

Lista todas as funções que contêm operações INQUIRY com:
- Nome da função
- Tipo da operação (INQUIRY)
- Tabelas consultadas
- Campos retornados

## Análise Detalhada

Para cada função INQUIRY identificada, você pode obter o código completo:

```bash
.\vamap.exe _LEGADO/<arquivo>.esf --code "<NOME_FUNCAO>"
```

## Exemplo

```bash
.\vamap.exe _LEGADO\vgfna.esf :inquiry
```

Resultado esperado:
```
VGFNP011 - INQUIRY em V0PRODUTOSVG
VGFNP012 - INQUIRY em V0APOLICE
VGFNP014 - INQUIRY em V0CLIENTE
...
```

## Informações Capturadas

1. **Identificação**: Nome e tipo da função
2. **Tabela**: Qual tabela SQL está sendo consultada
3. **Query SQL**: SELECT construído internamente
4. **Chave**: Campos usados na cláusula WHERE
5. **Campos Retornados**: Quais colunas são lidas
6. **Tratamento de Erros**: Funções de erro associadas
7. **Validações**: Verificações após a consulta

## Contexto

INQUIRY é usado quando você precisa:
- Buscar um registro específico por chave primária
- Validar existência de um registro
- Carregar dados para exibição ou processamento
- Verificar relacionamentos entre tabelas

## Análise para Migração

Para migração para C#/.NET, cada INQUIRY geralmente mapeia para:

### Repository Pattern
```csharp
public interface IProductRepository
{
    Task<Product> GetByIdAsync(string productId);
}
```

### Entity Framework
```csharp
var product = await _context.Products
    .AsNoTracking()
    .FirstOrDefaultAsync(p => p.ProductId == productId);
```

### Service Layer
```csharp
public async Task<ProductDto> GetProductAsync(string productId)
{
    var product = await _repository.GetByIdAsync(productId);
    if (product == null)
        throw new NotFoundException("Produto não encontrado");
    
    return _mapper.Map<ProductDto>(product);
}
```

### API REST
```csharp
[HttpGet("{id}")]
public async Task<ActionResult<ProductDto>> GetProduct(string id)
{
    var product = await _productService.GetProductAsync(id);
    return Ok(product);
}
```

## Workflow de Análise Completa

```bash
# 1. Listar todas as inquiries
.\vamap.exe _LEGADO\vgfna.esf :inquiry > inquiry_list.txt

# 2. Para cada inquiry, ver código
.\vamap.exe _LEGADO\vgfna.esf --code "VGFNP011" > inquiry_p011.txt
.\vamap.exe _LEGADO\vgfna.esf --code "VGFNP012" > inquiry_p012.txt

# 3. Ver estrutura das tabelas envolvidas
.\vamap.exe _LEGADO\vgfna.esf V0PRODUTOSVG\ > table_produtos.txt
.\vamap.exe _LEGADO\vgfna.esf V0APOLICE\ > table_apolice.txt

# 4. Criar documento de análise
# (Combine os arquivos em um documento de design)
```

## Padrões Comuns

### Pattern 1: Inquiry Simples
```
INQUIRY V0PRODUTOSVG
  WHERE COD_PRODUTO = <valor>
  
IF <não encontrado>
  MOVE "Produto não encontrado" TO MSG_ERRO
```

**Mapeamento C#:**
```csharp
var product = await _repository.GetByIdAsync(productId);
if (product == null)
    return NotFound("Produto não encontrado");
```

### Pattern 2: Inquiry com Validação
```
INQUIRY V0CLIENTE
  WHERE NUM_CLIENTE = <valor>
  
IF <encontrado>
  IF CLIENTE.STATUS <> 'A'
    MOVE "Cliente inativo" TO MSG_ERRO
```

**Mapeamento C#:**
```csharp
var client = await _repository.GetByIdAsync(clientId);
if (client != null && client.Status != "A")
    throw new BusinessException("Cliente inativo");
```

### Pattern 3: Inquiry com Join Lógico
```
INQUIRY V0APOLICE
  WHERE NUM_APOLICE = <valor>
  
IF <encontrado>
  INQUIRY V0CLIENTE
    WHERE NUM_CLIENTE = APOLICE.NUM_CLIENTE
```

**Mapeamento C#:**
```csharp
var policy = await _context.Policies
    .Include(p => p.Client)
    .FirstOrDefaultAsync(p => p.PolicyNumber == policyNumber);
```

## Checklist de Análise

- [ ] Identificar todas as funções INQUIRY
- [ ] Para cada INQUIRY:
  - [ ] Qual tabela é consultada?
  - [ ] Qual é a chave de busca?
  - [ ] Quais campos são usados após a consulta?
  - [ ] Existe tratamento para registro não encontrado?
  - [ ] Há validações após carregar os dados?
- [ ] Mapear para Repository methods
- [ ] Definir DTOs necessários
- [ ] Identificar relacionamentos entre tabelas
- [ ] Planejar API endpoints

## Otimizações Recomendadas

1. **AsNoTracking()**: Para queries read-only
2. **Projection**: Selecionar apenas campos necessários
3. **Caching**: Considerar cache para dados frequentes
4. **Async**: Sempre usar métodos assíncronos
5. **Error Handling**: Usar NotFoundExcemption consistente
6. **Logging**: Log de queries para debugging

