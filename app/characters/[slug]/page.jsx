import { getCharacterBySlug, getCharacterSlugs } from '@/lib/lore-parser';
import { notFound } from 'next/navigation';
import BookViewer from '@/components/ui/BookViewer';

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

  const attributes = Object.entries(character.physicalAttributes).map(([key, value]) => ({
    key: key.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase()),
    value: value
  }));

  return (
    <BookViewer 
      title={character.name} 
      contentHtml={character.contentHtml} 
      attributes={attributes} 
    />
  );
}
