#!/usr/bin/env node
/**
 * GitHub Stargazers 추출 스크립트
 * 
 * 사용법:
 *   node extract-stargazers.mjs shadcn/ui --limit 500
 *   node extract-stargazers.mjs shadcn/ui radix-ui/primitives --limit 200
 * 
 * 환경변수:
 *   GITHUB_TOKEN - GitHub Personal Access Token (rate limit 증가)
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data', 'stargazers');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchStargazers(repo, limit = 500) {
  const [owner, name] = repo.split('/');
  const perPage = 100;
  const pages = Math.ceil(limit / perPage);
  const stargazers = [];
  
  console.log(`\n📦 ${repo} stargazers 추출 중... (limit: ${limit})`);
  
  for (let page = 1; page <= pages && stargazers.length < limit; page++) {
    const url = `https://api.github.com/repos/${owner}/${name}/stargazers?per_page=${perPage}&page=${page}`;
    
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'FramingUI-Outreach'
    };
    
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }
    
    try {
      const res = await fetch(url, { headers });
      
      if (!res.ok) {
        if (res.status === 403) {
          const remaining = res.headers.get('x-ratelimit-remaining');
          const reset = res.headers.get('x-ratelimit-reset');
          console.error(`⚠️ Rate limit! Remaining: ${remaining}, Reset: ${new Date(reset * 1000).toLocaleString()}`);
          break;
        }
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      
      if (data.length === 0) break;
      
      stargazers.push(...data.map(u => ({
        login: u.login,
        id: u.id,
        url: u.html_url,
        avatar: u.avatar_url
      })));
      
      // Rate limit 표시
      const remaining = res.headers.get('x-ratelimit-remaining');
      console.log(`  Page ${page}: +${data.length} users (API remaining: ${remaining})`);
      
      // Rate limit 보호
      await new Promise(r => setTimeout(r, 100));
      
    } catch (err) {
      console.error(`❌ Error on page ${page}:`, err.message);
      break;
    }
  }
  
  return stargazers.slice(0, limit);
}

async function main() {
  const args = process.argv.slice(2);
  
  // Parse arguments
  const limitIdx = args.indexOf('--limit');
  const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1]) : 500;
  const repos = args.filter(a => !a.startsWith('--') && a.includes('/'));
  
  if (repos.length === 0) {
    console.log(`
사용법: node extract-stargazers.mjs <owner/repo> [--limit N]

예시:
  node extract-stargazers.mjs shadcn/ui --limit 500
  node extract-stargazers.mjs shadcn/ui radix-ui/primitives --limit 200

환경변수:
  GITHUB_TOKEN - GitHub Personal Access Token (rate limit 5000/hour)
`);
    process.exit(1);
  }
  
  // Ensure data directory exists
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  
  const allResults = {};
  
  for (const repo of repos) {
    const stargazers = await fetchStargazers(repo, limit);
    const filename = repo.replace('/', '-') + '.json';
    const filepath = join(DATA_DIR, filename);
    
    writeFileSync(filepath, JSON.stringify({
      repo,
      extractedAt: new Date().toISOString(),
      count: stargazers.length,
      stargazers
    }, null, 2));
    
    console.log(`✅ ${repo}: ${stargazers.length}명 저장 → ${filepath}`);
    allResults[repo] = stargazers.length;
  }
  
  console.log('\n📊 결과 요약:');
  for (const [repo, count] of Object.entries(allResults)) {
    console.log(`  ${repo}: ${count}명`);
  }
  console.log(`\n다음 단계: node extract-emails.mjs data/stargazers/<filename>.json`);
}

main().catch(console.error);
