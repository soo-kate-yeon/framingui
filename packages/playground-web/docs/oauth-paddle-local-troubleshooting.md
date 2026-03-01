# Local OAuth + Paddle Troubleshooting

This runbook is for local failures around OAuth login and Paddle checkout.

## 1) Symptom: `bad_oauth_state` redirect

Example:

`https://framingui.com/?error=invalid_request&error_code=bad_oauth_state&error_description=OAuth+state+has+expired`

### Why it happens

- PKCE state/code_verifier can expire if login is delayed.
- Safari can be more sensitive to storage/session behavior.
- Supabase may fall back to `Site URL` on OAuth errors.

### What to verify

1. Supabase `Authentication > URL Configuration`
2. `Site URL` is production (`https://framingui.com`)
3. Redirect URLs include:
   - `http://localhost:3001/auth/callback`
   - `https://framingui.com/auth/callback`
   - (compatibility) `http://localhost:3001/api/auth/callback`, `https://framingui.com/api/auth/callback`
4. Start login from `/auth/login` and complete immediately (no long delay)
5. Use a fresh tab with cleared site data
6. In DevTools, verify `/auth/v1/authorize` request includes:
   - `redirect_to=http://localhost:3001/auth/callback`

## 2) Symptom: Safari CORS error when creator checkout/login path runs

Example errors:

- `Origin http://localhost:3001 is not allowed by Access-Control-Allow-Origin. Status code: 502`
- `Fetch API cannot load .../rest/v1/user_licenses ... due to access control checks`

### Why it happens

- Browser direct requests to Supabase REST may fail under certain local Safari conditions.

### Current mitigation in code

- User license loading now uses same-origin API (`/api/user/licenses`) instead of direct browser REST query.

## 3) Symptom: Chrome Paddle error on localhost

Example:

- `POST https://checkout-service.paddle.com/transaction-checkout 400 (Bad Request)`
- CSP report-only logs for `buy.paddle.com`

### Why it happens

- Live Paddle checkout is often not valid from localhost.
- CSP report-only line is informational, not always the blocker.

### Current mitigation in code

- If `NEXT_PUBLIC_PADDLE_ENVIRONMENT=production` and host is `localhost`, checkout is blocked with a clear message.
- For local tests, use Paddle sandbox.

## 4) Recommended local setup

Use sandbox locally:

```env
NEXT_PUBLIC_PADDLE_ENVIRONMENT=sandbox
NEXT_PUBLIC_ENABLE_PAYMENTS=true
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=test_xxx
NEXT_PUBLIC_PADDLE_PRICE_SINGLE=pri_xxx
NEXT_PUBLIC_PADDLE_PRICE_DOUBLE=pri_xxx
NEXT_PUBLIC_PADDLE_PRICE_CREATOR=pri_xxx
```

Keep production/live checkout for deployed domains only.

## 5) Quick verification flow

1. Clear browser site data (`localhost`, `framingui.com`, `*.supabase.co`)
2. Open `http://localhost:3001/auth/login`
3. Run OAuth immediately (no delay)
4. Confirm callback returns to local origin
5. Test pricing creator click:
   - Sandbox local: checkout should open
   - Production local: clear warning should appear
