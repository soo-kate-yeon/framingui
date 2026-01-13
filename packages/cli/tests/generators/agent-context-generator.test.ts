import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs-extra';
import * as path from 'path';
import {
  generateAgentContext,
  type AgentContextOptions,
} from '../../src/generators/agent-context-generator.js';

const TEST_OUTPUT_DIR = path.join(process.cwd(), 'test-agent-context');

describe('agent-context-generator', () => {
  beforeEach(async () => {
    await fs.ensureDir(TEST_OUTPUT_DIR);
  });

  afterEach(async () => {
    await fs.remove(TEST_OUTPUT_DIR);
  });

  describe('generateAgentContext', () => {
    it('should generate agent-context.json with complete contract data', async () => {
      const options: AgentContextOptions = {
        outputDir: TEST_OUTPUT_DIR,
      };

      const result = await generateAgentContext(options);

      expect(result.success).toBe(true);
      expect(result.files?.agentContext).toBeDefined();

      const contextPath = result.files!.agentContext;
      const contextData = await fs.readJson(contextPath);

      expect(contextData.environments).toBeDefined();
      expect(contextData.skeletons).toBeDefined();
      expect(contextData.intents).toBeDefined();
      expect(contextData.tokens).toBeDefined();
    });

    it('should include all environment types', async () => {
      const options: AgentContextOptions = {
        outputDir: TEST_OUTPUT_DIR,
      };

      const result = await generateAgentContext(options);
      const contextPath = result.files!.agentContext;
      const contextData = await fs.readJson(contextPath);

      expect(contextData.environments).toContain('web');
      expect(contextData.environments).toContain('mobile');
      expect(contextData.environments).toContain('tablet');
      expect(contextData.environments).toContain('responsive');
      expect(contextData.environments).toContain('tv');
      expect(contextData.environments).toContain('kiosk');
    });

    it('should include all skeleton presets', async () => {
      const options: AgentContextOptions = {
        outputDir: TEST_OUTPUT_DIR,
      };

      const result = await generateAgentContext(options);
      const contextPath = result.files!.agentContext;
      const contextData = await fs.readJson(contextPath);

      expect(contextData.skeletons).toContain('full-screen');
      expect(contextData.skeletons).toContain('with-header');
      expect(contextData.skeletons).toContain('with-sidebar');
      expect(contextData.skeletons).toContain('dashboard');
    });

    it('should include all screen intents', async () => {
      const options: AgentContextOptions = {
        outputDir: TEST_OUTPUT_DIR,
      };

      const result = await generateAgentContext(options);
      const contextPath = result.files!.agentContext;
      const contextData = await fs.readJson(contextPath);

      expect(contextData.intents).toContain('data-list');
      expect(contextData.intents).toContain('data-detail');
      expect(contextData.intents).toContain('dashboard');
      expect(contextData.intents).toContain('form');
      expect(contextData.intents).toContain('auth');
    });

    it('should generate screen-rules.md documentation', async () => {
      const options: AgentContextOptions = {
        outputDir: TEST_OUTPUT_DIR,
        generateDocs: true,
      };

      const result = await generateAgentContext(options);

      expect(result.success).toBe(true);
      expect(result.files?.documentation).toBeDefined();

      const docsPath = result.files!.documentation;
      const docsContent = await fs.readFile(docsPath, 'utf-8');

      expect(docsContent).toContain('# Screen Creation Rules');
      expect(docsContent).toContain('Environment');
      expect(docsContent).toContain('Skeleton');
      expect(docsContent).toContain('Intent');
    });

    it('should create AI-friendly JSON structure', async () => {
      const options: AgentContextOptions = {
        outputDir: TEST_OUTPUT_DIR,
      };

      const result = await generateAgentContext(options);
      const contextPath = result.files!.agentContext;
      const contextData = await fs.readJson(contextPath);

      // Should have clear structure for AI parsing
      expect(contextData.metadata).toBeDefined();
      expect(contextData.metadata.version).toBeDefined();
      expect(contextData.metadata.generated).toBeDefined();
    });

    it('should include component suggestions for each intent', async () => {
      const options: AgentContextOptions = {
        outputDir: TEST_OUTPUT_DIR,
      };

      const result = await generateAgentContext(options);
      const contextPath = result.files!.agentContext;
      const contextData = await fs.readJson(contextPath);

      expect(contextData.intentComponentMapping).toBeDefined();
      expect(contextData.intentComponentMapping['data-list']).toBeDefined();
      expect(Array.isArray(contextData.intentComponentMapping['data-list'])).toBe(true);
    });

    it('should generate VS Code extension integration hints', async () => {
      const options: AgentContextOptions = {
        outputDir: TEST_OUTPUT_DIR,
        generateDocs: true,
      };

      const result = await generateAgentContext(options);
      const docsPath = result.files!.documentation;
      const docsContent = await fs.readFile(docsPath, 'utf-8');

      // Should include VS Code integration documentation
      expect(docsContent).toContain('VS Code');
    });
  });
});
