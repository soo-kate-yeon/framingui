/**
 * Template Database Operations
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * [TAG-AUTH-001-U003] 사용자 데이터는 PostgreSQL 데이터베이스에 저장되어야 한다
 *
 * WHY: 무료 템플릿 목록 관리 및 조회
 * IMPACT: 사용자에게 무료로 제공할 템플릿 식별
 */

import { createClient } from '@/lib/supabase/server';
import type { FreeScreenTemplate, DatabaseError } from './types';
import { toDatabaseError } from './error';

/**
 * 모든 무료 템플릿 조회
 *
 * @returns 무료 템플릿 목록
 * @throws DatabaseError 데이터베이스 작업 실패 시
 *
 * @example
 * ```typescript
 * const freeTemplates = await getFreeTemplates();
 * console.log(`Available free templates: ${freeTemplates.length}`);
 * freeTemplates.forEach(t => console.log(`- ${t.name}`));
 * ```
 */
export async function getFreeTemplates(): Promise<FreeScreenTemplate[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('free_screen_templates')
      .select('*')
      .eq('is_free', true)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Failed to get free templates:', error.message);
      throw toDatabaseError('Failed to get free templates', error.message, error.code);
    }

    return (data as FreeScreenTemplate[]) ?? [];
  } catch (error) {
    if ((error as DatabaseError).code !== undefined) {
      throw error;
    }

    console.error('Unexpected error getting free templates:', error);
    const details = error instanceof Error ? error.message : 'Unknown error';
    throw toDatabaseError('Unexpected error getting free templates', details);
  }
}

/**
 * template_id로 템플릿 조회
 *
 * @param templateId 템플릿 ID (예: 'landing-basic')
 * @returns 템플릿 정보 또는 null
 * @throws DatabaseError 데이터베이스 작업 실패 시
 *
 * @example
 * ```typescript
 * const template = await getTemplateById('landing-basic');
 * if (template) {
 *   console.log(`Template: ${template.name}`);
 *   console.log(`Description: ${template.description}`);
 * }
 * ```
 */
export async function getTemplateById(
  templateId: string
): Promise<FreeScreenTemplate | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('free_screen_templates')
      .select('*')
      .eq('template_id', templateId)
      .single();

    if (error) {
      // Not found는 정상 케이스
      if (error.code === 'PGRST116') {
        return null;
      }

      console.error('Failed to get template by ID:', error.message);
      throw toDatabaseError('Failed to get template by ID', error.message, error.code);
    }

    return data as FreeScreenTemplate;
  } catch (error) {
    if ((error as DatabaseError).code !== undefined) {
      throw error;
    }

    console.error('Unexpected error getting template:', error);
    const details = error instanceof Error ? error.message : 'Unknown error';
    throw toDatabaseError('Unexpected error getting template', details);
  }
}

/**
 * 템플릿이 무료인지 확인
 *
 * @param templateId 템플릿 ID (예: 'landing-basic')
 * @returns 무료 템플릿 여부
 *
 * @example
 * ```typescript
 * const isFree = await isFreeTemplate('landing-basic');
 * if (isFree) {
 *   // 라이선스 없이 접근 허용
 * } else {
 *   // 라이선스 확인 필요
 * }
 * ```
 */
export async function isFreeTemplate(templateId: string): Promise<boolean> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('free_screen_templates')
      .select('is_free')
      .eq('template_id', templateId)
      .eq('is_free', true)
      .single();

    if (error) {
      // Not found는 정상 케이스 (무료 템플릿이 아님)
      if (error.code === 'PGRST116') {
        return false;
      }

      console.error('Failed to check if template is free:', error.message);
      return false;
    }

    return data?.is_free === true;
  } catch (error) {
    console.error('Unexpected error checking template:', error);
    return false;
  }
}

/**
 * 여러 템플릿의 무료 여부 일괄 확인
 *
 * @param templateIds 확인할 템플릿 ID 목록
 * @returns 템플릿 ID와 무료 여부 매핑
 *
 * @example
 * ```typescript
 * const freeStatus = await checkMultipleTemplates([
 *   'landing-basic',
 *   'premium-dashboard',
 *   'signup'
 * ]);
 *
 * console.log(freeStatus);
 * // { 'landing-basic': true, 'premium-dashboard': false, 'signup': true }
 * ```
 */
export async function checkMultipleTemplates(
  templateIds: string[]
): Promise<Record<string, boolean>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('free_screen_templates')
      .select('template_id, is_free')
      .in('template_id', templateIds);

    if (error) {
      console.error('Failed to check multiple templates:', error.message);
      // 에러 발생 시 모두 무료가 아닌 것으로 간주
      return templateIds.reduce(
        (acc, id) => {
          acc[id] = false;
          return acc;
        },
        {} as Record<string, boolean>
      );
    }

    // 결과를 Record로 변환
    const result: Record<string, boolean> = {};

    // 조회된 템플릿은 데이터베이스 값 사용
    data?.forEach((template) => {
      result[template.template_id] = template.is_free;
    });

    // 조회되지 않은 템플릿은 false로 설정
    templateIds.forEach((id) => {
      if (!(id in result)) {
        result[id] = false;
      }
    });

    return result;
  } catch (error) {
    console.error('Unexpected error checking multiple templates:', error);
    // 에러 발생 시 모두 무료가 아닌 것으로 간주
    return templateIds.reduce(
      (acc, id) => {
        acc[id] = false;
        return acc;
      },
      {} as Record<string, boolean>
    );
  }
}

/**
 * 템플릿 접근 권한 확인 (무료 또는 라이선스 보유)
 *
 * @param userId 사용자 ID (UUID)
 * @param templateId 템플릿 ID
 * @returns 접근 가능 여부
 *
 * @example
 * ```typescript
 * const canAccess = await canAccessTemplate(userId, 'premium-dashboard');
 * if (!canAccess) {
 *   // 결제 페이지로 리다이렉트
 *   redirect('/pricing?template=premium-dashboard');
 * }
 * ```
 */
export async function canAccessTemplate(
  userId: string,
  templateId: string
): Promise<boolean> {
  try {
    // 1. 무료 템플릿 확인
    const isFree = await isFreeTemplate(templateId);
    if (isFree) {
      return true;
    }

    // 2. 라이선스 확인
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('user_licenses')
      .select('id, is_active, expires_at')
      .eq('user_id', userId)
      .eq('theme_id', templateId)
      .eq('is_active', true)
      .single();

    if (error) {
      // Not found는 정상 케이스 (라이선스 없음)
      if (error.code === 'PGRST116') {
        return false;
      }

      console.error('Failed to check license:', error.message);
      return false;
    }

    if (!data) {
      return false;
    }

    // 3. 만료일 확인
    if (data.expires_at) {
      const expiresAt = new Date(data.expires_at);
      const now = new Date();

      if (expiresAt < now) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Unexpected error checking template access:', error);
    return false;
  }
}

/**
 * 무료 템플릿 개수 조회
 *
 * @returns 무료 템플릿 개수
 *
 * @example
 * ```typescript
 * const count = await getFreeTemplateCount();
 * console.log(`We offer ${count} free templates`);
 * ```
 */
export async function getFreeTemplateCount(): Promise<number> {
  try {
    const supabase = await createClient();

    const { count, error } = await supabase
      .from('free_screen_templates')
      .select('*', { count: 'exact', head: true })
      .eq('is_free', true);

    if (error) {
      console.error('Failed to count free templates:', error.message);
      return 0;
    }

    return count ?? 0;
  } catch (error) {
    console.error('Unexpected error counting templates:', error);
    return 0;
  }
}
