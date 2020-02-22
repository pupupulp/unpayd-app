import { Avatar, Divider, Drawer, DrawerElement, DrawerHeaderElement, DrawerHeaderFooter, DrawerHeaderFooterElement, Layout, MenuItemType, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DashboardIcon, SettingsIcon, AboutIcon } from '../../components/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { AppInfoService } from '../../services/app-info.service';

const MENUS: MenuItemType[] = [
  { title: 'Dashboard', icon: DashboardIcon },
  { title: 'Settings', icon: SettingsIcon },
  { title: 'About', icon: AboutIcon },
];

export const HomeDrawer = ({ navigation }): DrawerElement => {

  const onItemSelect = (index: number): void => {
    switch (index) {
      case 0: {
        navigation.toggleDrawer();
        navigation.navigate('Dashboard');
        return;
      }
      case 1: {
        navigation.toggleDrawer();
        navigation.navigate('Settings');
        return;
      }
      case 2: {
        navigation.toggleDrawer();
        navigation.navigate('About');
        return;
      }
    }
  };

  const renderHeader = (): DrawerHeaderElement => (
    <Layout
      style={styles.header}
      level='2'>
      <View style={styles.profileContainer}>
        <Avatar
          style={styles.logo}
          size='giant'
          source={require('../../assets/images/image-logo.jpg')}
        />
        {/* <Text
          style={styles.profileName}
          category='h6'>
          Unpayd
        </Text> */}
      </View>
    </Layout>
  );

  const renderFooter = (): DrawerHeaderFooterElement => (
    <React.Fragment>
      <Divider/>
      <DrawerHeaderFooter
        disabled={true}
        description={`Version ${AppInfoService.getVersion()}`}
      />
    </React.Fragment>
  );

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <Drawer
        header={renderHeader}
        footer={renderFooter}
        data={MENUS}
        onSelect={onItemSelect}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 130,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100
  },
  profileName: {
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
});