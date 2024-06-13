import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppImages} from '../../assets/images';
import {AppColors} from '../../constants/colors';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import IconTextInput from '../../components/common/IconTextInput/IconTextInput';
import Fonts from '../../assets/fonts';
import PrimaryButton from '../../components/common/PrimaryButton/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL, USER_DATA, USER_TOKEN, showToast} from '../../helper/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import Feather from 'react-native-vector-icons/Feather';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [valueData, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const initialFormData = {
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    name: '',
    collegeName: '',
    state: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [stateData, setstateData] = useState([]);

  useEffect(() => {
    getStateList();
  }, []);
  const getStateList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}stateList`);
      console.log('handleRegisterhandleRegisterhandleRegister', response.data);
      if (!response?.data?.error) {
        setstateData(response.data?.result);
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  const handleRegister = async () => {
    console.log(formData);
    try {
      const params = {
        name: formData?.name,
        email: formData?.email,
        mobile: formData?.mobile,
        password: formData?.password,
        confirm_password: formData?.confirmPassword,
        college: formData?.collegeName,
        state: formData?.state,
      };

      const response = await axios.post(`${BASE_URL}register`, params);

      if (!response?.data?.error) {
        console.log(
          'handleRegisterhandleRegisterhandleRegister-----',
          response.data,
        );
        // await AsyncStorage.setItem(USER_TOKEN, response?.data?.authToken);
        // await AsyncStorage.setItem(
        //   USER_DATA,
        //   JSON.stringify(response?.data?.result),
        // );
        showToast('OTP Send Successfully');
        sendOtp();
        // navigation.navigate('CongratulationsScreen');
      }
    } catch (err) {
      console.log(err?.response?.data);
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
          from: 'Register',
        });
      }
    } catch (err) {
      console.log(err?.response?.data);
      showToast(err?.response?.data?.message);
    }
  };
  console.log('formDataformData', formData?.confirmPassword, formData.password);
  return (
    <MainContainer style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image source={AppImages.LOGO} />
          <Text style={styles.logoText}> MOprep </Text>
        </View>
        <View style={styles.registerTextContainer}>
          <Text style={styles.registerText}>Let's Register.! </Text>
          <Text style={styles.registerSubText}>
            Register to Your Account to Continue your Courses
          </Text>
        </View>
        <View style={styles.formContainer}>
          <IconTextInput
            placeholder="Email ID"
            icon="mail"
            inputValue={formData.email}
            setInputValue={text => setFormData({...formData, email: text})}
          />
          <IconTextInput
            placeholder="Mobile no."
            icon="mobile"
            inputValue={formData.mobile}
            keyboardType="phone-pad"
            maxLength={10}
            setInputValue={text => setFormData({...formData, mobile: text})}
          />
          <IconTextInput
            placeholder="Password"
            icon="lock"
            isPassword={true}
            inputValue={formData.password}
            setInputValue={text => setFormData({...formData, password: text})}
          />
          <IconTextInput
            placeholder="Confirm Password"
            icon="lock"
            isPassword={true}
            inputValue={formData.confirmPassword}
            setInputValue={text =>
              setFormData({...formData, confirmPassword: text})
            }
          />
          <IconTextInput
            placeholder="Name"
            icon="user"
            inputValue={formData.name}
            setInputValue={text => setFormData({...formData, name: text})}
          />
          <IconTextInput
            placeholder="College Name"
            icon="university"
            inputValue={formData.collegeName}
            isOptional={true}
            setInputValue={text =>
              setFormData({...formData, collegeName: text})
            }
          />
          {/* <IconTextInput
            placeholder="State"
            icon="map"
            inputValue={formData.state}
            setInputValue={text => setFormData({...formData, state: text})}
          /> */}
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={{color: 'black'}}
            data={stateData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'State' : '...'}
            searchPlaceholder="Search..."
            value={valueData}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              console.log('iteem', item);
              setValue(item.id);
              setFormData({...formData, state: item?.label});
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              // <AntDesign
              //   style={styles.icon}
              //   color={isFocus ? 'blue' : 'black'}
              //   name="Safety"
              //   size={20}
              // />
              <Feather
                style={styles.icon}
                name={'map'}
                size={20}
                color={AppColors.GREY}
              />
            )}
          />
        </View>
        <PrimaryButton
          title="Register"
          onPress={handleRegister}
          // disabled={
          //   !!formData?.name &&
          //   !!formData?.email &&
          //   !!formData?.mobile &&
          //   !!formData?.password &&
          //   !!formData?.confirmPassword &&
          //   !!formData?.collegeName
          // }
        />
        <Text style={styles.alreadyAccText}>
          Already have an Account?{' '}
          <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={styles.loginText}>
            LOGIN
          </Text>
        </Text>
      </ScrollView>
    </MainContainer>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
  },
  scrollViewContentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  logoText: {
    fontSize: 28,
    marginHorizontal: 10,
    fontFamily: Fonts.Bold700,
    color: AppColors.PRIMARY_DARK,
  },
  registerTextContainer: {
    marginVertical: 20,
    width: '100%',
  },
  registerText: {
    fontSize: 24,
    fontFamily: Fonts.SemiBold600,
    color: AppColors.PRIMARY_DARK,
  },
  registerSubText: {
    fontFamily: Fonts.MulishBold700,
    color: AppColors.GREY,
    marginTop: 5,
  },
  formContainer: {
    width: '100%',
    marginVertical: 10,
  },
  alreadyAccText: {
    marginVertical: 5,
    color: AppColors.GREY,
    fontFamily: Fonts.MulishBold700,
  },
  loginText: {
    fontFamily: Fonts.MulishExtraBold800,
    color: AppColors.PRIMARY,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    // borderColor: 'gray',
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 15,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: AppColors.GREY,
    fontFamily: Fonts.MulishBold700,
    // color: AppColors.PLACEHOLDER_TEXT,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: AppColors.PLACEHOLDER_TEXT,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
});
