import type { ReactNode } from 'react';
import {
  Modal as ReactNativeModal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';
import { Button } from './Button.js';
import { Text } from './Text.js';

export interface ModalProps {
  visible: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  onRequestClose?: () => void;
}

export function Modal({
  visible,
  title,
  description,
  children,
  footer,
  onRequestClose,
}: ModalProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <ReactNativeModal onRequestClose={onRequestClose} transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <View style={styles.copy}>
                <Text variant="sectionTitle">{title}</Text>
                {description ? (
                  <Text tone="secondary" variant="body">
                    {description}
                  </Text>
                ) : null}
              </View>
              {children ? <View style={styles.body}>{children}</View> : null}
              {footer ? (
                <View style={styles.footer}>{footer}</View>
              ) : onRequestClose ? (
                <View style={styles.footer}>
                  <Button label="Close" onPress={onRequestClose} variant="secondary" />
                </View>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </ReactNativeModal>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    backdrop: {
      alignItems: 'center',
      backgroundColor: 'rgba(17, 17, 17, 0.48)',
      flex: 1,
      justifyContent: 'center',
      padding: theme.spacing[4],
    },
    card: {
      ...theme.shadows.card,
      backgroundColor: theme.colors.surface.base,
      borderRadius: theme.radius.lg,
      gap: theme.spacing[4],
      maxWidth: 520,
      padding: theme.spacing[5],
      width: '100%',
    },
    copy: {
      gap: theme.spacing[2],
    },
    body: {
      gap: theme.spacing[3],
    },
    footer: {
      gap: theme.spacing[3],
      width: '100%',
    },
  })
);
