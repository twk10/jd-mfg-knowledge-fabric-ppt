# Live-demo speaker notes — "Developer's-eye view" flow

A second, shorter script for the **live-demo variant** of the presentation — the one where
you drive the terminal and the web UI instead of only the slide deck. Read the plain
paragraphs aloud; the *(italic)* lines are stage directions telling you what to click, run
or show. Target runtime: ~15 minutes, designed to slot in between deck slides 6 and 9.

Corpus and commands verified against the repo (2026-08-18): 13 curated files (12 Stripe +
1 general), `run.sh` commands, and `app.chat_api` / `app.agent` behaviour.

---

## Part 1 — Put on the developer hat: ingesting Stripe's docs (~4 min)

*(Open a terminal at the repo root and a file explorer / editor tab on `payments/stripe/source/`.)*

Let me switch hats for a minute and show you this the way a developer actually experiences it — starting from nothing but a folder of documentation.

Here's our curated Stripe corpus. *(Show the folder listing.)* Six files under `api/` — Charges, Checkout Sessions, PaymentIntent, Payment Links, Payment Methods, Refunds — these are the API reference docs. And six more under `workflow/` — the API tour, Checkout, the PaymentIntent lifecycle, PaymentIntent and PaymentMethod guides, and payment status updates — these are the "how it's actually used" narrative docs. Plus one more general payments-industry document. Thirteen files in total. This is deliberately curated — not scraped, not the entire internet's worth of Stripe docs — just the parts our engineers actually rely on, kept in git like code, one pull request at a time.

Now I ingest all of it with one command.

*(Run, or narrate if already built:)*
```
./run.sh build
```

*(While it runs, or referring to a completed run:)* This single command does the entire journey I animated a moment ago, for real. It reads all thirteen files, splits them into typed pieces, summarises every piece with a local AI, embeds them into the vector database, and — in parallel — runs a second AI pass that extracts entities and relationships into the knowledge graph, verifies every fact against the source text, and links the two stores together. It's idempotent — I can run it again tomorrow after editing a doc, and only the changed parts get reprocessed.

*(Optionally open the dashboards to make it concrete:)*
- Qdrant: `http://localhost:6333/dashboard` — the vector points, one collection for chunks, one for graph nodes.
- Neo4j: `http://localhost:7474` — the knowledge graph itself, browsable.

That's ingestion. Thirteen documents in, a fully searchable knowledge base out. Now let's see whether it was worth it.

**If asked:**
- **"How long does that actually take?"** — Embedding is fast, roughly 33 chunks a second. The graph extraction step is the slower part since it's an LLM reading every section, but it's a one-time batch job, not something a user waits on.
- **"What if I only change one file?"** — Same command. Every chunk and section has a content-based identity, so unchanged parts are skipped and only the edited document's pieces are reprocessed.

---

## Part 2 — Slide 7: the scoreboard (~2 min)

*(Switch back to the deck, jump to slide 7 — press `Esc` for the overview grid if that's faster, arrow to it, hit Enter.)*

So that's how the knowledge gets in. Now — does it actually answer questions well? We didn't just build this and hope; we curated thirty real questions that a payments engineer would genuinely ask, spanning three difficulty levels, and we ran every one of them through our agent — and, separately, through Google.

*(Press → to reveal the journey.)* The honest version: our first attempt only answered twenty of the thirty. We measured every failure, fixed the specific cause — corpus gaps, retrieval bugs, prompt issues — fifteen patches later we were at twenty-six. And enabling a deeper reasoning pass in the final model got us to thirty out of thirty, with zero refusals.

Google, for the record, also answers all thirty — but generically. That comparison is coming up. First, let me actually show you the agent live, rather than just tell you about it.

---

## Part 3 — Live in the web UI (~5 min)

*(Open the browser to `http://localhost:3000` — Open WebUI, pointed at our chat API.)*

This is the same agent, running through a normal chat interface. Let me ask it a few of the thirty benchmark questions live, so you can see the real behaviour, not a slide.

*(Type and send — pick 2–3 of these, in order of visual punch. All are verbatim from the benchmark.)*

1. **"Which webhook events can be emitted during the PaymentIntent lifecycle?"**
   *(Wait for the answer.)* Notice the shape of it — a clean enumerated list, not a paragraph. That's the deterministic parser and the knowledge graph doing their job.

2. **"How should I retry a failed payment safely?"**
   *(Wait for the answer.)* This is the one I'll compare against Google in a moment — watch for the decline-code-specific rules.

3. *(Optional third, if time allows)* **"What is the relationship between PaymentIntent, Charge, and BalanceTransaction?"** — a good one to show graph traversal reasoning, since it's a chain of relationships, not a single fact.

*(As each answer streams in, you can point out:)* the citations at the bottom — numbered, traceable back to file and section. And note the response came back in a few seconds; that's the fast path, without the deep-reasoning dial engaged.

**If asked:**
- **"Is this the same model that's on the slide?"** — Yes, identical stack: same classifier, same Qdrant, same Neo4j, same qwen3.6 answerer. Nothing is staged differently for the demo.
- **"Can I ask it something myself?"** — Absolutely, that's the point of doing this live. *(Have 1–2 backup questions ready from `spikes/hybrid_rag_answers.md` in case someone asks something you haven't rehearsed.)*

