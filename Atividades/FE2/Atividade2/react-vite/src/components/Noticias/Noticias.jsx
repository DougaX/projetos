import { noticiasData } from '../../data/mockData';
import './Noticias.css';

function Noticias() {
  return (
    <section className="noticias">
      <h2>Novidades e Dicas</h2>
      <div className="noticia-grid">
        {noticiasData.map((noticia) => (
          <article className="noticia" key={noticia.id}>
            <div className="noticia-imagem">{noticia.emoji}</div>
            <div className="noticia-conteudo">
              <h3>{noticia.titulo}</h3>
              <p>{noticia.descricao}</p>
              <a href="#">Leia Mais</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Noticias;