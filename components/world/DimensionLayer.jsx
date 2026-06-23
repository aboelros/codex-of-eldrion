import Link from 'next/link';

export default function DimensionLayer({ dimension }) {
  return (
    <Link href={`/world/${dimension.slug}`} className="block relative group my-4 perspective-1000">
      <div 
        className="w-full py-8 px-12 rounded-xl transition-all duration-500 transform border border-transparent shadow-lg"
        style={{ 
          backgroundColor: `${dimension.color}30`, 
          backdropFilter: 'blur(10px)',
          borderColor: `${dimension.accentColor}50`
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <div className="text-4xl font-bold opacity-30" style={{ color: dimension.accentColor }}>
              {dimension.id.toString().padStart(2, '0')}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 origin-left transition-transform" style={{ color: dimension.accentColor, fontFamily: 'var(--font-heading)' }}>
                {dimension.name}
              </h3>
              <p className="text-sm text-[#e8d5b7]/80 max-w-md italic">{dimension.atmosphere}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 text-sm text-[#e8d5b7]/60">
            {dimension.warden && (
              <span className="bg-black/30 px-3 py-1 rounded-full border border-white/10">
                Rule: {dimension.warden}
              </span>
            )}
            <span className="bg-black/30 px-3 py-1 rounded-full border border-white/10">
              {dimension.regionCount} Regions
            </span>
          </div>
        </div>

        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 40px ${dimension.accentColor}40` }}
        ></div>
      </div>
    </Link>
  );
}
