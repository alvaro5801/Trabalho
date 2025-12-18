/**
 * AlteracaoTermoAdesaoPage
 * 
 * Mapeamento de: TELA-0103 (VGFNM030)
 * Função Legado: VGFNP035 (FTELA-0103)
 * Método: METOD-0109 (VGFNS004)
 * 
 * Tela de edição que permite alterar os dados cadastrados
 * do termo adesão da apólice.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { DisplayField } from '../../components/common/DisplayField';
import { SelectInput } from '../../components/forms/SelectInput';
import { RadioGroup } from '../../components/forms/RadioGroup';
import { NumberInput } from '../../components/forms/NumberInput';
import { MessageDisplay } from '../../components/common/MessageDisplay';
import { Button } from '../../components/common/Button';
import { HelpModal } from '../../components/common/HelpModal';
import { useAlteracaoTermoAdesao } from '../../hooks/useAlteracaoTermoAdesao';
import { useDominios } from '../../hooks/useDominios';
import { AlteracaoTermoAdesaoRequestDto } from '../../types/api';

interface LocationState {
  apolice?: any;
  subgrupo?: any;
}

export const AlteracaoTermoAdesaoPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { alterarTermoAdesao, loading, error, clearError } = useAlteracaoTermoAdesao();
  const { dominios, loading: loadingDominios } = useDominios();
  
  const state = location.state as LocationState;
  const apolice = state?.apolice;
  const subgrupo = state?.subgrupo;

  // Estado do formulário (similar ao subgrupo, mas para termo adesão)
  const [formData, setFormData] = useState({
    numeroApolice: apolice?.numeroApolice || '',
    codigoTermo: '', // Será preenchido quando buscar dados do termo
    periodoFaturamento: null,
    formaFaturamento: null,
    formaAverbacao: null,
    tipoPlano: null,
    planoAssociado: 'N',
    tipoCobranca: null,
    validarMatricula: 'N',
    enderecoCobranca: null,
    bancoCobranca: null,
    agenciaCobranca: null,
  });

  const [message, setMessage] = useState<{ type: 'info' | 'error' | 'warning'; text: string } | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [readOnlyFields, setReadOnlyFields] = useState<string[]>([]);

  // Dados do sistema (read-only)
  const [sistemaData, setSistemaData] = useState({
    menuEmpresa: 'ADMINISTRACAO INTEGRADA DE SEGUROS',
    data: new Date(),
    versao: '1.0.0',
    nomeSistema: 'VGFNA',
    hora: new Date(),
    grupoFuncoes: 'ALTERACAO DADOS BASICOS (TERMO ADESAO)'
  });

  // Carregar dados do termo adesão ao montar o componente
  useEffect(() => {
    // TODO: Buscar dados do termo adesão via API
    // Por enquanto, usar dados do subgrupo como base
    if (subgrupo) {
      setFormData(prev => ({
        ...prev,
        periodoFaturamento: subgrupo.periodoFaturamento,
        formaFaturamento: subgrupo.formaFaturamento,
        formaAverbacao: subgrupo.formaAverbacao,
        tipoPlano: subgrupo.tipoPlano,
        planoAssociado: subgrupo.planoAssociado,
        tipoCobranca: subgrupo.tipoCobranca,
        validarMatricula: subgrupo.validarMatricula,
        enderecoCobranca: subgrupo.enderecoCobranca,
        bancoCobranca: subgrupo.bancoCobranca,
        agenciaCobranca: subgrupo.agenciaCobranca,
      }));
    }
  }, [subgrupo]);

  // REGRA-0114: Protege campos por tipo de faturamento e apólice
  useEffect(() => {
    const tipoApolice = apolice?.tipoApolice;
    const tipoFaturamento = formData.tipoCobranca;
    
    if ((tipoFaturamento === 1 || tipoFaturamento === 3) && tipoApolice === 2) {
      setReadOnlyFields(['periodoFaturamento', 'formaFaturamento', 'formaAverbacao']);
    } else {
      setReadOnlyFields([]);
    }
  }, [formData.tipoCobranca, apolice?.tipoApolice]);

  /**
   * Validações cruzadas (mesmas da TELA-0102)
   */
  const validateForm = (): boolean => {
    clearError();
    setMessage(null);

    // REGRA-0110: Valida tipo de cobrança = 2 (Fatura)
    if (formData.tipoCobranca === 2) {
      if (!formData.periodoFaturamento || formData.periodoFaturamento === 0) {
        setMessage({ type: 'error', text: 'PERIODO FATURAMENTO OBRIGATORIO' });
        return false;
      }

      if (!formData.formaFaturamento || formData.formaFaturamento === 0) {
        setMessage({ type: 'error', text: 'FORMA FATURAMENTO OBRIGATORIA' });
        return false;
      }
    }

    // REGRA-0113: Valida tipo de apólice = 2 (Específica)
    if (apolice?.tipoApolice === 2 && formData.validarMatricula !== 'S') {
      setMessage({ type: 'error', text: 'VALIDAR MATRICULA DEVE SER S PARA ESPECIFICA' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const request: AlteracaoTermoAdesaoRequestDto = {
        numeroApolice: formData.numeroApolice,
        codigoTermo: parseInt(formData.codigoTermo),
        periodoFaturamento: formData.periodoFaturamento,
        formaFaturamento: formData.formaFaturamento,
        formaAverbacao: formData.formaAverbacao,
        tipoPlano: formData.tipoPlano,
        planoAssociado: formData.planoAssociado as 'S' | 'N',
        tipoCobranca: formData.tipoCobranca,
        validarMatricula: formData.validarMatricula as 'S' | 'N',
        enderecoCobranca: formData.enderecoCobranca,
        bancoCobranca: formData.bancoCobranca,
        agenciaCobranca: formData.agenciaCobranca,
      };

      const response = await alterarTermoAdesao(request);

      if (response.isSuccess) {
        setMessage({ type: 'info', text: 'Alteração realizada com sucesso' });
      } else {
        setMessage({ type: 'error', text: response.message || 'ERRO AO ALTERAR TERMO ADESAO' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'ERRO AO ALTERAR TERMO ADESAO' });
    }
  };

  const handleCancel = () => {
    navigate('/alteracao-subgrupo', {
      state: {
        apolice: apolice,
        subgrupo: subgrupo
      }
    });
  };

  const handleExit = () => {
    navigate('/');
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="alteracao-termo-adesao-page">
      <Header
        menuEmpresa={sistemaData.menuEmpresa}
        data={sistemaData.data}
        versao={sistemaData.versao}
        nomeSistema={sistemaData.nomeSistema}
        hora={sistemaData.hora}
        grupoFuncoes={sistemaData.grupoFuncoes}
      />

      <div className="page-content">
        <form onSubmit={handleSubmit} className="alteracao-form">
          <div className="form-section">
            <h2>Dados Cadastrados - Termo Adesão</h2>

            <div className="form-row">
              <DisplayField
                label="Apólice"
                value={formData.numeroApolice}
              />
            </div>

            <div className="form-section-title">
              <h3>Dados Cadastrados</h3>
            </div>

            <div className="form-row">
              <SelectInput
                id="periodo-faturamento"
                label="Período Faturamento"
                value={formData.periodoFaturamento}
                onChange={(value) => updateField('periodoFaturamento', value)}
                options={dominios.periodoFaturamento || []}
                disabled={readOnlyFields.includes('periodoFaturamento')}
                loading={loadingDominios}
              />

              <SelectInput
                id="forma-faturamento"
                label="Forma Faturamento"
                value={formData.formaFaturamento}
                onChange={(value) => updateField('formaFaturamento', value)}
                options={dominios.formaFaturamento || []}
                disabled={readOnlyFields.includes('formaFaturamento')}
                loading={loadingDominios}
              />
            </div>

            <div className="form-row">
              <SelectInput
                id="forma-averbacao"
                label="Forma Averbação"
                value={formData.formaAverbacao}
                onChange={(value) => updateField('formaAverbacao', value)}
                options={dominios.formaAverbacao || []}
                disabled={readOnlyFields.includes('formaAverbacao')}
                loading={loadingDominios}
              />

              <SelectInput
                id="tipo-plano"
                label="Tipo Plano"
                value={formData.tipoPlano}
                onChange={(value) => updateField('tipoPlano', value)}
                options={dominios.tipoPlano || []}
                loading={loadingDominios}
              />
            </div>

            <div className="form-row">
              <RadioGroup
                id="plano-associado"
                label="Plano Associado"
                value={formData.planoAssociado}
                onChange={(value) => updateField('planoAssociado', value)}
                options={[
                  { value: 'S', label: 'Sim' },
                  { value: 'N', label: 'Não' }
                ]}
              />

              <SelectInput
                id="tipo-cobranca"
                label="Tipo Cobrança"
                value={formData.tipoCobranca}
                onChange={(value) => updateField('tipoCobranca', value)}
                options={dominios.tipoCobranca || []}
                loading={loadingDominios}
              />
            </div>

            <div className="form-row">
              <RadioGroup
                id="validar-matricula"
                label="Validar Matrícula"
                value={formData.validarMatricula}
                onChange={(value) => updateField('validarMatricula', value)}
                options={[
                  { value: 'S', label: 'Sim' },
                  { value: 'N', label: 'Não' }
                ]}
              />
            </div>

            <div className="form-row">
              <NumberInput
                id="endereco-cobranca"
                label="Endereço Cobrança"
                value={formData.enderecoCobranca?.toString() || ''}
                onChange={(value) => updateField('enderecoCobranca', value ? parseInt(value) : null)}
              />
            </div>

            <div className="form-row">
              <NumberInput
                id="banco-cobranca"
                label="Banco"
                value={formData.bancoCobranca?.toString() || ''}
                onChange={(value) => updateField('bancoCobranca', value ? parseInt(value) : null)}
              />
              <NumberInput
                id="agencia-cobranca"
                label="Agência"
                value={formData.agenciaCobranca?.toString() || ''}
                onChange={(value) => updateField('agenciaCobranca', value ? parseInt(value) : null)}
              />
            </div>

            {message && (
              <MessageDisplay
                type={message.type}
                message={message.text}
                onClose={() => setMessage(null)}
              />
            )}

            {error && (
              <MessageDisplay
                type="error"
                message={error}
                onClose={clearError}
              />
            )}

            <div className="form-actions">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowHelp(true)}
                icon="help"
              >
                F1 - Ajuda
              </Button>

              <Button
                type="button"
                variant="danger"
                onClick={handleExit}
                icon="exit"
              >
                F3 - Sair
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
                icon="cancel"
              >
                F12 - Cancelar
              </Button>

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                icon="save"
              >
                ENTER - Salvar
              </Button>
            </div>
          </div>
        </form>
      </div>

      {showHelp && (
        <HelpModal
          title="Ajuda - Alteração de Termo Adesão"
          content="Altere os campos desejados e pressione ENTER para salvar. Use F12 para cancelar."
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  );
};

