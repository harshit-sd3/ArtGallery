import { useMemo } from 'react';
import {
  generateLabelTexture,
  wallLabelHeight,
  WALL_LABEL_WORLD_PER_PIXEL,
} from '../surfaces/generateLabelTexture';

type WallLabelProps = {
  artist?: string;
  caption?: string;
  number: number;
  position: [number, number, number];
  title?: string;
  year?: number;
};

export function WallLabel({
  artist,
  caption,
  number,
  position,
  title,
  year,
}: WallLabelProps) {
  const texture = useMemo(
    () => generateLabelTexture({ artist, caption, number, title, year }),
    [artist, caption, number, title, year],
  );
  const height = wallLabelHeight(caption) * WALL_LABEL_WORLD_PER_PIXEL;
  return (
    <mesh
      name="wall-label"
      position={position}
      userData={{
        labelText: [String(number).padStart(2, '0'), title, artist, year]
          .filter((value) => value !== undefined && value !== '')
          .map(String),
        caption: caption?.trim() ?? '',
      }}
    >
      <planeGeometry args={[1.5, height]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  );
}
