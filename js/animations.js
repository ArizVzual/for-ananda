'use strict';
window.BirthdayFX = (() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  function reveal() {
    if (!('IntersectionObserver' in window) || motion.matches) return;
    document.body.classList.add('motion-ready');
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
  function celebrate(big = false) {
    if (motion.matches || typeof window.confetti !== 'function') return;
    const base = { colors: ['#f8bbd0', '#d89ba5', '#e9d5ff', '#fff8f0', '#bb7c89'], disableForReducedMotion: true, zIndex: 90, ticks: 180, gravity: .85, scalar: .85 };
    let burst = window.confetti;
    // A modal occupies the browser top layer; its confetti must live inside it.
    const modal = document.querySelector('#finale[open]');
    let canvas;
    if (modal) {
      canvas = document.createElement('canvas'); canvas.className = 'modal-confetti';
      canvas.setAttribute('aria-hidden', 'true'); modal.append(canvas);
      burst = window.confetti.create(canvas, { resize: true });
    }
    const completion = burst({ ...base, particleCount: big ? 85 : 45, spread: 85, origin: { x: .5, y: .65 }, startVelocity: 32 });
    if (big) {
      burst({ ...base, particleCount: 40, angle: 60, spread: 65, origin: { x: 0, y: .65 } });
      burst({ ...base, particleCount: 40, angle: 120, spread: 65, origin: { x: 1, y: .65 } });
    }
    if (canvas && completion) completion.then(() => canvas.remove());
  }
  function hearts(target) {
    if (motion.matches) return;
    const rect = target.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      const heart = document.createElement('span');
      heart.className = 'heart-particle'; heart.textContent = '♡'; heart.setAttribute('aria-hidden', 'true');
      heart.style.left = `${rect.left + rect.width / 2 + (i - 2) * 9}px`;
      heart.style.top = `${rect.top + rect.height / 2}px`;
      heart.style.setProperty('--dx', `${(i - 2) * 25}px`);
      document.body.append(heart); setTimeout(() => heart.remove(), 1450);
    }
  }
  function parallax() {
    const art = document.getElementById('hero-art');
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    let frame;
    art.addEventListener('pointermove', e => {
      if (motion.matches || !pointer.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = art.getBoundingClientRect();
        art.style.translate = `${(e.clientX - rect.left - rect.width / 2) / 35}px ${(e.clientY - rect.top - rect.height / 2) / 45}px`;
      });
    });
    art.addEventListener('pointerleave', () => { cancelAnimationFrame(frame); art.style.translate = ''; });
  }
  motion.addEventListener('change', () => { if (motion.matches) document.body.classList.remove('motion-ready'); });
  return { reveal, celebrate, hearts, parallax, reduced: () => motion.matches };
})();
