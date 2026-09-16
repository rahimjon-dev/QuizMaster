import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function AnswerOption({
  optionText,
  index,
  isSelected,
  isCorrect,
  showResult,
  onSelect,
  disabled,
}) {
  const getContainerStyle = () => {
    if (!showResult) {
      if (isSelected) {
        return styles.selectedContainer;
      }
      return styles.defaultContainer;
    }

    if (isCorrect) {
      return styles.correctContainer;
    }

    if (isSelected && !isCorrect) {
      return styles.wrongContainer;
    }

    return styles.disabledContainer;
  };

  const getLabelStyle = () => {
    if (!showResult) {
      if (isSelected) return styles.selectedLabel;
      return styles.defaultLabel;
    }
    if (isCorrect) return styles.correctLabel;
    if (isSelected && !isCorrect) return styles.wrongLabel;
    return styles.disabledLabel;
  };

  const getTextStyle = () => {
    if (!showResult) {
      if (isSelected) return styles.selectedText;
      return styles.defaultText;
    }
    if (isCorrect) return styles.correctText;
    if (isSelected && !isCorrect) return styles.wrongText;
    return styles.disabledText;
  };

  const renderBadgeContent = () => {
    if (showResult) {
      if (isCorrect) return <Text style={styles.badgeSymbol}>✓</Text>;
      if (isSelected && !isCorrect) return <Text style={styles.badgeSymbol}>✕</Text>;
    }
    return <Text style={[styles.labelText, getLabelStyle()]}>{OPTION_LABELS[index] || index + 1}:</Text>;
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={() => onSelect(index)}
      style={({ pressed }) => [
        styles.container,
        getContainerStyle(),
        pressed && !disabled && styles.pressed,
      ]}
    >
      <View style={[styles.labelBadge, getLabelStyle()]}>
        {renderBadgeContent()}
      </View>
      <Text style={[styles.optionText, getTextStyle()]}>{optionText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1B4B', // Deep metallic navy
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginBottom: 14, // Generous spacing so nothing sticks together!
    borderWidth: 2,
    borderColor: '#3730A3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  defaultContainer: {
    borderColor: '#3730A3',
    backgroundColor: '#1E1B4B',
  },
  selectedContainer: {
    borderColor: '#F59E0B', // Millionaire Gold selection
    backgroundColor: '#312E81',
  },
  correctContainer: {
    borderColor: '#10B981', // Glowing Green for correct answer
    backgroundColor: '#064E3B',
  },
  wrongContainer: {
    borderColor: '#EF4444', // Red for wrong answer
    backgroundColor: '#7F1D1D',
  },
  disabledContainer: {
    borderColor: '#1E1B4B',
    backgroundColor: '#0F172A',
    opacity: 0.5,
  },
  labelBadge: {
    minWidth: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#0F172A',
    paddingHorizontal: 6,
  },
  defaultLabel: {
    backgroundColor: '#0F172A',
  },
  selectedLabel: {
    backgroundColor: '#F59E0B',
  },
  correctLabel: {
    backgroundColor: '#10B981',
  },
  wrongLabel: {
    backgroundColor: '#EF4444',
  },
  disabledLabel: {
    backgroundColor: '#1E293B',
  },
  labelText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#F59E0B', // Gold letter
  },
  badgeSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    lineHeight: 22,
  },
  defaultText: {
    color: '#F8FAFC',
  },
  selectedText: {
    color: '#FDE047', // Glowing Yellow
  },
  correctText: {
    color: '#A7F3D0',
  },
  wrongText: {
    color: '#FCA5A5',
  },
  disabledText: {
    color: '#64748B',
  },
});
