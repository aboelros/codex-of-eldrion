import { getAllCharacters } from '@/lib/lore-parser';
import Link from 'next/link';

export const metadata = {
  title: 'Registry of Souls | Library of Eldrion',
  description: 'The vast archive of 120 beings.',
};

export default async function CharactersLibrary() {
  const characters = await getAllCharacters();

  // Group characters by Category to form shelves
  const shelves = characters.reduce((acc, char) => {
    if (!acc[char.categoryLabel]) {
      acc[char.categoryLabel] = [];
    }
    acc[char.categoryLabel].push(char);
    return acc;
  }, {});

  return (
    <div className="library-aisle">
      <div className="text-center mb-16 pt-8">
        <h1 className="text-title text-5xl md:text-7xl candle-glow">The Registry of Souls</h1>
        <p className="text-[#c4a882] mt-4 font-serif text-xl opacity-80 italic max-w-2xl mx-auto">
          "Each spine contains a life. Some forged reality, others sought to unmake it."
        </p>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12">
        {Object.entries(shelves).map(([category, chars], i) => (
          <div key={category} className="shelf-row">
            <div className="shelf-label">{category}</div>
            {chars.map((char) => (
              <Link key={char.slug} href={`/characters/${char.slug}`}>
                <div 
                  className="thin-spine"
                  style={{ backgroundColor: `var(--cat-${char.category})` }}
                  title={`${char.name} - ${char.epithet || 'Archive'}`}
                >
                  <div className="thin-ribbs mt-2"></div>
                  
                  <div className="flex-grow flex items-center justify-center relative overflow-hidden">
                    <span className="thin-spine-title">
                      {char.name}
                    </span>
                  </div>
                  
                  <div className="thin-spine-number">
                    {char.fileNumber}
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
