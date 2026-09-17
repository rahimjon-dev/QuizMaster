import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { playSound } from '../utils/audio';

export default function LevelSelectorModal({
  visible,
  category,
  onClose,
  onStart,
}) {
  const { lang } = useLanguage();
  const { theme, isDark } = useTheme();

  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [selectedCount, setSelectedCount] = useState(30);

  if (!category) return null;

  const categoryTitle =
    typeof category.title === 'object'
      ? category.title[lang] || category.title.uz || category.title.en
      : category.title;

  const difficultyLevels = [
    {
      id: 'Easy',
      label: 'Oson',
      icon: '🟢',
      desc: 'Boshlang\'ich darajadagi qiziqarli savollar',
      borderColor: '#10B981',
      bgSelected: isDark ? '#064E3B' : '#ECFDF5',
    },
    {
      id: 'Medium',
      label: 'O\'rtacha',
      icon: '🟡',
      desc: 'Bilimingizni sinovdan o\'tkazuvchi savollar',
      borderColor: '#F59E0B',
      bgSelected: isDark ? '#78350F' : '#FFFBEB',
    },
    {
      id: 'Hard',
      label: 'Qiyin (Super)',
      icon: '🔴',
      desc: 'Eng murakkab va topish vashshe qiyin savollar!',
      borderColor: '#EF4444',
      bgSelected: isDark ? '#7F1D1D' : '#FEF2F2',
    },
  ];

  const countOptions = [30, 20, 15];

  const handleStart = () => {
    playSound('click');
    onStart(category.id, selectedDifficulty, selectedCount);
  };

  const handleSelectLevel = (levelId) => {
    playSound('click');
    setSelectedDifficulty(levelId);
  };

  const handleSelectCount = (countNum) => {
    playSound('click');
    setSelectedCount(countNum);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.categoryBadge, { color: theme.accent }]}>
                {category.emoji || '🎯'} {categoryTitle}
              </Text>
              <Text style={[styles.title, { color: theme.textPrimary }]}>
                Qiyinchilik darajasi
              </Text>
            </View>
            <Pressable
              onPress={() => {
                playSound('click');
                onClose();
              }}
              style={[styles.closeBtn, { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' }]}
            >
              <Text style={[styles.closeText, { color: theme.textSecondary }]}>✕</Text>
            </Pressable>
          </View>

          {/* Difficulty Levels Options (Easy, Medium, Hard) */}
          <View style={styles.levelsList}>
            {difficultyLevels.map((lvl) => {
              const isSelected = selectedDifficulty === lvl.id;
              return (
                <Pressable
                  key={lvl.id}
                  style={({ pressed }) => [
                    styles.levelCard,
                    {
                      backgroundColor: isSelected ? lvl.bgSelected : (isDark ? '#0F172A' : '#F8FAFC'),
                      borderColor: isSelected ? lvl.borderColor : theme.divider,
                    },
                    pressed && styles.levelCardPressed,
                  ]}
                  onPress={() => handleSelectLevel(lvl.id)}
                >
                  <Text style={styles.levelIcon}>{lvl.icon}</Text>
                  <View style={styles.levelInfo}>
                    <Text
                      style={[
                        styles.levelName,
                        { color: theme.textPrimary },
                        isSelected && { color: lvl.borderColor, fontWeight: '800' },
                      ]}
                    >
                      {lvl.label}
                    </Text>
                    <Text style={[styles.levelDesc, { color: theme.textSecondary }]}>
                      {lvl.desc}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioCircle,
                      { borderColor: isSelected ? lvl.borderColor : theme.textMuted },
                    ]}
                  >
                    {isSelected && (
                      <View
                        style={[styles.radioInner, { backgroundColor: lvl.borderColor }]}
                      />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Question Count Selector (Default 30) */}
          <Text style={[styles.countTitle, { color: theme.textSecondary }]}>
            📝 Savollar soni:
          </Text>
          <View style={styles.countRow}>
            {countOptions.map((num) => {
              const isSelected = selectedCount === num;
              return (
                <Pressable
                  key={num}
                  style={({ pressed }) => [
                    styles.countPill,
                    {
                      backgroundColor: isSelected
                        ? (isDark ? '#312E81' : '#EEF2FF')
                        : (isDark ? '#0F172A' : '#F8FAFC'),
                      borderColor: isSelected ? theme.accent : theme.divider,
                    },
                    pressed && styles.countPillPressed,
                  ]}
                  onPress={() => handleSelectCount(num)}
                >
                  <Text
                    style={[
                      styles.countPillText,
                      { color: isSelected ? theme.accent : theme.textSecondary },
                      isSelected && { fontWeight: '800' },
                    ]}
                  >
                    {num} ta
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Action Start Button */}
          <Pressable
            style={({ pressed }) => [
              styles.startBtn,
              { backgroundColor: theme.accent },
              pressed && { opacity: 0.9 },
            ]}
            onPress={handleStart}
          >
            <Text style={styles.startBtnText}>Viktorinani boshlash 🚀</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    borderRadius: 24,
    padding: 22,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  categoryBadge: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
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
    padding: 13,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  levelCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  levelIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  levelInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  levelDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  countTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  countRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  countPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  countPillPressed: {
    opacity: 0.9,
  },
  countPillText: {
    fontSize: 14,
    fontWeight: '600',
  },
  startBtn: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
