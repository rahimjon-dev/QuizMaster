import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Switch,
  StatusBar,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabBar from '../components/BottomTabBar';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import {
  playSound,
  isSoundEnabled,
  setSoundEnabled,
  isMusicEnabled,
  setMusicEnabled,
  stopMillionaireMusic,
} from '../utils/audio';

const NOTIFICATIONS_KEY = '@quizmaster_notifications_enabled';

export default function SettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark, toggleTheme } = useTheme();
  const { lang, changeLanguage } = useLanguage();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundsEnabledState, setSoundsEnabledState] = useState(true);
  const [musicEnabledState, setMusicEnabledState] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const soundVal = await isSoundEnabled();
      setSoundsEnabledState(soundVal);

      const musicVal = await isMusicEnabled();
      setMusicEnabledState(musicVal);

      const notifVal = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
      if (notifVal !== null) {
        setNotificationsEnabled(notifVal === 'true');
      }
    } catch (e) {
      console.error('Failed to load settings:', e);
    }
  };

  const handleToggleSounds = async (value) => {
    setSoundsEnabledState(value);
    await setSoundEnabled(value);
    if (value) {
      playSound('toggle');
    }
  };

  const handleToggleMusic = async (value) => {
    setMusicEnabledState(value);
    await setMusicEnabled(value);
    if (value) {
      playSound('toggle');
    } else {
      stopMillionaireMusic();
    }
  };

  const handleToggleNotifications = async (value) => {
    playSound('click');
    setNotificationsEnabled(value);
    try {
      await AsyncStorage.setItem(NOTIFICATIONS_KEY, value ? 'true' : 'false');
    } catch (e) {
      console.error('Failed to save notification preference:', e);
    }
  };

  const handleToggleTheme = () => {
    playSound('toggle');
    toggleTheme();
  };

  const getLanguageLabel = (code) => {
    switch (code) {
      case 'uz':
        return "O'zbek";
      case 'en':
        return 'English';
      case 'ru':
        return 'Русский';
      default:
        return "O'zbek";
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <View style={styles.container}>
        {/* Header */}
        <View
          style={[
            styles.header,
            { paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 16 : 8) + 8 },
          ]}
        >
          <Pressable
            onPress={() => {
              playSound('click');
              navigation.goBack();
            }}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color={theme.textPrimary} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Sozlamalar</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.cardBg,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            {/* 1. Profil ma'lumotlari */}
            <Pressable
              style={({ pressed }) => [
                styles.item,
                { borderBottomColor: theme.divider },
                pressed && { backgroundColor: isDark ? '#26334D' : '#F8FAFC' },
              ]}
              onPress={() => {
                playSound('click');
                navigation.navigate('Profile');
              }}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#EEF2FF' }]}>
                  <Ionicons name="person-outline" size={20} color="#6366F1" />
                </View>
                <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>
                  Profil ma'lumotlari
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
            </Pressable>

            {/* 2. Bildirishnomalar (Switch) */}
            <View style={[styles.item, { borderBottomColor: theme.divider }]}>
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
                  <Ionicons name="notifications-outline" size={20} color="#D97706" />
                </View>
                <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>
                  Bildirishnomalar
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleToggleNotifications}
                trackColor={{ false: '#CBD5E1', true: '#818CF8' }}
                thumbColor={notificationsEnabled ? '#6366F1' : '#F1F5F9'}
              />
            </View>

            {/* 3. Tovushlar (Switch) */}
            <View style={[styles.item, { borderBottomColor: theme.divider }]}>
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#D1FAE5' }]}>
                  <Ionicons name="volume-high-outline" size={20} color="#059669" />
                </View>
                <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>Tovushlar</Text>
              </View>
              <Switch
                value={soundsEnabledState}
                onValueChange={handleToggleSounds}
                trackColor={{ false: '#CBD5E1', true: '#818CF8' }}
                thumbColor={soundsEnabledState ? '#6366F1' : '#F1F5F9'}
              />
            </View>

            {/* 4. Fon musiqasi (Switch) */}
            <View style={[styles.item, { borderBottomColor: theme.divider }]}>
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#EDE9FE' }]}>
                  <Ionicons name="musical-notes-outline" size={20} color="#7C3AED" />
                </View>
                <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>Fon musiqasi</Text>
              </View>
              <Switch
                value={musicEnabledState}
                onValueChange={handleToggleMusic}
                trackColor={{ false: '#CBD5E1', true: '#818CF8' }}
                thumbColor={musicEnabledState ? '#6366F1' : '#F1F5F9'}
              />
            </View>

            {/* 4. Til (Language Picker) */}
            <Pressable
              style={({ pressed }) => [
                styles.item,
                { borderBottomColor: theme.divider },
                pressed && { backgroundColor: isDark ? '#26334D' : '#F8FAFC' },
              ]}
              onPress={() => {
                playSound('click');
                setShowLanguageModal(true);
              }}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#E0F2FE' }]}>
                  <Ionicons name="globe-outline" size={20} color="#0284C7" />
                </View>
                <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>Til</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={[styles.itemValue, { color: theme.accent }]}>
                  {getLanguageLabel(lang)}
                </Text>
                <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
              </View>
            </Pressable>

            {/* 5. Mavzu (Dark / Light Theme Toggle) */}
            <Pressable
              style={({ pressed }) => [
                styles.item,
                { borderBottomColor: theme.divider },
                pressed && { backgroundColor: isDark ? '#26334D' : '#F8FAFC' },
              ]}
              onPress={handleToggleTheme}
            >
              <View style={styles.itemLeft}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: isDark ? '#312E81' : '#FDF4FF' },
                  ]}
                >
                  <Ionicons
                    name={isDark ? 'moon' : 'sunny-outline'}
                    size={20}
                    color={isDark ? '#A5B4FC' : '#C026D3'}
                  />
                </View>
                <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>Mavzu</Text>
              </View>
              <View style={styles.itemRight}>
                <View
                  style={[
                    styles.themeBadge,
                    { backgroundColor: isDark ? '#3730A3' : '#EEF2FF' },
                  ]}
                >
                  <Text style={[styles.themeBadgeText, { color: isDark ? '#E0E7FF' : '#4F46E5' }]}>
                    {isDark ? "Qorong'i" : "Yorug'"}
                  </Text>
                </View>
                <Ionicons name="swap-horizontal" size={18} color={theme.textMuted} />
              </View>
            </Pressable>

            {/* 6. Ma'lumot */}
            <Pressable
              style={({ pressed }) => [
                styles.item,
                { borderBottomColor: theme.divider },
                pressed && { backgroundColor: isDark ? '#26334D' : '#F8FAFC' },
              ]}
              onPress={() => {
                playSound('click');
                setShowInfoModal(true);
              }}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#EDE9FE' }]}>
                  <Ionicons name="information-circle-outline" size={20} color="#7C3AED" />
                </View>
                <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>Ma'lumot</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
            </Pressable>

            {/* 7. Ilova haqida */}
            <Pressable
              style={({ pressed }) => [
                styles.item,
                styles.lastItem,
                pressed && { backgroundColor: isDark ? '#26334D' : '#F8FAFC' },
              ]}
              onPress={() => {
                playSound('click');
                navigation.navigate('About');
              }}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#FCE7F3' }]}>
                  <Ionicons name="phone-portrait-outline" size={20} color="#DB2777" />
                </View>
                <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>
                  Ilova haqida
                </Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={[styles.itemValue, { color: theme.textMuted }]}>v1.0.0</Text>
                <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
              </View>
            </Pressable>
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <BottomTabBar activeTab="profile" navigation={navigation} />

        {/* Language Selection Modal */}
        <Modal
          visible={showLanguageModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowLanguageModal(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowLanguageModal(false)}
          >
            <View
              style={[
                styles.modalCard,
                { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
              ]}
            >
              <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                Tilni tanlang
              </Text>

              {[
                { code: 'uz', name: "O'zbek tili", flag: '🇺🇿' },
                { code: 'en', name: 'English', flag: '🇬🇧' },
                { code: 'ru', name: 'Русский', flag: '🇷🇺' },
              ].map((item) => (
                <Pressable
                  key={item.code}
                  style={[
                    styles.langOption,
                    {
                      borderColor: lang === item.code ? theme.accent : theme.divider,
                      backgroundColor:
                        lang === item.code
                          ? isDark
                            ? '#2E3856'
                            : '#EEF2FF'
                          : 'transparent',
                    },
                  ]}
                  onPress={() => {
                    playSound('click');
                    changeLanguage(item.code);
                    setShowLanguageModal(false);
                  }}
                >
                  <Text style={styles.langFlag}>{item.flag}</Text>
                  <Text
                    style={[
                      styles.langName,
                      { color: theme.textPrimary },
                      lang === item.code && { color: theme.accent, fontWeight: '800' },
                    ]}
                  >
                    {item.name}
                  </Text>
                  {lang === item.code && (
                    <Ionicons name="checkmark-circle" size={20} color={theme.accent} />
                  )}
                </Pressable>
              ))}

              <Pressable
                style={[styles.closeModalBtn, { backgroundColor: theme.accent }]}
                onPress={() => setShowLanguageModal(false)}
              >
                <Text style={styles.closeModalBtnText}>Yopish</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>

        {/* Info Modal */}
        <Modal
          visible={showInfoModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowInfoModal(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowInfoModal(false)}
          >
            <View
              style={[
                styles.modalCard,
                { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
              ]}
            >
              <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                Ilova ma'lumotlari
              </Text>
              <Text style={[styles.infoDescription, { color: theme.textSecondary }]}>
                QuizMaster — O'zbekistondagi eng zamonaviy va interaktiv intellektual viktorina platformasi.
              </Text>
              <View style={[styles.infoItem, { borderBottomColor: theme.divider }]}>
                <Text style={[styles.infoItemLabel, { color: theme.textSecondary }]}>Platforma:</Text>
                <Text style={[styles.infoItemValue, { color: theme.textPrimary }]}>React Native / Web</Text>
              </View>
              <View style={[styles.infoItem, { borderBottomColor: theme.divider }]}>
                <Text style={[styles.infoItemLabel, { color: theme.textSecondary }]}>Versiya:</Text>
                <Text style={[styles.infoItemValue, { color: theme.textPrimary }]}>1.0.0 Production</Text>
              </View>
              <View style={[styles.infoItem, { borderBottomColor: theme.divider }]}>
                <Text style={[styles.infoItemLabel, { color: theme.textSecondary }]}>Backend & Auth:</Text>
                <Text style={[styles.infoItemValue, { color: theme.textPrimary }]}>Supabase Real-Time</Text>
              </View>

              <Pressable
                style={[styles.closeModalBtn, { backgroundColor: theme.accent, marginTop: 18 }]}
                onPress={() => setShowInfoModal(false)}
              >
                <Text style={styles.closeModalBtnText}>Tushundim</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
  },
  headerPlaceholder: {
    width: 36,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 20,
    paddingVertical: 4,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  themeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  themeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
  },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 10,
  },
  langFlag: {
    fontSize: 22,
    marginRight: 12,
  },
  langName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  closeModalBtn: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  closeModalBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  infoDescription: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  infoItemLabel: {
    fontSize: 13,
  },
  infoItemValue: {
    fontSize: 13,
    fontWeight: '700',
  },
});
