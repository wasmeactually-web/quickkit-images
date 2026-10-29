import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Download,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileImage,
  Sliders,
  Maximize2,
} from 'lucide-react';
import { Dropzone } from './Dropzone';
import {
  resizeImage,
  loadImageFromFile,
  formatBytes,
  downloadFile,
  FormatExtension,
  getExtensionFromMime,
  ProcessedImageResult,
} from '../utils/imageEngine';

export const ResizerTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [origWidth, setOrigWidth] = useState<number>(0);
  const [origHeight, setOrigHeight] = useState<number>(0);

  // Target dimensions
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [outputFormat, setOutputFormat] = useState<FormatExtension>('jpg');
  const [quality, setQuality] = useState<number>(90);

  // Processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<ProcessedImageResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = async (files: File[]) => {
    if (!files.length) return;
    const selected = files[0];
    setFile(selected);
    setError(null);
    setResult(null);

    try {
      const img = await loadImageFromFile(selected);
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      setOrigWidth(w);
      setOrigHeight(h);
      setTargetWidth(w);
      setTargetHeight(h);
      setAspectRatio(w / h);
      setOriginalUrl(img.src);
      setOutputFormat(getExtensionFromMime(selected.type));
    } catch (err: any) {
      setError(err?.message || 'Failed to read image.');
    }
  };

  const handleWidthChange = (val: number) => {
    const w = Math.max(1, Math.round(val));
    setTargetWidth(w);
    if (lockAspectRatio && aspectRatio > 0) {
      setTargetHeight(Math.max(1, Math.round(w / aspectRatio)));
    }
  };

  const handleHeightChange = (val: number) => {
    const h = Math.max(1, Math.round(val));
    setTargetHeight(h);
    if (lockAspectRatio && aspectRatio > 0) {
      setTargetWidth(Math.max(1, Math.round(h * aspectRatio)));
    }
  };

  const applyPercentage = (pct: number) => {
    if (!origWidth || !origHeight) return;
    const factor = pct / 100;
    setTargetWidth(Math.max(1, Math.round(origWidth * factor)));
    setTargetHeight(Math.max(1, Math.round(origHeight * factor)));
  };

  const applyPreset = (w: number, h: number) => {
    setLockAspectRatio(false);
    setTargetWidth(w);
    setTargetHeight(h);
  };

  const handleProcessResize = async () => {
    if (!file || targetWidth <= 0 || targetHeight <= 0) return;
    setIsProcessing(true);
    setError(null);
    try {
      const res = await resizeImage(
        file,
        targetWidth,
        targetHeight,
        quality / 100,
        outputFormat
      );
      setResult(res);
    } catch (err: any) {
      setError(err?.message || 'An error occurred during resizing.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (originalUrl) {
      URL.revokeObjectURL(originalUrl);
    }
    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }
    setFile(null);
    setOriginalUrl('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Tool Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Online Image Resizer
        </h1>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Quickly change image dimensions by pixels or percentage with aspect ratio preservation.
          Runs 100% in your browser for absolute speed and privacy.
        </p>
      </div>

      {!file ? (
        <Dropzone
          onFilesSelected={handleFileSelected}
          title="Drop an image to resize"
          subtitle="Supports JPG, PNG, and WebP up to 50MB. Resizing happens on your device."
        />
      ) : (
        <div className="space-y-8">
          {/* Main Controls & Preview Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Image Preview */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-200/80 pb-3">
                <span className="font-semibold text-slate-900 truncate max-w-[200px]" title={file.name}>
                  {file.name}
                </span>
                <span className="font-mono tabular-nums text-slate-500">
                  {origWidth} × {origHeight} px · {formatBytes(file.size)}
                </span>
              </div>

              {/* Preview container */}
              <div className="relative aspect-video max-h-80 w-full rounded-lg overflow-hidden bg-transparency-grid flex items-center justify-center border border-slate-200">
                <img
                  src={result ? result.url : originalUrl}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain"
                />
                {result && (
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[11px] font-semibold bg-slate-900/80 text-white rounded backdrop-blur-xs font-mono">
                    Resized Preview
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-red-600 font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Choose Another Image</span>
                </button>

                <span className="text-[11px] text-slate-400">
                  Format: {file.type.split('/')[1]?.toUpperCase() || 'IMAGE'}
                </span>
              </div>
            </div>

            {/* Right Column: Resize Parameters */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  Target Dimensions
                </h3>
                <p className="text-xs text-slate-500">
                  Enter exact pixel dimensions or select a standard preset below.
                </p>
              </div>

              {/* Dimension Inputs with Aspect Ratio Lock */}
              <div className="space-y-4">
                <div className="grid grid-cols-11 gap-3 items-center">
                  <div className="col-span-5">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="16000"
                      value={targetWidth || ''}
                      onChange={(e) => handleWidthChange(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>

                  {/* Lock button */}
                  <div className="col-span-1 flex justify-center pt-5">
                    <button
                      type="button"
                      onClick={() => {
                        const newLock = !lockAspectRatio;
                        setLockAspectRatio(newLock);
                        if (newLock && targetWidth > 0 && targetHeight > 0) {
                          setAspectRatio(targetWidth / targetHeight);
                        }
                      }}
                      title={lockAspectRatio ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
                      className={`p-2 rounded-lg border transition-colors ${
                        lockAspectRatio
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {lockAspectRatio ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="col-span-5">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="16000"
                      value={targetHeight || ''}
                      onChange={(e) => handleHeightChange(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* Percentage scale quick shortcuts */}
                <div>
                  <span className="block text-xs font-medium text-slate-600 mb-1.5">
                    Scale by percentage:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[25, 50, 75, 100, 150, 200].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => applyPercentage(pct)}
                        className="px-2.5 py-1 text-xs font-mono rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:border-slate-300 transition-colors"
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Standard presets */}
                <div>
                  <span className="block text-xs font-medium text-slate-600 mb-1.5">
                    Common social & web presets:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => applyPreset(1920, 1080)}
                      className="px-2.5 py-1.5 text-left rounded border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-colors"
                    >
                      <div className="font-medium text-slate-900">Full HD (16:9)</div>
                      <div className="text-[11px] font-mono text-slate-500">1920 × 1080</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset(1080, 1080)}
                      className="px-2.5 py-1.5 text-left rounded border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-colors"
                    >
                      <div className="font-medium text-slate-900">Square (1:1)</div>
                      <div className="text-[11px] font-mono text-slate-500">1080 × 1080</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset(1200, 630)}
                      className="px-2.5 py-1.5 text-left rounded border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-colors"
                    >
                      <div className="font-medium text-slate-900">Social Share / OG</div>
                      <div className="text-[11px] font-mono text-slate-500">1200 × 630</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset(1080, 1920)}
                      className="px-2.5 py-1.5 text-left rounded border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-colors"
                    >
                      <div className="font-medium text-slate-900">Story / Reels (9:16)</div>
                      <div className="text-[11px] font-mono text-slate-500">1080 × 1920</div>
                    </button>
                  </div>
                </div>

                {/* Output format and quality */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Output Format
                    </label>
                    <select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value as FormatExtension)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="jpg">JPG (Best for photos)</option>
                      <option value="png">PNG (Preserves transparency)</option>
                      <option value="webp">WebP (Modern & compact)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Quality: <span className="font-mono">{quality}%</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  type="button"
                  onClick={handleProcessResize}
                  disabled={isProcessing}
                  className="w-full py-3 px-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Resizing in browser...</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-4 h-4" />
                      <span>Resize Image Now</span>
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>

          {/* Success / Result Card */}
          {result && (
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-6 transition-all">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-bold text-slate-900">
                      Image Resized Successfully!
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-mono flex flex-wrap items-center gap-3">
                    <span>
                      Original: {origWidth} × {origHeight} ({formatBytes(result.originalSize)})
                    </span>
                    <span aria-hidden="true" className="text-slate-400">→</span>
                    <span className="text-emerald-700 font-semibold">
                      New: {result.width} × {result.height} ({formatBytes(result.size)})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => downloadFile(result.blob, result.fileName)}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Image ({formatBytes(result.size)})</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
