/**
 * Template Documentation Data
 */

export interface ColorToken {
  name: string;
  hex: string;
  usage: string;
}

export interface TypographyToken {
  name: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing?: string;
  usage: string;
}

export interface DesignDetail {
  title: string;
  description: string;
}

export interface TemplateDocsData {
  id: string;
  name: string;
  philosophy: {
    tagline: string;
    description: string;
    principles: string[];
  };
  colorTokens: ColorToken[];
  typographyTokens: TypographyToken[];
  designDetails: DesignDetail[];
  tocSections: { id: string; title: string }[];
}

const tocSections = [
  { id: "philosophy", title: "Design Philosophy" },
  { id: "color-tokens", title: "Color Tokens" },
  { id: "typography-tokens", title: "Typography Tokens" },
  { id: "design-details", title: "Design Details" }
];

export const TEMPLATE_DOCS: Record<string, TemplateDocsData> = {
  "square-minimalism": {
    id: "square-minimalism",
    name: "Square Minimalism",
    philosophy: {
      tagline: "모서리를 없애면 본질이 드러난다",
      description: "Square Minimalism은 모든 요소에서 둥근 모서리를 완전히 제거하고, 타이포그래피와 여백을 통해 구조를 표현하는 디자인 시스템입니다.",
      principles: [
        "Radius 0 - 모든 컴포넌트에서 둥근 모서리 제거",
        "Whitespace as Divider - 구분선 대신 여백으로 섹션 구분",
        "Typography as Graphic - 타이포그래피를 그래픽 요소로 활용",
        "High Contrast - 명확한 흑백 대비로 가독성 극대화"
      ]
    },
    colorTokens: [
      { name: "Neutral 900", hex: "#171717", usage: "Primary text, backgrounds" },
      { name: "Neutral 100", hex: "#F5F5F5", usage: "Secondary backgrounds" },
      { name: "White", hex: "#FFFFFF", usage: "Canvas" },
      { name: "Neutral 200", hex: "#E5E5E5", usage: "Borders" }
    ],
    typographyTokens: [
      { name: "Hero Title", fontSize: "60px", fontWeight: "700", lineHeight: "1.1", letterSpacing: "-0.02em", usage: "Main titles" },
      { name: "Section Heading", fontSize: "36px", fontWeight: "700", lineHeight: "1.2", usage: "Section titles" },
      { name: "Eyebrow Label", fontSize: "12px", fontWeight: "700", lineHeight: "1", letterSpacing: "0.15em", usage: "Labels (uppercase)" },
      { name: "Body Text", fontSize: "16px", fontWeight: "400", lineHeight: "1.6", usage: "Paragraph text" }
    ],
    designDetails: [
      { title: "완벽한 정렬", description: "모든 요소는 8px 그리드에 맞춰 정렬됩니다." },
      { title: "선택적 투명도", description: "Glass morphism 효과를 사용할 때는 80% 불투명도와 backdrop-blur를 적용합니다." },
      { title: "대문자 강조", description: "중요한 레이블과 버튼은 uppercase + wide tracking으로 강조합니다." }
    ],
    tocSections
  },
  "equinox-fitness": {
    id: "equinox-fitness",
    name: "Equinox Fitness",
    philosophy: {
      tagline: "에너지를 시각화하다",
      description: "Equinox Fitness는 운동의 역동성과 에너지를 시각 언어로 표현한 디자인 시스템입니다.",
      principles: [
        "Bold Colors - 높은 채도의 컬러로 에너지 표현",
        "Dynamic Gradients - 움직임을 암시하는 그래디언트",
        "Strong Typography - 굵은 폰트로 강렬한 메시지",
        "Motivational Tone - 동기를 부여하는 디자인"
      ]
    },
    colorTokens: [
      { name: "Energy Orange", hex: "#FF5722", usage: "Primary CTA" },
      { name: "Deep Purple", hex: "#673AB7", usage: "Headers" },
      { name: "Vibrant Blue", hex: "#2196F3", usage: "Links" },
      { name: "Dark Charcoal", hex: "#212121", usage: "Text" }
    ],
    typographyTokens: [
      { name: "Display Bold", fontSize: "72px", fontWeight: "900", lineHeight: "1", letterSpacing: "-0.03em", usage: "Hero headlines" },
      { name: "Title Heavy", fontSize: "48px", fontWeight: "800", lineHeight: "1.1", usage: "Section titles" },
      { name: "Body Regular", fontSize: "18px", fontWeight: "400", lineHeight: "1.6", usage: "Paragraph text" }
    ],
    designDetails: [
      { title: "에너지 그래디언트", description: "45도 각도의 그래디언트로 역동성 표현" },
      { title: "모션 힌트", description: "Hover 시 scale(1.02) + shadow로 폭발적 에너지 연상" },
      { title: "둥근 모서리", description: "12px 반경으로 친근하고 현대적인 느낌" }
    ],
    tocSections
  },
  "round-minimal": {
    id: "round-minimal",
    name: "Round Minimal",
    philosophy: {
      tagline: "부드러움 속의 명료함",
      description: "Round Minimal은 부드러운 곡선과 온화한 컬러로 친근하면서도 전문적인 인상을 전달합니다.",
      principles: [
        "Soft Corners - 16px+ 부드러운 모서리",
        "Gentle Colors - 낮은 채도의 온화한 팔레트",
        "Ample Spacing - 충분한 여백",
        "Approachable Design - 친근하고 접근하기 쉬운 UI"
      ]
    },
    colorTokens: [
      { name: "Soft Blue", hex: "#6B9BD1", usage: "Primary actions" },
      { name: "Warm Gray", hex: "#9CA3AF", usage: "Secondary text" },
      { name: "Light Beige", hex: "#F9F7F3", usage: "Backgrounds" },
      { name: "Deep Navy", hex: "#1E3A5F", usage: "Headers" }
    ],
    typographyTokens: [
      { name: "Heading Soft", fontSize: "48px", fontWeight: "600", lineHeight: "1.2", usage: "Page titles" },
      { name: "Subheading", fontSize: "32px", fontWeight: "500", lineHeight: "1.3", usage: "Section headings" },
      { name: "Body Medium", fontSize: "16px", fontWeight: "400", lineHeight: "1.7", usage: "Paragraph text" }
    ],
    designDetails: [
      { title: "일관된 반경", description: "카드 16px, 버튼 24px, 모달 20px 반경" },
      { title: "부드러운 그림자", description: "Soft blur (20px+), 불투명도 5-10%" },
      { title: "여백 시스템", description: "섹션 간격 80px, 카드 내부 32px" }
    ],
    tocSections
  },
  "classic-magazine": {
    id: "classic-magazine",
    name: "Classic Magazine",
    philosophy: {
      tagline: "전통적 편집 디자인의 재해석",
      description: "Classic Magazine은 인쇄 매체의 우아한 레이아웃과 타이포그래피를 웹으로 가져온 디자인 시스템입니다.",
      principles: [
        "Editorial Layout - 잡지 스타일 다단 레이아웃",
        "Serif Typography - 우아한 Serif 폰트",
        "Hierarchy First - 명확한 시각적 위계",
        "Content Focus - 콘텐츠가 주인공"
      ]
    },
    colorTokens: [
      { name: "Classic Black", hex: "#1A1A1A", usage: "Body text" },
      { name: "Warm White", hex: "#FFFEF7", usage: "Page background" },
      { name: "Accent Gold", hex: "#B8860B", usage: "Highlights" },
      { name: "Muted Gray", hex: "#6B6B6B", usage: "Captions" }
    ],
    typographyTokens: [
      { name: "Display Serif", fontSize: "64px", fontWeight: "700", lineHeight: "1.1", usage: "Article titles" },
      { name: "Heading Serif", fontSize: "40px", fontWeight: "600", lineHeight: "1.2", usage: "Section headings" },
      { name: "Body Serif", fontSize: "18px", fontWeight: "400", lineHeight: "1.8", usage: "Article body" }
    ],
    designDetails: [
      { title: "컬럼 시스템", description: "12컬럼 그리드, 본문은 8컬럼(66% 너비)" },
      { title: "Drop Cap", description: "아티클 시작에 3-4줄 높이 Drop Cap" },
      { title: "황금 비율", description: "이미지와 텍스트 비율에 1:1.618 적용" }
    ],
    tocSections
  },
  "neutral-humanism": {
    id: "neutral-humanism",
    name: "Neutral Humanism",
    philosophy: {
      tagline: "사람을 위한 디자인",
      description: "Neutral Humanism은 접근성과 포용성을 최우선으로 하는 디자인 시스템입니다.",
      principles: [
        "Accessibility First - WCAG AAA 준수",
        "Neutral Palette - 피로감 없는 중립 컬러",
        "Clear Communication - 명확하고 직관적인 UI",
        "Inclusive Design - 다양한 사용자 환경 지원"
      ]
    },
    colorTokens: [
      { name: "Neutral 800", hex: "#262626", usage: "Primary text (AAA)" },
      { name: "Neutral 600", hex: "#525252", usage: "Secondary text" },
      { name: "White", hex: "#FFFFFF", usage: "Canvas" },
      { name: "Blue A11y", hex: "#0066CC", usage: "Links (WCAG AAA)" }
    ],
    typographyTokens: [
      { name: "Heading Clear", fontSize: "48px", fontWeight: "600", lineHeight: "1.2", usage: "Page titles" },
      { name: "Subheading", fontSize: "32px", fontWeight: "500", lineHeight: "1.3", usage: "Section headings" },
      { name: "Body Readable", fontSize: "18px", fontWeight: "400", lineHeight: "1.75", usage: "Paragraph (larger)" }
    ],
    designDetails: [
      { title: "대비 최적화", description: "모든 텍스트 7:1 이상 대비 (WCAG AAA)" },
      { title: "Focus Indicators", description: "2px solid, high contrast 포커스 링" },
      { title: "충분한 타겟 크기", description: "모든 터치 타겟 최소 44x44px" }
    ],
    tocSections
  },
  "minimal-workspace": {
    id: "minimal-workspace",
    name: "Minimal Workspace",
    philosophy: {
      tagline: "집중을 위한 공간",
      description: "Minimal Workspace는 생산성과 집중력을 극대화하기 위해 불필요한 요소를 철저히 배제한 디자인 시스템입니다.",
      principles: [
        "Distraction-Free - 방해 요소 최소화",
        "Function Over Form - 기능성 우선",
        "Monochrome Base - 흑백 기반 팔레트",
        "Efficiency Focus - 빠른 작업 흐름"
      ]
    },
    colorTokens: [
      { name: "Pure Black", hex: "#000000", usage: "Text, UI" },
      { name: "Pure White", hex: "#FFFFFF", usage: "Background" },
      { name: "Gray 200", hex: "#E5E5E5", usage: "Dividers" },
      { name: "Gray 500", hex: "#737373", usage: "Muted text" }
    ],
    typographyTokens: [
      { name: "Mono Title", fontSize: "32px", fontWeight: "500", lineHeight: "1.2", usage: "Page titles (monospace)" },
      { name: "Sans Heading", fontSize: "24px", fontWeight: "500", lineHeight: "1.3", usage: "Section headings" },
      { name: "Body Mono", fontSize: "14px", fontWeight: "400", lineHeight: "1.6", usage: "Code, data" }
    ],
    designDetails: [
      { title: "모노스페이스 활용", description: "제목과 데이터에 monospace 폰트" },
      { title: "최소 장식", description: "그림자, 그래디언트, 애니메이션 배제" },
      { title: "압축된 레이아웃", description: "여백 최소화로 정보 밀도 향상" }
    ],
    tocSections
  }
};

export function getTemplateDocsData(id: string): TemplateDocsData | null {
  return TEMPLATE_DOCS[id] || null;
}
