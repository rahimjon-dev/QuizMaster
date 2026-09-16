import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  ThinkingBoyIllustration,
  TrophyBooksIllustration,
  TargetDartIllustration,
} from '../components/illustrations';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    counter: '1/3',
    illustration: <ThinkingBoyIllustration size={220} />,
    title: "Bilimingizni sinab ko'ring",
    subtitle: "Turli mavzularda qiziqarli savollar bilan o'z bilim darajangizni tekshiring.",
    buttonText: "Keyingi",
  },
  {
    id: 2,
    counter: '2/3',
    illustration: <TrophyBooksIllustration size={220} />,
    title: "Musobaqada ishtirok eting",
    subtitle: "Do'stlaringiz bilan bellashib, eng yaxshi natijani ko'rsating!",
    buttonText: "Keyingi",
  },
  {
    id: 3,
    counter: '3/3',
    illustration: <TargetDartIllustration size={220} />,
    title: "Maqsadingizga intiling",
    subtitle: "Har bir to'g'ri javob — yangi bilim va yutuq sari qadam!",
    buttonText: "Boshlash",
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.container}>
        {/* Top Header Row with Counter and Skip */}
        <View style={styles.headerRow}>
          <Pressable onPress={handleSkip}>
            <Text style={styles.skipText}>O'tkazish</Text>
          </Pressable>
          <Text style={styles.counterText}>{currentSlide.counter}</Text>
        </View>

        {/* Center Illustration */}
        <View style={styles.illustrationWrapper}>
          {currentSlide.illustration}
        </View>

        {/* Title and Subtitle */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{currentSlide.title}</Text>
          <Text style={styles.subtitleText}>{currentSlide.subtitle}</Text>
        </View>

        {/* Pagination Dots */}
        <View style={styles.paginationRow}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Bottom Button */}
        <View style={styles.buttonWrapper}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && styles.primaryBtnPressed,
            ]}
            onPress={handleNext}
          >
            <Text style={styles.btnText}>{currentSlide.buttonText}</Text>
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
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 28,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
  },
  skipText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
  counterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 34,
  },
  subtitleText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 14,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 22,
    backgroundColor: '#6366F1',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#CBD5E1',
  },
  buttonWrapper: {
    width: '100%',
  },
  primaryBtn: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryBtnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
