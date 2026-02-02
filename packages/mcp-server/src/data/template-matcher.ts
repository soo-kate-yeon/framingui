/**
 * Template Matcher Module
 * SPEC-MCP-004 Phase 3: Blueprint Generator Enhancement
 *
 * 자연어 설명에서 최적의 Screen Template을 매칭합니다.
 */

import { templateRegistry } from '@tekton/ui';

/**
 * 키워드-템플릿 매핑 정의
 * 각 템플릿 ID에 대해 관련 키워드를 정의
 */
const KEYWORD_TEMPLATE_MAP: Record<string, string[]> = {
  // Auth Templates
  'auth.login': [
    'login',
    'sign in',
    'signin',
    'log in',
    '로그인',
    'authentication',
    'auth page',
    'user login',
    'member login',
    'ログイン',
    '登录',
  ],
  'auth.signup': [
    'signup',
    'sign up',
    'register',
    'registration',
    'create account',
    '회원가입',
    'new user',
    'join',
    'サインアップ',
    '注册',
  ],
  'auth.forgot-password': [
    'forgot password',
    'reset password',
    'password recovery',
    '비밀번호 찾기',
    'recover account',
    'パスワードリセット',
    '忘记密码',
  ],
  'auth.verification': [
    'verification',
    'verify',
    'confirm email',
    'otp',
    '인증',
    'code verification',
    '認証',
    '验证',
  ],

  // Dashboard Templates
  'dashboard.overview': [
    'dashboard',
    'analytics',
    'metrics',
    'stats',
    'statistics',
    '대시보드',
    'admin panel',
    'overview',
    'kpi',
    'ダッシュボード',
    '仪表板',
  ],

  // Core Templates
  'core.landing': [
    'landing',
    'landing page',
    'home',
    'homepage',
    '랜딩',
    'hero',
    'marketing page',
    'ランディング',
    '首页',
  ],
  'core.profile': [
    'profile',
    'user profile',
    'my page',
    '프로필',
    'account',
    'my account',
    'プロフィール',
    '个人资料',
  ],
  'core.preferences': [
    'settings',
    'preferences',
    'configuration',
    '설정',
    'options',
    'config',
    '設定',
    '设置',
  ],

  // Feedback Templates
  'feedback.loading': ['loading', 'spinner', 'wait', '로딩', 'progress', 'ローディング', '加载中'],
  'feedback.error': [
    'error',
    '404',
    '500',
    'not found',
    '오류',
    'error page',
    'エラー',
    '错误',
  ],
  'feedback.empty': [
    'empty',
    'no data',
    'no results',
    '빈 화면',
    'empty state',
    'nothing found',
    '空',
    '空状态',
  ],
  'feedback.confirmation': [
    'confirm',
    'confirmation',
    'are you sure',
    '확인',
    'modal confirm',
    '確認',
    '确认',
  ],
  'feedback.success': [
    'success',
    'completed',
    'done',
    '성공',
    'thank you',
    'congratulations',
    '成功',
    '成功',
  ],
};

/**
 * 템플릿 카테고리별 Shell/Page 토큰 권장 매핑
 */
export const TEMPLATE_LAYOUT_RECOMMENDATIONS: Record<
  string,
  { shell: string; page: string; description: string }
> = {
  auth: {
    shell: 'shell.web.auth',
    page: 'page.wizard',
    description: 'Centered layout for authentication flows',
  },
  dashboard: {
    shell: 'shell.web.dashboard',
    page: 'page.dashboard',
    description: 'Admin layout with sidebar for analytics',
  },
  core: {
    shell: 'shell.web.app',
    page: 'page.resource',
    description: 'Standard app layout for content pages',
  },
  feedback: {
    shell: 'shell.web.minimal',
    page: 'page.empty',
    description: 'Minimal layout for feedback states',
  },
  marketing: {
    shell: 'shell.web.marketing',
    page: 'page.detail',
    description: 'Full-width layout for marketing pages',
  },
};

/**
 * 템플릿 매칭 결과
 */
export interface TemplateMatchResult {
  templateId: string;
  templateName: string;
  category: string;
  confidence: number; // 0-100
  matchedKeywords: string[];
  layoutRecommendation: {
    shell: string;
    page: string;
    description: string;
  };
}

/**
 * 설명과 키워드 간 매칭 점수 계산
 */
function calculateMatchScore(
  description: string,
  keywords: string[]
): { score: number; matched: string[] } {
  const normalizedDesc = description.toLowerCase();
  const matched: string[] = [];
  let score = 0;

  for (const keyword of keywords) {
    if (normalizedDesc.includes(keyword.toLowerCase())) {
      matched.push(keyword);
      // 긴 키워드에 더 높은 점수 부여
      score += keyword.split(' ').length * 10;
    }
  }

  return { score, matched };
}

/**
 * 자연어 설명에서 최적의 템플릿 매칭
 *
 * @param description - 사용자의 자연어 화면 설명
 * @param topN - 반환할 상위 N개 결과 (기본: 3)
 * @returns 매칭된 템플릿 결과 배열 (신뢰도순 정렬)
 */
export function matchTemplates(description: string, topN: number = 3): TemplateMatchResult[] {
  const results: TemplateMatchResult[] = [];

  // 각 템플릿 키워드와 매칭
  for (const [templateId, keywords] of Object.entries(KEYWORD_TEMPLATE_MAP)) {
    const { score, matched } = calculateMatchScore(description, keywords);

    if (score > 0) {
      // 템플릿 메타데이터 가져오기
      const template = templateRegistry.get(templateId);
      const category = templateId.split('.')[0] || 'core';

      results.push({
        templateId,
        templateName: template?.name || templateId,
        category,
        confidence: Math.min(100, score), // 0-100 범위로 제한
        matchedKeywords: matched,
        layoutRecommendation: TEMPLATE_LAYOUT_RECOMMENDATIONS[category] || {
          shell: 'shell.web.app',
          page: 'page.resource',
          description: 'Default app layout',
        },
      });
    }
  }

  // 신뢰도순 정렬 후 상위 N개 반환
  return results.sort((a, b) => b.confidence - a.confidence).slice(0, topN);
}

/**
 * 최적 단일 템플릿 반환
 */
export function getBestMatch(description: string): TemplateMatchResult | null {
  const matches = matchTemplates(description, 1);
  const firstMatch = matches[0];
  return firstMatch ?? null;
}

/**
 * 템플릿 ID로 레이아웃 권장사항 조회
 */
export function getLayoutRecommendation(
  templateId: string
): (typeof TEMPLATE_LAYOUT_RECOMMENDATIONS)[string] | null {
  const category = templateId.split('.')[0];
  if (!category) {return null;}
  return TEMPLATE_LAYOUT_RECOMMENDATIONS[category] || null;
}

/**
 * 모든 템플릿 키워드 목록 조회 (디버깅용)
 */
export function getAllKeywordMappings(): Record<string, string[]> {
  return { ...KEYWORD_TEMPLATE_MAP };
}
