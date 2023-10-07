'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import InfoBubble from './InfoBubble';

import styles from './Header.module.css';
import { Search } from 'lucide-react';

export default function Header() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="oktaaniDTC Logo"
            className={styles.logo}
            width="226"
            height="32"
            priority={true}
          />
        </Link>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          router.push(`?s=${search}`);
        }}
        className={styles['dtc-search']}
      >
        <label htmlFor="search">
          <span>DTC</span>
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
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          spellCheck={false}
        />
        <button type="submit" disabled={!search}>
          <Search />
        </button>
      </form>
      <div>
        <InfoBubble />
      </div>
    </header>
  );
}
