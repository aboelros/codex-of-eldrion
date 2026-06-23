import { getGlossary } from '@/lib/lore-parser';
import KnowledgeGraph from '@/components/connections/KnowledgeGraph';

export const metadata = {
  title: 'Web of Fates | The Codex of Eldrion',
};

export default async function ConnectionsPage() {
  const glossary = await getGlossary();

  return (
    <div className="grimoire-page">
      <header className="mb-8 text-center">
        <h1 className="text-title mb-4">The Web of Fates</h1>
        <p className="text-[#c4a882] text-lg max-w-2xl mx-auto italic">
          "Pull one thread in the Aether, and a hundred stars fall from the sky. All is connected."
        </p>
        <p className="text-[#8a7560] mt-2">— Archivist Torin</p>
      </header>

      <div className="max-w-7xl mx-auto">
        <p className="text-center text-[#8a7560] mb-8 font-mono text-sm uppercase tracking-widest">
          Interactive Constellation Map • Scroll to Zoom • Drag to Pan
        </p>
        
        <KnowledgeGraph glossary={glossary} />
        
        <div className="mt-8 text-center text-sm text-[#8a7560]">
          Displaying {glossary.length} interconnected nodes across the 13 Dimensions.
        </div>
      </div>
    </div>
  );
}
