#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

usage() {
  cat <<'EOF'
Usage: scripts/copy-worktree-env.sh <worktree-path> [--force]

Copies local-only environment files that are required for worktree-based
development, without committing those files to git.

Options:
  --force    Overwrite existing target files
EOF
}

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

TARGET_WORKTREE=""
FORCE=0

for arg in "$@"; do
  case "$arg" in
    --force)
      FORCE=1
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      if [[ -n "$TARGET_WORKTREE" ]]; then
        echo "Unexpected argument: $arg" >&2
        usage
        exit 1
      fi
      TARGET_WORKTREE="$arg"
      ;;
  esac
done

if [[ -z "$TARGET_WORKTREE" ]]; then
  usage
  exit 1
fi

TARGET_WORKTREE="$(cd "$TARGET_WORKTREE" && pwd)"

if [[ ! -d "$TARGET_WORKTREE/.git" && ! -f "$TARGET_WORKTREE/.git" ]]; then
  echo "Target is not a git worktree: $TARGET_WORKTREE" >&2
  exit 1
fi

copy_file() {
  local source_rel="$1"
  local source_path="${REPO_ROOT}/${source_rel}"
  local target_path="${TARGET_WORKTREE}/${source_rel}"
  local target_dir
  target_dir="$(dirname "$target_path")"

  if [[ ! -f "$source_path" ]]; then
    echo "skip  $source_rel (missing in source repo)"
    return 0
  fi

  mkdir -p "$target_dir"

  if [[ -f "$target_path" && $FORCE -ne 1 ]]; then
    echo "keep  $source_rel (already exists in worktree)"
    return 0
  fi

  cp "$source_path" "$target_path"
  echo "copy  $source_rel"
}

FILES=(
  "packages/playground-web/.env.local"
)

for file in "${FILES[@]}"; do
  copy_file "$file"
done
