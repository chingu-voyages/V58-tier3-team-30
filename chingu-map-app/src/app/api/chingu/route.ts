import { NextRequest, NextResponse } from 'next/server';
import { chinguController } from '@/features/chingu/chingu.controller';
import {
  ChinguQueryOptions,
  ChinguWhereInput,
} from '@/features/chingu/chingu.type';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const limit = searchParams.get('limit')
    ? parseInt(searchParams.get('limit')!)
    : undefined;
  const offset = searchParams.get('offset')
    ? parseInt(searchParams.get('offset')!)
    : undefined;
  const orderBy = searchParams.get('orderBy');

  try {
    const options: ChinguQueryOptions = {};

    // Build where clause from all query params except limit, offset, orderBy
    const where: Record<string, Prisma.StringFilter> = {};
    searchParams.forEach((value, key) => {
      if (key !== 'limit' && key !== 'offset' && key !== 'orderBy') {
        const trimmed = value.trim();
        if (trimmed) {
          where[key] = {
            equals: trimmed,
            mode: 'insensitive',
          };
        }
      }
    });

    if (Object.keys(where).length > 0) {
      options.where = where as ChinguWhereInput;
    }

    if (limit !== undefined) {
      options.limit = limit;
    }

    if (offset !== undefined) {
      options.offset = offset;
    }

    if (orderBy) {
      options.orderBy = JSON.parse(orderBy);
    }

    const data = await chinguController.list(options);
    return NextResponse.json(data);
  } catch (e) {
    const err = e as Error;
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
