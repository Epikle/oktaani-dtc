'use server';

import { db } from '@/lib/db';

export async function getDtcData(codeTitle: string) {
  const codeData = await db.dtc.findFirst({
    where: { codeTitle },
  });

  return codeData;
}

export async function updateDtcViews(codeTitle: string) {
  await db.dtc.update({
    where: { codeTitle },
    data: {
      views: { increment: 1 },
    },
  });
}

export async function addGPTData({ codeTitle, gptInfo }: { codeTitle: string; gptInfo: string }) {
  await db.dtc.update({
    where: { codeTitle },
    data: {
      gptInfo,
    },
  });
}
