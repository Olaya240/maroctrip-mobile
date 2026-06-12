// app/tabs/explore.tsx  — Explore / Destinations Screen
import {
  View, Text, ScrollView, TouchableOpacity,
  ImageBackground, StyleSheet, Dimensions, TextInput,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, MapPin, ArrowRight, SlidersHorizontal } from 'lucide-react-native';
import { Colors, Typography, Spacing, Radius, Shadows } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDE = width - Spacing.lg * 2;
const CARD_HALF = (width - Spacing.lg * 2 - 12) / 2;

const DESTINATIONS = [
  {
    name: 'Marrakech', tag: 'Imperial City', size: 'wide',
    desc: 'Vibrant souks, majestic palaces and the legendary Jemaa el-Fnaa.',
    image: 'https://images.unsplash.com/photo-1628962600458-1704b2cb1fb3?w=800&q=80',
  },
  {
    name: 'Chefchaouen', tag: 'Blue Pearl', size: 'half',
    desc: 'Nestled in the Rif Mountains.',
    image: 'https://images.unsplash.com/photo-1707400015348-b0a5851ab163?w=600&q=80',
  },
  {
    name: 'Fes', tag: 'Ancient Medina', size: 'half',
    desc: 'Traditional tanneries and spiritual heart of Morocco.',
    image: 'https://images.unsplash.com/photo-1742434790127-55e03b30455e?w=600&q=80',
  },
  {
    name: 'Sahara Desert', tag: 'Golden Dunes', size: 'wide',
    desc: 'Starlit nights and unforgettable camel treks.',
    image: 'https://images.unsplash.com/photo-1731169243668-73e9e968e363?w=800&q=80',
  },
  {
    name: 'Essaouira', tag: 'Coastal Gem', size: 'half',
    desc: 'Windswept beaches and bohemian vibes.',
    image: 'https://images.unsplash.com/photo-1668335554961-4f9c1ec5cec9?w=600&q=80',
  },
  {
    name: 'Rabat', tag: 'Capital City', size: 'half',
    desc: 'Modern Morocco meets historical charm.',
    image: 'https://images.unsplash.com/photo-1538935732373-f7a495fea3f6?w=600&q=80',
  },
];

