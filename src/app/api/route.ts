import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { CODE_LIMIT } from '@/settings';

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('s');
  const cursor = req.nextUrl.searchParams.get('c');
  const searchTerms = search?.split(' ');
  const [dtcData, dtcTotalCount] = await db.$transaction([
    db.dtc.findMany({
      where: {
        ...(searchTerms
          ? {
              OR: searchTerms.map((term) => ({
                codeTitle: {
                  equals: term.toUpperCase(),
                },
              })),
            }
          : {}),
      },
      take: CODE_LIMIT + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: [{ views: 'desc' }, { codeTitle: 'asc' }],
    }),
    db.dtc.count(),
  ]);

  let nextCursor: typeof cursor | undefined = undefined;

  if (dtcData.length > CODE_LIMIT) {
    const nextItem = dtcData.pop();
    nextCursor = nextItem?.id;
  }

  return NextResponse.json({ dtcTotalCount, nextCursor, dtcData });
}
