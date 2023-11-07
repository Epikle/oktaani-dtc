'use client';

import { useEffect, useRef } from 'react';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useIntersection } from '@mantine/hooks';

import Item from './Item';
import Loading from './Loading';
import NotFound from './NotFound';
import Error from './Error';

import styles from './List.module.css';

export default function List({ search }: { search?: string }) {
  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery({
    queryKey: ['dtcList', search],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams([
        ...(search ? [['s', search]] : []),
        ...(pageParam ? [['c', pageParam.toString()]] : []),
      ]);
      return await (await fetch(`/api?${params.toString()}`)).json();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    placeholderData: keepPreviousData,
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

  if (isLoading) return <Loading />;
  if (isError) return <Error error="Something went wrong, try again." />;
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
