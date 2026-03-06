/**
 * GET /api/mcp/examples/screens — 스크린 예제 정의 API
 * [SPEC-MCP-007:E-007] fetchScreenExamples() 지원
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateMcpRequest } from '@/lib/mcp/auth-helper';

/**
 * 스크린 예제 정의 데이터
 * mcp-server의 screen-examples.ts 데이터를 서버 사이드로 이전
 */
const SCREEN_EXAMPLES = [
  {
    name: 'Team Grid',
    description:
      'Dashboard screen showing team members in a responsive grid with avatars and role information',
    definition: {
      id: 'team-grid',
      name: 'Team Grid Dashboard',
      description: 'Display team members in a grid layout with profile cards',
      shell: 'shell.web.dashboard',
      page: 'page.dashboard',
      themeId: 'square-minimalism',
      sections: [
        {
          id: 'header',
          pattern: 'section.container',
          slot: 'header',
          components: [
            { type: 'Heading', props: { level: 1, children: 'Our Team' } },
            {
              type: 'Text',
              props: { variant: 'muted', children: 'Meet the people behind our success' },
            },
          ],
        },
        {
          id: 'team-members',
          pattern: 'section.grid-4',
          slot: 'main',
          components: [
            {
              type: 'Card',
              props: { variant: 'elevated' },
              children: [
                {
                  type: 'Avatar',
                  props: { src: '/avatars/user-1.jpg', alt: 'Team Member', size: 'lg' },
                },
                { type: 'Heading', props: { level: 3, children: 'Jane Smith' } },
                { type: 'Badge', props: { variant: 'secondary', children: 'Engineering' } },
                { type: 'Text', props: { variant: 'small', children: 'Senior Software Engineer' } },
              ],
            },
            {
              type: 'Card',
              props: { variant: 'elevated' },
              children: [
                {
                  type: 'Avatar',
                  props: { src: '/avatars/user-2.jpg', alt: 'Team Member', size: 'lg' },
                },
                { type: 'Heading', props: { level: 3, children: 'John Doe' } },
                { type: 'Badge', props: { variant: 'secondary', children: 'Design' } },
                { type: 'Text', props: { variant: 'small', children: 'UX Lead' } },
              ],
            },
          ],
        },
      ],
      metadata: { version: '1.0.0', author: 'framingui', created: '2025-01-01T00:00:00Z' },
    },
  },
  {
    name: 'Data Table',
    description:
      'Screen with a data table showing records with search, filter, and pagination controls',
    definition: {
      id: 'data-table-view',
      name: 'Data Table View',
      description: 'Tabular data display with interactive controls',
      shell: 'shell.web.app',
      page: 'page.resource',
      themeId: 'square-minimalism',
      sections: [
        {
          id: 'toolbar',
          pattern: 'section.split-50-50',
          slot: 'header',
          components: [
            {
              type: 'Input',
              props: { type: 'search', placeholder: 'Search records...', icon: 'search' },
            },
            {
              type: 'Dropdown',
              props: {
                placeholder: 'Filter by status',
                options: [
                  { value: 'all', label: 'All' },
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ],
              },
            },
          ],
        },
        {
          id: 'table-content',
          pattern: 'section.container',
          slot: 'main',
          components: [
            {
              type: 'Table',
              props: {
                columns: [
                  { key: 'id', header: 'ID', sortable: true },
                  { key: 'name', header: 'Name', sortable: true },
                  { key: 'status', header: 'Status' },
                  { key: 'date', header: 'Created', sortable: true },
                  { key: 'actions', header: 'Actions' },
                ],
                data: [],
                pagination: { pageSize: 10, showPageSizeSelector: true },
              },
            },
          ],
        },
        {
          id: 'pagination',
          pattern: 'section.container',
          slot: 'footer',
          components: [
            { type: 'Text', props: { variant: 'muted', children: 'Showing 1-10 of 100 results' } },
          ],
        },
      ],
      metadata: { version: '1.0.0', author: 'framingui', created: '2025-01-01T00:00:00Z' },
    },
  },
  {
    name: 'Login Form',
    description:
      'Authentication screen with email and password fields, social login options, and forgot password link',
    definition: {
      id: 'login-screen',
      name: 'Login',
      description: 'User authentication screen',
      shell: 'shell.web.auth',
      page: 'page.wizard',
      sections: [
        {
          id: 'login-form',
          pattern: 'section.centered',
          slot: 'main',
          components: [
            {
              type: 'Card',
              props: { variant: 'elevated', className: 'max-w-md w-full' },
              children: [
                { type: 'Heading', props: { level: 2, children: 'Welcome back' } },
                {
                  type: 'Text',
                  props: {
                    variant: 'muted',
                    children: 'Enter your credentials to access your account',
                  },
                },
                {
                  type: 'Form',
                  props: { onSubmit: 'handleLogin' },
                  children: [
                    {
                      type: 'Input',
                      props: {
                        type: 'email',
                        label: 'Email',
                        placeholder: 'Enter your email',
                        required: true,
                      },
                    },
                    {
                      type: 'Input',
                      props: {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Enter your password',
                        required: true,
                      },
                    },
                    {
                      type: 'Button',
                      props: {
                        type: 'submit',
                        variant: 'primary',
                        fullWidth: true,
                        children: 'Sign In',
                      },
                    },
                  ],
                },
                {
                  type: 'Link',
                  props: {
                    href: '/forgot-password',
                    variant: 'subtle',
                    children: 'Forgot password?',
                  },
                },
              ],
            },
          ],
        },
      ],
      metadata: { version: '1.0.0', author: 'framingui', created: '2025-01-01T00:00:00Z' },
    },
  },
  {
    name: 'Dashboard Overview',
    description: 'Analytics dashboard with KPI cards, charts, and recent activity feed',
    definition: {
      id: 'dashboard-overview',
      name: 'Dashboard Overview',
      description: 'Main analytics dashboard with key metrics',
      shell: 'shell.web.dashboard',
      page: 'page.dashboard',
      sections: [
        {
          id: 'metrics',
          pattern: 'section.grid-4',
          slot: 'header',
          components: [
            {
              type: 'Card',
              props: { variant: 'outline' },
              children: [
                { type: 'Text', props: { variant: 'label', children: 'Total Revenue' } },
                { type: 'Heading', props: { level: 2, children: '$45,231.89' } },
                {
                  type: 'Badge',
                  props: { variant: 'success', children: '+20.1% from last month' },
                },
              ],
            },
            {
              type: 'Card',
              props: { variant: 'outline' },
              children: [
                { type: 'Text', props: { variant: 'label', children: 'Active Users' } },
                { type: 'Heading', props: { level: 2, children: '2,350' } },
                {
                  type: 'Badge',
                  props: { variant: 'success', children: '+180.1% from last month' },
                },
              ],
            },
          ],
        },
        {
          id: 'charts',
          pattern: 'section.split-60-40',
          slot: 'main',
          components: [
            {
              type: 'Card',
              props: { title: 'Revenue Over Time' },
              children: [
                {
                  type: 'Text',
                  props: {
                    variant: 'muted',
                    children: 'Chart placeholder - integrate with your charting library',
                  },
                },
              ],
            },
            {
              type: 'Card',
              props: { title: 'Recent Activity' },
              children: [
                {
                  type: 'List',
                  props: {
                    items: [
                      'New user registration',
                      'Order #1234 completed',
                      'Support ticket resolved',
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
      metadata: { version: '1.0.0', author: 'framingui', created: '2025-01-01T00:00:00Z' },
    },
  },
];

export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateMcpRequest(request);
    if (!auth.valid) {
      return auth.response;
    }

    return NextResponse.json(
      {
        success: true,
        examples: SCREEN_EXAMPLES,
        count: SCREEN_EXAMPLES.length,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600',
          ...auth.rateLimitHeaders,
        },
      }
    );
  } catch (error) {
    console.error('[MCP Screen Examples] Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
