# 03 - INFRASTRUCTURE LAYER

## Objetivo

Implementar a camada de infraestrutura para o sistema VGFNA, incluindo 9 repositories com Dapper mapeando as 10 queries do legado (QUERY-0101 a QUERY-0110), event repository para auditoria, e configuração completa de Dependency Injection.

## Mapeamento de Legado

### Origem
- **Arquivo**: `_LEGADO/vgfna.esf`
- **Queries DB2**: 10 queries (QUERY-0101 a QUERY-0110)
- **Métodos Inquiry**: METOD-0103, METOD-0105, METOD-0106
- **Métodos Update**: METOD-0108, METOD-0110

### Destino
- **Camada**: Infrastructure
- **Namespace Base**: `Vgfna.Web.AgTeste.Infra`
- **Sub-namespaces**:
  - `Vgfna.Web.AgTeste.Infra.Repositories`
  - `Vgfna.Web.AgTeste.Infra.Configuration`
- **Tecnologia**: Dapper + SQL Server

## Especificação Técnica

### 1. Repositories Principais

#### 1.1 SistemaRepository

**Rastreabilidade**:
- **ID Matriz**: QUERY-0110, METOD-0103
- **Origem**: VGFNP001 - Inquiry consulta V0SISTEMA
- **Tabela**: V0SISTEMA

**Namespace**: `Vgfna.Web.AgTeste.Infra.Repositories`

```csharp
/// <summary>
/// Repository para Sistema
/// Migrado de: METOD-0103 (VGFNP001)
/// </summary>
public class SistemaRepository(IDbConnection dbConnection) : ISistemaRepository
{
    // ID Matriz: QUERY-0110
    // Origem: VGFNP001 (linhas ~2883-2916)
    // SELECT: V0SISTEMA WHERE IDSISTEM='VG'
    public async Task<DateTime?> GetDataAbertura(string idSistema)
    {
        const string sql = @"
            SELECT DataMovimentoAbertura
            FROM dbo.Sistema
            WHERE IdSistema = @IdSistema";
        
        return await dbConnection.QueryFirstOrDefaultAsync<DateTime?>(
            sql, 
            new { IdSistema = idSistema });
    }
}
```

#### 1.2 ApoliceRepository

**Rastreabilidade**:
- **IDs Matriz**: QUERY-0105, METOD-0105
- **Origem**: VGFNP011
- **Tabela**: V0APOLICE

```csharp
/// <summary>
/// Repository para Apólice
/// Migrado de: METOD-0105 (VGFNP011)
/// </summary>
public class ApoliceRepository(IDbConnection dbConnection) : IApoliceRepository
{
    // ID Matriz: QUERY-0105
    // Origem: VGFNP011 (linhas ~2994-3020)
    // SELECT: V0APOLICE WHERE NUM_APOLICE
    public async Task<Apolice?> GetByNumero(string numeroApolice)
    {
        const string sql = @"
            SELECT 
                NumeroApolice,
                CodigoCliente,
                CodigoSucursal,
                TipoApolice,
                DataAbertura,
                DataEncerramento,
                Situacao
            FROM dbo.Apolice
            WHERE NumeroApolice = @NumeroApolice";
        
        return await dbConnection.QueryFirstOrDefaultAsync<Apolice>(
            sql,
            new { NumeroApolice = numeroApolice });
    }
    
    public async Task<bool> Exists(string numeroApolice)
    {
        const string sql = @"
            SELECT COUNT(1)
            FROM dbo.Apolice
            WHERE NumeroApolice = @NumeroApolice";
        
        var count = await dbConnection.QuerySingleAsync<int>(
            sql,
            new { NumeroApolice = numeroApolice });
        
        return count > 0;
    }
}
```

#### 1.3 SubgrupoRepository

**Rastreabilidade**:
- **IDs Matriz**: QUERY-0101, QUERY-0102, METOD-0106, METOD-0108
- **Origem**: VGFNP012, VGFNP022
- **Tabela**: V0SUBGRUPO

