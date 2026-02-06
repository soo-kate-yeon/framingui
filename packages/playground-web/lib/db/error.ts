/**
 * 데이터베이스 에러 유틸리티
 * 
 * DatabaseError 객체를 일관되게 생성하는 헬퍼 함수
 */

import type { DatabaseError } from './types';

/**
 * DatabaseError 객체 생성
 */
export function createDatabaseError(
  message: string,
  code?: string,
  details?: string
): DatabaseError {
  return {
    message,
    code,
    details,
  };
}

/**
 * 에러를 DatabaseError로 변환
 */
export function toDatabaseError(
  message: string,
  error?: unknown,
  code?: string
): DatabaseError {
  let details = 'Unknown error';
  
  if (error instanceof Error) {
    details = error.message;
  } else if (typeof error === 'string') {
    details = error;
  }
  
  return createDatabaseError(message, code, details);
}
