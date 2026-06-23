'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterCard from '@/components/characters/CharacterCard';
import CategoryFilter from '@/components/characters/CategoryFilter';

export default function CharactersClient({ characters, categories }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCharacters = activeCategory === 'all' 
    ? characters 
    : characters.filter(c => c.category === activeCategory);

  return (
    <div>
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredCharacters.map(character => (
            <motion.div
              key={character.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <CharacterCard character={character} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredCharacters.length === 0 && (
        <div className="text-center py-20 text-[#8a7560]">
          <p>No records found in this category.</p>
        </div>
      )}
    </div>
  );
}
