import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator/AppNavigator';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {getFCMToken, requestUserPermission} from './src/helper/helper';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <AppNavigator />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
