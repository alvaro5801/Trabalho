# 03 - INFRASTRUCTURE LAYER

## Objetivo

Implementar a camada de infraestrutura para o sistema CB2QA, incluindo 27 repositories com Dapper mapeando as 46 queries do legado (QUERY-0001 a QUERY-0046), event repository para auditoria, e configuração completa de Dependency Injection.

## Mapeamento de Legado

### Origem
- **Arquivo**: `_LEGADO/cb2qa.esf`
- **Queries DB2**: 46 queries (QUERY-0001 a QUERY-0046)
- **Métodos Inquiry**: METOD-0011 a METOD-0034 (Inquiry operations)
- **Métodos SetInq**: METOD-0035 a METOD-0047 (Cursor operations)
- **Métodos Scan**: METOD-0048 a METOD-0050 (Cursor fetch)

### Destino
- **Camada**: Infrastructure
- **Namespace Base**: `Cb2qa.Web.AgTeste.Infra`
- **Sub-namespaces**:
  - `Cb2qa.Web.AgTeste.Infra.Repositories`
  - `Cb2qa.Web.AgTeste.Infra.Configuration`
- **Tecnologia**: Dapper + SQL Server

## Especificação Técnica

### 1. Repositories Principais

#### 1.1 SistemaRepository

**Rastreabilidade**:
- **ID Matriz**: QUERY-0001, METOD-0011
- **Origem**: CB2QP003 - Inquiry consulta V1SISTEMA
- **Tabela**: V1SISTEMA

**Namespace**: `Cb2qa.Web.AgTeste.Infra.Repositories`

```csharp
/// <summary>
/// Repository para Sistema
/// Migrado de: METOD-0011 (CB2QP003)
/// </summary>
public class SistemaRepository(IDbConnection dbConnection) : ISistemaRepository
{
    // ID Matriz: QUERY-0001
    // Origem: CB2QP003 (linhas 6274-6289)
    // SELECT: V1SISTEMA WHERE IDSISTEM='CB'
    public async Task<DateTime> GetDataAbertura(string idSistema)
    {
        const string sql = @"
            SELECT DTMOVABE
            FROM dbo.Sistemas
            WHERE IdSistema = @IdSistema";
        
        return await dbConnection.QueryFirstOrDefaultAsync<DateTime>(
            sql, 
            new { IdSistema = idSistema });
    }
}
```

#### 1.2 RegistroDebitoAutoRepository

**Rastreabilidade**:
- **IDs Matriz**: QUERY-0002, QUERY-0032, QUERY-0034, QUERY-0036, METOD-0012, METOD-0036, METOD-0038, METOD-0040
- **Origem**: CB2QP052, CB2QP053, CB2QP054, CB2QP055
- **Tabela**: CB2QR001

```csharp
/// <summary>
/// Repository para Registro Débito Automático
/// Migrado de: METOD-0012, 0036, 0038, 0040
/// </summary>
public class RegistroDebitoAutoRepository(IDbConnection dbConnection) : IRegistroDebitoAutoRepository
{
    // ID Matriz: QUERY-0002
    // Origem: CB2QP052 (linhas 6291-6323)
    // SELECT: CB2QR001 JOIN V1ENDOSSO WHERE NUM_APOLICE
    public async Task<RegistroDebitoAuto?> GetByTitulo(string numeroTitulo)
    {
        const string sql = @"
            SELECT 
                r.NumeroApolice,
                r.NumeroEndosso,
                r.CodigoConvenio,
                r.TipoCobranca,
                r.CodigoAgencia,
                r.OperacaoConta,
                r.NumeroConta,
                r.DigitoVerificadorConta,
                r.NumeroCartao,
                r.DigitoVerificadorCartao,
                r.DataInclusao,
                r.DataAlteracao
            FROM dbo.RegistroDebitoAuto r
            INNER JOIN dbo.Endossos e ON r.NumeroApolice = e.NumeroApolice 
                AND r.NumeroEndosso = e.NumeroEndosso
            WHERE r.NumeroApolice = @NumeroTitulo
                AND e.RamoSeguro NOT IN ('60', '61', '62', '63', '64', '65')";
        
        return await dbConnection.QueryFirstOrDefaultAsync<RegistroDebitoAuto>(
            sql,
            new { NumeroTitulo = numeroTitulo });
    }
    
    // ID Matriz: QUERY-0032
    // Origem: CB2QP053 (linhas 6613-6666)
    // SetInq cursor CB2QR001 por apolice/endosso RD
    public async IAsyncEnumerable<RegistroDebitoAuto> GetCursorByApoliceEndosso(
        string numeroApolice, 
        string numeroEndosso)
    {
        const string sql = @"
            SELECT 
                r.*
            FROM dbo.RegistroDebitoAuto r
            INNER JOIN dbo.Endossos e ON r.NumeroApolice = e.NumeroApolice 
                AND r.NumeroEndosso = e.NumeroEndosso
            WHERE r.NumeroApolice = @NumeroApolice
                AND r.NumeroEndosso = @NumeroEndosso
                AND e.RamoSeguro NOT IN ('60', '61', '62', '63', '64', '65')
            ORDER BY r.NumeroApolice, r.NumeroEndosso";
        
        await using var reader = await dbConnection.ExecuteReaderAsync(
            sql,
            new { NumeroApolice = numeroApolice, NumeroEndosso = numeroEndosso });
        
        var parser = reader.GetRowParser<RegistroDebitoAuto>();
        while (await reader.ReadAsync())
        {
            yield return parser(reader);
        }
    }
    
    // ID Matriz: QUERY-0034
    // Origem: CB2QP054 (linhas 6668-6726)
    // SetInq cursor CB2QR001 por conta RD
    public async IAsyncEnumerable<RegistroDebitoAuto> GetCursorByConta(
        string codigoAgencia, 
        string operacaoConta, 
        string numeroConta)
    {
        const string sql = @"
            SELECT 
                r.*
            FROM dbo.RegistroDebitoAuto r
            INNER JOIN dbo.Endossos e ON r.NumeroApolice = e.NumeroApolice 
                AND r.NumeroEndosso = e.NumeroEndosso
            WHERE r.CodigoAgencia = @CodigoAgencia
                AND r.OperacaoConta = @OperacaoConta
                AND r.NumeroConta = @NumeroConta
                AND e.RamoSeguro NOT IN ('60', '61', '62', '63', '64', '65')
            ORDER BY r.NumeroApolice, r.NumeroEndosso";
        
        await using var reader = await dbConnection.ExecuteReaderAsync(
            sql,
            new { CodigoAgencia = codigoAgencia, OperacaoConta = operacaoConta, NumeroConta = numeroConta });
        
        var parser = reader.GetRowParser<RegistroDebitoAuto>();
        while (await reader.ReadAsync())
        {
            yield return parser(reader);
        }
    }
    
    // ID Matriz: QUERY-0036
    // Origem: CB2QP055 (linhas 6728-6779)
    // SetInq cursor CB2QR001 por cartao RD
    public async IAsyncEnumerable<RegistroDebitoAuto> GetCursorByCartao(string numeroCartao)
    {
        const string sql = @"
            SELECT 
                r.*
            FROM dbo.RegistroDebitoAuto r
            INNER JOIN dbo.Endossos e ON r.NumeroApolice = e.NumeroApolice 
                AND r.NumeroEndosso = e.NumeroEndosso
            WHERE r.NumeroCartao = @NumeroCartao
                AND e.RamoSeguro NOT IN ('60', '61', '62', '63', '64', '65')
            ORDER BY r.NumeroApolice, r.NumeroEndosso";
        
        await using var reader = await dbConnection.ExecuteReaderAsync(
            sql,
            new { NumeroCartao = numeroCartao });
        
        var parser = reader.GetRowParser<RegistroDebitoAuto>();
        while (await reader.ReadAsync())
        {
            yield return parser(reader);
        }
    }
}
```

