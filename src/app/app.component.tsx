import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashImage } from '../components/splash-image.component';
import { StatusBar } from '../components/status-bar.component';
import { AppNavigator } from '../navigations/app.navigator';
import { AppStorage } from '../services/storage.service';
import { Theme, ThemeMapping, Theming } from '../services/theme.service';
import { AppLoading, LoadFontsTask, Task } from './app-loading.component';
import { appThemeMappings, appThemes } from './themes';

const loadingTasks: Task[] = [
  () => LoadFontsTask({
    'opensans-regular': require('../assets/fonts/opensans-regular.ttf'),
    'roboto-regular': require('../assets/fonts/roboto-regular.ttf'),
  }),
  () => AppStorage.getThemeMapping(defaultConfig.mapping).then(result => ['mapping', result]),
  () => AppStorage.getTheme(defaultConfig.theme).then(result => ['theme', result]),
];

const defaultConfig: { mapping: ThemeMapping, theme: Theme } = {
  mapping: 'eva',
  theme: 'dark',
};

const App = ({ mapping, theme }): React.ReactElement => {

  const [themeMappingContext, currentThemeMapping] = Theming.useMapping(appThemeMappings, mapping);
  const [themeContext, currentTheme] = Theming.useTheming(appThemes, mapping, theme);

  return (
    <React.Fragment>
      <IconRegistry icons={[EvaIconsPack]}/>
      <AppearanceProvider>
        <ApplicationProvider {...currentThemeMapping} theme={currentTheme}>
          <Theming.ThemeMappingContext.Provider value={themeMappingContext}>
            <Theming.ThemeContext.Provider value={themeContext}>
              <SafeAreaProvider>
                <StatusBar/>
                <AppNavigator/>
              </SafeAreaProvider>
            </Theming.ThemeContext.Provider>
          </Theming.ThemeMappingContext.Provider>
        </ApplicationProvider>
      </AppearanceProvider>
    </React.Fragment>
  );
};

const Splash = ({ loading }): React.ReactElement => (
  <SplashImage
    loading={loading}
    source={require('../assets/images/image-splash.jpg')}
  />
);

export default (): React.ReactElement => (
  <AppLoading
    tasks={loadingTasks}
    initialConfig={defaultConfig}
    placeholder={Splash}>
    {props => <App {...props}/>}
  </AppLoading>
);