import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import BackHeader from '../../components/common/BackHeader/BackHeader';
import Fonts from '../../assets/fonts';
import {AppColors} from '../../constants/colors';
import {AppIcons} from '../../assets/icons';
import PrimaryButton from '../../components/common/PrimaryButton/PrimaryButton';
// import {useNavigation} from '@react-navigation/native';
import CustomDialPad from '../../components/CustomDialPad/CustomDialPad';
import axios from 'axios';
import {BASE_URL, showToast} from '../../helper/helper';

const ForgotPasswordScreen = () => {
  // const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [userDetails, setUserDetails] = useState(null);



  const [isVerificationSend, setIsVerificationSend] = useState(false);
  const handleContinue = async () => {
    try {
      const params = {
        email: email
      };

      const response = await axios.post(`${BASE_URL}verifyEmail`, params);
      console.log('ForgotPasswordScreenForgotPasswordScreen', response.data);
      if (!response?.data?.error) {
        setUserDetails(response?.data?.result)
      showToast('OTP Send Successfully')
        setIsVerificationSend(true);
      }
    } catch (err) {
      console.log(err?.response?.data);
      showToast(err?.response?.data?.message)

    }
  };

  console.log(email);

  return (
    <MainContainer style={styles.container}>
      <BackHeader headerTitle="Forgot Password" />
      {!isVerificationSend ? (
        <>
          <View style={styles.flex1} />
          <View style={styles.centered}>
            <Text style={styles.infoText}>
              Select Email details should we use to Reset Your Password
            </Text>
            <View style={styles.emailContainer}>
              <Image source={AppIcons.CircleMail} />
              <View style={styles.emailDetails}>
                <Text style={styles.emailLabel}>Via Email</Text>
                <TextInput
                  value={email}
                  style={styles.email}
                  onChangeText={setEmail}
                  placeholder='Enter Your Email'
                />
              </View>
            </View>
            <PrimaryButton title={'Continue'} onPress={handleContinue} />
          </View>
        </>
      ) : (
        <>
          <View style={styles.flex1}>
            <CustomDialPad userDetails={userDetails} from = 'ForgotPassword' />
          </View>
        </>
      )}
    </MainContainer>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  flex1: {
    flex: 1,
    marginHorizontal: -20,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
  },
  infoText: {
    fontFamily: Fonts.MulishBold700,
    textAlign: 'center',
    color: AppColors.GREY,
    marginBottom: 50,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.WHITE,
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginVertical: 20,
  },
  emailDetails: {
    marginLeft: 10,
    width:'100%'
    
  },
  emailLabel: {
    fontSize: 12,
    fontFamily: Fonts.MulishBold700,
    color: AppColors.GREY,
  },
  email: {
    padding: 0,
    width:'100%',
    fontSize: 12,
    fontFamily: Fonts.MulishBold700,
    color: AppColors.PRIMARY_DARK,
  },
});