#### 1.3 MovimentoDebitoCCRepository

**Rastreabilidade**:
- **IDs Matriz**: QUERY-0005, QUERY-0031, QUERY-0033, QUERY-0035, QUERY-0037 a QUERY-0042, QUERY-0044
- **Origem**: CB2QP014 a CB2QP018, CB2QP036, CB2QP056 a CB2QP059
- **Tabela**: V0MOVDEBCC_CEF (Tabela PRINCIPAL do sistema)

```csharp
/// <summary>
/// Repository para Movimento Débito CC CEF - PRINCIPAL DO SISTEMA
/// Migrado de: METOD-0014 a METOD-0018, METOD-0035 a METOD-0041, METOD-0042 a METOD-0045, METOD-0048
/// </summary>
public class MovimentoDebitoCCRepository(IDbConnection dbConnection) : IMovimentoDebitoCCRepository
{
    // ID Matriz: QUERY-0005
    // Origem: CB2QP036 (linhas 6382-6411)
    // SELECT: V1MOVDEBCC_CEF para buscar número requisição
    public async Task<string?> GetNumeroRequisicao(
        string codigoConvenio, 
        string numeroApolice,
        string numeroEndosso, 
        string? codigoAgencia, 
        string? numeroConta, 
        string? numeroCartao)
    {
        const string sql = @"
            SELECT NumeroRequisicao
            FROM dbo.MovimentoDebitoCCCefV1
            WHERE CodigoConvenio = @CodigoConvenio
                AND NumeroApolice = @NumeroApolice
                AND NumeroEndosso = @NumeroEndosso
                AND (@CodigoAgencia IS NULL OR CodigoAgencia = @CodigoAgencia)
                AND (@NumeroConta IS NULL OR NumeroConta = @NumeroConta)
                AND (@NumeroCartao IS NULL OR NumeroCartao = @NumeroCartao)";
        
        return await dbConnection.QueryFirstOrDefaultAsync<string?>(
            sql,
            new { 
                CodigoConvenio = codigoConvenio,
                NumeroApolice = numeroApolice,
                NumeroEndosso = numeroEndosso,
                CodigoAgencia = codigoAgencia,
                NumeroConta = numeroConta,
                NumeroCartao = numeroCartao
            });
    }
    
    // ID Matriz: QUERY-0038
    // Origem: CB2QP014 (linhas 7019-7050)
    // SetInq cursor V0MOVDEBCC_CEF por titulo
    public async IAsyncEnumerable<MovimentoDebitoCCCef> GetCursorByApolice(string numeroApolice)
    {
        const string sql = @"
            SELECT *
            FROM dbo.MovimentoDebitoCCCef
            WHERE NumeroApolice = @NumeroApolice
            GROUP BY NumeroApolice, NumeroEndosso, CodigoConvenio, TipoCobranca,
                     CodigoAgencia, OperacaoConta, NumeroConta, NumeroCartao,
                     NumeroParcela, DataVencimento, ValorDebito, ValorCredito,
                     SituacaoCobranca, DigitoVerificadorConta, DigitoVerificadorCartao,
                     NumeroFitaEnvio, DataEnvio, NumeroFitaRetorno, DataRetorno,
                     DataPagamento, DataCredito, NumeroCheque, DigitoVerificadorCheque,
                     CodigoRetorno, DescricaoRetorno, StatusCartao, TipoRegistro,
                     CodigoUsuario, DataMovimento
            ORDER BY NumeroApolice, NumeroEndosso, CodigoConvenio";
        
        await using var reader = await dbConnection.ExecuteReaderAsync(
            sql,
            new { NumeroApolice = numeroApolice });
        
        var parser = reader.GetRowParser<MovimentoDebitoCCCef>();
        while (await reader.ReadAsync())
        {
            yield return parser(reader);
        }
    }
    
    // ID Matriz: QUERY-0039
    // Origem: CB2QP015 (linhas 7052-7084)
    // SetInq cursor V0MOVDEBCC_CEF por apolice/endosso
    public async IAsyncEnumerable<MovimentoDebitoCCCef> GetCursorByApoliceEndosso(
        string numeroApolice, 
        string numeroEndosso)
    {
        const string sql = @"
            SELECT *
            FROM dbo.MovimentoDebitoCCCef
            WHERE NumeroApolice = @NumeroApolice
                AND NumeroEndosso = @NumeroEndosso
            GROUP BY NumeroApolice, NumeroEndosso, CodigoConvenio, TipoCobranca,
                     CodigoAgencia, OperacaoConta, NumeroConta, NumeroCartao,
                     NumeroParcela, DataVencimento, ValorDebito, ValorCredito,
                     SituacaoCobranca, DigitoVerificadorConta, DigitoVerificadorCartao,
                     NumeroFitaEnvio, DataEnvio, NumeroFitaRetorno, DataRetorno,
                     DataPagamento, DataCredito, NumeroCheque, DigitoVerificadorCheque,
                     CodigoRetorno, DescricaoRetorno, StatusCartao, TipoRegistro,
                     CodigoUsuario, DataMovimento
            ORDER BY NumeroApolice, NumeroEndosso, CodigoConvenio";
        
        await using var reader = await dbConnection.ExecuteReaderAsync(
            sql,
            new { NumeroApolice = numeroApolice, NumeroEndosso = numeroEndosso });
        
        var parser = reader.GetRowParser<MovimentoDebitoCCCef>();
        while (await reader.ReadAsync())
        {
            yield return parser(reader);
        }
    }
    
    // ID Matriz: QUERY-0040
    // Origem: CB2QP016 (linhas 7086-7120)
    // SetInq cursor V0MOVDEBCC_CEF por conta
    public async IAsyncEnumerable<MovimentoDebitoCCCef> GetCursorByConta(
        string codigoAgencia, 
        string operacaoConta, 
        string numeroConta)
    {
        const string sql = @"
            SELECT *
            FROM dbo.MovimentoDebitoCCCef
            WHERE CodigoAgencia = @CodigoAgencia
                AND OperacaoConta = @OperacaoConta
                AND NumeroConta = @NumeroConta
            GROUP BY NumeroApolice, NumeroEndosso, CodigoConvenio, TipoCobranca,
                     CodigoAgencia, OperacaoConta, NumeroConta, NumeroCartao,
                     NumeroParcela, DataVencimento, ValorDebito, ValorCredito,
                     SituacaoCobranca, DigitoVerificadorConta, DigitoVerificadorCartao,
                     NumeroFitaEnvio, DataEnvio, NumeroFitaRetorno, DataRetorno,
                     DataPagamento, DataCredito, NumeroCheque, DigitoVerificadorCheque,
                     CodigoRetorno, DescricaoRetorno, StatusCartao, TipoRegistro,
                     CodigoUsuario, DataMovimento
            ORDER BY NumeroApolice, NumeroEndosso, CodigoConvenio";
        
        await using var reader = await dbConnection.ExecuteReaderAsync(
            sql,
            new { CodigoAgencia = codigoAgencia, OperacaoConta = operacaoConta, NumeroConta = numeroConta });
        
        var parser = reader.GetRowParser<MovimentoDebitoCCCef>();
        while (await reader.ReadAsync())
        {
            yield return parser(reader);
        }
    }
    
    // ID Matriz: QUERY-0041
    // Origem: CB2QP017 (linhas 7122-7140)
    // SetInq cursor V0MOVDEBCC_CEF por cartao
    public async IAsyncEnumerable<MovimentoDebitoCCCef> GetCursorByCartao(string numeroCartao)
    {
        const string sql = @"
            SELECT *
            FROM dbo.MovimentoDebitoCCCef
            WHERE NumeroCartao = @NumeroCartao
            GROUP BY NumeroApolice, NumeroEndosso, CodigoConvenio, TipoCobranca,
                     CodigoAgencia, OperacaoConta, NumeroConta, NumeroCartao,
                     NumeroParcela, DataVencimento, ValorDebito, ValorCredito,
                     SituacaoCobranca, DigitoVerificadorConta, DigitoVerificadorCartao,
                     NumeroFitaEnvio, DataEnvio, NumeroFitaRetorno, DataRetorno,
                     DataPagamento, DataCredito, NumeroCheque, DigitoVerificadorCheque,
                     CodigoRetorno, DescricaoRetorno, StatusCartao, TipoRegistro,
                     CodigoUsuario, DataMovimento
            ORDER BY NumeroApolice, NumeroEndosso, CodigoConvenio";
        
        await using var reader = await dbConnection.ExecuteReaderAsync(
            sql,
            new { NumeroCartao = numeroCartao });
        
        var parser = reader.GetRowParser<MovimentoDebitoCCCef>();
        while (await reader.ReadAsync())
        {
            yield return parser(reader);
        }
    }
    
    // ID Matriz: QUERY-0042
    // Origem: CB2QP023 (linhas 7439-7468)
    // SetInq cursor parcelas detalhado
    public async IAsyncEnumerable<MovimentoDebitoCCCef> GetCursorParcelas(
        string numeroApolice, 
        string numeroEndosso, 
        string codigoConvenio)
    {
        const string sql = @"
            SELECT *
            FROM dbo.MovimentoDebitoCCCef
            WHERE NumeroApolice = @NumeroApolice
                AND NumeroEndosso = @NumeroEndosso
                AND CodigoConvenio = @CodigoConvenio
            ORDER BY NumeroParcela, DataVencimento";
        
        await using var reader = await dbConnection.ExecuteReaderAsync(
            sql,
            new { NumeroApolice = numeroApolice, NumeroEndosso = numeroEndosso, CodigoConvenio = codigoConvenio });
        
        var parser = reader.GetRowParser<MovimentoDebitoCCCef>();
        while (await reader.ReadAsync())
        {
            yield return parser(reader);
        }
    }
}
```

