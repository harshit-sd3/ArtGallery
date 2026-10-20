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
  ['A Room of Blue', 'Mara Velez', 2021, '#6e9ea5', '#0f1a3d'],
  ['After the Rain', 'Jonas Reed', 2019, '#bf8063', '#0b2545'],
  ['Soft Geometry', 'Arthur', 2024, '#d4b46e', '#1e3a8a'],
  ['Still Morning', 'Elias Chen', 2020, '#758d77', '#ece4f6'],
  ['A Place to Pause', 'Mara Velez', 2022, '#bf00ff', '#efeee8'],
  ['The Quiet Field', 'Jonas Reed', 2018, '#8796ad', '#faf5eb'],
  ['Summer Index', 'Nadia Okafor', 2023, '#d59b58', '#f5f0e6'],
  ['Small Weather', 'Elias Chen', 2021, '#6f8d83', '#191970'],
  ['The Long Window', 'Mara Velez', 2020, '#b77565', '#e7e1f0'],
  ['Common Light', 'Jonas Reed', 2022, '#c1a872', '#f6f7f2'],
  ['Blue Orchard', 'Nadia Okafor', 2019, '#688c92', '#f4f1e8'],
  ['Held in Place', 'Elias Chen', 2024, '#b9815e', '#f2f0e9'],
  ['Halfway Home', 'Mara Velez', 2018, '#7d927e', '#eeeae2'],
  ['A Familiar Shape', 'Jonas Reed', 2023, '#c59c72', '#f8f3ea'],
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

starterStations[0]!.imageSrc = '/artworks/quiet-orbit.svg';
starterStations[0]!.imageAspectRatio = 4 / 3;
starterStations[1]!.imageSrc = '/artworks/warm-current.svg';
starterStations[1]!.imageAspectRatio = 2 / 3;

// Frame 3 hangs an anonymous 1830 engraving of Robert Knox.
starterStations[2]!.imageSrc = '/artworks/robert-knox-engraving.jpg';
starterStations[2]!.imageAspectRatio = 1024 / 1307;

// Frame 8 is a midnight blue wall scattered with stars.
starterStations[7]!.wall.imageSrc = '/artworks/midnight-stars.svg';
starterStations[7]!.wall.imageAspectRatio = 2.55 / 4.9;

// Each station owns its wall settings and painting fields in this sole authoring surface.
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
