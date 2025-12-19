# Documentação de Funções e Regras de Negócio - VA2VA.ESF

## 📋 Índice
- [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
- [Fluxograma de Execução](#fluxograma-de-execução)
- [Funções Principais](#funções-principais)
- [Funções de Interface (Converse)](#funções-de-interface-converse)
- [Funções de Validação e Processamento](#funções-de-validação-e-processamento)
- [Funções de Acesso a Dados (SQL)](#funções-de-acesso-a-dados-sql)
- [Funções Utilitárias](#funções-utilitárias)
- [Regras de Negócio Consolidadas](#regras-de-negócio-consolidadas)
- [Mapeamento para Migração](#mapeamento-para-migração)

---

## 🎯 Visão Geral da Arquitetura

**Programa**: VA2VA.ESF  
**Finalidade**: Sistema de Consulta e Administração de Certificados de Seguros  
**Tipo**: Aplicação Mainframe VisualAge COBOL  
**Padrão**: MVC-like (Model-View-Controller adaptado para mainframe)

### Estrutura de Camadas

```
┌─────────────────────────────────────────┐
│     VA2VP000 - Inicialização           │
│     VA2VP001 - Loop Principal          │
└─────────────────┬───────────────────────┘
                  │
         ┌────────┴────────┐
         │                 │
    ┌────▼────┐      ┌────▼────┐
    │ VA2VP002│      │ VA2VP003│  ← Interface (Converse)
    │ Tela M10│      │ Tela M20│
    └────┬────┘      └────┬────┘
         │                │
    ┌────▼────┐      ┌────▼────┐
    │ VA2VS002│      │ VA2VS003│  ← Validação/Controle
    └────┬────┘      └────┬────┘
         │                │
         └────────┬────────┘
                  │
    ┌─────────────▼──────────────┐
    │  Funções de Acesso a Dados │
    │  VA2VP004 - SetInq         │
    │  VA2VP005 - Inquiry        │
    │  VA2VP006 - Inquiry        │
    │  VA2VP007 - Inquiry        │
    │  VA2VP008 - Scan           │
    └────────────────────────────┘
```

### Estatísticas

| Categoria | Quantidade |
|-----------|------------|
| **Funções Principais** | 2 |
| **Funções de Interface** | 2 |
| **Funções de Validação** | 2 |
| **Funções SQL** | 5 |
| **Funções Utilitárias** | 1 |
| **Total de Funções** | 12 |

---

## 🔄 Fluxograma de Execução

```
START
  │
  ▼
[VA2VP000] ← Inicialização
  │
  ├─ Configura ambiente
  ├─ Limpa telas
  ├─ Define flag: "MOSTRA A TELA M10"
  ├─ Consulta data do sistema (VA2VP005)
  │
  ▼
[VA2VP001] ← Loop Principal Infinito (WHILE 1=1)
  │
  ├─ WHILE flag = "MOSTRA A TELA M10"
  │   │
  │   ├─ [VA2VP002] Exibe Tela M10
  │   │
  │   ├─ [VA2VS002] Valida e Processa
  │   │   │
  │   │   ├─ Trata teclas F3/F5/F12
  │   │   ├─ Valida certificado
  │   │   ├─ Consulta SEGURADOS_VGAP (VA2VP006)
  │   │   ├─ Consulta V0PRODUTOSVG (VA2VP007)
  │   │   ├─ Prepara consulta relatórios (VA2VP004)
  │   │   ├─ Itera resultados (VA2VP008)
  │   │   └─ Muda flag: "MOSTRA A TELA M20"
  │   │
  │   └─ [volta ao loop]
  │
  ├─ WHILE flag = "MOSTRA A TELA M20"
  │   │
  │   ├─ [VA2VP003] Exibe Tela M20
  │   │
  │   ├─ [VA2VS003] Valida e Processa
  │   │   │
  │   │   ├─ Trata teclas F3/F7/F8/F12
  │   │   ├─ Pagina resultados (VA2VP009)
  │   │   └─ Pode mudar flag: "MOSTRA A TELA M10"
  │   │
  │   └─ [volta ao loop]
  │
  └─ [loop infinito continua]
```

---

## 🚀 Funções Principais

### VA2VP000 - Processo Inicial

#### **Metadados**
- **Tipo**: Execute
- **Data**: 11/21/2006 16:12:29
- **Descrição**: PROCESSO INICIAL
- **Chamado por**: Inicialização do programa

#### **Responsabilidade**
Inicializa o programa, configura ambiente e prepara a primeira tela.

#### **Código**
```cobol
MOVE 1 TO EZEFEC;
MOVE 1 TO EZECNVCM;
MOVE 'VA2V' TO EZESEGTR;
SET VA2VM010 CLEAR;
SET VA2VW001 EMPTY;
MOVE 'MOSTRA A TELA M10' TO VA2VW001.W01A0035;
MOVE 'VA2VA' TO ZZ99W01.CODAPL;
MOVE EZEUSRID TO ZZ99W01.CODUSU;
VA2VP005(); -- Inquiry (consulta data do sistema)
```

#### **Regras de Negócio**
1. ✅ **Inicialização de Flags**
   - Define `EZEFEC = 1` (flag de execução)
   - Define `EZECNVCM = 1` (flag de conversação)
   - Define `EZESEGTR = 'VA2V'` (segurança/transação)

2. ✅ **Limpeza de Estruturas**
   - Limpa mapa `VA2VM010` (primeira tela)
   - Limpa workstorage `VA2VW001`

3. ✅ **Definição de Fluxo Inicial**
   - Define flag `W01A0035 = 'MOSTRA A TELA M10'` → primeira tela a ser exibida

4. ✅ **Identificação de Usuário**
   - Captura código da aplicação: `CODAPL = 'VA2VA'`
   - Captura usuário logado: `CODUSU = EZEUSRID`

5. ✅ **Consulta Inicial do Sistema**
   - Chama `VA2VP005()` para obter data do sistema da tabela `V1SISTEMA`

#### **Mapeamento para Migração (.NET)**

```csharp
// Program.cs ou Startup
public class InicializacaoService(
    IUsuarioContexto usuarioContexto,
    ISistemaRepository sistemaRepository
) : IInicializacaoService
{
    public async Task<ConfiguracaoInicial> Inicializar()
    {
        var config = new ConfiguracaoInicial
        {
            CodigoAplicacao = "VA2VA",
            CodigoUsuario = usuarioContexto.ObterUsuarioAtual(),
            TelaInicial = "ConsultaCertificado", // equivalente a "MOSTRA A TELA M10"
            DataSistema = await sistemaRepository.ObterDataSistema("VA")
        };
        
        return config;
    }
}
```

---

### VA2VP001 - Processo Principal

#### **Metadados**
- **Tipo**: Execute
- **Data**: 11/21/2006 17:49:26
- **Descrição**: PROCESSO PRINCIPAL
- **Chamado por**: VA2VP000 (após inicialização)

#### **Responsabilidade**
Loop principal da aplicação que controla o fluxo entre telas baseado em flags.

#### **Código**
```cobol
WHILE 1 = 1;
  WHILE VA2VW001.W01A0035 EQ 'MOSTRA A TELA M10';
    VA2VP002(); -- Converse (exibe tela)
    VA2VS002(); -- Execute (processa)
  END;
  WHILE VA2VW001.W01A0035 EQ 'MOSTRA A TELA M20';
    VA2VP003(); -- Converse (exibe tela)
    VA2VS003(); -- Execute (processa)
  END;
END;
```

#### **Regras de Negócio**
1. ✅ **Loop Infinito**
   - Programa roda indefinidamente até comando explícito de saída
   - Padrão comum em aplicações mainframe interativas

2. ✅ **Controle de Fluxo por Flag**
   - Flag `W01A0035` controla qual tela exibir
   - Valores possíveis:
     - `'MOSTRA A TELA M10'` → Tela de consulta (VA2VM010)
     - `'MOSTRA A TELA M20'` → Tela de resultados (VA2VM020)

3. ✅ **Padrão Display-Process**
   - Para cada tela: primeiro exibe (Converse), depois processa (Execute)
   - Ciclo: Display → Usuário interage → Process → Display novamente

4. ✅ **Navegação entre Telas**
   - Funções de validação (`VA2VS00X`) alteram o flag para mudar de tela
   - Fluxo controlado, não permite navegação livre

#### **Mapeamento para Migração (React + TanStack Router)**

```typescript
// routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
});

// routes/consulta.tsx
export const Route = createFileRoute('/consulta')({
  component: ConsultaCertificadoScreen,
});

// routes/resultados/$certificado.tsx
export const Route = createFileRoute('/resultados/$certificado')({
  component: ResultadosSolicitacoesScreen,
  loader: async ({ params }) => {
    // Carregar dados das solicitações
    return await fetchSolicitacoes(params.certificado);
  },
});

// Navegação controlada:
const navigate = useNavigate();

// Equivalente a "MOSTRA A TELA M20"
navigate({ to: '/resultados/$certificado', params: { certificado } });

// Equivalente a "MOSTRA A TELA M10"
navigate({ to: '/consulta' });
```

---

## 🖥️ Funções de Interface (Converse)

### VA2VP002 - Apresenta Tela de Inclusão (M10)

#### **Metadados**
- **Tipo**: Converse
- **Data**: 11/21/2006 16:17:32
- **Objeto**: VA2VM010
- **Descrição**: APRESENTA TELA DE INCLUSAO
- **Chamado por**: VA2VP001 (loop principal)

#### **Responsabilidade**
Prepara e exibe a tela VA2VM010 (consulta de certificado) com dados do cabeçalho.

#### **Código**
```cobol
MOVE ZZ01W001.NOMSIS TO VA2VM010.NOMSIS;
MOVE ZZ01W001.GRUFUC TO VA2VM010.GRUFUC;
MOVE ZZ01W001.MNUEMP TO VA2VM010.MNUEMP;
MOVE EZEDTEL TO VA2VM010.DATA;
MOVE EZETIM TO VA2VM010.HORA;
```

#### **Regras de Negócio**
1. ✅ **Preenchimento de Cabeçalho**
   - `NOMSIS`: Nome do sistema (origem: ZZ01W001)
   - `GRUFUC`: Grupo de funções do usuário
   - `MNUEMP`: Menu/Empresa
   - `DATA`: Data atual do sistema (EZEDTEL)
   - `HORA`: Hora atual do sistema (EZETIM)

2. ✅ **Campos Read-Only**
   - Todos os campos de cabeçalho são apenas para visualização
   - Usuário não pode editar essas informações

3. ✅ **Campo Editável**
   - `NUM_CERTIFICADO`: único campo editável na tela
   - Recebe foco automaticamente ao abrir

#### **Mapeamento para Migração (React)**

```typescript
// presentation/components/ConsultaCertificadoForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUsuarioContexto } from '@/hooks/use-usuario-contexto';
import { useSistemaInfo } from '@/hooks/use-sistema-info';

const schema = z.object({
  numCertificado: z.string()
    .min(1, 'Certificado é obrigatório')
    .regex(/^\d+$/, 'Certificado deve conter apenas números'),
});

type FormData = z.infer<typeof schema>;

export function ConsultaCertificadoForm() {
  const { usuario } = useUsuarioContexto();
  const { data: sistemaInfo } = useSistemaInfo();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Navega para tela de resultados
    navigate({ 
      to: '/resultados/$certificado', 
      params: { certificado: data.numCertificado } 
    });
  };

  return (
    <div className="space-y-4">
      {/* Cabeçalho */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex justify-between text-sm">
          <span>{usuario.mnuemp}</span>
          <span>{sistemaInfo?.nomeSistema}</span>
          <span>{new Date().toLocaleDateString()}</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {usuario.grupoFuncoes}
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="numCertificado">Certificado:</label>
          <input
            {...register('numCertificado')}
            id="numCertificado"
            autoFocus
            className="w-full border rounded px-3 py-2"
          />
          {errors.numCertificado && (
            <span className="text-red-500">{errors.numCertificado.message}</span>
          )}
        </div>

        <div className="flex gap-2">
          <button type="submit">Consultar (Enter)</button>
          <button type="button" onClick={handleAjuda}>Ajuda (F1)</button>
          <button type="reset">Limpar (F5)</button>
          <button type="button" onClick={handleSair}>Sair (F3)</button>
        </div>
      </form>
    </div>
  );
}
```

---

### VA2VP003 - Mostra Mapa M20 (Resultados)

#### **Metadados**
- **Tipo**: Converse
- **Data**: 11/21/2006 17:48:31
- **Objeto**: VA2VM020
- **Descrição**: mostra mapa m010
- **Chamado por**: VA2VP001 (loop principal)

#### **Responsabilidade**
Prepara e exibe a tela VA2VM020 (listagem de solicitações) com dados do cabeçalho.

#### **Código**
```cobol
MOVE ZZ01W001.NOMSIS TO VA2VM020.NOMSIS;
MOVE ZZ01W001.GRUFUC TO VA2VM020.GRUFUC;
MOVE ZZ01W001.MNUEMP TO VA2VM020.MNUEMP;
MOVE EZEDTEL TO VA2VM020.DATA;
MOVE EZETIM TO VA2VM020.HORA;
```

#### **Regras de Negócio**
1. ✅ **Preenchimento de Cabeçalho**
   - Idêntico ao VA2VP002
   - Mantém contexto visual consistente entre telas

2. ✅ **Tela Read-Only**
   - Todos os campos são apenas visualização
   - Navegação via teclas F7/F8 para paginação

3. ✅ **Grid de Dados**
   - Dados preenchidos por `VA2VP009` (não nesta função)
   - Esta função apenas exibe a estrutura

#### **Mapeamento para Migração (React)**

```typescript
// presentation/components/ListaSolicitacoesGrid.tsx
import { useQuery } from '@tanstack/react-query';
import { usePagination } from '@/hooks/use-pagination';

interface SolicitacaoItem {
  dataSolicitacao: string;
  codUsuario: string;
  situacao: string;
}

export function ListaSolicitacoesGrid({ certificado }: { certificado: string }) {
  const { page, nextPage, prevPage } = usePagination();
  const { usuario } = useUsuarioContexto();
  const { data: sistemaInfo } = useSistemaInfo();

  const { data, isLoading } = useQuery({
    queryKey: ['solicitacoes', certificado, page],
    queryFn: () => fetchSolicitacoes(certificado, page, 24),
  });

  return (
    <div className="space-y-4">
      {/* Cabeçalho */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex justify-between text-sm">
          <span>{usuario.mnuemp}</span>
          <span>{sistemaInfo?.nomeSistema}</span>
          <span>{new Date().toLocaleDateString()}</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Certificado consultado */}
      <div className="font-semibold">
        Certificado: {certificado}
      </div>

      {/* Grid com TanStack Table */}
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
      />

      {/* Paginação */}
      <div className="flex gap-2">
        <button onClick={prevPage} disabled={page === 1}>
          ← Retorna (F7)
        </button>
        <button onClick={nextPage} disabled={!data?.hasMore}>
          Avança (F8) →
        </button>
        <button onClick={handleVoltar}>Voltar (F12)</button>
      </div>
    </div>
  );
}
```

---

## ✅ Funções de Validação e Processamento

### VA2VS002 - Testa PF (Teclas de Função) - Tela M10

#### **Metadados**
- **Tipo**: Execute
- **Data**: 02/04/2019 18:43:30
- **Descrição**: TESTA PF
- **Chamado por**: VA2VP001 (após VA2VP002)

#### **Responsabilidade**
Processa entrada do usuário na tela M10, valida dados e executa consultas SQL.

#### **Código Completo**
```cobol
IF EZEAID IS PF3;
  ZZ01SGPS3(); -- Sair
END;

IF EZEAID IS PF12;
  ZZ01SGPS12(); -- Cancelar
END;

IF EZEAID IS PF5;
  SET VA2VM010 CLEAR;
  EZERTN();
END;

IF EZEAID NOT ENTER;
  MOVE 'TECLA INVALIDA' TO VA2VM010.EZEMSG;
  EZERTN();
END;

IF VA2VM010.NUM_CERTIFICADO EQ 0;
  MOVE 'INFORME O CERTIFICADO.' TO VA2VM010.EZEMSG;
  SET VA2VM010.NUM_CERTIFICADO BRIGHT;
  MOVE 'MOSTRA A TELA M10' TO VA2VW001.W01A0035;
  EZEFLO;
END;

MOVE VA2VM010.NUM_CERTIFICADO TO SEGURADOS_VGAP.NUM_CERTIFICADO;
VA2VP006(); -- Inquiry (valida certificado)

IF SEGURADOS_VGAP IS NRF;
  MOVE 'CERTIFICADO NAO CADASTRADO.' TO VA2VM010.EZEMSG;
  MOVE 'MOSTRA A TELA M10' TO VA2VW001.W01A0035;
  EZEFLO;
END;

MOVE SEGURADOS_VGAP.NUM_APOLICE TO V0PRODUTOSVG.NUM_APOLICE;
MOVE SEGURADOS_VGAP.COD_SUBGRUPO TO V0PRODUTOSVG.CODSUBES;
VA2VP007(); -- Inquiry (busca produto)

IF V0PRODUTOSVG IS NRF;
  MOVE 'VG0420B' TO V0PRODUTOSVG.CODRELAT;
  MOVE 'VG' TO V0PRODUTOSVG.IDSISTEM;
  MOVE 'ESP' TO V0PRODUTOSVG.CODPRODAZ;
END;

MOVE VA2VM010.NUM_CERTIFICADO TO V0RELATORIOS.NRCERTIF;

IF V0PRODUTOSVG.CODRELAT EQ ' ';
  MOVE 'VG5001B' TO V0RELATORIOS.CODRELAT;
ELSE;
  MOVE V0PRODUTOSVG.CODRELAT TO V0RELATORIOS.CODRELAT;
END;

IF SEGURADOS_VGAP.NUM_APOLICE EQ 109300000709 OR 
   SEGURADOS_VGAP.NUM_APOLICE EQ 3009300000709;
  MOVE 'VA0568B1' TO V0RELATORIOS.CODRELAT;
END;

VA2VP004(); -- SetInq (prepara consulta de relatórios)
VA2VP008(); -- Scan (busca primeiro registro)

MOVE 0 TO VA2VW001IND;
WHILE V0RELATORIOS NOT NRF;
  VA2VW001IND = VA2VW001IND + 1;
  MOVE V0RELATORIOS.CODUSU TO VA2VW002.VA2VW002CODUSU[VA2VW001IND];
  MOVE V0RELATORIOS.DATA_SOLICITACAO TO VA2VW002.VA2VW002DTSOLIC[VA2VW001IND];
  
  IF V0RELATORIOS.SITUACAO EQ '0';
    MOVE 'PENDENTE' TO VA2VW002.VA2VW002SIT[VA2VW001IND];
  END;
  
  IF V0RELATORIOS.SITUACAO EQ '1';
    MOVE 'ENV. P/ IMP' TO VA2VW002.VA2VW002SIT[VA2VW001IND];
  END;
  
  VA2VP008(); -- Scan (próximo registro)
END;

VA2VP009(); -- Execute (preenche tela M20)
MOVE 'MOSTRA A TELA M20' TO VA2VW001.W01A0035;
```

#### **Regras de Negócio Detalhadas**

##### **1. Tratamento de Teclas de Função**

| Tecla | Ação | Regra |
|-------|------|-------|
| **F3** | Sair da aplicação | Chama função `ZZ01SGPS3()` para encerrar programa |
| **F12** | Cancelar operação | Chama função `ZZ01SGPS12()` para cancelar |
| **F5** | Limpar tela | Limpa todos os campos de `VA2VM010` e retorna |
| **Outras** | Inválida | Exibe "TECLA INVALIDA" e retorna |
| **Enter** | Processar | Continua execução (validação e consulta) |

##### **2. Validação de Entrada**

```
┌─────────────────────────────────────────┐
│ Validação 1: Certificado Obrigatório   │
└─────────────────────────────────────────┘
  ↓
  IF NUM_CERTIFICADO = 0
    ├─ Exibe: "INFORME O CERTIFICADO."
    ├─ Destaca campo (BRIGHT)
    ├─ Mantém flag: "MOSTRA A TELA M10"
    └─ Retorna para a tela
```

##### **3. Validação de Certificado no Banco**

```sql
-- VA2VP006: Consulta SEGURADOS_VGAP
SELECT NUM_APOLICE, COD_SUBGRUPO, SIT_REGISTRO
  FROM SEGURADOS_VGAP
 WHERE NUM_CERTIFICADO = ?NUM_CERTIFICADO
   AND TIPO_SEGURADO = '1'
```

**Regra:**
- ✅ Se encontrado: continua processamento
- ❌ Se NÃO encontrado (NRF - Not Found):
  - Exibe: "CERTIFICADO NAO CADASTRADO."
  - Mantém na tela M10
  - Retorna (EZEFLO)

##### **4. Busca de Produto Associado**

```sql
-- VA2VP007: Consulta V0PRODUTOSVG
SELECT IDSISTEM, CODPRODAZ, CODPRODU, TEM_SAF, CODRELAT
  FROM V0PRODUTOSVG
 WHERE NUM_APOLICE = ?NUM_APOLICE
   AND CODSUBES = ?CODSUBES
```

**Regra:**
- ✅ Se encontrado: usa `CODRELAT` do produto
- ❌ Se NÃO encontrado:
  - Define valores padrão:
    - `CODRELAT = 'VG0420B'`
    - `IDSISTEM = 'VG'`
    - `CODPRODAZ = 'ESP'`

##### **5. Determinação do Código de Relatório**

```
┌─────────────────────────────────────────────────────┐
│ Lógica de Determinação do CODRELAT                  │
└─────────────────────────────────────────────────────┘
  ↓
  1. Se V0PRODUTOSVG.CODRELAT está vazio:
     └─ CODRELAT = 'VG5001B' (padrão geral)
  
  2. Senão, usa V0PRODUTOSVG.CODRELAT
  
  3. EXCEÇÃO: Apólices específicas:
     ├─ 109300000709 ou
     └─ 3009300000709
     └─ CODRELAT = 'VA0568B1' (sobrescreve qualquer valor)
```

**Regra de Negócio:**
- ⚠️ Apólices `109300000709` e `3009300000709` têm relatório customizado
- ✅ Estas apólices sempre usam `VA0568B1`, independente do produto

##### **6. Busca de Solicitações de Relatórios**

```sql
-- VA2VP004: Prepara consulta (SetInq)
SELECT CODUSU, DATA_SOLICITACAO, SITUACAO
  FROM V0RELATORIOS
 WHERE NRCERTIF = ?NRCERTIF
   AND CODRELAT = ?CODRELAT
 ORDER BY DATA_SOLICITACAO DESC
```

**Regra:**
- Busca todas as solicitações deste certificado
- Filtro adicional por tipo de relatório (`CODRELAT`)
- Ordenação: mais recentes primeiro (DESC)

##### **7. Processamento de Resultados**

```
VA2VW001IND = 0 (contador)
WHILE V0RELATORIOS NOT NRF (enquanto houver registros)
  ↓
  VA2VW001IND++
  ↓
  Armazena em array temporário:
  ├─ VA2VW002.VA2VW002CODUSU[índice] = CODUSU
  ├─ VA2VW002.VA2VW002DTSOLIC[índice] = DATA_SOLICITACAO
  └─ VA2VW002.VA2VW002SIT[índice] = Situação traduzida
  
  Tradução de Situação:
  ├─ '0' → 'PENDENTE'
  └─ '1' → 'ENV. P/ IMP' (Enviado para Impressão)
  
  VA2VP008() -- Próximo registro
END
```

**Regra:**
- Array pode conter até 200 registros (limite do OCCURS)
- Situação é traduzida de código para texto legível
- Todos os registros são carregados em memória antes de exibir

##### **8. Finalização**

```
VA2VP009() -- Preenche tela M20 com primeiros 24 registros
MOVE 'MOSTRA A TELA M20' TO VA2VW001.W01A0035 -- Muda para tela de resultados
```

#### **Mapeamento para Migração (.NET Backend)**

```csharp
// Application/Services/ConsultaCertificadoService.cs
public class ConsultaCertificadoService(
    IConsultarCertificadoViewModel viewModel,
    ILogger<ConsultaCertificadoService> logger
) : IConsultaCertificadoService
{
    public async Task<AppResponse<ResultadoConsulta>> ConsultarCertificado(
        ConsultaCertificadoRequest request)
    {
        var response = new AppResponse<ResultadoConsulta>();
        try
        {
            // Validação 1: Certificado obrigatório
            if (string.IsNullOrWhiteSpace(request.NumCertificado) || 
                request.NumCertificado == "0")
            {
                response.IsSuccess = false;
                response.Message = "INFORME O CERTIFICADO.";
                return response;
            }

            // ViewModel contém a lógica de negócio
            response.Data = await viewModel.ConsultarCertificado(request);
            response.IsSuccess = true;
            response.Message = "Consulta realizada com sucesso";
        }
        catch (CertificadoNaoCadastradoException)
        {
            response.IsSuccess = false;
            response.Message = "CERTIFICADO NAO CADASTRADO.";
        }
        catch (Exception ex)
        {
            response.IsSuccess = false;
            response.Message = "Erro ao consultar certificado";
            response.StackTrace = ex.Message;
            logger.LogError(ex, "Erro em ConsultarCertificado");
        }
        return response;
    }
}

// Application/ViewModels/ConsultarCertificadoViewModel.cs
public class ConsultarCertificadoViewModel(
    ISeguradoRepository seguradoRepository,
    IProdutoRepository produtoRepository,
    IRelatorioRepository relatorioRepository
) : IConsultarCertificadoViewModel
{
    public async Task<ResultadoConsulta> ConsultarCertificado(
        ConsultaCertificadoRequest request)
    {
        // Validação 2: Certificado existe?
        var segurado = await seguradoRepository.GetByCertificado(
            request.NumCertificado, 
            tipoSegurado: "1"
        );
        
        if (segurado == null)
            throw new CertificadoNaoCadastradoException();

        // Buscar produto associado
        var produto = await produtoRepository.GetByApoliceSubgrupo(
            segurado.NumApolice,
            segurado.CodSubgrupo
        );

        // Determinar código de relatório
        var codRelat = DeterminarCodigoRelatorio(segurado, produto);

        // Buscar solicitações
        var solicitacoes = await relatorioRepository.GetSolicitacoes(
            request.NumCertificado,
            codRelat
        );

        return new ResultadoConsulta
        {
            NumCertificado = request.NumCertificado,
            NumApolice = segurado.NumApolice,
            CodSubgrupo = segurado.CodSubgrupo,
            CodigoRelatorio = codRelat,
            Solicitacoes = solicitacoes.Select(s => new SolicitacaoDto
            {
                CodUsuario = s.CodUsuario,
                DataSolicitacao = s.DataSolicitacao,
                Situacao = TraduzirSituacao(s.Situacao)
            }).ToList()
        };
    }

    private string DeterminarCodigoRelatorio(Segurado segurado, Produto? produto)
    {
        // Regra especial: apólices específicas
        if (segurado.NumApolice == "109300000709" || 
            segurado.NumApolice == "3009300000709")
        {
            return "VA0568B1";
        }

        // Produto não encontrado: padrão
        if (produto == null)
        {
            return "VG0420B";
        }

        // Código vazio: padrão geral
        if (string.IsNullOrWhiteSpace(produto.CodRelat))
        {
            return "VG5001B";
        }

        // Usa código do produto
        return produto.CodRelat;
    }

    private string TraduzirSituacao(string codigoSituacao) => codigoSituacao switch
    {
        "0" => "PENDENTE",
        "1" => "ENV. P/ IMP",
        _ => codigoSituacao
    };
}
```

---

### VA2VS003 - Consiste Mapa M20 (Paginação)

#### **Metadados**
- **Tipo**: Execute
- **Data**: 11/21/2006 18:09:46
- **Descrição**: consiste mapa m010
- **Chamado por**: VA2VP001 (após VA2VP003)

#### **Responsabilidade**
Processa teclas de navegação na tela M20 (paginação e retorno).

#### **Código Completo**
```cobol
IF EZEAID IS PF3 OR EZEAID IS PF12;
  MOVE 'MOSTRA A TELA M10' TO VA2VW001.W01A0035;
  SET VA2VW002 EMPTY;
  EZEFLO;
END;

IF EZEAID IS PF7;
  VA2VW001IND2 = VA2VW001IND2 - 48;
  IF VA2VW001IND2 LT 0;
    MOVE 25 TO VA2VW001IND2;
    MOVE 'PRIMEIRA PAGINA' TO VA2VM020.EZEMSG;
  ELSE;
    VA2VP009(); -- Execute (atualiza tela)
  END;
  EZERTN();
END;

IF EZEAID IS PF8;
  IF VA2VW001IND2 GE VA2VW001IND OR VA2VM020.DATA_SOLICITACAO[24] EQ '  ';
    MOVE 'ULTIMA PAGINA' TO VA2VM020.EZEMSG;
  ELSE;
    VA2VP009(); -- Execute (atualiza tela)
  END;
  EZERTN();
END;
```

#### **Regras de Negócio Detalhadas**

##### **1. Retorno para Tela Inicial**

| Tecla | Ação |
|-------|------|
| **F3** ou **F12** | Volta para tela M10, limpa array de dados, retorna |

**Regra:**
- ✅ Limpa estrutura `VA2VW002` (array de solicitações)
- ✅ Define flag: "MOSTRA A TELA M10"
- ✅ Retorna ao loop principal (EZEFLO)

##### **2. Paginação: Página Anterior (F7)**

```
┌─────────────────────────────────────────┐
│ Lógica de Página Anterior (F7)         │
└─────────────────────────────────────────┘
  ↓
  VA2VW001IND2 = VA2VW001IND2 - 48
  (retrocede 48 registros = 2 páginas de 24)
  ↓
  IF VA2VW001IND2 < 0 (antes do início)
    ├─ Reposiciona: VA2VW001IND2 = 25
    ├─ Exibe: "PRIMEIRA PAGINA"
    └─ Não chama VA2VP009
  ELSE
    └─ Chama VA2VP009() para atualizar tela
  
  EZERTN() -- Retorna
```

**Regra:**
- ⚠️ Subtrai 48 (não 24!) por causa do layout duplo da tela
- ✅ Impede navegação antes do início
- ✅ Mensagem clara quando na primeira página

##### **3. Paginação: Próxima Página (F8)**

```
┌─────────────────────────────────────────┐
│ Lógica de Próxima Página (F8)          │
└─────────────────────────────────────────┘
  ↓
  IF VA2VW001IND2 >= VA2VW001IND (fim dos dados)
  OR VA2VM020.DATA_SOLICITACAO[24] = '  ' (última linha vazia)
    ├─ Exibe: "ULTIMA PAGINA"
    └─ Não chama VA2VP009
  ELSE
    └─ Chama VA2VP009() para atualizar tela
  
  EZERTN() -- Retorna
```

**Regra:**
- ✅ Verifica se há mais dados (índice vs total)
- ✅ Verifica se última linha visível está vazia
- ✅ Impede navegação além do fim
- ✅ Mensagem clara quando na última página

##### **4. Variáveis de Controle de Paginação**

| Variável | Significado |
|----------|-------------|
| `VA2VW001IND` | Total de registros carregados (máx 200) |
| `VA2VW001IND2` | Índice do primeiro registro exibido na tela |
| `EZETST` | Tamanho da tela (24 registros visíveis) |

#### **Mapeamento para Migração (React Frontend)**

```typescript
// presentation/hooks/use-paginacao-solicitacoes.ts
import { useState } from 'react';

interface UsePaginacaoOptions {
  totalItems: number;
  pageSize: number; // 24 para manter padrão mainframe
}

export function usePaginacaoSolicitacoes({ totalItems, pageSize }: UsePaginacaoOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / pageSize);

  const nextPage = () => {
    if (currentPage >= totalPages) {
      toast.info('ULTIMA PAGINA');
      return;
    }
    setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage <= 1) {
      toast.info('PRIMEIRA PAGINA');
      return;
    }
    setCurrentPage(prev => prev - 1);
  };

  const goToFirstPage = () => setCurrentPage(1);

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToFirstPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

// presentation/components/ListaSolicitacoesGrid.tsx
export function ListaSolicitacoesGrid({ certificado }: Props) {
  const navigate = useNavigate();
  
  const { data: solicitacoes } = useQuery({
    queryKey: ['solicitacoes', certificado],
    queryFn: () => fetchTodasSolicitacoes(certificado),
  });

  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToFirstPage,
    hasNextPage,
    hasPrevPage,
  } = usePaginacaoSolicitacoes({
    totalItems: solicitacoes?.length ?? 0,
    pageSize: 24,
  });

  // Dados paginados client-side (como no mainframe)
  const startIndex = (currentPage - 1) * 24;
  const endIndex = startIndex + 24;
  const paginatedData = solicitacoes?.slice(startIndex, endIndex) ?? [];

  const handleVoltar = () => {
    goToFirstPage();
    navigate({ to: '/consulta' });
  };

  // Atalhos de teclado (F7/F8)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F7') {
        e.preventDefault();
        prevPage();
      }
      if (e.key === 'F8') {
        e.preventDefault();
        nextPage();
      }
      if (e.key === 'F3' || e.key === 'F12') {
        e.preventDefault();
        handleVoltar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevPage, nextPage, handleVoltar]);

  return (
    <div>
      <DataTable data={paginatedData} columns={columns} />
      
      <div className="flex justify-between mt-4">
        <button 
          onClick={prevPage} 
          disabled={!hasPrevPage}
          className="btn"
        >
          ← Retorna (F7)
        </button>
        
        <span>
          Página {currentPage} de {totalPages}
        </span>
        
        <button 
          onClick={nextPage} 
          disabled={!hasNextPage}
          className="btn"
        >
          Avança (F8) →
        </button>
      </div>
      
      <button onClick={handleVoltar} className="btn mt-2">
        Voltar (F3/F12)
      </button>
    </div>
  );
}
```

---

## 🗄️ Funções de Acesso a Dados (SQL)

### VA2VP004 - Prepara Consulta de Relatórios (SetInq)

#### **Metadados**
- **Tipo**: SetInq
- **Data**: 02/12/2007 12:04:31
- **Objeto**: V0RELATORIOS
- **Descrição**: chama aplicacao faixa salarial
- **Error Function**: ZZRCIN1

#### **Responsabilidade**
Prepara cursor SQL para buscar todas as solicitações de relatórios de um certificado.

#### **SQL**
```sql
SELECT CODUSU, DATA_SOLICITACAO, SITUACAO
  INTO ?CODUSU, ?DATA_SOLICITACAO, ?SITUACAO
  FROM V0RELATORIOS
 WHERE NRCERTIF = ?NRCERTIF
   AND CODRELAT = ?CODRELAT
 ORDER BY DATA_SOLICITACAO DESC
```

#### **Regras de Negócio**
1. ✅ **Filtragem**
   - Por certificado (`NRCERTIF`)
   - Por tipo de relatório (`CODRELAT`)

2. ✅ **Ordenação**
   - Mais recentes primeiro (DESC)
   - Garante que solicitações novas apareçam no topo

3. ✅ **Tratamento de Erro**
   - Se falha no banco: chama `ZZRCIN1`
   - Exibe: "PROBLEMAS NO ACESSO AO BANCO DE DADOS"
   - Retorna para tela M10

#### **Mapeamento para Migração (.NET)**

```csharp
// Infra/Repositories/RelatorioRepository.cs
public class RelatorioRepository(IDbConnection connection) : IRelatorioRepository
{
    public async Task<IEnumerable<Solicitacao>> GetSolicitacoes(
        string numCertificado,
        string codRelatorio)
    {
        const string sql = @"
            SELECT CODUSU as CodUsuario,
                   DATA_SOLICITACAO as DataSolicitacao,
                   SITUACAO as Situacao
              FROM V0RELATORIOS
             WHERE NRCERTIF = @NumCertificado
               AND CODRELAT = @CodRelatorio
             ORDER BY DATA_SOLICITACAO DESC";

        return await connection.QueryAsync<Solicitacao>(sql, new
        {
            NumCertificado = numCertificado,
            CodRelatorio = codRelatorio
        });
    }
}
```

---

### VA2VP005 - Consulta Data do Sistema (Inquiry)

#### **Metadados**
- **Tipo**: Inquiry
- **Data**: 11/21/2006 17:57:05
- **Objeto**: V1SISTEMA
- **Error Function**: ZZRCIN2
- **Single Row**: Yes

#### **Responsabilidade**
Consulta informações do sistema, especialmente data de abertura.

#### **SQL**
```sql
SELECT IDSISTEM, DTMOVABE
  INTO ?IDSISTEM, ?DTMOVABE
  FROM V1SISTEMA
 WHERE IDSISTEM = 'VA'
```

#### **Regras de Negócio**
1. ✅ **Sistema Específico**
   - Sempre consulta `IDSISTEM = 'VA'`
   - Sistema de Vida/Acidentes Pessoais

2. ✅ **Data de Movimento Aberto**
   - `DTMOVABE`: Data do movimento em aberto
   - Usado para validações de datas

#### **Mapeamento para Migração (.NET)**

```csharp
// Infra/Repositories/SistemaRepository.cs
public class SistemaRepository(IDbConnection connection) : ISistemaRepository
{
    public async Task<SistemaInfo?> ObterDataSistema(string idSistema)
    {
        const string sql = @"
            SELECT IDSISTEM as IdSistema,
                   DTMOVABE as DataMovimentoAberto
              FROM V1SISTEMA
             WHERE IDSISTEM = @IdSistema";

        return await connection.QueryFirstOrDefaultAsync<SistemaInfo>(
            sql, 
            new { IdSistema = idSistema }
        );
    }
}
```

---

### VA2VP006 - Valida Certificado (Inquiry)

#### **Metadados**
- **Tipo**: Inquiry
- **Data**: 11/23/2006 12:23:43
- **Objeto**: SEGURADOS_VGAP
- **Error Function**: ZZRCIN1
- **Single Row**: Yes

#### **Responsabilidade**
Valida se o certificado existe e está ativo no sistema.

#### **SQL**
```sql
SELECT NUM_APOLICE, COD_SUBGRUPO, SIT_REGISTRO
  INTO ?NUM_APOLICE, ?COD_SUBGRUPO, ?SIT_REGISTRO
  FROM SEGURADOS_VGAP
 WHERE NUM_CERTIFICADO = ?NUM_CERTIFICADO
   AND TIPO_SEGURADO = '1'
```

#### **Regras de Negócio**
1. ✅ **Validação de Existência**
   - Certificado deve existir na tabela `SEGURADOS_VGAP`
   - Se não existe (NRF): erro "CERTIFICADO NAO CADASTRADO"

2. ✅ **Filtro por Tipo**
   - Apenas `TIPO_SEGURADO = '1'`
   - Provavelmente: Titular (não dependentes)

3. ✅ **Informações Retornadas**
   - `NUM_APOLICE`: Para buscar produto
   - `COD_SUBGRUPO`: Para identificar subgrupo
   - `SIT_REGISTRO`: Situação do registro (não validada no código)

#### **Mapeamento para Migração (.NET)**

```csharp
// Infra/Repositories/SeguradoRepository.cs
public class SeguradoRepository(IDbConnection connection) : ISeguradoRepository
{
    public async Task<Segurado?> GetByCertificado(
        string numCertificado,
        string tipoSegurado = "1")
    {
        const string sql = @"
            SELECT NUM_APOLICE as NumApolice,
                   COD_SUBGRUPO as CodSubgrupo,
                   SIT_REGISTRO as SitRegistro,
                   NUM_CERTIFICADO as NumCertificado
              FROM SEGURADOS_VGAP
             WHERE NUM_CERTIFICADO = @NumCertificado
               AND TIPO_SEGURADO = @TipoSegurado";

        return await connection.QueryFirstOrDefaultAsync<Segurado>(sql, new
        {
            NumCertificado = numCertificado,
            TipoSegurado = tipoSegurado
        });
    }
}
```

---

### VA2VP007 - Busca Produto VG (Inquiry)

#### **Metadados**
- **Tipo**: Inquiry
- **Data**: 11/21/2006 17:21:08
- **Objeto**: V0PRODUTOSVG
- **Error Function**: ZZRCIN1
- **Single Row**: Yes

#### **Responsabilidade**
Busca informações do produto associado à apólice e subgrupo.

#### **SQL**
```sql
SELECT IDSISTEM, CODPRODAZ, CODPRODU, TEM_SAF, CODRELAT
  INTO ?IDSISTEM, ?CODPRODAZ, ?CODPRODU, ?TEM_SAF, ?CODRELAT
  FROM V0PRODUTOSVG
 WHERE NUM_APOLICE = ?NUM_APOLICE
   AND CODSUBES = ?CODSUBES
```

#### **Regras de Negócio**
1. ✅ **Chave Composta**
   - Busca por `NUM_APOLICE` + `CODSUBES` (código subgrupo)
   - Combinação única identifica produto

2. ✅ **Informações do Produto**
   - `IDSISTEM`: Sistema (ex: 'VG' = Vida Grupo)
   - `CODPRODAZ`: Código produto Azure (?)
   - `CODPRODU`: Código produto
   - `TEM_SAF`: Tem SAF (não usado no código)
   - `CODRELAT`: **Código do relatório** (principal campo usado)

3. ✅ **Se Não Encontrado**
   - Define valores padrão:
     - `CODRELAT = 'VG0420B'`
     - `IDSISTEM = 'VG'`
     - `CODPRODAZ = 'ESP'`

#### **Mapeamento para Migração (.NET)**

```csharp
// Infra/Repositories/ProdutoRepository.cs
public class ProdutoRepository(IDbConnection connection) : IProdutoRepository
{
    public async Task<Produto?> GetByApoliceSubgrupo(
        string numApolice,
        string codSubgrupo)
    {
        const string sql = @"
            SELECT IDSISTEM as IdSistema,
                   CODPRODAZ as CodProdutoAzure,
                   CODPRODU as CodProduto,
                   TEM_SAF as TemSaf,
                   CODRELAT as CodRelatorio,
                   NUM_APOLICE as NumApolice,
                   CODSUBES as CodSubgrupo
              FROM V0PRODUTOSVG
             WHERE NUM_APOLICE = @NumApolice
               AND CODSUBES = @CodSubgrupo";

        return await connection.QueryFirstOrDefaultAsync<Produto>(sql, new
        {
            NumApolice = numApolice,
            CodSubgrupo = codSubgrupo
        });
    }
}
```

---

### VA2VP008 - Itera Resultados (Scan)

#### **Metadados**
- **Tipo**: Scan
- **Data**: 11/23/2006 12:31:54
- **Objeto**: V0RELATORIOS
- **Error Function**: ZZRCIN1

#### **Responsabilidade**
Itera sobre os registros do cursor aberto por `VA2VP004` (SetInq).

#### **Código**
```cobol
IF EZESQCOD EQ 0;
  MOVE V0RELATORIOS.DATA_SOLICITACAO TO ZZ20W01.W01DTDB;
  ZZ20S01(); -- Execute (formata data)
  MOVE ZZ20W01.W01DTTELA TO V0RELATORIOS.DATA_SOLICITACAO;
END;
```

#### **Regras de Negócio**
1. ✅ **Iteração de Cursor**
   - Chamado repetidamente após `VA2VP004`
   - Retorna próximo registro a cada chamada
   - Quando não há mais dados: `EZESQCOD != 0`

2. ✅ **Formatação de Data**
   - Se sucesso (`EZESQCOD = 0`):
     - Chama `ZZ20S01()` para formatar data
     - Converte formato banco → formato tela
     - Provavelmente: aaaammdd → dd/mm/aaa

#### **Mapeamento para Migração (.NET)**

```csharp
// Não precisa função específica em .NET
// Dapper já retorna IEnumerable que pode ser iterado

// O equivalente seria:
var solicitacoes = await relatorioRepository.GetSolicitacoes(certificado, codRelat);

foreach (var solicitacao in solicitacoes)
{
    // Formatar data se necessário
    solicitacao.DataSolicitacao = FormatarData(solicitacao.DataSolicitacao);
    
    // Adicionar ao array
    listaResultados.Add(solicitacao);
}
```

---

## 🔧 Funções Utilitárias

### VA2VP009 - Preenche Tela M20 (Execute)

#### **Metadados**
- **Tipo**: Execute
- **Data**: 11/21/2006 17:57:31
- **Descrição**: (não especificada)

#### **Responsabilidade**
Transfere dados do array temporário para os campos visíveis da tela M20.

#### **Código**
```cobol
SET VA2VM020 CLEAR;
MOVE VA2VM010.NUM_CERTIFICADO TO VA2VM020.NUM_CERTIFICADO;
MOVE 1 TO VA2VW001IND2;
MOVEA VA2VW002.VA2VW002CODUSU[VA2VW001IND2] TO VA2VM020.COD_USUARIO[1];
MOVEA VA2VW002.VA2VW002DTSOLIC[VA2VW001IND2] TO VA2VM020.DATA_SOLICITACAO[1];
MOVEA VA2VW002.VA2VW002SIT[VA2VW001IND2] TO VA2VM020.SITUACAO[1];
VA2VW001IND2 = VA2VW001IND2 + EZETST;
```

#### **Regras de Negócio**
1. ✅ **Limpeza de Tela**
   - Limpa todos os campos de `VA2VM020`
   - Garante que dados antigos não permaneçam

2. ✅ **Certificado Consultado**
   - Copia de M10 para M20
   - Mantém contexto da consulta

3. ✅ **Índice de Paginação**
   - `VA2VW001IND2 = 1`: inicia na primeira página
   - Pode ser alterado por F7/F8 para navegar

4. ✅ **Transferência de Arrays**
   - `MOVEA`: Move Array (múltiplos elementos)
   - Copia 24 registros do array para tela
   - Índice incrementado por `EZETST` (tamanho da tela = 24)

#### **Mapeamento para Migração (React)**

```typescript
// presentation/hooks/use-paginacao-dados.ts
export function usePaginacaoDados<T>(
  dados: T[],
  tamanhoPagina: number = 24
) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  
  const dadosPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * tamanhoPagina;
    const fim = inicio + tamanhoPagina;
    return dados.slice(inicio, fim);
  }, [dados, paginaAtual, tamanhoPagina]);

  return {
    dadosPaginados,
    paginaAtual,
    setPaginaAtual,
    totalPaginas: Math.ceil(dados.length / tamanhoPagina),
  };
}

// Uso no componente:
const { dadosPaginados, paginaAtual, setPaginaAtual, totalPaginas } = 
  usePaginacaoDados(todasSolicitacoes, 24);

<DataTable data={dadosPaginados} />
```

---

## 📊 Regras de Negócio Consolidadas

### 1. Validação de Certificado

```
┌─────────────────────────────────────────────────────┐
│ Fluxo Completo de Validação de Certificado         │
└─────────────────────────────────────────────────────┘

1. Certificado Informado?
   ├─ Não: ERRO "INFORME O CERTIFICADO."
   └─ Sim: continua

2. Certificado Existe no Banco?
   ├─ SQL: SELECT FROM SEGURADOS_VGAP WHERE NUM_CERTIFICADO = ?
   ├─ Não: ERRO "CERTIFICADO NAO CADASTRADO."
   └─ Sim: continua → retorna NUM_APOLICE, COD_SUBGRUPO

3. Produto Associado?
   ├─ SQL: SELECT FROM V0PRODUTOSVG WHERE NUM_APOLICE = ? AND CODSUBES = ?
   ├─ Não: Define PADRÃO (VG0420B, VG, ESP)
   └─ Sim: usa CODRELAT do produto

4. Código de Relatório Válido?
   ├─ CODRELAT vazio: usa PADRÃO GERAL (VG5001B)
   └─ CODRELAT preenchido: usa valor

5. Apólice Especial?
   ├─ 109300000709 ou 3009300000709: FORÇA VA0568B1
   └─ Outras: mantém CODRELAT determinado

6. Buscar Solicitações:
   └─ SQL: SELECT FROM V0RELATORIOS 
           WHERE NRCERTIF = ? AND CODRELAT = ?
           ORDER BY DATA_SOLICITACAO DESC

✅ Sucesso: exibe resultados na tela M20
```

### 2. Hierarquia de Códigos de Relatório

| Prioridade | Origem | Código | Quando Aplicar |
|------------|--------|--------|----------------|
| **1 (Maior)** | Apólice especial | `VA0568B1` | NUM_APOLICE = 109300000709 ou 3009300000709 |
| **2** | Produto | `V0PRODUTOSVG.CODRELAT` | Se produto encontrado e CODRELAT não vazio |
| **3** | Padrão geral | `VG5001B` | Se produto encontrado mas CODRELAT vazio |
| **4 (Menor)** | Padrão produto | `VG0420B` | Se produto NÃO encontrado |

### 3. Estados de Situação de Solicitação

| Código | Descrição na Tela | Significado |
|--------|-------------------|-------------|
| `'0'` | PENDENTE | Solicitação criada, aguardando processamento |
| `'1'` | ENV. P/ IMP | Enviado para Impressão |
| Outros | (código original) | Sem tradução definida |

### 4. Limitações Técnicas Mainframe

| Limitação | Valor | Impacto |
|-----------|-------|---------|
| **Array VA2VW002** | 200 registros | Máximo de solicitações carregadas |
| **Tela VA2VM020** | 24 registros visíveis | Requer paginação para mais dados |
| **Layout duplo** | 2 colunas | Otimiza espaço, paginação de 48 em 48 |

### 5. Tratamento de Teclas de Função

#### Tela M10 (Consulta)

| Tecla | Ação | Comportamento |
|-------|------|---------------|
| **Enter** | Processar | Valida certificado e busca solicitações |
| **F1** | Ajuda | Exibe tela de help VA2VH010 |
| **F3** | Sair | Encerra programa (ZZ01SGPS3) |
| **F5** | Limpar | Limpa campos da tela |
| **F12** | Cancelar | Cancela operação (ZZ01SGPS12) |
| Outras | Inválida | Exibe "TECLA INVALIDA" |

#### Tela M20 (Resultados)

| Tecla | Ação | Comportamento |
|-------|------|---------------|
| **F3** | Sair | Volta para M10, limpa dados |
| **F7** | Página Anterior | Retrocede 48 registros (2 páginas) |
| **F8** | Próxima Página | Avança 48 registros (2 páginas) |
| **F12** | Voltar | Volta para M10, limpa dados |

---

## 🔄 Mapeamento para Migração

### Arquitetura Backend (.NET Core 8)

```
┌──────────────────────────────────────────────────┐
│              API Layer                           │
│  ConsultasController                             │
│  ├─ POST /api/consultas/validar-certificado     │
│  └─ GET /api/consultas/{certificado}/solicitacoes│
└───────────────────┬──────────────────────────────┘
                    │
┌───────────────────▼──────────────────────────────┐
│            Application Layer                     │
│  ConsultaCertificadoService                      │
│  └─ ConsultarCertificadoViewModel                │
│     ├─ Validações                                │
│     ├─ Lógica de negócio                         │
│     └─ Orquestração de repositórios              │
└───────────────────┬──────────────────────────────┘
                    │
┌───────────────────▼──────────────────────────────┐
│           Infrastructure Layer                   │
│  Repositories                                    │
│  ├─ SeguradoRepository                           │
│  ├─ ProdutoRepository                            │
│  ├─ RelatorioRepository                          │
│  └─ SistemaRepository                            │
└───────────────────┬──────────────────────────────┘
                    │
┌───────────────────▼──────────────────────────────┐
│              Domain Layer                        │
│  Interfaces + DTOs                               │
│  ├─ ISeguradoRepository                          │
│  ├─ Segurado (DTO)                               │
│  ├─ Produto (DTO)                                │
│  └─ AppResponse<T>                               │
└──────────────────────────────────────────────────┘
```

### Arquitetura Frontend (React + TypeScript)

```
packages/consultas/
├── domain/
│   ├── entities/
│   │   ├── certificado.entity.ts
│   │   ├── solicitacao.entity.ts
│   │   └── produto.entity.ts
│   ├── repositories/
│   │   └── consulta.repository.ts (interface)
│   └── use-cases/
│       ├── validar-certificado.use-case.ts
│       └── buscar-solicitacoes.use-case.ts
├── infrastructure/
│   ├── api/
│   │   └── consultas.api.ts
│   └── repositories/
│       └── consulta.repository.impl.ts
└── presentation/
    ├── components/
    │   ├── ConsultaCertificadoForm.tsx
    │   ├── ListaSolicitacoesGrid.tsx
    │   └── CabecalhoSistema.tsx
    ├── hooks/
    │   ├── use-validar-certificado.ts
    │   ├── use-buscar-solicitacoes.ts
    │   └── use-paginacao.ts
    ├── screens/
    │   ├── ConsultaScreen.tsx
    │   └── ResultadosScreen.tsx
    └── stores/
        └── consulta.store.ts
```

### Tabela de Mapeamento de Funções

| Função COBOL | Tipo | Backend (.NET) | Frontend (React) |
|--------------|------|----------------|------------------|
| **VA2VP000** | Execute | `InicializacaoService.Inicializar()` | App initialization |
| **VA2VP001** | Execute | (não aplicável - loop mainframe) | TanStack Router |
| **VA2VP002** | Converse | (não aplicável - UI) | `ConsultaCertificadoForm.tsx` |
| **VA2VP003** | Converse | (não aplicável - UI) | `ListaSolicitacoesGrid.tsx` |
| **VA2VS002** | Execute | `ConsultaCertificadoService.Consultar()` | `useValidarCertificado()` |
| **VA2VS003** | Execute | (não aplicável - paginação client) | `usePaginacao()` |
| **VA2VP004** | SetInq | `RelatorioRepository.GetSolicitacoes()` | (via API) |
| **VA2VP005** | Inquiry | `SistemaRepository.ObterDataSistema()` | (via API) |
| **VA2VP006** | Inquiry | `SeguradoRepository.GetByCertificado()` | (via API) |
| **VA2VP007** | Inquiry | `ProdutoRepository.GetByApolice()` | (via API) |
| **VA2VP008** | Scan | (iteração automática com IEnumerable) | (via API) |
| **VA2VP009** | Execute | (não aplicável - paginação client) | `usePaginacao()` |

---

## 📝 Resumo Executivo

### Funcionalidades Implementadas

1. **Consulta de Certificado**
   - Validação de existência
   - Verificação de apólice e subgrupo
   - Determinação automática de tipo de relatório

2. **Listagem de Solicitações**
   - Histórico completo de solicitações
   - Ordenação por data (mais recentes primeiro)
   - Tradução de códigos de situação

3. **Paginação**
   - Suporte a até 200 registros
   - Navegação via F7/F8
   - Feedback visual de limites

4. **Tratamento de Erros**
   - Mensagens claras para usuário
   - Validações em múltiplas camadas
   - Fallback para valores padrão

### Complexidade

| Métrica | Valor |
|---------|-------|
| **Total de Funções** | 12 |
| **Consultas SQL** | 4 |
| **Regras de Negócio** | 15+ |
| **Validações** | 7 |
| **Teclas de Função** | 8 |

### Prioridades de Migração

1. **Alta Prioridade**
   - Validação de certificado (core business)
   - Busca de solicitações (funcionalidade principal)
   - Determinação de código de relatório (lógica complexa)

2. **Média Prioridade**
   - Paginação (UX)
   - Formatação de datas (apresentação)
   - Tradução de situações (apresentação)

3. **Baixa Prioridade**
   - Teclas de função específicas (adaptar para web)
   - Layout duplo da tela (otimizar para responsivo)

---

**Documento gerado em**: ${new Date().toISOString()}  
**Ferramenta**: vamap.exe v2.0  
**Programa Analisado**: va2va.esf  
**Total de Páginas**: Este documento

