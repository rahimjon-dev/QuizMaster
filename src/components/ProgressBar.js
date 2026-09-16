import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

export default function ProgressBar({ current, total }) {
  const { t } = useLanguage();
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <Text style={styles.progressText}>
          {t('question')} <Text style={styles.highlightText}>{current}</Text> {t('of')} {total}
        </Text>
        <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
  highlightText: {
    color: '#38BDF8',
    fontWeight: '800',
  },
  percentageText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#38BDF8',
  },
  track: {
    height: 10,
    backgroundColor: '#1E293B',
    borderRadius: 5,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#0284C7',
    borderRadius: 5,
  },
});