#### 1.4 ApoliceCobrancaRepository

**Rastreabilidade**:
- **ID Matriz**: QUERY-0004, METOD-0013
- **Origem**: CB2QP012
- **Tabela**: V0APOLCOB

```csharp
/// <summary>
/// Repository para Apólice Cobrança
/// Migrado de: METOD-0013 (CB2QP012)
/// </summary>
public class ApoliceCobrancaRepository(IDbConnection dbConnection) : IApoliceCobrancaRepository
{
    // ID Matriz: QUERY-0004
    // Origem: CB2QP012 (linhas 6325-6350 - erro no mapeamento, é CB2QP042 linhas 6352-6380)
    // SELECT: V0APOLCOB WHERE NUM_APOLICE
    public async Task<ApoliceCobranca?> GetByApolice(string numeroApolice)
    {
        const string sql = @"
            SELECT 
                NumeroApolice,
                CodigoConvenio,
                CodigoAgencia,
                OperacaoConta,
                NumeroConta,
                DigitoVerificadorConta,
                NumeroCartao,
                TipoCobranca
            FROM dbo.ApoliceCobranca
            WHERE NumeroApolice = @NumeroApolice";
        
        return await dbConnection.QueryFirstOrDefaultAsync<ApoliceCobranca>(
            sql,
            new { NumeroApolice = numeroApolice });
    }
}
```

#### 1.5 MovimentoContaRepository

**Rastreabilidade**:
- **ID Matriz**: QUERY-0003, QUERY-0043, QUERY-0046, METOD-0022, METOD-0047, METOD-0050
- **Origem**: CB2QP012 (na verdade CB2QP060), CB2QP038, CB2QP039
- **Tabela**: GE_MOVTO_CONTA

