#!/usr/bin/env node
/**
 * 콜드 이메일 발송 스크립트
 * 
 * 사용법:
 *   node send-emails.mjs data/emails/shadcn-ui-emails.csv --limit 10 --dry-run
 *   node send-emails.mjs data/emails/all-emails.csv --limit 100
 * 
 * 환경변수:
 *   RESEND_API_KEY - Resend API 키
 */

import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'fs';
import { dirname, join, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env 수동 로드
function loadEnv() {
  const envPath = join(__dirname, '.env');
  if (!existsSync(envPath)) return {};
  const content = readFileSync(envPath, 'utf-8');
  const env = {};
  for (const line of content.split('\n')) {
    const [key, ...val] = line.split('=');
    if (key && val.length) env[key.trim()] = val.join('=').trim();
  }
  return env;
}

const env = loadEnv();
const RESEND_API_KEY = process.env.RESEND_API_KEY || env.RESEND_API_KEY;
const SENT_LOG = join(__dirname, 'data', 'sent-log.csv');

// 이미 보낸 이메일 추적
function loadSentEmails() {
  if (!existsSync(SENT_LOG)) {
    writeFileSync(SENT_LOG, 'email,sent_at,status,message_id\n');
    return new Set();
  }
  const lines = readFileSync(SENT_LOG, 'utf-8').split('\n').slice(1);
  return new Set(lines.map(l => l.split(',')[0]).filter(Boolean));
}

// Subject lines (A/B 테스트용) - 프로모션 필터 통과 버전
const SUBJECTS = [
  "Design tokens for AI coding (no more 'make it pretty' prompts)",
  "Your design tokens + Claude/Cursor = ?"
];

// Repo별 intro hook
function getRepoIntro(repo) {
  const intros = {
    'shadcn-ui': "Love shadcn/ui — but tired of tweaking every component to match your brand?",
    'radix-ui-primitives': "Using Radix primitives? What if AI could style them consistently without you writing CSS?",
    't3-oss-create-t3-app': "Building with T3 stack? The default UI doesn't have to look like every other T3 app.",
    'chakra-ui-chakra-ui': "Chakra's great for consistency — but does your AI coding tool respect your theme tokens?"
  };
  return intros[repo] || "Building UI with AI? What if it actually understood your design system?";
}

// Repo 이름 포맷 (파일명 → 표시용)
function formatRepoName(repo) {
  const names = {
    'shadcn-ui': 'shadcn/ui',
    'radix-ui-primitives': 'radix-ui/primitives',
    't3-oss-create-t3-app': 'create-t3-app',
    'chakra-ui-chakra-ui': 'chakra-ui'
  };
  return names[repo] || repo;
}

// 이메일 본문 생성
function buildEmail(to, username, repo, subjectVariant = 0) {
  const intro = getRepoIntro(repo);
  const repoName = formatRepoName(repo);
  const firstName = username.split(/[-_]/)[0]; // first part of username
  
  // Subject line (A/B/C)
  const subject = SUBJECTS[subjectVariant % SUBJECTS.length].replace('{{repo}}', repoName);
  
  return {
    from: 'Soo <soo@framingui.com>',
    to,
    subject,
    html: `
<p>Hey ${firstName},</p>

<p>${intro}</p>

<p><strong>FramingUI</strong> is a design system that AI actually understands. Define your design tokens once, and AI (Claude, Cursor, Codex) generates production-ready UI that matches your brand.</p>

<p>Quick demo: <a href="https://framingui.com?utm_source=cold&utm_medium=email&utm_campaign=github">framingui.com</a></p>

<p>Try it now:</p>
<pre style="background:#f4f4f4;padding:12px;border-radius:6px;font-family:monospace;">npx -y @framingui/mcp-server@latest init</pre>

<p><strong>Why devs are switching:</strong></p>
<ul>
  <li>Works with Claude Code, Cursor, Windsurf, Codex</li>
  <li>Your tokens, your brand — not generic defaults</li>
  <li>100 free tool units/month — enough to build real stuff</li>
</ul>

<p>Built this because I was tired of AI giving me generic-looking output when I wanted something custom.</p>

<p>Worth 2 minutes if you're shipping UI with AI.</p>

<p>— Soo<br/>
Founder, FramingUI</p>

<p><em>P.S. Reply "beta" and I'll send you 20+ essential screen template prompts — landing pages, dashboards, settings, auth flows, etc.</em></p>

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
<p style="color:#999;font-size:12px;">Don't want emails from FramingUI? Reply "unsubscribe" and I'll remove you immediately.</p>
    `.trim()
  };
}

// 이메일 발송
async function sendEmail(emailData) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailData)
  });
  
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.message || `HTTP ${res.status}`);
  }
  
  return data;
}

