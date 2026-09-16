import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { QUIZ_CATEGORIES, QUIZ_QUESTIONS } from '../data/quizzes';
import CategoryCard from '../components/CategoryCard';
import LanguageSelector from '../components/LanguageSelector';
import LevelSelectorModal from '../components/LevelSelectorModal';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { t } = useLanguage();
  const { user } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenLevelModal = (category) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleStartQuizWithLevel = (categoryId, difficulty, questionCount) => {
    setModalVisible(false);
    navigation.navigate('Quiz', {
      categoryId,
      difficulty,
      questionCount,
    });
  };

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '👤';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top Header Bar */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>🧠 {t('appName')}</Text>
            <Text style={styles.welcomeUser}>
              Hello, <Text style={styles.userNameHighlight}>{user?.name || 'Player'}</Text> 👋
            </Text>
          </View>

          <View style={styles.topRightActions}>
            <LanguageSelector />

            {/* Profile Avatar Button */}
            <Pressable
              style={({ pressed }) => [
                styles.profileBtn,
                pressed && styles.profileBtnPressed,
              ]}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.profileBtnText}>{userInitials}</Text>
            </Pressable>
          </View>
        </View>

        {/* Hero Welcome Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>{t('readyChallenge')}</Text>
          <Text style={styles.heroSubtitle}>{t('heroSubtitle')}</Text>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatNumber}>5</Text>
              <Text style={styles.heroStatLabel}>{t('categories')}</Text>
            </View>
            <View style={styles.heroDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatNumber}>150</Text>
              <Text style={styles.heroStatLabel}>{t('totalQuestions')}</Text>
            </View>
            <View style={styles.heroDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatNumber}>3</Text>
              <Text style={styles.heroStatLabel}>Levels (E/M/H)</Text>
            </View>
          </View>

          <View style={styles.quickNavRow}>
            <Pressable
              style={styles.quickNavBtn}
              onPress={() => navigation.navigate('History')}
            >
              <Text style={styles.quickNavText}>📜 {t('history')}</Text>
            </Pressable>
            <Pressable
              style={styles.quickNavBtn}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.quickNavText}>👤 {t('profile')}</Text>
            </Pressable>
          </View>
        </View>

        {/* Categories Section */}
        <Text style={styles.sectionHeader}>{t('categories')}</Text>

        {QUIZ_CATEGORIES.map((category) => {
          const questionsCount = QUIZ_QUESTIONS[category.id]?.length || 30;
          return (
            <CategoryCard
              key={category.id}
              category={category}
              questionCount={questionsCount}
              onSelect={() => handleOpenLevelModal(category)}
            />
          );
        })}
      </ScrollView>

      {/* Level Selection Modal */}
      <LevelSelectorModal
        visible={modalVisible}
        category={selectedCategory}
        onClose={() => setModalVisible(false)}
        onStart={handleStartQuizWithLevel}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  appName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#38BDF8',
    letterSpacing: 0.5,
  },
  welcomeUser: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  userNameHighlight: {
    color: '#F8FAFC',
    fontWeight: '700',
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#38BDF8',
  },
  profileBtnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  profileBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  heroCard: {
    backgroundColor: '#1E293B',
    borderRadius: 22,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#38BDF844',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 18,
    marginBottom: 16,
  },
  heroStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#0F172A',
    borderRadius: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  heroStatItem: {
    alignItems: 'center',
  },
  heroStatNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#38BDF8',
  },
  heroStatLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  heroDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#334155',
  },
  quickNavRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickNavBtn: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  quickNavText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F1F5F9',
    marginBottom: 14,
  },
});
