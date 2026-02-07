/**
 * API Key Management Dashboard
 * SPEC-DEPLOY-001 Phase 4.2: User-facing API Key Management UI
 *
 * [TAG-DEPLOY-001-U008] API Key 관리 대시보드 구현
 *
 * WHY: 사용자가 MCP 서버 인증을 위한 API Key를 생성하고 관리
 * IMPACT: 사용자가 Claude Desktop에서 Tekton MCP 서버를 사용할 수 있음
 */

'use client';

import { ApiKeyManagement } from '@/components/settings/ApiKeyManagement';

/**
 * API Keys Settings Page
 *
 * Client Component로 구현하여 동적 기능 지원
 * Minimal Workspace 테마 적용
 */
export default function ApiKeysPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="mw-heading-3">API Keys</h2>
        <p className="mw-text-secondary mt-2">
          Manage your API keys for accessing Tekton MCP Server from Claude Desktop
        </p>
      </div>

      {/* API Key Management Card */}
      <div className="mw-card">
        <div className="mw-card-header">
          <h3 className="mw-card-title">Your API Keys</h3>
          <p className="mw-card-description">
            Generate and manage API keys for MCP server authentication. Each key can be used to
            access premium themes from Claude Desktop.
          </p>
        </div>
        <div className="mw-card-content">
          <ApiKeyManagement />
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mw-card">
        <div className="mw-card-header">
          <h3 className="mw-card-title">How to Use Your API Key</h3>
          <p className="mw-card-description">
            Follow these steps to configure Claude Desktop with your Tekton API key
          </p>
        </div>
        <div className="mw-card-content space-y-6">
          <div>
            <h4 className="font-semibold mb-2 mw-text-primary">1. Generate an API Key</h4>
            <p className="text-sm mw-text-secondary">
              Click the &quot;Generate New API Key&quot; button above and give it a meaningful
              name (e.g., &quot;My Claude Desktop&quot;)
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 mw-text-primary">2. Copy Your Key</h4>
            <p className="text-sm mw-text-secondary">
              After creation, copy the full API key. This is the only time you&apos;ll see the
              complete key.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 mw-text-primary">3. Configure Claude Desktop</h4>
            <p className="text-sm mw-text-secondary">
              Add the provided configuration snippet to your Claude Desktop config file
              (claude_desktop_config.json)
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 mw-text-primary">4. Restart Claude Desktop</h4>
            <p className="text-sm mw-text-secondary">
              Restart Claude Desktop to apply the changes. You can now access Tekton themes from
              Claude!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
