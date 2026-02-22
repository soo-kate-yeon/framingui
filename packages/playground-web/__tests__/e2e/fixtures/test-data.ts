/**
 * Test Data Fixtures
 * SPEC-DEPLOY-001 Phase 2.5: E2E 테스트 데이터
 */

/**
 * 무료 테마 목록
 */
export const FREE_THEMES = ['minimal-starter', 'basic-dashboard'];

/**
 * 유료 테마 목록
 */
export const PREMIUM_THEMES = ['dark-boldness-v2', 'square-minimalism', 'nature-inspired'];

/**
 * 테스트용 API Key 이름
 */
export const API_KEY_NAMES = {
  CLAUDE_DESKTOP: 'My Claude Desktop',
  LOCAL_DEV: 'Local Development',
  CI_CD: 'CI/CD Pipeline',
};

/**
 * 예상 API Key 형식 정규식
 */
export const API_KEY_PATTERN = /^tk_live_[a-f0-9]{32}$/;

/**
 * 예상 API Key Prefix 형식 정규식
 */
export const API_KEY_PREFIX_PATTERN = /^tk_live_[a-f0-9]{4}$/;

/**
 * UUID 형식 정규식
 */
export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Rate Limit 설정
 */
export const RATE_LIMITS = {
  API_KEYS_MANAGEMENT: 10, // 분당 10회
  MCP_VERIFY: 60, // 분당 60회
};

/**
 * 테스트 타임아웃 (ms)
 */
export const TIMEOUTS = {
  PAGE_LOAD: 10000, // 10초
  API_RESPONSE: 5000, // 5초
  NAVIGATION: 3000, // 3초
};
