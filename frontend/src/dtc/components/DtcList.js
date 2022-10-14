import DtcItem from './DtcItem';

import './DtcList.css';

const DtcList = ({ dtcs, onDeleteDtc, setIsChanged }) => (
  <ul className="dtc-list">
    {dtcs.map((dtc) => (
      <DtcItem
        key={dtc.id}
        dtc={dtc}
        onDelete={onDeleteDtc}
        setIsChanged={setIsChanged}
      />
    ))}
  </ul>
);

export default DtcList;
