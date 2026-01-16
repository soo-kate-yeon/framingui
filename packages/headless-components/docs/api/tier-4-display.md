# Tier 4: Display Components

Display-focused components with minimal state management and semantic markup.

## Table of Contents

- [useCard](#usecard) - Card containers with selection
- [useAvatar](#useavatar) - Avatar with image loading
- [useBadge](#usebadge) - Badge with count display
- [useDivider](#usedivider) - Divider with orientation
- [useProgress](#useprogress) - Progress indicator

---

## useCard

Headless card hook with selection and interactive mode support.

### Features

- ✅ Selectable cards
- ✅ Interactive mode (clickable)
- ✅ Keyboard support (Enter/Space)
- ✅ Full ARIA attributes

### Usage

```tsx
import { useCard } from '@tekton/headless-components';

function SelectableCard() {
  const { cardProps, isSelected } = useCard({
    interactive: true,
    defaultSelected: false,
    onSelect: () => console.log('Card selected'),
  });

  return (
    <div {...cardProps} className={`card ${isSelected ? 'selected' : ''}`}>
      <h3>Card Title</h3>
      <p>Card content...</p>
    </div>
  );
}
```

### ARIA Attributes

- `role="article"` - Semantic card container
- `role="region"` - Interactive card container
- `aria-selected` - Selection state (for selectable cards)
- `tabIndex` - Focusability (interactive mode)

---

## useAvatar

Headless avatar hook with image loading and fallback support.

### Features

- ✅ Image loading state
- ✅ Fallback display on error
- ✅ Full ARIA attributes

### Usage

```tsx
import { useAvatar } from '@tekton/headless-components';

function Avatar({ src, name }) {
  const { avatarProps, imageProps, isLoaded, showFallback } = useAvatar({
    src,
    alt: name,
    onImageLoad: () => console.log('Image loaded'),
    onImageError: () => console.log('Image failed'),
  });

  return (
    <div {...avatarProps} className="avatar">
      {!showFallback && <img {...imageProps} />}
      {showFallback && <span>{name[0]}</span>}
    </div>
  );
}
```

### ARIA Attributes

- `role="img"` - Image role
- `aria-label` - Alternative text for avatar

---

## useBadge

Headless badge hook with count display and max value support.

### Features

- ✅ Count display
- ✅ Max value truncation (e.g., "99+")
- ✅ Show zero option
- ✅ Full ARIA attributes

### Usage

```tsx
import { useBadge } from '@tekton/headless-components';

function NotificationBadge() {
  const { badgeProps, displayValue } = useBadge({
    count: 150,
    max: 99,
    showZero: false,
  });

  return (
    <div className="icon-with-badge">
      <BellIcon />
      {displayValue && (
        <span {...badgeProps} className="badge">
          {displayValue}
        </span>
      )}
    </div>
  );
}
```

### ARIA Attributes

- `role="status"` - Status indicator
- `aria-label` - Descriptive label (e.g., "150 unread notifications")

---

## useDivider

Headless divider hook with orientation and decorative mode.

### Features

- ✅ Horizontal and vertical orientation
- ✅ Decorative vs semantic modes
- ✅ Full ARIA attributes

### Usage

```tsx
import { useDivider } from '@tekton/headless-components';

function Section() {
  const { dividerProps } = useDivider({
    orientation: 'horizontal',
    decorative: false,
  });

  return (
    <div>
      <section>Section 1 content</section>
      <hr {...dividerProps} className="divider" />
      <section>Section 2 content</section>
    </div>
  );
}
```

### ARIA Attributes

- `role="separator"` - Semantic divider
- `aria-orientation` - Horizontal or vertical
- `aria-hidden="true"` - Decorative mode (hidden from screen readers)

---

## useProgress

Headless progress indicator hook with determinate and indeterminate modes.

### Features

- ✅ Determinate progress (percentage)
- ✅ Indeterminate progress (loading)
- ✅ Min/max value support
- ✅ Full ARIA attributes

### Usage

#### Determinate Progress

```tsx
import { useProgress } from '@tekton/headless-components';

function UploadProgress({ value }) {
  const { progressProps, percentage } = useProgress({
    value,
    max: 100,
    min: 0,
  });

  return (
    <div>
      <div {...progressProps} className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
      <span>{percentage}% complete</span>
    </div>
  );
}
```

#### Indeterminate Progress

```tsx
function LoadingSpinner() {
  const { progressProps, isIndeterminate } = useProgress({
    indeterminate: true,
  });

  return (
    <div {...progressProps} className="spinner">
      Loading...
    </div>
  );
}
```

### ARIA Attributes

- `role="progressbar"` - Progress indicator
- `aria-valuenow` - Current value (determinate)
- `aria-valuemin` - Minimum value
- `aria-valuemax` - Maximum value
- `aria-valuetext` - Human-readable value
- `aria-busy="true"` - Indeterminate mode

---

**Last Updated**: 2026-01-16
**Version**: 1.0.0
