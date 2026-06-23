import { getRegionBySlug, getRegionSlugs } from '@/lib/lore-parser';
import { notFound } from 'next/navigation';
import BookViewer from '@/components/ui/BookViewer';

export async function generateStaticParams() {
  const paths = await getRegionSlugs();
  return paths;
}

export async function generateMetadata({ params }) {
  const region = await getRegionBySlug(params.dimension, params.region);
  if (!region) return { title: 'Not Found' };
  return {
    title: `${region.name} | Atlas | The Codex of Eldrion`,
  };
}

export default async function RegionDetail({ params }) {
  const region = await getRegionBySlug(params.dimension, params.region);
  
  if (!region) {
    notFound();
  }

  const attributes = [];
  if (region.fileNumber) attributes.push({ key: 'Archive', value: `#${region.fileNumber}` });

  return (
    <BookViewer 
      title={region.name} 
      contentHtml={region.contentHtml} 
      attributes={attributes} 
    />
  );
}
