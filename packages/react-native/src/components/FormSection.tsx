import type { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { getFormRhythm, type FormRhythmToken } from '../layout.js';
import { useTheme } from '../theme.js';
import { Section } from './Section.js';

export interface FormSectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  rhythm?: FormRhythmToken;
  style?: StyleProp<ViewStyle>;
}

export function FormSection({
  children,
  title,
  description,
  rhythm = 'default',
  style,
}: FormSectionProps) {
  const theme = useTheme();
  const formRhythm = getFormRhythm(rhythm, theme);
  const styles = getStyles(formRhythm.fieldGap);
  const sectionGap =
    rhythm === 'compact' ? 'tight' : rhythm === 'comfortable' ? 'loose' : 'default';

  return (
    <Section description={description} gap={sectionGap} title={title}>
      <View style={[styles.fields, style]}>{children}</View>
    </Section>
  );
}

const getStyles = (gap: number) =>
  StyleSheet.create({
    fields: {
      gap,
      width: '100%',
    },
  });
