/**
 * NextAuth.js 5 인증 설정
 * SPEC-UI-003: WebView Studio MVP Authentication System
 * [TAG-UI003-056]
 */

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import type { UserData } from './types/user';

/**
 * 사용자 데이터 로드 함수 (예시 구현)
 * 실제 구현에서는 데이터베이스 또는 API 호출로 대체해야 함
 */
async function loadUserData(userId: string): Promise<UserData> {
  // TODO: 실제 데이터베이스 연동 구현
  // 현재는 임시 데이터 반환
  return {
    userId,
    licenses: [],
    likedTemplates: [],
    savedThemes: [],
  };
}

/**
 * NextAuth.js 5 설정
 *
 * 기능:
 * - Google OAuth 로그인
 * - GitHub OAuth 로그인
 * - 라이선스 정보 세션에 포함 [TAG-UI003-010]
 * - OAuth 콜백 처리 [TAG-UI003-014]
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    /**
     * JWT 콜백: 토큰에 사용자 정보 저장
     */
    async jwt({ token, account, user }) {
      // 신규 사용자 또는 OAuth 로그인 시 토큰에 정보 추가
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.userId = user.id;
      }
      return token;
    },

    /**
     * 세션 콜백: 세션에 라이선스 정보 포함
     * [TAG-UI003-010] WHEN 사용자가 로그인하면 THEN 라이선스 정보가 로드되어야 한다
     */
    async session({ session, token }) {
      if (session.user && token.sub) {
        // 사용자 데이터 로드 (라이선스, 좋아요 목록 등)
        const userData = await loadUserData(token.sub);

        // 세션에 사용자 데이터 추가
        (session.user as any).licenses = userData.licenses;
        (session.user as any).likedTemplates = userData.likedTemplates;
        (session.user as any).savedThemes = userData.savedThemes;
        (session.user as any).userId = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  secret: process.env.AUTH_SECRET,
});
