import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// 1. Quiz Master 3D Glowing Lightbulb Logo
export function QuizMasterLogo({ size = 120, glowing = true }) {
  return (
    <View style={[styles.logoContainer, { width: size, height: size }]}>
      {glowing && <View style={[styles.glowRing, { width: size * 1.3, height: size * 1.3 }]} />}
      <LinearGradient
        colors={['#FBBF24', '#F59E0B', '#D97706']}
        style={[styles.logoBulb, { width: size * 0.82, height: size * 0.82, borderRadius: size * 0.41 }]}
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 0.8, y: 0.9 }}
      >
        {/* Bulb glow highlights */}
        <View style={[styles.bulbHighlight, { width: size * 0.35, height: size * 0.25, borderRadius: size * 0.2 }]} />
        {/* Center Question Mark inside bulb */}
        <Text style={[styles.logoQuestionMark, { fontSize: size * 0.42 }]}>?</Text>
      </LinearGradient>
      {/* Bulb base screw */}
      <View style={[styles.bulbBase, { width: size * 0.38, height: size * 0.18 }]}>
        <View style={styles.screwThread} />
        <View style={styles.screwThread} />
        <View style={styles.screwBottom} />
      </View>
    </View>
  );
}

// 2. Onboarding Slide 1: Thinking Boy Graphic
export function ThinkingBoyIllustration({ size = 200 }) {
  return (
    <View style={[styles.illustrationCenter, { width: size, height: size }]}>
      {/* Ambient background aura */}
      <LinearGradient
        colors={['rgba(99, 102, 241, 0.15)', 'rgba(168, 85, 247, 0.05)', 'transparent']}
        style={[styles.auraCircle, { width: size * 1.15, height: size * 1.15, borderRadius: size * 0.6 }]}
      />

      {/* Floating question marks */}
      <View style={[styles.floatBadge, { top: 10, left: 10, backgroundColor: '#EEF2FF' }]}>
        <Text style={[styles.floatQuestionText, { color: '#6366F1' }]}>?</Text>
      </View>
      <View style={[styles.floatBadge, { top: 25, right: 15, backgroundColor: '#FEF3C7' }]}>
        <Text style={[styles.floatQuestionText, { color: '#F59E0B', fontSize: 16 }]}>💡</Text>
      </View>
      <View style={[styles.floatBadge, { bottom: 40, left: 20, backgroundColor: '#F3E8FF' }]}>
        <Text style={[styles.floatQuestionText, { color: '#A855F7', fontSize: 14 }]}>?</Text>
      </View>

      {/* 3D Stylized Boy Character */}
      <View style={styles.boyBody}>
        {/* Head */}
        <View style={styles.boyHead}>
          {/* Hair */}
          <View style={styles.boyHair} />
          {/* Face */}
          <View style={styles.boyFace}>
            <View style={styles.boyEyesRow}>
              <View style={styles.boyEye} />
              <View style={styles.boyEye} />
            </View>
            <View style={styles.boySmile} />
            {/* Thinking Hand on Chin */}
            <View style={styles.thinkingHand} />
          </View>
        </View>
        {/* Purple Hoodie */}
        <LinearGradient
          colors={['#6366F1', '#4F46E5']}
          style={styles.boyHoodie}
        >
          <View style={styles.hoodieCollar} />
        </LinearGradient>
      </View>
    </View>
  );
}

