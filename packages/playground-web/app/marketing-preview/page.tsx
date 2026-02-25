'use client';

import { HeroUniverse } from '@/components/marketing/HeroUniverse';
import {
  ColorTokenAsset,
  LayoutTokenAsset,
  ComponentGalleryAsset,
} from '@/components/marketing/Section1Assets';
import {
  MCPVersatilityAsset,
  DesignSystemCoreAsset,
  TSCodeExportAsset,
} from '@/components/marketing/Section2Assets';
import {
  ConstraintReliabilityAsset,
  TemplateEfficiencyAsset,
  VerificationLogicAsset,
} from '@/components/marketing/Section3Assets';
import { LayeredSquareAsset } from '@/components/marketing/LayeredSquareAsset';

export default function MarketingPreviewPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8 md:p-24 space-y-24">
      <section className="max-w-7xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">1. Hero Universe Asset</h2>
          <p className="text-slate-500 mb-6">
            Interactive parallax atmosphere with floating components and tokens.
          </p>
          <div className="w-full">
            <HeroUniverse />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Section 1-0: Color Token</h2>
            <p className="text-slate-400 text-sm mb-4">
              Semantic swatches with fan-out interaction.
            </p>
            <ColorTokenAsset />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Section 1-1: Layout Token</h2>
            <LayoutTokenAsset />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Section 1-2: Components</h2>
            <ComponentGalleryAsset />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Section 1-3: Template Efficiency
            </h2>
            <p className="text-slate-400 text-sm mb-4">High-quality production skeletons.</p>
            <TemplateEfficiencyAsset />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-24">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Section 2-0: MCP Versatility</h2>
            <p className="text-slate-400 text-sm mb-4">
              Core adapter connecting universal frameworks.
            </p>
            <MCPVersatilityAsset />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Section 2-1: Design System Core
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              Exploding components into design constraints.
            </p>
            <DesignSystemCoreAsset />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Section 2-2: TS Code Export</h2>
            <p className="text-slate-400 text-sm mb-4">Clean, type-safe code generation preview.</p>
            <TSCodeExportAsset />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-24">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Section 3-0: Constraint Reliability
            </h2>
            <p className="text-slate-400 text-sm mb-4">No-hallucination scan and validation.</p>
            <ConstraintReliabilityAsset />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Section 3-1: Verification Logic
            </h2>
            <p className="text-slate-400 text-sm mb-4">Terminal simulation of CI/CD checks.</p>
            <VerificationLogicAsset />
          </div>
        </div>
      </section>

      {/* Placeholder for future sections */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Generated Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-slate-900">Layered Square</h3>
            <p className="text-slate-500 text-sm">
              Isometric stacked layers with architectural grid
            </p>
            <div className="aspect-square w-full">
              <LayeredSquareAsset className="w-full h-full" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-slate-900">Logo Export</h3>
            <p className="text-slate-500 text-sm">
              Full asset with grayscale grid and white background
            </p>
            <div className="aspect-square w-full bg-white rounded-2xl border border-slate-100 flex flex-col items-center justify-center gap-8 p-4">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">256x256 preview</span>
                  <div className="w-32 h-32 border border-slate-50 shadow-sm rounded-lg overflow-hidden logo-export-container">
                    <LayeredSquareAsset size="100%" />
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const svg = document.querySelector('.logo-export-container svg');
                  if (!svg) {
                    return;
                  }

                  // Clone SVG and set dimensions
                  const svgClone = svg.cloneNode(true) as SVGElement;
                  svgClone.setAttribute('width', '1024');
                  svgClone.setAttribute('height', '1024');

                  // Ensure white background is explicitly set for PNG export
                  const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                  bgRect.setAttribute('width', '1024');
                  bgRect.setAttribute('height', '1024');
                  bgRect.setAttribute('fill', 'white');
                  svgClone.insertBefore(bgRect, svgClone.firstChild);

                  const svgData = new XMLSerializer().serializeToString(svgClone);
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  const img = new Image();

                  img.onload = () => {
                    canvas.width = 1024;
                    canvas.height = 1024;
                    if (ctx) {
                      ctx.fillStyle = 'white';
                      ctx.fillRect(0, 0, 1024, 1024);
                      ctx.drawImage(img, 0, 0, 1024, 1024);
                    }
                    const png = canvas.toDataURL('image/png');
                    const downloadLink = document.createElement('a');
                    downloadLink.download = 'tekton-logo.png';
                    downloadLink.href = png;
                    downloadLink.click();
                  };
                  img.src =
                    'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
                }}
                className="px-4 py-2 bg-[#004CD4] text-white rounded-lg text-sm font-medium hover:bg-[#003bb0] transition-colors"
                id="download-logo-btn"
              >
                Download PNG (1024px)
              </button>
            </div>
          </div>
          <div className="aspect-[4/3] bg-white rounded-2xl border border-slate-200 flex items-center justify-center opacity-20 pointer-events-none">
            Foundation Section
          </div>
          <div className="aspect-[4/3] bg-white rounded-2xl border border-slate-200 flex items-center justify-center opacity-20 pointer-events-none">
            Core Strengths Section
          </div>
          <div className="aspect-[4/3] bg-white rounded-2xl border border-slate-200 flex items-center justify-center opacity-20 pointer-events-none">
            Reliability Section
          </div>
        </div>
      </section>
    </main>
  );
}
