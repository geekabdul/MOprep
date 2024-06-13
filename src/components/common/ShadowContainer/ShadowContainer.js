import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../../constants/colors';

const ShadowContainer = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default ShadowContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 20,
    elevation: 10,
    marginVertical: 10,
    shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
  },
});
