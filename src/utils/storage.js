import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@quizmaster_history_v1';

/**
 * Save a completed quiz result to AsyncStorage
 * @param {Object} resultData - { category, categoryId, score, totalQuestions, percentage, correctAnswers, wrongAnswers, date, userId, difficulty }
 */
export const saveQuizResult = async (resultData) => {
  try {
    const existingHistoryJson = await AsyncStorage.getItem(STORAGE_KEY);
    const existingHistory = existingHistoryJson ? JSON.parse(existingHistoryJson) : [];

    const newResult = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      timestamp: Date.now(),
      ...resultData,
    };

    // Prepend new result (newest first)
    const updatedHistory = [newResult, ...existingHistory];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    return true;
  } catch (error) {
    console.error('Failed to save quiz result to AsyncStorage:', error);
    return false;
  }
};

/**
 * Get past quiz results from AsyncStorage, optionally filtered by user
 * @param {string} [userId]
 * @returns {Array} List of past quiz results
 */
export const getQuizHistory = async (userId) => {
  try {
    const historyJson = await AsyncStorage.getItem(STORAGE_KEY);
    if (!historyJson) return [];
    const history = JSON.parse(historyJson);
    if (!Array.isArray(history)) return [];

    if (userId) {
      return history.filter((item) => !item.userId || item.userId === userId);
    }
    return history;
  } catch (error) {
    console.error('Failed to retrieve quiz history:', error);
    return [];
  }
};

/**
 * Clear all quiz history from AsyncStorage
 */
export const clearQuizHistory = async (userId) => {
  try {
    if (!userId) {
      await AsyncStorage.removeItem(STORAGE_KEY);
      return true;
    }
    // Only remove history for this specific user
    const existingHistoryJson = await AsyncStorage.getItem(STORAGE_KEY);
    if (existingHistoryJson) {
      const history = JSON.parse(existingHistoryJson);
      const remaining = history.filter((item) => item.userId && item.userId !== userId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
    }
    return true;
  } catch (error) {
    console.error('Failed to clear quiz history:', error);
    return false;
  }
};
