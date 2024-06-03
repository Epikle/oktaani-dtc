'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

import InfoBubble from './InfoBubble';

import styles from './Header.module.css';

export default function Header() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const code = searchParams.get('s');

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setSearch('');
      router.push('/');
      return;
    }

    setSearch(event.target.value);
  };

  useEffect(() => {
    if (pathname === '/' && !code) {
      setSearch('');
    }
  }, [code, pathname]);

  return (
    <header className={styles.header}>
      <div>
        <Link href="/">
          <Image
            src="/oktaani_dtc.svg"
            alt="oktaaniDTC Logo"
            className={styles.logo}
            width="250"
            height="60"
            priority
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
          onChange={inputHandler}
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
