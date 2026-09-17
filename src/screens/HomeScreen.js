import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { QUIZ_CATEGORIES } from '../data/quizzes';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import BottomTabBar from '../components/BottomTabBar';
import { HomeBannerTrophy } from '../components/illustrations';
import { playSound } from '../utils/audio';
import LevelSelectorModal from '../components/LevelSelectorModal';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const userName = user?.name ? user.name.split(' ')[0] : 'Rahimjon';
  const userInitial = (user?.name || 'R').charAt(0).toUpperCase();
  const userAvatar = user?.avatar;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLevelModalVisible, setIsLevelModalVisible] = useState(false);

  const handleStartDailyQuiz = () => {
    playSound('click');
    const randomCat = QUIZ_CATEGORIES[Math.floor(Math.random() * QUIZ_CATEGORIES.length)];
    setSelectedCategory(randomCat);
    setIsLevelModalVisible(true);
  };

  const handleSelectCategory = (category) => {
    playSound('click');
    setSelectedCategory(category);
    setIsLevelModalVisible(true);
  };

  const handleStartQuizWithLevel = (catId, difficulty, questionCount) => {
    setIsLevelModalVisible(false);
    navigation.navigate('Quiz', {
      categoryId: catId,
      categoryTitle: selectedCategory?.title?.uz || 'Viktorina',
      difficulty,
      questionCount: questionCount || 30,
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 16 : 8) + 8 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={[styles.greetingText, { color: theme.textSecondary }]}>Salom, 👋</Text>
              <Text style={[styles.userNameText, { color: theme.textPrimary }]}>{userName}</Text>
            </View>

            {/* Redesigned Premium Profile Avatar */}
            <Pressable
              onPress={() => {
                playSound('click');
                navigation.navigate('Profile');
              }}
              style={({ pressed }) => [
                styles.avatarButton,
                pressed && { transform: [{ scale: 0.95 }] },
              ]}
            >
              <LinearGradient
                colors={['#818CF8', '#6366F1', '#4F46E5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatarGradientRing}
              >
                <View style={[styles.avatarInner, { backgroundColor: theme.cardBg }]}>
                  {userAvatar && userAvatar !== '👤' ? (
                    <Text style={styles.avatarEmoji}>{userAvatar}</Text>
                  ) : (
                    <LinearGradient
                      colors={['#6366F1', '#8B5CF6']}
                      style={styles.avatarLetterBox}
                    >
                      <Text style={styles.avatarLetter}>{userInitial}</Text>
                    </LinearGradient>
                  )}
                </View>
              </LinearGradient>
              {/* Online Indicator Badge */}
              <View style={styles.onlineBadge} />
            </Pressable>
          </View>

          {/* Daily Champion Banner Card */}
          <LinearGradient
            colors={['#6366F1', '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bannerCard}
          >
            <View style={styles.bannerLeft}>
              <HomeBannerTrophy />
            </View>

            <View style={styles.bannerMiddle}>
              <Text style={styles.bannerTitle}>Bugungi chempion bo'ling!</Text>
              <Text style={styles.bannerSubtitle}>
                Kundalik viktorina sizni kutmoqda!
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.bannerButton,
                  pressed && styles.bannerButtonPressed,
                ]}
                onPress={handleStartDailyQuiz}
              >
                <Text style={styles.bannerButtonText}>Boshlash</Text>
              </Pressable>
            </View>
          </LinearGradient>

          {/* Categories Section Header */}
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Kategoriyalar</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
                O'zingizga yoqqan yo'nalishni tanlang
              </Text>
            </View>
            <Pressable
              onPress={() => {
                playSound('click');
                navigation.navigate('Categories');
              }}
              style={styles.seeAllBtn}
            >
              <Text style={styles.seeAllText}>Barchasi {'>'}</Text>
            </Pressable>
          </View>

          {/* 6 Category Grid Tiles (2 columns) with Proper Icons */}
          <View style={styles.categoriesGrid}>
            {QUIZ_CATEGORIES.map((category) => (
              <Pressable
                key={category.id}
                style={({ pressed }) => [
                  styles.categoryCard,
                  {
                    backgroundColor: theme.cardBg,
                    borderColor: theme.cardBorder,
                  },
                  pressed && styles.categoryCardPressed,
                ]}
                onPress={() => handleSelectCategory(category)}
              >
                <LinearGradient
                  colors={category.gradient || [category.color, category.color]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.categoryIconBox}
                >
                  <Ionicons name={category.icon || 'bulb'} size={28} color="#FFFFFF" />
                </LinearGradient>
                <Text
                  style={[styles.categoryName, { color: theme.textPrimary }]}
                  numberOfLines={1}
                >
                  {category.title.uz}
                </Text>
                <Text
                  style={[styles.categoryQuestionsCount, { color: theme.textMuted }]}
                  numberOfLines={1}
                >
                  {category.questionCount}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <BottomTabBar activeTab="home" navigation={navigation} />

        {/* Level and Question Count Selector Modal */}
        <LevelSelectorModal
          visible={isLevelModalVisible}
          category={selectedCategory}
          onClose={() => setIsLevelModalVisible(false)}
          onStart={handleStartQuizWithLevel}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  userNameText: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 2,
  },
  avatarButton: {
    position: 'relative',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarGradientRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    padding: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarEmoji: {
    fontSize: 26,
  },
  avatarLetterBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  bannerCard: {
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
  },
  bannerLeft: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerMiddle: {
    flex: 1,
    paddingLeft: 8,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
    lineHeight: 16,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingVertical: 7,
    paddingHorizontal: 22,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bannerButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  bannerButtonText: {
    color: '#6366F1',
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  sectionSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  seeAllBtn: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  seeAllText: {
    fontSize: 13,
    color: '#6366F1',
    fontWeight: '700',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '47.8%',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
  },
  categoryCardPressed: {
    transform: [{ scale: 0.97 }],
  },
  categoryIconBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 2,
  },
  categoryQuestionsCount: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
});
