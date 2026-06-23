'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import Link from 'next/link';

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Load search index
    fetch('/data/search-index.json')
      .then(res => res.json())
      .then(data => {
        const fuseInstance = new Fuse(data, {
          keys: ['name', 'desc', 'type'],
          threshold: 0.3,
          includeScore: true
        });
        setFuse(fuseInstance);
      })
      .catch(err => console.error("Could not load search index", err));
      
    // Keyboard shortcut (Ctrl+K or Cmd+K)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query && fuse) {
      const searchResults = fuse.search(query).slice(0, 10).map(r => r.item);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="nav-ribbon flex items-center gap-2 text-[#8a7560]"
      >
        <span>🔍</span>
        <span>Search (Ctrl+K)</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-[#0d0a06]/90 backdrop-blur-sm">
      <div 
        className="fixed inset-0" 
        onClick={() => setIsOpen(false)}
      ></div>
      
      <div className="relative w-full max-w-2xl bg-[#1a1207] border border-[#c9a84c] rounded-lg shadow-[0_0_50px_rgba(201,168,76,0.2)] overflow-hidden">
        <div className="p-4 border-b border-[#8a7230]/30 flex items-center gap-4">
          <span className="text-2xl">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the archives..."
            className="w-full bg-transparent text-[#e8d5b7] text-xl outline-none placeholder-[#8a7560]"
            style={{ fontFamily: 'var(--font-heading)' }}
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-[#8a7560] hover:text-[#c41e3a] transition-colors p-2"
          >
            ✕
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query && results.length === 0 ? (
            <div className="p-8 text-center text-[#8a7560]">
              <p>No records found matching "{query}"</p>
            </div>
          ) : (
            <ul className="space-y-1">
              {results.map((result, idx) => (
                <li key={idx}>
                  <Link 
                    href={result.slug}
                    onClick={() => setIsOpen(false)}
                    className="block p-4 rounded hover:bg-[#2d1810] border border-transparent hover:border-[#8a7230]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {result.type === 'Character' ? '👤' : result.type === 'Event' ? '⏳' : '🗺️'}
                      </span>
                      <div>
                        <div className="text-[#f5e6d0] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                          {result.name}
                        </div>
                        <div className="text-sm text-[#8a7560] italic">
                          {result.type} • {result.desc}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          
          {!query && (
            <div className="p-8 text-center text-[#8a7560]">
              <p>Type to search characters, events, and regions.</p>
              <div className="mt-4 flex gap-2 justify-center">
                <span className="px-2 py-1 bg-[#2d1810] rounded text-xs border border-[#8a7230]/30">↑↓ to navigate</span>
                <span className="px-2 py-1 bg-[#2d1810] rounded text-xs border border-[#8a7230]/30">Enter to select</span>
                <span className="px-2 py-1 bg-[#2d1810] rounded text-xs border border-[#8a7230]/30">Esc to close</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
