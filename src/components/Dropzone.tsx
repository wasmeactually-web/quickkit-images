import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Sparkles } from 'lucide-react';
import { createSampleImage } from '../utils/imageEngine';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  title?: string;
  subtitle?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFilesSelected,
  accept = 'image/jpeg,image/png,image/webp',
  multiple = false,
  title = 'Drag & drop your image here',
  subtitle = 'Supports JPG, PNG, and WebP up to 50MB. Processed 100% locally.',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith('image/')
      );
      if (validFiles.length > 0) {
        onFilesSelected(multiple ? validFiles : [validFiles[0]]);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const validFiles = Array.from(e.target.files).filter((file) =>
        file.type.startsWith('image/')
      );
      if (validFiles.length > 0) {
        onFilesSelected(multiple ? validFiles : [validFiles[0]]);
      }
    }
    // reset input so same file can be re-selected if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const loadSample = (type: 'landscape' | 'product' | 'badge') => {
    const sample = createSampleImage(type);
    onFilesSelected([sample]);
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed p-8 sm:p-12 text-center transition-all ${
          isDragging
            ? 'border-blue-600 bg-blue-50/50'
            : 'border-slate-300 hover:border-blue-500 hover:bg-slate-50/60 bg-white'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <UploadCloud className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <p className="text-base font-semibold text-slate-900">{title}</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">{subtitle}</p>
          </div>

          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Browse Image{multiple ? 's' : ''}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Instant sample images for easy immediate testing */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
        <span className="flex items-center gap-1 text-slate-600 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Or test instantly with a demo asset:
        </span>
        <button
          type="button"
          onClick={() => loadSample('landscape')}
          className="px-2.5 py-1 rounded border border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors bg-white font-medium text-slate-700 text-[11px]"
        >
          Landscape Photo (1600×1000)
        </button>
        <button
          type="button"
          onClick={() => loadSample('product')}
          className="px-2.5 py-1 rounded border border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors bg-white font-medium text-slate-700 text-[11px]"
        >
          Studio Camera (1200×1200)
        </button>
        <button
          type="button"
          onClick={() => loadSample('badge')}
          className="px-2.5 py-1 rounded border border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors bg-white font-medium text-slate-700 text-[11px]"
        >
          Transparent PNG Emblem
        </button>
      </div>
    </div>
  );
};
