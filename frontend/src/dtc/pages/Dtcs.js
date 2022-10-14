import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import DtcItem from '../components/DtcItem';
import DtcList from '../components/DtcList';
import ShowDtc from '../components/ShowDtc';
import { getDtcList } from '../../shared/util/fetch';

import './Dtcs.css';

const Dtcs = ({ search }) => {
  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery(['dtcList'], getDtcList);

  //placeholders while loading data
  var count = [];
  for (var i = 0; i < 6; i++) {
    count.push(<DtcItem loading key={i} />);
  }

  const dtcsToShow = !search
    ? data
    : data.filter((dtc) =>
        search
          .trim()
          .split(' ')
          .some(
            (w) =>
              dtc.code.title.toLowerCase().includes(w.toLowerCase()) ||
              dtc.code.description.toLowerCase().includes(w.toLowerCase())
          )
      );

  return (
    <main>
      <h1>Diagnostic Trouble Codes</h1>
      {search?.trim() && <p className="search">Search: {search}</p>}
      {dtcsToShow?.length === 0 && <DtcItem notFound />}
      {id && <ShowDtc id={id} />}
      {isError && <DtcItem error={error.message} />}
      {isLoading && <ul className="dtc-list">{count}</ul>}
      {!isLoading && dtcsToShow && <DtcList dtcs={dtcsToShow} />}
    </main>
  );
};

export default Dtcs;
