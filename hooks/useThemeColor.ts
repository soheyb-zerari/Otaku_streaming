/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useTheme } from '@/context/ThemeContext';

export const Colors = {
  primary: '#2D7EF8',
  primaryLight: 'rgba(45,126,248,0.1)',
  secondary: '#64748B',
  accent: '#FF5F6D',
  
  // Dark theme
  background: '#121212',
  surface: '#1A1A1A',
  surfaceLight: '#222222',
  border: '#2A2A2A',
  text: '#FFFFFF',
  textSecondary: '#666666',
};

export function useThemeColor(colorName: keyof typeof Colors) {
  return Colors[colorName];
}
