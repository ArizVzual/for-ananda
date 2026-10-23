'use strict';
(() => {
  const config = birthdayConfig;
  const $ = id => document.getElementById(id);
  const birthday = new Date(`${config.birthdayDate}T12:00:00`);
  const format = text => String(text).replaceAll('{nickname}', config.nickname).replaceAll('{recipientName}', config.recipientName).replaceAll('{birthdayDayMonth}', birthday.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' }));
  const copy = key => format(config.copy[key] ?? '');
  const icons = () => { if (window.lucide) window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } }); };
  let toastTimer, openingTimer, letterTimer, letterOpenTimer, letterIndex = 0, logoClicks = 0;
  let finaleTimers = [];
  const letterChars = Array.from(format(config.letter));
  function toast(message) {
    clearTimeout(toastTimer); $('toast').textContent = message; $('toast').classList.add('visible');
    toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 4200);
  }
  function syncModal() { document.body.classList.toggle('modal-open', !!document.querySelector('dialog[open]')); }
  const app = { copy, icons, toast, syncModal };
  document.title = config.websiteTitle;
  const colors = { pink: '--pink', babyPink: '--baby-pink', cream: '--cream', lavender: '--lavender', roseGold: '--rose-gold', ink: '--ink' };
  Object.entries(colors).forEach(([key, variable]) => { if (config.theme[key]) document.documentElement.style.setProperty(variable, config.theme[key]); });
  document.querySelectorAll('[data-copy]').forEach(el => { el.textContent = copy(el.dataset.copy); });
  document.querySelectorAll('[data-nav]').forEach(el => { el.textContent = config.copy.nav[Number(el.dataset.nav)]; });
  document.querySelectorAll('[data-name]').forEach(el => { el.textContent = config.nickname; });
  const restOfName = config.recipientName.startsWith(config.nickname) ? config.recipientName.slice(config.nickname.length).trim() : config.recipientName;
  document.querySelectorAll('[data-full-name]').forEach(el => { el.textContent = `${restOfName}!`; });
  document.querySelectorAll('[data-recipient]').forEach(el => { el.textContent = `${config.recipientName}.`; });
  document.querySelectorAll('[data-date]').forEach(el => {
    el.textContent = birthday.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    if (el.tagName === 'TIME') el.dateTime = config.birthdayDate;
  });
  $('sender-name').textContent = config.senderName;
  BirthdayGallery.init(config, app);
  BirthdayMusic.init(config, app);

  config.loveReasons.forEach((reason, index) => {
    const card = document.createElement('button'); card.className = 'reason-card reveal'; card.setAttribute('aria-pressed', 'false'); card.setAttribute('aria-label', `${reason.title}: ${copy('reasonHint')}`);
    const inner = document.createElement('span'); inner.className = 'reason-inner';
    const front = document.createElement('span'); front.className = 'reason-face reason-front';
    const number = document.createElement('span'); number.className = 'reason-number'; number.textContent = String(index + 1).padStart(2, '0');
    const icon = document.createElement('i'); icon.dataset.lucide = reason.icon;
    const title = document.createElement('strong'); title.textContent = reason.title;
    const hint = document.createElement('small'); hint.textContent = copy('reasonHint'); front.append(number, icon, title, hint);
    const back = document.createElement('span'); back.className = 'reason-face reason-back'; back.setAttribute('aria-hidden', 'true');
    const heart = document.createElement('i'); heart.dataset.lucide = 'heart';
    const message = document.createElement('span'); message.textContent = format(reason.text); back.append(heart, message);
    inner.append(front, back); card.append(inner);
    card.addEventListener('click', () => {
      const opened = card.getAttribute('aria-pressed') !== 'true'; card.setAttribute('aria-pressed', String(opened));
      card.setAttribute('aria-label', opened ? `${reason.title}. ${format(reason.text)}` : `${reason.title}: ${copy('reasonHint')}`);
      front.setAttribute('aria-hidden', String(opened)); back.setAttribute('aria-hidden', String(!opened));
      if (opened) BirthdayFX.hearts(card);
    });
    $('reason-grid').append(card);
  });

  function showExperience() {
    $('opening').hidden = true; $('experience').hidden = false; $('experience').inert = false;
    document.body.classList.remove('is-opening'); window.scrollTo({ top: 0, behavior: 'instant' });
    $('birthday-heading').focus({ preventScroll: true }); BirthdayFX.reveal();
  }
  $('open-gift').addEventListener('click', () => {
    $('open-gift').disabled = true; $('opening').classList.add('gift-open'); BirthdayMusic.play(); BirthdayFX.celebrate(true);
    openingTimer = setTimeout(() => {
      $('opening').classList.add('leaving');
      openingTimer = setTimeout(showExperience, BirthdayFX.reduced() ? 0 : 650);
    }, BirthdayFX.reduced() ? 0 : 900);
  });
  $('secret-heart').addEventListener('click', () => {
    logoClicks++; BirthdayFX.hearts($('secret-heart'));
    if (logoClicks === 5) { toast(copy('secretLogo')); logoClicks = 0; }
  });

  function paintLetter() {
    const paragraphs = letterChars.slice(0, letterIndex).join('').split('\n\n');
    const target = $('letter-typed');
    paragraphs.forEach((text, index) => {
      let p = target.children[index];
      if (!p) { p = document.createElement('p'); target.append(p); }
      if (p.textContent !== text) p.textContent = text;
    });
  }
  function fullLetter() {
    clearTimeout(letterTimer); letterIndex = letterChars.length; paintLetter(); $('full-letter').hidden = true;
  }
  function typeLetter() {
    letterIndex = Math.min(letterIndex + 3, letterChars.length); paintLetter();
    if (letterIndex < letterChars.length) letterTimer = setTimeout(typeLetter, 24);
    else $('full-letter').hidden = true;
  }
  const accessibleLetter = document.createDocumentFragment();
  format(config.letter).split('\n\n').forEach(text => { const p = document.createElement('p'); p.textContent = text; accessibleLetter.append(p); });
  $('letter-accessible').append(accessibleLetter);
  $('open-letter').addEventListener('click', () => {
    $('letter-stage').classList.add('letter-open'); $('open-letter').setAttribute('aria-expanded', 'true'); $('open-letter').disabled = true;
    letterOpenTimer = setTimeout(() => {
      $('letter-paper').hidden = false; $('open-letter').hidden = true; $('open-letter').disabled = false;
      if (BirthdayFX.reduced()) fullLetter(); else typeLetter();
      $('letter-body').focus({ preventScroll: true });
      $('letter-paper').scrollIntoView({ behavior: BirthdayFX.reduced() ? 'instant' : 'smooth', block: 'center' });
    }, BirthdayFX.reduced() ? 0 : 650);
  });
  $('full-letter').addEventListener('click', () => { fullLetter(); $('letter-body').focus({ preventScroll: true }); });
  function closeLetter(focus = true) {
    clearTimeout(letterTimer); clearTimeout(letterOpenTimer); letterIndex = 0;
    $('letter-stage').classList.remove('letter-open'); $('letter-paper').hidden = true; $('letter-body').scrollTop = 0;
    $('open-letter').hidden = false; $('open-letter').disabled = false; $('open-letter').setAttribute('aria-expanded', 'false'); $('full-letter').hidden = false;
    $('letter-typed').replaceChildren(); if (focus) $('open-letter').focus({ preventScroll: true });
  }
  $('close-letter').addEventListener('click', () => closeLetter());

  function relight(focus = true) {
    $('cake').classList.remove('blown'); $('cake').setAttribute('aria-label', 'Kue ulang tahun dengan tiga lilin menyala');
    $('blow-candles').hidden = false; $('wish-result').hidden = true;
    if (focus) $('blow-candles').focus({ preventScroll: true });
  }
  $('blow-candles').addEventListener('click', () => {
    $('cake').classList.add('blown'); $('cake').setAttribute('aria-label', 'Kue ulang tahun dengan tiga lilin yang sudah padam');
    $('blow-candles').hidden = true; $('wish-result').hidden = false; BirthdayFX.celebrate(true); BirthdayFX.hearts($('cake'));
    $('relight').focus({ preventScroll: true });
  });
  $('relight').addEventListener('click', () => relight());

  function clearFinale() { finaleTimers.forEach(clearTimeout); finaleTimers = []; }
  function ending() { $('finale-ending').hidden = false; $('finale').classList.add('bloom'); BirthdayFX.celebrate(true); }
  $('last-surprise').addEventListener('click', () => {
    clearFinale(); $('finale-lines').replaceChildren(); $('finale-ending').hidden = true; $('finale').classList.remove('bloom');
    $('finale').showModal(); $('finale').scrollTop = 0; syncModal();
    config.copy.finalLines.forEach((line, index) => {
      const add = () => { const p = document.createElement('p'); p.textContent = format(line); $('finale-lines').append(p); };
      if (BirthdayFX.reduced()) add(); else finaleTimers.push(setTimeout(add, 500 + index * 1550));
    });
    if (BirthdayFX.reduced()) ending(); else finaleTimers.push(setTimeout(ending, 5600));
  });
  for (let i = 0; i < 25; i++) {
    const star = document.createElement('span'); star.textContent = i % 4 === 0 ? '✧' : '·'; star.style.left = `${(i * 37 + 11) % 100}%`; star.style.top = `${(i * 23 + 7) % 100}%`; star.style.animationDelay = `${-(i % 5)}s`; $('finale').querySelector('.finale-stars').append(star);
  }
  $('close-finale').addEventListener('click', () => $('finale').close());
  $('finale').addEventListener('close', () => { clearFinale(); syncModal(); });
  $('replay').addEventListener('click', () => {
    clearFinale(); clearTimeout(openingTimer); clearTimeout(toastTimer); $('toast').classList.remove('visible');
    $('finale').close(); BirthdayMusic.reset(); BirthdayGallery.reset(); closeLetter(false); relight(false); logoClicks = 0;
    document.querySelectorAll('.reason-card').forEach(card => { if (card.getAttribute('aria-pressed') === 'true') card.click(); });
    document.querySelectorAll('.heart-particle').forEach(el => el.remove()); if (window.confetti) window.confetti.reset();
    $('experience').hidden = true; $('experience').inert = true; $('opening').hidden = false; $('opening').classList.remove('gift-open', 'leaving');
    $('open-gift').disabled = false; document.body.classList.add('is-opening'); document.body.classList.remove('motion-ready');
    window.scrollTo({ top: 0, behavior: 'instant' }); $('opening').scrollTop = 0; $('open-gift').focus({ preventScroll: true });
  });
  BirthdayFX.parallax(); icons();
})();
