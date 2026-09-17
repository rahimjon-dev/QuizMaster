import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';

const LEADERBOARD_KEY = '@quizmaster_leaderboard_v2';
const USERS_DB_KEY = '@quizmaster_users_db_v1';

/**
 * Get real-time leaderboard entries composed of real registered players.
 * Eliminates static fake demo profiles and ensures current user is accurately ranked.
 * @param {'umumiy' | 'haftalik' | 'oylik'} period
 * @param {Object} currentUser
 * @returns {Promise<Array>}
 */
export const getLeaderboardData = async (period = 'umumiy', currentUser = null) => {
  try {
    // 1. Fetch registered users from local DB
    const usersJson = await AsyncStorage.getItem(USERS_DB_KEY);
    const localUsers = usersJson ? JSON.parse(usersJson) : [];

    // 2. Fetch any saved leaderboard records
    const lbJson = await AsyncStorage.getItem(LEADERBOARD_KEY);
    const lbRecords = lbJson ? JSON.parse(lbJson) : [];

    // 3. Map into a unique player registry by user ID or email
    const playerMap = new Map();

    // Add saved records
    lbRecords.forEach((rec) => {
      if (rec && rec.id) {
        playerMap.set(rec.id, rec);
      }
    });

    // Add local registered users
    localUsers.forEach((u) => {
      if (u && u.id) {
        const existing = playerMap.get(u.id) || {};
        playerMap.set(u.id, {
          id: u.id,
          name: u.name || 'Foydalanuvchi',
          score: u.stats?.totalScore || existing.score || 0,
          avatar: u.avatar || existing.avatar || '👤',
          avatarColor: existing.avatarColor || ['#818CF8', '#6366F1'],
          quizzesPlayed: u.stats?.quizzesPlayed || existing.quizzesPlayed || 0,
        });
      }
    });

    // 4. Always ensure current authenticated user is included with up-to-date score
    if (currentUser && currentUser.id) {
      const currentScore = currentUser.stats?.totalScore || 0;
      playerMap.set(currentUser.id, {
        id: currentUser.id,
        name: currentUser.name || 'Foydalanuvchi',
        score: currentScore,
        avatar: currentUser.avatar || '👤',
        avatarColor: ['#6366F1', '#4F46E5'],
        quizzesPlayed: currentUser.stats?.quizzesPlayed || 0,
        isCurrentUser: true,
      });
    }

    // Convert to array and sort descending by score
    let list = Array.from(playerMap.values());

    // Sort descending by score
    list.sort((a, b) => (b.score || 0) - (a.score || 0));

    // Assign dynamic ranks and medals
    list = list.map((item, index) => {
      const rank = index + 1;
      let medal = null;
      if (rank === 1) medal = '🥇';
      else if (rank === 2) medal = '🥈';
      else if (rank === 3) medal = '🥉';

      const isCurrent = currentUser && item.id === currentUser.id;

      return {
        ...item,
        rank,
        medal,
        isCurrentUser: isCurrent,
      };
    });

    return list;
  } catch (e) {
    console.error('Failed to get leaderboard data:', e);
    if (currentUser) {
      return [
        {
          id: currentUser.id || 'current_user',
          rank: 1,
          medal: '🥇',
          name: currentUser.name || 'Foydalanuvchi',
          score: currentUser.stats?.totalScore || 0,
          avatar: currentUser.avatar || '👤',
          avatarColor: ['#6366F1', '#4F46E5'],
          isCurrentUser: true,
        },
      ];
    }
    return [];
  }
};

/**
 * Sync user score and profile updates to the real-time leaderboard
 */
export const syncUserScoreToLeaderboard = async (user) => {
  if (!user || !user.id) return;
  try {
    const lbJson = await AsyncStorage.getItem(LEADERBOARD_KEY);
    const lbRecords = lbJson ? JSON.parse(lbJson) : [];

    const existingIndex = lbRecords.findIndex((r) => r.id === user.id);
    const updatedRecord = {
      id: user.id,
      name: user.name,
      score: user.stats?.totalScore || 0,
      avatar: user.avatar || '👤',
      avatarColor: ['#6366F1', '#4F46E5'],
      quizzesPlayed: user.stats?.quizzesPlayed || 0,
      updatedAt: Date.now(),
    };

    if (existingIndex >= 0) {
      lbRecords[existingIndex] = updatedRecord;
    } else {
      lbRecords.push(updatedRecord);
    }

    await AsyncStorage.setItem(LEADERBOARD_KEY, JSON.stringify(lbRecords));
  } catch (e) {
    console.error('Failed to sync user score to leaderboard:', e);
  }
};
