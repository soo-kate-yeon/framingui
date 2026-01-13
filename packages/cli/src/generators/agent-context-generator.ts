import * as fs from 'fs-extra';
import * as path from 'path';
import {
  Environment,
  SkeletonPreset,
  ScreenIntent,
  INTENT_TO_COMPOUND_PATTERNS,
} from '@tekton/contracts';

/**
 * Agent context generation options
 */
export interface AgentContextOptions {
  outputDir: string;
  generateDocs?: boolean;
}

/**
 * Agent context generation result
 */
export interface AgentContextResult {
  success: boolean;
  files?: {
    agentContext: string;
    documentation?: string;
  };
  error?: string;
}

/**
 * Agent context data structure
 */
interface AgentContextData {
  metadata: {
    version: string;
    generated: string;
    description: string;
  };
  environments: string[];
  skeletons: string[];
  intents: string[];
  intentComponentMapping: Record<string, string[]>;
  tokens: {
    brand: string[];
    semantic: string[];
    neutral: string[];
  };
}

/**
 * Generate agent context JSON
 */
function generateContextData(): AgentContextData {
  const intentComponentMapping: Record<string, string[]> = {};

  for (const [intent, pattern] of Object.entries(INTENT_TO_COMPOUND_PATTERNS)) {
    intentComponentMapping[intent] = pattern.primaryComponents;
  }

  return {
    metadata: {
      version: '1.0.0',
      generated: new Date().toISOString(),
      description: 'Screen creation context for AI agents and VS Code extensions',
    },
    environments: Object.values(Environment),
    skeletons: Object.values(SkeletonPreset),
    intents: Object.values(ScreenIntent),
    intentComponentMapping,
    tokens: {
      brand: ['primary', 'secondary', 'accent'],
      semantic: ['success', 'warning', 'error', 'info'],
      neutral: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
  };
}

/**
 * Generate screen rules documentation
 */
function generateDocumentation(): string {
  const lines: string[] = [];

  lines.push('# Screen Creation Rules');
  lines.push('');
  lines.push('AI-friendly documentation for autonomous screen generation.');
  lines.push('');
  lines.push('## Environment Types');
  lines.push('');
  lines.push('Available environment targets:');
  lines.push('');

  for (const env of Object.values(Environment)) {
    lines.push(`- **${env}**: Target platform for screen rendering`);
  }

  lines.push('');
  lines.push('## Skeleton Presets');
  lines.push('');
  lines.push('Available layout skeletons:');
  lines.push('');

  for (const skeleton of Object.values(SkeletonPreset)) {
    lines.push(`- **${skeleton}**: Layout structure preset`);
  }

  lines.push('');
  lines.push('## Screen Intents');
  lines.push('');
  lines.push('Available screen purposes:');
  lines.push('');

  for (const [intent, pattern] of Object.entries(INTENT_TO_COMPOUND_PATTERNS)) {
    lines.push(`### ${intent}`);
    lines.push('');
    lines.push('**Suggested Components:**');
    for (const component of pattern.primaryComponents) {
      lines.push(`- ${component}`);
    }
    lines.push('');
  }

  lines.push('## VS Code Extension Integration');
  lines.push('');
  lines.push('This context data can be used by VS Code extensions to provide:');
  lines.push('');
  lines.push('- Quick Pick menus for environment selection');
  lines.push('- IntelliSense suggestions for skeleton presets');
  lines.push('- Component recommendations based on intent');
  lines.push('- Auto-completion for screen creation commands');
  lines.push('');
  lines.push('## AI Agent Usage');
  lines.push('');
  lines.push('AI agents can use this context to:');
  lines.push('');
  lines.push('1. Understand available screen creation options');
  lines.push('2. Suggest appropriate components based on intent');
  lines.push('3. Validate screen contracts against available options');
  lines.push('4. Generate screens autonomously with proper configuration');

  return lines.join('\n');
}

/**
 * Generate agent context and documentation
 */
export async function generateAgentContext(
  options: AgentContextOptions
): Promise<AgentContextResult> {
  try {
    // Generate context data
    const contextData = generateContextData();

    // Write agent-context.json
    const contextPath = path.join(options.outputDir, 'agent-context.json');
    await fs.writeJson(contextPath, contextData, { spaces: 2 });

    const files: { agentContext: string; documentation?: string } = {
      agentContext: contextPath,
    };

    // Generate documentation if requested
    if (options.generateDocs) {
      const docsContent = generateDocumentation();
      const docsPath = path.join(options.outputDir, '.moai', 'docs', 'screen-rules.md');
      await fs.ensureDir(path.dirname(docsPath));
      await fs.writeFile(docsPath, docsContent, 'utf-8');
      files.documentation = docsPath;
    }

    return {
      success: true,
      files,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Agent context generation failed',
    };
  }
}
