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

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match. Please re-enter.');
      return;
    }

    if (password.length < 4) {
      Alert.alert('Short Password', 'Password must be at least 4 characters long.');
      return;
    }

    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Registration Failed', result.message || 'Could not register.');
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
            <Text style={styles.title}>{t('register')}</Text>
            <Text style={styles.subtitle}>{t('registerSubtitle')}</Text>
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('name')}</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#64748B"
                value={name}
                onChangeText={setName}
              />
            </View>

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

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('confirmPassword')}</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#64748B"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <PrimaryButton
              title={loading ? 'Creating Account...' : t('register')}
              onPress={handleRegister}
              disabled={loading}
              style={styles.submitBtn}
            />
          </View>

          {/* Switch to Login */}
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>{t('alreadyHaveAccount')} </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.switchLink}>{t('login')}</Text>
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
    marginBottom: 20,
  },
  appBadge: {
    fontSize: 20,
    fontWeight: '800',
    color: '#38BDF8',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 6,
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
    marginBottom: 16,
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
    marginTop: 10,
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
