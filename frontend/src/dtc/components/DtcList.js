import React from 'react';

import DtcItem from './DtcItem';
import './DtcList.css';

const DtcList = (props) => {
  return (
    <ul className="dtc-list">
      {props.dtcs.map((dtc) => (
        <DtcItem
          key={dtc.id}
          id={dtc.id}
          systemTitle={dtc.system.title}
          codeTitle={dtc.code.title}
          description={dtc.code.description}
          onDelete={props.onDeleteDtc}
          onUpdate={props.onUpdate}
          setIsChanged={props.setIsChanged}
        />
      ))}
    </ul>
  );
};

export default DtcList;
