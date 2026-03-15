#!/usr/bin/env node
/**
 * GA4 Threshold Alert
 * 
 * 매 6시간 실행 — 임계값 체크 후 이상 시에만 알림
 * 정상이면 아무것도 출력 안 함 (HEARTBEAT_OK처럼)
 * 
 * Usage: node scripts/ga4-alert.mjs
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const PROPERTY_ID = '526862691';
const STATE_FILE = join(projectRoot, '.ga4-alert-state.json');

// 임계값 설정
const THRESHOLDS = {
  bounceRate: {
    warn: 0.65,   // 65% 이상이면 경고
    alert: 0.75,  // 75% 이상이면 알림
  },
  minDailySessions: 3,  // 하루 3세션 미만이면 트래픽 저조
  celebrateEvents: [
    'free_trial_started',  // 🎉 축하할 이벤트
  ],
};

function findCredentials() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return process.env.GOOGLE_APPLICATION_CREDENTIALS;
  }
  const files = readdirSync(projectRoot);
  const credFile = files.find(f => f.startsWith('tekton-mkt-') && f.endsWith('.json'));
  if (credFile) return join(projectRoot, credFile);
  throw new Error('No credentials found');
}

function loadState() {
  if (existsSync(STATE_FILE)) {
    return JSON.parse(readFileSync(STATE_FILE, 'utf-8'));
  }
  return { lastCelebratedEvents: {}, lastAlertTime: 0 };
}

function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

async function checkAlerts() {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = findCredentials();
  const client = new BetaAnalyticsDataClient();
  const state = loadState();
  const alerts = [];
  const celebrations = [];
  
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  // 1. 기본 지표 체크 (24시간)
  const [metricsResp] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate: yesterday, endDate: today }],
    metrics: [
      { name: 'sessions' },
      { name: 'bounceRate' },
      { name: 'activeUsers' },
    ],
  });

  if (metricsResp.rows?.[0]) {
    const sessions = parseInt(metricsResp.rows[0].metricValues[0].value);
    const bounceRate = parseFloat(metricsResp.rows[0].metricValues[1].value);
    const users = parseInt(metricsResp.rows[0].metricValues[2].value);

    // Bounce Rate 체크
    if (bounceRate >= THRESHOLDS.bounceRate.alert) {
      alerts.push(`🚨 Bounce Rate 매우 높음: ${(bounceRate * 100).toFixed(1)}% (임계값: ${THRESHOLDS.bounceRate.alert * 100}%)`);
    } else if (bounceRate >= THRESHOLDS.bounceRate.warn) {
      alerts.push(`⚠️ Bounce Rate 주의: ${(bounceRate * 100).toFixed(1)}%`);
    }

    // 트래픽 저조 체크
    if (sessions < THRESHOLDS.minDailySessions) {
      alerts.push(`📉 트래픽 저조: ${sessions} sessions (최소 ${THRESHOLDS.minDailySessions} 권장)`);
    }
  }

  // 2. 축하 이벤트 체크
  const [eventsResp] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate: yesterday, endDate: today }],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        inListFilter: {
          values: THRESHOLDS.celebrateEvents
        }
      }
    },
  });

  eventsResp.rows?.forEach(row => {
    const eventName = row.dimensionValues[0].value;
    const count = parseInt(row.metricValues[0].value);
    const lastCount = state.lastCelebratedEvents[eventName] || 0;
    
    if (count > lastCount) {
      const newCount = count - lastCount;
      if (eventName === 'free_trial_started') {
        celebrations.push(`🎉 무료체험 시작! +${newCount}명 (총 ${count}명)`);
      } else {
        celebrations.push(`🎊 ${eventName}: +${newCount} (총 ${count})`);
      }
      state.lastCelebratedEvents[eventName] = count;
    }
  });

  // 3. 새로운 전환 이벤트 체크
  const [conversionResp] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate: yesterday, endDate: today }],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        inListFilter: {
          values: ['funnel_primary_cta_clicked', 'template_view']
        }
      }
    },
  });

  let ctaClicks = 0;
  let templateViews = 0;
  conversionResp.rows?.forEach(row => {
    if (row.dimensionValues[0].value === 'funnel_primary_cta_clicked') {
      ctaClicks = parseInt(row.metricValues[0].value);
    }
    if (row.dimensionValues[0].value === 'template_view') {
      templateViews = parseInt(row.metricValues[0].value);
    }
  });

  // CTA → Template 전환 체크
  if (ctaClicks > 0 && templateViews === 0) {
    alerts.push(`⚠️ CTA 클릭 ${ctaClicks}회 but 템플릿 조회 0 — 퍼널 단절?`);
  }

  // 출력 (알림/축하가 있을 때만)
  if (celebrations.length > 0 || alerts.length > 0) {
    console.log('📊 GA4 Alert');
    console.log('━'.repeat(40));
    
    if (celebrations.length > 0) {
      console.log('\n【🎉 축하!】');
      celebrations.forEach(c => console.log(`  ${c}`));
    }
    
    if (alerts.length > 0) {
      console.log('\n【⚠️ 주의】');
      alerts.forEach(a => console.log(`  ${a}`));
    }
    
    console.log('\n━'.repeat(40));
    console.log(`Checked: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`);
    
    saveState(state);
  }
  // 정상이면 아무것도 출력 안 함 → 크론에서 알림 안 감
}

checkAlerts().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
