'use client';

import Image from 'next/image';

import styles from './Header.module.css';
import InfoBubble from './InfoBubble';

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Image
          src="logo.svg"
          alt="oktaaniDTC Logo"
          className={styles.logo}
          width="226"
          height="32"
        />
      </div>

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
          maxLength={29}
        />
      </form>
      <div>
        <InfoBubble />
      </div>
    </header>
  );
}
