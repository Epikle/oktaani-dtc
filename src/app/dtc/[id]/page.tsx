import Code from '@/components/dtc/Code';
import { getDtcData } from './actions';

export default async function Page({ params }: { params: { id: string } }) {
  const dtcData = await getDtcData(params.id);

  return <Code dtc={dtcData} />;
}
