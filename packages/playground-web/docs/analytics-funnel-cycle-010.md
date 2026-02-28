# Cycle-010 Analytics: Funnel + UTM

## 1) PostHog Funnel Event Naming

아래 이벤트를 순서대로 퍼널에 추가하면 됩니다.

1. `funnel_home_entered`
2. `funnel_docs_or_explore_entered`
3. `funnel_primary_cta_clicked`
4. `funnel_free_trial_started`

## 2) 이벤트별 핵심 속성

- 공통 자동 속성
  - `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
  - `first_utm_*` (사용자 first-touch, localStorage 기준)
  - `session_utm_*` (세션 first-touch, sessionStorage 기준)
  - `inflow_channel` (`llms` | `mcp` | `x` | `other`)

- `funnel_docs_or_explore_entered`
  - `section`: `docs` | `explore`
  - `path`

- `funnel_primary_cta_clicked`
  - `cta_id`
  - `cta_label`
  - `location`
  - `destination`
  - `cta_variant`: `primary` | `secondary` | `beta` | `free-start`

- `funnel_free_trial_started`
  - `entry_point`
  - `is_authenticated`

## 3) UTM 저장/전달 규칙

- 현재 URL의 UTM은 이벤트마다 자동 전달됩니다.
- first-touch UTM은 사용자 단위(`localStorage`)로 최초 1회 저장됩니다.
- 세션 first-touch UTM은 세션 단위(`sessionStorage`)로 최초 1회 저장됩니다.
- PostHog super property로도 등록되어 후속 이벤트 분석에 재사용됩니다.

## 4) llms/mcp/x 유입 링크 생성 (최소 구현)

`packages/playground-web/lib/utm.ts`의 `buildInflowUtmLink()`를 사용합니다.

```ts
import { buildInflowUtmLink } from '@/lib/utm';

const llmsLink = buildInflowUtmLink('/explore', 'llms');
const mcpLink = buildInflowUtmLink('/docs/mcp', 'mcp', { utm_content: 'guide-link' });
const xLink = buildInflowUtmLink('https://framingui.com/', 'x', { utm_campaign: 'launch' });
```

## 5) 권장 PostHog Breakdown

- `inflow_channel`
- `utm_source`
- `first_utm_source`
- `cta_id`
- `location`
