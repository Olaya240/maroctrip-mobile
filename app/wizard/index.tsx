// app/wizard/index.tsx  — Wizard State Manager (Steps 1–5)
import { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withSpring, FadeIn, FadeOut,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

import WizardLayout from '../../components/wizard/WizardLayout';
import Step1Destination from '../../components/wizard/Step1Destination';
import Step2StyleBudget from '../../components/wizard/Step2StyleBudget';
import Step3Interests from '../../components/wizard/Step3Interests';
import Step4Processing from '../../components/wizard/Step4Processing';
import Step5Dashboard from '../../components/wizard/Step5Dashboard';

const { width } = Dimensions.get('window');

export type WizardData = {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  travelers: number;
  budget: 'budget' | 'moderate' | 'luxury' | null;
  vibes: string[];
  accommodation: string | null;
  interests: string[];
  dietaryNotes: string;
};

const INITIAL_DATA: WizardData = {
  destination: '',
  startDate: null,
  endDate: null,
  travelers: 2,
  budget: null,
  vibes: [],
  accommodation: null,
  interests: [],
  dietaryNotes: '',
};

export default function WizardScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);

  const updateData = useCallback((patch: Partial<WizardData>) => {
    setData(prev => ({ ...prev, ...patch }));
  }, []);

  const goNext = useCallback(() => {
    if (step < 5) setStep(s => s + 1);
  }, [step]);

  const goBack = useCallback(() => {
    if (step > 1) setStep(s => s - 1);
    else router.back();
  }, [step, router]);

  // Steps 1–3 wrapped in WizardLayout (with progress bar + nav)
  // Steps 4–5 are fullscreen
  if (step === 4) {
    return (
      <Step4Processing
        data={data}
        onComplete={goNext}
      />
    );
  }

  if (step === 5) {
    return (
      <Step5Dashboard
        data={data}
        onClose={() => router.back()}
      />
    );
  }

  return (
    <WizardLayout
      step={step}
      totalSteps={3}
      onBack={goBack}
      onClose={() => router.back()}
    >
      <Animated.View
        key={step}
        entering={FadeIn.duration(280)}
        exiting={FadeOut.duration(180)}
        style={{ flex: 1 }}
      >
        {step === 1 && (
          <Step1Destination data={data} onChange={updateData} onNext={goNext} />
        )}
        {step === 2 && (
          <Step2StyleBudget data={data} onChange={updateData} onNext={goNext} />
        )}
        {step === 3 && (
          <Step3Interests data={data} onChange={updateData} onNext={goNext} />
        )}
      </Animated.View>
    </WizardLayout>
  );
}
