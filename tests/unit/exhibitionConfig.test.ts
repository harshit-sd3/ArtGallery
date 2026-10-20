import { describe, expect, it } from 'vitest';
import {
  starterExhibition,
  validateExhibition,
  type ExhibitionConfig,
} from '../../src/config/exhibition';

describe('exhibition configuration', () => {
  it('starts with exactly 25 configured paintings', () => {
    expect(starterExhibition.count).toBe(25);
    expect(starterExhibition.stations).toHaveLength(25);
  });

  it('gives every wall a distinct colour', () => {
    const colours = starterExhibition.stations
      .slice(0, starterExhibition.count)
      .map((station) => station.wall.color.toLowerCase());
    const channels = colours.map((colour) =>
      colour
        .replace('#', '')
        .match(/.{2}/g)!
        .map((channel) => Number.parseInt(channel, 16)),
    );

    expect(new Set(colours).size).toBe(25);
    expect(
      channels.every(
        (rgb) =>
          rgb.length === 3 && rgb.every((channel) => channel >= 0 && channel <= 255),
      ),
    ).toBe(true);
  });

  it('paints frame 1 with the deep blue wall colour', () => {
    const walls = starterExhibition.stations.slice(0, starterExhibition.count);

    expect(walls[0]!.wall.color.toLowerCase()).toBe('#0f1a3d');
  });

  it('paints frame 3 with the deep blue wall colour', () => {
    const walls = starterExhibition.stations.slice(0, starterExhibition.count);

    expect(walls[2]!.wall.color.toLowerCase()).toBe('#1e3a8a');
  });

  it('paints frame 8 with the midnight blue wall colour and stars', () => {
    const walls = starterExhibition.stations.slice(0, starterExhibition.count);

    expect(walls[7]!.wall.color.toLowerCase()).toBe('#191970');
    expect(walls[7]!.wall.imageSrc).toBe('/artworks/midnight-stars.svg');
    expect(walls[7]!.wall.imageAspectRatio).toBeCloseTo(2.55 / 4.9);
  });

  it('paints frame 9 with the soft lilac wall colour', () => {
    const walls = starterExhibition.stations.slice(0, starterExhibition.count);

    expect(walls[8]!.wall.color.toLowerCase()).toBe('#e7e1f0');
  });

  it('accepts the starter exhibition', () => {
    expect(() => validateExhibition(starterExhibition)).not.toThrow();
  });

  it('accepts an unknown wall finish for the matte fallback', () => {
    const config: ExhibitionConfig = structuredClone(starterExhibition);
    config.stations[0]!.wall.finish = 'unlisted-finish';

    expect(() => validateExhibition(config)).not.toThrow();
  });

  it('gives every station an independent wall config with a distinct starter colour', () => {
    const walls = starterExhibition.stations.map((station) => station.wall);
    const colours = walls.map((wall) => wall.color.toLowerCase());

    expect(new Set(walls).size).toBe(walls.length);
    expect(new Set(colours).size).toBe(colours.length);
  });

  it('rejects duplicate wall colours with a clear error naming the frame numbers', () => {
    const config: ExhibitionConfig = structuredClone(starterExhibition);
    config.stations[1]!.wall.color = config.stations[0]!.wall.color;

    expect(() => validateExhibition(config)).toThrow(
      /duplicate wall colour .+ shared by frames 1 and 2/i,
    );
  });

  it('rejects a non-positive painting count with a clear error', () => {
    const config: ExhibitionConfig = structuredClone(starterExhibition);
    config.count = 0;

    expect(() => validateExhibition(config)).toThrow(/count must be a positive integer/i);
  });

  it('rejects duplicate station positions with a clear error', () => {
    const config: ExhibitionConfig = structuredClone(starterExhibition);
    config.stations[1]!.position = config.stations[0]!.position;

    expect(() => validateExhibition(config)).toThrow(/duplicate station position/i);
  });
});