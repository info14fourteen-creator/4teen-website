import generatedLocalization from "../content/localization-generated.json" with {
  type: "json",
};

type GeneratedLocalization = Record<
  string,
  Record<string, unknown>
>;

const generated = generatedLocalization as GeneratedLocalization;

export function getGeneratedPageContent<T>(
  locale: string,
  page: string,
  fallback: T,
): T {
  return (generated[locale]?.[page] as T | undefined) ?? fallback;
}

export function getGeneratedGlobalContent<T>(
  locale: string,
  section: "chrome" | "nav" | "search",
  fallback: T,
): T {
  const globalContent = generated[locale]?.global as
    | Record<string, unknown>
    | undefined;

  return (globalContent?.[section] as T | undefined) ?? fallback;
}
