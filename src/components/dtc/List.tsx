'use client';

import { useSearchParams } from 'next/navigation';

import Item from './Item';
import { Dtc } from '@/types';

import styles from './List.module.css';

type Props = {
  dtcData: Dtc[];
};

export default function List({ dtcData }: Props) {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search');

  const dtcsToShow = !searchValue
    ? dtcData
    : dtcData.filter((dtc) =>
        searchValue
          .trim()
          .split(' ')
          .some((w) => dtc.code.title.toLowerCase().startsWith(w.toLowerCase()))
      );
  return (
    <ul className={styles['dtc-list']}>
      {dtcsToShow.map((dtc) => (
        <Item key={dtc.id} dtc={dtc} />
      ))}
    </ul>
  );
}
