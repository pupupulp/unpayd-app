import { Button, Layout, Modal, ModalProps, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

interface ConfirmModalProps extends Omit<ModalProps, 'children'> {
  message: string;
  onGotItButtonPress: () => void;
}

export const ConfirmModal = (props: ConfirmModalProps): React.ReactElement => {

  const { message, onGotItButtonPress, ...modalProps } = props;

  return (
    <Modal
      backdropStyle={styles.backdrop}
      {...modalProps}>
      <Layout style={styles.container}>
        <Text category='h4'>
          System Message
        </Text>
        <Text
          style={styles.description}
          appearance='hint'
          category='s1'>
          {message}
        </Text>
        <Button
          onPress={onGotItButtonPress}>
          GOT IT
        </Button>
      </Layout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 16,
    width: 320,
  },
  description: {
    marginTop: 8,
    marginBottom: 24,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});