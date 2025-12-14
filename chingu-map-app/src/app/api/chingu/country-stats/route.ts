import { NextResponse } from 'next/server';
import { chinguController } from '@/features/chingu/chingu.controller';

export async function GET() {
  try {
    const data = await chinguController.countryStats();
    return NextResponse.json(data);
  } catch (e) {
    const err = e as Error;
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
