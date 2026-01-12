import './Passo.css';

function Passo({ passo, onToggle, onRemove }) {
  return (
    <div className={`passo ${passo.concluido ? 'concluido' : ''}`}>
      <input
        type="checkbox"
        checked={passo.concluido}
        onChange={onToggle}
      />
      <span className="passo-texto">{passo.texto}</span>
      <button className="btn-remover-passo" onClick={onRemove}>
        ✕
      </button>
    </div>
  );
}

export default Passo;