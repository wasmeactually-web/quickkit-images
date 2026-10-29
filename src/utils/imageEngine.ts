/**
 * QuickKit Images - Client-Side Image Engine
 * All processing is performed strictly in the user's browser using HTML5 Canvas & Web APIs.
 * Zero files are uploaded to any server.
 */

import JSZip from 'jszip';

export type SupportedFormat = 'image/jpeg' | 'image/png' | 'image/webp';
export type FormatExtension = 'jpg' | 'png' | 'webp';

export interface ProcessedImageResult {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  size: number;
  originalSize: number;
  format: FormatExtension;
  fileName: string;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function getMimeTypeFromExtension(ext: FormatExtension): SupportedFormat {
  switch (ext) {
    case 'jpg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    default:
      return 'image/jpeg';
  }
}

export function getExtensionFromMime(mime: string): FormatExtension {
  if (mime.includes('png')) return 'png';
  if (mime.includes('webp')) return 'webp';
  return 'jpg';
}

export function loadImageFromFile(file: File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image file: invalid or corrupted image'));
    };
    img.src = url;
  });
}

/**
 * Resizes an image to specified width and height
 */
export async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  quality = 0.9,
  outputExt?: FormatExtension
): Promise<ProcessedImageResult> {
  const img = await loadImageFromFile(file);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(targetWidth));
  canvas.height = Math.max(1, Math.round(targetHeight));

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  // High quality interpolation
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const format = outputExt || getExtensionFromMime(file.type);
  const mimeType = getMimeTypeFromExtension(format);

  // If saving as JPG, fill background with white (in case original had transparency)
  if (format === 'jpg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to export canvas to blob'));
          return;
        }
        const url = URL.createObjectURL(blob);
        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        resolve({
          blob,
          url,
          width: canvas.width,
          height: canvas.height,
          size: blob.size,
          originalSize: file.size,
          format,
          fileName: `${nameWithoutExt}-resized-${canvas.width}x${canvas.height}.${format}`,
        });
      },
      mimeType,
      format === 'png' ? undefined : quality
    );
  });
}

/**
 * Compresses an image by adjusting quality and optional canvas re-encoding
 */
export async function compressImage(
  file: File,
  qualityPercent: number, // 1 to 100
  targetFormat?: FormatExtension
): Promise<ProcessedImageResult> {
  const img = await loadImageFromFile(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Default to JPEG or WebP for effective lossy compression if original is PNG without target
  const format: FormatExtension = targetFormat || (file.type.includes('png') ? 'webp' : getExtensionFromMime(file.type));
  const mimeType = getMimeTypeFromExtension(format);

  if (format === 'jpg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  const normalizedQuality = Math.min(1, Math.max(0.01, qualityPercent / 100));

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to compress image'));
          return;
        }
        const url = URL.createObjectURL(blob);
        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        resolve({
          blob,
          url,
          width: canvas.width,
          height: canvas.height,
          size: blob.size,
          originalSize: file.size,
          format,
          fileName: `${nameWithoutExt}-compressed.${format}`,
        });
      },
      mimeType,
      normalizedQuality
    );
  });
}

/**
 * Converts an image between JPG, PNG, and WebP
 */
export async function convertImage(
  file: File,
  targetFormat: FormatExtension,
  quality = 0.9,
  backgroundColor = '#ffffff'
): Promise<ProcessedImageResult> {
  const img = await loadImageFromFile(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (targetFormat === 'jpg') {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  const mimeType = getMimeTypeFromExtension(targetFormat);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error(`Failed to convert image to ${targetFormat}`));
          return;
        }
        const url = URL.createObjectURL(blob);
        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        resolve({
          blob,
          url,
          width: canvas.width,
          height: canvas.height,
          size: blob.size,
          originalSize: file.size,
          format: targetFormat,
          fileName: `${nameWithoutExt}-converted.${targetFormat}`,
        });
      },
      mimeType,
      targetFormat === 'png' ? undefined : quality
    );
  });
}

