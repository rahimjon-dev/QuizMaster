import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { QUIZ_CATEGORIES, QUIZ_QUESTIONS } from '../data/quizzes';
import { prepareQuizSession } from '../utils/shuffle';
import ProgressBar from '../components/ProgressBar';
import AnswerOption from '../components/AnswerOption';
import PrimaryButton from '../components/PrimaryButton';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function QuizScreen({ route, navigation }) {
  const { lang, t } = useLanguage();
  const { user, updateUserStats } = useAuth();

  const {
    categoryId = 'general',
    difficulty = 'Medium',
    questionCount = 15,
  } = route.params || {};

  const category =
    QUIZ_CATEGORIES.find((c) => c.id === categoryId) || QUIZ_CATEGORIES[0];

  const categoryTitle =
    typeof category.title === 'object'
      ? category.title[lang] || category.title.en
      : category.title;

  // Prepare randomized and shuffled quiz session
  const randomizedQuestions = useMemo(() => {
    const rawQuestions = QUIZ_QUESTIONS[categoryId] || QUIZ_QUESTIONS.general;
    return prepareQuizSession(rawQuestions, difficulty, questionCount);
  }, [categoryId, difficulty, questionCount]);

  const totalQuestions = randomizedQuestions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = randomizedQuestions[currentIndex] || randomizedQuestions[0];
  const isLastQuestion = currentIndex === totalQuestions - 1;

  // Extract localized question string and options array
  const questionText =
    typeof currentQuestion.question === 'object'
      ? currentQuestion.question[lang] || currentQuestion.question.en
      : currentQuestion.question;

  const optionsList =
    typeof currentQuestion.options === 'object' && !Array.isArray(currentQuestion.options)
      ? currentQuestion.options[lang] || currentQuestion.options.en
      : currentQuestion.options;

  const handleSelectOption = (index) => {
    if (isAnswered) return; // Prevent double selecting once locked

    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!isAnswered) {
      Alert.alert(
        t('alertSelectTitle'),
        t('alertSelectMsg'),
        [{ text: 'OK' }]
      );
      return;
    }

    if (isLastQuestion) {
      // Calculate final results
      const finalScore = score;
      const percentage = Math.round((finalScore / totalQuestions) * 100);
      const wrongAnswers = totalQuestions - finalScore;

      // Update personal user statistics in AuthContext
      if (updateUserStats) {
        updateUserStats(finalScore, totalQuestions, percentage);
      }

      navigation.replace('Result', {
        categoryId,
        categoryTitle,
        categoryIcon: category.icon,
        difficulty,
        score: finalScore,
        totalQuestions,
        percentage,
        correctAnswers: finalScore,
        wrongAnswers,
      });
    } else {
      // Move to next question
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const getDifficultyBadgeColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return '#10B981';
      case 'hard':
        return '#EF4444';
      default:
        return '#F59E0B';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Bar */}
        <View style={styles.header}>
          <Text style={styles.categoryBadge}>
            {category.icon} {categoryTitle}
          </Text>
          <View
            style={[
              styles.difficultyTag,
              { borderColor: getDifficultyBadgeColor(difficulty) },
            ]}
          >
            <Text
              style={[
                styles.difficultyText,
                { color: getDifficultyBadgeColor(difficulty) },
              ]}
            >
              {difficulty.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />

        {/* Millionaire-Style Question Card */}
        <View style={styles.questionCard}>
          <View style={styles.questionMetaRow}>
            <Text style={styles.questionNumberText}>
              {t('question')} {currentIndex + 1}
            </Text>
            <Text style={styles.difficultyIndicator}>
              Level: {currentQuestion.difficulty}
            </Text>
          </View>
          <Text style={styles.questionText}>{questionText}</Text>
        </View>

        {/* Answer Options */}
        <View style={styles.optionsContainer}>
          {optionsList.map((option, idx) => (
            <AnswerOption
              key={idx}
              index={idx}
              optionText={option}
              isSelected={selectedAnswer === idx}
              isCorrect={idx === currentQuestion.correctAnswer}
              showResult={isAnswered}
              disabled={isAnswered}
              onSelect={handleSelectOption}
            />
          ))}
        </View>

        {/* Action Button */}
        <View style={styles.footerAction}>
          <PrimaryButton
            title={
              !isAnswered
                ? t('selectAnswer')
                : isLastQuestion
                ? t('finishQuiz')
                : t('nextQuestion')
            }
            onPress={handleNextQuestion}
            disabled={!isAnswered}
            variant="primary"
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
    paddingBottom: 45,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 6,
  },
  categoryBadge: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F59E0B',
  },
  difficultyTag: {
    backgroundColor: '#1E293B',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  questionCard: {
    backgroundColor: '#1E1B4B',
    borderRadius: 22,
    padding: 24,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#4338CA',
    shadowColor: '#4338CA',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  questionMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  questionNumberText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#F59E0B',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  difficultyIndicator: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F8FAFC',
    lineHeight: 30,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  footerAction: {
    marginTop: 4,
  },
});
