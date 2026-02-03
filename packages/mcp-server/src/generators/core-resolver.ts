/**
 * Core Resolver for Tier 1 Export
 * SPEC-COMPONENT-001-D: Hybrid Export System
 *
 * Tier 1: UI 라이브러리에서 컴포넌트 코드를 직접 가져옴
 * - @tekton/ui 패키지의 실제 구현을 참조
 * - 사전 정의된 컴포넌트 템플릿 제공
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 컴포넌트 해결 결과 타입
 */
export interface ComponentResolutionResult {
  success: boolean;
  code?: string;
  componentName?: string;
  source?: 'tier1-ui' | 'tier1-example' | 'tier2-llm';
  error?: string;
}

/**
 * Tier 1 예제 컴포넌트
 * @tekton/ui 컴포넌트를 사용하는 예제 코드
 */
const TIER1_EXAMPLES: Record<string, string> = {
  Button: `import { Button } from '@tekton/ui';

export function ButtonExample() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}`,

  Input: `import { Input } from '@tekton/ui';

export function InputExample() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <Input placeholder="Enter text..." />
      <Input type="email" placeholder="Email address" />
      <Input type="password" placeholder="Password" />
      <Input disabled placeholder="Disabled input" />
    </div>
  );
}`,

  Card: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@tekton/ui';
import { Button } from '@tekton/ui';

export function CardExample() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with any components</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}`,

  Avatar: `import { Avatar, AvatarImage, AvatarFallback } from '@tekton/ui';

export function AvatarExample() {
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  );
}`,

  Badge: `import { Badge } from '@tekton/ui';

export function BadgeExample() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}`,

  Checkbox: `import { Checkbox } from '@tekton/ui';

export function CheckboxExample() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label htmlFor="terms">Accept terms and conditions</label>
    </div>
  );
}`,

  Progress: `import { Progress } from '@tekton/ui';

export function ProgressExample() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Progress value={33} />
      <Progress value={66} />
      <Progress value={100} />
    </div>
  );
}`,

  Switch: `import { Switch } from '@tekton/ui';

export function SwitchExample() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode">Airplane Mode</label>
    </div>
  );
}`,

  Slider: `import { Slider } from '@tekton/ui';

export function SliderExample() {
  return (
    <div className="w-full max-w-md">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  );
}`,

  Modal: `import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
} from '@tekton/ui';
import { Button } from '@tekton/ui';

export function ModalExample() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            Modal description text goes here.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p>Modal content</p>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <Button>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}`,

  Dropdown: `import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from '@tekton/ui';
import { Button } from '@tekton/ui';

export function DropdownExample() {
  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Logout</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}`,

  Tabs: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@tekton/ui';

export function TabsExample() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p>Account settings content</p>
      </TabsContent>
      <TabsContent value="password">
        <p>Password settings content</p>
      </TabsContent>
    </Tabs>
  );
}`,

  Table: `import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@tekton/ui';

export function TableExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`,

  Form: `import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@tekton/ui';
import { Input } from '@tekton/ui';
import { Button } from '@tekton/ui';

export function FormExample() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormField>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="Enter email" />
        </FormControl>
        <FormMessage>Please enter a valid email</FormMessage>
      </FormField>
      <FormField>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Enter password" />
        </FormControl>
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  );
}`,

  Text: `import { Text } from '@tekton/ui';

export function TextExample() {
  return (
    <div className="space-y-2">
      <Text variant="default">Default text</Text>
      <Text variant="muted">Muted text</Text>
      <Text variant="lead">Lead text for emphasis</Text>
      <Text variant="large">Large text</Text>
      <Text variant="small">Small text</Text>
    </div>
  );
}`,

  Heading: `import { Heading } from '@tekton/ui';

export function HeadingExample() {
  return (
    <div className="space-y-4">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
    </div>
  );
}`,

  Link: `import { Link } from '@tekton/ui';

export function LinkExample() {
  return (
    <div className="space-y-2">
      <Link href="#">Default link</Link>
      <Link href="#" variant="muted">Muted link</Link>
    </div>
  );
}`,

  List: `import { List, ListItem } from '@tekton/ui';

export function ListExample() {
  return (
    <List>
      <ListItem>First item</ListItem>
      <ListItem>Second item</ListItem>
      <ListItem>Third item</ListItem>
    </List>
  );
}`,

  Image: `import { Image } from '@tekton/ui';

export function ImageExample() {
  return (
    <Image
      src="https://via.placeholder.com/300x200"
      alt="Placeholder image"
      className="rounded-md"
    />
  );
}`,

  RadioGroup: `import { RadioGroup, RadioGroupItem } from '@tekton/ui';

export function RadioGroupExample() {
  return (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <label htmlFor="option-1">Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <label htmlFor="option-2">Option 2</label>
      </div>
    </RadioGroup>
  );
}`,
};

