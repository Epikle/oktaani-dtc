import List from '@/components/dtc/List';

export default async function Home({ searchParams }: { searchParams: { s?: string } }) {
  return <List search={searchParams.s} />;
}