async function main() {
  const args = process.argv.slice(2);
  const inputFile = args.find(a => a.endsWith('.csv'));
  const limitIdx = args.indexOf('--limit');
  const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1]) : 10;
  const dryRun = args.includes('--dry-run');
  const delayMs = 1000; // 1초 간격 (rate limit 보호)
  
  if (!inputFile) {
    console.log(`
사용법: node send-emails.mjs <emails.csv> [--limit N] [--dry-run]

예시:
  node send-emails.mjs data/emails/shadcn-ui-emails.csv --limit 10 --dry-run
  node send-emails.mjs data/emails/all-emails.csv --limit 100

옵션:
  --limit N   최대 발송 수 (기본: 10)
  --dry-run   실제 발송 안 함, 미리보기만
`);
    process.exit(1);
  }
  
  if (!RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY 필요! .env 파일 확인');
    process.exit(1);
  }
  
  // CSV 로드
  const lines = readFileSync(inputFile, 'utf-8').split('\n').slice(1);
  const leads = lines
    .filter(l => l.trim())
    .map(l => {
      const parts = l.split(',');
      // 5컬럼 (repo 포함) 또는 4컬럼 (repo 없음)
      const [email, username, source, url, repo] = parts;
      return { email, username, source, url, repo: repo || basename(inputFile).replace('-emails.csv', '') };
    });
  
  // 이미 보낸 이메일 필터링
  const sentEmails = loadSentEmails();
  const toSend = leads.filter(l => !sentEmails.has(l.email)).slice(0, limit);
  
  // Repo별 집계
  const repoCount = {};
  toSend.forEach(l => { repoCount[l.repo] = (repoCount[l.repo] || 0) + 1; });
  
  console.log(`\n📧 이메일 발송 ${dryRun ? '(DRY RUN)' : ''}`);
  console.log(`   파일: ${inputFile}`);
  console.log(`   대상: ${toSend.length}명 (전체 ${leads.length}명 중 ${sentEmails.size}명 이미 발송)`);
  console.log(`   Repo별: ${Object.entries(repoCount).map(([r,c]) => `${r}(${c})`).join(', ')}`);
  console.log(`   Limit: ${limit}\n`);
  
  if (toSend.length === 0) {
    console.log('✅ 발송할 이메일 없음 (모두 발송 완료)');
    return;
  }
  
  let sent = 0;
  let failed = 0;
  
  let emailIndex = 0;
  for (const lead of toSend) {
    // A/B/C 테스트: 순서대로 돌아가며 subject 적용
    const subjectVariant = emailIndex % 3;
    const emailData = buildEmail(lead.email, lead.username, lead.repo, subjectVariant);
    emailIndex++;
    
    if (dryRun) {
      const variant = ['A', 'B'][subjectVariant % 2];
      console.log(`📝 [DRY-${variant}] ${lead.email}`);
      console.log(`   Subject: "${emailData.subject}"`);
      console.log(`   Intro: "${getRepoIntro(lead.repo).slice(0, 50)}..."\n`);
      continue;
    }
    
    try {
      const result = await sendEmail(emailData);
      sent++;
      
      // 로그 기록
      appendFileSync(SENT_LOG, `${lead.email},${new Date().toISOString()},sent,${result.id}\n`);
      
      console.log(`✅ [${sent}/${toSend.length}] ${lead.email}`);
      
      // Rate limit 보호
      await new Promise(r => setTimeout(r, delayMs));
      
    } catch (err) {
      failed++;
      appendFileSync(SENT_LOG, `${lead.email},${new Date().toISOString()},failed,${err.message}\n`);
      console.error(`❌ ${lead.email}: ${err.message}`);
    }
  }
  
  console.log(`\n📊 결과:`);
  console.log(`   발송: ${sent}개`);
  console.log(`   실패: ${failed}개`);
  console.log(`   로그: ${SENT_LOG}`);
}

main().catch(console.error);
