'use client';

import { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Dtc, Systems } from '@prisma/client';

import styles from './Item.module.css';

export default function Item({ dtc }: { dtc: Dtc }) {
  const router = useRouter();
  const codeStyle: Record<Systems, CSSProperties> = {
    Powertrain: { '--color-code': 'var(--color-code-p)' } as CSSProperties,
    Network: { '--color-code': 'var(--color-code-u)' } as CSSProperties,
    Chassis: { '--color-code': 'var(--color-code-c)' } as CSSProperties,
    Body: { '--color-code': 'var(--color-code-b)' } as CSSProperties,
  };

  return (
    <li>
      <article className={styles.article} style={codeStyle[dtc.systemTitle]}>
        <div>
          <h2>
            <abbr title={dtc.systemTitle}>{dtc.codeTitle.charAt(0)}</abbr>
            {dtc.codeTitle.substring(1)}
          </h2>
        </div>

        <p>{dtc.codeDescription}</p>
        <button
          onClick={() =>
            router.push(`/dtc/${dtc.codeTitle}`, { scroll: false })
          }
        >
          More info
        </button>
      </article>
    </li>
  );
}
