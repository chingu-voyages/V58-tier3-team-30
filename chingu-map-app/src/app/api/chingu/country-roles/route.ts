import { NextRequest, NextResponse } from 'next/server';
import { chinguController } from '@/features/chingu/chingu.controller';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const countryCode = searchParams.get('code')?.trim() || undefined;
  const countryName = searchParams.get('name')?.trim() || undefined;

  if (!countryCode && !countryName) {
    return NextResponse.json(
      { error: 'Provide ?code=CC or ?name=CountryName' },
      { status: 400 }
    );
  }

  try {
    const data = await chinguController.getRoleCountsForCountry({
      countryCode,
      countryName,
    });

    return NextResponse.json(data);
  } catch (e) {
    const err = e as Error;
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
