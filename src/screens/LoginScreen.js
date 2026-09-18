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
  Modal,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { QuizMasterLogo } from '../components/illustrations';
import FloatingBubbles from '../components/FloatingBubbles';
import { playSound } from '../utils/audio';
import { supabase } from '../services/supabase';

export default function LoginScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { login, register } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState(route?.params?.tab || 'login');
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (route?.params?.tab) {
      setActiveTab(route.params.tab);
    }
  }, [route?.params?.tab]);

  const handleSubmit = async () => {
    playSound('click');
    if (!identifier.trim() || !password.trim()) {
      Alert.alert('Xatolik', 'Iltimos, telefon raqami / email va parolni kiriting.');
      return;
    }

    setLoading(true);
    if (activeTab === 'login') {
      const result = await login(identifier, password);
      setLoading(false);
      if (result.success) {
        playSound('correct');
        navigation.replace('Home');
      } else {
        playSound('wrong');
        Alert.alert('Kirishda xatolik', result.message || "Email yoki parol noto'g'ri.");
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
        playSound('correct');
        navigation.replace('Home');
      } else {
        playSound('wrong');
        Alert.alert("Ro'yxatdan o'tishda xatolik", result.message || 'Xatolik yuz berdi.');
      }
    }
  };

  const handleSendResetLink = async () => {
    playSound('click');
    if (!resetEmail.trim()) {
      Alert.alert('Xatolik', 'Iltimos, email manzilingizni kiriting.');
      return;
    }

    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim());
      if (error) {
        Alert.alert('Xatolik', error.message || 'Tiklash havolasini yuborishda xatolik yuz berdi.');
      } else {
        setResetSent(true);
        playSound('correct');
      }
    } catch (e) {
      Alert.alert('Xatolik', e.message || 'Xatolik yuz berdi.');
    } finally {
      setResetLoading(false);
    }
  };

  const topPadding = Math.max(insets.top, Platform.OS === 'android' ? 26 : 16) + 12;
  const bottomPadding = Math.max(insets.bottom, 20) + 24;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Background Animated Floating Bubbles */}
      <FloatingBubbles />

      {/* Top Header Bar with Safe Notch / Status Bar Spacing */}
      <View style={[styles.topNavBar, { paddingTop: topPadding }]}>
        <Pressable
          style={({ pressed }) => [
            styles.backHomeBtn,
            { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
            pressed && styles.btnPressed,
          ]}
          onPress={() => {
            playSound('click');
            navigation.navigate('Home');
          }}
        >
          <Ionicons name="arrow-back" size={18} color={theme.textPrimary} />
          <Text style={[styles.backHomeText, { color: theme.textPrimary }]}>Bosh sahifa</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.themeToggleBtn,
            { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
            pressed && styles.btnPressed,
          ]}
          onPress={() => {
            playSound('click');
            toggleTheme();
          }}
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
        <ScrollView
          contentContainerStyle={[styles.scrollContainer, { paddingBottom: bottomPadding }]}
          showsVerticalScrollIndicator={false}
        >
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
              onPress={() => {
                playSound('click');
                setActiveTab('login');
              }}
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
              onPress={() => {
                playSound('click');
                setActiveTab('register');
              }}
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

          {/* Form */}
          <View style={styles.form}>
            {activeTab === 'register' && (
              <View
                style={[
                  styles.inputWrapper,
                  { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={theme.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: theme.textPrimary }]}
                  placeholder="To'liq ismingiz"
                  placeholderTextColor={theme.textMuted}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View
              style={[
                styles.inputWrapper,
                { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
              ]}
            >
              <Ionicons
                name="mail-outline"
                size={20}
                color={theme.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Telefon raqami yoki email"
                placeholderTextColor={theme.textMuted}
                value={identifier}
                onChangeText={setIdentifier}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View
              style={[
                styles.inputWrapper,
                { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={theme.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Parol"
                placeholderTextColor={theme.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={theme.textSecondary}
                />
              </Pressable>
            </View>

            {/* Submit Button */}
            <Pressable
              onPress={handleSubmit}
              disabled={loading}
              style={({ pressed }) => [styles.submitBtnWrapper, pressed && styles.btnPressed]}
            >
              <LinearGradient
                colors={['#6366F1', '#4F46E5']}
                style={styles.submitButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>
                    {activeTab === 'login' ? 'Kirish' : "Ro'yxatdan o'tish"}
                  </Text>
                )}
              </LinearGradient>
            </Pressable>

            {/* Forgot password */}
            {activeTab === 'login' && (
              <Pressable
                onPress={() => {
                  playSound('click');
                  setResetSent(false);
                  setResetEmail(identifier.includes('@') ? identifier : '');
                  setShowForgotModal(true);
                }}
                style={styles.forgotBtn}
              >
                <Text style={styles.forgotText}>Parolni unutdingizmi?</Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Parolni unutdingizmi Modal */}
      <Modal
        visible={showForgotModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowForgotModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
            ]}
          >
            <View style={styles.modalHeader}>
              <View style={styles.modalIconBox}>
                <Ionicons name="key-outline" size={24} color="#6366F1" />
              </View>
              <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                Parolni tiklash
              </Text>
              <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
                Ro'yxatdan o'tgan emailingizni kiriting. Sizga parolni yangilash havolasi yuboriladi.
              </Text>
            </View>

            {resetSent ? (
              <View style={styles.resetSuccessBox}>
                <Ionicons name="checkmark-circle" size={44} color="#10B981" />
                <Text style={[styles.resetSuccessText, { color: theme.textPrimary }]}>
                  Havola yuborildi!
                </Text>
                <Text style={[styles.resetSuccessSubtext, { color: theme.textSecondary }]}>
                  Email pochtangizni tekshiring va havolaga bosing.
                </Text>
                <Pressable
                  style={[styles.modalCloseBtn, { backgroundColor: '#6366F1' }]}
                  onPress={() => {
                    playSound('click');
                    setShowForgotModal(false);
                  }}
                >
                  <Text style={styles.modalCloseBtnText}>Tushunarli</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.modalBody}>
                <View
                  style={[
                    styles.inputWrapper,
                    { backgroundColor: isDark ? '#1E293B' : '#F8FAFC', borderColor: theme.cardBorder },
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={theme.textSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: theme.textPrimary }]}
                    placeholder="namuna@domain.uz"
                    placeholderTextColor={theme.textMuted}
                    value={resetEmail}
                    onChangeText={setResetEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.modalActions}>
                  <Pressable
                    style={[styles.modalCancelBtn, { borderColor: theme.cardBorder }]}
                    onPress={() => {
                      playSound('click');
                      setShowForgotModal(false);
                    }}
                  >
                    <Text style={[styles.modalCancelText, { color: theme.textSecondary }]}>
                      Bekor qilish
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[styles.modalConfirmBtn, { opacity: resetLoading ? 0.7 : 1 }]}
                    disabled={resetLoading}
                    onPress={handleSendResetLink}
                  >
                    {resetLoading ? (
                      <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                      <Text style={styles.modalConfirmText}>Yuborish</Text>
                    )}
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
    paddingBottom: 8,
    zIndex: 10,
  },
  backHomeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
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
    width: 38,
    height: 38,
    borderRadius: 19,
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
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginTop: 14,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
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
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabButtonTextActive: {
    fontWeight: '700',
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
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
  },
  eyeIcon: {
    padding: 4,
  },
  submitBtnWrapper: {
    width: '100%',
    marginTop: 8,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  btnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  forgotBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 6,
  },
  forgotText: {
    color: '#6366F1',
    fontSize: 13,
    fontWeight: '600',
  },

  // Modal styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  modalBody: {
    width: '100%',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalConfirmBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: '#6366F1',
    alignItems: 'center',
  },
  modalConfirmText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  resetSuccessBox: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  resetSuccessText: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
  },
  resetSuccessSubtext: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  modalCloseBtn: {
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 18,
  },
  modalCloseBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