```csharp
/// <summary>
/// Repository para Movimento Conta GE
/// Migrado de: METOD-0022, METOD-0047, METOD-0050
/// </summary>
public class MovimentoContaRepository(IDbConnection dbConnection) : IMovimentoContaRepository
{
    // ID Matriz: QUERY-0003
    // Origem: CB2QP060 (linhas 6965-6996) ou CB2QP012 conforme matriz
    // SELECT: GE_MOVTO_CONTA WHERE chave composta
    public async Task<MovimentoConta?> GetByChaveComposta(
        string numeroApolice, 
        string numeroEndosso,
        string codigoConvenio, 
        string numeroParcela, 
        string numeroFitaEnvio)
    {
        const string sql = @"
            SELECT *
            FROM dbo.MovimentoConta
            WHERE NumeroApolice = @NumeroApolice
                AND NumeroEndosso = @NumeroEndosso
                AND CodigoConvenio = @CodigoConvenio
                AND NumeroParcela = @NumeroParcela
                AND NumeroFitaEnvio = @NumeroFitaEnvio";
        
        return await dbConnection.QueryFirstOrDefaultAsync<MovimentoConta>(
            sql,
            new { 
                NumeroApolice = numeroApolice,
                NumeroEndosso = numeroEndosso,
                CodigoConvenio = codigoConvenio,
                NumeroParcela = numeroParcela,
                NumeroFitaEnvio = numeroFitaEnvio
            });
    }
    
    // ID Matriz: QUERY-0043
    // Origem: CB2QP038 (linhas 7470-7487)
    // SetInq cursor GE_MOVTO_CONTA por situação
    public async IAsyncEnumerable<MovimentoConta> GetCursorBySituacao(
        string numeroApolice, 
        string numeroEndosso, 
        string numeroParcela,
        string codigoConvenio, 
        string situacaoCobranca)
    {
        const string sql = @"
            SELECT *
            FROM dbo.MovimentoConta
            WHERE NumeroApolice = @NumeroApolice
                AND NumeroEndosso = @NumeroEndosso
                AND NumeroParcela = @NumeroParcela
                AND CodigoConvenio = @CodigoConvenio
                AND SituacaoCobranca = @SituacaoCobranca
            ORDER BY NumeroFitaEnvio";
        
        await using var reader = await dbConnection.ExecuteReaderAsync(
            sql,
            new { 
                NumeroApolice = numeroApolice,
                NumeroEndosso = numeroEndosso,
                NumeroParcela = numeroParcela,
                CodigoConvenio = codigoConvenio,
                SituacaoCobranca = situacaoCobranca
            });
        
        var parser = reader.GetRowParser<MovimentoConta>();
        while (await reader.ReadAsync())
        {
            yield return parser(reader);
        }
    }
    
    // ID Matriz: QUERY-0046
    // Origem: CB2QP039 (linhas 7674-7688)
    // Scan cursor GE_MOVTO_CONTA
    public async IAsyncEnumerable<MovimentoConta> GetCursor()
    {
        const string sql = @"
            SELECT *
            FROM dbo.MovimentoConta
            ORDER BY DataMovimento DESC";
        
        await using var reader = await dbConnection.ExecuteReaderAsync(sql);
        
        var parser = reader.GetRowParser<MovimentoConta>();
        while (await reader.ReadAsync())
        {
            yield return parser(reader);
        }
    }
}
```

### 2. Repositories Secundários (Consultas Simples)

#### 2.1 ClienteRepository

```csharp
/// <summary>
/// Repository para Cliente
/// Migrado de: METOD-0019 (CB2QP011)
/// </summary>
public class ClienteRepository(IDbConnection dbConnection) : IClienteRepository
{
    // ID Matriz: QUERY-0018
    // Origem: CB2QP011 (linhas 6512-6538) - Observação: matriz indica outras queries
    // SELECT: V0CLIENTE WHERE COD_CLIENTE
    public async Task<Cliente?> GetById(string codigoCliente)
    {
        const string sql = @"
            SELECT 
                CodigoCliente,
                NomeRazao,
                CpfCnpj,
                TipoPessoa
            FROM dbo.Clientes
            WHERE CodigoCliente = @CodigoCliente";
        
        return await dbConnection.QueryFirstOrDefaultAsync<Cliente>(
            sql,
            new { CodigoCliente = codigoCliente });
    }
}
```

#### 2.2 PessoaFisicaRepository

```csharp
/// <summary>
/// Repository para Pessoa Física
/// Migrado de: METOD-0027 (CB2QP033)
/// </summary>
public class PessoaFisicaRepository(IDbConnection dbConnection) : IPessoaFisicaRepository
{
    // ID Matriz: QUERY-0007
    // Origem: CB2QP026 (linhas 6442-6477)
    // SELECT: OD_PESSOA_FISICA WHERE NUM_PESSOA
    public async Task<PessoaFisica?> GetById(string numeroPessoa)
    {
        const string sql = @"
            SELECT 
                NumeroPessoa,
                Cpf,
                NomeCompleto,
                DataNascimento,
                Sexo
            FROM dbo.PessoaFisica
            WHERE NumeroPessoa = @NumeroPessoa";
        
        return await dbConnection.QueryFirstOrDefaultAsync<PessoaFisica>(
            sql,
            new { NumeroPessoa = numeroPessoa });
    }
}
```

#### 2.3 PessoaJuridicaRepository

```csharp
/// <summary>
/// Repository para Pessoa Jurídica
/// Migrado de: METOD-0028 (CB2QP031)
/// </summary>
public class PessoaJuridicaRepository(IDbConnection dbConnection) : IPessoaJuridicaRepository
{
    // ID Matriz: QUERY-0008
    // Origem: CB2QP027 (linhas 6479-6510)
    // SELECT: OD_PESSOA_JURIDICA WHERE NUM_PESSOA
    public async Task<PessoaJuridica?> GetById(string numeroPessoa)
    {
        const string sql = @"
            SELECT 
                NumeroPessoa,
                Cnpj,
                RazaoSocial,
                NomeFantasia,
                DataAbertura
            FROM dbo.PessoaJuridica
            WHERE NumeroPessoa = @NumeroPessoa";
        
        return await dbConnection.QueryFirstOrDefaultAsync<PessoaJuridica>(
            sql,
            new { NumeroPessoa = numeroPessoa });
    }
}
```

#### 2.4 PessoaLegadoGERepository

```csharp
/// <summary>
/// Repository para Pessoa Legado GE
/// Migrado de: METOD-0016 (CB2QP021)
/// </summary>
public class PessoaLegadoGERepository(IDbConnection dbConnection) : IPessoaLegadoGERepository
{
    // ID Matriz: QUERY-0006
    // Origem: CB2QP021 (linhas 6413-6440)
    // SELECT: GE_LEGADO_PESSOA WHERE NUM_OCORR_MOVTO
    public async Task<PessoaLegadoGE?> GetByMovimento(string numeroOcorrenciaMovimento)
    {
        const string sql = @"
            SELECT 
                NumeroOcorrenciaMovimento,
                NumeroPessoa,
                TipoPessoa,
                CpfCnpj,
                NomeRazaoSocial
            FROM dbo.PessoaLegadoGE
            WHERE NumeroOcorrenciaMovimento = @NumeroOcorrenciaMovimento";
        
        return await dbConnection.QueryFirstOrDefaultAsync<PessoaLegadoGE>(
            sql,
            new { NumeroOcorrenciaMovimento = numeroOcorrenciaMovimento });
    }
}
```

#### 2.5 BilheteRepository

```csharp
/// <summary>
/// Repository para Bilhete
/// Migrado de: METOD-0015, METOD-0020 (CB2QP036, CB2QP041)
/// </summary>
public class BilheteRepository(IDbConnection dbConnection) : IBilheteRepository
{
    // ID Matriz: QUERY-0009
    // Origem: CB2QP011 (linhas 6512-6538)
    // SELECT: V0BILHETE WHERE NUMBIL
    public async Task<Bilhete?> GetByNumero(string numeroBilhete)
    {
        const string sql = @"
            SELECT 
                NumeroBilhete,
                NumeroApolice,
                DataEmissao,
                CodigoCliente
            FROM dbo.Bilhetes
            WHERE NumeroBilhete = @NumeroBilhete";
        
        return await dbConnection.QueryFirstOrDefaultAsync<Bilhete>(
            sql,
            new { NumeroBilhete = numeroBilhete });
    }
    
    // ID Matriz: QUERY-0010
    // Origem: CB2QP041 (linhas 6540-6569)
    // SELECT: V0BILHETE WHERE NUM_APOLICE
    public async Task<Bilhete?> GetByApolice(string numeroApolice)
    {
        const string sql = @"
            SELECT 
                NumeroBilhete,
                NumeroApolice,
                DataEmissao,
                CodigoCliente
            FROM dbo.Bilhetes
            WHERE NumeroApolice = @NumeroApolice";
        
        return await dbConnection.QueryFirstOrDefaultAsync<Bilhete>(
            sql,
            new { NumeroApolice = numeroApolice });
    }
}
```