// 3. Onboarding Slide 2: Golden Trophy on Books
export function TrophyBooksIllustration({ size = 200 }) {
  return (
    <View style={[styles.illustrationCenter, { width: size, height: size }]}>
      {/* Ambient background aura */}
      <LinearGradient
        colors={['rgba(245, 158, 11, 0.18)', 'rgba(251, 191, 36, 0.05)', 'transparent']}
        style={[styles.auraCircle, { width: size * 1.15, height: size * 1.15, borderRadius: size * 0.6 }]}
      />

      {/* Sparkles */}
      <Text style={[styles.sparkle, { top: 15, left: 25 }]}>✨</Text>
      <Text style={[styles.sparkle, { top: 20, right: 30 }]}>⭐</Text>
      <Text style={[styles.sparkle, { bottom: 65, right: 20 }]}>✨</Text>

      {/* Golden Trophy */}
      <View style={styles.trophyWrapper}>
        <LinearGradient
          colors={['#FDE68A', '#F59E0B', '#D97706']}
          style={styles.trophyCup}
        >
          <View style={styles.trophyStar}>
            <Ionicons name="star" size={24} color="#FFFBEB" />
          </View>
          {/* Left / Right handles */}
          <View style={[styles.trophyHandle, styles.handleLeft]} />
          <View style={[styles.trophyHandle, styles.handleRight]} />
        </LinearGradient>
        {/* Trophy stem */}
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.trophyStem} />
        {/* Trophy base */}
        <LinearGradient colors={['#D97706', '#92400E']} style={styles.trophyBase} />
      </View>

      {/* Stack of colorful Books */}
      <View style={styles.booksStack}>
        {/* Book 1 (Blue) */}
        <LinearGradient colors={['#38BDF8', '#0284C7']} style={[styles.bookItem, { width: 140 }]}>
          <View style={styles.bookPages} />
        </LinearGradient>
        {/* Book 2 (Green) */}
        <LinearGradient colors={['#34D399', '#059669']} style={[styles.bookItem, { width: 160 }]}>
          <View style={styles.bookPages} />
        </LinearGradient>
      </View>
    </View>
  );
}

// 4. Onboarding Slide 3: Dartboard Target with Arrow
export function TargetDartIllustration({ size = 200 }) {
  return (
    <View style={[styles.illustrationCenter, { width: size, height: size }]}>
      {/* Ambient background aura */}
      <LinearGradient
        colors={['rgba(236, 72, 153, 0.15)', 'rgba(99, 102, 241, 0.08)', 'transparent']}
        style={[styles.auraCircle, { width: size * 1.15, height: size * 1.15, borderRadius: size * 0.6 }]}
      />

      {/* Sparkles */}
      <Text style={[styles.sparkle, { top: 15, left: 30 }]}>🎯</Text>
      <Text style={[styles.sparkle, { top: 20, right: 35 }]}>✨</Text>
      <Text style={[styles.sparkle, { bottom: 35, left: 25 }]}>⭐</Text>

      {/* 3D Dartboard rings */}
      <View style={styles.targetRings}>
        <View style={[styles.ring, styles.ringOuter]}>
          <View style={[styles.ring, styles.ringWhite]}>
            <View style={[styles.ring, styles.ringBlue]}>
              <View style={[styles.ring, styles.ringCenterRed]}>
                <View style={styles.bullseyeDot} />
              </View>
            </View>
          </View>
        </View>

        {/* Arrow hitting Bullseye */}
        <View style={styles.arrowHit}>
          <LinearGradient
            colors={['#EC4899', '#BE185D']}
            style={styles.arrowShaft}
          />
          <View style={styles.arrowFletch} />
        </View>
      </View>
    </View>
  );
}

// 5. Hero Banner Trophy Illustration (For Home Banner)
export function HomeBannerTrophy() {
  return (
    <View style={styles.bannerTrophyBox}>
      <LinearGradient
        colors={['#FEF08A', '#F59E0B', '#D97706']}
        style={styles.miniCup}
      >
        <Ionicons name="star" size={16} color="#FFF" />
      </LinearGradient>
      <LinearGradient colors={['#D97706', '#78350F']} style={styles.miniCupBase} />
      <View style={styles.miniCupPedestal} />
    </View>
  );
}

