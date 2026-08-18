/* Deck engine: renders window.SLIDES, keyboard/hash navigation, fragment stepper */
(function () {
  const slides = window.SLIDES || [];
  const stage = document.getElementById('stage');
  const fill = document.getElementById('progress-fill');
  const els = [], stepMax = [];
  let cur = 0, step = 0, settingHash = false;

  slides.forEach((s, i) => {
    const el = document.createElement('section');
    el.className = 'slide' + (s.dark ? ' dark' : '') + (s.cls ? ' ' + s.cls : '');
    el.id = 'slide-' + s.id;
    el.innerHTML =
      (s.kicker ? '<div class="kicker">' + s.kicker + '</div>' : '') +
      s.html +
      '<footer class="chrome"><span>&copy; 2026 Thoughtworks</span>' +
      '<span>' + (i + 1) + ' / ' + slides.length + '</span></footer>';
    stage.appendChild(el);
    els.push(el);
    stepMax.push(s.steps != null ? s.steps : el.querySelectorAll('.frag').length);
    if (s.onInit) s.onInit(el);
  });

  function apply() {
    els.forEach((el, i) => el.classList.toggle('active', i === cur));
    const s = slides[cur], el = els[cur];
    el.querySelectorAll('.frag').forEach((f, i) => f.classList.toggle('on', i < step));
    if (s.onStep) s.onStep(el, step);
    fill.style.width = (slides.length > 1 ? (cur / (slides.length - 1)) * 100 : 100) + '%';
    settingHash = true;
    location.hash = '#/' + (cur + 1);
    setTimeout(() => (settingHash = false), 0);
  }

  function goto(i, st) {
    if (i < 0 || i >= slides.length) return;
    const leaving = slides[cur];
    if (leaving && leaving.onLeave && i !== cur) leaving.onLeave(els[cur]);
    const entering = i !== cur;
    cur = i;
    step = st != null ? st : 0;
    if (entering && slides[cur].onEnter) slides[cur].onEnter(els[cur]);
    apply();
  }

  function next() {
    if (step < stepMax[cur]) { step++; apply(); }
    else if (cur < slides.length - 1) goto(cur + 1, 0);
  }
  function prev() {
    if (step > 0) { step--; apply(); }
    else if (cur > 0) goto(cur - 1, stepMax[cur - 1]);
  }

  window.DECK = {
    next, prev, goto,
    setStep(n) { step = Math.max(0, Math.min(n, stepMax[cur])); apply(); },
    getStep() { return step; }
  };

  /* ---- Overview grid (Esc): click or Enter to jump ---- */
  let ov = null, ovSel = 0;
  function ovScale() {
    if (!ov) return;
    ov.querySelectorAll('.ov-thumb').forEach(t => {
      t.firstElementChild.style.transform = 'scale(' + t.clientWidth / 1280 + ')';
    });
  }
  function ovMark() {
    ov.querySelectorAll('.ov-item').forEach((it, i) => it.classList.toggle('sel', i === ovSel));
    ov.children[ovSel].scrollIntoView({ block: 'nearest' });
  }
  function hideOverview() { if (ov) { ov.remove(); ov = null; } }
  function pick(i) { hideOverview(); goto(i, i === cur ? step : 0); }
  function showOverview() {
    ovSel = cur;
    ov = document.createElement('div');
    ov.id = 'overview';
    ov.onclick = hideOverview;
    slides.forEach((s, i) => {
      const clone = els[i].cloneNode(true);
      clone.removeAttribute('id');
      clone.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
      clone.classList.add('active');
      clone.querySelectorAll('.frag').forEach(f => f.classList.add('on'));
      clone.querySelectorAll('.cmp').forEach(c => c.classList.add('show-q', 'show-google', 'show-ours', 'show-verdict'));
      const item = document.createElement('div');
      item.className = 'ov-item';
      const thumb = document.createElement('div');
      thumb.className = 'ov-thumb';
      thumb.appendChild(clone);
      const label = document.createElement('div');
      label.className = 'ov-label';
      const h = els[i].querySelector('h1.title');
      label.textContent = (i + 1) + ' \u00b7 ' + (h ? h.textContent : s.id);
      item.appendChild(thumb);
      item.appendChild(label);
      item.onclick = (e) => { e.stopPropagation(); pick(i); };
      ov.appendChild(item);
    });
    document.body.appendChild(ov);
    ovScale();
    ovMark();
  }
  addEventListener('resize', ovScale);

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (ov) {
      switch (e.key) {
        case 'Escape': hideOverview(); break;
        case 'Enter': pick(ovSel); break;
        case 'ArrowRight': ovSel = Math.min(ovSel + 1, slides.length - 1); ovMark(); break;
        case 'ArrowLeft': ovSel = Math.max(ovSel - 1, 0); ovMark(); break;
        case 'ArrowDown': ovSel = Math.min(ovSel + 4, slides.length - 1); ovMark(); break;
        case 'ArrowUp': ovSel = Math.max(ovSel - 4, 0); ovMark(); break;
        default: return;
      }
      e.preventDefault();
      return;
    }
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown': e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': e.preventDefault(); prev(); break;
      case 'Home': goto(0, 0); break;
      case 'End': goto(slides.length - 1, stepMax[slides.length - 1]); break;
      case 'Escape': e.preventDefault(); showOverview(); break;
      case 'f': case 'F':
        document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
        break;
    }
  });

  document.addEventListener('click', (e) => {
    if (ov || e.target.closest('button,a,.no-nav')) return;
    (e.clientX > innerWidth / 3) ? next() : prev();
  });

  function fit() {
    const s = Math.min(innerWidth / 1280, innerHeight / 720);
    stage.style.transform = 'translate(-50%,-50%) scale(' + s + ')';
  }
  addEventListener('resize', fit);
  fit();

  function fromHash() {
    if (settingHash) return;
    const m = location.hash.match(/^#\/(\d+)/);
    const i = m ? Math.min(Math.max(+m[1] - 1, 0), slides.length - 1) : 0;
    goto(i, 0);
  }
  addEventListener('hashchange', fromHash);

  const m = location.hash.match(/^#\/(\d+)/);
  if (m) { cur = -1; fromHash(); }
  else { if (slides[0] && slides[0].onEnter) slides[0].onEnter(els[0]); apply(); }
})();
