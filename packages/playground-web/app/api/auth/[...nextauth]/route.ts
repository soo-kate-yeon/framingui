/**
 * NextAuth.js 5 API 라우트 핸들러
 * SPEC-UI-003: OAuth Callback Handler
 * [TAG-UI003-014] WHEN OAuth 콜백이 수신되면 THEN 사용자 세션이 생성되어야 한다
 */

import { handlers } from '@/lib/auth';

/**
 * GET 핸들러: OAuth 로그인, 세션 확인 등
 */
export const GET = handlers.GET;

/**
 * POST 핸들러: 로그인, 로그아웃 등
 */
export const POST = handlers.POST;