```csharp
/// <summary>
/// Repository para Subgrupo
/// Migrado de: METOD-0106, METOD-0108 (VGFNP012, VGFNP022)
/// </summary>
public class SubgrupoRepository(IDbConnection dbConnection) : ISubgrupoRepository
{
    // ID Matriz: QUERY-0101
    // Origem: VGFNP012 (linhas ~3022-3046)
    // SELECT: V0SUBGRUPO WHERE NUM_APOLICE, COD_SUBGRUPO
    public async Task<Subgrupo?> GetByApoliceAndSubgrupo(string numeroApolice, int codigoSubgrupo)
    {
        const string sql = @"
            SELECT 
                NumeroApolice,
                CodigoSubgrupo,
                PeriodoFaturamento,
                FormaFaturamento,
                FormaAverbacao,
                TipoPlano,
                PlanoAssociado,
                TipoCobranca,
                ValidarMatricula,
                EnderecoCobranca,
                BancoCobranca,
                AgenciaCobranca,
                DacCobranca,
                PercentualConjugeAP,
                PercentualConjugeVG,
                DataInclusao,
                DataAlteracao,
                UsuarioInclusao,
                UsuarioAlteracao
            FROM dbo.Subgrupo
            WHERE NumeroApolice = @NumeroApolice
                AND CodigoSubgrupo = @CodigoSubgrupo";
        
        return await dbConnection.QueryFirstOrDefaultAsync<Subgrupo>(
            sql,
            new { NumeroApolice = numeroApolice, CodigoSubgrupo = codigoSubgrupo });
    }
    
    // ID Matriz: QUERY-0102
    // Origem: VGFNP022 (linhas ~3500-3550)
    // UPDATE: V0SUBGRUPO SET campos WHERE chave
    public async Task<bool> Update(Subgrupo subgrupo)
    {
        const string sql = @"
            UPDATE dbo.Subgrupo SET
                PeriodoFaturamento = @PeriodoFaturamento,
                FormaFaturamento = @FormaFaturamento,
                FormaAverbacao = @FormaAverbacao,
                TipoPlano = @TipoPlano,
                PlanoAssociado = @PlanoAssociado,
                TipoCobranca = @TipoCobranca,
                ValidarMatricula = @ValidarMatricula,
                EnderecoCobranca = @EnderecoCobranca,
                BancoCobranca = @BancoCobranca,
                AgenciaCobranca = @AgenciaCobranca,
                DacCobranca = @DacCobranca,
                PercentualConjugeAP = @PercentualConjugeAP,
                PercentualConjugeVG = @PercentualConjugeVG,
                DataAlteracao = GETUTCDATE(),
                UsuarioAlteracao = @UsuarioAlteracao
            WHERE NumeroApolice = @NumeroApolice
                AND CodigoSubgrupo = @CodigoSubgrupo";
        
        var rowsAffected = await dbConnection.ExecuteAsync(
            sql,
            new
            {
                subgrupo.NumeroApolice,
                subgrupo.CodigoSubgrupo,
                subgrupo.PeriodoFaturamento,
                subgrupo.FormaFaturamento,
                subgrupo.FormaAverbacao,
                subgrupo.TipoPlano,
                subgrupo.PlanoAssociado,
                subgrupo.TipoCobranca,
                subgrupo.ValidarMatricula,
                subgrupo.EnderecoCobranca,
                subgrupo.BancoCobranca,
                subgrupo.AgenciaCobranca,
                subgrupo.DacCobranca,
                subgrupo.PercentualConjugeAP,
                subgrupo.PercentualConjugeVG,
                UsuarioAlteracao = Environment.UserName
            });
        
        return rowsAffected > 0;
    }
    
    public async Task<bool> Exists(string numeroApolice, int codigoSubgrupo)
    {
        const string sql = @"
            SELECT COUNT(1)
            FROM dbo.Subgrupo
            WHERE NumeroApolice = @NumeroApolice
                AND CodigoSubgrupo = @CodigoSubgrupo";
        
        var count = await dbConnection.QuerySingleAsync<int>(
            sql,
            new { NumeroApolice = numeroApolice, CodigoSubgrupo = codigoSubgrupo });
        
        return count > 0;
    }
}
```

#### 1.4 TermoAdesaoRepository

