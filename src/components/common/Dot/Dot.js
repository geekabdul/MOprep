import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../../constants/colors';

const Dot = ({color = AppColors.GREY_LIGHT, size = 6}) => {
  return (
    <View
      style={[
        styles.dot,
        {
          backgroundColor: color,
          height: size,
          width: size,
        },
      ]}
    />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    borderRadius: 999,
    marginHorizontal: 10,
  },
});
