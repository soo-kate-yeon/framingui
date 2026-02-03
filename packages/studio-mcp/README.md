# @tekton/studio-mcp

Brand DNA MCP Integration for Tekton Studio - Model Context Protocol integration enabling AI assistants to read and write Brand DNA configurations for design token generation.

## Overview

This package provides the core functionality for SPEC-STUDIO-001 (Brand DNA MCP Integration), implementing:

- **Brand DNA Schema Validation** - Zod-based schema validation for Brand DNA objects with 5 personality axes
- **Axis Interpreter Engine** - Converts numerical axis values (0-1) to design token characteristics
- **File-Based Storage** - JSON file storage with Git-trackable `.tekton/brand-dna/` structure
- **Design Token Types** - TypeScript type definitions for 9 design token categories

## Installation

```bash
pnpm add @tekton/studio-mcp
```

## Quick Start

```typescript
import {
  BrandDNASchema,
  interpretBrandDNA,
  saveBrandDNA,
  loadBrandDNA,
  listBrandDNA
} from '@tekton/studio-mcp';

// Create and validate Brand DNA
const brandDNA = BrandDNASchema.parse({
  id: 'tech-startup',
  name: 'Modern Tech Startup',
  description: 'Clean, minimal, high-energy brand',
  axes: {
    density: 0.7,      // Compact spacing
    warmth: 0.4,       // Neutral temperature
    playfulness: 0.3,  // Subtle animations
    sophistication: 0.6, // Balanced style
    energy: 0.8        // High contrast
  },
  version: '1.0.0',
  createdAt: new Date(),
  updatedAt: new Date()
});

// Interpret axes to design token characteristics
const interpretation = interpretBrandDNA(brandDNA);
console.log(interpretation.density);
// { spacing: 'compact', size: 'small' }

// Save to file system
await saveBrandDNA('my-project', 'tech-startup', brandDNA);

// Load from file system
const loaded = await loadBrandDNA('my-project', 'tech-startup');

// List all brand DNAs for a project
const allBrands = await listBrandDNA('my-project');
```

## API Reference

### Schema Validation

#### `BrandDNASchema`

Zod schema for validating complete Brand DNA objects.

```typescript
const brandDNA = BrandDNASchema.parse({
  id: string,              // Unique identifier (min 1 char)
  name: string,            // Display name (min 1 char)
  description?: string,    // Optional description
  axes: {
    density: number,       // 0-1 range
    warmth: number,        // 0-1 range
    playfulness: number,   // 0-1 range
    sophistication: number,// 0-1 range
    energy: number         // 0-1 range
  },
  version: string,         // Semantic version (e.g., "1.0.0")
  createdAt: Date,         // ISO date string or Date object
  updatedAt: Date          // ISO date string or Date object
});
```

**Validation Rules:**
- All axis values must be between 0 and 1 (inclusive)
- ID and name are required and trimmed
- Version must follow semantic versioning (MAJOR.MINOR.PATCH)
- Dates are coerced from ISO strings to Date objects

#### `BrandAxisSchema`

Validates individual axis values.

```typescript
const axisValue = BrandAxisSchema.parse(0.5); // Valid: 0-1 range
```

### Axis Interpreter

#### `interpretAxis(axisName, value)`

Interprets a single axis value to design token characteristics.

**Parameters:**
- `axisName`: `'density' | 'warmth' | 'playfulness' | 'sophistication' | 'energy'`
- `value`: `number` (0-1 range)

**Returns:** Axis-specific interpretation object

**Axis Conversion Rules:**

**Density** (spacing and size):
- `0 - 0.29`: `{ spacing: 'generous', size: 'large' }`
- `0.3 - 0.69`: `{ spacing: 'comfortable', size: 'medium' }`
- `0.7 - 1`: `{ spacing: 'compact', size: 'small' }`

**Warmth** (color temperature):
- `0 - 0.29`: `{ temperature: 'cool' }`
- `0.3 - 0.69`: `{ temperature: 'neutral' }`
- `0.7 - 1`: `{ temperature: 'warm' }`

**Playfulness** (corners and animation):
- `0 - 0.29`: `{ corners: 'sharp', animation: 'subtle' }`
- `0.3 - 0.69`: `{ corners: 'moderate', animation: 'standard' }`
- `0.7 - 1`: `{ corners: 'round', animation: 'playful' }`

