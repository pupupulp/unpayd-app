import { Button, Datepicker, Divider, Input, Layout, Modal, ModalProps, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { CalendarIcon } from '../../components/icons';

interface AddExpenseLineModalProps extends Omit<ModalProps, 'children'> {
  onConfirmPress: (date, amount) => void;
}

export const AddExpenseLineModal = (props: AddExpenseLineModalProps): React.ReactElement => {

  const { onConfirmPress, ...modalProps } = props;

  // const [amount, SetAmount] = React.useState('');
  const [amount, SetAmount] = React.useState<string>();
  const isNotEmpty = amount && amount.length > 0;

  const [date, setDate] = React.useState<string>();
  const isNotEmptyDate = date && date.length > 0;

  return (
    <Modal
      backdropStyle={styles.backdrop}
      {...modalProps}>
      <Layout style={styles.container}>
        <Text category='h6'> Add New Transaction </Text>
        <Divider style={styles.divider}/>
        <Input
          // ref='accountNo'
          style={{ marginTop: 10 }}
          placeholder='Date (YYYY-MM-DD)'
          status={isNotEmptyDate ? 'success' : 'danger'}
          caption={isNotEmptyDate ? '' : 'Can not be empty'}
          value={date}
          onChangeText={setDate}
          icon={CalendarIcon}
        />
        <Input
          style={{ marginTop: 10 }}
          placeholder='Amount (0.00)'
          status={isNotEmpty ? 'success' : 'danger'}
          caption={isNotEmpty ? '' : 'Can not be empty'}
          value={amount}
          onChangeText={SetAmount}
        />
        <Button
          style={{ marginTop: 20 }}
          onPress={() => onConfirmPress(date, amount)}>
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