import type { NextConfig } from 'next';
import path from 'node:path';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  // Workspace 패키지 transpile (dist/ 파일 처리)
  transpilePackages: ['@tekton/core', '@tekton/ui'],
  webpack: (config) => {
    // pnpm symlink를 따라가지 않고 package.json exports 사용
    config.resolve.symlinks = false;
    // symlinks=false 시 pnpm 가상 스토어에서 transitive 의존성 해석을 위해
    // 로컬 node_modules를 resolve 경로에 추가
    config.resolve.modules = [
      path.resolve(import.meta.dirname, 'node_modules'),
      ...(config.resolve.modules || ['node_modules']),
    ];
    return config;
  },
};

export default withNextIntl(nextConfig);
