// app/tabs/profile.tsx
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  User, Settings, Heart, Bell, Shield, HelpCircle,
  ChevronRight, Star, MapPin, LogOut,
} from 'lucide-react-native';
import { Colors, Typography, Spacing, Radius, Shadows } from '../../constants/theme';

const MENU = [
  { icon: Heart,       label: 'Saved Destinations',  badge: '12' },
  { icon: Bell,        label: 'Notifications',        badge: '3' },
  { icon: Settings,    label: 'Preferences',          badge: null },
  { icon: Shield,      label: 'Privacy & Security',   badge: null },
  { icon: HelpCircle,  label: 'Help Center',          badge: null },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.root, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Avatar + info */}
      <View style={styles.profileHeader}>
        <LinearGradient
          colors={[Colors.amber, Colors.orange]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.avatar}
        >
          <User size={28} color="#fff" strokeWidth={1.75} />
        </LinearGradient>
        <Text style={styles.userName}>Traveler</Text>
        <Text style={styles.userEmail}>hello@maroctrip.ai</Text>

        <View style={styles.statsRow}>
          {[
            { val: '3', label: 'Trips' },
            { val: '12', label: 'Saved' },
            { val: '4.9', label: 'Rating' },
          ].map((s, i) => (
            <View key={i} style={[styles.profileStat, i < 2 && styles.profileStatBorder]}>
              <Text style={styles.profileStatVal}>{s.val}</Text>
              <Text style={styles.profileStatLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Pro upgrade card */}
      <View style={styles.proCard}>
        <LinearGradient
          colors={['#111827', '#1c1410']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.proGrad}
        >
          <LinearGradient
            colors={[Colors.amber, Colors.orange, Colors.amber]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.proTopBar}
          />
          <View style={styles.proContent}>
            <View>
              <Text style={styles.proLabel}>Free Explorer</Text>
              <Text style={styles.proTitle}>Upgrade to Pro</Text>
              <Text style={styles.proBenefits}>Unlimited destinations · AI personalization</Text>
            </View>
            <TouchableOpacity style={styles.proBtn} activeOpacity={0.85}>
              <LinearGradient
                colors={[Colors.amber, Colors.orange]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.proBtnGrad}
              >
                <Text style={styles.proBtnText}>$29/mo</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {MENU.map((item, i) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={i}
              style={[styles.menuItem, i < MENU.length - 1 && styles.menuItemBorder]}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconBox}>
                <Icon size={18} color={Colors.amber} strokeWidth={1.75} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <View style={styles.menuRight}>
                {item.badge && (
                  <View style={styles.menuBadge}>
                    <Text style={styles.menuBadgeText}>{item.badge}</Text>
                  </View>
                )}
                <ChevronRight size={16} color={Colors.textFaint} strokeWidth={2} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Sign out */}
      <TouchableOpacity style={styles.signOut} activeOpacity={0.7}>
        <LogOut size={17} color="#ef4444" strokeWidth={1.75} />
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>

      <View style={{ height: Spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPage },

  profileHeader: {
    alignItems: 'center', padding: Spacing.xl,
    backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 26,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md,
    ...Shadows.amber,
  },
  userName: { fontFamily: Typography.serif, color: Colors.textPrimary, fontSize: 24, marginBottom: 4 },
  userEmail: { fontFamily: Typography.sans, color: Colors.textMuted, fontSize: 13, marginBottom: Spacing.lg },

  statsRow: {
    flexDirection: 'row', width: '80%',
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  profileStat: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  profileStatBorder: { borderRightWidth: 1, borderRightColor: Colors.border },
  profileStatVal: { fontFamily: Typography.serif, color: Colors.textPrimary, fontSize: 20, letterSpacing: -0.3 },
  profileStatLabel: { fontFamily: Typography.sansMedium, color: Colors.textMuted, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 2 },

  proCard: {
    margin: Spacing.lg, borderRadius: Radius.xl, overflow: 'hidden', ...Shadows.dark,
  },
  proGrad: { borderRadius: Radius.xl, paddingBottom: Spacing.lg },
  proTopBar: { height: 3, marginBottom: Spacing.lg },
  proContent: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
  },
  proLabel: { fontFamily: Typography.sansMedium, color: 'rgba(245,158,11,0.5)', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 },
  proTitle: { fontFamily: Typography.serif, color: '#fff', fontSize: 20, marginBottom: 4 },
  proBenefits: { fontFamily: Typography.sans, color: 'rgba(255,255,255,0.35)', fontSize: 11 },
  proBtn: { borderRadius: Radius.md, overflow: 'hidden', ...Shadows.amber },
  proBtnGrad: { paddingHorizontal: 18, paddingVertical: 12 },
  proBtnText: { fontFamily: Typography.sansBold, color: '#fff', fontSize: 13 },

  menu: {
    marginHorizontal: Spacing.lg, marginBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg, borderWidth: 1.5, borderColor: Colors.border,
    overflow: 'hidden', ...Shadows.card,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: 15, gap: 12,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  menuIconBox: {
    width: 36, height: 36, borderRadius: 11,
    backgroundColor: Colors.amberTintBg, borderWidth: 1.5, borderColor: Colors.amberTintBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  menuLabel: { flex: 1, fontFamily: Typography.sansMedium, color: Colors.textPrimary, fontSize: 14 },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  menuBadge: {
    paddingHorizontal: 7, paddingVertical: 2, borderRadius: Radius.pill,
    backgroundColor: Colors.amberTintBg, borderWidth: 1, borderColor: Colors.amberTintBorder,
  },
  menuBadgeText: { fontFamily: Typography.sansBold, color: Colors.amberDark, fontSize: 10 },

  signOut: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.md, borderWidth: 1.5, borderColor: '#fee2e2',
    backgroundColor: '#fff5f5',
  },
  signOutText: { fontFamily: Typography.sansBold, color: '#ef4444', fontSize: 14 },
});
