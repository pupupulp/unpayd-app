import { StyleService, useStyleSheet } from '@ui-kitten/components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import React, { ReactElement } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { ExpenseTransaction } from './types';

export interface ExpenseGraphProps {
  transactions: Array<ExpenseTransaction>;
}

export const ExpenseGraph = (props: ExpenseGraphProps): ReactElement => {

  const styles = useStyleSheet(themedStyles);

  const { transactions } = props;

  let startIndex = 0;
  let data = transactions;
  
  if (transactions.length > 4) {
    startIndex = transactions.length - 4;
    data = transactions.slice(startIndex, transactions.length);
  }
  
  const renderCurrency = (amount, withCurrency = false): string => {
    let currency = {}

    if (withCurrency) currency = { style: 'currency', currency: 'PHP' };

    return new Intl.NumberFormat('en-PH', currency).format(amount)
  };

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const yAxis = data.map((record) => { return record.amount });
  const xAxis = data.map((record) => { return months[record.month].substring(0, 3) });

  const graph = {
    labels: xAxis,
    datasets: [
      {
        data: yAxis,
        color: (opacity = 1) => `rgba(224,0,157, ${opacity})`,
        strokeWidth: 2
      }
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#E0009D',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#AD0079',
    backgroundGradientToOpacity: 0.3,
    color: (opacity = 1) => `rgba(224,0,157, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(224,0,157, ${opacity})`,
    barPercentage: 0.5,
    propsForDots: {
      strokeWidth: "2",
      stroke: "#AD0079"
    }
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.body}>
      <LineChart
        data={graph}
        height={220}
        formatYLabel={(value) => renderCurrency(value)}
        width={screenWidth - 95}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
};

const themedStyles = StyleService.create({
  body: { 
    height: 240, 
    padding: 6, 
    flexDirection: 'row' 
  },
});