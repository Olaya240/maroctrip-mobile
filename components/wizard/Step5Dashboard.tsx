// components/wizard/Step5Dashboard.tsx
import { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, Dimensions, ImageBackground,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import {
  X, Share2, MapPin, Calendar, Clock, Sun,
  Utensils, Landmark, Zap, ArrowRight, Brain,
  Star, Download,
} from 'lucide-react-native';
import { Colors, Typography, Spacing, Radius, Shadows } from '../../constants/theme';
import type { WizardData } from '../../app/wizard/index';

const { width } = Dimensions.get('window');

type Props = {
  data: WizardData;
  onClose: () => void;
};

const DAYS = [
  { num: 1, label: 'Day 1', date: 'Oct 15' },
  { num: 2, label: 'Day 2', date: 'Oct 16' },
  { num: 3, label: 'Day 3', date: 'Oct 17' },
  { num: 4, label: 'Day 4', date: 'Oct 18' },
];

const ACTIVITIES: Record<number, any[]> = {
  1: [
    { time: '09:00', title: 'Breakfast at Riad El Yacout',  type: 'Food',    icon: Utensils,  color: '#ea580c', desc: 'Traditional Moroccan breakfast with mint tea.' },
    { time: '11:00', title: 'Jemaa el-Fnaa Square',        type: 'Culture', icon: Landmark,  color: '#2563eb', desc: 'Explore the iconic square and snake charmers.' },
    { time: '13:30', title: 'Rooftop Lunch — Medina Views', type: 'Food',    icon: Utensils,  color: '#ea580c', desc: 'Panoramic terrace with tagine and couscous.' },
    { time: '16:00', title: 'Souk Discovery Walk',          type: 'Explore', icon: Zap,       color: '#9333ea', desc: 'Navigate the labyrinthine souks with a guide.' },
    { time: '19:30', title: 'Koutoubia Mosque Sunset',      type: 'Culture', icon: Landmark,  color: '#2563eb', desc: 'Watch sunset at Morocco\'s largest mosque.' },
  ],
  2: [
    { time: '08:30', title: 'Majorelle Garden',  type: 'Culture', icon: Landmark, color: '#2563eb', desc: 'Yves Saint Laurent\'s iconic blue garden.' },
    { time: '11:00', title: 'Bahia Palace',      type: 'Culture', icon: Landmark, color: '#2563eb', desc: 'Stunning 19th-century riad complex.' },
    { time: '13:00', title: 'Lunch at Nomad',   type: 'Food',    icon: Utensils, color: '#ea580c', desc: 'Modern Moroccan cuisine in the medina.' },
    { time: '16:00', title: 'Hammam Experience', type: 'Explore', icon: Zap,      color: '#9333ea', desc: 'Traditional Moroccan bathhouse ritual.' },
    { time: '20:00', title: 'Night Market',      type: 'Explore', icon: Zap,      color: '#9333ea', desc: 'Street food and evening entertainment.' },
  ],
  3: [
    { time: '07:00', title: 'Ouzoud Waterfalls',      type: 'Nature',  icon: Zap,       color: '#059669', desc: 'Day trip to Morocco\'s highest waterfalls.' },
    { time: '12:00', title: 'Lunch by the Falls',     type: 'Food',    icon: Utensils,  color: '#ea580c', desc: 'Fresh local fish by the cascades.' },
    { time: '15:00', title: 'Swimming + Monkeys',     type: 'Nature',  icon: Zap,       color: '#059669', desc: 'Cool off and meet the Barbary macaques.' },
    { time: '19:00', title: 'Return to Marrakech',    type: 'Explore', icon: Zap,       color: '#9333ea', desc: 'Scenic drive back through Atlas foothills.' },
  ],
  4: [
    { time: '09:00', title: 'Atlas Mountains Drive',  type: 'Nature',  icon: Zap,       color: '#059669', desc: 'Journey through Tizi n\'Tichka pass.' },
    { time: '12:30', title: 'Aït Benhaddou Kasbah',  type: 'Culture', icon: Landmark,  color: '#2563eb', desc: 'UNESCO World Heritage mud-brick fortress.' },
    { time: '15:00', title: 'Ouarzazate Film Studios', type: 'Explore', icon: Zap,       color: '#9333ea', desc: 'Visit famous Game of Thrones set.' },
    { time: '18:00', title: 'Desert Camp Arrival',    type: 'Explore', icon: Zap,       color: '#9333ea', desc: 'Camel trek to glamping tent in Sahara.' },
  ],
};

export default function Step5Dashboard({ data, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const [activeDay, setActiveDay] = useState(1);
  const activities = ACTIVITIES[activeDay] || ACTIVITIES[1];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      {/* Navbar */}
      <LinearGradient
        colors={[Colors.amber, Colors.orange]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={styles.navTopBar}
      />
      <View style={styles.navbar}>
        <View style={styles.navLeft}>
          <LinearGradient
            colors={[Colors.amber, Colors.orange]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.navLogoMark}
          >
            <Text style={styles.navLogoLetter}>M</Text>
          </LinearGradient>
          <View>
            <Text style={styles.navTitle}>{data.destination || 'Morocco'}</Text>
            <Text style={styles.navSub}>
              {data.startDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) ?? 'Oct 15'} –{' '}
              {data.endDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) ?? 'Oct 22'}
            </Text>
          </View>
        </View>
        <View style={styles.navRight}>
          <TouchableOpacity style={styles.navIconBtn}>
            <Share2 size={16} color={Colors.textSecondary} strokeWidth={1.75} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIconBtn} onPress={onClose}>
            <X size={16} color={Colors.textSecondary} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* AI insight chip */}
        <View style={styles.aiChipWrap}>
          <LinearGradient
            colors={['#111827', '#1c1410']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.aiChip}
          >
            <View style={styles.aiChipIcon}>
              <Brain size={13} color={Colors.amber} strokeWidth={2} />
            </View>
            <Text style={styles.aiChipText}>
              <Text style={{ color: '#fff' }}>AI Tip: </Text>
              Souks are quietest before 10am — best time for photography.
            </Text>
          </LinearGradient>
        </View>

        {/* Day selector */}
        <ScrollView
          horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daySelector}
        >
          {DAYS.map(d => {
            const active = activeDay === d.num;
            return (
              <TouchableOpacity
                key={d.num}
                style={[styles.dayBtn, active && styles.dayBtnActive]}
                onPress={() => setActiveDay(d.num)}
                activeOpacity={0.8}
              >
                {active ? (
                  <LinearGradient
                    colors={[Colors.amber, Colors.orange]}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={styles.dayBtnGrad}
                  >
                    <Text style={styles.dayBtnLabelActive}>{d.label}</Text>
                    <Text style={styles.dayBtnDateActive}>{d.date}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.dayBtnInner}>
                    <Text style={styles.dayBtnLabel}>{d.label}</Text>
                    <Text style={styles.dayBtnDate}>{d.date}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Day header */}
        <View style={styles.dayHeader}>
          <View>
            <Text style={styles.dayHeaderTitle}>
              Day {activeDay} · {data.destination || 'Marrakech'}
            </Text>
            <View style={styles.dayHeaderMeta}>
              <Sun size={13} color={Colors.amber} strokeWidth={1.75} />
              <Text style={styles.dayHeaderMetaText}>Sunny · 24°C · {activities.length} activities</Text>
            </View>
          </View>
          <View style={styles.dayHeaderBadge}>
            <Text style={styles.dayHeaderBadgeText}>{activeDay}/{DAYS.length}</Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timeline}>
          {activities.map((a, i) => {
            const Icon = a.icon;
            return (
              <Animated.View
                key={i}
                style={styles.tlItem}
                entering={FadeInDown.delay(i * 70).duration(400)}
              >
                {/* Time */}
                <Text style={styles.tlTime}>{a.time}</Text>

                {/* Dot + line */}
                <View style={styles.tlTrack}>
                  <View style={[styles.tlDot, { backgroundColor: a.color }]} />
                  {i < activities.length - 1 && <View style={styles.tlLine} />}
                </View>

                {/* Card */}
                <TouchableOpacity
                  style={styles.tlCard}
                  activeOpacity={0.85}
                >
                  <View style={styles.tlCardTop}>
                    <View style={[styles.tlIconBox, { backgroundColor: `${a.color}15` }]}>
                      <Icon size={15} color={a.color} strokeWidth={1.75} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.tlTitle} numberOfLines={1}>{a.title}</Text>
                      <Text style={styles.tlDesc} numberOfLines={2}>{a.desc}</Text>
                    </View>
                    <View style={[styles.tlTypeBadge, { backgroundColor: `${a.color}15` }]}>
                      <Text style={[styles.tlTypeText, { color: a.color }]}>{a.type}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Stats strip */}
        <View style={styles.statsStrip}>
          {[
            { val: String(activities.length), key: 'Activities' },
            { val: '4★',   key: 'Avg Rating' },
            { val: '$180', key: 'Est. Cost' },
          ].map((s, i) => (
            <View key={i} style={[styles.statItem, i < 2 && styles.statBorder]}>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statKey}>{s.key}</Text>
            </View>
          ))}
        </View>

        {/* Map card */}
        <View style={styles.mapCard}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1628962600458-1704b2cb1fb3?w=600&q=80' }}
            style={styles.mapImg}
            resizeMode="cover"
            imageStyle={{ borderRadius: Radius.lg }}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.6)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.mapPin}>
              <LinearGradient
                colors={[Colors.amber, Colors.orange]}
                style={styles.mapPinGrad}
              >
                <MapPin size={14} color="#fff" strokeWidth={2.5} />
              </LinearGradient>
            </View>
            <View style={styles.mapLabel}>
              <Text style={styles.mapLabelText}>{data.destination || 'Marrakech'}</Text>
              <TouchableOpacity style={styles.mapViewBtn}>
                <Text style={styles.mapViewBtnText}>View map</Text>
                <ArrowRight size={11} color={Colors.amber} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Local insight */}
        <View style={styles.insightCard}>
          <LinearGradient
            colors={[Colors.amber, Colors.orange]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.insightGrad}
          >
            <Text style={styles.insightQuote}>
              "The best time to visit the souks is early morning — the light is magical and the vendors are generous."
            </Text>
            <Text style={styles.insightAttrib}>— Local guide, Marrakech</Text>
          </LinearGradient>
        </View>

        {/* Save / Export */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85}>
            <LinearGradient
              colors={[Colors.amber, Colors.orange]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.saveBtnGrad}
            >
              <Download size={16} color="#fff" strokeWidth={2} />
              <Text style={styles.saveBtnText}>Save Itinerary</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn} activeOpacity={0.8}>
            <Share2 size={16} color={Colors.textSecondary} strokeWidth={1.75} />
          </TouchableOpacity>
        </View>

        <View style={{ height: Spacing.xxl * 2 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },

  navTopBar: { height: 3 },
  navbar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  navLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  navLogoMark: {
    width: 32, height: 32, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  navLogoLetter: { fontFamily: Typography.sansBold, color: '#fff', fontSize: 13 },
  navTitle: { fontFamily: Typography.sansBold, color: Colors.textPrimary, fontSize: 14 },
  navSub: { fontFamily: Typography.sans, color: Colors.textMuted, fontSize: 11, marginTop: 1 },
  navRight: { flexDirection: 'row', gap: 8 },
  navIconBtn: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: Colors.bgPage, borderWidth: 1.5, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },

  // AI chip
  aiChipWrap: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md },
  aiChip: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: Radius.md, padding: 12,
  },
  aiChipIcon: {
    width: 26, height: 26, borderRadius: 8,
    backgroundColor: 'rgba(245,158,11,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  aiChipText: {
    flex: 1, fontFamily: Typography.sans,
    color: 'rgba(255,255,255,0.55)', fontSize: 12, lineHeight: 17,
  },

  // Day selector
  daySelector: {
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, gap: 8,
  },
  dayBtn: {
    borderRadius: Radius.md, borderWidth: 1.5, borderColor: Colors.border,
    overflow: 'hidden', minWidth: 80,
  },
  dayBtnActive: { borderColor: Colors.amber, ...Shadows.amber },
  dayBtnGrad: { paddingHorizontal: 16, paddingVertical: 10, alignItems: 'center' },
  dayBtnInner: { paddingHorizontal: 16, paddingVertical: 10, alignItems: 'center' },
  dayBtnLabel: { fontFamily: Typography.sansBold, color: Colors.textMuted, fontSize: 12 },
  dayBtnDate: { fontFamily: Typography.sans, color: Colors.textFaint, fontSize: 10, marginTop: 2 },
  dayBtnLabelActive: { fontFamily: Typography.sansBold, color: '#fff', fontSize: 12 },
  dayBtnDateActive: { fontFamily: Typography.sans, color: 'rgba(255,255,255,0.75)', fontSize: 10, marginTop: 2 },

  // Day header
  dayHeader: {
    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, marginBottom: Spacing.md,
  },
  dayHeaderTitle: { fontFamily: Typography.sansBold, color: Colors.textPrimary, fontSize: 16, marginBottom: 4 },
  dayHeaderMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dayHeaderMetaText: { fontFamily: Typography.sans, color: Colors.textMuted, fontSize: 12 },
  dayHeaderBadge: {
    paddingHorizontal: 10, paddingVertical: 4,
    backgroundColor: Colors.amberTintBg, borderRadius: Radius.pill,
    borderWidth: 1, borderColor: Colors.amberTintBorder,
  },
  dayHeaderBadgeText: { fontFamily: Typography.sansBold, color: Colors.amberDark, fontSize: 11 },

  // Timeline
  timeline: { paddingHorizontal: Spacing.lg, gap: 0 },
  tlItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 4 },
  tlTime: {
    fontFamily: Typography.sansBold, color: Colors.textMuted,
    fontSize: 10, width: 38, paddingTop: 14,
  },
  tlTrack: { alignItems: 'center', paddingTop: 14 },
  tlDot: { width: 8, height: 8, borderRadius: 4, marginBottom: 2 },
  tlLine: { width: 1, flex: 1, backgroundColor: Colors.border, minHeight: 40 },
  tlCard: {
    flex: 1, backgroundColor: Colors.bgPage,
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.md,
    padding: 12, marginBottom: 8,
  },
  tlCardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  tlIconBox: {
    width: 32, height: 32, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  tlTitle: {
    fontFamily: Typography.sansBold, color: Colors.textPrimary,
    fontSize: 13, marginBottom: 3, flex: 1,
  },
  tlDesc: {
    fontFamily: Typography.sans, color: Colors.textSecondary,
    fontSize: 11, lineHeight: 15,
  },
  tlTypeBadge: {
    paddingHorizontal: 7, paddingVertical: 2, borderRadius: Radius.pill, marginTop: 2,
  },
  tlTypeText: { fontFamily: Typography.sansBold, fontSize: 9, letterSpacing: 0.4 },

  // Stats
  statsStrip: {
    flexDirection: 'row', marginHorizontal: Spacing.lg, marginVertical: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.lg,
    borderWidth: 1.5, borderColor: Colors.border, overflow: 'hidden',
    ...Shadows.card,
  },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  statBorder: { borderRightWidth: 1, borderRightColor: Colors.border },
  statVal: { fontFamily: Typography.serif, color: Colors.textPrimary, fontSize: 18, letterSpacing: -0.3 },
  statKey: {
    fontFamily: Typography.sansMedium, color: Colors.textMuted,
    fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 2,
  },

  // Map
  mapCard: { marginHorizontal: Spacing.lg, marginBottom: Spacing.md },
  mapImg: { height: 140, borderRadius: Radius.lg, overflow: 'hidden' },
  mapPin: {
    position: 'absolute', top: '35%', left: '45%',
    ...Shadows.amber,
  },
  mapPinGrad: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  mapLabel: {
    position: 'absolute', bottom: 14, left: 14, right: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  mapLabelText: { fontFamily: Typography.serif, color: '#fff', fontSize: 18 },
  mapViewBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  mapViewBtnText: { fontFamily: Typography.sansBold, color: Colors.amber, fontSize: 11 },

  // Insight
  insightCard: { marginHorizontal: Spacing.lg, marginBottom: Spacing.md, borderRadius: Radius.lg, overflow: 'hidden' },
  insightGrad: { padding: 18 },
  insightQuote: {
    fontFamily: Typography.serifItalic, color: 'rgba(0,0,0,0.75)',
    fontSize: 15, lineHeight: 22, marginBottom: 8,
  },
  insightAttrib: {
    fontFamily: Typography.sansMedium, color: 'rgba(0,0,0,0.5)', fontSize: 11,
  },

  // Actions
  actionRow: {
    flexDirection: 'row', paddingHorizontal: Spacing.lg, gap: 10,
  },
  saveBtn: { flex: 1, borderRadius: Radius.md, overflow: 'hidden', ...Shadows.amber },
  saveBtnGrad: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14,
  },
  saveBtnText: { fontFamily: Typography.sansBold, color: '#fff', fontSize: 14 },
  shareBtn: {
    width: 50, borderRadius: Radius.md,
    backgroundColor: Colors.bgPage, borderWidth: 1.5, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
});
