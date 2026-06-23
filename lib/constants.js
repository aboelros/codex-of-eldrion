export const CATEGORIES = {
  titans: { label: "Titans", icon: "⚡", color: "var(--cat-titans)", description: "The 12 living laws of physics" },
  monarchs: { label: "Monarchs", icon: "👑", color: "var(--cat-monarchs)", description: "The 12 False Gods" },
  valkyries: { label: "Valkyries", icon: "⚔️", color: "var(--cat-valkyries)", description: "Weapons of Will" },
  "demon-lords": { label: "Demon Lords", icon: "🔥", color: "var(--cat-demons)", description: "Born from Abyssal corruption" },
  "primordial-races": { label: "Primordial Races", icon: "🌍", color: "var(--cat-races)", description: "The 10 original species" },
  "seraphic-order": { label: "Seraphic Order", icon: "✦", color: "var(--cat-seraphic)", description: "Emotionless enforcers of divine law" },
  "war-heroes": { label: "4th War Heroes", icon: "🛡️", color: "var(--cat-heroes)", description: "The Hybrid King's coalition" },
  wardens: { label: "Dimensional Wardens", icon: "🗝️", color: "var(--cat-wardens)", description: "Rulers of the 11 dimensions" },
  "dark-age": { label: "Dark Age Resistance", icon: "🕯️", color: "var(--cat-darkage)", description: "Heroes fighting Seraphic tyranny" },
  legends: { label: "Ancient Legends", icon: "📜", color: "var(--cat-legends)", description: "Historical figures of myth" },
  abyssal: { label: "Abyssal Entities", icon: "🌌", color: "var(--cat-demons)", description: "Entities of the Abyss" },
  cosmogenesis: { label: "Cosmogenesis & Physics", icon: "🌌", color: "var(--cat-cosmogenesis)", description: "Origin of the universe" },
  "power-systems": { label: "Power Systems", icon: "🔮", color: "var(--cat-power-systems)", description: "Magic and covenants" },
  "primordial-beasts": { label: "Primordial Beasts", icon: "🐉", color: "var(--cat-primordial-beasts)", description: "Cosmic creatures" },
  "holy-wars-1-3": { label: "Holy Wars 1-3", icon: "⚔️", color: "var(--cat-holy-wars)", description: "The Ancient Clashes" },
  "4th-holy-war": { label: "4th Holy War", icon: "⚔️", color: "var(--cat-holy-wars)", description: "Apex Rebellion" },
  "dark-age-events": { label: "The Dark Age", icon: "🌑", color: "var(--cat-darkage)", description: "Current Era" },
  anomalies: { label: "Historical Anomalies", icon: "🕰️", color: "var(--cat-anomalies)", description: "Events and Timeline" },
};

