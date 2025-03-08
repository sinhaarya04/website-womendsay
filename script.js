document.addEventListener('DOMContentLoaded', () => {
    const bodyId = document.body.id;
  
    // Try to play background music on first click or key press
    document.addEventListener('click', tryPlayMusic);
    document.addEventListener('keydown', tryPlayMusic);
  
    // LANDING PAGE: Press Enter => reveal.html
    if (bodyId === 'landing') {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          window.location.href = 'reveal.html';
        }
      });
      initPetals(); // Falling petals on landing
    }
  
    // REVEAL PAGE: Press Enter => final.html
    if (bodyId === 'reveal') {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          window.location.href = 'final.html';
        }
      });
    }
  
    // FINAL PAGE: Press Enter => spawn rose
    if (bodyId === 'final') {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          spawnRose();
        }
      });
    }
  });
  
  // Attempt to play the audio
  function tryPlayMusic() {
    const music = document.getElementById('bgMusic');
    if (music && music.paused) {
      music.play().catch((err) => {
        console.warn('Music playback was blocked:', err);
      });
    }
  }
  
  // Falling petals on landing page
  function initPetals() {
    const canvas = document.getElementById('petalCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let petals = [];
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    function Petal() {
      this.x = Math.random() * canvas.width;
      this.y = -10;
      this.speed = 1 + Math.random() * 2;
      this.size = 5 + Math.random() * 5;
      this.angle = Math.random() * Math.PI * 2;
    }
  
    function createPetals(num) {
      for (let i = 0; i < num; i++) {
        petals.push(new Petal());
      }
    }
  
    function updatePetals() {
      for (let i = 0; i < petals.length; i++) {
        let p = petals[i];
        p.y += p.speed;
        p.x += Math.sin(p.angle) * 0.5;
        if (p.y > canvas.height) {
          petals[i] = new Petal();
        }
      }
    }
  
    function drawPetals() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(135,206,250, 0.8)';
      for (let p of petals) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  
    function animate() {
      updatePetals();
      drawPetals();
      requestAnimationFrame(animate);
    }
  
    createPetals(50);
    animate();
  
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
  
  // Spawns a floating rose on the final page
  function spawnRose() {
    const rose = document.createElement('div');
    rose.classList.add('virtual-rose');
    rose.style.bottom = '0';
    rose.style.left = Math.random() * 100 + '%';
    rose.innerHTML = '🌹';
    document.body.appendChild(rose);
  
    let pos = 0;
    const intervalId = setInterval(() => {
      if (pos >= window.innerHeight) {
        clearInterval(intervalId);
        rose.remove();
      } else {
        pos += 2;
        rose.style.bottom = pos + 'px';
        rose.style.opacity = 1 - pos / window.innerHeight;
      }
    }, 20);
  }
  