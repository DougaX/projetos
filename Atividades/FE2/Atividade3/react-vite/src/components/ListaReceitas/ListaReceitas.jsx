import { receitasData } from '../../data/mockData';
import './ListaReceitas.css';

function ListaReceitas() {
  return (
    <section className="lista-receitas">
      <h2>Todas as Receitas</h2>
      <div className="receitas-grid">
        {receitasData.map((receita) => (
          <div className="receita-card" key={receita.id}>
            <div className="receita-img">{receita.emoji}</div>
            <h3>{receita.titulo}</h3>
            <p>{receita.descricao}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ListaReceitas;