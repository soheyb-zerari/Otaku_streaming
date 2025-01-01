// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle, TextStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  'house.fill': 'home',
  'calendar': 'calendar-today',
  'person.fill': 'person',
  'star.fill': 'star',
  'location.fill': 'location-on',
  'person.2.fill': 'groups',
  'bell.fill': 'notifications',
  'search': 'search',
  'clock.fill': 'access-time',
  'arrow.right': 'arrow-forward',
  'slider.horizontal.3': 'tune',
  'sun.max.fill': 'light-mode',
  'moon.fill': 'dark-mode',
  'gear': 'settings',
  'play.fill': 'play-arrow',
  'chevron.left': 'chevron-left',
  'bookmark.fill': 'bookmark',
  'compass.fill': 'explore',
  'arrow.down.circle.fill': 'file-download',
  'books.vertical.fill': 'library-books',
  'chevron.right': 'chevron-right',
} as const;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
