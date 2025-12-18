import csv

# Lista de duplicações conhecidas
duplicacoes_conhecidas = {
    'METOD-0072': 'METOD-0004',  # CB2QP019
    'METOD-0073': 'METOD-0051',  # CB2QS014
    'METOD-0074': 'METOD-0055',  # CB2QS021
    'METOD-0075': 'METOD-0056',  # CB2QP022
    'METOD-0076': 'METOD-0057',  # CB2QS022
    'METOD-0077': 'METOD-0006',  # CB2QP029
    'METOD-0078': 'METOD-0058',  # CB2QS031
    'METOD-0079': 'METOD-0059',  # CB2QS032
    'METOD-0080': 'METOD-0060',  # CB2QS033
}

# Ler matriz
with open('MATRIZ_RASTREABILIDADE.csv', 'r', encoding='utf-8-sig') as f:
    lines = f.readlines()

metodos = {}
for line in lines[1:]:
    if line.strip():
        parts = line.strip().split(',', maxsplit=12)
        if len(parts) >= 7:
            id = parts[0]
            tipo = parts[1]
            desc = parts[4]
            linhas = parts[6]
            if tipo == 'METODO':
                metodos[id] = {'desc': desc, 'linhas': linhas}

print("="*80)
print("VERIFICACAO DAS 9 DUPLICACOES CONHECIDAS")
print("="*80)
print()

confirmadas = []
nao_confirmadas = []

for dup_id, orig_id in duplicacoes_conhecidas.items():
    if dup_id in metodos and orig_id in metodos:
        dup_data = metodos[dup_id]
        orig_data = metodos[orig_id]
        
        print(f"DUPLICACAO: {dup_id} <-> {orig_id}")
        print(f"  {dup_id}: {dup_data['desc'][:60]}... (linhas {dup_data['linhas']})")
        print(f"  {orig_id}: {orig_data['desc'][:60]}... (linhas {orig_data['linhas']})")
        
        # Verificar se são realmente duplicatas
        if dup_data['linhas'] == orig_data['linhas']:
            print(f"  STATUS: CONFIRMADA - Mesmas linhas!")
            confirmadas.append((dup_id, orig_id))
        else:
            print(f"  STATUS: NAO CONFIRMADA - Linhas diferentes")
            nao_confirmadas.append((dup_id, orig_id))
        print()
    else:
        print(f"ERRO: {dup_id} ou {orig_id} nao encontrado na matriz")
        print()

print("="*80)
print("PROCURANDO OUTRAS DUPLICACOES POTENCIAIS")
print("="*80)
print()

# Procurar outras duplicações por linha
linhas_index = {}
for id, data in metodos.items():
    linhas = data['linhas']
    if linhas not in linhas_index:
        linhas_index[linhas] = []
    linhas_index[linhas].append((id, data['desc']))

outras_duplicacoes = []
for linhas, items in linhas_index.items():
    if len(items) > 1 and linhas != 'N/A':
        # Verificar se já não estão na lista conhecida
        ids = [item[0] for item in items]
        is_known = any(id in duplicacoes_conhecidas or id in duplicacoes_conhecidas.values() for id in ids)
        
        if not is_known:
            print(f"NOVA DUPLICACAO ENCONTRADA - Linhas {linhas}:")
            for id, desc in items:
                print(f"  {id}: {desc}")
            print()
            outras_duplicacoes.append((linhas, items))

print()
print("="*80)
print("RESUMO FINAL")
print("="*80)
print(f"Duplicacoes conhecidas confirmadas: {len(confirmadas)}")
print(f"Duplicacoes conhecidas NAO confirmadas: {len(nao_confirmadas)}")
print(f"Novas duplicacoes encontradas: {len(outras_duplicacoes)}")
print()

if confirmadas:
    print("IDs DUPLICADOS A REMOVER:")
    for dup_id, orig_id in confirmadas:
        print(f"  - {dup_id} (duplicata de {orig_id})")

if outras_duplicacoes:
    print()
    print("ATENCAO: NOVAS DUPLICACOES ENCONTRADAS!")
    print("Necessario analise manual adicional")