// 6. Big Victory Trophy for Result Screen
export function BigVictoryTrophy() {
  return (
    <View style={styles.victoryTrophyContainer}>
      {/* Radiant glow ring */}
      <LinearGradient
        colors={['rgba(251, 191, 36, 0.35)', 'rgba(245, 158, 11, 0.1)', 'transparent']}
        style={styles.trophyBigGlow}
      />
      <Text style={[styles.sparkle, { top: -5, left: 20, fontSize: 24 }]}>✨</Text>
      <Text style={[styles.sparkle, { top: -10, right: 25, fontSize: 22 }]}>⭐</Text>
      <Text style={[styles.sparkle, { bottom: 20, left: -5, fontSize: 20 }]}>✨</Text>
      <Text style={[styles.sparkle, { bottom: 30, right: -5, fontSize: 20 }]}>⭐</Text>

      {/* Main Cup */}
      <LinearGradient
        colors={['#FEF08A', '#FBBF24', '#F59E0B', '#D97706']}
        style={styles.bigCupBody}
      >
        <Ionicons name="trophy" size={54} color="#FFFBEB" />
        {/* Handles */}
        <View style={[styles.bigHandle, styles.bigHandleLeft]} />
        <View style={[styles.bigHandle, styles.bigHandleRight]} />
      </LinearGradient>
      {/* Cup Stand */}
      <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.bigCupStem} />
      {/* Marble Pedestal */}
      <LinearGradient colors={['#3B82F6', '#1E40AF']} style={styles.bigCupPedestal}>
        <View style={styles.pedestalPlate}>
          <Ionicons name="star" size={14} color="#FBBF24" />
        </View>
      </LinearGradient>
    </View>
  );
}

