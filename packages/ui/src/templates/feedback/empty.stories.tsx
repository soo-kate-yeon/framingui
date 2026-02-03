/**
 * [TAG-Q-001] 모든 요구사항 TAG 주석 포함
 * [TAG-Q-002] TypeScript strict mode 오류 없이 컴파일
 * [TAG-Q-004] TRUST 5 Framework 5개 Pillar 준수
 * [TAG-Q-019] Storybook 문서화 및 접근성 테스트
 */

import type { Meta, StoryObj } from '@storybook/react';
import { EmptyTemplateComponent } from './empty';

const meta = {
  title: 'Templates/Feedback/Empty',
  component: EmptyTemplateComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyTemplateComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default empty template
 * Accessibility: Clear empty state with actionable next steps
 */
export const Default: Story = {
  args: {},
};
