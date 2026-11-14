import {
  CanvasTexture,
  DataTexture,
  LinearFilter,
  RGBAFormat,
  SRGBColorSpace,
  type Texture,
} from 'three';

export const WALL_LABEL_WIDTH = 512;
export const WALL_LABEL_HEIGHT = 128;
export const WALL_LABEL_CAPTION_HEIGHT = 176;
/** World units of wall-label height per texture pixel, so a label keeps its scale. */
export const WALL_LABEL_WORLD_PER_PIXEL = 0.38 / WALL_LABEL_HEIGHT;

export type WallLabelContent = {
  artist?: string;
  caption?: string;
  number: number;
  title?: string;
  year?: number;
};

/** Returns the texture height a label needs, which grows only when a caption is present. */
export function wallLabelHeight(caption?: string): number {
  return caption?.trim() ? WALL_LABEL_CAPTION_HEIGHT : WALL_LABEL_HEIGHT;
}

export function generateLabelTexture(content: WallLabelContent): Texture {
  const labelText = [
    String(content.number).padStart(2, '0'),
    content.title,
    content.artist,
    content.year,
  ]
    .filter((value) => value !== undefined && value !== '')
    .join(' · ');
  const caption = content.caption?.trim();
  if (typeof document === 'undefined') {
    const texture = new DataTexture(
      new Uint8Array([255, 255, 255, 255]),
      1,
      1,
      RGBAFormat,
    );
    texture.colorSpace = SRGBColorSpace;
    texture.magFilter = LinearFilter;
    texture.minFilter = LinearFilter;
    texture.userData.labelText = labelText;
    texture.userData.caption = caption;
    return texture;
  }

  const canvas = document.createElement('canvas');
  canvas.width = WALL_LABEL_WIDTH;
  canvas.height = wallLabelHeight(caption);
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas 2D is unavailable for wall-label generation.');

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.textBaseline = 'middle';
  context.fillStyle = '#332a24';
  context.font = 'bold 34px Georgia, serif';
  context.fillText(String(content.number).padStart(2, '0'), 6, 22);
  context.font = 'bold 24px Georgia, serif';
  context.fillText(content.title ?? '', 6, 55, 500);
  context.font = '19px Arial, sans-serif';
  context.fillText(content.artist ?? '', 6, 84, 500);
  context.font = '17px Arial, sans-serif';
  context.fillText(content.year === undefined ? '' : String(content.year), 6, 111);

  if (caption) {
    context.fillStyle = '#5a4636';
    context.font = 'italic 16px Georgia, serif';
    const lines = wrapCaption(context, caption, 500, 2);
    lines.forEach((line, index) => {
      context.fillText(line, 6, 134 + index * 20);
    });
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.magFilter = LinearFilter;
  texture.minFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.userData.labelText = labelText;
  texture.userData.caption = caption;
  return texture;
}

/** Wraps a caption into at most `maxLines` lines, marking any cut-off text with an ellipsis. */
function wrapCaption(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (context.measureText(candidate).width <= maxWidth) {
      current = candidate;
      continue;
    }
    lines.push(current);
    current = word;
    if (lines.length === maxLines) break;
  }
  if (current && lines.length < maxLines) lines.push(current);

  if (lines.length === maxLines) {
    const used = lines.join(' ').split(/\s+/).filter(Boolean).length;
    if (used < words.length) {
      let last = lines[maxLines - 1]!;
      while (last.length > 1 && context.measureText(`${last}…`).width > maxWidth) {
        last = last.slice(0, -1);
      }
      lines[maxLines - 1] = `${last}…`;
    }
  }

  return lines;
}

export type GallerySignStyle = 'neon-title' | 'instructions';

export function generateGallerySignTexture(
  text: string,
  style: GallerySignStyle,
): Texture {
  if (typeof document === 'undefined') {
    const texture = new DataTexture(
      new Uint8Array([255, 255, 255, 255]),
      1,
      1,
      RGBAFormat,
    );
    texture.colorSpace = SRGBColorSpace;
    texture.magFilter = LinearFilter;
    texture.minFilter = LinearFilter;
    texture.userData.labelText = text;
    texture.userData.style = style;
    return texture;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = style === 'neon-title' ? 160 : 96;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas 2D is unavailable for gallery signs.');

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  if (style === 'neon-title') {
    context.font = 'bold 112px Arial, sans-serif';
    context.shadowColor = '#00e5ff';
    context.shadowBlur = 28;
    context.strokeStyle = '#00e5ff';
    context.lineWidth = 3;
    context.strokeText(text, canvas.width / 2, canvas.height / 2);
    context.fillStyle = '#e3ffff';
  } else {
    context.font = 'bold 44px Arial, sans-serif';
    context.fillStyle = '#f4f4f4';
  }
  context.fillText(text, canvas.width / 2, canvas.height / 2, canvas.width - 48);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.magFilter = LinearFilter;
  texture.minFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.userData.labelText = text;
  texture.userData.style = style;
  return texture;
}