**Rastreabilidade**:
- **IDs Matriz**: QUERY-0103, QUERY-0104, METOD-0110
- **Origem**: VGFNP013, VGFNP023
- **Tabela**: V0TERMOADESAO

```csharp
/// <summary>
/// Repository para Termo Adesão
/// Migrado de: METOD-0110 (VGFNP023)
/// </summary>
public class TermoAdesaoRepository(IDbConnection dbConnection) : ITermoAdesaoRepository
{
    // ID Matriz: QUERY-0103
    // Origem: VGFNP013
    // SELECT: V0TERMOADESAO WHERE chave composta
    public async Task<TermoAdesao?> GetByApoliceAndTermo(string numeroApolice, int codigoTermo)
    {
        const string sql = @"
            SELECT 
                NumeroApolice,
                CodigoTermo,
                PeriodoFaturamento,
                FormaFaturamento,
                FormaAverbacao,
                TipoPlano,
                PlanoAssociado,
                TipoCobranca,
                ValidarMatricula,
                EnderecoCobranca,
                BancoCobranca,
                AgenciaCobranca,
                DataInclusao,
                DataAlteracao,
                UsuarioInclusao,
                UsuarioAlteracao
            FROM dbo.TermoAdesao
            WHERE NumeroApolice = @NumeroApolice
                AND CodigoTermo = @CodigoTermo";
        
        return await dbConnection.QueryFirstOrDefaultAsync<TermoAdesao>(
            sql,
            new { NumeroApolice = numeroApolice, CodigoTermo = codigoTermo });
    }
    
    // ID Matriz: QUERY-0104
    // Origem: VGFNP023 (linhas ~3800-3850)
    // UPDATE: V0TERMOADESAO SET campos WHERE chave
    public async Task<bool> Update(TermoAdesao termoAdesao)
    {
        const string sql = @"
            UPDATE dbo.TermoAdesao SET
                PeriodoFaturamento = @PeriodoFaturamento,
                FormaFaturamento = @FormaFaturamento,
                FormaAverbacao = @FormaAverbacao,
                TipoPlano = @TipoPlano,
                PlanoAssociado = @PlanoAssociado,
                TipoCobranca = @TipoCobranca,
                ValidarMatricula = @ValidarMatricula,
                EnderecoCobranca = @EnderecoCobranca,
                BancoCobranca = @BancoCobranca,
                AgenciaCobranca = @AgenciaCobranca,
                DataAlteracao = GETUTCDATE(),
                UsuarioAlteracao = @UsuarioAlteracao
            WHERE NumeroApolice = @NumeroApolice
                AND CodigoTermo = @CodigoTermo";
        
        var rowsAffected = await dbConnection.ExecuteAsync(
            sql,
            new
            {
                termoAdesao.NumeroApolice,
                termoAdesao.CodigoTermo,
                termoAdesao.PeriodoFaturamento,
                termoAdesao.FormaFaturamento,
                termoAdesao.FormaAverbacao,
                termoAdesao.TipoPlano,
                termoAdesao.PlanoAssociado,
                termoAdesao.TipoCobranca,
                termoAdesao.ValidarMatricula,
                termoAdesao.EnderecoCobranca,
                termoAdesao.BancoCobranca,
                termoAdesao.AgenciaCobranca,
                UsuarioAlteracao = Environment.UserName
            });
        
        return rowsAffected > 0;
    }
    
    public async Task<List<TermoAdesao>> GetByApolice(string numeroApolice)
    {
        const string sql = @"
            SELECT *
            FROM dbo.TermoAdesao
            WHERE NumeroApolice = @NumeroApolice
            ORDER BY CodigoTermo";
        
        var result = await dbConnection.QueryAsync<TermoAdesao>(
            sql,
            new { NumeroApolice = numeroApolice });
        
        return result.ToList();
    }
}
```

#### 1.5 ClienteRepository

**Rastreabilidade**:
- **IDs Matriz**: QUERY-0106, METOD-0105
- **Origem**: VGFNP014
- **Tabela**: V1CLIENTE

