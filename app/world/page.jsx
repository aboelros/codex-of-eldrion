import { getDimensions, getRegionsByDimension } from '@/lib/lore-parser';
import Link from 'next/link';

export const metadata = {
  title: 'Atlas of Dimensions | Library of Eldrion',
  description: 'The complete mapping of the 14 Dimensions.',
};

export default async function WorldLibrary() {
  const dimensions = await getDimensions();
  
  // We'll map each dimension to its regions
  // We cannot easily do await in map, so we'll fetch all regions first
  const dimensionShelves = [];
  for (const dim of dimensions) {
    const regions = await getRegionsByDimension(dim.slug);
    if (regions && regions.length > 0) {
      dimensionShelves.push({
        dimension: dim,
        regions: regions.sort((a, b) => a.regionNumber - b.regionNumber)
      });
    }
  }

  return (
    <div className="library-aisle">
      <div className="text-center mb-16 pt-8">
        <h1 className="text-title text-5xl md:text-7xl candle-glow">Atlas of Dimensions</h1>
        <p className="text-[#c4a882] mt-4 font-serif text-xl opacity-80 italic max-w-2xl mx-auto">
          "From the Divine Apex to the Primordial Wilds, all existence is cataloged."
        </p>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12">
        {dimensionShelves.map(({ dimension, regions }) => (
          <div key={dimension.slug} className="shelf-row">
            <div className="shelf-label">{dimension.name}</div>
            {regions.map((region) => (
              <Link key={region.slug} href={`/world/${dimension.slug}/${region.slug}`}>
                <div 
                  className="thin-spine"
                  style={{ backgroundColor: dimension.color }}
                  title={`${region.name}`}
                >
                  <div className="thin-ribbs mt-2"></div>
                  
                  <div className="flex-grow flex items-center justify-center relative overflow-hidden">
                    <span className="thin-spine-title">
                      {region.name}
                    </span>
                  </div>
                  
                  <div className="thin-spine-number">
                    #{region.regionNumber}
                  </div>
                  
                  <div className="thin-ribbs mb-2"></div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
