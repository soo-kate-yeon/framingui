/**
 * Database Module Exports
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * WHY: 데이터베이스 관련 모든 함수와 타입을 한 곳에서 import 가능하도록 함
 * IMPACT: 코드 가독성 및 유지보수성 향상
 */

// Types
export type {
  LicenseTier,
  UserLicense,
  CreateLicenseData,
  UpdateLicenseData,
  FreeScreenTemplate,
  UserProfile,
  UpdateUserData,
  DatabaseError,
} from './types';

// User operations
export {
  createOrUpdateUser,
  getUserById,
  updateUser,
  getCurrentUser,
} from './users';

// License operations
export {
  getUserLicenses,
  createLicense,
  checkLicense,
  updateLicense,
  getActiveLicenseCount,
  deactivateExpiredLicenses,
} from './licenses';

// Template operations
export {
  getFreeTemplates,
  getTemplateById,
  isFreeTemplate,
  checkMultipleTemplates,
  canAccessTemplate,
  getFreeTemplateCount,
} from './templates';
