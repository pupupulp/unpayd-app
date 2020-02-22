import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

export const DashboardIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='activity-outline'/>
);

export const AboutIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='question-mark-circle-outline'/>
);

export const SettingsIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='settings-2-outline'/>
);

export const MenuIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='menu-outline'/>
);