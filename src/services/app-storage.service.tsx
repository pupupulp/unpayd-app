import { AsyncStorage, YellowBox } from 'react-native';
import { ThemeMapping, Theme } from './theme.service';
import { Expense } from './expense.service';

const THEME_MAPPING_KEY: string = 'theme_mapping';
const THEME_KEY: string = 'theme';

const EXPENSE_KEY: string = 'expenses';

export class AppStorage {

  static getExpenses = (fallback?: Array<Expense>): Promise<Array<Expense>> => {
    return AsyncStorage.getItem(EXPENSE_KEY).then((expenses: string) => {
      return JSON.parse(expenses) || fallback;
    })
  };

  static setExpenses = (expenses: Array<Expense>): Promise<void> => {
    return AsyncStorage.setItem(EXPENSE_KEY, JSON.stringify(expenses));
  };

  static getThemeMapping = (fallback?: ThemeMapping): Promise<ThemeMapping> => {
    return AsyncStorage.getItem(THEME_MAPPING_KEY).then((mapping: ThemeMapping) => {
      return mapping || fallback;
    });
  };

  static getTheme = (fallback?: Theme): Promise<Theme> => {
    return AsyncStorage.getItem(THEME_KEY).then((theme: Theme) => {
      return theme || fallback;
    });
  };

  static setThemeMapping = (mapping: ThemeMapping): Promise<void> => {
    return AsyncStorage.setItem(THEME_MAPPING_KEY, mapping);
  };

  static setTheme = (theme: Theme): Promise<void> => {
    return AsyncStorage.setItem(THEME_KEY, theme);
  };
}

YellowBox.ignoreWarnings(['AsyncStorage has been extracted']);