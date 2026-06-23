import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { CATEGORIES, DIMENSIONS } from './constants.js';

const LORE_DIR = path.resolve(process.cwd(), 'MAIN_LORE');

function toSlug(filename) {
  return filename.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function extractCrossReferences(content) {
  const refs = [];
  const regex = /\(see:\s*([^)]+)\.md\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    refs.push(toSlug(match[1]));
  }
  return refs;
}

export async function parseMarkdown(content) {
  const processed = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(content);
  
  let htmlString = processed.toString();
  
  // Custom transformations for grimoire theme
  htmlString = htmlString.replace(/<h2>([IVX]+)\.\s*(.*?)<\/h2>/g, '<h2 class="chapter-heading"><span class="chapter-numeral">$1</span> $2</h2>');
  htmlString = htmlString.replace(/<strong>(.*?)<\/strong>/g, '<strong class="lore-term">$1</strong>');
  htmlString = htmlString.replace(/\(see:\s*([^)]+)\.md\)/g, (match, p1) => `<a href="/search?q=${toSlug(p1)}" class="cross-ref">${p1.replace(/_/g, ' ')}</a>`);
  htmlString = htmlString.replace(/<hr>/g, '<hr class="gold-divider">');
  
  return htmlString;
}

function determineCategory(dirPath) {
  if (dirPath.includes('DB_PRE_KEVIN_01')) return 'titans'; // Will be refined later
  if (dirPath.includes('DB_PRE_KEVIN_02')) return 'demon-lords';
  if (dirPath.includes('DB_PRE_KEVIN_03')) return 'valkyries';
  if (dirPath.includes('DB_PRE_KEVIN_04')) return 'primordial-races';
  if (dirPath.includes('DB_PRE_KEVIN_05')) return 'seraphic-order';
  if (dirPath.includes('DB_PRE_KEVIN_06')) return 'war-heroes';
  if (dirPath.includes('DB_PRE_KEVIN_07')) return 'wardens';
  if (dirPath.includes('DB_PRE_KEVIN_08')) return 'dark-age';
  if (dirPath.includes('DB_PRE_KEVIN_09')) return 'legends';
  
  if (dirPath.includes('SYS_01')) return 'cosmogenesis';
  if (dirPath.includes('SYS_02')) return 'power-systems';
  if (dirPath.includes('SYS_03')) return 'primordial-beasts';
  if (dirPath.includes('SYS_04')) return 'holy-wars-1-3';
  if (dirPath.includes('SYS_05')) return '4th-holy-war';
  if (dirPath.includes('SYS_06')) return 'dark-age-events';
  if (dirPath.includes('SYS_08')) return 'anomalies';
  
  return 'unknown';
}

