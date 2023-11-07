import { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { Dtc, Systems } from '@prisma/client';
import { BarChart3, Book, BrainCog, Car, LocateFixed } from 'lucide-react';

import { resetGPTData } from '@/app/dtc/[id]/actions';
import { authOptions } from '@/lib/auth';
import { Explanation } from './Explanation';

import styles from './Code.module.css';

export default async function Code({ dtc, className }: { dtc: Dtc | null; className?: string }) {
  if (!dtc) return notFound();
  const session = await getServerSession(authOptions);

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
          <div>
            <Car /> Subsystem
          </div>
          <div>
            {dtc.systemName} ({dtc.systemCode})
          </div>
        </li>
        {dtc.codeLocation && (
          <li>
            <div>
              <LocateFixed /> Location
            </div>
            <div>{dtc.codeLocation}</div>
          </li>
        )}
        <li>
          <div>
            <Book /> Description
          </div>
          <div>{dtc.codeDescription}</div>
        </li>
        <li>
          <div className={styles.aiTitle}>
            <span>
              <BrainCog /> AI Explanation
            </span>
            {session && (
              <form action={resetGPTData.bind(null, dtc.codeTitle)}>
                <button type="submit">Reset</button>
              </form>
            )}
          </div>

          <Explanation code={dtc.codeTitle} description={dtc.codeDescription} />
        </li>
      </ul>
    </div>
  );
}
