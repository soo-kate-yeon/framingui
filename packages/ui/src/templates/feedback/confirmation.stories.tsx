/**
 * [TAG-Q-001] 모든 요구사항 TAG 주석 포함
 * [TAG-Q-002] TypeScript strict mode 오류 없이 컴파일
 * [TAG-Q-004] TRUST 5 Framework 5개 Pillar 준수
 * [TAG-Q-019] Storybook 문서화 및 접근성 테스트
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmationTemplateComponent } from './confirmation';

const meta = {
  title: 'Templates/Feedback/Confirmation',
  component: ConfirmationTemplateComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmationTemplateComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default confirmation template
 * Accessibility: Clear action choices with keyboard navigation support
 */
export const Default: Story = {
  args: {},
};
