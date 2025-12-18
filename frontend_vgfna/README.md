# Frontend VGFNA - React + TypeScript

## 📋 Visão Geral

Frontend moderno para o sistema **VGFNA** (Alteração de Dados Básicos), migrado das telas 3270 legadas para uma aplicação React + TypeScript.

## 🗂️ Estrutura de Pastas

```
frontend_vgfna/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── common/          # Componentes comuns (botões, inputs, etc)
│   │   ├── forms/           # Componentes de formulário
│   │   └── layout/          # Componentes de layout
│   ├── pages/               # Páginas principais (mapeamento de telas)
│   │   ├── ConsultaApolice/     # TELA-0101 (VGFNM010)
│   │   ├── AlteracaoSubgrupo/   # TELA-0102 (VGFNM020)
│   │   └── AlteracaoTermoAdesao/ # TELA-0103 (VGFNM030)
│   ├── hooks/               # Custom hooks
│   ├── services/            # Serviços de API
│   ├── types/               # Definições TypeScript
│   ├── utils/               # Utilitários e helpers
│   ├── routes/              # Configuração de rotas
│   └── App.tsx              # Componente principal
├── public/
└── package.json
```

## 🎯 Mapeamento de Telas

| ID Matriz | Tela Legado | Componente React | Rota |
|-----------|-------------|-------------------|------|
| TELA-0101 | VGFNM010 | ConsultaApolicePage | `/consulta-apolice` |
| TELA-0102 | VGFNM020 | AlteracaoSubgrupoPage | `/alteracao-subgrupo` |
| TELA-0103 | VGFNM030 | AlteracaoTermoAdesaoPage | `/alteracao-termo-adesao` |

## 📚 Documentação Completa

### Validação e Rastreabilidade

1. **[Alinhamento com Matriz de Rastreabilidade](./docs/ALINHAMENTO_MATRIZ_RASTREABILIDADE.md)** ⭐⭐ **NOVO**
   - Alinhamento completo com `MATRIZ_RASTREABILIDADE_VGFNA.csv`
   - Mapeamento de todos os 67 elementos
   - Status de implementação por tipo

2. **[Matriz de Rastreabilidade Frontend](./docs/MATRIZ_RASTREABILIDADE_FRONTEND.md)** ⭐⭐ **NOVO**
   - Tabela completa de rastreabilidade
   - Mapeamento ID → Componente/Arquivo
   - Referências cruzadas

3. **[Validação As-Is](./docs/VALIDACAO_AS_IS.md)** ⭐
   - Validação completa frente à documentação As-Is
   - Mapeamento de campos e regras
   - Status de implementação

4. **[Regras de Negócio Completas](./docs/REGRAS_NEGOCIO_COMPLETAS.md)** ⭐
   - Todas as regras mapeadas da documentação As-Is
   - Comparação As-Is vs Frontend
   - Status de implementação

5. **[Campos TELA-0102](./docs/CAMPOS_TELA_0102.md)** ⭐
   - Detalhamento completo dos campos
   - Validações e proteções
   - Rastreabilidade

### Especificações Técnicas

4. **[Mapeamento de Telas](./docs/MAPEAMENTO_TELAS.md)**
   - Mapeamento detalhado TELA → Componente React
   - Rastreabilidade completa com matriz

5. **[Componentes](./docs/COMPONENTES.md)**
   - Documentação completa de todos os componentes
   - Props, uso e exemplos

6. **[Formulários e Validações](./docs/ESPECIFICACAO_FORMULARIOS_VALIDACOES.md)**
   - Especificação completa de formulários
   - Validações e regras de negócio
   - Feedback visual

7. **[Navegação e Roteamento](./docs/ESPECIFICACAO_NAVEGACAO_ROTEAMENTO.md)**
   - Fluxo de navegação entre telas
   - Configuração de rotas
   - Gerenciamento de estado

8. **[Integração com API](./docs/ESPECIFICACAO_INTEGRACAO_API.md)**
   - Endpoints e DTOs
   - Tratamento de erros
   - Padrões de comunicação

9. **[Design System e UI/UX](./docs/DESIGN_SYSTEM_UI_UX.md)**
   - Paleta de cores
   - Tipografia e espaçamento
   - Componentes visuais
   - Padrões de acessibilidade

10. **[Resumo da Criação](./docs/RESUMO_CRIACAO.md)**
    - Estatísticas do projeto
    - Checklist de implementação

11. **[Índice da Documentação](./docs/INDICE_DOCUMENTACAO.md)**
    - Índice completo de todos os documentos

## 🚀 Início Rápido

```bash
npm install
npm run dev
```

## 🔗 Integração com Backend

Base URL: `http://localhost:5000/api`

Endpoints:
- `POST /api/alteracao-dados-basicos/consultar-apolice`
- `PUT /api/alteracao-dados-basicos/alterar-subgrupo`
- `PUT /api/alteracao-dados-basicos/alterar-termo-adesao`

