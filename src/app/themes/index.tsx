import * as eva from '@eva-design/eva';
import * as material from '@eva-design/material';
import { default as customTheme } from './custom-theme.json';
import { default as customEva } from './map-eva.json';
import { default as customMaterial } from './map-material.json';

export const appThemeMappings = {
  eva: {
    mapping: eva.mapping,
    customMapping: customEva,
  },
  material: {
    mapping: material.mapping,
    customMapping: customMaterial,
  },
};

export const appThemes = {
  eva: {
    light: eva.light,
    dark: eva.dark,
    brand: {
      light: customTheme,
      dark: customTheme,
    },
  },
  material: {
    light: material.light,
    dark: material.dark,
    brand: {
      light: {},
      dark: {},
    },
  },
};