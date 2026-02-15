# SPEC-MCP-005: Agent Workflow Integration and Dependency Management

## Overview

| Field | Value |
|-------|-------|
| **SPEC ID** | SPEC-MCP-005 |
| **Title** | Agent Workflow Integration and Dependency Management |
| **Status** | Planned |
| **Priority** | High |
| **Created** | 2026-02-04 |
| **Author** | R2-D2 + soo-kate-yeon |
| **Dependencies** | SPEC-MCP-004 (Phase 3.5, 4 Complete) |

---

## Problem Statement

SPEC-MCP-004 successfully implemented Phase 3.5 tools (`get-screen-generation-context`, `validate-screen-definition`) and Phase 4 (Recipe Resolver). However, external coding agents (Gemini Antigravity, Claude Code) still experience:

1. **Agent Discovery Gap**: Tools exist but agents don't know WHEN to use them
2. **Workflow Ambiguity**: No clear guidance on the recommended tool sequence
3. **Dependency Blindness**: Generated code includes external dependencies that agents don't validate
4. **Error Recovery Failure**: "Module not found" errors require manual intervention

**Evidence from Gemini Agent UX Review (2026-02-03):**
- 3 failed attempts with `generate-screen` due to invalid tokens
- Only used `list-themes` and `generate-screen` (skipped validation tools)
- No awareness of `get-screen-generation-context` or `validate-screen-definition`
- Runtime 404 errors from uninstalled dependencies

---

## Goals

| # | Goal | Success Criteria |
|---|------|------------------|
| G1 | Agent Workflow Adoption | 90%+ agents follow recommended workflow |
| G2 | Zero Runtime 404 Errors | Dependencies validated before code delivery |
| G3 | Proactive Dependency Guidance | Install commands provided automatically |
| G4 | Error Recovery Automation | "Module not found" triggers auto-resolution |

---

## EARS Requirements

### Ubiquitous Requirements

- **[U1]** The MCP server SHALL include workflow guidance in all tool descriptions
- **[U2]** The `generate_screen` tool SHALL return dependency information in every response

### Event-Driven Requirements

- **[E1]** WHEN `generate_screen` returns dependencies THEN the response SHALL include pre-formatted install commands
- **[E2]** WHEN an agent receives `generate_screen` response THEN it MUST check the `dependencies` field
- **[E3]** WHEN user provides a target path THEN the agent SHALL call `validate-environment` before delivering code
- **[E4]** WHEN user reports "Module not found" error THEN the agent SHALL trigger `validate-environment` automatically

### State-Driven Requirements

- **[S1]** IF dependencies are present AND target path is known THEN `validate-environment` SHALL be called
- **[S2]** IF missing dependencies are detected THEN install commands SHALL be displayed to user

### Unwanted Requirements

- **[W1]** The system SHALL NOT deliver generated code without dependency validation when path is known
- **[W2]** The system SHALL NOT require users to manually search for install commands

### Optional Requirements

- **[O1]** WHERE possible, the system SHOULD provide compatibility notes (React version requirements, peer dependencies)
- **[O2]** WHERE possible, the system SHOULD detect package manager preference (npm/yarn/pnpm/bun)

---

## Technical Specification

### 1. Agent Workflow Guidelines

#### 1.1 Mandatory Workflow Checkpoints

```
Checkpoint 1: After generate_screen call
  - Check `dependencies` field in response
  - If non-empty, proceed to Checkpoint 2

Checkpoint 2: Before delivering code to user
  - If target path provided, call `validate-environment`
  - Display dependency status to user

Checkpoint 3: On user error report
  - If error matches "Module not found" pattern
  - Trigger `validate-environment` automatically
```

#### 1.2 Workflow Diagram

