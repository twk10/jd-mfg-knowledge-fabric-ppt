window.SLIDES = window.SLIDES || [];
(function () {
  let arch = null;
  window.SLIDES.push({
    id: 'architecture',
    dark: true,
    steps: 14,
    html:
      '<div style="display:flex;justify-content:space-between;align-items:flex-end">' +
      '<div><h1 class="title" style="font-size:34px">How the architecture works</h1></div>' +
      '<div class="btnrow no-nav">' +
      '<button class="btn primary" id="btn-flow-a">\u25b6 Flow 1 \u00b7 teach</button>' +
      '<button class="btn" id="btn-flow-b">\u25b6 Flow 2 \u00b7 answer</button>' +
      '<button class="btn" id="btn-replay">\u27f2 Replay</button>' +
      '</div></div>' +
      '<div class="arch-wrap" id="arch-mount"></div>' +
      '<p style="font:400 11.5px/1.4 var(--body);color:rgba(255,255,255,.42);margin-top:8px">' +
      'The router supports five routes; the two conversational ones (chit-chat, clarify) are omitted here for clarity.</p>',
    onInit(el) {
      arch = window.buildArchDiagram(el.querySelector('#arch-mount'));
      el.querySelector('#btn-flow-a').onclick = () => DECK.setStep(1);
      el.querySelector('#btn-flow-b').onclick = () => DECK.setStep(8);
      el.querySelector('#btn-replay').onclick = () => DECK.setStep(arch.flowStart(DECK.getStep()));
    },
    onStep(el, step) { if (arch) arch.setStep(step); }
  });
})();
