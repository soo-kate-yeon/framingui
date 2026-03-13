/**
 * Recipe Resolver Unit Tests
 * SPEC-MCP-004 Phase 4: Theme Recipes Auto-Application
 */

import { describe, it, expect, vi } from 'vitest';
import {
  resolveRecipe,
  applyRecipeToNode,
  applyRecipesToBlueprint,
  countAppliedRecipes,
  getAllRecipes,
} from '../../src/data/recipe-resolver.js';
import type { ComponentNode } from '@framingui/core';

const themeFixtures = {
  'dark-boldness': {
    recipes: {
      card: {
        glass: 'bg-slate-900/80 border border-slate-700 shadow-lg',
        default: 'bg-slate-950 border border-slate-800',
      },
      button: {
        primary: 'bg-brand-500 text-white',
        default: 'bg-slate-800 text-white',
      },
      badge: {
        neutral: 'bg-slate-700 text-slate-100',
      },
      typography: {
        hero: 'text-4xl font-bold tracking-tight',
      },
    },
  },
} as const;

vi.mock('../../src/api/data-client.js', () => ({
  fetchTheme: vi.fn(async (themeId: string) => {
    const fixture = themeFixtures[themeId as keyof typeof themeFixtures];

    if (!fixture) {
      return {
        ok: false,
        error: {
          code: 'NOT_FOUND',
          message: `Theme not found: ${themeId}`,
        },
      };
    }

    return { ok: true, data: fixture };
  }),
}));

