import { NextResponse } from "next/server";

// PUBLIC_INTERFACE
export async function GET() {
  /** Health check endpoint for the frontend container. */
  return NextResponse.json({ ok: true });
}
