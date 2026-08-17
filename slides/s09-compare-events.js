window.SLIDES = window.SLIDES || [];
(function () {
  let cmp = null;
  const EV = (i, name) =>
    '<div class="row" style="--i:' + i + '">' + icon('check') + '<code>payment_intent.' + name + '</code></div>';

  window.SLIDES.push({
    id: 'cmp-events',
    kicker: 'Act 2 \u00b7 Better than a Google search',
    steps: 4,
    html:
      '<h1 class="title" style="font-size:30px">Round 2 \u2014 when completeness matters</h1>' +
      '<div id="cmp-events-mount"></div>',
    onInit(el) {
      cmp = window.buildCompare(el.querySelector('#cmp-events-mount'), {
          question: '\u201cWhich webhook events can be emitted during the PaymentIntent lifecycle?\u201d',
          google:
            '\u201cCore webhook events emitted during the PaymentIntent lifecycle: <code>payment_intent.created</code> ' +
            '(new intent generated), <code>payment_intent.succeeded</code> (payment completed, fulfill the order), ' +
            '<code>payment_intent.payment_failed</code> (payment attempt failed), <code>payment_intent.processing</code> ' +
            '(awaiting async network/bank confirmation), <code>payment_intent.requires_action</code> (needs user ' +
            'authentication, e.g. 3D Secure)\u2026\u201d \u2014 and so on, through a paragraph of flowing prose.',
          googleTag: 'The events are in there \u2014 if you\u2019re willing to excavate them.',
          ours:
            '<p style="margin-bottom:8px">The webhook events that can be emitted during the PaymentIntent lifecycle are:</p>' +
            '<div style="columns:2;column-gap:18px">' +
            EV(1, 'created') + EV(2, 'processing') + EV(3, 'requires_action') + EV(4, 'amount_capturable_updated') +
            EV(5, 'succeeded') + EV(6, 'payment_failed') + EV(7, 'canceled') + EV(8, 'partially_funded') +
            '</div>' +
            '<p style="margin-top:10px;font-size:12.5px;color:rgba(255,255,255,.65)">8/8 \u2014 extracted from our docs by a ' +
            'deterministic parser into the knowledge graph, so the list is <b>guaranteed</b>, not sampled by an LLM.</p>',
          oursTag: 'A clean checklist from our own corpus, with sources to audit.',
          verdict: 'Verdict: both find 8 events \u2014 but ours is scannable, machine-parseable, and provably complete against our documentation.'
        });
    },
    onStep(el, step) { if (cmp) cmp.setStep(step); }
  });
})();
