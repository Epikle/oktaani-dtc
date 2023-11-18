import Link from 'next/link';
import { getServerSession } from 'next-auth/next';

import List from '@/components/dtc/List';
import { authOptions } from '@/lib/auth';

export default async function Home({ searchParams }: { searchParams: { s?: string } }) {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session && <Link href="/api/auth/signout">Sign out</Link>}
      <List search={searchParams.s} />;
    </>
  );
}
