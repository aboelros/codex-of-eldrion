import { getEventBySlug, getEventSlugs } from '@/lib/lore-parser';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs;
}

export async function generateMetadata({ params }) {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: 'Not Found' };
  return {
    title: `${event.name} | The Codex of Eldrion`,
    description: `Chronological record: ${event.name}`,
  };
}

export default async function EventDetail({ params }) {
  const event = await getEventBySlug(params.slug);
  
  if (!event) {
    notFound();
  }

  return (
    <div className="grimoire-page">
      <Link href="/timeline" className="inline-block mb-8 text-[#8a7560] hover:text-[#c9a84c] transition-colors">
        &larr; Return to Chronology
      </Link>

      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <span 
              className="category-badge" 
              style={{ color: 'var(--text-primary)', borderColor: 'currentColor', backgroundColor: 'var(--cat-' + event.category + ')' }}
            >
              {event.categoryLabel}
            </span>
            <span className="text-[#8a7560]">Chronicle #{event.fileNumber}</span>
          </div>
          <h1 className="text-title mb-8">{event.name}</h1>
          <hr className="gold-divider" />
        </header>

        {Object.keys(event.metadata || {}).length > 0 && (
          <div className="lore-card mb-12 flex flex-wrap justify-center gap-8 text-center bg-[#1a1207]/50 border-[#c9a84c]/20">
            {Object.entries(event.metadata).map(([key, val]) => (
              <div key={key}>
                <span className="block text-xs uppercase tracking-widest text-[#8a7560] mb-1">{key}</span>
                <span className="text-[#c4a882] font-medium" style={{ fontFamily: 'var(--font-heading)' }}>{val}</span>
              </div>
            ))}
          </div>
        )}

        <div 
          className="text-body prose-parchment" 
          dangerouslySetInnerHTML={{ __html: event.contentHtml }} 
        />

        {event.crossReferences && event.crossReferences.length > 0 && (
          <div className="mt-16 pt-8 border-t border-[#8a7230]/30">
            <h3 className="text-2xl text-[#f5e6d0] font-bold mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
              Connected Archives
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {event.crossReferences.map(ref => (
                <Link key={ref} href={`/search?q=${ref}`} className="lore-card px-4 py-2 hover:border-[#c9a84c] transition-colors text-sm">
                  {ref.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
