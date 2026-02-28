/**
 * Trial License API
 * 무료체험 라이선스 생성
 *
 * POST /api/licenses/trial
 * - 인증된 사용자에게 3일 무료체험 라이선스 발급
 * - 1인당 1개의 trial만 가능 (중복 방지)
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const supabase = await createClient();

    // 1. 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    // 2. 기존 trial 라이선스 확인
    const { data: existingTrial, error: checkError } = await supabase
      .from('user_licenses')
      .select('id, type, expires_at')
      .eq('user_id', user.id)
      .eq('type', 'trial')
      .maybeSingle();

    if (checkError) {
      console.error('[Trial API] 기존 trial 확인 오류:', checkError);
      return NextResponse.json({ error: 'database_error' }, { status: 500 });
    }

    if (existingTrial) {
      // 기존 trial이 있으면 거부
      return NextResponse.json(
        {
          error: 'trial_already_exists',
          message: 'You have already used your free trial',
          existing_trial: {
            expires_at: existingTrial.expires_at,
          },
        },
        { status: 409 }
      );
    }

    // 3. 새 trial 라이선스 생성
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 3); // 3일 후

    const { data: newTrial, error: createError } = await supabase
      .from('user_licenses')
      .insert({
        user_id: user.id,
        theme_id: 'trial-all-access', // trial은 모든 테마 접근 가능
        tier: 'creator', // trial은 creator tier로 설정
        type: 'trial',
        expires_at: expiresAt.toISOString(),
        is_active: true,
      })
      .select()
      .single();

    if (createError) {
      console.error('[Trial API] Trial 생성 오류:', createError);
      return NextResponse.json({ error: 'creation_failed' }, { status: 500 });
    }

    // 4. 성공 응답
    return NextResponse.json(
      {
        success: true,
        trial: {
          id: newTrial.id,
          type: newTrial.type,
          expires_at: newTrial.expires_at,
          days_left: 3,
        },
        message: 'Free trial activated! You have 3 days of full access.',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[Trial API] 예상치 못한 오류:', err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
