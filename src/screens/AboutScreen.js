import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  StatusBar,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { QuizMasterLogo } from '../components/illustrations';

export default function AboutScreen({ navigation }) {
  const handleOpenLink = (url) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </Pressable>
          <Text style={styles.headerTitle}>Biz haqimizda</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo and Version */}
          <View style={styles.logoSection}>
            <QuizMasterLogo size={90} glowing={true} />
            <Text style={styles.appTitle}>Quiz Master</Text>
            <Text style={styles.versionText}>v1.0.0</Text>
          </View>

          {/* Description */}
          <Text style={styles.descriptionText}>
            Quiz Master — bu bilimi o'yin tarzida sinab ko'rish va yangi bilimlar olish uchun mo'ljallangan ilova. Savollar, bellashuvlar va do'stlaringiz bilan birga o'rganing!
          </Text>

          {/* Contact Box */}
          <View style={styles.contactCard}>
            <Pressable
              style={styles.contactRow}
              onPress={() => handleOpenLink('mailto:support@quizmaster.uz')}
            >
              <View style={styles.contactIconCircle}>
                <Ionicons name="mail" size={18} color="#6366F1" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Biz bilan bog'lanish</Text>
                <Text style={styles.contactValue}>support@quizmaster.uz</Text>
              </View>
            </Pressable>

            <View style={styles.contactDivider} />

            <Pressable
              style={styles.contactRow}
              onPress={() => handleOpenLink('https://www.quizmaster.uz')}
            >
              <View style={styles.contactIconCircle}>
                <Ionicons name="globe" size={18} color="#6366F1" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Sayt</Text>
                <Text style={styles.contactValue}>www.quizmaster.uz</Text>
              </View>
            </Pressable>
          </View>

          {/* Social Icons Row */}
          <View style={styles.socialRow}>
            {/* Telegram */}
            <Pressable
              style={[styles.socialBtn, { backgroundColor: '#229ED9' }]}
              onPress={() => handleOpenLink('https://t.me/quizmaster')}
            >
              <FontAwesome5 name="telegram-plane" size={20} color="#FFFFFF" />
            </Pressable>

            {/* Instagram */}
            <Pressable
              onPress={() => handleOpenLink('https://instagram.com/quizmaster')}
            >
              <LinearGradient
                colors={['#833AB4', '#FD1D1D', '#FCB045']}
                style={styles.socialBtn}
              >
                <Ionicons name="logo-instagram" size={22} color="#FFFFFF" />
              </LinearGradient>
            </Pressable>

            {/* YouTube */}
            <Pressable
              style={[styles.socialBtn, { backgroundColor: '#FF0000' }]}
              onPress={() => handleOpenLink('https://youtube.com/@quizmaster')}
            >
              <Ionicons name="logo-youtube" size={22} color="#FFFFFF" />
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerPlaceholder: {
    width: 36,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 36,
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 16,
  },
  versionText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  contactCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 28,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  contactIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 2,
  },
  contactDivider: {
    height: 1,
    backgroundColor: '#F8FAFC',
    marginVertical: 4,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
