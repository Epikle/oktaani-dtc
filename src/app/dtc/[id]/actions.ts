'use server';

import { db } from '@/lib/db';

export async function getDtcData(codeTitle: string) {
  const codeData = await db.dtc.findFirst({
    where: { codeTitle },
  });

  if (codeData) {
    await db.dtc.update({
      where: { id: codeData.id },
      data: { views: { increment: 1 } },
    });
  }

  return codeData;
}
