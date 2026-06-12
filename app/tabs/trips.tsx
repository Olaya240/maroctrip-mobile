// app/tabs/trips.tsx  — My Trips / Dashboard Screen
import {
  View, Text, ScrollView, TouchableOpacity,
  ImageBackground, StyleSheet, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MapPin, Calendar, Clock, ArrowRight, Plus, Star } from 'lucide-react-native';
import { Colors, Typography, Spacing, Radius, Shadows } from '../../constants/theme';

const { width } = Dimensions.get('window');

const TRIPS = [
  {
    id: '1',
    destination: 'Marrakech & Sahara',
    dates: 'Oct 15 – Oct 22, 2024',
    days: 7,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1628962600458-1704b2cb1fb3?w=800&q=80',
    activities: 14,
    rating: null,
  },
  {
    id: '2',
    destination: 'Chefchaouen Explorer',
    dates: 'Aug 3 – Aug 8, 2024',
    days: 5,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1707400015348-b0a5851ab163?w=600&q=80',
    activities: 9,
    rating: 4.8,
  },
];

const TODAY_ACTIVITIES = [
  { time: '09:00', title: 'Breakfast at Riad El Yacout', type: 'Food',    typeColor: '#ea580c' },
  { time: '11:00', title: 'Jemaa el-Fnaa Square Tour', type: 'Culture', typeColor: '#2563eb' },
  { time: '13:30', title: 'Rooftop Lunch — Medina',    type: 'Food',    typeColor: '#ea580c' },
  { time: '16:00', title: 'Souk Discovery Walk',        type: 'Explore', typeColor: '#9333ea' },
  { time: '19:30', title: 'Sunset at Koutoubia Mosque', type: 'Culture', typeColor: '#2563eb' },
];

