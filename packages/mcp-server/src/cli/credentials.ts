/**
 * 크레덴셜 파일 관리
 * ~/.tekton/credentials.json 읽기/쓰기/삭제
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export interface TektonCredentials {
  api_key: string;
  api_url: string;
  created_at: string;
  user_email: string;
}

/**
 * 크레덴셜 파일 경로 반환
 */
export function getCredentialsPath(): string {
  return path.join(os.homedir(), '.tekton', 'credentials.json');
}

/**
 * 크레덴셜 파일 로드
 * @returns 크레덴셜 객체 또는 null (파일 없거나 파싱 실패 시)
 */
export function loadCredentials(): TektonCredentials | null {
  const credPath = getCredentialsPath();

  try {
    if (!fs.existsSync(credPath)) {
      return null;
    }
    const raw = fs.readFileSync(credPath, 'utf-8');
    const data = JSON.parse(raw) as TektonCredentials;

    // 필수 필드 검증
    if (!data.api_key || !data.api_url) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

/**
 * 크레덴셜 저장 (chmod 600)
 */
export function saveCredentials(creds: TektonCredentials): void {
  const credPath = getCredentialsPath();
  const dir = path.dirname(credPath);

  // ~/.tekton 디렉토리 자동 생성
  fs.mkdirSync(dir, { recursive: true });

  // 소유자만 읽기/쓰기 (0o600)
  fs.writeFileSync(credPath, JSON.stringify(creds, null, 2) + '\n', {
    mode: 0o600,
  });
}

/**
 * 크레덴셜 파일 삭제
 * @returns true면 삭제 성공, false면 파일 없음
 */
export function deleteCredentials(): boolean {
  const credPath = getCredentialsPath();

  try {
    if (!fs.existsSync(credPath)) {
      return false;
    }
    fs.unlinkSync(credPath);
    return true;
  } catch {
    return false;
  }
}
