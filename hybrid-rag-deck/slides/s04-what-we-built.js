window.SLIDES = window.SLIDES || [];
window.SLIDES.push({
  id: 'built',
  kicker: 'Act 1 \u00b7 The story',
  html:
    '<h1 class="title">What we built</h1>' +
    '<p class="sub">A knowledge agent over curated payments documentation \u2014 it reads our docs once, deeply, and then answers any question about them.</p>' +
    '<div class="grid c4">' +
    '<div class="card ac-jade frag"><span class="ic">' + icon('shield') + '</span>' +
    '<h3>Grounded</h3><p>Every answer is written only from retrieved passages of our corpus \u2014 never from the model\u2019s memory of the internet.</p></div>' +
    '<div class="card ac-sapphire frag"><span class="ic">' + icon('quote') + '</span>' +
    '<h3>Cited</h3><p>Each claim traces back to a numbered source: file, section, line range. Trust, but verify \u2014 conveniently.</p></div>' +
    '<div class="card ac-turmeric frag"><span class="ic">' + icon('list') + '</span>' +
    '<h3>Complete</h3><p>A knowledge graph holds the structured facts \u2014 all 8 webhook events, all 6 exit states \u2014 so enumerations are guaranteed, not sampled.</p></div>' +
    '<div class="card ac-flamingo frag"><span class="ic">' + icon('lock') + '</span>' +
    '<h3>Private</h3><p>Everything runs locally: Ollama for the models, Qdrant and Neo4j for the knowledge. No question or document ever leaves the machine.</p></div>' +
    '</div>' +
    '<p class="lede frag" style="margin-top:36px">Two ideas make it work: store the knowledge <b>twice</b> \u2014 once by meaning, once by structure \u2014 and <b>route</b> every question to the search that suits it.</p>'
});
