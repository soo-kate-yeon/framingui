# API Reference

Comprehensive API documentation for all 20 headless component hooks.

## Hook Categories

Hooks are organized into four tiers based on complexity and functionality:

### [Tier 1: Basic Interaction Components](./tier-1-basic.md)

Fundamental UI interactions with keyboard and mouse support.

| Hook | Purpose | Key Features |
|------|---------|--------------|
| [useButton](./tier-1-basic.md#usebutton) | Button interactions | Toggle mode, keyboard (Enter/Space), disabled state |
| [useInput](./tier-1-basic.md#useinput) | Text input | Validation, focus state, controlled/uncontrolled |
| [useCheckbox](./tier-1-basic.md#usecheckbox) | Checkbox selection | Indeterminate state, keyboard (Space) |
| [useRadio](./tier-1-basic.md#useradio) | Radio selection | Group navigation (Arrow keys) |
| [useToggle](./tier-1-basic.md#usetoggle) | Toggle/switch | On/off state, keyboard (Space/Enter) |

**Common Patterns**:
- Controlled/uncontrolled state management
- Disabled state handling
- ARIA attributes for accessibility
- Keyboard event handling (Enter, Space)

---

### [Tier 2: Selection Components](./tier-2-selection.md)

Complex selection patterns with advanced keyboard navigation.

| Hook | Purpose | Key Features |
|------|---------|--------------|
| [useSelect](./tier-2-selection.md#useselect) | Dropdown selection | Keyboard navigation (Arrow/Enter/Escape), multi-select |
| [useTabs](./tier-2-selection.md#usetabs) | Tab navigation | Arrow keys, Home/End, active tab state |
| [useBreadcrumb](./tier-2-selection.md#usebreadcrumb) | Breadcrumb navigation | Current page indicator, navigation callbacks |
| [usePagination](./tier-2-selection.md#usepagination) | Page navigation | Next/prev/goTo, keyboard navigation |
| [useSlider](./tier-2-selection.md#useslider) | Range slider | Arrow key adjustment, min/max/step |

**Common Patterns**:
- Advanced keyboard navigation (Arrow keys, Home, End)
- Active/selected state management
- ARIA attributes (aria-selected, aria-current)
- Complex state updates with validation

---

### [Tier 3: Overlay Components](./tier-3-overlays.md)

Overlay patterns with focus management and dismissal.

| Hook | Purpose | Key Features |
|------|---------|--------------|
| [useModal](./tier-3-overlays.md#usemodal) | Modal dialogs | Focus trap, Escape key, focus restoration |
| [useTooltip](./tier-3-overlays.md#usetooltip) | Tooltips | Hover/focus trigger, positioning, delay |
| [useDropdownMenu](./tier-3-overlays.md#usedropdownmenu) | Dropdown menus | Keyboard navigation, selection, click outside |
| [useAlert](./tier-3-overlays.md#usealert) | Alert notifications | Variants (info/success/warning/error), dismissible |
| [usePopover](./tier-3-overlays.md#usepopover) | Popovers | Multiple triggers, click outside, positioning |

**Common Patterns**:
- Focus trap and restoration
- Click outside detection
- Escape key to close
- ARIA attributes (aria-modal, aria-expanded, aria-live)
- Overlay and content separation

---

### [Tier 4: Display Components](./tier-4-display.md)

Display-focused components with minimal state management.

| Hook | Purpose | Key Features |
|------|---------|--------------|
| [useCard](./tier-4-display.md#usecard) | Card containers | Selection, interactive mode |
| [useAvatar](./tier-4-display.md#useavatar) | Avatar images | Image loading, fallback |
| [useBadge](./tier-4-display.md#usebadge) | Badges | Count display, max value, showZero |
| [useDivider](./tier-4-display.md#usedivider) | Dividers | Orientation (horizontal/vertical), decorative |
| [useProgress](./tier-4-display.md#useprogress) | Progress indicators | Determinate/indeterminate modes, percentage |

**Common Patterns**:
- Minimal state management
- Visual state indicators
- ARIA attributes for semantic meaning
- Lightweight implementations

---

## Common Hook Patterns

### Controlled vs Uncontrolled

All stateful hooks support both modes:

```tsx
// Uncontrolled (hook manages state internally)
const { value } = useInput({ defaultValue: 'initial' });

// Controlled (external state management)
const [value, setValue] = useState('initial');
const { inputProps } = useInput({
  value,
  onChange: (newValue) => setValue(newValue)
});
```

### ARIA Attributes

All hooks provide appropriate ARIA attributes:

```tsx
const { buttonProps } = useButton({
  'aria-label': 'Close dialog',
  'aria-describedby': 'description-id'
});

// buttonProps includes:
// - role="button"
// - aria-disabled
// - aria-pressed (toggle mode)
// - tabIndex
```

### Keyboard Navigation

Hooks handle keyboard events automatically:

```tsx
const { buttonProps } = useButton({
  onClick: () => console.log('Clicked!')
});

// Pressing Enter or Space will trigger onClick
// No additional keyboard handling needed
```

### TypeScript Types

Full type definitions for all hooks:

```tsx
import type {
  UseButtonProps,
  UseButtonReturn,
  UseModalProps,
  UseModalReturn,
} from '@tekton/headless-components';
```

---

## Hook Return Value Patterns

### Props Objects

Hooks return props objects to spread on elements:

```tsx
const { buttonProps, modalProps, overlayProps } = useModal();

return (
  <>
    <button {...buttonProps}>Open</button>
    <div {...overlayProps} />
    <div {...modalProps}>Content</div>
  </>
);
```

### State Values

Hooks expose state values directly:

```tsx
const { isOpen, isPressed, value, isDisabled } = useButton();
```

### Action Functions

Hooks provide action functions:

```tsx
const { open, close, toggle, reset } = useModal();
```

---

## Accessibility Reference

### Keyboard Shortcuts

Common keyboard patterns across hooks:

| Key | Action | Used By |
|-----|--------|---------|
| `Enter` | Activate/submit | Button, Select, Radio, Tabs |
| `Space` | Activate/toggle | Button, Checkbox, Toggle, Slider |
| `Escape` | Close/cancel | Modal, Dropdown, Select, Popover |
| `Arrow Up/Down` | Navigate vertically | Select, Dropdown, Radio, Slider |
| `Arrow Left/Right` | Navigate horizontally | Tabs, Slider, Pagination |
| `Home` | First item | Tabs, Select, Dropdown |
| `End` | Last item | Tabs, Select, Dropdown |
| `Tab` | Move focus forward | All interactive components |
| `Shift+Tab` | Move focus backward | All interactive components |

### ARIA Roles

Common ARIA roles used:

- `button` - Button, interactive cards
- `checkbox` - Checkbox
- `radio` - Radio button
- `switch` - Toggle
- `combobox` - Select dropdown
- `listbox` - Select options
- `option` - Individual select option
- `tablist` / `tab` / `tabpanel` - Tabs
- `dialog` - Modal
- `menu` / `menuitem` - Dropdown menu
- `alert` / `alertdialog` - Alerts
- `tooltip` - Tooltip
- `separator` - Divider
- `progressbar` - Progress indicator
- `status` - Badge

### ARIA Attributes

Common ARIA attributes provided:

- `aria-disabled` - Disabled state
- `aria-pressed` - Toggle button state
- `aria-checked` - Checkbox/radio/switch state
- `aria-selected` - Selected state (tabs, options)
- `aria-expanded` - Expanded state (dropdowns, accordions)
- `aria-hidden` - Hidden from screen readers
- `aria-modal` - Modal dialog
- `aria-live` - Live region updates
- `aria-label` - Accessible label
- `aria-labelledby` - Label reference
- `aria-describedby` - Description reference
- `aria-controls` - Controlled element reference
- `aria-current` - Current item indicator

---

## Performance Optimization

All hooks use React optimization patterns:

- `useCallback` for stable event handler references
- `useMemo` for memoized derived state
- Minimal re-renders through controlled state updates
- Efficient event listener cleanup

---

## Testing Reference

Hooks are tested with:

- **Unit Tests**: 550+ tests covering all hooks
- **ARIA Validation**: 100% ARIA attribute coverage
- **Keyboard Tests**: All keyboard interactions validated
- **State Tests**: Controlled and uncontrolled modes
- **Focus Tests**: Focus trap and restoration
- **Edge Cases**: Boundary conditions, rapid updates, memory leaks

---

## Version Compatibility

- **React**: 19.x (recommended), 18.x (supported)
- **TypeScript**: 5.9+ (strict mode)
- **Node**: 18+ (development)

---

**Last Updated**: 2026-01-16
**Version**: 1.0.0