export default function TripsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.root, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerOverline}>My Trips</Text>
          <Text style={styles.headerTitle}>Your <Text style={styles.headerTitleItalic}>journeys</Text></Text>
        </View>
        <TouchableOpacity
          style={styles.newTripBtn}
          onPress={() => router.push('/wizard')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[Colors.amber, Colors.orange]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.newTripGrad}
          >
            <Plus size={18} color="#fff" strokeWidth={2.5} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Active trip today card */}
      <View style={styles.todayCard}>
        <LinearGradient
          colors={['#111827', '#1c1410', '#0a0704']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.todayGrad}
        >
          {/* Animated top bar */}
          <LinearGradient
            colors={[Colors.amber, Colors.orange, Colors.amber]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.todayTopBar}
          />

          <View style={styles.todayHeader}>
            <View>
              <Text style={styles.todayOverline}>Day 1 · Active Trip</Text>
              <Text style={styles.todayTitle}>Marrakech</Text>
              <Text style={styles.todayDate}>Oct 15 · Sunny · 24°C</Text>
            </View>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>AI Generated</Text>
            </View>
          </View>

          {/* Timeline */}
          <Text style={styles.timelineLabel}>Today's Schedule</Text>
          {TODAY_ACTIVITIES.map((a, i) => (
            <View key={i} style={styles.timelineItem}>
              <Text style={styles.timelineTime}>{a.time}</Text>
              <View style={[styles.timelineDot, { backgroundColor: a.typeColor }]} />
              <Text style={styles.timelineTitle} numberOfLines={1}>{a.title}</Text>
              <View style={[styles.typeChip, { backgroundColor: `${a.typeColor}20` }]}>
                <Text style={[styles.typeText, { color: a.typeColor }]}>{a.type}</Text>
              </View>
            </View>
          ))}

          {/* Stats row */}
          <View style={styles.todayStats}>
            {[
              { val: '5', key: 'Activities' },
              { val: '4★', key: 'Avg Rating' },
              { val: '$180', key: 'Est. Cost' },
            ].map((s, i) => (
              <View key={i} style={[styles.todayStat, i < 2 && styles.todayStatBorder]}>
                <Text style={styles.todayStatVal}>{s.val}</Text>
                <Text style={styles.todayStatKey}>{s.key}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>

      {/* Trip list */}
      <View style={styles.tripsSection}>
        <Text style={styles.tripsSectionTitle}>All Trips</Text>

        {TRIPS.map((trip, i) => (
          <Animated.View
            key={trip.id}
            entering={FadeInDown.delay(i * 80).duration(500)}
          >
            <TouchableOpacity style={styles.tripCard} activeOpacity={0.9}>
              <ImageBackground
                source={{ uri: trip.image }}
                style={styles.tripCardImage}
                resizeMode="cover"
                imageStyle={{ borderRadius: Radius.md }}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.75)']}
                  style={StyleSheet.absoluteFill}
                />
                <View style={[
                  styles.tripStatusBadge,
                  { backgroundColor: trip.status === 'upcoming' ? Colors.amberTintBg : '#f0fdf4' },
                ]}>
                  <Text style={[
                    styles.tripStatusText,
                    { color: trip.status === 'upcoming' ? Colors.amberDark : '#16a34a' },
                  ]}>
                    {trip.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </Text>
                </View>
              </ImageBackground>

              <View style={styles.tripCardBody}>
                <View style={styles.tripCardLeft}>
                  <Text style={styles.tripCardName}>{trip.destination}</Text>
                  <View style={styles.tripMeta}>
                    <Calendar size={12} color={Colors.textMuted} strokeWidth={1.75} />
                    <Text style={styles.tripMetaText}>{trip.dates}</Text>
                  </View>
                  <View style={styles.tripMeta}>
                    <Clock size={12} color={Colors.textMuted} strokeWidth={1.75} />
                    <Text style={styles.tripMetaText}>{trip.days} days · {trip.activities} activities</Text>
                  </View>
                  {trip.rating && (
                    <View style={styles.tripMeta}>
                      <Star size={12} color={Colors.amber} fill={Colors.amber} />
                      <Text style={styles.tripMetaText}>{trip.rating}</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity style={styles.tripArrow}>
                  <ArrowRight size={16} color={Colors.textMuted} strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      <View style={{ height: Spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPage },

  header: {
    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.lg,
  },
  headerOverline: {
    fontFamily: Typography.sansBold, color: Colors.amberDark,
    fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4,
  },
  headerTitle: {
    fontFamily: Typography.serif, color: Colors.textPrimary,
    fontSize: 30, letterSpacing: -0.3,
  },
  headerTitleItalic: { fontFamily: Typography.serifItalic, color: Colors.orange },
  newTripBtn: { borderRadius: Radius.md, overflow: 'hidden', ...Shadows.amber },
  newTripGrad: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },

  // Today's active trip
  todayCard: {
    marginHorizontal: Spacing.lg, marginBottom: Spacing.lg,
    borderRadius: Radius.xl, overflow: 'hidden', ...Shadows.dark,
  },
  todayGrad: { borderRadius: Radius.xl, padding: Spacing.lg, paddingTop: 0 },
  todayTopBar: { height: 3, marginHorizontal: -Spacing.lg, marginBottom: Spacing.lg },
  todayHeader: {
    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  todayOverline: {
    fontFamily: Typography.sansMedium, color: 'rgba(245,158,11,0.7)',
    fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 3,
  },
  todayTitle: {
    fontFamily: Typography.serif, color: '#fff',
    fontSize: 24, letterSpacing: 0.2,
  },
  todayDate: { fontFamily: Typography.sans, color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 },
  aiBadge: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: Radius.pill,
    backgroundColor: 'rgba(245,158,11,0.18)',
    borderWidth: 1, borderColor: 'rgba(245,158,11,0.3)',
  },
  aiBadgeText: { fontFamily: Typography.sansBold, color: Colors.amberLight, fontSize: 9, letterSpacing: 0.8, textTransform: 'uppercase' },

  timelineLabel: {
    fontFamily: Typography.sansBold, color: Colors.textMuted,
    fontSize: 9, letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: 10,
  },
  timelineItem: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 7,
  },
  timelineTime: { fontFamily: Typography.sansBold, color: Colors.textMuted, fontSize: 10, width: 38 },
  timelineDot: { width: 7, height: 7, borderRadius: 4 },
  timelineTitle: { fontFamily: Typography.sansMedium, color: 'rgba(255,255,255,0.7)', fontSize: 12, flex: 1 },
  typeChip: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: Radius.pill },
  typeText: { fontFamily: Typography.sansBold, fontSize: 9, letterSpacing: 0.5 },

  todayStats: {
    flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)',
    marginTop: Spacing.md, paddingTop: Spacing.md,
  },
  todayStat: { flex: 1, alignItems: 'center' },
  todayStatBorder: { borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.06)' },
  todayStatVal: { fontFamily: Typography.serif, color: '#fff', fontSize: 18, letterSpacing: -0.3 },
  todayStatKey: { fontFamily: Typography.sansMedium, color: 'rgba(255,255,255,0.3)', fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 2 },

  // Trip list
  tripsSection: { paddingHorizontal: Spacing.lg },
  tripsSectionTitle: {
    fontFamily: Typography.sansBold, color: Colors.textPrimary,
    fontSize: 16, marginBottom: Spacing.md, letterSpacing: -0.2,
  },

  tripCard: {
    backgroundColor: Colors.white, borderRadius: Radius.lg,
    borderWidth: 1.5, borderColor: Colors.border, marginBottom: 12,
    overflow: 'hidden', ...Shadows.card,
  },
  tripCardImage: { height: 120, width: '100%', justifyContent: 'flex-end' },
  tripStatusBadge: {
    position: 'absolute', top: 12, right: 12,
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: Radius.pill,
  },
  tripStatusText: { fontFamily: Typography.sansBold, fontSize: 10, letterSpacing: 0.3 },
  tripCardBody: {
    flexDirection: 'row', alignItems: 'center',
    padding: Spacing.md,
  },
  tripCardLeft: { flex: 1, gap: 5 },
  tripCardName: {
    fontFamily: Typography.sansBold, color: Colors.textPrimary,
    fontSize: 15, letterSpacing: -0.2, marginBottom: 2,
  },
  tripMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  tripMetaText: { fontFamily: Typography.sans, color: Colors.textMuted, fontSize: 12 },
  tripArrow: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: Colors.bgPage, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
});
