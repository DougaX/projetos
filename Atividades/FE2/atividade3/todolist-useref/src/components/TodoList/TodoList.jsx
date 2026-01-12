import { useState, useEffect, useRef } from 'react';
import Tarefa from '../Tarefa/Tarefa';
import './TodoList.css';

function TodoList() {
  const [tarefas, setTarefas] = useState([]);
  
  // useRef para referenciar o input de nova tarefa
  const inputTarefaRef = useRef(null);
  
  // useRef para contar quantas tarefas foram criadas (sem causar re-render)
  const contadorRef = useRef(0);
  
  // useRef para controlar se é a primeira renderização
  const primeiraRenderizacao = useRef(true);

  // Carregar tarefas do localStorage ao iniciar
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem('tarefas-useref');
    if (tarefasSalvas) {
      const tarefasParseadas = JSON.parse(tarefasSalvas);
      setTarefas(tarefasParseadas);
      // Atualiza o contador com base nas tarefas existentes
      contadorRef.current = tarefasParseadas.length;
    }
    
    // Foca no input ao carregar a página
    inputTarefaRef.current.focus();
  }, []);

  // Salvar tarefas no localStorage sempre que mudar
  useEffect(() => {
    // Evita salvar na primeira renderização (quando carrega do localStorage)
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }
    
    localStorage.setItem('tarefas-useref', JSON.stringify(tarefas));
  }, [tarefas]);

  // Adicionar nova tarefa
  const addTarefa = (e) => {
    e.preventDefault();
    
    // Usa useRef para acessar o valor do input
    const titulo = inputTarefaRef.current.value.trim();
    
    if (titulo) {
      // Incrementa o contador (não causa re-render)
      contadorRef.current += 1;
      
      const nova = {
        id: Date.now(),
        titulo: titulo,
        passos: []
      };
      
      setTarefas([...tarefas, nova]);
      
      // Limpa o input usando ref
      inputTarefaRef.current.value = '';
      // Mantém o foco no input
      inputTarefaRef.current.focus();
      
      console.log(`Total de tarefas criadas nesta sessão: ${contadorRef.current}`);
    }
  };

  // Remover tarefa
  const removeTarefa = (id) => {
    setTarefas(tarefas.filter(t => t.id !== id));
  };

  // Adicionar passo a uma tarefa
  const addPasso = (tarefaId, textoPasso) => {
    setTarefas(tarefas.map(tarefa => {
      if (tarefa.id === tarefaId) {
        return {
          ...tarefa,
          passos: [...tarefa.passos, {
            id: Date.now(),
            texto: textoPasso,
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
      <p className="subtitulo">Versão com useRef</p>
      
      <form className="form-tarefa" onSubmit={addTarefa}>
        <input
          ref={inputTarefaRef}
          type="text"
          placeholder="Nova tarefa..."
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
      
      <p className="info-ref">
         Abra o Console (F12) para ver o contador de tarefas usando useRef
      </p>
    </div>
  );
}

export default TodoList;