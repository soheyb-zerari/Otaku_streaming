import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { TRENDING_ANIME } from '@/app/(tabs)';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';

export default function AnimeScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();

  const anime = TRENDING_ANIME.find(a => a.id === id);

  if (!anime) {
    router.back();
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image 
            source={{ uri: anime.image }} 
            style={styles.coverImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', isDark ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)']}
            style={styles.gradient}
            pointerEvents="none"
          />
          <View style={[styles.headerContent, { paddingTop: insets.top }]}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}>
              <IconSymbol name="chevron.left" color="#fff" size={24} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.watchlistButton}
              onPress={() => {}}>
              <IconSymbol name="bookmark.fill" color="#fff" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <ThemedText style={styles.title}>{anime.title}</ThemedText>
          
          <View style={styles.metaInfo}>
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>{anime.type}</ThemedText>
            </View>
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>{anime.episodes} Episodes</ThemedText>
            </View>
            <View style={styles.ratingBadge}>
              <IconSymbol name="star.fill" color="#FFB800" size={16} />
              <ThemedText style={styles.ratingText}>{anime.rating}</ThemedText>
            </View>
          </View>

          <View style={styles.genreContainer}>
            {anime.genres.map((genre) => (
              <View key={genre} style={styles.genreBadge}>
                <ThemedText style={styles.genreText}>{genre}</ThemedText>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Synopsis</ThemedText>
            <ThemedText style={styles.description}>{anime.description}</ThemedText>
          </View>

          <TouchableOpacity style={styles.watchButton}>
            <IconSymbol name="play.fill" color="#fff" size={20} />
            <ThemedText style={styles.watchButtonText}>Watch Now</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 400,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    zIndex: 1,
  },
  headerContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: 20,
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  watchlistButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  metaInfo: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(124,58,237,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '600',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,184,0,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ratingText: {
    color: '#FFB800',
    fontSize: 14,
    fontWeight: '600',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreBadge: {
    backgroundColor: 'rgba(124,58,237,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  genreText: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  watchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
 