'use client';

import { useEffect, useRef } from 'react';
import { Dtc } from '@prisma/client';

import Item from './Item';

import styles from './List.module.css';

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};

export default function List({ dtcData }: { dtcData: Dtc[] }) {
  const target = useRef<HTMLDivElement>(null);

  const observerCbFn = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      console.log('load more dtcs');
    }
  };

  useEffect(() => {
    if (!target.current) return;
    const observer = new IntersectionObserver(observerCbFn, observerOptions);
    observer.observe(target.current);
  }, []);

  return (
    <>
      <ul className={styles['dtc-list']}>
        {dtcData.map((dtc) => (
          <Item key={dtc.id} dtc={dtc} />
        ))}
      </ul>
      <div ref={target} style={{ width: '100%', height: '5px' }} />
    </>
  );
}
