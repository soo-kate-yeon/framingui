# SPEC-MCP-005 Acceptance Criteria

## Overview

| Field | Value |
|-------|-------|
| **SPEC ID** | SPEC-MCP-005 |
| **Title** | Agent Workflow Integration and Dependency Management |
| **Version** | 1.0 |
| **Last Updated** | 2026-02-04 |

---

## Test Scenarios

### Scenario 1: Agent Workflow Adoption

**Given** a coding agent (Claude Code or Gemini)
**When** the agent receives a screen generation request
**Then** the agent should follow the 4-step workflow:
  1. Call `get-screen-generation-context`
  2. Call `validate-screen-definition`
  3. Call `generate_screen`
  4. Call `validate-environment` (if path known)

#### Test Cases

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| 1.1 | Claude Code reads tool descriptions | Identifies workflow steps from `[WORKFLOW STEP X/4]` prefix | Pending |
| 1.2 | Gemini Agent reads tool descriptions | Identifies workflow steps from `[WORKFLOW STEP X/4]` prefix | Pending |
| 1.3 | Agent skips step 1 | Generation still works but with suboptimal results | Pending |
| 1.4 | Agent skips step 4 | Code delivered but dependencies may be missing | Pending |

---

### Scenario 2: Dependency Extraction

**Given** generated code with external dependencies
**When** `generate_screen` is called
**Then** the response should include:
  - `dependencies.external`: Array of npm package names
  - `dependencies.internal`: Array of @tekton/* packages
  - `dependencies.installCommands`: Commands for npm/yarn/pnpm/bun
  - `dependencies.compatibility`: React and Node version requirements

#### Test Cases

| # | Test Case | Input | Expected Output | Status |
|---|-----------|-------|-----------------|--------|
| 2.1 | Code with framer-motion | `import { motion } from 'framer-motion'` | `external: ["framer-motion"]` | Pending |
| 2.2 | Code with @radix-ui | `import { Slot } from '@radix-ui/react-slot'` | `external: ["@radix-ui/react-slot"]` | Pending |
| 2.3 | Code with @framingui | `import { Card } from '@framingui'` | `internal: ["@framingui"]` | Pending |
| 2.4 | Code with multiple deps | Multiple imports | All deps extracted | Pending |
| 2.5 | Code without external deps | Only @tekton imports | `external: []` | Pending |
| 2.6 | Install commands generated | 3 external deps | All 4 package managers covered | Pending |

---

### Scenario 3: Environment Validation

**Given** a project path with package.json
**When** `validate-environment` is called with required packages
**Then** the response should identify:
  - `installed`: Packages already in package.json with versions
  - `missing`: Packages not found in package.json
  - `installCommands`: Commands to install missing packages
  - `warnings`: Version conflicts or compatibility issues

#### Test Cases

| # | Test Case | package.json | Required | Expected | Status |
|---|-----------|--------------|----------|----------|--------|
| 3.1 | All deps installed | `{"dependencies": {"framer-motion": "^10.0.0"}}` | `["framer-motion"]` | `missing: []` | Pending |
| 3.2 | Missing deps | `{"dependencies": {}}` | `["framer-motion"]` | `missing: ["framer-motion"]` | Pending |
| 3.3 | Partial match | `{"dependencies": {"react": "^18.0.0"}}` | `["react", "framer-motion"]` | `missing: ["framer-motion"]` | Pending |
| 3.4 | devDependencies check | `{"devDependencies": {"vitest": "^1.0.0"}}` | `["vitest"]` | `missing: []` | Pending |
| 3.5 | Install commands | - | `["pkg-a", "pkg-b"]` | `npm install pkg-a pkg-b` | Pending |
| 3.6 | Invalid path | `/nonexistent/package.json` | Any | Error with guidance | Pending |

---

### Scenario 4: Proactive Dependency Guidance

**Given** a `generate_screen` response with dependencies
**When** the agent processes the response
**Then** the agent should:
  - Check `dependencies.external` field
  - If non-empty and path known, call `validate-environment`
  - Show install commands for missing packages
  - Include compatibility notes if relevant

#### Test Cases

| # | Test Case | Expected Behavior | Status |
|---|-----------|-------------------|--------|
| 4.1 | Empty dependencies | No additional action required | Pending |
| 4.2 | Has dependencies, no path | Show install commands from response | Pending |
| 4.3 | Has dependencies, path known | Call validate-environment | Pending |
| 4.4 | Missing deps detected | Show npm/yarn/pnpm/bun commands | Pending |
| 4.5 | Compatibility notes | Show React version requirements | Pending |

---

### Scenario 5: Error Recovery

**Given** a user reports "Module not found" error
**When** the error message is analyzed
**Then** the system should:
  - Detect the missing module name
  - Suggest `validate-environment` call
  - Provide install command for the specific module

#### Test Cases

| # | Error Message | Expected Module | Expected Command | Status |
|---|---------------|-----------------|------------------|--------|
| 5.1 | `Cannot find module 'framer-motion'` | framer-motion | `npm install framer-motion` | Pending |
| 5.2 | `Module not found: Error: Can't resolve '@radix-ui/react-slot'` | @radix-ui/react-slot | `npm install @radix-ui/react-slot` | Pending |
| 5.3 | `Error: Cannot find module 'lucide-react'` | lucide-react | `npm install lucide-react` | Pending |
| 5.4 | No module error (other error) | null | No action | Pending |
| 5.5 | Multiple module errors | First module | Install first, then retry | Pending |

---

### Scenario 6: Tool Description Quality

**Given** MCP tool definitions
**When** an agent reads the tool descriptions
**Then** each tool should include:
  - `[WORKFLOW STEP X/4]` prefix
  - Clear "WHEN TO CALL" section
  - "NEXT STEP" or "AFTER RECEIVING RESPONSE" guidance

#### Test Cases

| # | Tool | Required Elements | Status |
|---|------|-------------------|--------|
| 6.1 | get-screen-generation-context | Step 1/4, returns context, next step is validate | Pending |
| 6.2 | validate-screen-definition | Step 2/4, when to call, returns validation | Pending |
| 6.3 | generate_screen | Step 3/4, check dependencies, next is validate-env | Pending |
| 6.4 | validate-environment | Step 4/4, when to call, returns missing list | Pending |

---

## Integration Tests

### Test 1: Claude Code Full Workflow

```gherkin
Given Claude Code receives "Create a fitness dashboard"
When the agent executes the workflow
Then the following tools should be called in order:
  | Order | Tool | Purpose |
  | 1 | get-screen-generation-context | Get context |
  | 2 | validate-screen-definition | Validate definition |
  | 3 | generate_screen | Generate code |
  | 4 | validate-environment | Check dependencies |
And the final output should include:
  - Valid React code
  - List of installed dependencies
  - List of missing dependencies (if any)
  - Install commands for missing deps
```

### Test 2: Gemini Agent Full Workflow

```gherkin
Given Gemini Agent receives "Create a login page with social auth"
When the agent executes the workflow
Then the agent should NOT:
  - Call generate_screen without context
  - Skip validate-screen-definition
  - Ignore dependencies in response
And the agent SHOULD:
  - Follow 4-step workflow
  - Report dependency status
  - Provide install commands if needed
```

### Test 3: Error Recovery Flow

```gherkin
Given a user reports "Error: Cannot find module 'framer-motion'"
When the agent analyzes the error
Then the agent should:
  - Detect "framer-motion" as missing module
  - Suggest running validate-environment
  - Provide: "npm install framer-motion"
  - Advise restart after installation
```

---

## Quality Gates

### Gate 1: Tool Description Compliance

- [ ] All tools include `[WORKFLOW STEP X/4]` prefix
- [ ] All tools include "WHEN TO CALL" section
- [ ] Code generation tools include "AFTER RECEIVING RESPONSE" section
- [ ] No tool description exceeds 500 characters main description

### Gate 2: Dependency System Accuracy

- [ ] External dependencies extracted with 100% accuracy
- [ ] Internal @tekton packages identified separately
- [ ] Install commands generated for all 4 package managers
- [ ] Compatibility notes provided for known packages

### Gate 3: Agent Adoption Rate

- [ ] Claude Code follows workflow in 90%+ of test cases
- [ ] Gemini Agent follows workflow in 90%+ of test cases
- [ ] Zero "Module not found" errors when workflow followed

### Gate 4: Error Recovery Effectiveness

- [ ] Module error pattern detection covers 95%+ of common patterns
- [ ] Recovery guidance is actionable (copy-paste install command)
- [ ] Restart advice included after installation

---

## Definition of Done

- [ ] Phase 1: All tool descriptions updated with workflow guidance
- [ ] Phase 2: Dependency extraction and validation system implemented
- [ ] Phase 3: Error recovery and documentation complete
- [ ] All unit tests passing (coverage >= 85%)
- [ ] Integration tests with Claude Code successful
- [ ] Integration tests with Gemini Agent successful
- [ ] mcp-workflow-guide.md created and reviewed
- [ ] SPEC-MCP-005 marked as Complete in overview
