import { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Slider from './components/Slider/Slider';
import Noticias from './components/Noticias/Noticias';
import ListaReceitas from './components/ListaReceitas/ListaReceitas';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <Header onToggleMenu={toggleSidebar} />
      
      <main className="main-content">
        <Slider />
        <Noticias />
        <ListaReceitas />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;