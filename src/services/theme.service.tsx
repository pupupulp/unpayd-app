import React from 'react';
import { Appearance, AppearancePreferences, ColorSchemeName } from 'react-native-appearance';
import { AppStorage } from './storage.service';

export type ThemeMapping = 'eva' | 'material';
export type Theme = 'light' | 'dark' | 'brand';

export interface ThemeMappingContextValue {
  currentThemeMapping: ThemeMapping;
  setCurrentThemeMapping: (mapping: ThemeMapping) => void;
  isEva: () => boolean;
}

export interface ThemeContextValue {
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  isDarkMode: () => boolean;
  createTheme: (upstreamTheme: Theme) => any;
}

export class Theming {
  static ThemeMappingContext = React.createContext<ThemeMappingContextValue>(null);
  static ThemeContext = React.createContext<ThemeContextValue>(null);

  static useMapping = (mappings: Record<ThemeMapping, any>, mapping: ThemeMapping): [ThemeMappingContextValue, any] => {

    const setCurrentThemeMapping = (nextMapping: ThemeMapping): void => {
      AppStorage.setThemeMapping(nextMapping);
    };

    const isEva = (): boolean => {
      return mapping === 'eva';
    };

    const themeMappingContext: ThemeMappingContextValue = {
      currentThemeMapping: mapping,
      setCurrentThemeMapping,
      isEva,
    };

    return [themeMappingContext, mappings[mapping]];
  };

  static useTheming = (themes: Record<ThemeMapping, Record<Theme, any>>, mapping: ThemeMapping, theme: Theme): [ThemeContextValue, any] => {

    const [currentTheme, setCurrentTheme] = React.useState<Theme>(theme);

    React.useEffect(() => {
      const subscription = Appearance.addChangeListener((preferences: AppearancePreferences): void => {
        const appearanceTheme: Theme = Theming.createAppearanceTheme(
          preferences.colorScheme,
          theme,
        );
        setCurrentTheme(appearanceTheme);
      });

      return () => subscription.remove();
    }, []);

    const isDarkMode = (): boolean => {
      return currentTheme === 'dark';
    };

    const createTheme = (upstreamTheme: Theme): any => {
      return { ...themes[mapping][currentTheme], ...themes[mapping][upstreamTheme][currentTheme] };
    };

    const themeContext: ThemeContextValue = {
      currentTheme,
      setCurrentTheme: (nextTheme) => {
        AppStorage.setTheme(nextTheme);
        setCurrentTheme(nextTheme);
      },
      isDarkMode,
      createTheme,
    };

    return [themeContext, themes[mapping][currentTheme]];
  };

  static useTheme = (upstreamTheme: Theme): any => {
    const themeContext: ThemeContextValue = React.useContext(Theming.ThemeContext);
    return themeContext.createTheme(upstreamTheme);
  };

  private static createAppearanceTheme = (appearance: ColorSchemeName, preferredTheme: Theme): Theme => {
    if (appearance === 'no-preference') {
      return preferredTheme;
    }
    
    return appearance;
  };
}