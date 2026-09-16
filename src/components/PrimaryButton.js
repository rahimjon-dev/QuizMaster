import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger'
  disabled = false,
  style,
  textStyle,
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryBtn;
      case 'outline':
        return styles.outlineBtn;
      case 'danger':
        return styles.dangerBtn;
      default:
        return styles.primaryBtn;
    }
  };

  const getVariantTextStyles = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineText;
      case 'secondary':
        return styles.secondaryText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        getVariantStyles(),
        disabled && styles.disabledBtn,
        pressed && !disabled && styles.pressedBtn,
        style,
      ]}
    >
      <Text style={[styles.text, getVariantTextStyles(), textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryBtn: {
    backgroundColor: '#0284C7', // Sky Blue
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryBtn: {
    backgroundColor: '#334155', // Slate Gray
  },
  outlineBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#38BDF8',
  },
  dangerBtn: {
    backgroundColor: '#EF4444', // Red
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  pressedBtn: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#F8FAFC',
  },
  outlineText: {
    color: '#38BDF8',
  },
});