export const DIMENSIONS = [
  {
    id: 0, folder: "00_Realm_0_The_Divine_Apex", slug: "00_realm_0_the_divine_apex",
    name: "The Divine Apex", shortName: "Realm 0",
    color: "#ffd700", accentColor: "#ffffff",
    atmosphere: "Blinding white light, frictionless vacuum, absolute order",
    warden: null,
    regionCount: 8
  },
  {
    id: 1, folder: "01_The_1st_Dimension", slug: "01_the_1st_dimension",
    name: "The 1st Dimension", shortName: "1st Dimension",
    color: "#8b4513", accentColor: "#cd853f",
    atmosphere: "Industrial oppression, iron cities, smog-choked skies",
    warden: "Warden Aethelgard",
    regionCount: 7
  },
  {
    id: 2, folder: "02_The_2nd_Dimension", slug: "02_the_2nd_dimension",
    name: "The 2nd Dimension", shortName: "2nd Dimension",
    color: "#a0522d", accentColor: "#d2691e",
    atmosphere: "Molten heat, metallic wastes, scrap peaks",
    warden: "Warden Bors",
    regionCount: 7
  },
  {
    id: 3, folder: "03_The_3rd_Dimension", slug: "03_the_3rd_dimension",
    name: "The 3rd Dimension", shortName: "3rd Dimension",
    color: "#556b2f", accentColor: "#8fbc8f",
    atmosphere: "Overgrown flora, toxic swamps, forgotten ruins",
    warden: "Warden Cylia",
    regionCount: 7
  },
  {
    id: 4, folder: "04_The_4th_Dimension", slug: "04_the_4th_dimension",
    name: "The 4th Dimension", shortName: "4th Dimension",
    color: "#4682b4", accentColor: "#87ceeb",
    atmosphere: "Gravity anomalies, floating islands, endless seas",
    warden: "Warden Draven",
    regionCount: 7
  },
  {
    id: 5, folder: "05_The_5th_Dimension", slug: "05_the_5th_dimension",
    name: "The 5th Dimension", shortName: "5th Dimension",
    color: "#8b008b", accentColor: "#da70d6",
    atmosphere: "Crystalline structures, echoing canyons, acoustic storms",
    warden: "Warden Eryndor",
    regionCount: 7
  },
  {
    id: 6, folder: "06_The_6th_Dimension", slug: "06_the_6th_dimension",
    name: "The 6th Dimension", shortName: "6th Dimension",
    color: "#2f4f4f", accentColor: "#708090",
    atmosphere: "Perpetual twilight, shadow spires, illusionary forests",
    warden: "Warden Faelan",
    regionCount: 7
  },
  {
    id: 7, folder: "07_The_7th_Dimension", slug: "07_the_7th_dimension",
    name: "The 7th Dimension", shortName: "7th Dimension",
    color: "#800000", accentColor: "#cd5c5c",
    atmosphere: "Ash storms, blood rivers, skeletal remains",
    warden: "Warden Garrick",
    regionCount: 7
  },
  {
    id: 8, folder: "08_The_8th_Dimension", slug: "08_the_8th_dimension",
    name: "The 8th Dimension", shortName: "8th Dimension",
    color: "#483d8b", accentColor: "#6a5acd",
    atmosphere: "Temporal distortions, frozen moments, shattered clocks",
    warden: "Warden Hesperia",
    regionCount: 7
  },
  {
    id: 9, folder: "09_The_9th_Dimension", slug: "09_the_9th_dimension",
    name: "The 9th Dimension", shortName: "9th Dimension",
    color: "#008080", accentColor: "#20b2aa",
    atmosphere: "Bioluminescent caves, deep underwater trenches, silent cold",
    warden: "Warden Iskandar",
    regionCount: 7
  },
  {
    id: 10, folder: "10_The_10th_Dimension", slug: "10_the_10th_dimension",
    name: "The 10th Dimension", shortName: "10th Dimension",
    color: "#b8860b", accentColor: "#eee8aa",
    atmosphere: "Desert wastes, searing heat, mirages",
    warden: "Warden Jael",
    regionCount: 7
  },
  {
    id: 11, folder: "11_The_11th_Dimension", slug: "11_the_11th_dimension",
    name: "The 11th Dimension", shortName: "11th Dimension",
    color: "#696969", accentColor: "#a9a9a9",
    atmosphere: "Ruined cities, gray snow, absolute bleakness",
    warden: "Warden Kael",
    regionCount: 7
  },
  {
    id: 12, folder: "12_The_Abyss", slug: "12_the_abyss",
    name: "The Abyss", shortName: "The Abyss",
    color: "#1a0a2e", accentColor: "#8b0000",
    atmosphere: "Entropic chaos, corrupted Aether, demonic horrors",
    warden: null,
    regionCount: 10
  },
  {
    id: 13, folder: "13_The_Primordial_Wilds", slug: "13_the_primordial_wilds",
    name: "The Primordial Wilds", shortName: "Primordial Wilds",
    color: "#006400", accentColor: "#00ff7f",
    atmosphere: "Untamed raw Aether, primordial beasts, reality instabilities",
    warden: null,
    regionCount: 5
  }
];

export const ERAS = [
  { name: "The Primeval Singularity", yearStart: 120000, yearEnd: 90000, color: "var(--gold-bright)" },
  { name: "1st Holy War (Titanomachy)", yearStart: 90000, yearEnd: 60000, color: "var(--blood-bright)" },
  { name: "2nd Holy War (Abyssal Incursion)", yearStart: 60000, yearEnd: 30000, color: "var(--void-purple)" },
  { name: "3rd Holy War (Celestial Schism)", yearStart: 30000, yearEnd: 5000, color: "var(--celestial-white)" },
  { name: "4th Holy War (Apex Rebellion)", yearStart: 5000, yearEnd: 4900, color: "var(--cat-heroes)" },
  { name: "The Dark Age", yearStart: 4900, yearEnd: 0, color: "var(--cat-darkage)" },
  { name: "The Age of Kevin", yearStart: 0, yearEnd: -1000, color: "var(--aether-cyan)" }
];
