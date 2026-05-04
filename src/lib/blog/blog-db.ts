import { Pool } from "pg";

declare global {
  var __fourteenBlogPool: Pool | undefined;
}

function createBlogPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required for live blog database access");
  }

  return new Pool({
    connectionString,
    ssl: process.env.PGSSL_DISABLE === "1" ? false : { rejectUnauthorized: false },
    max: 6,
  });
}

export function getBlogPool() {
  if (!globalThis.__fourteenBlogPool) {
    globalThis.__fourteenBlogPool = createBlogPool();
  }

  return globalThis.__fourteenBlogPool;
}
