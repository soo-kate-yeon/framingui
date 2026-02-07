/**
 * User Licenses API
 * SPEC-DEPLOY-001 Phase 3: 사용자 라이선스 조회
 *
 * GET /api/user/licenses
 * 인증된 사용자의 라이선스 목록 반환
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserLicenses } from '@/lib/db/licenses';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        { error: 'unauthorized' },
        { status: 401 }
      );
    }

    const licenses = await getUserLicenses(user.id);

    return NextResponse.json({ licenses });
  } catch (err) {
    console.error('[Licenses API] 오류:', err);
    return NextResponse.json(
      { error: 'internal_error' },
      { status: 500 }
    );
  }
}
