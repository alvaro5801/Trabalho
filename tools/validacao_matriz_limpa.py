"""
Validação final da MATRIZ_RASTREABILIDADE.csv limpa
"""

# Ler matriz limpa
with open('MATRIZ_RASTREABILIDADE.csv', 'r', encoding='utf-8-sig') as f:
    lines = f.readlines()

# Contar por tipo
contadores = {}
total_registros = 0

for line in lines[1:]:  # Pular header
    if line.strip():
        tipo = line.split(',')[1] if len(line.split(',')) > 1 else None
        if tipo:
            contadores[tipo] = contadores.get(tipo, 0) + 1
            total_registros += 1

print("="*80)
print("VALIDACAO DA MATRIZ LIMPA")
print("="*80)
print()
print(f"Total de linhas no arquivo: {len(lines)}")
print(f"Total de registros validos: {total_registros}")
print()
print("Distribuicao por tipo:")
print("-" * 40)
for tipo in sorted(contadores.keys()):
    print(f"  {tipo:15s}: {contadores[tipo]:3d}")
print("-" * 40)
print(f"  {'TOTAL':15s}: {total_registros:3d}")
print()

# Verificar se há IDs duplicados
ids = []
for line in lines[1:]:
    if line.strip():
        id_linha = line.split(',', 1)[0]
        if id_linha:
            ids.append(id_linha)

ids_unicos = set(ids)
print("Verificacao de IDs:")
print(f"  Total de IDs: {len(ids)}")
print(f"  IDs unicos: {len(ids_unicos)}")
print(f"  Duplicacoes: {len(ids) - len(ids_unicos)}")
print()

if len(ids) == len(ids_unicos):
    print("OK - TODOS os IDs sao unicos!")
else:
    print(f"ERRO - Existem {len(ids) - len(ids_unicos)} IDs duplicados")
    # Encontrar duplicados
    from collections import Counter
    id_counts = Counter(ids)
    dups = {id: count for id, count in id_counts.items() if count > 1}
    print(f"IDs duplicados: {dups}")

print()
print("="*80)
print("ESTATISTICAS ESPERADAS vs OBTIDAS")
print("="*80)
print(f"  Esperado: 400 linhas -> Obtido: {len(lines)} linhas")
print(f"  Esperado: 399 registros -> Obtido: {total_registros} registros")
print(f"  Esperado: 71 METODO -> Obtido: {contadores.get('METODO', 0)} METODO")
print()

# Status final
if len(lines) == 400 and total_registros == 399 and contadores.get('METODO', 0) == 71 and len(ids) == len(ids_unicos):
    print("="*80)
    print("STATUS: MATRIZ LIMPA VALIDADA COM SUCESSO!")
    print("="*80)
    print("- Todas as 9 duplicacoes foram removidas")
    print("- Nenhum ID duplicado existe")
    print("- Contagens estao corretas")
    print("- Matriz pronta para uso!")
else:
    print("ATENCAO - Verificar discrepancias acima")

