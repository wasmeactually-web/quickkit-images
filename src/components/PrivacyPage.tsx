import React from 'react';
import { ShieldCheck, EyeOff, Server, Database, Lock } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          Last updated: October 2026. QuickKit Images is architected to protect your privacy by design.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
        {/* Core Guarantee */}
        <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-lg flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-sm">
              The QuickKit Zero-Upload Guarantee
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When you use our Image Resizer, Image Compressor, or Image Converter, your photos never leave your device. All pixel computations, resizing operations, compression algorithms, and format conversions execute 100% locally inside your web browser.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            1. Information We Do Not Collect
          </h2>
          <p>
            Unlike typical online image services, QuickKit Images does not operate processing servers that ingest user media. As a result:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 text-xs">
            <li>We do not upload, receive, inspect, or store your image files on remote servers.</li>
            <li>We do not create or maintain user accounts, passwords, or profile records.</li>
            <li>We do not collect credit card, billing, or financial information.</li>
            <li>We do not use tracking cookies, browser fingerprinting, or marketing analytics beacons.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            2. How Local Processing Operates
          </h2>
          <p>
            When you select an image file from your computer or drag it into the drop zone, the browser reads the file through standard Web APIs (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">FileReader</code> and <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">URL.createObjectURL</code>). The image is drawn onto an HTML5 <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">&lt;canvas&gt;</code> element residing purely in your computer's RAM.
          </p>
          <p className="text-slate-600 text-xs">
            Once you download the resulting image or close your browser tab, all allocated object URLs and memory buffers are immediately purged by your browser's native memory garbage collector.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            3. Contact Inquiries & Voluntary Communications
          </h2>
          <p>
            If you voluntarily submit a message through our Contact page, the information you provide (name, email address, and message content) is used strictly to answer your question or investigate reported bugs. We do not add your email to marketing lists or sell your contact information to any third party.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            4. United States & International Privacy Rights (CCPA / GDPR)
          </h2>
          <p>
            Under the California Consumer Privacy Act (CCPA/CPRA), the EU General Data Protection Regulation (GDPR), and similar data protection laws worldwide:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 text-xs">
            <li>We do not "sell" or "share" personal information or personal media.</li>
            <li>Because no personal data or images are stored on our servers, there are no databases from which to retrieve or delete your files. Your files remain exclusively under your control on your own device.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            5. Changes to This Privacy Policy
          </h2>
          <p className="text-xs text-slate-600">
            We may periodically update this policy to reflect new tool features or regulatory requirements. Any modifications will be posted directly to this page with an updated revision date.
          </p>
        </section>
      </div>
    </div>
  );
};
