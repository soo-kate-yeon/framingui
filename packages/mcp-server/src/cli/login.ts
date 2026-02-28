/**
 * framingui-mcp login 명령어
 * 브라우저 OAuth → API Key 자동 저장
 */

import http from 'node:http';
import crypto from 'node:crypto';
import { exec } from 'node:child_process';
import { saveCredentials } from './credentials.js';
import { resolveFraminguiApiUrl } from '../utils/api-url.js';

const LOGIN_TIMEOUT_MS = 5 * 60 * 1000; // 5분

/**
 * 플랫폼별 브라우저 열기
 */
function openBrowser(url: string): void {
  const platform = process.platform;
  let cmd: string;

  if (platform === 'darwin') {
    cmd = `open "${url}"`;
  } else if (platform === 'win32') {
    cmd = `start "" "${url}"`;
  } else {
    cmd = `xdg-open "${url}"`;
  }

  exec(cmd, err => {
    if (err) {
      console.error(`\nCould not open browser automatically.`);
      console.error(`Please open this URL manually:\n  ${url}\n`);
    }
  });
}

/**
 * OAuth 로그인 플로우 실행
 */
export async function loginCommand(): Promise<void> {
  const { apiUrl, reason } = resolveFraminguiApiUrl(process.env.FRAMINGUI_API_URL);
  if (reason) {
    console.warn(`[framingui-mcp] ${reason}`);
  }

  // 1. CSRF state 생성
  const state = crypto.randomBytes(32).toString('hex');

  // 2. localhost 임시 서버 시작 (랜덤 포트)
  return new Promise<void>((resolve, reject) => {
    const server = http.createServer((req, res) => {
      if (!req.url?.startsWith('/callback')) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const url = new URL(req.url, `http://localhost`);
      const key = url.searchParams.get('key');
      const email = url.searchParams.get('email');
      const returnedState = url.searchParams.get('state');

      // CSRF state 검증
      if (returnedState !== state) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(
          '<html><body><h1>Authentication failed</h1><p>Invalid state parameter. Please try again.</p></body></html>'
        );
        cleanup('State mismatch. Authentication aborted.');
        return;
      }

      if (!key || !email) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(
          '<html><body><h1>Authentication failed</h1><p>Missing credentials. Please try again.</p></body></html>'
        );
        cleanup('Missing key or email in callback.');
        return;
      }

      // 크레덴셜 저장
      try {
        saveCredentials({
          api_key: key,
          api_url: apiUrl,
          created_at: new Date().toISOString(),
          user_email: email,
        });

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(
          '<html><body style="font-family:system-ui;text-align:center;padding:60px">' +
            '<h1>Authentication successful!</h1>' +
            '<p>You can close this tab and return to the terminal.</p>' +
            '</body></html>'
        );

        console.log(`\nAuthenticated as ${email}`);
        console.log('Credentials saved to ~/.framingui/credentials.json');
        cleanup();
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<html><body><h1>Error</h1><p>Failed to save credentials.</p></body></html>');
        cleanup(`Failed to save credentials: ${err}`);
      }
    });

    // eslint-disable-next-line prefer-const
    let timeout: ReturnType<typeof setTimeout>;

    function cleanup(errorMsg?: string): void {
      clearTimeout(timeout);
      server.close();
      if (errorMsg) {
        reject(new Error(errorMsg));
      } else {
        resolve();
      }
    }

    // 타임아웃 (5분)
    timeout = setTimeout(() => {
      console.error('\nLogin timed out (5 minutes). Please try again.');
      cleanup('Login timed out.');
    }, LOGIN_TIMEOUT_MS);

    // 랜덤 포트 할당 (port 0)
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      if (!addr || typeof addr === 'string') {
        cleanup('Failed to start callback server.');
        return;
      }

      const port = addr.port;
      const authUrl = `${apiUrl}/mcp/auth?callback_port=${port}&state=${state}`;

      console.log('Opening browser for authentication...');
      console.log(`\nIf the browser does not open, visit:\n  ${authUrl}\n`);
      console.log('Waiting for authentication...');

      openBrowser(authUrl);
    });
  });
}
