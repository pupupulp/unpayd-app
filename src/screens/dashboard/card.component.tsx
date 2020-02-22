import { Card, CardElement, CardProps, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { ExpenseTransaction } from './types';
import { ExpenseGraph } from './graph.component';

export interface ExpenseCardProps extends Omit<CardProps, 'children'> {
  name: string;
  accountNo: string;
  targetAmount: number;
  transactions: Array<ExpenseTransaction>;
  predictions: Array<ExpenseTransaction>;
}

export const ExpenseCard = (props: ExpenseCardProps): CardElement => {

  const styles = useStyleSheet(themedStyles);

  const { name, accountNo, targetAmount, transactions, predictions, ...cardProps } = props;
  
  const transactionAmounts = transactions.map(record => { return record.amount });
  let predictedExpense = transactionAmounts.reduce((total, record) => { return total + record });
  predictedExpense /= transactionAmounts.length;

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
    </View>
  );

  const renderCurrency = (amount, withCurrency = false): string => {
    let currency = {}

    if (withCurrency) currency = { style: 'currency', currency: 'PHP' };

    return new Intl.NumberFormat('en-PH', currency).format(amount)
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

  
  return (
    <Card
      {...cardProps}
      header={renderHeader}
      footer={renderFooter}>
      <ExpenseGraph
        transactions={transactions}
      />
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