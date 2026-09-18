import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Image,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { QUIZ_CATEGORIES } from '../data/quizzes';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  playSound,
  startMillionaireMusic,
  stopMillionaireMusic,
  isMusicEnabled,
  setMusicEnabled,
} from '../utils/audio';
import { getQuizQuestions } from '../data/questionEngine';
import { getQuestionImageUrl } from '../utils/questionImages';
import FloatingBubbles from '../components/FloatingBubbles';

// Dynamic Question Hero Banner showing image matched directly to the question
function QuestionHeroBanner({ question, categoryId, categoryName, difficulty }) {
  const imageUrl = getQuestionImageUrl(question, categoryId);

  const diffBadge = {
    Easy: { label: '🟢 Oson', bg: 'rgba(16, 185, 129, 0.9)' },
    Medium: { label: "🟡 O'rtacha", bg: 'rgba(245, 158, 11, 0.9)' },
    Hard: { label: '🔴 Qiyin', bg: 'rgba(239, 68, 68, 0.9)' },
  }[difficulty] || { label: '🟢 Oson', bg: 'rgba(16, 185, 129, 0.9)' };

  return (
    <View style={styles.heroBannerBox}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.heroBannerImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['rgba(15, 23, 42, 0.25)', 'rgba(15, 23, 42, 0.85)']}
        style={styles.heroImageOverlay}
      />
      <View style={styles.heroTopRow}>
        <View style={styles.heroCategoryPill}>
          <Text style={styles.heroCategoryText}>{categoryName}</Text>
        </View>
        <View style={[styles.heroDiffPill, { backgroundColor: diffBadge.bg }]}>
          <Text style={styles.heroDiffText}>{diffBadge.label}</Text>
        </View>
      </View>
      {question?.topic ? (
        <View style={styles.heroBottomRow}>
          <Ionicons name="sparkles" size={13} color="#FBBF24" style={{ marginRight: 4 }} />
          <Text style={styles.heroTagText}>{question.topic}</Text>
        </View>
      ) : null}
    </View>
  );
}

