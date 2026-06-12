// components/wizard/Step3Interests.tsx
import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Sparkles } from 'lucide-react-native';
import { Colors, Typography, Spacing, Radius, Shadows } from '../../constants/theme';
import type { WizardData } from '../../app/wizard/index';

type Props = {
  data: WizardData;
  onChange: (patch: Partial<WizardData>) => void;
  onNext: () => void;
};

const INTERESTS = [
  { key: 'history',     label: '🏛️ History',      },
  { key: 'souks',       label: '🛍️ Souks',         },
  { key: 'hiking',      label: '🥾 Hiking',         },
  { key: 'cuisine',     label: '🍽️ Cuisine',        },
  { key: 'art',         label: '🎨 Art & Craft',   },
  { key: 'music',       label: '🎵 Music',          },
  { key: 'spa',         label: '♨️ Hammam & Spa',  },
  { key: 'desert',      label: '🌵 Desert Camps',  },
  { key: 'surfing',     label: '🏄 Surfing',        },
  { key: 'architecture',label: '🕌 Architecture',  },
  { key: 'gardens',     label: '🌿 Gardens',        },
  { key: 'nightlife',   label: '🌙 Nightlife',      },
];

const DIETARY = [
  { key: 'halal',       label: 'Halal',      emoji: '☪️' },
  { key: 'vegetarian',  label: 'Vegetarian', emoji: '🥗' },
  { key: 'vegan',       label: 'Vegan',      emoji: '🌱' },
  { key: 'none',        label: 'No restriction', emoji: '✅' },
];

