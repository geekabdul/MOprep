import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../../constants/colors';

const MainContainer = ({children, style}) => {
  return (
    <View
      style={[
        {
          backgroundColor: AppColors.PRIMARY_LIGHT,
          flex: 1,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default MainContainer;

const styles = StyleSheet.create({});
