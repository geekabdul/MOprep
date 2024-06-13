import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppColors} from '../../../constants/colors';
import Fonts from '../../../assets/fonts';

const SecondaryButton = ({
  title,
  onPress,
  customContainerStyle,
  disabled = false,
  type = 'outline',
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.buttonContainer,
        {
          borderWidth: type === 'filled' ? 0 : 1,
          borderColor: AppColors.PRIMARY,
          backgroundColor:
            type === 'filled' ? AppColors.PRIMARY : AppColors.PRIMARY_LIGHT,
        },
        customContainerStyle,
      ]}>
      <Text
        style={[
          styles.buttonText,
          {
            color: type === 'filled' ? AppColors.WHITE : AppColors.PRIMARY,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 999,
    width: 111,
    height: 39,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    fontFamily: Fonts.SemiBold600,
    fontSize: 16,
  },
});
