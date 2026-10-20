import ReactThreeTestRenderer from '@react-three/test-renderer';
import type { Mesh } from 'three';
import { describe, expect, it } from 'vitest';
import { WallLabel } from '../../src/scene/WallLabel';
import {
  WALL_LABEL_HEIGHT,
  WALL_LABEL_WORLD_PER_PIXEL,
  wallLabelHeight,
} from '../../src/surfaces/generateLabelTexture';

describe('WallLabel', () => {
  it('carries configured number and artwork metadata into the scene', async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <WallLabel
        artist="Mara Velez"
        number={7}
        title="After the Rain"
        year={2019}
        position={[0, 0, 0]}
      />,
    );
    const label = renderer.scene.findByProps({ name: 'wall-label' });

    expect(label.instance.userData.labelText).toEqual([
      '07',
      'After the Rain',
      'Mara Velez',
      '2019',
    ]);
    expect(
      (
        (label.instance as Mesh).material as Mesh['material'] & {
          map: { userData: { labelText: string } };
        }
      ).map.userData.labelText,
    ).toEqual('07 · After the Rain · Mara Velez · 2019');
  });

  it('adds a curatorial caption and grows the label to hold it', async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <WallLabel
        artist="Harold A. Taylor"
        caption="Autochrome. A single pale bloom held against deep shadow."
        number={4}
        title="A Single Bloom"
        year={2020}
        position={[0, 0, 0]}
      />,
    );
    const label = renderer.scene.findByProps({ name: 'wall-label' });
    const geometry = (label.instance as Mesh).geometry as Mesh['geometry'] & {
      parameters: { width: number; height: number };
    };

    expect(label.instance.userData.caption).toBe(
      'Autochrome. A single pale bloom held against deep shadow.',
    );
    expect(
      (
        (label.instance as Mesh).material as Mesh['material'] & {
          map: { userData: { caption?: string } };
        }
      ).map.userData.caption,
    ).toBe('Autochrome. A single pale bloom held against deep shadow.');
    expect(geometry.parameters.width).toBe(1.5);
    expect(geometry.parameters.height).toBeCloseTo(
      wallLabelHeight('Autochrome. A single pale bloom held against deep shadow.') *
        WALL_LABEL_WORLD_PER_PIXEL,
    );
    expect(geometry.parameters.height).toBeGreaterThan(
      WALL_LABEL_HEIGHT * WALL_LABEL_WORLD_PER_PIXEL,
    );
  });

  it('keeps the original label height when no caption is supplied', async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <WallLabel
        artist="Mara Velez"
        number={7}
        title="After the Rain"
        year={2019}
        position={[0, 0, 0]}
      />,
    );
    const label = renderer.scene.findByProps({ name: 'wall-label' });
    const geometry = (label.instance as Mesh).geometry as Mesh['geometry'] & {
      parameters: { height: number };
    };

    expect(label.instance.userData.caption).toBe('');
    expect(geometry.parameters.height).toBeCloseTo(
      WALL_LABEL_HEIGHT * WALL_LABEL_WORLD_PER_PIXEL,
    );
  });
});
