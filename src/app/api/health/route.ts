export async function GET() {
  return Response.json({
    ok: true,
    service: "4teen-website",
    runtime: "next-on-cloudflare",
  });
}
