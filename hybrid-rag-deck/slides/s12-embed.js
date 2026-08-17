window.SLIDES = window.SLIDES || [];
window.SLIDES.push({
  id: 'deep-embed',
  kicker: 'Act 3 \u00b7 Under the hood',
  html:
    '<h1 class="title" style="font-size:34px">Enrich &amp; embed: meaning as geometry</h1>' +
    '<div class="cols">' +
    '<div>' +
    '<ul class="tick ac-jade">' +
    '<li><b>Per-chunk summaries</b> by a local LLM (qwen3.6, capped at 160 tokens). <i>Decision:</i> summarise the chunk, not its parent block \u2014 a block-level summary mislabelled 23 of 24 chunks.</li>' +
    '<li><b>What gets embedded</b>: <code>embed_text = breadcrumb + summary + content</code> \u2014 the search sees context and meaning, the citation shows only the untouched original.</li>' +
    '<li><b>bge-m3</b>, 1,024 dimensions, cosine similarity, batches of 32 \u2192 33 chunks/s locally (3\u00d7 the unbatched rate).</li>' +
    '<li><b>Deterministic ids</b>: <code>uuid5(chunk_hash)</code> \u2014 re-ingesting the same document upserts the same points. No duplicates, ever.</li>' +
    '</ul></div>' +
    '<div>' +
    '<div class="formula">cos(&theta;) = <span style="font-size:.8em">A\u00b7B / (\u2016A\u2016\u2009\u2016B\u2016)</span>' +
    '<span class="kval">two chunks \u201cmean the same\u201d when their 1,024-dimension vectors point the same way \u2014 ' +
    'measured: the right answer ranks #1 at 0.617 vs 0.375 for unrelated text</span></div>' +
    '<p style="font:400 13.5px/1.5 var(--body);color:var(--grey);margin-top:16px"><b>Why it matters:</b> ' +
    '\u201cHow do I prevent duplicate payments?\u201d shares no keywords with the idempotency docs. ' +
    'The summary adds the word <code>idempotency</code> to the chunk\u2019s fingerprint \u2014 and the search finds it anyway.</p>' +
    '</div></div>'
});
