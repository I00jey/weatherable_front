import dynamic from 'next/dynamic';

const AllClothesClient = dynamic(
  () => import('../../../../../components/closet/AllClothesClient'),
  { ssr: false }
);

export default function AllClothesPage() {
  return <AllClothesClient />;
}
