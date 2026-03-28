#!/usr/bin/env node
/**
 * GitHub 유저 이메일 추출 스크립트
 * 
 * 방법:
 * 1. 프로필 공개 이메일
 * 2. 최근 커밋에서 이메일 추출
 * 
 * 사용법:
 *   node extract-emails.mjs data/stargazers/shadcn-ui.json
 *   node extract-emails.mjs data/stargazers/shadcn-ui.json --skip-commits
 * 
 * 환경변수:
 *   GITHUB_TOKEN - GitHub Personal Access Token (필수!)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const EMAIL_DIR = join(__dirname, 'data', 'emails');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// noreply 이메일 필터링
const isValidEmail = (email) => {
  if (!email) return false;
  if (email.includes('noreply')) return false;
  if (email.includes('users.noreply.github.com')) return false;
  if (email.endsWith('@github.com')) return false;
  return email.includes('@');
};

async function fetchWithRetry(url, headers, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers });
      
      if (res.status === 403) {
        const remaining = res.headers.get('x-ratelimit-remaining');
        if (remaining === '0') {
          const reset = res.headers.get('x-ratelimit-reset');
          const waitMs = (reset * 1000) - Date.now() + 1000;
          console.log(`⏳ Rate limit hit, waiting ${Math.ceil(waitMs/1000)}s...`);
          await new Promise(r => setTimeout(r, Math.min(waitMs, 60000)));
          continue;
        }
      }
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      return res;
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

async function getEmailFromProfile(login, headers) {
  const url = `https://api.github.com/users/${login}`;
  const res = await fetchWithRetry(url, headers);
  if (!res) return null;
  
  const data = await res.json();
  return isValidEmail(data.email) ? data.email : null;
}

async function getEmailFromCommits(login, headers) {
  // 유저의 최근 public 이벤트에서 push 이벤트 찾기
  const url = `https://api.github.com/users/${login}/events/public?per_page=30`;
  const res = await fetchWithRetry(url, headers);
  if (!res) return null;
  
  const events = await res.json();
  
  for (const event of events) {
    if (event.type === 'PushEvent' && event.payload?.commits) {
      for (const commit of event.payload.commits) {
        const email = commit.author?.email;
        if (isValidEmail(email)) {
          return email;
        }
      }
    }
  }
  
  return null;
}

// 최근 활동 여부 체크 (6개월 이내)
async function isRecentlyActive(login, headers) {
  const url = `https://api.github.com/users/${login}/events/public?per_page=1`;
  const res = await fetchWithRetry(url, headers);
  if (!res) return false;
  
  const events = await res.json();
  if (!events.length) return false;
  
  const lastActivity = new Date(events[0].created_at);
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  return lastActivity > sixMonthsAgo;
}

// 이메일 품질 점수 (회사 도메인 우선)
function emailQualityScore(email) {
  if (!email) return 0;
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return 0;
  
  // 회사/커스텀 도메인 = 높은 점수
  if (!['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'qq.com', '163.com', 'proton.me', 'icloud.com'].includes(domain)) {
    return 3; // 회사 도메인
  }
  if (domain === 'gmail.com') return 2; // Gmail은 그나마 활성
  return 1; // 나머지
}

async function processUser(user, headers, skipCommits, requireRecent = false) {
  const { login } = user;
  
  // 최근 활동 필터 (옵션)
  if (requireRecent) {
    const active = await isRecentlyActive(login, headers);
    if (!active) return null;
  }
  
  // 1. 프로필에서 이메일 시도
  let email = await getEmailFromProfile(login, headers);
  let source = 'profile';
  
  // 2. 없으면 커밋에서 추출
  if (!email && !skipCommits) {
    email = await getEmailFromCommits(login, headers);
    source = 'commit';
  }
  
  if (!email) return null;
  
  const quality = emailQualityScore(email);
  return { login, email, source, url: user.url, quality };
}

async function main() {
  const args = process.argv.slice(2);
  const inputFile = args.find(a => a.endsWith('.json'));
  const skipCommits = args.includes('--skip-commits');
  const requireRecent = args.includes('--recent'); // 6개월 내 활동한 유저만
  
  if (!inputFile) {
    console.log(`
사용법: node extract-emails.mjs <stargazers.json> [--skip-commits] [--recent]

예시:
  node extract-emails.mjs data/stargazers/shadcn-ui.json
  node extract-emails.mjs data/stargazers/shadcn-ui.json --recent  # 최근 활동 유저만

옵션:
  --skip-commits  커밋에서 이메일 추출 안 함 (빠름)
  --recent        6개월 내 활동한 유저만 (품질 ↑)

환경변수:
  GITHUB_TOKEN - GitHub Personal Access Token (필수!)
`);
    process.exit(1);
  }
  
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN 환경변수가 필요합니다!');
    console.log('   export GITHUB_TOKEN=ghp_xxxxxxxxxxxx');
    process.exit(1);
  }
  
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'User-Agent': 'FramingUI-Outreach'
  };
  
  // Load stargazers
  const data = JSON.parse(readFileSync(inputFile, 'utf-8'));
  const { repo, stargazers } = data;
  
  console.log(`\n📧 ${repo} 이메일 추출 시작 (${stargazers.length}명)`);
  console.log(`   모드: ${skipCommits ? '프로필만' : '프로필 + 커밋'}${requireRecent ? ' + 최근 활동만' : ''}\n`);
  
  // Ensure output directory
  if (!existsSync(EMAIL_DIR)) {
    mkdirSync(EMAIL_DIR, { recursive: true });
  }
  
  const results = [];
  const seen = new Set();
  let processed = 0;
  
  for (const user of stargazers) {
    processed++;
    
    try {
      const result = await processUser(user, headers, skipCommits, requireRecent);
      
      if (result && !seen.has(result.email)) {
        seen.add(result.email);
        results.push(result);
        const qualityLabel = result.quality === 3 ? '🏢' : result.quality === 2 ? '📧' : '📬';
        console.log(`✅ [${processed}/${stargazers.length}] ${user.login}: ${result.email} ${qualityLabel} (${result.source})`);
      } else {
        process.stdout.write(`⏭️ [${processed}/${stargazers.length}] ${user.login}: no email\r`);
      }
      
      // Rate limit 보호 - 커밋 조회 시 더 느리게
      await new Promise(r => setTimeout(r, skipCommits ? 50 : 150));
      
    } catch (err) {
      console.error(`\n❌ [${processed}] ${user.login}: ${err.message}`);
    }
    
    // 중간 저장 (100명마다)
    if (processed % 100 === 0) {
      const tempFile = join(EMAIL_DIR, basename(inputFile).replace('.json', '-emails-temp.json'));
      writeFileSync(tempFile, JSON.stringify({ repo, emails: results }, null, 2));
      console.log(`\n💾 중간 저장: ${results.length}개 이메일`);
    }
  }
  
  // 최종 저장
  const outputFile = join(EMAIL_DIR, basename(inputFile).replace('.json', '-emails.json'));
  writeFileSync(outputFile, JSON.stringify({
    repo,
    extractedAt: new Date().toISOString(),
    totalStargazers: stargazers.length,
    emailsFound: results.length,
    successRate: `${((results.length / stargazers.length) * 100).toFixed(1)}%`,
    emails: results
  }, null, 2));
  
  // 품질순 정렬 (회사 도메인 우선)
  results.sort((a, b) => (b.quality || 0) - (a.quality || 0));
  
  // CSV도 저장 (이메일 도구 연동용)
  const csvFile = join(EMAIL_DIR, basename(inputFile).replace('.json', '-emails.csv'));
  const csvContent = 'email,github_username,source,profile_url,quality\n' + 
    results.map(r => `${r.email},${r.login},${r.source},${r.url},${r.quality || 1}`).join('\n');
  writeFileSync(csvFile, csvContent);
  
  // 품질별 집계
  const q3 = results.filter(r => r.quality === 3).length; // 회사
  const q2 = results.filter(r => r.quality === 2).length; // Gmail
  const q1 = results.filter(r => r.quality <= 1).length;  // 기타
  
  console.log(`\n\n📊 결과:`);
  console.log(`   총 Stargazers: ${stargazers.length}명`);
  console.log(`   이메일 추출: ${results.length}개 (${((results.length / stargazers.length) * 100).toFixed(1)}%)`);
  console.log(`   프로필 이메일: ${results.filter(r => r.source === 'profile').length}개`);
  console.log(`   커밋 이메일: ${results.filter(r => r.source === 'commit').length}개`);
  console.log(`   품질: 🏢 회사(${q3}) | 📧 Gmail(${q2}) | 📬 기타(${q1})`);
  console.log(`\n📁 저장됨:`);
  console.log(`   JSON: ${outputFile}`);
  console.log(`   CSV:  ${csvFile}`);
}

main().catch(console.error);
