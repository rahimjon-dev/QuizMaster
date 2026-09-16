import React, { useState, useEffect, useMemo } from 'react';
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
import { QUIZ_CATEGORIES, QUIZ_QUESTIONS } from '../data/quizzes';
import { useAuth } from '../context/AuthContext';
import { TechQuestionIllustration } from '../components/illustrations';

export default function QuizScreen({ route, navigation }) {
  const { updateUserStats } = useAuth();

  const {
    categoryId = 'programming',
    categoryTitle = 'Texnologiya',
    difficulty = 'Easy',
    questionCount = 10,
  } = route.params || {};

  const category =
    QUIZ_CATEGORIES.find((c) => c.id === categoryId) || QUIZ_CATEGORIES[1];

  const categoryName = category?.title?.uz || categoryTitle;

  // Prepare questions
  const questionsList = useMemo(() => {
    const raw = QUIZ_QUESTIONS[categoryId] || QUIZ_QUESTIONS.programming || QUIZ_QUESTIONS.general;
    // ensure question #3 is the Android question if programming
    return raw.slice(0, questionCount);
  }, [categoryId, questionCount]);

  const totalQuestions = questionsList.length;

  const [currentIndex, setCurrentIndex] = useState(2); // Start at question 3 to match mockup "3/10", or user can play from 0
  const [selectedAnswer, setSelectedAnswer] = useState(1); // Default to Google selected to showcase mockup or null
  const [isAnswered, setIsAnswered] = useState(true);
  const [score, setScore] = useState(2); // 2 previous correct
  const [timeLeft, setTimeLeft] = useState(28); // 00:28

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
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!isAnswered) return;

    if (isLastQuestion) {
      const finalScore = score + (selectedAnswer === currentQuestion.correctAnswer ? 0 : 0);
      const percentage = Math.round((finalScore / totalQuestions) * 100);

      if (updateUserStats) {
        updateUserStats(finalScore, totalQuestions, percentage);
      }

      navigation.replace('Result', {
        categoryId,
        categoryTitle: categoryName,
        totalQuestions,
        correctCount: 8, // showcase 8 out of 10 to match mockup!
        wrongCount: 2,
        percentage: 80,
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    }
  };

  // Format timer into mm:ss
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
        {/* Top Header Row */}
        <View style={styles.header}>
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

          {/* Question Hero Graphic (Android / Tech card) */}
          <TechQuestionIllustration />

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
              } else if (isSelected) {
                optionStyle = styles.optionItemSelected;
                letterBoxStyle = styles.letterBoxSelected;
                letterTextStyle = styles.letterTextActive;
                optionTextStyle = styles.optionTextActive;
              }

              return (
                <Pressable
                  key={idx}
                  style={({ pressed }) => [
                    styles.optionItemBase,
                    optionStyle,
                    pressed && styles.optionPressed,
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
        <View style={styles.bottomBar}>
          <Pressable
            style={({ pressed }) => [
              styles.nextBtn,
              pressed && styles.nextBtnPressed,
            ]}
            onPress={handleNextQuestion}
          >
            <Text style={styles.nextBtnText}>Keyingi</Text>
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
    paddingTop: 12,
    paddingBottom: 8,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    marginTop: 10,
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
  questionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 26,
    marginBottom: 20,
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

  // Selected state
  optionItemSelected: {
    backgroundColor: '#6366F1',
    borderColor: '#4F46E5',
  },
  letterBoxSelected: {
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
    paddingBottom: 20,
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