```
User Request
    |
    v
+------------------+
| generate_screen  |
+------------------+
    |
    v
+------------------+     NO
| Dependencies     |-----------> Deliver Code
| Present?         |
+------------------+
    | YES
    v
+------------------+
| Show Dependency  |
| List to Agent    |
+------------------+
    |
    v
+------------------+     NO
| Target Path      |-----------> Show Install Commands
| Known?           |              (Manual Validation)
+------------------+
    | YES
    v
+--------------------+
| validate-environment|
+--------------------+
    |
    v
+------------------+     NO
| Missing Deps?    |-----------> Deliver Code
+------------------+
    | YES
    v
+------------------+
| Show Install     |
| Commands         |
+------------------+
    |
    v
[User installs dependencies]
    |
    v
Deliver Code
```

### 2. Enhanced Tool Descriptions

#### 2.1 generate_screen (Updated)

```typescript
{
  name: "generate_screen",
  description: `[WORKFLOW STEP 3/4] Generate React code from Screen Definition.

REQUIRED WORKFLOW:
1. Call get-screen-generation-context (Step 1)
2. Generate/validate Screen Definition (Step 2)
3. Call generate_screen (THIS TOOL - Step 3)
4. Call validate-environment if path known (Step 4)

AFTER RECEIVING RESPONSE:
- Always check the 'dependencies' field
- If dependencies.external is non-empty:
  - If user provided package.json path: call validate-environment
  - Otherwise: show install commands from dependencies.installCommands

CRITICAL: This ensures zero 404 errors at runtime.`,
  inputSchema: { /* existing schema */ },
  outputSchema: {
    type: "object",
    properties: {
      code: { type: "string" },
      dependencies: {
        type: "object",
        properties: {
          external: {
            type: "array",
            items: { type: "string" },
            description: "NPM packages required by generated code"
          },
          internal: {
            type: "array",
            items: { type: "string" },
            description: "Internal @tekton packages"
          },
          installCommands: {
            type: "object",
            properties: {
              npm: { type: "string" },
              yarn: { type: "string" },
              pnpm: { type: "string" },
              bun: { type: "string" }
            }
          },
          compatibility: {
            type: "object",
            properties: {
              react: { type: "string" },
              node: { type: "string" }
            }
          }
        }
      }
    }
  }
}
```

#### 2.2 validate-environment (New Tool)

```typescript
{
  name: "validate-environment",
  description: `[WORKFLOW STEP 4/4] Validate user's environment for generated code dependencies.

WHEN TO CALL:
- After generate_screen if target path is known
- When user reports "Module not found" or "Cannot find module" errors
- Before finalizing code delivery

INPUT:
- projectPath: Path to package.json or project root
- requiredPackages: Array of package names (from generate_screen.dependencies.external)

OUTPUT:
- installed: Packages already installed with versions
- missing: Packages that need to be installed
- installCommands: Pre-formatted commands for each package manager
- warnings: Version conflicts or compatibility issues`,
  inputSchema: {
    type: "object",
    required: ["projectPath", "requiredPackages"],
    properties: {
      projectPath: {
        type: "string",
        description: "Path to package.json or project root"
      },
      requiredPackages: {
        type: "array",
        items: { type: "string" },
        description: "Packages to validate (from generate_screen.dependencies.external)"
      }
    }
  }
}
```

#### 2.3 get-screen-generation-context (Updated)

```typescript
{
  name: "get-screen-generation-context",
  description: `[WORKFLOW STEP 1/4] Get all context needed to generate a Screen Definition.

THIS IS THE FIRST STEP in the screen generation workflow:
1. Call THIS TOOL with user's description
2. Use returned context to generate/validate Screen Definition
3. Call generate_screen with the definition
4. Call validate-environment if path known

Returns: Components, schema, templates, examples, theme recipes, and contextual hints.`,
  // ... existing schema
}
```

### 3. Proactive Dependency Guidance

#### 3.1 Enhanced generate_screen Response

