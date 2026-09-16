import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Pressable,
  Platform,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getQuizHistory } from '../utils/storage';
import PrimaryButton from '../components/PrimaryButton';

export default function ProfileScreen({ navigation }) {
  const { user, token, logout } = useAuth();
  const { t } = useLanguage();
  const [history, setHistory] = useState([]);
  const [showFullToken, setShowFullToken] = useState(false);

  useEffect(() => {
    loadUserHistory();
  }, []);

  const loadUserHistory = async () => {
    const allHistory = await getQuizHistory();
    // Filter history for current user if tagged, or show latest
    const userHistory = allHistory.filter(
      (h) => !h.userId || h.userId === user?.id
    );
    setHistory(userHistory.slice(0, 5)); // show latest 5
  };

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      t('confirmLogout'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('logout'),
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  const stats = user?.stats || {
    quizzesPlayed: 0,
    totalScore: 0,
    totalQuestions: 0,
    highestScore: 0,
    winRate: 0,
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'QM';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Card */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'QuizMaster Player'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <View style={styles.joinedBadge}>
            <Text style={styles.joinedText}>Member since {user?.createdAt || '2026'}</Text>
          </View>
        </View>

        {/* Player Statistics Grid */}
        <Text style={styles.sectionTitle}>📊 {t('stats')}</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{stats.quizzesPlayed}</Text>
            <Text style={styles.statLabel}>{t('quizzesPlayed')}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: '#F59E0B' }]}>
              {stats.highestScore}
            </Text>
            <Text style={styles.statLabel}>{t('bestScore')}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: '#10B981' }]}>
              {stats.winRate}%
            </Text>
            <Text style={styles.statLabel}>{t('accuracy')}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: '#EC4899' }]}>
              {stats.totalScore}
            </Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
        </View>

        {/* Personal JWT Token Panel */}
        <View style={styles.jwtCard}>
          <View style={styles.jwtHeader}>
            <Text style={styles.jwtTitle}>🔐 {t('tokenInfo')}</Text>
            <Pressable
              onPress={() => setShowFullToken(!showFullToken)}
              style={styles.toggleTokenBtn}
            >
              <Text style={styles.toggleTokenText}>
                {showFullToken ? 'Hide' : 'Inspect'}
              </Text>
            </Pressable>
          </View>
          <Text style={styles.jwtDescription}>
            Every logged-in user is authenticated with a cryptographic JWT session token:
          </Text>
          <View style={styles.tokenBox}>
            <Text style={styles.tokenCode} numberOfLines={showFullToken ? undefined : 2}>
              {token || 'No active JWT token found'}
            </Text>
          </View>
        </View>

        {/* Recent Performance Section */}
        {history.length > 0 && (
          <View style={styles.recentSection}>
            <View style={styles.recentHeader}>
              <Text style={styles.sectionTitle}>📜 Recent Quizzes</Text>
              <Pressable onPress={() => navigation.navigate('History')}>
                <Text style={styles.viewAllText}>View All →</Text>
              </Pressable>
            </View>

            {history.map((item) => (
              <View key={item.id} style={styles.miniHistoryCard}>
                <View>
                  <Text style={styles.miniCategory}>{item.category}</Text>
                  <Text style={styles.miniDate}>{item.date}</Text>
                </View>
                <View style={styles.miniScoreBadge}>
                  <Text style={styles.miniScoreText}>
                    {item.score} / {item.totalQuestions} ({item.percentage}%)
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Logout Button */}
        <PrimaryButton
          title={`🚪 ${t('logout')}`}
          variant="danger"
          onPress={handleLogout}
          style={styles.logoutBtn}
        />
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
    paddingBottom: 40,
  },
  profileHeaderCard: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 12,
  },
  joinedBadge: {
    backgroundColor: '#0F172A',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  joinedText: {
    fontSize: 12,
    color: '#38BDF8',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F1F5F9',
    marginBottom: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1E293B',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: '#38BDF8',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    textAlign: 'center',
  },
  jwtCard: {
    backgroundColor: '#1E1B4B',
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#4338CA',
  },
  jwtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jwtTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F59E0B',
  },
  toggleTokenBtn: {
    backgroundColor: '#0F172A',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  toggleTokenText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38BDF8',
  },
  jwtDescription: {
    fontSize: 12,
    color: '#CBD5E1',
    marginBottom: 10,
    lineHeight: 16,
  },
  tokenBox: {
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tokenCode: {
    fontSize: 11,
    color: '#38BDF8',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    lineHeight: 16,
  },
  recentSection: {
    marginBottom: 24,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#38BDF8',
  },
  miniHistoryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  miniCategory: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 2,
  },
  miniDate: {
    fontSize: 11,
    color: '#64748B',
  },
  miniScoreBadge: {
    backgroundColor: '#0F172A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  miniScoreText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10B981',
  },
  logoutBtn: {
    marginTop: 8,
  },
});
