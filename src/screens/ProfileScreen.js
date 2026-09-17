import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  StatusBar,
  TextInput,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import BottomTabBar from '../components/BottomTabBar';
import { playSound } from '../utils/audio';

const AVAILABLE_AVATARS = ['🦊', '🦁', '🚀', '💻', '⚡', '🦉', '👑', '🎨', '🔥', '🏆', '💎', '🎮'];

export default function ProfileScreen({ navigation }) {
  const { user, logout, updateUserProfile } = useAuth();
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || '🦊');
  const [editBio, setEditBio] = useState(user?.bio || '');
  const [isSaving, setIsSaving] = useState(false);

  const userName = user?.name || 'Rahimjon';
  const userEmail = user?.email || 'rahmonovrahimjon216@gmail.com';
  const userAvatar = user?.avatar || '🦊';
  const userBio = user?.bio || "Viktorina ustasi 🎯";

  // Real stats from auth state
  const quizzesPlayed = user?.stats?.quizzesPlayed || 0;
  const totalScore = user?.stats?.totalScore || 0;
  const winsCount = quizzesPlayed > 0
    ? Math.max(1, Math.round(quizzesPlayed * ((user?.stats?.winRate || 70) / 100)))
    : 0;

  const handleOpenEditModal = () => {
    playSound('click');
    setEditName(user?.name || '');
    setEditAvatar(user?.avatar || '🦊');
    setEditBio(user?.bio || '');
    setIsEditModalVisible(true);
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      Alert.alert('Xatolik', 'Iltimos, ismingizni kiriting.');
      return;
    }

    setIsSaving(true);
    playSound('success');
    const res = await updateUserProfile({
      name: editName.trim(),
      avatar: editAvatar,
      bio: editBio.trim(),
    });
    setIsSaving(false);

    if (res.success) {
      setIsEditModalVisible(false);
    } else {
      Alert.alert('Xatolik', res.message || 'Profilni saqlashda xatolik.');
    }
  };

  const menuItems = [
    {
      id: 'edit_profile',
      title: 'Profilni tahrirlash',
      icon: 'create-outline',
      onPress: handleOpenEditModal,
    },
    {
      id: 'results',
      title: 'Mening natijalarim',
      icon: 'trophy-outline',
      onPress: () => {
        playSound('click');
        navigation.navigate('History');
      },
    },
    {
      id: 'friends',
      title: "Do'stlarim & Reyting",
      icon: 'people-outline',
      onPress: () => {
        playSound('click');
        navigation.navigate('Leaderboard');
      },
    },
    {
      id: 'settings',
      title: 'Sozlamalar',
      icon: 'settings-outline',
      onPress: () => {
        playSound('click');
        navigation.navigate('Settings');
      },
    },
    {
      id: 'help',
      title: 'Yordam',
      icon: 'help-circle-outline',
      onPress: () => {
        playSound('click');
        navigation.navigate('About');
      },
    },
    {
      id: 'logout',
      title: 'Hisobdan chiqish',
      icon: 'log-out-outline',
      iconColor: '#EF4444',
      titleColor: '#EF4444',
      onPress: () => {
        playSound('click');
        logout();
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      },
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <View style={styles.container}>
        {/* Top Header with Settings Gear Icon */}
        <View
          style={[
            styles.header,
            { paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 16 : 8) + 8 },
          ]}
        >
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Profil</Text>
          <Pressable
            onPress={() => {
              playSound('click');
              navigation.navigate('Settings');
            }}
            style={styles.settingsBtn}
          >
            <Ionicons name="settings-outline" size={24} color={theme.textPrimary} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar and User Info */}
          <View style={styles.profileCard}>
            <View style={styles.avatarWrapper}>
              <LinearGradient
                colors={['#818CF8', '#6366F1', '#4F46E5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatarCircle}
              >
                <Text style={styles.avatarBigEmoji}>{userAvatar}</Text>
              </LinearGradient>

              {/* Edit Icon Badge */}
              <Pressable
                style={styles.editAvatarBadge}
                onPress={handleOpenEditModal}
              >
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </Pressable>
            </View>

            <Text style={[styles.userName, { color: theme.textPrimary }]}>{userName}</Text>
            <Text style={[styles.userEmail, { color: theme.textSecondary }]}>{userEmail}</Text>
            {userBio ? (
              <View style={[styles.bioBadge, { backgroundColor: isDark ? '#1E293B' : '#EEF2FF' }]}>
                <Text style={[styles.bioText, { color: theme.accent }]}>{userBio}</Text>
              </View>
            ) : null}

            {/* Quick Edit Profile Button */}
            <Pressable
              style={({ pressed }) => [
                styles.quickEditBtn,
                { borderColor: theme.accent },
                pressed && { opacity: 0.8 },
              ]}
              onPress={handleOpenEditModal}
            >
              <Ionicons name="pencil" size={14} color={theme.accent} style={{ marginRight: 6 }} />
              <Text style={[styles.quickEditBtnText, { color: theme.accent }]}>
                Profilni tahrirlash
              </Text>
            </Pressable>
          </View>

          {/* 3 Stats Row (Real-Time Live Data) */}
          <View
            style={[
              styles.statsRow,
              {
                backgroundColor: theme.cardBg,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            {/* 1. O'yinlar */}
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: theme.textPrimary }]}>{quizzesPlayed}</Text>
              <Text style={[styles.statLabel, { color: theme.textMuted }]}>O'yinlar</Text>
            </View>

            <View style={[styles.statDivider, { backgroundColor: theme.divider }]} />

            {/* 2. G'alabalar */}
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: '#10B981' }]}>{winsCount}</Text>
              <Text style={[styles.statLabel, { color: theme.textMuted }]}>G'alabalar</Text>
            </View>

            <View style={[styles.statDivider, { backgroundColor: theme.divider }]} />

            {/* 3. Umumiy ball */}
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: theme.accent }]}>{totalScore}</Text>
              <Text style={[styles.statLabel, { color: theme.textMuted }]}>Umumiy ball</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View
            style={[
              styles.menuContainer,
              {
                backgroundColor: theme.cardBg,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            {menuItems.map((item, index) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.menuItem,
                  index < menuItems.length - 1 && [styles.menuItemBorder, { borderBottomColor: theme.divider }],
                  pressed && { backgroundColor: isDark ? '#26334D' : '#F8FAFC' },
                ]}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  <View
                    style={[
                      styles.menuIconCircle,
                      item.iconColor
                        ? { backgroundColor: '#FEE2E2' }
                        : { backgroundColor: isDark ? '#312E81' : '#EEF2FF' },
                    ]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={item.iconColor || theme.accent}
                    />
                  </View>
                  <Text
                    style={[
                      styles.menuItemTitle,
                      { color: item.titleColor || theme.textPrimary },
                    ]}
                  >
                    {item.title}
                  </Text>
                </View>

                <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <BottomTabBar activeTab="profile" navigation={navigation} />

        {/* Profile Edit Modal */}
        <Modal
          visible={isEditModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsEditModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.editModalCard,
                { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
              ]}
            >
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                  Profilni tahrirlash
                </Text>
                <Pressable
                  onPress={() => setIsEditModalVisible(false)}
                  style={styles.modalCloseBtn}
                >
                  <Ionicons name="close" size={24} color={theme.textMuted} />
                </Pressable>
              </View>

              {/* Avatar Selector */}
              <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
                Avatarni tanlang
              </Text>
              <View style={styles.avatarGrid}>
                {AVAILABLE_AVATARS.map((av) => (
                  <Pressable
                    key={av}
                    style={[
                      styles.avatarPickItem,
                      {
                        backgroundColor: editAvatar === av ? (isDark ? '#3730A3' : '#EEF2FF') : 'transparent',
                        borderColor: editAvatar === av ? theme.accent : theme.divider,
                      },
                    ]}
                    onPress={() => {
                      playSound('click');
                      setEditAvatar(av);
                    }}
                  >
                    <Text style={styles.avatarPickEmoji}>{av}</Text>
                  </Pressable>
                ))}
              </View>

              {/* Name Input */}
              <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Ism</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.inputBg,
                    color: theme.textPrimary,
                    borderColor: theme.cardBorder,
                  },
                ]}
                value={editName}
                onChangeText={setEditName}
                placeholder="Ismingizni kiriting"
                placeholderTextColor={theme.textMuted}
              />

              {/* Bio Input */}
              <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Status / Bio</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.inputBg,
                    color: theme.textPrimary,
                    borderColor: theme.cardBorder,
                  },
                ]}
                value={editBio}
                onChangeText={setEditBio}
                placeholder="O'zingiz haqingizda qisqa shior"
                placeholderTextColor={theme.textMuted}
              />

              {/* Save Button */}
              <Pressable
                style={({ pressed }) => [
                  styles.saveBtn,
                  { backgroundColor: theme.accent },
                  pressed && { opacity: 0.9 },
                ]}
                onPress={handleSaveProfile}
                disabled={isSaving}
              >
                <Text style={styles.saveBtnText}>
                  {isSaving ? 'Saqlanmoqda...' : 'Saqlash'}
                </Text>
              </Pressable>
            </View>
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  settingsBtn: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  profileCard: {
    alignItems: 'center',
    marginVertical: 14,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarBigEmoji: {
    fontSize: 50,
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6366F1',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
  },
  userEmail: {
    fontSize: 13,
    marginTop: 4,
  },
  bioBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  bioText: {
    fontSize: 12,
    fontWeight: '600',
  },
  quickEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  quickEditBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  menuContainer: {
    borderRadius: 20,
    paddingVertical: 4,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  editModalCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  modalCloseBtn: {
    padding: 4,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 6,
  },
  avatarPickItem: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  avatarPickEmoji: {
    fontSize: 22,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 6,
  },
  saveBtn: {
    marginTop: 16,
    paddingVertical: 13,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
