/* Animated architecture diagram: data-driven SVG, two presenter-stepped flows */
(function () {
  const COL = { turm: '#E9A13B', amet: '#9B85C4', flam: '#F2617A', sapp: '#47A1AD', jade: '#7FB98E', mist: '#EDF1F3' };

  const ZONES = [
    { x: 100, t: '1. Ingest' }, { x: 308, t: '2. Enrich & extract' },
    { x: 516, t: '3. Knowledge substrate' }, { x: 724, t: '4. Classify' },
    { x: 932, t: '5. Execute' }, { x: 1140, t: '6. Synthesize' }
  ];

  const NODES = [
    { id: 'docs', x: 10, y: 90, w: 180, h: 84, c: COL.turm, ic: 'doc', t: 'Curated docs', s: ['Markdown source', '13 files \u00b7 versioned'] },
    { id: 'seg', x: 10, y: 300, w: 180, h: 96, c: COL.turm, ic: 'scissors', t: 'Segment & chunk', s: ['markdown-it-py \u00b7 lossless', 'prose \u2248 400 tokens'] },
    { id: 'sum', x: 218, y: 64, w: 180, h: 84, c: COL.amet, ic: 'spark', t: 'Summarise', s: ['local LLM (Ollama)', 'one line per chunk'] },
    { id: 'emb', x: 218, y: 224, w: 180, h: 96, c: COL.amet, ic: 'dims', t: 'Embeddings', s: ['bge-m3 \u00b7 1024-dim', 'cosine \u00b7 batch 32'] },
    { id: 'gx', x: 218, y: 396, w: 180, h: 96, c: COL.amet, ic: 'graph', t: 'Graph extract', s: ['local LLM + ontology', 'mode: EDC / STRICT'] },
    { id: 'qd', x: 426, y: 140, w: 180, h: 84, c: COL.flam, ic: 'db', t: 'Qdrant', s: ['vector database', '1,044 chunk points'] },
    { id: 'neo', x: 426, y: 330, w: 180, h: 84, c: COL.flam, ic: 'hops', t: 'Neo4j', s: ['knowledge graph', 'entities \u00b7 events \u00b7 states'] },
    { id: 'uq', x: 634, y: 56, w: 180, h: 76, c: COL.sapp, ic: 'user', t: 'User question', s: ['FastAPI + Open WebUI'] },
    { id: 'rt', diamond: [724, 290, 84, 48], c: COL.sapp, t: 'Route', s: ['MiniLM + SetFit \u00b7 ~1 ms'] },
    { id: 'vs', x: 842, y: 96, w: 180, h: 80, c: COL.jade, ic: 'search', t: 'Vector search', s: ['semantic match'] },
    { id: 'gs', x: 842, y: 246, w: 180, h: 80, c: COL.jade, ic: 'hops', t: 'Graph search', s: ['traverse 1\u20133 hops'] },
    { id: 'hy', x: 842, y: 396, w: 180, h: 80, c: COL.jade, ic: 'fuse', t: 'Hybrid RRF', s: ['rank fusion \u00b7 parallel'] },
    { id: 'cx', x: 1050, y: 140, w: 180, h: 84, c: COL.mist, ic: 'layout', t: 'Build context', s: ['dedupe & render sources'] },
    { id: 'an', x: 1050, y: 330, w: 180, h: 96, c: COL.flam, ic: 'chat', t: 'Answer', s: ['qwen3.6 local LLM', 'grounded \u00b7 cited'] }
  ];

  const EDGES = [
    { id: 'e-docs-seg', d: 'M 100 174 L 100 294', c: COL.turm },
    { id: 'e-seg-sum', d: 'M 190 348 C 206 348, 202 106, 216 106', c: COL.amet },
    { id: 'e-sum-emb', d: 'M 308 148 L 308 218', c: COL.amet },
    { id: 'e-seg-gx', d: 'M 190 360 C 206 360, 202 444, 216 444', c: COL.amet },
    { id: 'e-emb-qd', d: 'M 398 272 C 414 272, 410 182, 424 182', c: COL.flam },
    { id: 'e-gx-neo', d: 'M 398 444 C 414 444, 410 372, 424 372', c: COL.flam },
    { id: 'e-uq-rt', d: 'M 724 132 L 724 238', c: COL.sapp },
    { id: 'e-rt-vs', d: 'M 808 290 C 830 290, 822 136, 840 136', c: COL.jade },
    { id: 'e-rt-gs', d: 'M 808 290 C 824 290, 826 286, 840 286', c: COL.jade },
    { id: 'e-rt-hy', d: 'M 808 290 C 830 290, 822 436, 840 436', c: COL.jade },
    { id: 'fd-qd', d: 'M 606 168 C 700 84, 786 92, 838 122', c: COL.flam },
    { id: 'fd-neo', d: 'M 606 384 C 696 452, 786 372, 838 304', c: COL.flam },
    { id: 'e-vs-cx', d: 'M 1022 136 C 1038 136, 1034 168, 1048 168', c: COL.mist },
    { id: 'e-gs-cx', d: 'M 1022 286 C 1038 286, 1034 190, 1048 190', c: COL.mist },
    { id: 'e-hy-cx', d: 'M 1022 436 C 1040 436, 1032 208, 1048 208', c: COL.mist },
    { id: 'e-cx-an', d: 'M 1140 224 L 1140 324', c: COL.flam }
  ];

  /* 14 presenter steps: 1-7 ingestion flow, 8-14 question flow */
  const STEPS = [
    { on: ['docs'], f: 0, cap: 'It starts with your curated documentation \u2014 13 markdown files, reviewed and versioned like code.' },
    { on: ['e-docs-seg', 'seg'], f: 0, cap: 'Documents are split into typed blocks \u2014 prose, tables, code, JSON \u2014 with a byte-for-byte lossless guarantee, then cut into ~400-token chunks.' },
    { on: ['e-seg-sum', 'sum'], f: 0, cap: 'A local LLM writes a one-line summary of every chunk, so searches match meaning \u2014 not just keywords.' },
    { on: ['e-sum-emb', 'emb'], f: 0, cap: 'Each enriched chunk becomes a 1,024-number \u201cmeaning fingerprint\u201d (bge-m3 embeddings, 32 at a time).' },
    { on: ['e-emb-qd', 'qd'], f: 0, cap: 'Fingerprints land in Qdrant, the vector database \u2014 1,044 searchable points, rebuilt identically every time.' },
    { on: ['e-seg-gx', 'gx'], f: 0, cap: 'In parallel, a local LLM guided by an ontology extracts entities and relationships \u2014 every fact is verified against the source text before it is kept.' },
    { on: ['e-gx-neo', 'neo'], f: 0, cap: 'Verified facts land in Neo4j: statuses, events, transitions and how they connect \u2014 the knowledge graph.' },
    { on: ['uq'], f: 1, cap: 'Now the payoff: a user asks a question in the chat UI.' },
    { on: ['e-uq-rt', 'rt'], f: 1, cap: 'A tiny local classifier decides the best retrieval strategy in about one millisecond.' },
    { on: ['e-rt-vs', 'vs', 'fd-qd'], f: 1, cap: 'Vector search: find the chunks whose meaning sits closest to the question.' },
    { on: ['e-rt-gs', 'gs', 'fd-neo'], f: 1, cap: 'Graph search: start from the entities in the question and walk the knowledge graph, one to three hops.' },
    { on: ['e-rt-hy', 'hy'], f: 1, cap: 'Hybrid: run both engines in parallel and fuse their rankings \u2014 reciprocal rank fusion.' },
    { on: ['e-vs-cx', 'e-gs-cx', 'e-hy-cx', 'cx'], f: 1, cap: 'The winners are de-duplicated and packed into a context with numbered sources.' },
    { on: ['e-cx-an', 'an'], f: 1, cap: 'A local LLM writes the answer from those sources only \u2014 grounded, cited, in natural language.' }
  ];

  const FLOW_A_IDS = ['docs', 'seg', 'sum', 'emb', 'gx', 'qd', 'neo'];

  function nodeSvg(n) {
    const esc = '--ec:' + n.c;
    if (n.diamond) {
      const [cx, cy, rx, ry] = n.diamond;
      const pts = cx + ',' + (cy - ry) + ' ' + (cx + rx) + ',' + cy + ' ' + cx + ',' + (cy + ry) + ' ' + (cx - rx) + ',' + cy;
      return '<g class="node" id="n-' + n.id + '" style="' + esc + '">' +
        '<polygon points="' + pts + '"/>' +
        '<text class="nt" x="' + cx + '" y="' + (cy - 2) + '" text-anchor="middle">' + n.t + '</text>' +
        '<text class="ns" x="' + cx + '" y="' + (cy + 18) + '" text-anchor="middle">' + n.s[0] + '</text></g>';
    }
    let sub = '';
    n.s.forEach((line, i) => {
      sub += '<text class="ns" x="' + (n.x + 16) + '" y="' + (n.y + 55 + i * 17) + '">' + line + '</text>';
    });
    return '<g class="node" id="n-' + n.id + '" style="' + esc + '">' +
      '<rect x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="' + n.h + '" rx="10"/>' +
      '<svg class="nicon" x="' + (n.x + 14) + '" y="' + (n.y + 14) + '" width="19" height="19" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' +
      (window.ICON_PATHS[n.ic] || '') + '</svg>' +
      '<text class="nt" x="' + (n.x + 42) + '" y="' + (n.y + 29) + '">' + n.t + '</text>' + sub + '</g>';
  }

  function edgeSvg(e) {
    return '<g class="edge" id="' + e.id + '" style="--ec:' + e.c + '">' +
      '<path class="wire" id="' + e.id + '-p" d="' + e.d + '" marker-end="url(#arr)"/>' +
      '<path class="pulse" d="' + e.d + '"/>' +
      '<circle class="dot" r="4"><animateMotion dur="1.3s" repeatCount="indefinite">' +
      '<mpath href="#' + e.id + '-p"/></animateMotion></circle></g>';
  }

  window.buildArchDiagram = function (mount) {
    let svg = '<svg class="arch-svg" viewBox="0 0 1240 560" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
      '<path d="M0 0L10 5L0 10z" fill="rgba(255,255,255,.4)"/></marker></defs>';
    ZONES.forEach(z => {
      svg += '<text class="zone-label" x="' + z.x + '" y="26" text-anchor="middle">' + z.t + '</text>';
    });
    EDGES.forEach(e => { svg += edgeSvg(e); });
    NODES.forEach(n => { svg += nodeSvg(n); });
    svg += '</svg>';
    mount.innerHTML = svg +
      '<div class="arch-cap"><span class="flowtag" id="arch-flowtag" style="display:none"></span>' +
      '<span class="captext idle" id="arch-cap">Press \u2192 to walk the two flows: first how the system learns your docs, then how it answers a question.</span></div>';

    const $ = (sel) => mount.querySelector(sel);
    const tag = $('#arch-flowtag'), cap = $('#arch-cap');

    function setStep(s) {
      mount.querySelectorAll('.node').forEach(n => n.classList.remove('lit', 'done'));
      mount.querySelectorAll('.edge').forEach(e => e.classList.remove('live', 'done'));
      if (s === 0) {
        tag.style.display = 'none';
        cap.className = 'captext idle';
        cap.textContent = 'Press \u2192 to walk the two flows: first how the system learns your docs, then how it answers a question.';
        return;
      }
      const flow = STEPS[s - 1].f;
      const start = flow === 0 ? 1 : 8;
      if (flow === 1) FLOW_A_IDS.forEach(id => { const n = $('#n-' + id); if (n) n.classList.add('done'); });
      for (let i = start; i <= s; i++) {
        const isNow = i === s;
        STEPS[i - 1].on.forEach(id => {
          const node = $('#n-' + id);
          if (node) node.classList.add(isNow ? 'lit' : 'done');
          const edge = $('#' + id);
          if (edge && edge.classList.contains('edge')) edge.classList.add(isNow ? 'live' : 'done');
        });
      }
      tag.style.display = '';
      tag.className = 'flowtag' + (flow === 1 ? ' q' : '');
      tag.textContent = flow === 0 ? 'Flow 1 \u00b7 Teaching the system' : 'Flow 2 \u00b7 Answering a question';
      cap.className = 'captext';
      cap.textContent = STEPS[s - 1].cap;
    }

    return { setStep, steps: STEPS.length, flowStart: (s) => (s >= 8 ? 8 : 1) };
  };
})();
