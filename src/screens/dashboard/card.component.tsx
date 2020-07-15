import { Button, Card, CardElement, CardProps, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { SquarePlusIcon } from '../../components/icons';
import { AddExpenseLineModal } from './add-expense-line.component';
import { ExpenseGraph } from './graph.component';
import { ExpenseTransaction } from './types';
import { Expense } from './types';
import { AppStorage } from '../../services/app-storage.service';

export interface IExpenseCardProps extends Omit<CardProps, 'children'> {
  name: string;
  accountNo: string;
  targetAmount: number;
  transactions: Array<ExpenseTransaction>;
  predictions: Array<ExpenseTransaction>;
}

export const ExpenseCard = (props: IExpenseCardProps): CardElement => {
  const styles = useStyleSheet(themedStyles);
  const { name, accountNo, targetAmount, transactions, predictions, ...cardProps } = props;
  
  let transactionAmounts = transactions.map(record => { if (record.amount > 0 ) return record.amount });
  let predictedExpense = 0;

  if (transactionAmounts.length) {
    predictedExpense = transactionAmounts.reduce((total, record) => { return total + record });
    predictedExpense /= transactionAmounts.length;
  } else {
    return null;
  }

  const renderHeader = (): React.ReactElement<ViewProps> => (
    <View style={styles.header}>
      <Text
        style={styles.expenseName} 
        category='s1'>
        {name}
      </Text>
      <Text 
        appearance='hint'
        style={styles.expenseAccountNo}
        category='s2'>
        {accountNo}
      </Text>
      <Button style={{ justifyContent: 'flex-end' }} 
        status='warning' 
        size='small' 
        appearance='ghost' 
        icon={SquarePlusIcon}
        onPress={showNewExpenseLineForm}/>
    </View>
  );

  const renderCurrency = (amount, withCurrency = false): string => {
    let currency = {}

    if (!amount) amount = 0;

    if (withCurrency) currency = { style: 'currency', currency: 'PHP' };

    return new Intl.NumberFormat('en-PH', currency).format(amount)
  };

  const [restartModalVisible, setRestartModalVisible] = React.useState<boolean>(false);

  const toggleRestartModal = (): void => {
    setRestartModalVisible(!restartModalVisible);
  };

  const showNewExpenseLineForm = () => {
    setRestartModalVisible(true);
  };

  const renderFooter = (): React.ReactElement<ViewProps> => (
    <View style={styles.footer}>
      <Text 
        category='c1'>
        Predicted Expense:
      </Text>
      <Text 
        category='c1'>
        {renderCurrency(predictedExpense, true)}
      </Text>
    </View>
  );

  const emptyExpense = {
    name: '',
    accountNo: '',
    targetAmount: 0,
    transactions: [],
    predictions: []
  };

  let [expenses, setExpenses] = React.useState<Expense[]>([emptyExpense]);

  const getExpenses = async () => {
    return await AppStorage.getExpenses([emptyExpense]);
  };

  let updateExpenses = async (expenses) => {
    await AppStorage.setExpenses(expenses).then(() => console.log('Success'));
  }

  const addNewExpenseTransaction = (date, amount) => {
    transactions.push({
      month: new Date(date).getMonth(),
      amount: Number(amount)
    });

    getExpenses().then((result) => {
      let filtered = result.filter(function(record) { return record.name != name || record.accountNo != accountNo }); 
      
      filtered.push({
        name,
        accountNo,
        targetAmount,
        transactions,
        predictions
      });

      updateExpenses(filtered);
    });
  };
  
  return (
    <Card
      {...cardProps}
      header={renderHeader}
      footer={renderFooter}>
      <ExpenseGraph
        transactions={transactions}
      />
      <AddExpenseLineModal 
        visible={restartModalVisible}
        onBackdropPress={toggleRestartModal}
        onConfirmPress={addNewExpenseTransaction}/>
    </Card>
  );
};

const themedStyles = StyleService.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  expenseName: {
    fontWeight: 'bold'
  },
  expenseAccountNo: {
    
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
});