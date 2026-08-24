import { useState } from 'react';
import './Header.css';

function Header({ onToggleMenu }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      alert(`Pesquisando por: ${searchTerm}`);
    }
  };

  return (
    <header className="header">

      {/* Área esquerda */}
      <div className="header-left">
        <button className="menu-btn" onClick={onToggleMenu}>
          ☰
        </button>

        <a href="/" className="home-icon">
          🏠
        </a>
      </div>

      {/* Barra de pesquisa central */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar receitas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />

        <span className="search-icon" onClick={handleSearch}>
          🔍
        </span>
      </div>

      {/* Área direita */}
      <div className="user-info">
        <span>S2</span>
        <span>Usuário</span>
      </div>

    </header>
  );
}

export default Header;