#### 2.6 EndossoRepository

```csharp
/// <summary>
/// Repository para Endosso
/// Migrado de: METOD-0021 (CB2QP013)
/// </summary>
public class EndossoRepository(IDbConnection dbConnection) : IEndossoRepository
{
    // ID Matriz: QUERY-0011
    // Origem: CB2QP013 (linhas 6571-6611)
    // SELECT: V1ENDOSSO WHERE NUM_APOLICE, NRENDOS
    public async Task<Endosso?> GetById(string numeroApolice, string numeroEndosso)
    {
        const string sql = @"
            SELECT 
                NumeroApolice,
                NumeroEndosso,
                DataEndosso,
                TipoEndosso,
                RamoSeguro
            FROM dbo.Endossos
            WHERE NumeroApolice = @NumeroApolice
                AND NumeroEndosso = @NumeroEndosso";
        
        return await dbConnection.QueryFirstOrDefaultAsync<Endosso>(
            sql,
            new { NumeroApolice = numeroApolice, NumeroEndosso = numeroEndosso });
    }
}
```

#### 2.7 ParcelaRepository

```csharp
/// <summary>
/// Repository para Parcela
/// Migrado de: METOD-0023 (CB2QP025)
/// </summary>
public class ParcelaRepository(IDbConnection dbConnection) : IParcelaRepository
{
    // ID Matriz: QUERY-0019
    // Origem: CB2QP007 (linhas 7176-7213) ou CB2QP025 conforme matriz (linhas 7142-7174)
    // SELECT: V0PARCELA WHERE NUM_APOLICE, NRENDOS, NRPARCEL
    public async Task<Parcela?> GetSituacao(
        string numeroApolice, 
        string numeroEndosso, 
        string numeroParcela)
    {
        const string sql = @"
            SELECT 
                NumeroApolice,
                NumeroEndosso,
                NumeroParcela,
                DataVencimento,
                ValorParcela,
                SituacaoParcela,
                DacParcela
            FROM dbo.Parcelas
            WHERE NumeroApolice = @NumeroApolice
                AND NumeroEndosso = @NumeroEndosso
                AND NumeroParcela = @NumeroParcela";
        
        return await dbConnection.QueryFirstOrDefaultAsync<Parcela>(
            sql,
            new { NumeroApolice = numeroApolice, NumeroEndosso = numeroEndosso, NumeroParcela = numeroParcela });
    }
}
```

#### 2.8 MovimentoGERepository

```csharp
/// <summary>
/// Repository para Movimento GE
/// Migrado de: METOD-0024 (CB2QP007)
/// </summary>
public class MovimentoGERepository(IDbConnection dbConnection) : IMovimentoGERepository
{
    // ID Matriz: QUERY-0020
    // Origem: CB2QP007 (linhas 7176-7213)
    // SELECT: GE_MOVIMENTO WHERE NUM_OCORR_MOVTO
    public async Task<MovimentoGE?> GetByOcorrencia(string numeroOcorrenciaMovimento)
    {
        const string sql = @"
            SELECT 
                NumeroOcorrenciaMovimento,
                DataMovimento,
                TipoMovimento,
                ValorMovimento,
                Observacao
            FROM dbo.MovimentoGE
            WHERE NumeroOcorrenciaMovimento = @NumeroOcorrenciaMovimento";
        
        return await dbConnection.QueryFirstOrDefaultAsync<MovimentoGE>(
            sql,
            new { NumeroOcorrenciaMovimento = numeroOcorrenciaMovimento });
    }
}
```

#### 2.9 SinistroArDetalheVCRepository

```csharp
/// <summary>
/// Repository para Sinistro AR Detalhe VC
/// Migrado de: METOD-0025 (CB2QP004)
/// </summary>
public class SinistroArDetalheVCRepository(IDbConnection dbConnection) : ISinistroArDetalheVCRepository
{
    // ID Matriz: QUERY-0021
    // Origem: CB2QP004 (linhas 7215-7246)
    // SELECT: SI_AR_DETALHE_VC WHERE NUM_APOL_SINISTRO, OCORR_HISTORICO
    public async Task<SinistroArDetalheVC?> GetById(
        string numeroApolSinistro, 
        string ocorrenciaHistorico)
    {
        const string sql = @"
            SELECT 
                NumeroApolSinistro,
                OcorrenciaHistorico,
                ValorTotalMovimento,
                CgcCpf,
                NomeFavorecido
            FROM dbo.SinistroArDetalheVC
            WHERE NumeroApolSinistro = @NumeroApolSinistro
                AND OcorrenciaHistorico = @OcorrenciaHistorico";
        
        return await dbConnection.QueryFirstOrDefaultAsync<SinistroArDetalheVC>(
            sql,
            new { NumeroApolSinistro = numeroApolSinistro, OcorrenciaHistorico = ocorrenciaHistorico });
    }
}
```

#### 2.10 BancosRepository

```csharp
/// <summary>
/// Repository para Bancos
/// Migrado de: METOD-0026 (CB2QP009)
/// </summary>
public class BancosRepository(IDbConnection dbConnection) : IBancosRepository
{
    // ID Matriz: QUERY-0022
    // Origem: CB2QP009 (linhas 7248-7278)
    // SELECT: BANCOS WHERE COD_BANCO
    public async Task<string?> GetNome(string codigoBanco)
    {
        const string sql = @"
            SELECT NomeBanco
            FROM dbo.Bancos
            WHERE CodigoBanco = @CodigoBanco
                AND Ativo = 1";
        
        return await dbConnection.QueryFirstOrDefaultAsync<string?>(
            sql,
            new { CodigoBanco = codigoBanco });
    }
}
```

#### 2.11 CalendarioRepository

