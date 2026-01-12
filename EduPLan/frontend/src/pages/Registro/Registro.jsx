import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import './Registro.css';

function Registro() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        password: '',
        password_confirmation: '',
        tipo: 'coordenador'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.password_confirmation) {
            setError('As senhas nao conferem');
            return;
        }

        setLoading(true);

        try {
            await api.post('/register', formData);
            alert('Conta criada com sucesso! Faca login para continuar.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registro-container">
            <div className="registro-box">
                <h1>EduPlan</h1>
                <p className="registro-subtitle">Criar nova conta de Coordenador</p>
                
                <form onSubmit={handleSubmit}>
                    {error && <div className="registro-error">{error}</div>}
                    
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                            placeholder="Seu nome completo"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            placeholder="Minimo 6 caracteres"
                            minLength={6}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_confirmation">Confirmar Senha</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                            placeholder="Repita a senha"
                            minLength={6}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Criando conta...' : 'Criar Conta'}
                    </button>
                </form>

                <div className="registro-link">
                    <p>Ja tem uma conta? <Link to="/login">Faca login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Registro;