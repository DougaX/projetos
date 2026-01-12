import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './Dashboard.scss';

function Dashboard() {
    const { user, isCoordenador } = useAuth();
    const [stats, setStats] = useState({
        salas: 0,
        agendamentos: 0,
        solicitacoesPendentes: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [salasRes, agendamentosRes, solicitacoesRes] = await Promise.all([
                api.get('/salas'),
                api.get('/agendamentos'),
                api.get('/solicitacoes')
            ]);

            const pendentes = solicitacoesRes.data.filter(s => s.status === 'pendente');

            setStats({
                salas: salasRes.data.length,
                agendamentos: agendamentosRes.data.length,
                solicitacoesPendentes: pendentes.length
            });
        } catch (error) {
            console.error('Erro ao carregar estatisticas:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="dashboard">
            <h1>Bem-vindo, {user?.nome}!</h1>
            <p className="dashboard-subtitle">
                Voce esta logado como <strong>{user?.tipo}</strong>
            </p>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Salas Disponiveis</h3>
                    <p className="stat-number">{stats.salas}</p>
                    <Link to="/salas">Ver salas</Link>
                </div>

                <div className="stat-card">
                    <h3>Meus Agendamentos</h3>
                    <p className="stat-number">{stats.agendamentos}</p>
                    <Link to="/agendamentos">Ver agendamentos</Link>
                </div>

                {isCoordenador() && (
                    <div className="stat-card highlight">
                        <h3>Solicitacoes Pendentes</h3>
                        <p className="stat-number">{stats.solicitacoesPendentes}</p>
                        <Link to="/solicitacoes">Ver solicitacoes</Link>
                    </div>
                )}
            </div>

            <div className="quick-actions">
                <h2>Acoes Rapidas</h2>
                <div className="actions-grid">
                    <Link to="/agendamentos/novo" className="action-btn">
                        Novo Agendamento
                    </Link>
                    <Link to="/salas" className="action-btn secondary">
                        Consultar Salas
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;