import { Dtc, System } from '@/types';
import Link from 'next/link';

import styles from './Code.module.css';
import { CSSProperties } from 'react';

export default async function Code({
  dtc,
  className,
}: {
  dtc: Dtc | null;
  className?: string;
}) {
  if (!dtc)
    return (
      <div className={className}>
        <h1>Not Found!</h1>
        <Link href="/">Go back to homepage.</Link>
      </div>
    );

  const codeStyle: Record<System['title'], CSSProperties> = {
    Powertrain: { '--color-code': 'var(--color-code-p)' } as CSSProperties,
    Network: { '--color-code': 'var(--color-code-u)' } as CSSProperties,
    Chassis: { '--color-code': 'var(--color-code-c)' } as CSSProperties,
    Body: { '--color-code': 'var(--color-code-b)' } as CSSProperties,
  };

  return (
    <div className={className}>
      <h1 className={styles.header} style={codeStyle[dtc.system.title]}>
        {dtc.code.title} <span>{dtc.system.title}</span>
      </h1>
      <ul className={styles.list}>
        <li>
          <span>Subsystem</span>
          <span>
            {dtc.system.subName} ({dtc.system.subCode})
          </span>
        </li>
        <li>
          <span>Code Description</span>
          <span>{dtc.code.description}</span>
        </li>
      </ul>
    </div>
  );
}
