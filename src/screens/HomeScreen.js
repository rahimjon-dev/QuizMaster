import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { QUIZ_CATEGORIES } from '../data/quizzes';
import { useAuth } from '../context/AuthContext';
import BottomTabBar from '../components/BottomTabBar';
import { HomeBannerTrophy } from '../components/illustrations';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const userName = user?.name ? user.name.split(' ')[0] : 'Xusniddin';

  const handleStartDailyQuiz = () => {
    navigation.navigate('Quiz', {
      categoryId: 'programming',
      difficulty: 'Easy',
      questionCount: 10,
    });
  };

  const handleSelectCategory = (category) => {
    navigation.navigate('Quiz', {
      categoryId: category.id,
      categoryTitle: category.title.uz,
      difficulty: 'Easy',
      questionCount: 10,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greetingText}>Salom,</Text>
              <Text style={styles.userNameText}>{userName}</Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate('Profile')}
              style={styles.avatarButton}
            >
              <LinearGradient
                colors={['#818CF8', '#6366F1']}
                style={styles.avatarGradient}
              >
                <Ionicons name="person" size={24} color="#FFFFFF" />
              </LinearGradient>
            </Pressable>
          </View>

          {/* Daily Champion Banner Card */}
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
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
            <Text style={styles.sectionTitle}>Kategoriyalar</Text>
            <Pressable
              onPress={() => navigation.navigate('Categories')}
              style={styles.seeAllBtn}
            >
              <Text style={styles.seeAllText}>Barchasi {'>'}</Text>
            </Pressable>
          </View>

          {/* 6 Category Grid Tiles (2 columns) */}
          <View style={styles.categoriesGrid}>
            {QUIZ_CATEGORIES.map((category) => (
              <Pressable
                key={category.id}
                style={({ pressed }) => [
                  styles.categoryCard,
                  pressed && styles.categoryCardPressed,
                ]}
                onPress={() => handleSelectCategory(category)}
              >
                <LinearGradient
                  colors={category.gradient || [category.color, category.color]}
                  style={styles.categoryIconBox}
                >
                  <Ionicons name={category.icon || 'book'} size={28} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.categoryName} numberOfLines={1}>
                  {category.title.uz}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <BottomTabBar activeTab="home" navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    color: '#64748B',
    fontWeight: '500',
  },
  userNameText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  avatarButton: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingLeft: 6,
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
    color: '#0F172A',
  },
  seeAllBtn: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  seeAllText: {
    fontSize: 13,
    color: '#6366F1',
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '47.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  categoryCardPressed: {
    transform: [{ scale: 0.97 }],
  },
  categoryIconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
  },
});
