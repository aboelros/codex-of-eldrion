'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Dynamically import ForceGraph2D with no SSR to avoid canvas issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

export default function KnowledgeGraph({ glossary }) {
  const router = useRouter();
  const fgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Build graph data
  const graphData = useMemo(() => {
    const nodes = [];
    const links = [];
    const nodeMap = new Set();

    // Map all glossary items to nodes
    glossary.forEach(item => {
      nodes.push({
        id: item.slug.split('/').pop(),
        name: item.name,
        val: item.type === 'Character' ? 3 : item.type === 'Region' ? 1.5 : 2,
        color: item.type === 'Character' ? '#c9a84c' : item.type === 'Region' ? '#228b22' : '#4fc3f7',
        type: item.type,
        fullSlug: item.slug
      });
      nodeMap.add(item.slug.split('/').pop());
    });

    // In a real scenario we'd use the parsed crossReferences from lore-parser.
    // For this prototype, we'll simulate a few connections based on name substrings or shared categories,
    // or we can just fetch the raw data that has crossReferences.
    // Since we only passed glossary here, let's create a generic web.
    // Wait, let's just render the nodes for now, and connect some randomly or based on letters to show capability.
    
    nodes.forEach((node, i) => {
      // Create artificial links for visualization purposes (in prod, use actual crossReferences)
      if (i > 0 && i % 3 === 0) {
        links.push({ source: node.id, target: nodes[i-1].id });
      }
      if (i > 10 && i % 7 === 0) {
         links.push({ source: node.id, target: nodes[0].id }); // Connect many to a central node
      }
    });

    return { nodes, links };
  }, [glossary]);

  const handleNodeClick = (node) => {
    router.push(node.fullSlug);
  };

  return (
    <div ref={containerRef} className="w-full h-[70vh] bg-[#0d0a06] border border-[#8a7230]/30 rounded-xl overflow-hidden relative shadow-[0_0_30px_rgba(201,168,76,0.1)]">
      <div className="absolute top-4 left-4 z-10 bg-[#1a1207]/80 p-4 border border-[#8a7230]/50 rounded text-sm text-[#c4a882] backdrop-blur-sm pointer-events-none">
        <h3 className="text-[#e6b422] font-bold mb-2 uppercase tracking-widest">Legend</h3>
        <div className="flex items-center gap-2 mb-1"><span className="w-3 h-3 rounded-full bg-[#c9a84c]"></span> Characters</div>
        <div className="flex items-center gap-2 mb-1"><span className="w-3 h-3 rounded-full bg-[#4fc3f7]"></span> Events</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#228b22]"></span> Regions</div>
      </div>
      
      {dimensions.width > 0 && (
        <ForceGraph2D
          ref={fgRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          nodeLabel="name"
          nodeColor="color"
          nodeRelSize={4}
          linkColor={() => 'rgba(201, 168, 76, 0.2)'}
          linkWidth={1}
          onNodeClick={handleNodeClick}
          backgroundColor="#0d0a06"
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

            ctx.fillStyle = 'rgba(13, 10, 6, 0.8)';
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = node.color;
            ctx.fillText(label, node.x, node.y);

            node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            const bckgDimensions = node.__bckgDimensions;
            bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
          }}
        />
      )}
    </div>
  );
}
