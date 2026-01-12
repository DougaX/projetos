import { slidesData } from '../../data/mockData';
import './Slider.css';

function Slider() {
  return (
    <section className="receitas-slider">
      <h2>Receitas em Destaque</h2>
      <div className="slider">
        {slidesData.map((slide) => (
          <div className="slide" key={slide.id}>
            <div className="slide-img">{slide.emoji}</div>
            <h3>{slide.titulo}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Slider;