describe('Recipe Resolver', () => {
  describe('resolveRecipe', () => {
    it('테마가 없으면 undefined 반환', async () => {
      const recipe = await resolveRecipe('non-existent-theme', 'Card', 'glass');
      expect(recipe).toBeUndefined();
    });

    it('레시피가 없는 variant는 fallback 시도', async () => {
      const recipe = await resolveRecipe('dark-boldness', 'Card', 'non-existent-variant');
      expect(recipe === undefined || typeof recipe === 'string').toBe(true);
    });

    it('card.glass 레시피 조회 성공', async () => {
      const recipe = await resolveRecipe('dark-boldness', 'Card', 'glass');
      expect(recipe).toBeDefined();
      expect(typeof recipe).toBe('string');
      expect(recipe).toContain('bg-');
    });

    it('button.primary 레시피 조회 성공', async () => {
      const recipe = await resolveRecipe('dark-boldness', 'Button', 'primary');
      expect(recipe).toBeDefined();
      expect(typeof recipe).toBe('string');
    });

    it('Typography 특수 처리 (Text.hero)', async () => {
      const recipe = await resolveRecipe('dark-boldness', 'Text', 'hero');
      expect(recipe).toBeDefined();
    });

    it('대소문자 무관하게 조회', async () => {
      const recipe1 = await resolveRecipe('dark-boldness', 'Card', 'glass');
      const recipe2 = await resolveRecipe('dark-boldness', 'card', 'glass');
      expect(recipe1).toBe(recipe2);
    });
  });

  describe('applyRecipeToNode', () => {
    it('variant가 있는 노드에 레시피 적용', async () => {
      const node: ComponentNode = {
        type: 'Card',
        props: { variant: 'glass' },
        children: [],
      };

      const result = await applyRecipeToNode(node, 'dark-boldness');

      expect(result.props).toBeDefined();
      expect((result.props as any).className).toContain('bg-');
    });

    it('기존 className과 레시피 병합', async () => {
      const node: ComponentNode = {
        type: 'Card',
        props: {
          variant: 'glass',
          className: 'p-4 rounded-lg',
        },
        children: [],
      };

      const result = await applyRecipeToNode(node, 'dark-boldness');

      const className = (result.props as any).className;
      expect(className).toContain('p-4');
      expect(className).toContain('rounded-lg');
      expect(className).toContain('bg-');
    });

    it('variant가 없으면 기존 className 유지', async () => {
      const node: ComponentNode = {
        type: 'Card',
        props: { className: 'p-4' },
        children: [],
      };

      const result = await applyRecipeToNode(node, 'dark-boldness');

      expect((result.props as any).className).toContain('p-4');
    });

    it('children 재귀 처리', async () => {
      const node: ComponentNode = {
        type: 'Card',
        props: { variant: 'glass' },
        children: [
          {
            type: 'Button',
            props: { variant: 'primary' },
            children: ['Click me'],
          },
        ],
      };

      const result = await applyRecipeToNode(node, 'dark-boldness');

      expect((result.props as any).className).toBeDefined();
      expect(Array.isArray(result.children)).toBe(true);

      const child = result.children?.[0] as ComponentNode;
      expect((child.props as any)?.className).toBeDefined();
    });

    it('원본 노드 수정하지 않음 (immutable)', async () => {
      const original: ComponentNode = {
        type: 'Card',
        props: { variant: 'glass' },
        children: [],
      };

      const originalProps = original.props;
      const result = await applyRecipeToNode(original, 'dark-boldness');

      expect(result.props).not.toBe(originalProps);
      expect((originalProps as any).className).toBeUndefined();
    });
  });

  describe('applyRecipesToBlueprint', () => {
    it('모든 컴포넌트에 레시피 적용', async () => {
      const components: ComponentNode[] = [
        { type: 'Card', props: { variant: 'glass' }, children: [] },
        { type: 'Button', props: { variant: 'primary' }, children: [] },
        { type: 'Badge', props: { variant: 'neutral' }, children: [] },
      ];

      const result = await applyRecipesToBlueprint(components, 'dark-boldness');

      expect(result).toHaveLength(3);
      result.forEach(component => {
        expect((component.props as any)?.className).toBeDefined();
      });
    });

    it('빈 배열 처리', async () => {
      const result = await applyRecipesToBlueprint([], 'dark-boldness');
      expect(result).toHaveLength(0);
    });
  });

  describe('countAppliedRecipes', () => {
    it('적용된 레시피 개수 계산', async () => {
      const components: ComponentNode[] = [
        { type: 'Card', props: { variant: 'glass' }, children: [] },
        { type: 'Button', props: { variant: 'primary' }, children: [] },
        { type: 'Text', children: ['No variant'] },
      ];

      const count = await countAppliedRecipes(components, 'dark-boldness');
      expect(count).toBeGreaterThanOrEqual(2);
    });

    it('중첩된 컴포넌트도 카운트', async () => {
      const components: ComponentNode[] = [
        {
          type: 'Card',
          props: { variant: 'glass' },
          children: [
            {
              type: 'Button',
              props: { variant: 'primary' },
              children: ['Click'],
            },
          ],
        },
      ];

      const count = await countAppliedRecipes(components, 'dark-boldness');
      expect(count).toBeGreaterThanOrEqual(2);
    });

    it('빈 배열은 0 반환', async () => {
      const count = await countAppliedRecipes([], 'dark-boldness');
      expect(count).toBe(0);
    });
  });

  describe('getAllRecipes', () => {
    it('테마의 모든 레시피 조회', async () => {
      const recipes = await getAllRecipes('dark-boldness');

      expect(Object.keys(recipes).length).toBeGreaterThan(0);

      for (const [path, className] of Object.entries(recipes)) {
        expect(path).toMatch(/^recipes\./);
        expect(typeof className).toBe('string');
      }
    });

    it('존재하지 않는 테마는 빈 객체 반환', async () => {
      const recipes = await getAllRecipes('non-existent-theme');
      expect(recipes).toEqual({});
    });

    it('카테고리별 레시피 포함', async () => {
      const recipes = await getAllRecipes('dark-boldness');

      const paths = Object.keys(recipes);
      const hasCard = paths.some(path => path.startsWith('recipes.card'));
      const hasButton = paths.some(path => path.startsWith('recipes.button'));

      expect(hasCard || hasButton).toBe(true);
    });
  });

  describe('Integration Test', () => {
    it('완전한 Blueprint에 레시피 적용 후 className 확인', async () => {
      const components: ComponentNode[] = [
        {
          type: 'Card',
          props: { variant: 'glass', className: 'p-6' },
          children: [
            {
              type: 'Text',
              props: { variant: 'eyebrow' },
              children: ['LABEL'],
            },
            {
              type: 'Heading',
              props: { level: 2 },
              children: ['Title'],
            },
            {
              type: 'Button',
              props: { variant: 'primary' },
              children: ['Action'],
            },
          ],
        },
      ];

      const result = await applyRecipesToBlueprint(components, 'dark-boldness');
      const count = await countAppliedRecipes(result, 'dark-boldness');

      const card = result[0]!;
      const cardClassName = (card.props as Record<string, unknown>)?.className;
      expect(cardClassName).toContain('p-6');
      expect(cardClassName).toMatch(/bg-|border/);
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });
});
