window.SLIDES = window.SLIDES || [];
window.SLIDES.push({
  id: 'adr-wall',
  kicker: 'Act 3 \u00b7 Under the hood',
  html:
    '<h1 class="title" style="font-size:34px">Decisions that made the difference</h1>' +
    '<div class="adr-grid">' +
    '<div class="adr ac-jade frag"><h4>Fuse ranks, not scores</h4><p>Vector and graph scores live on different scales. Rank position is interpretation-free \u2014 RRF needs no calibration.</p></div>' +
    '<div class="adr ac-jade frag"><h4>Scope is a boost, not a constraint</h4><p>Graph anchors nudge vector search; they never silence it. Constraining scope silently hid correct evidence.</p></div>' +
    '<div class="adr ac-turmeric frag"><h4>Grammars belong to parsers</h4><p>LLMs sample regular structures \u2014 3 of 8 events. Deterministic parsing of lists and tables gets 8/8, every run.</p></div>' +
    '<div class="adr ac-turmeric frag"><h4>Enrich the chunk, not the block</h4><p>Summaries are computed where retrieval happens. Block-level summaries mislabelled 23 of 24 chunks.</p></div>' +
    '<div class="adr ac-amethyst frag"><h4>Type-free entity keys</h4><p>Identity hashes the mention text only. The extractor\u2019s type flip-flops fragmented one entity into four nodes.</p></div>' +
    '<div class="adr ac-amethyst frag"><h4>Verify grounding outside the LLM</h4><p>Extracted spans must be substrings of the source \u2014 hallucinations are dropped mechanically, cascade included.</p></div>' +
    '<div class="adr ac-flamingo frag"><h4>Determinism via hashing</h4><p>Same document \u2192 same ids \u2192 idempotent rebuilds of both stores. Reproducibility is a feature, not a hope.</p></div>' +
    '<div class="adr ac-flamingo frag"><h4>Retrieval is unconditional</h4><p>The agent never answers from training data alone \u2014 search always happens. That is the entire point of the system.</p></div>' +
    '</div>' +
    '<p class="lede frag" style="margin-top:26px;font-size:15px;color:var(--grey)">Each of these was paid for with a measured failure first \u2014 the full trail lives in the spec repository (specs 01\u201319).</p>'
});
