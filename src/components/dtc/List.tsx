import Item from './Item';
import { Dtc } from '@/types';

import styles from './List.module.css';

type Props = {
  dtcData: Dtc[];
};

export default function List({ dtcData }: Props) {
  return (
    <ul className={styles['dtc-list']}>
      {dtcData.map((dtc) => (
        <Item key={dtc.id} dtc={dtc} />
      ))}
    </ul>
  );
}
