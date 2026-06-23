export default function EraDivider({ era }) {
  return (
    <div className="relative flex items-center justify-center my-16 w-full">
      <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#8a7230]/50 to-transparent"></div>
      
      <div className="relative z-10 px-8 py-3 bg-[#0d0a06] border border-[#8a7230] rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)]">
        <div className="text-center">
          <h2 className="text-xl font-bold uppercase tracking-widest" style={{ color: era.color, fontFamily: 'var(--font-heading)' }}>
            {era.name}
          </h2>
          <p className="text-xs text-[#8a7560] mt-1 font-mono tracking-wider">
            {era.yearStart} {era.yearEnd !== 0 ? `→ ${era.yearEnd}` : '→ Present'}
          </p>
        </div>
      </div>
    </div>
  );
}
