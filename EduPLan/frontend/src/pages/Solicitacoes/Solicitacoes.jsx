import { useState, useEffect } from 'react';
import api from '../../services/api';
import './Solicitacoes.scss';

function Solicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedSolicitacao, setSelectedSolicitacao] = useState(null);
    const [justificativa, setJustificativa] = useState('');
    const [action, setAction] = useState('');

    useEffect(() => {
        loadSolicitacoes();
    }, []);

    const loadSolicitacoes = async () => {
        try {
            const response = await api.get('/solicitacoes');
            setSolicitacoes(response.data);
        } catch (error) {
            console.error('Erro ao carregar solicitacoes:', error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (solicitacao, actionType) => {
        setSelectedSolicitacao(solicitacao);
        setAction(actionType);
        setJustificativa('');
        setShowModal(true);
    };

    const handleAction = async () => {
        try {
            const endpoint = action === 'aprovar' 
                ? `/solicitacoes/${selectedSolicitacao.id}/aprovar`
                : `/solicitacoes/${selectedSolicitacao.id}/reprovar`;
            
            await api.post(endpoint, { justificativa_coordenador: justificativa });
            loadSolicitacoes();
            setShowModal(false);
            alert(`Solicitacao ${action === 'aprovar' ? 'aprovada' : 'reprovada'} com sucesso!`);
        } catch (error) {
            console.error('Erro ao processar solicitacao:', error);
            alert('Erro ao processar solicitacao');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'aprovada': return 'status-aprovado';
            case 'reprovada': return 'status-reprovado';
            default: return 'status-pendente';
        }
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="solicitacoes-page">
            <div className="page-header">
                <h1>Solicitacoes</h1>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{action === 'aprovar' ? 'Aprovar' : 'Reprovar'} Solicitacao</h2>
                        <div className="modal-info">
                            <p><strong>Professor:</strong> {selectedSolicitacao.user?.nome}</p>
                            <p><strong>Sala:</strong> {selectedSolicitacao.agendamento?.sala?.nome}</p>
                            <p><strong>Data:</strong> {formatDate(selectedSolicitacao.agendamento?.data)}</p>
                        </div>
                        <div className="form-group">
                            <label>Justificativa {action === 'reprovar' && '*'}</label>
                            <textarea
                                value={justificativa}
                                onChange={(e) => setJustificativa(e.target.value)}
                                rows="3"
                                placeholder="Digite a justificativa..."
                                required={action === 'reprovar'}
                            />
                        </div>
                        <div className="modal-actions">
                            <button onClick={() => setShowModal(false)} className="btn-secondary">
                                Cancelar
                            </button>
                            <button 
                                onClick={handleAction} 
                                className={action === 'aprovar' ? 'btn-aprovar' : 'btn-reprovar'}
                                disabled={action === 'reprovar' && !justificativa}
                            >
                                {action === 'aprovar' ? 'Aprovar' : 'Reprovar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="solicitacoes-list">
                {solicitacoes.length === 0 ? (
                    <p className="no-data">Nenhuma solicitacao encontrada.</p>
                ) : (
                    solicitacoes.map((solicitacao) => (
                        <div key={solicitacao.id} className="solicitacao-card">
                            <div className="solicitacao-header">
                                <div>
                                    <h3>{solicitacao.agendamento?.sala?.nome}</h3>
                                    <p className="professor-name">{solicitacao.user?.nome}</p>
                                </div>
                                <span className={`status ${getStatusClass(solicitacao.status)}`}>
                                    {solicitacao.status}
                                </span>
                            </div>
                            <div className="solicitacao-info">
                                <p><strong>Data:</strong> {formatDate(solicitacao.agendamento?.data)}</p>
                                <p><strong>Horario:</strong> {solicitacao.agendamento?.hora_inicio} - {solicitacao.agendamento?.hora_fim}</p>
                                {solicitacao.justificativa_professor && (
                                    <p><strong>Justificativa do Professor:</strong> {solicitacao.justificativa_professor}</p>
                                )}
                                {solicitacao.justificativa_coordenador && (
                                    <p><strong>Resposta:</strong> {solicitacao.justificativa_coordenador}</p>
                                )}
                            </div>
                            {solicitacao.status === 'pendente' && (
                                <div className="solicitacao-actions">
                                    <button 
                                        onClick={() => openModal(solicitacao, 'aprovar')} 
                                        className="btn-aprovar"
                                    >
                                        Aprovar
                                    </button>
                                    <button 
                                        onClick={() => openModal(solicitacao, 'reprovar')} 
                                        className="btn-reprovar"
                                    >
                                        Reprovar
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Solicitacoes;