import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@quizmaster_theme_mode';

export const lightTheme = {
  isDark: false,
  background: '#F8FAFC',
  cardBg: '#FFFFFF',
  cardBorder: '#F1F5F9',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  divider: '#E2E8F0',
  inputBg: '#F1F5F9',
  accent: '#6366F1',
  tabBarBg: '#FFFFFF',
  tabBarBorder: '#F1F5F9',
  statusBar: 'dark-content',
};

export const darkTheme = {
  isDark: true,
  background: '#0F172A',
  cardBg: '#1E293B',
  cardBorder: '#334155',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  divider: '#334155',
  inputBg: '#0F172A',
  accent: '#818CF8',
  tabBarBg: '#1E293B',
  tabBarBorder: '#334155',
  statusBar: 'light-content',
};

const ThemeContext = createContext({
  isDark: false,
  theme: lightTheme,
  toggleTheme: () => {},
  setThemeMode: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (e) {
      console.error('Failed to load theme preference:', e);
    }
  };

  const toggleTheme = async () => {
    try {
      const newMode = !isDark;
      setIsDark(newMode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode ? 'dark' : 'light');
    } catch (e) {
      console.error('Failed to save theme preference:', e);
    }
  };

  const setThemeMode = async (mode) => {
    const shouldBeDark = mode === 'dark';
    setIsDark(shouldBeDark);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, shouldBeDark ? 'dark' : 'light');
    } catch (e) {
      console.error('Failed to save theme preference:', e);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
