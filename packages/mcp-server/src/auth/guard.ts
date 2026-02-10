/**
 * 인증 가드 - 모든 도구 호출 전 인증 상태 확인
 * SPEC-DEPLOY-001: 모든 테마 유료화, 인증 필수
 */

import { isAuthenticated, isWhoamiCompleted } from './state.js';

export class AuthRequiredError extends Error {
  constructor() {
    super(
      'Authentication required. Run `tekton-mcp login` to authenticate, or set TEKTON_API_KEY environment variable.'
    );
    this.name = 'AuthRequiredError';
  }
}

export class WhoamiRequiredError extends Error {
  constructor() {
    super(
      'Please call the "whoami" tool first to verify your account and license status before using other tools.'
    );
    this.name = 'WhoamiRequiredError';
  }
}

/**
 * 인증 필수 가드
 * 인증되지 않은 경우 AuthRequiredError를 throw
 */
export function requireAuth(): void {
  if (!isAuthenticated()) {
    throw new AuthRequiredError();
  }
}

/**
 * whoami 필수 가드 (서버 사이드 강제)
 * whoami 미호출 시 WhoamiRequiredError를 throw
 * 프롬프트 인젝션으로 우회 불가
 */
export function requireWhoami(): void {
  if (!isWhoamiCompleted()) {
    throw new WhoamiRequiredError();
  }
}
