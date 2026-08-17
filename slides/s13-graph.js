window.SLIDES = window.SLIDES || [];
window.SLIDES.push({
  id: 'deep-graph',
  kicker: 'Act 3 \u00b7 Under the hood',
  html:
    '<h1 class="title" style="font-size:34px">Knowledge graph: facts you can traverse</h1>' +
    '<p class="sub">An LLM proposes; deterministic checks dispose. Only verified, ontology-conformant facts reach Neo4j.</p>' +
    '<div class="grid c3" style="margin-top:26px;gap:16px">' +
    '<div class="card ac-amethyst frag"><h3>Extract, then verify</h3><p>Section-level extraction (\u224812K chars preserves coreference), in <b>EDC</b> or <b>STRICT</b> ontology mode. Every extracted span is re-checked as a <b>substring of the source</b> \u2014 hallucinated entities are dropped, and their relationships with them.</p></div>' +
    '<div class="card ac-amethyst frag"><h3>One mention, one node</h3><p>Entity identity is <code>sha1(domain | text)[:16]</code> \u2014 deliberately <b>type-free</b>. Before this, <code>payment_link</code> split into 4 nodes because the extractor kept changing its mind about the type. Mention text is stable; extractor types aren\u2019t.</p></div>' +
    '<div class="card ac-amethyst frag"><h3>Gated by the ontology</h3><p>Relationships must satisfy the ontology\u2019s domain/range rules or they don\u2019t load. Near-duplicates are <b>reported for human review</b>, never auto-merged.</p></div>' +
    '<div class="card ac-flamingo frag"><h3>Communities (Leiden)</h3><p>The entity graph is clustered hierarchically (2 levels) with the Leiden algorithm; each community of \u22653 members gets an LLM-written title and summary \u2014 themes emerge from structure.</p></div>' +
    '<div class="card ac-flamingo frag"><h3>Deterministic structure</h3><p>Event lists and state-transition tables are parsed by <b>grammar, not LLM</b>: 28 EMITS + 18 NEXT_STATE edges. The LLM alone sampled 3 of 8 events; the parser gets 8/8, every run.</p></div>' +
    '<div class="card ac-flamingo frag"><h3>Linked to the vectors</h3><p>Every graph Section carries the ids of its chunk vectors; entities and communities get their own embeddings. The two stores can hand results to each other mid-query.</p></div>' +
    '</div>'
});
