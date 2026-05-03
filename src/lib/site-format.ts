export function parseNumberish(value: string | number | null | undefined) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.replace(/,/g, "").trim();
  if (!normalized) {
    return null;
  }

  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatCompactAmount(
  value: string | number | null | undefined,
  digits = 2,
) {
  const safe = parseNumberish(value);

  if (safe === null) {
    return "—";
  }

  const absolute = Math.abs(safe);
  const suffixes = [
    { threshold: 1_000_000_000, suffix: "b" },
    { threshold: 1_000_000, suffix: "m" },
    { threshold: 1_000, suffix: "k" },
  ] as const;

  for (const { threshold, suffix } of suffixes) {
    if (absolute >= threshold) {
      return `${(safe / threshold).toFixed(digits).replace(/\.?0+$/, "")}${suffix}`;
    }
  }

  return safe.toFixed(digits).replace(/\.?0+$/, "");
}

export function formatCompactMetric(
  value: string | number | null | undefined,
  digits = 2,
) {
  const numeric = parseNumberish(value);
  if (numeric === null) {
    return typeof value === "string" && value.trim() ? value.trim() : "—";
  }

  return formatCompactAmount(numeric, digits);
}

export function shortenAddress(address: string | null | undefined) {
  const safe = String(address || "").trim();
  if (!safe) return "—";
  if (safe.length <= 14) return safe;
  return `${safe.slice(0, 6)}...${safe.slice(-6)}`;
}
