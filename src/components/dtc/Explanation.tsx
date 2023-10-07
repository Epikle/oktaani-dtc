'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import styles from './Explanation.module.css';

export function Explanation({ code }: { code: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['listing', code],
    queryFn: async () => await (await fetch(`/api/${code}`)).json(),
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
    return <p>No explanation found for this code, sorry.</p>;
  }

  return <p>{data}</p>;
}
