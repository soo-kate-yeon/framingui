# Usage Examples

Comprehensive examples demonstrating common patterns and advanced use cases for headless components.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Styling Integration](#styling-integration)
- [Advanced Patterns](#advanced-patterns)
- [Form Integration](#form-integration)
- [Accessibility Examples](#accessibility-examples)

---

## Basic Usage

### Simple Button with State

```tsx
import { useButton } from '@tekton/headless-components';

function LikeButton() {
  const { buttonProps, isPressed } = useButton({
    toggle: true,
    'aria-label': 'Like this post',
  });

  return (
    <button {...buttonProps} className="like-button">
      {isPressed ? '❤️ Liked' : '🤍 Like'}
    </button>
  );
}
```

### Input with Live Validation

```tsx
import { useInput } from '@tekton/headless-components';
import { useState } from 'react';

function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { inputProps } = useInput({
    value: email,
    onChange: (value) => {
      setEmail(value);
      if (!value) {
        setError('Email is required');
      } else if (!isValidEmail) {
        setError('Invalid email format');
      } else {
        setError('');
      }
    },
    invalid: !!error,
    'aria-describedby': error ? 'email-error' : undefined,
  });

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input {...inputProps} id="email" type="email" placeholder="you@example.com" />
      {error && (
        <span id="email-error" role="alert" className="error">
          {error}
        </span>
      )}
    </div>
  );
}
```

---

## Styling Integration

### With Tailwind CSS

```tsx
import { useButton, useModal } from '@tekton/headless-components';

function TailwindModal() {
  const { modalProps, overlayProps, isOpen, open, close } = useModal({
    closeOnEscape: true,
    trapFocus: true,
  });

  return (
    <>
      <button
        onClick={open}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Open Modal
      </button>

      {isOpen && (
        <>
          <div
            {...overlayProps}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
          <div
            {...modalProps}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       bg-white rounded-lg shadow-xl p-6 z-50 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
            <p className="text-gray-600 mb-6">Modal content goes here...</p>
            <button
              onClick={close}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
}
```

### With Styled Components

```tsx
import styled from 'styled-components';
import { useToggle } from '@tekton/headless-components';

const ToggleContainer = styled.button<{ $isOn: boolean }>`
  width: 60px;
  height: 30px;
  background: ${props => props.$isOn ? '#4CAF50' : '#ccc'};
  border-radius: 15px;
  position: relative;
  transition: background 0.3s;

  &::after {
    content: '';
    width: 26px;
    height: 26px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: ${props => props.$isOn ? '32px' : '2px'};
    transition: left 0.3s;
  }
`;

function StyledToggle() {
  const { toggleProps, isOn } = useToggle({
    defaultOn: false,
  });

  return (
    <div>
      <ToggleContainer {...toggleProps} $isOn={isOn} />
      <span>{isOn ? 'ON' : 'OFF'}</span>
    </div>
  );
}
```

### With CSS Modules

```tsx
import { useSelect } from '@tekton/headless-components';
import styles from './Select.module.css';

function CSSModuleSelect() {
  const options = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ];

  const { triggerProps, menuProps, optionProps, isOpen, selectedValue } = useSelect({
    options,
    defaultValue: 'md',
  });

  return (
    <div className={styles.selectContainer}>
      <button {...triggerProps} className={styles.trigger}>
        {options.find(opt => opt.value === selectedValue)?.label}
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <ul {...menuProps} className={styles.menu}>
          {options.map(option => (
            <li
              key={option.value}
              {...optionProps(option)}
              className={`${styles.option} ${
                option.value === selectedValue ? styles.selected : ''
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## Advanced Patterns

### Compound Component Pattern

```tsx
import { useModal } from '@tekton/headless-components';
import { createContext, useContext } from 'react';

const ModalContext = createContext(null);

function Modal({ children, ...props }) {
  const modal = useModal(props);
  return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>;
}

Modal.Trigger = function ModalTrigger({ children }) {
  const { open } = useContext(ModalContext);
  return <button onClick={open}>{children}</button>;
};

Modal.Content = function ModalContent({ children }) {
  const { modalProps, overlayProps, isOpen } = useContext(ModalContext);

  if (!isOpen) return null;

  return (
    <>
      <div {...overlayProps} className="overlay" />
      <div {...modalProps} className="modal">
        {children}
      </div>
    </>
  );
};

Modal.Close = function ModalClose({ children }) {
  const { close } = useContext(ModalContext);
  return <button onClick={close}>{children}</button>;
};

// Usage
function App() {
  return (
    <Modal>
      <Modal.Trigger>Open Modal</Modal.Trigger>
      <Modal.Content>
        <h2>Modal Title</h2>
        <p>Content...</p>
        <Modal.Close>Close</Modal.Close>
      </Modal.Content>
    </Modal>
  );
}
```

### Multi-Step Form with Tabs

```tsx
import { useTabs, useButton, useInput } from '@tekton/headless-components';
import { useState } from 'react';

function MultiStepForm() {
  const steps = ['personal', 'contact', 'review'];
  const { tabListProps, tabProps, tabPanelProps, activeTab, setActiveTab } = useTabs({
    defaultActiveTab: 'personal',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const nextButton = useButton({
    onClick: () => {
      const currentIndex = steps.indexOf(activeTab);
      if (currentIndex < steps.length - 1) {
        setActiveTab(steps[currentIndex + 1]);
      }
    },
  });

  const prevButton = useButton({
    onClick: () => {
      const currentIndex = steps.indexOf(activeTab);
      if (currentIndex > 0) {
        setActiveTab(steps[currentIndex - 1]);
      }
    },
  });

  return (
    <div className="form-wizard">
      <div {...tabListProps} className="steps">
        {steps.map((step, index) => (
          <button key={step} {...tabProps(step)} className="step-indicator">
            Step {index + 1}
          </button>
        ))}
      </div>

      <div {...tabPanelProps('personal')} className="form-section">
        <h2>Personal Information</h2>
        {/* Form fields */}
      </div>

      <div {...tabPanelProps('contact')} className="form-section">
        <h2>Contact Information</h2>
        {/* Form fields */}
      </div>

      <div {...tabPanelProps('review')} className="form-section">
        <h2>Review & Submit</h2>
        {/* Review section */}
      </div>

      <div className="form-navigation">
        <button {...prevButton.buttonProps} disabled={activeTab === 'personal'}>
          Previous
        </button>
        <button {...nextButton.buttonProps} disabled={activeTab === 'review'}>
          Next
        </button>
      </div>
    </div>
  );
}
```

### Searchable Select with Filtering

```tsx
import { useSelect, useInput } from '@tekton/headless-components';
import { useState, useMemo } from 'react';

function SearchableSelect() {
  const allOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' },
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = useMemo(() => {
    return allOptions.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const searchInput = useInput({
    value: searchQuery,
    onChange: setSearchQuery,
    'aria-label': 'Search options',
  });

  const { triggerProps, menuProps, optionProps, isOpen, selectedValue } = useSelect({
    options: filteredOptions,
  });

  return (
    <div className="searchable-select">
      <button {...triggerProps}>
        {selectedValue
          ? allOptions.find(opt => opt.value === selectedValue)?.label
          : 'Select an option...'}
      </button>

      {isOpen && (
        <div className="select-dropdown">
          <input {...searchInput.inputProps} placeholder="Search..." />
          <ul {...menuProps}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <li key={option.value} {...optionProps(option)}>
                  {option.label}
                </li>
              ))
            ) : (
              <li className="no-results">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
```

---

## Form Integration

### Complete Form with Validation

```tsx
import {
  useInput,
  useCheckbox,
  useRadio,
  useSelect,
  useButton
} from '@tekton/headless-components';
import { useState } from 'react';

function RegistrationForm() {
  const [errors, setErrors] = useState({});

  const nameInput = useInput({
    defaultValue: '',
    required: true,
    invalid: !!errors.name,
  });

  const emailInput = useInput({
    defaultValue: '',
    required: true,
    invalid: !!errors.email,
  });

  const termsCheckbox = useCheckbox({
    defaultChecked: false,
    required: true,
  });

  const genderRadio1 = useRadio({
    value: 'male',
    name: 'gender',
  });

  const genderRadio2 = useRadio({
    value: 'female',
    name: 'gender',
  });

  const countrySelect = useSelect({
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
    ],
  });

  const submitButton = useButton({
    onClick: () => {
      const newErrors = {};

      if (!nameInput.value) {
        newErrors.name = 'Name is required';
      }

      if (!emailInput.value) {
        newErrors.email = 'Email is required';
      }

      if (!termsCheckbox.isChecked) {
        newErrors.terms = 'You must accept the terms';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        // Submit form
        console.log('Form submitted');
      }
    },
  });

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="name">Name *</label>
        <input {...nameInput.inputProps} id="name" type="text" />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="email">Email *</label>
        <input {...emailInput.inputProps} id="email" type="email" />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div role="radiogroup" aria-label="Gender">
        <label>Gender</label>
        <div>
          <div {...genderRadio1.radioProps} />
          <label>Male</label>
        </div>
        <div>
          <div {...genderRadio2.radioProps} />
          <label>Female</label>
        </div>
      </div>

      <div>
        <label>Country</label>
        {/* Select implementation */}
      </div>

      <div>
        <div {...termsCheckbox.checkboxProps} />
        <label>I accept the terms and conditions *</label>
        {errors.terms && <span className="error">{errors.terms}</span>}
      </div>

      <button {...submitButton.buttonProps} type="submit">
        Register
      </button>
    </form>
  );
}
```

---

## Accessibility Examples

### Keyboard-Navigable Menu

```tsx
import { useDropdownMenu } from '@tekton/headless-components';

function AccessibleMenu() {
  const menuItems = [
    { id: 'new', label: 'New File', shortcut: 'Ctrl+N' },
    { id: 'open', label: 'Open', shortcut: 'Ctrl+O' },
    { id: 'save', label: 'Save', shortcut: 'Ctrl+S' },
    { id: 'divider', type: 'divider' },
    { id: 'exit', label: 'Exit', shortcut: 'Alt+F4' },
  ];

  const { triggerProps, menuProps, itemProps, isOpen } = useDropdownMenu({
    items: menuItems.filter(item => item.type !== 'divider'),
    onSelect: (item) => console.log('Selected:', item.label),
  });

  return (
    <div>
      <button {...triggerProps} aria-label="File menu">
        File
      </button>

      {isOpen && (
        <ul {...menuProps} className="menu">
          {menuItems.map(item => {
            if (item.type === 'divider') {
              return <li key={item.id} role="separator" className="divider" />;
            }

            return (
              <li key={item.id} {...itemProps(item)} className="menu-item">
                <span>{item.label}</span>
                {item.shortcut && (
                  <span className="shortcut">{item.shortcut}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
```

### Screen Reader Friendly Pagination

```tsx
import { usePagination } from '@tekton/headless-components';

function AccessiblePagination() {
  const { paginationProps, currentPage, goToPage, nextPage, prevPage, totalPages } = usePagination({
    totalItems: 100,
    pageSize: 10,
    defaultPage: 1,
  });

  return (
    <nav {...paginationProps}>
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        Previous
      </button>

      <ul className="page-numbers">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <li key={page}>
            <button
              onClick={() => goToPage(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        Next
      </button>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
}
```

---

**Last Updated**: 2026-01-16
**Version**: 1.0.0
