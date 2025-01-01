import { ScrollView, StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { AnimeCard } from '@/components/AnimeCard';
import { useState, useMemo } from 'react';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const FEATURED_ANIME = {
  id: 'featured',
  title: 'Chainsaw Man',
  image: 'https://cdn.myanimelist.net/images/anime/1806/126216.jpg',
  description: 'Denji is robbed of a normal teenage life, working off his deceased father\'s debt by harvesting devil corpses with his pet devil-dog Pochita. He is willing to do anything for a bit of cash...',
  rating: 8.7,
};

export const TRENDING_ANIME = [
  {
    id: '1',
    title: 'Attack on Titan Final Season',
    image: 'https://cdn.myanimelist.net/images/anime/1948/120625.jpg',
    episodes: 16,
    rating: 9.1,
    genres: ['Action', 'Drama', 'Fantasy', 'Mystery'],
    description: 'Gabi Braun and Falco Grice have been training their entire lives to inherit one of the seven Titans under Marley\'s control and aid their nation in eradicating the Eldians on Paradis. However, just as all seems well for the two cadets, their peace is suddenly shaken by the arrival of Eren Yeager and the remaining members of the Survey Corps.',
    type: 'TV' as const,
  },
  {
    id: '2',
    title: 'Jujutsu Kaisen',
    image: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
    episodes: 24,
    rating: 8.9,
    genres: ['Action', 'Fantasy', 'Supernatural'],
    type: 'TV' as const,
    description: 'Yuji Itadori is an ordinary high school student who joins his school\'s Occult Club for fun. However, when they accidentally unseal a cursed object, Yuji swallows it to protect his friends, becoming the host of Sukuna, a powerful Curse. Now, Yuji must join the Tokyo Metropolitan Curse Technical School to control his newfound powers and help protect people from Curses.',
  },
  {
    id: '3',
    title: 'Spy x Family',
    image: 'https://cdn.myanimelist.net/images/anime/1441/122795.jpg',
    episodes: 25,
    rating: 8.7,
    genres: ['Action', 'Comedy', 'Slice of Life'],
    type: 'TV' as const,
    description: 'For the agent known as "Twilight," no order is too tall if it is for the sake of peace. Operating as Westalis\' master spy, Twilight works tirelessly to prevent extremists from sparking a war with neighboring country Ostania. For his latest mission, he must investigate Ostanian politician Donovan Desmond by infiltrating his son\'s school: the prestigious Eden Academy.',
  },
  {
    id: '4',
    title: 'Steins;Gate',
    image: 'https://cdn.myanimelist.net/images/anime/1935/127974.jpg',
    episodes: 24,
    rating: 9.1,
    genres: ['Sci-Fi', 'Drama', 'Thriller'],
    type: 'TV' as const,
    description: 'Eccentric scientist Rintaro Okabe has a never-ending thirst for scientific exploration. Together with his ditzy but well-meaning friend Mayuri Shiina and his roommate Itaru Hashida, Rintaro founds the Future Gadget Laboratory in hopes of creating technological innovations that baffle the human psyche.',
  },
  {
    id: '5',
    title: 'Your Name',
    image: 'https://cdn.myanimelist.net/images/anime/5/87048.jpg',
    episodes: 1,
    rating: 8.8,
    genres: ['Romance', 'Drama', 'Supernatural'],
    type: 'Movie' as const,
    description: 'Mitsuha Miyamizu is a high school girl living in the countryside town of Itomori. She yearns for a life in Tokyo as she is sick of living in the countryside. Taki Tachibana is a high school student living in Tokyo. One day, they discover that they can swap bodies when they sleep, leading to a unique connection that will change their lives forever.',
  },
  {
    id: '6',
    title: 'Made in Abyss',
    image: 'https://cdn.myanimelist.net/images/anime/6/86733.jpg',
    episodes: 13,
    rating: 8.7,
    genres: ['Adventure', 'Drama', 'Fantasy', 'Mystery'],
    type: 'TV' as const,
    description: 'The Abyss—a gaping chasm stretching down into the depths of the Earth, filled with mysterious creatures and relics from a time long past. How did it come to be? What lies at the bottom? Countless brave individuals, known as Divers, have sought to solve these mysteries of the Abyss, fearlessly descending into its darkest realms.',
  },
  {
    id: '7',
    title: 'Demon Slayer',
    image: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    episodes: 26,
    rating: 8.7,
    genres: ['Action', 'Adventure', 'Fantasy'],
    type: 'TV' as const,
    description: 'Ever since the death of his father, the burden of supporting the family has fallen upon Tanjirou Kamado\'s shoulders. Though living impoverished on a remote mountain, the Kamado family are able to enjoy a relatively peaceful and happy life. One day, Tanjirou decides to go down to the local village to make a little money selling charcoal. On his way back, night falls, forcing Tanjirou to take shelter in the house of a strange man, who warns him of the existence of flesh-eating demons that lurk in the woods at night.',
  },
  {
    id: '8',
    title: 'Violet Evergarden',
    image: 'https://cdn.myanimelist.net/images/anime/1329/94437.jpg',
    episodes: 13,
    rating: 8.7,
    genres: ['Drama', 'Fantasy', 'Slice of Life'],
    type: 'TV' as const,
    description: 'The Great War finally came to an end after four long years of conflict; fractured in two, the continent of Telesis slowly began to flourish once again. Caught up in the bloodshed was Violet Evergarden, a young girl raised for the sole purpose of decimating enemy lines. Now that the war has ended, Violet must find her new purpose in life - a job at a postal service might be the first step.',
  }
];

const CATEGORIES = [
  'Trending',
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Supernatural',
  'Thriller'
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Trending');
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();
  const { width } = Dimensions.get('window');

  // Updated filter logic
  const filteredAnime = useMemo(() => {
    if (selectedCategory === 'Trending') return TRENDING_ANIME;
    return TRENDING_ANIME.filter(anime => anime.genres.includes(selectedCategory));
  }, [selectedCategory]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Section */}
        <View style={[styles.featuredContainer, { marginTop: insets.top }]}>
          <Image 
            source={{ uri: FEATURED_ANIME.image }} 
            style={styles.featuredImage}
          />
          <LinearGradient
            colors={['transparent', isDark ? '#121212' : '#FFFFFF']}
            style={styles.gradient}
          />
          <View style={styles.featuredContent}>
            <View style={styles.featuredHeader}>
              <View>
                <ThemedText style={styles.welcomeText}>Welcome back!</ThemedText>
                <ThemedText style={styles.dateText}>Monday, May 1</ThemedText>
              </View>
              <TouchableOpacity style={styles.searchButton}>
                <IconSymbol name="search" color={isDark ? '#fff' : '#000'} size={24} />
              </TouchableOpacity>
            </View>
            <View style={styles.featuredInfo}>
              <ThemedText style={styles.featuredTitle}>{FEATURED_ANIME.title}</ThemedText>
              <ThemedText style={styles.featuredDescription} numberOfLines={2}>
                {FEATURED_ANIME.description}
              </ThemedText>
              <TouchableOpacity style={styles.watchButton}>
                <IconSymbol name="play.fill" color="#fff" size={20} />
                <ThemedText style={styles.watchButtonText}>Watch Now</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.activeCategory
              ]}
              onPress={() => setSelectedCategory(category)}>
              <ThemedText style={[
                styles.categoryText,
                selectedCategory === category && styles.activeCategoryText
              ]}>
                {category}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trending Section - Updated to use filteredAnime */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>
              {selectedCategory}
            </ThemedText>
            <TouchableOpacity>
              <ThemedText style={styles.seeAllText}>See All</ThemedText>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingContent}>
            {filteredAnime.map((anime, index) => (
              <AnimeCard
                key={anime.id}
                {...anime}
                index={index}
                style={{ width: width * 0.4, marginRight: 16 }}
                onPress={() => router.push({
                  pathname: "/anime/[id]",
                  params: { id: anime.id }
                })}
              />
            ))}
          </ScrollView>
        </View>

        {/* Continue Watching */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Continue Watching</ThemedText>
            <TouchableOpacity>
              <ThemedText style={styles.seeAllText}>See All</ThemedText>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingContent}>
            {TRENDING_ANIME.map((anime, index) => (
              <AnimeCard
                key={anime.id}
                {...anime}
                index={index}
                style={{ width: width * 0.4, marginRight: 16 }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  featuredContainer: {
    height: 500,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  featuredContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 'auto',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },
  featuredInfo: {
    gap: 12,
  },
  featuredTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  featuredDescription: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    lineHeight: 22,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    alignSelf: 'flex-start',
    gap: 8,
  },
  watchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesContainer: {
    marginTop: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(124,58,237,0.1)',
    marginRight: 8,
  },
  activeCategory: {
    backgroundColor: '#7C3AED',
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#7C3AED',
  },
  activeCategoryText: {
    color: '#fff',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  lastSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  seeAllText: {
    color: '#7C3AED',
    fontWeight: '600',
  },
  trendingContent: {
    paddingRight: 20,
  },
});
