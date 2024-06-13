import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import {AppColors} from '../../constants/colors';
import Fonts from '../../assets/fonts';
import {AppImages} from '../../assets/images';
import IconTextInput from '../../components/common/IconTextInput/IconTextInput';
import PrimaryButton from '../../components/common/PrimaryButton/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL, USER_DATA, USER_TOKEN, showToast} from '../../helper/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();

  const initialFormData = {
    mobile: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleLogin = async () => {
    console.log(formData);
    try {
      const params = {
        mobile: formData?.mobile,
        password: formData?.password,
      };

      const response = await axios.post(`${BASE_URL}login`, params);
      console.log('handleLoginhandleLoginhandleLogin---', response.data);
      if (!response?.data?.error) {
        if (!!response.data?.result?.otp_status) {
          await AsyncStorage.setItem(USER_TOKEN, response?.data?.token);
          await AsyncStorage.setItem(
            USER_DATA,
            JSON.stringify(response?.data?.result),
          );
          showToast('Login Successfully');

          navigation.navigate('CongratulationsScreen');
        } else {
          sendOtp();
        }
      }
    } catch (err) {
      console.log(err?.response?.data?.message);
      showToast(err?.response?.data?.message);
    }
  };
  const sendOtp = async () => {
    try {
      const params = {
        mobile: formData?.mobile,
      };

      const response = await axios.post(`${BASE_URL}resendOtp`, params);

      if (!response?.data?.error) {
        console.log(
          'sendOtpsendOtpsendOtpsendOtp--====',
          response.data?.result,
        );
        navigation.navigate('CustomDialPad', {
          userDetails: response.data?.result,
          from: 'Login',
        });
      }
    } catch (err) {
      console.log(err?.response?.data);
      showToast(err?.response?.data?.message);
    }
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <MainContainer style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={AppImages.LOGO} />
            <Text style={styles.logoText}>MOprep</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.title}>Let’s Log In.!</Text>
            <Text style={styles.subtitle}>
              Login to Your Account to Continue your Courses
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <IconTextInput
              placeholder="Mobile no."
              icon="mobile"
              keyboardType="phone-pad"
              maxLength={10}
              setInputValue={text => setFormData({...formData, mobile: text})}
            />
            <IconTextInput
              placeholder="Password"
              icon="lock"
              isPassword={true}
              setInputValue={text => setFormData({...formData, password: text})}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <PrimaryButton title="Log In" onPress={handleLogin} />
            </View>
          </View>

          <Text style={styles.signupText}>
            Don’t have an Account?{' '}
            <Text
              onPress={() => navigation.navigate('RegisterScreen')}
              style={styles.signupLink}>
              SIGN UP
            </Text>
          </Text>
        </View>
      </MainContainer>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  logoText: {
    fontSize: 28,
    marginHorizontal: 10,
    fontFamily: Fonts.Bold700,
    color: AppColors.PRIMARY_DARK,
  },
  infoContainer: {
    width: '100%',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.SemiBold600,
    color: AppColors.PRIMARY_DARK,
  },
  subtitle: {
    fontFamily: Fonts.MulishBold700,
    color: AppColors.GREY,
    marginTop: 5,
  },
  inputContainer: {
    marginVertical: 40,
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    fontFamily: Fonts.MulishExtraBold800,
    fontSize: 13,
    color: AppColors.GREY,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  signupText: {
    marginTop: 60,
    color: AppColors.GREY,
    fontFamily: Fonts.MulishBold700,
  },
  signupLink: {
    fontFamily: Fonts.MulishExtraBold800,
    color: AppColors.PRIMARY,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
