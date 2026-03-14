import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Pressable, Text, TextInput, View } from 'react-native';
import { describe, expect, it } from 'vitest';
import {
  ActionRow,
  Button,
  FormSection,
  ListSection,
  Screen,
  ScreenHeader,
  Section,
  Stack,
  TextField,
  ThemeProvider,
  createTheme,
} from '../src/index.js';

function flattenStyle(style: unknown): Record<string, unknown> {
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

describe('@framingui/react-native higher-level layout primitives', () => {
  it('renders theme-aware section and screen header copy', () => {
    const theme = createTheme({
      colors: {
        text: {
          secondary: '#586174',
        },
      },
      typography: {
        sectionTitle: {
          fontSize: 24,
          lineHeight: 30,
          fontWeight: '700',
        },
      },
    });

    const tree = TestRenderer.create(
      <ThemeProvider theme={theme}>
        <Section title="Billing" description="Manage plan and invoices">
          <View testID="content" />
        </Section>
      </ThemeProvider>
    );

    const texts = tree.root.findAllByType(Text);

    expect(texts[0].props.children).toBe('Billing');
    expect(flattenStyle(texts[0].props.style)).toMatchObject({
      color: theme.colors.text.primary,
      fontSize: 24,
      lineHeight: 30,
    });
    expect(texts[1].props.children).toBe('Manage plan and invoices');
    expect(flattenStyle(texts[1].props.style)).toMatchObject({
      color: '#586174',
    });
  });

  it('composes an auth-style screen without app-local shells', () => {
    const tree = TestRenderer.create(
      <ThemeProvider theme={createTheme()}>
        <Screen scroll={false} inset="compact" contentWidth="form">
          <Stack gap={6}>
            <ScreenHeader
              eyebrow="Create account"
              title="Start using Shadowoo"
              description="Keep your workspaces aligned from mobile."
            />
            <FormSection title="Credentials" description="Use the email tied to your team account.">
              <TextField label="Email" placeholder="you@company.com" />
              <TextField label="Password" placeholder="Password" secureTextEntry />
            </FormSection>
            <ActionRow>
              <Button label="Continue" />
              <Button label="Use invite code" variant="secondary" />
            </ActionRow>
          </Stack>
        </Screen>
      </ThemeProvider>
    );

    const buttons = tree.root.findAllByType(Pressable);
    const inputs = tree.root.findAllByType(TextInput);

    expect(buttons).toHaveLength(2);
    expect(inputs).toHaveLength(2);
    expect(tree.root.findByProps({ children: 'Start using Shadowoo' })).toBeTruthy();
    expect(tree.root.findByProps({ children: 'Credentials' })).toBeTruthy();
  });

  it('composes a settings-style screen with list sections and action rows', () => {
    const tree = TestRenderer.create(
      <ThemeProvider theme={createTheme()}>
        <Screen inset="default" safeArea="default">
          <Stack gap={6}>
            <ScreenHeader title="Settings" description="Tune notifications and billing." />
            <ListSection title="Notifications" description="Choose when we reach out.">
              <ActionRow align="space-between">
                <Text>Email alerts</Text>
                <Text>Enabled</Text>
              </ActionRow>
              <ActionRow align="space-between">
                <Text>Push alerts</Text>
                <Text>Muted</Text>
              </ActionRow>
            </ListSection>
          </Stack>
        </Screen>
      </ThemeProvider>
    );

    expect(tree.root.findByProps({ children: 'Settings' })).toBeTruthy();
    expect(tree.root.findByProps({ children: 'Notifications' })).toBeTruthy();
    expect(tree.root.findByProps({ children: 'Email alerts' })).toBeTruthy();
    expect(tree.root.findByProps({ children: 'Muted' })).toBeTruthy();
  });
});
