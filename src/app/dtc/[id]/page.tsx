import Code from '@/components/dtc/Code';
import { getDtcData } from './actions';

import styles from './page.module.css';

export default async function Page({ params }: { params: { id: string } }) {
  const dtcData = await getDtcData(params.id);

  return (
    <div className={styles.container}>
      <Code dtc={dtcData} />
    </div>
  );
}
