import React, { useEffect } from 'react';
import './Fireworks.css'; // Move the CSS into this file

const Fireworks = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas');

    const svgShapes = [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147 124" height="21" width="21" fill="red">
        <path d="M131.4 108.6c-5.5 17.5-21.6 27.5-44.3 27.5q-0.6 0-1.3 0l-59.5-1.2
        c-3.2 0-5.7-2.7-5.7-5.9v-3.6c0-15.5 0.1-75.9 0.1-83.3 0-11.4 5.5-20.8 
        15.5-26.5 11.9-6.7 28.3-6.8 39-0.4 8.5 5.1 13.3 13.3 
        13.6 23 0.2 5.3-1 10.9-3.4 16.3 10.9-1.6 21.6 0.9 
        31.1 7.3 13.7 9.2 20.3 29.7 14.9 46.8zm-54.3-70
        c-0.2-5.8-2.9-10.2-7.9-13.3-7.3-4.3-18.9-4.1-27.2 
        0.6-4.3 2.4-9.5 7.2-9.5 16.2 0 6.9-0.1 60.6-0.2 
        80v1.2l53.7 1.1q0.6 0 1.2 0c17.4 0 29.1-6.9 33-19.3
        3.8-12.2-0.8-27.2-10.3-33.6-18-12-35.2-1.5
        -38.5 0.7q-0.4 0.2-0.8 0.5c-2.6 1.9-6.2 1.3-8.1-1.3-1.9-2.6
        -1.3-6.2 1.2-8.2q0.1-0.1 0.9-0.6c7.5-5.5 
        12.8-15.6 12.5-24z" />
      </svg>`
    ];

    const colors = [
      '#ff0000'
    ];

    function createExplosion(x, y) {
      const particleCount = 50 + Math.random() * 30;
      for (let i = 0; i < particleCount; i++) createParticle(x, y);
    }

    function createParticle(x, y) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const shape = svgShapes[Math.floor(Math.random() * svgShapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.innerHTML = shape.replace('red', color);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 3 + Math.random() * 8;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      const rotation = Math.random() * 360;
      const rotationSpeed = (Math.random() - 0.5) * 20;
      const scale = 0.5 + Math.random() * 1;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
      canvas.appendChild(particle);

      let currentX = x;
      let currentY = y;
      let currentVx = vx;
      let currentVy = vy;
      let currentRotation = rotation;
      let frame = 0;
      const maxFrames = 100;
      const gravity = 0.15;

      function animate() {
        frame++;
        currentVy += gravity;
        currentX += currentVx;
        currentY += currentVy;
        currentRotation += rotationSpeed;
        const opacity = 1 - frame / maxFrames;

        particle.style.left = `${currentX}px`;
        particle.style.top = `${currentY}px`;
        particle.style.transform = `scale(${scale}) rotate(${currentRotation}deg)`;
        particle.style.opacity = opacity;

        if (frame < maxFrames && currentY < window.innerHeight + 50) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      }

      animate();
    }

    canvas.addEventListener('pointerdown', (e) => createExplosion(e.clientX, e.clientY));
    for (let i = 0; i < 4; i++) createExplosion(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.6);
  }, []);

  return <div id="canvas"></div>;
};

export default Fireworks;
