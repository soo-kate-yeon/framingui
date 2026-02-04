import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Note: Middleware removed for Next.js 16 compatibility
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  // Workspace 패키지 transpile
  // Note: @tekton/ui는 이미 'use client' 지시어가 포함된 pre-built ESM 번들을 제공하므로 제외
  transpilePackages: ['@tekton/core'],
  webpack: (config) => {
    // pnpm symlink를 따라가지 않고 package.json exports 사용
    config.resolve.symlinks = false;
    return config;
  },
};

export default withNextIntl(nextConfig);
