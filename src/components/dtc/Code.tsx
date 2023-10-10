import { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import { Dtc, Systems } from '@prisma/client';
import { BarChart3, Book, BrainCog, Car, LocateFixed } from 'lucide-react';

import { Explanation } from './Explanation';

import styles from './Code.module.css';

export default async function Code({ dtc, className }: { dtc: Dtc | null; className?: string }) {
  if (!dtc) return notFound();

  const codeStyle: Record<Systems, CSSProperties> = {
    Powertrain: { '--color-code': 'var(--color-code-p)' } as CSSProperties,
    Network: { '--color-code': 'var(--color-code-u)' } as CSSProperties,
    Chassis: { '--color-code': 'var(--color-code-c)' } as CSSProperties,
    Body: { '--color-code': 'var(--color-code-b)' } as CSSProperties,
  };

  return (
    <div className={className}>
      <div className={styles['header-container']}>
        <h2 className={styles.header} style={codeStyle[dtc.systemTitle]}>
          {dtc.codeTitle} <span>{dtc.systemTitle}</span>
        </h2>
        <div className={styles.views}>
          <BarChart3 /> <span>{dtc.views}</span> views
        </div>
      </div>
      <ul className={styles.list}>
        <li>
          <span>
            <Car /> Subsystem
          </span>
          <span>
            {dtc.systemName} ({dtc.systemCode})
          </span>
        </li>
        {dtc.codeLocation && (
          <li>
            <span>
              <LocateFixed /> Location
            </span>
            <span>{dtc.codeLocation}</span>
          </li>
        )}
        <li>
          <span>
            <Book /> Description
          </span>
          <span>{dtc.codeDescription}</span>
        </li>
        <li>
          <span>
            <BrainCog /> AI Explanation
          </span>
          <span>
            <Explanation code={dtc.codeTitle} description={dtc.codeDescription} />
          </span>
        </li>
      </ul>
    </div>
  );
}
