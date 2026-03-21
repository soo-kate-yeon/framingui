'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Switch,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@framingui/ui';
import { getThemeThumbnailVars, type ThumbnailVars } from '../../lib/theme-thumbnail-resolver';
import { trackTemplatePromptCopied } from '../../lib/analytics';

// ============================================================================
// Types
// ============================================================================

interface ThemeRecipeCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    descriptionKo?: string;
  };
  copyPromptLabel: string;
}

// ============================================================================
// CSS Variable Bridge
// Maps ThumbnailVars → @framingui/ui component CSS variables
// ============================================================================

function buildComponentVars(vars: ThumbnailVars): React.CSSProperties {
  return {
    '--bg-background': vars['--bg-canvas'],
    '--bg-card': vars['--bg-surface'],
    '--bg-card-foreground': vars['--text-primary'],
    '--bg-secondary': vars['--bg-secondary'],
    '--bg-secondary-foreground': vars['--text-primary'],
    '--bg-muted': vars['--bg-secondary'],
    '--bg-muted-foreground': vars['--text-tertiary'],
    '--bg-accent': vars['--bg-secondary'],
    '--bg-accent-foreground': vars['--text-primary'],
    '--bg-foreground': vars['--text-primary'],
    '--bg-popover': vars['--bg-surface'],
    '--bg-popover-foreground': vars['--text-primary'],
    '--bg-primary': vars['--action-primary'],
    '--bg-primary-foreground': vars['--action-primary-text'],
    '--border-default': vars['--border-default'],
    '--border-input': vars['--border-default'],
    '--border-ring': vars['--action-primary'],
    '--radius-sm': vars['--radius-sm'] ?? '4px',
    '--radius-md': vars['--radius-md'] ?? '8px',
    '--radius-lg': vars['--radius-lg'] ?? '12px',
    '--radius-xl': vars['--radius-xl'] ?? '16px',
    '--radius-full': vars['--radius-full'] ?? '9999px',
    '--spacing-1': '0.25rem',
    '--spacing-2': '0.5rem',
    '--spacing-3': '0.75rem',
    '--spacing-4': '1rem',
    '--spacing-6': '1.25rem',
    '--spacing-8': '2rem',
  } as React.CSSProperties;
}

// ============================================================================
// Row 1: Color Palette & Typography
// ============================================================================

function ColorPaletteCell({ vars }: { vars: ThumbnailVars }) {
  const swatches = [
    { label: 'Canvas', color: vars['--bg-canvas'] },
    { label: 'Surface', color: vars['--bg-surface'] },
    { label: 'Primary', color: vars['--text-primary'] },
    { label: 'Secondary', color: vars['--text-secondary'] },
    { label: 'Action', color: vars['--action-primary'] },
    { label: 'Border', color: vars['--border-default'] },
  ];

  return (
    <div className="flex flex-col gap-3">
      <span
        className="text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: vars['--text-tertiary'] }}
      >
        Color Palette
      </span>
      <div className="grid grid-cols-3 grid-rows-2 gap-1.5">
        {swatches.map((s) => (
          <div
            key={s.label}
            className="relative h-14 rounded-md border overflow-hidden"
            style={{
              background: s.color,
              borderColor: vars['--border-default'],
            }}
          >
            <span
              className="absolute bottom-1 left-1.5 text-[9px] font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
              style={{ color: vars['--bg-canvas'] === s.color ? vars['--text-secondary'] : '#fff' }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypographyCell({ vars }: { vars: ThumbnailVars }) {
  return (
    <div className="flex flex-col gap-3">
      <span
        className="text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: vars['--text-tertiary'] }}
      >
        Typography
      </span>
      <div className="flex flex-col gap-1.5">
        <span className="text-4xl font-bold leading-none" style={{ color: vars['--text-primary'] }}>
          Aa
        </span>
        <span className="text-base font-semibold" style={{ color: vars['--text-primary'] }}>
          Headline
        </span>
        <span className="text-sm" style={{ color: vars['--text-secondary'] }}>
          Body text sample
        </span>
        <span
          className="text-[10px] uppercase tracking-wider"
          style={{ color: vars['--text-tertiary'] }}
        >
          LABEL TEXT
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// Row 2: Real ComponentGallery components
// ============================================================================

function CardFormCell({ prefix }: { prefix: string }) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={`${prefix}-name`}>Name</Label>
              <Input id={`${prefix}-name`} placeholder="Name of your project" readOnly />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={`${prefix}-framework`}>Framework</Label>
              <Select defaultValue="next">
                <SelectTrigger id={`${prefix}-framework`}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}

function SwitchCell({ prefix }: { prefix: string }) {
  return (
    <Card className="shadow-none">
      <CardContent className="p-4 sm:p-6 grid gap-4 sm:gap-6">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor={`${prefix}-airplane`} className="flex flex-col space-y-1">
            <span>Airplane Mode</span>
            <span className="font-normal leading-snug text-[var(--bg-muted-foreground)] text-xs sm:text-sm">
              Turn off all incoming connections.
            </span>
          </Label>
          <Switch id={`${prefix}-airplane`} defaultChecked className="shrink-0" />
        </div>
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor={`${prefix}-marketing`} className="flex flex-col space-y-1">
            <span>Marketing Emails</span>
            <span className="font-normal leading-snug text-[var(--bg-muted-foreground)] text-xs sm:text-sm">
              Receive emails about new products.
            </span>
          </Label>
          <Switch id={`${prefix}-marketing`} className="shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
}

function ButtonsCell() {
  return (
    <Card className="shadow-none p-4 sm:p-6 space-y-3">
      <Label className="uppercase tracking-wide text-xs text-[var(--bg-muted-foreground)]">
        Action Buttons
      </Label>
      <div className="flex flex-wrap gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </Card>
  );
}

// ============================================================================
// ThemeRecipeCard
// ============================================================================

export function ThemeRecipeCard({ template, copyPromptLabel }: ThemeRecipeCardProps) {
  const [copied, setCopied] = useState(false);
  const vars = getThemeThumbnailVars(template.id);

  if (!vars) {
    return null;
  }

  const componentVars = buildComponentVars(vars);

  const handleCopy = async () => {
    const prompt = `Create a screen using the ${template.name} theme with framingui MCP server`;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);

    trackTemplatePromptCopied({
      template_id: template.id,
      template_name: template.name,
    });

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-[92vw] md:w-[82vw] lg:w-[880px] flex-shrink-0 snap-center rounded-2xl border border-neutral-200 shadow-sm transition-shadow hover:shadow-md overflow-hidden">
      {/* Themed zone — CSS vars bridge so real @framingui/ui components render with this theme */}
      <div
        className="p-5 sm:p-6"
        style={{
          ...componentVars,
          background: vars['--bg-canvas'],
          color: vars['--text-primary'],
        }}
      >
        {/* Row 1: Color Palette + Typography */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-xl" style={{ background: vars['--bg-surface'] }}>
            <ColorPaletteCell vars={vars} />
          </div>
          <div className="p-4 rounded-xl" style={{ background: vars['--bg-surface'] }}>
            <TypographyCell vars={vars} />
          </div>
        </div>

        {/* Row 2: Card + Switch + Buttons — exact ComponentGallery components */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CardFormCell prefix={template.id} />
          <SwitchCell prefix={template.id} />
          <ButtonsCell />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 bg-white border-t border-neutral-100">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-neutral-900">{template.name}</h3>
          <p className="mt-0.5 text-xs text-neutral-500 truncate">{template.description}</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              {copyPromptLabel}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
