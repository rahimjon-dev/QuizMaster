import React, { useState } from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomTabBar from '../components/BottomTabBar';

const LEADERBOARD_DATA = [
  { id: 1, rank: 1, name: 'Azizbek', score: 980, avatarColor: ['#F59E0B', '#D97706'], medal: '🥇' },
  { id: 2, rank: 2, name: 'Dilshod', score: 955, avatarColor: ['#94A3B8', '#64748B'], medal: '🥈' },
  { id: 3, rank: 3, name: 'Shavkat', score: 920, avatarColor: ['#D97706', '#92400E'], medal: '🥉' },
  { id: 4, rank: 4, name: 'Sardor', score: 890, avatarColor: ['#38BDF8', '#0284C7'] },
  { id: 5, rank: 5, name: 'Xusniddin', score: 870, isCurrentUser: true, avatarColor: ['#818CF8', '#6366F1'] },
  { id: 6, rank: 6, name: 'Mohira', score: 850, avatarColor: ['#EC4899', '#BE185D'] },
  { id: 7, rank: 7, name: 'Islom', score: 820, avatarColor: ['#10B981', '#059669'] },
  { id: 8, rank: 8, name: 'Behzod', score: 790, avatarColor: ['#8B5CF6', '#6D28D9'] },
  { id: 9, rank: 9, name: 'Sanjar', score: 760, avatarColor: ['#F43F5E', '#BE123C'] },
  { id: 10, rank: 10, name: 'Farhod', score: 730, avatarColor: ['#6366F1', '#4338CA'] },
];

export default function LeaderboardScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('umumiy'); // 'umumiy' | 'haftalik' | 'oylik'

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 16 : 8) + 8 }]}>
          <Text style={styles.headerTitle}>Reyting</Text>
        </View>

        {/* Filter Tabs: Umumiy | Haftalik | Oylik */}
        <View style={styles.tabsRow}>
          <Pressable
            style={[styles.tabBtn, activeTab === 'umumiy' && styles.tabBtnActive]}
            onPress={() => setActiveTab('umumiy')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'umumiy' && styles.tabTextActive,
              ]}
            >
              Umumiy
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tabBtn, activeTab === 'haftalik' && styles.tabBtnActive]}
            onPress={() => setActiveTab('haftalik')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'haftalik' && styles.tabTextActive,
              ]}
            >
              Haftalik
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tabBtn, activeTab === 'oylik' && styles.tabBtnActive]}
            onPress={() => setActiveTab('oylik')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'oylik' && styles.tabTextActive,
              ]}
            >
              Oylik
            </Text>
          </Pressable>
        </View>

        {/* Leaderboard List */}
        <ScrollView
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        >
          {LEADERBOARD_DATA.map((player) => {
            const isUser = player.isCurrentUser;
            return (
              <View
                key={player.id}
                style={[
                  styles.playerRow,
                  isUser && styles.playerRowHighlight,
                ]}
              >
                {/* Rank Number or Medal */}
                <View style={styles.rankBox}>
                  {player.medal ? (
                    <Text style={styles.medalText}>{player.medal}</Text>
                  ) : (
                    <Text
                      style={[
                        styles.rankNumber,
                        isUser && styles.rankNumberHighlight,
                      ]}
                    >
                      {player.rank}
                    </Text>
                  )}
                </View>

                {/* Avatar */}
                <LinearGradient
                  colors={player.avatarColor}
                  style={styles.avatarCircle}
                >
                  <Ionicons name="person" size={16} color="#FFFFFF" />
                </LinearGradient>

                {/* Name */}
                <Text
                  style={[
                    styles.playerName,
                    isUser && styles.playerNameHighlight,
                  ]}
                >
                  {player.name}
                </Text>

                {/* Score */}
                <Text
                  style={[
                    styles.playerScore,
                    isUser && styles.playerScoreHighlight,
                  ]}
                >
                  {player.score}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <BottomTabBar activeTab="leaderboard" navigation={navigation} />
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
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 8,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  tabBtnActive: {
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  playerRowHighlight: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    borderWidth: 1.5,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  rankBox: {
    width: 28,
    alignItems: 'center',
    marginRight: 8,
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  rankNumberHighlight: {
    color: '#6366F1',
    fontWeight: '900',
  },
  medalText: {
    fontSize: 18,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  playerName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  playerNameHighlight: {
    fontWeight: '800',
    color: '#4338CA',
  },
  playerScore: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  playerScoreHighlight: {
    color: '#4338CA',
    fontWeight: '800',
  },
});
