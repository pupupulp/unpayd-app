import { Avatar, Button, Divider, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GithubIcon, MenuIcon } from '../../components/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { WebBrowserService } from '../../services/web-browser.service';

export const AboutScreen = ({ navigation }): React.ReactElement => {

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={navigation.toggleDrawer}
    />
  );

  const viewGithubProfile = () => {
    WebBrowserService.openBrowserAsync('https://pupupulp.github.io');
  };

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <TopNavigation
        title='About'
        leftControl={renderDrawerAction()}
      />
      <Divider/>
      <Layout style={styles.content} level='2'>
        <Avatar
          style={styles.authorImage}
          size='giant'
          source={require('../../assets/images/image-avatar.jpg')}
        />
        <Text
          style={styles.name}
          category='h5'>
          Eagan Charles E. Martin
        </Text>
        <Text
          style={styles.position}
          category='s1'>
          Applications Developer
        </Text>
        <Button
          appearance='ghost'
          size='small'
          icon={GithubIcon}
          onPress={viewGithubProfile}>
          Github
        </Button>
        <Text
          style={styles.title}
          category='s1'>
          Unpayd
        </Text>
        <Text
          style={styles.narrative}
          category='s2'>
          Is an app made to record expenses with a feature to display graphs of recent transactions.
          It would also try to predict the following month's expense with respect to the historical transactions made,
          a mini algorithm was placed to do this.
        </Text>
        <Text
          style={styles.footer}
          category='c2'>
          This app was a product of my learning curve on react native development using
          Expo and UI Kitten.
        </Text>
      </Layout>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  authorImage: {
    width: 200,
    height: 200,
    marginBottom: 40
  },
  name: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  position: {
    fontStyle: 'italic',
    textAlign: 'center'
  },
  title: {
    marginTop: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  narrative: {
    marginTop: 20,
    textAlign: 'center'
  },
  footer: {
    marginTop: 30,
    fontStyle: 'italic',
    textAlign: 'center'
  }
});