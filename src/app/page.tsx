import NotFound from '@/components/dtc/NotFound';
import DtcError from '@/components/dtc/Error';
import List from '@/components/dtc/List';
import { Dtc } from '@/types';
import { db } from '@/lib/db';

export default async function Home() {
  let dtcData: Dtc[] | undefined;

  try {
    dtcData = await db.dtc.findMany({});
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
      <h1 data-amount={dtcData ? dtcData.length : ''}>
        Diagnostic Trouble Codes
      </h1>
      {dtcData && dtcData.length > 0 ? (
        <List dtcData={dtcData} />
      ) : (
        <NotFound />
      )}
    </>
  );
}
