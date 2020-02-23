import { Button, Layout, Modal, ModalProps, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

interface AddExpenseModalProps extends Omit<ModalProps, 'children'> {
  // message: string;
  // onConfirmPress: () => void;
}

export const AddExpenseModal = (props: AddExpenseModalProps): React.ReactElement => {

  const { ...modalProps } = props;

  return (
    <Modal
      backdropStyle={styles.backdrop}
      {...modalProps}>
      <Layout style={styles.container}>
        <Text category='h6'>
          Add New Expense
        </Text>
        {/* <Button>
          // onPress={onConfirmPress}>
          OK
        </Button> */}
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