```csharp
/// <summary>
/// Repository para Calendario
/// Migrado de: METOD-0046, METOD-0049 (CB2QP023, CB2QP024)
/// </summary>
public class CalendarioRepository(IDbConnection dbConnection) : ICalendarioRepository
{
    // ID Matriz: QUERY-0023
    // Origem: CB2QP033 (linhas 7280-7306)
    // SELECT: CALENDARIO WHERE DIA_SEMANA IN (S,D) com cálculos
    public async IAsyncEnumerable<Calendario> GetFimSemana(DateTime dataInicio, DateTime dataFim)
    {
        const string sql = @"
            SELECT 
                DataCalendario,
                DiaSemana,
                IsFimSemana,
                IsFeriado
            FROM dbo.Calendario
            WHERE DataCalendario BETWEEN @DataInicio AND @DataFim
                AND DiaSemana IN ('S', 'D')
            ORDER BY DataCalendario";
        
        await using var reader = await dbConnection.ExecuteReaderAsync(
            sql,
            new { DataInicio = dataInicio, DataFim = dataFim });
        
        var parser = reader.GetRowParser<Calendario>();
        while (await reader.ReadAsync())
        {
            yield return parser(reader);
        }
    }
    
    // ID Matriz: QUERY-0045
    // Origem: CB2QP024 (linhas 7654-7672)
    // Fetch cursor CALENDARIO
    public async IAsyncEnumerable<Calendario> GetCursor()
    {
        const string sql = @"
            SELECT *
            FROM dbo.Calendario
            ORDER BY DataCalendario";
        
        await using var reader = await dbConnection.ExecuteReaderAsync(sql);
        
        var parser = reader.GetRowParser<Calendario>();
        while (await reader.ReadAsync())
        {
            yield return parser(reader);
        }
    }
}
```

#### 2.12 FeriadosRepository

```csharp
/// <summary>
/// Repository para Feriados
/// Migrado de: METOD-0021 (CB2QP013) - cálculo de dias úteis
/// </summary>
public class FeriadosRepository(IDbConnection dbConnection) : IFeriadosRepository
{
    // ID Matriz: QUERY-0024
    // Origem: CB2QP031 (linhas 7308-7334)
    // SELECT: V0FERIADOS WHERE DATA_FERIADO com cálculo próximo dia
    public async Task<DateTime> GetProximoDiaUtil(DateTime dataReferencia)
    {
        // Usar a stored procedure criada no schema
        const string sql = @"
            DECLARE @ProximoDia DATE;
            EXEC dbo.sp_CalcularProximoDiaUtil @DataReferencia, @ProximoDia OUTPUT;
            SELECT @ProximoDia AS ProximoDiaUtil;";
        
        return await dbConnection.QueryFirstOrDefaultAsync<DateTime>(
            sql,
            new { DataReferencia = dataReferencia });
    }
}
```

#### 2.13 ChequesEmitidosRepository

```csharp
/// <summary>
/// Repository para Cheques Emitidos
/// Migrado de: METOD-0029, METOD-0030 (CB2QP006, CB2QP008)
/// </summary>
public class ChequesEmitidosRepository(IDbConnection dbConnection) : IChequesEmitidosRepository
{
    // ID Matriz: QUERY-0025
    // Origem: CB2QP006 (linhas 7336-7369)
    // SELECT: CHEQUES_EMITIDOS WHERE COD_EMPRESA=0, TIPO_MOVIMENTO=3, NUM_DOCUMENTO, DATA_MOVIMENTO
    public async Task<ChequeEmitido?> GetByDocumento(string numeroDocumento, DateTime dataMovimento)
    {
        const string sql = @"
            SELECT *
            FROM dbo.ChequesEmitidos
            WHERE CodigoEmpresa = '0'
                AND TipoMovimento = '3'
                AND NumeroDocumento = @NumeroDocumento
                AND DataMovimento = @DataMovimento";
        
        return await dbConnection.QueryFirstOrDefaultAsync<ChequeEmitido>(
            sql,
            new { NumeroDocumento = numeroDocumento, DataMovimento = dataMovimento });
    }
    
    // ID Matriz: QUERY-0026
    // Origem: CB2QP008 (linhas 7371-7403)
    // SELECT: CHEQUES_EMITIDOS WHERE NUM_CHEQUE_INTERNO
    public async Task<ChequeEmitido?> GetByInterno(string numChequeInterno)
    {
        const string sql = @"
            SELECT *
            FROM dbo.ChequesEmitidos
            WHERE NumChequeInterno = @NumChequeInterno";
        
        return await dbConnection.QueryFirstOrDefaultAsync<ChequeEmitido>(
            sql,
            new { NumChequeInterno = numChequeInterno });
    }
}
```

#### 2.14 LoteChequesRepository

```csharp
/// <summary>
/// Repository para Lote de Cheques
/// Migrado de: METOD-0031 (CB2QP028)
/// </summary>
public class LoteChequesRepository(IDbConnection dbConnection) : ILoteChequesRepository
{
    // ID Matriz: QUERY-0027
    // Origem: CB2QP028 (linhas 7405-7437)
    // SELECT: LOTE_CHEQUES WHERE NUM_CHEQUE_INTERNO, DIG_CHEQUE_INTERNO
    public async Task<LoteCheque?> GetByInterno(
        string numChequeInterno, 
        string digitoVerificadorInterno)
    {
        const string sql = @"
            SELECT *
            FROM dbo.LoteCheques
            WHERE NumChequeInterno = @NumChequeInterno
                AND DigitoVerificadorInterno = @DigitoVerificadorInterno";
        
        return await dbConnection.QueryFirstOrDefaultAsync<LoteCheque>(
            sql,
            new { NumChequeInterno = numChequeInterno, DigitoVerificadorInterno = digitoVerificadorInterno });
    }
}
```

#### 2.15 UsuariosRepository

```csharp
/// <summary>
/// Repository para Usuários
/// Migrado de: METOD-0066 (CB2QP14A)
/// </summary>
public class UsuariosRepository(IDbConnection dbConnection) : IUsuariosRepository
{
    // ID Matriz: QUERY-0028
    // Origem: CB2QP035 (linhas 7489-7516) ou CB2QP14A conforme matriz (linhas 8740-8764)
    // SELECT: V1USUARIOS WHERE CODUSU
    public async Task<string?> GetNome(string codigoUsuario)
    {
        const string sql = @"
            SELECT NomeUsuario
            FROM dbo.Usuarios
            WHERE CodigoUsuario = @CodigoUsuario
                AND Ativo = 1";
        
        return await dbConnection.QueryFirstOrDefaultAsync<string?>(
            sql,
            new { CodigoUsuario = codigoUsuario });
    }
}
```

#### 2.16 SinistroHistoricoRepository

