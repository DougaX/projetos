import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import './SalaDetalhe.css';

function SalaDetalhe() {
    const { id } = useParams();
    const [sala, setSala] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadSala();
    }, [id]);

    const loadSala = async () => {
        try {
            const response = await api.get(`/salas/${id}`);
            setSala(response.data);
        } catch (err) {
            setError('Sala nao encontrada');
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'disponivel': return 'status-disponivel';
            case 'manutencao': return 'status-manutencao';
            case 'indisponivel': return 'status-indisponivel';
            default: return '';
        }
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    if (error) {
        return (
            <div className="error-page">
                <h2>{error}</h2>
                <Link to="/salas" className="btn-voltar">Voltar para Salas</Link>
            </div>
        );
    }

    return (
        <div className="sala-detalhe-page">
            <div className="page-header">
                <Link to="/salas" className="btn-voltar">Voltar</Link>
                <h1>{sala.nome}</h1>
            </div>

            <div className="sala-info-card">
                <div className="info-row">
                    <span className="label">Capacidade:</span>
                    <span className="value">{sala.capacidade} pessoas</span>
                </div>
                {sala.descricao && (
                    <div className="info-row">
                        <span className="label">Descricao:</span>
                        <span className="value">{sala.descricao}</span>
                    </div>
                )}
            </div>

            <div className="sala-itens-section">
                <h2>Itens da Sala</h2>
                {sala.itens && sala.itens.length > 0 ? (
                    <div className="itens-grid">
                        {sala.itens.map((item) => (
                            <div key={item.id} className="item-card">
                                <h3>{item.nome}</h3>
                                {item.descricao && <p>{item.descricao}</p>}
                                <span className={`status-badge ${getStatusClass(item.status)}`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-itens">Nenhum item cadastrado para esta sala.</p>
                )}
            </div>

            <div className="sala-actions">
                <Link to="/agendamentos" className="btn-agendar">
                    Agendar esta Sala
                </Link>
            </div>
        </div>
    );
}

export default SalaDetalhe;