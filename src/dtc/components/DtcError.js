import './DtcItem.css';
import './DtcError.css';

const DtcError = ({ error }) => (
  <ul className="dtc-list">
    <li>
      <article className="e-code">
        <div>
          <h2>
            <abbr title="Error">R</abbr>error
          </h2>
        </div>
        <p>{error}</p>
        <button className="more-code">Error</button>
      </article>
    </li>
  </ul>
);

export default DtcError;
