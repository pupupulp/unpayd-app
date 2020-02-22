import { Divider, TopNavigation, TopNavigationAction, ThemeProvider, List } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, ListRenderItemInfo } from 'react-native';
import { MenuIcon } from '../../components/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { Expense } from './types';
import { ExpenseCard } from './card.component';

export const DashboardScreen = ({ navigation }): React.ReactElement => {

  const expenses: Expense[] = [
    { 
      name: 'Test 1',
      accountNo: '#123456',
      targetAmount: 1200,
      transactions: [
        {
          month: new Date(2020, 0, 1).getMonth(),
          amount: 13840,
        },
        {
          month: new Date(2020, 1, 1).getMonth(),
          amount: 1600,
        },
        {
          month: new Date(2020, 2, 1).getMonth(),
          amount: 640,
        },
        {
          month: new Date(2020, 3, 1).getMonth(),
          amount: 3320,
        },
        {
          month: new Date(2020, 4, 1).getMonth(),
          amount: 3320,
        },
        {
          month: new Date(2020, 5, 1).getMonth(),
          amount: 3320,
        },
        {
          month: new Date(2020, 6, 1).getMonth(),
          amount: 3310,
        },
      ],
      predictions: [],
    },
    { 
      name: 'Test 2',
      accountNo: '#654321',
      targetAmount: 1200,
      transactions: [
        {
          month: new Date(2020, 1, 1).getMonth(),
          amount: 1600,
        },
        {
          month: new Date(2020, 2, 1).getMonth(),
          amount: 640,
        },
        {
          month: new Date(2020, 3, 1).getMonth(),
          amount: 3320,
        },
      ],
      predictions: [],
    },
  ];

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={navigation.toggleDrawer}
    />
  );

  const onExpensePress = (info: ListRenderItemInfo<Expense>): void => {
    // render expense full view
  };

  const renderItem = (info: ListRenderItemInfo<Expense>): React.ReactElement => (
    <ExpenseCard
      style={styles.item}
     {...info.item}
      // onPress={() => onExpensePress(info)}
    />
  );

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <TopNavigation
        title='Dashboard'
        leftControl={renderDrawerAction()}
      />
      <Divider/>
      <List
        contentContainerStyle={styles.container}
        data={expenses}
        renderItem={renderItem}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  item: {
    margin: 8,
  },
  container: {
    padding: 8,
  },
});