---

## Part 4 — Back to slide 8: the side-by-side (~2 min)

*(Return to the deck, `Esc` overview, jump to slide 8. Press → through question / Google / ours / verdict.)*

Now let's put what you just saw side by side with Google, on that exact retry question.

*(Narrate the reveal as in the main deck script:)* Google recommends turning on a product feature and capping retries at roughly eight attempts. Ours gives a decline-code-by-decline-code lookup table — insufficient funds, do-not-honor, velocity exceeded, fraudulent, expired card — each with a specific action, straight from our own runbooks.

You just watched that answer come out of the same terminal I was typing into a minute ago. It's not a mock-up on a slide; it's the live system.

---

## Part 5 — The honesty check: a question we can't answer (~2 min)

*(Back to the web UI, or a terminal running `./run.sh agent` if you prefer the raw CLI experience.)*

Last thing, and I think this is the most important five minutes of credibility in the whole demo. Everything so far has been a question our corpus can answer. Let me now ask something it genuinely cannot — a real Stripe API, but one that is **not** in our thirteen curated documents.

*(Ask one of these — both are confirmed absent from the corpus:)*

> **"How do I create a connected account and split a payment using Stripe Connect?"**

*(or, for an even cleaner miss, a different company's API entirely:)*

> **"How do I send an SMS verification code using the Twilio Verify API?"**

*(Wait for the response.)* Watch what happens: it does **not** invent an answer. It tells us, plainly, that the documents provided don't contain an answer to this question. That sentence is not the model being lazy — it's a system prompt rule we designed on purpose: *sources only, and a partial answer beats a refusal — but a refusal beats a hallucination.* If we haven't taught it something, it says so, instead of confidently making something up. For a payments system, an agent that occasionally lies with confidence is far more dangerous than one that sometimes says "I don't know."

That's the whole flow: curate the docs, ingest them into two linked stores, prove it against a real benchmark, watch it work live, compare it honestly to Google — and confirm it knows the edges of its own knowledge.

**If asked:**
- **"What if it's asked something adjacent, like Stripe Billing subscriptions, which the ontology mentions but the docs don't detail?"** — Good catch if this comes up: our ontology defines Stripe Connect and Billing as known *concepts*, because they're referenced in passing in our docs, but the *detailed API mechanics* were never ingested. So you may occasionally see a thin, hedged answer rather than a flat refusal — that's expected and consistent with the same "partial beats refusal, but never invent" rule.
- **"Could you just add Stripe Connect's docs and it would start answering?"** — Yes — that's the entire value proposition. Drop the markdown files into the corpus folder, run `./run.sh build` again, and it's answerable within minutes, with no code changes.
- **"Does it ever hallucinate anyway?"** — Every extracted graph fact is checked against the source text outside the model, and the answering model is restricted to only the passages it was given — but no system is perfect, which is exactly why we keep citations on every answer: verify, don't just trust.
