import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { HomeNavigator } from './home.navigator';

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export const AppNavigator = (): React.ReactElement => (
  <NavigationContainer theme={navigatorTheme}>
    <HomeNavigator/>
  </NavigationContainer>
);