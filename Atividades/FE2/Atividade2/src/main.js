import './style.css';

// Toggle do menu lateral
window.toggleMenu = function () {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
};

// Toggle dos submenus
window.toggleSubmenu = function (id) {
  const submenu = document.getElementById(id);
  submenu.classList.toggle('open');
};

// Fechar menu ao clicar fora
document.addEventListener('click', function (e) {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.querySelector('.menu-btn');

  if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
    sidebar.classList.remove('active');
  }
});