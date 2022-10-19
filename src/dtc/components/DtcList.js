import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import DtcError from './DtcError';
import DtcLoading from './DtcLoading';
import DtcNotFound from './DtcNotFound';
import DtcItem from './DtcItem';
import { getDtcList } from '../../shared/util/fetch';

import './DtcList.css';

const defaultDtcAmount = 100;
const increaseDtcsBy = 100;
const maxSearchResults = 100;

const DtcList = ({ search, setDtcAmount }) => {
  const { isLoading, isError, data, error } = useQuery(['dtcList'], getDtcList);
  const [listItems, setListItems] = useState(defaultDtcAmount);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px 50px 0px',
  });

  useEffect(() => {
    setListItems((prevS) => prevS + increaseDtcsBy);
  }, [inView]);

  useEffect(() => {
    setListItems(maxSearchResults);
    window.scrollTo(0, 0);
  }, [search]);

  useEffect(() => {
    if (data) setDtcAmount(data.length);
  }, [data, setDtcAmount]);

  if (isError) return <DtcError error={error.message} />;
  if (isLoading) return <DtcLoading placeholders={36} />;

  const dtcsToShow = !search
    ? data.slice(0, listItems)
    : data
        .filter((dtc) =>
          search
            .trim()
            .split(' ')
            .some((w) =>
              dtc.code.title.toLowerCase().startsWith(w.toLowerCase())
            )
        )
        .slice(0, maxSearchResults);

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