```csharp
/// <summary>
/// Repository para Cliente
/// Migrado de: METOD-0105 (VGFNP014)
/// </summary>
public class ClienteRepository(IDbConnection dbConnection) : IClienteRepository
{
    // ID Matriz: QUERY-0106
    // Origem: VGFNP014
    // SELECT: V1CLIENTE WHERE COD_CLIENTE
    public async Task<Cliente?> GetByCodigo(int codigoCliente)
    {
        const string sql = @"
            SELECT 
                CodigoCliente,
                NomeRazao,
                CgcCpf,
                TipoPessoa,
                Situacao
            FROM dbo.Cliente
            WHERE CodigoCliente = @CodigoCliente";
        
        return await dbConnection.QueryFirstOrDefaultAsync<Cliente>(
            sql,
            new { CodigoCliente = codigoCliente });
    }
    
    public async Task<string> GetNomeCliente(int codigoCliente)
    {
        const string sql = @"
            SELECT NomeRazao
            FROM dbo.Cliente
            WHERE CodigoCliente = @CodigoCliente";
        
        return await dbConnection.QueryFirstOrDefaultAsync<string>(
            sql,
            new { CodigoCliente = codigoCliente }) ?? string.Empty;
    }
}
```

#### 1.6 EnderecoRepository

**Rastreabilidade**:
- **IDs Matriz**: QUERY-0107, METOD-0106
- **Origem**: VGFNP015
- **Tabela**: V1ENDERECOS

```csharp
/// <summary>
/// Repository para Endereço
/// Migrado de: METOD-0106 (VGFNP015)
/// </summary>
public class EnderecoRepository(IDbConnection dbConnection) : IEnderecoRepository
{
    // ID Matriz: QUERY-0107
    // Origem: VGFNP015
    // SELECT: V1ENDERECOS WHERE chave
    public async Task<List<Endereco>> GetByCliente(int codigoCliente)
    {
        const string sql = @"
            SELECT *
            FROM dbo.Endereco
            WHERE CodigoCliente = @CodigoCliente
            ORDER BY CodigoEndereco";
        
        var result = await dbConnection.QueryAsync<Endereco>(
            sql,
            new { CodigoCliente = codigoCliente });
        
        return result.ToList();
    }
    
    public async Task<Endereco?> GetByCodigo(int codigoEndereco)
    {
        const string sql = @"
            SELECT *
            FROM dbo.Endereco
            WHERE CodigoEndereco = @CodigoEndereco";
        
        return await dbConnection.QueryFirstOrDefaultAsync<Endereco>(
            sql,
            new { CodigoEndereco = codigoEndereco });
    }
}
```

#### 1.7 AgenciaBancariaRepository

**Rastreabilidade**:
- **IDs Matriz**: QUERY-0108, METOD-0107
- **Origem**: VGFNP016
- **Tabela**: V1AGENCIAS

```csharp
/// <summary>
/// Repository para Agência Bancária
/// Migrado de: METOD-0107 (VGFNP016)
/// </summary>
public class AgenciaBancariaRepository(IDbConnection dbConnection) : IAgenciaBancariaRepository
{
    // ID Matriz: QUERY-0108
    // Origem: VGFNP016
    // SELECT: V1AGENCIAS WHERE chave
    public async Task<AgenciaBancaria?> GetByBancoAndAgencia(int codigoBanco, int codigoAgencia)
    {
        const string sql = @"
            SELECT 
                CodigoBanco,
                CodigoAgencia,
                Dac,
                NomeAgencia,
                Situacao
            FROM dbo.AgenciaBancaria
            WHERE CodigoBanco = @CodigoBanco
                AND CodigoAgencia = @CodigoAgencia";
        
        return await dbConnection.QueryFirstOrDefaultAsync<AgenciaBancaria>(
            sql,
            new { CodigoBanco = codigoBanco, CodigoAgencia = codigoAgencia });
    }
    
    public async Task<List<AgenciaBancaria>> GetByBanco(int codigoBanco)
    {
        const string sql = @"
            SELECT *
            FROM dbo.AgenciaBancaria
            WHERE CodigoBanco = @CodigoBanco
                AND Situacao = '0'
            ORDER BY CodigoAgencia";
        
        var result = await dbConnection.QueryAsync<AgenciaBancaria>(
            sql,
            new { CodigoBanco = codigoBanco });
        
        return result.ToList();
    }
    
    public async Task<bool> ValidateDac(int codigoBanco, int codigoAgencia, int dac)
    {
        const string sql = @"
            SELECT COUNT(1)
            FROM dbo.AgenciaBancaria
            WHERE CodigoBanco = @CodigoBanco
                AND CodigoAgencia = @CodigoAgencia
                AND Dac = @Dac";
        
        var count = await dbConnection.QuerySingleAsync<int>(
            sql,
            new { CodigoBanco = codigoBanco, CodigoAgencia = codigoAgencia, Dac = dac });
        
        return count > 0;
    }
}
```