/**
 * Triggers browser download for a blob or file
 */
export function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Packages multiple files into a zip archive and triggers download
 */
export async function downloadZip(
  files: Array<{ blob: Blob; fileName: string }>,
  zipName = 'quickkit-images.zip'
): Promise<void> {
  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.fileName, file.blob);
  });
  const content = await zip.generateAsync({ type: 'blob' });
  downloadFile(content, zipName);
}

/**
 * Generates an SVG-based crisp sample photo for test drive without local files
 */
export function createSampleImage(type: 'landscape' | 'product' | 'badge'): File {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  if (type === 'landscape') {
    canvas.width = 1600;
    canvas.height = 1000;
    
    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, 600);
    sky.addColorStop(0, '#1e3a8a');
    sky.addColorStop(0.5, '#3b82f6');
    sky.addColorStop(1, '#93c5fd');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 1600, 600);

    // Sun
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(800, 320, 90, 0, Math.PI * 2);
    ctx.fill();

    // Mountain silhouettes
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(0, 600);
    ctx.lineTo(350, 240);
    ctx.lineTo(700, 600);
    ctx.fill();

    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(500, 600);
    ctx.lineTo(950, 180);
    ctx.lineTo(1400, 600);
    ctx.fill();

    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(1100, 600);
    ctx.lineTo(1400, 310);
    ctx.lineTo(1600, 600);
    ctx.fill();

    // Water surface
    const water = ctx.createLinearGradient(0, 600, 0, 1000);
    water.addColorStop(0, '#0f172a');
    water.addColorStop(1, '#1e3a8a');
    ctx.fillStyle = water;
    ctx.fillRect(0, 600, 1600, 400);

    // Label watermark overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '600 32px sans-serif';
    ctx.fillText('QuickKit Sample Photography (1600 × 1000)', 48, 940);
  } else if (type === 'product') {
    canvas.width = 1200;
    canvas.height = 1200;

    // Studio backdrop
    const bg = ctx.createRadialGradient(600, 600, 100, 600, 600, 700);
    bg.addColorStop(0, '#f8fafc');
    bg.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1200, 1200);

    // Modern studio pedestal shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.beginPath();
    ctx.ellipse(600, 850, 320, 50, 0, 0, Math.PI * 2);
    ctx.fill();

    // Clean modern device / camera box
    ctx.fillStyle = '#0f172a';
    ctx.roundRect(400, 420, 400, 380, 28);
    ctx.fill();

    // Lens circle
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(600, 600, 130, 0, Math.PI * 2);
    ctx.fill();

    const lensGradient = ctx.createLinearGradient(500, 500, 700, 700);
    lensGradient.addColorStop(0, '#3b82f6');
    lensGradient.addColorStop(0.5, '#1d4ed8');
    lensGradient.addColorStop(1, '#172554');
    ctx.fillStyle = lensGradient;
    ctx.beginPath();
    ctx.arc(600, 600, 95, 0, Math.PI * 2);
    ctx.fill();

    // Glass reflection
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(570, 570, 35, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.font = '600 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Sample Studio Product (1200 × 1200)', 600, 1050);
  } else {
    // Transparent PNG badge
    canvas.width = 800;
    canvas.height = 800;
    // transparent background
    ctx.clearRect(0, 0, 800, 800);

    // Decorative shield / emblem
    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.arc(400, 400, 280, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('QUICKKIT', 400, 380);

    ctx.font = '500 24px sans-serif';
    ctx.fillText('TRANSPARENT PNG', 400, 430);

    const dataUrl = canvas.toDataURL('image/png');
    const bytes = atob(dataUrl.split(',')[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new File([ab], 'sample-transparent-badge.png', { type: 'image/png' });
  }

  const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
  const bytes = atob(dataUrl.split(',')[1]);
  const ab = new ArrayBuffer(bytes.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new File([ab], `sample-${type}.jpg`, { type: 'image/jpeg' });
}
