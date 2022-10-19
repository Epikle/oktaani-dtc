import { useState } from 'react';
import { useParams } from 'react-router-dom';

import DtcList from '../components/DtcList';
import ShowDtc from '../components/ShowDtc';

import './Dtcs.css';

const Dtcs = ({ search }) => {
  const { id } = useParams();
  const [dtcAmount, setDtcAmount] = useState();

  return (
    <main>
      <h1 data-amount={dtcAmount}>Diagnostic Trouble Codes</h1>
      {search?.trim() && <p className="search">Search: {search}</p>}
      {id && <ShowDtc id={id} />}
      <DtcList search={search} setDtcAmount={setDtcAmount} />
    </main>
  );
};

export default Dtcs;
