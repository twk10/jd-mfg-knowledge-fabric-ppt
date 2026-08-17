window.SLIDES = window.SLIDES || [];
window.SLIDES.push({
  id: 'deep-synth',
  kicker: 'Act 3 \u00b7 Under the hood',
  html:
    '<h1 class="title" style="font-size:34px">Synthesis: discipline over eloquence</h1>' +
    '<div class="cols">' +
    '<div>' +
    '<p class="sub" style="margin-top:0">Eight grounding rules govern the answer model (qwen3.6, temperature 0):</p>' +
    '<ul class="tick ac-jade" style="margin-top:14px">' +
    '<li><b>Sources only</b> \u2014 nothing from the model\u2019s own memory, no invented identifiers.</li>' +
    '<li><b>Attribute to the owning object</b> \u2014 a Refund\u2019s status is never reported as a PaymentIntent\u2019s.</li>' +
    '<li><b>Enumerate every item</b> \u2014 lists are reproduced in full, never \u201camong others\u201d.</li>' +
    '<li><b>A partial answer beats a refusal</b> \u2014 and synthesise, don\u2019t narrate (\u201cSource [2] says\u2026\u201d is banned).</li>' +
    '</ul></div>' +
    '<div>' +
    '<div class="card ac-flamingo" style="margin-top:6px"><h3>The reasoning lever</h3>' +
    '<p>The last four failures had the evidence <b>ranked #1\u2013#2 in context</b> \u2014 and the model still refused. ' +
    'Not a prompt problem: a <b>reasoning-budget</b> problem.</p>' +
    '<table class="tw ac-flamingo" style="margin-top:12px;font-size:13.5px">' +
    '<tr><th></th><th>Answered</th><th>Latency</th></tr>' +
    '<tr><td><code>ANSWER_REASONING=0</code></td><td>26 / 30</td><td>1\u20135 s</td></tr>' +
    '<tr class="hl"><td><code>ANSWER_REASONING=1</code></td><td>30 / 30</td><td>10\u201393 s</td></tr>' +
    '</table>' +
    '<p style="margin-top:10px;font-size:12.5px">A dial, not a default \u2014 fast answers normally, deep answers on demand.</p></div>' +
    '</div></div>'
});
