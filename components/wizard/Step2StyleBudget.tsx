// components/wizard/Step2StyleBudget.tsx
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowRight, ArrowLeft } from 'lucide-react-native';
import { Colors, Typography, Spacing, Radius, Shadows } from '../../constants/theme';
import type { WizardData } from '../../app/wizard/index';

type Props = {
  data: WizardData;
  onChange: (patch: Partial<WizardData>) => void;
  onNext: () => void;
};

const BUDGETS = [
  { key: 'budget',   symbol: '$',    label: 'Budget',   desc: 'Smart spending, max experience' },
  { key: 'moderate', symbol: '$$',   label: 'Moderate', desc: 'Great balance of comfort & value' },
  { key: 'luxury',   symbol: '$$$',  label: 'Luxury',   desc: 'Premium everything, no compromises' },
];

const VIBES = [
  { key: 'culture',     label: '🏺 Culture',     },
  { key: 'adventure',   label: '🧗 Adventure',   },
  { key: 'relaxation',  label: '🌿 Relaxation',  },
  { key: 'food',        label: '🍜 Food & Drink', },
  { key: 'photography', label: '📸 Photography', },
  { key: 'nightlife',   label: '🌙 Nightlife',   },
];

const ACCOMMODATIONS = [
  { key: 'riad',    label: 'Riad',    emoji: '🏡' },
  { key: 'hotel',   label: 'Hotel',   emoji: '🏨' },
  { key: 'resort',  label: 'Resort',  emoji: '🌴' },
  { key: 'hostel',  label: 'Hostel',  emoji: '🛏️' },
];

