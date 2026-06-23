'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const BOOKS = [
  {
    id: 'characters',
    title: 'Registry of Souls',
    color: '#8b1a1a',
    href: '/characters'
  },
  {
    id: 'timeline',
    title: 'Grand Chronology',
    color: '#2d5f8a',
    href: '/timeline'
  },
  {
    id: 'world',
    title: 'Atlas of Dimensions',
    color: '#228b22',
    href: '/world'
  },
  {
    id: 'connections',
    title: 'Web of Fates',
    color: '#4a2d7a',
    href: '/connections'
  },
  {
    id: 'glossary',
    title: 'Index of All Things',
    color: '#8a7230',
    href: '/glossary'
  }
];

export default function LibraryPage() {
  const router = useRouter();

  return (
    <div className="library-scene min-h-[calc(100vh-64px)] flex flex-col justify-end overflow-hidden pb-12">
      <div className="absolute top-1/4 w-full text-center pointer-events-none z-0">
        <h1 className="text-title text-6xl md:text-8xl mb-4 opacity-80 candle-glow">The Library of Eldrion</h1>
        <p className="text-[#c4a882] text-xl font-serif italic max-w-2xl mx-auto opacity-70">
          "Choose a tome, Archivist. The history of 13 Dimensions awaits."
        </p>
      </div>

      <div className="bookshelf w-full max-w-5xl mx-auto z-10">
        {BOOKS.map((book) => (
          <div 
            key={book.id}
            className="book-spine group"
            style={{ backgroundColor: book.color }}
            onClick={() => router.push(book.href)}
          >
            <div className="book-ribbs mt-4"></div>
            
            <div className="flex-grow flex items-center justify-center">
              <span className="book-spine-title group-hover:text-white transition-colors">
                {book.title}
              </span>
            </div>
            
            <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center mb-6">
              <span className="text-xs text-white/50 font-serif">I</span>
            </div>
            
            <div className="book-ribbs mb-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
