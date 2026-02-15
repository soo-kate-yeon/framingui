/**
 * [TAG-Q-001] 모든 요구사항 TAG 주석 포함
 * [TAG-Q-002] TypeScript strict mode 오류 없이 컴파일
 * [TAG-Q-004] TRUST 5 Framework 5개 Pillar 준수
 * [TAG-Q-019] Storybook 문서화 및 접근성 테스트
 */

import type { Meta, StoryObj } from '@storybook/react';
import { SuccessTemplateComponent } from './success';

const meta = {
  title: 'Templates/Feedback/Success',
  component: SuccessTemplateComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SuccessTemplateComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default success template
 * Accessibility: Positive feedback with clear next steps
 */
export const Default: Story = {
  args: {},
};
