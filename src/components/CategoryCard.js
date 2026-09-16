import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

export default function CategoryCard({ category, questionCount = 15, onSelect }) {
  const { lang, t } = useLanguage();

  const title = typeof category.title === 'object' ? (category.title[lang] || category.title.en) : category.title;
  const description = typeof category.description === 'object' ? (category.description[lang] || category.description.en) : category.description;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return '#10B981'; // Emerald
      case 'medium':
        return '#F59E0B'; // Amber
      case 'hard':
        return '#EF4444'; // Red
      default:
        return '#38BDF8';
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { borderLeftColor: category.color || '#38BDF8' },
        pressed && styles.cardPressed,
      ]}
      onPress={onSelect}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{category.icon}</Text>
        </View>

        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>📝 {questionCount} {t('questions')}</Text>
          </View>
          <View
            style={[
              styles.badge,
              { backgroundColor: getDifficultyColor(category.difficulty) + '22' },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: getDifficultyColor(category.difficulty) },
              ]}
            >
              {category.difficulty}
            </Text>
          </View>
        </View>

        <View style={styles.startAction}>
          <Text style={styles.startText}>{t('startQuiz')}</Text>
          <Text style={styles.arrow}>→</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 26,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#0F172A',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#CBD5E1',
  },
  startAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#38BDF8',
    marginRight: 4,
  },
  arrow: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#38BDF8',
  },
});
