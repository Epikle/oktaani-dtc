'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { addGPTData, getDtcData } from '@/app/dtc/[id]/actions';

import styles from './Explanation.module.css';

export function Explanation({ code }: { code: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['listing', code],
    queryFn: async ({ signal }) => {
      const dtcData = await getDtcData(code);

      if (dtcData?.gptInfo) return dtcData.gptInfo;
      const { message } = await (
        await fetch(`${process.env.NEXT_PUBLIC_GPT_API_URL}/?codeTitle=${code}`, { signal })
      ).json();
      await addGPTData({ codeTitle: code, gptInfo: message });
      return message;
    },
  });

  if (isError) return <p>Error, please try again later.</p>;
  if (isLoading)
    return (
      <div className={styles.loader}>
        <Loader2 className={styles.spin} />
        <span>Generating explanation, please wait.</span>
      </div>
    );

  if (!data || data.toLowerCase().includes('no explanation found')) {
    return <p>Unfortunately, we couldn&apos;t generate an explanation for this code.</p>;
  }

  return <p>{data}</p>;
}
