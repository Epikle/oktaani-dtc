import { getDtcData, updateDtcViews } from '@/app/dtc/[id]/actions';
import Modal from '@/components/Modal';
import Code from '@/components/dtc/Code';

export default async function Page({ params }: { params: { id: string } }) {
  const dtcData = await getDtcData(params.id);
  if (dtcData?.codeTitle) {
    await updateDtcViews(dtcData.codeTitle);
  }

  if (!dtcData) return null;

  return (
    <Modal>
      <Code dtc={dtcData} />
    </Modal>
  );
}
