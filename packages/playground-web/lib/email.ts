import { Resend } from 'resend';
import { feedbackRequestEmailTemplate } from './email-templates/feedback-request';

/**
 * Resend 클라이언트 초기화
 * 환경변수가 없으면 undefined로 설정되어 graceful하게 처리됨
 */
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * 피드백 요청 이메일 전송
 *
 * @param to - 수신자 이메일 주소
 * @param userName - 사용자 이름
 * @returns 이메일 전송 결과 또는 null (환경변수 없을 경우)
 */
export async function sendFeedbackRequestEmail(
  to: string,
  userName: string
): Promise<{ id: string } | null> {
  // 환경변수가 없으면 graceful skip
  if (!resend) {
    console.warn('[Email Service] RESEND_API_KEY not configured. Skipping email send.');
    return null;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'tekton <no-reply@framingui.com>',
      to: [to],
      subject: "How's your tekton experience so far?",
      html: feedbackRequestEmailTemplate(userName),
    });

    if (error) {
      console.error('[Email Service] Failed to send email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('[Email Service] Email sent successfully:', data?.id);
    return data as { id: string };
  } catch (error) {
    console.error('[Email Service] Unexpected error:', error);
    throw error;
  }
}
