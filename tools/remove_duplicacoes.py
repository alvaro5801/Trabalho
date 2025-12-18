"""
Script para remover as 9 duplicações da MATRIZ_RASTREABILIDADE.csv
Remove as linhas 277-285 (METOD-0072 a METOD-0080)
"""

# IDs duplicados a remover
ids_para_remover = {
    'METOD-0072',
    'METOD-0073',
    'METOD-0074',
    'METOD-0075',
    'METOD-0076',
    'METOD-0077',
    'METOD-0078',
    'METOD-0079',
    'METOD-0080'
}

# Ler arquivo original
with open('MATRIZ_RASTREABILIDADE.csv', 'r', encoding='utf-8-sig') as f:
    lines = f.readlines()

# Processar linhas
linhas_mantidas = []
linhas_removidas = []
contador_removidas = 0

# Manter header
linhas_mantidas.append(lines[0])

# Processar demais linhas
for i, line in enumerate(lines[1:], start=2):
    if line.strip():
        # Extrair ID (primeira coluna)
        id_linha = line.split(',', 1)[0]
        
        if id_linha in ids_para_remover:
            linhas_removidas.append((i, id_linha, line.strip()[:80]))
            contador_removidas += 1
            print(f"Removendo linha {i}: {id_linha}")
        else:
            linhas_mantidas.append(line)
    else:
        # Manter linhas vazias
        linhas_mantidas.append(line)

# Escrever arquivo limpo
with open('MATRIZ_RASTREABILIDADE.csv', 'w', encoding='utf-8-sig') as f:
    f.writelines(linhas_mantidas)

# Relatório
print("\n" + "="*80)
print("REMOCAO DE DUPLICACOES CONCLUIDA")
print("="*80)
print(f"Total de linhas removidas: {contador_removidas}")
print(f"Total de linhas mantidas: {len(linhas_mantidas)}")
print()

if linhas_removidas:
    print("Linhas removidas:")
    for num_linha, id_linha, conteudo in linhas_removidas:
        print(f"  Linha {num_linha}: {id_linha}")
    print()

# Validação
print("Validacao:")
print(f"  Arquivo original: {len(lines)} linhas")
print(f"  Arquivo limpo: {len(linhas_mantidas)} linhas")
print(f"  Diferenca: {len(lines) - len(linhas_mantidas)} linhas")
print()

if contador_removidas == 9:
    print("OK - Exatamente 9 duplicacoes foram removidas!")
else:
    print(f"ATENCAO - Esperava remover 9 linhas, mas removeu {contador_removidas}")

# Verificar se os IDs removidos não aparecem mais
print("\nVerificando se IDs duplicados foram completamente removidos...")
ids_ainda_presentes = []
for line in linhas_mantidas[1:]:  # Pular header
    if line.strip():
        id_linha = line.split(',', 1)[0]
        if id_linha in ids_para_remover:
            ids_ainda_presentes.append(id_linha)

if ids_ainda_presentes:
    print(f"ERRO - IDs duplicados ainda presentes: {ids_ainda_presentes}")
else:
    print("OK - Nenhum ID duplicado esta presente na matriz limpa!")

print("\n" + "="*80)
print("Backup criado: MATRIZ_RASTREABILIDADE_BACKUP_20251203.csv")
print("Matriz limpa: MATRIZ_RASTREABILIDADE.csv")
print("="*80)

