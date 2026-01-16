# Tier 1: Basic Interaction Components

Fundamental UI interaction hooks with keyboard and mouse support.

## Table of Contents

- [useButton](#usebutton) - Button with toggle mode and keyboard support
- [useInput](#useinput) - Text input with validation and focus state
- [useCheckbox](#usecheckbox) - Checkbox with indeterminate state
- [useRadio](#useradio) - Radio button with group navigation
- [useToggle](#usetoggle) - Toggle/switch with on/off state

---

## useButton

Headless button hook with accessibility, keyboard navigation, and toggle mode support.

### Features

- ✅ Controlled and uncontrolled modes
- ✅ Toggle button support (aria-pressed)
- ✅ Keyboard support (Enter, Space)
- ✅ Disabled state handling
- ✅ Full ARIA attributes

### Type Signature

```typescript
function useButton(props?: UseButtonProps): UseButtonReturn

interface UseButtonProps {
  disabled?: boolean;
  toggle?: boolean;
  pressed?: boolean; // Controlled
  defaultPressed?: boolean; // Uncontrolled
  onPressedChange?: (pressed: boolean) => void;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

interface UseButtonReturn {
  buttonProps: {
    role: "button";
    tabIndex: number;
    disabled: boolean;
    "aria-disabled": boolean;
    "aria-pressed"?: boolean;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
    onClick: ClickHandler;
    onKeyDown: KeyboardHandler;
  };
  isPressed: boolean;
  isDisabled: boolean;
}
```

### Usage

#### Basic Button

```tsx
import { useButton } from '@tekton/headless-components';

function BasicButton() {
  const { buttonProps } = useButton({
    onClick: () => alert('Clicked!'),
  });

  return (
    <button {...buttonProps} className="my-button">
      Click Me
    </button>
  );
}
```

#### Toggle Button

```tsx
function ToggleButton() {
  const { buttonProps, isPressed } = useButton({
    toggle: true,
    defaultPressed: false,
    onPressedChange: (pressed) => console.log('Pressed:', pressed),
  });

  return (
    <button {...buttonProps} className={isPressed ? 'pressed' : ''}>
      {isPressed ? 'ON' : 'OFF'}
    </button>
  );
}
```

#### Controlled Toggle

```tsx
function ControlledToggle() {
  const [pressed, setPressed] = useState(false);

  const { buttonProps } = useButton({
    toggle: true,
    pressed,
    onPressedChange: setPressed,
  });

  return (
    <button {...buttonProps}>
      {pressed ? 'Enabled' : 'Disabled'}
    </button>
  );
}
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Trigger onClick |
| `Space` | Trigger onClick |

### ARIA Attributes

- `role="button"` - Identifies element as button
- `aria-disabled` - Indicates disabled state
- `aria-pressed` - Toggle state (toggle mode only)
- `tabIndex` - Focusability (0 when enabled, -1 when disabled)

---

## useInput

Headless input hook with validation, focus state, and controlled/uncontrolled modes.

### Features

- ✅ Controlled and uncontrolled modes
- ✅ Validation state (invalid, required)
- ✅ Focus state management
- ✅ Disabled and read-only states
- ✅ Reset functionality
- ✅ Full ARIA attributes

### Type Signature

```typescript
function useInput(props?: UseInputProps): UseInputReturn

interface UseInputProps {
  value?: string; // Controlled
  defaultValue?: string; // Uncontrolled
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

interface UseInputReturn {
  inputProps: {
    value: string;
    disabled: boolean;
    readOnly: boolean;
    "aria-invalid": boolean;
    "aria-required"?: boolean;
    "aria-describedby"?: string;
    "aria-labelledby"?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus: FocusHandler;
    onBlur: FocusHandler;
  };
  value: string;
  setValue: (value: string) => void;
  isInvalid: boolean;
  isFocused: boolean;
  reset: () => void;
}
```

### Usage

#### Basic Input

```tsx
import { useInput } from '@tekton/headless-components';

function BasicInput() {
  const { inputProps, value } = useInput({
    defaultValue: '',
    onChange: (val) => console.log('Value:', val),
  });

  return (
    <div>
      <label htmlFor="name-input">Name</label>
      <input {...inputProps} id="name-input" type="text" />
      <p>Current value: {value}</p>
    </div>
  );
}
```

#### Input with Validation

```tsx
function ValidatedInput() {
  const [value, setValue] = useState('');
  const isValid = value.length >= 3;

  const { inputProps, isInvalid } = useInput({
    value,
    onChange: setValue,
    invalid: !isValid,
    required: true,
    'aria-describedby': 'error-message',
  });

  return (
    <div>
      <input {...inputProps} type="text" />
      {isInvalid && (
        <span id="error-message" role="alert">
          Must be at least 3 characters
        </span>
      )}
    </div>
  );
}
```

#### Controlled Input with Reset

```tsx
function ResetableInput() {
  const { inputProps, value, reset } = useInput({
    defaultValue: 'Initial value',
  });

  return (
    <div>
      <input {...inputProps} type="text" />
      <button onClick={reset}>Reset</button>
      <p>Value: {value}</p>
    </div>
  );
}
```

### ARIA Attributes

- `aria-invalid` - Indicates validation state
- `aria-required` - Indicates required field
- `aria-describedby` - Associates error messages
- `aria-labelledby` - Associates labels

---

## useCheckbox

Headless checkbox hook with indeterminate state and keyboard support.

### Features

- ✅ Controlled and uncontrolled modes
- ✅ Indeterminate state support
- ✅ Keyboard support (Space)
- ✅ Disabled state handling
- ✅ Full ARIA attributes

### Type Signature

```typescript
function useCheckbox(props?: UseCheckboxProps): UseCheckboxReturn

interface UseCheckboxProps {
  checked?: boolean; // Controlled
  defaultChecked?: boolean; // Uncontrolled
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  indeterminate?: boolean;
  onIndeterminateChange?: (indeterminate: boolean) => void;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

interface UseCheckboxReturn {
  checkboxProps: {
    id: string;
    role: "checkbox";
    checked: boolean;
    disabled: boolean;
    "aria-checked": boolean | "mixed";
    "aria-required"?: boolean;
    "aria-disabled": boolean;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
    tabIndex: number;
    onClick: ClickHandler;
    onKeyDown: KeyboardHandler;
  };
  isChecked: boolean;
  isIndeterminate: boolean;
  toggle: () => void;
}
```

### Usage

#### Basic Checkbox

```tsx
import { useCheckbox } from '@tekton/headless-components';

function BasicCheckbox() {
  const { checkboxProps, isChecked } = useCheckbox({
    defaultChecked: false,
    onChange: (checked) => console.log('Checked:', checked),
  });

  return (
    <div>
      <div {...checkboxProps} className="checkbox" />
      <label>Accept terms ({isChecked ? 'checked' : 'unchecked'})</label>
    </div>
  );
}
```

#### Indeterminate Checkbox (Select All)

```tsx
function SelectAllCheckbox() {
  const [items, setItems] = useState([
    { id: 1, checked: false },
    { id: 2, checked: true },
    { id: 3, checked: false },
  ]);

  const allChecked = items.every(item => item.checked);
  const someChecked = items.some(item => item.checked);

  const { checkboxProps } = useCheckbox({
    checked: allChecked,
    indeterminate: someChecked && !allChecked,
    onChange: (checked) => {
      setItems(items.map(item => ({ ...item, checked })));
    },
  });

  return (
    <div>
      <div {...checkboxProps} className="checkbox" />
      <label>Select All</label>
    </div>
  );
}
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Toggle checked state |

### ARIA Attributes

- `role="checkbox"` - Identifies element as checkbox
- `aria-checked` - Checked state (true, false, "mixed" for indeterminate)
- `aria-disabled` - Indicates disabled state
- `aria-required` - Indicates required field
- `tabIndex` - Focusability

---

## useRadio

Headless radio button hook with group navigation and keyboard support.

### Features

- ✅ Controlled and uncontrolled modes
- ✅ Radio group support
- ✅ Keyboard navigation (Arrow keys)
- ✅ Disabled state handling
- ✅ Full ARIA attributes

### Type Signature

```typescript
function useRadio(props: UseRadioProps): UseRadioReturn

interface UseRadioProps {
  value: string;
  checked?: boolean; // Controlled
  defaultChecked?: boolean; // Uncontrolled
  onChange?: (value: string) => void;
  disabled?: boolean;
  name: string; // Required for grouping
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

interface UseRadioReturn {
  radioProps: {
    role: "radio";
    checked: boolean;
    disabled: boolean;
    "aria-checked": boolean;
    "aria-disabled": boolean;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    tabIndex: number;
    onClick: ClickHandler;
    onKeyDown: KeyboardHandler;
  };
  isSelected: boolean;
}
```

### Usage

```tsx
import { useRadio } from '@tekton/headless-components';

function RadioGroup() {
  const [selected, setSelected] = useState('option1');

  const option1 = useRadio({
    value: 'option1',
    checked: selected === 'option1',
    onChange: setSelected,
    name: 'options',
  });

  const option2 = useRadio({
    value: 'option2',
    checked: selected === 'option2',
    onChange: setSelected,
    name: 'options',
  });

  return (
    <div role="radiogroup" aria-label="Options">
      <div>
        <div {...option1.radioProps} className="radio" />
        <label>Option 1</label>
      </div>
      <div>
        <div {...option2.radioProps} className="radio" />
        <label>Option 2</label>
      </div>
    </div>
  );
}
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Arrow Up/Down` | Navigate within radio group |
| `Arrow Left/Right` | Navigate within radio group |
| `Space` | Select focused radio button |

### ARIA Attributes

- `role="radio"` - Identifies element as radio button
- `aria-checked` - Selected state
- `aria-disabled` - Indicates disabled state
- `tabIndex` - Focusability (0 for selected, -1 for others)

---

## useToggle

Headless toggle/switch hook with on/off state and keyboard support.

### Features

- ✅ Controlled and uncontrolled modes
- ✅ On/off state management
- ✅ Keyboard support (Space, Enter)
- ✅ Disabled state handling
- ✅ Full ARIA attributes

### Type Signature

```typescript
function useToggle(props?: UseToggleProps): UseToggleReturn

interface UseToggleProps {
  on?: boolean; // Controlled
  defaultOn?: boolean; // Uncontrolled
  onChange?: (on: boolean) => void;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

interface UseToggleReturn {
  toggleProps: {
    role: "switch";
    "aria-checked": boolean;
    "aria-disabled": boolean;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    disabled: boolean;
    tabIndex: number;
    onClick: ClickHandler;
    onKeyDown: KeyboardHandler;
  };
  isOn: boolean;
  toggle: () => void;
}
```

### Usage

```tsx
import { useToggle } from '@tekton/headless-components';

function ThemeToggle() {
  const { toggleProps, isOn } = useToggle({
    defaultOn: false,
    onChange: (on) => {
      document.body.classList.toggle('dark-mode', on);
    },
  });

  return (
    <div>
      <button {...toggleProps} className="toggle-switch">
        <span className={`slider ${isOn ? 'on' : 'off'}`} />
      </button>
      <label>Dark Mode {isOn ? 'ON' : 'OFF'}</label>
    </div>
  );
}
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Toggle state |
| `Enter` | Toggle state |

### ARIA Attributes

- `role="switch"` - Identifies element as toggle switch
- `aria-checked` - On/off state
- `aria-disabled` - Indicates disabled state
- `tabIndex` - Focusability

---

**Last Updated**: 2026-01-16
**Version**: 1.0.0
