# Visualizar Mapa de Tela

Renderiza visualmente um mapa de tela 3270, mostrando layout, campos e comportamento.

## Como usar

```bash
.\vamap.exe _LEGADO\<nome-arquivo>.esf --map "<NOME_MAPA>"
```

## O que este comando faz

- Renderiza layout visual ASCII da tela 24x80
- Lista todos os campos e suas posições
- Identifica campos editáveis vs read-only
- Mostra qual campo recebe foco inicial (*)
- Exibe teclas de função disponíveis
- Revela qual função abre este mapa

## Exemplo de uso

**Listar todos os mapas disponíveis:**

```bash
.\vamap.exe _LEGADO\va2va.esf --map
```

**Visualizar mapa específico:**

```bash
.\vamap.exe _LEGADO\va2va.esf --map "VA2VM010"
```

## Saída esperada

```
VA2VM010
--------------------------------------------------------------------------------
FUNCOES QUE ABREM ESTE MAPA:
>VA2VP002
--------------------------------------------------------------------------------
                    A   ADMINISTRACAO INTEGRADA DE SEGUROS         01/01/000B   
 VA2VM010      V 9                                      C            0000000D   
 
 CERTIFICADO......:               F                                             

                                                                             G  
 F1 - AJUDA   F2 -         F3 - SAIDA   F4 -         F5 - LIMPA   F6 -
 F7 -         F8 -         F9 -         F10-         F11-         F12- CANCELA  
--------------------------------------------------------------------------------
MAPEAMENTOS:
A - MNUEMP
B - DATA
C - NOMSIS
D - HORA
E - GRUFUC
F - NUM_CERTIFICADO*  ← Campo com foco
G - EZEMSG
--------------------------------------------------------------------------------
LEGENDA:
Campo editável.
Campo read-only sem tab.
* Campo com foco ao abrir a tela
--------------------------------------------------------------------------------
```

## Quando usar

- ✅ Documentar interfaces do sistema
- ✅ Entender UX/fluxo de navegação
- ✅ Planejar redesign de telas
- ✅ Gerar especificações de teste
- ✅ Migração de mainframe para web/mobile
- ✅ Treinamento de novos desenvolvedores

## Tipos de campos

- **Campo editável** → Usuário pode digitar
- **Campo read-only** → Apenas visualização
- **Campo com foco (*)** → Cursor inicia aqui

## Próximos passos

- Usar `/vamap-function` para ver código da função que abre a tela
- Usar `/vamap-data` para ver estruturas de dados dos campos
- Comparar mapas diferentes para entender navegação

