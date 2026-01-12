import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.scss';

function Header() {
    const { user, logout, isCoordenador } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/dashboard">EduPlan</Link>
            </div>
            
            <nav className="header-nav">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/salas">Salas</Link>
                <Link to="/agendamentos">Agendamentos</Link>
                {isCoordenador() && (
                    <>
                        <Link to="/solicitacoes">Solicitacoes</Link>
                        <Link to="/itens">Itens</Link>
                        <Link to="/usuarios">Usuarios</Link>
                    </>
                )}
            </nav>

            <div className="header-user">
                <span>{user?.nome}</span>
                <span className="user-tipo">{user?.tipo}</span>
                <button onClick={handleLogout}>Sair</button>
            </div>
        </header>
    );
}

export default Header;