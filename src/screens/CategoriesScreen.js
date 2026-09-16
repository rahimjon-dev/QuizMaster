import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  Pressable,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { QUIZ_CATEGORIES } from '../data/quizzes';
import BottomTabBar from '../components/BottomTabBar';

export default function CategoriesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = QUIZ_CATEGORIES.filter((category) =>
    category.title.uz.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleSelectCategory = (category) => {
    navigation.navigate('Quiz', {
      categoryId: category.id,
      categoryTitle: category.title.uz,
      difficulty: 'Easy',
      questionCount: 10,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </Pressable>
          <Text style={styles.headerTitle}>Kategoriyalar</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Kategoriyani nomini qidirish..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </Pressable>
          )}
        </View>

        {/* Vertical List of Categories */}
        <ScrollView
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        >
          {filteredCategories.map((category) => (
            <Pressable
              key={category.id}
              style={({ pressed }) => [
                styles.categoryItem,
                pressed && styles.categoryItemPressed,
              ]}
              onPress={() => handleSelectCategory(category)}
            >
              <LinearGradient
                colors={category.gradient || [category.color, category.color]}
                style={styles.iconBox}
              >
                <Ionicons name={category.icon || 'book'} size={24} color="#FFFFFF" />
              </LinearGradient>

              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{category.title.uz}</Text>
                <Text style={styles.itemSubtitle}>{category.questionCount}</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
            </Pressable>
          ))}

          {filteredCategories.length === 0 && (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Hech qanday toifa topilmadi</Text>
            </View>
          )}
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <BottomTabBar activeTab="categories" navigation={navigation} />
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
  headerRightPlaceholder: {
    width: 36,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryItemPressed: {
    transform: [{ scale: 0.98 }],
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 3,
    fontWeight: '500',
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 14,
  },
});
