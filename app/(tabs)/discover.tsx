import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { AnimeCard } from '@/components/AnimeCard';
import { TRENDING_ANIME } from './index';
import { router } from 'expo-router';

const GENRES = [
  { id: '1', name: 'Action', count: 2584 },
  { id: '2', name: 'Romance', count: 1842 },
  { id: '3', name: 'Comedy', count: 3102 },
  { id: '4', name: 'Drama', count: 2341 },
  { id: '5', name: 'Fantasy', count: 1932 },
  { id: '6', name: 'Horror', count: 842 },
  { id: '7', name: 'Mecha', count: 651 },
  { id: '8', name: 'Mystery', count: 1243 },
  { id: '9', name: 'Psychological', count: 756 },
  { id: '10', name: 'Sci-Fi', count: 1432 },
];

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchSection: {
      padding: 20,
      paddingTop: 60,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      marginBottom: 16,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(124,58,237,0.1)',
      borderRadius: 12,
      paddingHorizontal: 16,
      height: 50,
    },
    searchInput: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
    },
    section: {
      marginTop: 24,
      paddingHorizontal: 20,
    },
    lastSection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 16,
    },
    genresGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    genreCard: {
      width: '47%',
      padding: 16,
      borderRadius: 12,
      backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? '#334155' : '#E2E8F0',
    },
    genreName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#7C3AED',
    },
    genreCount: {
      fontSize: 14,
      opacity: 0.6,
    },
    topRatedContent: {
      gap: 16,
      paddingRight: 20,
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <ThemedText style={styles.title}>Discover Anime</ThemedText>
          <View style={styles.searchBar}>
            <IconSymbol name="search" color={isDark ? '#666666' : '#999999'} size={24} />
            <TextInput
              placeholder="Search anime..."
              placeholderTextColor={isDark ? '#666666' : '#999999'}
              style={[
                styles.searchInput,
                { color: isDark ? '#FFFFFF' : '#000000' }
              ]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Genres Grid */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Browse by Genre</ThemedText>
          <View style={styles.genresGrid}>
            {GENRES.map((genre) => (
              <TouchableOpacity 
                key={genre.id}
                style={[
                  styles.genreCard,
                  { backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF' }
                ]}>
                <ThemedText style={styles.genreName}>{genre.name}</ThemedText>
                <ThemedText style={styles.genreCount}>{genre.count} titles</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Top Rated Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Top Rated</ThemedText>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topRatedContent}>
            {TRENDING_ANIME.sort((a, b) => b.rating - a.rating)
              .slice(0, 5)
              .map((anime, index) => (
                <AnimeCard
                  key={anime.id}
                  {...anime}
                  index={index}
                  style={{ width: 150 }}
                  onPress={() => router.push({
                    pathname: "/anime/[id]",
                    params: { id: anime.id }
                  })}
                />
              ))}
          </ScrollView>
        </View>

        {/* New Releases */}
        <View style={[styles.section, styles.lastSection]}>
          <ThemedText style={styles.sectionTitle}>New Releases</ThemedText>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topRatedContent}>
            {TRENDING_ANIME.slice(5, 10).map((anime, index) => (
              <AnimeCard
                key={anime.id}
                {...anime}
                index={index}
                style={{ width: 150 }}
                onPress={() => router.push({
                  pathname: "/anime/[id]",
                  params: { id: anime.id }
                })}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </ThemedView>
  );
} 