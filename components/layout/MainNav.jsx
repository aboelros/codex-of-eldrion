'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchModal from '@/components/search/SearchModal';

export default function MainNav() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'The Codex', icon: '📖' },
    { href: '/characters/', label: 'Registry of Souls', icon: '👤' },
    { href: '/timeline/', label: 'Grand Chronology', icon: '⏳' },
    { href: '/world/', label: 'Atlas of Dimensions', icon: '🗺️' },
    { href: '/connections/', label: 'Web of Fates', icon: '🕸️' },
    { href: '/glossary/', label: 'Index', icon: '📚' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1a1207]/90 backdrop-blur-md border-b border-[#8a7230]/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-[#e6b422]" style={{ fontFamily: 'var(--font-display)' }}>
              The Codex of Eldrion
            </Link>
          </div>
          <nav className="hidden md:flex space-x-1">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-ribbon flex items-center gap-2"
                  data-active={isActive}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <SearchModal />
          </nav>
        </div>
      </div>
    </header>
  );
}
