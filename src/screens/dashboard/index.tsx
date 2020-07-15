import { Button, Divider, Layout, List, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { MenuIcon, SquarePlusIcon } from '../../components/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { AddExpenseModal } from './add-expense.component';
import { ExpenseCard } from './card.component';
import { Expense } from './types';
import { AppStorage } from '../../services/app-storage.service';

export const DashboardScreen = ({ navigation }): React.ReactElement => {
  const emptyExpense = {
    name: '',
    accountNo: '',
    targetAmount: 0,
    transactions: [],
    predictions: []
  };

  let [expenses, setExpenses] = React.useState<Expense[]>([emptyExpense]);

  const getExpenses = async () => {
    await AppStorage.getExpenses([emptyExpense]).then(result => {
      setExpenses(result);
    });
  };

  let updateExpenses = async (expenses) => {
    await AppStorage.setExpenses(expenses).then(() => console.log('Success'));
  }

  const renderDrawerAction = (): React.ReactElement => {
    return (
      <TopNavigationAction
        icon={MenuIcon}
        onPress={navigation.toggleDrawer}
      />
    )
  };

  const onExpensePress = (info: ListRenderItemInfo<Expense>): void => {
    // render expense full view
  };

  const renderItem = (info: ListRenderItemInfo<Expense>): React.ReactElement => {
    return (
      <ExpenseCard
        style={styles.item}
       {...info.item}
        // onPress={() => onExpensePress(info)}
      />
    );
  }

  const [restartModalVisible, setRestartModalVisible] = React.useState<boolean>(false);

  const toggleRestartModal = (): void => {
    setRestartModalVisible(!restartModalVisible);
  };

  const showNewExpenseForm = () => {
    setRestartModalVisible(true);
  };

  const addNewExpense = (expenseName, accountNo, actualAmount) => {
    expenses.push({
      name: expenseName,
      accountNo: accountNo,
      targetAmount: actualAmount,
      transactions: [
        {
          month: new Date().getMonth(),
          amount: 0,
        },
      ],
      predictions: []
    });

    updateExpenses(expenses);
    toggleRestartModal();
  };

  getExpenses();

  // if (!expenses.length) {
    // setExpenses([
    //   {
    //     name: 'Empty',
    //     accountNo: '',
    //     targetAmount: 0,
    //     transactions: [
    //       {
    //         month: new Date(2020, 0, 1).getMonth(),
    //         amount: 0,
    //       },
    //     ],
    //     predictions: []
    //   }
    // ]);
  // }

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <TopNavigation
        title='Dashboard'
        leftControl={renderDrawerAction()}
      />
      <Divider/>
      <Layout level='3'>
        <Button 
          style={{ justifyContent: 'flex-end' }} 
          status='primary' 
          appearance='ghost' 
          icon={SquarePlusIcon}
          onPress={showNewExpenseForm}>
          ADD NEW EXPENSE
        </Button>
      </Layout>
      <Divider/>
      <List
        contentContainerStyle={styles.container}
        data={expenses}
        renderItem={renderItem}
      />
      <AddExpenseModal 
        visible={restartModalVisible}
        onBackdropPress={toggleRestartModal}
        onConfirmPress={addNewExpense}/>
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