import csv
from collections import defaultdict
import sys

# Ler a matriz
with open('MATRIZ_RASTREABILIDADE.csv', 'r', encoding='utf-8-sig') as f:
    lines = f.readlines()
    
# Processar manualmente
header = lines[0].strip().split(',')
print(f"Header: {header}\n")

rows = []
for line in lines[1:]:
    if line.strip():
        parts = line.strip().split(',', maxsplit=12)  # 13 colunas
        if len(parts) >= 13:
            rows.append({
                'Id': parts[0],
                'Tipo': parts[1],
                'Objeto_Pai': parts[2],
                'Tipo_Objeto_Pai': parts[3],
                'Descricao_Breve': parts[4],
                'Ref_Legado_Arquivo': parts[5],
                'Ref_Legado_Linhas': parts[6],
                'Desc_Abordagem': parts[7],
                'Ref_Doc_Abordagem': parts[8],
                'Ref_Doc_Linhas': parts[9],
                'Status_Documentacao': parts[10],
                'Status_Implementacao': parts[11],
                'Status_Teste_Unitario': parts[12]
            })

print(f"Total de linhas processadas: {len(rows)}\n")

# 1. Verificar IDs duplicados
print("="*80)
print("1. IDs DUPLICADOS")
print("="*80)
ids = [r['Id'] for r in rows if r['Id']]
id_counts = defaultdict(int)
for id in ids:
    id_counts[id] += 1

duplicated_ids = {id: count for id, count in id_counts.items() if count > 1}
if duplicated_ids:
    print(f"ENCONTRADOS {len(duplicated_ids)} IDs duplicados:")
    for id, count in sorted(duplicated_ids.items()):
        print(f"  {id}: {count} ocorrências")
else:
    print("OK - Nenhum ID duplicado encontrado")

# 2. Verificar descrições + linhas duplicadas
print("\n" + "="*80)
print("2. METODOS COM MESMA DESCRICAO E LINHAS (conteúdo duplicado)")
print("="*80)
content_map = defaultdict(list)
for row in rows:
    if not row['Id'] or row['Tipo'] != 'METODO':
        continue
    # Extrair nome da função da descrição
    desc = row['Descricao_Breve']
    nome_funcao = desc.split(' - ')[0] if ' - ' in desc else desc
    key = (nome_funcao, row['Ref_Legado_Linhas'])
    content_map[key].append((row['Id'], desc))

duplicated_content = {k: v for k, v in content_map.items() if len(v) > 1}
if duplicated_content:
    print(f"ENCONTRADAS {len(duplicated_content)} duplicações de METODO:")
    for (nome, linhas), items in sorted(duplicated_content.items()):
        print(f"\nFunção: {nome} (linhas {linhas})")
        for id, desc in items:
            print(f"  {id}: {desc}")
else:
    print("OK - Nenhuma duplicacao de conteudo encontrada")

# 3. Verificar OBJETOS duplicados
print("\n" + "="*80)
print("3. OBJETOS COM MESMO NOME E LINHA")
print("="*80)
obj_map = defaultdict(list)
for row in rows:
    if not row['Id'] or row['Tipo'] != 'OBJETO':
        continue
    desc = row['Descricao_Breve']
    nome_obj = desc.split(' - ')[0] if ' - ' in desc else desc
    key = (nome_obj, row['Ref_Legado_Linhas'], row['Objeto_Pai'])
    obj_map[key].append((row['Id'], desc))

duplicated_obj = {k: v for k, v in obj_map.items() if len(v) > 1}
if duplicated_obj:
    print(f"ENCONTRADAS {len(duplicated_obj)} duplicações de OBJETO:")
    for (nome, linhas, pai), items in sorted(duplicated_obj.items()):
        print(f"\nObjeto: {nome} (linha {linhas}, pai: {pai})")
        for id, desc in items:
            print(f"  {id}: {desc}")
else:
    print("OK - Nenhuma duplicacao de objetos encontrada")

# 4. Verificar REGRAS duplicadas
print("\n" + "="*80)
print("4. REGRAS COM MESMA DESCRICAO E LINHAS")
print("="*80)
regra_map = defaultdict(list)
for row in rows:
    if not row['Id'] or row['Tipo'] != 'REGRA':
        continue
    key = (row['Descricao_Breve'], row['Ref_Legado_Linhas'], row['Objeto_Pai'])
    regra_map[key].append(row['Id'])

duplicated_regra = {k: v for k, v in regra_map.items() if len(v) > 1}
if duplicated_regra:
    print(f"ENCONTRADAS {len(duplicated_regra)} duplicações de REGRA:")
    for (desc, linhas, pai), ids in sorted(duplicated_regra.items()):
        print(f"\nRegra: {desc[:70]}... (linhas {linhas}, pai: {pai})")
        print(f"  IDs: {ids}")
else:
    print("OK - Nenhuma duplicacao de regras encontrada")

# 5. Verificar QUERIES duplicadas
print("\n" + "="*80)
print("5. QUERIES COM MESMA DESCRICAO E LINHAS")
print("="*80)
query_map = defaultdict(list)
for row in rows:
    if not row['Id'] or row['Tipo'] != 'QUERY':
        continue
    key = (row['Descricao_Breve'], row['Ref_Legado_Linhas'], row['Objeto_Pai'])
    query_map[key].append(row['Id'])

duplicated_query = {k: v for k, v in query_map.items() if len(v) > 1}
if duplicated_query:
    print(f"ENCONTRADAS {len(duplicated_query)} duplicações de QUERY:")
    for (desc, linhas, pai), ids in sorted(duplicated_query.items()):
        print(f"\nQuery: {desc[:70]}... (linhas {linhas}, pai: {pai})")
        print(f"  IDs: {ids}")
else:
    print("OK - Nenhuma duplicacao de queries encontrada")

# 6. Verificar ENTIDADES duplicadas  
print("\n" + "="*80)
print("6. ENTIDADES COM MESMO NOME")
print("="*80)
ent_map = defaultdict(list)
for row in rows:
    if not row['Id'] or row['Tipo'] != 'ENTIDADE':
        continue
    nome_ent = row['Descricao_Breve'].split(' - ')[0] if ' - ' in row['Descricao_Breve'] else row['Descricao_Breve']
    key = nome_ent
    ent_map[key].append((row['Id'], row['Descricao_Breve'], row['Ref_Legado_Linhas']))

duplicated_ent = {k: v for k, v in ent_map.items() if len(v) > 1}
if duplicated_ent:
    print(f"ENCONTRADAS {len(duplicated_ent)} duplicações de ENTIDADE:")
    for nome, items in sorted(duplicated_ent.items()):
        print(f"\nEntidade: {nome}")
        for id, desc, linhas in items:
            print(f"  {id}: {desc} (linha {linhas})")
else:
    print("OK - Nenhuma duplicacao de entidades encontrada")

# Resumo final
print("\n" + "="*80)
print("RESUMO GERAL")
print("="*80)
total_duplicacoes = len(duplicated_content) + len(duplicated_obj) + len(duplicated_regra) + len(duplicated_query) + len(duplicated_ent)
print(f"Total de duplicações encontradas: {total_duplicacoes}")
print(f"  - Métodos: {len(duplicated_content)}")
print(f"  - Objetos: {len(duplicated_obj)}")
print(f"  - Regras: {len(duplicated_regra)}")
print(f"  - Queries: {len(duplicated_query)}")
print(f"  - Entidades: {len(duplicated_ent)}")

