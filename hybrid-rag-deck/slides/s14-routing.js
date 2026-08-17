window.SLIDES = window.SLIDES || [];
window.SLIDES.push({
  id: 'deep-routing',
  kicker: 'Act 3 \u00b7 Under the hood',
  html:
    '<h1 class="title" style="font-size:34px">Routing: a millisecond well spent</h1>' +
    '<div class="cols wl">' +
    '<div>' +
    '<ul class="tick ac-jade">' +
    '<li><b>MiniLM-L6</b> (22M parameters) fine-tuned with <b>SetFit</b> on a 500-query golden set, exported to <b>ONNX</b> \u2014 no LLM in the loop.</li>' +
    '<li><b>~1 ms per query</b>, fully local, deterministic. Routing costs effectively nothing.</li>' +
    '<li><b>Five classes</b>: <code>VECTOR</code> \u00b7 <code>GRAPH</code> \u00b7 <code>HYBRID</code> for retrieval, plus <code>CHITCHAT</code> and <code>CLARIFY</code> for conversation control.</li>' +
    '<li><b>Fallback cascade</b>: if confidence is low \u2192 LLM router \u2192 default to <code>HYBRID</code> \u2192 only then ask the user to clarify. A clarifying question costs the user a turn; we spend it last.</li>' +
    '</ul></div>' +
    '<div>' +
    '<table class="tw ac-sapphire">' +
    '<tr><th>Route</th><th>When</th><th>Example</th></tr>' +
    '<tr><td><b>VECTOR</b></td><td class="mut">the answer is prose in one place</td><td class="mut">\u201cHow do I confirm from my backend?\u201d</td></tr>' +
    '<tr><td><b>GRAPH</b></td><td class="mut">the answer is a path or a set of edges</td><td class="mut">\u201cWhat states follow requires_action?\u201d</td></tr>' +
    '<tr><td><b>HYBRID</b></td><td class="mut">structure <i>and</i> explanation needed</td><td class="mut">\u201cWhat happens when authentication fails?\u201d</td></tr>' +
    '</table>' +
    '<p style="font:600 14px/1.5 var(--body);color:var(--ink);margin-top:18px">Measured: macro-F1 <b>0.927</b> (answerable) \u00b7 <b>0.866</b> (routable) on the held-out test split.</p>' +
    '</div></div>'
});
