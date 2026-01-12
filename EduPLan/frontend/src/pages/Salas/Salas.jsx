import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './Salas.scss';

function Salas() {
  const { isCoordenador } = useAuth();
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSala, setEditingSala] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    capacidade: '',
    descricao: ''
  });

  useEffect(() => {
    loadSalas();
  }, []);

  const loadSalas = async () => {
  try {
    const response = await api.get('/salas');
    setSalas(response.data.data || response.data); // 
  } catch (error) {
    console.error('Erro ao carregar salas:', error);
  } finally {
    setLoading(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSala) {
        await api.put(`/salas/${editingSala.id}`, formData);
      } else {
        await api.post('/salas', formData);
      }
      loadSalas();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar sala:', error);
      alert('Erro ao salvar sala');
    }
  };

  const handleEdit = (sala) => {
    setEditingSala(sala);
    setFormData({
      nome: sala.nome,
      capacidade: sala.capacidade,
      descricao: sala.descricao || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta sala?')) return;

    try {
      await api.delete(`/salas/${id}`);
      loadSalas();
    } catch (error) {
      console.error('Erro ao excluir sala:', error);
      alert('Erro ao excluir sala');
    }
  };

  const resetForm = () => {
    setFormData({ nome: '', capacidade: '', descricao: '' });
    setEditingSala(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="salas-page">
      <div className="page-header">
        <h1>Salas</h1>
        {isCoordenador() && (
          <button onClick={() => setShowForm(true)} className="btn-primary">
            Nova Sala
          </button>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingSala ? 'Editar Sala' : 'Nova Sala'}</h2>
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
                <label>Capacidade</label>
                <input
                  type="number"
                  value={formData.capacidade}
                  onChange={(e) => setFormData({ ...formData, capacidade: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descricao</label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows="3"
                />
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

      <div className="salas-grid">
        {Array.isArray(salas) && salas.map((sala) => (
          <div key={sala.id} className="sala-card">
            <h3>
              <Link to={`/salas/${sala.id}`}>{sala.nome}</Link>
            </h3>
            <p className="sala-capacidade">
              Capacidade: {sala.capacidade} pessoas
            </p>

            {sala.descricao && <p className="sala-descricao">{sala.descricao}</p>}

            {Array.isArray(sala.itens) && sala.itens.length > 0 && (
              <div className="sala-itens">
                <h4>Itens:</h4>
                <ul>
                  {Array.isArray(sala.itens) && sala.itens.map((item) => (
                    <li key={item.id}>
                      {item.nome}
                      <span className={`status ${item.status}`}>{item.status}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {isCoordenador() && (
              <div className="sala-actions">
                <button onClick={() => handleEdit(sala)} className="btn-edit">
                  Editar
                </button>
                <button onClick={() => handleDelete(sala.id)} className="btn-delete">
                  Excluir
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Salas;
