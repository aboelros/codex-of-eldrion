import fs from 'fs';
import path from 'path';
import { getGlossary } from './lore-parser.js';

export async function generateSearchIndex() {
  const glossary = await getGlossary();
  
  const index = glossary.map(item => ({
    name: item.name,
    type: item.type,
    desc: item.desc,
    slug: item.slug
  }));

  const dir = path.join(process.cwd(), 'public', 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(dir, 'search-index.json'), JSON.stringify(index));
  return index;
}
