 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import AboutScreen from '../screens/about';
import { SettingsScreen } from '../screens/settings';
import DashboardScreen from '../screens/dashboard';
import { HomeDrawer } from '../screens/home/home-drawer.component';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const initialRoute: string = __DEV__ ? 'Settings' : 'Settings';

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    initialRouteName={initialRoute}
    drawerContent={props => <HomeDrawer {...props}/>}>
    <Drawer.Screen name='Dashboard' component={DashboardScreen}/>
    <Drawer.Screen name='Settings' component={SettingsScreen}/>
    <Drawer.Screen name='About' component={AboutScreen}/>
  </Drawer.Navigator>
);