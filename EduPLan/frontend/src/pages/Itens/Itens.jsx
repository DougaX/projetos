import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Itens.css';

function Itens() {
  const { isCoordenador } = useAuth();
  const navigate = useNavigate();
  const [itens, setItens] = useState([]);
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    status: 'disponivel',
    sala_id: ''
  });

  useEffect(() => {
    if (!isCoordenador()) {
      navigate('/dashboard');
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
  try {
    const [itensRes, salasRes] = await Promise.all([
      api.get('/itens'),
      api.get('/salas')
    ]);
    setItens(itensRes.data.data || itensRes.data); // ✅ ADICIONADO .data
    setSalas(salasRes.data.data || salasRes.data); // ✅ ADICIONADO .data
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  } finally {
    setLoading(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/itens/${editingItem.id}`, formData);
      } else {
        await api.post('/itens', formData);
      }
      loadData();
      resetForm();
      alert(editingItem ? 'Item atualizado com sucesso!' : 'Item criado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar item:', error);
      alert(error.response?.data?.message || 'Erro ao salvar item');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      nome: item.nome,
      descricao: item.descricao || '',
      status: item.status,
      sala_id: item.sala_id
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;

    try {
      await api.delete(`/itens/${id}`);
      loadData();
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      alert('Erro ao excluir item');
    }
  };

  const handleStatusChange = async (item, newStatus) => {
    try {
      await api.put(`/itens/${item.id}`, { status: newStatus });
      loadData();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status');
    }
  };

  const resetForm = () => {
    setFormData({ nome: '', descricao: '', status: 'disponivel', sala_id: '' });
    setEditingItem(null);
    setShowForm(false);
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

  return (
    <div className="itens-page">
      <div className="page-header">
        <h1>Gerenciar Itens</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          Novo Item
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingItem ? 'Editar Item' : 'Novo Item'}</h2>
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
                <label>Descricao</label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="disponivel">Disponivel</option>
                  <option value="manutencao">Em Manutencao</option>
                  <option value="indisponivel">Indisponivel</option>
                </select>
              </div>
              <div className="form-group">
                <label>Sala</label>
                <select
                  value={formData.sala_id}
                  onChange={(e) => setFormData({ ...formData, sala_id: e.target.value })}
                  required
                >
                  <option value="">Selecione uma sala</option>
                  {Array.isArray(salas) && salas.map((sala) => (
                    <option key={sala.id} value={sala.id}>
                      {sala.nome}
                    </option>
                  ))}
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

      <div className="itens-list">
        <table className="itens-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descricao</th>
              <th>Sala</th>
              <th>Status</th>
              <th>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(itens) && itens.map((item) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.descricao || '-'}</td>
                <td>{item.sala?.nome}</td>
                <td>
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item, e.target.value)}
                    className={`status-select ${getStatusClass(item.status)}`}
                  >
                    <option value="disponivel">Disponivel</option>
                    <option value="manutencao">Em Manutencao</option>
                    <option value="indisponivel">Indisponivel</option>
                  </select>
                </td>
                <td>
                  <div className="table-actions">
                    <button onClick={() => handleEdit(item)} className="btn-edit">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="btn-delete">
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

export default Itens;
