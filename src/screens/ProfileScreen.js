import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import BottomTabBar from '../components/BottomTabBar';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  const userName = user?.name || 'Foydalanuvchi';
  const userEmail = user?.email || '';

  const menuItems = [
    {
      id: 'results',
      title: 'Mening natijalarim',
      icon: 'trophy-outline',
      onPress: () => navigation.navigate('History'),
    },
    {
      id: 'friends',
      title: "Do'stlarim",
      icon: 'people-outline',
      onPress: () => navigation.navigate('Leaderboard'),
    },
    {
      id: 'settings',
      title: 'Sozlamalar',
      icon: 'settings-outline',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: 'help',
      title: 'Yordam',
      icon: 'help-circle-outline',
      onPress: () => navigation.navigate('About'),
    },
    {
      id: 'logout',
      title: 'Hisobdan chiqish',
      icon: 'log-out-outline',
      iconColor: '#EF4444',
      titleColor: '#EF4444',
      onPress: () => {
        logout();
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      },
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.container}>
        {/* Top Header with Settings Gear Icon */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil</Text>
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            style={styles.settingsBtn}
          >
            <Ionicons name="settings-outline" size={24} color="#0F172A" />
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
                colors={['#818CF8', '#6366F1']}
                style={styles.avatarCircle}
              >
                <Ionicons name="person" size={48} color="#FFFFFF" />
              </LinearGradient>
            </View>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>

          {/* 3 Stats Row */}
          <View style={styles.statsRow}>
            {/* 1. O'yinlar */}
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>O'yinlar</Text>
            </View>

            {/* 2. G'alabalar */}
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>G'alabalar</Text>
            </View>

            {/* 3. Umumiy ball */}
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>245</Text>
              <Text style={styles.statLabel}>Umumiy ball</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.menuItem,
                  index < menuItems.length - 1 && styles.menuItemBorder,
                  pressed && styles.menuItemPressed,
                ]}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIconCircle, item.iconColor && { backgroundColor: '#FEE2E2' }]}>
                    <Ionicons name={item.icon} size={20} color={item.iconColor || '#6366F1'} />
                  </View>
                  <Text style={[styles.menuItemTitle, item.titleColor && { color: item.titleColor }]}>
                    {item.title}
                  </Text>
                </View>

                <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <BottomTabBar activeTab="profile" navigation={navigation} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
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
    marginVertical: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  userEmail: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    marginVertical: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
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
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '500',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
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
    borderBottomColor: '#F8FAFC',
  },
  menuItemPressed: {
    backgroundColor: '#F8FAFC',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
});
