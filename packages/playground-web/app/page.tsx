import { LandingPage } from '../components/landing/LandingPage';
import { AuthRedirect } from '../components/shared/AuthRedirect';

export default function HomePage() {
  return (
    <>
      {/* 클라이언트 컴포넌트: 로그인 유저만 /studio로 리디렉트 */}
      <AuthRedirect />
      {/* LandingPage는 SSR로 렌더링되어 봇이 Footer 및 법적 링크를 감지 가능 */}
      <LandingPage />
    </>
  );
}
