// components/wizard/WizardLayout.tsx
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { ArrowLeft, X } from 'lucide-react-native';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';

type Props = {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onClose: () => void;
  children: React.ReactNode;
};

const STEP_LABELS = ['Destination', 'Style & Budget', 'Interests'];

export default function WizardLayout({ step, totalSteps, onBack, onClose, children }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Animated gradient top bar */}
      <LinearGradient
        colors={[Colors.amber, Colors.orange, Colors.amber]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={styles.topBar}
      />

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navBtn} onPress={onBack} activeOpacity={0.7}>
          <ArrowLeft size={20} color={Colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>

        {/* Logo */}
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

        <TouchableOpacity style={styles.navBtn} onPress={onClose} activeOpacity={0.7}>
          <X size={20} color={Colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Step indicators */}
      <View style={styles.stepsRow}>
        {STEP_LABELS.map((label, i) => {
          const num = i + 1;
          const isActive = num === step;
          const isDone = num < step;
          return (
            <View key={i} style={styles.stepItem}>
              <View style={[
                styles.stepDot,
                isActive && styles.stepDotActive,
                isDone && styles.stepDotDone,
              ]}>
                {isDone ? (
                  <Text style={styles.stepDotCheck}>✓</Text>
                ) : (
                  <Text style={[styles.stepDotNum, isActive && styles.stepDotNumActive]}>
                    {num}
                  </Text>
                )}
              </View>
              {isActive && (
                <Text style={styles.stepLabel} numberOfLines={1}>{label}</Text>
              )}
              {i < totalSteps - 1 && (
                <View style={[styles.stepConnector, isDone && styles.stepConnectorDone]} />
              )}
            </View>
          );
        })}
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <Animated.View
          style={[
            styles.progressFill,
            { width: `${((step - 1) / (totalSteps - 1)) * 100}%` },
          ]}
        >
          <LinearGradient
            colors={[Colors.amber, Colors.orange]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  topBar: { height: 3 },

  navbar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingVertical: 12,
  },
  navBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: Colors.bgPage, borderWidth: 1.5, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoMark: {
    width: 28, height: 28, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
  logoLetter: { fontFamily: Typography.sansBold, color: '#fff', fontSize: 12 },
  logoName: { fontFamily: Typography.serif, color: Colors.textPrimary, fontSize: 16, letterSpacing: 0.3 },

  stepsRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
  },
  stepItem: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  stepDot: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.bgPage, borderWidth: 1.5, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: Colors.amberTintBg, borderColor: Colors.amber,
    shadowColor: Colors.amber, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 6, elevation: 3,
  },
  stepDotDone: { backgroundColor: Colors.amber, borderColor: Colors.amber },
  stepDotNum: { fontFamily: Typography.sansBold, color: Colors.textMuted, fontSize: 11 },
  stepDotNumActive: { color: Colors.amberDark },
  stepDotCheck: { fontFamily: Typography.sansBold, color: '#fff', fontSize: 12 },
  stepLabel: {
    fontFamily: Typography.sansMedium, color: Colors.amberDark,
    fontSize: 11, marginLeft: 6, letterSpacing: 0.1,
  },
  stepConnector: {
    flex: 1, height: 1.5, backgroundColor: Colors.border,
    marginHorizontal: 6,
  },
  stepConnectorDone: { backgroundColor: Colors.amber },

  progressTrack: {
    height: 3, backgroundColor: Colors.border,
    marginHorizontal: Spacing.lg, borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 2, overflow: 'hidden' },

  content: { flex: 1, paddingHorizontal: Spacing.lg },
});
