const FOURTEEN_CONTRACT = "TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A";
const TRX_CONTRACT = "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb";
const USDT_CONTRACT = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj";
const SMART_ROUTER_ADDRESS = "TJ4NNy8xZEqsowCBhLvZ45LCqPdGjkET5j";
const ROUTER_URL = "https://rot.endjgfsv.link/swap/routerUniversal";
const SAMPLE_AMOUNT = "25";
const SAMPLE_AMOUNT_RAW = "25000000";
const SAMPLE_ROUTE_COUNT = 3;

type SwapTargetKey = "TRX" | "USDT";

type RouteSample = {
  targetKey: SwapTargetKey;
  targetSymbol: string;
  expectedOutDisplay: string;
  routeLabel: string;
  executionLabel: string;
  impactLabel: string;
  pathLabel: string;
  isExecutable: boolean;
};

export type SwapSnapshot = {
  sampleAmount: string;
  supportedTargets: number;
  protectedRemainder: string;
  routerState: "live" | "partial" | "offline";
  updatedAt: number;
  routes: RouteSample[];
};

type RouterPayload = {
  code?: number;
  message?: string;
  data?: Array<Record<string, unknown>>;
};

function normalizeList(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
}

function normalizeBigIntLike(value: unknown) {
  if (typeof value === "bigint") return value;
  if (typeof value === "number") return BigInt(Math.trunc(value));
  if (typeof value === "string") {
    const safe = value.trim();
    return safe ? BigInt(safe) : BigInt(0);
  }

  if (value && typeof (value as { toString: () => string }).toString === "function") {
    return BigInt((value as { toString: () => string }).toString());
  }

  return BigInt(0);
}

function rawToDecimalString(raw: string, decimals: number) {
  const safeRaw = String(raw || "0").replace(/\D/g, "") || "0";
  const padded = safeRaw.padStart(decimals + 1, "0");
  const whole = padded.slice(0, -decimals);
  const fraction = padded.slice(-decimals).replace(/0+$/, "");
  return fraction ? `${whole}.${fraction}` : whole;
}

function formatImpactLabel(value: unknown) {
  const safe = String(value ?? "").trim();
  return safe ? `${safe}%` : "—";
}

function buildVersionLen(poolVersions: string[]) {
  if (!poolVersions.length) return [];

  const result: number[] = [];
  let current = poolVersions[0];
  let count = 1;

  for (let index = 1; index < poolVersions.length; index += 1) {
    if (poolVersions[index] === current) {
      count += 1;
      continue;
    }

    result.push(result.length === 0 ? count + 1 : count);
    current = poolVersions[index];
    count = 1;
  }

  result.push(result.length === 0 ? count + 1 : count);
  return result;
}

function isExecutableRoute(path: string[], poolVersions: string[], versionLen: number[]) {
  return path.length >= 2 && poolVersions.length > 0 && versionLen.length > 0;
}

function buildRouteLabel(symbols: string[]) {
  const hops = Math.max(0, symbols.length - 2);
  return hops > 0 ? `Optimized · ${hops} hop${hops > 1 ? "s" : ""}` : "Direct · best route";
}

async function fetchBestRoute(targetKey: SwapTargetKey): Promise<RouteSample | null> {
  const targetAddress = targetKey === "TRX" ? TRX_CONTRACT : USDT_CONTRACT;
  const url = new URL(ROUTER_URL);
  url.searchParams.set("fromToken", FOURTEEN_CONTRACT);
  url.searchParams.set("toToken", targetAddress);
  url.searchParams.set("amountIn", SAMPLE_AMOUNT_RAW);
  url.searchParams.set("typeList", "");
  url.searchParams.set("includeUnverifiedV4Hook", "true");

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json, text/plain, */*" },
    next: { revalidate: 120 },
  });

  if (!response.ok) {
    throw new Error(`Router request failed: HTTP ${response.status}`);
  }

  const payload = (await response.json()) as RouterPayload;
  if (Number(payload.code) !== 0 || !Array.isArray(payload.data)) {
    throw new Error(payload.message || "Swap router returned invalid payload.");
  }

  const routes = payload.data
    .slice(0, SAMPLE_ROUTE_COUNT)
    .map((route) => {
      const symbols = normalizeList(route.tokenSymbol);
      const path = normalizeList(route.tokens);
      const poolVersions = normalizeList(route.poolVersion);
      const versionLen = buildVersionLen(poolVersions);
      const rawOut = normalizeBigIntLike(route.amountOut).toString();

      return {
        targetKey,
        targetSymbol: targetKey,
        expectedOutDisplay: rawToDecimalString(rawOut, 6),
        routeLabel: buildRouteLabel(symbols),
        executionLabel: String(route.fee ?? "").trim() || "Live route",
        impactLabel: formatImpactLabel(route.impact),
        pathLabel: symbols.join(" → ") || `4TEEN → ${targetKey}`,
        isExecutable: isExecutableRoute(path, poolVersions, versionLen),
        expectedOutRaw: normalizeBigIntLike(route.amountOut),
      };
    })
    .sort((left, right) => {
      if (left.isExecutable !== right.isExecutable) {
        return left.isExecutable ? -1 : 1;
      }

      if (left.expectedOutRaw > right.expectedOutRaw) return -1;
      if (left.expectedOutRaw < right.expectedOutRaw) return 1;
      return 0;
    });

  const route = routes[0];
  if (!route) {
    return null;
  }

  return {
    targetKey: route.targetKey,
    targetSymbol: route.targetSymbol,
    expectedOutDisplay: route.expectedOutDisplay,
    routeLabel: route.routeLabel,
    executionLabel: route.executionLabel,
    impactLabel: route.impactLabel,
    pathLabel: route.pathLabel,
    isExecutable: route.isExecutable,
  };
}

export async function getLiveSwapSnapshot(): Promise<SwapSnapshot> {
  const [trxResult, usdtResult] = await Promise.allSettled([
    fetchBestRoute("TRX"),
    fetchBestRoute("USDT"),
  ]);

  const routes = [trxResult, usdtResult]
    .filter(
      (result): result is PromiseFulfilledResult<RouteSample | null> =>
        result.status === "fulfilled",
    )
    .map((result) => result.value)
    .filter((route): route is RouteSample => Boolean(route));

  const successCount = routes.length;
  const routerState =
    successCount === 2 ? "live" : successCount === 1 ? "partial" : "offline";

  return {
    sampleAmount: SAMPLE_AMOUNT,
    supportedTargets: 2,
    protectedRemainder: "0.000001 4TEEN",
    routerState,
    updatedAt: Date.now(),
    routes,
  };
}

export const swapVerificationLinks = {
  router: `https://tronscan.org/#/contract/${SMART_ROUTER_ADDRESS}`,
  token: `https://tronscan.org/#/token20/${FOURTEEN_CONTRACT}`,
} as const;
