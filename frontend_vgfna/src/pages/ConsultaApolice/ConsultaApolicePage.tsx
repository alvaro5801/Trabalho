/**
 * ConsultaApolicePage
 * 
 * Mapeamento de: TELA-0101 (VGFNM010)
 * Função Legado: VGFNP005 (FTELA-0101)
 * Método: METOD-0104 (VGFNS002)
 * 
 * Tela de consulta inicial que permite buscar uma apólice
 * e navegar para a tela de alteração de subgrupo.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { NumberInput } from '../../components/forms/NumberInput';
import { DisplayField } from '../../components/common/DisplayField';
import { MessageDisplay } from '../../components/common/MessageDisplay';
import { Button } from '../../components/common/Button';
import { HelpModal } from '../../components/common/HelpModal';
import { useConsultaApolice } from '../../hooks/useConsultaApolice';

export const ConsultaApolicePage: React.FC = () => {
  const navigate = useNavigate();
  const { consultarApolice, loading, error, clearError } = useConsultaApolice();
  
  // Estado do formulário
  const [numeroApolice, setNumeroApolice] = useState<string>('');
  const [codigoSubgrupo, setCodigoSubgrupo] = useState<string>('');
  const [message, setMessage] = useState<{ type: 'info' | 'error' | 'warning'; text: string } | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  
  // Dados do sistema (read-only) - OBJ-0101 a OBJ-0106
  const [sistemaData, setSistemaData] = useState({
    menuEmpresa: 'ADMINISTRACAO INTEGRADA DE SEGUROS',
    data: new Date(),
    versao: '1.0.0',
    nomeSistema: 'VGFNA',
    hora: new Date(),
    grupoFuncoes: 'ALTERACAO DADOS BASICOS (LIBERADOS)'
  });

  // Foco inicial no campo NUM_APOLICE (OBJ-0107)
  useEffect(() => {
    // Auto-focus será gerenciado pelo componente NumberInput
  }, []);

  /**
   * REGRA-0108: Verifica apólice informada
   * REGRA-0109: Busca apólice no banco
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setMessage(null);

    // REGRA-0108: Verifica se apólice foi informada
    if (!numeroApolice || numeroApolice === '0' || numeroApolice.trim() === '') {
      setMessage({ type: 'error', text: 'INFORME A APOLICE' });
      return;
    }

    try {
      const response = await consultarApolice({
        numeroApolice: numeroApolice.trim()
      });

      if (response.isSuccess && response.data) {
        // Navega para tela de alteração de subgrupo com dados da apólice
        navigate('/alteracao-subgrupo', {
          state: {
            apolice: {
              numeroApolice: response.data.numeroApolice,
              codigoCliente: response.data.codigoCliente,
              nomeCliente: response.data.nomeCliente,
              tipoApolice: response.data.tipoApolice,
              dataAbertura: response.data.dataAbertura
            },
            subgrupo: response.data.subgrupo
          }
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: response.message || 'APOLICE NAO ENCONTRADA' 
        });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'ERRO AO CONSULTAR APOLICE' });
    }
  };

  /**
   * REGRA-0101, REGRA-0102: F3 - Sair
   */
  const handleExit = () => {
    navigate('/');
  };

  /**
   * REGRA-0105, REGRA-0106: F12 - Cancelar
   */
  const handleCancel = () => {
    navigate('/');
  };

  /**
   * REGRA-0103: F4 - Consulta Externa
   */
  const handleConsultaExterna = () => {
    // TODO: Implementar modal de consulta externa
    console.log('Consulta Externa - CTB5A, CTC5A, CTR4A');
  };

  /**
   * REGRA-0104: F10 - Inclusão
   */
  const handleInclusao = () => {
    // TODO: Implementar modal de inclusão
    console.log('Consulta Inclusão - CTB1A, CTC2A');
  };

  return (
    <div className="consulta-apolice-page">
      <Header
        menuEmpresa={sistemaData.menuEmpresa}
        data={sistemaData.data}
        versao={sistemaData.versao}
        nomeSistema={sistemaData.nomeSistema}
        hora={sistemaData.hora}
        grupoFuncoes={sistemaData.grupoFuncoes}
      />

      <div className="page-content">
        <form onSubmit={handleSubmit} className="consulta-form">
          <div className="form-section">
            <h2>Consulta de Apólice</h2>
            
            <div className="form-row">
              <NumberInput
                id="numero-apolice"
                label="Apólice"
                value={numeroApolice}
                onChange={(value) => setNumeroApolice(value)}
                required
                autoFocus
                placeholder="Digite o número da apólice"
              />
            </div>

            <div className="form-row">
              <NumberInput
                id="codigo-subgrupo"
                label="Subgrupo"
                value={codigoSubgrupo}
                onChange={(value) => setCodigoSubgrupo(value)}
                placeholder="Opcional"
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
                variant="secondary"
                onClick={handleConsultaExterna}
                icon="search"
              >
                F4 - Consulta
              </Button>
              
              <Button
                type="button"
                variant="secondary"
                onClick={handleInclusao}
                icon="add"
              >
                F10 - Inclusão
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
                icon="search"
              >
                ENTER - Consultar
              </Button>
            </div>
          </div>
        </form>
      </div>

      {showHelp && (
        <HelpModal
          title="Ajuda - Consulta de Apólice"
          content="Informe o número da apólice para consultar os dados básicos. O subgrupo é opcional."
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  );
};

