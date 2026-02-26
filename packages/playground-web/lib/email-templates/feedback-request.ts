/**
 * 피드백 요청 이메일 템플릿
 *
 * @param userName - 사용자 이름
 * @returns HTML 이메일 템플릿
 */
export function feedbackRequestEmailTemplate(userName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>How's your tekton experience so far?</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- 메인 컨테이너 -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);">

          <!-- 헤더 -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 40px 30px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                tekton
              </h1>
            </td>
          </tr>

          <!-- 본문 -->
          <tr>
            <td style="padding: 40px;">
              <!-- 인사말 -->
              <p style="margin: 0 0 20px; font-size: 18px; color: #1a1a1a; font-weight: 600;">
                Hi ${userName},
              </p>

              <!-- 본문 내용 -->
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                You've been using <strong>tekton</strong> for 7 days now! We'd love to hear about your experience so far.
              </p>

              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Your feedback is incredibly valuable to us as we continue to improve tekton. Whether it's a feature you love, something that could be better, or a suggestion for the future, we want to hear it all.
              </p>

              <!-- 인센티브 강조 박스 -->
              <div style="background-color: #f8f4ff; border-left: 4px solid #667eea; padding: 20px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #4a4a4a;">
                  <strong style="color: #667eea;">🎁 Special Offer:</strong><br>
                  We'll randomly select <strong>20%</strong> of detailed feedback submissions to receive a <strong>free Creator Pass (1-year subscription)</strong> as a thank you!
                </p>
              </div>

              <p style="margin: 0 0 28px; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                It only takes a few minutes, and your insights will help shape the future of tekton.
              </p>

              <!-- CTA 버튼 -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 10px 0;">
                    <a href="https://framingui.com/studio/feedback"
                       style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                      Share Your Feedback
                    </a>
                  </td>
                </tr>
              </table>

              <!-- 감사 인사 -->
              <p style="margin: 32px 0 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Thank you for being part of the tekton community!
              </p>

              <p style="margin: 16px 0 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Best regards,<br>
                <strong>The tekton Team</strong>
              </p>
            </td>
          </tr>

          <!-- 푸터 -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px 40px; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 8px; font-size: 13px; line-height: 1.5; color: #888888; text-align: center;">
                This email was sent to you because you're using tekton.
              </p>
              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #888888; text-align: center;">
                <a href="https://framingui.com" style="color: #667eea; text-decoration: none;">framingui.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
