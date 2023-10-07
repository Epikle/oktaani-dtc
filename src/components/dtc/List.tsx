'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersection } from '@mantine/hooks';
import Item from './Item';

import styles from './List.module.css';
import NotFound from './NotFound';
import { useEffect, useRef } from 'react';

export default function List({ search }: { search?: string }) {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['dtcList', search],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams([
        ...(search ? [['s', search]] : []),
        ...(pageParam ? [['c', pageParam]] : []),
      ]);
      return await (await fetch(`/api?${params.toString()}`)).json();
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    keepPreviousData: true,
  });
  const dtcData = data?.pages.flatMap((page) => page.dtcData);
  const lastDtcRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastDtcRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  if (isLoading) return <p>Loading...</p>;
  if (!dtcData || dtcData?.length === 0) return <NotFound />;

  return (
    <>
      <ul className={styles['dtc-list']}>
        {dtcData.map((dtc, i) => {
          if (i === dtcData.length - 1) {
            return <Item ref={ref} key={dtc.id} dtc={dtc} />;
          } else {
            return <Item key={dtc.id} dtc={dtc} />;
          }
        })}
      </ul>
    </>
  );
}
