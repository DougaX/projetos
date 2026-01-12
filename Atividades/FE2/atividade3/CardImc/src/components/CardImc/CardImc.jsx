import { useState, useEffect } from 'react';
import './CardImc.css';

function CardImc({ nome, alturaInicial, pesoInicial }) {
  const [peso, setPeso] = useState(pesoInicial);
  const [cor, setCor] = useState('verde');

  // Calcula o IMC
  const altura = alturaInicial; // altura fixa
  const imc = (peso / (altura * altura)).toFixed(1);

  // useEffect para atualizar a cor quando o IMC mudar
  useEffect(() => {
    if (imc <= 24.5) {
      setCor('verde');
    } else if (imc > 24.5 && imc < 30) {
      setCor('amarelo');
    } else {
      setCor('vermelho');
    }
  }, [imc]);

  // Funções para alterar o peso
  const aumentarPeso = () => {
    setPeso(p => p + 1);
  };

  const diminuirPeso = () => {
    setPeso(p => (p > 1 ? p - 1 : 1)); // Não deixa ficar menor que 1
  };

  // Retorna a classificação do IMC
  const getClassificacao = () => {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc <= 24.5) return 'Peso normal';
    if (imc < 30) return 'Sobrepeso';
    if (imc < 35) return 'Obesidade Grau I';
    if (imc < 40) return 'Obesidade Grau II';
    return 'Obesidade Grau III';
  };

  return (
    <div className={`card-imc ${cor}`}>
      <h2>{nome}</h2>
      
      <div className="info">
        <p><strong>Altura:</strong> {altura.toFixed(2)} m</p>
        
        <div className="peso-container">
          <strong>Peso:</strong>
          <div className="peso-controles">
            <button onClick={diminuirPeso} className="btn-peso">−</button>
            <span className="peso-valor">{peso} kg</span>
            <button onClick={aumentarPeso} className="btn-peso">+</button>
          </div>
        </div>
      </div>

      <div className="resultado">
        <div className="imc-valor">
          <span className="imc-numero">{imc}</span>
          <span className="imc-label">IMC</span>
        </div>
        <p className="classificacao">{getClassificacao()}</p>
      </div>
    </div>
  );
}

export default CardImc;