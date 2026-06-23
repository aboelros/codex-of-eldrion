import { getAllCharacters } from '@/lib/lore-parser';
import { CATEGORIES } from '@/lib/constants';
import CharacterCard from '@/components/characters/CharacterCard';
import CharactersClient from './CharactersClient';

export const metadata = {
  title: 'Registry of Souls | The Codex of Eldrion',
};

export default async function CharactersPage() {
  const characters = await getAllCharacters();
  
  const categoriesList = Object.entries(CATEGORIES).map(([id, data]) => ({
    id,
    ...data
  })).filter(cat => 
    // Only include categories that have characters
    ['titans', 'monarchs', 'valkyries', 'demon-lords', 'primordial-races', 'seraphic-order', 'war-heroes', 'wardens', 'dark-age', 'legends', 'abyssal'].includes(cat.id)
  );

  return (
    <div className="grimoire-page">
      <header className="mb-12 text-center">
        <h1 className="text-title mb-4">Registry of Souls</h1>
        <p className="text-[#c4a882] text-lg max-w-2xl mx-auto italic">
          "Every life leaves an imprint on the Aether. We are merely the cataloguers of these fleeting echoes."
        </p>
        <p className="text-[#8a7560] mt-2">— Archivist Torin</p>
        <hr className="gold-divider" />
      </header>

      <CharactersClient characters={characters} categories={categoriesList} />
    </div>
  );
}
