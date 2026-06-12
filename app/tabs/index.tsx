// app/tabs/index.tsx  — Home Screen
import {
  View, Text, ScrollView, TouchableOpacity,
  ImageBackground, StyleSheet, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown, FadeInUp, FadeIn,
} from 'react-native-reanimated';
import {
  Compass, Star, ArrowRight, Sparkles,
  MapPin, Brain, Wallet, Zap,
} from 'lucide-react-native';
import { Colors, Typography, Spacing, Radius, Shadows } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

const HERO_IMAGE = 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&q=80';

const HOW_STEPS = [
  { n: '01', icon: Sparkles,  title: 'Your Preferences', desc: 'Tell us your travel style, budget and interests.' },
  { n: '02', icon: MapPin,    title: 'AI Plans It',       desc: 'We craft a personalized itinerary in seconds.' },
  { n: '03', icon: Brain,     title: 'Customize',         desc: 'Swap destinations and fine-tune every detail.' },
  { n: '04', icon: Compass,   title: 'Travel Free',       desc: 'Set off with bookings and local tips ready.' },
];

const FEATURES = [
  { icon: Brain,  title: 'Personalized Itineraries', desc: 'AI tailored to your unique travel style.' },
  { icon: Wallet, title: 'Smart Budget Planning',    desc: 'Maximize value at every price point.' },
  { icon: Zap,    title: 'Real-Time Optimization',  desc: 'Dynamic adjustments based on live data.' },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

      {/* ── Hero ─────────────────────────────── */}
      <View style={[styles.hero, { height: height * 0.72 }]}>
        <ImageBackground
          source={{ uri: HERO_IMAGE }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.12)', 'rgba(10,7,4,0.78)', 'rgba(10,7,4,0.96)']}
            locations={[0, 0.55, 1]}
            style={StyleSheet.absoluteFill}
          />
        </ImageBackground>

        {/* Navbar */}
        <View style={[styles.navbar, { paddingTop: insets.top + 8 }]}>
          <View style={styles.logoRow}>
            <LinearGradient
              colors={[Colors.amber, Colors.orange]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.logoMark}
            >
              <Text style={styles.logoLetter}>M</Text>
            </LinearGradient>
            <Text style={styles.logoName}>MarocTrip AI</Text>
          </View>
          <TouchableOpacity style={styles.signInBtn}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* Hero content */}
        <View style={styles.heroContent}>
          <Animated.View entering={FadeInDown.delay(100).duration(600)}>
            <View style={styles.heroPill}>
              <MapPin size={11} color={Colors.amber} strokeWidth={2.5} />
              <Text style={styles.heroPillText}>Morocco · Your journey starts here</Text>
            </View>
          </Animated.View>

          <Animated.Text
            style={styles.heroHeadline}
            entering={FadeInDown.delay(200).duration(700)}
          >
            Your{' '}
            <Text style={styles.heroHeadlineItalic}>perfect{'\n'}</Text>
            Moroccan adventure
          </Animated.Text>

          <Animated.Text
            style={styles.heroSub}
            entering={FadeInDown.delay(320).duration(600)}
          >
            AI-powered itineraries crafted around you — from imperial cities to golden dunes.
          </Animated.Text>

          {/* Stars trust signal */}
          <Animated.View style={styles.starsRow} entering={FadeInDown.delay(420).duration(500)}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} color={Colors.amber} fill={Colors.amber} />
            ))}
            <Text style={styles.starsLabel}>Trusted by 50,000+ travelers</Text>
          </Animated.View>

          {/* CTAs */}
          <Animated.View style={styles.ctaRow} entering={FadeInUp.delay(500).duration(600)}>
            <TouchableOpacity
              style={styles.ctaPrimary}
              onPress={() => router.push('/wizard')}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[Colors.amber, Colors.orange]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.ctaPrimaryGrad}
              >
                <Compass size={17} color="#fff" strokeWidth={2} />
                <Text style={styles.ctaPrimaryText}>Plan my trip</Text>
                <ArrowRight size={15} color="#fff" strokeWidth={2.5} />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ctaSecondary} activeOpacity={0.75}>
              <Text style={styles.ctaSecondaryText}>See examples</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      {/* ── How It Works ─────────────────────── */}
      <View style={styles.section}>
        <Animated.View entering={FadeInDown.delay(50).duration(600)}>
          <View style={styles.overline}>
            <View style={styles.overlineDot} />
            <Text style={styles.overlineText}>How it works</Text>
          </View>
          <Text style={styles.sectionHeadline}>
            Four steps to your{'\n'}
            <Text style={styles.sectionHeadlineItalic}>perfect journey</Text>
          </Text>
        </Animated.View>

        <View style={styles.stepsGrid}>
          {HOW_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Animated.View
                key={i}
                style={styles.stepCard}
                entering={FadeInDown.delay(80 + i * 80).duration(500)}
              >
                <View style={styles.stepTopRow}>
                  <Text style={styles.stepNumeral}>{step.n}</Text>
                  <View style={styles.stepIconBox}>
                    <Icon size={18} color={Colors.amber} strokeWidth={1.75} />
                  </View>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </Animated.View>
            );
          })}
        </View>
      </View>

      {/* ── Features ─────────────────────────── */}
      <View style={[styles.section, { backgroundColor: Colors.bgPage }]}>
        <View style={styles.overline}>
          <View style={styles.overlineDot} />
          <Text style={styles.overlineText}>Features</Text>
        </View>
        <Text style={styles.sectionHeadline}>
          Planning made{'\n'}
          <Text style={styles.sectionHeadlineItalic}>effortlessly smart</Text>
        </Text>

        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <Animated.View
              key={i}
              style={styles.featureRow}
              entering={FadeInDown.delay(60 + i * 80).duration(500)}
            >
              <View style={styles.featureIconBox}>
                <Icon size={20} color={Colors.amber} strokeWidth={1.75} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </Animated.View>
          );
        })}

        <TouchableOpacity
          style={styles.featureCta}
          onPress={() => router.push('/wizard')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.amber, Colors.orange]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.featureCtaGrad}
          >
            <Brain size={15} color="#fff" strokeWidth={2} />
            <Text style={styles.featureCtaText}>Try AI Planning Free</Text>
            <ArrowRight size={14} color="#fff" strokeWidth={2.5} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* ── Stats strip ──────────────────────── */}
      <View style={styles.statsStrip}>
        {[
          { val: '50K+', label: 'Travelers' },
          { val: '200+', label: 'Destinations' },
          { val: '4.9★', label: 'Rating' },
          { val: '24/7', label: 'Support' },
        ].map((s, i) => (
          <View key={i} style={[styles.statItem, i < 3 && styles.statBorder]}>
            <Text style={styles.statVal}>{s.val}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: Spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },

  // Hero
  hero: { position: 'relative' },
  navbar: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoMark: {
    width: 32, height: 32, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  logoLetter: { fontFamily: Typography.sansBold, color: '#fff', fontSize: 14 },
  logoName: { fontFamily: Typography.serif, color: '#fff', fontSize: 17, letterSpacing: 0.3 },
  signInBtn: {
    paddingHorizontal: 16, paddingVertical: 7,
    borderRadius: Radius.pill,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
  },
  signInText: { fontFamily: Typography.sansMedium, color: '#fff', fontSize: 12 },

  heroContent: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: Spacing.lg, paddingBottom: Spacing.xl,
  },
  heroPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: Radius.pill,
    alignSelf: 'flex-start', marginBottom: Spacing.md,
  },
  heroPillText: { fontFamily: Typography.sansMedium, color: 'rgba(255,255,255,0.6)', fontSize: 11 },
  heroHeadline: {
    fontFamily: Typography.serif, color: '#fff',
    fontSize: 44, lineHeight: 48, letterSpacing: -0.5,
    marginBottom: Spacing.md,
  },
  heroHeadlineItalic: { fontFamily: Typography.serifItalic, color: Colors.amberLight },
  heroSub: {
    fontFamily: Typography.sans, color: 'rgba(255,255,255,0.55)',
    fontSize: 14, lineHeight: 22, marginBottom: Spacing.md,
  },
  starsRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: Spacing.lg },
  starsLabel: { fontFamily: Typography.sansMedium, color: 'rgba(255,255,255,0.4)', fontSize: 11, marginLeft: 6 },
  ctaRow: { flexDirection: 'row', gap: 10 },
  ctaPrimary: { flex: 1, borderRadius: Radius.md, overflow: 'hidden', ...Shadows.amber },
  ctaPrimaryGrad: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14, paddingHorizontal: 20,
  },
  ctaPrimaryText: { fontFamily: Typography.sansBold, color: '#fff', fontSize: 14 },
  ctaSecondary: {
    paddingHorizontal: 18, paddingVertical: 14,
    borderRadius: Radius.md,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  ctaSecondaryText: { fontFamily: Typography.sansMedium, color: 'rgba(255,255,255,0.7)', fontSize: 13 },

  // Section
  section: {
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.section,
    backgroundColor: Colors.white,
  },
  overline: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  overlineDot: { width: 20, height: 1.5, backgroundColor: Colors.amber, borderRadius: 1 },
  overlineText: {
    fontFamily: Typography.sansBold, color: Colors.amberDark,
    fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
  },
  sectionHeadline: {
    fontFamily: Typography.serif, color: Colors.textPrimary,
    fontSize: 38, lineHeight: 42, letterSpacing: -0.3, marginBottom: Spacing.xl,
  },
  sectionHeadlineItalic: { fontFamily: Typography.serifItalic, color: Colors.orange },

  // Steps 2-col grid
  stepsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  stepCard: {
    width: (width - Spacing.lg * 2 - 12) / 2,
    backgroundColor: Colors.bgMuted,
    borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: Radius.lg, padding: Spacing.md,
    ...Shadows.card,
  },
  stepTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  stepNumeral: {
    fontFamily: Typography.serif, color: Colors.textFaint,
    fontSize: 12, letterSpacing: 1.5,
  },
  stepIconBox: {
    width: 36, height: 36, borderRadius: 11,
    backgroundColor: Colors.amberTintBg,
    borderWidth: 1.5, borderColor: Colors.amberTintBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  stepTitle: {
    fontFamily: Typography.sansBold, color: Colors.textPrimary,
    fontSize: 13, marginBottom: 5, lineHeight: 18,
  },
  stepDesc: {
    fontFamily: Typography.sans, color: Colors.textSecondary,
    fontSize: 12, lineHeight: 17,
  },

  // Features
  featureRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 14,
    padding: 16, borderRadius: Radius.md,
    borderWidth: 1.5, borderColor: 'transparent',
    marginBottom: 4,
  },
  featureIconBox: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: Colors.amberTintBg,
    borderWidth: 1.5, borderColor: Colors.amberTintBorder,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  featureTitle: {
    fontFamily: Typography.sansBold, color: Colors.textPrimary,
    fontSize: 14, marginBottom: 3, letterSpacing: -0.2,
  },
  featureDesc: {
    fontFamily: Typography.sans, color: Colors.textSecondary,
    fontSize: 12, lineHeight: 17,
  },
  featureCta: {
    marginTop: Spacing.xl, borderRadius: Radius.md,
    overflow: 'hidden', ...Shadows.amber,
  },
  featureCtaGrad: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14,
  },
  featureCtaText: { fontFamily: Typography.sansBold, color: '#fff', fontSize: 14 },

  // Stats
  statsStrip: {
    flexDirection: 'row', backgroundColor: Colors.white,
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.border,
  },
  statItem: {
    flex: 1, alignItems: 'center', paddingVertical: Spacing.xl,
  },
  statBorder: { borderRightWidth: 1, borderRightColor: Colors.border },
  statVal: {
    fontFamily: Typography.serif, color: Colors.textPrimary,
    fontSize: 26, letterSpacing: -0.5, marginBottom: 3,
  },
  statLabel: {
    fontFamily: Typography.sansMedium, color: Colors.textMuted,
    fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.8,
  },
});
