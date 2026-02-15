# SPEC-MCP-005 Implementation Plan

## Overview

| Field | Value |
|-------|-------|
| **SPEC ID** | SPEC-MCP-005 |
| **Title** | Agent Workflow Integration and Dependency Management |
| **Total Phases** | 3 |
| **Estimated Effort** | 20 hours |

---

## Phase 1: Enhanced Tool Descriptions (Priority: High)

### Objective

Update all MCP tool descriptions to include workflow step indicators and dependency handling instructions.

### Deliverables

```
packages/mcp-server/src/
├── index.ts                  # Updated tool descriptions
├── tools/
│   ├── generate-screen.ts    # Add dependency extraction
│   └── validate-environment.ts (NEW)
```

### Tasks

| # | Task | Owner | Estimate |
|---|------|-------|----------|
| 1.1 | Add [WORKFLOW STEP X/4] prefix to all tool descriptions | expert-backend | 1h |
| 1.2 | Add "AFTER RECEIVING RESPONSE" section to generate_screen | expert-backend | 1h |
| 1.3 | Add "WHEN TO CALL" section to each tool | expert-backend | 1h |
| 1.4 | Update get-screen-generation-context description | expert-backend | 0.5h |
| 1.5 | Update validate-screen-definition description | expert-backend | 0.5h |

### Tool Description Templates

#### Template A: Context/Validation Tools

```typescript
{
  description: `[WORKFLOW STEP ${step}/${total}] ${shortDescription}

${mainDescription}

WHEN TO CALL:
${whenToCall}

NEXT STEP:
${nextStepGuidance}`,
}
```

#### Template B: Code Generation Tools

```typescript
{
  description: `[WORKFLOW STEP ${step}/${total}] ${shortDescription}

REQUIRED WORKFLOW:
1. Call get-screen-generation-context (Step 1)
2. Generate/validate Screen Definition (Step 2)
3. Call THIS TOOL (Step 3)
4. Call validate-environment if path known (Step 4)

AFTER RECEIVING RESPONSE:
- Check 'dependencies' field
- If dependencies.external is non-empty:
  ${dependencyHandling}

CRITICAL: ${criticalNote}`,
}
```

### Success Criteria

- [ ] All 5+ MCP tools include `[WORKFLOW STEP X/4]` prefix
- [ ] All tools include "WHEN TO CALL" section
- [ ] generate_screen includes "AFTER RECEIVING RESPONSE" guidance

---

## Phase 2: Dependency Management System (Priority: High)

### Objective

Implement automatic dependency extraction and environment validation.

### Deliverables

```
packages/mcp-server/src/
├── tools/
│   ├── validate-environment.ts (NEW)
│   └── generate-screen.ts (UPDATED)
├── utils/
│   ├── dependency-extractor.ts (NEW)
│   └── package-json-reader.ts (NEW)
└── __tests__/
    ├── tools/validate-environment.test.ts (NEW)
    └── utils/dependency-extractor.test.ts (NEW)
```

### Tasks

| # | Task | Owner | Estimate |
|---|------|-------|----------|
| 2.1 | Implement dependency-extractor.ts | expert-backend | 2h |
| 2.2 | Implement package-json-reader.ts | expert-backend | 1h |
| 2.3 | Create validate-environment tool | expert-backend | 3h |
| 2.4 | Update generate-screen to include dependencies | expert-backend | 2h |
| 2.5 | Add install command generators (npm/yarn/pnpm/bun) | expert-backend | 1h |
| 2.6 | Add compatibility notes (React version, etc.) | expert-backend | 1h |
| 2.7 | Write unit tests | expert-testing | 2h |

### Dependency Extractor Design

