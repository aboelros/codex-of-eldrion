import { getGlossary } from '@/lib/lore-parser';
import Link from 'next/link';

export const metadata = {
  title: 'The Index of All Things | The Codex of Eldrion',
};

export default async function GlossaryPage() {
  const glossary = await getGlossary();
  
  // Group by first letter
  const grouped = glossary.reduce((acc, item) => {
    const letter = item.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(item);
    return acc;
  }, {});

  const letters = Object.keys(grouped).sort();

  return (
    <div className="grimoire-page">
      <header className="mb-12 text-center">
        <h1 className="text-title mb-4">The Index of All Things</h1>
        <p className="text-[#c4a882] text-lg max-w-2xl mx-auto italic">
          "A name is the first anchor of reality. Lose the name, and the entity fades into the Abyss."
        </p>
        <p className="text-[#8a7560] mt-2">— Archivist Torin</p>
      </header>

      {/* Alphabet Jump Bar */}
      <div className="sticky top-16 z-40 bg-[#0d0a06]/90 backdrop-blur-md py-4 border-y border-[#8a7230]/30 mb-12">
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {letters.map(letter => (
            <a 
              key={letter} 
              href={`#letter-${letter}`}
              className="w-8 h-8 flex items-center justify-center text-[#e8d5b7] hover:text-[#0d0a06] hover:bg-[#c9a84c] rounded transition-colors font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {letter}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {letters.map(letter => (
          <div key={letter} id={`letter-${letter}`} className="mb-16 scroll-mt-32">
            <h2 className="text-5xl text-[#c9a84c] mb-6 border-b border-[#8a7230]/30 pb-2" style={{ fontFamily: 'var(--font-display)' }}>
              {letter}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {grouped[letter].map(item => (
                <Link key={item.slug} href={item.slug} className="block group">
                  <div className="flex items-start gap-4 p-3 rounded hover:bg-[#1a1207] transition-colors border border-transparent hover:border-[#8a7230]/30">
                    <span className="text-xl mt-1">{item.type === 'Character' ? '👤' : item.type === 'Event' ? '⏳' : '🗺️'}</span>
                    <div>
                      <h3 className="text-[#f5e6d0] font-bold group-hover:text-[#e6b422] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                        {item.name}
                      </h3>
                      <p className="text-[#8a7560] text-sm italic">{item.desc || item.type}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