**Sophistication** (style and detail):
- `0 - 0.29`: `{ style: 'casual', detail: 'minimal' }`
- `0.3 - 0.69`: `{ style: 'balanced', detail: 'moderate' }`
- `0.7 - 1`: `{ style: 'elegant', detail: 'refined' }`

**Energy** (intensity and contrast):
- `0 - 0.29`: `{ intensity: 'low', contrast: 'muted' }`
- `0.3 - 0.69`: `{ intensity: 'medium', contrast: 'balanced' }`
- `0.7 - 1`: `{ intensity: 'high', contrast: 'vibrant' }`

**Example:**

```typescript
import { interpretAxis } from '@tekton/studio-mcp';

const density = interpretAxis('density', 0.8);
// Returns: { spacing: 'compact', size: 'small' }

const warmth = interpretAxis('warmth', 0.5);
// Returns: { temperature: 'neutral' }
```

#### `interpretBrandDNA(brandDNA)`

Interprets all five axes in a Brand DNA object.

**Parameters:**
- `brandDNA`: Complete `BrandDNA` object

**Returns:** Object with all five axis interpretations

```typescript
import { interpretBrandDNA } from '@tekton/studio-mcp';

const interpretation = interpretBrandDNA(myBrandDNA);
// Returns:
// {
//   density: { spacing: 'comfortable', size: 'medium' },
//   warmth: { temperature: 'neutral' },
//   playfulness: { corners: 'sharp', animation: 'subtle' },
//   sophistication: { style: 'elegant', detail: 'refined' },
//   energy: { intensity: 'medium', contrast: 'balanced' }
// }
```

### Preset Management

#### `listPresets()`

Lists all available Brand DNA presets included in the package.

**Returns:** Array of preset summary objects with `id`, `name`, and `description`

**Example:**

```typescript
import { listPresets } from '@tekton/studio-mcp';

const presets = listPresets();
// Returns:
// [
//   { id: 'modern-tech', name: 'Modern Tech', description: 'Clean, minimal, high-energy brand' },
//   { id: 'luxury-fashion', name: 'Luxury Fashion', description: 'Elegant, warm, refined brand' },
//   { id: 'friendly-casual', name: 'Friendly Casual', description: 'Playful, approachable, energetic brand' }
// ]

console.log(`Available presets: ${presets.length}`);
presets.forEach(preset => {
  console.log(`- ${preset.name}: ${preset.description}`);
});
```

#### `getPreset(presetId)`

Loads a specific Brand DNA preset by ID.

**Parameters:**
- `presetId`: Preset identifier (e.g., `'modern-tech'`, `'luxury-fashion'`, `'friendly-casual'`)

**Returns:** Complete `BrandDNA` object with all axis values and metadata

**Throws:**
- `PresetNotFoundError` if preset ID doesn't exist

**Available Presets:**

**Modern Tech** (`modern-tech`):
- Density: 0.7 (Compact spacing, small components)
- Warmth: 0.4 (Neutral-cool color temperature)
- Playfulness: 0.3 (Subtle animations, moderate corners)
- Sophistication: 0.6 (Balanced-elegant style)
- Energy: 0.8 (High contrast, vibrant colors)
- **Use Case**: SaaS products, tech startups, developer tools

**Luxury Fashion** (`luxury-fashion`):
- Density: 0.2 (Generous spacing, large components)
- Warmth: 0.75 (Warm color temperature)
- Playfulness: 0.15 (Minimal animations, sharp corners)
- Sophistication: 0.9 (Elegant style, refined details)
- Energy: 0.35 (Low-medium contrast, muted colors)
- **Use Case**: High-end retail, premium brands, luxury services

**Friendly Casual** (`friendly-casual`):
- Density: 0.5 (Comfortable spacing, medium components)
- Warmth: 0.8 (Warm color temperature)
- Playfulness: 0.85 (Playful animations, round corners)
- Sophistication: 0.4 (Casual style, moderate details)
- Energy: 0.7 (Medium-high contrast, balanced saturation)
- **Use Case**: Consumer apps, social platforms, lifestyle brands

**Example:**

