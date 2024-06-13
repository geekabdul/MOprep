import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import Pdf from 'react-native-pdf';
import BackHeader from '../../components/common/BackHeader/BackHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, USER_TOKEN} from '../../helper/helper';
import axios from 'axios';
import WebView from 'react-native-webview';

const Privacy = () => {
  const [sourceLink, setsourceLink] = useState(null);
  // const source = {
  //   uri: 'https://project.imgglobal.in/edutech/uploads/privacy-policy.pdf',
  //   cache: true,
  // };

  useEffect(() => {
    getLink();
  }, []);
  const getLink = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.get(`${BASE_URL}privacyPolicy`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        console.log(
          'response?.dataresponse?.dataresponse?.data',
          response?.data,
        );

        setsourceLink(response?.data?.privacy);
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  console.log('sourceLinksourceLink', sourceLink);
  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <BackHeader headerTitle={'Privacy and Policy'} />

      {!!sourceLink && <WebView source={{uri: sourceLink}} style={{flex: 1}} />}
    </View>
  );
};
export default Privacy;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
