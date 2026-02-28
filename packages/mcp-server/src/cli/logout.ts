/**
 * framingui-mcp logout 명령어
 * ~/.tekton/credentials.json 삭제
 */

import { deleteCredentials } from './credentials.js';

/**
 * 로그아웃 (크레덴셜 삭제)
 */
export function logoutCommand(): void {
  const deleted = deleteCredentials();

  if (deleted) {
    console.log('Credentials removed.');
  } else {
    console.log('No credentials found. Already logged out.');
  }
}
