import { useAppSelector } from '@/store/store.hook';
import { interpolate, translations } from '@/i18n/translations';

export function useTranslation() {
  const language = useAppSelector((state) => state.settings.language);
  const dict = translations[language];

  function t(key: keyof typeof dict, vars?: Record<string, string>): string {
    const str = dict[key];
    return vars ? interpolate(str, vars) : str;
  }

  return { t, language };
}
