/**
 * Delete API Key Dialog
 * SPEC-DEPLOY-001 Phase 4.2: API Key 삭제 확인 모달
 *
 * [TAG-DEPLOY-001-U008] API Key 삭제 확인 다이얼로그
 *
 * WHY: 사용자가 API Key를 실수로 삭제하지 않도록 확인 절차 제공
 * IMPACT: 안전한 API Key 관리 및 사용자 경험 향상
 */

'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@tekton/ui';
import { AlertCircle } from 'lucide-react';
import type { ApiKeyListItem } from '@/lib/db/types';

interface DeleteKeyDialogProps {
  apiKey: ApiKeyListItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
}

export function DeleteKeyDialog({ apiKey, open, onOpenChange, onDeleted }: DeleteKeyDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle API key deletion
   */
  async function handleDelete() {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/api-keys/${apiKey.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete API key');
      }

      // Success
      onDeleted();
    } catch (err) {
      console.error('Error deleting API key:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete API key');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-none border-neutral-200 bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm uppercase tracking-widest font-bold text-neutral-900">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3 text-xs text-neutral-500">
              <p>
                You are about to revoke the API key <strong className="text-neutral-900">&quot;{apiKey.name}&quot;</strong>.
              </p>
              <div className="flex items-start gap-2 rounded-none border border-yellow-200 bg-yellow-50 p-3 text-xs text-yellow-700">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold uppercase tracking-wider mb-1">This action cannot be undone.</p>
                  <p>
                    MCP servers using this key will immediately stop working. You will need to
                    generate a new key and update your Claude Desktop configuration.
                  </p>
                </div>
              </div>
              {error && (
                <div className="flex items-center gap-2 rounded-none border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <span>Error: {error}</span>
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isDeleting}
            className="rounded-none border-neutral-300 uppercase tracking-wider text-xs"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-none bg-red-600 hover:bg-red-700 text-white uppercase tracking-wider text-xs font-semibold"
          >
            {isDeleting ? 'Revoking...' : 'Revoke Key'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
