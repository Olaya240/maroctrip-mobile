// app/tabs/_layout.tsx
import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Compass, Sparkles, Map, User } from 'lucide-react-native';
import { Colors, Typography } from '../../constants/theme';

function TabIcon({
  icon: Icon,
  focused,
  color,
}: {
  icon: any;
  focused: boolean;
  color: string;
}) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Icon
        size={22}
        color={focused ? Colors.amber : Colors.textMuted}
        strokeWidth={focused ? 2 : 1.75}
      />
      {focused && <View style={styles.activeDot} />}
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          paddingBottom: Math.max(insets.bottom, 8),
          height: 64 + Math.max(insets.bottom, 8),
        },
        tabBarActiveTintColor: Colors.amber,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Home} focused={focused} color={Colors.amber} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Compass} focused={focused} color={Colors.amber} />
          ),
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: 'Plan',
          tabBarIcon: ({ focused }) => (
            <View style={styles.planFab}>
              <Sparkles size={22} color="#fff" strokeWidth={2} />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: 'My Trips',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Map} focused={focused} color={Colors.amber} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={User} focused={focused} color={Colors.amber} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 8,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },
  tabLabel: {
    fontFamily: Typography.sansMedium,
    fontSize: 10,
    letterSpacing: 0.3,
    marginTop: 2,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
  iconWrapActive: {},
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.amber,
    marginTop: 3,
  },
  // FAB-style Plan button in center
  planFab: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -18,
    shadowColor: Colors.amber,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    // Amber → orange gradient simulated via background
    // (use LinearGradient component for full gradient)
  },
});
