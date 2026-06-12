// components/wizard/Step4Processing.tsx
import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withRepeat, withTiming, withSequence,
  withDelay, Easing, interpolate,
  FadeInDown, ZoomIn,
} from 'react-native-reanimated';
import { Brain } from 'lucide-react-native';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import type { WizardData } from '../../app/wizard/index';

const { width } = Dimensions.get('window');

type Props = {
  data: WizardData;
  onComplete: () => void;
};

const STEPS_INFO = [
  { label: 'Analyzing your preferences',   icon: '🎯' },
  { label: 'Researching destinations',      icon: '🗺️' },
  { label: 'Crafting your itinerary',       icon: '✨' },
  { label: 'Adding local recommendations', icon: '📍' },
];

export default function Step4Processing({ data, onComplete }: Props) {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressVal = useSharedValue(0);

  // Ring animations
  const ring1 = useSharedValue(0);
  const ring2 = useSharedValue(0);
  const ring3 = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    // Rotate rings
    ring1.value = withRepeat(withTiming(1, { duration: 4000, easing: Easing.linear }), -1, false);
    ring2.value = withRepeat(withTiming(1, { duration: 6000, easing: Easing.linear }), -1, false);
    ring3.value = withRepeat(withTiming(1, { duration: 8000, easing: Easing.linear }), -1, false);

    // Pulse orb
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: 1200 }),
        withTiming(1, { duration: 1200 }),
      ), -1, false
    );

    // Progress simulation
    const duration = 3500;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(Math.round(pct * 100));
      progressVal.value = pct;

      const stepIdx = Math.floor(pct * STEPS_INFO.length);
      setCurrentStep(Math.min(stepIdx, STEPS_INFO.length - 1));

      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeout(onComplete, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const ring1Style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ring1.value * 360}deg` }],
  }));
  const ring2Style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-ring2.value * 360}deg` }],
  }));
  const ring3Style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ring3.value * 180}deg` }],
  }));
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progressVal.value * 100}%`,
  }));

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#0a0704', '#111827', '#0a0704']}
        style={StyleSheet.absoluteFill}
      />

      {/* Ambient glow */}
      <View style={styles.ambientGlow} />

      <View style={styles.content}>

        {/* Orb + rings */}
        <View style={styles.orbWrap}>
          {/* Ring 3 */}
          <Animated.View style={[styles.ring, styles.ring3, ring3Style]}>
            <View style={styles.ringDot} />
          </Animated.View>

          {/* Ring 2 */}
          <Animated.View style={[styles.ring, styles.ring2, ring2Style]}>
            <View style={[styles.ringDot, { backgroundColor: Colors.orange }]} />
          </Animated.View>

          {/* Ring 1 */}
          <Animated.View style={[styles.ring, styles.ring1, ring1Style]}>
            <View style={[styles.ringDot, { width: 12, height: 12, backgroundColor: Colors.amberLight }]} />
          </Animated.View>

          {/* Core */}
          <Animated.View style={[styles.orb, pulseStyle]}>
            <LinearGradient
              colors={['#1f2937', '#111827']}
              style={styles.orbGrad}
            >
              <LinearGradient
                colors={[Colors.amber, Colors.orange]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={styles.orbIconBox}
              >
                <Brain size={28} color="#fff" strokeWidth={1.75} />
              </LinearGradient>
            </LinearGradient>
          </Animated.View>
        </View>

        {/* Step pills */}
        <Animated.View style={styles.stepPills} entering={FadeInDown.delay(300).duration(500)}>
          {STEPS_INFO.map((s, i) => {
            const isDone = i < currentStep;
            const isActive = i === currentStep;
            return (
              <View
                key={i}
                style={[
                  styles.stepPill,
                  isActive && styles.stepPillActive,
                  isDone && styles.stepPillDone,
                ]}
              >
                <Text style={[
                  styles.stepPillText,
                  isActive && styles.stepPillTextActive,
                  isDone && styles.stepPillTextDone,
                ]}>
                  {isDone ? '✓' : s.icon}
                </Text>
              </View>
            );
          })}
        </Animated.View>

        {/* Headline */}
        <Animated.Text style={styles.headline} entering={FadeInDown.delay(400).duration(600)}>
          {STEPS_INFO[currentStep]?.label}
        </Animated.Text>

        <Animated.Text style={styles.destination} entering={FadeInDown.delay(500).duration(600)}>
          {data.destination || 'Morocco'}
        </Animated.Text>

        {/* Progress */}
        <Animated.View style={styles.progressWrap} entering={FadeInDown.delay(600).duration(500)}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, progressBarStyle]}>
              <LinearGradient
                colors={[Colors.amber, Colors.orange, Colors.amber]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>
          <Text style={styles.progressPct}>{progress}%</Text>
        </Animated.View>

        {/* Floating dots */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const r = 160;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <Animated.View
              key={i}
              style={[
                styles.floatingDot,
                {
                  left: width / 2 + x - 4,
                  top: 220 + y - 4,
                },
              ]}
              entering={ZoomIn.delay(i * 100).duration(400)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },

  ambientGlow: {
    position: 'absolute',
    width: 400, height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(245,158,11,0.06)',
    top: '30%', left: '50%',
    transform: [{ translateX: -200 }, { translateY: -200 }],
  },

  // Rings
  orbWrap: { width: 220, height: 220, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xl },
  ring: {
    position: 'absolute', borderRadius: 999,
    borderWidth: 1, borderColor: 'rgba(245,158,11,0.2)',
    alignItems: 'flex-start', justifyContent: 'center',
  },
  ring1: { width: 160, height: 160, borderColor: 'rgba(245,158,11,0.3)' },
  ring2: { width: 195, height: 195, borderColor: 'rgba(234,88,12,0.2)' },
  ring3: { width: 220, height: 220, borderColor: 'rgba(245,158,11,0.1)' },
  ringDot: {
    position: 'absolute', left: -5, top: '50%',
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: Colors.amber, marginTop: -5,
  },

  orb: {
    width: 100, height: 100, borderRadius: 50,
    overflow: 'hidden',
    shadowColor: Colors.amber, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
  },
  orbGrad: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    borderRadius: 50,
  },
  orbIconBox: {
    width: 56, height: 56, borderRadius: 17,
    alignItems: 'center', justifyContent: 'center',
  },

  // Step pills
  stepPills: {
    flexDirection: 'row', gap: 8, marginBottom: Spacing.lg,
  },
  stepPill: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', justifyContent: 'center',
  },
  stepPillActive: {
    backgroundColor: Colors.amber,
    borderColor: Colors.amber,
    shadowColor: Colors.amber, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 10, elevation: 6,
  },
  stepPillDone: {
    backgroundColor: 'rgba(245,158,11,0.2)',
    borderColor: 'rgba(245,158,11,0.4)',
  },
  stepPillText: { fontSize: 14 },
  stepPillTextActive: { color: '#fff', fontFamily: Typography.sansBold, fontSize: 12 },
  stepPillTextDone: { color: Colors.amber, fontFamily: Typography.sansBold, fontSize: 12 },

  headline: {
    fontFamily: Typography.serif, color: '#fff',
    fontSize: 22, textAlign: 'center', marginBottom: 6,
    letterSpacing: -0.2,
  },
  destination: {
    fontFamily: Typography.serifItalic, color: Colors.amber,
    fontSize: 18, textAlign: 'center', marginBottom: Spacing.xl,
  },

  // Progress
  progressWrap: { width: '80%', alignItems: 'center', gap: 10 },
  progressTrack: {
    width: '100%', height: 6, backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 3, overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3 },
  progressPct: {
    fontFamily: Typography.serif, color: 'rgba(255,255,255,0.4)',
    fontSize: 14, letterSpacing: -0.2,
  },

  // Floating dots
  floatingDot: {
    position: 'absolute',
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: 'rgba(245,158,11,0.25)',
    borderWidth: 1, borderColor: 'rgba(245,158,11,0.4)',
  },
});
