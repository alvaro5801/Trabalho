#!/usr/bin/env python3
"""
Script para atualizar MATRIZ_RASTREABILIDADE.csv com colunas e referências As-Is
"""

# Mapeamento completo de atualizações
UPDATES = {
    # Documento 01 - TELAS
    'TELA-0001': ('01_TELAS_INTERFACE.md', '49-159'),
    'TELA-0002': ('01_TELAS_INTERFACE.md', '161-217'),
    'TELA-0003': ('01_TELAS_INTERFACE.md', '219-269'),
    'TELA-0004': ('01_TELAS_INTERFACE.md', '271-318'),
    'TELA-0005': ('01_TELAS_INTERFACE.md', '35'),
    'TELA-0006': ('01_TELAS_INTERFACE.md', '36'),
    'TELA-0007': ('01_TELAS_INTERFACE.md', '37'),
    'TELA-0008': ('01_TELAS_INTERFACE.md', '38'),
    
    # OBJs da tela CB2QM010
    'OBJ-0001': ('01_TELAS_INTERFACE.md', '78'),
    'OBJ-0002': ('01_TELAS_INTERFACE.md', '79'),
    'OBJ-0003': ('01_TELAS_INTERFACE.md', '80'),
    'OBJ-0004': ('01_TELAS_INTERFACE.md', '81'),
    'OBJ-0005': ('01_TELAS_INTERFACE.md', '82'),
    'OBJ-0006': ('01_TELAS_INTERFACE.md', '83'),
    'OBJ-0007': ('01_TELAS_INTERFACE.md', '84'),
    'OBJ-0008': ('01_TELAS_INTERFACE.md', '85'),
    'OBJ-0009': ('01_TELAS_INTERFACE.md', '86'),
    'OBJ-0010': ('01_TELAS_INTERFACE.md', '87'),
    'OBJ-0011': ('01_TELAS_INTERFACE.md', '88'),
    'OBJ-0012': ('01_TELAS_INTERFACE.md', '89'),
    'OBJ-0013': ('01_TELAS_INTERFACE.md', '90'),
    'OBJ-0014': ('01_TELAS_INTERFACE.md', '91'),
    'OBJ-0015': ('01_TELAS_INTERFACE.md', '92'),
    'OBJ-0016': ('01_TELAS_INTERFACE.md', '93'),
    
    # FTELAs
    'FTELA-0001': ('01_TELAS_INTERFACE.md', '44,54'),
    'FTELA-0002': ('01_TELAS_INTERFACE.md', '44,168'),
    'FTELA-0003': ('01_TELAS_INTERFACE.md', '44,226'),
    'FTELA-0004': ('01_TELAS_INTERFACE.md', '44,278'),
    
    # Documento 02 - ENTIDADES
    'ENT-0001': ('02_MODELO_DADOS.md', '24'),
    'ENT-0002': ('02_MODELO_DADOS.md', '25'),
    'ENT-0003': ('02_MODELO_DADOS.md', '24,43-110'),
    'ENT-0004': ('02_MODELO_DADOS.md', '26'),
    'ENT-0005': ('02_MODELO_DADOS.md', '27'),
    'ENT-0006': ('02_MODELO_DADOS.md', '28'),
    'ENT-0007': ('02_MODELO_DADOS.md', '29,130-136'),
    'ENT-0008': ('02_MODELO_DADOS.md', '30'),
    'ENT-0009': ('02_MODELO_DADOS.md', '31'),
    'ENT-0010': ('02_MODELO_DADOS.md', '32'),
    'ENT-0011': ('02_MODELO_DADOS.md', '33'),
    'ENT-0012': ('02_MODELO_DADOS.md', '34'),
    'ENT-0013': ('02_MODELO_DADOS.md', '35'),
    'ENT-0014': ('02_MODELO_DADOS.md', '36'),
    'ENT-0015': ('02_MODELO_DADOS.md', '37'),
    'ENT-0016': ('02_MODELO_DADOS.md', '38'),
    'ENT-0017': ('02_MODELO_DADOS.md', '39'),
    'ENT-0018': ('02_MODELO_DADOS.md', '40'),
    'ENT-0019': ('02_MODELO_DADOS.md', '41'),
    'ENT-0020': ('02_MODELO_DADOS.md', '42'),
    'ENT-0021': ('02_MODELO_DADOS.md', '43'),
    'ENT-0022': ('02_MODELO_DADOS.md', '44'),
    'ENT-0023': ('02_MODELO_DADOS.md', '45'),
    'ENT-0024': ('02_MODELO_DADOS.md', '46'),
    'ENT-0025': ('02_MODELO_DADOS.md', '47'),
    'ENT-0026': ('02_MODELO_DADOS.md', '48'),
    'ENT-0027': ('02_MODELO_DADOS.md', '49,115-128'),
    'ENT-0028': ('02_MODELO_DADOS.md', '50'),
    'ENT-0029': ('02_MODELO_DADOS.md', '51,285-304'),
    
    # Documento 03 - METODOS (Fluxo)
    'METOD-0001': ('03_FLUXO_EXECUCAO.md', '56-90'),
    'METOD-0002': ('03_FLUXO_EXECUCAO.md', '92-155'),
    'METOD-0003': ('03_FLUXO_EXECUCAO.md', '157-225'),
    'METOD-0010': ('03_FLUXO_EXECUCAO.md', '227-252'),
    'METOD-0011': ('03_FLUXO_EXECUCAO.md', '59,86'),
    'METOD-0012': ('03_FLUXO_EXECUCAO.md', '189,396'),
    'METOD-0035': ('03_FLUXO_EXECUCAO.md', '192,399'),
    'METOD-0036': ('03_FLUXO_EXECUCAO.md', '196,403'),
    'METOD-0037': ('03_FLUXO_EXECUCAO.md', '198,406'),
    'METOD-0038': ('03_FLUXO_EXECUCAO.md', '202,410'),
    'METOD-0039': ('03_FLUXO_EXECUCAO.md', '204,413'),
    
    # Documento 02 - QUERIES
    'QUERY-0001': ('02_MODELO_DADOS.md', '155'),
    'QUERY-0002': ('02_MODELO_DADOS.md', '156'),
    'QUERY-0003': ('02_MODELO_DADOS.md', '157'),
    'QUERY-0004': ('02_MODELO_DADOS.md', '158'),
    'QUERY-0006': ('02_MODELO_DADOS.md', '159'),
    'QUERY-0007': ('02_MODELO_DADOS.md', '160'),
    'QUERY-0008': ('02_MODELO_DADOS.md', '161'),
    'QUERY-0009': ('02_MODELO_DADOS.md', '162'),
    'QUERY-0011': ('02_MODELO_DADOS.md', '163'),
    'QUERY-0018': ('02_MODELO_DADOS.md', '164'),
    'QUERY-0019': ('02_MODELO_DADOS.md', '165'),
    'QUERY-0020': ('02_MODELO_DADOS.md', '166'),
    'QUERY-0022': ('02_MODELO_DADOS.md', '167'),
    'QUERY-0028': ('02_MODELO_DADOS.md', '168'),
    
    # Documento 04 - REGRAS
    'REGRA-0001': ('04_FUNCOES_REGRAS_NEGOCIO.md', '155,393'),
    'REGRA-0002': ('04_FUNCOES_REGRAS_NEGOCIO.md', '166,393'),
    'REGRA-0003': ('04_FUNCOES_REGRAS_NEGOCIO.md', '178,393'),
    'REGRA-0004': ('04_FUNCOES_REGRAS_NEGOCIO.md', '189,393'),
    'REGRA-0005': ('04_FUNCOES_REGRAS_NEGOCIO.md', '200,393'),
    'REGRA-0006': ('04_FUNCOES_REGRAS_NEGOCIO.md', '211,393'),
    'REGRA-0007': ('04_FUNCOES_REGRAS_NEGOCIO.md', '212,394'),
    'REGRA-0008': ('04_FUNCOES_REGRAS_NEGOCIO.md', '217,394'),
    'REGRA-0009': ('04_FUNCOES_REGRAS_NEGOCIO.md', '222,394'),
    'REGRA-0010': ('04_FUNCOES_REGRAS_NEGOCIO.md', '227,394'),
    'REGRA-0011': ('04_FUNCOES_REGRAS_NEGOCIO.md', '247,395'),
    'REGRA-0012': ('04_FUNCOES_REGRAS_NEGOCIO.md', '253,395'),
    'REGRA-0013': ('04_FUNCOES_REGRAS_NEGOCIO.md', '257,395'),
    'REGRA-0014': ('04_FUNCOES_REGRAS_NEGOCIO.md', '274,396'),
    'REGRA-0015': ('04_FUNCOES_REGRAS_NEGOCIO.md', '283,396'),
    'REGRA-0016': ('04_FUNCOES_REGRAS_NEGOCIO.md', '291,396'),
    'REGRA-0017': ('04_FUNCOES_REGRAS_NEGOCIO.md', '312,397'),
    'REGRA-0018': ('04_FUNCOES_REGRAS_NEGOCIO.md', '320,397'),
    'REGRA-0019': ('04_FUNCOES_REGRAS_NEGOCIO.md', '328,397'),
}

