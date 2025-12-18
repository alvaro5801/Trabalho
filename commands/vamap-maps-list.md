# Listar Todos os Mapas

Lista todos os mapas de tela (principal e ajuda) disponíveis no programa ESF.

## Como usar

```bash
.\vamap.exe _LEGADO\<nome-arquivo>.esf --map
```

## O que este comando faz

- Lista todos os mapas principais
- Associa cada mapa com seu help correspondente
- Numera os mapas para fácil referência
- Separa mapas regulares de mapas de ajuda

## Exemplo de uso

```bash
.\vamap.exe _LEGADO\va2va.esf --map
```

## Saída esperada

```
OPCAO MAPA      HELP
1     VA2VM010  VA2VH010  
2     VA2VM020

OPCAO HELP
3     VA2VH010
```

## Interpretação

**Mapas principais:**
- **VA2VM010** → Tem help associado (VA2VH010)
- **VA2VM020** → Sem help associado

**Mapas de ajuda:**
- **VA2VH010** → Help para VA2VM010

## Convenção de nomenclatura

Padrão típico mainframe:

- `XXXXMnnn` → Mapa principal (M = Map)
  - Exemplo: `VA2VM010`, `VA2VM020`
  
- `XXXXHnnn` → Mapa de help (H = Help)
  - Exemplo: `VA2VH010`

Onde:
- `XXXX` → Prefixo do sistema (ex: VA2V)
- `nnn` → Número sequencial (010, 020, 030...)

## Quando usar

- ✅ **Inventário**: Quantas telas o sistema tem?
- ✅ **Navegação**: Qual a sequência de telas?
- ✅ **Documentação**: Listar interfaces do sistema
- ✅ **Análise de UX**: Quais telas têm help?
- ✅ **Migração**: Planejar desenvolvimento de novas telas

## Fluxo de navegação típico

```
VA2VM010 (Entrada)
    ↓ ENTER
VA2VM020 (Resultado)
    ↓ F3/F12
VA2VM010 (Volta)
```

## Análise de completude

**Bons sinais:**
- ✅ Mapas principais têm help associado
- ✅ Nomenclatura consistente (M010, M020, M030)
- ✅ Sequência lógica de telas

**Pontos de atenção:**
- ⚠️ Mapas sem help (pode dificultar uso)
- ⚠️ Gaps na numeração (M010, M030 - falta M020?)
- ⚠️ Nomenclatura inconsistente

## Próximos passos

Após listar mapas, você pode:

```bash
# 1. Visualizar cada mapa
.\vamap.exe _LEGADO\va2va.esf --map "VA2VM010"
.\vamap.exe _LEGADO\va2va.esf --map "VA2VM020"

# 2. Ver mapas de help
.\vamap.exe _LEGADO\va2va.esf --map "VA2VH010"

# 3. Identificar funções que abrem cada mapa
# (Isso aparece na saída de --map "Nome")

# 4. Documentar fluxo completo
.\vamap.exe _LEGADO\va2va.esf --map > documentacao_telas.txt
```

## Gerando documentação completa

```bash
# PowerShell script para documentar todas as telas
$mapas = "VA2VM010", "VA2VM020", "VA2VH010"

foreach ($mapa in $mapas) {
    echo "`n`n========== $mapa ==========" >> telas_completas.txt
    .\vamap.exe _LEGADO\va2va.esf --map "$mapa" >> telas_completas.txt
}
```

## Relacionamento com código

Use `/vamap-types` para ver funções CONVERSE (apresentam telas):

```bash
.\vamap.exe _LEGADO\va2va.esf --code ":converse"
```

Isso mostra quais funções abrem quais telas.

