import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QuizMasterLogo } from '../components/illustrations';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2400);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Pressable style={styles.container} onPress={() => navigation.replace('Onboarding')}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#4F46E5', '#6366F1', '#7C3AED', '#2563EB']}
        style={styles.gradientBg}
        start={{ x: 0.1, y: 0.0 }}
        end={{ x: 0.9, y: 1.0 }}
      >
        <View style={styles.centerContent}>
          {/* 3D Glowing Lightbulb Logo */}
          <QuizMasterLogo size={130} glowing={true} />

          {/* Title */}
          <Text style={styles.titleText}>Quiz{'\n'}Master</Text>

          {/* Subtitle */}
          <Text style={styles.subtitleText}>
            Bilimingizni sinab ko'ring{'\n'}va yangi narsalarni o'rganing!
          </Text>
        </View>

        {/* Subtle bottom indicator */}
        <View style={styles.bottomBar}>
          <View style={styles.indicatorPill} />
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 46,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 18,
    lineHeight: 24,
    maxWidth: width * 0.78,
    fontWeight: '500',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  indicatorPill: {
    width: 60,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});
