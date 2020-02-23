import { Button, Divider, Input, Layout, Modal, ModalProps, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

interface AddExpenseModalProps extends Omit<ModalProps, 'children'> {
  // message: string;
  // onConfirmPress: () => void;
}

export const AddExpenseModal = (props: AddExpenseModalProps): React.ReactElement => {

  const { ...modalProps } = props;

  const [value, setValue] = React.useState('');
  const isNotEmpty = value && value.length > 0;
  const [date, setDate] = React.useState(null);

  return (
    <Modal
      backdropStyle={styles.backdrop}
      {...modalProps}>
      <Layout style={styles.container}>
        <Text category='h6'>
          Add New Expense
        </Text>
        <Divider
          style={{ marginTop: 10, marginBottom: 10 }}/>
        <Input
          style={{ marginTop: 10 }}
          placeholder='Expense Name'
          status={isNotEmpty ? 'success' : 'danger'}
          caption={isNotEmpty ? '' : 'Can not be empty'}
          value={value}
          onChangeText={setValue}
        />
        <Input
          style={{ marginTop: 10 }}
          placeholder='Account No / Billing No'
          status={isNotEmpty ? 'success' : 'danger'}
          caption={isNotEmpty ? '' : 'Can not be empty'}
          value={value}
          onChangeText={setValue}
        />
        <Input
          style={{ marginTop: 10 }}
          placeholder='Actual Amount (0.00)'
          status={isNotEmpty ? 'success' : 'danger'}
          caption={isNotEmpty ? '' : 'Can not be empty'}
          value={value}
          onChangeText={setValue}
        />
        <Button
          style={{ marginTop: 20 }}
          onPress={() => {}}>
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
  description: {
    marginTop: 18,
    marginBottom: 24,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});