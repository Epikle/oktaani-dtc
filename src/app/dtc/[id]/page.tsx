import Code from '@/components/dtc/Code';
import { getDtcData, updateDtcViews } from './actions';

import styles from './page.module.css';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const dtcData = await getDtcData(params.id);

  return {
    title: `${params.id} | oktaaniDTC`,
    description: dtcData?.codeDescription,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const dtcData = await getDtcData(params.id);
  if (dtcData?.codeTitle) {
    await updateDtcViews(dtcData.codeTitle);
  }

  return (
    <div className={styles.container}>
      <Code dtc={dtcData} />
    </div>
  );
}
