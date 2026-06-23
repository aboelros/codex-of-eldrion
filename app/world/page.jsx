import { getDimensions } from '@/lib/lore-parser';
import DimensionLayer from '@/components/world/DimensionLayer';

export const metadata = {
  title: 'Atlas of Dimensions | The Codex of Eldrion',
};

export default async function WorldPage() {
  const dimensions = await getDimensions();

  return (
    <div className="grimoire-page">
      <header className="mb-16 text-center">
        <h1 className="text-title mb-4">Atlas of Dimensions</h1>
        <p className="text-[#c4a882] text-lg max-w-2xl mx-auto italic">
          "Fourteen layers of reality, stacked like pages in a burning book."
        </p>
        <p className="text-[#8a7560] mt-2">— Archivist Torin</p>
        <hr className="gold-divider mt-8" />
      </header>

      <div className="max-w-4xl mx-auto relative pb-20">
        {/* Central connecting core */}
        <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-gradient-to-b from-[#ffffff] via-[#8a0000] to-[#00ff00] transform -translate-x-1/2 opacity-10 blur-xl"></div>
        
        <div className="flex flex-col gap-2">
          {dimensions.map(dim => (
            <DimensionLayer key={dim.id} dimension={dim} />
          ))}
        </div>
      </div>
    </div>
  );
}
