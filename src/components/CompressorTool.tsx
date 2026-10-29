import React, { useState } from 'react';
import {
  Download,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Minimize2,
  Archive,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Dropzone } from './Dropzone';
import {
  compressImage,
  loadImageFromFile,
  formatBytes,
  downloadFile,
  downloadZip,
  FormatExtension,
  getExtensionFromMime,
  ProcessedImageResult,
} from '../utils/imageEngine';

interface BatchCompressItem {
  id: string;
  file: File;
  originalUrl: string;
  width: number;
  height: number;
  quality: number;
  targetFormat: FormatExtension;
  result: ProcessedImageResult | null;
  isProcessing: boolean;
  error: string | null;
}

export const CompressorTool: React.FC = () => {
  const [items, setItems] = useState<BatchCompressItem[]>([]);
  const [globalQuality, setGlobalQuality] = useState<number>(75);
  const [globalFormat, setGlobalFormat] = useState<FormatExtension>('webp');
  const [activePreviewIndex, setActivePreviewIndex] = useState<number>(0);
  const [previewMode, setPreviewMode] = useState<'compressed' | 'original' | 'split'>('compressed');

  const handleFilesSelected = async (files: File[]) => {
    const newItems: BatchCompressItem[] = [];

    for (const file of files) {
      try {
        const img = await loadImageFromFile(file);
        const format: FormatExtension = file.type.includes('png') ? 'webp' : getExtensionFromMime(file.type);
        newItems.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          originalUrl: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight,
          quality: globalQuality,
          targetFormat: format,
          result: null,
          isProcessing: false,
          error: null,
        });
      } catch (e: any) {
        console.error('Error loading image', e);
      }
    }

    setItems((prev) => [...prev, ...newItems]);
    // Automatically trigger compression on newly added items
    newItems.forEach((item) => {
      compressSingleItem(item.file, globalQuality, item.targetFormat, item.id);
    });
  };

  const compressSingleItem = async (
    file: File,
    quality: number,
    format: FormatExtension,
    itemId: string
  ) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, isProcessing: true, error: null } : it))
    );

    try {
      const res = await compressImage(file, quality, format);
      setItems((prev) =>
        prev.map((it) => (it.id === itemId ? { ...it, result: res, isProcessing: false } : it))
      );
    } catch (err: any) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === itemId
            ? { ...it, error: err?.message || 'Compression failed', isProcessing: false }
            : it
        )
      );
    }
  };

  const handleQualityChange = (newQuality: number) => {
    setGlobalQuality(newQuality);
    // Recompress all items
    items.forEach((item) => {
      compressSingleItem(item.file, newQuality, item.targetFormat, item.id);
    });
  };

  const handleFormatChange = (newFormat: FormatExtension) => {
    setGlobalFormat(newFormat);
    items.forEach((item) => {
      compressSingleItem(item.file, item.quality, newFormat, item.id);
    });
  };

  const handleRemoveItem = (id: string) => {
    const item = items.find((it) => it.id === id);
    if (item?.originalUrl) URL.revokeObjectURL(item.originalUrl);
    if (item?.result?.url) URL.revokeObjectURL(item.result.url);
    const updated = items.filter((it) => it.id !== id);
    setItems(updated);
    if (activePreviewIndex >= updated.length) {
      setActivePreviewIndex(Math.max(0, updated.length - 1));
    }
  };

  const handleResetAll = () => {
    items.forEach((item) => {
      if (item.originalUrl) URL.revokeObjectURL(item.originalUrl);
      if (item.result?.url) URL.revokeObjectURL(item.result.url);
    });
    setItems([]);
    setActivePreviewIndex(0);
  };

  const handleDownloadAllZip = async () => {
    const readyFiles = items
      .filter((it) => it.result)
      .map((it) => ({
        blob: it.result!.blob,
        fileName: it.result!.fileName,
      }));
    if (readyFiles.length > 0) {
      await downloadZip(readyFiles, 'quickkit-compressed-images.zip');
    }
  };

  const activeItem = items[activePreviewIndex] || null;

  // Calculate total savings
  const totalOriginalBytes = items.reduce((acc, it) => acc + it.file.size, 0);
  const totalCompressedBytes = items.reduce(
    (acc, it) => acc + (it.result ? it.result.size : it.file.size),
    0
  );
  const totalSavedBytes = Math.max(0, totalOriginalBytes - totalCompressedBytes);
  const totalPercentSaved =
    totalOriginalBytes > 0 ? Math.round((totalSavedBytes / totalOriginalBytes) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Tool Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Online Image Compressor
        </h1>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Drastically reduce image file sizes without noticeable loss of quality.
          Batch compression runs safely inside your browser — zero files are uploaded to any server.
        </p>
      </div>

      {items.length === 0 ? (
        <Dropzone
          onFilesSelected={handleFilesSelected}
          multiple={true}
          title="Drop image(s) here to compress"
          subtitle="Supports JPG, PNG, and WebP. Batch compress multiple photos simultaneously."
        />
      ) : (
        <div className="space-y-8">
          {/* Global Controls & Summary Strip */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Quality Slider */}
              <div className="md:col-span-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                    <Minimize2 className="w-4 h-4 text-blue-600" />
                    Compression Level (Quality):
                  </span>
                  <span className="font-mono text-sm font-bold text-blue-600">
                    {globalQuality}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={globalQuality}
                  onChange={(e) => handleQualityChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Maximum Savings (Low Res)</span>
                  <span className="text-blue-600 font-medium">Recommended: 75%</span>
                  <span>Light Compression (High Quality)</span>
                </div>
              </div>

              {/* Target Format */}
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Format Strategy
                </label>
                <select
                  value={globalFormat}
                  onChange={(e) => handleFormatChange(e.target.value as FormatExtension)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="webp">WebP (Best Compression)</option>
                  <option value="jpg">JPG (Universal Compatibility)</option>
                </select>
              </div>

              {/* Stats Summary */}
              <div className="md:col-span-4 bg-slate-50 border border-slate-200/80 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wide font-medium">
                    Total Savings
                  </div>
                  <div className="text-lg font-bold font-mono text-emerald-600">
                    -{totalPercentSaved}%
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {formatBytes(totalOriginalBytes)} → {formatBytes(totalCompressedBytes)}
                  </div>
                </div>

                <div className="space-y-1.5 text-right">
                  <button
                    type="button"
                    onClick={handleDownloadAllZip}
                    disabled={items.some((it) => it.isProcessing)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span>Download All (ZIP)</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="text-[11px] text-slate-500 hover:text-red-600 transition-colors block text-right w-full"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Preview Area */}
          {activeItem && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold text-slate-900 truncate max-w-sm">
                    {activeItem.file.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono">
                    {activeItem.width} × {activeItem.height} px
                  </div>
                </div>

                {/* Preview View Mode toggle */}
                <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('compressed')}
                    className={`px-3 py-1 font-medium rounded transition-colors ${
                      previewMode === 'compressed'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Compressed
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('original')}
                    className={`px-3 py-1 font-medium rounded transition-colors ${
                      previewMode === 'original'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Original
                  </button>
                </div>
              </div>

              {/* Viewport Frame */}
              <div className="relative aspect-video max-h-96 w-full rounded-lg overflow-hidden bg-transparency-grid flex items-center justify-center border border-slate-200">
                <img
                  src={
                    previewMode === 'original' || !activeItem.result
                      ? activeItem.originalUrl
                      : activeItem.result.url
                  }
                  alt="Compression Preview"
                  className="max-h-full max-w-full object-contain"
                />

                <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold bg-slate-900/80 text-white rounded backdrop-blur-xs font-mono">
                  {previewMode === 'original' ? 'Original Asset' : 'Compressed Preview'}
                </span>

                {activeItem.result && (
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-lg p-2 text-xs font-mono shadow-sm">
                    <span className="text-slate-500">
                      {formatBytes(activeItem.file.size)} →{' '}
                    </span>
                    <span className="text-emerald-600 font-bold">
                      {formatBytes(activeItem.result.size)}
                    </span>{' '}
                    <span className="text-emerald-700 font-semibold">
                      (-
                      {Math.round(
                        ((activeItem.file.size - activeItem.result.size) / activeItem.file.size) *
                          100
                      )}
                      %)
                    </span>
                  </div>
                )}
              </div>

              {/* Active Item Action */}
              {activeItem.result && (
                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => downloadFile(activeItem.result!.blob, activeItem.result!.fileName)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download this image ({formatBytes(activeItem.result.size)})</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Queue List Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Files in Queue ({items.length})
              </h3>
              <label className="text-xs text-blue-600 hover:underline cursor-pointer font-medium">
                + Add more images
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    if (e.target.files) handleFilesSelected(Array.from(e.target.files));
                  }}
                  className="hidden"
                />
              </label>
            </div>

            <div className="divide-y divide-slate-100">
              {items.map((item, idx) => {
                const savingsPct = item.result
                  ? Math.round(((item.file.size - item.result.size) / item.file.size) * 100)
                  : 0;

                return (
                  <div
                    key={item.id}
                    onClick={() => setActivePreviewIndex(idx)}
                    className={`px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer transition-colors ${
                      activePreviewIndex === idx ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded border border-slate-200 bg-transparency-grid overflow-hidden shrink-0 flex items-center justify-center">
                        <img
                          src={item.result ? item.result.url : item.originalUrl}
                          alt="thumb"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-900 truncate max-w-xs">
                          {item.file.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {formatBytes(item.file.size)}{' '}
                          {item.result && (
                            <>
                              <span className="text-slate-400">→</span>{' '}
                              <span className="text-emerald-600 font-semibold">
                                {formatBytes(item.result.size)}
                              </span>{' '}
                              <span className="text-emerald-700">(-{savingsPct}%)</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                      {item.isProcessing ? (
                        <span className="text-xs text-slate-500 flex items-center gap-1.5">
                          <div className="w-3.5 h-3.5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                          <span>Compressing...</span>
                        </span>
                      ) : item.result ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadFile(item.result!.blob, item.result!.fileName);
                          }}
                          className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors"
                          title="Download compressed image"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      ) : null}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem(item.id);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded transition-colors"
                        title="Remove from queue"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
