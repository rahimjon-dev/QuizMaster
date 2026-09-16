import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BigVictoryTrophy } from '../components/illustrations';

const { width } = Dimensions.get('window');

export default function ResultScreen({ route, navigation }) {
  const {
    categoryId = 'programming',
    totalQuestions = 10,
    correctCount = 8,
    wrongCount = 2,
    percentage = 80,
  } = route.params || {};

  const handlePlayAgain = () => {
    navigation.replace('Quiz', {
      categoryId,
      questionCount: totalQuestions,
    });
  };

  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#1E1B4B', '#2E1065', '#1E3A8A']}
        style={styles.gradientBg}
        start={{ x: 0.1, y: 0.0 }}
        end={{ x: 0.9, y: 1.0 }}
      >
        <View style={styles.contentContainer}>
          {/* Big Golden Victory Trophy */}
          <BigVictoryTrophy />

          {/* Title and Subtitle */}
          <Text style={styles.resultTitle}>Ajoyib natija!</Text>
          <Text style={styles.resultSubtitle}>
            Siz {totalQuestions} ta savoldan {correctCount} tasiga to'g'ri javob berdingiz!
          </Text>

          {/* 3 Stat Cards Row */}
          <View style={styles.statsRow}>
            {/* Stat 1: To'g'ri */}
            <View style={styles.statCard}>
              <View style={[styles.statBadge, { backgroundColor: '#10B981' }]}>
                <Text style={styles.statBadgeText}>{correctCount}</Text>
              </View>
              <Text style={styles.statLabel}>To'g'ri</Text>
            </View>

            {/* Stat 2: Noto'g'ri */}
            <View style={styles.statCard}>
              <View style={[styles.statBadge, { backgroundColor: '#8B5CF6' }]}>
                <Text style={styles.statBadgeText}>{wrongCount}</Text>
              </View>
              <Text style={styles.statLabel}>Noto'g'ri</Text>
            </View>

            {/* Stat 3: Natija % */}
            <View style={styles.statCard}>
              <View style={[styles.statBadge, { backgroundColor: '#06B6D4' }]}>
                <Text style={styles.statBadgeText}>{percentage}%</Text>
              </View>
              <Text style={styles.statLabel}>Natija</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            {/* Qayta o'ynash */}
            <Pressable
              style={({ pressed }) => [
                styles.primaryBtn,
                pressed && styles.btnPressed,
              ]}
              onPress={handlePlayAgain}
            >
              <Text style={styles.primaryBtnText}>Qayta o'ynash</Text>
            </Pressable>

            {/* Bosh sahifaga */}
            <Pressable
              style={({ pressed }) => [
                styles.outlineBtn,
                pressed && styles.btnPressed,
              ]}
              onPress={handleGoHome}
            >
              <Text style={styles.outlineBtnText}>Bosh sahifaga</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1B4B',
  },
  gradientBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  resultSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    maxWidth: width * 0.8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 28,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  statBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 6,
  },
  statBadgeText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  outlineBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  outlineBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
