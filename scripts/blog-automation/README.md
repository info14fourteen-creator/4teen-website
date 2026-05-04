# Daily Digest Automation

This folder defines the new blog automation direction for `4teen.me/blog`.

The pipeline is intentionally different from the old Make scenario:

- one daily digest per day
- no social posting in the core pipeline
- content is published as one English blog article per day
- images are generated as unique 4TEEN editorial visuals from article context
- content is written as a founder-style market article in Stan's voice

## Planned pipeline

1. Read RSS feed items from `https://rss.app/feeds/v1.1/tKryunfPwo68YKWa.json`
2. Deduplicate and pick the digest window for the day
3. Fetch article pages and extract raw text + source image candidates
4. Run `Article Analysis Bot` on each article
5. Rank, filter, and cluster analysis cards
6. Run `Daily Digest Writer Bot` to produce the final long-form blog article
7. Generate `3` branded editorial visuals from the article context
8. Save the article into the blog snapshot / publishing layer
9. Trigger the site deployment from Heroku

## Assistant set

- `prompts/article-analysis-bot.md`
- `prompts/daily-digest-writer.md`

## Structured outputs

- `schemas/article-analysis-card.schema.json`

## Site publishing target

The daily digest should still fill the blog fields the site already expects:

- `slug`
- `title`
- `excerpt`
- `seoTitle`
- `seoDescription`
- `publishedAt`
- `coverImageUrl`
- `coverImageAlt`
- `keywords`
- `sourceUrl`
- `contentMarkdown`
- `previewImageUrls`

## Cheap/generated fields

The old Make blueprint generated these low-cost metadata fields, and they are still worth keeping:

- title
- slug
- keywords
- meta description
- summary / excerpt
- body content

For the new article flow, these stay generated, but at the final article level rather than per source article row.

## Image policy

We generate images from the article context rather than reusing upstream visuals directly.

- produce `3` unique branded visuals
- keep all outputs at `16:9`
- use a 4TEEN treatment:
  - orange / graphite grade
  - controlled darkening
  - subtle grid
  - subtle noise
  - premium editorial atmosphere

## Runtime target

- one run per day
- hosted in Heroku
- uses the existing OpenAI credentials already present in the Heroku runtime

## Still needed later

- the actual Heroku job entrypoint
- a reliable admin bot chat target for success/failure notifications
