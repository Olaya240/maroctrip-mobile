// components/wizard/Step1Destination.tsx
import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MapPin, Search, Calendar, Users, ArrowRight } from 'lucide-react-native';
import { Colors, Typography, Spacing, Radius, Shadows } from '../../constants/theme';
import type { WizardData } from '../../app/wizard/index';

type Props = {
  data: WizardData;
  onChange: (patch: Partial<WizardData>) => void;
  onNext: () => void;
};

const SUGGESTIONS = [
  { name: 'Marrakech',    tag: 'Imperial City',  icon: '🕌' },
  { name: 'Chefchaouen', tag: 'Blue Pearl',      icon: '💙' },
  { name: 'Sahara',      tag: 'Golden Dunes',   icon: '🌵' },
  { name: 'Fes',         tag: 'Ancient Medina', icon: '🏺' },
  { name: 'Essaouira',   tag: 'Coastal Gem',    icon: '🌊' },
];

const QUICK_DURATIONS = [
  { label: 'Weekend', days: 3 },
  { label: '1 Week', days: 7 },
  { label: '2 Weeks', days: 14 },
];

const TRAVELER_OPTIONS = [
  { count: 1, label: 'Solo', emoji: '🧍' },
  { count: 2, label: 'Couple', emoji: '👫' },
  { count: 3, label: 'Group', emoji: '👥' },
  { count: 4, label: 'Family', emoji: '👨‍👩‍👧' },
];

