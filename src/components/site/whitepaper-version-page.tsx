import {
  getWhitepaperArchivePageContent,
  getWhitepaperVersionDocument,
  whitepaperVersionOrder,
  type WhitepaperVersionDocument,
  type WhitepaperVersionSlug,
} from "@/content/whitepaper-content";
import { defaultSiteLocale } from "@/lib/site-locale";
import type { ReactNode } from "react";

type MarkdownBlock =
  | { type: "heading"; level: 1 | 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "blockquote"; lines: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; language: string; code: string }
  | { type: "hr" };

type MarkdownSection = {
  id: string;
  title: string;
  blocks: MarkdownBlock[];
};

const whitepaperHeadingIdMap: Record<string, string> = {
  abstract: "wp-abstract",
  introduction: "wp-introduction",
  "token overview": "wp-token",
  "supply model": "wp-supply",
  "price logic": "wp-price",
  "token locking": "wp-locks",
  "token locking mechanism": "wp-locks",
  "trx flow on purchase": "wp-trx-flow",
  "liquidity architecture": "wp-liquidity",
  "liquidity execution": "wp-execution",
  "liquidity execution logic": "wp-execution",
  "dex executors": "wp-dex",
  "liquidity automation": "wp-automation",
  "ambassador system": "wp-ambassadors",
  "vault architecture": "wp-vaults",
  governance: "wp-governance",
  "governance & permissions": "wp-governance",
  "frontend disclaimer": "wp-frontend",
  "security considerations": "wp-security",
  "what 4teen is not": "wp-not",
  verification: "wp-verify",
  "on-chain components & verification": "wp-verify",
};

function cleanHeadingText(text: string) {
  return text.replace(/^\d+(?:\.\d+)*\.?\s*/, "").trim().toLowerCase();
}

function getHeadingId(text: string) {
  const cleaned = cleanHeadingText(text);
  const mapped = whitepaperHeadingIdMap[cleaned];

  if (mapped) return mapped;

  return cleaned
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string) {
  return /^\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?$/.test(line.trim());
}

function isBlockStarter(line: string) {
  const trimmed = line.trim();
  return (
    trimmed === "" ||
    /^#{1,4}\s+/.test(trimmed) ||
    trimmed === "---" ||
    trimmed.startsWith(">") ||
    trimmed.startsWith("- ") ||
    trimmed.startsWith("~~~") ||
    (trimmed.includes("|") && !trimmed.startsWith("["))
  );
}

