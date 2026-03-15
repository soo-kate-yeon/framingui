# Worktree Env Sync

When you create a new git worktree, local-only files like `.env.local` do not come with it.

In this repository, that most commonly breaks `packages/playground-web`, because Supabase config lives in:

- [`packages/playground-web/.env.local`](/Users/sooyeon/Developer/framingui/packages/playground-web/.env.local)

## Command

From the repository root:

```bash
pnpm worktree:sync-env /absolute/path/to/worktree
```

Example:

```bash
pnpm worktree:sync-env /Users/sooyeon/Developer/worktrees/framingui-rn-direct-write
```

If you need to overwrite an existing target file:

```bash
pnpm worktree:sync-env /Users/sooyeon/Developer/worktrees/framingui-rn-direct-write --force
```

## What It Copies

Currently the helper copies:

- `packages/playground-web/.env.local`

The script is intentionally small and can be extended if other package-local env files need the same treatment.

## Why This Exists

`git worktree` shares tracked files, but it does not copy untracked local files. Since `.env.local` is intentionally untracked, a fresh worktree will often be missing runtime config until you copy it over.

## Validation

After syncing env files, the usual playground checks should stop failing due to missing Supabase config:

```bash
pnpm --filter @framingui/playground-web build
pnpm --filter @framingui/playground-web test:e2e:mcp
```
