import React, { useState } from 'react';
import {
  Terminal,
  Globe,
  Github,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  ServerOff,
  Cloud,
} from 'lucide-react';

export const DeploymentGuide: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Testing & Publishing Guide
        </h1>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          How to test QuickKit Images locally and publish it for free using GitHub and Cloudflare Pages.
        </p>
      </div>

      {/* Why Static Hosting Works */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-6 mb-10">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">
              100% Serverless & Free Static Hosting Ready
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Because QuickKit Images processes all images entirely on the client side using standard HTML5 Canvas and Web APIs, the compiled build consists strictly of static HTML, JavaScript, and CSS files. You can host this website completely free of charge with zero server costs, unlimited bandwidth, and global edge caching on Cloudflare Pages or GitHub Pages.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Breakdown */}
      <div className="space-y-8">
        {/* Step 1: Local Testing */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Test the Production Build Locally
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            Verify that your static bundle compiles cleanly without warnings or missing assets.
          </p>

          <div className="space-y-2">
            <div className="relative bg-slate-900 text-slate-100 rounded-lg p-3.5 font-mono text-xs overflow-x-auto">
              <button
                onClick={() =>
                  copyToClipboard('npm run build\nnpm run preview', 'test-cmd')
                }
                className="absolute top-2.5 right-2.5 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] flex items-center gap-1 transition-colors"
              >
                {copiedId === 'test-cmd' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'test-cmd' ? 'Copied' : 'Copy'}</span>
              </button>
              <code>
                # Build optimized production assets into /dist<br />
                npm run build<br /><br />
                # Start local preview server to test the production build<br />
                npm run preview
              </code>
            </div>
            <p className="text-[11px] text-slate-500">
              Open the preview URL printed in your console to verify all tools (Resizer, Compressor, Converter) work with sample and local files.
            </p>
          </div>
        </div>

        {/* Step 2: Push to GitHub */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Push Your Code to a GitHub Repository
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            Create a repository on GitHub to store your codebase and enable automated continuous deployments.
          </p>

          <div className="space-y-2">
            <div className="relative bg-slate-900 text-slate-100 rounded-lg p-3.5 font-mono text-xs overflow-x-auto">
              <button
                onClick={() =>
                  copyToClipboard(
                    'git init\ngit add .\ngit commit -m "Initial commit for QuickKit Images"\ngit branch -M main\ngit remote add origin https://github.com/YOUR_USERNAME/quickkit-images.git\ngit push -u origin main',
                    'git-cmd'
                  )
                }
                className="absolute top-2.5 right-2.5 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] flex items-center gap-1 transition-colors"
              >
                {copiedId === 'git-cmd' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'git-cmd' ? 'Copied' : 'Copy'}</span>
              </button>
              <code>
                git init<br />
                git add .<br />
                git commit -m "Initial commit for QuickKit Images"<br />
                git branch -M main<br />
                git remote add origin https://github.com/YOUR_USERNAME/quickkit-images.git<br />
                git push -u origin main
              </code>
            </div>
          </div>
        </div>

        {/* Step 3: Connect to Cloudflare Pages */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Deploy to Cloudflare Pages (Recommended)
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            Cloudflare Pages provides unlimited free bandwidth, global Anycast CDN distribution, and free automatic SSL/TLS.
          </p>

          <div className="space-y-4">
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-700">
              <li>
                Log into your free account at{' '}
                <a
                  href="https://dash.cloudflare.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  dash.cloudflare.com
                </a>.
              </li>
              <li>
                In the left sidebar, navigate to <strong>Workers & Pages</strong> and click <strong>Create application</strong>.
              </li>
              <li>
                Select the <strong>Pages</strong> tab, then click <strong>Connect to Git</strong>.
              </li>
              <li>
                Authorize GitHub and select your repository (<code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono">quickkit-images</code>).
              </li>
            </ol>

            {/* Build Settings Reference Box */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Exact Cloudflare Build Configuration
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-2.5 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Framework preset:</span>
                  <span className="font-mono font-semibold text-slate-900">Vite</span>
                </div>
                <div className="bg-white p-2.5 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Build command:</span>
                  <span className="font-mono font-semibold text-slate-900">npm run build</span>
                </div>
                <div className="bg-white p-2.5 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Build output directory:</span>
                  <span className="font-mono font-semibold text-slate-900">dist</span>
                </div>
                <div className="bg-white p-2.5 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Root directory:</span>
                  <span className="font-mono font-semibold text-slate-900">/ (leave blank)</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Click <strong>Save and Deploy</strong>. Cloudflare Pages will build the site in roughly 20-30 seconds and provide an instant live URL (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600 font-mono">quickkit-images.pages.dev</code>).
            </p>
          </div>
        </div>

        {/* Step 4: Direct CLI alternative */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center">
              4
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Alternative: Direct CLI Deploy (No Git required)
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-3">
            If you do not want to connect GitHub, you can publish straight from your local terminal with Cloudflare Wrangler:
          </p>
          <div className="relative bg-slate-900 text-slate-100 rounded-lg p-3.5 font-mono text-xs overflow-x-auto">
            <button
              onClick={() =>
                copyToClipboard(
                  'npm run build\nnpx wrangler pages deploy dist --project-name=quickkit-images',
                  'wrangler-cmd'
                )
              }
              className="absolute top-2.5 right-2.5 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] flex items-center gap-1 transition-colors"
            >
              {copiedId === 'wrangler-cmd' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedId === 'wrangler-cmd' ? 'Copied' : 'Copy'}</span>
            </button>
            <code>
              npm run build<br />
              npx wrangler pages deploy dist --project-name=quickkit-images
            </code>
          </div>
        </div>

        {/* Step 5: Custom Domain */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center">
              5
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Attach a Custom Domain (e.g. quickkitimages.com)
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            In your Cloudflare Pages project settings, click <strong>Custom domains</strong> → <strong>Set up a custom domain</strong>. Enter your apex domain or subdomain. Cloudflare automatically configures DNS records and provisions a free Universal SSL certificate within minutes.
          </p>
        </div>
      </div>
    </div>
  );
};
