import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  StatusBar,
  Platform,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import BottomTabBar from '../components/BottomTabBar';
import { getLeaderboardData } from '../services/leaderboard';
import { playSound } from '../utils/audio';
import FloatingBubbles from '../components/FloatingBubbles';

export default function LeaderboardScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState('umumiy'); // 'umumiy' | 'haftalik' | 'oylik'
  const [leaderboard, setLeaderboard] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    const data = await getLeaderboardData(activeTab, user);
    setLeaderboard(data);
  }, [activeTab, user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = async () => {
    setRefreshing(true);
    playSound('click');
    await loadData();
    setRefreshing(false);
  };

  const handleTabChange = (tabKey) => {
    playSound('click');
    setActiveTab(tabKey);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <View style={styles.container}>
        {/* Floating Bubbles in Leaderboard */}
        <FloatingBubbles />

        {/* Header */}
        <View
          style={[
            styles.header,
            { paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 16 : 8) + 8 },
          ]}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Reyting</Text>
              <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
                Real vaqtdagi peshqadamlar jadvali
              </Text>
            </View>
            <Pressable
              onPress={() => {
                playSound('toggle');
                toggleTheme();
              }}
              style={{ padding: 8 }}
              accessibilityLabel="Rejimni o'zgartirish"
            >
              <Ionicons
                name={isDark ? 'sunny' : 'moon'}
                size={22}
                color={isDark ? '#FBBF24' : '#6366F1'}
              />
            </Pressable>
          </View>
        </View>

        {/* Filter Tabs: Umumiy | Haftalik | Oylik */}
        <View
          style={[
            styles.tabsRow,
            {
              backgroundColor: isDark ? '#1E293B' : '#E2E8F0',
            },
          ]}
        >
          <Pressable
            style={[styles.tabBtn, activeTab === 'umumiy' && styles.tabBtnActive]}
            onPress={() => handleTabChange('umumiy')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'umumiy' ? '#FFFFFF' : theme.textSecondary },
                activeTab === 'umumiy' && styles.tabTextActive,
              ]}
            >
              Umumiy
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tabBtn, activeTab === 'haftalik' && styles.tabBtnActive]}
            onPress={() => handleTabChange('haftalik')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'haftalik' ? '#FFFFFF' : theme.textSecondary },
                activeTab === 'haftalik' && styles.tabTextActive,
              ]}
            >
              Haftalik
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tabBtn, activeTab === 'oylik' && styles.tabBtnActive]}
            onPress={() => handleTabChange('oylik')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'oylik' ? '#FFFFFF' : theme.textSecondary },
                activeTab === 'oylik' && styles.tabTextActive,
              ]}
            >
              Oylik
            </Text>
          </Pressable>
        </View>

        {/* Real-time Leaderboard List */}
        <ScrollView
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6366F1"
              colors={['#6366F1']}
            />
          }
        >
          {leaderboard.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="trophy-outline" size={48} color="#94A3B8" />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                Hozircha ishtirokchilar yo'q. Birinchi bo'lib viktorinani boshlang!
              </Text>
            </View>
          ) : (
            leaderboard.map((player) => {
              const isUser = player.isCurrentUser;
              const avatarEmoji = player.avatar && player.avatar !== '👤' ? player.avatar : null;
              const initial = (player.name || 'P').charAt(0).toUpperCase();

              return (
                <View
                  key={player.id || player.rank}
                  style={[
                    styles.playerRow,
                    {
                      backgroundColor: isUser
                        ? isDark
                          ? '#2E3856'
                          : '#EEF2FF'
                        : theme.cardBg,
                      borderColor: isUser
                        ? '#818CF8'
                        : theme.cardBorder,
                    },
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
                          { color: isUser ? '#6366F1' : theme.textSecondary },
                          isUser && styles.rankNumberHighlight,
                        ]}
                      >
                        {player.rank}
                      </Text>
                    )}
                  </View>

                  {/* Avatar */}
                  <LinearGradient
                    colors={player.avatarColor || ['#6366F1', '#8B5CF6']}
                    style={styles.avatarCircle}
                  >
                    {avatarEmoji ? (
                      <Text style={styles.avatarEmoji}>{avatarEmoji}</Text>
                    ) : (
                      <Text style={styles.avatarLetter}>{initial}</Text>
                    )}
                  </LinearGradient>

                  {/* Name and Current User Tag */}
                  <View style={styles.nameContainer}>
                    <Text
                      style={[
                        styles.playerName,
                        { color: theme.textPrimary },
                        isUser && styles.playerNameHighlight,
                      ]}
                      numberOfLines={1}
                    >
                      {player.name}
                    </Text>
                    {isUser && (
                      <View style={styles.youBadge}>
                        <Text style={styles.youBadgeText}>Siz</Text>
                      </View>
                    )}
                  </View>

                  {/* Score */}
                  <View style={styles.scoreContainer}>
                    <Text
                      style={[
                        styles.playerScore,
                        { color: isUser ? '#6366F1' : theme.textPrimary },
                        isUser && styles.playerScoreHighlight,
                      ]}
                    >
                      {player.score || 0}
                    </Text>
                    <Text style={[styles.scoreLabel, { color: theme.textMuted }]}>ball</Text>
                  </View>
                </View>
              );
            })
          )}
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
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 4,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  tabsRow: {
    flexDirection: 'row',
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 20,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  playerRowHighlight: {
    borderWidth: 1.5,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  rankBox: {
    width: 32,
    alignItems: 'center',
    marginRight: 6,
  },
  rankNumber: {
    fontSize: 15,
    fontWeight: '700',
  },
  rankNumberHighlight: {
    color: '#6366F1',
    fontWeight: '900',
  },
  medalText: {
    fontSize: 20,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarEmoji: {
    fontSize: 20,
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playerName: {
    fontSize: 15,
    fontWeight: '600',
  },
  playerNameHighlight: {
    fontWeight: '800',
    color: '#6366F1',
  },
  youBadge: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  youBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  playerScore: {
    fontSize: 16,
    fontWeight: '800',
  },
  playerScoreHighlight: {
    color: '#6366F1',
    fontWeight: '900',
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
});
