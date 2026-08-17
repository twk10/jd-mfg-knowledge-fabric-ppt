window.SLIDES = window.SLIDES || [];
window.SLIDES.push({
  id: 'deep-rrf',
  kicker: 'Act 3 \u00b7 Under the hood',
  html:
    '<h1 class="title" style="font-size:34px">Hybrid fusion: reciprocal rank fusion</h1>' +
    '<p class="sub">Two engines, two incomparable scoring scales \u2014 so we fuse <b>positions</b>, not scores.</p>' +
    '<div class="formula frag">RRF(d) = \u2211<sub>r</sub> \u00a0 1 / (k + rank<sub>r</sub>(d))' +
    '<span class="kval">k = 60 \u00b7 summed over each retriever r \u00b7 de-duplicated on chunk hash \u00b7 ' +
    'a document both engines agree on collects two terms and rises to the top</span></div>' +
    '<div class="cols" style="margin-top:24px">' +
    '<div class="frag">' +
    '<table class="tw ac-jade">' +
    '<tr><th>Strategy</th><th>Evidence coverage</th><th>Latency</th></tr>' +
    '<tr class="hl"><td>parallel (default)</td><td>18 / 19</td><td>~158 ms</td></tr>' +
    '<tr><td class="mut">vector_first</td><td class="mut">17 / 19</td><td class="mut">~280 ms</td></tr>' +
    '<tr><td class="mut">graph_first</td><td class="mut">16 / 19</td><td class="mut">~280 ms</td></tr>' +
    '</table>' +
    '<p style="font:400 13px/1.5 var(--body);color:var(--grey);margin-top:12px">Directional strategies serialise two store round-trips and inherit the lead engine\u2019s blind spot. Parallel wins on both axes.</p>' +
    '</div>' +
    '<div class="frag">' +
    '<ul class="dash">' +
    '<li><b>Ranks, not scores:</b> cosine similarity and graph confidence mean different things; rank position is interpretation-free.</li>' +
    '<li><b>Scope is a boost, not a constraint:</b> graph anchors nudge the vector leg \u2014 they never get to hide its evidence. (A fix worth 3 recovered answers.)</li>' +
    '<li><b>Diversity cap:</b> max 3 results per document \u2014 one 6,671-line reference file was crowding out everyone else.</li>' +
    '<li><b>Multi-intent questions</b> are decomposed into \u22644 sub-queries, searched in parallel, and RRF-merged.</li>' +
    '</ul></div></div>'
});
