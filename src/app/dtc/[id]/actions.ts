'use server';

import { db } from '@/lib/db';
import { Dtc } from '@/types';

export async function getDtcData(id: string): Promise<Dtc | null> {
  const codeData = await db.dtc.findFirst({
    where: { code: { is: { title: id } } },
  });

  return codeData;
}