// 7. Tech Question Card Graphic (e.g. Android Robot / Circuit)
export function TechQuestionIllustration() {
  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#0F172A']}
      style={styles.techHeroBox}
    >
      <View style={styles.techGlowCircles}>
        <View style={[styles.techCircle, { width: 120, height: 120, borderColor: 'rgba(56, 189, 248, 0.2)' }]} />
        <View style={[styles.techCircle, { width: 80, height: 80, borderColor: 'rgba(74, 222, 128, 0.3)' }]} />
      </View>
      <View style={styles.androidBadge}>
        <Ionicons name="logo-android" size={56} color="#4ADE80" />
      </View>
      {/* Binary & circuit dots */}
      <View style={styles.techBinaryRow}>
        <Text style={styles.binaryText}>10101</Text>
        <View style={styles.chipPoint} />
        <Text style={styles.binaryText}>01010</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  glowRing: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(251, 191, 36, 0.25)',
  },
  logoBulb: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  bulbHighlight: {
    position: 'absolute',
    top: '12%',
    left: '18%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  logoQuestionMark: {
    fontWeight: '900',
    color: '#1E1B4B',
  },
  bulbBase: {
    marginTop: -4,
    alignItems: 'center',
  },
  screwThread: {
    width: '100%',
    height: 4,
    backgroundColor: '#94A3B8',
    borderRadius: 2,
    marginVertical: 1,
  },
  screwBottom: {
    width: '50%',
    height: 6,
    backgroundColor: '#64748B',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  illustrationCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  auraCircle: {
    position: 'absolute',
  },
  floatBadge: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  floatQuestionText: {
    fontSize: 20,
    fontWeight: '800',
  },
  sparkle: {
    position: 'absolute',
    fontSize: 18,
  },

  // Boy Illustration
  boyBody: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boyHead: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#FBCFE8',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  boyHair: {
    width: 86,
    height: 38,
    backgroundColor: '#374151',
    borderTopLeftRadius: 43,
    borderTopRightRadius: 43,
  },
  boyFace: {
    width: 60,
    alignItems: 'center',
    marginTop: 6,
  },
  boyEyesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 36,
  },
  boyEye: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1F2937',
  },
  boySmile: {
    width: 14,
    height: 7,
    borderBottomWidth: 2.5,
    borderBottomColor: '#1F2937',
    borderRadius: 7,
    marginTop: 6,
  },
  thinkingHand: {
    position: 'absolute',
    right: 4,
    bottom: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FBCFE8',
    borderWidth: 2,
    borderColor: '#F472B6',
  },
  boyHoodie: {
    width: 110,
    height: 75,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -8,
    alignItems: 'center',
  },
  hoodieCollar: {
    width: 32,
    height: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: '#EEF2FF',
    marginTop: 2,
  },

  // Trophy & Books
  trophyWrapper: {
    alignItems: 'center',
    marginBottom: -4,
  },
  trophyCup: {
    width: 80,
    height: 70,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#F59E0B',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  trophyStar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophyHandle: {
    position: 'absolute',
    top: 10,
    width: 24,
    height: 34,
    borderWidth: 5,
    borderColor: '#F59E0B',
    borderRadius: 16,
  },
  handleLeft: {
    left: -18,
    borderRightWidth: 0,
  },
  handleRight: {
    right: -18,
    borderLeftWidth: 0,
  },
  trophyStem: {
    width: 16,
    height: 18,
  },
  trophyBase: {
    width: 54,
    height: 14,
    borderRadius: 4,
  },
  booksStack: {
    alignItems: 'center',
  },
  bookItem: {
    height: 18,
    borderRadius: 5,
    marginVertical: 2,
    justifyContent: 'center',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  bookPages: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 1,
  },

  // Dartboard
  targetRings: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  ringOuter: {
    width: 140,
    height: 140,
    backgroundColor: '#6366F1',
  },
  ringWhite: {
    width: 112,
    height: 112,
    backgroundColor: '#FFFFFF',
  },
  ringBlue: {
    width: 84,
    height: 84,
    backgroundColor: '#6366F1',
  },
  ringCenterRed: {
    width: 56,
    height: 56,
    backgroundColor: '#FFFFFF',
  },
  bullseyeDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EC4899',
  },
  arrowHit: {
    position: 'absolute',
    right: -15,
    top: -10,
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
  },
  arrowShaft: {
    width: 6,
    height: 70,
    borderRadius: 3,
  },
  arrowFletch: {
    width: 18,
    height: 18,
    backgroundColor: '#EC4899',
    transform: [{ rotate: '45deg' }],
    marginTop: -8,
  },

  // Home Banner Trophy
  bannerTrophyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  miniCup: {
    width: 44,
    height: 40,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniCupBase: {
    width: 10,
    height: 10,
  },
  miniCupPedestal: {
    width: 32,
    height: 8,
    backgroundColor: '#B45309',
    borderRadius: 2,
  },

  // Result Victory Trophy
  victoryTrophyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
    position: 'relative',
  },
  trophyBigGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  bigCupBody: {
    width: 110,
    height: 96,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#F59E0B',
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 16,
  },
  bigHandle: {
    position: 'absolute',
    top: 14,
    width: 32,
    height: 46,
    borderWidth: 6,
    borderColor: '#F59E0B',
    borderRadius: 22,
  },
  bigHandleLeft: {
    left: -24,
    borderRightWidth: 0,
  },
  bigHandleRight: {
    right: -24,
    borderLeftWidth: 0,
  },
  bigCupStem: {
    width: 22,
    height: 24,
  },
  bigCupPedestal: {
    width: 76,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pedestalPlate: {
    width: 24,
    height: 16,
    backgroundColor: '#1E3A8A',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Tech Question Card
  techHeroBox: {
    width: '100%',
    height: 130,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  techGlowCircles: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  techCircle: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1.5,
  },
  androidBadge: {
    shadowColor: '#4ADE80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 6,
  },
  techBinaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 8,
  },
  binaryText: {
    color: 'rgba(56, 189, 248, 0.4)',
    fontSize: 10,
    fontFamily: 'monospace',
    marginHorizontal: 8,
  },
  chipPoint: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#38BDF8',
  },
});