export default function Step1Destination({ data, onChange, onNext }: Props) {
  const [search, setSearch] = useState(data.destination || '');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const canContinue = !!data.destination && !!data.startDate;

  return (
    <View style={styles.root}>
      {/* Headline */}
      <Animated.View entering={FadeInDown.delay(50).duration(500)} style={styles.header}>
        <Text style={styles.headline}>
          Where is your{'\n'}next{' '}
          <Text style={styles.headlineItalic}>adventure?</Text>
        </Text>
      </Animated.View>

      {/* Destination search */}
      <Animated.View entering={FadeInDown.delay(120).duration(500)}>
        <Text style={styles.fieldLabel}>DESTINATION</Text>
        <View style={styles.searchBox}>
          <MapPin size={17} color={Colors.amber} strokeWidth={2} style={{ marginRight: 10 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Morocco destinations..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={v => { setSearch(v); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => { setSearch(''); onChange({ destination: '' }); }}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Suggestions */}
        {showSuggestions && (
          <View style={styles.suggestionsBox}>
            {SUGGESTIONS.filter(s =>
              s.name.toLowerCase().includes(search.toLowerCase())
            ).map((s, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.suggestionItem, i < SUGGESTIONS.length - 1 && styles.suggestionBorder]}
                onPress={() => {
                  setSearch(s.name);
                  onChange({ destination: s.name });
                  setShowSuggestions(false);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.suggestionEmoji}>{s.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.suggestionName}>{s.name}</Text>
                  <Text style={styles.suggestionTag}>{s.tag}</Text>
                </View>
                {data.destination === s.name && (
                  <Text style={styles.suggestionCheck}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Animated.View>

      {/* Dates */}
      <Animated.View entering={FadeInDown.delay(180).duration(500)} style={styles.fieldBlock}>
        <Text style={styles.fieldLabel}>DATES</Text>
        <View style={styles.datesRow}>
          <TouchableOpacity style={[styles.dateBtn, styles.dateBtnHalf]}>
            <Calendar size={15} color={Colors.amber} strokeWidth={1.75} />
            <Text style={[styles.dateBtnText, !data.startDate && styles.dateBtnPlaceholder]}>
              {data.startDate ? data.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Departure'}
            </Text>
          </TouchableOpacity>
          <View style={styles.dateDivider} />
          <TouchableOpacity style={[styles.dateBtn, styles.dateBtnHalf]}>
            <Calendar size={15} color={Colors.amber} strokeWidth={1.75} />
            <Text style={[styles.dateBtnText, !data.endDate && styles.dateBtnPlaceholder]}>
              {data.endDate ? data.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Return'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick durations */}
        <View style={styles.quickDates}>
          {QUICK_DURATIONS.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={styles.quickDateChip}
              onPress={() => {
                const start = new Date();
                const end = new Date();
                end.setDate(end.getDate() + d.days);
                onChange({ startDate: start, endDate: end });
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.quickDateText}>{d.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Travelers */}
      <Animated.View entering={FadeInDown.delay(240).duration(500)} style={styles.fieldBlock}>
        <Text style={styles.fieldLabel}>TRAVELERS</Text>
        <View style={styles.travelersGrid}>
          {TRAVELER_OPTIONS.map((t, i) => {
            const selected = data.travelers === t.count;
            return (
              <TouchableOpacity
                key={i}
                style={[styles.travelerCard, selected && styles.travelerCardActive]}
                onPress={() => onChange({ travelers: t.count })}
                activeOpacity={0.8}
              >
                <Text style={styles.travelerCardNum}>
                  {String(t.count).padStart(2, '0')}
                </Text>
                <Text style={styles.travelerEmoji}>{t.emoji}</Text>
                <Text style={[styles.travelerLabel, selected && styles.travelerLabelActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>

      {/* CTA */}
      <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.ctaWrap}>
        <TouchableOpacity
          onPress={onNext}
          disabled={!canContinue}
          activeOpacity={0.85}
          style={[styles.ctaBtn, !canContinue && styles.ctaBtnDisabled]}
        >
          <LinearGradient
            colors={canContinue ? [Colors.amber, Colors.orange] : ['#e5e7eb', '#e5e7eb']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.ctaBtnGrad}
          >
            <Text style={[styles.ctaBtnText, !canContinue && styles.ctaBtnTextDisabled]}>
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
  fieldBlock: { marginTop: Spacing.lg },

  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.bgPage, borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: Radius.md, paddingHorizontal: 14, height: 52,
  },
  searchInput: {
    flex: 1, fontFamily: Typography.sans,
    color: Colors.textPrimary, fontSize: 15,
  },
  clearBtn: { color: Colors.textMuted, fontSize: 14, padding: 4 },

  suggestionsBox: {
    marginTop: 6, backgroundColor: Colors.white,
    borderRadius: Radius.md, borderWidth: 1.5, borderColor: Colors.border,
    ...Shadows.card,
  },
  suggestionItem: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  suggestionBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  suggestionEmoji: { fontSize: 22 },
  suggestionName: { fontFamily: Typography.sansBold, color: Colors.textPrimary, fontSize: 14 },
  suggestionTag: { fontFamily: Typography.sans, color: Colors.textMuted, fontSize: 11, marginTop: 1 },
  suggestionCheck: { color: Colors.amber, fontSize: 16, fontFamily: Typography.sansBold },

  // Dates
  datesRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.bgPage, borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: Radius.md, overflow: 'hidden',
  },
  dateBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 14 },
  dateBtnHalf: { flex: 1 },
  dateDivider: { width: 1, height: 30, backgroundColor: Colors.border },
  dateBtnText: { fontFamily: Typography.sansMedium, color: Colors.textPrimary, fontSize: 14 },
  dateBtnPlaceholder: { color: Colors.textMuted },
  quickDates: { flexDirection: 'row', gap: 8, marginTop: 10 },
  quickDateChip: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: Radius.pill,
    borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.white,
  },
  quickDateText: { fontFamily: Typography.sansMedium, color: Colors.textSecondary, fontSize: 12 },

  // Travelers
  travelersGrid: { flexDirection: 'row', gap: 10 },
  travelerCard: {
    flex: 1, paddingVertical: 16, borderRadius: Radius.lg,
    alignItems: 'center', backgroundColor: Colors.bgPage,
    borderWidth: 1.5, borderColor: Colors.border,
  },
  travelerCardActive: {
    borderColor: Colors.amber, backgroundColor: Colors.amberTintBg,
    ...Shadows.amber,
  },
  travelerCardNum: {
    fontFamily: Typography.serif, color: Colors.textFaint,
    fontSize: 11, letterSpacing: 1, marginBottom: 4,
  },
  travelerEmoji: { fontSize: 22, marginBottom: 4 },
  travelerLabel: {
    fontFamily: Typography.sansMedium, color: Colors.textSecondary,
    fontSize: 11,
  },
  travelerLabelActive: { color: Colors.amberDark },

  // CTA
  ctaWrap: { marginTop: Spacing.xl },
  ctaBtn: { borderRadius: Radius.md, overflow: 'hidden' },
  ctaBtnDisabled: { opacity: 0.6 },
  ctaBtnGrad: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 16,
  },
  ctaBtnText: { fontFamily: Typography.sansBold, color: '#fff', fontSize: 15 },
  ctaBtnTextDisabled: { color: Colors.textMuted },
});