```typescript
// src/utils/dependency-extractor.ts

import * as parser from '@babel/parser';
import traverse from '@babel/traverse';

interface Dependencies {
  external: string[];        // npm packages
  internal: string[];        // @tekton/* packages
  installCommands: {
    npm: string;
    yarn: string;
    pnpm: string;
    bun: string;
  };
  compatibility: {
    react?: string;
    node?: string;
  };
  notes: string[];
}

const KNOWN_DEPENDENCIES: Record<string, { compatibility?: object; notes?: string[] }> = {
  'framer-motion': {
    compatibility: { react: '^18.0.0 || ^19.0.0' },
    notes: ['Requires React 18+ for concurrent features']
  },
  '@radix-ui/react-slot': {
    compatibility: { react: '^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0' }
  },
  'lucide-react': {
    compatibility: { react: '^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0' }
  }
};

export function extractDependencies(code: string): Dependencies {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx']
  });

  const external: Set<string> = new Set();
  const internal: Set<string> = new Set();

  traverse(ast, {
    ImportDeclaration(path) {
      const source = path.node.source.value;
      if (source.startsWith('@tekton/')) {
        internal.add(source);
      } else if (!source.startsWith('.') && !isNodeBuiltin(source)) {
        external.add(source);
      }
    }
  });

  const externalArray = [...external];

  return {
    external: externalArray,
    internal: [...internal],
    installCommands: {
      npm: `npm install ${externalArray.join(' ')}`,
      yarn: `yarn add ${externalArray.join(' ')}`,
      pnpm: `pnpm add ${externalArray.join(' ')}`,
      bun: `bun add ${externalArray.join(' ')}`
    },
    compatibility: mergeCompatibility(externalArray),
    notes: collectNotes(externalArray)
  };
}
```

### validate-environment Tool Design

```typescript
// src/tools/validate-environment.ts

import { readPackageJson } from '../utils/package-json-reader';

interface ValidateEnvironmentInput {
  projectPath: string;
  requiredPackages: string[];
}

interface ValidateEnvironmentOutput {
  installed: Record<string, string>;   // package -> version
  missing: string[];
  installCommands: {
    npm: string;
    yarn: string;
    pnpm: string;
    bun: string;
  };
  warnings: string[];
}

export async function validateEnvironment(
  input: ValidateEnvironmentInput
): Promise<ValidateEnvironmentOutput> {
  const packageJson = await readPackageJson(input.projectPath);

  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };

  const installed: Record<string, string> = {};
  const missing: string[] = [];

  for (const pkg of input.requiredPackages) {
    if (allDeps[pkg]) {
      installed[pkg] = allDeps[pkg];
    } else {
      missing.push(pkg);
    }
  }

  const warnings = checkVersionConflicts(installed, input.requiredPackages);

  return {
    installed,
    missing,
    installCommands: missing.length > 0 ? {
      npm: `npm install ${missing.join(' ')}`,
      yarn: `yarn add ${missing.join(' ')}`,
      pnpm: `pnpm add ${missing.join(' ')}`,
      bun: `bun add ${missing.join(' ')}`
    } : { npm: '', yarn: '', pnpm: '', bun: '' },
    warnings
  };
}
```

### Success Criteria

- [ ] `generate_screen` returns `dependencies` field with all external packages
- [ ] `validate-environment` correctly identifies missing packages
- [ ] Install commands generated for npm/yarn/pnpm/bun
- [ ] Compatibility notes included for known packages

---

## Phase 3: Error Recovery and Agent Documentation (Priority: Medium)

### Objective

Implement automatic error recovery and create comprehensive agent training documentation.

### Deliverables

```
packages/mcp-server/src/
├── utils/
│   └── error-recovery.ts (NEW)

.moai/docs/
├── mcp-workflow-guide.md (NEW)
└── mcp-dependency-management.md (NEW)
```

### Tasks

| # | Task | Owner | Estimate |
|---|------|-------|----------|
| 3.1 | Implement error pattern detection | expert-backend | 1h |
| 3.2 | Create error-recovery utility | expert-backend | 1h |
| 3.3 | Write mcp-workflow-guide.md | manager-docs | 2h |
| 3.4 | Write mcp-dependency-management.md | manager-docs | 1h |
| 3.5 | Add inline documentation to tools | manager-docs | 1h |
| 3.6 | Integration testing with Claude Code | expert-testing | 2h |
| 3.7 | Integration testing with Gemini Agent | expert-testing | 2h |

### Error Recovery Utility

```typescript
// src/utils/error-recovery.ts

const MODULE_ERROR_PATTERNS = [
  /Cannot find module '([^']+)'/,
  /Module not found: Error: Can't resolve '([^']+)'/,
  /Error: Cannot find module '([^']+)'/,
  /ModuleNotFoundError: No module named '([^']+)'/,
  /The requested module '([^']+)' does not provide/
];

export function detectModuleError(errorMessage: string): string | null {
  for (const pattern of MODULE_ERROR_PATTERNS) {
    const match = errorMessage.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

export function generateRecoveryGuidance(missingModule: string): string {
  return `
## Missing Module Detected: ${missingModule}

### Quick Fix
Run one of the following commands:

