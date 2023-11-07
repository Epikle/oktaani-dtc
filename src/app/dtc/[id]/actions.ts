'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';

import { db } from '@/lib/db';
import { authOptions } from '@/lib/auth';

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

export async function resetGPTData(codeTitle: string) {
  const session = await getServerSession(authOptions);

  if (!session) return;

  await db.dtc.update({
    where: { codeTitle },
    data: {
      gptInfo: null,
    },
  });

  revalidatePath(`/dtc/${codeTitle}`);
}
