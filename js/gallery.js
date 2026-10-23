'use strict';
window.BirthdayGallery = (() => {
  let selected = 0;
  let config, app;
  const gallery = document.getElementById('gallery');
  const dialog = document.getElementById('lightbox');
  function photo(container, src, alt, eager = false, position = 'center') {
    container.replaceChildren();
    const placeholder = document.createElement('div');
    placeholder.className = 'photo-placeholder';
    const icon = document.createElement('i'); icon.dataset.lucide = 'flower-2';
    const title = document.createElement('span'); title.textContent = config.copy.photoPlaceholder;
    const note = document.createElement('small'); note.textContent = 'with love, always';
    placeholder.append(icon, title, note); container.append(placeholder);
    const img = new Image();
    img.alt = alt; img.decoding = 'async'; img.loading = eager ? 'eager' : 'lazy';
    img.style.objectPosition = position;
    img.addEventListener('load', () => { placeholder.hidden = true; });
    img.addEventListener('error', () => { img.remove(); placeholder.hidden = false; }, { once: true });
    if (src) { img.src = src; container.append(img); }
    app.icons();
  }
  function renderLightbox() {
    const item = config.gallery[selected];
    photo(document.getElementById('lightbox-photo'), item.src, item.caption, true, item.position);
    document.getElementById('lightbox-caption').textContent = item.caption;
    document.getElementById('lightbox-count').textContent = `${selected + 1} / ${config.gallery.length}`;
  }
  function step(delta) { selected = (selected + delta + config.gallery.length) % config.gallery.length; renderLightbox(); }
  function init(settings, helpers) {
    config = settings; app = helpers;
    photo(document.getElementById('main-photo'), config.mainPhoto, config.recipientName, true);
    config.gallery.forEach((item, index) => {
      const card = document.createElement('article'); card.className = 'memory-card reveal';
      const number = document.createElement('span'); number.className = 'memory-number'; number.textContent = String(index + 1).padStart(2, '0'); number.setAttribute('aria-hidden', 'true');
      const button = document.createElement('button'); button.className = 'memory-open'; button.setAttribute('aria-label', `Buka foto ${index + 1}: ${item.caption}`);
      const slot = document.createElement('span'); slot.className = 'photo-slot memory-photo'; slot.style.display = 'block';
      photo(slot, item.src, `Kenangan ${index + 1} bersama ${config.nickname}`, false, item.position);
      const title = document.createElement('span'); title.className = 'memory-note script'; title.textContent = item.note;
      const caption = document.createElement('span'); caption.className = 'memory-caption'; caption.textContent = item.caption;
      button.append(slot, title, caption); card.append(number, button);
      button.addEventListener('click', () => { selected = index; renderLightbox(); dialog.showModal(); app.syncModal(); });
      if (item.secret) {
        const heart = document.createElement('button'); heart.className = 'memory-secret icon-button'; heart.setAttribute('aria-label', 'Buka pesan rahasia di foto ini');
        heart.innerHTML = '<i data-lucide="heart"></i>';
        heart.addEventListener('click', () => { app.toast(app.copy('secretPhoto')); BirthdayFX.hearts(heart); }); card.append(heart);
      }
      gallery.append(card);
    });
    document.getElementById('gallery-prev').addEventListener('click', () => gallery.scrollBy({ left: -268, behavior: BirthdayFX.reduced() ? 'instant' : 'smooth' }));
    document.getElementById('gallery-next').addEventListener('click', () => gallery.scrollBy({ left: 268, behavior: BirthdayFX.reduced() ? 'instant' : 'smooth' }));
    document.getElementById('close-lightbox').addEventListener('click', () => dialog.close());
    document.getElementById('lightbox-prev').addEventListener('click', () => step(-1));
    document.getElementById('lightbox-next').addEventListener('click', () => step(1));
    dialog.addEventListener('close', app.syncModal);
    dialog.addEventListener('click', e => { if (e.target === dialog && (e.clientX < dialog.getBoundingClientRect().left || e.clientX > dialog.getBoundingClientRect().right)) dialog.close(); });
    dialog.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); step(e.key === 'ArrowRight' ? 1 : -1); }
    });
    let startX, startY;
    const lightboxPhoto = document.getElementById('lightbox-photo');
    lightboxPhoto.addEventListener('touchstart', e => { startX = e.changedTouches[0].clientX; startY = e.changedTouches[0].clientY; }, { passive: true });
    lightboxPhoto.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX, dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    }, { passive: true });
  }
  return { init, reset: () => { if (dialog.open) dialog.close(); gallery.scrollLeft = 0; selected = 0; } };
})();
