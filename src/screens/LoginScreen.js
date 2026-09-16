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
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';
import PrimaryButton from '../components/PrimaryButton';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please enter your email and password.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Login Failed', result.message || 'Invalid email or password.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Top Bar with Language Selector */}
          <View style={styles.topBar}>
            <Text style={styles.appBadge}>🧠 QuizMaster</Text>
            <LanguageSelector />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{t('login')}</Text>
            <Text style={styles.subtitle}>{t('loginSubtitle')}</Text>
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('email')}</Text>
              <TextInput
                style={styles.input}
                placeholder="user@example.com"
                placeholderTextColor="#64748B"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('password')}</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#64748B"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <PrimaryButton
              title={loading ? 'Verifying...' : t('login')}
              onPress={handleLogin}
              disabled={loading}
              style={styles.submitBtn}
            />

            {/* Quick Demo Credentials Tip */}
            <View style={styles.demoBox}>
              <Text style={styles.demoText}>
                💡 Don't have an account? Tap below to create your free profile in 5 seconds!
              </Text>
            </View>
          </View>

          {/* Switch to Register */}
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>{t('dontHaveAccount')} </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.switchLink}>{t('register')}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    padding: 24,
    justifyContent: 'center',
    minHeight: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  appBadge: {
    fontSize: 20,
    fontWeight: '800',
    color: '#38BDF8',
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#CBD5E1',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#334155',
  },
  submitBtn: {
    marginTop: 8,
  },
  demoBox: {
    marginTop: 18,
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#38BDF833',
  },
  demoText: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  switchLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#38BDF8',
  },
});
