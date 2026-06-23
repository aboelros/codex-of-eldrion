import { getTimeline } from '@/lib/lore-parser';
import { ERAS } from '@/lib/constants';
import EventNode from '@/components/timeline/EventNode';
import EraDivider from '@/components/timeline/EraDivider';

export const metadata = {
  title: 'Grand Chronology | The Codex of Eldrion',
};

export default async function TimelinePage() {
  const events = await getTimeline();
  
  // Very rough era sorting based on category for prototype
  const erasWithEvents = ERAS.map(era => {
    let eraEvents = [];
    if (era.name.includes("Singularity")) eraEvents = events.filter(e => e.category === 'cosmogenesis');
    else if (era.name.includes("1st Holy War")) eraEvents = events.filter(e => e.category === 'primordial-beasts');
    else if (era.name.includes("2nd") || era.name.includes("3rd")) eraEvents = events.filter(e => e.category === 'holy-wars-1-3');
    else if (era.name.includes("4th")) eraEvents = events.filter(e => e.category === '4th-holy-war');
    else if (era.name.includes("Dark Age")) eraEvents = events.filter(e => e.category === 'dark-age-events');
    else eraEvents = events.filter(e => e.category === 'anomalies');
    
    return {
      ...era,
      events: eraEvents
    };
  }).filter(era => era.events.length > 0);

  return (
    <div className="grimoire-page">
      <header className="mb-12 text-center">
        <h1 className="text-title mb-4">The Grand Chronology</h1>
        <p className="text-[#c4a882] text-lg max-w-2xl mx-auto italic">
          "Time is not a river, but a shattered mirror. We collect the shards to see the whole."
        </p>
        <p className="text-[#8a7560] mt-2">— Archivist Torin</p>
      </header>

      <div className="relative max-w-5xl mx-auto py-12">
        {/* Main central timeline line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#8a7230]/40 to-transparent transform md:-translate-x-1/2 rounded-full"></div>

        {erasWithEvents.map((era, eraIndex) => (
          <div key={era.name}>
            <EraDivider era={era} />
            
            <div className="mt-8">
              {era.events.map((event, index) => (
                <EventNode key={event.slug} event={event} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
