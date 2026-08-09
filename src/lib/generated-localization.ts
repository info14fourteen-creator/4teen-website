import generatedLocalization from "../content/localization-generated.json" with {
  type: "json",
};

type GeneratedLocalization = Record<
  string,
  Record<string, unknown>
>;

const generated = generatedLocalization as GeneratedLocalization;

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
