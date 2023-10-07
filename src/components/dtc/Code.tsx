import { CSSProperties, Suspense } from 'react';
import Link from 'next/link';
import { Dtc, Systems } from '@prisma/client';

import styles from './Code.module.css';
import { Explanation } from './Explanation';

export default async function Code({ dtc, className }: { dtc: Dtc | null; className?: string }) {
  if (!dtc)
    return (
      <div className={className}>
        <h1>Not Found!</h1>
        <Link href="/">Go back to homepage.</Link>
      </div>
    );

  const codeStyle: Record<Systems, CSSProperties> = {
    Powertrain: { '--color-code': 'var(--color-code-p)' } as CSSProperties,
    Network: { '--color-code': 'var(--color-code-u)' } as CSSProperties,
    Chassis: { '--color-code': 'var(--color-code-c)' } as CSSProperties,
    Body: { '--color-code': 'var(--color-code-b)' } as CSSProperties,
  };

  return (
    <div className={className}>
      <h1 className={styles.header} style={codeStyle[dtc.systemTitle]}>
        {dtc.codeTitle} <span>{dtc.systemTitle}</span>
      </h1>
      <ul className={styles.list}>
        <li>
          <span>Subsystem</span>
          <span>
            {dtc.systemName} ({dtc.systemCode})
          </span>
        </li>
        <li>
          <span>Code Description</span>
          <span>{dtc.codeDescription}</span>
        </li>
        <li>
          <span>ChatGPT Explanation</span>
          <span>
            <Explanation code={dtc.codeTitle} />
          </span>
        </li>
      </ul>
    </div>
  );
}
