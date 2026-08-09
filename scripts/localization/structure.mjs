export function collectStringPaths(value, prefix = "", result = new Map()) {
  if (typeof value === "string") {
    result.set(prefix, value);
    return result;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectStringPaths(item, `${prefix}[${index}]`, result);
    });
    return result;
  }

  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      collectStringPaths(item, prefix ? `${prefix}.${key}` : key, result);
    }
  }

  return result;
}

export function validateTranslatedStructure(source, translated) {
  const sourceStrings = collectStringPaths(source);
  const translatedStrings = collectStringPaths(translated);
  const missing = [];
  const empty = [];
  const unchanged = [];

  for (const [path, sourceValue] of sourceStrings) {
    if (!translatedStrings.has(path)) {
      missing.push(path);
      continue;
    }

    const translatedValue = translatedStrings.get(path);
    if (!translatedValue.trim()) {
      empty.push(path);
    }

    const technicalInvariant =
      path.includes(".links[") &&
      path.endsWith(".value") ||
      path.includes("liveMetrics.") &&
      path.endsWith(".value") ||
      /^architecture\.liquidity\.(controller\.title|executors\[\d+\]\.title)$/.test(path);

    if (
      sourceValue.length >= 24 &&
      translatedValue === sourceValue &&
      !technicalInvariant &&
      !/^(https?:|\/|[A-Z0-9_.@+-]+$)/.test(sourceValue)
    ) {
      unchanged.push(path);
    }
  }

  const extra = [...translatedStrings.keys()].filter(
    (path) => !sourceStrings.has(path),
  );

  return {
    valid:
      missing.length === 0 &&
      empty.length === 0 &&
      extra.length === 0,
    missing,
    empty,
    extra,
    unchanged,
    sourceStringCount: sourceStrings.size,
    translatedStringCount: translatedStrings.size,
  };
}
