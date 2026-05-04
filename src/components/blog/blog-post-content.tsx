import type { ReactNode } from "react";

type ParagraphNode = {
  type: "paragraph";
  text: string;
};

type HeadingNode = {
  type: "heading";
  level: 2 | 3;
  text: string;
};

type ListNode = {
  type: "unordered-list" | "ordered-list";
  items: string[];
};

type QuoteNode = {
  type: "quote";
  text: string;
};

type ContentNode = ParagraphNode | HeadingNode | ListNode | QuoteNode;

function normalizeMarkdownLine(value: string) {
  return value.replace(/\r/g, "").trimEnd();
}

function stripFenceMarkers(value: string) {
  return value.replace(/^```[a-z0-9_-]*$/i, "").replace(/^```$/, "").trim();
}

function stripFormattingMarkers(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1 ($2)")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/^>\s*/g, "")
    .trim();
}

function renderInlineTokens(text: string) {
  const nodes: ReactNode[] = [];
  const pattern =
    /(\[([^\]]+)\]\((https?:\/\/[^)]+)\)|https?:\/\/[^\s)]+(?:\([^\s)]+\))?|\*\*[^*]+\*\*|__[^_]+__|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  match = pattern.exec(text);
  while (match) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${token}-${match.index}`;

    if (token.startsWith("[")) {
      nodes.push(
        <a
          key={key}
          className="underline decoration-white/40 underline-offset-4"
          href={match[3]}
          rel="noopener noreferrer"
          target="_blank"
        >
          {match[2]}
        </a>,
      );
    } else if (token.startsWith("http")) {
      nodes.push(
        <a
          key={key}
          className="underline decoration-white/40 underline-offset-4"
          href={token}
          rel="noopener noreferrer"
          target="_blank"
        >
          {token}
        </a>,
      );
    } else if (token.startsWith("**") || token.startsWith("__")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(<code key={key} className="ft-blog-prose__code">{token.slice(1, -1)}</code>);
    }

    lastIndex = match.index + token.length;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function parseContent(content: string): ContentNode[] {
  const lines = content
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map(normalizeMarkdownLine);

  const nodes: ContentNode[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];
  let listType: "unordered-list" | "ordered-list" | null = null;
  let inCodeFence = false;

  const flushParagraph = () => {
    if (!paragraphBuffer.length) {
      return;
    }

    const text = stripFormattingMarkers(paragraphBuffer.join(" ").trim());
    if (text) {
      nodes.push({ type: "paragraph", text });
    }
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listBuffer.length || !listType) {
      return;
    }

    const items = listBuffer.map((item) => stripFormattingMarkers(item)).filter(Boolean);
    if (items.length) {
      nodes.push({
        type: listType,
        items,
      });
    }

    listBuffer = [];
    listType = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^```/.test(trimmed)) {
      flushParagraph();
      flushList();
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      const text = stripFenceMarkers(trimmed);
      if (text) {
        paragraphBuffer.push(text);
      }
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = trimmed.match(/^(#{2,3})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      nodes.push({
        type: "heading",
        level: headingMatch[1].length === 2 ? 2 : 3,
        text: stripFormattingMarkers(headingMatch[2]),
      });
      continue;
    }

    if (/^#\s+/.test(trimmed)) {
      flushParagraph();
      flushList();
      continue;
    }

    const quoteMatch = trimmed.match(/^>\s+(.+)$/);
    if (quoteMatch) {
      flushParagraph();
      flushList();
      nodes.push({
        type: "quote",
        text: stripFormattingMarkers(quoteMatch[1]),
      });
      continue;
    }

    const unorderedMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (listType && listType !== "unordered-list") {
        flushList();
      }
      listType = "unordered-list";
      listBuffer.push(unorderedMatch[1]);
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listType && listType !== "ordered-list") {
        flushList();
      }
      listType = "ordered-list";
      listBuffer.push(orderedMatch[1]);
      continue;
    }

    if (listType) {
      flushList();
    }

    paragraphBuffer.push(trimmed);
  }

  flushParagraph();
  flushList();

  return nodes;
}

function renderNode(node: ContentNode, index: number): ReactNode {
  if (node.type === "heading") {
    const className =
      node.level === 2 ? "ft-blog-prose__heading" : "ft-blog-prose__subheading";
    const Tag = node.level === 2 ? "h2" : "h3";

    return (
      <Tag key={`heading-${index}`} className={className}>
        {renderInlineTokens(node.text)}
      </Tag>
    );
  }

  if (node.type === "unordered-list") {
    return (
      <ul key={`list-${index}`} className="ft-blog-prose__list">
        {node.items.map((item, itemIndex) => (
          <li key={`list-item-${index}-${itemIndex}`}>{renderInlineTokens(item)}</li>
        ))}
      </ul>
    );
  }

  if (node.type === "ordered-list") {
    return (
      <ol key={`ordered-list-${index}`} className="ft-blog-prose__olist">
        {node.items.map((item, itemIndex) => (
          <li key={`ordered-list-item-${index}-${itemIndex}`}>{renderInlineTokens(item)}</li>
        ))}
      </ol>
    );
  }

  if (node.type === "quote") {
    return (
      <blockquote key={`quote-${index}`} className="ft-blog-prose__quote">
        {renderInlineTokens(node.text)}
      </blockquote>
    );
  }

  if (node.type !== "paragraph") {
    return null;
  }

  return (
    <p key={`paragraph-${index}`} className="ft-blog-prose__paragraph">
      {renderInlineTokens(node.text)}
    </p>
  );
}

export function BlogPostContent({
  content,
}: {
  content: string;
}) {
  const nodes = parseContent(content);

  return <div className="ft-blog-prose">{nodes.map(renderNode)}</div>;
}
