document.addEventListener('DOMContentLoaded', function() {
  // Menu Hamburguer
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu'); // Alterado para selecionar pelo ID
  
  if (menuToggle && navMenu) {
    // Adiciona evento de clique ao botão do menu
    menuToggle.addEventListener('click', function() {
      // Alterna a classe 'active' no menu de navegação
      navMenu.classList.toggle('active');
      
      // Alterna o ícone entre hambúrguer e X
      const menuIcon = menuToggle.querySelector('.menu-icon');
      if (navMenu.classList.contains('active')) {
        menuIcon.textContent = '✕';
        menuToggle.setAttribute('aria-expanded', 'true');
      } else {
        menuIcon.textContent = '☰';
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Fechar menu ao clicar em um link (para mobile)
    const navLinks = document.querySelectorAll('#menu a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) { // Só executa em telas pequenas
          navMenu.classList.remove('active');
          const menuIcon = menuToggle.querySelector('.menu-icon');
          menuIcon.textContent = '☰';
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
    
    // Fechar menu ao clicar fora dele (opcional)
    document.addEventListener('click', function(event) {
      if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          const menuIcon = menuToggle.querySelector('.menu-icon');
          menuIcon.textContent = '☰';
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // Botão voltar ao topo (mantido da versão anterior)
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
  }
});
// PARTE DO CARROSSEL
  const slide = document.querySelector('.carousel-slide');
  const images = slide.querySelectorAll('img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;

  function showSlide(index) {
    if (index >= images.length) currentIndex = 0;
    else if (index < 0) currentIndex = images.length - 1;
    else currentIndex = index;

    slide.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }

  nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
  prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      showSlide(index);
    });
  });

  // Auto slide
  setInterval(() => {
    showSlide(currentIndex + 1);
  }, 5000);

  showSlide(currentIndex); // Init

