import CardImc from './components/CardImc/CardImc';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Calculadora de IMC</h1>
      <p className="legenda">
        <span className="leg-verde">🟢 Normal (≤24.5)</span>
        <span className="leg-amarelo">🟡 Sobrepeso (24.5-30)</span>
        <span className="leg-vermelho">🔴 Obesidade (≥30)</span>
      </p>
      
      <div className="cards-container">
        <CardImc nome="Maria Silva" alturaInicial={1.65} pesoInicial={60} />
        <CardImc nome="João Santos" alturaInicial={1.75} pesoInicial={85} />
        <CardImc nome="Ana Oliveira" alturaInicial={1.60} pesoInicial={90} />
      </div>
    </div>
  );
}

export default App;