def update_matriz():
    """Atualiza a matriz adicionando colunas e preenchendo referências As-Is"""
    
    # Ler todas as linhas
    with open('MATRIZ_RASTREABILIDADE.csv', 'r', encoding='utf-8', newline='') as f:
        lines = f.readlines()
    
    if not lines:
        print("Arquivo vazio!")
        return
    
    # Processar header
    header = lines[0].strip()
    
    # Verificar se já tem as colunas
    if 'Ref_Doc_AsIs' not in header:
        # Adicionar colunas ao header
        header = header + ',Ref_Doc_AsIs,Ref_Doc_AsIs_Linhas'
        print("Colunas adicionadas ao header")
    else:
        print("Colunas ja existem no header")
    
    # Processar linhas de dados
    updated_lines = [header + '\n']
    updated_count = 0
    
    for i, line in enumerate(lines[1:], start=2):
        if not line.strip():  # Pular linhas vazias
            updated_lines.append(line)
            continue
        
        parts = line.strip().split(',')
        if len(parts) < 2:  # Linha inválida
            updated_lines.append(line)
            continue
        
        id_val = parts[0]
        
        # Se tem atualização para este ID
        if id_val in UPDATES:
            doc, linhas = UPDATES[id_val]
            
            # Garantir que temos colunas suficientes
            while len(parts) < 13:  # 13 colunas originais
                parts.append('')
            
            # Atualizar Status_Documentacao (índice 10)
            if parts[10] == 'NOK':
                parts[10] = 'OK'
            
            # Adicionar/atualizar as colunas As-Is
            if len(parts) >= 15:
                parts[13] = doc
                parts[14] = linhas
            else:
                parts.extend([doc, linhas])
            
            updated_line = ','.join(parts) + '\n'
            updated_lines.append(updated_line)
            updated_count += 1
            print(f"[OK] {id_val}: {doc} (linhas {linhas})")
        else:
            # Adicionar colunas vazias se necessário
            while len(parts) < 13:
                parts.append('')
            if len(parts) < 15:
                parts.extend(['', ''])
            updated_lines.append(','.join(parts) + '\n')
    
    # Escrever arquivo atualizado
    with open('MATRIZ_RASTREABILIDADE.csv', 'w', encoding='utf-8', newline='') as f:
        f.writelines(updated_lines)
    
    print(f"\n{'='*60}")
    print(f"[SUCESSO] Atualizacao concluida!")
    print(f"   Registros atualizados: {updated_count}")
    print(f"   Total de linhas processadas: {len(lines)}")
    print(f"{'='*60}")

if __name__ == '__main__':
    print("Atualizando MATRIZ_RASTREABILIDADE.csv...")
    print("=" * 60)
    update_matriz()

