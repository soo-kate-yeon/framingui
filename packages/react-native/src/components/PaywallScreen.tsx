import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getTextStyle } from '../helpers.js';
import { colors, radius, shadows, spacing } from '../tokens.js';
import { Button } from './Button.js';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SubscriptionPlan {
  id: string;
  label: string;
  price: string;
  period: string;
  badge?: string;
}

export interface FreeTierFeature {
  text: string;
}

export interface PaywallScreenProps {
  /** Title displayed at the top */
  title?: string;
  /** Subtitle / description */
  subtitle?: string;
  /** Features available in the free tier */
  freeFeatures: FreeTierFeature[];
  /** Features available in the premium tier */
  premiumFeatures: FreeTierFeature[];
  /** Subscription plans shown inside the premium card */
  plans: SubscriptionPlan[];
  /** Initially selected plan id */
  defaultPlanId?: string;
  /** CTA button label */
  ctaLabel?: string;
  /** Called when the user taps the CTA */
  onSubscribe?: (planId: string) => void;
  /** Called when the user dismisses the paywall */
  onDismiss?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PaywallScreen({
  title = 'Unlock Premium',
  subtitle = 'Get the most out of your experience',
  freeFeatures,
  premiumFeatures,
  plans,
  defaultPlanId,
  ctaLabel = 'Subscribe Now',
  onSubscribe,
  onDismiss,
}: PaywallScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState(defaultPlanId ?? plans[0]?.id ?? '');

  return (
    <View style={styles.root}>
      {/* Scrollable content */}
      <View style={styles.scrollArea}>
        {/* Header */}
        <View style={styles.header}>
          {onDismiss && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close"
              onPress={onDismiss}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>x</Text>
            </Pressable>
          )}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {/* Free tier card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Free</Text>
          {freeFeatures.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Text style={styles.featureIcon}>—</Text>
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>

        {/* Premium tier card */}
        <View style={[styles.card, styles.premiumCard]}>
          <View style={styles.premiumHeader}>
            <Text style={styles.cardTitle}>Premium</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Recommended</Text>
            </View>
          </View>

          {premiumFeatures.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Text style={styles.checkIcon}>+</Text>
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}

          {/* Plan selector */}
          <View style={styles.planSelector}>
            {plans.map(plan => {
              const isSelected = plan.id === selectedPlan;
              return (
                <Pressable
                  key={plan.id}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => setSelectedPlan(plan.id)}
                  style={[styles.planOption, isSelected && styles.planOptionSelected]}
                >
                  <View style={styles.planRadioRow}>
                    <View style={[styles.radio, isSelected && styles.radioSelected]}>
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                    <View style={styles.planInfo}>
                      <Text style={styles.planLabel}>
                        {plan.label}
                        {plan.badge ? <Text style={styles.planBadge}> {plan.badge}</Text> : null}
                      </Text>
                      <Text style={styles.planPrice}>
                        {plan.price}
                        <Text style={styles.planPeriod}>/{plan.period}</Text>
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      {/* Fixed bottom CTA */}
      <View style={styles.ctaContainer}>
        <Button label={ctaLabel} onPress={() => onSubscribe?.(selectedPlan)} variant="primary" />
        <Text style={styles.ctaHint}>Cancel anytime</Text>
      </View>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles — square-minimalism theme tokens                            */
/* ------------------------------------------------------------------ */

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background.canvas,
    flex: 1,
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[10],
    paddingBottom: spacing[4],
  },

  /* Header */
  header: {
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: spacing[2],
    marginBottom: spacing[4],
  },
  closeText: {
    ...getTextStyle('body'),
    color: colors.text.secondary,
  },
  title: {
    ...getTextStyle('display'),
    color: colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    ...getTextStyle('body'),
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing[2],
  },

  /* Cards */
  card: {
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    padding: spacing[5],
    marginBottom: spacing[4],
  },
  premiumCard: {
    borderColor: colors.action.primary,
    borderWidth: 2,
    ...shadows.card,
  },
  cardTitle: {
    ...getTextStyle('sectionTitle'),
    color: colors.text.primary,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },
  badge: {
    backgroundColor: colors.action.primary,
    borderRadius: radius.sm,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },
  badgeText: {
    ...getTextStyle('caption'),
    color: colors.text.inverse,
    fontWeight: '600',
  },

  /* Features */
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing[3],
    gap: spacing[2],
  },
  featureIcon: {
    ...getTextStyle('body'),
    color: colors.text.tertiary,
    width: 20,
  },
  checkIcon: {
    ...getTextStyle('body'),
    color: colors.action.primary,
    fontWeight: '600',
    width: 20,
  },
  featureText: {
    ...getTextStyle('body'),
    color: colors.text.primary,
    flex: 1,
  },

  /* Plan selector */
  planSelector: {
    marginTop: spacing[5],
    gap: spacing[3],
  },
  planOption: {
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    padding: spacing[4],
  },
  planOptionSelected: {
    borderColor: colors.action.primary,
    backgroundColor: colors.background.subtle,
  },
  planRadioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.border.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.action.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.action.primary,
  },
  planInfo: {
    flex: 1,
  },
  planLabel: {
    ...getTextStyle('bodyStrong'),
    color: colors.text.primary,
  },
  planBadge: {
    ...getTextStyle('caption'),
    color: colors.action.primary,
    fontWeight: '600',
  },
  planPrice: {
    ...getTextStyle('body'),
    color: colors.text.primary,
    marginTop: spacing[1],
  },
  planPeriod: {
    color: colors.text.secondary,
  },

  /* Fixed bottom CTA */
  ctaContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
    backgroundColor: colors.background.canvas,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
    gap: spacing[2],
  },
  ctaHint: {
    ...getTextStyle('caption'),
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});
