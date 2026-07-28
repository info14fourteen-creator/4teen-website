You are writing one English partner article for the 4TEEN blog.

The article is not a news digest and not a landing page clone.
It must read like a real editorial guide written for users who are trying to understand or solve a concrete TRON resource problem.

## Output contract

Return valid JSON only with this shape:

{
  "slug": "",
  "title": "",
  "excerpt": "",
  "seoTitle": "",
  "seoDescription": "",
  "coverImageAlt": "",
  "sourceUrl": "",
  "keywords": ["", ""],
  "contentMarkdown": ""
}

## Hard requirements

- Write in English.
- Write one full article only.
- Target length: roughly 900 to 1400 words.
- Use Markdown with `##` and `###` headings, short paragraphs, and bullet lists when useful.
- Include natural anchor links to the required TronixRent pages from the brief.
- Include a dedicated section titled exactly `## Useful TronixRent routes`.
- In that section, include 4 to 6 bullet links to relevant TronixRent pages.
- Keep the tone practical, calm, and technically literate.
- Do not write hype, fake urgency, or exaggerated guarantees.
- Do not invent on-chain metrics, volumes, customer counts, or security claims.
- Do not claim custody, insurance, or protocol guarantees unless that is explicitly provided in the input facts.
- Do not mention “SEO”, “semantic core”, “keyword”, or “anchor text”.
- Do not use markdown tables.
- Do not wrap the JSON in code fences.

## Writing style

- Write for people searching because they have a fee problem, a failed transfer, or uncertainty about TRON Energy and Bandwidth.
- Explain mechanism first: what triggers TRX burn, why Energy matters, why Bandwidth still matters, and where package selection goes wrong.
- The article should feel useful even if the reader never clicks a link.
- Mention 4TEEN only lightly when it genuinely helps contextualize why this topic matters to builders and operators.

## Link style

- Link naturally inside explanatory sentences.
- Use human anchor text such as `rent TRON Energy`, `USDT TRC20 fee guide`, `fix OUT_OF_ENERGY on TRON`, `TRON Bandwidth for USDT transfers`, `65k Energy vs 131k Energy`, or similar.
- Avoid repeating the exact same anchor text more than twice.

## Field guidance

- `slug`: concise, lowercase, hyphenated, search-friendly.
- `title`: strong editorial title that matches the primary search intent.
- `excerpt`: 1 to 2 sentences for card preview.
- `seoTitle`: up to about 60 characters when possible.
- `seoDescription`: up to about 160 characters when possible.
- `sourceUrl`: use the main TronixRent URL most relevant to this article.
- `keywords`: 6 to 10 useful phrase-level tags.
- `coverImageAlt`: describe the article topic, not a fictional image.

## Facts you can rely on if present in input

- TronixRent is a TRON Energy and Bandwidth rental service for USDT TRC20 transfers and contract actions.
- 65,000 Energy + 350 Bandwidth is used for many active-recipient USDT TRC20 transfers.
- 131,000 Energy + 350 Bandwidth is safer when the recipient is new or has no USDT history.
- Users calculate a quote, create an order, and pay the exact TRX amount.
- A quote can contain a small unique fraction so the watcher can match payment to order.
- The product exposes one shared public resource pool.
- Smart Router checks live resources, price, reliability, package fit, and quote safety before showing one public route.
- Users should not share private keys or seed phrases.
- Completed blockchain resource deliveries are generally final and cannot be reversed.

Use only the facts supplied in the input. If something is not in the input, do not invent it.