```typescript
import { getPreset } from '@tekton/studio-mcp';

try {
  // Load Modern Tech preset
  const modernTech = getPreset('modern-tech');
  console.log(modernTech.name); // "Modern Tech"
  console.log(modernTech.axes.energy); // 0.8

  // Load Luxury Fashion preset
  const luxury = getPreset('luxury-fashion');
  console.log(luxury.axes.sophistication); // 0.9

  // Load non-existent preset
  const invalid = getPreset('unknown'); // Throws PresetNotFoundError
} catch (error) {
  if (error instanceof PresetNotFoundError) {
    console.error('Preset not found:', error.message);
  }
}
```

#### `PresetSchema`

Zod schema for validating Brand DNA presets.

**Schema Structure:**

```typescript
const PresetSchema = z.object({
  id: z.string().min(1),           // Preset identifier (kebab-case)
  name: z.string().min(1),         // Display name
  description: z.string().min(1),  // Brief description
  brandDNA: BrandDNASchema         // Complete Brand DNA object
});
```

**Example:**

```typescript
import { PresetSchema } from '@tekton/studio-mcp';

// Validate preset structure
const customPreset = {
  id: 'my-preset',
  name: 'My Custom Preset',
  description: 'A custom brand personality',
  brandDNA: {
    id: 'custom-brand',
    name: 'Custom Brand',
    axes: {
      density: 0.5,
      warmth: 0.5,
      playfulness: 0.5,
      sophistication: 0.5,
      energy: 0.5
    },
    version: '1.0.0',
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

const validatedPreset = PresetSchema.parse(customPreset);
```

#### `PresetNotFoundError`

Custom error class thrown when attempting to load a non-existent preset.

**Properties:**
- `name`: Always `'PresetNotFoundError'`
- `message`: Detailed error message including preset ID
- `presetId`: The requested preset ID that wasn't found

**Example:**

```typescript
import { getPreset, PresetNotFoundError } from '@tekton/studio-mcp';

try {
  const preset = getPreset('non-existent-preset');
} catch (error) {
  if (error instanceof PresetNotFoundError) {
    console.error('Error:', error.message);
    console.error('Requested preset:', error.presetId);
    // Suggest alternatives
    const available = listPresets();
    console.log('Available presets:', available.map(p => p.id).join(', '));
  }
}
```

### Storage

#### `saveBrandDNA(projectId, brandId, brandDNA, basePath?)`

Saves Brand DNA to JSON file with automatic timestamp update.

**Parameters:**
- `projectId`: Project identifier (used as subdirectory)
- `brandId`: Brand identifier (used as filename)
- `brandDNA`: Brand DNA object to save
- `basePath?`: Optional base storage path (default: `.tekton/brand-dna`)

**Storage Structure:**
```
.tekton/brand-dna/
  my-project/
    brand-001.json
    brand-002.json
  another-project/
    brand-003.json
```

**Features:**
- Automatically creates directory structure if missing
- Updates `updatedAt` timestamp on every save
- Preserves `createdAt` timestamp when overwriting
- Pretty-prints JSON with 2-space indentation
- Git-trackable file format

**Example:**

```typescript
await saveBrandDNA('my-app', 'primary-brand', brandDNA);
// Creates: .tekton/brand-dna/my-app/primary-brand.json
```

#### `loadBrandDNA(projectId, brandId, basePath?)`

Loads and validates Brand DNA from JSON file.

**Parameters:**
- `projectId`: Project identifier
- `brandId`: Brand identifier
- `basePath?`: Optional base storage path (default: `.tekton/brand-dna`)

**Returns:** Validated `BrandDNA` object

**Throws:**
- Error if file does not exist
- ZodError if validation fails

**Example:**

```typescript
try {
  const brandDNA = await loadBrandDNA('my-app', 'primary-brand');
  console.log(brandDNA.name);
} catch (error) {
  console.error('Failed to load brand DNA:', error);
}
```

#### `listBrandDNA(projectId, basePath?)`

Lists all Brand DNA files for a project.

**Parameters:**
- `projectId`: Project identifier
- `basePath?`: Optional base storage path (default: `.tekton/brand-dna`)

**Returns:** Array of validated `BrandDNA` objects

**Features:**
- Returns empty array if project directory doesn't exist
- Skips invalid JSON files with warning
- Only processes `.json` files
- Validates each file against schema

**Example:**

