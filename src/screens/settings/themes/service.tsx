import { Theme, ThemeMapping } from '../../../services/theme.service';
import { ThemeItem } from './types';

export class ThemesService {

  static createThemeListItems = (themes, mapping: ThemeMapping): ThemeItem[] => {
    return Object.keys(themes[mapping])
      .filter(key => key !== 'brand')
      .map((theme: Theme) => ThemesService.createThemeForMapping(
        themes,
        mapping,
        theme,
      ));
  };

  static createThemeForMapping = (themes, mapping: ThemeMapping, theme: Theme): ThemeItem => {
    return {
      mapping: mapping,
      name: theme,
      theme: themes[mapping][theme],
    };
  };
}