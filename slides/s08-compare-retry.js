window.SLIDES = window.SLIDES || [];
(function () {
  let cmp = null;
  const ROW = (i, code, action) =>
    '<div class="row" style="--i:' + i + '">' + icon('check') + '<code>' + code + '</code><span>' + action + '</span></div>';

  window.SLIDES.push({
    id: 'cmp-retry',
    steps: 4,
    html:
      '<h1 class="title" style="font-size:30px">Round 1 \u2014 the same question, two answers</h1>' +
      '<div id="cmp-retry-mount"></div>',
    onInit(el) {
      cmp = window.buildCompare(el.querySelector('#cmp-retry-mount'), {
          question: '\u201cHow should I retry a failed payment safely?\u201d',
          google:
            'Enable Stripe <b>Smart Retries</b> (Billing \u2192 Revenue recovery) to automatically retry at optimal times. ' +
            'Analyze <code>last_payment_error</code> decline codes and don\u2019t retry hard declines; let Smart Retries\u2019 ' +
            'machine learning handle timing for soft declines; enable dunning management (automated emails); ' +
            'and cap total attempts \u2014 around 8 attempts over 2 weeks.',
          googleTag: 'An abstract product recommendation \u2014 \u201cturn on a feature and hope\u201d.',
          ours:
            '<p style="margin-bottom:8px">Inspect <code>last_payment_error</code>, the Charge\u2019s <code>outcome</code> and the ' +
            'PaymentMethod; the intent returns to <code>requires_payment_method</code> for reuse. Then apply decline-specific rules:</p>' +
            ROW(1, 'insufficient_funds', 'retry next business day morning') +
            ROW(2, 'do_not_honor', 'retry after 24 hours') +
            ROW(3, 'card_velocity_exceeded', 'wait 48\u201372 hours') +
            ROW(4, 'fraudulent', 'never auto-retry \u2014 manual review') +
            ROW(5, 'card_declined', 'retry once after 24 h, then pause') +
            ROW(6, 'expired_card', 'don\u2019t retry \u2014 send card-update email'),
          oursTag: 'A decline-code \u2192 action lookup table, straight from our runbooks.',
          verdict: 'Verdict: our answer is implementable this afternoon. Google\u2019s is a feature brochure.'
        });
    },
    onStep(el, step) { if (cmp) cmp.setStep(step); }
  });
})();
