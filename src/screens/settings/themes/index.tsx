import { Text, List, ThemeProvider, Toggle } from '@ui-kitten/components';
import React from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { appThemes } from '../../../app/themes';
import { ConfirmModal } from '../../../components/confirm-modal.component';
import { SafeAreaLayout } from '../../../components/safe-area-layout.component';
import { ThemeContextValue, ThemeMappingContextValue, Theming } from '../../../services/theme.service';
import { ThemeCard } from './card.component';
import { ThemesService } from './service';
import { ThemeItem } from './types';

export const ThemesSection = (): React.ReactElement => {

  const themeMappingContext: ThemeMappingContextValue = React.useContext(Theming.ThemeMappingContext);
  const themeContext: ThemeContextValue = React.useContext(Theming.ThemeContext);

  const [evaToggleChecked, setEvaToggleChecked] = React.useState<boolean>(themeMappingContext.isEva());
  const [restartModalVisible, setRestartModalVisible] = React.useState<boolean>(false);

  const themes: ThemeItem[] = ThemesService.createThemeListItems(
    appThemes,
    themeMappingContext.currentThemeMapping,
  );

  const onEvaToggleCheckedChange = (checked: boolean): void => {
    setEvaToggleChecked(checked);
    setRestartModalVisible(true);
    themeMappingContext.setCurrentThemeMapping(checked ? 'eva' : 'material');
  };

  const onItemPress = (info: ListRenderItemInfo<ThemeItem>): void => {
    themeContext.setCurrentTheme(info.item.name);
  };

  const isActiveTheme = (theme: ThemeItem): boolean => {
    return themeMappingContext.currentThemeMapping === theme.mapping && themeContext.currentTheme === theme.name;
  };

  const shouldDisableItem = (theme: ThemeItem): boolean => {
    return themeContext.currentTheme === theme.name;
  };

  const createThemeNameForItem = (theme: ThemeItem): string => {
    return `${theme.mapping} ${theme.name}`.toUpperCase();
  };

  const toggleRestartModal = (): void => {
    setRestartModalVisible(!restartModalVisible);
  };

  const renderItem = (info: ListRenderItemInfo<ThemeItem>): React.ReactElement => (
    <ThemeProvider theme={info.item.theme}>
      <ThemeCard
        style={styles.item}
        title={createThemeNameForItem(info.item)}
        isActive={isActiveTheme(info.item)}
        disabled={shouldDisableItem(info.item)}
        onPress={() => onItemPress(info)}
      />
    </ThemeProvider>
  );

  const renderHeader = (): React.ReactElement => (
    <Text
    appearance='hint'
      style={styles.header}
      category='s1'>
      Themes
    </Text>
  );

  const renderFooter = (): React.ReactElement => (
    <Toggle
      style={styles.evaToggle}
      text='Eva Design System'
      checked={evaToggleChecked}
      onChange={onEvaToggleCheckedChange}
    />
  );

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <List
        contentContainerStyle={styles.container}
        data={themes}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
      <ConfirmModal
        message='Please restart application to apply settings.'
        visible={restartModalVisible}
        onBackdropPress={toggleRestartModal}
        onGotItButtonPress={toggleRestartModal}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    marginHorizontal: 16,
  },
  container: {
    padding: 8,
  },
  item: {
    margin: 8,
  },
  evaToggle: {
    margin: 8,
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
});