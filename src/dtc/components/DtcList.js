import DtcItem from './DtcItem';

import './DtcList.css';

const DtcList = ({ dtcs }) => (
  <ul className="dtc-list">
    {dtcs.map((dtc) => (
      <DtcItem key={dtc.id} dtc={dtc} />
    ))}
  </ul>
);

export default DtcList;
