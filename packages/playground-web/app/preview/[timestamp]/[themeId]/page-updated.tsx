/**
 * Preview 페이지 (Server Component) - Updated
 * SPEC-PLAYGROUND-001 Milestones 3, 4, 5 통합
 *
 * - Theme Integration (Milestone 3)
 * - Layout rendering (Milestone 4)
 * - Blueprint rendering (Milestone 5)
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { fetchBlueprint } from '@/lib/mcp-client';
import { loadTheme } from '@tekton/core';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/components/theme';
import { BlueprintRenderer } from '@/components/renderer';
import {
  DashboardLayout,
  LandingLayout,
  SidebarLeftLayout,
  SidebarRightLayout,
  TwoColumnLayout,
  SingleColumnLayout,
} from '@/components/layouts';

interface PageProps {
  params: Promise<{ timestamp: string; themeId: string }>;
}

export default async function PreviewPage({ params }: PageProps) {
  const { timestamp, themeId } = await params;

  // Blueprint 가져오기
  const blueprint = await fetchBlueprint(timestamp);

  if (!blueprint) {
    notFound();
  }

  // themeId 검증
  if (blueprint.themeId !== themeId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">Theme Mismatch</h2>
          <p className="text-yellow-700 mb-4">
            URL의 themeId ({themeId})가 Blueprint의 themeId ({blueprint.themeId})와 일치하지
            않습니다.
          </p>
          <p className="text-sm text-yellow-600">
            올바른 URL:{' '}
            <code className="bg-yellow-100 px-2 py-1 rounded">
              /preview/{timestamp}/{blueprint.themeId}
            </code>
          </p>
        </div>
      </div>
    );
  }

  // Theme 로드
  const theme = loadTheme(themeId);

  // Layout 렌더링
  const renderLayout = () => {
    const components = blueprint.components.map((node, index) => (
      <BlueprintRenderer key={index} node={node} />
    ));

    switch (blueprint.layout) {
      case 'dashboard':
        return (
          <DashboardLayout
            header={<div>Dashboard Header</div>}
            sidebar={<div>Sidebar</div>}
            main={<div>{components}</div>}
          />
        );

      case 'landing':
        return (
          <LandingLayout
            header={<div>Landing Header</div>}
            main={<div>{components}</div>}
            footer={<div>Footer</div>}
          />
        );

      case 'sidebar-left':
        return <SidebarLeftLayout sidebar={<div>Sidebar</div>} main={<div>{components}</div>} />;

      case 'sidebar-right':
        return <SidebarRightLayout main={<div>{components}</div>} sidebar={<div>Sidebar</div>} />;

      case 'two-column':
        return (
          <TwoColumnLayout
            left={<div>{components.slice(0, Math.ceil(components.length / 2))}</div>}
            right={<div>{components.slice(Math.ceil(components.length / 2))}</div>}
          />
        );

      case 'single-column':
      default:
        return <SingleColumnLayout main={<div>{components}</div>} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen">
        {/* Rendered Layout with Components */}
        {renderLayout()}
      </div>
    </ThemeProvider>
  );
}

/**
 * 메타데이터 생성
 */
export async function generateMetadata({ params }: PageProps) {
  const { timestamp } = await params;

  return {
    title: `Preview ${timestamp}`,
    description: `Blueprint preview for timestamp ${timestamp}`,
  };
}
