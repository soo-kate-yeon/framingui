/**
 * Create API Key Dialog
 * SPEC-DEPLOY-001 Phase 4.2: API Key 생성 모달
 *
 * [TAG-DEPLOY-001-U008] API Key 생성 다이얼로그
 *
 * WHY: 사용자가 새로운 API Key를 생성할 수 있는 UI 제공
 * IMPACT: 평문 키를 한 번만 표시하고 Claude Desktop 설정 스니펫 제공
 */

'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
} from '@tekton/ui';
import { Copy, Check, AlertCircle } from 'lucide-react';
import type { ApiKeyWithPlaintext } from '@/lib/db/types';

interface CreateKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onKeyCreated: () => void;
}

export function CreateKeyDialog({ open, onOpenChange, onKeyCreated }: CreateKeyDialogProps) {
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdKey, setCreatedKey] = useState<ApiKeyWithPlaintext | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  /**
   * Reset dialog state
   */
  function resetDialog() {
    setName('');
    setCreatedKey(null);
    setError(null);
    setCopiedKey(false);
    setCopiedConfig(false);
  }

  /**
   * Handle dialog close
   */
  function handleClose(isOpen: boolean) {
    if (!isOpen) {
      resetDialog();
      if (createdKey) {
        onKeyCreated();
      }
    }
    onOpenChange(isOpen);
  }

  /**
   * Create new API key
   */
  async function handleCreate() {
    if (!name.trim()) {
      setError('Please enter a name for your API key');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch('/api/user/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create API key');
      }

      const data: ApiKeyWithPlaintext = await response.json();
      setCreatedKey(data);
    } catch (err) {
      console.error('Error creating API key:', err);
      setError(err instanceof Error ? err.message : 'Failed to create API key');
    } finally {
      setIsCreating(false);
    }
  }

  /**
   * Copy API key to clipboard
   */
  async function copyKey() {
    if (!createdKey) return;

    try {
      await navigator.clipboard.writeText(createdKey.key);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } catch (err) {
      console.error('Failed to copy key:', err);
    }
  }

  /**
   * Copy Claude Desktop config snippet to clipboard
   */
  async function copyConfig() {
    if (!createdKey) return;

    const configSnippet = JSON.stringify(
      {
        mcpServers: {
          tekton: {
            command: 'npx',
            args: ['@tekton/mcp-server@latest'],
            env: {
              TEKTON_API_KEY: createdKey.key,
              TEKTON_API_URL: 'https://tekton-ui.com',
            },
          },
        },
      },
      null,
      2
    );

    try {
      await navigator.clipboard.writeText(configSnippet);
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2000);
    } catch (err) {
      console.error('Failed to copy config:', err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl rounded-none border-neutral-200">
        <DialogHeader>
          <DialogTitle className="text-sm uppercase tracking-widest font-bold text-neutral-900">
            {createdKey ? 'API Key Created Successfully' : 'Generate New API Key'}
          </DialogTitle>
          <DialogDescription className="text-xs text-neutral-500">
            {createdKey
              ? 'Your API key has been created. Make sure to copy it now - you won\'t be able to see it again!'
              : 'Create a new API key for accessing Tekton MCP Server from Claude Desktop'}
          </DialogDescription>
        </DialogHeader>

        {!createdKey ? (
          // Creation Form
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs uppercase tracking-wide font-medium text-neutral-500">
                API Key Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., My Claude Desktop"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isCreating}
                autoFocus
                className="rounded-none border-b border-neutral-200 focus:border-neutral-900"
              />
              <p className="text-xs text-neutral-500">
                Choose a name to help you identify this key later
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-none border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>
        ) : (
          // Success View
          <div className="space-y-6 py-4">
            {/* API Key Display */}
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide font-medium text-neutral-500">
                Your API Key
              </Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded-none bg-neutral-50 border border-neutral-200 p-3 text-xs font-mono break-all text-neutral-900">
                  {createdKey.key}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyKey}
                  className="shrink-0 rounded-none border-neutral-300"
                  title="Copy API key"
                >
                  {copiedKey ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center gap-2 rounded-none border border-yellow-200 bg-yellow-50 p-3 text-xs text-yellow-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>This key will only be shown once. Store it securely!</span>
              </div>
            </div>

            {/* Claude Desktop Config */}
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide font-medium text-neutral-500">
                Claude Desktop Configuration
              </Label>
              <p className="text-xs text-neutral-500">
                Add this to your <code className="rounded-none bg-neutral-50 px-1 py-0.5 text-neutral-900">claude_desktop_config.json</code> file:
              </p>
              <div className="relative">
                <pre className="rounded-none bg-neutral-50 border border-neutral-200 p-4 text-xs font-mono overflow-x-auto text-neutral-900">
                  {JSON.stringify(
                    {
                      mcpServers: {
                        tekton: {
                          command: 'npx',
                          args: ['@tekton/mcp-server@latest'],
                          env: {
                            TEKTON_API_KEY: createdKey.key,
                            TEKTON_API_URL: 'https://tekton-ui.com',
                          },
                        },
                      },
                    },
                    null,
                    2
                  )}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyConfig}
                  className="absolute top-2 right-2 rounded-none border-neutral-300 uppercase tracking-wider text-[10px]"
                  title="Copy configuration"
                >
                  {copiedConfig ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-2 rounded-none border border-blue-200 bg-blue-50 p-4">
              <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-900">Next Steps:</h4>
              <ol className="text-xs space-y-1 list-decimal list-inside text-neutral-500">
                <li>Copy the configuration above</li>
                <li>
                  Paste it into your Claude Desktop config file (
                  <code className="rounded-none bg-neutral-100 px-1 py-0.5 text-neutral-900">claude_desktop_config.json</code>)
                </li>
                <li>Restart Claude Desktop</li>
                <li>You can now access Tekton themes from Claude!</li>
              </ol>
            </div>
          </div>
        )}

        <DialogFooter>
          {!createdKey ? (
            <>
              <Button
                variant="outline"
                onClick={() => handleClose(false)}
                disabled={isCreating}
                className="rounded-none border-neutral-300 uppercase tracking-wider text-xs"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={isCreating}
                className="rounded-none bg-neutral-900 text-white px-8 py-3 uppercase tracking-wider text-xs font-semibold hover:bg-neutral-800"
              >
                {isCreating ? 'Creating...' : 'Create API Key'}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => handleClose(false)}
              className="rounded-none bg-neutral-900 text-white px-8 py-3 uppercase tracking-wider text-xs font-semibold hover:bg-neutral-800"
            >
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
