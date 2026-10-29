import React from 'react';
import {
  Maximize2,
  Minimize2,
  RefreshCw,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  HardDrive,
  CheckCircle2,
  FileCheck,
  Sparkles,
} from 'lucide-react';
import { PageId } from './Navbar';
import { Dropzone } from './Dropzone';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onFileDroppedForTool?: (tool: 'resizer' | 'compressor' | 'converter', files: File[]) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 lg:space-y-24 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Unboxed metadata kicker */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <span>Free Online Image Suite</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-blue-600 font-bold">100% Client-Side Privacy</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Zero Server Uploads</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 text-balance leading-tight">
          Fast, private image tools for everyone.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Resize custom dimensions, compress file sizes, and convert between JPG, PNG, and WebP directly in your browser. No sign-up, no subscriptions, and your photos never leave your device.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('resizer')}
            className="px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            <span>Resize Images</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('compressor')}
            className="px-5 py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>Compress Files</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('converter')}
            className="px-5 py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>Convert Formats</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Client-Side Trust Callout */}
        <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Zero image uploads to servers
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-blue-600" />
            Instant browser execution
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-slate-600" />
            100% Free & Unlimited
          </span>
        </div>
      </section>

      {/* The 3 Core Tool Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Select an Image Tool
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Engineered with high-precision Canvas rendering for creators, developers, and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Image Resizer */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-105">
                <Maximize2 className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Image Resizer
                </h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Scale image dimensions with surgical precision or choose standard presets.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Custom pixel width & height controls</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Constrain aspect ratio toggle</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Presets for 1080p, Social, OG & Reels</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>High quality bicubic interpolation</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={() => onNavigate('resizer')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Launch Image Resizer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Image Compressor */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-105">
                <Minimize2 className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Image Compressor
                </h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Reduce heavy image payloads by 50%–80% without losing perceptual sharpness.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Adjustable 1% to 100% quality slider</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Real-time byte savings & percentage display</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Side-by-side visual quality comparison</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Batch compression & 1-click ZIP export</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={() => onNavigate('compressor')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Launch Image Compressor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Image Converter */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-105">
                <RefreshCw className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Image Converter
                </h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Convert between modern WebP, versatile JPG, and lossless PNG formats.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Full support for JPG, PNG, and WebP</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Custom background fill for PNG-to-JPG</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Batch processing for multiple images</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Direct download or batch ZIP download</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={() => onNavigate('converter')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Launch Image Converter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Browser-Native Matters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Why 100% In-Browser Image Processing Matters
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Most online image converters upload your files to unknown cloud servers where they may sit in temporary buckets or logs. QuickKit Images executes exclusively in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-2">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Privacy By Design
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Your Files Never Leave Your Machine
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Whether you are handling confidential client presentations, personal family photographs, or business receipts, our code runs strictly inside your local browser memory.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-2">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Instant Execution
              </div>
              <h3 className="text-base font-bold text-slate-900">
                No Upload Or Download Latency
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Skip waiting minutes to upload multi-megabyte camera files across slow home or mobile Wi-Fi. Processing starts immediately using your device’s native hardware.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-2">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Free Forever
              </div>
              <h3 className="text-base font-bold text-slate-900">
                No Paywalls, Accounts or Limits
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Because there are zero expensive GPU server clusters to run, QuickKit Images is free for anyone worldwide to use without artificial limits or credit cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Format Comparison Matrix */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Image Format Guide
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Choose the right format for your web, print, or social media goals.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Best For</th>
                <th className="py-3 px-4">Transparency</th>
                <th className="py-3 px-4">File Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">WebP</td>
                <td className="py-3.5 px-4">Modern websites, apps, and lightning-fast loading</td>
                <td className="py-3.5 px-4 text-emerald-600 font-medium">Yes</td>
                <td className="py-3.5 px-4 text-emerald-600 font-semibold">Smallest (25-35% smaller than JPG)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">JPG / JPEG</td>
                <td className="py-3.5 px-4">Photography, social media uploads, legacy software</td>
                <td className="py-3.5 px-4 text-slate-400">No (fills with color)</td>
                <td className="py-3.5 px-4">Compact with configurable quality</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">PNG</td>
                <td className="py-3.5 px-4">Logos, icons, screenshots, and sharp text graphics</td>
                <td className="py-3.5 px-4 text-emerald-600 font-medium">Yes (Alpha channel)</td>
                <td className="py-3.5 px-4">Larger (Lossless quality)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Cloudflare Pages & GitHub Callout Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="text-xs uppercase font-bold text-blue-400 tracking-wider">
              Static Hosting Ready
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Host Your Own QuickKit Images on Cloudflare Pages
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              QuickKit Images compiles to 100% pure static web assets. Follow our step-by-step deployment guide to publish the entire project on Cloudflare Pages or GitHub Pages for free.
            </p>
          </div>

          <button
            onClick={() => onNavigate('guide')}
            className="px-5 py-3 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>Read Deployment Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
