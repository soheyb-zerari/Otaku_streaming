import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();
  const { width } = Dimensions.get('window');

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header]}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1616627052149-22c4f8a6316c' }}
            style={styles.coverImage}
          />
          <LinearGradient
            colors={['transparent', isDark ? '#121212' : '#FFFFFF']}
            style={styles.gradient}
          />
          <View style={[styles.profileInfo, { marginTop: insets.top }]}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/300' }}
              style={styles.avatar}
            />
            <View style={styles.nameContainer}>
              <ThemedText style={styles.name}>John Doe</ThemedText>
              <ThemedText style={styles.username}>@johndoe</ThemedText>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <IconSymbol name="gear" color={isDark ? '#fff' : '#000'} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stats}>
            <TouchableOpacity style={styles.statItem}>
              <ThemedText style={styles.statValue}>127</ThemedText>
              <ThemedText style={styles.statLabel}>Watching</ThemedText>
            </TouchableOpacity>
            <View style={styles.statDivider} />
            <TouchableOpacity style={styles.statItem}>
              <ThemedText style={styles.statValue}>63</ThemedText>
              <ThemedText style={styles.statLabel}>Completed</ThemedText>
            </TouchableOpacity>
            <View style={styles.statDivider} />
            <TouchableOpacity style={styles.statItem}>
              <ThemedText style={styles.statValue}>298</ThemedText>
              <ThemedText style={styles.statLabel}>Plan to Watch</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={item.title} 
                style={[
                  styles.menuItem,
                  { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }
                ]}>
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                  <IconSymbol name={item.icon} color="#fff" size={22} />
                </View>
                <ThemedText style={styles.menuText}>{item.title}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
          {recentActivity.map((activity, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.activityItem,
                { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }
              ]}>
              <Image source={{ uri: activity.image }} style={styles.activityImage} />
              <View style={styles.activityContent}>
                <ThemedText style={styles.activityTitle}>{activity.title}</ThemedText>
                <ThemedText style={styles.activityMeta}>{activity.meta}</ThemedText>
              </View>
              <IconSymbol 
                name="chevron.right" 
                color={isDark ? '#666666' : '#999999'} 
                size={20} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const menuItems = [
  { title: 'Settings', icon: 'gear' as IconSymbolName, color: '#7C3AED' },
  { title: 'Friends', icon: 'person.2.fill' as IconSymbolName, color: '#2563EB' },
  { title: 'Reviews', icon: 'star.fill' as IconSymbolName, color: '#F59E0B' },
  { title: 'Lists', icon: 'bookmark.fill' as IconSymbolName, color: '#10B981' },
];

const recentActivity = [
  {
    title: 'Started watching Attack on Titan',
    meta: '2 hours ago',
    image: 'https://cdn.myanimelist.net/images/anime/1948/120625.jpg',
  },
  {
    title: 'Completed Jujutsu Kaisen',
    meta: 'Yesterday',
    image: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 120,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#7C3AED',
  },
  nameContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
  },
  username: {
    fontSize: 15,
    opacity: 0.7,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(124,58,237,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    paddingHorizontal: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(124,58,237,0.1)',
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(124,58,237,0.2)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7C3AED',
  },
  statLabel: {
    fontSize: 13,
    marginTop: 4,
    opacity: 0.7,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  menuItem: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  activityImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  activityMeta: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 2,
  },
}); 