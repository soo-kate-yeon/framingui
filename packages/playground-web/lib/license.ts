/**
 * 라이선스 검증 로직
 * SPEC-UI-003: License Verification System
 * [TAG-UI003-011] WHEN 유효한 라이선스가 확인되면 THEN Edit Mode가 활성화되어야 한다
 */

import type { License } from './types/user';

/**
 * 사용자가 특정 템플릿에 대한 유효한 라이선스를 보유하고 있는지 확인
 *
 * @param userId - 사용자 ID
 * @param templateId - 템플릿 ID
 * @returns 유효한 라이선스 보유 여부
 */
export async function hasValidLicense(
  userId: string,
  templateId: string,
): Promise<boolean> {
  // TODO: 실제 데이터베이스 쿼리 또는 API 호출 구현
  // 현재는 임시 구현

  try {
    const license = await getLicenseStatus(userId, templateId);

    if (!license) {
      return false;
    }

    // 라이선스 상태 확인
    if (license.status !== 'active') {
      return false;
    }

    // 만료일 확인 (만료일이 없으면 영구 라이선스)
    if (license.expiresAt) {
      const now = new Date();
      if (now > license.expiresAt) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('License verification error:', error);
    return false;
  }
}

/**
 * 사용자의 특정 템플릿 라이선스 정보 조회
 *
 * @param _userId - 사용자 ID (TODO: 데이터베이스 연동 시 사용)
 * @param _templateId - 템플릿 ID (TODO: 데이터베이스 연동 시 사용)
 * @returns 라이선스 정보 (없으면 null)
 */
export async function getLicenseStatus(
  _userId: string,
  _templateId: string,
): Promise<License | null> {
  // TODO: 실제 데이터베이스 쿼리 구현
  // 예시:
  // const result = await db.query(
  //   'SELECT * FROM licenses WHERE user_id = ? AND template_id = ?',
  //   [_userId, _templateId]
  // );

  // 임시 구현: 항상 null 반환
  return null;
}

/**
 * 사용자의 모든 활성 라이선스 조회
 *
 * @param _userId - 사용자 ID (TODO: 데이터베이스 연동 시 사용)
 * @returns 활성 라이선스 배열
 */
export async function getUserLicenses(_userId: string): Promise<License[]> {
  // TODO: 실제 데이터베이스 쿼리 구현
  // 예시:
  // const results = await db.query(
  //   'SELECT * FROM licenses WHERE user_id = ? AND status = ?',
  //   [_userId, 'active']
  // );

  // 임시 구현: 빈 배열 반환
  return [];
}

/**
 * 라이선스 만료 확인
 *
 * @param license - 라이선스 정보
 * @returns 만료 여부
 */
export function isLicenseExpired(license: License): boolean {
  if (!license.expiresAt) {
    // 만료일이 없으면 영구 라이선스
    return false;
  }

  const now = new Date();
  return now > license.expiresAt;
}

/**
 * 라이선스 유효성 검증 (상태 + 만료일)
 *
 * @param license - 라이선스 정보
 * @returns 유효 여부
 */
export function isLicenseValid(license: License): boolean {
  // 상태가 active가 아니면 무효
  if (license.status !== 'active') {
    return false;
  }

  // 만료 여부 확인
  if (isLicenseExpired(license)) {
    return false;
  }

  return true;
}

/**
 * 라이선스 검증 결과 인터페이스
 */
export interface LicenseVerificationResult {
  /** 유효한 라이선스 보유 여부 */
  valid: boolean;

  /** 라이선스 정보 (있는 경우) */
  license?: License;

  /** 오류 메시지 (검증 실패 시) */
  error?: string;
}

/**
 * 종합 라이선스 검증
 *
 * @param userId - 사용자 ID
 * @param templateId - 템플릿 ID
 * @returns 검증 결과
 */
export async function verifyLicense(
  userId: string,
  templateId: string,
): Promise<LicenseVerificationResult> {
  try {
    const license = await getLicenseStatus(userId, templateId);

    if (!license) {
      return {
        valid: false,
        error: 'No license found for this template',
      };
    }

    if (!isLicenseValid(license)) {
      return {
        valid: false,
        license,
        error: 'License is not valid (expired or revoked)',
      };
    }

    return {
      valid: true,
      license,
    };
  } catch (error) {
    return {
      valid: false,
      error:
        error instanceof Error ? error.message : 'License verification failed',
    };
  }
}
