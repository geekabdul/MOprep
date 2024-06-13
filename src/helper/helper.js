import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
export const BASE_URL = 'https://project.imgglobal.in/edutech/api/';
export const USER_TOKEN = 'userToken';
export const USER_DATA = 'userData';
export const RAZORPAY_TEST = 'rzp_test_WZ2ZtBlNWAZmGI';
export function showToast(message) {
  if (message) {
    Toast.show(message, Toast.LONG);
  }
}

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

export async function getFCMToken() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  console.log('FCMToken==>', fcmtoken);
  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log('FCMToken==>', fcmtoken);
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (error) {
      console.log(error, 'errorinfcmtoken');
    }
  }
}

export const notificationListener = () => {
  messaging().onMessage(async remoteMessage => {
    if (Platform.OS == 'android') {
      PushNotification.localNotification({
        channelId: 'channel',
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.imageUrl,
        data: remoteMessage.data,
      });
    } else {
      // PushNotificationIOS.addNotificationRequest({
      //     message: remoteMessage.notification.body,
      //     title: remoteMessage.notification.title,
      //     bigPictureUrl: remoteMessage.notification.android.imageUrl,
      //     smallIcon: remoteMessage.notification.android.imageUrl,
      //     data: remoteMessage.data,
      // });
    }
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Open from background', remoteMessage);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log('APP are in quit', remoteMessage);
    });
};
