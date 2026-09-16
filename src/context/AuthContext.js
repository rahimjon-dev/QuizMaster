import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateToken, verifyToken } from '../utils/jwt';

const USERS_DB_KEY = '@quizmaster_users_db_v1';
const AUTH_TOKEN_KEY = '@quizmaster_jwt_token';
const CURRENT_USER_KEY = '@quizmaster_current_user';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bootstrapAuth();
  }, []);

  // Restore authenticated session on app launch
  const bootstrapAuth = async () => {
    try {
      const savedToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      const savedUserJson = await AsyncStorage.getItem(CURRENT_USER_KEY);

      if (savedToken && savedUserJson) {
        const payload = verifyToken(savedToken);
        if (payload) {
          setToken(savedToken);
          setUser(JSON.parse(savedUserJson));
        } else {
          // Token expired or invalid
          await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, CURRENT_USER_KEY]);
        }
      }
    } catch (e) {
      console.error('Failed to restore auth session:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Register new user
  const register = async (name, email, password) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const usersJson = await AsyncStorage.getItem(USERS_DB_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];

      // Check if email already registered
      if (users.some((u) => u.email === normalizedEmail)) {
        return { success: false, message: 'This email is already registered.' };
      }

      const newUser = {
        id: `user_${Date.now()}`,
        name: name.trim(),
        email: normalizedEmail,
        password, // In real backend this would be salted & hashed
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        stats: {
          quizzesPlayed: 0,
          totalScore: 0,
          totalQuestions: 0,
          highestScore: 0,
          winRate: 0,
        },
      };

      // Generate JWT Token
      const jwtToken = generateToken(newUser);

      // Save to local users DB
      users.push(newUser);
      await AsyncStorage.setItem(USERS_DB_KEY, JSON.stringify(users));

      // Save active session
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, jwtToken);
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

      setUser(newUser);
      setToken(jwtToken);
      return { success: true };
    } catch (e) {
      console.error('Registration failed:', e);
      return { success: false, message: 'Failed to create account. Please try again.' };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const usersJson = await AsyncStorage.getItem(USERS_DB_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];

      const foundUser = users.find(
        (u) => u.email === normalizedEmail && u.password === password
      );

      if (!foundUser) {
        return { success: false, message: 'Invalid email or password.' };
      }

      // Generate fresh JWT Token
      const jwtToken = generateToken(foundUser);

      await AsyncStorage.setItem(AUTH_TOKEN_KEY, jwtToken);
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));

      setUser(foundUser);
      setToken(jwtToken);
      return { success: true };
    } catch (e) {
      console.error('Login error:', e);
      return { success: false, message: 'Login failed. Please check your credentials.' };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, CURRENT_USER_KEY]);
      setUser(null);
      setToken(null);
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  // Update user statistics when a quiz is completed
  const updateUserStats = async (score, totalQuestions, percentage) => {
    if (!user) return;

    try {
      const currentStats = user.stats || {
        quizzesPlayed: 0,
        totalScore: 0,
        totalQuestions: 0,
        highestScore: 0,
        winRate: 0,
      };

      const newPlayed = currentStats.quizzesPlayed + 1;
      const newTotalScore = currentStats.totalScore + score;
      const newTotalQuestions = currentStats.totalQuestions + totalQuestions;
      const newHighest = Math.max(currentStats.highestScore, score);
      const newWinRate = Math.round((newTotalScore / newTotalQuestions) * 100);

      const updatedUser = {
        ...user,
        stats: {
          quizzesPlayed: newPlayed,
          totalScore: newTotalScore,
          totalQuestions: newTotalQuestions,
          highestScore: newHighest,
          winRate: newWinRate,
        },
      };

      // Update in users DB
      const usersJson = await AsyncStorage.getItem(USERS_DB_KEY);
      if (usersJson) {
        const users = JSON.parse(usersJson);
        const index = users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          users[index] = updatedUser;
          await AsyncStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
        }
      }

      // Update session
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (e) {
      console.error('Failed to update user stats:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        updateUserStats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
