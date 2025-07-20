document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll navigation
  document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Watch button scroll
  document.getElementById('watchBtn').onclick = () => {
    document.getElementById('videos').scrollIntoView({ behavior: 'smooth' });
  };

  // Particle background
  particlesJS('bg-canvas', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#00FF66' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#00FF66', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: 'none', random: true }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
      modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });

  // Scroll animations
  AOS.init({ duration: 1000, once: true });
  const animItems = document.querySelectorAll('[data-animate]');
  const onScroll = () => {
    animItems.forEach(item => {
      if (item.getBoundingClientRect().top < window.innerHeight * 0.85) {
        item.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Tilt effect
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.5
  });

  // Ripple effect
  $('.ripple').ripples({
    resolution: 512,
    dropRadius: 20,
    perturbance: 0.04
  });

  // Video integration
  const videoLinks = [
    'wy5mGrTwbKo', '3FCvN3e4E0s', '2JOzc_rUzhw', 'j58RXW-5EGM',
    'lgYSIpGJQHQ', '8lZjfxTlNvE', 'LfJ4sgTcqN4', '25mshUuTlfk',
    'WgM2i3MyxlA', 'gx1BAxhbaQQ', '2fk17n3cAyE', '_jaYa4qXUXA',
    'Gxk4ceKqPvM', 'zVfCQizyqv4'
  ];
  const grid = document.querySelector('.video-grid');
  const apiKey = 'YOUR_API_KEY'; // Replace with your YouTube Data API key

  videoLinks.forEach(id => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.setAttribute('data-tilt', '');
    card.innerHTML = `
      <img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="Video thumbnail">
      <div class="overlay"><i class="fas fa-play"></i></div>
      <h3>Loading...</h3>
    `;
    card.onclick = () => openModal(`https://www.youtube.com/embed/${id}?autoplay=1`);
    grid.appendChild(card);

    // Fetch video title
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          card.querySelector('h3').textContent = data.items[0].snippet.title;
        }
      })
      .catch(error => console.error('Error fetching video:', error));
  });

  // Modal handler
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  function openModal(src) {
    modalImg.src = src;
    modal.style.display = 'flex';
  }

  modalClose.onclick = () => {
    modalImg.src = '';
    modal.style.display = 'none';
  };

  modal.onclick = (e) => {
    if (e.target === modal) {
      modalImg.src = '';
      modal.style.display = 'none';
    }
  };

  // Contact form submission
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Form submitted! (Note: Backend required for actual submission)');
    this.reset();
  });
});