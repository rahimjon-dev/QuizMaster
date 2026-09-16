import React, { useState } from 'react';
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
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { QuizMasterLogo } from '../components/illustrations';

export default function LoginScreen({ navigation }) {
  const { login, register } = useAuth();

  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('Xusniddin Baxromjonov');
  const [identifier, setIdentifier] = useState('xusniddin@example.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!identifier.trim() || !password.trim()) {
      Alert.alert('Xatolik', 'Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    setLoading(true);
    if (activeTab === 'login') {
      const result = await login(identifier, password);
      setLoading(false);
      if (!result.success) {
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
      if (!result.success) {
        Alert.alert('Ro\'yxatdan o\'tishda xatolik', result.message || 'Xatolik yuz berdi.');
      }
    }
  };

  const handleSocialLogin = (platform) => {
    // Quick demo login
    setName('Xusniddin Baxromjonov');
    setIdentifier('xusniddin@example.com');
    login('xusniddin@example.com', '123456');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Top Logo and Header */}
          <View style={styles.header}>
            <QuizMasterLogo size={74} glowing={false} />
            <Text style={styles.title}>Quiz Master</Text>
            <Text style={styles.subtitle}>
              Hisobingizga kiring yoki yangi hisob oching
            </Text>
          </View>

          {/* Tab Switcher: Kirish | Ro'yxatdan o'tish */}
          <View style={styles.tabContainer}>
            <Pressable
              style={[styles.tabButton, activeTab === 'login' && styles.tabButtonActive]}
              onPress={() => setActiveTab('login')}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === 'login' && styles.tabButtonTextActive,
                ]}
              >
                Kirish
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tabButton, activeTab === 'register' && styles.tabButtonActive]}
              onPress={() => setActiveTab('register')}
            >
              <Text
                style={[
                  styles.tabButtonText,
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
                    ? 'Tekshirilmoqda...'
                    : activeTab === 'login'
                    ? 'Kirish'
                    : "Ro'yxatdan o'tish"}
                </Text>
              </LinearGradient>
            </Pressable>

            {/* Divider "Yoki" */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Yoki</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Logins */}
            <View style={styles.socialRow}>
              {/* Google */}
              <Pressable
                style={styles.socialBtn}
                onPress={() => handleSocialLogin('Google')}
              >
                <FontAwesome5 name="google" size={18} color="#EA4335" />
              </Pressable>

              {/* Apple */}
              <Pressable
                style={styles.socialBtn}
                onPress={() => handleSocialLogin('Apple')}
              >
                <Ionicons name="logo-apple" size={22} color="#000000" />
              </Pressable>

              {/* Telegram */}
              <Pressable
                style={styles.socialBtn}
                onPress={() => handleSocialLogin('Telegram')}
              >
                <FontAwesome5 name="telegram-plane" size={20} color="#229ED9" />
              </Pressable>
            </View>

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
    backgroundColor: '#F8FAFC',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 36,
    alignItems: 'center',
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
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
    marginBottom: 20,
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
