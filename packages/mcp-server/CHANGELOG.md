# Changelog

All notable changes to `@framingui/mcp-server` will be documented in this file.

## [0.6.0] - 2026-03-06

### Changed

- **아키텍처 전환**: MCP 서버가 `@framingui/core` / `@framingui/ui` 워크스페이스 패키지를 직접 import하는 대신, framingui.com API 라우트를 통해 데이터를 조회하도록 전환 (SPEC-MCP-007 Phase 2)
- `data-client.ts`에 7개 fetch 함수 추가: `fetchTemplateList`, `fetchTemplate`, `fetchComponentList`, `fetchComponent`, `fetchTokenList`, `fetchCSSVariables`, `fetchScreenExamples`
- `MemoryCache`에 `getStale()` 메서드 추가 — TTL 만료 후에도 stale 캐시를 반환하는 fallback 지원

### Removed

- `@framingui/core` production 의존성 제거
- `@framingui/ui` production 의존성 제거
- 로컬 하드코딩 데이터 파일 삭제: `component-registry.ts`, `component-props.ts`, `examples/screen-examples.ts`
- `css-generator.ts`에서 `@framingui/core` import 제거
- `core-resolver.ts`에서 `fs.readFileSync` 파일시스템 접근 제거

### Added

- API 실패 시 stale 캐시 fallback 동작 (네트워크 장애 대응)
- 76개 신규 단위/통합 테스트 추가 (cache, data-client, playground-web API 라우트)

## [0.5.6] - 2026-02-27

### Changed

- Phase 1: 테마 / 아이콘 라이브러리 데이터 소스를 framingui.com API로 전환
- `data-client.ts` 도입: `fetchTheme`, `fetchThemeList`, `fetchIconLibraries`, `fetchIconLibrary`