function parseMarkdownDocument(document: string): MarkdownBlock[] {
  const lines = document.replace(/\r/g, "").split("\n");
  const blocks: MarkdownBlock[] = [];

  for (let index = 0; index < lines.length; ) {
    const rawLine = lines[index] ?? "";
    const line = rawLine.trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("~~~")) {
      const language = line.slice(3).trim();
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("~~~")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push({
        type: "code",
        language,
        code: codeLines.join("\n"),
      });
      continue;
    }

    if (line === "---") {
      blocks.push({ type: "hr" });
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length as 1 | 2 | 3 | 4,
        text: headingMatch[2].trim(),
      });
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quoteLines: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push({ type: "blockquote", lines: quoteLines });
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().replace(/^- /, ""));
        index += 1;
      }

      blocks.push({ type: "list", items });
      continue;
    }

    const nextLine = lines[index + 1]?.trim() ?? "";
    if (line.includes("|") && isTableSeparator(nextLine)) {
      const headers = splitTableRow(line);
      const rows: string[][] = [];
      index += 2;

      while (index < lines.length && lines[index].trim().includes("|")) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }

      blocks.push({ type: "table", headers, rows });
      continue;
    }

    const paragraphLines: string[] = [line];
    index += 1;

    while (index < lines.length && !isBlockStarter(lines[index])) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({
      type: "paragraph",
      text: paragraphLines.join(" ").replace(/\s+/g, " ").trim(),
    });
  }

  return blocks;
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex =
    /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let matchIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      const legacyHref = match[3];
      const label = match[2];
      const href =
        legacyHref === "https://4teen.me/wp-1.0"
          ? "/whitepaper/v1-0"
          : legacyHref === "https://4teen.me/wp-1.1"
            ? "/whitepaper/v1-1"
            : legacyHref === "https://4teen.me/wp-1.2"
              ? "/whitepaper/v1-2"
              : legacyHref === "https://4teen.me/wp-1.3"
                ? "/whitepaper/v1-3"
                : legacyHref;
      const anchor = href.startsWith("#");
      const internal = href.startsWith("/");
      nodes.push(
        anchor ? (
          <a key={`anchor-${matchIndex}`} className="ft-link" href={href}>
            {label}
          </a>
        ) : internal ? (
          <a key={`link-${matchIndex}`} className="ft-link" href={href}>
            {label}
          </a>
        ) : (
          <a
            key={`link-${matchIndex}`}
            className="ft-link"
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {label}
          </a>
        ),
      );
    } else if (match[4]) {
      nodes.push(<strong key={`strong-${matchIndex}`}>{match[4]}</strong>);
    } else if (match[5]) {
      nodes.push(<code key={`code-${matchIndex}`}>{match[5]}</code>);
    } else if (match[6]) {
      nodes.push(<em key={`em-${matchIndex}`}>{match[6]}</em>);
    }

    lastIndex = regex.lastIndex;
    matchIndex += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderMarkdownBlock(block: MarkdownBlock, index: number) {
  switch (block.type) {
    case "heading": {
      const id = block.level === 2 ? getHeadingId(block.text) : undefined;

      if (block.level === 1) {
        return (
          <h2 key={index} className="ft-whitepaper-page__md-h1">
            {renderInline(block.text)}
          </h2>
        );
      }

      if (block.level === 2) {
        return (
          <h2
            key={index}
            className="ft-whitepaper-page__md-h2"
            id={id}
          >
            {renderInline(block.text)}
          </h2>
        );
      }

      if (block.level === 3) {
        return (
          <h3 key={index} className="ft-whitepaper-page__md-h3">
            {renderInline(block.text)}
          </h3>
        );
      }

      return (
        <h4 key={index} className="ft-whitepaper-page__md-h4">
          {renderInline(block.text)}
        </h4>
      );
    }

    case "paragraph":
      return (
        <p key={index} className="ft-whitepaper-page__md-p">
          {renderInline(block.text)}
        </p>
      );

    case "list":
      return (
        <ul key={index} className="ft-list ft-whitepaper-page__md-list">
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item)}</li>
          ))}
        </ul>
      );

    case "blockquote":
      return (
        <blockquote key={index} className="ft-note ft-whitepaper-page__md-quote">
          {block.lines.map((line, lineIndex) => (
            <p key={lineIndex} className="ft-whitepaper-page__md-quote-line">
              {renderInline(line)}
            </p>
          ))}
        </blockquote>
      );

    case "table":
      return (
        <div key={index} className="ft-table-wrap ft-whitepaper-page__table-wrap">
          <table className="ft-table ft-whitepaper-page__md-table">
            <thead>
              <tr>
                {block.headers.map((header, headerIndex) => (
                  <th key={headerIndex}>{renderInline(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      data-label={block.headers[cellIndex] ?? `Column ${cellIndex + 1}`}
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "code":
      return (
        <pre key={index} className="ft-whitepaper-page__md-code">
          <code>{block.code}</code>
        </pre>
      );

    case "hr":
      return <hr key={index} className="ft-whitepaper-page__md-hr" />;
  }
}

function splitMarkdownSections(blocks: MarkdownBlock[]) {
  const intro: MarkdownBlock[] = [];
  const sections: MarkdownSection[] = [];
  let currentSection: MarkdownSection | null = null;

  for (const block of blocks) {
    if (block.type === "heading" && block.level === 2) {
      currentSection = {
        id: getHeadingId(block.text),
        title: block.text,
        blocks: [block],
      };
      sections.push(currentSection);
      continue;
    }

    if (currentSection) {
      currentSection.blocks.push(block);
      continue;
    }

    intro.push(block);
  }

  return { intro, sections };
}

function WhitepaperStaticLink({
  href,
  children,
  className,
  active = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
  external?: boolean;
}) {
  return (
    <a
      className={`${className ?? ""}${active ? " is-active" : ""}`}
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

function WhitepaperHeader({ activeSlug }: { activeSlug?: WhitepaperVersionSlug }) {
  return (
    <header className="ft-whitepaper-page__header">
      <div className="ft-container--wide">
        <div className="ft-whitepaper-page__header-bar">
          <a className="ft-whitepaper-page__brand" href="/">
            <span className="ft-whitepaper-page__brand-mark">4</span>
            <span className="ft-whitepaper-page__brand-copy">
              <span className="ft-whitepaper-page__brand-title">4TEEN</span>
              <span className="ft-whitepaper-page__brand-subtitle">Whitepaper Archive</span>
            </span>
          </a>

          <nav aria-label="Whitepaper routes" className="ft-whitepaper-page__header-nav">
            <WhitepaperStaticLink
              className="ft-whitepaper-page__header-link"
              href="/whitepaper"
              active={!activeSlug}
            >
              Archive
            </WhitepaperStaticLink>
            {whitepaperVersionOrder.map((slug) => (
              <WhitepaperStaticLink
                key={slug}
                className="ft-whitepaper-page__header-link"
                href={`/whitepaper/${slug}`}
                active={activeSlug === slug}
              >
                {slug.toUpperCase()}
              </WhitepaperStaticLink>
            ))}
            <WhitepaperStaticLink className="ft-whitepaper-page__header-link" href="/buy">
              Buy
            </WhitepaperStaticLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

function WhitepaperVersionCard({
  document,
  active = false,
}: {
  document: WhitepaperVersionDocument;
  active?: boolean;
}) {
  return (
    <WhitepaperStaticLink
      className="ft-card ft-card--plain ft-whitepaper-page__switcher-card"
      href={document.href}
      active={active}
    >
      <p className="ft-card-title-top">{document.version}</p>
      <h3 className="ft-card-title">{document.date}</h3>
      <p className="ft-overline">{document.status}</p>
      <p className="ft-text">{document.lead}</p>
    </WhitepaperStaticLink>
  );
}

export function WhitepaperArchivePage() {
  const locale = defaultSiteLocale;
  const content = getWhitepaperArchivePageContent(locale);

  return (
    <main className="ft-theme ft-page-main ft-whitepaper-page">
      <WhitepaperHeader />

      <section className="ft-section ft-section--hero ft-whitepaper-page__section">
        <div className="ft-container--wide ft-stack ft-stack--xl">
          <article className="ft-card ft-card--strong ft-whitepaper-page__version-hero">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-stack ft-stack--sm">
                <span className="ft-eyebrow">{content.hero.eyebrow}</span>
                <h1 className="ft-title-lg">{content.hero.title}</h1>
                <p className="ft-lead">{content.hero.lead}</p>
              </div>
            </div>
          </article>

          <article className="ft-card ft-card--plain ft-whitepaper-page__history-intro">
            <div className="ft-stack ft-stack--md">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.note.eyebrow}</p>
                <h2 className="ft-subtitle">{content.note.title}</h2>
              </div>

              <p className="ft-text">{content.note.body}</p>
            </div>
          </article>

          <article className="ft-card ft-card--plain ft-whitepaper-page__switcher-panel">
            <div className="ft-stack ft-stack--md">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.switcher.eyebrow}</p>
                <h2 className="ft-subtitle">{content.switcher.title}</h2>
              </div>

              <p className="ft-text">{content.switcher.body}</p>

              <div className="ft-grid ft-grid--4 ft-whitepaper-page__switcher-grid">
                {whitepaperVersionOrder.map((slug) => (
                  <WhitepaperVersionCard
                    key={slug}
                    document={content.versions[slug]}
                  />
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export function WhitepaperVersionPage({
  slug,
}: {
  slug: WhitepaperVersionSlug;
}) {
  const locale = defaultSiteLocale;
  const content = getWhitepaperArchivePageContent(locale);
  const document = getWhitepaperVersionDocument(locale, slug);
  const blocks = parseMarkdownDocument(document.document);
  const { intro, sections } = splitMarkdownSections(blocks);

  return (
    <main className="ft-theme ft-page-main ft-whitepaper-page">
      <WhitepaperHeader activeSlug={slug} />

      <section className="ft-section ft-section--hero ft-whitepaper-page__section">
        <div className="ft-container--wide ft-stack ft-stack--xl">
          <article className="ft-card ft-card--strong ft-whitepaper-page__version-hero">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-cluster ft-cluster--sm">
                <span className="ft-eyebrow">Whitepaper</span>
                <span className="ft-status-pill">{document.version}</span>
                <span className="ft-status-pill">{document.date}</span>
                <span className="ft-status-pill">{document.status}</span>
              </div>

              <div className="ft-stack ft-stack--md">
                <h1 className="ft-title-lg">{document.title}</h1>
                <p className="ft-lead">{document.lead}</p>
              </div>
            </div>
          </article>

          <article className="ft-card ft-card--plain ft-whitepaper-page__switcher-panel">
            <div className="ft-stack ft-stack--md">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.switcher.eyebrow}</p>
                <h2 className="ft-subtitle">{content.switcher.title}</h2>
              </div>

              <p className="ft-text">{content.switcher.body}</p>

              <div className="ft-grid ft-grid--4 ft-whitepaper-page__switcher-grid">
                {whitepaperVersionOrder.map((versionSlug) => (
                  <WhitepaperVersionCard
                    key={versionSlug}
                    active={versionSlug === slug}
                    document={content.versions[versionSlug]}
                  />
                ))}
              </div>
            </div>
          </article>

          <article className="ft-card ft-card--plain ft-whitepaper-page__document-card">
            <div className="ft-stack ft-stack--md">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.document.eyebrow}</p>
                <h2 className="ft-subtitle">
                  {document.version} • {document.title}
                </h2>
              </div>

              <p className="ft-text">{content.document.body}</p>

              <div className="ft-whitepaper-page__document">
                {intro.length > 0 ? (
                  <section className="ft-card ft-card--soft ft-whitepaper-page__markdown-section">
                    <div className="ft-stack ft-stack--md">
                      {intro.map((block, index) => renderMarkdownBlock(block, index))}
                    </div>
                  </section>
                ) : null}

                {sections.map((section, sectionIndex) => (
                  <section
                    key={section.id}
                    className="ft-card ft-card--soft ft-whitepaper-page__markdown-section"
                  >
                    <div className="ft-stack ft-stack--md">
                      {section.blocks.map((block, blockIndex) =>
                        renderMarkdownBlock(block, sectionIndex * 1000 + blockIndex),
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
