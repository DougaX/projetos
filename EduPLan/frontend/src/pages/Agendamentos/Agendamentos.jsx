import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './Agendamentos.scss';

function Agendamentos() {
    const { user } = useAuth();
    const [agendamentos, setAgendamentos] = useState([]);
    const [salas, setSalas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        data: '',
        hora_inicio: '',
        hora_fim: '',
        sala_id: '',
        motivo_solicitacao: '',
        justificativa_professor: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [agendamentosRes, salasRes] = await Promise.all([
                api.get('/agendamentos'),
                api.get('/salas')
            ]);
            setAgendamentos(agendamentosRes.data);
            setSalas(salasRes.data);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/agendamentos', formData);
            loadData();
            resetForm();
            alert('Agendamento solicitado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
            alert(error.response?.data?.message || 'Erro ao criar agendamento');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;
        
        try {
            await api.delete(`/agendamentos/${id}`);
            loadData();
        } catch (error) {
            console.error('Erro ao cancelar agendamento:', error);
            alert('Erro ao cancelar agendamento');
        }
    };

    const resetForm = () => {
        setFormData({
            data: '',
            hora_inicio: '',
            hora_fim: '',
            sala_id: '',
            motivo_solicitacao: '',
            justificativa_professor: ''
        });
        setShowForm(false);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'aprovado': return 'status-aprovado';
            case 'reprovado': return 'status-reprovado';
            default: return 'status-pendente';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="agendamentos-page">
            <div className="page-header">
                <h1>Meus Agendamentos</h1>
                <button onClick={() => setShowForm(true)} className="btn-primary">
                    Novo Agendamento
                </button>
            </div>

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Solicitar Agendamento</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Sala</label>
                                <select
                                    value={formData.sala_id}
                                    onChange={(e) => setFormData({...formData, sala_id: e.target.value})}
                                    required
                                >
                                    <option value="">Selecione uma sala</option>
                                    {salas.map((sala) => (
                                        <option key={sala.id} value={sala.id}>
                                            {sala.nome} (Cap: {sala.capacidade})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Data</label>
                                <input
                                    type="date"
                                    value={formData.data}
                                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Hora Inicio</label>
                                    <input
                                        type="time"
                                        value={formData.hora_inicio}
                                        onChange={(e) => setFormData({...formData, hora_inicio: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Hora Fim</label>
                                    <input
                                        type="time"
                                        value={formData.hora_fim}
                                        onChange={(e) => setFormData({...formData, hora_fim: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Motivo</label>
                                <textarea
                                    value={formData.motivo_solicitacao}
                                    onChange={(e) => setFormData({...formData, motivo_solicitacao: e.target.value})}
                                    rows="2"
                                    placeholder="Descreva o motivo do agendamento"
                                />
                            </div>
                            <div className="form-group">
                                <label>Justificativa</label>
                                <textarea
                                    value={formData.justificativa_professor}
                                    onChange={(e) => setFormData({...formData, justificativa_professor: e.target.value})}
                                    rows="2"
                                    placeholder="Justifique a necessidade da sala"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={resetForm} className="btn-secondary">
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-primary">
                                    Solicitar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="agendamentos-list">
                {agendamentos.length === 0 ? (
                    <p className="no-data">Nenhum agendamento encontrado.</p>
                ) : (
                    agendamentos.map((agendamento) => (
                        <div key={agendamento.id} className="agendamento-card">
                            <div className="agendamento-header">
                                <h3>{agendamento.sala?.nome}</h3>
                                <span className={`status ${getStatusClass(agendamento.status)}`}>
                                    {agendamento.status}
                                </span>
                            </div>
                            <div className="agendamento-info">
                                <p><strong>Data:</strong> {formatDate(agendamento.data)}</p>
                                <p><strong>Horario:</strong> {agendamento.hora_inicio} - {agendamento.hora_fim}</p>
                                {agendamento.motivo_solicitacao && (
                                    <p><strong>Motivo:</strong> {agendamento.motivo_solicitacao}</p>
                                )}
                            </div>
                            {agendamento.status === 'pendente' && (
                                <div className="agendamento-actions">
                                    <button 
                                        onClick={() => handleDelete(agendamento.id)} 
                                        className="btn-delete"
                                    >
                                        Cancelar
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

export default Agendamentos;