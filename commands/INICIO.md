# 🎯 COMECE AQUI

## 👋 Bem-vindo aos Comandos vamap.exe

Você tem acesso a **11 comandos poderosos** para analisar código mainframe legado.

---

## ⚡ Início Rápido (3 minutos)

### 1️⃣ Ver o que o programa faz

```bash
.\vamap.exe _LEGADO\va2va.esf --code "|"
```

✅ Isso mostra TODAS as funções do programa hierarquicamente.

---

### 2️⃣ Ver as telas do programa

```bash
.\vamap.exe _LEGADO\va2va.esf --map
```

✅ Lista todas as telas disponíveis.

```bash
.\vamap.exe _LEGADO\va2va.esf --map "VA2VM010"
```

✅ Mostra o layout visual da tela.

---

### 3️⃣ Ver código de uma função

```bash
.\vamap.exe _LEGADO\va2va.esf --code "VA2VS002"
```

✅ Mostra o código completo da função.

---

## 📚 Próximos Passos

### Se você quer...

| Objetivo | Comando | Arquivo |
|----------|---------|---------|
| **Visão geral rápida** | Ver todos os comandos | [GUIA-RAPIDO.md](./GUIA-RAPIDO.md) |
| **Aprender na prática** | Ver exemplos reais | [EXEMPLOS-PROJETO.md](./EXEMPLOS-PROJETO.md) |
| **Documentação completa** | Ler referência | [README.md](./README.md) |

---

## 🎨 Mapa Visual dos Comandos

```
📊 VISÃO GERAL
│
├─ /vamap-stack ─────────→ Hierarquia de funções
├─ /vamap-types ─────────→ Funções por tipo
└─ /vamap-errors ────────→ Tratamento de erros

🔍 ANÁLISE DETALHADA
│
├─ /vamap-function ──────→ Código de função
├─ /vamap-callers ───────→ Quem chama (impacto!)
├─ /vamap-position ──────→ Contexto no stack
└─ /vamap-commands ──────→ Buscar MOVE, IF, etc.

💾 DADOS
│
└─ /vamap-data ──────────→ Estruturas, tabelas SQL

🖥️ INTERFACE
│
├─ /vamap-maps-list ─────→ Listar telas
└─ /vamap-map ───────────→ Ver layout da tela
```

---

## 🎯 Receita Padrão

**Para qualquer programa novo:**

```bash
# 1. Estrutura geral (1 min)
.\vamap.exe _LEGADO\programa.esf --code "|"

# 2. Ver telas (1 min)
.\vamap.exe _LEGADO\programa.esf --map

# 3. Ver dados (1 min)
.\vamap.exe _LEGADO\programa.esf --code "\"

# ✅ Em 3 minutos você tem visão 360° do programa!
```

---

## 💡 Dica de Ouro

> **Sempre use `/vamap-callers` antes de modificar código!**

```bash
.\vamap.exe _LEGADO\programa.esf --code "@FuncaoQueVouMudar"
```

Isso mostra quem depende da função → análise de impacto!

---

## 🆘 Ajuda

**Escolha seu perfil:**

### 👨‍💻 Desenvolvedor

1. Leia: [GUIA-RAPIDO.md](./GUIA-RAPIDO.md)
2. Pratique: [EXEMPLOS-PROJETO.md](./EXEMPLOS-PROJETO.md)
3. Use: Comandos diretamente

### 🏗️ Arquiteto

1. Leia: [README.md](./README.md) - seção "Casos de Uso por Papel"
2. Execute: Receita padrão em todos os programas
3. Documente: Salve resultados em arquivos

### 🧪 QA/Tester

1. Use: `/vamap-maps-list` para ver todas as telas
2. Use: `/vamap-map` para cada tela
3. Crie: Casos de teste baseados em campos

### 📖 Documentador

1. Execute: Receita padrão
2. Salve: Todos os resultados em `docs/`
3. Organize: Por programa, tela, função

---

## 📁 Estrutura dos Arquivos

```
.cursor/commands/
├─ INICIO.md           ← 🎯 VOCÊ ESTÁ AQUI
├─ GUIA-RAPIDO.md      ← ⚡ Menu visual rápido
├─ EXEMPLOS-PROJETO.md ← 📝 Exemplos práticos reais
├─ README.md           ← 📚 Documentação completa
│
└─ [11 arquivos de comandos individuais]
   ├─ vamap-stack.md
   ├─ vamap-function.md
   ├─ vamap-map.md
   ├─ vamap-data.md
   ├─ vamap-callers.md
   ├─ vamap-position.md
   ├─ vamap-errors.md
   ├─ vamap-commands.md
   ├─ vamap-types.md
   └─ vamap-maps-list.md
```

---

## 🚀 Comando Mais Importante

Se você só puder lembrar de **UM** comando:

```bash
.\vamap.exe _LEGADO\programa.esf --code "|"
```

☝️ Este comando sozinho te dá 80% da informação que você precisa!

---

## ⏱️ Investimento de Tempo

- **5 minutos:** Ler este arquivo
- **10 minutos:** Ler [GUIA-RAPIDO.md](./GUIA-RAPIDO.md)
- **20 minutos:** Praticar com [EXEMPLOS-PROJETO.md](./EXEMPLOS-PROJETO.md)
- **1 hora:** Ler [README.md](./README.md) completo

**Total:** ~2 horas para dominar todas as ferramentas!

---

## 🎓 Certificação Informal

Você dominou vamap.exe quando conseguir:

- ✅ Ver estrutura de qualquer programa em < 5 min
- ✅ Encontrar onde uma variável é usada
- ✅ Fazer análise de impacto antes de mudar código
- ✅ Documentar telas automaticamente
- ✅ Mapear banco de dados do programa

---

## 📞 Próximo Passo

**Agora vá para:** [GUIA-RAPIDO.md](./GUIA-RAPIDO.md)

🎯 Lá você encontra menu visual e receitas prontas!

---

**Última atualização:** 16/11/2025  
**Criado por:** Sistema de Comandos Cursor para Análise de Legado Mainframe

