window.SLIDES = window.SLIDES || [];
window.SLIDES.push({
  id: 'deep-ingest',
  kicker: 'Act 3 \u00b7 Under the hood',
  html:
    '<h1 class="title" style="font-size:34px">Ingest: lossless by contract</h1>' +
    '<p class="sub">13 markdown files \u2192 1,044 retrievable chunks, with a provable no-loss guarantee.</p>' +
    '<div class="cols wl">' +
    '<div>' +
    '<ul class="tick ac-jade">' +
    '<li><b>markdown-it-py</b> (CommonMark) parses every file \u2014 its <code>token.map</code> gives source line ranges, which is what makes line-level citations possible.</li>' +
    '<li><b>Typed blocks</b>: prose \u00b7 table \u00b7 code \u00b7 JSON. Tables and code are kept atomic; only prose is split, at \u2248400 tokens with \u224815% overlap.</li>' +
    '<li><b>Table rows are verbalised</b> \u2014 <code>Column = value.</code> \u2014 so each row is independently searchable, alongside the whole table.</li>' +
    '<li><b>Stable addressing</b>: <code>section_id = sha1(doc_id:heading_path)[:12]</code> \u2014 the same section always gets the same id, across rebuilds.</li>' +
    '</ul></div>' +
    '<div><div class="codeblock">' +
    '<span class="cm"># the losslessness invariant, checked on every ingest</span><br>' +
    'assert "".join(b.original for b in blocks) \u2261 source_file<br><br>' +
    '<span class="cm"># what a chunk carries</span><br>' +
    'Chunk(<span class="yell">original</span>,&nbsp;<span class="cm"># byte-exact, citable</span><br>' +
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="yell">heading_path</span>, <span class="yell">start_line</span>, <span class="yell">end_line</span>,<br>' +
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="pink">summary</span>)&nbsp;<span class="cm"># added in the next stage</span>' +
    '</div>' +
    '<p style="font:400 13.5px/1.5 var(--body);color:var(--grey);margin-top:14px"><b>Decision:</b> losslessness is guaranteed at the ' +
    'segment stage; chunking is deliberately redundant (overlap, row duplication) \u2014 different correctness models for different jobs.</p>' +
    '</div></div>'
});
