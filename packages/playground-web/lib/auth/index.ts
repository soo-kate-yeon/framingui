/**
 * Authentication Module Exports
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * WHY: 인증 관련 모든 함수를 한 곳에서 import 가능하도록 함
 * IMPACT: 코드 가독성 및 유지보수성 향상
 */

export * from './supabase-auth';
export type { OAuthProvider, OAuthResult, AuthResult } from './supabase-auth';
