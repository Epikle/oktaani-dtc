import { Dtc } from '@/types';

import './Item.module.css';

type Props = {
  dtc: Dtc;
};

export default function Item({ dtc }: Props) {
  const styles = `${dtc.code.title.charAt(0).toLowerCase()}-code`;

  return (
    <>
      <li>
        <article className={styles}>
          <h2>
            <abbr title={dtc.system.title}>{dtc.code.title.charAt(0)}</abbr>
            {dtc.code.title.substring(1)}
          </h2>

          <p>{dtc.code.description}</p>
          <button className="more-code">More info</button>
        </article>
      </li>
    </>
  );
}
