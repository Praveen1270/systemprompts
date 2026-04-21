import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { error: 'invalid_token', error_description: 'No bearer session; public APIs do not require OAuth.' },
    { status: 401 },
  );
}
