import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import {AppImages} from '../../assets/images';
import BackHeader from '../../components/common/BackHeader/BackHeader';
import {AppColors} from '../../constants/colors';
import IconTextInput from '../../components/common/IconTextInput/IconTextInput';
import PrimaryButton from '../../components/common/PrimaryButton/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, USER_TOKEN, showToast} from '../../helper/helper';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
const EditProfileScreen = props => {
  const navigation = useNavigation();
  const {profileData} = props?.route?.params;
  const [name, setName] = useState(
    !!profileData?.name ? profileData?.name : '',
  );
  const [email, setemail] = useState(
    !!profileData?.name ? profileData?.email : '',
  );
  const [college, setcollege] = useState(
    !!profileData?.name ? profileData?.college : '',
  );
  const [state, setstate] = useState(
    !!profileData?.name ? profileData?.state : '',
  );
  const [imagedata, setImagedata] = useState('');
  console.log('profileData', profileData);
  const updateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const formData = new FormData();

      if (!!imagedata) {
        const name = imagedata?.path?.split('/').slice(-1)[0];
        formData.append('image', {
          uri: imagedata?.path,
          type: imagedata?.mime,
          name: name,
        });
      }
      formData.append('name', name);
      formData.append('email', email);
      formData.append('college', college);
      formData.append('state', state);

      console.log("formDataformDataformData",JSON.stringify(formData))
      const response = await axios.post(`${BASE_URL}updateUserProfile`,formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log('updateProfileupdateProfileupdateProfile', response?.data);
      if (!response?.data?.error) {
        showToast('Profile Update Successfully');
        navigation.goBack()
      }
    } catch (err) {
      console.log(err);
      showToast(err?.data?.error?.message);
    }
  };
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log('imageimageimage-------------------', image);
        setImagedata(image);
      })
      .catch(error => {
        if (
          error == 'Error: User did not grant library permission.' ||
          error == 'Error: User did not grant camera permission.'
        ) {
          showToast('User did not grant library permission.');
        }
      });
  };
  return (
    <MainContainer style={styles.mainContainer}>
      <BackHeader headerTitle={'Edit Profile'} />
      <View style={styles.profileContainer}>
        <Image
          source={
            !!imagedata ? {uri: imagedata?.path} : {uri: profileData.avatar} 
          }
          style={styles.profileImage}
        />
        <TouchableOpacity
          style={styles.galleryIconContainer}
          onPress={() => openGallery()}>
          <Image source={AppImages.GALLERY} style={styles.galleryIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <IconTextInput
          icon="user"
          inputValue={name}
          setInputValue={setName}
          customInputStyle={styles.inputStyle}
        />
        <IconTextInput
          icon="mail"
          inputValue={email}
          setInputValue={setemail}
          customInputStyle={styles.inputStyle}
        />
        <IconTextInput
          icon="graduation-cap"
          inputValue={college}
          setInputValue={setcollege}
          customInputStyle={styles.inputStyle}
        />
        <IconTextInput
          icon="location-pin"
          inputValue={state}
          setInputValue={setstate}
          customInputStyle={styles.inputStyle}
        />
        <PrimaryButton
          title={'Update'}
          customContainerStyle={styles.buttonContainer}
          onPress={() => updateProfile()}
        />
      </View>
    </MainContainer>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignSelf: 'center',
  },
  profileImage: {
    height: 101,
    width: 101,
    borderWidth: 3,
    borderColor: AppColors.DARK_GREEN,
    borderRadius: 999,
  },
  galleryIconContainer: {
    borderWidth: 3,
    borderColor: AppColors.DARK_GREEN,
    borderRadius: 10,
    position: 'absolute',
    padding: 7,
    backgroundColor: AppColors.WHITE,
    bottom: 0,
    right: 0,
  },
  galleryIcon: {
    height: 17,
    width: 17,
  },
  formContainer: {
    marginVertical: 20,
    flex: 1,
  },
  inputStyle: {
    elevation: 10,
    marginVertical: 10,
    paddingVertical: 15,
    shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
  },
});
