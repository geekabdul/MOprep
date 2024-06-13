import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import DialpadKeypad from '../DialpadKeypad/DialpadKeypad';
import DialpadPin from '../DialpadPin/DialpadPin';
import Fonts from '../../assets/fonts';
import {AppColors} from '../../constants/colors';
import PrimaryButton from '../common/PrimaryButton/PrimaryButton';
import axios from 'axios';
import {BASE_URL, USER_DATA, USER_TOKEN, showToast} from '../../helper/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, 'X'];

const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.3;

const pinLength = 4;
const pinContainerSize = width / 2;
const pinSize = pinContainerSize / pinLength;
const CustomDialPad = props => {
  //   const fontsLoaded = useCustomFonts();
  const userDetails = props?.userDetails || props?.route?.params?.userDetails;
  const from = props?.from || props?.route?.params?.from;
  const navigation = useNavigation();
  const [code, setCode] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  console.log(code, 'code');

  const handleVerify = async () => {
    try {
      console.log("code.join('')code.join('')", code.join(''));
      const params = {
        mobile: userDetails?.whatsapp_number,
        otp: code.join(''),
      };

      const response = await axios.post(`${BASE_URL}verifyOtp`, params);
      console.log('handleVerifyhandleVerifyhandleVerify', response.data);
      if (!response?.data?.error) {
        showToast('OTP Verified.');
        if (from == 'ForgotPassword') {
          navigation.navigate('CreateNewPasswordScreen', {
            userDetails: userDetails,
          });
        } else if (from == 'Register' || from == 'Login') {
          await AsyncStorage.setItem(USER_TOKEN, response?.data?.token);
          await AsyncStorage.setItem(
            USER_DATA,
            JSON.stringify(response?.data?.result),
          );
          navigation.navigate('CongratulationsScreen');
        }
        
        
      }
    } catch (err) {
      console.log(err?.response?.data);
      showToast(err?.response?.data?.message);
    }
  };

  // Formatting the time
  const formatTime = () => {
    let minutes = Math.floor(timeLeft / 60); // Since it's a 1-minute timer, it will be either 1 or 0
    let seconds = timeLeft % 60;

    // Adding leading zero to seconds if less than 10
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);
  const resendOTP = async () => {
    try {
      const params = {
        mobile: userDetails?.whatsapp_number,
      };

      const response = await axios.post(`${BASE_URL}resendOtp`, params);
      console.log('resendOTPresendOTP', response.data);
      if (!response?.data?.error) {
        setTimeLeft(30);
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            fontFamily: Fonts.MulishBold700,
            color: AppColors.GREY,
            marginTop: 50,
          }}>
          Code has been Send to {userDetails?.whatsapp_number}
        </Text>
        <DialpadPin
          pinLength={pinLength}
          pinSize={pinSize}
          code={code}
          dialPadContent={dialPadContent}
        />
        {formatTime() == '0:00' ? (
          <Text
            onPress={() => {
              resendOTP();
            }}
            style={{
              fontFamily: Fonts.MulishBold700,
              color: AppColors.BAR_COLOR,
              marginVertical: 50,
            }}>
            Resend Code
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: Fonts.MulishBold700,
              color: AppColors.GREY,
              marginVertical: 50,
            }}>
            Resend Code in{' '}
            <Text
              style={{
                fontFamily: Fonts.MulishExtraBold800,
                color: AppColors.PRIMARY,
              }}>
              {formatTime()}
            </Text>
            s
          </Text>
        )}

        <PrimaryButton
          title={'Verify'}
          customContainerStyle={{marginTop: 0}}
          disabled={code.length != 4}
          onPress={handleVerify}
        />
      </View>
      <View style={{flex: 1}}>
        <DialpadKeypad
          dialPadContent={dialPadContent}
          pinLength={pinLength}
          dialPadSize={dialPadSize}
          dialPadTextSize={dialPadTextSize}
          setCode={setCode}
          code={code}
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomDialPad;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:20
    // backgroundColor: 'lightpink',
  },
});