```json
{
  "code": "import { Card } from '@tekton/ui';\nimport { motion } from 'framer-motion';\n...",

  "dependencies": {
    "external": [
      "framer-motion",
      "@radix-ui/react-slot",
      "lucide-react"
    ],
    "internal": [
      "@tekton/ui",
      "@tekton/tokens"
    ],
    "installCommands": {
      "npm": "npm install framer-motion @radix-ui/react-slot lucide-react",
      "yarn": "yarn add framer-motion @radix-ui/react-slot lucide-react",
      "pnpm": "pnpm add framer-motion @radix-ui/react-slot lucide-react",
      "bun": "bun add framer-motion @radix-ui/react-slot lucide-react"
    },
    "compatibility": {
      "react": "^18.0.0 || ^19.0.0",
      "node": ">=18.0.0"
    },
    "notes": [
      "framer-motion requires React 18+ for concurrent features",
      "@radix-ui/react-slot is a peer dependency of @tekton/ui"
    ]
  }
}
```

#### 3.2 Dependency Detection Logic

```typescript
function extractDependencies(generatedCode: string): Dependencies {
  const imports = parseImports(generatedCode);

  const external: string[] = [];
  const internal: string[] = [];

  for (const { source } of imports) {
    if (source.startsWith('@tekton/')) {
      internal.push(source);
    } else if (!source.startsWith('.') && !isBuiltIn(source)) {
      external.push(source);
    }
  }

  return {
    external: [...new Set(external)],
    internal: [...new Set(internal)],
    installCommands: generateInstallCommands(external),
    compatibility: getCompatibilityRequirements(external)
  };
}
```

### 4. Error Recovery Workflow

#### 4.1 Error Pattern Detection

```typescript
const MODULE_ERROR_PATTERNS = [
  /Cannot find module '([^']+)'/,
  /Module not found: Error: Can't resolve '([^']+)'/,
  /Error: Cannot find module '([^']+)'/,
  /ModuleNotFoundError: No module named '([^']+)'/
];

function detectModuleError(errorMessage: string): string | null {
  for (const pattern of MODULE_ERROR_PATTERNS) {
    const match = errorMessage.match(pattern);
    if (match) {
      return match[1]; // Return the missing module name
    }
  }
  return null;
}
```

#### 4.2 Auto-Recovery Workflow

```
User reports: "Module not found: framer-motion"
    |
    v
+------------------------+
| detectModuleError()    |
| -> "framer-motion"     |
+------------------------+
    |
    v
+------------------------+
| validate-environment   |
| projectPath: user's    |
| requiredPackages:      |
|   ["framer-motion"]    |
+------------------------+
    |
    v
+------------------------+
| Output to User:        |
| "framer-motion is      |
|  missing. Install:"    |
| npm i framer-motion    |
+------------------------+
```

### 5. Agent Training Documentation

Create `.moai/docs/mcp-workflow-guide.md`:

```markdown
# MCP Screen Generation Workflow Guide

## For AI Coding Agents

This guide ensures successful screen generation with zero runtime errors.

### Mandatory 4-Step Workflow

**Step 1: Get Context**
```
Tool: get-screen-generation-context
Input: { description: "user's request", themeId: "optional" }
Output: Components, schema, examples, hints
```

**Step 2: Validate Definition**
```
Tool: validate-screen-definition
Input: { definition: generatedScreenDef }
Output: { valid: boolean, errors: [], suggestions: [] }
```

**Step 3: Generate Code**
```
Tool: generate_screen
Input: { screenDefinition: validatedDef, themeId: "..." }
Output: { code: "...", dependencies: { external: [...] } }

CRITICAL: Check dependencies.external in response!
```

**Step 4: Validate Environment (If Path Known)**
```
Tool: validate-environment
Input: { projectPath: "/path/to/package.json", requiredPackages: dependencies.external }
Output: { missing: [...], installCommands: { npm: "..." } }
```

### Dependency Handling Checklist

- [ ] After generate_screen, check `dependencies.external`
- [ ] If non-empty, inform user about required packages
- [ ] If projectPath known, call validate-environment
- [ ] Show install commands for missing packages
- [ ] Wait for user confirmation before delivering code

### Error Recovery

When user reports "Module not found" or similar:
1. Parse error message for module name
2. Call validate-environment with that module
3. Provide install command
```

---

## References

- SPEC-MCP-004: Tekton MCP Workflow Optimization
- SPEC-MCP-003: Component & Template Discovery Tools
- Gemini Agent UX Review (2026-02-03)
