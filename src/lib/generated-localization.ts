import { ungzip } from "pako";
import { compressedLocalization } from "../content/localization-runtime";

type GeneratedLocalization = Record<
  string,
  Record<string, unknown>
>;

// The source JSON is large enough to exceed the Cloudflare Worker bundle cap.
// It is generated as gzip+base64 at build time and unpacked once per isolate.
const generated = JSON.parse(
  new TextDecoder().decode(
    ungzip(
      Uint8Array.from(atob(compressedLocalization), (character) =>
        character.charCodeAt(0),
      ),
    ),
  ),
) as GeneratedLocalization;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

// Translations are JSON, while page content can also contain formatters and
// other runtime values. Merge translated strings onto the English object so
// those executable values are never erased by serialization.
function mergeLocalizedContent<T>(fallback: T, translated: unknown): T {
  if (translated === undefined) {
    return fallback;
  }

  if (Array.isArray(fallback) && Array.isArray(translated)) {
    return fallback.map((item, index) =>
      mergeLocalizedContent(item, translated[index]),
    ) as T;
  }

  if (isRecord(fallback) && isRecord(translated)) {
    const merged: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fallback)) {
      merged[key] = mergeLocalizedContent(value, translated[key]);
    }
    return merged as T;
  }

  return translated as T;
}

export function getGeneratedPageContent<T>(
  locale: string,
  page: string,
  fallback: T,
): T {
  return mergeLocalizedContent(fallback, generated[locale]?.[page]);
}

export function getGeneratedGlobalContent<T>(
  locale: string,
  section: "chrome" | "nav" | "search",
  fallback: T,
): T {
  const globalContent = generated[locale]?.global as
    | Record<string, unknown>
    | undefined;

  return mergeLocalizedContent(fallback, globalContent?.[section]);
}
