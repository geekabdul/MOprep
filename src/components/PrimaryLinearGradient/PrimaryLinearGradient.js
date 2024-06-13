import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../../constants/colors';

const screenWidth = Dimensions.get('screen').width;
const PrimaryLinearGradient = ({children, customContainerStyle}) => {
  return (
    <LinearGradient
      locations={[0.4, 1]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1.5}}
      colors={[AppColors.PRIMARY, AppColors.PRIMARY_LIGHT2]}
      style={[
        {borderRadius: 11, padding: 20, width: screenWidth / 1.3},
        customContainerStyle,
      ]}>
      {children}
    </LinearGradient>
  );
};

export default PrimaryLinearGradient;

const styles = StyleSheet.create({});