export default function Step2StyleBudget({ data, onChange, onNext }: Props) {
  const canContinue = !!data.budget && data.vibes.length > 0;

  const toggleVibe = (key: string) => {
    const current = data.vibes;
    if (current.includes(key)) {
      onChange({ vibes: current.filter(v => v !== key) });
    } else if (current.length < 3) {
      onChange({ vibes: [...current, key] });
    }
  };

  return (
    <View style={styles.root}>
      {/* Headline */}
      <Animated.View entering={FadeInDown.delay(50).duration(500)} style={styles.header}>
        <Text style={styles.headline}>
          Craft your{'\n'}
          <Text style={styles.headlineItalic}>experience</Text>
        </Text>
      </Animated.View>

      {/* Budget */}
      <Animated.View entering={FadeInDown.delay(100).duration(500)}>
        <Text style={styles.fieldLabel}>BUDGET</Text>
        <View style={styles.budgetRow}>
          {BUDGETS.map((b, i) => {
            const selected = data.budget === b.key;
            return (
              <TouchableOpacity
                key={b.key}
                style={[styles.budgetCard, selected && styles.budgetCardActive]}
                onPress={() => onChange({ budget: b.key as WizardData['budget'] })}
                activeOpacity={0.8}
              >
                {selected && (
                  <LinearGradient
                    colors={[Colors.amber, Colors.orange]}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={styles.budgetTopBar}
                  />
                )}
                <Text style={[styles.budgetSymbol, selected && styles.budgetSymbolActive]}>
                  {b.symbol}
                </Text>
                <Text style={[styles.budgetLabel, selected && styles.budgetLabelActive]}>
                  {b.label}
                </Text>
                <View style={styles.budgetBars}>
                  {[1, 2, 3].map(n => (
                    <View
                      key={n}
                      style={[
                        styles.budgetBar,
                        n <= i + 1 && (selected ? styles.budgetBarFilled : styles.budgetBarActive),
                      ]}
                    />
                  ))}
                </View>
                <Text style={[styles.budgetDesc, selected && styles.budgetDescActive]} numberOfLines={2}>
                  {b.desc}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>

      {/* Trip vibes */}
      <Animated.View entering={FadeInDown.delay(160).duration(500)} style={styles.fieldBlock}>
        <View style={styles.fieldLabelRow}>
          <Text style={styles.fieldLabel}>TRIP VIBE</Text>
          <View style={styles.vibeCounter}>
            <Text style={styles.vibeCounterText}>{data.vibes.length} / 3</Text>
          </View>
        </View>
        <View style={styles.vibesGrid}>
          {VIBES.map((v, i) => {
            const selected = data.vibes.includes(v.key);
            const maxed = !selected && data.vibes.length >= 3;
            return (
              <TouchableOpacity
                key={v.key}
                style={[
                  styles.vibeChip,
                  selected && styles.vibeChipActive,
                  maxed && styles.vibeChipDisabled,
                ]}
                onPress={() => toggleVibe(v.key)}
                disabled={maxed}
                activeOpacity={0.8}
              >
                <Text style={[styles.vibeChipText, selected && styles.vibeChipTextActive]}>
                  {v.label}
                </Text>
                {selected && <Text style={styles.vibeCheck}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>

      {/* Accommodation */}
      <Animated.View entering={FadeInDown.delay(220).duration(500)} style={styles.fieldBlock}>
        <Text style={styles.fieldLabel}>ACCOMMODATION</Text>
        <View style={styles.accoRow}>
          {ACCOMMODATIONS.map((a, i) => {
            const selected = data.accommodation === a.key;
            return (
              <TouchableOpacity
                key={a.key}
                style={[styles.accoCard, selected && styles.accoCardActive]}
                onPress={() => onChange({ accommodation: a.key })}
                activeOpacity={0.8}
              >
                <Text style={styles.accoEmoji}>{a.emoji}</Text>
                <Text style={[styles.accoLabel, selected && styles.accoLabelActive]}>
                  {a.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>

      {/* CTA */}
      <Animated.View entering={FadeInDown.delay(280).duration(500)} style={styles.ctaWrap}>
        <TouchableOpacity
          onPress={onNext}
          disabled={!canContinue}
          activeOpacity={0.85}
          style={[styles.ctaBtn, !canContinue && { opacity: 0.6 }]}
        >
          <LinearGradient
            colors={canContinue ? [Colors.amber, Colors.orange] : ['#e5e7eb', '#e5e7eb']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.ctaBtnGrad}
          >
            <Text style={[styles.ctaBtnText, !canContinue && { color: Colors.textMuted }]}>
              Continue
            </Text>
            <ArrowRight size={16} color={canContinue ? '#fff' : Colors.textMuted} strokeWidth={2.5} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { paddingTop: Spacing.lg, paddingBottom: Spacing.xxl },
  header: { marginBottom: Spacing.xl },
  headline: {
    fontFamily: Typography.serif, color: Colors.textPrimary,
    fontSize: 34, lineHeight: 38, letterSpacing: -0.3,
  },
  headlineItalic: { fontFamily: Typography.serifItalic, color: Colors.orange },

  fieldLabel: {
    fontFamily: Typography.sansBold, color: Colors.textMuted,
    fontSize: 9, letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: 8,
  },
  fieldLabelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  fieldBlock: { marginTop: Spacing.lg },

  // Budget
  budgetRow: { flexDirection: 'row', gap: 10 },
  budgetCard: {
    flex: 1, padding: 14, borderRadius: Radius.lg,
    backgroundColor: Colors.bgPage, borderWidth: 1.5, borderColor: Colors.border,
    overflow: 'hidden', alignItems: 'center',
  },
  budgetCardActive: {
    borderColor: Colors.amber, backgroundColor: Colors.amberTintBg, ...Shadows.amber,
  },
  budgetTopBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 2 },
  budgetSymbol: {
    fontFamily: Typography.serif, color: Colors.textMuted, fontSize: 22, marginBottom: 4,
  },
  budgetSymbolActive: { color: Colors.amberDark },
  budgetLabel: {
    fontFamily: Typography.sansBold, color: Colors.textSecondary, fontSize: 13, marginBottom: 6,
  },
  budgetLabelActive: { color: Colors.amberDark },
  budgetBars: { flexDirection: 'row', gap: 3, marginBottom: 8 },
  budgetBar: {
    width: 12, height: 4, borderRadius: 2, backgroundColor: Colors.border,
  },
  budgetBarActive: { backgroundColor: Colors.amberTintBorder },
  budgetBarFilled: { backgroundColor: Colors.amber },
  budgetDesc: {
    fontFamily: Typography.sans, color: Colors.textMuted, fontSize: 10, textAlign: 'center', lineHeight: 14,
  },
  budgetDescActive: { color: Colors.amberDark },

  // Vibes
  vibeCounter: {
    paddingHorizontal: 10, paddingVertical: 3, borderRadius: Radius.pill,
    backgroundColor: Colors.amberTintBg, borderWidth: 1, borderColor: Colors.amberTintBorder,
  },
  vibeCounterText: { fontFamily: Typography.sansBold, color: Colors.amberDark, fontSize: 10 },
  vibesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  vibeChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: Radius.pill, borderWidth: 1.5, borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  vibeChipActive: {
    borderColor: Colors.amber, backgroundColor: Colors.amberTintBg, ...Shadows.amber,
  },
  vibeChipDisabled: { opacity: 0.4 },
  vibeChipText: {
    fontFamily: Typography.sansMedium, color: Colors.textSecondary, fontSize: 13,
  },
  vibeChipTextActive: { color: Colors.amberDark },
  vibeCheck: { color: Colors.amber, fontSize: 11, fontFamily: Typography.sansBold },

  // Accommodation
  accoRow: { flexDirection: 'row', gap: 10 },
  accoCard: {
    flex: 1, alignItems: 'center', paddingVertical: 14,
    borderRadius: Radius.lg, borderWidth: 1.5, borderColor: Colors.border,
    backgroundColor: Colors.bgPage,
  },
  accoCardActive: {
    borderColor: Colors.amber, backgroundColor: Colors.amberTintBg, ...Shadows.amber,
  },
  accoEmoji: { fontSize: 22, marginBottom: 6 },
  accoLabel: {
    fontFamily: Typography.sansMedium, color: Colors.textSecondary, fontSize: 11,
  },
  accoLabelActive: { color: Colors.amberDark },

  // CTA
  ctaWrap: { marginTop: Spacing.xl },
  ctaBtn: { borderRadius: Radius.md, overflow: 'hidden' },
  ctaBtnGrad: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 16,
  },
  ctaBtnText: { fontFamily: Typography.sansBold, color: '#fff', fontSize: 15 },
});