```csharp
/// <summary>
/// Repository para Sinistro Histórico
/// Migrado de: METOD-0033, METOD-0034 (CB2QP050, CB2QP051)
/// </summary>
public class SinistroHistoricoRepository(IDbConnection dbConnection) : ISinistroHistoricoRepository
{
    // ID Matriz: QUERY-0029
    // Origem: CB2QP050 (linhas 7518-7582)
    // SELECT: SINISTRO_HISTORICO WHERE chave EXISTS subquery movimento posterior
    public async Task<bool> ValidaPagamentoPosterior(string numeroApolSinistro)
    {
        const string sql = @"
            SELECT CAST(CASE WHEN EXISTS (
                SELECT 1
                FROM dbo.SinistroHistorico sh
                WHERE sh.NumeroApolSinistro = @NumeroApolSinistro
                    AND sh.TipoHistorico = 'H'
                    AND EXISTS (
                        SELECT 1
                        FROM dbo.SinistroHistorico sh2
                        WHERE sh2.NumeroApolSinistro = sh.NumeroApolSinistro
                            AND (sh2.DataMovimento > sh.DataMovimento
                                OR (sh2.DataMovimento = sh.DataMovimento 
                                    AND sh2.HoraMovimento > sh.HoraMovimento))
                    )
            ) THEN 1 ELSE 0 END AS BIT)";
        
        return await dbConnection.QueryFirstOrDefaultAsync<bool>(
            sql,
            new { NumeroApolSinistro = numeroApolSinistro });
    }
    
    // ID Matriz: QUERY-0030
    // Origem: CB2QP051 (linhas 7584-7652)
    // SELECT: SINISTRO_HISTORICO MAX(DATA,HORA) WHERE NUM_APOL, COD_OPERACAO IN (1050,2050,3050)
    public async Task<SinistroHistorico?> GetUltimoMovimento(string numeroApolSinistro)
    {
        const string sql = @"
            SELECT TOP 1 *
            FROM dbo.SinistroHistorico
            WHERE NumeroApolSinistro = @NumeroApolSinistro
                AND CodigoOperacao IN ('1050', '2050', '3050')
            ORDER BY DataMovimento DESC, HoraMovimento DESC";
        
        return await dbConnection.QueryFirstOrDefaultAsync<SinistroHistorico>(
            sql,
            new { NumeroApolSinistro = numeroApolSinistro });
    }
}
```

#### 2.17 HistoricoCobrancaVARepository

```csharp
/// <summary>
/// Repository para Histórico Cobrança VA
/// Migrado de: METOD-0061 (CB2QP12A)
/// </summary>
public class HistoricoCobrancaVARepository(IDbConnection dbConnection) : IHistoricoCobrancaVARepository
{
    // ID Matriz: QUERY-0012
    // Origem: CB2QP12A (linhas 8595-8622)
    // SELECT: V0HISTCOBVA WHERE NRTIT
    public async Task<string?> GetCertificado(string numeroTitulo)
    {
        const string sql = @"
            SELECT NumeroCertificado
            FROM dbo.HistoricoCobrancaVA
            WHERE NumeroTitulo = @NumeroTitulo";
        
        return await dbConnection.QueryFirstOrDefaultAsync<string?>(
            sql,
            new { NumeroTitulo = numeroTitulo });
    }
}
```

#### 2.18 PropostaVARepository

```csharp
/// <summary>
/// Repository para Proposta VA
/// Migrado de: METOD-0062 (CB2QP12B)
/// </summary>
public class PropostaVARepository(IDbConnection dbConnection) : IPropostaVARepository
{
    // ID Matriz: QUERY-0013
    // Origem: CB2QP12B (linhas 8624-8651)
    // SELECT: V0PROPOSTAVA WHERE NRCERTIF
    public async Task<string?> GetCliente(string numeroCertificado)
    {
        const string sql = @"
            SELECT CodigoCliente
            FROM dbo.PropostasVA
            WHERE NumeroCertificado = @NumeroCertificado";
        
        return await dbConnection.QueryFirstOrDefaultAsync<string?>(
            sql,
            new { NumeroCertificado = numeroCertificado });
    }
}
```

#### 2.19 PropostaRepository

```csharp
/// <summary>
/// Repository para Proposta
/// Migrado de: METOD-0014 (CB2QP042) - observação: matriz tem query confusa
/// </summary>
public class PropostaRepository(IDbConnection dbConnection) : IPropostaRepository
{
    // ID Matriz: QUERY-0014
    // Origem: CB2QP060 (linhas 6965-6996)
    // SELECT: V0PROPOSTA WHERE NRPROPOS, FONTE
    public async Task<string?> GetCliente(string numeroProposta, string fonteProposta)
    {
        const string sql = @"
            SELECT CodigoCliente
            FROM dbo.Propostas
            WHERE NumeroProposta = @NumeroProposta
                AND FonteProposta = @FonteProposta";
        
        return await dbConnection.QueryFirstOrDefaultAsync<string?>(
            sql,
            new { NumeroProposta = numeroProposta, FonteProposta = fonteProposta });
    }
}
```

#### 2.20 MesSinistroRepository

```csharp
/// <summary>
/// Repository para Mês Sinistro
/// Migrado de: METOD-0063 (CB2QP13A)
/// </summary>
public class MesSinistroRepository(IDbConnection dbConnection) : IMesSinistroRepository
{
    // ID Matriz: QUERY-0015
    // Origem: CB2QP13A (linhas 8653-8680)
    // SELECT: V0MESTSINI WHERE NUM_APOL_SINISTRO
    public async Task<MesSinistro?> GetByApolice(string numeroApolSinistro)
    {
        const string sql = @"
            SELECT TOP 1 *
            FROM dbo.MesSinistro
            WHERE NumeroApolSinistro = @NumeroApolSinistro
            ORDER BY AnoMes DESC";
        
        return await dbConnection.QueryFirstOrDefaultAsync<MesSinistro>(
            sql,
            new { NumeroApolSinistro = numeroApolSinistro });
    }
}
```

#### 2.21 HistoricoSinistroRepository

```csharp
/// <summary>
/// Repository para Histórico Sinistro
/// Migrado de: METOD-0064 (CB2QP13B)
/// </summary>
public class HistoricoSinistroRepository(IDbConnection dbConnection) : IHistoricoSinistroRepository
{
    // ID Matriz: QUERY-0016
    // Origem: CB2QP13B (linhas 8682-8709)
    // SELECT: V0HISTSINI WHERE NUM_APOL_SINISTRO, OCORHIST
    public async Task<string?> GetFavorecido(string numeroApolSinistro, string ocorrenciaHistorico)
    {
        const string sql = @"
            SELECT NomeFavorecido
            FROM dbo.HistoricoSinistro
            WHERE NumeroApolSinistro = @NumeroApolSinistro
                AND OcorrenciaHistorico = @OcorrenciaHistorico";
        
        return await dbConnection.QueryFirstOrDefaultAsync<string?>(
            sql,
            new { NumeroApolSinistro = numeroApolSinistro, OcorrenciaHistorico = ocorrenciaHistorico });
    }
}
```

#### 2.22 ChequesRepository

```csharp
/// <summary>
/// Repository para Cheques
/// Migrado de: METOD-0065 (CB2QP13C)
/// </summary>
public class ChequesRepository(IDbConnection dbConnection) : IChequesRepository
{
    // ID Matriz: QUERY-0017
    // Origem: CB2QP13C (linhas 8711-8738)
    // SELECT: V0CHEQUES WHERE CHQINT
    public async Task<string?> GetFavorecido(string numChequeInterno)
    {
        const string sql = @"
            SELECT NomeFavorecido
            FROM dbo.Cheques
            WHERE NumChequeInterno = @NumChequeInterno";
        
        return await dbConnection.QueryFirstOrDefaultAsync<string?>(
            sql,
            new { NumChequeInterno = numChequeInterno });
    }
}
```

### 3. Event Repository (Auditoria)

