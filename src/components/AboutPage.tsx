import React from 'react';
import { ShieldCheck, Cpu, Zap, Lock, Globe2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          About QuickKit Images
        </h1>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          The fast, private, and free image toolkit designed to process your media entirely on your computer.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-8">
        {/* Core Mission */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Our Mission
          </h2>
          <p className="text-slate-600 leading-relaxed">
            QuickKit Images was built with a single goal: to provide high-utility, reliable, and completely free image tools without forcing users to register, pay subscriptions, or upload private photos to remote cloud servers.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            Every day, millions of people worldwide—including graphic designers, web developers, small business owners, realtors, students, and content creators—need to resize a photo for a website, shrink an oversized attachment for an email, or convert a WebP file to standard JPG. QuickKit Images delivers those essential tools with zero friction and instant execution.
          </p>
        </section>

        {/* Technical Architecture */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            How It Works: Browser-Native Processing
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Traditional online image editors upload your files over the internet to remote backend servers, process them remotely, and send them back. This model presents two fundamental flaws:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 my-4 pl-2">
            <li>
              <strong>Privacy risks:</strong> Your personal photos, sensitive receipts, unreleased product graphics, or company documents travel across third-party networks and could be stored or logged on remote disks.
            </li>
            <li>
              <strong>Latency & bandwidth caps:</strong> Uploading large 20MB–50MB camera files over standard home or mobile connections is slow and wastes data.
            </li>
          </ul>
          <p className="text-slate-600 leading-relaxed">
            QuickKit Images uses modern Web APIs including the HTML5 Canvas 2D engine, Blobs, and Web Workers. When you drag an image onto QuickKit, your computer’s own CPU and GPU process the pixels locally in memory. The image never leaves your device.
          </p>
        </section>

        {/* Guiding Principles */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Our Core Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
              <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1">
                Zero Cloud Uploads
              </h3>
              <p className="text-xs text-slate-600">
                All resizing, compressing, and format conversion happens in local browser memory.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
              <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1">
                No Accounts or Subscriptions
              </h3>
              <p className="text-xs text-slate-600">
                No sign-up forms, credit card prompts, or daily rate limits. The tools are immediately accessible.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
              <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1">
                Zero Tracking or Ads
              </h3>
              <p className="text-xs text-slate-600">
                We do not track your activity, install marketing trackers, or sell analytics to data brokers.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
              <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1">
                Open & Portable
              </h3>
              <p className="text-xs text-slate-600">
                Engineered to be lightweight, static-hosting compatible, and deployable on Cloudflare Pages or GitHub Pages for free.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
