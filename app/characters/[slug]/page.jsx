import { getCharacterBySlug, getCharacterSlugs } from '@/lib/lore-parser';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = await getCharacterSlugs();
  return slugs;
}

export async function generateMetadata({ params }) {
  const character = await getCharacterBySlug(params.slug);
  if (!character) return { title: 'Not Found' };
  return {
    title: `${character.name} | The Codex of Eldrion`,
    description: character.epithet || 'Character entry in the Codex of Eldrion',
  };
}

export default async function CharacterDetail({ params }) {
  const character = await getCharacterBySlug(params.slug);
  
  if (!character) {
    notFound();
  }

  return (
    <div className="grimoire-page">
      <Link href="/characters" className="inline-block mb-8 text-[#8a7560] hover:text-[#c9a84c] transition-colors">
        &larr; Return to Registry
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content Area */}
        <div className="lg:w-2/3">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span 
                className="category-badge" 
                style={{ color: 'var(--text-primary)', borderColor: 'currentColor', backgroundColor: 'var(--cat-' + character.category + ')' }}
              >
                {character.categoryLabel}
              </span>
              <span className="text-[#8a7560]">Archive #{character.fileNumber}</span>
            </div>
            <h1 className="text-title mb-2 text-left">{character.name}</h1>
            {character.epithet && (
              <h2 className="text-2xl text-[#c9a84c] italic" style={{ fontFamily: 'var(--font-heading)' }}>
                {character.epithet}
              </h2>
            )}
            <hr className="gold-divider" />
          </header>

          <div 
            className="text-body prose-parchment" 
            dangerouslySetInnerHTML={{ __html: character.contentHtml }} 
          />

          {character.archivistNote && (
            <div className="archivist-note mt-16">
              <p>{character.archivistNote}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          <div className="lore-card sticky top-24">
            <h3 className="text-xl text-[#f5e6d0] font-bold mb-4 border-b border-[#8a7230]/30 pb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Physical Attributes
            </h3>
            
            {Object.keys(character.physicalAttributes).length > 0 ? (
              <ul className="space-y-3">
                {Object.entries(character.physicalAttributes).map(([key, value]) => (
                  <li key={key} className="flex justify-between border-b border-[#8a7230]/10 pb-2">
                    <span className="text-[#c4a882] capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-[#e8d5b7] text-right font-medium">{value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[#8a7560] italic text-sm">No physical data recorded.</p>
            )}

            {character.crossReferences && character.crossReferences.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl text-[#f5e6d0] font-bold mb-4 border-b border-[#8a7230]/30 pb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Related Archives
                </h3>
                <ul className="space-y-2">
                  {character.crossReferences.map(ref => (
                    <li key={ref}>
                      <Link href={`/search?q=${ref}`} className="cross-ref text-sm">
                        {ref.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
