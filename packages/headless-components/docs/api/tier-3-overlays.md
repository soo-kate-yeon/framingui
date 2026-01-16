# Tier 3: Overlay Components

Overlay patterns with focus management, click-outside detection, and dismissal support.

## Table of Contents

- [useModal](#usemodal) - Modal dialog with focus trap
- [useTooltip](#usetooltip) - Tooltip with hover/focus trigger
- [useDropdownMenu](#usedropdownmenu) - Dropdown menu with keyboard navigation
- [useAlert](#usealert) - Alert notifications with variants
- [usePopover](#usepopover) - Popover with positioning

---

## useModal

Headless modal dialog hook with focus trap, keyboard support, and focus restoration.

### Features

- ✅ Controlled and uncontrolled modes
- ✅ Focus trap (prevents Tab escape)
- ✅ Focus restoration on close
- ✅ Escape key to close
- ✅ Click overlay to close (optional)
- ✅ Body scroll lock when open
- ✅ Full ARIA dialog pattern

### Usage

```tsx
import { useModal } from '@tekton/headless-components';

function ModalExample() {
  const { modalProps, overlayProps, closeButtonProps, isOpen, open, close } = useModal({
    closeOnEscape: true,
    closeOnOverlayClick: true,
    trapFocus: true,
    restoreFocus: true,
  });

  return (
    <>
      <button onClick={open}>Open Modal</button>

      {isOpen && (
        <>
          <div {...overlayProps} className="modal-overlay" />
          <div {...modalProps} className="modal">
            <h2 id="modal-title">Modal Title</h2>
            <p id="modal-description">Modal content goes here...</p>
            <button {...closeButtonProps}>Close</button>
          </div>
        </>
      )}
    </>
  );
}
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Escape` | Close modal |
| `Tab` | Move focus forward (trapped) |
| `Shift+Tab` | Move focus backward (trapped) |

### ARIA Attributes

- `role="dialog"` - Modal dialog
- `aria-modal="true"` - Indicates modal behavior
- `aria-labelledby` - Associates title
- `aria-describedby` - Associates description
- `tabIndex="-1"` - Makes modal focusable

---

## useTooltip

Headless tooltip hook with hover/focus triggers, positioning, and delay support.

### Features

- ✅ Controlled and uncontrolled modes
- ✅ Hover and focus triggers
- ✅ Delay support (show/hide)
- ✅ Positioning hints
- ✅ Full ARIA tooltip pattern

### Usage

```tsx
import { useTooltip } from '@tekton/headless-components';

function TooltipExample() {
  const { triggerProps, tooltipProps, isOpen } = useTooltip({
    content: 'Helpful tooltip text',
    delay: 200,
    position: 'top',
  });

  return (
    <div>
      <button {...triggerProps}>
        Hover me
      </button>
      {isOpen && (
        <div {...tooltipProps} className="tooltip">
          Helpful tooltip text
        </div>
      )}
    </div>
  );
}
```

### ARIA Attributes

- `role="tooltip"` - Tooltip element
- `aria-describedby` - Associates trigger with tooltip
- `id` - Unique identifier for tooltip

---

## useDropdownMenu

Headless dropdown menu hook with keyboard navigation and selection.

### Features

- ✅ Controlled and uncontrolled modes
- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Click outside to close
- ✅ Disabled menu items
- ✅ Full ARIA menu pattern

### Usage

```tsx
import { useDropdownMenu } from '@tekton/headless-components';

function DropdownExample() {
  const menuItems = [
    { id: 'edit', label: 'Edit', action: () => console.log('Edit') },
    { id: 'delete', label: 'Delete', action: () => console.log('Delete') },
    { id: 'share', label: 'Share', action: () => console.log('Share') },
  ];

  const { triggerProps, menuProps, itemProps, isOpen } = useDropdownMenu({
    items: menuItems,
    onSelect: (item) => item.action(),
  });

  return (
    <div>
      <button {...triggerProps}>
        Menu
      </button>
      {isOpen && (
        <ul {...menuProps} className="dropdown-menu">
          {menuItems.map(item => (
            <li key={item.id} {...itemProps(item)}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Arrow Up/Down` | Navigate menu items |
| `Enter` | Select focused item |
| `Escape` | Close menu |
| `Home` | Focus first item |
| `End` | Focus last item |

### ARIA Attributes

- `role="menu"` - Menu container
- `role="menuitem"` - Individual menu items
- `aria-expanded` - Open/closed state
- `aria-haspopup="menu"` - Indicates menu presence
- `aria-activedescendant` - Focused menu item

---

## useAlert

Headless alert hook with variants, dismissible state, and ARIA live regions.

### Features

- ✅ Alert variants (info, success, warning, error)
- ✅ Dismissible state
- ✅ ARIA live region support
- ✅ Auto-dismiss with timeout (optional)

### Usage

```tsx
import { useAlert } from '@tekton/headless-components';

function AlertExample() {
  const { alertProps, isDismissed, dismiss } = useAlert({
    variant: 'success',
    dismissible: true,
    onDismiss: () => console.log('Alert dismissed'),
  });

  if (isDismissed) {
    return null;
  }

  return (
    <div {...alertProps} className={`alert alert-${alertProps.variant}`}>
      <p>Operation completed successfully!</p>
      {alertProps.dismissible && (
        <button onClick={dismiss} aria-label="Close alert">
          ×
        </button>
      )}
    </div>
  );
}
```

### ARIA Attributes

- `role="alert"` - Alert notifications (assertive)
- `role="status"` - Status updates (polite)
- `aria-live="assertive"` - Immediate announcement
- `aria-live="polite"` - Queued announcement
- `aria-atomic="true"` - Announce entire alert

---

## usePopover

Headless popover hook with positioning, multiple triggers, and click-outside close.

### Features

- ✅ Controlled and uncontrolled modes
- ✅ Multiple triggers (hover, click, focus)
- ✅ Click outside to close
- ✅ Positioning support
- ✅ Full ARIA expanded pattern

### Usage

```tsx
import { usePopover } from '@tekton/headless-components';

function PopoverExample() {
  const { triggerProps, popoverProps, isOpen } = usePopover({
    trigger: 'click',
    position: 'bottom',
    closeOnClickOutside: true,
  });

  return (
    <div>
      <button {...triggerProps}>
        Show Popover
      </button>
      {isOpen && (
        <div {...popoverProps} className="popover">
          <h3>Popover Title</h3>
          <p>Popover content with interactive elements...</p>
        </div>
      )}
    </div>
  );
}
```

### ARIA Attributes

- `aria-expanded` - Open/closed state
- `aria-haspopup="dialog"` - Indicates popover presence
- `aria-controls` - Associates trigger with popover
- `id` - Unique identifier for popover

---

**Last Updated**: 2026-01-16
**Version**: 1.0.0
