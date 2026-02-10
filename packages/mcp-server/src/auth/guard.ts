/**
 * 인증 가드 - 모든 도구 호출 전 인증 상태 확인
 * SPEC-DEPLOY-001: 모든 테마 유료화, 인증 필수
 */

import { isAuthenticated } from './state.js';

export class AuthRequiredError extends Error {
  constructor() {
    super(
      'Authentication required. Run `tekton-mcp login` to authenticate, or set TEKTON_API_KEY environment variable.'
    );
    this.name = 'AuthRequiredError';
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
