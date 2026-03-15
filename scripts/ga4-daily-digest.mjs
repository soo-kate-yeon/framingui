#!/usr/bin/env node
/**
 * GA4 Daily Digest
 * 
 * 매일 21:00에 실행 — 하루 요약 리포트
 * 
 * Usage: node scripts/ga4-daily-digest.mjs
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const PROPERTY_ID = '526862691';

function findCredentials() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return process.env.GOOGLE_APPLICATION_CREDENTIALS;
  }
  const files = readdirSync(projectRoot);
  const credFile = files.find(f => f.startsWith('tekton-mkt-') && f.endsWith('.json'));
  if (credFile) return join(projectRoot, credFile);
  throw new Error('No credentials found');
}

async function getDailyDigest() {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = findCredentials();
  const client = new BetaAnalyticsDataClient();
  
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];
  
  // 오늘 vs 어제 비교
  const [todayResp] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [
      { startDate: yesterday, endDate: today },
      { startDate: twoDaysAgo, endDate: yesterday }
    ],
    metrics: [
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'bounceRate' },
      { name: 'averageSessionDuration' },
      { name: 'engagedSessions' },
    ],
  });

  // 주요 이벤트
  const [eventsResp] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate: yesterday, endDate: today }],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        inListFilter: {
          values: [
            'funnel_home_entered',
            'funnel_primary_cta_clicked',
            'template_view',
            'blog_cta_click',
            'free_trial_started',
          ]
        }
      }
    },
  });

  // 트래픽 소스
  const [sourceResp] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate: yesterday, endDate: today }],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 5,
  });

  // 출력
  console.log('📊 GA4 Daily Digest');
  console.log('━'.repeat(40));
  console.log(`📅 ${yesterday} → ${today}\n`);

  if (todayResp.rows?.[0]) {
    const curr = todayResp.rows[0].metricValues;
    const prev = todayResp.rows[0].metricValues; // 두 번째 dateRange
    
    const users = parseInt(curr[0].value);
    const sessions = parseInt(curr[1].value);
    const pv = parseInt(curr[2].value);
    const bounce = (parseFloat(curr[3].value) * 100).toFixed(1);
    const duration = Math.round(parseFloat(curr[4].value));
    const engaged = parseInt(curr[5].value);

    console.log('【기본 지표】');
    console.log(`  👤 Users: ${users}`);
    console.log(`  📈 Sessions: ${sessions}`);
    console.log(`  📄 Page Views: ${pv}`);
    console.log(`  🔄 Bounce Rate: ${bounce}%`);
    console.log(`  ⏱️ Avg Duration: ${duration}s`);
    console.log(`  ✅ Engaged: ${engaged}`);
  }

  console.log('\n【전환 이벤트】');
  const events = {};
  eventsResp.rows?.forEach(row => {
    events[row.dimensionValues[0].value] = row.metricValues[0].value;
  });
  
  const eventList = [
    ['funnel_home_entered', '🏠 홈 진입'],
    ['funnel_primary_cta_clicked', '🔘 CTA 클릭'],
    ['template_view', '👀 템플릿 조회'],
    ['blog_cta_click', '📝 블로그 CTA'],
    ['free_trial_started', '🎉 무료체험 시작'],
  ];
  
  eventList.forEach(([key, label]) => {
    const count = events[key] || 0;
    const emoji = count > 0 ? '' : '❌';
    console.log(`  ${label}: ${count}${emoji}`);
  });

  console.log('\n【트래픽 소스】');
  sourceResp.rows?.forEach(row => {
    const source = row.dimensionValues[0].value;
    const sessions = row.metricValues[0].value;
    console.log(`  • ${source}: ${sessions}`);
  });

  console.log('\n━'.repeat(40));
  console.log(`Generated: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`);
}

getDailyDigest().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
