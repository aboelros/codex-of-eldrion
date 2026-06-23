import { generateSearchIndex } from '../lib/search-index.js';

console.log('Generating search index...');
generateSearchIndex()
  .then((index) => {
    console.log(`Generated search index with ${index.length} entries.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error generating search index:', err);
    process.exit(1);
  });
