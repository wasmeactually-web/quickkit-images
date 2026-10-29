import React, { useState } from 'react';
import {
  Download,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Archive,
  ArrowRight,
  Sliders,
  Check,
} from 'lucide-react';
import { Dropzone } from './Dropzone';
import {
  convertImage,
  loadImageFromFile,
  formatBytes,
  downloadFile,
  downloadZip,
  FormatExtension,
  getExtensionFromMime,
  ProcessedImageResult,
} from '../utils/imageEngine';

interface ConvertQueueItem {
  id: string;
  file: File;
  originalUrl: string;
  originalFormat: FormatExtension;
  width: number;
  height: number;
  targetFormat: FormatExtension;
  result: ProcessedImageResult | null;
  isProcessing: boolean;
  error: string | null;
}

export const ConverterTool: React.FC = () => {
  const [items, setItems] = useState<ConvertQueueItem[]>([]);
  const [globalTargetFormat, setGlobalTargetFormat] = useState<FormatExtension>('webp');
  const [quality, setQuality] = useState<number>(90);
  const [bgColorForJpg, setBgColorForJpg] = useState<string>('#ffffff');

  const handleFilesSelected = async (files: File[]) => {
    const newItems: ConvertQueueItem[] = [];

    for (const file of files) {
      try {
        const img = await loadImageFromFile(file);
        const origExt = getExtensionFromMime(file.type);
        // Default target: if original is JPG, suggest WebP or PNG; else suggest WebP or JPG
        const suggestedTarget =
          globalTargetFormat !== origExt
            ? globalTargetFormat
            : origExt === 'png'
            ? 'webp'
            : 'png';

        newItems.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          originalUrl: img.src,
          originalFormat: origExt,
          width: img.naturalWidth,
          height: img.naturalHeight,
          targetFormat: suggestedTarget,
          result: null,
          isProcessing: false,
          error: null,
        });
      } catch (e: any) {
        console.error('Error loading image', e);
      }
    }

    setItems((prev) => [...prev, ...newItems]);
    // Start conversion
    newItems.forEach((item) => {
      runConversion(item.file, item.targetFormat, item.id);
    });
  };

  const runConversion = async (
    file: File,
    targetFormat: FormatExtension,
    itemId: string
  ) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, isProcessing: true, error: null } : it))
    );

    try {
      const res = await convertImage(file, targetFormat, quality / 100, bgColorForJpg);
      setItems((prev) =>
        prev.map((it) =>
          it.id === itemId ? { ...it, targetFormat, result: res, isProcessing: false } : it
        )
      );
    } catch (err: any) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === itemId
            ? { ...it, error: err?.message || 'Conversion failed', isProcessing: false }
            : it
        )
      );
    }
  };

  const handleGlobalFormatChange = (fmt: FormatExtension) => {
    setGlobalTargetFormat(fmt);
    items.forEach((item) => {
      runConversion(item.file, fmt, item.id);
    });
  };

  const handleIndividualFormatChange = (itemId: string, fmt: FormatExtension) => {
    const item = items.find((it) => it.id === itemId);
    if (!item) return;
    runConversion(item.file, fmt, itemId);
  };

  const handleRemoveItem = (id: string) => {
    const item = items.find((it) => it.id === id);
    if (item?.originalUrl) URL.revokeObjectURL(item.originalUrl);
    if (item?.result?.url) URL.revokeObjectURL(item.result.url);
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleResetAll = () => {
    items.forEach((item) => {
      if (item.originalUrl) URL.revokeObjectURL(item.originalUrl);
      if (item.result?.url) URL.revokeObjectURL(item.result.url);
    });
    setItems([]);
  };

  const handleDownloadAllZip = async () => {
    const readyFiles = items
      .filter((it) => it.result)
      .map((it) => ({
        blob: it.result!.blob,
        fileName: it.result!.fileName,
      }));
    if (readyFiles.length > 0) {
      await downloadZip(readyFiles, 'quickkit-converted-images.zip');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Tool Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Online Image Converter
        </h1>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Instantly convert images between JPG, PNG, and modern WebP formats in bulk.
          Runs 100% locally on your computer with complete privacy.
        </p>
      </div>

      {items.length === 0 ? (
        <Dropzone
          onFilesSelected={handleFilesSelected}
          multiple={true}
          title="Drop image(s) here to convert"
          subtitle="Supports JPG, PNG, and WebP. Convert individual or multiple images at once."
        />
      ) : (
        <div className="space-y-8">
          {/* Conversion Global Controls */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Target Format Buttons */}
              <div className="md:col-span-5 space-y-2">
                <label className="block text-xs font-semibold text-slate-900">
                  Convert All Files To:
                </label>
                <div className="flex items-center gap-2">
                  {(['webp', 'jpg', 'png'] as FormatExtension[]).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => handleGlobalFormatChange(fmt)}
                      className={`flex-1 py-2 px-3 text-xs font-bold uppercase rounded-lg border transition-all ${
                        globalTargetFormat === fmt
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-slate-500">
                  {globalTargetFormat === 'webp' && 'WebP offers high quality with the smallest file sizes for web.'}
                  {globalTargetFormat === 'jpg' && 'JPG is universally compatible with every viewer and system.'}
                  {globalTargetFormat === 'png' && 'PNG provides lossless quality and supports transparency.'}
                </div>
              </div>

              {/* Quality & Background Fill for JPG */}
              <div className="md:col-span-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                  <span>Compression Quality:</span>
                  <span className="font-mono font-bold text-blue-600">{quality}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={quality}
                  onChange={(e) => {
                    const q = Number(e.target.value);
                    setQuality(q);
                    items.forEach((it) => runConversion(it.file, it.targetFormat, it.id));
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />

                {globalTargetFormat === 'jpg' && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] text-slate-600">Transparency Fill:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setBgColorForJpg('#ffffff');
                        items.forEach((it) => runConversion(it.file, 'jpg', it.id));
                      }}
                      className={`px-2 py-0.5 text-[11px] rounded border ${
                        bgColorForJpg === '#ffffff'
                          ? 'border-blue-600 font-bold bg-white'
                          : 'border-slate-200'
                      }`}
                    >
                      White
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBgColorForJpg('#000000');
                        items.forEach((it) => runConversion(it.file, 'jpg', it.id));
                      }}
                      className={`px-2 py-0.5 text-[11px] rounded border ${
                        bgColorForJpg === '#000000'
                          ? 'border-blue-600 font-bold bg-slate-100'
                          : 'border-slate-200'
                      }`}
                    >
                      Black
                    </button>
                  </div>
                )}
              </div>

              {/* Global Actions */}
              <div className="md:col-span-3 flex flex-col items-end justify-center space-y-2">
                <button
                  type="button"
                  onClick={handleDownloadAllZip}
                  disabled={items.some((it) => it.isProcessing)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <Archive className="w-4 h-4" />
                  <span>Download All (ZIP)</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="text-xs text-slate-500 hover:text-red-600 transition-colors"
                >
                  Clear All Files
                </button>
              </div>
            </div>
          </div>

          {/* Queue List Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Conversion Queue ({items.length} files)
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
              {items.map((item) => (
                <div
                  key={item.id}
                  className="px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                >
                  {/* Thumbnail & File Details */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded border border-slate-200 bg-transparency-grid overflow-hidden shrink-0 flex items-center justify-center">
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
                      <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2 mt-0.5">
                        <span className="uppercase text-slate-600 font-semibold">
                          {item.originalFormat}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{formatBytes(item.file.size)}</span>
                        {item.result && (
                          <>
                            <span aria-hidden="true">→</span>
                            <span className="uppercase text-blue-600 font-semibold">
                              {item.result.format}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="text-emerald-600 font-semibold">
                              {formatBytes(item.result.size)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Format Selector per item & Download */}
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    {/* Individual format selector */}
                    <div className="flex items-center gap-1 border border-slate-200 rounded-md p-0.5 bg-slate-50">
                      {(['webp', 'jpg', 'png'] as FormatExtension[]).map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => handleIndividualFormatChange(item.id, fmt)}
                          className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded transition-colors ${
                            item.targetFormat === fmt
                              ? 'bg-blue-600 text-white'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>

                    {item.isProcessing ? (
                      <span className="text-xs text-slate-500 flex items-center gap-1.5 px-3">
                        <div className="w-3.5 h-3.5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                        <span>Converting...</span>
                      </span>
                    ) : item.result ? (
                      <button
                        type="button"
                        onClick={() => downloadFile(item.result!.blob, item.result!.fileName)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded transition-colors"
                      title="Remove file"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