function DestCard({ dest, index }: { dest: typeof DESTINATIONS[0]; index: number }) {
  const isWide = dest.size === 'wide';
  return (
    <Animated.View
      entering={FadeInDown.delay(60 + index * 70).duration(500)}
      style={{ width: isWide ? CARD_WIDE : CARD_HALF }}
    >
      <TouchableOpacity activeOpacity={0.9} style={[styles.destCard, { height: isWide ? 200 : 170 }]}>
        <ImageBackground source={{ uri: dest.image }} style={StyleSheet.absoluteFill} resizeMode="cover">
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.82)']}
            locations={[0.3, 1]}
            style={StyleSheet.absoluteFill}
          />
        </ImageBackground>

        {/* Index badge */}
        <View style={styles.destIndex}>
          <Text style={styles.destIndexText}>{String(index + 1).padStart(2, '0')}</Text>
        </View>

        <View style={styles.destContent}>
          <View style={styles.destTagRow}>
            <MapPin size={9} color={Colors.amberLight} strokeWidth={2.5} />
            <Text style={styles.destTag}>{dest.tag}</Text>
          </View>
          <Text style={styles.destName}>{dest.name}</Text>
          {isWide && <Text style={styles.destDesc} numberOfLines={2}>{dest.desc}</Text>}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

function ExploreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerOverline}>Destinations</Text>
          <Text style={styles.headerTitle}>
            Morocco's <Text style={styles.headerTitleItalic}>finest</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <SlidersHorizontal size={18} color={Colors.textSecondary} strokeWidth={1.75} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Search size={16} color={Colors.textMuted} strokeWidth={1.75} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations..."
          placeholderTextColor={Colors.textMuted}
        />
      </View>

      {/* Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
      >
        {DESTINATIONS.reduce((rows: any[], dest, i) => {
          if (dest.size === 'wide') {
            rows.push(<DestCard key={i} dest={dest} index={i} />);
          } else {
            // Pair halves in a row
            const next = DESTINATIONS[i + 1];
            if (next && next.size === 'half' && i % 1 === 0) {
              const isAlreadyPaired = rows.some(r => r?.props?.children?.some?.((c: any) => c?.key == String(i + 1)));
              rows.push(
                <View key={`pair-${i}`} style={styles.halfRow}>
                  <DestCard dest={dest} index={i} />
                  <DestCard dest={next} index={i + 1} />
                </View>
              );
            } else if (!rows.find((r: any) => r?.key === `pair-${i - 1}`)) {
              rows.push(
                <View key={`single-${i}`} style={styles.halfRow}>
                  <DestCard dest={dest} index={i} />
                </View>
              );
            }
          }
          return rows;
        }, [])}
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </View>
  );
}

// Simpler rendering approach
export function ExploreScreenSimple() {
  const insets = useSafeAreaInsets();

  const wideItems = DESTINATIONS.filter((d, i) => i === 0 || i === 3);
  const halfPairs = [
    [DESTINATIONS[1], DESTINATIONS[2]],
    [DESTINATIONS[4], DESTINATIONS[5]],
  ];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerOverline}>Destinations</Text>
          <Text style={styles.headerTitle}>
            Morocco's <Text style={styles.headerTitleItalic}>finest</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <SlidersHorizontal size={18} color={Colors.textSecondary} strokeWidth={1.75} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrap}>
        <Search size={16} color={Colors.textMuted} strokeWidth={1.75} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations..."
          placeholderTextColor={Colors.textMuted}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {/* Wide: Marrakech */}
        <DestCard dest={DESTINATIONS[0]} index={0} />
        {/* Half pair: Chefchaouen + Fes */}
        <View style={styles.halfRow}>
          <DestCard dest={DESTINATIONS[1]} index={1} />
          <DestCard dest={DESTINATIONS[2]} index={2} />
        </View>
        {/* Wide: Sahara */}
        <DestCard dest={DESTINATIONS[3]} index={3} />
        {/* Half pair: Essaouira + Rabat */}
        <View style={styles.halfRow}>
          <DestCard dest={DESTINATIONS[4]} index={4} />
          <DestCard dest={DESTINATIONS[5]} index={5} />
        </View>
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </View>
  );
}

// Export the simpler version as default
export default ExploreScreenSimple;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPage },

  header: {
    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md, paddingTop: Spacing.md,
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
  filterBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center', marginTop: 4,
  },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: Spacing.lg, marginBottom: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md,
    borderWidth: 1.5, borderColor: Colors.border,
    paddingHorizontal: 14, height: 46,
    ...Shadows.card,
  },
  searchInput: {
    flex: 1, fontFamily: Typography.sans,
    color: Colors.textPrimary, fontSize: 14,
  },

  grid: {
    paddingHorizontal: Spacing.lg, gap: 12,
  },
  halfRow: { flexDirection: 'row', gap: 12 },

  destCard: {
    borderRadius: Radius.lg, overflow: 'hidden',
    backgroundColor: Colors.darkBase,
    ...Shadows.card,
  },
  destIndex: {
    position: 'absolute', top: 12, right: 12,
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  destIndexText: { fontFamily: Typography.serif, color: 'rgba(255,255,255,0.5)', fontSize: 11 },
  destContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14 },
  destTagRow: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(245,158,11,0.18)',
    borderWidth: 1, borderColor: 'rgba(245,158,11,0.3)',
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: Radius.pill, alignSelf: 'flex-start', marginBottom: 6,
  },
  destTag: { fontFamily: Typography.sansBold, color: Colors.amberLight, fontSize: 9, letterSpacing: 0.8, textTransform: 'uppercase' },
  destName: { fontFamily: Typography.serif, color: '#fff', fontSize: 20, letterSpacing: 0.2 },
  destDesc: { fontFamily: Typography.sans, color: 'rgba(255,255,255,0.55)', fontSize: 12, lineHeight: 17, marginTop: 3 },
});
