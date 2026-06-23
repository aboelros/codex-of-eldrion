export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#8a7230]/30 bg-[#0d0a06]/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <p className="text-[#c9a84c] text-xl" style={{ fontFamily: 'var(--font-display)' }}>
            The Codex of Eldrion
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto archivist-note">
          <p className="mb-4">
            Compiled and preserved by Torin the Archivist, under peril of erasure.
          </p>
          <p className="text-sm">
            This archive contains 337 entries across 14 dimensions, cataloguing 120,000 years of history.
          </p>
        </div>
        
        <hr className="gold-divider max-w-xs mx-auto mt-8" />
      </div>
    </footer>
  );
}
