import NotFound from '@/components/dtc/NotFound';
import DtcError from '@/components/dtc/Error';
import List from '@/components/dtc/List';
import { db } from '@/lib/db';
import { Dtc } from '@prisma/client';

export default async function Home({
  searchParams,
}: {
  searchParams: { s?: string };
}) {
  let dtcData: Dtc[] | undefined;
  let dtcTotalCount = 0;
  const searchTerms = searchParams.s?.split(' ');

  const whereClauses = searchTerms
    ? {
        OR: searchTerms.map((term) => ({
          codeTitle: { contains: term.toUpperCase() },
        })),
      }
    : {};

  try {
    [dtcData, dtcTotalCount] = await db.$transaction([
      db.dtc.findMany({
        where: whereClauses,
        skip: 0,
        take: 100,
        orderBy: { views: 'desc' },
      }),
      db.dtc.count(),
    ]);
  } catch (error) {
    return (
      <>
        <h1>Diagnostic Trouble Codes</h1>
        <DtcError error="Something went wrong. Try again." />;
      </>
    );
  }

  return (
    <>
      <h1 data-amount={dtcTotalCount}>Diagnostic Trouble Codes</h1>
      {dtcData && dtcData.length > 0 ? (
        <List dtcData={dtcData} />
      ) : (
        <NotFound />
      )}
    </>
  );
}
