import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const LANGUAGES = [
  { code: 'uz', flag: '🇺🇿', label: 'UZ' },
  { code: 'en', flag: '🇺🇸', label: 'EN' },
  { code: 'ru', flag: '🇷🇺', label: 'RU' },
];

export default function LanguageSelector() {
  const { lang, changeLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      {LANGUAGES.map((item) => {
        const isActive = lang === item.code;
        return (
          <Pressable
            key={item.code}
            onPress={() => changeLanguage(item.code)}
            style={({ pressed }) => [
              styles.pill,
              isActive && styles.activePill,
              pressed && styles.pressedPill,
            ]}
          >
            <Text style={styles.flag}>{item.flag}</Text>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    padding: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 9,
  },
  activePill: {
    backgroundColor: '#0284C7',
  },
  pressedPill: {
    opacity: 0.8,
  },
  flag: {
    fontSize: 13,
    marginRight: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  activeLabel: {
    color: '#FFFFFF',
  },
});
