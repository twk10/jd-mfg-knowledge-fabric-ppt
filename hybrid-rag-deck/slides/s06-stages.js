window.SLIDES = window.SLIDES || [];
window.SLIDES.push({
  id: 'stages',
  kicker: 'Act 1 \u00b7 The story',
  html:
    '<h1 class="title">Six stages, in plain language</h1>' +
    '<div class="stages">' +
    '<div class="stage-row ac-turmeric frag"><span class="badge">' + icon('scissors') + '</span><div>' +
    '<b>1 \u00b7 Ingest</b><span>We split the documents into clean, loss-free pieces \u2014 nothing is paraphrased away, every piece knows exactly where it came from.</span></div></div>' +
    '<div class="stage-row ac-amethyst frag"><span class="badge">' + icon('spark') + '</span><div>' +
    '<b>2 \u00b7 Enrich &amp; extract</b><span>A local AI summarises each piece and, separately, pulls out the hard facts: objects, statuses, events and how they relate.</span></div></div>' +
    '<div class="stage-row ac-flamingo frag"><span class="badge">' + icon('db') + '</span><div>' +
    '<b>3 \u00b7 Knowledge substrate</b><span>Everything is stored twice: as meaning fingerprints in a vector database, and as a connected map of facts in a knowledge graph.</span></div></div>' +
    '<div class="stage-row ac-sapphire frag"><span class="badge">' + icon('route') + '</span><div>' +
    '<b>4 \u00b7 Classify</b><span>Each incoming question is routed in about a millisecond to the search strategy that suits it best.</span></div></div>' +
    '<div class="stage-row ac-jade frag"><span class="badge">' + icon('search') + '</span><div>' +
    '<b>5 \u00b7 Execute</b><span>Vector search finds similar text; graph search walks relationships; hybrid runs both and merges the rankings.</span></div></div>' +
    '<div class="stage-row ac-wave frag"><span class="badge">' + icon('chat') + '</span><div>' +
    '<b>6 \u00b7 Synthesize</b><span>The answer is written only from what was found \u2014 in natural language, with numbered citations you can check.</span></div></div>' +
    '</div>'
});
