# Listar Funções por Tipo

Lista todas as funções de um tipo específico (INQUIRY, EXECUTE, CONVERSE, etc.) e opcionalmente exibe seu código.

## Como usar

**Listar funções de um tipo:**

```bash
.\vamap.exe _LEGADO\<nome-arquivo>.esf --code ":<TIPO_FUNCAO>"
```

**Ver código de todas as funções do tipo:**

```bash
.\vamap.exe _LEGADO\<nome-arquivo>.esf --code ":<TIPO_FUNCAO>[/]"
```

## Tipos de função disponíveis

- `inquiry` → Consultas SQL (SELECT single row)
- `setinq` → Setup de consultas (preparação de query)
- `scan` → Iteração sobre resultados (fetch)
- `execute` → Funções de processamento
- `converse` → Apresentação de telas
- `update` → Atualizações no banco
- `insert` → Inserções no banco
- `delete` → Deleções no banco

## Exemplo: Listar consultas SQL

```bash
.\vamap.exe _LEGADO\va2va.esf --code ":inquiry"
```

**Saída:**
```
VA2VP005 - Inquiry
VA2VP006 - Inquiry
VA2VP007 - Inquiry
```

## Exemplo: Ver código de todas as consultas

```bash
.\vamap.exe _LEGADO\va2va.esf --code ":inquiry[/]"
```

**Saída:** Código completo de VA2VP005, VA2VP006 e VA2VP007

## Quando usar

### :inquiry - Consultas SQL
- ✅ Mapear **acesso a dados**
- ✅ Identificar **tabelas consultadas**
- ✅ Documentar **queries** do sistema
- ✅ Otimizar **performance** (índices necessários?)

### :converse - Telas
- ✅ Listar **todas as telas** do sistema
- ✅ Mapear **navegação** entre telas
- ✅ Planejar **redesign de UI**

### :execute - Lógica de negócio
- ✅ Identificar **funções principais**
- ✅ Separar lógica de apresentação
- ✅ Planejar **camadas** na nova arquitetura

### :setinq e :scan - Consultas múltiplas
- ✅ Identificar **cursores** de banco
- ✅ Entender **paginação**
- ✅ Otimizar **queries complexas**

### :update, :insert, :delete - Modificações
- ✅ Mapear **operações de escrita**
- ✅ Identificar **transações**
- ✅ Planejar **auditoria e logs**

## Análise de arquitetura

```bash
# Camada de dados (quantas queries?)
.\vamap.exe _LEGADO\va2va.esf --code ":inquiry"
.\vamap.exe _LEGADO\va2va.esf --code ":setinq"

# Camada de apresentação (quantas telas?)
.\vamap.exe _LEGADO\va2va.esf --code ":converse"

# Camada de negócio (processamento)
.\vamap.exe _LEGADO\va2va.esf --code ":execute"

# Operações de escrita (modificações no BD)
.\vamap.exe _LEGADO\va2va.esf --code ":update"
.\vamap.exe _LEGADO\va2va.esf --code ":insert"
.\vamap.exe _LEGADO\va2va.esf --code ":delete"
```

## Exemplo de documentação automática

```bash
# Gerar inventário completo
echo "# INVENTÁRIO DE FUNÇÕES" > inventario.md
echo "" >> inventario.md

echo "## Consultas SQL" >> inventario.md
.\vamap.exe _LEGADO\va2va.esf --code ":inquiry" >> inventario.md

echo "" >> inventario.md
echo "## Telas (CONVERSE)" >> inventario.md
.\vamap.exe _LEGADO\va2va.esf --code ":converse" >> inventario.md

echo "" >> inventario.md
echo "## Lógica de Negócio (EXECUTE)" >> inventario.md
.\vamap.exe _LEGADO\va2va.esf --code ":execute" >> inventario.md
```

## Padrão de nomenclatura típico

No mainframe, funções geralmente seguem padrão:

- `*P00X` → Funções principais (P = Process)
- `*S00X` → Funções de validação (S = Screen/Validate)
- `*I00X` → Funções de inquiry (I = Inquiry)
- `*U00X` → Funções de update (U = Update)

## Próximos passos

- Usar `/vamap-function` para ver código de funções específicas
- Usar `/vamap-stack` para entender como tipos se relacionam
- Combinar com `/vamap-data` para mapear dados acessados

