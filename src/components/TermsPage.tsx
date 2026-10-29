import React from 'react';
import { Scale, FileCheck, AlertTriangle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          Last updated: October 2026. Please review these terms of use before using QuickKit Images.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-600" />
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using QuickKit Images (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions stated herein, please do not use the Service.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-blue-600" />
            2. Intellectual Property & Your Images
          </h2>
          <p>
            You retain 100% of all intellectual property, copyright, and moral rights in any images or media you process with QuickKit Images.
          </p>
          <p className="text-xs text-slate-600">
            QuickKit Images claims zero ownership, license, or distribution rights over your media. Because all processing executes on the client side in your browser, QuickKit Images never copies, stores, or distributes your images.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            3. Permitted Uses & Commercial Rights
          </h2>
          <p>
            QuickKit Images is provided free of charge. You may use the Service for:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 text-xs">
            <li>Personal photo management and social sharing</li>
            <li>Commercial websites, digital marketing campaigns, e-commerce storefronts, and client deliverables</li>
            <li>Educational, academic, scientific, and non-profit endeavors</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            4. Prohibited Activities
          </h2>
          <p>
            You agree not to use the Service in any manner that could disable, overburden, or impair any website hosting infrastructure or attempt to introduce viruses, trojans, or technologically harmful material.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-blue-600" />
            5. Disclaimer of Warranties
          </h2>
          <p className="text-xs text-slate-600">
            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. QUICKKIT IMAGES DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            6. Limitation of Liability
          </h2>
          <p className="text-xs text-slate-600">
            IN NO EVENT SHALL QUICKKIT IMAGES, ITS CONTRIBUTORS, OR HOSTING OPERATORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE OR ANY PROCESSED MEDIA.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            7. Governing Law
          </h2>
          <p className="text-xs text-slate-600">
            These Terms shall be governed and construed in accordance with the laws of the United States and the State of Delaware, without regard to its conflict of law provisions.
          </p>
        </section>
      </div>
    </div>
  );
};
