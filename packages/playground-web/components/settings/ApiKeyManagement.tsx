/**
 * API Key Management Component
 * SPEC-DEPLOY-001 Phase 4.2: API Key CRUD UI
 *
 * [TAG-DEPLOY-001-U008] API Key 관리 컴포넌트
 *
 * WHY: 사용자가 API Key를 생성, 조회, 삭제할 수 있는 UI 제공
 * IMPACT: MCP 서버 인증을 위한 사용자 친화적인 인터페이스
 */

'use client';

import { useEffect, useState } from 'react';
import { Button } from '@tekton/ui';
import { Plus } from 'lucide-react';
import { ApiKeyList } from './ApiKeyList';
import { CreateKeyDialog } from './CreateKeyDialog';
import type { ApiKeyListItem } from '@/lib/db/types';

export function ApiKeyManagement() {
  const [apiKeys, setApiKeys] = useState<ApiKeyListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Fetch API keys on mount
  useEffect(() => {
    fetchApiKeys();
  }, []);

  /**
   * Fetch user's API keys from the server
   */
  async function fetchApiKeys() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/api-keys');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch API keys');
      }

      const data: ApiKeyListItem[] = await response.json();
      setApiKeys(data);
    } catch (err) {
      console.error('Error fetching API keys:', err);
      setError(err instanceof Error ? err.message : 'Failed to load API keys');
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Handle successful API key creation
   */
  function handleKeyCreated() {
    setIsCreateDialogOpen(false);
    fetchApiKeys(); // Refresh the list
  }

  /**
   * Handle API key deletion
   */
  function handleKeyDeleted() {
    fetchApiKeys(); // Refresh the list
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-pulse text-xs uppercase tracking-wider text-neutral-400">
          Loading API keys...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-none border border-red-200 bg-red-50 p-4">
        <p className="text-xs uppercase tracking-wider text-red-700">Error: {error}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchApiKeys}
          className="mt-2 rounded-none uppercase tracking-wider"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Create New Key Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="rounded-none bg-neutral-900 text-white px-8 py-3 uppercase tracking-wider text-xs font-semibold hover:bg-neutral-800"
        >
          <Plus className="h-4 w-4 mr-2" />
          Generate New API Key
        </Button>
      </div>

      {/* API Key List */}
      <ApiKeyList apiKeys={apiKeys} onKeyDeleted={handleKeyDeleted} />

      {/* Create Key Dialog */}
      <CreateKeyDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onKeyCreated={handleKeyCreated}
      />
    </div>
  );
}
