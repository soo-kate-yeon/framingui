import { useEffect, useState } from 'react';
import { X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { TemplateData } from '../../data/templates';
import { useExploreLanguage } from '../../contexts/ExploreLanguageContext';
import { getExploreContent, getTemplatePriceLabel } from '../../data/i18n/explore';

// ============================================================================
// Types
// ============================================================================

interface TemplateModalProps {
  template: TemplateData;
  isOpen: boolean;
  onClose: () => void;
  /** Double 패키지 선택 모드 진입 콜백 */
  onSelectDouble?: () => void;
}

// ============================================================================
// Component
// ============================================================================

export function TemplateModal({ template, isOpen, onClose, onSelectDouble }: TemplateModalProps) {
  const { locale } = useExploreLanguage();
  const i18n = getExploreContent(locale);
  const [activeChipIdx, setActiveChipIdx] = useState(0);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const prevImage = () => {
    setCurrentImageIdx((prev) => (prev === 0 ? template.screenshots.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev === template.screenshots.length - 1 ? 0 : prev + 1));
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false); // Reset state after animation
    }, 200); // 200ms matches the duration-200 class
  };

  // Body Scroll Lock & Reset State
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false); // Ensure it's false when reopening
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  // Translation helpers
  const displayTitle = template.name;
  const displayTagline =
    locale === 'ko' && template.taglineKo ? template.taglineKo : template.tagline;
  const displayDesc =
    locale === 'ko' && template.descriptionKo ? template.descriptionKo : template.description;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-12">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-neutral-950/20 backdrop-blur-sm transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full h-full sm:h-auto max-w-6xl max-h-full bg-white sm:rounded-[24px] shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col duration-200 ${
          isClosing ? 'animate-out fade-out zoom-out-95' : 'animate-in fade-in zoom-in-95'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
          aria-label={i18n.templateModal.closeModalAria}
        >
          <X size={20} />
        </button>

        <div className="p-5 pt-14 sm:p-8 md:p-12 space-y-16 sm:space-y-24">
          {/* ============================================================== */}
          {/* Section 1: Hero (Left / Right) */}
          {/* ============================================================== */}
          <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-20">
            {/* Left: Info & Pricing */}
            <div className="flex flex-col justify-center py-2 sm:py-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 mb-3 sm:mb-4">
                {displayTitle}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-500 font-medium tracking-tight mb-4 sm:mb-6">
                {displayTagline}
              </p>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-8 sm:mb-10 max-w-md">
                {displayDesc}
              </p>

              {/* Pricing Options & CTAs */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <button className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-full bg-neutral-950 px-8 py-4 text-base font-medium text-white shadow-lg hover:bg-neutral-800 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2">
                    {getTemplatePriceLabel(locale, template.price)}
                  </button>
                  <a
                    href={`/explore/${template.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-[0.5] sm:flex-none inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-4 text-base font-medium text-neutral-950 shadow-sm hover:bg-neutral-50 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 gap-2"
                  >
                    {i18n.templateModal.liveDemo} <span className="text-neutral-500">→</span>
                  </a>
                </div>

                <div className="flex flex-col gap-3 justify-center pt-2">
                  <button
                    onClick={onSelectDouble}
                    className="group flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors text-left w-fit"
                  >
                    <span className="underline underline-offset-4">
                      {i18n.templateModal.getTwoTemplates}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold tracking-widest text-emerald-700 uppercase group-hover:bg-emerald-100 transition-colors">
                      {i18n.templateModal.savePercent}
                    </span>
                  </button>
                  <button className="group flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors text-left w-fit">
                    <span className="underline underline-offset-4">
                      {i18n.templateModal.getUnlimitedAccess}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-2 py-0.5 text-[10px] font-bold tracking-widest text-brand-700 uppercase group-hover:bg-brand-100 transition-colors">
                      {i18n.templateModal.bestOffer}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Media */}
            <div className="flex flex-col gap-4">
              {/* Simple Carousel */}
              <div className="relative w-full aspect-[4/3] bg-neutral-100 rounded-2xl border border-neutral-200 overflow-hidden group">
                <img
                  key={currentImageIdx}
                  src={template.screenshots[currentImageIdx]}
                  alt={`${template.name} preview ${currentImageIdx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className =
                      'absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-neutral-100 z-0';
                    placeholder.innerHTML = `
                      <span class="text-xs text-neutral-500 uppercase tracking-widest font-medium mb-1">Screenshot ${currentImageIdx + 1}</span>
                      <span class="text-[10px] text-neutral-400">Placeholder</span>
                    `;
                    e.currentTarget.parentElement?.appendChild(placeholder);
                  }}
                />

                {/* Controls */}
                {template.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-neutral-950 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
                      aria-label={i18n.templateModal.previousImageAria}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-neutral-950 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
                      aria-label={i18n.templateModal.nextImageAria}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center gap-2 mt-2 pt-2">
                {template.screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIdx ? 'bg-neutral-900 w-4' : 'bg-neutral-300 hover:bg-neutral-400'}`}
                    aria-label={`${i18n.templateModal.slideAriaPrefix} ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          <hr className="border-neutral-200" />

          {/* ============================================================== */}
          {/* Section 2: Features & Recommended For */}
          {/* ============================================================== */}
          <section className="space-y-16 sm:space-y-24">
            {/* Features (Checklist style) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 lg:sticky top-12">
                  {i18n.templateModal.features}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 sm:gap-y-10">
                {template.features.map((feature, idx) => {
                  const fTitle =
                    locale === 'ko' && feature.titleKo ? feature.titleKo : feature.title;
                  const fDesc =
                    locale === 'ko' && feature.descriptionKo
                      ? feature.descriptionKo
                      : feature.description;
                  return (
                    <div key={idx} className="flex gap-3 sm:gap-4">
                      <div className="mt-1 shrink-0 bg-neutral-100 rounded-full p-1 h-fit">
                        <Check size={16} className="text-neutral-950" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-base font-semibold text-neutral-950 tracking-tight">
                          {fTitle}
                        </h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">{fDesc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended For (Chip style) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 lg:sticky top-12">
                  {i18n.templateModal.recommendedToUseFor}
                </h3>
              </div>
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex flex-wrap gap-2">
                  {template.recommendedFor.map((rec, idx) => {
                    const rTitle = locale === 'ko' && rec.titleKo ? rec.titleKo : rec.title;
                    const isActive = idx === activeChipIdx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveChipIdx(idx)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                          isActive
                            ? 'bg-neutral-950 text-white border-neutral-950'
                            : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50'
                        }`}
                      >
                        {rTitle}
                      </button>
                    );
                  })}
                </div>

                {/* Active Description */}
                <div className="pt-2">
                  <p className="text-base text-neutral-600 leading-relaxed">
                    {locale === 'ko' && template.recommendedFor[activeChipIdx]?.descriptionKo
                      ? template.recommendedFor[activeChipIdx]?.descriptionKo
                      : template.recommendedFor[activeChipIdx]?.description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-neutral-200" />

          {/* ============================================================== */}
          {/* Section 3: How to use */}
          {/* ============================================================== */}
          <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16 pb-8 sm:pb-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 lg:sticky top-12">
                {locale === 'ko' ? '사용 방법' : 'How to use'}
              </h3>
            </div>
            <div className="flex flex-col gap-8 sm:gap-10">
              {template.howToUse.map((step, idx) => {
                const sTitle = locale === 'ko' && step.titleKo ? step.titleKo : step.title;
                const sDesc =
                  locale === 'ko' && step.descriptionKo ? step.descriptionKo : step.description;
                return (
                  <div key={idx} className="flex gap-4 sm:gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-sm font-semibold text-neutral-600 group-hover:border-neutral-950 group-hover:text-neutral-950 group-hover:bg-neutral-50 transition-colors shrink-0">
                        {step.step}
                      </div>
                      {idx !== template.howToUse.length - 1 && (
                        <div className="w-px h-full bg-neutral-200 mt-4" />
                      )}
                    </div>
                    <div className="flex flex-col gap-2 pt-1 pb-6 flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-neutral-950 tracking-tight">
                        {sTitle}
                      </h4>
                      <p className="text-base text-neutral-600 leading-relaxed">{sDesc}</p>
                      {step.code && (
                        <pre className="mt-4 p-4 rounded-xl bg-neutral-950 text-neutral-50 text-sm overflow-x-auto font-mono whitespace-pre-wrap break-all sm:break-normal">
                          <code>{step.code}</code>
                        </pre>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
