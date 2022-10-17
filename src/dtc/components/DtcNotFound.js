import './DtcItem.css';
import './DtcNotFound.css';

const DtcNotFound = () => (
  <ul className="dtc-list">
    <li>
      <article className="f-code">
        <div>
          <h2>
            <abbr title="Not Found">?</abbr>Search
          </h2>
        </div>
        <p>Search didn't find anything. Try again.</p>
        <button className="more-code">Not Found</button>
      </article>
    </li>
  </ul>
);

export default DtcNotFound;