/**
 * @tekton/ui에서 지원하는 컴포넌트 목록
 */
export const TIER1_COMPONENTS = Object.keys(TIER1_EXAMPLES);

/**
 * Tier 1 컴포넌트인지 확인
 */
export function isTier1Component(componentName: string): boolean {
  return TIER1_COMPONENTS.includes(componentName);
}

/**
 * Tier 1 예제 코드 가져오기
 *
 * @param componentName - 컴포넌트 이름
 * @returns 해당 컴포넌트의 예제 코드
 */
export function getTier1Example(componentName: string): ComponentResolutionResult {
  const example = TIER1_EXAMPLES[componentName];

  if (!example) {
    return {
      success: false,
      error: `No Tier 1 example found for component: ${componentName}`,
    };
  }

  return {
    success: true,
    code: example,
    componentName,
    source: 'tier1-example',
  };
}

/**
 * @tekton/ui 패키지에서 실제 컴포넌트 소스 코드 가져오기
 *
 * @param componentName - 컴포넌트 이름
 * @returns 컴포넌트 소스 코드
 */
export function getTier1Source(componentName: string): ComponentResolutionResult {
  try {
    // @tekton/ui 패키지 경로 탐색
    const uiPackagePath = resolve(__dirname, '../../../../ui/src');

    // 컴포넌트 파일 매핑
    const componentPaths: Record<string, string> = {
      Button: 'primitives/button.tsx',
      Input: 'primitives/input.tsx',
      Checkbox: 'primitives/checkbox.tsx',
      Switch: 'primitives/switch.tsx',
      Slider: 'primitives/slider.tsx',
      Progress: 'primitives/progress.tsx',
      Avatar: 'primitives/avatar.tsx',
      Badge: 'primitives/badge.tsx',
      Text: 'primitives/text.tsx',
      Heading: 'primitives/heading.tsx',
      Link: 'primitives/link.tsx',
      List: 'primitives/list.tsx',
      Image: 'primitives/image.tsx',
      Radio: 'primitives/radio.tsx',
      RadioGroup: 'primitives/radio.tsx',
      Card: 'components/card.tsx',
      Modal: 'components/modal.tsx',
      Dropdown: 'components/dropdown.tsx',
      Form: 'components/form.tsx',
      Tabs: 'components/tabs.tsx',
      Table: 'components/table.tsx',
    };

    const relativePath = componentPaths[componentName];
    if (!relativePath) {
      return {
        success: false,
        error: `Component not found in mapping: ${componentName}`,
      };
    }

    const fullPath = resolve(uiPackagePath, relativePath);

    if (!existsSync(fullPath)) {
      return {
        success: false,
        error: `Component source file not found: ${fullPath}`,
      };
    }

    const sourceCode = readFileSync(fullPath, 'utf-8');

    return {
      success: true,
      code: sourceCode,
      componentName,
      source: 'tier1-ui',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error reading component source',
    };
  }
}

/**
 * Tier 1에서 컴포넌트 해결 (예제 우선, 소스 fallback)
 *
 * @param componentName - 컴포넌트 이름
 * @param preferSource - true면 소스 코드 우선, false면 예제 우선
 * @returns 컴포넌트 해결 결과
 */
export function resolveFromTier1(
  componentName: string,
  preferSource = false
): ComponentResolutionResult {
  if (!isTier1Component(componentName)) {
    return {
      success: false,
      error: `Component "${componentName}" is not a Tier 1 component. Available: ${TIER1_COMPONENTS.join(', ')}`,
    };
  }

  if (preferSource) {
    const sourceResult = getTier1Source(componentName);
    if (sourceResult.success) {
      return sourceResult;
    }
    // Fallback to example
    return getTier1Example(componentName);
  }

  // Default: example first
  return getTier1Example(componentName);
}

/**
 * 여러 컴포넌트 해결
 *
 * @param componentNames - 컴포넌트 이름 배열
 * @returns 각 컴포넌트의 해결 결과
 */
export function resolveMultipleFromTier1(
  componentNames: string[]
): Map<string, ComponentResolutionResult> {
  const results = new Map<string, ComponentResolutionResult>();

  for (const name of componentNames) {
    results.set(name, resolveFromTier1(name));
  }

  return results;
}
