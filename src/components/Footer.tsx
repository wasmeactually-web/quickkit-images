import React from 'react';
import { ShieldCheck, Layers, ExternalLink } from 'lucide-react';
import { PageId } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Client-Side Guarantee */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">QuickKit Images</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Free, browser-native utility suite engineered for creators, marketers, developers, and photographers worldwide.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>100% Client-Side Processing</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Image Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => handleNav('resizer')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Image Resizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('compressor')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Image Compressor
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('converter')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Image Converter
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Guides */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => handleNav('guide')}
                  className="hover:text-blue-600 transition-colors"
                >
                  GitHub & Cloudflare Pages Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-blue-600 transition-colors"
                >
                  About QuickKit
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('terms')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li className="text-slate-400 text-[11px] pt-1">
                Zero telemetry · No cookies · No image uploads
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} QuickKit Images. Free online software under MIT/Apache terms.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-slate-900 transition-colors"
            >
              Privacy
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-slate-900 transition-colors"
            >
              Terms
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-slate-900 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
