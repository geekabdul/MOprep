import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppImages} from '../../assets/images';
import {AppColors} from '../../constants/colors';
import Fonts from '../../assets/fonts';
import LottieView from 'lottie-react-native';
import {AppAnimations} from '../../assets/animations';
import {CommonActions, useNavigation} from '@react-navigation/native';

const CongratulationsScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'BottomNavigator'}],
        }),
      );
    }, 3000);
  }, []);
  return (
    <ImageBackground
      source={AppImages.MAIN_BACKGROUND}
      resizeMode="cover"
      style={styles.background}>
      <View style={styles.container}>
        <Image source={AppImages.LOCK_WHEEL} style={styles.image} />
        <Text style={styles.title}>Congratulations</Text>
        <Text style={styles.message}>
          Your Account is Ready to Use. You will be redirected to the Home Page
          in a Few Seconds.
        </Text>
        <LottieView
          source={AppAnimations.LOADING_SPINNER}
          autoPlay
          loop
          style={styles.spinner}
        />
      </View>
    </ImageBackground>
  );
};

export default CongratulationsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: AppColors.PRIMARY_LIGHT,
    borderRadius: 30,
    width: '85%',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.SemiBold600,
    color: AppColors.PRIMARY_DARK,
    marginVertical: 5,
  },
  message: {
    marginVertical: 10,
    fontFamily: Fonts.MulishBold700,
    color: AppColors.GREY,
    textAlign: 'center',
  },
  spinner: {
    height: 50,
    width: 50,
  },
});
