import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomTabBar({ activeTab = 'home', navigation }) {
  const tabs = [
    {
      id: 'home',
      name: 'Bosh sahifa',
      iconActive: 'home',
      iconInactive: 'home-outline',
      screen: 'Home',
    },
    {
      id: 'categories',
      name: 'Kategoriyalar',
      iconActive: 'grid',
      iconInactive: 'grid-outline',
      screen: 'Categories',
    },
    {
      id: 'leaderboard',
      name: 'Reyting',
      iconActive: 'podium',
      iconInactive: 'podium-outline',
      screen: 'Leaderboard',
    },
    {
      id: 'profile',
      name: 'Profil',
      iconActive: 'person',
      iconInactive: 'person-outline',
      screen: 'Profile',
    },
  ];

  const handlePress = (tab) => {
    if (activeTab !== tab.id && navigation) {
      navigation.navigate(tab.screen);
    }
  };

  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Pressable
            key={tab.id}
            style={styles.tabItem}
            onPress={() => handlePress(tab)}
          >
            <View style={[styles.iconWrapper, isActive && styles.iconActiveWrapper]}>
              <Ionicons
                name={isActive ? tab.iconActive : tab.iconInactive}
                size={22}
                color={isActive ? '#6366F1' : '#94A3B8'}
              />
            </View>
            <Text style={[styles.tabLabel, isActive ? styles.labelActive : styles.labelInactive]}>
              {tab.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 2,
  },
  iconWrapper: {
    width: 32,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconActiveWrapper: {
    transform: [{ scale: 1.05 }],
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  labelActive: {
    color: '#6366F1',
    fontWeight: '700',
  },
  labelInactive: {
    color: '#94A3B8',
  },
});
