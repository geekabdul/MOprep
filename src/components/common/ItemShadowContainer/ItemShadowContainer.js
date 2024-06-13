import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../../constants/colors';

const ItemShadowContainer = ({children, style, onPress,activeOpacity}) => {
  return (
    <TouchableOpacity
    activeOpacity={activeOpacity}
      onPress={onPress}
      style={[
        {
          backgroundColor: AppColors.WHITE,
          borderRadius: 20,
          paddingHorizontal: 20,
          elevation: 5,
          marginVertical: 10,
        },
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
};

export default ItemShadowContainer;

const styles = StyleSheet.create({});
