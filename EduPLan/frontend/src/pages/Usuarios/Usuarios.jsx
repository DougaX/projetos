import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Usuarios.css';

function Usuarios() {
  const { isCoordenador } = useAuth();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    tipo: 'professor'
  });

  useEffect(() => {
    if (!isCoordenador()) {
      navigate('/dashboard');
      return;
    }
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
  try {
    const response = await api.get('/users');
    setUsuarios(response.data.data || response.data); // ✅ ADICIONADO .data
  } catch (error) {
    console.error('Erro ao carregar usuarios:', error);
  } finally {
    setLoading(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        const data = { ...formData };
        if (!data.password) {
          delete data.password;
        }
        await api.put(`/users/${editingUser.id}`, data);
      } else {
        await api.post('/users', formData);
      }
      loadUsuarios();
      resetForm();
      alert(editingUser ? 'Usuario atualizado com sucesso!' : 'Usuario criado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar usuario:', error);
      alert(error.response?.data?.message || 'Erro ao salvar usuario');
    }
  };

  const handleEdit = (usuario) => {
    setEditingUser(usuario);
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      password: '',
      tipo: usuario.tipo
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este usuario?')) return;

    try {
      await api.delete(`/users/${id}`);
      loadUsuarios();
    } catch (error) {
      console.error('Erro ao excluir usuario:', error);
      alert(error.response?.data?.message || 'Erro ao excluir usuario');
    }
  };

  const resetForm = () => {
    setFormData({ nome: '', email: '', password: '', tipo: 'professor' });
    setEditingUser(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="usuarios-page">
      <div className="page-header">
        <h1>Gerenciar Usuarios</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          Novo Usuario
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingUser ? 'Editar Usuario' : 'Novo Usuario'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>{editingUser ? 'Nova Senha (deixe em branco para manter)' : 'Senha'}</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingUser}
                  minLength={6}
                />
              </div>
              <div className="form-group">
                <label>Tipo</label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  required
                >
                  <option value="professor">Professor</option>
                  <option value="coordenador">Coordenador</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="usuarios-list">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(usuarios) && usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>
                  <span className={`tipo-badge ${usuario.tipo}`}>
                    {usuario.tipo}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button onClick={() => handleEdit(usuario)} className="btn-edit">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(usuario.id)} className="btn-delete">
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios;
