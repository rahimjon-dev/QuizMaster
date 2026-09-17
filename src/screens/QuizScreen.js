import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { QUIZ_CATEGORIES, QUIZ_QUESTIONS } from '../data/quizzes';
import { useAuth } from '../context/AuthContext';
import { playSound } from '../utils/audio';

// Dynamic Hero Card matching the Category
function CategoryHeroBanner({ categoryId, categoryName }) {
  let iconName = 'book';
  let iconColor = '#818CF8';
  let gradientColors = ['#0F172A', '#1E1B4B', '#0F172A'];
  let subtitleTag = 'Umumiy bilim';

  if (categoryId === 'programming' || categoryId === 'technology') {
    iconName = 'logo-android';
    iconColor = '#4ADE80';
    gradientColors = ['#0F172A', '#1E293B', '#0F172A'];
    subtitleTag = 'Texnologiya & IT';
  } else if (categoryId === 'geography') {
    iconName = 'earth';
    iconColor = '#34D399';
    gradientColors = ['#064E3B', '#065F46', '#022C22'];
    subtitleTag = 'Geografiya & Dunyo';
  } else if (categoryId === 'football' || categoryId === 'sport') {
    iconName = 'football';
    iconColor = '#FBBF24';
    gradientColors = ['#064E3B', '#14532D', '#052E16'];
    subtitleTag = 'Sport & Chempionat';
  } else if (categoryId === 'history') {
    iconName = 'business';
    iconColor = '#FB7185';
    gradientColors = ['#4C0519', '#881337', '#310410'];
    subtitleTag = 'Tarix & Madaniyat';
  } else if (categoryId === 'science') {
    iconName = 'flask';
    iconColor = '#C084FC';
    gradientColors = ['#2E1065', '#3B0764', '#1E1B4B'];
    subtitleTag = 'Fan & Koinot';
  } else if (categoryId === 'culture') {
    iconName = 'color-palette';
    iconColor = '#F472B6';
    gradientColors = ['#4A044E', '#701A75', '#2E0854'];
    subtitleTag = 'San\'at & Madaniyat';
  }

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.heroBannerBox}
    >
      <View style={styles.heroGlowRings}>
        <View style={[styles.heroRing, { width: 130, height: 130, borderColor: `${iconColor}33` }]} />
        <View style={[styles.heroRing, { width: 90, height: 90, borderColor: `${iconColor}66` }]} />
      </View>
      <View style={styles.heroIconBadge}>
        <Ionicons name={iconName} size={54} color={iconColor} />
      </View>
      <View style={styles.heroBottomRow}>
        <Text style={[styles.heroTagText, { color: iconColor }]}>{subtitleTag}</Text>
      </View>
    </LinearGradient>
  );
}