// Animated Option Card with spring touch feedback and smooth staggered entrance
function AnimatedOptionCard({
  letter,
  option,
  idx,
  questionKey,
  isSelected,
  isCorrect,
  isAnswered,
  theme,
  isDark,
  onSelect,
}) {
  const animFade = useRef(new Animated.Value(0)).current;
  const animSlide = useRef(new Animated.Value(20)).current;
  const animScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    animFade.setValue(0);
    animSlide.setValue(20);
    const delay = idx * 60; // 0ms, 60ms, 120ms, 180ms smooth stagger
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(animFade, {
          toValue: 1,
          duration: 320,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(animSlide, {
          toValue: 0,
          duration: 320,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [questionKey, idx, animFade, animSlide]);

  const handlePressIn = () => {
    if (isAnswered) return;
    Animated.spring(animScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animScale, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  let optionBg = theme.cardBg;
  let optionBorder = theme.cardBorder;
  let letterBoxBg = isDark ? '#334155' : '#F1F5F9';
  let letterColor = theme.textPrimary;
  let textColor = theme.textPrimary;
  let statusIcon = null;

  if (isAnswered) {
    if (isCorrect) {
      optionBg = isDark ? 'rgba(16, 185, 129, 0.25)' : '#ECFDF5';
      optionBorder = '#10B981';
      letterBoxBg = '#10B981';
      letterColor = '#FFFFFF';
      textColor = isDark ? '#A7F3D0' : '#065F46';
      statusIcon = <Ionicons name="checkmark-circle" size={22} color="#10B981" />;
    } else if (isSelected && !isCorrect) {
      optionBg = isDark ? 'rgba(239, 68, 68, 0.25)' : '#FEF2F2';
      optionBorder = '#EF4444';
      letterBoxBg = '#EF4444';
      letterColor = '#FFFFFF';
      textColor = isDark ? '#FECACA' : '#991B1B';
      statusIcon = <Ionicons name="close-circle" size={22} color="#EF4444" />;
    }
  }

  return (
    <Animated.View
      style={{
        opacity: animFade,
        transform: [{ translateY: animSlide }, { scale: animScale }],
      }}
    >
      <Pressable
        style={[
          styles.optionItemBase,
          {
            backgroundColor: optionBg,
            borderColor: optionBorder,
          },
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onSelect(idx)}
      >
        <View style={styles.optionLeft}>
          <View style={[styles.letterBoxBase, { backgroundColor: letterBoxBg }]}>
            <Text style={[styles.letterTextBase, { color: letterColor }]}>{letter}</Text>
          </View>
          <Text style={[styles.optionTextBase, { color: textColor }]}>{option}</Text>
        </View>
        {statusIcon && <View style={styles.statusIconBox}>{statusIcon}</View>}
      </Pressable>
    </Animated.View>
  );
}

export default function QuizScreen({ route, navigation }) {
  const { updateUserStats } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  const {
    categoryId = 'general',
    categoryTitle = 'Umumiy bilim',
    difficulty = 'Medium',
    questionCount = 30,
  } = route.params || {};

  const category =
    QUIZ_CATEGORIES.find((c) => c.id === categoryId) || QUIZ_CATEGORIES[0];
  const categoryName = category?.title?.uz || categoryTitle;

  // Prepare authentic test questions: randomized selection
  const questionsList = useMemo(() => {
    return getQuizQuestions(categoryId, difficulty, questionCount || 30);
  }, [categoryId, difficulty, questionCount]);

  const totalQuestions = questionsList.length || 30;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [musicActive, setMusicActive] = useState(true);

  // Smooth question container transition on every question index change
  const questionFade = useRef(new Animated.Value(0)).current;
  const questionSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    questionFade.setValue(0);
    questionSlide.setValue(20);
    Animated.parallel([
      Animated.timing(questionFade, {
        toValue: 1,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(questionSlide, {
        toValue: 0,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex, questionFade, questionSlide]);

  // Initialize and manage suspense background music
  useEffect(() => {
    let isMounted = true;
    isMusicEnabled().then((enabled) => {
      if (isMounted) {
        setMusicActive(enabled);
        if (enabled) {
          startMillionaireMusic();
        }
      }
    });

    return () => {
      isMounted = false;
      stopMillionaireMusic();
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      if (!isAnswered) {
        setIsAnswered(true);
        playSound('wrong');
        stopMillionaireMusic();
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  const handleToggleMusic = async () => {
    playSound('click');
    const nextState = !musicActive;
    setMusicActive(nextState);
    await setMusicEnabled(nextState);
    if (nextState && !isAnswered) {
      startMillionaireMusic();
    } else {
      stopMillionaireMusic();
    }
  };

  const handleToggleTheme = () => {
    playSound('click');
    toggleTheme();
  };

  const handleGoBack = () => {
    stopMillionaireMusic();
    navigation.goBack();
  };

  const currentQuestion = questionsList[currentIndex] || questionsList[0];
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const questionText =
    typeof currentQuestion?.question === 'object'
      ? currentQuestion.question.uz || currentQuestion.question.en
      : currentQuestion?.question || 'Savol';

  const optionsList =
    typeof currentQuestion?.options === 'object' && !Array.isArray(currentQuestion.options)
      ? currentQuestion.options.uz || currentQuestion.options.en
      : currentQuestion?.options || [];

  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    // Pause tension music when answer is revealed
    stopMillionaireMusic();

    if (index === currentQuestion.correctAnswer) {
      playSound('correct'); // distinct triumph chime
      setScore((prev) => prev + 1);
    } else {
      playSound('wrong'); // distinct error buzzer
    }
  };

  const handleNextQuestion = () => {
    if (!isAnswered) {
      Alert.alert('Diqqat', 'Iltimos, avval javob variantini tanlang!');
      return;
    }
    playSound('click');

    if (isLastQuestion) {
      stopMillionaireMusic();
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

      // Resume tension soundtrack on next question if music is enabled
      if (musicActive) {
        startMillionaireMusic();
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Background Animated Floating Bubbles */}
      <FloatingBubbles />

      <View style={styles.container}>
        {/* Top Header Row with controls */}
        <View
          style={[
            styles.header,
            {
              paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 16 : 10) + 8,
              borderBottomColor: theme.divider,
            },
          ]}
        >
          <Pressable onPress={handleGoBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={theme.textPrimary} />
            <Text
              style={[styles.headerCategoryText, { color: theme.textPrimary }]}
              numberOfLines={1}
            >
              {categoryName}
            </Text>
          </Pressable>

          {/* Right Action Controls: Music, Theme, Timer */}
          <View style={styles.headerRightActions}>
            {/* Suspense Music Toggle */}
            <Pressable
              onPress={handleToggleMusic}
              style={[
                styles.iconBtn,
                {
                  backgroundColor: theme.cardBg,
                  borderColor: theme.cardBorder,
                },
                musicActive && styles.iconBtnActive,
              ]}
              accessibilityLabel="Musiqa"
            >
              <Ionicons
                name={musicActive ? 'musical-notes' : 'volume-mute'}
                size={18}
                color={musicActive ? '#6366F1' : theme.textMuted}
              />
            </Pressable>

            {/* Light / Dark Mode Toggle */}
            <Pressable
              onPress={handleToggleTheme}
              style={[
                styles.iconBtn,
                {
                  backgroundColor: theme.cardBg,
                  borderColor: theme.cardBorder,
                },
              ]}
              accessibilityLabel="Rejimni o'zgartirish"
            >
              <Ionicons
                name={isDark ? 'sunny' : 'moon'}
                size={18}
                color={isDark ? '#FBBF24' : '#6366F1'}
              />
            </Pressable>

            {/* Timer Badge */}
            <View
              style={[
                styles.timerBadge,
                {
                  backgroundColor: theme.cardBg,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Ionicons
                name="time-outline"
                size={16}
                color={timeLeft <= 10 ? '#EF4444' : '#F59E0B'}
                style={styles.timerIcon}
              />
              <Text
                style={[
                  styles.timerText,
                  { color: timeLeft <= 10 ? '#EF4444' : theme.textPrimary },
                ]}
              >
                {formatTime(timeLeft)}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress Indicator */}
          <View style={styles.progressRow}>
            <Text style={[styles.progressCounter, { color: theme.textSecondary }]}>
              {currentIndex + 1} / {totalQuestions}
            </Text>
          </View>
          <View style={[styles.progressBarTrack, { backgroundColor: theme.cardBorder }]}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${progressPercent}%`,
                  backgroundColor: theme.accent,
                },
              ]}
            />
          </View>

          {/* Smooth animated question wrapper for transition on each question */}
          <Animated.View
            style={{
              opacity: questionFade,
              transform: [{ translateY: questionSlide }],
            }}
          >
            {/* Dynamic Question Hero Banner */}
            <QuestionHeroBanner
              question={currentQuestion}
              categoryId={category?.id || categoryId}
              categoryName={categoryName}
              difficulty={difficulty}
            />

            {/* Question Text */}
            <Text style={[styles.questionTitle, { color: theme.textPrimary }]}>
              {questionText}
            </Text>

            {/* Animated Options List with press spring and staggered entrance */}
            <View style={styles.optionsList}>
              {optionsList.map((option, idx) => {
                const letter = optionLetters[idx] || `${idx + 1}`;
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQuestion.correctAnswer;

                return (
                  <AnimatedOptionCard
                    key={`${currentIndex}_opt_${idx}`}
                    questionKey={currentIndex}
                    idx={idx}
                    letter={letter}
                    option={option}
                    isSelected={isSelected}
                    isCorrect={isCorrect}
                    isAnswered={isAnswered}
                    theme={theme}
                    isDark={isDark}
                    onSelect={handleSelectOption}
                  />
                );
              })}
            </View>
          </Animated.View>
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
              {isLastQuestion ? "Natijani ko'rish" : 'Keyingi'}
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
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
    zIndex: 10,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
    flex: 1,
    marginRight: 8,
  },
  headerCategoryText: {
    fontSize: 18,
    fontWeight: '800',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  iconBtnActive: {
    borderColor: '#6366F1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  timerIcon: {
    marginRight: 4,
  },
  timerText: {
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    zIndex: 1,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  progressCounter: {
    fontSize: 13,
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  heroBannerBox: {
    width: '100%',
    height: 150,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 18,
    backgroundColor: '#1E293B',
  },
  heroBannerImage: {
    width: '100%',
    height: '100%',
  },
  heroImageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroTopRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroCategoryPill: {
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  heroCategoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  heroDiffPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  heroDiffText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  heroBottomRow: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroTagText: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowRadius: 4,
  },
  questionTitle: {
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 18,
  },
  optionsList: {
    gap: 12,
  },
  optionItemBase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  letterBoxBase: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  letterTextBase: {
    fontSize: 15,
    fontWeight: '700',
  },
  optionTextBase: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    lineHeight: 20,
  },
  statusIconBox: {
    marginLeft: 6,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  nextBtn: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  nextBtnDisabled: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextBtnPressed: {
    transform: [{ scale: 0.98 }],
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
