import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import BackHeader from '../../components/common/BackHeader/BackHeader';
import Fonts from '../../assets/fonts';
import {AppColors} from '../../constants/colors';
import IconTextInput from '../../components/common/IconTextInput/IconTextInput';
import PrimaryButton from '../../components/common/PrimaryButton/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL, showToast} from '../../helper/helper';

const CreateNewPasswordScreen = (props) => {
  const navigation = useNavigation();
  const {userDetails} = props.route.params

  const initialFormData = {
    password: '',
    confirmPassword: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async () => {
    try {
      const params = {
        mobile: userDetails?.whatsapp_number,
        password: formData?.password,
        confirm_password: formData?.confirmPassword,
      };

      const response = await axios.post(`${BASE_URL}createNewPassword`, params);
      console.log(
        'CreateNewPasswordScreenCreateNewPasswordScreen',
        response.data,
      );
      if (!response?.data?.error) {
      showToast('Password Set Successfully')

        navigation.navigate('LoginScreen');
      }
    } catch (err) {
      console.log(err?.response?.data);
      showToast(err?.response?.data?.message)

    }
  };
  return (
    <MainContainer style={styles.container}>
      <BackHeader headerTitle={'Create New Password'} />
      <View style={styles.flex1} />
      <View style={styles.flex1}>
        <Text style={styles.title}>Create Your New Password</Text>
        <View style={styles.inputContainer}>
          <IconTextInput
            placeholder="Password"
            icon="lock"
            isPassword={true}
            setInputValue={text => setFormData({...formData, password: text})}
          />
          <IconTextInput
            placeholder="Confirm Password"
            icon="lock"
            isPassword={true}
            setInputValue={text =>
              setFormData({...formData, confirmPassword: text})
            }
          />
          <PrimaryButton
            title="Submit"
            customContainerStyle={styles.buttonContainer}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </MainContainer>
  );
};

export default CreateNewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  flex1: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.SemiBold600,
    fontSize: 19,
    color: AppColors.PRIMARY_DARK,
  },
  inputContainer: {
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 40,
  },
});