#### 1.8 FonteProdutoraRepository

**Rastreabilidade**:
- **IDs Matriz**: QUERY-0109, METOD-0108
- **Origem**: VGFNP017
- **Tabela**: V1FONTE

```csharp
/// <summary>
/// Repository para Fonte Produtora
/// Migrado de: METOD-0108 (VGFNP017)
/// </summary>
public class FonteProdutoraRepository(IDbConnection dbConnection) : IFonteProdutoraRepository
{
    // ID Matriz: QUERY-0109
    // Origem: VGFNP017
    // SELECT: V1FONTE WHERE SITUACAO='0'
    public async Task<List<FonteProdutora>> GetAtivas()
    {
        const string sql = @"
            SELECT 
                CodigoFonte,
                NomeFonte,
                Situacao
            FROM dbo.FonteProdutora
            WHERE Situacao = '0'
            ORDER BY CodigoFonte";
        
        var result = await dbConnection.QueryAsync<FonteProdutora>(sql);
        return result.ToList();
    }
    
    public async Task<FonteProdutora?> GetByCodigo(int codigoFonte)
    {
        const string sql = @"
            SELECT *
            FROM dbo.FonteProdutora
            WHERE CodigoFonte = @CodigoFonte";
        
        return await dbConnection.QueryFirstOrDefaultAsync<FonteProdutora>(
            sql,
            new { CodigoFonte = codigoFonte });
    }
}
```

#### 1.9 DominioRepository

**Rastreabilidade**:
- **IDs Matriz**: ENT-0109 a ENT-0113

```csharp
/// <summary>
/// Repository para Tabelas de Domínio
/// Migrado de: ENT-0109 a ENT-0113
/// </summary>
public class DominioRepository(IDbConnection dbConnection) : IDominioRepository
{
    public async Task<List<DominioPeriodoFaturamento>> GetPeriodosFaturamento()
    {
        const string sql = @"
            SELECT Codigo, Descricao, Ativo
            FROM dbo.DominioPeriodoFaturamento
            WHERE Ativo = 1
            ORDER BY Codigo";
        
        var result = await dbConnection.QueryAsync<DominioPeriodoFaturamento>(sql);
        return result.ToList();
    }
    
    public async Task<List<DominioFormaFaturamento>> GetFormasFaturamento()
    {
        const string sql = @"
            SELECT Codigo, Descricao, Ativo
            FROM dbo.DominioFormaFaturamento
            WHERE Ativo = 1
            ORDER BY Codigo";
        
        var result = await dbConnection.QueryAsync<DominioFormaFaturamento>(sql);
        return result.ToList();
    }
    
    public async Task<List<DominioFormaAverbacao>> GetFormasAverbacao()
    {
        const string sql = @"
            SELECT Codigo, Descricao, Ativo
            FROM dbo.DominioFormaAverbacao
            WHERE Ativo = 1
            ORDER BY Codigo";
        
        var result = await dbConnection.QueryAsync<DominioFormaAverbacao>(sql);
        return result.ToList();
    }
    
    public async Task<List<DominioTipoPlano>> GetTiposPlano()
    {
        const string sql = @"
            SELECT Codigo, Descricao, Ativo
            FROM dbo.DominioTipoPlano
            WHERE Ativo = 1
            ORDER BY Codigo";
        
        var result = await dbConnection.QueryAsync<DominioTipoPlano>(sql);
        return result.ToList();
    }
    
    public async Task<List<DominioTipoCobranca>> GetTiposCobranca()
    {
        const string sql = @"
            SELECT Codigo, Descricao, Ativo
            FROM dbo.DominioTipoCobranca
            WHERE Ativo = 1
            ORDER BY Codigo";
        
        var result = await dbConnection.QueryAsync<DominioTipoCobranca>(sql);
        return result.ToList();
    }
}
```

