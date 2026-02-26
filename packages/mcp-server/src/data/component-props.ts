/**
 * Shared Component Props Data Module
 * 실제 @framingui/ui 컴포넌트에서 추출한 Tier 1 (15개 core) props/variants 데이터
 *
 * 사용처:
 * - preview-component.ts: 컴포넌트 상세 정보 제공
 * - get-screen-generation-context.ts: 인라인 props 컨텍스트 제공
 * - validate-screen-definition.ts: props 유효성 검증
 */

import type { PropDefinition, Variant, UsageExample } from '../schemas/mcp-schemas.js';

export interface ComponentPropsData {
  props: PropDefinition[];
  variants?: Variant[];
  subComponents?: string[];
  dependencies: { internal: string[]; external: string[] };
  examples?: UsageExample[];
  accessibility?: string;
}

/**
 * Tier 1 Core 컴포넌트 (15개) 전체 props/variants 데이터
 * 실제 packages/ui/src/components/*.tsx 소스에서 추출
 */
const COMPONENT_PROPS_DATA: Record<string, ComponentPropsData> = {
  button: {
    props: [
      {
        name: 'variant',
        type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
        required: false,
        defaultValue: "'default'",
        description: 'Visual style variant',
      },
      {
        name: 'size',
        type: "'default' | 'sm' | 'lg' | 'icon'",
        required: false,
        defaultValue: "'default'",
        description: 'Button size',
      },
      {
        name: 'asChild',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Render as child element using Radix Slot',
      },
    ],
    variants: [
      { name: 'variant', value: 'default', description: 'Default primary button' },
      { name: 'variant', value: 'destructive', description: 'Red destructive action' },
      { name: 'variant', value: 'outline', description: 'Outlined button' },
      { name: 'variant', value: 'secondary', description: 'Secondary gray button' },
      { name: 'variant', value: 'ghost', description: 'Transparent ghost button' },
      { name: 'variant', value: 'link', description: 'Link-styled button' },
    ],
    dependencies: {
      internal: [],
      external: ['@radix-ui/react-slot'],
    },
    examples: [
      {
        title: 'Basic Usage',
        code: `import { Button } from '@framingui/ui';\n\n<Button variant="default">Click me</Button>`,
        description: 'Simple button with default variant',
      },
      {
        title: 'Destructive Action',
        code: `<Button variant="destructive">Delete</Button>`,
        description: 'Button for destructive actions',
      },
    ],
    accessibility:
      'Supports keyboard navigation and ARIA attributes. Focus-visible ring for keyboard users.',
  },

  input: {
    props: [
      {
        name: 'type',
        type: 'string',
        required: false,
        description: 'HTML input type (text, email, password, etc.)',
      },
      {
        name: 'placeholder',
        type: 'string',
        required: false,
        description: 'Placeholder text',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Disabled state',
      },
    ],
    dependencies: {
      internal: [],
      external: [],
    },
    examples: [
      {
        title: 'Basic Input',
        code: `import { Input } from '@framingui/ui';\n\n<Input type="email" placeholder="Enter your email" />`,
        description: 'Simple email input',
      },
    ],
    accessibility: 'Focus-visible ring for keyboard navigation. Pair with Label for accessibility.',
  },

  label: {
    props: [
      {
        name: 'htmlFor',
        type: 'string',
        required: false,
        description: 'ID of the associated form element',
      },
    ],
    dependencies: {
      internal: [],
      external: ['@radix-ui/react-label'],
    },
    examples: [
      {
        title: 'With Input',
        code: `import { Label, Input } from '@framingui/ui';\n\n<Label htmlFor="email">Email</Label>\n<Input id="email" type="email" />`,
        description: 'Label paired with input',
      },
    ],
    accessibility: 'Peer-disabled styling for paired disabled inputs. Semantic HTML label element.',
  },

  card: {
    props: [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
    ],
    subComponents: ['CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'],
    dependencies: {
      internal: [],
      external: [],
    },
    examples: [
      {
        title: 'Basic Card',
        code: `import { Card, CardHeader, CardTitle, CardContent } from '@framingui/ui';\n\n<Card>\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n  </CardHeader>\n  <CardContent>Card content here</CardContent>\n</Card>`,
        description: 'Card with header and content',
      },
    ],
    accessibility: 'Semantic HTML structure for screen readers',
  },

  badge: {
    props: [
      {
        name: 'variant',
        type: "'default' | 'secondary' | 'destructive' | 'outline'",
        required: false,
        defaultValue: "'default'",
        description: 'Badge variant styling',
      },
    ],
    variants: [
      { name: 'variant', value: 'default', description: 'Default primary badge' },
      { name: 'variant', value: 'secondary', description: 'Secondary badge' },
      { name: 'variant', value: 'destructive', description: 'Destructive red badge' },
      { name: 'variant', value: 'outline', description: 'Outlined badge' },
    ],
    dependencies: {
      internal: [],
      external: [],
    },
    examples: [
      {
        title: 'Status Badge',
        code: `import { Badge } from '@framingui/ui';\n\n<Badge variant="secondary">Active</Badge>`,
        description: 'Badge for status display',
      },
    ],
    accessibility: 'Focus ring styling for keyboard navigation',
  },

  avatar: {
    props: [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
    ],
    subComponents: ['AvatarImage', 'AvatarFallback'],
    dependencies: {
      internal: [],
      external: ['@radix-ui/react-avatar'],
    },
    examples: [
      {
        title: 'With Fallback',
        code: `import { Avatar, AvatarImage, AvatarFallback } from '@framingui/ui';\n\n<Avatar>\n  <AvatarImage src="/avatar.jpg" alt="User" />\n  <AvatarFallback>CN</AvatarFallback>\n</Avatar>`,
        description: 'Avatar with image and fallback initials',
      },
    ],
    accessibility: 'Fallback text for image load failures. Alt text support via AvatarImage.',
  },

  separator: {
    props: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        required: false,
        defaultValue: "'horizontal'",
        description: 'Separator direction',
      },
      {
        name: 'decorative',
        type: 'boolean',
        required: false,
        defaultValue: 'true',
        description: 'Whether separator is purely decorative',
      },
    ],
    dependencies: {
      internal: [],
      external: ['@radix-ui/react-separator'],
    },
    accessibility: 'Decorative prop set for screen readers. ARIA role appropriate to context.',
  },

  checkbox: {
    props: [
      {
        name: 'checked',
        type: "boolean | 'indeterminate'",
        required: false,
        description: 'Checkbox state',
      },
      {
        name: 'onCheckedChange',
        type: "(checked: boolean | 'indeterminate') => void",
        required: false,
        description: 'Change callback',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Disabled state',
      },
    ],
    dependencies: {
      internal: [],
      external: ['@radix-ui/react-checkbox', 'lucide-react'],
    },
    examples: [
      {
        title: 'Basic Checkbox',
        code: `import { Checkbox } from '@framingui/ui';\n\n<Checkbox id="terms" />\n<label htmlFor="terms">Accept terms</label>`,
        description: 'Checkbox with label',
      },
    ],
    accessibility: 'Focus-visible ring. ARIA-checked state management. Keyboard navigation.',
  },

  'radio-group': {
    props: [
      {
        name: 'value',
        type: 'string',
        required: false,
        description: 'Selected radio value',
      },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        required: false,
        description: 'Change callback',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Disable all items',
      },
    ],
    subComponents: ['RadioGroupItem'],
    dependencies: {
      internal: [],
      external: ['@radix-ui/react-radio-group', 'lucide-react'],
    },
    examples: [
      {
        title: 'Basic RadioGroup',
        code: `import { RadioGroup, RadioGroupItem } from '@framingui/ui';\nimport { Label } from '@framingui/ui';\n\n<RadioGroup defaultValue="option-1">\n  <div className="flex items-center space-x-2">\n    <RadioGroupItem value="option-1" id="option-1" />\n    <Label htmlFor="option-1">Option 1</Label>\n  </div>\n</RadioGroup>`,
        description: 'Radio group with labeled options',
      },
    ],
    accessibility: 'Keyboard navigation with arrow keys. ARIA-checked state management.',
  },

  switch: {
    props: [
      {
        name: 'checked',
        type: 'boolean',
        required: false,
        description: 'Switch state',
      },
      {
        name: 'onCheckedChange',
        type: '(checked: boolean) => void',
        required: false,
        description: 'Change callback',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Disabled state',
      },
    ],
    dependencies: {
      internal: [],
      external: ['@radix-ui/react-switch'],
    },
    examples: [
      {
        title: 'Basic Switch',
        code: `import { Switch } from '@framingui/ui';\nimport { Label } from '@framingui/ui';\n\n<div className="flex items-center space-x-2">\n  <Switch id="airplane-mode" />\n  <Label htmlFor="airplane-mode">Airplane Mode</Label>\n</div>`,
        description: 'Toggle switch with label',
      },
    ],
    accessibility: 'Focus-visible ring. ARIA-checked state. Smooth animation on toggle.',
  },

  textarea: {
    props: [
      {
        name: 'placeholder',
        type: 'string',
        required: false,
        description: 'Placeholder text',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Disabled state',
      },
      {
        name: 'rows',
        type: 'number',
        required: false,
        description: 'Visible text rows',
      },
    ],
    dependencies: {
      internal: [],
      external: [],
    },
    examples: [
      {
        title: 'Basic Textarea',
        code: `import { Textarea } from '@framingui/ui';\n\n<Textarea placeholder="Type your message here." />`,
        description: 'Simple textarea',
      },
    ],
    accessibility: 'Focus-visible ring. Minimum height 80px. Pair with Label for accessibility.',
  },

  skeleton: {
    props: [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'CSS classes for width/height sizing',
      },
    ],
    dependencies: {
      internal: [],
      external: [],
    },
    examples: [
      {
        title: 'Card Skeleton',
        code: `import { Skeleton } from '@framingui/ui';\n\n<div className="space-y-2">\n  <Skeleton className="h-4 w-[250px]" />\n  <Skeleton className="h-4 w-[200px]" />\n</div>`,
        description: 'Loading skeleton placeholders',
      },
    ],
    accessibility: 'Uses animate-pulse for loading state indication.',
  },

  'scroll-area': {
    props: [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
    ],
    subComponents: ['ScrollBar'],
    dependencies: {
      internal: [],
      external: ['@radix-ui/react-scroll-area'],
    },
    examples: [
      {
        title: 'Scrollable Content',
        code: `import { ScrollArea } from '@framingui/ui';\n\n<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">\n  Long scrollable content here...\n</ScrollArea>`,
        description: 'Scrollable container with custom scrollbar',
      },
    ],
    accessibility: 'Native scrollbar behavior preservation. Touch support for mobile.',
  },

  form: {
    props: [
      {
        name: 'control',
        type: 'Control<TFieldValues>',
        required: true,
        description: 'react-hook-form control object (via FormProvider)',
      },
    ],
    subComponents: [
      'FormField',
      'FormItem',
      'FormLabel',
      'FormControl',
      'FormDescription',
      'FormMessage',
    ],
    dependencies: {
      internal: [],
      external: ['react-hook-form', '@radix-ui/react-label', '@radix-ui/react-slot'],
    },
    examples: [
      {
        title: 'Basic Form',
        code: `import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@framingui/ui';\nimport { useForm } from 'react-hook-form';\n\nconst form = useForm();\n\n<Form {...form}>\n  <FormField\n    control={form.control}\n    name="username"\n    render={({ field }) => (\n      <FormItem>\n        <FormLabel>Username</FormLabel>\n        <FormControl>\n          <Input {...field} />\n        </FormControl>\n        <FormMessage />\n      </FormItem>\n    )}\n  />\n</Form>`,
        description: 'Form with validation and error messages',
      },
    ],
    accessibility:
      'aria-describedby for descriptions and errors. aria-invalid for validation. Focus management.',
  },

  select: {
    props: [
      {
        name: 'value',
        type: 'string',
        required: false,
        description: 'Selected value',
      },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        required: false,
        description: 'Change callback',
      },
      {
        name: 'defaultValue',
        type: 'string',
        required: false,
        description: 'Initial value',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Disabled state',
      },
    ],
    subComponents: [
      'SelectTrigger',
      'SelectContent',
      'SelectValue',
      'SelectGroup',
      'SelectLabel',
      'SelectItem',
      'SelectSeparator',
    ],
    dependencies: {
      internal: [],
      external: ['@radix-ui/react-select', 'lucide-react'],
    },
    examples: [
      {
        title: 'Basic Select',
        code: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@framingui/ui';\n\n<Select>\n  <SelectTrigger className="w-[180px]">\n    <SelectValue placeholder="Select a fruit" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="apple">Apple</SelectItem>\n    <SelectItem value="banana">Banana</SelectItem>\n  </SelectContent>\n</Select>`,
        description: 'Select dropdown with options',
      },
    ],
    accessibility: 'Full keyboard navigation. Focus trap within dropdown. ARIA roles and states.',
  },

  // 기존 dialog 데이터 (preview-component에서 이전)
  dialog: {
    props: [
      {
        name: 'open',
        type: 'boolean',
        required: false,
        description: 'Controlled open state',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        required: false,
        description: 'Callback when open state changes',
      },
    ],
    subComponents: [
      'DialogTrigger',
      'DialogContent',
      'DialogHeader',
      'DialogTitle',
      'DialogDescription',
      'DialogFooter',
      'DialogClose',
    ],
    dependencies: {
      internal: [],
      external: ['@radix-ui/react-dialog'],
    },
    examples: [
      {
        title: 'Basic Dialog',
        code: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@framingui/ui';\n\n<Dialog>\n  <DialogTrigger asChild>\n    <Button>Open</Button>\n  </DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Dialog Title</DialogTitle>\n    </DialogHeader>\n  </DialogContent>\n</Dialog>`,
        description: 'Modal dialog with trigger button',
      },
    ],
    accessibility: 'Focus trap, ESC to close, ARIA dialog role',
  },
};

/**
 * 컴포넌트 ID로 props 데이터 조회
 */
export function getComponentPropsData(componentId: string): ComponentPropsData | undefined {
  return COMPONENT_PROPS_DATA[componentId];
}

/**
 * 모든 컴포넌트 props 데이터가 있는 컴포넌트 ID 목록 반환
 */
export function getComponentIdsWithProps(): string[] {
  return Object.keys(COMPONENT_PROPS_DATA);
}
