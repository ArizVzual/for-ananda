'use strict';
window.BirthdayMusic = (() => {
  let audio, ctx, master, timer, nextLoop = 0, fallback = false, playing = false, wanted = false, muted = false, request = 0, config, app;
  const notes = [[67,.75],[67,.25],[69,1],[67,1],[72,1],[71,2],[67,.75],[67,.25],[69,1],[67,1],[74,1],[72,2],[67,.75],[67,.25],[79,1],[76,1],[72,1],[71,1],[69,2],[77,.75],[77,.25],[76,1],[72,1],[74,1],[72,2]];
  function context() {
    if (!ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;
      ctx = new AudioContext(); master = ctx.createGain(); master.gain.value = muted ? 0 : config.musicVolume * .45; master.connect(ctx.destination);
    }
    return true;
  }
  function tone(midi, time, duration, volume) {
    [1, 2, 3].forEach((harmonic, i) => {
      const oscillator = ctx.createOscillator(), gain = ctx.createGain();
      oscillator.type = 'sine'; oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12) * harmonic;
      gain.gain.setValueAtTime(0, time); gain.gain.linearRampToValueAtTime(volume / (1 + i * 4), time + .015);
      gain.gain.exponentialRampToValueAtTime(.0001, time + duration);
      oscillator.connect(gain); gain.connect(master); oscillator.start(time); oscillator.stop(time + duration + .02);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    });
  }
  function schedule() {
    if (!playing || !fallback) return;
    if (nextLoop < ctx.currentTime + 1) {
      nextLoop = Math.max(nextLoop, ctx.currentTime + .1);
      let at = nextLoop;
      notes.forEach(([midi, beats]) => { tone(midi, at, beats * 2 / 3 + .6, .15); at += beats * 2 / 3; });
      [[48,52,55],[43,47,50],[48,52,55],[53,57,60],[48,52,55],[43,47,50],[48,52,55],[48,52,55]].forEach((chord, bar) => {
        chord.forEach((midi, i) => tone(midi, nextLoop + bar * 8 / 3 + i * .09, 2.8, .065));
      });
      nextLoop = at + 8 / 3;
    }
    timer = setTimeout(schedule, 400);
  }
  function render() {
    const player = document.getElementById('music-player'); player.classList.toggle('is-playing', playing && !muted);
    const toggle = document.getElementById('music-toggle'); toggle.setAttribute('aria-label', playing ? 'Jeda musik' : 'Putar musik');
    toggle.innerHTML = `<i data-lucide="${playing ? 'pause' : 'play'}"></i>`;
    const mute = document.getElementById('music-mute'); mute.setAttribute('aria-label', muted ? 'Aktifkan suara' : 'Bisukan musik'); mute.setAttribute('aria-pressed', String(muted));
    mute.innerHTML = `<i data-lucide="${muted ? 'volume-x' : 'volume-2'}"></i>`; app.icons();
  }
  async function play() {
    const id = ++request; wanted = true;
    // Unlock synthesized fallback inside the same user gesture as the WAV player.
    let resumed = Promise.resolve(false);
    try { if (context()) resumed = ctx.resume().then(() => true).catch(() => false); } catch { /* WAV may still play. */ }
    if (!fallback) {
      try {
        await audio.play();
        if (id !== request || !wanted) { if (!wanted) audio.pause(); return; }
        playing = true; render(); return;
      } catch { /* A failed/missing local WAV falls back to Web Audio. */ }
    }
    const ready = await resumed;
    if (id !== request || !wanted) return;
    if (ready && ctx) { audio.pause(); fallback = true; playing = true; clearTimeout(timer); schedule(); }
    else { wanted = false; playing = false; app.toast(app.copy('audioError')); }
    render();
  }
  function pause() {
    wanted = false; request++; playing = false; audio.pause(); clearTimeout(timer);
    if (ctx && ctx.state === 'running') ctx.suspend().catch(() => {});
    render();
  }
  function reset() {
    pause(); audio.currentTime = 0;
    if (ctx) ctx.close().catch(() => {});
    ctx = null; master = null; nextLoop = 0; fallback = false; muted = false; audio.muted = false; render();
  }
  function init(settings, helpers) {
    config = settings; app = helpers;
    audio = new Audio(config.musicFile); audio.loop = true; audio.volume = Math.max(0, Math.min(1, config.musicVolume)); audio.preload = 'none';
    document.getElementById('music-toggle').addEventListener('click', () => wanted ? pause() : play());
    document.getElementById('music-mute').addEventListener('click', () => {
      muted = !muted; audio.muted = muted;
      if (master) master.gain.setTargetAtTime(muted ? 0 : config.musicVolume * .45, ctx.currentTime, .05);
      render();
    });
    audio.addEventListener('pause', () => { if (!fallback) { playing = false; render(); } });
    audio.addEventListener('playing', () => { if (wanted && !fallback) { playing = true; render(); } });
    render();
  }
  return { init, play, pause, reset };
})();
