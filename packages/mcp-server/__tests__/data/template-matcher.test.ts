/**
 * Template Matcher Unit Tests
 * SPEC-MCP-004 Phase 3: Blueprint Generator Enhancement
 */

import { describe, it, expect, beforeAll } from 'vitest';
import {
  matchTemplates,
  getBestMatch,
  getLayoutRecommendation,
  getAllKeywordMappings,
} from '../../src/data/template-matcher.js';

describe('Template Matcher', () => {
  describe('matchTemplates', () => {
    it('매칭되는 템플릿이 없을 때 빈 배열 반환', () => {
      const result = matchTemplates('random gibberish text here');
      expect(result).toHaveLength(0);
    });

    it('로그인 관련 설명에서 auth.login 템플릿 매칭', () => {
      const result = matchTemplates('Create a login page with email and password');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].templateId).toBe('auth.login');
      expect(result[0].matchedKeywords).toContain('login');
    });

    it('대시보드 관련 설명에서 dashboard.overview 템플릿 매칭', () => {
      const result = matchTemplates('Build an analytics dashboard with metrics and charts');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].templateId).toBe('dashboard.overview');
      expect(result[0].matchedKeywords).toContain('dashboard');
    });

    it('회원가입 관련 설명에서 auth.signup 템플릿 매칭', () => {
      const result = matchTemplates('Create a signup form for new user registration');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].templateId).toBe('auth.signup');
    });

    it('한국어 키워드 지원', () => {
      const result = matchTemplates('사용자 로그인 페이지 만들기');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].templateId).toBe('auth.login');
      expect(result[0].matchedKeywords).toContain('로그인');
    });

    it('topN 파라미터로 결과 개수 제한', () => {
      const result = matchTemplates('dashboard login analytics settings', 2);
      expect(result.length).toBeLessThanOrEqual(2);
    });

    it('confidence 점수가 0-100 범위 내', () => {
      const result = matchTemplates('Create a dashboard with analytics and metrics');
      result.forEach(match => {
        expect(match.confidence).toBeGreaterThanOrEqual(0);
        expect(match.confidence).toBeLessThanOrEqual(100);
      });
    });

    it('layoutRecommendation 포함', () => {
      const result = matchTemplates('Build a login page');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].layoutRecommendation).toBeDefined();
      expect(result[0].layoutRecommendation.shell).toBeDefined();
      expect(result[0].layoutRecommendation.page).toBeDefined();
    });
  });

  describe('getBestMatch', () => {
    it('최적 매칭 단일 결과 반환', () => {
      const result = getBestMatch('Create a dashboard page');
      expect(result).not.toBeNull();
      expect(result?.templateId).toBe('dashboard.overview');
    });

    it('매칭 없을 때 null 반환', () => {
      const result = getBestMatch('random text with no keywords');
      expect(result).toBeNull();
    });
  });

  describe('getLayoutRecommendation', () => {
    it('auth 카테고리 레이아웃 권장사항 반환', () => {
      const result = getLayoutRecommendation('auth.login');
      expect(result).not.toBeNull();
      expect(result?.shell).toBe('shell.web.auth');
      expect(result?.page).toBe('page.wizard');
    });

    it('dashboard 카테고리 레이아웃 권장사항 반환', () => {
      const result = getLayoutRecommendation('dashboard.overview');
      expect(result).not.toBeNull();
      expect(result?.shell).toBe('shell.web.dashboard');
      expect(result?.page).toBe('page.dashboard');
    });

    it('알 수 없는 템플릿 ID에 대해 null 반환', () => {
      const result = getLayoutRecommendation('unknown.template');
      expect(result).toBeNull();
    });
  });

  describe('getAllKeywordMappings', () => {
    it('모든 키워드 매핑 반환', () => {
      const mappings = getAllKeywordMappings();
      expect(Object.keys(mappings).length).toBeGreaterThan(0);
      expect(mappings['auth.login']).toBeDefined();
      expect(mappings['dashboard.overview']).toBeDefined();
    });

    it('각 템플릿에 키워드 배열 포함', () => {
      const mappings = getAllKeywordMappings();
      Object.values(mappings).forEach(keywords => {
        expect(Array.isArray(keywords)).toBe(true);
        expect(keywords.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Multi-language Support', () => {
    it('일본어 키워드 지원 (ダッシュボード)', () => {
      const result = matchTemplates('ダッシュボード画面を作成');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].templateId).toBe('dashboard.overview');
    });

    it('중국어 키워드 지원 (登录)', () => {
      const result = matchTemplates('创建一个登录页面');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].templateId).toBe('auth.login');
    });
  });

  describe('Complex Descriptions', () => {
    it('복합 설명에서 가장 관련성 높은 템플릿 우선', () => {
      const result = matchTemplates(
        'Build a login authentication page with password reset functionality'
      );
      expect(result.length).toBeGreaterThan(0);
      // login이 더 많이 언급되므로 auth.login이 우선
      expect(['auth.login', 'auth.forgot-password']).toContain(result[0].templateId);
    });

    it('신뢰도순 정렬 확인', () => {
      const result = matchTemplates('dashboard with user profile settings');
      // 결과가 신뢰도 내림차순으로 정렬되어야 함
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].confidence).toBeGreaterThanOrEqual(result[i + 1].confidence);
      }
    });
  });
});
