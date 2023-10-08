import { CSSProperties } from 'react';
import { Dtc, Systems } from '@prisma/client';

import styles from './Code.module.css';
import { Explanation } from './Explanation';
import { notFound } from 'next/navigation';

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
      <h2 className={styles.header} style={codeStyle[dtc.systemTitle]}>
        {dtc.codeTitle} <span>{dtc.systemTitle}</span>
      </h2>
      <ul className={styles.list}>
        <li>
          <span>Subsystem</span>
          <span>
            {dtc.systemName} ({dtc.systemCode})
          </span>
        </li>
        {dtc.codeLocation && (
          <li>
            <span>Location</span>
            <span>{dtc.codeLocation}</span>
          </li>
        )}
        <li>
          <span>Description</span>
          <span>{dtc.codeDescription}</span>
        </li>
        <li>
          <span>AI Explanation</span>
          <span>
            <Explanation code={dtc.codeTitle} />
          </span>
        </li>
      </ul>
    </div>
  );
}