\`\`\`bash
npm install ${missingModule}
# or
yarn add ${missingModule}
# or
pnpm add ${missingModule}
\`\`\`

### Verification
After installation, restart your development server.
`;
}
```

### Agent Documentation Structure

#### mcp-workflow-guide.md

```markdown
# MCP Screen Generation Workflow Guide

## For AI Coding Agents

### Quick Reference

| Step | Tool | Purpose |
|------|------|---------|
| 1 | get-screen-generation-context | Get components, schema, examples |
| 2 | validate-screen-definition | Validate before generation |
| 3 | generate_screen | Generate code + dependencies |
| 4 | validate-environment | Check user's environment |

### Mandatory Checkpoints

#### Checkpoint 1: After generate_screen

```
IF response.dependencies.external.length > 0:
  - Log: "Generated code requires external dependencies"
  - IF projectPath known:
    - Call validate-environment
  - ELSE:
    - Show response.dependencies.installCommands to user
```

#### Checkpoint 2: Before Code Delivery

```
IF validate-environment.missing.length > 0:
  - Show missing packages to user
  - Show install commands
  - Ask user to install before proceeding
```

### Error Recovery

When user reports error matching:
- "Cannot find module"
- "Module not found"
- "Cannot resolve"

Then:
1. Parse error for module name
2. Call validate-environment with that module
3. Show install command
4. Suggest restart after install
```

### Success Criteria

- [ ] mcp-workflow-guide.md created with complete workflow
- [ ] Error patterns cover 95%+ of common module errors
- [ ] Claude Code follows workflow successfully
- [ ] Gemini Agent follows workflow successfully

---

## Implementation Timeline

```
Day 1 (Phase 1):
├── 1.1 Add workflow step prefixes (1h)
├── 1.2 Add response handling sections (1h)
├── 1.3 Add "when to call" sections (1h)
└── 1.4-1.5 Update existing tool descriptions (1h)

Day 2 (Phase 2 - Part 1):
├── 2.1 Implement dependency-extractor (2h)
├── 2.2 Implement package-json-reader (1h)
└── 2.3 Create validate-environment tool (3h)

Day 3 (Phase 2 - Part 2):
├── 2.4 Update generate-screen (2h)
├── 2.5 Add install command generators (1h)
├── 2.6 Add compatibility notes (1h)
└── 2.7 Write unit tests (2h)

Day 4 (Phase 3):
├── 3.1-3.2 Error recovery utility (2h)
├── 3.3-3.4 Agent documentation (3h)
└── 3.5 Inline documentation (1h)

Day 5 (Testing):
├── 3.6 Claude Code integration test (2h)
└── 3.7 Gemini Agent integration test (2h)
```

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Agents ignore workflow hints | Medium | High | Make tool fail without prerequisites |
| Package.json not accessible | Medium | Medium | Provide manual fallback |
| Unknown dependency compatibility | Low | Medium | Default to latest, warn user |
| Cross-platform path issues | Low | Low | Use path.normalize |

---

## Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Agent workflow adoption | 0% | 90%+ | Agent test sessions |
| Runtime 404 errors | ~30% | <5% | Error tracking |
| Dependency validation rate | 0% | 95%+ | Tool call logs |
| Error recovery success | 0% | 80%+ | User feedback |

---

## Appendix

### A. Full Tool List with Updated Descriptions

| Tool | Step | Updated Description |
|------|------|---------------------|
| get-screen-generation-context | 1/4 | Get context for Screen Definition |
| validate-screen-definition | 2/4 | Validate before generation |
| generate_screen | 3/4 | Generate code + extract deps |
| validate-environment | 4/4 | Check user environment |
| list-themes | - | List available themes |
| preview-theme | - | Preview theme tokens |

### B. Dependency Knowledge Base

```json
{
  "framer-motion": {
    "react": "^18.0.0 || ^19.0.0",
    "notes": ["Concurrent features require React 18+"]
  },
  "@radix-ui/*": {
    "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
    "notes": ["Peer dependencies: react-dom"]
  },
  "lucide-react": {
    "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
  },
  "@tanstack/react-query": {
    "react": "^18.0.0 || ^19.0.0",
    "notes": ["v5 requires React 18+"]
  }
}
```

### C. Related SPECs

- SPEC-MCP-004: Tekton MCP Workflow Optimization (Phase 3.5, 4)
- SPEC-MCP-003: Component & Template Discovery Tools
