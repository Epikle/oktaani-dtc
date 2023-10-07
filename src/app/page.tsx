import List from '@/components/dtc/List';

export default async function Home({ searchParams }: { searchParams: { s?: string } }) {
  return (
    <>
      <h1 data-amount={''}>Diagnostic Trouble Codes</h1>
      {<List search={searchParams.s} />}
    </>
  );
}
