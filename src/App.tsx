import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ResizerTool } from './components/ResizerTool';
import { CompressorTool } from './components/CompressorTool';
import { ConverterTool } from './components/ConverterTool';
import { DeploymentGuide } from './components/DeploymentGuide';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';

const PAGE_METADATA: Record<PageId, { title: string; description: string }> = {
  home: {
    title: 'QuickKit Images — Free Online Image Tools (Resize, Compress, Convert)',
    description:
      'Free, fast, and 100% private online image tools. Resize custom dimensions, compress file sizes, and convert between JPG, PNG, and WebP instantly in your browser.',
  },
  resizer: {
    title: 'Image Resizer — Resize Custom Width & Height Online | QuickKit Images',
    description:
      'Easily resize images to exact pixel dimensions or percentage scales with aspect ratio lock. 100% browser-based with zero file uploads.',
  },
  compressor: {
    title: 'Image Compressor — Reduce Image File Size Online | QuickKit Images',
    description:
      'Drastically reduce JPG, PNG, and WebP file sizes with custom quality control and batch compression. Completely free and secure.',
  },
  converter: {
    title: 'Image Converter — Convert JPG, PNG & WebP Online | QuickKit Images',
    description:
      'Convert between JPG, PNG, and WebP images in bulk directly in your browser. Handles transparent backgrounds and instant zip downloads.',
  },
  guide: {
    title: 'Publishing Guide — Test & Deploy to Cloudflare Pages & GitHub | QuickKit Images',
    description:
      'Step-by-step instructions for testing QuickKit Images locally and deploying it for free using GitHub and Cloudflare Pages.',
  },
  about: {
    title: 'About QuickKit Images — Private, Browser-Native Image Utilities',
    description:
      'Learn how QuickKit Images uses HTML5 Canvas to deliver lightning-fast, private image processing without cloud server dependencies.',
  },
  contact: {
    title: 'Contact Support & Feedback | QuickKit Images',
    description:
      'Get in touch with the QuickKit Images team with feedback, bug reports, or feature suggestions.',
  },
  privacy: {
    title: 'Privacy Policy — Zero Server Upload Guarantee | QuickKit Images',
    description:
      'Our strict commitment to user privacy. Images never leave your device and zero telemetry or marketing tracking is collected.',
  },
  terms: {
    title: 'Terms of Service | QuickKit Images',
    description:
      'Terms of use for QuickKit Images. Free for personal, commercial, and educational use worldwide.',
  },
};

export default function App() {
  const getInitialPage = (): PageId => {
    const hash = window.location.hash.replace('#', '') as PageId;
    if (hash && PAGE_METADATA[hash]) {
      return hash;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
  };

  // Sync hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (hash && PAGE_METADATA[hash]) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Update dynamic SEO page title and description meta tag
  useEffect(() => {
    const meta = PAGE_METADATA[currentPage] || PAGE_METADATA.home;
    document.title = meta.title;

    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);

    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', meta.title);
    }
    let ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) {
      ogDescTag.setAttribute('content', meta.description);
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'resizer' && <ResizerTool />}
        {currentPage === 'compressor' && <CompressorTool />}
        {currentPage === 'converter' && <ConverterTool />}
        {currentPage === 'guide' && <DeploymentGuide />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'privacy' && <PrivacyPage />}
        {currentPage === 'terms' && <TermsPage />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
