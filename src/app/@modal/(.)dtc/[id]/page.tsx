import { CSSProperties } from 'react';

import { getDtcData } from '@/app/dtc/[id]/actions';
import Modal from '@/components/Modal';
import Code from '@/components/dtc/Code';
import { System } from '@/types';

export default async function Page({ params }: { params: { id: string } }) {
  const dtcData = await getDtcData(params.id);
  const codeStyle: Record<System['title'], CSSProperties> = {
    Powertrain: { '--color-code': 'var(--color-code-p)' } as CSSProperties,
    Network: { '--color-code': 'var(--color-code-u)' } as CSSProperties,
    Chassis: { '--color-code': 'var(--color-code-c)' } as CSSProperties,
    Body: { '--color-code': 'var(--color-code-b)' } as CSSProperties,
  };

  if (!dtcData) return null;

  return (
    <Modal header={dtcData.code.title} style={codeStyle[dtcData.system.title]}>
      <Code dtc={dtcData} />
    </Modal>
  );
}
