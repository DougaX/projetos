import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import Dashboard from './pages/Dashboard/Dashboard';
import Salas from './pages/Salas/Salas';
import SalaDetalhe from './pages/SalaDetalhe/SalaDetalhe';
import Agendamentos from './pages/Agendamentos/Agendamentos';
import Solicitacoes from './pages/Solicitacoes/Solicitacoes';
import Usuarios from './pages/Usuarios/Usuarios';
import Itens from './pages/Itens/Itens';
import './App.scss';

function Layout() {
    return (
        <div className="app-layout">
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

function AppRoutes() {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
            } />
            <Route path="/registro" element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Registro />
            } />
            
            <Route path="/" element={
                <PrivateRoute>
                    <Layout />
                </PrivateRoute>
            }>
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="salas" element={<Salas />} />
                <Route path="salas/:id" element={<SalaDetalhe />} />
                <Route path="agendamentos" element={<Agendamentos />} />
                <Route path="solicitacoes" element={
                    <PrivateRoute requiredRole="coordenador">
                        <Solicitacoes />
                    </PrivateRoute>
                } />
                <Route path="usuarios" element={
                    <PrivateRoute requiredRole="coordenador">
                        <Usuarios />
                    </PrivateRoute>
                } />
                <Route path="itens" element={
                    <PrivateRoute requiredRole="coordenador">
                        <Itens />
                    </PrivateRoute>
                } />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;