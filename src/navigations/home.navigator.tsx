 
import React from 'react';
import { RouteProp } from '@react-navigation/core';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeDrawer } from '../screens/home/home-drawer.component';

import DashboardScreen from '../screens/dashboard';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const initialRoute: string = __DEV__ ? 'Dashboard' : 'Dashboard';

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    initialRouteName={initialRoute}
    drawerContent={props => <HomeDrawer {...props}/>}>
    <Drawer.Screen name='Dashboard' component={DashboardScreen}/>
  </Drawer.Navigator>
);