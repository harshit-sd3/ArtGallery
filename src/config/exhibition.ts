export type WallFinish = 'plaster' | 'concrete' | 'limewash' | 'slate';

export type WallConfig = {
  color: string;
  finish: string;
  imageSrc?: string;
  roughness: number;
  imageAspectRatio?: number;
};

export type StationConfig = {
  artist?: string;
  caption?: string;
  color: string;
  imageSrc?: string;
  imageAspectRatio?: number;
  position: number;
  title?: string;
  wall: WallConfig;
  year?: number;
};

export type ExhibitionConfig = {
  count: number;
  spacing: number;
  surfaceResolution: number;
  stations: StationConfig[];
};

const starterStations: StationConfig[] = [
  ['The Sun in Judgement', 'Anonymous', 2021, '#6e9ea5', '#000080'],
  ['A Circle of Orange', 'Jonas Reed', 2019, '#bf8063', '#2e8b57'],
  // Space 3: deep blue wall.
  ['The Anatomist', 'Arthur', 2024, '#d4b46e', '#00008B'],
  ['A Single Bloom', 'Elias Chen', 2020, '#758d77', '#ece4f6'],
  // Space 5: title given in Round 3.
  ['yellow rose', 'Unattributed', 2022, '#bf00ff', '#efeee8'],
  ['Chicken Jockey', 'Jonas Reed', 2018, '#8796ad', '#1F4E79'],
  ['the quiet garden', 'Nadia Okafor', 2023, '#d59b58', '#f5f0e6'],
  ['Small Weather', 'Elias Chen', 2021, '#6f8d83', '#191970'],
  ['Personal Magnetism', 'Mara Velez', 2020, '#b77565', '#e7e1f0'],
  ['The Magnetic Man', 'Anonymous', 1901, '#c1a872', '#1F3A5F'],
  ['Blue Orchard', 'Nadia Okafor', 2019, '#688c92', '#f4f1e8'],
  ['Garden of Eden', 'Christopher Switzer', 2024, '#b9815e', '#7851A9'],
  ['Halfway Home', 'Mara Velez', 2018, '#7d927e', '#eeeae2'],
  // Space 14: retitled, with a curatorial caption below.
  ['Mohaid Ahmed Art Work', 'Jonas Reed', 2023, '#c59c72', '#f8f3ea'],
  ['Near the Water', 'Nadia Okafor', 2021, '#698a9d', '#edece6'],
  ['Quiet Assembly', 'Elias Chen', 2022, '#bd785f', '#f9f7f1'],
  ['The Last Apricot', 'Mara Velez', 2024, '#d29a60', '#f1eee7'],
  ['Outside, Slowly', 'Jonas Reed', 2020, '#758c81', '#e8e9e3'],
  ['Noon Study', 'Nadia Okafor', 2018, '#c28169', '#f4f5f0'],
  ['Soft Landing', 'Elias Chen', 2023, '#8194aa', '#ecebe4'],
  ['A Small Distance', 'Mara Velez', 2019, '#c3a46b', '#fffaf2'],
  ['Open Air', 'Jonas Reed', 2021, '#6b9292', '#efede6'],
  ['Things in Balance', 'Nadia Okafor', 2022, '#c27860', '#f6f2e9'],
  ['Evening, Again', 'Elias Chen', 2020, '#839178', '#e9e8e2'],
  ['First Light', 'Mara Velez', 2025, '#72919a', '#f7f6f2'],
].map(([title, artist, year, color, wallColor], position) => ({
  title: title as string,
  artist: artist as string,
  year: year as number,
  color: color as string,
  position,
  wall: {
    color: wallColor as string,
    finish: 'plaster',
    roughness: 0.92,
  },
}));

// Space 1 hangs a sixteenth-century broadsheet of a celestial phenomenon over Nuremberg.
starterStations[0]!.imageSrc = '/artworks/nuremberg-celestial-1556.jpg';
starterStations[0]!.imageAspectRatio = 1125 / 1104;
starterStations[1]!.imageSrc = '/artworks/warm-current.svg';
starterStations[1]!.imageAspectRatio = 2 / 3;
starterStations[6]!.imageSrc = '/artworks/mutus-liber-altus2.jpeg';
starterStations[6]!.artist = 'Altus';
starterStations[6]!.imageAspectRatio = 0.720366538575229;
starterStations[4]!.imageSrc = '/artworks/bear-woman-vessel.jpg';
starterStations[4]!.imageAspectRatio = 607 / 799;

starterStations[6]!.imageSrc = '/artworks/mutus-liber-altus2.jpeg';
starterStations[6]!.artist = 'Altus';
starterStations[6]!.imageAspectRatio = 0.720366538575229;

// Frame 3 hangs an anonymous 1830 engraving of Robert Knox.
starterStations[2]!.imageSrc = '/artworks/robert-knox-engraving.jpg';
starterStations[2]!.imageAspectRatio = 1024 / 1307;

