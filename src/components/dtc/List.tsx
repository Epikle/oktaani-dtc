import Item from './Item';
import { Dtc } from '@/types';

import styles from './List.module.css';

export default function List({ dtcData }: { dtcData: Dtc[] }) {
  return (
    <ul className={styles['dtc-list']}>
      {dtcData.map((dtc) => (
        <Item key={dtc.id} dtc={dtc} />
      ))}
    </ul>
  );
}
