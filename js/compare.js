/* Google-vs-agent comparison: 4-step reveal (question, Google, ours, verdict) */
(function () {
  window.buildCompare = function (mount, cfg) {
    mount.innerHTML =
      '<div class="cmp">' +
      '<div class="cmp-q"><div class="bubble">' + icon('user') + '<span>' + cfg.question + '</span></div></div>' +
      '<div class="cmp-panels">' +
      '<div class="panel google"><header>' + icon('search') + 'Google \u00b7 AI Overview</header>' +
      '<div class="body">' + cfg.google + '</div>' +
      '<div class="tag">' + cfg.googleTag + '</div></div>' +
      '<div class="panel ours"><header>' + icon('spark') + 'Our agent \u00b7 Hybrid RAG</header>' +
      '<div class="body">' + cfg.ours + '</div>' +
      '<div class="tag">' + cfg.oursTag + '</div></div>' +
      '</div>' +
      '<div class="cmp-verdict">' + cfg.verdict + '</div>' +
      '</div>';
    const el = mount.querySelector('.cmp');
    return {
      steps: 4,
      setStep(s) {
        el.classList.toggle('show-q', s >= 1);
        el.classList.toggle('show-google', s >= 2);
        el.classList.toggle('show-ours', s >= 3);
        el.classList.toggle('show-verdict', s >= 4);
      }
    };
  };
})();
