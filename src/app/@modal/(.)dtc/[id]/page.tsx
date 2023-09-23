import Modal from '@/components/Modal';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Modal header="test">
      <p>dtc page client modal</p>
    </Modal>
  );
}
