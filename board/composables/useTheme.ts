import type { Theme } from '~/types/base';

export const useTheme = () => {
  const LOCAL_STORAGE_KEY = 'foot-board-color-theme';
  const theme = useState<Theme>(LOCAL_STORAGE_KEY, () => 'dark');
  if (import.meta.client) {
    onMounted(() => {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') theme.value = stored as Theme;
    });

    watch(theme, (val) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, val);
    });
  }

  if (import.meta.client) {
    watch(theme, (val) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, val);
    });
  }
  return theme;
};
