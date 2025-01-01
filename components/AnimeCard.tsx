import { Image, Pressable, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import { IconSymbol } from '@/components/ui/IconSymbol';

export type AnimeProps = {
  id: string;
  title: string;
  image: string;
  episodes: number;
  rating: number;
  type?: 'TV' | 'Movie' | 'OVA' | string;
  genres: string[];
  onPress: () => void;
  style?: any;
  index?: number;
};

export function AnimeCard({ 
  title, 
  image, 
  episodes,
  rating,
  onPress, 
  style, 
  index = 0 
}: AnimeProps) {
  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100).springify()}
      style={[styles.wrapper, style]}>
      <TouchableOpacity 
        onPress={onPress}
        style={styles.pressable}>
        <View style={styles.container}>
          <Image 
            source={{ uri: image }} 
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={styles.gradient}
          />
          {episodes > 0 && (
            <View style={styles.episodesBadge}>
              <ThemedText style={styles.episodesText}>{episodes} EP</ThemedText>
            </View>
          )}
          <View style={styles.info}>
            <ThemedText style={styles.title} numberOfLines={2}>
              {title}
            </ThemedText>
            <View style={styles.ratingContainer}>
              <IconSymbol name="star.fill" color="#FFB800" size={12} />
              <ThemedText style={styles.rating}>{rating}</ThemedText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  pressable: {
    transform: [{ scale: 1 }],
  },
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    aspectRatio: 2/3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  info: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  episodesBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  episodesText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
}); 