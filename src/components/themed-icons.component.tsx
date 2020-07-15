import { IconElement, IconProps } from '@ui-kitten/components';
import React from 'react';
import { ImageStyle } from 'react-native';
import { ThemeContextValue, Theming } from '../services/theme.service';

export interface IThemedIconsProps extends Omit<IconProps, 'name'> {
  light: (style: ImageStyle) => IconElement;
  dark: (style: ImageStyle) => IconElement;
}

export const ThemedIcons = (props: IThemedIconsProps): React.ReactElement => {

  const themeContext: ThemeContextValue = React.useContext(Theming.ThemeContext);
  const { light, dark, ...iconProps } = props;

  return themeContext.isDarkMode() ? dark(iconProps) : light(iconProps);
};