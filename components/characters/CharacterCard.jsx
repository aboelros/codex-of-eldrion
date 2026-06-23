import Link from 'next/link';

export default function CharacterCard({ character }) {
  return (
    <Link href={`/characters/${character.slug}`} className="lore-card group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <span 
          className="category-badge" 
          style={{ color: 'var(--text-primary)', borderColor: 'currentColor', backgroundColor: 'var(--cat-' + character.category + ')' }}
        >
          {character.categoryLabel}
        </span>
        <span className="text-xs text-[#8a7560]">Entry #{character.fileNumber}</span>
      </div>
      
      <div className="flex-grow">
        <h3 className="text-xl text-[#f5e6d0] font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
          {character.name}
        </h3>
        {character.epithet && (
          <p className="text-[#c9a84c] text-sm italic mb-4">{character.epithet}</p>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-[#8a7230]/30 flex justify-between items-center text-sm">
        <span className="text-[#8a7560] group-hover:text-[#c9a84c] transition-colors">Read Archive &rarr;</span>
      </div>
    </Link>
  );
}
