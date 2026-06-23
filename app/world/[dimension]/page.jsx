import { getDimensions, getRegionsByDimension, getDimensionSlugs } from '@/lib/lore-parser';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = await getDimensionSlugs();
  return slugs;
}

export async function generateMetadata({ params }) {
  const dimensions = await getDimensions();
  const dim = dimensions.find(d => d.slug === params.dimension);
  if (!dim) return { title: 'Not Found' };
  return {
    title: `${dim.name} | Atlas of Dimensions`,
  };
}

export default async function DimensionDetail({ params }) {
  const dimensions = await getDimensions();
  const dimension = dimensions.find(d => d.slug === params.dimension);
  
  if (!dimension) {
    notFound();
  }

  const regions = await getRegionsByDimension(dimension.folder);

  return (
    <div className="grimoire-page">
      <Link href="/world" className="inline-block mb-8 text-[#8a7560] hover:text-[#c9a84c] transition-colors">
        &larr; Return to Atlas
      </Link>

      <header className="mb-16 text-center border-b border-[#8a7230]/30 pb-12" style={{ borderColor: `${dimension.accentColor}50` }}>
        <h1 className="text-title mb-4" style={{ color: dimension.accentColor, textShadow: `0 0 20px ${dimension.color}` }}>
          {dimension.name}
        </h1>
        <p className="text-xl text-[#c4a882] italic mb-6">"{dimension.atmosphere}"</p>
        
        <div className="flex justify-center gap-6 text-sm text-[#8a7560] uppercase tracking-widest font-bold">
          {dimension.warden && <span>Warden: <span className="text-[#f5e6d0]">{dimension.warden}</span></span>}
          <span>{regions.length} Known Regions</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map(region => (
          <Link key={region.slug} href={`/world/${dimension.slug}/${region.slug}`} className="block h-full">
            <div className="lore-card h-full flex flex-col hover:border-opacity-100 transition-colors" style={{ hoverBorderColor: dimension.accentColor }}>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs text-[#8a7560] font-mono">Reg.{region.regionNumber.toString().padStart(3, '0')}</span>
              </div>
              <h3 className="text-xl text-[#f5e6d0] font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {region.name}
              </h3>
              <p className="text-sm text-[#c4a882] flex-grow">
                {region.description || 'A region shrouded in mystery.'}
              </p>
              <div className="mt-6 text-right">
                <span className="text-sm" style={{ color: dimension.accentColor }}>Explore &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
