import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { ok: true, service: 'systemprompts', ts: new Date().toISOString() },
    {
      headers: { 'Cache-Control': 'no-store' },
    }
  );
}
