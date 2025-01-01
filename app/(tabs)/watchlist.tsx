import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { AnimeCard } from '@/components/AnimeCard';
import { TRENDING_ANIME } from './index';
import { router } from 'expo-router';

export default function WatchlistScreen() {
  const { width } = Dimensions.get('window');
  const numColumns = 2;
  const cardWidth = (width - 48 - (numColumns - 1) * 16) / numColumns;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>My Watchlist</ThemedText>
      </View>
      <FlatList
        data={TRENDING_ANIME.slice(0, 6)}
        numColumns={numColumns}
        renderItem={({ item, index }) => (
          <AnimeCard
            {...item}
            index={index}
            style={{ width: cardWidth, marginBottom: 16 }}
            onPress={() => router.push({
              pathname: "/anime/[id]",
              params: { id: item.id }
            })}
          />
        )}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  content: {
    padding: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
}); 