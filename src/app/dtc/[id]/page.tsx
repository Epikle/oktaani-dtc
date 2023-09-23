export default function Page({ params }: { params: { id: string } }) {
  return <p>dtc page server {params.id}</p>;
}
