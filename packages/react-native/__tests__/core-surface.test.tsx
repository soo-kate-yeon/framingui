import React from 'react';
import TestRenderer from 'react-test-renderer';
import {
  Pressable,
  Switch as NativeSwitch,
  Text as NativeText,
  TextInput,
  View,
} from 'react-native';
import { describe, expect, it } from 'vitest';
import {
  Button,
  Checkbox,
  Heading,
  IconButton,
  PickerField,
  RadioGroup,
  Screen,
  ScreenHeader,
  Stack,
  Switch,
  Text,
  TextArea,
  TextField,
  ThemeProvider,
  createTheme,
} from '../src/index.js';

function flattenStyle(style: unknown): Record<string, unknown> {
  if (typeof style === 'function') {
    return flattenStyle(style({ pressed: false }));
  }

  if (Array.isArray(style)) {
    return style.filter(Boolean).reduce<Record<string, unknown>>((acc, item) => {
      if (item && typeof item === 'object') {
        Object.assign(acc, item as Record<string, unknown>);
      }
      return acc;
    }, {});
  }

  return (style as Record<string, unknown>) ?? {};
}

describe('@framingui/react-native core interaction surface', () => {
  it('renders themed text and heading variants', () => {
    const theme = createTheme({
      typography: {
        title: {
          fontSize: 30,
          lineHeight: 36,
          fontWeight: '700',
        },
      },
    });

    const tree = TestRenderer.create(
      <ThemeProvider theme={theme}>
        <View>
          <Heading>Manage billing</Heading>
          <Text tone="secondary">Invoice contacts stay in sync.</Text>
        </View>
      </ThemeProvider>
    );

    const texts = tree.root.findAllByType(NativeText);

    expect(flattenStyle(texts[0].props.style)).toMatchObject({
      fontSize: 30,
      lineHeight: 36,
    });
    expect(flattenStyle(texts[1].props.style)).toMatchObject({
      color: theme.colors.text.secondary,
    });
  });

  it('covers disabled, invalid, selected, and focused control states', () => {
    const theme = createTheme({
      colors: {
        border: {
          accent: '#7C3AED',
          danger: '#DC2626',
        },
        action: {
          primary: '#7C3AED',
        },
      },
    });

    const tree = TestRenderer.create(
      <ThemeProvider theme={theme}>
        <View>
          <IconButton disabled={true} icon={<NativeText>+</NativeText>} label="Add" />
          <TextArea focused={true} invalid={true} label="Notes" value="Quarterly billing" />
          <PickerField
            label="Plan"
            placeholder="Choose a plan"
            selectedLabel="Pro Annual"
            selected={true}
          />
          <Checkbox checked={true} label="Email receipts" />
          <RadioGroup
            options={[
              { label: 'Monthly', value: 'monthly' },
              { label: 'Annual', value: 'annual' },
            ]}
            value="annual"
          />
          <Switch label="Auto-renew" value={true} />
        </View>
      </ThemeProvider>
    );

    const pressables = tree.root.findAllByType(Pressable);
    const textArea = tree.root.findByType(TextInput);
    const nativeSwitch = tree.root.findByType(NativeSwitch);

    expect(pressables[0].props.disabled).toBe(true);
    expect(flattenStyle(textArea.props.style)).toMatchObject({
      borderColor: theme.colors.border.danger,
    });
    expect(tree.root.findByProps({ children: 'Pro Annual' })).toBeTruthy();
    expect(tree.root.findByProps({ children: '✓' })).toBeTruthy();
    expect(tree.root.findByProps({ children: '●' })).toBeTruthy();
    expect(nativeSwitch.props.value).toBe(true);
  });

  it('composes a common preferences form without app-local wrappers', () => {
    const tree = TestRenderer.create(
      <ThemeProvider theme={createTheme()}>
        <Screen scroll={false} inset="compact" contentWidth="form">
          <Stack gap={6}>
            <ScreenHeader
              title="Workspace preferences"
              description="Keep mobile and web aligned."
            />
            <Heading level="sectionTitle">Notifications</Heading>
            <Text tone="secondary">Set the defaults for billing and alerts.</Text>
            <TextField label="Email" placeholder="finance@company.com" />
            <TextArea label="Billing note" placeholder="Share context with your team." />
            <PickerField label="Plan" placeholder="Choose a plan" selectedLabel="Starter" />
            <Checkbox checked={true} label="Send receipts to finance" />
            <RadioGroup
              label="Billing cadence"
              options={[
                { label: 'Monthly', value: 'monthly' },
                { label: 'Annual', value: 'annual' },
              ]}
              value="monthly"
            />
            <Switch label="Auto-renew" value={true} />
            <Stack direction="row" gap={3}>
              <Button label="Save changes" />
              <IconButton icon={<NativeText>✕</NativeText>} label="Close" />
            </Stack>
          </Stack>
        </Screen>
      </ThemeProvider>
    );

    expect(tree.root.findByProps({ children: 'Workspace preferences' })).toBeTruthy();
    expect(tree.root.findByProps({ children: 'Notifications' })).toBeTruthy();
    expect(tree.root.findByProps({ children: 'Starter' })).toBeTruthy();
    expect(tree.root.findByProps({ children: 'Save changes' })).toBeTruthy();
    expect(tree.root.findByProps({ children: 'Close' })).toBeTruthy();
  });
});
