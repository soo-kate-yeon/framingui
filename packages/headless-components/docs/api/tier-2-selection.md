# Tier 2: Selection Components

Complex selection patterns with advanced keyboard navigation and ARIA compliance.

## Table of Contents

- [useSelect](#useselect) - Dropdown select with keyboard navigation
- [useTabs](#usetabs) - Tab list with arrow key navigation
- [useBreadcrumb](#usebreadcrumb) - Breadcrumb navigation
- [usePagination](#usepagination) - Page navigation with controls
- [useSlider](#useslider) - Range slider with keyboard adjustment

---

## useSelect

Headless select/dropdown hook with keyboard navigation and accessibility.

### Features

- ✅ Controlled and uncontrolled modes
- ✅ Keyboard navigation (Arrow keys, Enter, Escape, Home, End)
- ✅ Single and multi-select support
- ✅ Search/filter functionality
- ✅ Full ARIA combobox pattern

### Usage

```tsx
import { useSelect } from '@tekton/headless-components';

function BasicSelect() {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  const { triggerProps, menuProps, optionProps, isOpen, selectedValue } = useSelect({
    options,
    defaultValue: '1',
    onSelect: (value) => console.log('Selected:', value),
  });

  return (
    <div>
      <button {...triggerProps}>
        {options.find(opt => opt.value === selectedValue)?.label || 'Select...'}
      </button>
      {isOpen && (
        <ul {...menuProps}>
          {options.map(option => (
            <li key={option.value} {...optionProps(option)}>
              {option.label}
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
| `Arrow Up/Down` | Navigate options |
| `Enter` | Select focused option |
| `Escape` | Close dropdown |
| `Home` | Focus first option |
| `End` | Focus last option |
| `Space` | Open dropdown / Select option |

### ARIA Attributes

- `role="combobox"` - Trigger button
- `role="listbox"` - Options container
- `role="option"` - Individual options
- `aria-expanded` - Open/closed state
- `aria-activedescendant` - Currently focused option
- `aria-controls` - Associates trigger with listbox
- `aria-selected` - Selected option state

---

## useTabs

Headless tabs hook with keyboard navigation and active tab management.

### Features

- ✅ Controlled and uncontrolled modes
- ✅ Keyboard navigation (Arrow keys, Home, End)
- ✅ Disabled tabs support
- ✅ Automatic vs manual activation
- ✅ Full ARIA tab pattern

### Usage

```tsx
import { useTabs } from '@tekton/headless-components';

function BasicTabs() {
  const tabs = [
    { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Content 3' },
  ];

  const { tabListProps, tabProps, tabPanelProps, activeTab } = useTabs({
    defaultActiveTab: 'tab1',
    onTabChange: (tabId) => console.log('Active tab:', tabId),
  });

  return (
    <div>
      <div {...tabListProps}>
        {tabs.map(tab => (
          <button key={tab.id} {...tabProps(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map(tab => (
        <div key={tab.id} {...tabPanelProps(tab.id)}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Arrow Left/Right` | Navigate between tabs |
| `Home` | Focus first tab |
| `End` | Focus last tab |
| `Enter/Space` | Activate focused tab |

### ARIA Attributes

- `role="tablist"` - Tab container
- `role="tab"` - Individual tabs
- `role="tabpanel"` - Content panels
- `aria-selected` - Active tab
- `aria-controls` - Associates tab with panel
- `tabIndex` - Focus management

---

## useBreadcrumb

Headless breadcrumb navigation hook with current page indicator.

### Usage

```tsx
import { useBreadcrumb } from '@tekton/headless-components';

function Breadcrumb() {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Item', href: '/products/category/item' },
  ];

  const { navProps, itemProps, isCurrentPage } = useBreadcrumb({
    items,
    currentIndex: items.length - 1,
  });

  return (
    <nav {...navProps}>
      <ol>
        {items.map((item, index) => (
          <li key={index} {...itemProps(index)}>
            {isCurrentPage(index) ? (
              <span>{item.label}</span>
            ) : (
              <a href={item.href}>{item.label}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

### ARIA Attributes

- `role="navigation"` - Navigation container
- `aria-label="Breadcrumb"` - Identifies navigation type
- `aria-current="page"` - Current page indicator

---

## usePagination

Headless pagination hook with page navigation and keyboard support.

### Usage

```tsx
import { usePagination } from '@tekton/headless-components';

function Pagination() {
  const { paginationProps, currentPage, goToPage, nextPage, prevPage, totalPages } = usePagination({
    totalItems: 100,
    pageSize: 10,
    defaultPage: 1,
    onPageChange: (page) => console.log('Page:', page),
  });

  return (
    <nav {...paginationProps}>
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </nav>
  );
}
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Arrow Left` | Previous page |
| `Arrow Right` | Next page |

### ARIA Attributes

- `role="navigation"` - Navigation container
- `aria-label="Pagination"` - Identifies navigation type
- `aria-current="page"` - Current page indicator

---

## useSlider

Headless slider hook with range control and keyboard adjustment.

### Usage

```tsx
import { useSlider } from '@tekton/headless-components';

function VolumeSlider() {
  const { sliderProps, thumbProps, value, setValue } = useSlider({
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    onChange: (val) => console.log('Volume:', val),
  });

  return (
    <div>
      <label>Volume: {value}%</label>
      <div {...sliderProps} className="slider-track">
        <div {...thumbProps} className="slider-thumb" />
      </div>
    </div>
  );
}
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Arrow Left/Down` | Decrease value |
| `Arrow Right/Up` | Increase value |
| `Home` | Set to minimum value |
| `End` | Set to maximum value |
| `Page Up` | Increase by large step |
| `Page Down` | Decrease by large step |

### ARIA Attributes

- `role="slider"` - Slider element
- `aria-valuemin` - Minimum value
- `aria-valuemax` - Maximum value
- `aria-valuenow` - Current value
- `aria-valuetext` - Human-readable value
- `aria-orientation` - Horizontal or vertical

---

**Last Updated**: 2026-01-16
**Version**: 1.0.0