export default function Step3Interests({ data, onChange, onNext }: Props) {
  const MAX = 250;

  const toggleInterest = (key: string) => {
    const current = data.interests;
    if (current.includes(key)) {
      onChange({ interests: current.filter(i => i !== key) });
    } else {
      onChange({ interests: [...current, key] });
    }
  };

  return (
    <View style={styles.root}>
      <Animated.View entering={FadeInDown.delay(50).duration(500)} style={styles.header}>
        <Text style={styles.headline}>
          What <Text style={styles.headlineItalic}>sparks</Text>{'\n'}your interest?
        </Text>
      </Animated.View>

      {/* Interests */}
      <Animated.View entering={FadeInDown.delay(100).duration(500)}>
        <Text style={styles.fieldLabel}>INTERESTS</Text>
        <View style={styles.interestsGrid}>
          {INTERESTS.map((item, i) => {
            const selected = data.interests.includes(item.key);
            return (
              <TouchableOpacity
                key={item.key}
                style={[styles.interestChip, selected && styles.interestChipActive]}
                onPress={() => toggleInterest(item.key)}
                activeOpacity={0.8}
              >
                <Text style={[styles.interestText, selected && styles.interestTextActive]}>
                  {item.label}
                </Text>
                {selected && (
                  <View style={styles.interestCheck}>
                    <Text style={styles.interestCheckText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>

      {/* Dietary */}
      <Animated.View entering={FadeInDown.delay(160).duration(500)} style={styles.fieldBlock}>
        <Text style={styles.fieldLabel}>DIETARY PREFERENCES</Text>
        <View style={styles.dietaryRow}>
          {DIETARY.map((d, i) => {
            const selected = data.dietaryNotes === d.key;
            return (
              <TouchableOpacity
                key={d.key}
                style={[styles.dietaryCard, selected && styles.dietaryCardActive]}
                onPress={() => onChange({ dietaryNotes: d.key })}
                activeOpacity={0.8}
              >
                <Text style={styles.dietaryEmoji}>{d.emoji}</Text>
                <Text style={[styles.dietaryLabel, selected && styles.dietaryLabelActive]}>
                  {d.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>

      {/* Notes */}
      <Animated.View entering={FadeInDown.delay(220).duration(500)} style={styles.fieldBlock}>
        <Text style={styles.fieldLabel}>SPECIAL REQUESTS (OPTIONAL)</Text>
        <View style={styles.notesBox}>
          <TextInput
            style={styles.notesInput}
            placeholder="Any special requests, accessibility needs, or notes for your AI planner..."
            placeholderTextColor={Colors.textMuted}
            multiline
            maxLength={MAX}
            value={data.dietaryNotes.length > 3 ? '' : ''}
            onChangeText={v => {}}
          />
          <View style={styles.notesFooter}>
            <View style={styles.notesPowered}>
              <Sparkles size={11} color={Colors.amber} strokeWidth={2} />
              <Text style={styles.notesPoweredText}>Powered by AI</Text>
            </View>
            <Text style={styles.notesCount}>0 / {MAX}</Text>
          </View>
        </View>
      </Animated.View>

      {/* Generate CTA */}
      <Animated.View entering={FadeInDown.delay(280).duration(500)} style={styles.ctaWrap}>
        <TouchableOpacity onPress={onNext} activeOpacity={0.85}>
          <View style={styles.generateBtn}>
            <LinearGradient
              colors={['#111827', '#1c1410']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.generateBtnGrad}
            >
              <LinearGradient
                colors={[Colors.amber, Colors.orange]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={styles.generateIconBox}
              >
                <Sparkles size={18} color="#fff" strokeWidth={2} />
              </LinearGradient>
              <Text style={styles.generateBtnText}>Generate My Itinerary</Text>
            </LinearGradient>
          </View>
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
    fontSize: 9, letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: 10,
  },
  fieldBlock: { marginTop: Spacing.lg },

  interestsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  interestChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: Radius.pill, borderWidth: 1.5, borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  interestChipActive: {
    borderColor: Colors.amber, backgroundColor: Colors.amberTintBg, ...Shadows.amber,
  },
  interestText: {
    fontFamily: Typography.sansMedium, color: Colors.textSecondary, fontSize: 13,
  },
  interestTextActive: { color: Colors.amberDark },
  interestCheck: {
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: Colors.amber, alignItems: 'center', justifyContent: 'center',
  },
  interestCheckText: { color: '#fff', fontSize: 9, fontFamily: Typography.sansBold },

  dietaryRow: { flexDirection: 'row', gap: 8 },
  dietaryCard: {
    flex: 1, alignItems: 'center', paddingVertical: 12,
    borderRadius: Radius.lg, borderWidth: 1.5, borderColor: Colors.border,
    backgroundColor: Colors.bgPage,
  },
  dietaryCardActive: {
    borderColor: Colors.amber, backgroundColor: Colors.amberTintBg,
  },
  dietaryEmoji: { fontSize: 20, marginBottom: 5 },
  dietaryLabel: {
    fontFamily: Typography.sansMedium, color: Colors.textSecondary, fontSize: 10, textAlign: 'center',
  },
  dietaryLabelActive: { color: Colors.amberDark },

  notesBox: {
    backgroundColor: Colors.bgPage, borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: Radius.md, overflow: 'hidden',
  },
  notesInput: {
    padding: 14, fontFamily: Typography.sans, color: Colors.textPrimary,
    fontSize: 14, minHeight: 90, textAlignVertical: 'top',
  },
  notesFooter: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 14, paddingVertical: 8,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  notesPowered: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  notesPoweredText: { fontFamily: Typography.sansMedium, color: Colors.textMuted, fontSize: 10 },
  notesCount: { fontFamily: Typography.sansMedium, color: Colors.textMuted, fontSize: 10 },

  ctaWrap: { marginTop: Spacing.xl },
  generateBtn: { borderRadius: Radius.md, overflow: 'hidden', ...Shadows.dark },
  generateBtnGrad: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 12, paddingVertical: 18,
  },
  generateIconBox: {
    width: 34, height: 34, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  generateBtnText: { fontFamily: Typography.sansBold, color: '#fff', fontSize: 15 },
});
