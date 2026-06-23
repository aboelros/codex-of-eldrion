import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/grimoire-cover.png')",
            filter: "brightness(0.6) contrast(1.2)"
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0d0a06] via-transparent to-[#0d0a06]/80" />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <div className="border-y-2 border-[#8a7230] py-8 px-12 bg-[#0d0a06]/60 backdrop-blur-sm rounded-lg shadow-[0_0_50px_rgba(201,168,76,0.15)]">
            <h1 className="text-title mb-4 candle-glow">
              THE CODEX OF ELDRION
            </h1>
            <p className="text-xl md:text-2xl text-[#c4a882] italic mb-8" style={{ fontFamily: 'var(--font-body)' }}>
              A Complete Record of the 13 Dimensions
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-[#8a7560] uppercase tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>
              <span>Compiled by Archivist Torin</span>
              <span>•</span>
              <span>337 Entries</span>
              <span>•</span>
              <span>120,000 Years</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <a href="#contents" className="text-[#c9a84c] text-4xl hover:text-[#e6b422] transition-colors">
            ↓
          </a>
        </div>
      </section>

      {/* Table of Contents */}
      <section id="contents" className="py-24 relative">
        <div 
          className="absolute inset-0 z-0 opacity-10 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/images/backgrounds/library.png')" }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-chapter text-center mb-16">
            <span className="text-[#c9a84c]">~</span> Table of Contents <span className="text-[#c9a84c]">~</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/characters" className="lore-card group">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-section mb-2 group-hover:text-[#e6b422] transition-colors">The Registry of Souls</h3>
              <p className="text-body text-[#c4a882]">120 beings catalogued across 9 epochs. From the first Titan to the last Archivist.</p>
            </Link>

            <Link href="/timeline" className="lore-card group">
              <div className="text-4xl mb-4 text-[#4fc3f7]">⏳</div>
              <h3 className="text-section mb-2 group-hover:text-[#4fc3f7] transition-colors">The Grand Chronology</h3>
              <p className="text-body text-[#c4a882]">120,000 years of conflict, from the Archon-Chaos Collision to the Age of Silence.</p>
            </Link>

            <Link href="/world" className="lore-card group">
              <div className="text-4xl mb-4 text-[#228b22]">🗺️</div>
              <h3 className="text-section mb-2 group-hover:text-[#228b22] transition-colors">The Atlas of Dimensions</h3>
              <p className="text-body text-[#c4a882]">14 realms mapped, from the Platinum Throne to the Edge of Reality.</p>
            </Link>

            <Link href="/glossary" className="lore-card group">
              <div className="text-4xl mb-4 text-[#daa520]">📚</div>
              <h3 className="text-section mb-2 group-hover:text-[#daa520] transition-colors">The Index of All Things</h3>
              <p className="text-body text-[#c4a882]">A comprehensive alphabetical index of every name, term, and concept in the archive.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