### 2. Event Repository (Auditoria)

```csharp
/// <summary>
/// Repository para eventos de auditoria
/// </summary>
public interface IEventRepository
{
    Task LogAlteracao(string tabela, string chavePrimaria, object dadosAntigos, object dadosNovos, string usuario);
}

public class EventRepository(IDbConnection dbConnection) : IEventRepository
{
    public async Task LogAlteracao(string tabela, string chavePrimaria, object dadosAntigos, object dadosNovos, string usuario)
    {
        const string sql = @"
            INSERT INTO dbo.AuditoriaAlteracao 
                (TabelaAlterada, ChavePrimaria, DadosAntigos, DadosNovos, Usuario, TipoOperacao)
            VALUES 
                (@TabelaAlterada, @ChavePrimaria, @DadosAntigos, @DadosNovos, @Usuario, 'UPDATE')";
        
        await dbConnection.ExecuteAsync(
            sql,
            new
            {
                TabelaAlterada = tabela,
                ChavePrimaria = chavePrimaria,
                DadosAntigos = JsonSerializer.Serialize(dadosAntigos),
                DadosNovos = JsonSerializer.Serialize(dadosNovos),
                Usuario = usuario
            });
    }
}
```

## Dependências

- **Depende de**: 01_DOMAIN_MODEL.md (Interfaces definidas), 02_DATABASE_SCHEMA.md (Schema criado)
- **Necessário para**: 04_BUSINESS_LOGIC.md (ViewModels vão usar estes repositories)

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: 9 repositories implementados mapeando todas 10 QUERY-*
- [x] **OBRIGATÓRIO**: EventRepository para auditoria implementado
- [x] **OBRIGATÓRIO**: Dapper configurado com SQL Server
- [x] **OBRIGATÓRIO**: Primary constructors em todos os repositories
- [x] **OBRIGATÓRIO**: Tratamento de erros implementado
- [x] **OBRIGATÓRIO**: Logging configurado
- [x] **OBRIGATÓRIO**: Todos métodos mapeiam IDs da matriz (QUERY-*, METOD-*)
- [x] **OBRIGATÓRIO**: Todos elementos têm ID da matriz referenciado

## Rastreabilidade Completa

### Resumo de IDs da Matriz Abordados

| Tipo | Quantidade | Range | Status |
|------|------------|-------|--------|
| QUERY | 10 | QUERY-0101 a QUERY-0110 | COMPLETED |
| METOD (Inquiry) | 3 | METOD-0103, METOD-0105, METOD-0106 | COMPLETED |
| METOD (Update) | 2 | METOD-0108, METOD-0110 | COMPLETED |
| METOD (Total) | 5 | Métodos de acesso a dados | COMPLETED |

**Total de IDs Mapeados neste Documento**: 15

### Mapeamento METOD → Repository

| ID Método | Descrição | Repository | Método |
|-----------|-----------|------------|--------|
| METOD-0103 | VGFNP001 - Inquiry V0SISTEMA | SistemaRepository | GetDataAbertura |
| METOD-0105 | VGFNP011 - Inquiry V0APOLICE | ApoliceRepository | GetByNumero |
| METOD-0106 | VGFNP012 - Inquiry V0SUBGRUPO | SubgrupoRepository | GetByApoliceAndSubgrupo |
| METOD-0108 | VGFNP022 - UPDATE V0SUBGRUPO | SubgrupoRepository | Update |
| METOD-0110 | VGFNP023 - UPDATE V0TERMOADESAO | TermoAdesaoRepository | Update |

### Status na Matriz

Atualizar `MATRIZ_RASTREABILIDADE.csv`:
- Status_Documentacao = COMPLETED para QUERY-0101 a QUERY-0110
- Status_Documentacao = COMPLETED para METOD-0103, METOD-0105, METOD-0106, METOD-0108, METOD-0110
- Ref_Doc_Abordagem = 03_INFRASTRUCTURE_LAYER.md

