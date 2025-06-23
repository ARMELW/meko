import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore, Currency, Language } from './store';

export function useSettings() {
  const { i18n } = useTranslation();
  const {
    currency,
    language,
    setCurrency,
    setLanguage,
    reset
  } = useSettingsStore();

  useEffect(() => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const changeCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };

  const changeLanguage = async (newLanguage: Language) => {
    setLanguage(newLanguage);
    await i18n.changeLanguage(newLanguage);
  };

  const getCurrencySymbol = (curr: Currency = currency): string => {
    switch (curr) {
      case 'euro':
        return '€';
      case 'chf':
        return 'CHF';
      default:
        return '€';
    }
  };

  const getCurrencyName = (curr: Currency = currency): string => {
    switch (curr) {
      case 'euro':
        return 'Euro';
      case 'chf':
        return 'Franc suisse';
      default:
        return 'Euro';
    }
  };

  const getLanguageName = (lang: Language = language): string => {
    switch (lang) {
      case 'fr':
        return 'Français';
      case 'en':
        return 'English';
      default:
        return 'Français';
    }
  };

  return {
    currency,
    language,
    
    changeCurrency,
    changeLanguage,
    reset,
    
    getCurrencySymbol,
    getCurrencyName,
    getLanguageName,
  };
}

export type { Currency, Language };
