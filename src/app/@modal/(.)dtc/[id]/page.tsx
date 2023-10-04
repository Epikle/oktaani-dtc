import { CSSProperties } from 'react';

import { getDtcData } from '@/app/dtc/[id]/actions';
import Modal from '@/components/Modal';
import Code from '@/components/dtc/Code';
import { System } from '@/types';

export default async function Page({ params }: { params: { id: string } }) {
  const dtcData = await getDtcData(params.id);

  if (!dtcData) return null;

  return (
    <Modal>
      <Code dtc={dtcData} />
    </Modal>
  );
}
