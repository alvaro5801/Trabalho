# 08 - CONFIGURATION

## Objetivo

Definir todas as configurações do sistema VGFNA, incluindo appsettings.json, connection strings, configurações de logging, Swagger e outras configurações necessárias para o funcionamento do sistema.

## Mapeamento de Legado

### Origem
- **Arquivo**: `_LEGADO/vgfna.esf`
- **Contexto**: Configurações do sistema legado

### Destino
- **Arquivos**: `appsettings.json`, `appsettings.Development.json`, `appsettings.Production.json`
- **Tecnologia**: Microsoft.Extensions.Configuration

## Especificação Técnica

### 1. appsettings.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Vgfna.Web.AgTeste": "Information"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "VgfnaAgTeste": "Server=localhost;Database=VgfnaAgTeste;Integrated Security=true;TrustServerCertificate=true;"
  },
  "Swagger": {
    "Title": "VGFNA API",
    "Version": "v1",
    "Description": "API para Alteração de Dados Básicos - Sistema VGFNA"
  },
  "Auditoria": {
    "HabilitarLog": true,
    "TabelaAuditoria": "AuditoriaAlteracao"
  }
}
```

### 2. appsettings.Development.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Information",
      "Vgfna.Web.AgTeste": "Debug"
    }
  },
  "ConnectionStrings": {
    "VgfnaAgTeste": "Server=localhost;Database=VgfnaAgTeste_Dev;Integrated Security=true;TrustServerCertificate=true;"
  }
}
```

### 3. appsettings.Production.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning",
      "Vgfna.Web.AgTeste": "Information"
    }
  },
  "ConnectionStrings": {
    "VgfnaAgTeste": "Server=prod-server;Database=VgfnaAgTeste;User Id=vgfna_user;Password=***;TrustServerCertificate=true;"
  }
}
```

## Dependências

- **Depende de**: 07_DEPENDENCY_INJECTION.md (usa connection strings)
- **Necessário para**: Todos os documentos de implementação

## Checklist de Implementação

- [x] **OBRIGATÓRIO**: appsettings.json criado
- [x] **OBRIGATÓRIO**: appsettings.Development.json criado
- [x] **OBRIGATÓRIO**: appsettings.Production.json criado
- [x] **OBRIGATÓRIO**: Connection strings configuradas
- [x] **OBRIGATÓRIO**: Logging configurado
- [x] **OBRIGATÓRIO**: Swagger configurado

## Rastreabilidade Completa

### Resumo de IDs da Matriz Abordados

Este documento não mapeia IDs específicos da matriz, mas configura o sistema para suportar todos os componentes documentados nos documentos anteriores.

### Status na Matriz

Não aplicável - este é um documento de configuração técnica.

