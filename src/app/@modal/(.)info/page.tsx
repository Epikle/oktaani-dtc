import Modal from '@/components/Modal';
import Info from '@/components/dtc/Info';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Modal header="More about DTCs">
      <Info />
    </Modal>
  );
}
