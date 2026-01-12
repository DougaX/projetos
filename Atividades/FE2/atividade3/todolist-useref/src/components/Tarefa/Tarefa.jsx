import { useRef } from 'react';
import Passo from '../Passo/Passo';
import './Tarefa.css';

function Tarefa({ tarefa, onRemove, onTogglePasso, onAddPasso, onRemovePasso }) {
  // useRef para referenciar o input de novo passo
  const inputPassoRef = useRef(null);

  // Verifica se todos os passos estão concluídos
  const todosPassosConcluidos = tarefa.passos.length > 0 && 
    tarefa.passos.every(passo => passo.concluido);

  const handleAddPasso = (e) => {
    e.preventDefault();
    
    // Usa useRef para acessar o valor do input
    const texto = inputPassoRef.current.value.trim();
    
    if (texto) {
      onAddPasso(tarefa.id, texto);
      // Limpa o input usando ref
      inputPassoRef.current.value = '';
      // Mantém o foco no input
      inputPassoRef.current.focus();
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
          ref={inputPassoRef}
          type="text"
          placeholder="Adicionar passo..."
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default Tarefa;