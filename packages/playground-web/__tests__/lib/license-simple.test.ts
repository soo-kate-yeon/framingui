/**
 * License logic unit tests (Simple version without mocks)
 * SPEC-UI-003: License Verification System
 * [TAG-UI003-011] WHEN 유효한 라이선스가 확인되면 THEN Edit Mode가 활성화되어야 한다
 */

import { describe, it, expect } from 'vitest';
import {
  getLicenseStatus,
  getUserLicenses,
  isLicenseExpired,
  isLicenseValid,
} from '@/lib/license';
import type { License } from '@/lib/types/user';
import {
  mockActiveLicense,
  mockExpiredLicense,
  mockRevokedLicense,
} from '../utils/test-utils';

describe('License Verification System (Pure Functions)', () => {
  describe('isLicenseExpired', () => {
    it('영구 라이선스(expiresAt 없음)는 만료되지 않음', () => {
      const license: License = {
        ...mockActiveLicense,
        expiresAt: undefined,
      };

      expect(isLicenseExpired(license)).toBe(false);
    });

    it('미래 만료일을 가진 라이선스는 만료되지 않음', () => {
      const futureLicense: License = {
        ...mockActiveLicense,
        expiresAt: new Date('2099-12-31'),
      };

      expect(isLicenseExpired(futureLicense)).toBe(false);
    });

    it('과거 만료일을 가진 라이선스는 만료됨', () => {
      expect(isLicenseExpired(mockExpiredLicense)).toBe(true);
    });
  });

  describe('isLicenseValid', () => {
    it('active 상태이고 만료되지 않은 라이선스는 유효함', () => {
      const validLicense: License = {
        ...mockActiveLicense,
        status: 'active',
        expiresAt: new Date('2099-12-31'),
      };

      expect(isLicenseValid(validLicense)).toBe(true);
    });

    it('영구 라이선스(expiresAt 없음)는 유효함', () => {
      const permanentLicense: License = {
        ...mockActiveLicense,
        status: 'active',
        expiresAt: undefined,
      };

      expect(isLicenseValid(permanentLicense)).toBe(true);
    });

    it('expired 상태인 라이선스는 유효하지 않음', () => {
      expect(isLicenseValid(mockExpiredLicense)).toBe(false);
    });

    it('revoked 상태인 라이선스는 유효하지 않음', () => {
      expect(isLicenseValid(mockRevokedLicense)).toBe(false);
    });

    it('active 상태이지만 만료일이 지난 라이선스는 유효하지 않음', () => {
      const license: License = {
        ...mockActiveLicense,
        status: 'active',
        expiresAt: new Date('2020-01-01'),
      };

      expect(isLicenseValid(license)).toBe(false);
    });
  });

  describe('getLicenseStatus', () => {
    it('TODO: 데이터베이스 연동 전까지 null 반환', async () => {
      const result = await getLicenseStatus('user-123', 'template-001');
      expect(result).toBeNull();
    });
  });

  describe('getUserLicenses', () => {
    it('TODO: 데이터베이스 연동 전까지 빈 배열 반환', async () => {
      const result = await getUserLicenses('user-123');
      expect(result).toEqual([]);
    });
  });
});
