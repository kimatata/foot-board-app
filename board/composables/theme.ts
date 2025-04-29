import type { Theme } from "~/types/base";

export const useTheme = () => {
  return useState<Theme>('theme', () => 'dark')
}