// Frame 4 hangs an early 20th century autochrome of a rose by Harold A. Taylor.
starterStations[3]!.imageSrc = '/artworks/harold-taylor-autochrome.jpg';
starterStations[3]!.imageAspectRatio = 1198 / 970;
starterStations[3]!.artist = 'Harold A. Taylor';
starterStations[3]!.caption =
  'Autochrome. A single pale bloom held against deep shadow, colour carried in the fragile grain of the process.';

// Space 10 hangs the magnetic man drawing from the 1901 photo essay.
starterStations[9]!.imageSrc = '/artworks/magnetic-man.jpg';
starterStations[9]!.imageAspectRatio = 1756 / 2256;
starterStations[9]!.artist = 'Anonymous';
starterStations[9]!.year = 1901;

// Frame 9 hangs the green "Personal Magnetism" cover from the 1901 photo essay.
starterStations[8]!.imageSrc = '/artworks/personal-magnetism-cover.jpg';
starterStations[8]!.imageAspectRatio = 1744 / 2848;
starterStations[8]!.artist = 'The Psychic Research Co.';
starterStations[8]!.year = 1901;

// Frame 6 shows a scanned illustration from Nos Invisibles (1907).
starterStations[5]!.imageSrc = '/artworks/nos-invisibles-hands-1907.jpg';
starterStations[5]!.imageAspectRatio = 4267 / 6248;
starterStations[5]!.artist = 'Raffaele Mainella';

// Frame 8 is a midnight blue wall scattered with stars.
starterStations[7]!.wall.imageSrc = '/artworks/midnight-stars.svg';
starterStations[7]!.wall.imageAspectRatio = 2.55 / 4.9;

// Space 12 hangs the 1629 frontispiece depicting the Garden of Eden.
starterStations[11]!.imageSrc = '/artworks/frontispiece-garden-of-eden-1629.jpg';
starterStations[11]!.imageAspectRatio = 2695 / 4307;
starterStations[11]!.caption =
  'A 1629 frontispiece envisioning Eden as a lush, emblematic garden of origins and wonder.';

// Space 13 hangs Bertuch's 1801 plate of the vegetable lamb.
starterStations[12]!.imageSrc = '/artworks/bertuch-vegetable-lamb-1801.jpg';
starterStations[12]!.imageAspectRatio = 2196 / 1764;

// Space 14 hangs a miniature from Histoires prodigieuses, with a curatorial caption beneath its title.
starterStations[13]!.imageSrc = '/artworks/histoires-prodigieuses-00002.jpg';
starterStations[13]!.imageAspectRatio = 2634 / 2938;
starterStations[13]!.caption =
  'Hand-painted miniature. A blazing star falls on a burning city while a barefoot figure points to the omen.';

// Each station owns its wall settings and painting fields in this sole authoring surface.
// Space 2 mounts a folio from John of Arderne's Sweden Scroll (ca. 1425–35).
starterStations[1]!.imageSrc = '/artworks/arderne-scroll-00044.jpeg';
starterStations[1]!.imageAspectRatio = 1071 / 1455;
starterStations[1]!.artist = 'John of Arderne';

// Frame 11 hangs a folio from John of Arderne's Sweden Scroll.
starterStations[10]!.imageSrc = '/artworks/arderne-scroll-00024.jpeg';
starterStations[10]!.imageAspectRatio = 1269 / 1624;
starterStations[10]!.artist = 'John of Arderne';

export const starterExhibition: ExhibitionConfig = {
  count: 25,
  spacing: 2.55,
  surfaceResolution: 512,
  stations: starterStations,
};

export function validateExhibition(config: ExhibitionConfig): void {
  if (!Number.isInteger(config.count) || config.count <= 0) {
    throw new Error('Exhibition count must be a positive integer.');
  }

  if (config.count > config.stations.length) {
    throw new Error('Exhibition count cannot exceed the configured station list.');
  }

  if (!Number.isInteger(config.surfaceResolution) || config.surfaceResolution <= 0) {
    throw new Error('Surface resolution must be a positive integer.');
  }

  if (!Number.isFinite(config.spacing) || config.spacing <= 0) {
    throw new Error('Exhibition spacing must be a positive number.');
  }

  const positions = new Set<number>();
  const wallColourFrames = new Map<string, number[]>();
  for (const station of config.stations.slice(0, config.count)) {
    if (positions.has(station.position)) {
      throw new Error(`Duplicate station position: ${station.position}.`);
    }
    positions.add(station.position);

    const normalizedColour = station.wall.color.trim().toLowerCase();
    const frameNumber = station.position + 1;
    const existing = wallColourFrames.get(normalizedColour);
    if (existing !== undefined) {
      existing.push(frameNumber);
    } else {
      wallColourFrames.set(normalizedColour, [frameNumber]);
    }
  }

  for (const [colour, frames] of wallColourFrames) {
    if (frames.length > 1) {
      throw new Error(
        `Duplicate wall colour ${colour} shared by frames ${frames.join(' and ')}. Each frame must have a unique wall colour.`,
      );
    }
  }
}
