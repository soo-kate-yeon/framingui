/**
 * 헤딩 텍스트를 anchor id로 변환합니다.
 * - 한/영/일 포함 유니코드 문자 유지
 * - 특수문자 제거, 공백은 하이픈으로 정규화
 */
export function slugifyHeading(text: string): string {
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * 문서 단위로 고유한 헤딩 id를 생성하는 팩토리
 * - 같은 제목이 반복되면 `-2`, `-3` 접미사를 붙입니다.
 * - 제목이 비면 `section`을 기본값으로 사용합니다.
 */
export function createHeadingIdFactory() {
  const seen = new Map<string, number>();

  return (text: string): string => {
    const base = slugifyHeading(text) || 'section';
    const next = (seen.get(base) ?? 0) + 1;
    seen.set(base, next);
    return next === 1 ? base : `${base}-${next}`;
  };
}
