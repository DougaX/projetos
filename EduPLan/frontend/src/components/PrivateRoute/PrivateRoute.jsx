import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function PrivateRoute({ children, requiredRole }) {
    const { user, loading, isAuthenticated } = useAuth();

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.tipo !== requiredRole) {
        return <Navigate to="/dashboard" />;
    }

    return children;
}

export default PrivateRoute;