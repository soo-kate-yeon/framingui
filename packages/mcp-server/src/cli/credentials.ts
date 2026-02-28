/**
 * 크레덴셜 파일 관리
 * ~/.framingui/credentials.json 읽기/쓰기/삭제
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { resolveFraminguiApiUrl } from '../utils/api-url.js';

export interface FraminguiCredentials {
  api_key: string;
  api_url: string;
  created_at: string;
  user_email: string;
}

/**
 * 크레덴셜 파일 경로 반환 (새 경로)
 */
export function getCredentialsPath(): string {
  return path.join(os.homedir(), '.framingui', 'credentials.json');
}

/**
 * 크레덴셜 파일 로드
 * @returns 크레덴셜 객체 또는 null (파일 없거나 파싱 실패 시)
 */
export function loadCredentials(): FraminguiCredentials | null {
  const paths = [getCredentialsPath()];

  for (const credPath of paths) {
    try {
      if (!fs.existsSync(credPath)) {
        continue;
      }
      const raw = fs.readFileSync(credPath, 'utf-8');
      const data = JSON.parse(raw) as FraminguiCredentials;

      // 필수 필드 검증
      if (!data.api_key || !data.api_url) {
        continue;
      }

      const { apiUrl, wasNormalized, reason } = resolveFraminguiApiUrl(data.api_url);
      const normalizedCredentials: FraminguiCredentials = {
        ...data,
        api_url: apiUrl,
      };

      if (wasNormalized) {
        if (reason) {
          console.warn(`[framingui-mcp] ${reason}`);
        }

        // 레거시/비정상 URL은 로드 시점에 즉시 정리해 재발을 방지
        try {
          saveCredentials(normalizedCredentials);
        } catch {
          // 마이그레이션 저장 실패는 치명적이지 않으므로 무시
        }
      }

      return normalizedCredentials;
    } catch {
      continue;
    }
  }

  return null;
}

/**
 * 크레덴셜 저장 (chmod 600)
 */
export function saveCredentials(creds: FraminguiCredentials): void {
  const credPath = getCredentialsPath();
  const dir = path.dirname(credPath);

  // ~/.framingui 디렉토리 자동 생성
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
