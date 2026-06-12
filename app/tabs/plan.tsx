// app/tabs/plan.tsx  — Plan Tab (launches Wizard)
import { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

export default function PlanTab() {
  const router = useRouter();

  useEffect(() => {
    // When user taps Plan tab, immediately open the wizard modal
    router.push('/wizard');
  }, []);

  return <View style={{ flex: 1 }} />;
}
