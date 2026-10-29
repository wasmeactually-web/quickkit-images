import React, { useState } from 'react';
import { Layers, ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';

export type PageId = 'home' | 'resizer' | 'compressor' | 'converter' | 'guide' | 'about' | 'contact' | 'privacy' | 'terms';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single brand wordmark */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg group whitespace-nowrap shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              QuickKit Images
            </span>
          </button>

          {/* Zone 2: 4-5 concise text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNav('resizer')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'resizer' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Image Resizer
            </button>
            <button
              onClick={() => handleNav('compressor')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'compressor' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Image Compressor
            </button>
            <button
              onClick={() => handleNav('converter')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'converter' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Image Converter
            </button>
            <button
              onClick={() => handleNav('guide')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'guide' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Cloudflare Guide
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'about' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              About
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('resizer')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <span>Resize an Image</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-5 space-y-2">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
              currentPage === 'home' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('resizer')}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
              currentPage === 'resizer' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Image Resizer
          </button>
          <button
            onClick={() => handleNav('compressor')}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
              currentPage === 'compressor' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Image Compressor
          </button>
          <button
            onClick={() => handleNav('converter')}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
              currentPage === 'converter' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Image Converter
          </button>
          <button
            onClick={() => handleNav('guide')}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
              currentPage === 'guide' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Deployment Guide
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
              currentPage === 'about' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleNav('contact')}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
              currentPage === 'contact' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Contact
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNav('resizer')}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
            >
              Start Resizing Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
