import { getTimeline } from '@/lib/lore-parser';
import Link from 'next/link';

export const metadata = {
  title: 'Grand Chronology | Library of Eldrion',
  description: 'The timeline of events across epochs.',
};

export default async function TimelineLibrary() {
  const events = await getTimeline();

  // Group events by Category/Era to form shelves
  const shelves = events.reduce((acc, event) => {
    const groupName = event.categoryLabel || 'Unknown Epoch';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(event);
    return acc;
  }, {});

  return (
    <div className="library-aisle">
      <div className="text-center mb-16 pt-8">
        <h1 className="text-title text-5xl md:text-7xl candle-glow">The Grand Chronology</h1>
        <p className="text-[#c4a882] mt-4 font-serif text-xl opacity-80 italic max-w-2xl mx-auto">
          "Time is not a river, but an ocean. Here lie the ripples."
        </p>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12">
        {Object.entries(shelves).map(([category, evts], i) => (
          <div key={category} className="shelf-row">
            <div className="shelf-label">{category}</div>
            {evts.map((evt) => (
              <Link key={evt.slug} href={`/timeline/${evt.slug}`}>
                <div 
                  className="thin-spine"
                  style={{ backgroundColor: `var(--cat-${evt.category})` }}
                  title={`${evt.name}`}
                >
                  <div className="thin-ribbs mt-2"></div>
                  
                  <div className="flex-grow flex items-center justify-center relative overflow-hidden">
                    <span className="thin-spine-title">
                      {evt.name}
                    </span>
                  </div>
                  
                  <div className="thin-spine-number">
                    {evt.fileNumber}
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
