/**
 * [TAG-Q-001] 모든 요구사항 TAG 주석 포함
 * [TAG-Q-002] TypeScript strict mode 오류 없이 컴파일
 * [TAG-Q-004] TRUST 5 Framework 5개 Pillar 준수
 * [TAG-Q-019] Storybook 문서화 및 접근성 테스트
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ForgotPasswordTemplateComponent } from './forgot-password';

const meta = {
  title: 'Templates/Auth/ForgotPassword',
  component: ForgotPasswordTemplateComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPasswordTemplateComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default forgot password template
 * Accessibility: Fully accessible form with proper labels and ARIA attributes
 */
export const Default: Story = {
  args: {},
};
