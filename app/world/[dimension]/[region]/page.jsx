import { getRegionBySlug, getRegionSlugs, getDimensions } from '@/lib/lore-parser';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = await getRegionSlugs();
  return slugs;
}

export async function generateMetadata({ params }) {
  const region = await getRegionBySlug(params.dimension, params.region);
  if (!region) return { title: 'Not Found' };
  return {
    title: `${region.name} | The Codex of Eldrion`,
    description: region.description,
  };
}

export default async function RegionDetail({ params }) {
  const region = await getRegionBySlug(params.dimension, params.region);
  const dimensions = await getDimensions();
  
  if (!region) {
    notFound();
  }

  const dim = dimensions.find(d => d.folder === region.dimension || d.slug === params.dimension);

  return (
    <div className="grimoire-page">
      <Link href={`/world/${params.dimension}`} className="inline-block mb-8 text-[#8a7560] hover:text-[#c9a84c] transition-colors">
        &larr; Return to {dim?.name || 'Dimension'}
      </Link>

      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[#8a7560] uppercase tracking-widest text-sm">
              Region {region.regionNumber.toString().padStart(3, '0')}
            </span>
          </div>
          <h1 className="text-title mb-4 text-left" style={{ color: dim?.accentColor || 'var(--gold-bright)' }}>
            {region.name}
          </h1>
          <p className="text-xl text-[#c4a882] italic mb-8 border-l-4 pl-4" style={{ borderColor: dim?.color || 'var(--gold)' }}>
            {region.description}
          </p>
          <hr className="gold-divider" />
        </header>

        <div 
          className="text-body prose-parchment" 
          dangerouslySetInnerHTML={{ __html: region.contentHtml }} 
        />

        {region.crossReferences && region.crossReferences.length > 0 && (
          <div className="mt-16 pt-8 border-t border-[#8a7230]/30">
            <h3 className="text-xl text-[#f5e6d0] font-bold mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
              Connected Entities & Events
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {region.crossReferences.map(ref => (
                <Link key={ref} href={`/search?q=${ref}`} className="lore-card px-4 py-2 hover:border-[#c9a84c] transition-colors text-sm">
                  {ref.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
