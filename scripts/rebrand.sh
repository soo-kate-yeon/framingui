#!/bin/bash
# ============================================
# Rebrand Script: tekton-ui → framingui
# ============================================
# Usage: ./scripts/rebrand.sh [--dry-run]
# 
# --dry-run: Show what would be changed without making changes
# ============================================

set -e

DRY_RUN=false
if [[ "$1" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "🔍 DRY RUN MODE - No changes will be made"
fi

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "============================================"
echo "🔄 Rebranding: tekton-ui → framingui"
echo "============================================"
echo ""

# Define replacements
declare -a REPLACEMENTS=(
  # Package names
  "@tekton-ui/core:@framingui/core"
  "@tekton-ui/ui:@framingui/ui"
  "@tekton-ui/tokens:@framingui/tokens"
  "@tekton-ui/mcp-server:@framingui/mcp-server"
  "@tekton-ui/esbuild-plugin:@framingui/esbuild-plugin"
  "@tekton-ui/styled:@framingui/styled"
  "@tekton-ui/playground-web:@framingui/playground-web"
  
  # Domain
  "tekton-ui.com:framingui.com"
  
  # Brand names (case variations)
  "tekton-ui:framingui"
  "tekton/ui:framingui"
  "Tekton UI:FramingUI"
  "TEKTON UI:FRAMINGUI"
  "tektonui:framingui"
  "@tektonui:@framingui"
)

# File extensions to process
EXTENSIONS="ts,tsx,js,jsx,json,md,mdx,yml,yaml,txt,css,scss"

# Directories to skip
SKIP_DIRS="node_modules,.git,dist,build,.next,.vercel,.moai-backups"

# Count changes
TOTAL_FILES=0
TOTAL_REPLACEMENTS=0

for replacement in "${REPLACEMENTS[@]}"; do
  OLD="${replacement%%:*}"
  NEW="${replacement##*:}"
  
  echo -e "${YELLOW}Replacing:${NC} $OLD → $NEW"
  
  if [[ "$DRY_RUN" == true ]]; then
    # Count occurrences
    COUNT=$(grep -r "$OLD" . \
      --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
      --include="*.json" --include="*.md" --include="*.mdx" --include="*.yml" \
      --include="*.yaml" --include="*.txt" --include="*.css" --include="*.scss" \
      --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist \
      --exclude-dir=build --exclude-dir=.next --exclude-dir=.vercel \
      --exclude-dir=.moai-backups 2>/dev/null | wc -l | tr -d ' ')
    if [[ $COUNT -gt 0 ]]; then
      echo -e "  ${GREEN}Found $COUNT occurrences${NC}"
      TOTAL_REPLACEMENTS=$((TOTAL_REPLACEMENTS + COUNT))
    fi
  else
    # Actually replace
    if [[ "$OSTYPE" == "darwin"* ]]; then
      # macOS
      find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \
        -o -name "*.json" -o -name "*.md" -o -name "*.mdx" -o -name "*.yml" \
        -o -name "*.yaml" -o -name "*.txt" -o -name "*.css" -o -name "*.scss" \) \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
        -not -path "*/dist/*" \
        -not -path "*/build/*" \
        -not -path "*/.next/*" \
        -not -path "*/.vercel/*" \
        -not -path "*/.moai-backups/*" \
        -exec sed -i '' "s|$OLD|$NEW|g" {} +
    else
      # Linux
      find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \
        -o -name "*.json" -o -name "*.md" -o -name "*.mdx" -o -name "*.yml" \
        -o -name "*.yaml" -o -name "*.txt" -o -name "*.css" -o -name "*.scss" \) \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
        -not -path "*/dist/*" \
        -not -path "*/build/*" \
        -not -path "*/.next/*" \
        -not -path "*/.vercel/*" \
        -not -path "*/.moai-backups/*" \
        -exec sed -i "s|$OLD|$NEW|g" {} +
    fi
  fi
done

echo ""
echo "============================================"

if [[ "$DRY_RUN" == true ]]; then
  echo -e "${GREEN}DRY RUN COMPLETE${NC}"
  echo "Total replacements to make: $TOTAL_REPLACEMENTS"
  echo ""
  echo "Run without --dry-run to apply changes."
else
  echo -e "${GREEN}REBRAND COMPLETE${NC}"
  echo ""
  echo "Next steps:"
  echo "1. Run: pnpm install"
  echo "2. Run: pnpm build:all"
  echo "3. Run: pnpm test"
  echo "4. Verify changes: git diff"
  echo "5. Commit: git add -A && git commit -m 'chore: rebrand tekton-ui to framingui'"
fi

echo "============================================"
