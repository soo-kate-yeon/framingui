/**
 * API Key List Component
 * SPEC-DEPLOY-001 Phase 4.2: API Key 목록 표시
 *
 * [TAG-DEPLOY-001-U008] API Key 목록 테이블
 *
 * WHY: 사용자의 API Key를 테이블 형식으로 표시
 * IMPACT: 사용자가 생성한 API Key를 관리하고 추적 가능
 */

'use client';

import { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tekton/ui';
import { Trash2 } from 'lucide-react';
import { DeleteKeyDialog } from './DeleteKeyDialog';
import type { ApiKeyListItem } from '@/lib/db/types';

interface ApiKeyListProps {
  apiKeys: ApiKeyListItem[];
  onKeyDeleted: () => void;
}

export function ApiKeyList({ apiKeys, onKeyDeleted }: ApiKeyListProps) {
  const [selectedKey, setSelectedKey] = useState<ApiKeyListItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  /**
   * Format date for display
   */
  function formatDate(dateString: string | null): string {
    if (!dateString) return 'Never';

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  /**
   * Handle delete button click
   */
  function handleDeleteClick(apiKey: ApiKeyListItem) {
    setSelectedKey(apiKey);
    setIsDeleteDialogOpen(true);
  }

  /**
   * Handle successful deletion
   */
  function handleDeleted() {
    setIsDeleteDialogOpen(false);
    setSelectedKey(null);
    onKeyDeleted();
  }

  // Empty state
  if (apiKeys.length === 0) {
    return (
      <div className="rounded-none border border-dashed border-neutral-200 p-8 text-center">
        <p className="text-xs uppercase tracking-wider text-neutral-400">
          No API keys yet. Create one to access premium themes from Claude Desktop.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* API Keys Table */}
      <div className="rounded-none border border-neutral-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-neutral-500">
                Name
              </TableHead>
              <TableHead className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-neutral-500">
                Key Prefix
              </TableHead>
              <TableHead className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-neutral-500">
                Last Used
              </TableHead>
              <TableHead className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-neutral-500">
                Created
              </TableHead>
              <TableHead className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-neutral-500 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeys.map((apiKey) => (
              <TableRow key={apiKey.id}>
                <TableCell className="px-6 py-4 text-sm font-bold text-neutral-900">{apiKey.name}</TableCell>
                <TableCell className="px-6 py-4">
                  <code className="rounded-none bg-neutral-50 border border-neutral-200 px-2 py-1 text-xs font-mono text-neutral-900">
                    {apiKey.key_prefix}...
                  </code>
                </TableCell>
                <TableCell className="px-6 py-4 text-xs text-neutral-500">
                  {formatDate(apiKey.last_used_at)}
                </TableCell>
                <TableCell className="px-6 py-4 text-xs text-neutral-500">
                  {formatDate(apiKey.created_at)}
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(apiKey)}
                    className="rounded-none text-red-600 hover:text-red-700 hover:bg-red-50 uppercase tracking-wider text-[10px]"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete {apiKey.name}</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      {selectedKey && (
        <DeleteKeyDialog
          apiKey={selectedKey}
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onDeleted={handleDeleted}
        />
      )}
    </>
  );
}
