window.SLIDES = window.SLIDES || [];
window.SLIDES.push({
  id: 'problem',
  kicker: 'Act 1 \u00b7 The story',
  html:
    '<h1 class="title">Why not just Google it?</h1>' +
    '<p class="sub">Our engineers answer payment-integration questions every day. The web answers the average question \u2014 not ours.</p>' +
    '<div class="grid c4">' +
    '<div class="card ac-flamingo frag"><span class="ic">' + icon('target') + '</span>' +
    '<h3>Generic advice</h3><p>Google optimises for everyone\u2019s integration. It recommends products and patterns \u2014 not the exact fields, statuses and rules our stack relies on.</p></div>' +
    '<div class="card ac-turmeric frag"><span class="ic">' + icon('book') + '</span>' +
    '<h3>Not our docs</h3><p>Answers come from pages we don\u2019t control or version. There is no way to audit where a claim came from.</p></div>' +
    '<div class="card ac-amethyst frag"><span class="ic">' + icon('warn') + '</span>' +
    '<h3>Details buried in prose</h3><p>The 8 webhook events, the 6 exit states, the retry rules \u2014 scattered through paragraphs a developer must pick apart by hand.</p></div>' +
    '<div class="card ac-sapphire frag"><span class="ic">' + icon('lock') + '</span>' +
    '<h3>Questions leave the building</h3><p>Every query about our payment flows is shipped to a third party. Some questions shouldn\u2019t travel.</p></div>' +
    '</div>' +
    '<p class="lede frag" style="margin-top:36px"><b>So we built an agent that answers from our own curated corpus</b> \u2014 and then measured it against Google on 30 real questions.</p>'
});
