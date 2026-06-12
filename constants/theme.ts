// constants/theme.ts
// MarocTrip design system — mirrors the web design system in index.css

export const Colors = {
  // Brand
  amber:       '#f59e0b',
  amberLight:  '#fbbf24',
  amberDark:   '#d97706',
  orange:      '#ea580c',
  orangeLight: '#fb923c',

  // Tints
  amberTintBg:     '#fff8eb',
  amberTintBorder: '#fde68a',
  amberTintText:   '#d97706',

  // Dark surfaces
  darkBase:    '#0a0704',
  darkSurface: '#111827',
  darkRaised:  '#1c1410',

  // Light surfaces
  bgPage:   '#f9fafb',
  bgCard:   '#ffffff',
  bgMuted:  '#fafafa',

  // Borders
  border:       '#f3f4f6',
  borderAmber:  '#fde68a',

  // Text
  textPrimary:   '#111827',
  textSecondary: '#6b7280',
  textMuted:     '#9ca3af',
  textFaint:     '#d1d5db',

  // Special
  white: '#ffffff',
  black: '#000000',
};

export const Typography = {
  serif:       'CormorantGaramond_600SemiBold',
  serifItalic: 'CormorantGaramond_600SemiBold_Italic',
  sans:        'DMSans_400Regular',
  sansMedium:  'DMSans_500Medium',
  sansBold:    'DMSans_700Bold',
};

export const Spacing = {
  xs:   4,
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
  section: 64,
};

export const Radius = {
  sm:   10,
  md:   16,
  lg:   24,
  xl:   28,
  pill: 100,
};

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  cardHover: {
    shadowColor: Colors.amber,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },
  amber: {
    shadowColor: Colors.amber,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  dark: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 12,
  },
};
