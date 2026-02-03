/**
 * Login Page
 * Theme: Square Minimalism
 * - Radius: 0
 * - Inputs: Architectural (Border Bottom)
 */

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Mock login: 모든 이메일을 'google' provider로 처리
        // 실제 구현 시 password 검증 및 실제 인증 처리
        await login(email, 'google');

        // 로그인 성공 시 Studio로 리디렉션
        router.push('/studio');
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

                {/* Demo Account Info */}
                <div className="mb-8 p-4 bg-neutral-50 border border-neutral-200">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 mb-2">
                        Demo Account
                    </p>
                    <p className="text-xs text-neutral-600 mb-1">
                        Email: <span className="font-mono">demo@tekton.com</span>
                    </p>
                    <p className="text-xs text-neutral-600">
                        Password: <span className="font-mono">any password</span>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            required
                            disabled={isLoading}
                            className="w-full bg-transparent border-b border-neutral-200 p-0 py-3 text-neutral-900 placeholder:text-neutral-300 focus:border-neutral-900 focus:outline-none rounded-none transition-colors text-sm disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                                Password
                            </label>
                            <a href="#" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
                                Forgot?
                            </a>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                            className="w-full bg-transparent border-b border-neutral-200 p-0 py-3 text-neutral-900 placeholder:text-neutral-300 focus:border-neutral-900 focus:outline-none rounded-none transition-colors text-sm disabled:opacity-50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-neutral-900 text-white rounded-none px-6 py-4 uppercase tracking-wider text-xs font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
                    <p className="text-xs text-neutral-500">
                        Don't have an account?{' '}
                        <Link href="/auth/signup" className="font-bold text-neutral-900 hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}
