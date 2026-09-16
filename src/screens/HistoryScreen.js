import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { getQuizHistory, clearQuizHistory } from '../utils/storage';
import PrimaryButton from '../components/PrimaryButton';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function HistoryScreen({ navigation }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, [user]);

  const loadHistory = async () => {
    setLoading(true);
    const data = await getQuizHistory(user?.id);
    setHistory(data);
    setLoading(false);
  };

  const handleClear = () => {
    Alert.alert(
      t('alertClearTitle'),
      t('alertClearMsg'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('clearAll'),
          style: 'destructive',
          onPress: async () => {
            await clearQuizHistory(user?.id);
            setHistory([]);
          },
        },
      ]
    );
  };

  const getPercentageColor = (pct) => {
    if (pct >= 80) return '#10B981';
    if (pct >= 50) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('quizHistory')}</Text>
          {history.length > 0 && (
            <Pressable
              style={({ pressed }) => [
                styles.clearBtn,
                pressed && styles.clearBtnPressed,
              ]}
              onPress={handleClear}
            >
              <Text style={styles.clearBtnText}>{t('clearAll')}</Text>
            </Pressable>
          )}
        </View>

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#38BDF8" />
            <Text style={styles.loadingText}>...</Text>
          </View>
        ) : history.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📊</Text>
            <Text style={styles.emptyTitle}>{t('noHistory')}</Text>
            <Text style={styles.emptySubtitle}>
              {t('noHistoryDesc')}
            </Text>
            <PrimaryButton
              title={t('startQuiz')}
              onPress={() => navigation.navigate('Home')}
              style={styles.emptyBtn}
            />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.listContainer}>
            {history.map((item) => {
              const color = getPercentageColor(item.percentage || 0);

              return (
                <View key={item.id} style={styles.historyCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.categoryTitle}>
                      {item.category || 'General Quiz'}
                    </Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>

                  <View style={styles.cardBody}>
                    <View style={styles.scoreGroup}>
                      <Text style={styles.scoreText}>
                        {item.score} / {item.totalQuestions || 15}
                      </Text>
                      <Text style={styles.breakdownText}>
                        ✓ {item.correctAnswers || item.score} Correct  •  ✕{' '}
                        {item.wrongAnswers || 15 - item.score} Wrong
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.badge,
                        { backgroundColor: color + '22' },
                      ]}
                    >
                      <Text style={[styles.badgePercentage, { color }]}>
                        {item.percentage}%
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  clearBtn: {
    backgroundColor: '#7F1D1D22',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EF444444',
  },
  clearBtnPressed: {
    opacity: 0.8,
  },
  clearBtnText: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '700',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#94A3B8',
    marginTop: 12,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 54,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyBtn: {
    minWidth: 200,
  },
  listContainer: {
    paddingBottom: 30,
  },
  historyCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  dateText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreGroup: {
    flex: 1,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#38BDF8',
    marginBottom: 2,
  },
  breakdownText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgePercentage: {
    fontSize: 16,
    fontWeight: '800',
  },
});
