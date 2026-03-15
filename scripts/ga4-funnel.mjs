#!/usr/bin/env node
/**
 * GA4 Funnel Report
 * 
 * 퍼널: 진입 → 스크롤 → 템플릿 조회 → CTA 클릭
 * 
 * Usage: node scripts/ga4-funnel.mjs
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

async function getFunnelReport() {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = findCredentials();
  const client = new BetaAnalyticsDataClient();
  
  const period = process.argv[2] || '7daysAgo';
  const today = new Date().toISOString().split('T')[0];
  
  console.log('🎯 전환 퍼널 리포트');
  console.log('━'.repeat(50));
  console.log(`📅 기간: ${period} → ${today}\n`);

  // 퍼널 이벤트 조회
  const [eventsResp] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate: period, endDate: today }],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        inListFilter: {
          values: [
            'session_start',
            'funnel_home_entered',
            'scroll',
            'template_view',
            'funnel_primary_cta_clicked',
            'free_trial_started',
          ]
        }
      }
    },
  });

  const events = {};
  const users = {};
  eventsResp.rows?.forEach(row => {
    events[row.dimensionValues[0].value] = parseInt(row.metricValues[0].value);
    users[row.dimensionValues[0].value] = parseInt(row.metricValues[1].value);
  });

  const sessionStart = events['session_start'] || 0;
  const homeEntered = events['funnel_home_entered'] || 0;
  const scroll = events['scroll'] || 0;
  const templateView = events['template_view'] || 0;
  const ctaClicked = events['funnel_primary_cta_clicked'] || 0;
  const trialStarted = events['free_trial_started'] || 0;

  // 퍼널 시각화
  console.log('【퍼널 흐름】\n');
  
  const stages = [
    { name: '1️⃣  세션 시작', count: sessionStart, users: users['session_start'] || 0 },
    { name: '2️⃣  홈 진입', count: homeEntered, users: users['funnel_home_entered'] || 0 },
    { name: '3️⃣  스크롤', count: scroll, users: users['scroll'] || 0 },
    { name: '4️⃣  템플릿 조회', count: templateView, users: users['template_view'] || 0 },
    { name: '5️⃣  CTA 클릭', count: ctaClicked, users: users['funnel_primary_cta_clicked'] || 0 },
    { name: '6️⃣  무료체험', count: trialStarted, users: users['free_trial_started'] || 0 },
  ];

  const maxCount = Math.max(...stages.map(s => s.count));
  
  stages.forEach((stage, i) => {
    const barLength = maxCount > 0 ? Math.round((stage.count / maxCount) * 30) : 0;
    const bar = '█'.repeat(barLength) + '░'.repeat(30 - barLength);
    
    let dropRate = '';
    if (i > 0 && stages[i-1].count > 0) {
      const rate = ((stage.count / stages[i-1].count) * 100).toFixed(0);
      const drop = (100 - parseFloat(rate)).toFixed(0);
      dropRate = ` (${drop}% 이탈)`;
    }
    
    console.log(`${stage.name}`);
    console.log(`  ${bar} ${stage.count}${dropRate}`);
    console.log('');
  });

  // 전환율 요약
  console.log('━'.repeat(50));
  console.log('【전환율 요약】\n');
  
  const homeToScrollRate = homeEntered > 0 ? ((scroll / homeEntered) * 100).toFixed(1) : 0;
  const scrollToTemplateRate = scroll > 0 ? ((templateView / scroll) * 100).toFixed(1) : 0;
  const templateToCtaRate = templateView > 0 ? ((ctaClicked / templateView) * 100).toFixed(1) : 0;
  const ctaToTrialRate = ctaClicked > 0 ? ((trialStarted / ctaClicked) * 100).toFixed(1) : 0;
  const overallRate = sessionStart > 0 ? ((trialStarted / sessionStart) * 100).toFixed(2) : 0;

  console.log(`  홈 → 스크롤:       ${homeToScrollRate}%`);
  console.log(`  스크롤 → 템플릿:   ${scrollToTemplateRate}%`);
  console.log(`  템플릿 → CTA:      ${templateToCtaRate}%`);
  console.log(`  CTA → 무료체험:    ${ctaToTrialRate}%`);
  console.log(`  ────────────────────`);
  console.log(`  전체 전환율:       ${overallRate}%`);

  // 병목 진단
  console.log('\n【🔴 병목 진단】\n');
  
  const rates = [
    { name: '홈 → 스크롤', rate: parseFloat(homeToScrollRate), threshold: 50 },
    { name: '스크롤 → 템플릿', rate: parseFloat(scrollToTemplateRate), threshold: 30 },
    { name: '템플릿 → CTA', rate: parseFloat(templateToCtaRate), threshold: 10 },
    { name: 'CTA → 무료체험', rate: parseFloat(ctaToTrialRate), threshold: 20 },
  ];

  rates.forEach(r => {
    if (r.rate < r.threshold) {
      console.log(`  🔴 ${r.name}: ${r.rate}% (목표: ${r.threshold}%)`);
    } else {
      console.log(`  ✅ ${r.name}: ${r.rate}%`);
    }
  });

  console.log('\n━'.repeat(50));
  console.log(`Generated: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`);
}

getFunnelReport().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
