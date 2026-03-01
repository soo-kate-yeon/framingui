/**
 * Login Page
 * Theme: Square Minimalism
 * - Radius: 0
 * - OAuth-only authentication with Google and GitHub
 */

'use client';

import Link from 'next/link';
import { Chrome, Github } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

/**
 * OAuth 에러 메시지 매핑
 */
const ERROR_MESSAGES: Record<string, string> = {
  missing_code: 'Authentication failed: No authorization code received.',
  code_expired: 'Authentication code has expired. Please try again.',
  exchange_failed: 'Failed to exchange authorization code. Please try again.',
  invalid_session: 'Invalid session. Please try logging in again.',
  user_creation_failed: 'Failed to create user account. Please contact support.',
  database_error: 'Database error occurred. Please try again later.',
  unexpected_error: 'An unexpected error occurred. Please try again.',
};

/**
 * Login Content Component with useSearchParams
 * Wrapped in Suspense boundary for Next.js 16 compatibility
 */
function LoginContent() {
  const { login, isLoading, error: authError } = useAuth();
  const searchParams = useSearchParams();
  const [displayError, setDisplayError] = useState<string | null>(null);

  // URL 쿼리 파라미터에서 에러 처리
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      const message = ERROR_MESSAGES[errorParam] || `Authentication error: ${errorParam}`;
      setDisplayError(message);
    }
  }, [searchParams]);

  // AuthContext 에러 처리
  useEffect(() => {
    if (authError) {
      setDisplayError(authError);
    }
  }, [authError]);

  // 에러 메시지 결정
  const error = displayError;

  const handleGoogleLogin = async () => {
    await login('google');
    // OAuth 리다이렉트가 발생하므로 router.push 불필요
  };

  const handleGitHubLogin = async () => {
    await login('github');
    // OAuth 리다이렉트가 발생하므로 router.push 불필요
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-12 shadow-lg">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link href="/" className="mb-6 inline-block">
            <div className="text-2xl font-bold tracking-tighter">framingui</div>
          </Link>
          <h1 className="text-sm font-medium text-neutral-500 mb-2">Welcome Back</h1>
          <p className="text-xl font-bold text-neutral-900 leading-tight">
            Log in to your workspace.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
            {error}
          </div>
        )}

        {/* OAuth Login Info */}
        <div className="mb-8 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
          <p className="text-sm font-semibold text-neutral-700 mb-2">OAuth Login</p>
          <p className="text-sm text-neutral-600">
            Sign in with your Google or GitHub account to access framingui Studio.
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-4">
          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white text-neutral-900 border border-neutral-200 rounded-full px-6 py-4 text-sm font-medium hover:bg-neutral-50 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Chrome size={18} className="text-[#4285F4]" />
            <span>{isLoading ? 'Connecting...' : 'Sign in with Google'}</span>
          </button>

          {/* GitHub Login Button */}
          <button
            type="button"
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="w-full bg-neutral-900 text-white border border-neutral-900 rounded-full px-6 py-4 text-sm font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Github size={18} />
            <span>{isLoading ? 'Connecting...' : 'Sign in with GitHub'}</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-neutral-200 text-center">
          <p className="text-sm text-neutral-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="font-semibold text-neutral-900 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Login Page with Suspense Boundary
 * Wraps LoginContent to satisfy Next.js 16 useSearchParams requirement
 */
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F0F0F0]">
          <div className="text-neutral-500">Loading...</div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
