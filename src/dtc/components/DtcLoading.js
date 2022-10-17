import './DtcItem.css';
import './DtcLoading.css';

const DtcLoading = ({ placeholders = 6 }) => {
  return (
    <ul className="dtc-list">
      {Array.from(Array(placeholders), (_, idx) => (
        <li key={idx}>
          <article className="loading-code">
            <div>
              <h2>
                <abbr title="Loading...">L</abbr>0000
              </h2>
            </div>
            <p>Loading content, please wait.</p>
            <button className="more-code">Loading...</button>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default DtcLoading;
