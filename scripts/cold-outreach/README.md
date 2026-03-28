# Cold Outreach System

GitHub Stargazers → Email 콜드 아웃리치 자동화

## 타겟 레포지토리

### Tier 1: 직접 경쟁/대체재 (최우선)

- `shadcn/ui` - 가장 가까운 경쟁자, "디자인 시스템 없이 컴포넌트만" 쓰는 사람들
- `radix-ui/primitives` - Headless UI, 스타일링 필요한 사람들
- `chakra-ui/chakra-ui` - 디자인 시스템 유저
- `mantinedev/mantine` - React 디자인 시스템

### Tier 2: AI 코딩 도구 사용자

- `getcursor/cursor` - AI 코딩 유저 (있으면)
- `vercel/ai` - AI SDK 사용자
- `langchain-ai/langchain` - AI 앱 빌더

### Tier 3: 솔로 개발자/인디해커 시그널

- `t3-oss/create-t3-app` - 풀스택 템플릿 사용자
- `steven-tey/dub` - 인디해커 오픈소스
- `calcom/cal.com` - 인디 SaaS 참고하는 사람들

## 이메일 추출 방법

1. **공개 이메일**: GitHub 프로필에 공개한 이메일
2. **커밋 이메일**: 공개 커밋에서 추출 (더 높은 수집률)

## 파일 구조

```
cold-outreach/
├── README.md
├── extract-stargazers.mjs  # Stargazer 목록 추출
├── extract-emails.mjs      # 이메일 추출 (프로필 + 커밋)
├── send-emails.mjs         # 이메일 발송 (TODO)
├── templates/              # 이메일 템플릿
│   └── intro.md
└── data/                   # 추출된 데이터
    ├── stargazers/
    └── emails/
```

## 사용법

```bash
# 1. Stargazers 추출
node scripts/cold-outreach/extract-stargazers.mjs shadcn/ui --limit 500

# 2. 이메일 추출
node scripts/cold-outreach/extract-emails.mjs data/stargazers/shadcn-ui.json

# 3. (수동) 이메일 발송 또는 Mailchimp/Loops 연동
```

## 주의사항

- GitHub API Rate Limit: 인증 시 5,000 req/hour
- 이메일 발송: CAN-SPAM 준수 (opt-out 링크 필수)
- 하루 100명 목표, 너무 빠르면 스팸 필터 걸림
