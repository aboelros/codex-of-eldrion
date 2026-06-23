import Link from 'next/link';

export default function EventNode({ event, index }) {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex items-center justify-between md:justify-normal w-full mb-12 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Timeline line marker */}
      <div className="absolute left-8 md:left-1/2 w-8 h-8 rounded-full bg-[#0d0a06] border-4 border-[#c9a84c] transform -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(201,168,76,0.5)]">
        <div className="w-2 h-2 bg-[#e6b422] rounded-full"></div>
      </div>
      
      {/* Desktop spacer */}
      <div className="hidden md:block w-5/12"></div>
      
      {/* Content Card */}
      <div className={`w-full pl-20 md:pl-0 md:w-5/12 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <Link href={`/timeline/${event.slug}`} className="block">
          <div className="lore-card group hover:scale-[1.02] transition-transform">
            <div className={`flex flex-col ${isEven ? 'md:items-end' : ''} mb-2`}>
              <span 
                className="category-badge mb-3"
                style={{ color: 'var(--text-primary)', borderColor: 'currentColor', backgroundColor: 'var(--cat-' + event.category + ')' }}
              >
                {event.categoryLabel}
              </span>
              <h3 className="text-xl text-[#f5e6d0] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                {event.name}
              </h3>
            </div>
            
            <p className="text-sm text-[#8a7560] line-clamp-3 mt-2 text-left">
              {/* Extracting first paragraph from rawContent would be better here, using generic desc for now */}
              Click to read the full archival record of this event.
            </p>
            
            <div className={`mt-4 text-[#c9a84c] text-sm flex items-center gap-2 ${isEven ? 'md:justify-end' : ''}`}>
              <span className="group-hover:translate-x-1 transition-transform">Read Record &rarr;</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
