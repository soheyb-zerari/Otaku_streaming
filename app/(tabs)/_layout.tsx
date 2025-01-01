import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/hooks/useThemeColor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 16,
          left: 32,
          right: 32,
          height: 65,
          backgroundColor: isDark ? 'rgba(26, 26, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)',
          borderRadius: 20,
          borderTopWidth: 0,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: isDark ? '#666666' : '#999999',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <IconSymbol 
                name="house.fill"
                color={color} 
                size={16}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <IconSymbol 
                name="compass.fill"
                color={color} 
                size={16}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: 'Watchlist',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <IconSymbol 
                name="bookmark.fill"
                color={color} 
                size={16}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <IconSymbol 
                name="person.fill"
                color={color} 
                size={16}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 6,
    borderRadius: 100,
  },
  activeIcon: {
    backgroundColor: 'rgba(45,126,248,0.1)',
  },
});
