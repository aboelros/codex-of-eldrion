'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Dynamically import HTMLFlipBook to avoid SSR issues with canvas/DOM
const HTMLFlipBook = dynamic(() => import('react-pageflip'), { ssr: false });

// Page component must use forwardRef for react-pageflip to inject DOM refs
const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref} data-density="hard">
      <div className="page-content prose max-w-none">
        {props.children}
      </div>
    </div>
  );
});

Page.displayName = 'Page';

export default function BookViewer({ title, contentHtml, attributes = [] }) {
  const router = useRouter();
  const [dimensions, setDimensions] = useState({ width: 500, height: 700 });

  useEffect(() => {
    // Simple responsive adjustment
    const updateSize = () => {
      if (window.innerWidth < 1024) {
        setDimensions({ width: window.innerWidth - 40, height: window.innerHeight - 200 });
      } else {
        setDimensions({ width: 500, height: 700 });
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center backdrop-blur-md">
      <div className="absolute top-8 left-8">
        <button 
          onClick={() => router.back()}
          className="text-[#c9a84c] border border-[#c9a84c] px-4 py-2 rounded hover:bg-[#c9a84c] hover:text-black transition-colors font-serif"
        >
          Close Book
        </button>
      </div>
      
      <div className="text-[#c9a84c] mb-6 font-serif text-2xl candle-glow text-center">
        {title}
      </div>

      <div className="book-pages-wrapper relative">
        <HTMLFlipBook 
          width={dimensions.width} 
          height={dimensions.height} 
          size="stretch"
          minWidth={300}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          showCover={true}
          mobileScrollSupport={true}
          className="flip-book"
        >
          {/* Cover Page */}
          <Page>
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h1 className="text-4xl font-serif text-[#8b1a1a] mb-8 mt-12">{title}</h1>
              <div className="w-24 h-1 bg-[#8b1a1a] mx-auto mb-8"></div>
              {attributes.length > 0 && (
                <div className="text-left mt-8 mx-auto border border-[#8b1a1a]/30 p-6 bg-black/5">
                  <h3 className="text-xl font-bold mb-4">Physical Attributes</h3>
                  <ul className="space-y-2">
                    {attributes.map((attr, idx) => (
                      <li key={idx} className="text-sm">
                        <strong className="text-[#8b1a1a]">{attr.key}:</strong> {attr.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Page>

          {/* Content Page (To make it robust with long text, we simulate pages. For now, we inject into one scrollable page since HTMLFlipBook requires manual chunking if text exceeds page length) */}
          <Page>
             <div 
               dangerouslySetInnerHTML={{ __html: contentHtml }} 
               className="pb-20"
             />
          </Page>

          {/* Back Cover */}
          <Page>
            <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
              <p>End of Record.</p>
            </div>
          </Page>
        </HTMLFlipBook>
      </div>
    </div>
  );
}
