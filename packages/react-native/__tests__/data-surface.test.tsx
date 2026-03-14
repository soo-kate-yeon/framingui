import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Modal as NativeModal, Pressable, View } from 'react-native';
import { describe, expect, it } from 'vitest';
import {
  Avatar,
  Badge,
  Button,
  Card,
  EmptyState,
  ListItem,
  Modal,
  Screen,
  ScreenHeader,
  SegmentedControl,
  Stack,
  Text,
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

describe('@framingui/react-native data and feedback surface', () => {
  it('renders themed card, badge, and avatar primitives', () => {
    const theme = createTheme({
      colors: {
        surface: {
          base: '#FCFCFF',
        },
      },
    });

    const tree = TestRenderer.create(
      <ThemeProvider theme={theme}>
        <Card>
          <Stack direction="row" gap={3}>
            <Avatar initials="SY" />
            <View>
              <Text>Studio team</Text>
              <Badge tone="accent">Pro</Badge>
            </View>
          </Stack>
        </Card>
      </ThemeProvider>
    );

    const card = tree.root.findAllByType(View)[0];

    expect(flattenStyle(card.props.style)).toMatchObject({
      backgroundColor: '#FCFCFF',
    });
    expect(tree.root.findByProps({ children: 'SY' })).toBeTruthy();
    expect(tree.root.findByProps({ children: 'Pro' })).toBeTruthy();
  });

  it('supports explicit modal and segmented selection states', () => {
    const tree = TestRenderer.create(
      <ThemeProvider theme={createTheme()}>
        <View>
          <SegmentedControl
            options={[
              { label: 'Monthly', value: 'monthly' },
              { label: 'Annual', value: 'annual' },
            ]}
            value="annual"
          />
          <Modal
            description="You can switch again next cycle."
            title="Upgrade confirmed"
            visible={true}
          >
            <Text>Plan details</Text>
          </Modal>
        </View>
      </ThemeProvider>
    );

    const pressables = tree.root.findAllByType(Pressable);
    const modal = tree.root.findByType(NativeModal);

    expect(pressables).toHaveLength(2);
    expect(tree.root.findByProps({ children: 'Annual' })).toBeTruthy();
    expect(modal.props.visible).toBe(true);
    expect(tree.root.findByProps({ children: 'Upgrade confirmed' })).toBeTruthy();
  });

  it('composes list/detail, settings, and paywall-style flows from package exports', () => {
    const tree = TestRenderer.create(
      <ThemeProvider theme={createTheme()}>
        <Screen inset="compact" contentWidth="prose">
          <Stack gap={6}>
            <ScreenHeader title="Members" description="Keep billing contacts aligned." />
            <Card>
              <ListItem
                description="Finance lead"
                leading={<Avatar initials="SY" size="sm" />}
                title="Sooyeon"
                trailing={<Badge>Owner</Badge>}
              />
              <ListItem
                description="Product ops"
                leading={<Avatar initials="MK" size="sm" />}
                title="Minkyu"
                trailing={<Badge tone="accent">Admin</Badge>}
              />
            </Card>
            <Card>
              <Text tone="secondary">Choose the billing plan that fits your workspace.</Text>
              <SegmentedControl
                options={[
                  { label: 'Starter', value: 'starter' },
                  { label: 'Growth', value: 'growth' },
                ]}
                value="growth"
              />
              <Button label="Upgrade workspace" />
            </Card>
            <EmptyState
              action={<Button label="Invite teammate" variant="secondary" />}
              description="No pending invites yet."
              title="Your team is up to date"
            />
          </Stack>
        </Screen>
      </ThemeProvider>
    );

    expect(tree.root.findByProps({ children: 'Members' })).toBeTruthy();
    expect(tree.root.findByProps({ children: 'Sooyeon' })).toBeTruthy();
    expect(tree.root.findByProps({ children: 'Growth' })).toBeTruthy();
    expect(tree.root.findByProps({ children: 'Invite teammate' })).toBeTruthy();
    expect(tree.root.findByProps({ children: 'Your team is up to date' })).toBeTruthy();
  });
});
