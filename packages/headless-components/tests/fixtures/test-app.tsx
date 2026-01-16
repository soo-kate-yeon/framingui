import React from 'react';
import { useButton } from '../../src/hooks/useButton';
import { useModal } from '../../src/hooks/useModal';
import { useInput } from '../../src/hooks/useInput';
import { useCheckbox } from '../../src/hooks/useCheckbox';
import { useSelect } from '../../src/hooks/useSelect';
import { useTabs } from '../../src/hooks/useTabs';

/**
 * Test Application for Cross-Browser E2E Testing
 *
 * Provides interactive components for testing:
 * - Keyboard interactions (Enter, Space, Escape, Arrow keys)
 * - Focus management
 * - ARIA attributes
 * - Click-outside detection
 * - Disabled state behavior
 */

// Button Test Component
export function ButtonTest() {
  const { buttonProps, isPressed } = useButton({
    toggle: true,
    'aria-label': 'Toggle button test',
  });

  return (
    <div data-testid="button-test">
      <button
        {...buttonProps}
        data-testid="toggle-button"
        style={{
          padding: '10px 20px',
          backgroundColor: isPressed ? '#4CAF50' : '#f0f0f0',
          color: isPressed ? 'white' : 'black',
          border: '1px solid #ccc',
          cursor: buttonProps.disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {isPressed ? 'Pressed' : 'Not Pressed'}
      </button>
    </div>
  );
}

// Modal Test Component
export function ModalTest() {
  const { isOpen, openModal, closeModal, modalProps, triggerProps, backdropProps } = useModal({
    'aria-label': 'Test modal',
  });

  return (
    <div data-testid="modal-test">
      <button
        {...triggerProps}
        data-testid="open-modal-button"
        style={{
          padding: '10px 20px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Open Modal
      </button>

      {isOpen && (
        <>
          <div
            {...backdropProps}
            data-testid="modal-backdrop"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }}
          />
          <div
            {...modalProps}
            data-testid="modal-content"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
            }}
          >
            <h2 data-testid="modal-title">Test Modal</h2>
            <p>Press Escape to close or click outside</p>
            <button
              onClick={closeModal}
              data-testid="close-modal-button"
              style={{
                marginTop: '20px',
                padding: '8px 16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Input Test Component
export function InputTest() {
  const { inputProps, value, error } = useInput({
    required: true,
    validate: (val) => val.length >= 3 || 'Must be at least 3 characters',
    'aria-label': 'Test input field',
  });

  return (
    <div data-testid="input-test">
      <label htmlFor="test-input" style={{ display: 'block', marginBottom: '8px' }}>
        Test Input (min 3 characters)
      </label>
      <input
        {...inputProps}
        id="test-input"
        data-testid="test-input"
        style={{
          padding: '8px',
          border: error ? '2px solid red' : '1px solid #ccc',
          borderRadius: '4px',
          width: '300px',
        }}
      />
      {error && (
        <div data-testid="input-error" style={{ color: 'red', marginTop: '4px' }}>
          {error}
        </div>
      )}
      <div data-testid="input-value" style={{ marginTop: '8px' }}>
        Value: {value}
      </div>
    </div>
  );
}

// Checkbox Test Component
export function CheckboxTest() {
  const { checkboxProps, isChecked } = useCheckbox({
    'aria-label': 'Test checkbox',
  });

  return (
    <div data-testid="checkbox-test">
      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <input
          {...checkboxProps}
          data-testid="test-checkbox"
          type="checkbox"
          style={{ marginRight: '8px' }}
        />
        <span>Accept terms and conditions</span>
      </label>
      <div data-testid="checkbox-status" style={{ marginTop: '8px' }}>
        Status: {isChecked ? 'Checked' : 'Unchecked'}
      </div>
    </div>
  );
}

// Select Test Component
export function SelectTest() {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const { selectProps, selectedValue } = useSelect({
    options,
    'aria-label': 'Test select dropdown',
  });

  return (
    <div data-testid="select-test">
      <label htmlFor="test-select" style={{ display: 'block', marginBottom: '8px' }}>
        Select an option
      </label>
      <select
        {...selectProps}
        id="test-select"
        data-testid="test-select"
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '200px',
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div data-testid="select-value" style={{ marginTop: '8px' }}>
        Selected: {selectedValue || 'None'}
      </div>
    </div>
  );
}

// Tabs Test Component
export function TabsTest() {
  const tabs = [
    { id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' },
  ];

  const { getTabListProps, getTabProps, getTabPanelProps, selectedTab } = useTabs({
    tabs,
    defaultSelectedId: 'tab1',
  });

  return (
    <div data-testid="tabs-test">
      <div {...getTabListProps()} data-testid="tab-list" style={{ display: 'flex', gap: '4px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            {...getTabProps(tab.id)}
            data-testid={`tab-${tab.id}`}
            style={{
              padding: '10px 20px',
              backgroundColor: selectedTab === tab.id ? '#2196F3' : '#f0f0f0',
              color: selectedTab === tab.id ? 'white' : 'black',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          {...getTabPanelProps(tab.id)}
          data-testid={`panel-${tab.id}`}
          style={{
            marginTop: '20px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

// Main Test App
export function TestApp() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Headless Components Cross-Browser Test Suite</h1>

      <section style={{ marginTop: '40px' }}>
        <h2>Button (Keyboard: Space/Enter)</h2>
        <ButtonTest />
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>Modal (Keyboard: Escape, Focus Trap)</h2>
        <ModalTest />
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>Input (Validation, ARIA)</h2>
        <InputTest />
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>Checkbox (Keyboard: Space)</h2>
        <CheckboxTest />
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>Select (Arrow Keys Navigation)</h2>
        <SelectTest />
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>Tabs (Arrow Keys Navigation)</h2>
        <TabsTest />
      </section>
    </div>
  );
}
