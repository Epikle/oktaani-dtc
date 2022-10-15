import { useContext, useEffect, useState, Fragment } from 'react';

import { AuthContext } from '../../context/auth-context';
import AddDtc from '../../../dtc/components/AddDtc';
import AboutDtcs from '../../../dtc/components/AboutDtcs';

import logo from '../../images/logo.svg';
import styles from './Header.module.css';

const Header = ({ setSearch }) => {
  const auth = useContext(AuthContext);

  const [isNewDtc, setIsNewDtc] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAboutDtc, setIsAboutDtc] = useState(false);

  const toggleAboutDtc = () => setIsAboutDtc((prevS) => !prevS);
  const newDtcModalHandler = () => setIsNewDtc((prevS) => !prevS);

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  let prevScrollPos = window.scrollY;

  const listenToScroll = () => {
    let currentScrollPos = window.scrollY;

    if (prevScrollPos > currentScrollPos) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    prevScrollPos = currentScrollPos;
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);

    return () => {
      window.removeEventListener('scroll', listenToScroll);
    };
  });

  return (
    <Fragment>
      <AddDtc showModal={isNewDtc} onCancel={newDtcModalHandler} />
      <AboutDtcs isAboutDtc={isAboutDtc} onCancel={toggleAboutDtc} />
      <header className={!isVisible ? styles.hide : ''}>
        <div>
          <img src={logo} alt="oktaaniDTC Logo" className={styles.logo} />
        </div>
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className={styles['dtc-search']}
          >
            <label htmlFor="search">
              <span className="material-icons">search</span>
              <span className={styles['dtc-search-tooltip']}>
                Search multiple at the same time, just leave space between.
              </span>
            </label>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search for DTC's"
              onChange={searchHandler}
              maxLength="29"
            />
          </form>
        </div>

        {!auth.isLoggedIn && (
          <div>
            <button className={styles.more} onClick={toggleAboutDtc}>
              Want to learn
              <br />
              more about{' '}
              <strong>
                <abbr title="Diagnostic Trouble Code">DTC</abbr>
              </strong>
              's?
            </button>
          </div>
        )}
        {auth.isLoggedIn && (
          <div className={styles['admin-controls']}>
            <button className={styles.btn} onClick={newDtcModalHandler}>
              <span className="material-icons">add</span>
            </button>
            <div className={styles['admin-user']}>
              <button className={styles.btn}>
                <span className="material-icons">person</span>
              </button>
              <div className={styles['admin-user-dropdown']}>
                <button className={styles['btn-drop']} onClick={auth.logout}>
                  <span className="material-icons">logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </Fragment>
  );
};

export default Header;