```typescript
const allBrands = await listBrandDNA('my-app');
console.log(`Found ${allBrands.length} brand DNAs`);
allBrands.forEach(brand => {
  console.log(`- ${brand.name} (${brand.id})`);
});
```

## Design Token Types

The package provides TypeScript type definitions for design tokens:

```typescript
import type { DesignToken } from '@tekton/studio-mcp';

const tokens: DesignToken = {
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' },
  typography: {
    fontFamily: { sans: 'Inter, sans-serif', mono: 'Menlo, monospace' },
    fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '24px' },
    fontWeight: { normal: '400', medium: '500', bold: '700' },
    lineHeight: { tight: '1.2', normal: '1.5', relaxed: '1.75' }
  },
  colors: { primary: '#0066CC', secondary: '#6B46C1', neutral: '#718096' },
  borderRadius: { none: '0px', sm: '4px', md: '8px', lg: '16px', full: '9999px' },
  shadows: { sm: '0 1px 2px rgba(0,0,0,0.05)', md: '0 4px 6px rgba(0,0,0,0.1)' },
  opacity: { low: '0.3', medium: '0.6', high: '0.9' },
  transitions: { fast: '150ms', normal: '300ms', slow: '500ms' },
  breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
  zIndex: { dropdown: '1000', modal: '2000', tooltip: '3000' }
};
```

## TypeScript Support

The package is written in TypeScript and provides full type definitions.

```typescript
import type {
  BrandDNA,
  BrandAxes,
  BrandAxis,
  AxisName,
  BrandDNAInterpretation,
  DensityInterpretation,
  WarmthInterpretation,
  PlayfulnessInterpretation,
  SophisticationInterpretation,
  EnergyInterpretation,
  DesignToken,
  TypographyValue,
  Preset,
  PresetSummary
} from '@tekton/studio-mcp';

// Import classes
import { PresetNotFoundError } from '@tekton/studio-mcp';
```

## Error Handling

All functions throw descriptive errors for common failure cases:

```typescript
// Invalid axis value
try {
  interpretAxis('density', 1.5);
} catch (error) {
  // Error: Axis value must be between 0 and 1
}

// Invalid axis name
try {
  interpretAxis('invalid' as any, 0.5);
} catch (error) {
  // Error: Unknown axis: invalid
}

// File not found
try {
  await loadBrandDNA('project', 'non-existent');
} catch (error) {
  // Error: Brand DNA not found: non-existent in project project
}

// Schema validation failure
try {
  BrandDNASchema.parse({ id: '', name: 'Test' });
} catch (error) {
  // ZodError with validation details
}
```

## Testing

The package includes comprehensive test coverage (98.88%):

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

**Test Statistics:**
- 74 test cases
- 98.88% statement coverage
- 94.11% branch coverage
- 100% function coverage

## Development

```bash
# Install dependencies
pnpm install

# Build TypeScript
pnpm build

# Run linter
pnpm lint

# Format code
pnpm format

# Development mode (watch)
pnpm dev
```

## Architecture

**Technology Stack:**
- TypeScript 5.7.3 (strict mode)
- Zod 3.23.8 (schema validation)
- Node.js 20+ (ES2022 modules)
- Vitest 2.1.8 (testing)

**Design Decisions:**
1. **File-based storage** - Simple, Git-trackable, no database required
2. **Hardcoded axis ranges** - Predictable, testable, MVP-appropriate
3. **Zod validation** - Runtime type safety and clear error messages
4. **Monorepo structure** - Part of larger Tekton ecosystem

## SPEC Compliance

This package implements the requirements from SPEC-STUDIO-001:

- ✅ REQ-001: Brand DNA JSON schema validation (Zod)
- ✅ REQ-002: MCP Brand DNA Save (file storage with timestamps)
- ✅ REQ-003: MCP Brand DNA Read (file loading with validation)
- ✅ REQ-004: Axis Interpreter (5 axes × 3 ranges = 15 mappings)
- ✅ REQ-005: Invalid axis value rejection (0-1 range validation)
- ✅ AC-001: Schema validation 100% (all tests pass)
- ✅ AC-002: Axis Interpreter accuracy (boundary value testing)
- ✅ AC-004: Test coverage ≥85% (98.88% achieved)

## License

MIT

## Contributing

This package is part of the Tekton monorepo. See the main repository for contribution guidelines.

## Version

Current version: 0.1.0

Last updated: 2026-01-13
