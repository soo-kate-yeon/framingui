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
      <section className="max-w-7xl mx-auto opacity-20 pointer-events-none">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Next Assets coming soon...</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="aspect-[4/3] bg-white rounded-2xl border border-slate-200 flex items-center justify-center">
            Foundation Section
          </div>
          <div className="aspect-[4/3] bg-white rounded-2xl border border-slate-200 flex items-center justify-center">
            Core Strengths Section
          </div>
          <div className="aspect-[4/3] bg-white rounded-2xl border border-slate-200 flex items-center justify-center">
            Reliability Section
          </div>
        </div>
      </section>
    </main>
  );
}
