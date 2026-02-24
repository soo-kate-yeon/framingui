import { NextRequest, NextResponse } from 'next/server';
import { sendFeedbackRequestEmail } from '@/lib/email';
import { z } from 'zod';

/**
 * 요청 본문 스키마 정의
 */
const FeedbackRequestSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
  userName: z.string().min(1, '사용자 이름은 필수입니다.'),
});

/**
 * POST /api/email/feedback-request
 *
 * 피드백 요청 이메일을 발송합니다.
 * Cron job 또는 수동 트리거로 사용할 수 있습니다.
 *
 * @param request - Next.js 요청 객체
 * @returns JSON 응답
 */
export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const body = await request.json();

    // 요청 본문 검증
    const validation = FeedbackRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation Error',
          message: '요청 데이터가 유효하지 않습니다.',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, userName } = validation.data;

    // 이메일 발송
    const result = await sendFeedbackRequestEmail(email, userName);

    // RESEND_API_KEY가 설정되지 않은 경우 (graceful skip)
    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Email service is not configured. RESEND_API_KEY environment variable is missing.',
        },
        { status: 200 } // 200으로 반환하여 cron job이 실패하지 않도록 함
      );
    }

    // 성공 응답
    return NextResponse.json(
      {
        success: true,
        message: '피드백 요청 이메일이 성공적으로 발송되었습니다.',
        emailId: result.id,
      },
      { status: 200 }
    );
  } catch (error) {
    // 에러 로깅
    console.error('[API /api/email/feedback-request] Error:', error);

    // 에러 응답
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : '이메일 발송 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/email/feedback-request
 *
 * Health check 엔드포인트
 */
export async function GET() {
  const isConfigured = !!process.env.RESEND_API_KEY;

  return NextResponse.json(
    {
      service: 'Feedback Request Email Service',
      status: isConfigured ? 'configured' : 'not configured',
      message: isConfigured
        ? 'Email service is ready.'
        : 'RESEND_API_KEY environment variable is not set.',
    },
    { status: 200 }
  );
}