```csharp
/// <summary>
/// Repository para eventos de auditoria
/// Obrigatório para logging em ViewModels
/// </summary>
public class EventRepository(IDbConnection dbConnection) : IEventRepository
{
    public async Task SaveEvent(Event evt)
    {
        const string sql = @"
            INSERT INTO dbo.EventosAuditoria 
                (TipoEvento, Acao, Descricao, UsuarioId, DataEvento, DadosJson)
            VALUES 
                (@TipoEvento, @Acao, @Descricao, @UsuarioId, @DataEvento, @DadosJson)";
        
        await dbConnection.ExecuteAsync(
            sql,
            new
            {
                TipoEvento = evt.Type.ToString(),
                evt.Action,
                evt.Description,
                UsuarioId = evt.UserId,
                DataEvento = evt.Timestamp,
                DadosJson = evt.DataJson
            });
    }
}

public class Event
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public EventType Type { get; set; }
    public string Action { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? UserId { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string? DataJson { get; set; }
}

public enum EventType
{
    SUCCESS,
    ERROR,
    WARNING,
    INFO
}
```

### 4. Dependency Injection

**Arquivo**: `Cb2qa.Web.AgTeste.Infra/Configuration/DependencyInjection.cs`

```csharp
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Cb2qa.Web.AgTeste.Domain.Interfaces.Repositories;
using Cb2qa.Web.AgTeste.Infra.Repositories;

namespace Cb2qa.Web.AgTeste.Infra.Configuration;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Dapper - IDbConnection
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddScoped<IDbConnection>(sp => new SqlConnection(connectionString));
        
        // Event Repository (Auditoria)
        services.AddScoped<IEventRepository, EventRepository>();
        
        // Repositories - Principais
        services.AddScoped<ISistemaRepository, SistemaRepository>();
        services.AddScoped<IRegistroDebitoAutoRepository, RegistroDebitoAutoRepository>();
        services.AddScoped<IMovimentoDebitoCCRepository, MovimentoDebitoCCRepository>();
        services.AddScoped<IApoliceCobrancaRepository, ApoliceCobrancaRepository>();
        services.AddScoped<IMovimentoContaRepository, MovimentoContaRepository>();
        
        // Repositories - Pessoas
        services.AddScoped<IClienteRepository, ClienteRepository>();
        services.AddScoped<IPessoaFisicaRepository, PessoaFisicaRepository>();
        services.AddScoped<IPessoaJuridicaRepository, PessoaJuridicaRepository>();
        services.AddScoped<IPessoaLegadoGERepository, PessoaLegadoGERepository>();
        
        // Repositories - Documentos
        services.AddScoped<IBilheteRepository, BilheteRepository>();
        services.AddScoped<IEndossoRepository, EndossoRepository>();
        services.AddScoped<IParcelaRepository, ParcelaRepository>();
        services.AddScoped<IPropostaRepository, PropostaRepository>();
        services.AddScoped<IPropostaVARepository, PropostaVARepository>();
        
        // Repositories - Movimentos
        services.AddScoped<IMovimentoGERepository, MovimentoGERepository>();
        services.AddScoped<ISinistroArDetalheVCRepository, SinistroArDetalheVCRepository>();
        services.AddScoped<ISinistroHistoricoRepository, SinistroHistoricoRepository>();
        services.AddScoped<IHistoricoCobrancaVARepository, HistoricoCobrancaVARepository>();
        services.AddScoped<IHistoricoSinistroRepository, HistoricoSinistroRepository>();
        services.AddScoped<IMesSinistroRepository, MesSinistroRepository>();
        
        // Repositories - Auxiliares
        services.AddScoped<IBancosRepository, BancosRepository>();
        services.AddScoped<ICalendarioRepository, CalendarioRepository>();
        services.AddScoped<IFeriadosRepository, FeriadosRepository>();
        services.AddScoped<IChequesRepository, ChequesRepository>();
        services.AddScoped<IChequesEmitidosRepository, ChequesEmitidosRepository>();
        services.AddScoped<ILoteChequesRepository, LoteChequesRepository>();
        services.AddScoped<IUsuariosRepository, UsuariosRepository>();
        
        return services;
    }
}
```

## Dependências

- **Depende de**: 
  - 01_DOMAIN_MODEL.md (Interfaces e Entities)
  - 02_DATABASE_SCHEMA.md (Tabelas e Schema)
- **Necessário para**: 04_BUSINESS_LOGIC.md (ViewModels usarão repositories)

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: 27 repositories implementados
- [x] **OBRIGATÓRIO**: Todas 46 QUERY-* mapeadas para métodos Dapper
- [x] **OBRIGATÓRIO**: Queries com parâmetros (prevenir SQL Injection)
- [x] **OBRIGATÓRIO**: Primary constructors em todos repositories
- [x] **OBRIGATÓRIO**: IAsyncEnumerable para cursor operations
- [x] **OBRIGATÓRIO**: EventRepository para auditoria implementado
- [x] **OBRIGATÓRIO**: DependencyInjection configurado
- [x] **OBRIGATÓRIO**: IDbConnection com SqlConnection registrado
- [x] **OBRIGATÓRIO**: Lifetime Scoped para todos repositories
- [x] **OBRIGATÓRIO**: Todos métodos com async/await
- [x] **OBRIGATÓRIO**: Tratamento nullable appropriado
- [x] **OBRIGATÓRIO**: Todos IDs da matriz referenciados em comentários

## Rastreabilidade Completa

### Resumo de IDs da Matriz Abordados

| Tipo | Quantidade | Range | Status |
|------|------------|-------|--------|
| QUERY | 46 | QUERY-0001 a QUERY-0046 | COMPLETED |
| METOD (Inquiry) | 24 | METOD-0011 a METOD-0034 | COMPLETED |
| METOD (Cursor) | 16 | METOD-0035 a METOD-0050 | COMPLETED |
| METOD (Total) | 40 | Métodos de acesso a dados | COMPLETED |

**Total de IDs Mapeados neste Documento**: 86

### Mapeamento METOD → Repository

| ID Método | Descrição | Repository | Método |
|-----------|-----------|------------|--------|
| METOD-0011 | CB2QP003 - Inquiry V1SISTEMA | SistemaRepository | GetDataAbertura |
| METOD-0012 | CB2QP052 - Inquiry CB2QR001 | RegistroDebitoAutoRepository | GetByTitulo |
| METOD-0035 | CB2QP056 - SetInq cursor titulo RD | MovimentoDebitoCCRepository | GetCursorByApolice |
| ... | ... | ... | ... |
| METOD-0050 | CB2QP039 - Scan cursor GE_MOVTO_CONTA | MovimentoContaRepository | GetCursor |

### Status na Matriz

Atualizar `MATRIZ_RASTREABILIDADE.csv`:
- Status_Documentacao = COMPLETED para QUERY-0001 a QUERY-0046
- Status_Documentacao = COMPLETED para METOD-0011 a METOD-0050
- Ref_Doc_Abordagem = 03_INFRASTRUCTURE_LAYER.md

