#!/bin/bash
set -e
export GITHUB_TOKEN=$(gh auth token)

echo "=== 이메일 추출 시작 ==="
echo "시작: $(date)"

for file in data/stargazers/*.json; do
  echo ""
  echo ">>> Processing: $file"
  node extract-emails.mjs "$file"
  echo ">>> Done: $file"
  sleep 2
done

echo ""
echo "=== 모든 추출 완료 ==="
echo "종료: $(date)"

# 결과 합치기
echo ""
echo "=== 전체 결과 ==="
cat data/emails/*-emails.csv | sort -u > data/emails/all-emails.csv
wc -l data/emails/*-emails.csv
