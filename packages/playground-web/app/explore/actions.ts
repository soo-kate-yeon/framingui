'use server';

/**
 * Server Actions for Explore Page
 * 정적 템플릿 데이터를 GalleryItem 형태로 변환하여 제공
 */

import { getAllTemplates } from '../../data/templates';

interface GalleryItem {
  id: string;
  name: string;
  description: string;
  descriptionKo?: string;
  descriptionJa?: string;
  category: string;
  thumbnail?: string;
  price?: number;
}

/**
 * 템플릿 목록을 갤러리 아이템 형태로 반환
 *
 * 이전 구현: .moai/themes/generated/*.json 파일시스템에서 읽음
 * → Vercel 서버리스 환경에서 해당 디렉토리가 번들에 포함되지 않아 실패
 *
 * 현재 구현: data/templates.ts의 정적 데이터를 직접 사용
 */
export async function loadThemes(): Promise<GalleryItem[]> {
  const templates = getAllTemplates();

  return templates.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    descriptionKo: t.descriptionKo,
    descriptionJa: t.descriptionJa,
    category: 'Design System',
    thumbnail: `/screenshots/${t.id}/thumbnail.webp`,
    price: t.price,
  }));
}
