/**
 * framingui-mcp status 명령어
 * 인증 상태 확인
 */

import { loadCredentials, getCredentialsPath } from './credentials.js';

/**
 * 인증 상태 표시
 */
export function statusCommand(): void {
  // 1. 환경변수 확인
  const envKey = process.env.FRAMINGUI_API_KEY;
  if (envKey) {
    console.log('Authentication: FRAMINGUI_API_KEY environment variable');
    console.log(`  Key: ${envKey.substring(0, 15)}...`);
    return;
  }

  // 2. 크레덴셜 파일 확인
  const creds = loadCredentials();
  if (creds) {
    console.log(`Authenticated as ${creds.user_email}`);
    console.log(`  API URL: ${creds.api_url}`);
    console.log(`  Key: ${creds.api_key.substring(0, 15)}...`);
    console.log(`  Saved at: ${getCredentialsPath()}`);
    console.log(`  Created: ${creds.created_at}`);
    return;
  }

  // 3. 인증 안 됨
  console.log('Not authenticated.');
  console.log('Run `framingui-mcp login` to authenticate.');
}
