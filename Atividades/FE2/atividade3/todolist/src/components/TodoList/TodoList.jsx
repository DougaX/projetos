import { useState, useEffect } from 'react';
import Tarefa from '../Tarefa/Tarefa';
import './TodoList.css';

function TodoList() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  // Carregar tarefas do localStorage ao iniciar
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
      setTarefas(JSON.parse(tarefasSalvas));
    }
  }, []);

  // Salvar tarefas no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  // Adicionar nova tarefa
  const addTarefa = (e) => {
    e.preventDefault();
    if (novaTarefa.trim()) {
      const nova = {
        id: Date.now(),
        titulo: novaTarefa.trim(),
        passos: []
      };
      setTarefas([...tarefas, nova]);
      setNovaTarefa('');
    }
  };

  // Remover tarefa
  const removeTarefa = (id) => {
    setTarefas(tarefas.filter(t => t.id !== id));
  };

  // Adicionar passo a uma tarefa
  const addPasso = (tarefaId, textoPassso) => {
    setTarefas(tarefas.map(tarefa => {
      if (tarefa.id === tarefaId) {
        return {
          ...tarefa,
          passos: [...tarefa.passos, {
            id: Date.now(),
            texto: textoPassso,
            concluido: false
          }]
        };
      }
      return tarefa;
    }));
  };

  // Toggle passo concluído
  const togglePasso = (tarefaId, passoId) => {
    setTarefas(tarefas.map(tarefa => {
      if (tarefa.id === tarefaId) {
        return {
          ...tarefa,
          passos: tarefa.passos.map(passo => {
            if (passo.id === passoId) {
              return { ...passo, concluido: !passo.concluido };
            }
            return passo;
          })
        };
      }
      return tarefa;
    }));
  };

  // Remover passo
  const removePasso = (tarefaId, passoId) => {
    setTarefas(tarefas.map(tarefa => {
      if (tarefa.id === tarefaId) {
        return {
          ...tarefa,
          passos: tarefa.passos.filter(passo => passo.id !== passoId)
        };
      }
      return tarefa;
    }));
  };

  return (
    <div className="todo-list">
      <h1> Lista de Tarefas</h1>
      
      <form className="form-tarefa" onSubmit={addTarefa}>
        <input
          type="text"
          placeholder="Nova tarefa..."
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <div className="tarefas-container">
        {tarefas.length === 0 ? (
          <p className="sem-tarefas">Nenhuma tarefa criada. Adicione uma acima!</p>
        ) : (
          tarefas.map(tarefa => (
            <Tarefa
              key={tarefa.id}
              tarefa={tarefa}
              onRemove={removeTarefa}
              onTogglePasso={togglePasso}
              onAddPasso={addPasso}
              onRemovePasso={removePasso}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;