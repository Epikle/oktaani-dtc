import { useParams } from 'react-router-dom';

import DtcList from '../components/DtcList';
import ShowDtc from '../components/ShowDtc';

import './Dtcs.css';

const Dtcs = ({ search }) => {
  const { id } = useParams();

  return (
    <main>
      <h1>Diagnostic Trouble Codes</h1>
      {search?.trim() && <p className="search">Search: {search}</p>}
      {id && <ShowDtc id={id} />}
      <DtcList search={search} />
    </main>
  );
};

export default Dtcs;
