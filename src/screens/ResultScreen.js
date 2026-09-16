import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { saveQuizResult } from '../utils/storage';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function ResultScreen({ route, navigation }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const {
    categoryId = 'general',
    categoryTitle = 'Quiz',
    categoryIcon = '🧠',
    difficulty = 'Medium',
    score = 0,
    totalQuestions = 15,
    percentage = 0,
    correctAnswers = 0,
    wrongAnswers = 0,
  } = route.params || {};

  useEffect(() => {
    // Automatically save quiz result to AsyncStorage upon completion
    saveQuizResult({
      userId: user?.id,
      category: categoryTitle,
      categoryId,
      difficulty,
      score,
      totalQuestions,
      percentage,
      correctAnswers,
      wrongAnswers,
    });
  }, [categoryId, categoryTitle, difficulty, score, totalQuestions, percentage, correctAnswers, wrongAnswers, user]);

  const getScoreColor = () => {
    if (percentage >= 80) return '#10B981'; // Green
    if (percentage >= 50) return '#F59E0B'; // Orange
    return '#EF4444'; // Red
  };

  const getPerformanceMessage = () => {
    if (percentage === 100) return t('perfect');
    if (percentage >= 80) return t('excellent');
    if (percentage >= 60) return t('good');
    return t('tryHarder');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Celebration Header */}
        <View style={styles.header}>
          <Text style={styles.badgeText}>
            {categoryIcon} {categoryTitle}
          </Text>
          <Text style={styles.title}>{t('quizCompleted')}</Text>
          <Text style={styles.performanceMsg}>{getPerformanceMessage()}</Text>
        </View>

        {/* Score Badge Circle / Card */}
        <View style={styles.scoreCard}>
          <View style={[styles.scoreRing, { borderColor: getScoreColor() }]}>
            <Text style={[styles.scorePercentage, { color: getScoreColor() }]}>
              {percentage}%
            </Text>
            <Text style={styles.scoreRatio}>
              {score} / {totalQuestions}
            </Text>
          </View>
        </View>

        {/* Stats Summary Breakdown */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>{t('summaryBreakdown')}</Text>

          <View style={styles.statRow}>
            <View style={styles.statLeft}>
              <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.statLabel}>{t('correctAnswers')}</Text>
            </View>
            <Text style={[styles.statValue, { color: '#10B981' }]}>
              {correctAnswers}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statRow}>
            <View style={styles.statLeft}>
              <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.statLabel}>{t('wrongAnswers')}</Text>
            </View>
            <Text style={[styles.statValue, { color: '#EF4444' }]}>
              {wrongAnswers}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statRow}>
            <View style={styles.statLeft}>
              <View style={[styles.dot, { backgroundColor: '#38BDF8' }]} />
              <Text style={styles.statLabel}>{t('totalQuestions')}</Text>
            </View>
            <Text style={[styles.statValue, { color: '#38BDF8' }]}>
              {totalQuestions}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <PrimaryButton
            title={t('tryAgain')}
            variant="primary"
            onPress={() =>
              navigation.replace('Quiz', { categoryId, difficulty, questionCount: totalQuestions })
            }
            style={styles.button}
          />

          <PrimaryButton
            title={`👤 ${t('profile')}`}
            variant="secondary"
            onPress={() => navigation.navigate('Profile')}
            style={styles.button}
          />

          <PrimaryButton
            title={t('chooseAnother')}
            variant="secondary"
            onPress={() => navigation.navigate('Home')}
            style={styles.button}
          />

          <PrimaryButton
            title={t('goHome')}
            variant="outline"
            onPress={() => navigation.navigate('Home')}
            style={styles.button}
          />
        </View>
      </ScrollView>
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
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#38BDF8',
    backgroundColor: '#1E293B',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  performanceMsg: {
    fontSize: 15,
    color: '#94A3B8',
    fontWeight: '600',
  },
  scoreCard: {
    marginVertical: 16,
    alignItems: 'center',
  },
  scoreRing: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  scorePercentage: {
    fontSize: 42,
    fontWeight: '800',
  },
  scoreRatio: {
    fontSize: 16,
    fontWeight: '700',
    color: '#94A3B8',
    marginTop: 4,
  },
  statsCard: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  statLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statLabel: {
    fontSize: 15,
    color: '#CBD5E1',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 17,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 4,
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
  },
});
