/* Minimal Remix-style stroke icon set (inline SVG, offline-safe) */
(function () {
  const P = {
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h6"/>',
    scissors: '<circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><path d="M8.1 7.5 20 18M8.1 16.5 20 6"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    dims: '<path d="M4 20V8M9 20v-9M14 20V4M19 20v-6"/>',
    db: '<ellipse cx="12" cy="5.5" rx="7" ry="2.7"/><path d="M5 5.5v13c0 1.5 3.1 2.7 7 2.7s7-1.2 7-2.7v-13"/><path d="M5 12c0 1.5 3.1 2.7 7 2.7s7-1.2 7-2.7"/>',
    graph: '<circle cx="5.5" cy="6" r="2.1"/><circle cx="18.5" cy="6" r="2.1"/><circle cx="12" cy="18" r="2.1"/><path d="M7.3 7.3 10.7 16M16.7 7.3 13.3 16M7.6 6h8.8"/>',
    user: '<circle cx="12" cy="8" r="3.4"/><path d="M5 20c1.2-3.4 3.9-5 7-5s5.8 1.6 7 5"/>',
    route: '<path d="M12 3l9 9-9 9-9-9z"/>',
    search: '<circle cx="10.5" cy="10.5" r="5.5"/><path d="M15 15l6 6"/>',
    hops: '<circle cx="4.5" cy="12" r="1.9"/><circle cx="12" cy="6" r="1.9"/><circle cx="12" cy="18" r="1.9"/><circle cx="19.5" cy="12" r="1.9"/><path d="M6.2 10.9 10.3 7M6.2 13.1 10.3 17M13.7 7l4 3.9M13.7 17l4-3.9"/>',
    fuse: '<path d="M8 6h12M8 12h9M8 18h11"/><circle cx="4" cy="6" r="1.1"/><circle cx="4" cy="12" r="1.1"/><circle cx="4" cy="18" r="1.1"/>',
    layout: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M10 10v10"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    check: '<path d="M4 12.5 9.5 18 20 6.5"/>',
    cross: '<path d="M6 6l12 12M18 6L6 18"/>',
    bolt: '<path d="M13 2 4.5 13.5H11L9.8 22l8.7-11.5H12z"/>',
    shield: '<path d="M12 3l7 2.8V12c0 4.6-3 7.7-7 9-4-1.3-7-4.4-7-9V5.8z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
    gauge: '<path d="M5 19a8.5 8.5 0 1 1 14 0"/><path d="M12 14.5 16 9"/><circle cx="12" cy="15" r="1.5"/>',
    list: '<path d="M9.5 6H20M9.5 12H20M9.5 18H20"/><path d="M4 5.5l1.2 1.2L7.5 4.4M4 11.5l1.2 1.2 2.3-2.3M4 17.5l1.2 1.2 2.3-2.3"/>',
    book: '<path d="M4 5.5C5.6 4.5 7.8 4 12 4v16c-4.2 0-6.4.5-8 1.5zM20 5.5C18.4 4.5 16.2 4 12 4v16c4.2 0 6.4.5 8 1.5z"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="1.1"/>',
    cpu: '<rect x="6.5" y="6.5" width="11" height="11" rx="2"/><path d="M9.5 3v3.5M14.5 3v3.5M9.5 17.5V21M14.5 17.5V21M3 9.5h3.5M3 14.5h3.5M17.5 9.5H21M17.5 14.5H21"/>',
    flag: '<path d="M6 21V4"/><path d="M6 5h11l-2.5 3.5L17 12H6"/>',
    quote: '<path d="M5.5 11.5C5.5 8.5 7.2 6.5 10 5.5M5.5 11.5H10v6H4.5v-4.5zM13.5 11.5c0-3 1.7-5 4.5-6M13.5 11.5H18v6h-5.5v-4.5z"/>',
    lock: '<rect x="5.5" y="10.5" width="13" height="9.5" rx="2"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/>',
    warn: '<path d="M12 3 2.5 20h19z"/><path d="M12 9.5v5M12 17.4v.2"/>'
  };
  window.icon = function (name, cls) {
    return '<svg class="icn ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' +
      (P[name] || '') + '</svg>';
  };
  window.ICON_PATHS = P;
})();
