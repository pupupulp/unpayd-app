import { Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { MenuIcon } from '../../components/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ThemesSection } from './themes';

export const SettingsScreen = ({ navigation }): React.ReactElement => {

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={navigation.toggleDrawer}
    />
  );

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <TopNavigation
        title='Settings'
        leftControl={renderDrawerAction()}
      />
      <Divider/>
      <ThemesSection />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});