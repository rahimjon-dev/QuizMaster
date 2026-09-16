import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import PrimaryButton from './PrimaryButton';

export default function LevelSelectorModal({
  visible,
  category,
  onClose,
  onStart,
}) {
  const { lang, t } = useLanguage();
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [selectedCount, setSelectedCount] = useState(15);

  if (!category) return null;

  const categoryTitle =
    typeof category.title === 'object'
      ? category.title[lang] || category.title.en
      : category.title;

  const difficultyLevels = [
    { id: 'Easy', label: t('easy'), icon: '🟢', desc: 'Relaxed questions for beginners' },
    { id: 'Medium', label: t('medium'), icon: '🟡', desc: 'Balanced trivia challenge' },
    { id: 'Hard', label: t('hard'), icon: '🔴', desc: 'High difficulty for masters!' },
  ];

  const countOptions = [15, 30];

  const handleStart = () => {
    onStart(category.id, selectedDifficulty, selectedCount);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.categoryBadge}>
                {category.icon} {categoryTitle}
              </Text>
              <Text style={styles.title}>{t('selectLevel')}</Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          {/* Difficulty Levels Options */}
          <View style={styles.levelsList}>
            {difficultyLevels.map((lvl) => {
              const isSelected = selectedDifficulty === lvl.id;
              return (
                <Pressable
                  key={lvl.id}
                  style={({ pressed }) => [
                    styles.levelCard,
                    isSelected && styles.levelCardSelected,
                    pressed && styles.levelCardPressed,
                  ]}
                  onPress={() => setSelectedDifficulty(lvl.id)}
                >
                  <Text style={styles.levelIcon}>{lvl.icon}</Text>
                  <View style={styles.levelInfo}>
                    <Text
                      style={[
                        styles.levelName,
                        isSelected && styles.levelNameSelected,
                      ]}
                    >
                      {lvl.label}
                    </Text>
                    <Text style={styles.levelDesc}>{lvl.desc}</Text>
                  </View>
                  <View
                    style={[
                      styles.radioCircle,
                      isSelected && styles.radioCircleSelected,
                    ]}
                  >
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Question Count Selector (15 vs 30) */}
          <Text style={styles.countTitle}>📝 {t('questionCountLabel')}:</Text>
          <View style={styles.countRow}>
            {countOptions.map((num) => {
              const isSelected = selectedCount === num;
              return (
                <Pressable
                  key={num}
                  style={({ pressed }) => [
                    styles.countPill,
                    isSelected && styles.countPillSelected,
                    pressed && styles.countPillPressed,
                  ]}
                  onPress={() => setSelectedCount(num)}
                >
                  <Text
                    style={[
                      styles.countPillText,
                      isSelected && styles.countPillTextSelected,
                    ]}
                  >
                    {num} {t('questions')}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Action Buttons */}
          <PrimaryButton
            title={t('startChallenge')}
            onPress={handleStart}
            style={styles.startBtn}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1.5,
    borderColor: '#38BDF8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  categoryBadge: {
    fontSize: 14,
    fontWeight: '700',
    color: '#38BDF8',
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  closeBtn: {
    backgroundColor: '#0F172A',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  closeText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: 'bold',
  },
  levelsList: {
    marginBottom: 16,
    gap: 10,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#334155',
  },
  levelCardSelected: {
    borderColor: '#F59E0B',
    backgroundColor: '#1E1B4B',
  },
  levelCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  levelIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  levelInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E2E8F0',
    marginBottom: 2,
  },
  levelNameSelected: {
    color: '#F59E0B',
  },
  levelDesc: {
    fontSize: 12,
    color: '#94A3B8',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#64748B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: '#F59E0B',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F59E0B',
  },
  countTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#CBD5E1',
    marginBottom: 10,
  },
  countRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  countPill: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#334155',
  },
  countPillSelected: {
    borderColor: '#38BDF8',
    backgroundColor: '#0284C722',
  },
  countPillPressed: {
    opacity: 0.9,
  },
  countPillText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
  },
  countPillTextSelected: {
    color: '#38BDF8',
  },
  startBtn: {
    marginTop: 4,
  },
});
