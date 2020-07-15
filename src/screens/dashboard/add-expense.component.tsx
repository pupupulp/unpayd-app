import { Button, Divider, Input, Layout, Modal, ModalProps, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

interface AddExpenseModalProps extends Omit<ModalProps, 'children'> {
  onConfirmPress: (expenseName, accountNo, actualAmount) => void;
}

export const AddExpenseModal = (props: AddExpenseModalProps): React.ReactElement => {
  const { onConfirmPress, ...modalProps } = props;

  const [expenseName, setExpenseName] = React.useState<string>();
  const isNotEmptyExpenseName = expenseName && expenseName.length > 0;
  
  const [accountNo, setAccountNo] = React.useState<string>();
  const isNotEmptyAccountNo = accountNo && accountNo.length > 0;
  
  const [actualAmount, setActualAmount] = React.useState<string>();
  const isNotEmptyActualAmount = actualAmount && actualAmount.length > 0;

  return (
    <Modal
      backdropStyle={styles.backdrop}
      {...modalProps}>
      <Layout style={styles.container}>
        <Text category='h6'> Add New Expense </Text>
        <Divider style={styles.divider}/>
        <Input
          style={{ marginTop: 10 }}
          placeholder='Expense Name'
          status={isNotEmptyExpenseName ? 'success' : 'danger'}
          caption={isNotEmptyExpenseName ? '' : 'Can not be empty'}
          value={expenseName}
          onChangeText={setExpenseName}
        />
        <Input
          // ref='accountNo'
          style={{ marginTop: 10 }}
          placeholder='Account No / Billing No'
          // status={isNotEmptyAccountNo ? 'success' : 'danger'}
          // caption={isNotEmptyAccountNo ? '' : 'Can not be empty'}
          value={accountNo}
          onChangeText={setAccountNo}
        />
        <Input
          // ref='targetAmount'
          style={{ marginTop: 10 }}
          placeholder='Target/Actual Amount (0.00)'
          status={isNotEmptyActualAmount ? 'success' : 'danger'}
          caption={isNotEmptyActualAmount ? '' : 'Can not be empty'}
          value={actualAmount}
          onChangeText={setActualAmount}
        />
        <Button
          style={{ marginTop: 20 }}
          onPress={() => {
            if (isNotEmptyExpenseName && isNotEmptyActualAmount) {
              onConfirmPress(expenseName, accountNo, actualAmount);
              setExpenseName('');
              setAccountNo('');
              setActualAmount('');
            }
          }}>
          OK
        </Button>
      </Layout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 18,
    width: 320,
  },
  divider: { 
    marginTop: 10, 
    marginBottom: 10 
  },
  description: {
    marginTop: 18,
    marginBottom: 24,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});