import { useQuery } from '@tanstack/react-query';

import DtcError from './DtcError';
import DtcLoading from './DtcLoading';
import DtcNotFound from './DtcNotFound';
import DtcItem from './DtcItem';
import { getDtcList } from '../../shared/util/fetch';

import './DtcList.css';

const DtcList = ({ search }) => {
  const { isLoading, isError, data, error } = useQuery(['dtcList'], getDtcList);

  if (isError) return <DtcError error={error.message} />;
  if (isLoading) return <DtcLoading placeholders={36} />;

  const dtcsToShow = !search
    ? data.slice(0, 100)
    : data
        .filter((dtc) =>
          search
            .trim()
            .split(' ')
            .some(
              (w) =>
                dtc.code.title.toLowerCase().includes(w.toLowerCase()) ||
                dtc.code.description.toLowerCase().includes(w.toLowerCase())
            )
        )
        .slice(0, 10);

  if (dtcsToShow.length === 0) return <DtcNotFound />;

  return (
    <ul className="dtc-list">
      {dtcsToShow.map((dtc) => (
        <DtcItem key={dtc.id} dtc={dtc} />
      ))}
    </ul>
  );
};

export default DtcList;
