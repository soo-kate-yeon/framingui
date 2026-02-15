/**
 * Example Screen Definitions for SPEC-MCP-004 Phase 3.5
 * Provides reference examples for coding agents to generate screen definitions
 */

import type { ScreenExample } from '../../schemas/mcp-schemas.js';

/**
 * Team Grid Example
 * A dashboard-style screen displaying team members in a grid layout
 */
export const teamGridExample: ScreenExample = {
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
          {
            type: 'Heading',
            props: {
              level: 1,
              children: 'Our Team',
            },
          },
          {
            type: 'Text',
            props: {
              variant: 'muted',
              children: 'Meet the people behind our success',
            },
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
            props: {
              variant: 'elevated',
            },
            children: [
              {
                type: 'Avatar',
                props: {
                  src: '/avatars/user-1.jpg',
                  alt: 'Team Member',
                  size: 'lg',
                },
              },
              {
                type: 'Heading',
                props: {
                  level: 3,
                  children: 'Jane Smith',
                },
              },
              {
                type: 'Badge',
                props: {
                  variant: 'secondary',
                  children: 'Engineering',
                },
              },
              {
                type: 'Text',
                props: {
                  variant: 'small',
                  children: 'Senior Software Engineer',
                },
              },
            ],
          },
          {
            type: 'Card',
            props: {
              variant: 'elevated',
            },
            children: [
              {
                type: 'Avatar',
                props: {
                  src: '/avatars/user-2.jpg',
                  alt: 'Team Member',
                  size: 'lg',
                },
              },
              {
                type: 'Heading',
                props: {
                  level: 3,
                  children: 'John Doe',
                },
              },
              {
                type: 'Badge',
                props: {
                  variant: 'secondary',
                  children: 'Design',
                },
              },
              {
                type: 'Text',
                props: {
                  variant: 'small',
                  children: 'UX Lead',
                },
              },
            ],
          },
        ],
      },
    ],
    metadata: {
      version: '1.0.0',
      author: 'tekton',
      created: '2025-01-01T00:00:00Z',
    },
  },
};

/**
 * Data Table Example
 * A screen displaying data in a tabular format with filtering and sorting
 */
export const dataTableExample: ScreenExample = {
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
            props: {
              type: 'search',
              placeholder: 'Search records...',
              icon: 'search',
            },
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
              pagination: {
                pageSize: 10,
                showPageSizeSelector: true,
              },
            },
          },
        ],
      },
      {
        id: 'pagination',
        pattern: 'section.container',
        slot: 'footer',
        components: [
          {
            type: 'Text',
            props: {
              variant: 'muted',
              children: 'Showing 1-10 of 100 results',
            },
          },
        ],
      },
    ],
    metadata: {
      version: '1.0.0',
      author: 'tekton',
      created: '2025-01-01T00:00:00Z',
    },
  },
};

/**
 * Login Form Example
 * Authentication screen with email/password login
 */
export const loginFormExample: ScreenExample = {
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
            props: {
              variant: 'elevated',
              className: 'max-w-md w-full',
            },
            children: [
              {
                type: 'Heading',
                props: {
                  level: 2,
                  children: 'Welcome back',
                },
              },
              {
                type: 'Text',
                props: {
                  variant: 'muted',
                  children: 'Enter your credentials to access your account',
                },
              },
              {
                type: 'Form',
                props: {
                  onSubmit: 'handleLogin',
                },
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
    metadata: {
      version: '1.0.0',
      author: 'tekton',
      created: '2025-01-01T00:00:00Z',
    },
  },
};

/**
 * Dashboard Overview Example
 * Analytics dashboard with metrics cards and charts
 */
export const dashboardOverviewExample: ScreenExample = {
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
            props: {
              variant: 'outline',
            },
            children: [
              {
                type: 'Text',
                props: {
                  variant: 'label',
                  children: 'Total Revenue',
                },
              },
              {
                type: 'Heading',
                props: {
                  level: 2,
                  children: '$45,231.89',
                },
              },
              {
                type: 'Badge',
                props: {
                  variant: 'success',
                  children: '+20.1% from last month',
                },
              },
            ],
          },
          {
            type: 'Card',
            props: {
              variant: 'outline',
            },
            children: [
              {
                type: 'Text',
                props: {
                  variant: 'label',
                  children: 'Active Users',
                },
              },
              {
                type: 'Heading',
                props: {
                  level: 2,
                  children: '2,350',
                },
              },
              {
                type: 'Badge',
                props: {
                  variant: 'success',
                  children: '+180.1% from last month',
                },
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
            props: {
              title: 'Revenue Over Time',
            },
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
            props: {
              title: 'Recent Activity',
            },
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
    metadata: {
      version: '1.0.0',
      author: 'tekton',
      created: '2025-01-01T00:00:00Z',
    },
  },
};

/**
 * Get all example screen definitions
 */
export function getAllExamples(): ScreenExample[] {
  return [teamGridExample, dataTableExample, loginFormExample, dashboardOverviewExample];
}

/**
 * Get examples matching a description
 */
export function getMatchingExamples(description: string, limit: number = 2): ScreenExample[] {
  const lowerDesc = description.toLowerCase();
  const examples = getAllExamples();

  // Score each example based on keyword matching
  const scored = examples.map(example => {
    let score = 0;
    const keywords = [
      ...example.name.toLowerCase().split(' '),
      ...example.description.toLowerCase().split(' '),
    ];

    for (const keyword of keywords) {
      if (keyword.length > 3 && lowerDesc.includes(keyword)) {
        score += 1;
      }
    }

    // Boost score for category matches
    if (lowerDesc.includes('team') && example.name.toLowerCase().includes('team')) {
      score += 5;
    }
    if (lowerDesc.includes('table') && example.name.toLowerCase().includes('table')) {
      score += 5;
    }
    if (lowerDesc.includes('login') && example.name.toLowerCase().includes('login')) {
      score += 5;
    }
    if (lowerDesc.includes('dashboard') && example.name.toLowerCase().includes('dashboard')) {
      score += 5;
    }
    if (lowerDesc.includes('grid') && example.name.toLowerCase().includes('grid')) {
      score += 3;
    }
    if (lowerDesc.includes('form') && example.name.toLowerCase().includes('form')) {
      score += 3;
    }
    if (lowerDesc.includes('auth') && example.name.toLowerCase().includes('login')) {
      score += 3;
    }

    return { example, score };
  });

  // Sort by score and return top matches
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.example);
}

/**
 * Get example by ID
 */
export function getExampleById(id: string): ScreenExample | undefined {
  return getAllExamples().find(e => e.definition.id === id);
}
