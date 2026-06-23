import { getEventBySlug, getEventSlugs } from '@/lib/lore-parser';
import { notFound } from 'next/navigation';
import BookViewer from '@/components/ui/BookViewer';

export async function generateStaticParams() {
  const events = await getEventSlugs();
  return events;
}

export async function generateMetadata({ params }) {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: 'Not Found' };
  return {
    title: `${event.name} | Timeline | The Codex of Eldrion`,
  };
}

export default async function TimelineEventDetail({ params }) {
  const event = await getEventBySlug(params.slug);
  
  if (!event) {
    notFound();
  }

  const attributes = [];
  if (event.category) attributes.push({ key: 'Category', value: event.categoryLabel });
  if (event.metadata && Object.keys(event.metadata).length > 0) {
    Object.entries(event.metadata).forEach(([k, v]) => {
      attributes.push({ key: k.charAt(0).toUpperCase() + k.slice(1), value: v });
    });
  }

  return (
    <BookViewer 
      title={event.name} 
      contentHtml={event.contentHtml} 
      attributes={attributes} 
    />
  );
}
