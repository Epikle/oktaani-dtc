import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import DtcError from './DtcError';
import DtcLoading from './DtcLoading';
import DtcNotFound from './DtcNotFound';
import DtcItem from './DtcItem';
import { getDtcList } from '../../shared/util/fetch';

import './DtcList.css';

const DtcList = ({ search }) => {
  const { isLoading, isError, data, error } = useQuery(['dtcList'], getDtcList);
  const [listItems, setListItems] = useState(100);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px 50px 0px',
  });

  useEffect(() => {
    if (search) {
      setListItems(100);
      window.scrollTo(0, 0);
    }
    if (inView) {
      setListItems((prevS) => prevS + 100);
    }
  }, [inView, search]);

  if (isError) return <DtcError error={error.message} />;
  if (isLoading) return <DtcLoading placeholders={36} />;

  const dtcsToShow = !search
    ? data.slice(0, listItems)
    : data
        .filter((dtc) =>
          search
            .trim()
            .split(' ')
            .some((w) => dtc.code.title.toLowerCase().includes(w.toLowerCase()))
        )
        .slice(0, 50);

  if (dtcsToShow.length === 0) return <DtcNotFound />;

  return (
    <ul className="dtc-list">
      {dtcsToShow.map((dtc) => (
        <DtcItem key={dtc.id} dtc={dtc} />
      ))}
      {!search && <li ref={ref}></li>}
    </ul>
  );
};

export default DtcList;
