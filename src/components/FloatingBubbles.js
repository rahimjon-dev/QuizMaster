import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

// 12 distinct floating bubbles with diverse positions and trajectories
const BUBBLES_CONFIG = [
  { id: 1, size: 48, startX: 0.12, duration: 8500, delay: 0 },
  { id: 2, size: 28, startX: 0.35, duration: 7000, delay: 1200 },
  { id: 3, size: 64, startX: 0.72, duration: 10500, delay: 800 },
  { id: 4, size: 36, startX: 0.88, duration: 9000, delay: 2400 },
  { id: 5, size: 22, startX: 0.05, duration: 7500, delay: 3600 },
  { id: 6, size: 54, startX: 0.52, duration: 11000, delay: 1800 },
  { id: 7, size: 32, startX: 0.25, duration: 8200, delay: 4200 },
  { id: 8, size: 70, startX: 0.65, duration: 12000, delay: 2800 },
  { id: 9, size: 26, startX: 0.82, duration: 7800, delay: 5000 },
  { id: 10, size: 44, startX: 0.42, duration: 9500, delay: 3200 },
  { id: 11, size: 38, startX: 0.18, duration: 8900, delay: 6000 },
  { id: 12, size: 58, startX: 0.92, duration: 10800, delay: 4600 },
];

function SingleBubble({ config, isDark }) {
  const animY = useRef(new Animated.Value(0)).current;
  const animWiggle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Vertical floating loop
    const floatAnim = Animated.loop(
      Animated.sequence([
        Animated.delay(config.delay),
        Animated.timing(animY, {
          toValue: 1,
          duration: config.duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    // Horizontal gentle swaying
    const wiggleAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(animWiggle, {
          toValue: 1,
          duration: config.duration * 0.45,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(animWiggle, {
          toValue: -1,
          duration: config.duration * 0.45,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(animWiggle, {
          toValue: 0,
          duration: config.duration * 0.1,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    floatAnim.start();
    wiggleAnim.start();

    return () => {
      floatAnim.stop();
      wiggleAnim.stop();
    };
  }, [animY, animWiggle, config]);

  const translateY = animY.interpolate({
    inputRange: [0, 1],
    outputRange: [height + config.size, -config.size * 2],
  });

  const translateX = animWiggle.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-18, 0, 18],
  });

  const opacity = animY.interpolate({
    inputRange: [0, 0.15, 0.85, 1],
    outputRange: [0, isDark ? 0.45 : 0.35, isDark ? 0.45 : 0.35, 0],
  });

  const scale = animY.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1.05, 0.9],
  });

  const bubbleBg = isDark
    ? 'rgba(129, 140, 248, 0.22)'
    : 'rgba(99, 102, 241, 0.16)';

  const bubbleBorder = isDark
    ? 'rgba(168, 85, 247, 0.4)'
    : 'rgba(99, 102, 241, 0.3)';

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          width: config.size,
          height: config.size,
          borderRadius: config.size / 2,
          left: config.startX * width,
          backgroundColor: bubbleBg,
          borderColor: bubbleBorder,
          transform: [{ translateY }, { translateX }, { scale }],
          opacity,
        },
      ]}
    >
      {/* Glossy reflection highlight */}
      <View
        style={[
          styles.bubbleHighlight,
          {
            width: config.size * 0.35,
            height: config.size * 0.35,
            borderRadius: config.size * 0.175,
          },
        ]}
      />
    </Animated.View>
  );
}

export default function FloatingBubbles() {
  const { isDark } = useTheme();

  return (
    <View style={styles.container} pointerEvents="none">
      {BUBBLES_CONFIG.map((cfg) => (
        <SingleBubble key={cfg.id} config={cfg} isDark={isDark} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: 0,
  },
  bubble: {
    position: 'absolute',
    borderWidth: 1.5,
    shadowColor: '#818CF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  bubbleHighlight: {
    position: 'absolute',
    top: '16%',
    left: '18%',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
  },
});
