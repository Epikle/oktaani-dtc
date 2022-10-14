import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { URLS } from '../../shared/util/urls';
import DtcItem from '../components/DtcItem';
import DtcList from '../components/DtcList';
import ShowDtc from '../components/ShowDtc';

import './Dtcs.css';

const Dtcs = ({ search, isChanged, setIsChanged }) => {
  const { isLoading, isError, data, error } = useQuery(
    ['dtcList'],
    async () => {
      const dtcList = await axios.get(`${URLS.apiUrl}/dtc`);
      return dtcList.data;
    }
  );

  // const [loadedDtcs, setLoadedDtcs] = useState();
  // const { isLoading, error, sendRequest } = useHttpClient();

  // useEffect(() => {
  //   const fetchDtcs = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `${URLS.apiUrl}/dtc`
  //       );
  //       setLoadedDtcs(responseData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchDtcs();
  // }, [sendRequest, props.isChanged]);

  const dtcDeletedHandler = (deletedDtcId) => {
    // setLoadedDtcs((prevDtcs) =>
    //   prevDtcs.filter((dtc) => dtc.id !== deletedDtcId)
    // );
  };

  //loading items count
  var count = [];
  for (var i = 0; i < 6; i++) {
    count.push(<DtcItem loading key={i} />);
  }

  let { id } = useParams();

  let words = [];

  if (search) {
    words = search.trim().split(' ');
  }

  const dtcsToShow = !search
    ? data
    : data.filter((dtc) =>
        words.some(
          (w) =>
            dtc.code.title.toLowerCase().includes(w.toLowerCase()) ||
            dtc.code.description.toLowerCase().includes(w.toLowerCase())
        )
      );

  return (
    <main>
      <h1>Diagnostic Trouble Codes</h1>
      {search && search.trim() && <p className="search">Search: {search}</p>}
      {search && search.trim() && dtcsToShow.length === 0 && (
        <DtcItem notFound />
      )}
      {id && <ShowDtc id={id} />}
      {isError && <DtcItem error={error} />}
      {isLoading && <ul className="dtc-list">{count}</ul>}
      {!isLoading && dtcsToShow && (
        <DtcList
          dtcs={dtcsToShow}
          onDeleteDtc={dtcDeletedHandler}
          setIsChanged={setIsChanged}
        />
      )}
    </main>
  );
};

export default Dtcs;
