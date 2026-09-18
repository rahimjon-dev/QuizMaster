import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { QuizMasterLogo } from '../components/illustrations';
import FloatingBubbles from '../components/FloatingBubbles';

export default function LoginScreen({ route, navigation }) {
  const { login, register } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState(route?.params?.tab || 'login');
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route?.params?.tab) {
      setActiveTab(route.params.tab);
    }
  }, [route?.params?.tab]);

  const handleSubmit = async () => {
    if (!identifier.trim() || !password.trim()) {
      Alert.alert('Xatolik', 'Iltimos, telefon raqami / email va parolni kiriting.');
      return;
    }

    setLoading(true);
    if (activeTab === 'login') {
      const result = await login(identifier, password);
      setLoading(false);
      if (result.success) {
        navigation.replace('Home');
      } else {
        Alert.alert('Kirishda xatolik', result.message || 'Email yoki parol noto\'g\'ri.');
      }
    } else {
      if (!name.trim()) {
        Alert.alert('Xatolik', 'Iltimos, ismingizni kiriting');
        setLoading(false);
        return;
      }
      const result = await register(name, identifier, password);
      setLoading(false);
      if (result.success) {
        navigation.replace('Home');
      } else {
        Alert.alert('Ro\'yxatdan o\'tishda xatolik', result.message || 'Xatolik yuz berdi.');
      }
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    const res = await login('demo@quizmaster.uz', '123456');
    setLoading(false);
    if (res.success) {
      navigation.replace('Home');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Background Animated Floating Bubbles */}
      <FloatingBubbles />

      {/* Top Header Bar */}
      <View style={styles.topNavBar}>
        <Pressable
          style={[styles.backHomeBtn, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back" size={18} color={theme.textPrimary} />
          <Text style={[styles.backHomeText, { color: theme.textPrimary }]}>Bosh sahifa</Text>
        </Pressable>

        <Pressable
          style={[styles.themeToggleBtn, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}
          onPress={toggleTheme}
        >
          <Ionicons
            name={isDark ? 'sunny' : 'moon'}
            size={18}
            color={isDark ? '#FBBF24' : '#6366F1'}
          />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Top Logo and Header */}
          <View style={styles.header}>
            <QuizMasterLogo size={74} glowing={false} />
            <Text style={[styles.title, { color: theme.textPrimary }]}>Quiz Master</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Hisobingizga kiring yoki yangi hisob oching
            </Text>
          </View>

          {/* Tab Switcher: Kirish | Ro'yxatdan o'tish */}
          <View style={[styles.tabContainer, { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' }]}>
            <Pressable
              style={[
                styles.tabButton,
                activeTab === 'login' && [styles.tabButtonActive, { backgroundColor: theme.cardBg }],
              ]}
              onPress={() => setActiveTab('login')}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  { color: activeTab === 'login' ? theme.accent : theme.textSecondary },
                  activeTab === 'login' && styles.tabButtonTextActive,
                ]}
              >
                Kirish
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.tabButton,
                activeTab === 'register' && [styles.tabButtonActive, { backgroundColor: theme.cardBg }],
              ]}
              onPress={() => setActiveTab('register')}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  { color: activeTab === 'register' ? theme.accent : theme.textSecondary },
                  activeTab === 'register' && styles.tabButtonTextActive,
                ]}
              >
                Ro'yxatdan o'tish
              </Text>
            </Pressable>
          </View>

          {/* Form Inputs */}
          <View style={styles.form}>
            {activeTab === 'register' && (
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Ism va familiya"
                  placeholderTextColor="#94A3B8"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Telefon raqami yoki email"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={identifier}
                onChangeText={setIdentifier}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingRight: 40 }]}
                placeholder="Parol"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#94A3B8"
                />
              </Pressable>
            </View>

            {/* Submit Button */}
            <Pressable
              onPress={handleSubmit}
              disabled={loading}
              style={({ pressed }) => [pressed && styles.btnPressed]}
            >
              <LinearGradient
                colors={['#6366F1', '#4F46E5']}
                style={styles.submitButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.submitButtonText}>
                  {loading
                    ? 'Bajarilmoqda...'
                    : activeTab === 'login'
                    ? 'Kirish'
                    : "Ro'yxatdan o'tish"}
                </Text>
              </LinearGradient>
            </Pressable>

            {/* Quick Demo Login Option */}
            <Pressable
              onPress={handleDemoLogin}
              style={[
                styles.demoButton,
                { backgroundColor: isDark ? '#1E293B' : '#EEF2FF', borderColor: '#818CF8' },
              ]}
            >
              <Text style={styles.demoButtonText}>⚡ Tezkor sinov (Demo kirish)</Text>
            </Pressable>

            {/* Forgot password */}
            {activeTab === 'login' && (
              <Pressable
                onPress={() =>
                  Alert.alert(
                    'Parolni tiklash',
                    'Parolni tiklash havolasi emailingizga yuborildi.'
                  )
                }
                style={styles.forgotBtn}
              >
                <Text style={styles.forgotText}>Parolni unutdingizmi?</Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6,
    zIndex: 10,
  },
  backHomeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  backHomeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  themeToggleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 36,
    alignItems: 'center',
  },
  demoButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  demoButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6366F1',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E1B4B',
    marginTop: 14,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 6,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 24,
    padding: 4,
    width: '100%',
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  tabButtonActive: {
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 24,
    paddingHorizontal: 16,
    marginBottom: 14,
    height: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
  },
  eyeIcon: {
    padding: 4,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  btnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  forgotBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  forgotText: {
    color: '#6366F1',
    fontSize: 13,
    fontWeight: '600',
  },
});
