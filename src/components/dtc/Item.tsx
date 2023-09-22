import { CSSProperties } from 'react';

import { Dtc, System } from '@/types';

import styles from './Item.module.css';

export default function Item({ dtc }: { dtc: Dtc }) {
  const codeStyle: Record<System['title'], CSSProperties> = {
    Powertrain: { '--color-code': 'var(--color-code-p)' } as CSSProperties,
    Network: { '--color-code': 'var(--color-code-u)' } as CSSProperties,
    Chassis: { '--color-code': 'var(--color-code-c)' } as CSSProperties,
    Body: { '--color-code': 'var(--color-code-b)' } as CSSProperties,
  };

  return (
    <li>
      <article className={styles.article} style={codeStyle[dtc.system.title]}>
        <div>
          <h2>
            <abbr title={dtc.system.title}>{dtc.code.title.charAt(0)}</abbr>
            {dtc.code.title.substring(1)}
          </h2>
        </div>

        <p>{dtc.code.description}</p>
        <button>More info</button>
      </article>
    </li>
  );
}
