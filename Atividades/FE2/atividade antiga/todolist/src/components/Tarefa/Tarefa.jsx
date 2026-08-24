import { useState } from 'react';
import Passo from '../Passo/Passo';
import './Tarefa.css';

function Tarefa({ tarefa, onRemove, onTogglePasso, onAddPasso, onRemovePasso }) {
  const [novoPasso, setNovoPasso] = useState('');

  // Verifica se todos os passos estão concluídos
  const todosPassosConcluidos = tarefa.passos.length > 0 && 
    tarefa.passos.every(passo => passo.concluido);

  const handleAddPasso = (e) => {
    e.preventDefault();
    if (novoPasso.trim()) {
      onAddPasso(tarefa.id, novoPasso.trim());
      setNovoPasso('');
    }
  };

  return (
    <div className={`tarefa ${todosPassosConcluidos ? 'tarefa-concluida' : ''}`}>
      <div className="tarefa-header">
        <h3>{tarefa.titulo}</h3>
        {todosPassosConcluidos && <span className="badge-concluida">✓ Concluída</span>}
        <button className="btn-remover-tarefa" onClick={() => onRemove(tarefa.id)}>
          🗑️
        </button>
      </div>

      <div className="passos-lista">
        {tarefa.passos.length === 0 ? (
          <p className="sem-passos">Nenhum passo adicionado</p>
        ) : (
          tarefa.passos.map(passo => (
            <Passo
              key={passo.id}
              passo={passo}
              onToggle={() => onTogglePasso(tarefa.id, passo.id)}
              onRemove={() => onRemovePasso(tarefa.id, passo.id)}
            />
          ))
        )}
      </div>

      <form className="form-passo" onSubmit={handleAddPasso}>
        <input
          type="text"
          placeholder="Adicionar passo..."
          value={novoPasso}
          onChange={(e) => setNovoPasso(e.target.value)}
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default Tarefa;