function parseCharacter(fileContent, filename, dirPath) {
  const lines = fileContent.split('\n');
  const nameLine = lines[0] || '';
  const nameParts = nameLine.replace(/^#\s*/, '').split(':');
  const name = nameParts[0] ? nameParts[0].trim() : filename.replace(/\.md$/, '');
  let epithet = nameParts[1] ? nameParts[1].trim() : '';

  if (!epithet) {
    const epithetLine = lines.find(l => l.startsWith('Epithet:'));
    if (epithetLine) epithet = epithetLine.replace('Epithet:', '').trim();
  }

  let category = determineCategory(dirPath);
  let fileNumber = parseInt(filename.split('_')[0]) || 999;
  
  if (category === 'titans' && fileNumber > 12) {
    category = 'monarchs';
  }
  if (category === 'demon-lords' && fileNumber < 27) {
    category = 'abyssal';
  }

  const sections = [];
  let currentSection = null;
  let archivistNote = '';
  const physicalAttributes = {};
  
  let inPhysical = false;
  let inArchivist = false;
  let rawContent = '';

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.match(/^(?:##?\s*)?(?:I[VX]|V?I{0,3})\.\s+(.*)/)) {
      inPhysical = false;
      const match = line.match(/^(?:##?\s*)?(?:I[VX]|V?I{0,3})\.\s+(.*)/);
      currentSection = { title: match[1], content: [] };
      sections.push(currentSection);
      continue;
    }

    if (line.match(/Physical Attributes/i)) {
      inPhysical = true;
      currentSection = null;
      continue;
    }

    if (line.match(/Archivist Note:/i) || line.match(/Footnotes from the Archivist/i)) {
      inPhysical = false;
      inArchivist = true;
      currentSection = null;
      continue;
    }

    if (inPhysical && line.startsWith('-')) {
      const parts = line.replace(/^-/, '').split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim().toLowerCase().replace(/\s+/g, '');
        const val = parts.slice(1).join(':').trim();
        physicalAttributes[key] = val;
      }
    } else if (inArchivist) {
      archivistNote += line + '\n';
    } else if (currentSection) {
      currentSection.content.push(line);
      rawContent += line + '\n';
    } else {
      rawContent += line + '\n';
    }
  }

  return {
    slug: toSlug(filename),
    fileNumber,
    name,
    epithet,
    category,
    categoryLabel: CATEGORIES[category]?.label || 'Unknown',
    format: 'character',
    sections: sections.map(s => ({ title: s.title, content: s.content.join('\n') })),
    physicalAttributes,
    archivistNote: archivistNote.trim().replace(/^"|"$/g, ''),
    crossReferences: extractCrossReferences(fileContent),
    rawContent,
    sourceFile: path.join(dirPath, filename).replace(LORE_DIR, '')
  };
}

function parseSystem(fileContent, filename, dirPath) {
  const lines = fileContent.split('\n');
  const nameLine = lines[0] || '';
  const name = nameLine.replace(/^#?\s*\d*\.?\s*/, '').trim() || filename.replace(/\.md$/, '');
  
  let metadata = {};
  const classLine = lines.find(l => l.startsWith('Classification:'));
  if (classLine) {
    const parts = classLine.replace('Classification:', '').split('|');
    parts.forEach(p => {
      const [k, v] = p.split(':');
      if (v) metadata[k.trim().toLowerCase()] = v.trim();
      else if (k.includes('Status')) metadata.status = p.replace('Status', '').trim();
      else metadata.classification = p.trim();
    });
  }

  const category = determineCategory(dirPath);
  const fileNumber = parseInt(filename.split('_')[0]) || 999;
  const rawContent = fileContent.replace(nameLine, '').replace(classLine || '', '');

  return {
    slug: toSlug(filename),
    fileNumber,
    name,
    metadata,
    category,
    categoryLabel: CATEGORIES[category]?.label || 'Unknown',
    format: 'system',
    rawContent,
    crossReferences: extractCrossReferences(fileContent),
    sourceFile: path.join(dirPath, filename).replace(LORE_DIR, '')
  };
}

function parseRegion(fileContent, filename, dirPath) {
  const lines = fileContent.split('\n');
  const nameLine = lines[0] || '';
  const name = nameLine.replace(/^#?\s*\d*\.?\s*/, '').trim() || filename.replace(/\.md$/, '');
  
  const descLine = lines.find(l => l.startsWith('Description:'));
  const description = descLine ? descLine.replace('Description:', '').trim() : '';
  
  const dimensionFolder = path.basename(dirPath);
  const dimensionNumber = parseInt(dimensionFolder.split('_')[0]) || 0;
  
  const regionNumber = parseInt(filename.split('_')[0]) || 999;

  return {
    slug: toSlug(filename),
    regionNumber,
    name,
    description,
    dimension: dimensionFolder,
    dimensionNumber,
    format: 'region',
    rawContent: fileContent.replace(nameLine, '').replace(descLine || '', ''),
    crossReferences: extractCrossReferences(fileContent),
    sourceFile: path.join(dirPath, filename).replace(LORE_DIR, '')
  };
}

let cache = null;

async function loadAllLore() {
  if (cache) return cache;
  
  const characters = [];
  const events = [];
  const regions = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (fullPath.includes('DB_PRE_KEVIN')) {
          characters.push(parseCharacter(content, file, path.dirname(fullPath)));
        } else if (fullPath.includes('SYS_')) {
          events.push(parseSystem(content, file, path.dirname(fullPath)));
        } else if (fullPath.includes('map_regions')) {
          regions.push(parseRegion(content, file, path.dirname(fullPath)));
        }
      }
    }
  }

  walk(path.join(LORE_DIR, 'lore'));
  walk(path.join(LORE_DIR, 'map_regions'));

  // Pre-render HTML for all to save time
  for (const c of characters) c.contentHtml = await parseMarkdown(c.rawContent);
  for (const e of events) e.contentHtml = await parseMarkdown(e.rawContent);
  for (const r of regions) r.contentHtml = await parseMarkdown(r.rawContent);

  characters.sort((a, b) => a.fileNumber - b.fileNumber);
  events.sort((a, b) => a.fileNumber - b.fileNumber);
  regions.sort((a, b) => a.dimensionNumber - b.dimensionNumber || a.regionNumber - b.regionNumber);

  cache = { characters, events, regions };
  return cache;
}

export async function getAllCharacters() {
  const { characters } = await loadAllLore();
  return characters;
}

export async function getCharacterBySlug(slug) {
  const { characters } = await loadAllLore();
  return characters.find(c => c.slug === slug);
}

export async function getCharacterSlugs() {
  const { characters } = await loadAllLore();
  return characters.map(c => ({ slug: c.slug }));
}

export async function getAllEvents() {
  const { events } = await loadAllLore();
  return events;
}

export async function getEventBySlug(slug) {
  const { events } = await loadAllLore();
  return events.find(e => e.slug === slug);
}

export async function getEventSlugs() {
  const { events } = await loadAllLore();
  return events.map(e => ({ slug: e.slug }));
}

export async function getAllRegions() {
  const { regions } = await loadAllLore();
  return regions;
}

export async function getRegionsByDimension(dimFolder) {
  const { regions } = await loadAllLore();
  return regions.filter(r => r.dimension === dimFolder || toSlug(r.dimension) === toSlug(dimFolder));
}

export async function getRegionBySlug(dimSlug, regionSlug) {
  const { regions } = await loadAllLore();
  return regions.find(r => toSlug(r.dimension) === dimSlug && r.slug === regionSlug);
}

export async function getDimensions() {
  return DIMENSIONS;
}

export async function getDimensionSlugs() {
  return DIMENSIONS.map(d => ({ dimension: d.slug }));
}

export async function getRegionSlugs() {
  const { regions } = await loadAllLore();
  return regions.map(r => ({ dimension: toSlug(r.dimension), region: r.slug }));
}

export async function getGlossary() {
  const { characters, events, regions } = await loadAllLore();
  const all = [
    ...characters.map(c => ({ name: c.name, type: 'Character', slug: '/characters/'+c.slug, desc: c.epithet })),
    ...events.map(e => ({ name: e.name, type: 'Event', slug: '/timeline/'+e.slug, desc: e.categoryLabel })),
    ...regions.map(r => ({ name: r.name, type: 'Region', slug: '/world/'+toSlug(r.dimension)+'/'+r.slug, desc: r.description }))
  ];
  return all.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getTimeline() {
  const { events } = await loadAllLore();
  // Simplified timeline extraction for now
  return events;
}
