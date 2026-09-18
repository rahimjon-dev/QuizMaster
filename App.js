import React from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { LanguageProvider } from './src/context/LanguageContext';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import ErrorBoundary from './src/components/ErrorBoundary';

// Disable distracting warning popups on mobile screens
LogBox.ignoreAllLogs(true);

const linking = {
  prefixes: ['/', 'quizmaster://'],
  config: {
    screens: {
      Splash: 'splash',
      Onboarding: 'onboarding',
      Login: 'login',
      Register: 'register',
      Home: '',
      Categories: 'categories',
      Leaderboard: 'leaderboard',
      Profile: 'profile',
      Quiz: 'quiz',
      Result: 'result',
      Settings: 'settings',
      About: 'about',
      History: 'history',
    },
  },
};

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <NavigationContainer linking={linking}>
                <StatusBar style="auto" />
                <AppNavigator />
              </NavigationContainer>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
