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

export default function LoginPage() {
    const { login, isLoading, error } = useAuth();

    const handleGoogleLogin = async () => {
        await login('google');
        // OAuth 리다이렉트가 발생하므로 router.push 불필요
    };

    const handleGitHubLogin = async () => {
        await login('github');
        // OAuth 리다이렉트가 발생하므로 router.push 불필요
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F0F0F0] p-6">
            <div className="w-full max-w-md bg-white border border-neutral-200 p-12 shadow-none">

                {/* Header */}
                <div className="mb-12 text-center">
                    <Link href="/" className="mb-6 inline-block">
                        <div className="text-2xl font-bold tracking-tighter">TEKTON</div>
                    </Link>
                    <h1 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-xl font-bold text-neutral-900 leading-tight">
                        Log in to your workspace.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-xs">
                        {error}
                    </div>
                )}

                {/* OAuth Login Info */}
                <div className="mb-8 p-4 bg-neutral-50 border border-neutral-200">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 mb-2">
                        OAuth Login
                    </p>
                    <p className="text-xs text-neutral-600">
                        Sign in with your Google or GitHub account to access TEKTON Studio.
                    </p>
                </div>

                {/* OAuth Buttons */}
                <div className="space-y-4">
                    {/* Google Login Button */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full bg-white text-neutral-900 border border-neutral-300 rounded-none px-6 py-4 uppercase tracking-wider text-xs font-bold hover:border-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Chrome size={16} className="text-[#4285F4]" />
                        <span>{isLoading ? 'Connecting...' : 'Sign in with Google'}</span>
                    </button>

                    {/* GitHub Login Button */}
                    <button
                        type="button"
                        onClick={handleGitHubLogin}
                        disabled={isLoading}
                        className="w-full bg-neutral-900 text-white border border-neutral-900 rounded-none px-6 py-4 uppercase tracking-wider text-xs font-bold hover:bg-neutral-800 hover:border-neutral-800 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Github size={16} />
                        <span>{isLoading ? 'Connecting...' : 'Sign in with GitHub'}</span>
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
                    <p className="text-xs text-neutral-500">
                        Don't have an account?{' '}
                        <Link href="/auth/signup" className="font-bold text-neutral-900 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}
