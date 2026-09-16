import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TRANSLATIONS } from '../data/translations';

const LANGUAGE_KEY = '@quizmaster_selected_lang';

const defaultContextValue = {
  lang: 'uz',
  changeLanguage: () => {},
  t: (key) => TRANSLATIONS['uz']?.[key] || TRANSLATIONS['en']?.[key] || key,
};

const LanguageContext = createContext(defaultContextValue);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('uz'); // Default language Uzbek, fallback to EN or RU

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLang && TRANSLATIONS[savedLang]) {
        setLang(savedLang);
      }
    } catch (e) {
      console.error('Failed to load language preference:', e);
    }
  };

  const changeLanguage = async (newLang) => {
    if (!TRANSLATIONS[newLang]) return;
    setLang(newLang);
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, newLang);
    } catch (e) {
      console.error('Failed to save language preference:', e);
    }
  };

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context || defaultContextValue;
};