export default function QuizScreen({ route, navigation }) {
  const { updateUserStats } = useAuth();
  const insets = useSafeAreaInsets();

  const {
    categoryId = 'programming',
    categoryTitle = 'Texnologiya',
    difficulty = 'Easy',
    questionCount = 10,
  } = route.params || {};

  const category =
    QUIZ_CATEGORIES.find((c) => c.id === categoryId) || QUIZ_CATEGORIES[0];

  const categoryName = category?.title?.uz || categoryTitle;

  // Prepare questions
  const questionsList = useMemo(() => {
    const raw = QUIZ_QUESTIONS[categoryId] || QUIZ_QUESTIONS.programming || QUIZ_QUESTIONS.general;
    return raw.slice(0, questionCount);
  }, [categoryId, questionCount]);

  const totalQuestions = questionsList.length || 10;

  // Real gameplay state: starts from question 0, no pre-selected answers!
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const currentQuestion = questionsList[currentIndex] || questionsList[0];
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const questionText =
    typeof currentQuestion.question === 'object'
      ? currentQuestion.question.uz || currentQuestion.question.en
      : currentQuestion.question;

  const optionsList =
    typeof currentQuestion.options === 'object' && !Array.isArray(currentQuestion.options)
      ? currentQuestion.options.uz || currentQuestion.options.en
      : currentQuestion.options;

  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctAnswer) {
      playSound('success');
      setScore((prev) => prev + 1);
    } else {
      playSound('wrong');
    }
  };

  const handleNextQuestion = () => {
    if (!isAnswered) {
      Alert.alert('Diqqat', 'Iltimos, avval javob variantini tanlang!');
      return;
    }

    if (isLastQuestion) {
      const finalScore = score + (selectedAnswer === currentQuestion.correctAnswer ? 0 : 0);
      const percentage = Math.round((finalScore / totalQuestions) * 100);
      const wrongCount = totalQuestions - finalScore;

      if (updateUserStats) {
        updateUserStats(finalScore, totalQuestions, percentage);
      }

      navigation.replace('Result', {
        categoryId,
        categoryTitle: categoryName,
        totalQuestions,
        correctCount: finalScore,
        wrongCount,
        percentage,
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.container}>
        {/* Top Header Row with safe area padding */}
        <View
          style={[
            styles.header,
            { paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 16 : 10) + 8 },
          ]}
        >
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
            <Text style={styles.headerCategoryText}>{categoryName}</Text>
          </Pressable>

          {/* Timer Badge */}
          <View style={styles.timerBadge}>
            <Ionicons name="time-outline" size={16} color="#EF4444" style={styles.timerIcon} />
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress Indicator */}
          <View style={styles.progressRow}>
            <Text style={styles.progressCounter}>
              {currentIndex + 1}/{totalQuestions}
            </Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>

          {/* Dynamic Hero Banner matching category */}
          <CategoryHeroBanner categoryId={category?.id || categoryId} categoryName={categoryName} />

          {/* Question Text */}
          <Text style={styles.questionTitle}>{questionText}</Text>

          {/* Options List */}
          <View style={styles.optionsList}>
            {optionsList.map((option, idx) => {
              const letter = optionLetters[idx] || `${idx + 1}`;
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQuestion.correctAnswer;

              let optionStyle = styles.optionItemDefault;
              let letterBoxStyle = styles.letterBoxDefault;
              let letterTextStyle = styles.letterTextDefault;
              let optionTextStyle = styles.optionTextDefault;
              let statusIcon = null;

              if (isAnswered) {
                if (isCorrect) {
                  optionStyle = styles.optionItemCorrect;
                  letterBoxStyle = styles.letterBoxCorrect;
                  letterTextStyle = styles.letterTextActive;
                  optionTextStyle = styles.optionTextActive;
                  statusIcon = (
                    <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                  );
                } else if (isSelected && !isCorrect) {
                  optionStyle = styles.optionItemWrong;
                  letterBoxStyle = styles.letterBoxWrong;
                  letterTextStyle = styles.letterTextActive;
                  optionTextStyle = styles.optionTextActive;
                  statusIcon = (
                    <Ionicons name="close-circle" size={20} color="#FFFFFF" />
                  );
                }
              }

              return (
                <Pressable
                  key={idx}
                  style={({ pressed }) => [
                    styles.optionItemBase,
                    optionStyle,
                    pressed && !isAnswered && styles.optionPressed,
                  ]}
                  onPress={() => handleSelectOption(idx)}
                >
                  <View style={styles.optionLeft}>
                    <View style={[styles.letterBoxBase, letterBoxStyle]}>
                      <Text style={[styles.letterTextBase, letterTextStyle]}>
                        {letter}
                      </Text>
                    </View>
                    <Text style={[styles.optionTextBase, optionTextStyle]}>
                      {option}
                    </Text>
                  </View>

                  {statusIcon && <View style={styles.statusIconBox}>{statusIcon}</View>}
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View
          style={[
            styles.bottomBar,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
          <Pressable
            style={({ pressed }) => [
              styles.nextBtn,
              !isAnswered && styles.nextBtnDisabled,
              pressed && isAnswered && styles.nextBtnPressed,
            ]}
            onPress={handleNextQuestion}
          >
            <Text style={styles.nextBtnText}>
              {isLastQuestion ? 'Natijani ko\'rish' : 'Keyingi'}
            </Text>
          </Pressable>
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#F8FAFC',
    zIndex: 10,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  headerCategoryText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 16,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  timerIcon: {
    marginRight: 4,
  },
  timerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 6,
  },
  progressCounter: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 3,
  },

  // Category Hero Banner
  heroBannerBox: {
    width: '100%',
    height: 125,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  heroGlowRings: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroRing: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1.5,
  },
  heroIconBadge: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  heroBottomRow: {
    position: 'absolute',
    bottom: 8,
  },
  heroTagText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  questionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 24,
    marginBottom: 16,
  },
  optionsList: {
    gap: 12,
  },
  optionItemBase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  optionPressed: {
    transform: [{ scale: 0.985 }],
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  letterBoxBase: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  letterTextBase: {
    fontSize: 14,
    fontWeight: '700',
  },
  optionTextBase: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },

  // Default state
  optionItemDefault: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  letterBoxDefault: {
    backgroundColor: '#F1F5F9',
  },
  letterTextDefault: {
    color: '#64748B',
  },
  optionTextDefault: {
    color: '#1E293B',
  },

  // Correct state (Green)
  optionItemCorrect: {
    backgroundColor: '#10B981',
    borderColor: '#059669',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  letterBoxCorrect: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },

  // Wrong state (Red)
  optionItemWrong: {
    backgroundColor: '#EF4444',
    borderColor: '#DC2626',
  },
  letterBoxWrong: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },

  letterTextActive: {
    color: '#FFFFFF',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  statusIconBox: {
    marginLeft: 10,
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#F8FAFC',
  },
  nextBtn: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  nextBtnDisabled: {
    opacity: 0.6,
  },
  nextBtnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
