import { db } from '@/lib/db';
import { Dtc } from '@/types';

export default async function Code({ dtc }: { dtc: Dtc | null }) {
  if (!dtc) return <p>Not Found!</p>;

  return <p>CODE: {JSON.stringify(dtc)}</p>;
}
