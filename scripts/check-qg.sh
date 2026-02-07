#!/bin/bash
# Vercel Ignored Build Step: Quality Gate 검증
#
# Exit 0 = 빌드 건너뜀 (ignored)
# Exit 1 = 빌드 진행 (not ignored)
#
# 필요 환경변수:
#   GH_API_TOKEN - GitHub PAT (Actions read 권한)
#   VERCEL_GIT_COMMIT_SHA - Vercel이 자동 제공

REPO="soo-kate-yeon/tekton"
SHA="$VERCEL_GIT_COMMIT_SHA"

if [ -z "$GH_API_TOKEN" ] || [ -z "$SHA" ]; then
  echo "Missing GH_API_TOKEN or VERCEL_GIT_COMMIT_SHA. Skipping build."
  exit 0
fi

# Quality Gate workflow 실행 결과 조회
RESPONSE=$(curl -sf -H "Authorization: token $GH_API_TOKEN" \
  "https://api.github.com/repos/$REPO/actions/workflows/quality-gate.yml/runs?head_sha=$SHA&status=completed&per_page=1")

if [ $? -ne 0 ]; then
  echo "GitHub API request failed. Skipping build."
  exit 0
fi

# 완료된 실행이 있는지 확인
COUNT=$(echo "$RESPONSE" | grep -o '"total_count":[0-9]*' | head -1 | cut -d: -f2)

if [ "$COUNT" = "0" ] || [ -z "$COUNT" ]; then
  echo "No completed Quality Gate run for $SHA. Skipping build."
  exit 0
fi

# 결론 확인
CONCLUSION=$(echo "$RESPONSE" | grep -o '"conclusion":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ "$CONCLUSION" = "success" ]; then
  echo "Quality Gate passed for $SHA. Proceeding with build."
  exit 1
fi

echo "Quality Gate status: ${CONCLUSION}. Skipping build."
exit 0
