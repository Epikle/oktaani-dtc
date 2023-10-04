import Info from '@/components/dtc/Info';

import styles from './page.module.css';

export default function Page() {
  return (
    <>
      <h1>More about DTCs</h1>
      <Info className={styles.container} />
    </>
  );
}
