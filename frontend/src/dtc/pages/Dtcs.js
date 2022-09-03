import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import DtcItem from '../components/DtcItem';
import DtcList from '../components/DtcList';
import ShowDtc from '../components/ShowDtc';

import './Dtcs.css';

const Dtcs = (props) => {
  const [loadedDtcs, setLoadedDtcs] = useState();
  const { isLoading, error, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchDtcs = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/dtc`
        );
        setLoadedDtcs(responseData.dtcList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDtcs();
  }, [sendRequest, props.isChanged]);

  const dtcDeletedHandler = (deletedDtcId) => {
    setLoadedDtcs((prevDtcs) =>
      prevDtcs.filter((dtc) => dtc.id !== deletedDtcId)
    );
  };

  //loading items count
  var count = [];
  for (var i = 0; i < 6; i++) {
    count.push(<DtcItem loading key={i} />);
  }

  let { id } = useParams();

  let words = [];

  if (props.search) {
    words = props.search.trim().split(' ');
  }

  const dtcsToShow = !props.search
    ? loadedDtcs
    : loadedDtcs.filter((dtc) =>
        words.some(
          (w) =>
            dtc.code.title.toLowerCase().includes(w.toLowerCase()) ||
            dtc.code.description.toLowerCase().includes(w.toLowerCase())
        )
      );

  return (
    <main>
      <h1>Diagnostic Trouble Codes</h1>
      {props.search && props.search.trim() && (
        <p className="search">Search: {props.search}</p>
      )}
      {props.search && props.search.trim() && dtcsToShow.length === 0 && (
        <DtcItem notFound />
      )}
      {id && <ShowDtc id={id} />}
      {error && <DtcItem error={error} />}
      {isLoading && <ul className="dtc-list">{count}</ul>}
      {!isLoading && dtcsToShow && (
        <DtcList
          dtcs={dtcsToShow}
          onDeleteDtc={dtcDeletedHandler}
          setIsChanged={props.setIsChanged}
        />
      )}
    </main>
  );
};

export default Dtcs;
