import { Button, Layout, Modal, ModalProps, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

interface IConfirmModalProps extends Omit<ModalProps, 'children'> {
  message: string;
  onConfirmPress: () => void;
}

export const ConfirmModal = (props: IConfirmModalProps): React.ReactElement => {
  const { message, onConfirmPress, ...modalProps } = props;

  return (
    <Modal
      backdropStyle={styles.backdrop}
      {...modalProps}>
      <Layout style={styles.container}>
        <Text category='h6'> System Message </Text>
        <Text
          style={styles.description}
          appearance='hint'
          category='s1'>
          {message}
        </Text>
        <Button onPress={onConfirmPress}> OK </Button>
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