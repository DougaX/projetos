import { useState } from 'react';
import { menuData } from '../../data/mockData';
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (id) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <>
      {/* Overlay para fechar o menu */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <button className="close-btn" onClick={onClose}>×</button>

        {menuData.map((grupo) => (
          <div className="menu-grupo" key={grupo.id}>
            <button 
              className="menu-titulo" 
              onClick={() => toggleSubmenu(grupo.id)}
            >
              {grupo.titulo} {openSubmenus[grupo.id] ? '▴' : '▾'}
            </button>
            
            <ul className={`submenu ${openSubmenus[grupo.id] ? 'open' : ''}`}>
              {grupo.itens.map((item, index) => (
                <li key={index}>
                  <a href={`#${item.toLowerCase()}`}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default Sidebar;