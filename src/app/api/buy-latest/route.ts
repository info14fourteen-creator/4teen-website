import { getLiveBuyEvents } from "@/lib/buy-live";

export const revalidate = 120;

export async function GET() {
  try {
    const events = await getLiveBuyEvents();
    return Response.json(
      { ok: true, events },
      {
        headers: {
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=31535880",
        },
      },
    );
  } catch {
    return Response.json(
      { ok: false, events: [] },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=300",
        },
      },
    );
  }
}
