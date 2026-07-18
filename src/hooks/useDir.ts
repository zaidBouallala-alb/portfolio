import { useTranslation } from 'react-i18next';

const RTL_LANGS = ['ar', 'he', 'fa', 'ur'];

/**
 * Returns `true` when the current language is RTL (Arabic, etc.)
 * and a helper `dir` string ('rtl' | 'ltr') for inline usage.
 */
export function useDir() {
  const { i18n } = useTranslation();
  const lang = i18n.language.substring(0, 2);
  const isRTL = RTL_LANGS.includes(lang);
  return { isRTL, dir: isRTL ? 'rtl' : 'ltr' } as const;
}
