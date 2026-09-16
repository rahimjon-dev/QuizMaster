import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Switch,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomTabBar from '../components/BottomTabBar';

export default function SettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundsEnabled, setSoundsEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 16 : 8) + 8 }]}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </Pressable>
          <Text style={styles.headerTitle}>Sozlamalar</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {/* 1. Profil ma'lumotlari */}
            <Pressable
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
              onPress={() => navigation.navigate('Profile')}
            >
              <View style={styles.itemLeft}>
                <Ionicons name="person-outline" size={20} color="#6366F1" style={styles.icon} />
                <Text style={styles.itemTitle}>Profil ma'lumotlari</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
            </Pressable>

            {/* 2. Bildirishnomalar (Switch) */}
            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <Ionicons name="notifications-outline" size={20} color="#6366F1" style={styles.icon} />
                <Text style={styles.itemTitle}>Bildirishnomalar</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#CBD5E1', true: '#818CF8' }}
                thumbColor={notificationsEnabled ? '#6366F1' : '#F1F5F9'}
              />
            </View>

            {/* 3. Tovushlar (Switch) */}
            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <Ionicons name="volume-high-outline" size={20} color="#6366F1" style={styles.icon} />
                <Text style={styles.itemTitle}>Tovushlar</Text>
              </View>
              <Switch
                value={soundsEnabled}
                onValueChange={setSoundsEnabled}
                trackColor={{ false: '#CBD5E1', true: '#818CF8' }}
                thumbColor={soundsEnabled ? '#6366F1' : '#F1F5F9'}
              />
            </View>

            {/* 4. Til */}
            <Pressable
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
              onPress={() => Alert.alert('Til', 'O\'zbek tili faollashtirilgan.')}
            >
              <View style={styles.itemLeft}>
                <Ionicons name="globe-outline" size={20} color="#6366F1" style={styles.icon} />
                <Text style={styles.itemTitle}>Til</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemValue}>O'zbek</Text>
                <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
              </View>
            </Pressable>

            {/* 5. Mavzu */}
            <Pressable
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
              onPress={() => Alert.alert('Mavzu', 'Mavzu rejimi yangilandi.')}
            >
              <View style={styles.itemLeft}>
                <Ionicons name="contrast-outline" size={20} color="#6366F1" style={styles.icon} />
                <Text style={styles.itemTitle}>Mavzu</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemValue}>Qorong'i</Text>
                <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
              </View>
            </Pressable>

            {/* 6. Ma'lumot */}
            <Pressable
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
              onPress={() => navigation.navigate('About')}
            >
              <View style={styles.itemLeft}>
                <Ionicons name="information-circle-outline" size={20} color="#6366F1" style={styles.icon} />
                <Text style={styles.itemTitle}>Ma'lumot</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
            </Pressable>

            {/* 7. Ilova haqida */}
            <Pressable
              style={({ pressed }) => [styles.item, styles.lastItem, pressed && styles.itemPressed]}
              onPress={() => navigation.navigate('About')}
            >
              <View style={styles.itemLeft}>
                <Ionicons name="phone-portrait-outline" size={20} color="#6366F1" style={styles.icon} />
                <Text style={styles.itemTitle}>Ilova haqida</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
            </Pressable>
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  card: {
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemPressed: {
    backgroundColor: '#F8FAFC',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 14,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  itemValue: {
    fontSize: 14,
    color: '#94A3B8',
  },
});
