import React from 'react';

type StyleValue =
  | Record<string, unknown>
  | Record<string, unknown>[]
  | ((state: { pressed: boolean }) => Record<string, unknown> | Record<string, unknown>[]);

function flattenStyle(style: StyleValue | undefined) {
  if (typeof style === 'function') {
    return style({ pressed: false });
  }

  return style;
}

function createHostComponent(name: string) {
  return ({ children, style, ...props }: Record<string, unknown>) =>
    React.createElement(
      name,
      { ...props, style: flattenStyle(style as StyleValue | undefined) },
      children
    );
}

export const View = createHostComponent('View');
export const Text = createHostComponent('Text');
export const ScrollView = createHostComponent('ScrollView');
export const TextInput = createHostComponent('TextInput');
export const ActivityIndicator = createHostComponent('ActivityIndicator');
export const Modal = createHostComponent('Modal');
export const Switch = createHostComponent('Switch');
export const TouchableWithoutFeedback = ({ children, ...props }: Record<string, unknown>) =>
  React.createElement('TouchableWithoutFeedback', props, children);

export const Pressable = ({ children, style, ...props }: Record<string, unknown>) =>
  React.createElement(
    'Pressable',
    { ...props, style: flattenStyle(style as StyleValue | undefined) },
    children
  );

export const StyleSheet = {
  create<T extends Record<string, unknown>>(styles: T): T {
    return styles;
  },
};
