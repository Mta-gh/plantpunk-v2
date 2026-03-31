import SlidePanel from '@/components/SlidePanel/SlidePanel';
import { getPlant } from '@/lib/api';

export default async function PlantPanel({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plant = await getPlant(slug);

  return (
    <SlidePanel>
      {plant.name}
    </SlidePanel>
  );
}
